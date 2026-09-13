import { deliverSubmission } from '~/server/utils/submissionTransport'

const allowedTypes = new Set(['callback', 'design', 'message', 'manager', 'tender'])

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown> | null>(event)
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw createError({ statusCode: 400, message: 'Пустая или некорректная форма.' })

  const text = (key: string) => String(body[key] ?? '').trim()
  const type = text('type')
  const name = text('name')
  const phone = text('phone')

  if (text('website')) throw createError({ statusCode: 400, message: 'Форма не прошла антиспам-проверку.' })
  if (!allowedTypes.has(type)) throw createError({ statusCode: 400, message: 'Неизвестный тип формы.' })
  if (name.length < 2 || name.length > 120) throw createError({ statusCode: 422, message: 'Укажите ФИО.' })
  const phoneDigits = phone.replace(/\D/g, '')
  if (phoneDigits.length < 10 || phoneDigits.length > 15 || phone.length > 40) throw createError({ statusCode: 422, message: 'Укажите телефон полностью.' })
  if (body.consent !== true) throw createError({ statusCode: 422, message: 'Необходимо согласие на обработку данных.' })

  const requestId = `OP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
  const payload = { requestId, type, name, phone, createdAt: new Date().toISOString() }

  try {
    const delivery = await deliverSubmission(event, 'lead', payload)
    if (!delivery.configured) throw createError({ statusCode: 503, message: 'Отправка временно недоступна. Позвоните нам или попробуйте позже.' })
  } catch (error: unknown) {
    if (isError(error)) throw error
    console.error(`[SMTP] Lead ${requestId} delivery failed:`, error instanceof Error ? error.message : 'Unknown error')
    throw createError({ statusCode: 502, message: 'Не удалось отправить заявку. Попробуйте ещё раз.' })
  }

  setResponseStatus(event, 201)
  return { requestId, deliveryConfigured: true, message: 'Заявка отправлена. Мы свяжемся с вами.' }
})

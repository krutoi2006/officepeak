import { isOrderablePrice, productById } from '~/data/catalog'
import { loadCatalogState } from '~/server/utils/catalogRepository'
import { deliverSubmission } from '~/server/utils/submissionTransport'

export default defineEventHandler(async (event) => {
  const { snapshot } = await loadCatalogState()
  const body = await readBody<Record<string, unknown> | null>(event)
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw createError({ statusCode: 400, message: 'Пустая или некорректная форма.' })

  const text = (key: string) => String(body[key] ?? '').trim()
  const name = text('name')
  const phone = text('phone')

  if (text('website')) throw createError({ statusCode: 400, message: 'Форма не прошла антиспам-проверку.' })
  if (name.length < 2 || name.length > 120) throw createError({ statusCode: 422, message: 'Укажите ФИО.' })
  const phoneDigits = phone.replace(/\D/g, '')
  if (phoneDigits.length < 10 || phoneDigits.length > 15 || phone.length > 40) throw createError({ statusCode: 422, message: 'Укажите телефон полностью.' })
  if (body.consent !== true) throw createError({ statusCode: 422, message: 'Необходимо согласие на обработку данных.' })
  if (!Array.isArray(body.lines) || !body.lines.length || body.lines.length > 100) throw createError({ statusCode: 422, message: 'Состав заказа отсутствует или некорректен.' })

  const lines = body.lines.map((raw: unknown) => {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw createError({ statusCode: 422, message: 'Одна из позиций заказа некорректна.' })
    const line = raw as Record<string, unknown>
    const product = productById(snapshot, String(line.productId ?? ''))
    const variant = product?.variants.find(item => item.id === String(line.variantId ?? ''))
    const quantity = Number(line.quantity)
    if (!product || !variant || !Number.isInteger(quantity) || quantity < 1 || quantity > 999
      || !isOrderablePrice(variant.price) || !['in-stock', 'on-order'].includes(variant.availability)) {
      throw createError({ statusCode: 422, message: 'Одна из позиций заказа больше недоступна или требует уточнения цены.' })
    }
    return { productId: product.id, productName: product.name, variantId: variant.id, article: variant.article, quantity, unitPrice: variant.price, lineTotal: variant.price * quantity }
  })

  const requestId = `OP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
  const payload = { requestId, name, phone, lines, total: lines.reduce((sum, line) => sum + line.lineTotal, 0), createdAt: new Date().toISOString() }

  try {
    const delivery = await deliverSubmission(event, 'order', payload)
    if (!delivery.configured) throw createError({ statusCode: 503, message: 'Отправка временно недоступна. Позвоните нам или попробуйте позже.' })
  } catch (error: unknown) {
    if (isError(error)) throw error
    console.error(`[SMTP] Order ${requestId} delivery failed:`, error instanceof Error ? error.message : 'Unknown error')
    throw createError({ statusCode: 502, message: 'Не удалось отправить заявку. Попробуйте ещё раз.' })
  }

  setResponseStatus(event, 201)
  return { requestId, deliveryConfigured: true, message: 'Заявка отправлена. Менеджер свяжется с вами.' }
})

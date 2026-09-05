import { siteConfig } from '~/config/site'
import { deliverSubmission } from '~/server/utils/submissionTransport'

const allowedTypes = new Set(['callback', 'design', 'message', 'manager', 'tender'])
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  if (!parts) throw createError({ statusCode: 400, statusMessage: 'Пустая форма.' })
  const field = (name: string) => {
    const part = parts.find(item => item.name === name && !item.filename)
    return part ? part.data.toString('utf8').trim() : ''
  }
  const type = field('type')
  const name = field('name')
  const phone = field('phone')
  const email = field('email')
  const company = field('company')
  const message = field('message')
  const consent = field('consent') === 'true'
  if (field('website')) throw createError({ statusCode: 400, statusMessage: 'Форма не прошла антиспам-проверку.' })
  if (!allowedTypes.has(type)) throw createError({ statusCode: 400, statusMessage: 'Неизвестный тип формы.' })
  if (name.length < 2) throw createError({ statusCode: 422, statusMessage: 'Укажите имя.' })
  if (phone.replace(/\D/g, '').length < 10) throw createError({ statusCode: 422, statusMessage: 'Укажите телефон полностью.' })
  if (type === 'design' && !email) throw createError({ statusCode: 422, statusMessage: 'Для дизайн-проекта нужен email.' })
  if (email && !emailPattern.test(email)) throw createError({ statusCode: 422, statusMessage: 'Проверьте формат email.' })
  if (type === 'tender' && company.length < 2) throw createError({ statusCode: 422, statusMessage: 'Укажите название компании.' })
  if (!consent) throw createError({ statusCode: 422, statusMessage: 'Необходимо согласие на обработку данных.' })

  const attachment = parts.find(item => item.name === 'file' && item.filename)
  let safeAttachment: { name: string; type: string; size: number } | undefined
  if (attachment) {
    const extension = `.${(attachment.filename ?? '').split('.').pop()?.toLowerCase()}`
    if (!siteConfig.forms.acceptedFileExtensions.includes(extension as never) || !siteConfig.forms.acceptedMimeTypes.includes((attachment.type ?? '') as never)) throw createError({ statusCode: 422, statusMessage: 'Формат файла не поддерживается.' })
    if (attachment.data.byteLength > siteConfig.forms.maxFileSizeBytes) throw createError({ statusCode: 413, statusMessage: 'Файл превышает 10 МБ.' })
    safeAttachment = { name: (attachment.filename ?? 'file').replace(/[^a-zA-Zа-яА-ЯёЁ0-9._-]/g, '_').slice(0, 120), type: attachment.type ?? 'application/octet-stream', size: attachment.data.byteLength }
  }

  const requestId = `OP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
  const payload = { requestId, type, name, phone, email, company, message, attachment: safeAttachment, createdAt: new Date().toISOString() }
  const delivery = await deliverSubmission('lead', payload)
  setResponseStatus(event, delivery.delivered ? 201 : 202)
  return {
    requestId,
    deliveryConfigured: delivery.configured,
    message: delivery.delivered
      ? 'Данные проверены и переданы настроенному транспорту заявок.'
      : 'Данные проверены сервером, но транспорт CRM/почты не настроен — заявка не отправлена менеджеру. Позвоните или напишите нам напрямую.',
  }
})

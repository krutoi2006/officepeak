import { productById } from '~/data/catalog'
import { deliverSubmission } from '~/server/utils/submissionTransport'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event)
  const text = (key: string) => String(body[key] ?? '').trim()
  const clientType = text('clientType')
  const name = text('name')
  const phone = text('phone')
  const email = text('email')
  const company = text('company')
  const city = text('city')
  const fulfillment = text('fulfillment')
  const address = text('address')
  if (text('website')) throw createError({ statusCode: 400, statusMessage: 'Форма не прошла антиспам-проверку.' })
  if (!['individual', 'organization'].includes(clientType)) throw createError({ statusCode: 422, statusMessage: 'Выберите тип клиента.' })
  if (name.length < 2 || phone.replace(/\D/g, '').length < 10 || !emailPattern.test(email)) throw createError({ statusCode: 422, statusMessage: 'Проверьте имя, телефон и email.' })
  if (clientType === 'organization' && company.length < 2) throw createError({ statusCode: 422, statusMessage: 'Укажите название организации.' })
  if (city.length < 2 || !['delivery', 'pickup'].includes(fulfillment) || (fulfillment === 'delivery' && address.length < 5)) throw createError({ statusCode: 422, statusMessage: 'Проверьте город и способ получения.' })
  if (body.consent !== true) throw createError({ statusCode: 422, statusMessage: 'Необходимо согласие на обработку данных.' })
  if (!Array.isArray(body.lines) || !body.lines.length || body.lines.length > 100) throw createError({ statusCode: 422, statusMessage: 'Состав заказа отсутствует или некорректен.' })

  const lines = body.lines.map((raw: any) => {
    const product = productById(String(raw.productId ?? ''))
    const variant = product?.variants.find(item => item.id === String(raw.variantId ?? ''))
    const rawQuantity = Number(raw.quantity)
    if (!product || !variant || !Number.isInteger(rawQuantity) || rawQuantity < 1 || rawQuantity > 999) throw createError({ statusCode: 422, statusMessage: 'Одна из позиций заказа больше недоступна.' })
    const quantity = rawQuantity
    return { productId: product.id, productName: product.name, variantId: variant.id, article: variant.article, quantity, unitPrice: variant.price, lineTotal: variant.price * quantity }
  })
  const requestId = `OP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
  const payload = { requestId, clientType, name, phone, email, company, inn: text('inn'), city, fulfillment, address, comment: text('comment'), lines, total: lines.reduce((sum, line) => sum + line.lineTotal, 0), createdAt: new Date().toISOString() }
  const delivery = await deliverSubmission('order', payload)
  setResponseStatus(event, delivery.delivered ? 201 : 202)
  return {
    requestId,
    deliveryConfigured: delivery.configured,
    message: delivery.delivered
      ? 'Заявка прошла серверную проверку и передана настроенному транспорту.'
      : 'Заявка прошла серверную проверку, но CRM/почтовый транспорт ещё не настроен. Данные не отправлены менеджеру, корзина сохранена. Свяжитесь с OFFICEPEAK по телефону или email.',
  }
})

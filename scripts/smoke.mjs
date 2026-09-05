const baseUrl = process.env.OFFICEPEAK_BASE_URL || 'http://127.0.0.1:3000'

const routes = [
  '/', '/catalog', '/catalog/chairs', '/collections/rift', '/product/rift-workstation',
  '/search?q=Rift', '/cart', '/checkout', '/quote', '/favorites',
  '/government', '/business', '/designers', '/custom-furniture', '/design-project',
  '/payment', '/delivery', '/lifting', '/assembly', '/warranty', '/returns',
  '/contacts', '/privacy', '/personal-data-consent', '/sitemap.xml', '/robots.txt',
]

const failures = []
for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`)
  if (response.status !== 200) failures.push(`${route}: expected 200, got ${response.status}`)
}

const missing = await fetch(`${baseUrl}/definitely-missing-page`)
if (missing.status !== 404) failures.push(`/definitely-missing-page: expected 404, got ${missing.status}`)

const cartCookie = encodeURIComponent(JSON.stringify([{ productId: 'rift-workstation', variantId: 'rift-workstation-light-oak-1', quantity: 2 }]))
const persistedCart = await fetch(`${baseUrl}/cart`, { headers: { cookie: `officepeak-cart=${cartCookie}` } })
if (!(await persistedCart.text()).includes('Рабочая станция Rift')) failures.push('/cart: persisted SSR cookie line was not rendered')
const persistedQuote = await fetch(`${baseUrl}/quote`, { headers: { cookie: `officepeak-cart=${cartCookie}` } })
if (!(await persistedQuote.text()).includes('Рабочая станция Rift')) failures.push('/quote: persisted SSR cookie line was not rendered')
const favoriteCookie = encodeURIComponent(JSON.stringify(['rift-workstation']))
const persistedFavorites = await fetch(`${baseUrl}/favorites`, { headers: { cookie: `officepeak-favorites=${favoriteCookie}` } })
if (!(await persistedFavorites.text()).includes('Рабочая станция Rift')) failures.push('/favorites: persisted SSR cookie favorite was not rendered')

const invalidOrder = await fetch(`${baseUrl}/api/orders`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({}),
})
if (invalidOrder.status !== 422) failures.push(`/api/orders invalid payload: expected 422, got ${invalidOrder.status}`)

const validOrder = await fetch(`${baseUrl}/api/orders`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    clientType: 'organization', name: 'Тест QA', phone: '+70000000000', email: 'test@example.com',
    company: 'QA', city: 'Москва', fulfillment: 'delivery', address: 'Тестовый адрес, 1',
    consent: true, website: '', lines: [{ productId: 'rift-workstation', variantId: 'rift-workstation-light-oak-1', quantity: 1 }],
  }),
})
const orderBody = await validOrder.json()
if (validOrder.status !== 202 || orderBody.deliveryConfigured !== false) failures.push(`/api/orders valid payload: expected honest 202 development response, got ${validOrder.status}`)

for (const type of ['callback', 'design', 'message', 'manager', 'tender']) {
  const leadForm = new FormData()
  leadForm.set('type', type)
  leadForm.set('name', 'Тест QA')
  leadForm.set('phone', '+70000000000')
  leadForm.set('email', type === 'design' ? 'test@example.com' : '')
  leadForm.set('company', type === 'tender' ? 'QA' : '')
  leadForm.set('message', type === 'message' ? 'Тестовое сообщение' : '')
  leadForm.set('consent', 'true')
  leadForm.set('website', '')
  const validLead = await fetch(`${baseUrl}/api/leads`, { method: 'POST', body: leadForm })
  const leadBody = await validLead.json()
  if (validLead.status !== 202 || leadBody.deliveryConfigured !== false) failures.push(`/api/leads ${type}: expected honest 202 development response, got ${validLead.status}`)
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Smoke passed: ${routes.length} routes, 404 state, order validation and all five lead forms.`)

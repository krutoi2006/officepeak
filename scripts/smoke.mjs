const baseUrl = process.env.OFFICEPEAK_BASE_URL || 'http://127.0.0.1:3000'

const failures = []
const catalogResponse = await fetch(`${baseUrl}/api/catalog`)
const catalogBody = catalogResponse.ok ? await catalogResponse.json() : null
const expectedSource = process.env.OFFICEPEAK_EXPECT_CATALOG_SOURCE || 'demo'
if (!catalogBody?.catalog || catalogBody.source !== expectedSource) failures.push(`/api/catalog: expected source ${expectedSource}, got ${catalogBody?.source ?? catalogResponse.status}`)
const snapshot = catalogBody?.catalog ?? { categories: [], collections: [], products: [] }
const sampleProduct = snapshot.products.find(product => product.variants.some(variant => variant.price > 0))
const sampleVariant = sampleProduct?.variants.find(variant => variant.price > 0)
if (!sampleProduct || !sampleVariant) failures.push('/api/catalog: no orderable sample product found')

const routes = [
  '/', '/catalog',
  ...(snapshot.categories[0] ? [`/catalog/${snapshot.categories[0].slug}`] : []),
  ...(snapshot.collections[0] ? [`/collections/${snapshot.collections[0].slug}`] : []),
  ...(sampleProduct ? [`/product/${sampleProduct.slug}`, `/search?q=${encodeURIComponent(sampleProduct.name)}`] : []),
  '/cart', '/checkout', '/quote', '/favorites',
  '/government', '/business', '/designers', '/custom-furniture', '/design-project',
  '/payment', '/delivery', '/lifting', '/assembly', '/warranty', '/returns',
  '/contacts', '/privacy', '/personal-data-consent', '/sitemap.xml', '/robots.txt',
]

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`)
  if (response.status !== 200) failures.push(`${route}: expected 200, got ${response.status}`)
}

const missing = await fetch(`${baseUrl}/definitely-missing-page`)
if (missing.status !== 404) failures.push(`/definitely-missing-page: expected 404, got ${missing.status}`)

if (sampleProduct && sampleVariant) {
  const cartCookie = encodeURIComponent(JSON.stringify([{ productId: sampleProduct.id, variantId: sampleVariant.id, quantity: 2 }]))
  const persistedCart = await fetch(`${baseUrl}/cart`, { headers: { cookie: `officepeak-cart=${cartCookie}` } })
  if (!(await persistedCart.text()).includes(sampleProduct.name)) failures.push('/cart: persisted SSR cookie line was not rendered')
  const persistedQuote = await fetch(`${baseUrl}/quote`, { headers: { cookie: `officepeak-cart=${cartCookie}` } })
  if (!(await persistedQuote.text()).includes(sampleProduct.name)) failures.push('/quote: persisted SSR cookie line was not rendered')
  const favoriteCookie = encodeURIComponent(JSON.stringify([sampleProduct.id]))
  const persistedFavorites = await fetch(`${baseUrl}/favorites`, { headers: { cookie: `officepeak-favorites=${favoriteCookie}` } })
  if (!(await persistedFavorites.text()).includes(sampleProduct.name)) failures.push('/favorites: persisted SSR cookie favorite was not rendered')
}

const invalidOrder = await fetch(`${baseUrl}/api/orders`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({}),
})
if (invalidOrder.status !== 422) failures.push(`/api/orders invalid payload: expected 422, got ${invalidOrder.status}`)

if (sampleProduct && sampleVariant) {
  const validOrder = await fetch(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: 'Тест QA', phone: '+70000000000', consent: true, website: '',
      lines: [{ productId: sampleProduct.id, variantId: sampleVariant.id, quantity: 1 }],
    }),
  })
  const orderBody = await validOrder.json()
  if (validOrder.status !== 503) failures.push(`/api/orders valid payload without SMTP: expected 503, got ${validOrder.status}: ${JSON.stringify(orderBody)}`)
}

for (const type of ['callback', 'design', 'message', 'manager', 'tender']) {
  const leadForm = new FormData()
  leadForm.set('type', type)
  leadForm.set('name', 'Тест QA')
  leadForm.set('phone', '+70000000000')
  leadForm.set('consent', 'true')
  leadForm.set('website', '')
  const validLead = await fetch(`${baseUrl}/api/leads`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...Object.fromEntries(leadForm), consent: true }),
  })
  const leadBody = await validLead.json()
  if (validLead.status !== 503) failures.push(`/api/leads ${type} without SMTP: expected 503, got ${validLead.status}: ${JSON.stringify(leadBody)}`)
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Smoke passed for ${expectedSource} catalog: ${routes.length} routes, SSR cart/favorites, 404 state, order validation and all five lead forms.`)

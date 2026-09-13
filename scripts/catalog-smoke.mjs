import { spawn } from 'node:child_process'
import { mkdtemp, rename, rm, writeFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const storageDir = await mkdtemp(resolve(tmpdir(), 'officepeak-catalog-smoke-'))
const port = await new Promise((resolvePromise, reject) => {
  const server = createServer()
  server.once('error', reject)
  server.listen(0, '127.0.0.1', () => {
    const address = server.address()
    if (!address || typeof address === 'string') return reject(new Error('Could not allocate a port.'))
    const value = address.port
    server.close(error => error ? reject(error) : resolvePromise(value))
  })
})

const serverOnlyMarker = 'unitex-server-only-test-marker'
const app = spawn(process.execPath, ['.output/server/index.mjs'], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    PORT: String(port),
    HOST: '127.0.0.1',
    UNITEX_CATALOG_STORAGE_DIR: storageDir,
    UNITEX_API_TOKEN: serverOnlyMarker,
    NUXT_SMTP_PASS: '',
  },
  stdio: ['ignore', 'pipe', 'pipe'],
})

let appOutput = ''
app.stdout.on('data', chunk => { appOutput = `${appOutput}${chunk}`.slice(-12_000) })
app.stderr.on('data', chunk => { appOutput = `${appOutput}${chunk}`.slice(-12_000) })
const baseUrl = `http://127.0.0.1:${port}`
const failures = []

const requestJson = async (path, options) => {
  const response = await fetch(`${baseUrl}${path}`, options)
  let body
  try { body = await response.json() } catch { body = null }
  return { response, body }
}

const image = { src: 'https://static.unitex.ru/test/catalog.jpg', alt: 'Тест Unitex' }
const dimensions = { width: 1600, depth: 800, height: 750, label: '1600 × 800 × 750 мм' }
const color = { id: 'unitex-color-test', name: 'Дуб', hex: '#C7A77A' }
const snapshot = {
  categories: [{ id: 'executive-offices', slug: 'executive-offices', name: 'Кабинеты для руководителя', description: 'Категория Unitex.', image, subcategories: [] }],
  collections: [{
    id: 'urus', slug: 'urus', name: 'У.РУС', categoryId: 'executive-offices', description: 'Серия Unitex.', image,
    images: [image], colors: [color], priceFrom: 12345,
    groups: [{ id: 'unitex-type-7', name: 'Столы', description: 'Столы серии.' }],
    specifications: { Производитель: 'Юнитекс' }, relatedCollectionIds: [], isFeatured: true,
  }],
  products: [{
    id: 'unitex-product-500', slug: 'unitex-product-500', name: 'Runtime стол Unitex', categoryId: 'executive-offices', collectionId: 'urus', groupId: 'unitex-type-7',
    description: 'Безопасное описание.', images: [image], specifications: { Производитель: 'Юнитекс' }, materials: ['ЛДСП'], warranty: '60 мес.', features: ['Кабель-канал'], isNew: false, isRecommended: true,
    variants: [
      { id: 'unitex-variant-101', article: 'ART-101', color, dimensions, price: 12345, availability: 'on-order', stockQuantity: 0, productionDays: 20, imageIndex: 0 },
      { id: 'unitex-variant-102', article: 'ART-102', color: { ...color, id: 'unitex-color-test-2', name: 'Графит' }, dimensions, price: 0, availability: 'on-order', stockQuantity: 0, imageIndex: 0 },
    ],
  }],
}

try {
  let ready = false
  for (let attempt = 0; attempt < 100; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/api/catalog`)
      if (response.ok) { ready = true; break }
    } catch {}
    await new Promise(resolvePromise => setTimeout(resolvePromise, 100))
  }
  if (!ready) throw new Error(`Production server did not start.\n${appOutput}`)

  const initial = await requestJson('/api/catalog')
  if (initial.body?.source !== 'demo') failures.push(`initial fallback: expected demo, got ${initial.body?.source}`)

  const temporaryCatalog = resolve(storageDir, 'unitexCatalog.pending.tmp')
  await writeFile(temporaryCatalog, `${JSON.stringify(snapshot, null, 2)}\n`)
  await rename(temporaryCatalog, resolve(storageDir, 'unitexCatalog.json'))

  const loaded = await requestJson('/api/catalog')
  if (loaded.body?.source !== 'unitex' || loaded.body?.catalog?.categories?.[0]?.id !== 'executive-offices') failures.push('runtime reload: Unitex snapshot was not loaded')
  if (loaded.body?.catalog?.products?.length) failures.push('performance: lightweight catalog endpoint exposed full products')
  const loadedPage = await requestJson('/api/catalog/product-list?limit=8')
  if (loadedPage.body?.items?.[0]?.id !== 'unitex-product-500' || loadedPage.body?.total !== 1) failures.push('paged product catalog failed')
  const searchedPage = await requestJson('/api/catalog/product-list?q=ART-101&limit=8')
  if (searchedPage.body?.items?.[0]?.id !== 'unitex-product-500') failures.push('product search by article failed')
  if (JSON.stringify(loaded.body).includes(serverOnlyMarker)) failures.push('security: server-only token marker leaked through catalog endpoint')

  for (const [path, expectedCount] of [['/api/catalog/categories', 1], ['/api/catalog/collections', 1], ['/api/catalog/products', 1]]) {
    const result = await requestJson(path)
    if (!result.response.ok || result.body?.length !== expectedCount) failures.push(`${path}: expected ${expectedCount} record`)
  }
  const filtered = await requestJson('/api/catalog/products?q=Runtime')
  if (filtered.body?.[0]?.id !== 'unitex-product-500') failures.push('/api/catalog/products search filter failed')
  const productResult = await requestJson('/api/catalog/products/unitex-product-500')
  if (productResult.body?.name !== 'Runtime стол Unitex') failures.push('/api/catalog/products/[id] failed')
  const collectionResult = await requestJson('/api/catalog/collections/urus')
  if (collectionResult.body?.name !== 'У.РУС') failures.push('/api/catalog/collections/[slug] failed')

  const orderBody = variantId => ({
    name: 'Тест QA', phone: '+70000000000', consent: true, website: '',
    lines: [{ productId: 'unitex-product-500', variantId, quantity: 3 }],
  })
  const onOrder = await requestJson('/api/orders', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(orderBody('unitex-variant-101')) })
  if (onOrder.response.status !== 503) failures.push(`on-order checkout: expected transport-only 503, got ${onOrder.response.status}`)
  const zeroPrice = await requestJson('/api/orders', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(orderBody('unitex-variant-102')) })
  if (zeroPrice.response.status !== 422) failures.push(`zero-price checkout: expected 422, got ${zeroPrice.response.status}`)

  const page = await fetch(`${baseUrl}/product/unitex-product-500`).then(response => response.text())
  if (!page.includes('Runtime стол Unitex')) failures.push('SSR product page did not render runtime catalog')
  if (page.includes(serverOnlyMarker)) failures.push('security: server-only token marker leaked into SSR HTML')
  const searchPage = await fetch(`${baseUrl}/search?q=ART-101`).then(response => response.text())
  if (!searchPage.includes('/product/unitex-product-500')) failures.push('SSR search page did not render the matching product')

  await writeFile(resolve(storageDir, 'unitexCatalog.json'), '{ damaged json')
  const afterDamage = await requestJson('/api/catalog')
  if (afterDamage.body?.catalog?.categories?.[0]?.id !== 'executive-offices') failures.push('damaged update replaced the cached working catalog')

  if (failures.length) throw new Error(failures.join('\n'))
  console.log('Catalog smoke passed: demo fallback, runtime reload, catalog routes, on-order checkout, zero-price rejection and damaged-file fallback.')
} finally {
  app.kill('SIGTERM')
  await new Promise(resolvePromise => {
    if (app.exitCode !== null) return resolvePromise()
    app.once('exit', resolvePromise)
    setTimeout(() => { app.kill('SIGKILL'); resolvePromise() }, 3_000).unref()
  })
  await rm(storageDir, { recursive: true, force: true })
}

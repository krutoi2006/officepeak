import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const moduleDir = dirname(fileURLToPath(import.meta.url))
const outputPath = resolve(moduleDir, '..', 'public', 'catalog-preview.json')
const sourceUrl = new URL(process.env.STATIC_CATALOG_SOURCE_URL || 'http://127.0.0.1:3000/')
const productsPerCollection = 4
const productsPerCategory = 24

const fetchJson = async (path, query = {}) => {
  const url = new URL(path.replace(/^\//, ''), sourceUrl)
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== '') url.searchParams.set(key, String(value))
  }
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${url.pathname}: HTTP ${response.status}`)
  return response.json()
}

const concurrentMap = async (items, concurrency, mapper) => {
  const results = new Array(items.length)
  let nextIndex = 0
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex++
      results[index] = await mapper(items[index], index)
    }
  })
  await Promise.all(workers)
  return results
}

const catalogResponse = await fetchJson('/api/catalog')
const collectionCards = await fetchJson('/api/catalog/collections')
const home = await fetchJson('/api/catalog/home')
const overview = await fetchJson('/api/catalog/product-list', { limit: 1 })

const collections = await concurrentMap(collectionCards, 8, async (collection) => {
  try {
    return await fetchJson(`/api/catalog/collections/${encodeURIComponent(collection.slug || collection.id)}`)
  } catch {
    return collection
  }
})

const productPages = await concurrentMap(collections, 8, collection => (
  fetchJson('/api/catalog/product-list', { collectionId: collection.id, limit: productsPerCollection })
))
const categoryPages = await concurrentMap(catalogResponse.catalog.categories, 8, category => (
  fetchJson('/api/catalog/product-list', { categoryId: category.id, limit: productsPerCategory })
))

const productMap = new Map()
for (const product of home.products) productMap.set(product.id, product)
for (const page of [...productPages, ...categoryPages]) {
  for (const product of page.items) productMap.set(product.id, product)
}

const preview = {
  version: 1,
  generatedAt: new Date().toISOString(),
  source: catalogResponse.source,
  totalProducts: overview.total,
  catalog: catalogResponse.catalog,
  collections,
  products: [...productMap.values()],
  home,
  facets: overview.facets,
}

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, JSON.stringify(preview), 'utf8')

const megabytes = (Buffer.byteLength(JSON.stringify(preview)) / 1024 / 1024).toFixed(1)
console.log(`Static catalog exported: ${preview.products.length} of ${preview.totalProducts} products, ${collections.length} collections, ${megabytes} MB.`)


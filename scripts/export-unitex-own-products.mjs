#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const [, , inputArgument, outputArgument] = process.argv

if (!inputArgument) {
  console.error('Использование: node scripts/export-unitex-own-products.mjs <products-response.json> [output-directory]')
  process.exit(2)
}

const token = String(process.env.UNITEX_API_TOKEN ?? '').trim()
if (!token) throw new Error('UNITEX_API_TOKEN не задан.')

const inputPath = resolve(inputArgument)
const outputDirectory = resolve(outputArgument || 'exports')
const source = JSON.parse(await readFile(inputPath, 'utf8'))

if (!source?.data || typeof source.data !== 'object' || Array.isArray(source.data)) {
  throw new Error('В исходном файле отсутствует объект data с ID товаров.')
}

const city = String(source.requested?.city || source.city?.code || 'moscow')
const fetchProductList = async (listValue) => {
  const url = new URL('https://api.unitex.ru/products/')
  url.searchParams.set('city', city)
  url.searchParams.set('formatting', '0')
  url.searchParams.set('list_value', listValue)
  url.searchParams.set('token', token)
  const response = await fetch(url, { headers: { accept: 'application/json' } })
  if (!response.ok) throw new Error(`Unitex products (${listValue}): HTTP ${response.status}.`)
  const envelope = await response.json()
  if (!envelope?.data || typeof envelope.data !== 'object' || Array.isArray(envelope.data)) {
    throw new Error(`Unitex вернул некорректный список ${listValue}.`)
  }
  return envelope
}

const production = await fetchProductList('production_our')
await new Promise(resolvePromise => setTimeout(resolvePromise, 5_500))
const articles = await fetchProductList('art')

const sourceIds = new Set(Object.keys(source.data))
const rows = Object.entries(production.data)
  .filter(([id, value]) => sourceIds.has(id) && (value === true || Number(value) === 1))
  .map(([id]) => ({
    id,
    article: String(articles.data[id] ?? '').trim(),
    stock: Number.isFinite(Number(source.data[id])) ? Number(source.data[id]) : null,
    production_our: 1,
  }))
  .sort((left, right) => Number(left.id) - Number(right.id))

const missingInProductionResponse = [...sourceIds].filter(id => !(id in production.data))
const payload = {
  generatedAt: new Date().toISOString(),
  sourceFile: inputPath,
  criterion: 'production_our = 1',
  sourceProductCount: sourceIds.size,
  unitexProductCount: rows.length,
  inStockProductCount: rows.filter(row => (row.stock ?? 0) > 0).length,
  productsWithoutArticle: rows.filter(row => !row.article).length,
  missingInProductionResponse,
  ids: rows.map(row => row.id),
}

const csvCell = value => {
  const text = String(value ?? '')
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}
const csv = [
  'id,article,stock,production_our',
  ...rows.map(row => [row.id, row.article, row.stock ?? '', row.production_our].map(csvCell).join(',')),
].join('\n') + '\n'

await mkdir(outputDirectory, { recursive: true })
await Promise.all([
  writeFile(resolve(outputDirectory, 'unitex-own-product-ids.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8'),
  writeFile(resolve(outputDirectory, 'unitex-own-products.csv'), csv, 'utf8'),
])

console.log(JSON.stringify({
  sourceProductCount: payload.sourceProductCount,
  unitexProductCount: payload.unitexProductCount,
  inStockProductCount: payload.inStockProductCount,
  productsWithoutArticle: payload.productsWithoutArticle,
  missingInProductionResponse: payload.missingInProductionResponse.length,
  outputDirectory,
}, null, 2))

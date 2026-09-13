import { createHash } from 'node:crypto'
import { mkdir, open, readFile, rename, stat, unlink } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const MAX_BATCH_SIZE = 55
const MIN_REQUEST_INTERVAL_MS = 5_500
const DEFAULT_TIMEOUT_MS = 15 * 60_000
const CURRENT_FILE = 'unitexCatalog.json'
const LAST_GOOD_FILE = 'unitexCatalog.last-good.json'
const META_FILE = 'unitexCatalog.meta.json'
const LOCK_FILE = 'unitex-sync.lock'
const moduleDir = dirname(fileURLToPath(import.meta.url))
const defaultConfigPath = resolve(moduleDir, '..', '..', 'config', 'unitex-sync.json')

const asArray = value => Array.isArray(value) ? value : value == null ? [] : [value]
const asEntries = value => Array.isArray(value) ? value : value && typeof value === 'object' ? Object.values(value) : []
const asText = value => value == null ? '' : String(value).trim()
const asId = value => asText(value)
const toNumber = value => {
  if (value && typeof value === 'object' && 'value' in value) return toNumber(value.value)
  const number = typeof value === 'string' ? Number(value.replace(/\s/g, '').replace(',', '.')) : Number(value)
  return Number.isFinite(number) ? number : undefined
}
const unique = values => [...new Set(values.filter(Boolean))]
const chunks = (values, size) => Array.from({ length: Math.ceil(values.length / size) }, (_, index) => values.slice(index * size, (index + 1) * size))
const wait = (milliseconds, signal) => new Promise((resolvePromise, reject) => {
  if (milliseconds <= 0) return resolvePromise()
  const timer = setTimeout(resolvePromise, milliseconds)
  signal?.addEventListener('abort', () => {
    clearTimeout(timer)
    reject(new Error('Превышен общий таймаут синхронизации Unitex.'))
  }, { once: true })
})

const htmlEntities = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', laquo: '«', raquo: '»',
}

const decodeEntities = value => value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
  const normalized = entity.toLowerCase()
  if (normalized.startsWith('#x')) return String.fromCodePoint(Number.parseInt(normalized.slice(2), 16))
  if (normalized.startsWith('#')) return String.fromCodePoint(Number.parseInt(normalized.slice(1), 10))
  return htmlEntities[normalized] ?? ' '
})

export const htmlToText = value => decodeEntities(asText(value)
  .replace(/<\s*(script|style)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, ' ')
  .replace(/<\s*br\s*\/?\s*>/gi, '\n')
  .replace(/<\s*\/\s*(p|li|div|h[1-6])\s*>/gi, '\n')
  .replace(/<[^>]*>/g, ' '))
  .replace(/[\t ]+/g, ' ')
  .replace(/\s*\n\s*/g, '\n')
  .replace(/\n{3,}/g, '\n\n')
  .trim()

const extractListItems = value => {
  const html = asText(value)
  const items = [...html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map(match => htmlToText(match[1]))
  if (items.length) return unique(items)
  return htmlToText(html).split('\n').map(item => item.trim()).filter(item => item.length > 2)
}

const slugify = value => asText(value).toLocaleLowerCase('ru-RU')
  .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-zа-яё0-9]+/gi, '-').replace(/^-+|-+$/g, '') || 'item'

const safeImageUrl = value => {
  try {
    const url = new URL(asText(value))
    if (url.protocol !== 'https:' || !(url.hostname === 'unitex.ru' || url.hostname.endsWith('.unitex.ru'))) return ''
    return url.toString()
  } catch {
    return ''
  }
}

const imageValues = value => asArray(value).flatMap((item) => {
  if (typeof item === 'string') return [item]
  if (!item || typeof item !== 'object') return []
  return [item.src, item.url, item.image].filter(Boolean)
}).map(safeImageUrl).filter(Boolean)

const colorPalette = [
  '#B89466', '#D8C3A0', '#6D4935', '#4B4D4C', '#1D1D1D', '#F0F0EC', '#999B98', '#496459', '#485B78', '#7D6757',
]
const colorHex = (name) => {
  const normalized = asText(name).toLocaleLowerCase('ru-RU')
  const known = [
    [/бел|white/, '#F0F0EC'], [/чер|black|антрацит/, '#1D1D1D'], [/сер|графит|grey|gray/, '#777A78'],
    [/дуб|oak|беж|песоч/, '#C7A77A'], [/орех|walnut|корич/, '#6D4935'], [/зел|green/, '#496459'], [/син|blue/, '#485B78'],
  ].find(([pattern]) => pattern.test(normalized))
  if (known) return known[1]
  const hash = [...normalized].reduce((sum, character) => (sum * 31 + character.codePointAt(0)) >>> 0, 0)
  return colorPalette[hash % colorPalette.length]
}

const objectTitle = value => typeof value === 'string' || typeof value === 'number'
  ? asText(value)
  : value && typeof value === 'object'
    ? asText(value.title ?? value.name ?? value.value)
    : ''

const readDimension = (record, key) => {
  const direct = toNumber(record.sizes?.[key] ?? record[key])
  if (direct !== undefined) return direct
  if (!Array.isArray(record.sizes)) return 0
  const candidate = record.sizes.find(item => item && typeof item === 'object' && [item.id, item.code, item.name, item.title].some(value => asText(value).toLowerCase() === key))
  return toNumber(candidate?.value ?? candidate?.size) ?? 0
}

const readPrice = (record, priceType) => toNumber(
  record.prices?.[priceType]?.value
  ?? record.prices?.[priceType]
  ?? record.price?.[priceType]?.value
  ?? record.price?.value
  ?? record.price,
)

const getColor = (record) => {
  const color = record.color
  const name = asText(record.color_title) || objectTitle(color) || 'Цвет по каталогу Unitex'
  const material = color && typeof color === 'object'
    ? objectTitle(color.material ?? color.color_material ?? color.materials)
    : ''
  return { id: `unitex-color-${asId(record.color_id || color?.id || slugify(name))}`, name, hex: colorHex(name), ...(material ? { material } : {}) }
}

const productImages = record => unique([
  ...imageValues(record.images),
  safeImageUrl(record.image1),
  safeImageUrl(record.image4),
])

const apiDateToIso = value => {
  const raw = asText(value?.date ?? value)
  if (!raw) return null
  const withZone = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(raw) ? `${raw.slice(0, 19).replace(' ', 'T')}+03:00` : raw
  const date = new Date(withZone)
  return Number.isFinite(date.getTime()) ? date.toISOString() : null
}

const normalizeConfig = (value, cityOverride) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Конфигурация Unitex должна быть JSON-объектом.')
  const manualSeries = asArray(value.manualSeries).map((item, index) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) throw new Error(`Ручная серия Unitex №${index + 1} должна быть объектом.`)
    const normalized = {
      id: asId(item.id),
      title: asText(item.title),
      categoryId: asId(item.categoryId),
      categoryTitle: asText(item.categoryTitle),
      producerTitle: asText(item.producerTitle || 'Юнитекс'),
      countryTitle: asText(item.countryTitle || 'Россия'),
      typeId: asId(item.typeId),
      articlePrefixes: unique(asArray(item.articlePrefixes).map(asText)),
      sourceSeriesCode: asId(item.sourceSeriesCode),
      requiredSeriesCode: asId(item.requiredSeriesCode),
      description: asText(item.description),
      images: unique(asArray(item.images).map(safeImageUrl)),
    }
    if (!normalized.id || !normalized.title || !normalized.categoryId || !normalized.categoryTitle
      || !normalized.images.length
      || (!normalized.articlePrefixes.length && !(normalized.sourceSeriesCode && normalized.requiredSeriesCode))
      || (normalized.articlePrefixes.length && !normalized.typeId)) {
      throw new Error(`Ручная серия Unitex №${index + 1} заполнена не полностью.`)
    }
    return normalized
  })
  const config = {
    city: asText(cityOverride || value.city || 'moscow'),
    allowedSeriesCodes: unique(asArray(value.allowedSeriesCodes).map(asId)),
    allowedSetCodes: unique(asArray(value.allowedSetCodes).map(asId)),
    manualSeries,
    productionOurOnly: value.productionOurOnly === true,
    allowedBaseProductIds: unique(asArray(value.allowedBaseProductIds).map(asId)),
    allowedVariantIds: unique(asArray(value.allowedVariantIds).map(asId)),
    currency: asText(value.currency || 'RUR'),
    priceType: asText(value.priceType || 'retail'),
    maxSeriesImages: Math.floor(toNumber(value.maxSeriesImages) ?? 12),
    categoryByUnitexId: value.categoryByUnitexId,
  }
  if (!config.allowedSeriesCodes.length && !config.allowedSetCodes.length && !config.manualSeries.length) throw new Error('Должна быть разрешена хотя бы одна серия или подборка Unitex.')
  const collectionCodes = [...config.allowedSeriesCodes, ...config.allowedSetCodes, ...config.manualSeries.map(item => item.id)]
  if (new Set(collectionCodes).size !== collectionCodes.length) throw new Error('Коды разрешённых серий и подборок Unitex не должны повторяться.')
  if (!config.city || !config.currency || config.priceType !== 'retail') throw new Error('Разрешён только публичный тип цены retail и явно заданные city/currency.')
  if (config.maxSeriesImages < 1 || config.maxSeriesImages > 100) throw new Error('maxSeriesImages должен быть от 1 до 100.')
  if (!config.categoryByUnitexId || typeof config.categoryByUnitexId !== 'object' || Array.isArray(config.categoryByUnitexId)) throw new Error('categoryByUnitexId должен быть объектом.')
  return config
}

const validateApiEnvelope = (value, resource) => {
  if (!value || typeof value !== 'object' || Array.isArray(value) || !('data' in value)) throw new Error(`Unitex ${resource}: некорректный ответ API.`)
  return value
}

export const createUnitexClient = ({ token, apiBaseUrl, fetchImpl = fetch, sleepFn = wait, signal, maxRetries = 4, minIntervalMs = MIN_REQUEST_INTERVAL_MS, now = () => Date.now() }) => {
  if (!asText(token)) throw new Error('UNITEX_API_TOKEN не задан.')
  const baseUrl = new URL(apiBaseUrl || 'https://api.unitex.ru/')
  if (baseUrl.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(baseUrl.hostname)) throw new Error('UNITEX_API_BASE_URL должен использовать HTTPS.')
  let lastRequestAt = 0
  let requestSequence = 0

  return async (resource, params = {}) => {
    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
      const remainingDelay = minIntervalMs - (now() - lastRequestAt)
      if (lastRequestAt && remainingDelay > 0) await sleepFn(remainingDelay, signal)
      lastRequestAt = now()
      const url = new URL(`${resource.replace(/^\/+|\/+$/g, '')}/`, baseUrl)
      for (const [key, value] of Object.entries(params)) if (value !== undefined && value !== '') url.searchParams.set(key, String(value))
      url.searchParams.set('_cache_bust', `${now()}-${requestSequence}`)
      requestSequence += 1
      url.searchParams.set('token', token)
      let response
      try {
        response = await fetchImpl(url, {
          cache: 'no-store',
          headers: { accept: 'application/json', 'cache-control': 'no-cache', pragma: 'no-cache' },
          signal,
        })
      } catch (error) {
        if (signal?.aborted) throw new Error('Превышен общий таймаут синхронизации Unitex.')
        throw new Error(`Unitex ${resource}: сетевая ошибка.`)
      }
      if ([429, 500, 502, 503, 504].includes(response.status) && attempt < maxRetries) {
        const retryAfterSeconds = Number(response.headers?.get?.('retry-after'))
        const retryDelay = Math.max(MIN_REQUEST_INTERVAL_MS * (2 ** attempt), Number.isFinite(retryAfterSeconds) ? retryAfterSeconds * 1000 : 0)
        await sleepFn(retryDelay, signal)
        continue
      }
      if (!response.ok) throw new Error(`Unitex ${resource}: HTTP ${response.status}.`)
      try {
        return validateApiEnvelope(await response.json(), resource)
      } catch (error) {
        if (error instanceof Error && error.message.startsWith('Unitex ')) throw error
        throw new Error(`Unitex ${resource}: ответ не является корректным JSON.`)
      }
    }
    throw new Error(`Unitex ${resource}: исчерпаны повторы после HTTP 429.`)
  }
}

const loadSelectedRecords = async ({ request, resource, codes, city, sleepFn, signal }) => {
  if (!codes.length) return { records: [], envelopes: [] }
  const recordsByCode = new Map()
  const envelopes = []
  let remaining = [...codes]
  let stalledAttempts = 0
  while (remaining.length) {
    const envelope = await request(resource, { ids: remaining.join(','), city, formatting: 0 })
    envelopes.push(envelope)
    const remainingSet = new Set(remaining)
    for (const record of asEntries(envelope.data)) {
      const code = asId(record?.id ?? record?.code)
      if (remainingSet.has(code)) recordsByCode.set(code, record)
    }
    const next = remaining.filter(code => !recordsByCode.has(code))
    if (next.length === remaining.length) {
      if (remaining.length > 1) {
        for (const code of remaining) {
          const singleEnvelope = await request(resource, { ids: code, city, formatting: 0 })
          envelopes.push(singleEnvelope)
          for (const record of asEntries(singleEnvelope.data)) {
            const returnedCode = asId(record?.id ?? record?.code)
            if (returnedCode === code) recordsByCode.set(code, record)
          }
        }
        const unresolved = remaining.filter(code => !recordsByCode.has(code))
        if (unresolved.length < remaining.length) {
          remaining = unresolved
          stalledAttempts = 0
          continue
        }
      }
      if (stalledAttempts >= 3) {
        throw new Error(`Unitex не вернул разрешённые ${resource === 'sets' ? 'подборки' : 'серии'}: ${next.join(', ')}.`)
      }
      stalledAttempts += 1
      await sleepFn(30_000, signal)
      continue
    }
    stalledAttempts = 0
    remaining = next
  }
  return { records: codes.map(code => recordsByCode.get(code)), envelopes }
}

const selectOwnProductionIds = (envelope) => {
  if (!envelope.data || typeof envelope.data !== 'object' || Array.isArray(envelope.data)) {
    throw new Error('Unitex products: некорректный список production_our.')
  }
  return new Set(Object.entries(envelope.data)
    .filter(([, value]) => value === true || Number(value) === 1)
    .map(([id]) => asId(id)))
}

const chooseDescription = (...values) => values.map(htmlToText).find(value => value.length > 0) || 'Описание уточняется.'

const transform = ({ seriesRecords, productRecords, membership, config, apiVersion, tokenTill, nowDate }) => {
  const warnings = []
  const allowedBase = new Set(config.allowedBaseProductIds)
  const allowedVariants = new Set(config.allowedVariantIds)
  const categoryMap = new Map()
  const collections = []

  for (const series of seriesRecords) {
    const seriesCode = asId(series.id ?? series.code)
    const unitexCategoryId = asId(series.category?.id ?? series.product_set_category_id)
    const categoryId = asText(config.categoryByUnitexId[unitexCategoryId])
    if (!categoryId) throw new Error(`Для категории Unitex ${unitexCategoryId || '(пусто)'} не задано сопоставление.`)
    const seriesImages = unique(imageValues(series.images)).slice(0, config.maxSeriesImages)
    if (!seriesImages.length) throw new Error(`Серия ${seriesCode} не содержит безопасных изображений.`)
    const categoryTitle = objectTitle(series.category) || 'Каталог Unitex'
    if (!categoryMap.has(categoryId)) categoryMap.set(categoryId, {
      id: categoryId,
      slug: categoryId,
      name: categoryTitle,
      description: `${categoryTitle}.`,
      image: { src: seriesImages[0], alt: categoryTitle },
      subcategories: [],
    })
    collections.push({
      id: seriesCode,
      slug: seriesCode,
      name: asText(series.title_short ?? series.shorttitle ?? series.title) || seriesCode,
      categoryId,
      description: chooseDescription(series.description, series.description_tech, series.tech_description),
      image: { src: seriesImages[0], alt: asText(series.title_short ?? series.title) || seriesCode },
      images: seriesImages.map((src, index) => ({ src, alt: `${asText(series.title_short ?? series.title) || seriesCode}, изображение ${index + 1}` })),
      colors: [],
      priceFrom: 0,
      groups: [],
      specifications: {
        Производитель: objectTitle(series.producer) || 'Юнитекс',
        Страна: objectTitle(series.country) || 'Россия',
      },
      relatedCollectionIds: [],
      isFeatured: Boolean(series.is_novelty ?? series.novelty),
    })
  }

  const usable = []
  const seenVariantIds = new Set()
  for (const record of productRecords) {
    const variantRawId = asId(record?.id)
    if (!variantRawId || seenVariantIds.has(variantRawId)) {
      warnings.push(`Пропущена повреждённая или дублирующаяся запись варианта ${variantRawId || '(без id)'}.`)
      continue
    }
    seenVariantIds.add(variantRawId)
    if (allowedVariants.size && !allowedVariants.has(variantRawId)) continue
    const producerId = asId(record?.producer?.id)
    const producerTitle = objectTitle(record?.producer).toLocaleLowerCase('ru-RU')
    if (config.productionOurOnly && record?.producer && producerId !== '24' && producerTitle !== 'юнитекс' && producerTitle !== 'unitex') {
      warnings.push(`Пропущен вариант ${variantRawId}: в карточке указан сторонний производитель ${objectTitle(record.producer) || producerId}.`)
      continue
    }
    const baseRawId = asId(record?.base_id ?? record?.baseId)
    if (allowedBase.size && !allowedBase.has(baseRawId)) continue
    const seriesCode = membership.get(variantRawId)
    const price = readPrice(record, config.priceType)
    const title = asText(record?.base_title ?? record?.title)
    const sourceArticle = asText(record?.art ?? record?.base_art)
    const article = sourceArticle || (config.productionOurOnly ? `UNITEX-${variantRawId}` : '')
    if (!sourceArticle && config.productionOurOnly) warnings.push(`Для варианта ${variantRawId} отсутствует артикул Unitex; использован служебный артикул ${article}.`)
    if (!baseRawId || !seriesCode || price === undefined || !title || !article) {
      warnings.push(`Пропущен повреждённый вариант ${variantRawId}: отсутствуют обязательные данные.`)
      continue
    }
    usable.push({ record, variantRawId, baseRawId, seriesCode, price, article })
  }

  const grouped = new Map()
  for (const item of usable) {
    const key = `${item.seriesCode}:${item.baseRawId}`
    if (!grouped.has(key)) grouped.set(key, [])
    grouped.get(key).push(item)
  }

  const products = []
  for (const items of grouped.values()) {
    const first = items[0]
    const collection = collections.find(item => item.id === first.seriesCode)
    if (!collection) continue
    const rawImages = unique(items.flatMap(item => productImages(item.record)))
    const fallbackImage = collection.image.src
    const images = (rawImages.length ? rawImages : [fallbackImage]).map((src, index) => ({ src, alt: `${asText(first.record.base_title ?? first.record.title)}, изображение ${index + 1}` }))
    const groupName = objectTitle(first.record.type) || asText(first.record.first_type) || 'Товары'
    const groupId = asId(first.record.type?.id) ? `unitex-type-${asId(first.record.type.id)}` : `unitex-group-${slugify(groupName)}`
    const variants = items.map(({ record, variantRawId, price, article }) => {
      const sourceImages = productImages(record)
      const imageIndex = Math.max(0, images.findIndex(image => sourceImages.includes(image.src)))
      const stockQuantity = Math.max(0, Math.floor(toNumber(record.stock_count ?? record.stock_qty) ?? 0))
      const productionDays = Math.max(0, Math.floor(toNumber(record.production_days ?? record.delivery) ?? 0))
      return {
        id: `unitex-variant-${variantRawId}`,
        article,
        color: getColor(record),
        dimensions: {
          width: readDimension(record, 'width'),
          depth: readDimension(record, 'depth'),
          height: readDimension(record, 'height'),
          label: `${readDimension(record, 'width')} × ${readDimension(record, 'depth')} × ${readDimension(record, 'height')} мм`,
        },
        price,
        ...(toNumber(record.price_old) > 0 ? { oldPrice: toNumber(record.price_old) } : {}),
        availability: stockQuantity > 0 ? 'in-stock' : 'on-order',
        stockQuantity,
        ...(productionDays > 0 ? { productionDays } : {}),
        imageIndex,
      }
    })
    const features = unique(items.flatMap(({ record }) => [
      ...extractListItems(record.description),
      ...extractListItems(record.tech_overview),
      ...extractListItems(record.features),
    ])).slice(0, 30)
    const tech = first.record.tech && typeof first.record.tech === 'object' && !Array.isArray(first.record.tech) ? first.record.tech : {}
    const producer = config.productionOurOnly ? 'Юнитекс' : objectTitle(first.record.producer)
    const country = objectTitle(first.record.country)
    const warrantyMonths = Math.max(...items.map(item => toNumber(item.record.guarantee) ?? 0))
    products.push({
      id: `unitex-product-${first.baseRawId}`,
      slug: `unitex-product-${first.baseRawId}`,
      name: asText(first.record.base_title ?? first.record.title),
      categoryId: collection.categoryId,
      collectionId: collection.id,
      groupId,
      description: chooseDescription(first.record.description, first.record.tech_overview, collection.description),
      images,
      variants,
      specifications: {
        ...Object.fromEntries(Object.entries(tech).map(([key, value]) => [htmlToText(key), htmlToText(objectTitle(value) || value)]).filter(([key, value]) => key && value)),
        ...(producer ? { Производитель: producer } : {}),
        ...(country ? { Страна: country } : {}),
      },
      materials: unique(variants.map(variant => variant.color.material).filter(Boolean)),
      warranty: warrantyMonths > 0 ? `${warrantyMonths} мес.` : 'Уточняется у менеджера.',
      features,
      isNew: Boolean(first.record.is_novelty ?? first.record.novelty),
      isRecommended: Boolean(first.record.is_recommended ?? first.record.recommended),
    })
    if (!collection.groups.some(group => group.id === groupId)) collection.groups.push({ id: groupId, name: groupName, description: `${groupName} серии ${collection.name}.` })
  }

  for (const collection of collections) {
    const collectionProducts = products.filter(product => product.collectionId === collection.id)
    collection.colors = unique(collectionProducts.flatMap(product => product.variants.map(variant => JSON.stringify(variant.color)))).map(value => JSON.parse(value))
    const prices = collectionProducts.flatMap(product => product.variants.map(variant => variant.price)).filter(price => price > 0)
    collection.priceFrom = prices.length ? Math.min(...prices) : 0
  }

  const foundBases = new Set(usable.map(item => item.baseRawId))
  const foundVariants = new Set(usable.map(item => item.variantRawId))
  const missingBase = config.allowedBaseProductIds.filter(id => !foundBases.has(id))
  const missingVariants = config.allowedVariantIds.filter(id => !foundVariants.has(id))
  const missingAllowedProductIds = [...missingBase.map(id => `base:${id}`), ...missingVariants.map(id => `variant:${id}`)]
  if (missingAllowedProductIds.length) warnings.push(`Не найдены разрешённые позиции: ${missingAllowedProductIds.join(', ')}.`)
  const tokenTillIso = apiDateToIso(tokenTill)
  if (tokenTillIso && new Date(tokenTillIso).getTime() <= nowDate.getTime()) throw new Error(`Срок действия токена Unitex истёк (${tokenTillIso}).`)
  if (tokenTillIso && new Date(tokenTillIso).getTime() - nowDate.getTime() < 24 * 60 * 60_000) warnings.push(`Срок действия токена истекает менее чем через сутки (${tokenTillIso}).`)

  const snapshot = { categories: [...categoryMap.values()], collections, products }
  validateCatalogSnapshot(snapshot)
  const serialized = `${JSON.stringify(snapshot, null, 2)}\n`
  const metadata = {
    syncedAt: nowDate.toISOString(),
    apiVersion: asText(apiVersion) || 'unknown',
    tokenTill: tokenTillIso,
    seriesCount: collections.length,
    productCount: products.length,
    variantCount: products.reduce((sum, product) => sum + product.variants.length, 0),
    missingAllowedProductIds,
    warnings,
    checksum: createHash('sha256').update(serialized).digest('hex'),
  }
  return { snapshot, serialized, metadata, warnings, missingAllowedProductIds }
}

export const validateCatalogSnapshot = (snapshot) => {
  if (!snapshot || typeof snapshot !== 'object' || !Array.isArray(snapshot.categories) || !snapshot.categories.length
    || !Array.isArray(snapshot.collections) || !snapshot.collections.length || !Array.isArray(snapshot.products) || !snapshot.products.length) {
    throw new Error('Сформирован пустой или некорректный каталог.')
  }
  const categoryIds = new Set(snapshot.categories.map(category => asId(category?.id)))
  const collectionIds = new Set(snapshot.collections.map(collection => asId(collection?.id)))
  const productIds = new Set()
  const variantIds = new Set()
  for (const product of snapshot.products) {
    if (!asId(product?.id) || productIds.has(product.id) || !asText(product.name) || !categoryIds.has(asId(product.categoryId))
      || !collectionIds.has(asId(product.collectionId)) || !Array.isArray(product.images) || !product.images.length
      || !Array.isArray(product.variants) || !product.variants.length) throw new Error('Сформирован каталог с повреждённым товаром.')
    productIds.add(product.id)
    for (const variant of product.variants) {
      if (!asId(variant?.id) || variantIds.has(variant.id) || !asText(variant.article) || toNumber(variant.price) === undefined || variant.price < 0
        || !['in-stock', 'on-order'].includes(variant.availability) || !variant.dimensions || !variant.color) throw new Error(`Повреждён вариант товара ${product.id}.`)
      variantIds.add(variant.id)
    }
  }
  return snapshot
}

const writeVerifiedTemp = async (targetPath, contents, validator) => {
  const temporaryPath = `${targetPath}.${process.pid}.${Date.now()}.tmp`
  const handle = await open(temporaryPath, 'wx', 0o600)
  try {
    await handle.writeFile(contents, 'utf8')
    await handle.sync()
  } finally {
    await handle.close()
  }
  const written = await readFile(temporaryPath, 'utf8')
  validator(written)
  return temporaryPath
}

const atomicReplace = async (targetPath, contents, validator) => {
  const temporaryPath = await writeVerifiedTemp(targetPath, contents, validator)
  try {
    await rename(temporaryPath, targetPath)
  } catch (error) {
    await unlink(temporaryPath).catch(() => {})
    throw error
  }
}

const acquireLock = async (storageDir, timeoutMs) => {
  await mkdir(storageDir, { recursive: true })
  const lockPath = resolve(storageDir, LOCK_FILE)
  try {
    const handle = await open(lockPath, 'wx', 0o600)
    await handle.writeFile(JSON.stringify({ pid: process.pid, startedAt: new Date().toISOString() }))
    await handle.close()
    return async () => { await unlink(lockPath).catch(() => {}) }
  } catch (error) {
    if (error?.code !== 'EEXIST') throw error
    const info = await stat(lockPath).catch(() => null)
    if (info && Date.now() - info.mtimeMs > timeoutMs * 2) {
      await unlink(lockPath)
      return acquireLock(storageDir, timeoutMs)
    }
    throw new Error('Синхронизация Unitex уже выполняется (активен lock-файл).')
  }
}

const publish = async (storageDir, serialized, metadata, warnings) => {
  const currentPath = resolve(storageDir, CURRENT_FILE)
  const lastGoodPath = resolve(storageDir, LAST_GOOD_FILE)
  const metaPath = resolve(storageDir, META_FILE)
  try {
    const current = await readFile(currentPath, 'utf8')
    validateCatalogSnapshot(JSON.parse(current))
    await atomicReplace(lastGoodPath, current, value => validateCatalogSnapshot(JSON.parse(value)))
  } catch (error) {
    if (error?.code !== 'ENOENT') warnings.push('Предыдущий рабочий снимок был повреждён и не заменил last-good.')
  }
  await atomicReplace(currentPath, serialized, value => validateCatalogSnapshot(JSON.parse(value)))
  const metadataText = `${JSON.stringify(metadata, null, 2)}\n`
  await atomicReplace(metaPath, metadataText, value => {
    const parsed = JSON.parse(value)
    if (parsed.checksum !== metadata.checksum) throw new Error('Контрольная сумма метаданных не совпадает.')
  })
}

export const syncUnitexCatalog = async ({
  dryRun = false,
  env = process.env,
  configPath = defaultConfigPath,
  storageDir: storageDirOverride,
  fetchImpl = fetch,
  sleepFn = wait,
  now = () => new Date(),
  testMinIntervalMs,
  onProgress = () => {},
} = {}) => {
  const token = asText(env.UNITEX_API_TOKEN)
  if (!token) throw new Error('UNITEX_API_TOKEN не задан.')
  const storageValue = asText(storageDirOverride || env.UNITEX_CATALOG_STORAGE_DIR)
  if (!storageValue) throw new Error('UNITEX_CATALOG_STORAGE_DIR не задан.')
  const storageDir = resolve(storageValue)
  const timeoutMs = Math.max(30_000, Math.floor(toNumber(env.UNITEX_SYNC_TIMEOUT_MS) ?? DEFAULT_TIMEOUT_MS))
  const maxRetries = Math.max(0, Math.min(8, Math.floor(toNumber(env.UNITEX_SYNC_MAX_RETRIES) ?? 4)))
  const releaseLock = await acquireLock(storageDir, timeoutMs)
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  timeout.unref?.()
  try {
    const config = normalizeConfig(JSON.parse(await readFile(configPath, 'utf8')), env.UNITEX_SYNC_CITY)
    const request = createUnitexClient({
      token,
      apiBaseUrl: env.UNITEX_API_BASE_URL,
      fetchImpl,
      sleepFn,
      signal: controller.signal,
      maxRetries,
      minIntervalMs: testMinIntervalMs ?? MIN_REQUEST_INTERVAL_MS,
    })
    const { records: seriesRecords, envelopes: seriesEnvelopes } = await loadSelectedRecords({
      request,
      resource: 'series',
      codes: config.allowedSeriesCodes,
      city: config.city,
      sleepFn,
      signal: controller.signal,
    })
    const { records: setRecords, envelopes: setEnvelopes } = await loadSelectedRecords({
      request,
      resource: 'sets',
      codes: config.allowedSetCodes,
      city: config.city,
      sleepFn,
      signal: controller.signal,
    })
    const manualSeriesEnvelopes = []
    const manualSeriesRecords = []
    const articleEnvelopeByType = new Map()
    for (const item of config.manualSeries) {
      let productIds = []
      if (item.articlePrefixes.length) {
        let envelope = articleEnvelopeByType.get(item.typeId)
        if (!envelope) {
          envelope = await request('products', { types: item.typeId, city: config.city, formatting: 0, list_value: 'art' })
          articleEnvelopeByType.set(item.typeId, envelope)
          manualSeriesEnvelopes.push(envelope)
        }
        if (!envelope.data || typeof envelope.data !== 'object' || Array.isArray(envelope.data)) {
          throw new Error(`Unitex products: некорректный список артикулов для ручной серии ${item.id}.`)
        }
        const prefixes = item.articlePrefixes.map(prefix => prefix.toLocaleLowerCase('ru-RU'))
        productIds = Object.entries(envelope.data)
          .filter(([, article]) => prefixes.some(prefix => asText(article).toLocaleLowerCase('ru-RU').startsWith(prefix)))
          .map(([id]) => asId(id))
      }
      if (item.sourceSeriesCode && item.requiredSeriesCode) {
        const sourceSeries = seriesRecords.find(record => asId(record?.id ?? record?.code) === item.sourceSeriesCode)
        if (!sourceSeries) throw new Error(`Для ручной серии Unitex ${item.id} не найдена исходная серия ${item.sourceSeriesCode}.`)
        const sourceIds = asArray(sourceSeries.products_ids ?? sourceSeries.products).map(asId)
        const candidates = productIds.length ? sourceIds.filter(id => productIds.includes(id)) : sourceIds
        const relatedIds = []
        for (const batch of chunks(candidates, MAX_BATCH_SIZE)) {
          const envelope = await request('products', { ids: batch.join(','), city: config.city, currency: config.currency, formatting: 0 })
          manualSeriesEnvelopes.push(envelope)
          for (const record of asEntries(envelope.data)) {
            if (record && typeof record === 'object' && Object.hasOwn(record.series ?? {}, item.requiredSeriesCode)) relatedIds.push(asId(record.id))
          }
        }
        productIds = relatedIds
      }
      productIds = unique(productIds)
      if (!productIds.length) throw new Error(`Для ручной серии Unitex ${item.id} не найдено подходящих товаров.`)
      manualSeriesRecords.push({
        id: item.id,
        title: item.title,
        title_short: item.title,
        description: item.description,
        category: { id: item.categoryId, title: item.categoryTitle },
        producer: { id: 24, title: item.producerTitle },
        country: { title: item.countryTitle },
        images: item.images,
        products_ids: productIds,
      })
    }
    const collectionRecords = [...seriesRecords, ...setRecords, ...manualSeriesRecords]
    const membership = new Map()
    for (const series of seriesRecords) {
      const seriesCode = asId(series.id ?? series.code)
      for (const id of asArray(series.products_ids ?? series.products).map(asId)) if (!membership.has(id)) membership.set(id, seriesCode)
    }
    for (const set of setRecords) {
      const setCode = asId(set.id ?? set.code)
      for (const id of asArray(set.products_ids ?? set.products).map(asId)) membership.set(id, setCode)
    }
    for (const series of manualSeriesRecords) {
      const seriesCode = asId(series.id)
      for (const id of asArray(series.products_ids).map(asId)) membership.set(id, seriesCode)
    }
    let requestedVariantIds = [...membership.keys()]
    if (config.productionOurOnly) {
      const productionEnvelope = await request('products', { city: config.city, formatting: 0, list_value: 'production_our' })
      const ownProductionIds = selectOwnProductionIds(productionEnvelope)
      requestedVariantIds = requestedVariantIds.filter(id => ownProductionIds.has(id))
    }
    if (config.allowedVariantIds.length) requestedVariantIds = requestedVariantIds.filter(id => config.allowedVariantIds.includes(id))
    if (!requestedVariantIds.length) throw new Error('После применения белого списка не осталось вариантов для запроса.')
    const detailEnvelopes = []
    const productRecords = []
    const batches = chunks(requestedVariantIds, MAX_BATCH_SIZE)
    onProgress({ phase: 'products', completed: 0, total: requestedVariantIds.length, batch: 0, batches: batches.length })
    for (const [index, batch] of batches.entries()) {
      const envelope = await request('products', { ids: batch.join(','), city: config.city, currency: config.currency, formatting: 0 })
      detailEnvelopes.push(envelope)
      productRecords.push(...asEntries(envelope.data))
      onProgress({ phase: 'products', completed: Math.min((index + 1) * MAX_BATCH_SIZE, requestedVariantIds.length), total: requestedVariantIds.length, batch: index + 1, batches: batches.length })
    }
    if (!productRecords.length) throw new Error('Unitex вернул пустой список подробных данных товаров.')
    const tokenTill = detailEnvelopes.map(item => item.token_till).find(Boolean)
      ?? manualSeriesEnvelopes.map(item => item.token_till).find(Boolean)
      ?? seriesEnvelopes.map(item => item.token_till).find(Boolean)
      ?? setEnvelopes.map(item => item.token_till).find(Boolean)
    const apiVersion = detailEnvelopes.map(item => item.version).find(Boolean)
      ?? manualSeriesEnvelopes.map(item => item.version).find(Boolean)
      ?? seriesEnvelopes.map(item => item.version).find(Boolean)
      ?? setEnvelopes.map(item => item.version).find(Boolean)
    const result = transform({ seriesRecords: collectionRecords, productRecords, membership, config, apiVersion, tokenTill, nowDate: now() })
    if (!dryRun) await publish(storageDir, result.serialized, result.metadata, result.warnings)
    return {
      dryRun,
      seriesCount: result.metadata.seriesCount,
      productCount: result.metadata.productCount,
      variantCount: result.metadata.variantCount,
      warnings: result.warnings,
      missingAllowedProductIds: result.missingAllowedProductIds,
      snapshot: result.snapshot,
      metadata: result.metadata,
    }
  } finally {
    clearTimeout(timeout)
    await releaseLock()
  }
}

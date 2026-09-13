import { createHash } from 'node:crypto'
import { mkdir, open, readFile, rename, stat, unlink } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sax from 'sax'

const DEFAULT_TIMEOUT_MS = 2 * 60 * 60_000
const CURRENT_FILE = 'rivaCatalog.json'
const LAST_GOOD_FILE = 'rivaCatalog.last-good.json'
const META_FILE = 'rivaCatalog.meta.json'
const LOCK_FILE = 'riva-sync.lock'
const moduleDir = dirname(fileURLToPath(import.meta.url))
const defaultConfigPath = resolve(moduleDir, '..', '..', 'config', 'riva-sync.json')

const categoryDetails = {
  'executive-offices': ['Кабинеты руководителя', 'Кабинеты и мебель для руководителей.'],
  'staff-furniture': ['Мебель для персонала', 'Рабочие места и мебель для персонала.'],
  'reception-desks': ['Стойки ресепшн', 'Стойки и модули для входных зон.'],
  chairs: ['Кресла и стулья', 'Офисные кресла и стулья.'],
  'meeting-areas': ['Зоны переговоров', 'Мебель для переговорных и конференц-зон.'],
  'storage-systems': ['Системы хранения', 'Шкафы, тумбы и стеллажи.'],
  'hotel-furniture': ['Мебель для дома и гостиниц', 'Мебель для дома, гостиниц и общественных пространств.'],
  'sofas-and-armchairs': ['Диваны и кресла', 'Мягкая мебель для офиса и общественных пространств.'],
  'acoustic-solutions': ['Акустические решения', 'Акустические кабины, панели и экраны.'],
  'coffee-tables': ['Журнальные столы', 'Журнальные и приставные столы.'],
  'adjustable-desks': ['Столы с регулировкой высоты', 'Столы с электрической регулировкой высоты.'],
}

const asText = value => value == null ? '' : String(value).trim()
const asId = value => asText(value)
const unique = values => [...new Set(values.filter(Boolean))]
const toNumber = (value) => {
  const text = asText(value).replace(/\s/g, '').replace(',', '.')
  if (!text) return undefined
  const number = Number(text)
  return Number.isFinite(number) ? number : undefined
}
const wait = (milliseconds, signal) => new Promise((resolvePromise, reject) => {
  if (milliseconds <= 0) return resolvePromise()
  const timer = setTimeout(resolvePromise, milliseconds)
  signal?.addEventListener('abort', () => {
    clearTimeout(timer)
    reject(new Error('Превышен общий таймаут синхронизации Riva.'))
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

const slugify = value => asText(value).toLocaleLowerCase('ru-RU')
  .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-zа-яё0-9]+/gi, '-').replace(/^-+|-+$/g, '') || 'item'

const safeImageUrl = (value) => {
  try {
    const url = new URL(asText(value))
    if (url.protocol !== 'https:' || !(url.hostname === 'riva.ru' || url.hostname.endsWith('.riva.ru'))) return ''
    return url.toString()
  } catch {
    return ''
  }
}

const colorPalette = ['#B89466', '#D8C3A0', '#6D4935', '#4B4D4C', '#1D1D1D', '#F0F0EC', '#999B98', '#496459', '#485B78', '#7D6757']
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

const attr = (node, name) => {
  const entry = Object.entries(node?.attributes ?? {}).find(([key]) => key.toLowerCase() === name.toLowerCase())
  const value = entry?.[1]
  return asText(value && typeof value === 'object' && 'value' in value ? value.value : value)
}

const normalizeConfig = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Конфигурация Riva должна быть JSON-объектом.')
  const feedTypes = unique((Array.isArray(value.feedTypes) ? value.feedTypes : []).map(item => String(Math.floor(toNumber(item) ?? 0))))
    .map(Number).filter(item => item >= 1 && item <= 19)
  if (!feedTypes.length) throw new Error('В конфигурации Riva не выбраны типы выгрузок.')
  if (!value.categoryByRootId || typeof value.categoryByRootId !== 'object' || Array.isArray(value.categoryByRootId)) {
    throw new Error('categoryByRootId должен быть объектом.')
  }
  const categoryByRootId = Object.fromEntries(Object.entries(value.categoryByRootId).map(([key, categoryId]) => [asId(key), asId(categoryId)]).filter(([, categoryId]) => categoryId))
  if (!Object.keys(categoryByRootId).length) throw new Error('Не задано сопоставление корневых категорий Riva.')
  const maxImagesPerProduct = Math.floor(toNumber(value.maxImagesPerProduct) ?? 12)
  if (maxImagesPerProduct < 1 || maxImagesPerProduct > 50) throw new Error('maxImagesPerProduct должен быть от 1 до 50.')
  return { feedTypes, categoryByRootId, maxImagesPerProduct }
}

const isAllowedRedirect = (target, base) => {
  const localHosts = new Set(['localhost', '127.0.0.1'])
  if (target.protocol !== 'https:' && !localHosts.has(target.hostname)) return false
  if (target.hostname === base.hostname) return true
  return target.hostname === 'riva.ru' || target.hostname.endsWith('.riva.ru')
}

const fetchWithRetries = async ({ url, fetchImpl, signal, maxRetries, sleepFn, options = {} }) => {
  for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
    let response
    try {
      response = await fetchImpl(url, { cache: 'no-store', signal, ...options })
    } catch (error) {
      if (signal?.aborted) throw new Error('Превышен общий таймаут синхронизации Riva.')
      if (attempt >= maxRetries) throw new Error('Riva API: сетевая ошибка.')
      await sleepFn(1_000 * (2 ** attempt), signal)
      continue
    }
    if ([429, 500, 502, 503, 504].includes(response.status) && attempt < maxRetries) {
      const retryAfter = Number(response.headers?.get?.('retry-after'))
      await sleepFn(Math.max(1_000 * (2 ** attempt), Number.isFinite(retryAfter) ? retryAfter * 1000 : 0), signal)
      continue
    }
    return response
  }
  throw new Error('Riva API: исчерпаны повторы запроса.')
}

export const openRivaFeed = async ({ type, apiId, apiBaseUrl = 'https://riva.ru/api/', fetchImpl = fetch, signal, maxRetries = 3, sleepFn = wait }) => {
  if (!asText(apiId)) throw new Error('RIVA_API_ID не задан.')
  const apiUrl = new URL(apiBaseUrl)
  if (apiUrl.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(apiUrl.hostname)) throw new Error('RIVA_API_BASE_URL должен использовать HTTPS.')
  apiUrl.searchParams.set('id', apiId)
  apiUrl.searchParams.set('type', String(type))
  const initial = await fetchWithRetries({
    url: apiUrl,
    fetchImpl,
    signal,
    maxRetries,
    sleepFn,
    options: { redirect: 'manual', headers: { accept: 'application/xml,text/xml' } },
  })
  if (initial.status >= 300 && initial.status < 400) {
    const location = initial.headers?.get?.('location')
    if (!location) throw new Error(`Riva type=${type}: сервер вернул редирект без адреса выгрузки.`)
    const target = new URL(location, apiUrl)
    if (!isAllowedRedirect(target, apiUrl)) throw new Error(`Riva type=${type}: небезопасный адрес выгрузки.`)
    const response = await fetchWithRetries({
      url: target,
      fetchImpl,
      signal,
      maxRetries,
      sleepFn,
      options: { redirect: 'error', headers: { accept: 'application/xml,text/xml' } },
    })
    if (!response.ok) throw new Error(`Riva type=${type}: HTTP ${response.status}.`)
    return response
  }
  if (!initial.ok) throw new Error(`Riva type=${type}: HTTP ${initial.status}.`)
  return initial
}

export const parseRivaXml = async ({ response, onCategory, onOffer, onBytes = () => {} }) => {
  if (!response?.body) throw new Error('Riva вернула пустую XML-выгрузку.')
  const parser = sax.parser(true, { trim: false, normalize: false })
  const stack = []
  let category
  let offer
  let capture
  let parseError
  let categoryCount = 0
  let offerCount = 0

  const finishCapture = () => {
    const value = asText(capture?.text)
    if (!capture || !offer) return
    if (capture.name === 'picture') offer.pictures.push(value)
    else if (capture.name === 'param') {
      if (capture.paramName && value) offer.params[capture.paramName] = value
    } else if (capture.name) offer[capture.name] = value
    capture = undefined
  }

  parser.onerror = error => { parseError = error }
  parser.onopentag = (node) => {
    const name = node.name.toLowerCase()
    const parent = stack.at(-1)
    stack.push(name)
    if (name === 'category' && parent === 'categories') {
      category = { id: attr(node, 'id'), parentId: attr(node, 'parentId'), text: '' }
      return
    }
    if (name === 'offer' && parent === 'offers') {
      offer = { id: attr(node, 'id'), groupId: attr(node, 'group_id'), available: attr(node, 'available'), pictures: [], params: {} }
      return
    }
    if (offer && parent === 'offer') {
      capture = { name, text: '', depth: stack.length, paramName: name === 'param' ? attr(node, 'name') : '' }
    } else if (offer && capture) capture.text += ' '
  }
  parser.ontext = (text) => {
    if (category) category.text += text
    if (capture) capture.text += text
  }
  parser.oncdata = (text) => {
    if (category) category.text += text
    if (capture) capture.text += text
  }
  parser.onclosetag = (rawName) => {
    const name = rawName.toLowerCase()
    if (capture && name === capture.name && stack.length === capture.depth) finishCapture()
    if (name === 'category' && category) {
      const normalized = { id: category.id, parentId: category.parentId, name: htmlToText(category.text) }
      if (normalized.id && normalized.name) {
        onCategory(normalized)
        categoryCount += 1
      }
      category = undefined
    }
    if (name === 'offer' && offer) {
      onOffer(offer)
      offerCount += 1
      offer = undefined
      capture = undefined
    }
    stack.pop()
  }

  const decoder = new TextDecoder()
  let bytes = 0
  try {
    for await (const chunk of response.body) {
      const buffer = chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk)
      bytes += buffer.byteLength
      parser.write(decoder.decode(buffer, { stream: true }))
      if (parseError) throw parseError
      onBytes(bytes)
    }
    parser.write(decoder.decode())
    parser.close()
    if (parseError) throw parseError
  } catch (error) {
    throw new Error(`Riva вернула повреждённый XML: ${error instanceof Error ? error.message : 'ошибка разбора'}`)
  }
  if (!offerCount) throw new Error('Riva вернула XML без товаров.')
  return { bytes, categoryCount, offerCount }
}

const readParam = (params, exactNames, pattern) => {
  for (const name of exactNames) if (asText(params[name])) return asText(params[name])
  const entry = Object.entries(params).find(([name, value]) => pattern?.test(name) && asText(value))
  return asText(entry?.[1])
}

const parseDimensions = (params) => {
  const raw = readParam(params, ['Размер', 'Размеры'], /размер/i)
  const numbers = (raw.match(/\d+(?:[.,]\d+)?/g) ?? []).slice(0, 3).map(item => Math.max(0, toNumber(item) ?? 0))
  const width = numbers[0] ?? Math.max(0, toNumber(readParam(params, ['Ширина'], /ширин/i)) ?? 0)
  const depth = numbers[1] ?? Math.max(0, toNumber(readParam(params, ['Глубина'], /глубин/i)) ?? 0)
  const height = numbers[2] ?? Math.max(0, toNumber(readParam(params, ['Высота'], /высот/i)) ?? 0)
  return { width, depth, height, label: raw || [width, depth, height].filter(Boolean).join(' × ') }
}

const cleanProductName = (offer) => {
  let name = htmlToText(offer.name)
  const removable = [
    readParam(offer.params, ['Артикул'], /артикул/i),
    readParam(offer.params, ['Цвет изделия'], /^цвет изделия$/i),
  ].filter(value => value.length >= 3).sort((a, b) => b.length - a.length)
  for (const value of removable) name = name.replaceAll(value, ' ')
  return name
    .replace(/(\d)\s*[*xх]\s*(?=\d)/gi, '$1 × ')
    .replace(/[;,|/]+\s*$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim() || htmlToText(offer.name) || `Товар Riva ${offer.id}`
}

const resolveCategoryPath = (categoryId, categoryMap) => {
  const path = []
  const seen = new Set()
  let current = categoryMap.get(asId(categoryId))
  while (current && !seen.has(current.id) && path.length < 30) {
    path.unshift(current)
    seen.add(current.id)
    current = categoryMap.get(current.parentId)
  }
  return path
}

const normalizeVariant = (offer) => {
  const price = toNumber(offer.price)
  if (price === undefined || price < 0) return null
  const article = readParam(offer.params, ['Артикул'], /артикул/i) || `RIVA-${offer.id}`
  const colorName = readParam(offer.params, ['Цвет изделия'], /^цвет изделия$/i)
    || readParam(offer.params, [], /цвет/i) || 'По каталогу Riva'
  const material = readParam(offer.params, ['Материал'], /материал/i)
  const count = Math.max(0, Math.floor(toNumber(offer.count) ?? 0))
  const imageUrl = unique(offer.pictures.map(safeImageUrl))[0] || ''
  return {
    id: `riva-variant-${offer.id}`,
    article,
    color: { id: `riva-color-${slugify(colorName)}`, name: colorName, hex: colorHex(colorName), ...(material ? { material } : {}) },
    dimensions: parseDimensions(offer.params),
    price,
    ...(toNumber(offer.oldprice) !== undefined && toNumber(offer.oldprice) > price ? { oldPrice: toNumber(offer.oldprice) } : {}),
    availability: count > 0 ? 'in-stock' : 'on-order',
    stockQuantity: count,
    imageIndex: 0,
    _imageUrl: imageUrl,
  }
}

const offerFeatures = params => Object.entries(params)
  .filter(([name, value]) => name && asText(value) && !/остаток|цена|артикул|цвет изделия|размер/i.test(name))
  .slice(0, 12)
  .map(([name, value]) => `${htmlToText(name)}: ${htmlToText(value)}`)

const createAggregator = (config) => {
  const categoryTree = new Map()
  const categories = new Map()
  const collections = new Map()
  const products = new Map()
  const seenOffers = new Set()
  const warnings = []
  let duplicateOfferCount = 0

  const addCategory = category => categoryTree.set(category.id, category)
  const addOffer = (offer) => {
    const offerId = asId(offer.id)
    if (!offerId) {
      warnings.push('Пропущена позиция Riva без ID.')
      return
    }
    if (seenOffers.has(offerId)) {
      duplicateOfferCount += 1
      return
    }
    seenOffers.add(offerId)
    const path = resolveCategoryPath(offer.categoryid, categoryTree)
    const rootIndex = path.findIndex(item => config.categoryByRootId[item.id])
    if (rootIndex < 0) {
      warnings.push(`Позиция Riva ${offerId} пропущена: категория ${asId(offer.categoryid) || '(пусто)'} не сопоставлена.`)
      return
    }
    const root = path[rootIndex]
    const targetCategoryId = config.categoryByRootId[root.id]
    const collectionNode = path[rootIndex + 1] ?? root
    const groupNode = path.at(-1) ?? collectionNode
    const images = unique(offer.pictures.map(safeImageUrl)).slice(0, config.maxImagesPerProduct)
    const variant = normalizeVariant(offer)
    if (!variant) {
      warnings.push(`Позиция Riva ${offerId} пропущена: некорректная цена.`)
      return
    }

    const [categoryName, categoryDescription] = categoryDetails[targetCategoryId] ?? [root.name, `${root.name}.`]
    const category = categories.get(targetCategoryId) ?? {
      id: targetCategoryId,
      slug: targetCategoryId,
      name: categoryName,
      description: categoryDescription,
      image: { src: '', alt: categoryName },
      subcategories: [],
    }
    if (!category.image.src && images[0]) category.image.src = images[0]
    categories.set(targetCategoryId, category)

    const collectionId = `riva-collection-${collectionNode.id}`
    const collectionName = collectionNode.name || root.name
    const collection = collections.get(collectionId) ?? {
      id: collectionId,
      slug: collectionId,
      name: collectionName,
      categoryId: targetCategoryId,
      description: `${collectionName} от Riva.`,
      image: { src: '', alt: collectionName },
      images: [],
      colors: [],
      priceFrom: 0,
      groups: [],
      specifications: { Производитель: 'Riva' },
      relatedCollectionIds: [],
      isFeatured: false,
    }
    if (!collection.image.src && images[0]) collection.image.src = images[0]
    for (const src of images) if (!collection.images.some(image => image.src === src) && collection.images.length < config.maxImagesPerProduct) {
      collection.images.push({ src, alt: `${collectionName}, изображение ${collection.images.length + 1}` })
    }
    const groupId = `riva-group-${groupNode.id}`
    if (!collection.groups.some(group => group.id === groupId)) {
      collection.groups.push({ id: groupId, name: groupNode.name || collectionName, description: `${groupNode.name || collectionName} от Riva.` })
    }
    collections.set(collectionId, collection)

    const sourceGroupId = asId(offer.groupId) || offerId
    const productId = `riva-product-${sourceGroupId}`
    const product = products.get(productId) ?? {
      id: productId,
      slug: productId,
      name: cleanProductName(offer),
      categoryId: targetCategoryId,
      collectionId,
      groupId,
      description: htmlToText(offer.description) || `${cleanProductName(offer)} от Riva.`,
      _images: new Set(),
      variants: [],
      specifications: {
        Производитель: 'Riva',
        ...(asText(offer.url) ? { 'Страница поставщика': asText(offer.url) } : {}),
      },
      materials: new Set(),
      warranty: readParam(offer.params, ['Гарантия'], /гарант/i) || 'Уточняется у менеджера.',
      features: offerFeatures(offer.params),
      isNew: false,
      isRecommended: false,
    }
    for (const src of images) if (product._images.size < config.maxImagesPerProduct) product._images.add(src)
    if (variant.color.material) product.materials.add(variant.color.material)
    product.variants.push(variant)
    products.set(productId, product)
  }

  const finish = () => {
    const normalizedProducts = []
    for (const product of products.values()) {
      // Reserve the image budget for the primary photo of each variant first.
      // Otherwise the extra angles of the first color can fill the whole limit
      // and later color variants incorrectly fall back to image zero.
      const variantImageUrls = unique(product.variants.map(variant => variant._imageUrl).filter(Boolean))
      const imageLimit = Math.max(config.maxImagesPerProduct, variantImageUrls.length)
      const imageUrls = unique([...variantImageUrls, ...product._images]).slice(0, imageLimit)
      if (!imageUrls.length) {
        warnings.push(`Товар Riva ${product.id} пропущен: нет безопасного изображения.`)
        continue
      }
      const firstImageByColor = new Map()
      for (const variant of product.variants) {
        if (imageUrls.includes(variant._imageUrl) && !firstImageByColor.has(variant.color.id)) {
          firstImageByColor.set(variant.color.id, variant._imageUrl)
        }
      }
      const variants = product.variants.map(({ _imageUrl, ...variant }) => {
        const mappedImage = imageUrls.includes(_imageUrl) ? _imageUrl : firstImageByColor.get(variant.color.id)
        return {
          ...variant,
          imageIndex: Math.max(0, imageUrls.indexOf(mappedImage)),
        }
      })
      normalizedProducts.push({
        ...product,
        images: imageUrls.map((src, index) => ({ src, alt: `${product.name}, изображение ${index + 1}` })),
        variants,
        materials: [...product.materials],
        _images: undefined,
      })
      delete normalizedProducts.at(-1)._images
    }
    const usedCollectionIds = new Set(normalizedProducts.map(product => product.collectionId))
    const normalizedCollections = [...collections.values()].filter(collection => usedCollectionIds.has(collection.id) && collection.image.src)
    for (const collection of normalizedCollections) {
      const collectionProducts = normalizedProducts.filter(product => product.collectionId === collection.id)
      collection.colors = unique(collectionProducts.flatMap(product => product.variants.map(variant => JSON.stringify(variant.color)))).map(value => JSON.parse(value))
      const prices = collectionProducts.flatMap(product => product.variants.map(variant => variant.price)).filter(price => price > 0)
      collection.priceFrom = prices.length ? Math.min(...prices) : 0
    }
    const usedCategoryIds = new Set(normalizedCollections.map(collection => collection.categoryId))
    const normalizedCategories = [...categories.values()].filter(category => usedCategoryIds.has(category.id) && category.image.src)
    const snapshot = { categories: normalizedCategories, collections: normalizedCollections, products: normalizedProducts }
    validateCatalogSnapshot(snapshot)
    return { snapshot, warnings, uniqueOfferCount: seenOffers.size, duplicateOfferCount }
  }
  return { addCategory, addOffer, finish, get uniqueOfferCount() { return seenOffers.size } }
}

export const validateCatalogSnapshot = (snapshot) => {
  if (!snapshot || typeof snapshot !== 'object' || !Array.isArray(snapshot.categories) || !snapshot.categories.length
    || !Array.isArray(snapshot.collections) || !snapshot.collections.length || !Array.isArray(snapshot.products) || !snapshot.products.length) {
    throw new Error('Сформирован пустой или некорректный каталог Riva.')
  }
  const categoryIds = new Set()
  for (const category of snapshot.categories) {
    if (!asId(category?.id) || categoryIds.has(category.id) || !asText(category?.image?.src)) throw new Error('Каталог Riva содержит повреждённую категорию.')
    categoryIds.add(category.id)
  }
  const collectionIds = new Set()
  for (const collection of snapshot.collections) {
    if (!asId(collection?.id) || collectionIds.has(collection.id) || !categoryIds.has(asId(collection.categoryId)) || !asText(collection?.image?.src)) {
      throw new Error('Каталог Riva содержит повреждённую коллекцию.')
    }
    collectionIds.add(collection.id)
  }
  const productIds = new Set()
  const variantIds = new Set()
  for (const product of snapshot.products) {
    if (!asId(product?.id) || productIds.has(product.id) || !asText(product.name) || !categoryIds.has(asId(product.categoryId))
      || !collectionIds.has(asId(product.collectionId)) || !Array.isArray(product.images) || !product.images.length
      || !Array.isArray(product.variants) || !product.variants.length) throw new Error('Каталог Riva содержит повреждённый товар.')
    productIds.add(product.id)
    for (const variant of product.variants) {
      if (!asId(variant?.id) || variantIds.has(variant.id) || !asText(variant.article) || toNumber(variant.price) === undefined || variant.price < 0
        || !['in-stock', 'on-order'].includes(variant.availability) || !variant.dimensions || !variant.color) {
        throw new Error(`Повреждён вариант товара ${product.id}.`)
      }
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
    throw new Error('Синхронизация Riva уже выполняется (активен lock-файл).')
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
    if (error?.code !== 'ENOENT') warnings.push('Предыдущий рабочий снимок Riva повреждён и не заменил last-good.')
  }
  await atomicReplace(currentPath, serialized, value => validateCatalogSnapshot(JSON.parse(value)))
  const metadataText = `${JSON.stringify(metadata, null, 2)}\n`
  await atomicReplace(metaPath, metadataText, value => {
    const parsed = JSON.parse(value)
    if (parsed.checksum !== metadata.checksum) throw new Error('Контрольная сумма метаданных Riva не совпадает.')
  })
}

export const syncRivaCatalog = async ({
  dryRun = false,
  env = process.env,
  configPath = defaultConfigPath,
  storageDir: storageDirOverride,
  fetchImpl = fetch,
  sleepFn = wait,
  now = () => new Date(),
  onProgress = () => {},
} = {}) => {
  const apiId = asText(env.RIVA_API_ID)
  if (!apiId) throw new Error('RIVA_API_ID не задан.')
  const storageValue = asText(storageDirOverride || env.RIVA_CATALOG_STORAGE_DIR || env.UNITEX_CATALOG_STORAGE_DIR)
  if (!storageValue) throw new Error('RIVA_CATALOG_STORAGE_DIR или UNITEX_CATALOG_STORAGE_DIR не задан.')
  const storageDir = resolve(storageValue)
  const timeoutMs = Math.max(30_000, Math.floor(toNumber(env.RIVA_SYNC_TIMEOUT_MS) ?? DEFAULT_TIMEOUT_MS))
  const maxRetries = Math.max(0, Math.min(8, Math.floor(toNumber(env.RIVA_SYNC_MAX_RETRIES) ?? 3)))
  const releaseLock = await acquireLock(storageDir, timeoutMs)
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  timeout.unref?.()
  try {
    const config = normalizeConfig(JSON.parse(await readFile(configPath, 'utf8')))
    const aggregator = createAggregator(config)
    const feedStats = []
    let parsedOfferCount = 0
    for (let index = 0; index < config.feedTypes.length; index += 1) {
      const type = config.feedTypes[index]
      onProgress({ phase: 'feed', status: 'start', type, feed: index + 1, feeds: config.feedTypes.length, bytes: 0 })
      const response = await openRivaFeed({
        type,
        apiId,
        apiBaseUrl: env.RIVA_API_BASE_URL,
        fetchImpl,
        signal: controller.signal,
        maxRetries,
        sleepFn,
      })
      let lastReportedBytes = 0
      const stats = await parseRivaXml({
        response,
        onCategory: aggregator.addCategory,
        onOffer: aggregator.addOffer,
        onBytes: (bytes) => {
          if (bytes - lastReportedBytes < 25 * 1024 * 1024) return
          lastReportedBytes = bytes
          onProgress({ phase: 'feed', status: 'download', type, feed: index + 1, feeds: config.feedTypes.length, bytes })
        },
      })
      parsedOfferCount += stats.offerCount
      feedStats.push({ type, ...stats })
      onProgress({
        phase: 'feed', status: 'complete', type, feed: index + 1, feeds: config.feedTypes.length,
        bytes: stats.bytes, offers: stats.offerCount, uniqueOffers: aggregator.uniqueOfferCount,
      })
    }
    const { snapshot, warnings, uniqueOfferCount, duplicateOfferCount } = aggregator.finish()
    const syncedAt = now().toISOString()
    const serialized = `${JSON.stringify(snapshot, null, 2)}\n`
    const metadata = {
      syncedAt,
      feedTypes: config.feedTypes,
      feeds: feedStats,
      categoryCount: snapshot.categories.length,
      collectionCount: snapshot.collections.length,
      productCount: snapshot.products.length,
      variantCount: snapshot.products.reduce((sum, product) => sum + product.variants.length, 0),
      parsedOfferCount,
      uniqueOfferCount,
      duplicateOfferCount,
      warnings,
      checksum: createHash('sha256').update(serialized).digest('hex'),
    }
    if (!dryRun) await publish(storageDir, serialized, metadata, warnings)
    return {
      dryRun,
      snapshot,
      warnings,
      feedCount: config.feedTypes.length,
      productCount: metadata.productCount,
      variantCount: metadata.variantCount,
      uniqueOfferCount,
      duplicateOfferCount,
    }
  } finally {
    clearTimeout(timeout)
    await releaseLock()
  }
}

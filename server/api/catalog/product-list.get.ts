import { isOrderablePrice, productSearchText, productStartingPrice } from '~/data/catalog'
import { loadCatalogState } from '~/server/utils/catalogRepository'
import { toProductCard } from '~/server/utils/catalogProjection'
import type { ProductListFacets } from '~/types/catalog'

let facetCache: { snapshot: object, value: ProductListFacets } | undefined

const colorFacets = [
  { id: 'бел', name: 'Белый', hex: '#F2F1ED' },
  { id: 'черн', name: 'Чёрный', hex: '#1D1D1D' },
  { id: 'сер', name: 'Серый', hex: '#8D908E' },
  { id: 'графит', name: 'Графит', hex: '#4B4D4C' },
  { id: 'антрацит', name: 'Антрацит', hex: '#343638' },
  { id: 'беж', name: 'Бежевый', hex: '#D8C3A0' },
  { id: 'корич', name: 'Коричневый', hex: '#6D4935' },
  { id: 'дуб', name: 'Дуб', hex: '#C7A77A' },
  { id: 'орех', name: 'Орех', hex: '#76513E' },
  { id: 'венге', name: 'Венге', hex: '#3D302A' },
  { id: 'вяз', name: 'Вяз', hex: '#B89466' },
  { id: 'бук', name: 'Бук', hex: '#D1A875' },
  { id: 'клен', name: 'Клён', hex: '#DFC798' },
  { id: 'син', name: 'Синий', hex: '#485B78' },
  { id: 'зелен', name: 'Зелёный', hex: '#496459' },
  { id: 'красн', name: 'Красный', hex: '#8E3E3E' },
]

const normalizeText = (value: unknown) => String(value ?? '').trim().toLocaleLowerCase('ru-RU').replaceAll('ё', 'е')

const numberQuery = (value: unknown) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

const getFacets = (snapshot: Awaited<ReturnType<typeof loadCatalogState>>['snapshot']) => {
  if (facetCache?.snapshot === snapshot) return facetCache.value

  let minimum = Number.POSITIVE_INFINITY
  let maximum = 0
  for (const product of snapshot.products) {
    for (const variant of product.variants) {
      if (isOrderablePrice(variant.price)) {
        minimum = Math.min(minimum, variant.price)
        maximum = Math.max(maximum, variant.price)
      }
    }
  }
  if (!Number.isFinite(minimum)) minimum = 0
  const value = {
    priceFloor: minimum ? Math.floor(minimum / 1000) * 1000 : 0,
    priceCeil: maximum ? Math.ceil(maximum / 1000) * 1000 : 0,
    colors: colorFacets,
  }
  facetCache = { snapshot, value }
  return value
}

export default defineEventHandler(async (event) => {
  const { snapshot } = await loadCatalogState()
  const query = getQuery(event)
  const categoryId = String(query.categoryId ?? '').trim()
  const subcategoryId = String(query.subcategoryId ?? '').trim()
  const collectionId = String(query.collectionId ?? '').trim()
  const groupId = String(query.groupId ?? '').trim()
  const availability = String(query.availability ?? '').trim()
  const colorToken = normalizeText(query.colorName ?? query.colorId)
  const search = String(query.q ?? '').trim().toLocaleLowerCase('ru-RU')
  const sort = String(query.sort ?? '').trim()
  const full = String(query.full ?? '') === '1'
  const minPrice = numberQuery(query.minPrice)
  const maxPrice = numberQuery(query.maxPrice)
  const ids = new Set(String(query.ids ?? '').split(',').map(item => item.trim()).filter(Boolean).slice(0, 100))
  const limit = Math.max(1, Math.min(100, numberQuery(query.limit) ?? 24))
  const offset = Math.max(0, numberQuery(query.offset) ?? 0)

  const filtered = snapshot.products.filter((product) => {
    if (ids.size && !ids.has(product.id)) return false
    if (categoryId && product.categoryId !== categoryId) return false
    if (subcategoryId && product.subcategoryId !== subcategoryId) return false
    if (collectionId && product.collectionId !== collectionId) return false
    if (groupId && product.groupId !== groupId) return false
    if (availability && !product.variants.some(variant => variant.availability === availability)) return false
    if (colorToken && !product.variants.some(variant => normalizeText(variant.color.name).includes(colorToken))) return false
    if ((minPrice !== undefined || maxPrice !== undefined) && !product.variants.some((variant) => {
      if (!isOrderablePrice(variant.price)) return true
      return (minPrice === undefined || variant.price >= minPrice) && (maxPrice === undefined || variant.price <= maxPrice)
    })) return false
    if (search && !productSearchText(snapshot, product).includes(search)) return false
    return true
  })

  filtered.sort((left, right) => {
    if (ids.size) return 0
    if (sort === 'price-asc') return (productStartingPrice(left) || Number.POSITIVE_INFINITY) - (productStartingPrice(right) || Number.POSITIVE_INFINITY)
    if (sort === 'price-desc') return productStartingPrice(right) - productStartingPrice(left)
    if (sort === 'name') return left.name.localeCompare(right.name, 'ru')
    if (sort === 'new') return Number(right.isNew) - Number(left.isNew)
    return 0
  })

  const items = filtered.slice(offset, offset + limit).map(product => full ? product : toProductCard(product))
  return {
    items,
    total: filtered.length,
    limit,
    offset,
    hasMore: offset + items.length < filtered.length,
    facets: getFacets(snapshot),
  }
})

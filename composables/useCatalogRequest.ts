import { isOrderablePrice, productSearchText, productStartingPrice } from '~/data/catalog'
import type {
  CatalogApiResponse,
  CatalogOrigin,
  CatalogSnapshot,
  Collection,
  HomeCatalogResponse,
  Product,
  ProductListFacets,
  ProductListResponse,
} from '~/types/catalog'

interface StaticCatalogPreview {
  version: 1
  generatedAt: string
  source: CatalogOrigin
  totalProducts: number
  catalog: CatalogSnapshot
  collections: Collection[]
  products: Product[]
  home: HomeCatalogResponse
  facets: ProductListFacets
}

interface CatalogRequestOptions {
  query?: Record<string, unknown>
}

let staticPreviewPromise: Promise<StaticCatalogPreview> | undefined

const loadStaticPreview = async (previewUrl: string) => {
  if (import.meta.server) {
    const [{ readFile }, { resolve }] = await Promise.all([
      import('node:fs/promises'),
      import('node:path'),
    ])
    return JSON.parse(await readFile(resolve(process.cwd(), 'public', 'catalog-preview.json'), 'utf8')) as StaticCatalogPreview
  }
  return $fetch<StaticCatalogPreview>(previewUrl)
}

const normalizeText = (value: unknown) => String(value ?? '')
  .trim()
  .toLocaleLowerCase('ru-RU')
  .replaceAll('ё', 'е')

const numberQuery = (value: unknown) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

const queryStaticProducts = (preview: StaticCatalogPreview, query: Record<string, unknown>): ProductListResponse => {
  const categoryId = String(query.categoryId ?? '').trim()
  const subcategoryId = String(query.subcategoryId ?? '').trim()
  const collectionId = String(query.collectionId ?? '').trim()
  const groupId = String(query.groupId ?? '').trim()
  const availability = String(query.availability ?? '').trim()
  const colorToken = normalizeText(query.colorName ?? query.colorId)
  const search = String(query.q ?? '').trim().toLocaleLowerCase('ru-RU')
  const sort = String(query.sort ?? '').trim()
  const minPrice = numberQuery(query.minPrice)
  const maxPrice = numberQuery(query.maxPrice)
  const ids = new Set(String(query.ids ?? '').split(',').map(item => item.trim()).filter(Boolean).slice(0, 100))
  const requestedLimit = numberQuery(query.limit) ?? 24
  const limit = Math.max(1, Math.min(preview.products.length || 1, requestedLimit))
  const offset = Math.max(0, numberQuery(query.offset) ?? 0)
  const snapshot: CatalogSnapshot = {
    categories: preview.catalog.categories,
    collections: preview.collections,
    products: preview.products,
  }

  const filtered = preview.products.filter((product) => {
    if (ids.size && !ids.has(product.id)) return false
    if (categoryId && product.categoryId !== categoryId) return false
    if (subcategoryId && product.subcategoryId !== subcategoryId) return false
    if (collectionId && product.collectionId !== collectionId) return false
    if (groupId && product.groupId !== groupId) return false
    if (availability && !product.variants.some(variant => variant.availability === availability)) return false
    if (colorToken && !product.variants.some(variant => normalizeText(variant.color.name).includes(colorToken))) return false
    if ((minPrice !== undefined || maxPrice !== undefined) && !product.variants.some((variant) => {
      if (!isOrderablePrice(variant.price)) return true
      return (minPrice === undefined || variant.price >= minPrice)
        && (maxPrice === undefined || variant.price <= maxPrice)
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

  const items = filtered.slice(offset, offset + limit)
  return {
    items,
    total: filtered.length,
    limit,
    offset,
    hasMore: offset + items.length < filtered.length,
    facets: preview.facets,
  }
}

const requestStaticCatalog = async (previewUrl: string, url: string, options: CatalogRequestOptions = {}) => {
  staticPreviewPromise ??= loadStaticPreview(previewUrl)
  const preview = await staticPreviewPromise
  const query = options.query ?? {}

  if (url === '/api/catalog') {
    return { source: preview.source, catalog: preview.catalog } satisfies CatalogApiResponse
  }
  if (url === '/api/catalog/home') return preview.home
  if (url === '/api/catalog/product-list') return queryStaticProducts(preview, query)
  if (url === '/api/catalog/collections') {
    const categoryId = String(query.categoryId ?? '').trim()
    const ids = new Set(String(query.ids ?? '').split(',').map(item => item.trim()).filter(Boolean))
    return preview.collections.filter(item => (
      (!categoryId || item.categoryId === categoryId) && (!ids.size || ids.has(item.id))
    ))
  }
  if (url.startsWith('/api/catalog/collections/')) {
    const id = decodeURIComponent(url.slice('/api/catalog/collections/'.length))
    return preview.collections.find(item => item.id === id || item.slug === id)
  }
  if (url.startsWith('/api/catalog/products/')) {
    const id = decodeURIComponent(url.slice('/api/catalog/products/'.length))
    return preview.products.find(item => item.id === id || item.slug === id)
  }

  throw new Error(`Static catalog route is not supported: ${url}`)
}

export const useCatalogRequest = () => {
  const requestFetch = useRequestFetch()
  const config = useRuntimeConfig()
  const enabled = Boolean(config.public.staticCatalog)
  const baseUrl = String(config.app.baseURL || '/').replace(/\/?$/, '/')
  const previewUrl = `${baseUrl}catalog-preview.json`

  return <T>(url: string, options: CatalogRequestOptions = {}) => enabled
    ? requestStaticCatalog(previewUrl, url, options) as Promise<T>
    : requestFetch<T>(url, options)
}

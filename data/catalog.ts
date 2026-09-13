import type { CatalogSnapshot, Product } from '~/types/catalog'

export const emptyCatalog = (): CatalogSnapshot => ({ categories: [], collections: [], products: [] })

export const categoryById = (catalog: CatalogSnapshot, id: string) => catalog.categories.find(item => item.id === id)
export const categoryBySlug = (catalog: CatalogSnapshot, slug: string) => catalog.categories.find(item => item.slug === slug)
export const collectionById = (catalog: CatalogSnapshot, id?: string) => catalog.collections.find(item => item.id === id)
export const collectionBySlug = (catalog: CatalogSnapshot, slug: string) => catalog.collections.find(item => item.slug === slug)
export const productById = (catalog: CatalogSnapshot, id: string) => catalog.products.find(item => item.id === id || item.slug === id)

export const formatPrice = (value: number) =>
  value > 0
    ? new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value)
    : 'Цена по запросу'

export const availabilityLabel = (value: 'in-stock' | 'on-order') =>
  value === 'in-stock' ? 'В наличии' : 'Под заказ'

export const productStartingPrice = (product: Product) => {
  const prices = product.variants.map(variant => variant.price).filter(price => price > 0)
  return prices.length ? Math.min(...prices) : 0
}

export const productSearchText = (catalog: CatalogSnapshot, product: Product) => {
  const category = categoryById(catalog, product.categoryId)
  const collection = collectionById(catalog, product.collectionId)
  return [
    product.name,
    category?.name,
    collection?.name,
    product.description,
    ...product.variants.map(variant => `${variant.article} ${variant.color.name} ${variant.dimensions.label}`),
    ...Object.entries(product.specifications).flat(),
    ...product.features,
    ...product.materials,
  ].filter(Boolean).join(' ').toLocaleLowerCase('ru-RU')
}

export const isOrderablePrice = (price: number) => Number.isFinite(price) && price > 0

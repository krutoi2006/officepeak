import { demoCatalog } from '~/data/demoCatalog'
import { normalizeCatalog } from '~/services/catalogAdapter'

const snapshot = normalizeCatalog(demoCatalog)

export const categories = snapshot.categories
export const collections = snapshot.collections
export const products = snapshot.products

export const categoryById = (id: string) => categories.find(item => item.id === id)
export const categoryBySlug = (slug: string) => categories.find(item => item.slug === slug)
export const collectionById = (id?: string) => collections.find(item => item.id === id)
export const collectionBySlug = (slug: string) => collections.find(item => item.slug === slug)
export const productById = (id: string) => products.find(item => item.id === id || item.slug === id)

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value)

export const availabilityLabel = (value: 'in-stock' | 'on-order') =>
  value === 'in-stock' ? 'В наличии' : 'Под заказ'

export const productStartingPrice = (product: (typeof products)[number]) =>
  Math.min(...product.variants.map(variant => variant.price))

export const productSearchText = (product: (typeof products)[number]) => {
  const category = categoryById(product.categoryId)
  const collection = collectionById(product.collectionId)
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

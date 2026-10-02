import type { Collection, Product } from '~/types/catalog'

const transliteration: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y',
  к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f',
  х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
}

export const plainSeoText = (value: string) => value
  .replace(/<[^>]*>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

export const truncateSeoText = (value: string, maxLength = 158) => {
  const text = plainSeoText(value)
  if (text.length <= maxLength) return text
  const slice = text.slice(0, Math.max(1, maxLength - 1))
  const boundary = slice.lastIndexOf(' ')
  return `${slice.slice(0, boundary > maxLength * 0.7 ? boundary : slice.length).replace(/[\s,.;:!?—-]+$/u, '')}…`
}

export const toReadableSlug = (value: string, maxLength = 70) => {
  const result = plainSeoText(value)
    .toLocaleLowerCase('ru-RU')
    .split('')
    .map(char => transliteration[char] ?? char)
    .join('')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, maxLength)
    .replace(/-+$/g, '')
  return result || 'item'
}

const stableSuffix = (id: string) => id
  .replace(/^(unitex|riva)-(product|collection)-/i, '$1-')
  .replace(/[^a-z0-9]+/gi, '-')
  .replace(/^-+|-+$/g, '')
  .toLocaleLowerCase('ru-RU')

export const productSeoSlug = (product: Pick<Product, 'id' | 'slug' | 'name'>) => {
  if (!/^(unitex|riva)-product-\d+$/i.test(product.slug)) return product.slug
  return `${toReadableSlug(product.name, 58)}-${stableSuffix(product.id)}`
}

export const collectionSeoSlug = (collection: Pick<Collection, 'id' | 'slug' | 'name'>) => {
  if (!/^(unitex|riva)-collection-\d+$/i.test(collection.slug)) return collection.slug
  return `${toReadableSlug(collection.name, 58)}-${stableSuffix(collection.id)}`
}

const productCatalogCode = (id: string) => id
  .replace(/^unitex-product-/i, 'U')
  .replace(/^riva-product-/i, 'R')
  .replace(/[^a-z0-9]+/gi, '')
  .toLocaleUpperCase('ru-RU')

export const productSeoTitle = (product: Product) => {
  const article = plainSeoText(product.variants[0]?.article ?? '')
  const catalogCode = productCatalogCode(product.id)
  const identifiers = [article, catalogCode ? `№${catalogCode}` : ''].filter(Boolean).join(' · ')
  const nameLimit = Math.max(18, 52 - identifiers.length)
  const name = truncateSeoText(product.name, nameLimit)
  return identifiers ? `${name} · ${identifiers}` : name
}

export const productSeoDescription = (product: Product, collection?: Collection) => {
  const variant = product.variants[0]
  const catalogCode = productCatalogCode(product.id)
  const name = truncateSeoText(product.name, 64)
  const collectionName = collection ? truncateSeoText(collection.name, 32) : ''
  const details = [
    `${name}${collectionName ? `, коллекция ${collectionName}` : ''}.`,
    catalogCode ? `Код ${catalogCode}.` : '',
    variant?.article ? `Артикул ${plainSeoText(variant.article)}.` : '',
    variant?.dimensions?.label ? `Размер ${plainSeoText(variant.dimensions.label)}.` : '',
    'Подбор, доставка и сборка офисной мебели OFFICEPEAK.',
  ].filter(Boolean).join(' ')
  return truncateSeoText(details)
}

export const collectionSeoDescription = (collection: Collection) => truncateSeoText(
  `Коллекция офисной мебели ${plainSeoText(collection.name)}. ${truncateSeoText(collection.description, 96)} OFFICEPEAK: подбор, доставка и сборка.`,
)

export const serializeJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c')

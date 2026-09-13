import type { CatalogSnapshot, CatalogSource } from '~/types/catalog'

export class StaticCatalogSource implements CatalogSource {
  constructor(private readonly snapshot: CatalogSnapshot) {}

  async load(): Promise<CatalogSnapshot> {
    return structuredClone(this.snapshot)
  }
}

export const normalizeCatalog = (snapshot: CatalogSnapshot): CatalogSnapshot => ({
  categories: snapshot.categories.map(category => ({ ...category, subcategories: [...category.subcategories] })),
  collections: snapshot.collections.map(collection => ({
    ...collection,
    images: [...collection.images],
    colors: [...collection.colors],
    groups: [...collection.groups],
    relatedCollectionIds: [...collection.relatedCollectionIds],
  })),
  products: snapshot.products.map(product => ({
    ...product,
    images: [...product.images],
    variants: [...product.variants],
    materials: [...product.materials],
    features: [...product.features],
  })),
})

export const mergeCatalogSnapshots = (snapshots: CatalogSnapshot[]): CatalogSnapshot => {
  if (!snapshots.length) throw new Error('At least one catalog snapshot is required.')

  const categories = new Map<string, CatalogSnapshot['categories'][number]>()
  const collections = new Map<string, CatalogSnapshot['collections'][number]>()
  const products = new Map<string, CatalogSnapshot['products'][number]>()

  for (const snapshot of snapshots) {
    for (const category of snapshot.categories) {
      const existing = categories.get(category.id)
      if (!existing) {
        categories.set(category.id, { ...category, subcategories: [...category.subcategories] })
        continue
      }
      const subcategories = new Map(existing.subcategories.map(item => [item.id, item]))
      for (const subcategory of category.subcategories) if (!subcategories.has(subcategory.id)) subcategories.set(subcategory.id, subcategory)
      existing.subcategories = [...subcategories.values()]
    }
    for (const collection of snapshot.collections) {
      if (!collections.has(collection.id)) collections.set(collection.id, {
        ...collection,
        images: [...collection.images],
        colors: [...collection.colors],
        groups: [...collection.groups],
        relatedCollectionIds: [...collection.relatedCollectionIds],
      })
    }
    for (const product of snapshot.products) {
      if (!products.has(product.id)) products.set(product.id, {
        ...product,
        images: [...product.images],
        variants: [...product.variants],
        materials: [...product.materials],
        features: [...product.features],
      })
    }
  }

  const merged = { categories: [...categories.values()], collections: [...collections.values()], products: [...products.values()] }
  assertCatalogSnapshot(merged)
  return merged
}

const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value) && typeof value === 'object' && !Array.isArray(value)
const isString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0
const isFiniteNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value)

export const assertCatalogSnapshot: (value: unknown) => asserts value is CatalogSnapshot = (value) => {
  if (!isRecord(value) || !Array.isArray(value.categories) || !Array.isArray(value.collections) || !Array.isArray(value.products)) {
    throw new Error('Catalog snapshot must contain categories, collections and products arrays.')
  }
  if (!value.categories.length || !value.collections.length || !value.products.length) {
    throw new Error('Catalog snapshot must not be empty.')
  }

  const categoryIds = new Set<string>()
  for (const category of value.categories) {
    if (!isRecord(category) || !isString(category.id) || !isString(category.slug) || !isString(category.name)
      || !isRecord(category.image) || !isString(category.image.src) || !Array.isArray(category.subcategories)) {
      throw new Error('Catalog contains an invalid category.')
    }
    if (categoryIds.has(category.id)) throw new Error(`Duplicate category id: ${category.id}`)
    categoryIds.add(category.id)
  }

  const collectionIds = new Set<string>()
  for (const collection of value.collections) {
    if (!isRecord(collection) || !isString(collection.id) || !isString(collection.slug) || !isString(collection.name)
      || !isString(collection.categoryId) || !categoryIds.has(collection.categoryId)
      || !isRecord(collection.image) || !isString(collection.image.src) || !Array.isArray(collection.images)
      || !Array.isArray(collection.colors) || !Array.isArray(collection.groups) || !isFiniteNumber(collection.priceFrom)) {
      throw new Error('Catalog contains an invalid collection.')
    }
    if (collectionIds.has(collection.id)) throw new Error(`Duplicate collection id: ${collection.id}`)
    collectionIds.add(collection.id)
  }

  const productIds = new Set<string>()
  const variantIds = new Set<string>()
  for (const product of value.products) {
    if (!isRecord(product) || !isString(product.id) || !isString(product.slug) || !isString(product.name)
      || !isString(product.categoryId) || !categoryIds.has(product.categoryId) || !Array.isArray(product.images)
      || !product.images.length || !Array.isArray(product.variants) || !product.variants.length
      || !Array.isArray(product.materials) || !Array.isArray(product.features)) {
      throw new Error('Catalog contains an invalid product.')
    }
    if (product.collectionId && (!isString(product.collectionId) || !collectionIds.has(product.collectionId))) {
      throw new Error(`Product ${product.id} references an unknown collection.`)
    }
    if (productIds.has(product.id)) throw new Error(`Duplicate product id: ${product.id}`)
    productIds.add(product.id)
    for (const variant of product.variants) {
      if (!isRecord(variant) || !isString(variant.id) || !isString(variant.article) || !isFiniteNumber(variant.price)
        || variant.price < 0 || !['in-stock', 'on-order'].includes(String(variant.availability))
        || !isRecord(variant.color) || !isString(variant.color.name)
        || !isRecord(variant.dimensions) || !isFiniteNumber(variant.dimensions.width)
        || !isFiniteNumber(variant.dimensions.depth) || !isFiniteNumber(variant.dimensions.height)) {
        throw new Error(`Product ${product.id} contains an invalid variant.`)
      }
      if (variantIds.has(variant.id)) throw new Error(`Duplicate variant id: ${variant.id}`)
      variantIds.add(variant.id)
    }
  }
}

// Будущие Excel, CSV, 1С, CMS и API источники должны реализовать CatalogSource.

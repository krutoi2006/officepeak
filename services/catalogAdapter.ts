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

// Будущие Excel, CSV, 1С, CMS и API источники должны реализовать CatalogSource.

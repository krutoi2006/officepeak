import type { CatalogImage, Collection, Product, ProductVariant } from '~/types/catalog'

const CARD_VARIANT_LIMIT = 12

const representativeVariants = (product: Product) => {
  const selected: ProductVariant[] = []
  const colors = new Set<string>()
  const images = new Set<string>()

  for (const variant of product.variants) {
    const colorKey = variant.color.id || variant.color.name
    if (colors.has(colorKey)) continue
    const image = product.images[variant.imageIndex] ?? product.images[0]
    const imageKey = image?.src
    // A color without its own supplier photo would create a control that looks
    // broken because selecting it cannot change the product image.
    if (!imageKey || images.has(imageKey)) continue
    colors.add(colorKey)
    images.add(imageKey)
    selected.push(variant)
    if (selected.length >= CARD_VARIANT_LIMIT) break
  }

  return selected.length ? selected : product.variants.slice(0, 1)
}

export const toProductCard = (product: Product): Product => {
  const images: CatalogImage[] = []
  const imageIndexes = new Map<string, number>()
  const variants = representativeVariants(product).map((variant) => {
    const image = product.images[variant.imageIndex] ?? product.images[0]
    if (!image) return { ...variant, imageIndex: 0 }

    let imageIndex = imageIndexes.get(image.src)
    if (imageIndex === undefined) {
      imageIndex = images.length
      imageIndexes.set(image.src, imageIndex)
      images.push(image)
    }
    return { ...variant, imageIndex }
  })

  return {
    ...product,
    images: images.length ? images : product.images.slice(0, 1),
    variants,
  }
}

export const toCollectionCard = (collection: Collection): Collection => ({
  ...collection,
  images: collection.images.slice(0, 1),
  colors: collection.colors.slice(0, 9),
  groups: [],
  relatedCollectionIds: [],
  specifications: {},
})

export type Availability = 'in-stock' | 'on-order'

export interface CatalogImage {
  src: string
  alt: string
}

export interface ColorOption {
  id: string
  name: string
  hex: string
  material?: string
}

export interface ProductDimensions {
  width: number
  depth: number
  height: number
  label: string
}

export interface ProductVariant {
  id: string
  article: string
  color: ColorOption
  dimensions: ProductDimensions
  price: number
  oldPrice?: number
  availability: Availability
  stockQuantity?: number
  imageIndex: number
}

export interface Subcategory {
  id: string
  slug: string
  name: string
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  image: CatalogImage
  subcategories: Subcategory[]
}

export interface NomenclatureGroup {
  id: string
  name: string
  description: string
}

export interface Collection {
  id: string
  slug: string
  name: string
  categoryId: string
  subcategoryId?: string
  description: string
  image: CatalogImage
  images: CatalogImage[]
  colors: ColorOption[]
  priceFrom: number
  groups: NomenclatureGroup[]
  specifications: Record<string, string>
  relatedCollectionIds: string[]
  isFeatured: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  categoryId: string
  subcategoryId?: string
  collectionId?: string
  groupId?: string
  description: string
  images: CatalogImage[]
  variants: ProductVariant[]
  specifications: Record<string, string>
  materials: string[]
  warranty: string
  features: string[]
  isNew: boolean
  isRecommended: boolean
}

export interface CartLine {
  productId: string
  variantId: string
  quantity: number
}

export interface ResolvedCartItem extends CartLine {
  key: string
  product: Product
  variant: ProductVariant
  lineTotal: number
}

export interface CatalogSnapshot {
  categories: Category[]
  collections: Collection[]
  products: Product[]
}

export interface CatalogSource {
  load(): Promise<CatalogSnapshot>
}

import { categoryConsolidation, collectionCategoryOverrides } from '~/config/catalog-routing'
import { demoCategories } from '~/data/demoCatalog'
import type { CatalogImage, CatalogSnapshot, Product } from '~/types/catalog'

const canonicalCategories = new Map(demoCategories.map(category => [category.id, category]))

const categoryImageOverrides: Record<string, CatalogImage> = {
  'meeting-areas': {
    src: 'https://static.unitex.ru/i/images/uni_products/pscategory-1/pset-1001264/61221.jpg',
    alt: 'Переговорная зона Speech в интерьере',
  },
  chairs: {
    src: 'https://static.unitex.ru/i/images/uni_products/pscategory-1/pset-1001264/61172.jpg',
    alt: 'Офисные кресла в переговорной',
  },
  'office-kitchens': canonicalCategories.get('office-kitchens')!.image,
  'acoustic-solutions': {
    src: 'https://static.unitex.ru/i/images/uni_products/pscategory-10/pset-215/56100.jpg',
    alt: 'Акустические офисные перегородки Vector',
  },
  'storage-systems': {
    src: 'https://static.unitex.ru/i/images/uni_products/pscategory-2/pset-1001135/58816.jpg',
    alt: 'Системы хранения в рабочем интерьере',
  },
  'adjustable-desks': {
    src: 'https://static.unitex.ru/i/images/uni_products/pscategory-2/pset-1001335/64288.jpg',
    alt: 'Регулируемые столы Elevo в офисе',
  },
  'metal-furniture': canonicalCategories.get('metal-furniture')!.image,
}

const routedCategory = (collectionId: string | undefined, categoryId: string) =>
  (collectionId && collectionCategoryOverrides[collectionId])
  || categoryConsolidation[categoryId]
  || categoryId

const includes = (value: string, pattern: RegExp) => pattern.test(value.toLocaleLowerCase('ru-RU'))

const waitingSubcategory = (product: Product, sourceCategoryId: string) => {
  if (sourceCategoryId === 'coffee-tables') return 'coffee-tables'
  const text = `${product.name} ${product.features.join(' ')}`
  if (includes(text, /пуф/)) return 'poufs'
  if (includes(text, /вешал/)) return 'coat-racks'
  if (includes(text, /многомест|секци/)) return 'multi-seat'
  if (sourceCategoryId === 'lounge-furniture' && includes(text, /кресл/)) return 'lounge-chairs'
  return 'sofas-armchairs'
}

const acousticSubcategory = (product: Product) => {
  const text = `${product.name} ${product.features.join(' ')}`
  if (includes(text, /настольн.*экран/)) return 'desk-screens'
  if (includes(text, /экран.*перегород|перегород/)) return 'screen-dividers'
  if (includes(text, /кабинк/)) return 'acoustic-cabins'
  if (includes(text, /кабин/)) return 'acoustic-booths'
  if (includes(text, /настенн/)) return 'wall-panels'
  if (includes(text, /подвесн/)) return 'suspended-panels'
  if (includes(text, /напольн/)) return 'floor-dividers'
  if (includes(text, /экран/)) return 'acoustic-screens'
  return undefined
}

const metalSubcategory = (product: Product) => {
  const text = product.name
  if (includes(text, /сейф/)) return 'safes'
  if (includes(text, /стеллаж/)) return 'racks'
  if (includes(text, /бухгалтер/)) return 'accounting-cabinets'
  if (includes(text, /картотек/)) return 'card-files'
  if (includes(text, /кроват/)) return 'metal-beds'
  if (includes(text, /гардероб/)) return 'wardrobe-systems'
  if (includes(text, /шкаф|тумб/)) return 'office-cabinets'
  return undefined
}

const routedSubcategory = (product: Product, sourceCategoryId: string, targetCategoryId: string) => {
  if (targetCategoryId === 'waiting-areas') return waitingSubcategory(product, sourceCategoryId)
  if (targetCategoryId === 'office-kitchens') return 'modular-kitchens'
  if (targetCategoryId === 'acoustic-solutions') return acousticSubcategory(product)
  if (targetCategoryId === 'metal-furniture') return metalSubcategory(product)
  if (targetCategoryId === 'project-furniture') {
    if (product.collectionId === 'riva-collection-3518') return 'courtroom-furniture'
    if (product.collectionId === 'riva-collection-3294') return 'home-furniture'
    if (sourceCategoryId === 'hotel-furniture') return 'hotel-furniture'
  }
  return product.subcategoryId
}

export const groupCatalogSections = (snapshot: CatalogSnapshot): CatalogSnapshot => {
  const collections = snapshot.collections.map(collection => ({
    ...collection,
    categoryId: routedCategory(collection.id, collection.categoryId),
  }))
  const collectionCategories = new Map(collections.map(collection => [collection.id, collection.categoryId]))
  const products = snapshot.products.map((product) => {
    const sourceCategoryId = product.categoryId
    const categoryId = product.collectionId
      ? collectionCategories.get(product.collectionId) ?? routedCategory(product.collectionId, sourceCategoryId)
      : routedCategory(undefined, sourceCategoryId)
    const subcategoryId = routedSubcategory(product, sourceCategoryId, categoryId)
    return { ...product, categoryId, ...(subcategoryId ? { subcategoryId } : { subcategoryId: undefined }) }
  })

  const usedCategoryIds = new Set([
    ...collections.map(collection => collection.categoryId),
    ...products.map(product => product.categoryId),
  ])
  const existingCategories = new Map(snapshot.categories.map(category => [category.id, category]))
  const representativeImages = new Map<string, CatalogSnapshot['categories'][number]['image']>()
  for (const collection of collections) if (!representativeImages.has(collection.categoryId)) representativeImages.set(collection.categoryId, collection.image)

  const categories = [
    ...demoCategories
      .filter(category => usedCategoryIds.has(category.id))
      .map((category) => {
        const existing = existingCategories.get(category.id)
        return {
          ...category,
          image: categoryImageOverrides[category.id]
            ?? existing?.image
            ?? representativeImages.get(category.id)
            ?? category.image,
          subcategories: [...category.subcategories],
        }
      }),
    ...snapshot.categories
      .filter(category => usedCategoryIds.has(category.id) && !canonicalCategories.has(category.id))
      .map(category => ({ ...category, subcategories: [...category.subcategories] })),
  ]

  return { categories, collections, products }
}

import { loadCatalogState } from '~/server/utils/catalogRepository'
import { productSearchText } from '~/data/catalog'

export default defineEventHandler(async (event) => {
  const { snapshot } = await loadCatalogState()
  const query = getQuery(event)
  const categoryId = String(query.categoryId ?? '').trim()
  const collectionId = String(query.collectionId ?? '').trim()
  const availability = String(query.availability ?? '').trim()
  const search = String(query.q ?? '').trim().toLocaleLowerCase('ru-RU')
  return snapshot.products.filter(product => (
    (!categoryId || product.categoryId === categoryId)
    && (!collectionId || product.collectionId === collectionId)
    && (!availability || product.variants.some(variant => variant.availability === availability))
    && (!search || productSearchText(snapshot, product).includes(search))
  ))
})

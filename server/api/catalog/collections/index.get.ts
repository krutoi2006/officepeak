import { loadCatalogState } from '~/server/utils/catalogRepository'
import { toCollectionCard } from '~/server/utils/catalogProjection'

export default defineEventHandler(async (event) => {
  const { snapshot } = await loadCatalogState()
  const query = getQuery(event)
  const categoryId = String(query.categoryId ?? '').trim()
  const ids = new Set(String(query.ids ?? '').split(',').map(item => item.trim()).filter(Boolean))
  return snapshot.collections
    .filter(item => (!categoryId || item.categoryId === categoryId) && (!ids.size || ids.has(item.id)))
    .map(toCollectionCard)
})

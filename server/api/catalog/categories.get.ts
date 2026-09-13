import { loadCatalogState } from '~/server/utils/catalogRepository'

export default defineEventHandler(async () => {
  const { snapshot } = await loadCatalogState()
  return snapshot.categories
})

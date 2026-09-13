import { loadCatalogState } from '~/server/utils/catalogRepository'

export default defineEventHandler(async () => {
  const state = await loadCatalogState()
  return {
    source: state.source,
    catalog: {
      categories: state.snapshot.categories,
      collections: [],
      products: [],
    },
  }
})

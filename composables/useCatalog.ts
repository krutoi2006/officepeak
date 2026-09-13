import type { CatalogApiResponse } from '~/types/catalog'
import { emptyCatalog } from '~/data/catalog'

const KEY = 'catalog-runtime'

export const useCatalog = async () => {
  const requestFetch = useRequestFetch()
  const state = await useAsyncData<CatalogApiResponse>(KEY, () => requestFetch<CatalogApiResponse>('/api/catalog'))
  return {
    ...state,
    catalog: computed(() => state.data.value?.catalog ?? emptyCatalog()),
    source: computed(() => state.data.value?.source ?? 'demo'),
  }
}

export const useCatalogData = () => {
  const { data } = useNuxtData<CatalogApiResponse>(KEY)
  return {
    catalog: computed(() => data.value?.catalog ?? emptyCatalog()),
    source: computed(() => data.value?.source ?? 'demo'),
  }
}

<script setup lang="ts">
import type { ProductListResponse } from '~/types/catalog'

const { favorites } = useShop()
const requestFetch = useRequestFetch()
const favoriteIds = computed(() => favorites.value.slice(0, 100).join(','))
const { data: favoriteData } = await useAsyncData<ProductListResponse>(
  'favorite-products',
  () => favoriteIds.value
    ? requestFetch<ProductListResponse>('/api/catalog/product-list', { query: { ids: favoriteIds.value, limit: 100 } })
    : Promise.resolve({ items: [], total: 0, limit: 100, offset: 0, hasMore: false, facets: { priceFloor: 0, priceCeil: 0, colors: [] } }),
  { watch: [favoriteIds] },
)
const list = computed(() => (favoriteData.value?.items ?? []).filter(product => favorites.value.includes(product.id)))
usePageSeo('Избранное', 'Сохранённые товары OFFICEPEAK.', '/favorites')
</script>

<template>
  <section class="container-page py-16">
    <Breadcrumbs :items="[{ label: 'Главная', to: '/' }, { label: 'Избранное' }]" />
    <h1 class="mb-12 display-title">Избранное</h1>
    <div v-if="list.length" class="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      <ProductCard v-for="product in list" :key="product.id" :product="product" />
    </div>
    <div v-else class="bg-surface p-12 text-center"><p class="mb-6 text-secondary">Вы пока ничего не добавили в избранное.</p><NuxtLink to="/catalog" class="btn-primary">Перейти в каталог</NuxtLink></div>
  </section>
</template>

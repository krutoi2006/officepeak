<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import type { Collection, ProductListResponse } from '~/types/catalog'

const route = useRoute()
const router = useRouter()
const { catalog } = await useCatalog()
const requestFetch = useRequestFetch()
const categories = computed(() => catalog.value.categories)
const { data: collectionData } = await useAsyncData<Collection[]>(
  'search-collections',
  () => requestFetch<Collection[]>('/api/catalog/collections'),
)
const collections = computed(() => collectionData.value ?? [])
const query = ref(String(route.query.q ?? ''))
const normalized = computed(() => String(route.query.q ?? '').trim().toLocaleLowerCase('ru-RU'))
const searchPage = ref(1)
const searchPerPage = 40
const { data: productData, status: productStatus } = await useAsyncData<ProductListResponse>(
  'catalog-search-products',
  () => normalized.value.length < 2
    ? Promise.resolve({ items: [], total: 0, limit: searchPerPage, offset: 0, hasMore: false, facets: { priceFloor: 0, priceCeil: 0, colors: [] } })
    : requestFetch<ProductListResponse>('/api/catalog/product-list', { query: { q: normalized.value, limit: searchPage.value * searchPerPage } }),
  { watch: [normalized, searchPage] },
)
const productResults = computed(() => productData.value?.items ?? [])
const hasMoreProducts = computed(() => productData.value?.hasMore ?? false)
const collectionResults = computed(() => normalized.value.length < 2 ? [] : collections.value.filter(item => `${item.name} ${item.description}`.toLocaleLowerCase('ru-RU').includes(normalized.value)))
const categoryResults = computed(() => normalized.value.length < 2 ? [] : categories.value.filter(item => `${item.name} ${item.description} ${item.subcategories.map(sub => sub.name).join(' ')}`.toLocaleLowerCase('ru-RU').includes(normalized.value)))
const totalResults = computed(() => (productData.value?.total ?? 0) + collectionResults.value.length + categoryResults.value.length)
const submit = () => router.replace({ query: query.value.trim() ? { q: query.value.trim() } : {} })
watch(() => route.query.q, value => { query.value = String(value ?? '') })
watch(normalized, () => { searchPage.value = 1 })
usePageSeo('Поиск', 'Поиск по названиям, артикулам, категориям, коллекциям и характеристикам каталога OFFICEPEAK.', '/search')
</script>

<template>
  <section class="container-page py-10 md:py-14">
    <Breadcrumbs :items="[{ label: 'Главная', to: '/' }, { label: 'Поиск' }]" />
    <h1 class="mb-8 display-title">Поиск по каталогу</h1>
    <form class="flex max-w-3xl border-b-2 border-primary" role="search" @submit.prevent="submit"><label for="search-page-input" class="sr-only">Поисковый запрос</label><input id="search-page-input" v-model="query" autofocus class="min-w-0 flex-1 bg-transparent py-4 text-xl outline-none" placeholder="Название, артикул, коллекция…"><button type="submit" class="px-4" aria-label="Найти"><Search class="h-6 w-6" /></button></form>
    <p v-if="normalized.length >= 2" class="mt-4 text-sm text-secondary">{{ totalResults ? `Найдено: ${totalResults}` : 'Результатов нет' }}</p>
    <div v-if="normalized.length < 2" class="mt-16 bg-surface p-10 text-center text-secondary">Введите не менее двух символов. Поиск учитывает название, артикул, категорию, коллекцию и характеристики.</div>
    <div v-else-if="totalResults" class="mt-14 space-y-16">
      <section v-if="categoryResults.length" aria-labelledby="search-categories"><h2 id="search-categories" class="mb-6 text-3xl font-light">Категории</h2><div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><NuxtLink v-for="item in categoryResults" :key="item.id" :to="`/catalog/${item.slug}`" class="border border-border p-5 transition hover:bg-surface"><h3 class="mb-2 text-lg font-medium">{{ item.name }}</h3><p class="text-sm leading-6 text-secondary">{{ item.description }}</p></NuxtLink></div></section>
      <section v-if="collectionResults.length" aria-labelledby="search-collections"><h2 id="search-collections" class="mb-6 text-3xl font-light">Коллекции</h2><div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><CollectionCard v-for="item in collectionResults" :key="item.id" :collection="item" /></div></section>
      <section v-if="productResults.length" aria-labelledby="search-products"><h2 id="search-products" class="mb-6 text-3xl font-light">Товары</h2><div class="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><ProductCard v-for="item in productResults" :key="item.id" :product="item" /></div><div v-if="hasMoreProducts" class="mt-12 text-center"><button type="button" class="btn-secondary" :disabled="productStatus === 'pending'" @click="searchPage += 1">{{ productStatus === 'pending' ? 'Загрузка…' : 'Показать ещё' }}</button></div></section>
    </div>
    <div v-else class="mt-16 bg-surface p-10 text-center"><h2 class="mb-3 text-2xl font-light">Ничего не найдено</h2><p class="mb-6 text-secondary">Проверьте запрос или перейдите в каталог.</p><NuxtLink to="/catalog" class="btn-primary">Открыть каталог</NuxtLink></div>
  </section>
</template>

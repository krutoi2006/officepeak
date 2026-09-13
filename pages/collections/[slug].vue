<script setup lang="ts">
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-vue-next'
import { categoryById } from '~/data/catalog'
import type { Collection, ProductListResponse } from '~/types/catalog'

const route = useRoute()
const { catalog } = await useCatalog()
const requestFetch = useRequestFetch()
const { data: collectionData } = await useAsyncData<Collection>(
  `collection-${String(route.params.slug)}`,
  () => requestFetch<Collection>(`/api/catalog/collections/${String(route.params.slug)}`),
)
const collection = collectionData.value
if (!collection) throw createError({ statusCode: 404, statusMessage: 'Коллекция не найдена' })
const category = categoryById(catalog.value, collection.categoryId)
const activeGroup = ref('')
const page = ref(1)
const perPage = 24
const productQuery = computed(() => ({
  collectionId: collection.id,
  groupId: activeGroup.value || undefined,
  limit: page.value * perPage,
}))
const { data: productData, status: productStatus } = await useAsyncData<ProductListResponse>(
  `collection-products-${collection.id}`,
  () => requestFetch<ProductListResponse>('/api/catalog/product-list', { query: productQuery.value }),
  { watch: [productQuery] },
)
const { data: relatedData } = await useAsyncData<Collection[]>(
  `collection-related-${collection.id}`,
  () => collection.relatedCollectionIds.length
    ? requestFetch<Collection[]>('/api/catalog/collections', { query: { ids: collection.relatedCollectionIds.join(',') } })
    : Promise.resolve([]),
)
const collectionProducts = computed(() => productData.value?.items ?? [])
const hasMoreProducts = computed(() => productData.value?.hasMore ?? false)
const related = computed(() => relatedData.value ?? [])
const visibleGroups = computed(() => collection.groups.filter(group => group.name.trim().toLocaleLowerCase('ru-RU') !== 'товары'))
watch(activeGroup, () => { page.value = 1 })
usePageSeo(`Коллекция ${collection.name}`, collection.description, `/collections/${collection.slug}`)
</script>

<template>
  <div>
    <section class="container-page py-10 md:py-14">
      <Breadcrumbs :items="[{ label: 'Главная', to: '/' }, { label: 'Каталог', to: '/catalog' }, { label: category?.name ?? 'Категория', to: category ? `/catalog/${category.slug}` : '/catalog' }, { label: collection.name }]" />
      <h1 class="display-title">{{ collection.name }}</h1>
      <ColorRail :colors="collection.colors" />
    </section>
    <section class="container-page pb-10">
      <CollectionGallery :images="collection.images" />
      <details class="group mt-5 border-y border-border">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">Описание коллекции <ChevronDown class="h-4 w-4 shrink-0 transition group-open:rotate-180" /></summary>
        <p class="max-w-4xl whitespace-pre-line pb-5 text-sm leading-6 text-secondary">{{ collection.description }}</p>
      </details>
    </section>
    <section class="border-y border-border bg-surface section-space"><div class="container-page grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><h2 class="text-4xl font-light">О коллекции</h2></div><dl class="border-t border-border"><div v-for="(value, key) in collection.specifications" :key="key" class="grid gap-2 border-b border-border py-4 sm:grid-cols-2"><dt class="text-sm text-secondary">{{ key }}</dt><dd class="text-sm font-medium">{{ value }}</dd></div></dl></div></section>
    <section class="container-page section-space"><div class="mb-8"><h2 class="text-4xl font-light">Товары коллекции</h2></div><div class="mb-10 flex flex-wrap gap-2"><button type="button" class="border px-4 py-2 text-sm" :class="!activeGroup ? 'border-primary bg-primary text-white' : 'border-border'" @click="activeGroup = ''">Все</button><button v-for="group in visibleGroups" :key="group.id" type="button" class="border px-4 py-2 text-sm" :class="activeGroup === group.id ? 'border-primary bg-primary text-white' : 'border-border'" @click="activeGroup = group.id">{{ group.name }}</button></div><div v-if="collectionProducts.length" class="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><ProductCard v-for="item in collectionProducts" :key="item.id" :product="item" /></div><p v-else class="bg-surface p-10 text-center text-secondary">В этой группе пока нет товаров.</p><div v-if="hasMoreProducts" class="mt-12 text-center"><button type="button" class="btn-secondary" :disabled="productStatus === 'pending'" @click="page += 1">{{ productStatus === 'pending' ? 'Загрузка…' : 'Показать ещё' }}</button></div></section>
    <section v-if="related.length" class="bg-surface section-space"><div class="container-page"><div class="mb-9 flex items-center justify-between"><div><h2 class="text-4xl font-light">Другие коллекции</h2></div><div class="hidden gap-2 md:flex"><ArrowLeft class="h-5 w-5" /><ArrowRight class="h-5 w-5" /></div></div><div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><CollectionCard v-for="item in related" :key="item.id" :collection="item" /></div></div></section>
  </div>
</template>

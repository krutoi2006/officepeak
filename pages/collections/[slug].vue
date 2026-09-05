<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import { categoryById, collectionBySlug, collections, products } from '~/data/catalog'

const route = useRoute()
const collection = collectionBySlug(String(route.params.slug))
if (!collection) throw createError({ statusCode: 404, statusMessage: 'Коллекция не найдена' })
const category = categoryById(collection.categoryId)
const activeGroup = ref('')
const collectionProducts = computed(() => products.filter(item => item.collectionId === collection.id && (!activeGroup.value || item.groupId === activeGroup.value)))
const related = collections.filter(item => collection.relatedCollectionIds.includes(item.id))
usePageSeo(`Коллекция ${collection.name}`, collection.description, `/collections/${collection.slug}`)
</script>

<template>
  <div>
    <section class="container-page py-10 md:py-14">
      <Breadcrumbs :items="[{ label: 'Главная', to: '/' }, { label: 'Каталог', to: '/catalog' }, { label: category?.name ?? 'Категория', to: category ? `/catalog/${category.slug}` : '/catalog' }, { label: collection.name }]" />
      <div class="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><h1 class="display-title">{{ collection.name }}</h1></div><p class="max-w-2xl text-lg leading-8 text-secondary">{{ collection.description }}</p></div>
      <div class="mt-10 flex flex-wrap items-center gap-3"><span class="text-sm font-medium">Цветовые исполнения:</span><span v-for="item in collection.colors" :key="item.id" class="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs"><span class="h-4 w-4 rounded-full border border-black/10" :style="{ backgroundColor: item.hex }" />{{ item.name }}</span></div>
    </section>
    <section class="container-page pb-10"><div class="flex snap-x gap-4 overflow-x-auto pb-4"><figure v-for="item in collection.images" :key="item.src" class="min-w-[86%] snap-start sm:min-w-[60%] lg:min-w-[46%]"><img :src="item.src" :alt="item.alt" class="aspect-[4/3] w-full object-cover"></figure></div></section>
    <section class="border-y border-border bg-surface section-space"><div class="container-page grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><h2 class="text-4xl font-light">О коллекции</h2></div><dl class="border-t border-border"><div v-for="(value, key) in collection.specifications" :key="key" class="grid gap-2 border-b border-border py-4 sm:grid-cols-2"><dt class="text-sm text-secondary">{{ key }}</dt><dd class="text-sm font-medium">{{ value }}</dd></div></dl></div></section>
    <section class="container-page section-space"><div class="mb-8"><h2 class="text-4xl font-light">Товары коллекции</h2></div><div class="mb-10 flex flex-wrap gap-2"><button type="button" class="border px-4 py-2 text-sm" :class="!activeGroup ? 'border-primary bg-primary text-white' : 'border-border'" @click="activeGroup = ''">Все</button><button v-for="group in collection.groups" :key="group.id" type="button" class="border px-4 py-2 text-sm" :class="activeGroup === group.id ? 'border-primary bg-primary text-white' : 'border-border'" @click="activeGroup = group.id">{{ group.name }}</button></div><div v-if="collectionProducts.length" class="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><ProductCard v-for="item in collectionProducts" :key="item.id" :product="item" /></div><p v-else class="bg-surface p-10 text-center text-secondary">В этой группе пока нет товаров.</p></section>
    <section v-if="related.length" class="bg-surface section-space"><div class="container-page"><div class="mb-9 flex items-center justify-between"><div><h2 class="text-4xl font-light">Другие коллекции</h2></div><div class="hidden gap-2 md:flex"><ArrowLeft class="h-5 w-5" /><ArrowRight class="h-5 w-5" /></div></div><div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><CollectionCard v-for="item in related" :key="item.id" :collection="item" /></div></div></section>
  </div>
</template>

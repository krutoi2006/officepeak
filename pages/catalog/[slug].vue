<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { categoryBySlug, collections, products } from '~/data/catalog'

const route = useRoute()
const category = categoryBySlug(String(route.params.slug))
if (!category) throw createError({ statusCode: 404, statusMessage: 'Категория не найдена' })
const categoryCollections = collections.filter(item => item.categoryId === category.id)
const categoryProducts = products.filter(item => item.categoryId === category.id)
usePageSeo(category.name, category.description, `/catalog/${category.slug}`)
</script>

<template>
  <div>
    <section class="container-page py-10 md:py-14">
      <Breadcrumbs :items="[{ label: 'Главная', to: '/' }, { label: 'Каталог', to: '/catalog' }, { label: category.name }]" />
      <div class="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><h1 class="display-title">{{ category.name }}</h1></div><p class="max-w-xl leading-7 text-secondary lg:justify-self-end">{{ category.description }}</p></div>
      <div v-if="category.subcategories.length" class="mt-10 flex flex-wrap gap-2" aria-label="Подкатегории"><NuxtLink v-for="item in category.subcategories" :key="item.id" :to="{ path: '/catalog', query: { category: category.id, subcategory: item.id } }" class="border border-border px-4 py-2 text-sm transition hover:border-primary hover:bg-surface">{{ item.name }}</NuxtLink></div>
    </section>
    <section v-if="categoryCollections.length" class="bg-surface section-space"><div class="container-page"><div class="mb-9"><h2 class="text-4xl font-light">Коллекции</h2></div><div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><CollectionCard v-for="item in categoryCollections" :key="item.id" :collection="item" /></div></div></section>
    <section class="container-page section-space"><div class="mb-9 flex flex-wrap items-end justify-between gap-5"><div><h2 class="text-4xl font-light">Товары</h2></div><NuxtLink :to="{ path: '/catalog', query: { category: category.id } }" class="inline-flex items-center gap-2 text-sm font-medium">Все товары <ArrowRight class="h-4 w-4" /></NuxtLink></div><div v-if="categoryProducts.length" class="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><ProductCard v-for="item in categoryProducts" :key="item.id" :product="item" /></div><div v-else class="bg-surface p-12 text-center"><h3 class="mb-2 text-2xl font-light">Товары скоро появятся</h3><p class="text-secondary">Мы добавляем товары в эту категорию.</p></div></section>
  </div>
</template>

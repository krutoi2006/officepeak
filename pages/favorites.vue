<script setup lang="ts">
import { products } from '~/data/catalog'

const { favorites } = useShop()
const list = computed(() => products.filter(product => favorites.value.includes(product.id)))
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

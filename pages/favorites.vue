<script setup lang="ts">
import { products } from '~/data/catalog'

const { favorites } = useShop()
const list = computed(() => products.filter(product => favorites.value.includes(product.id)))
</script>

<template>
  <section class="container-page py-16">
    <h1 class="mb-12 text-5xl font-light">Избранное</h1>
    <div v-if="list.length" class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <ProductCard v-for="product in list" :key="product.id" :product="product" />
    </div>
    <p v-else class="bg-surface p-12 text-center text-secondary">Вы пока ничего не добавили в избранное.</p>
  </section>
</template>

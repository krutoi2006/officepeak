<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import type { Product } from '~/types/catalog'
import { categories, formatPrice } from '~/data/catalog'
const props = defineProps<{ product: Product }>()
const { add, favorites, toggleFavorite } = useShop()
const category = computed(() => categories.find(c => c.id === props.product.categoryId)?.name)
</script>

<template>
  <article class="group flex flex-col">
    <div class="relative mb-4 aspect-[4/5] overflow-hidden bg-surface">
      <NuxtLink :to="`/product/${product.id}`"><img :src="product.image" :alt="product.name" class="h-full w-full object-cover transition duration-700 group-hover:scale-105"></NuxtLink>
      <span v-if="product.isNew" class="absolute left-4 top-4 bg-white px-2 py-1 text-[10px] uppercase tracking-wider">Новинка</span>
      <button class="absolute right-3 top-3 rounded-full bg-white/80 p-2" aria-label="Избранное" @click="toggleFavorite(product.id)"><Heart class="h-5 w-5" :class="favorites.includes(product.id) && 'fill-primary'" /></button>
      <button class="absolute inset-x-4 bottom-4 translate-y-3 bg-white py-3 text-sm font-medium opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100" :disabled="!product.inStock" @click="add(product)">{{ product.inStock ? 'В корзину' : 'Под заказ' }}</button>
    </div>
    <p class="mb-1 text-[11px] uppercase tracking-wider text-secondary">{{ category }}</p>
    <NuxtLink :to="`/product/${product.id}`" class="mb-2 text-sm font-medium hover:text-secondary">{{ product.name }}</NuxtLink>
    <div class="mt-auto flex gap-2 text-sm"><b>{{ formatPrice(product.price) }}</b><s v-if="product.oldPrice" class="text-secondary">{{ formatPrice(product.oldPrice) }}</s></div>
  </article>
</template>

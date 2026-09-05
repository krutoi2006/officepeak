<script setup lang="ts">
import { Heart, ShoppingBag } from 'lucide-vue-next'
import type { Product } from '~/types/catalog'
import { availabilityLabel, categoryById, formatPrice } from '~/data/catalog'

const props = defineProps<{ product: Product }>()
const { add, favorites, toggleFavorite } = useShop()
const selectedVariantId = ref(props.product.variants[0]?.id ?? '')
const quantity = ref(1)
const variant = computed(() => props.product.variants.find(item => item.id === selectedVariantId.value) ?? props.product.variants[0]!)
const category = computed(() => categoryById(props.product.categoryId))
const productImage = computed(() => props.product.images[variant.value.imageIndex] ?? props.product.images[0]!)
</script>

<template>
  <article class="product-card group flex h-full min-w-0 flex-col">
    <div class="relative mb-4 aspect-[4/3] overflow-hidden bg-surface">
      <NuxtLink :to="`/product/${product.slug}`" class="block h-full">
        <img :src="productImage.src" :alt="productImage.alt" loading="lazy" class="h-full w-full object-cover transition duration-700 group-hover:scale-105">
      </NuxtLink>
      <span v-if="product.isNew" class="absolute left-3 top-3 bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Новинка</span>
      <button type="button" class="icon-button absolute right-3 top-3 bg-white/90" :aria-label="favorites.includes(product.id) ? 'Удалить из избранного' : 'Добавить в избранное'" @click="toggleFavorite(product.id)">
        <Heart class="h-4 w-4" :class="favorites.includes(product.id) && 'fill-current text-accent'" />
      </button>
    </div>
    <p class="mb-1 text-[11px] uppercase tracking-[.14em] text-secondary">{{ category?.name }}</p>
    <NuxtLink :to="`/product/${product.slug}`" class="mb-2 text-base font-medium leading-snug hover:text-accent">{{ product.name }}</NuxtLink>
    <p class="mb-3 text-xs text-secondary">Арт. {{ variant.article }} · {{ variant.dimensions.label }}</p>
    <div class="mb-3 flex items-center justify-between gap-2">
      <span class="status-pill" :class="variant.availability === 'in-stock' ? 'status-in-stock' : 'status-on-order'">{{ availabilityLabel(variant.availability) }}</span>
      <select v-model="selectedVariantId" class="max-w-[56%] border-0 bg-transparent py-1 text-right text-xs text-secondary" :aria-label="`Вариант ${product.name}`">
        <option v-for="item in product.variants" :key="item.id" :value="item.id">{{ item.color.name }}</option>
      </select>
    </div>
    <div class="mb-4 mt-auto flex items-baseline gap-2">
      <strong>{{ formatPrice(variant.price) }}</strong>
      <s v-if="variant.oldPrice" class="text-sm text-secondary">{{ formatPrice(variant.oldPrice) }}</s>
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-2">
      <QuantityInput v-model="quantity" :label="`Количество ${product.name}`" />
      <button type="button" class="btn-primary px-3" @click="add(product, quantity, variant)">
        <ShoppingBag class="h-4 w-4" /> В корзину
      </button>
    </div>
  </article>
</template>

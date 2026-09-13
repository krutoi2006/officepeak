<script setup lang="ts">
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-vue-next'
import type { Product } from '~/types/catalog'
import { availabilityLabel, categoryById, formatPrice, isOrderablePrice } from '~/data/catalog'

const props = defineProps<{ product: Product }>()
const { add, favorites, toggleFavorite } = useShop()
const { open: openLead } = useLeadModal()
const { catalog } = useCatalogData()
const selectedVariantId = ref(props.product.variants[0]?.id ?? '')
const quantity = ref(1)
const galleryIndex = ref(props.product.variants[0]?.imageIndex ?? 0)
const variant = computed(() => props.product.variants.find(item => item.id === selectedVariantId.value) ?? props.product.variants[0]!)
const category = computed(() => categoryById(catalog.value, props.product.categoryId))
const productImage = computed(() => props.product.images[galleryIndex.value] ?? props.product.images[0]!)
const orderable = computed(() => isOrderablePrice(variant.value.price))

const showImage = (index: number) => {
  const count = props.product.images.length
  if (count) galleryIndex.value = (index + count) % count
}

const selectVariant = (item: Product['variants'][number]) => {
  selectedVariantId.value = item.id
  galleryIndex.value = item.imageIndex
}

watch(() => variant.value.id, () => {
  galleryIndex.value = variant.value.imageIndex
})
</script>

<template>
  <article class="product-card group flex h-full min-w-0 flex-col">
    <div class="relative mb-4 aspect-[4/3] overflow-hidden bg-white">
      <NuxtLink :to="`/product/${product.slug}`" class="block h-full">
        <img :key="productImage.src" :src="productImage.src" :alt="productImage.alt" loading="lazy" decoding="async" class="h-full w-full object-contain p-2 transition duration-300 group-hover:opacity-95 sm:p-3">
      </NuxtLink>
      <span v-if="product.isNew" class="absolute left-3 top-3 bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Новинка</span>
      <button type="button" class="icon-button absolute right-3 top-3 bg-white/90" :aria-label="favorites.includes(product.id) ? 'Удалить из избранного' : 'Добавить в избранное'" @click="toggleFavorite(product.id)">
        <Heart class="h-4 w-4" :class="favorites.includes(product.id) && 'fill-current text-accent'" />
      </button>
      <template v-if="product.images.length > 1">
        <button type="button" class="icon-button absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 opacity-100 transition md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100" :aria-label="`Предыдущее фото ${product.name}`" @click.stop.prevent="showImage(galleryIndex - 1)"><ChevronLeft class="h-4 w-4" /></button>
        <button type="button" class="icon-button absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 opacity-100 transition md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100" :aria-label="`Следующее фото ${product.name}`" @click.stop.prevent="showImage(galleryIndex + 1)"><ChevronRight class="h-4 w-4" /></button>
        <div class="absolute bottom-2 left-1/2 flex max-w-[70%] -translate-x-1/2 gap-1.5 rounded-full bg-white/85 px-2 py-1.5" aria-label="Фотографии товара">
          <button v-for="(_, index) in product.images" :key="index" type="button" class="h-1.5 w-1.5 rounded-full transition" :class="index === galleryIndex ? 'bg-primary' : 'bg-primary/30 hover:bg-primary/60'" :aria-label="`Показать фото ${index + 1} из ${product.images.length}`" :aria-current="index === galleryIndex ? 'true' : undefined" @click.stop.prevent="showImage(index)" />
        </div>
      </template>
    </div>
    <p class="mb-1 text-[11px] uppercase tracking-[.14em] text-secondary">{{ category?.name }}</p>
    <NuxtLink :to="`/product/${product.slug}`" class="mb-2 text-base font-medium leading-snug hover:text-accent">{{ product.name }}</NuxtLink>
    <p class="mb-3 text-xs text-secondary">Арт. {{ variant.article }} · {{ variant.dimensions.label }}</p>
    <div class="mb-3 flex items-center justify-between gap-2">
      <span class="status-pill" :class="variant.availability === 'in-stock' ? 'status-in-stock' : 'status-on-order'">{{ availabilityLabel(variant.availability) }}</span>
      <span class="min-w-0 truncate text-right text-xs text-secondary" :title="variant.color.name">{{ variant.color.name }}</span>
    </div>
    <div v-if="product.variants.length > 1" class="mb-4 flex max-w-full gap-2 overflow-x-auto pb-1" :aria-label="`Цвета ${product.name}`">
      <button v-for="item in product.variants" :key="item.id" type="button" class="h-7 w-7 shrink-0 rounded-full border-2 p-0.5 transition" :class="item.id === variant.id ? 'border-primary' : 'border-transparent hover:border-border'" :title="`${item.color.name} · ${item.dimensions.label}`" :aria-label="`Выбрать цвет ${item.color.name}`" :aria-pressed="item.id === variant.id" @click="selectVariant(item)">
        <span class="block h-full w-full rounded-full border border-black/10" :style="{ backgroundColor: item.color.hex }" />
      </button>
    </div>
    <div class="mb-4 mt-auto flex items-baseline gap-2">
      <strong>{{ formatPrice(variant.price) }}</strong>
      <s v-if="variant.oldPrice" class="text-sm text-secondary">{{ formatPrice(variant.oldPrice) }}</s>
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-2">
      <QuantityInput v-if="orderable" v-model="quantity" :label="`Количество ${product.name}`" />
      <button v-if="orderable" type="button" class="btn-primary px-3" @click="add(product, quantity, variant)">
        <ShoppingBag class="h-4 w-4" /> В корзину
      </button>
      <button v-else type="button" class="btn-secondary px-3" @click="openLead('manager')">Уточнить цену</button>
    </div>
  </article>
</template>

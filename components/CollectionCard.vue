<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Collection } from '~/types/catalog'
import { formatPrice } from '~/data/catalog'

const props = defineProps<{ collection: Collection }>()

const palette = computed(() => {
  const seen = new Set<string>()
  return props.collection.colors.filter((item) => {
    const key = (item.hex || item.name).trim().toLocaleLowerCase('ru-RU')
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
})
const visibleColors = computed(() => palette.value.slice(0, 8))
const remainingColors = computed(() => Math.max(0, palette.value.length - visibleColors.value.length))
</script>

<template>
  <article class="group flex h-full flex-col border border-border bg-white">
    <NuxtLink :to="`/collections/${collection.slug}`" class="relative block aspect-[4/3] overflow-hidden bg-white">
      <img :src="collection.image.src" :alt="collection.image.alt" loading="lazy" decoding="async" class="h-full w-full object-contain p-3 transition duration-300 group-hover:opacity-95 sm:p-4">
    </NuxtLink>
    <div class="flex flex-1 flex-col p-5">
      <div class="mb-4 flex items-start justify-between gap-4">
        <h3 class="text-2xl font-light">{{ collection.name }}</h3>
        <span class="text-sm text-secondary">{{ collection.priceFrom > 0 ? `от ${formatPrice(collection.priceFrom)}` : formatPrice(collection.priceFrom) }}</span>
      </div>
      <div v-if="visibleColors.length" class="mb-6 flex min-h-5 items-center gap-2" :aria-label="`Цвета коллекции ${collection.name}`">
        <span
          v-for="item in visibleColors"
          :key="item.id"
          class="h-4 w-4 shrink-0 rounded-full border border-black/15 ring-1 ring-white"
          :style="{ backgroundColor: item.hex }"
          :title="item.name"
        />
        <span v-if="remainingColors" class="ml-1 whitespace-nowrap text-xs tabular-nums text-secondary">+{{ remainingColors }}</span>
      </div>
      <NuxtLink :to="`/collections/${collection.slug}`" class="mt-auto inline-flex items-center gap-2 text-sm font-medium">
        Подробнее <ArrowUpRight class="h-4 w-4" />
      </NuxtLink>
    </div>
  </article>
</template>

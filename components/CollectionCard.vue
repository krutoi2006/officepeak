<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import type { Collection } from '~/types/catalog'
import { formatPrice } from '~/data/catalog'

defineProps<{ collection: Collection }>()
</script>

<template>
  <article class="group flex h-full flex-col border border-border bg-white">
    <NuxtLink :to="`/collections/${collection.slug}`" class="relative block aspect-[4/3] overflow-hidden bg-surface">
      <img :src="collection.image.src" :alt="collection.image.alt" loading="lazy" class="h-full w-full object-cover transition duration-700 group-hover:scale-105">
    </NuxtLink>
    <div class="flex flex-1 flex-col p-5">
      <div class="mb-4 flex items-start justify-between gap-4">
        <h3 class="text-2xl font-light">{{ collection.name }}</h3>
        <span class="text-sm text-secondary">от {{ formatPrice(collection.priceFrom) }}</span>
      </div>
      <div class="mb-6 flex gap-2" :aria-label="`Цвета коллекции ${collection.name}`">
        <span v-for="item in collection.colors" :key="item.id" class="h-4 w-4 rounded-full border border-black/10" :style="{ backgroundColor: item.hex }" :title="item.name" />
      </div>
      <NuxtLink :to="`/collections/${collection.slug}`" class="mt-auto inline-flex items-center gap-2 text-sm font-medium">
        Подробнее <ArrowUpRight class="h-4 w-4" />
      </NuxtLink>
    </div>
  </article>
</template>

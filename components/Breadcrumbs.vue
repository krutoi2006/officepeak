<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { serializeJsonLd } from '~/utils/seo'

const props = defineProps<{ items: Array<{ label: string; to?: string }> }>()
const route = useRoute()
useHead(() => ({
  script: [{
    key: `breadcrumbs-${route.path}`,
    type: 'application/ld+json',
    innerHTML: serializeJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: props.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: new URL(item.to || route.path, siteConfig.siteUrl).toString(),
      })),
    }),
  }],
}))
</script>

<template>
  <nav aria-label="Хлебные крошки" class="mb-6 overflow-x-auto text-xs text-secondary">
    <ol class="flex min-w-max items-center gap-2">
      <li v-for="(item, index) in items" :key="`${item.label}-${index}`" class="flex items-center gap-2">
        <NuxtLink v-if="item.to" :to="item.to" class="transition hover:text-primary">{{ item.label }}</NuxtLink>
        <span v-else aria-current="page" class="text-primary">{{ item.label }}</span>
        <span v-if="index < items.length - 1" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { serializeJsonLd } from '~/utils/seo'

useHead({
  script: [{
    key: 'site-structured-data',
    type: 'application/ld+json',
    innerHTML: serializeJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${siteConfig.siteUrl}/#organization`,
          name: siteConfig.name,
          url: siteConfig.siteUrl,
          telephone: siteConfig.phone,
          email: siteConfig.email,
        },
        {
          '@type': 'WebSite',
          '@id': `${siteConfig.siteUrl}/#website`,
          name: siteConfig.name,
          url: siteConfig.siteUrl,
          publisher: { '@id': `${siteConfig.siteUrl}/#organization` },
          inLanguage: 'ru-RU',
        },
      ],
    }),
  }],
})
</script>

<template>
  <a href="#main-content" class="fixed left-3 top-3 z-[100] -translate-y-20 bg-white px-4 py-3 shadow-subtle transition focus:translate-y-0">К содержанию</a>
  <NuxtLayout><NuxtPage /></NuxtLayout>
</template>

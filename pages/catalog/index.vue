<script setup lang="ts">
import { categories, products } from '~/data/catalog'
</script>
<template><section class="container-page py-14"><p class="mb-5 text-xs text-secondary">Главная / Каталог</p><h1 class="mb-4 text-5xl font-light">Каталог мебели</h1><p class="mb-12 max-w-2xl text-secondary">Современные решения для офисов, переговорных и общественных пространств.</p><div class="mb-14 flex gap-3 overflow-auto pb-2"><NuxtLink v-for="c in categories" :key="c.id" :to="`/catalog/${c.slug}`" class="whitespace-nowrap border border-border px-4 py-2 text-sm hover:border-primary">{{ c.name }}</NuxtLink></div><div class="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4"><ProductCard v-for="p in products" :key="p.id" :product="p"/></div></section></template>

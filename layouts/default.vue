<script setup lang="ts">
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-vue-next'
import { categories, formatPrice } from '~/data/catalog'
const { cartOpen, menuOpen, count, total, favorites } = useShop()
watch(useRoute(), () => menuOpen.value = false)
</script>
<template>
  <div class="flex min-h-screen flex-col">
    <header class="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur"><div class="container-page flex h-20 items-center justify-between">
      <button class="lg:hidden" @click="menuOpen=true"><Menu /></button>
      <NuxtLink to="/" class="text-2xl font-semibold tracking-tighter">OFFICE<span class="font-light">PEAK</span></NuxtLink>
      <nav class="hidden items-center gap-8 lg:flex"><NuxtLink to="/catalog">КАТАЛОГ</NuxtLink><NuxtLink to="/services">НА ЗАКАЗ</NuxtLink><NuxtLink to="/delivery">ДОСТАВКА</NuxtLink><NuxtLink to="/contacts">КОНТАКТЫ</NuxtLink></nav>
      <div class="flex items-center gap-3"><Search class="hidden h-5 sm:block"/><User class="hidden h-5 sm:block"/><NuxtLink to="/favorites" class="relative"><Heart class="h-5"/><span v-if="favorites.length" class="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary"/></NuxtLink><button class="flex items-center gap-2" @click="cartOpen=true"><ShoppingBag class="h-5"/><span v-if="count" class="text-xs">{{ count }}</span><span class="hidden text-sm lg:block">{{ formatPrice(total) }}</span></button></div>
    </div></header>
    <Transition name="fade"><div v-if="menuOpen" class="fixed inset-0 z-50 bg-black/40 lg:hidden" @click="menuOpen=false"><nav class="h-full w-[85%] max-w-sm bg-white p-6" @click.stop><div class="mb-12 flex justify-between"><b>МЕНЮ</b><button @click="menuOpen=false"><X/></button></div><div class="flex flex-col gap-6 text-xl font-light"><NuxtLink to="/">Главная</NuxtLink><NuxtLink to="/catalog">Каталог мебели</NuxtLink><NuxtLink to="/services">Индивидуальный заказ</NuxtLink><NuxtLink to="/delivery">Доставка и оплата</NuxtLink><NuxtLink to="/contacts">Контакты</NuxtLink></div></nav></div></Transition>
    <main class="flex-1"><slot /></main>
    <footer class="bg-primary py-16 text-white"><div class="container-page grid gap-10 md:grid-cols-2 lg:grid-cols-4"><div><div class="mb-5 text-2xl font-semibold">OFFICE<span class="font-light text-white/50">PEAK</span></div><p class="text-sm font-light leading-6 text-white/60">Архитектурный подход к созданию функциональных и эстетичных коммерческих пространств.</p></div><div><h3 class="mb-5 text-xs uppercase text-white/40">Каталог</h3><div class="space-y-3 text-sm font-light"><NuxtLink v-for="c in categories.slice(0,4)" :key="c.id" :to="`/catalog/${c.slug}`" class="block">{{ c.name }}</NuxtLink></div></div><div><h3 class="mb-5 text-xs uppercase text-white/40">Сервисы</h3><div class="space-y-3 text-sm font-light"><NuxtLink to="/services" class="block">Индивидуальный заказ</NuxtLink><NuxtLink to="/delivery" class="block">Доставка и сборка</NuxtLink></div></div><div><h3 class="mb-5 text-xs uppercase text-white/40">Контакты</h3><p class="text-sm">8 (800) 000-00-00</p><p class="text-sm">hello@officepeak.ru</p></div></div></footer>
    <CartDrawer />
  </div>
</template>

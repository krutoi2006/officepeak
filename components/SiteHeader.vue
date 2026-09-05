<script setup lang="ts">
import { ChevronDown, Heart, Menu, Search, ShoppingBag, X } from 'lucide-vue-next'
import { categories, formatPrice } from '~/data/catalog'
import { siteConfig } from '~/config/site'

const route = useRoute()
const { cartOpen, menuOpen, count, total, favorites } = useShop()
const { open: openLead } = useLeadModal()
const header = ref<HTMLElement | null>(null)
const catalogOpen = ref(false)
const servicesOpen = ref(false)
const query = ref('')
const mobileMenuButton = ref<HTMLButtonElement | null>(null)
const mobileNav = ref<HTMLElement | null>(null)

const services = [
  ['Дизайн-проект', '/design-project'], ['Оплата', '/payment'], ['Доставка', '/delivery'], ['Подъём', '/lifting'],
  ['Сборка', '/assembly'], ['Гарантия', '/warranty'], ['Возврат', '/returns'],
]

const closeMenus = () => { catalogOpen.value = false; servicesOpen.value = false }
const onDocumentClick = (event: MouseEvent) => {
  if (header.value && !header.value.contains(event.target as Node)) closeMenus()
}
const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') { closeMenus(); menuOpen.value = false; return }
  if (event.key !== 'Tab' || !menuOpen.value || !mobileNav.value) return
  const focusable = [...mobileNav.value.querySelectorAll<HTMLElement>('a, button, input, [tabindex]:not([tabindex="-1"])')]
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
}
const search = () => {
  const value = query.value.trim()
  if (value) navigateTo({ path: '/search', query: { q: value } })
}

watch(() => route.fullPath, () => { closeMenus(); menuOpen.value = false })
watch(menuOpen, async (value, previous) => {
  if (!import.meta.client) return
  document.body.style.overflow = value ? 'hidden' : ''
  if (value) { await nextTick(); mobileNav.value?.querySelector<HTMLElement>('button')?.focus() }
  else if (previous) mobileMenuButton.value?.focus()
})
onMounted(() => { document.addEventListener('click', onDocumentClick); document.addEventListener('keydown', onKeydown) })
onBeforeUnmount(() => { document.removeEventListener('click', onDocumentClick); document.removeEventListener('keydown', onKeydown); document.body.style.overflow = '' })
</script>

<template>
  <header ref="header" class="site-header sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
    <div class="hidden border-b border-border bg-surface lg:block">
      <div class="container-page flex h-10 items-center justify-between text-xs">
        <nav class="flex gap-6" aria-label="Разделы для клиентов">
          <NuxtLink to="/government" class="hover:text-accent">Государственным заказчикам</NuxtLink>
          <NuxtLink to="/business" class="hover:text-accent">Коммерческим организациям</NuxtLink>
          <NuxtLink to="/designers" class="hover:text-accent">Дизайнерам</NuxtLink>
        </nav>
        <div class="flex items-center gap-5">
          <button type="button" class="font-medium hover:text-accent" @click="openLead('callback')">Заказать звонок</button>
          <button type="button" class="font-medium text-accent hover:text-primary" @click="openLead('design')">Дизайн-проект</button>
        </div>
      </div>
    </div>
    <div class="container-page flex h-[76px] items-center gap-4 lg:h-[88px]">
      <button ref="mobileMenuButton" type="button" class="icon-button lg:hidden" aria-label="Открыть меню" @click="menuOpen = true"><Menu class="h-5 w-5" /></button>
      <NuxtLink to="/" class="shrink-0" aria-label="OFFICEPEAK — главная">
        <span class="block text-xl font-semibold tracking-[-.06em] sm:text-2xl">OFFICE<span class="font-light">PEAK</span></span>
        <span class="hidden text-[9px] tracking-wide text-secondary xl:block">{{ siteConfig.tagline }}</span>
      </NuxtLink>
      <nav class="ml-5 hidden h-full items-center gap-7 text-sm lg:flex" aria-label="Основная навигация">
        <div class="relative flex h-full items-center">
          <button type="button" class="inline-flex items-center gap-1.5 font-medium" :aria-expanded="catalogOpen" @click.stop="catalogOpen = !catalogOpen; servicesOpen = false">Каталог <ChevronDown class="h-4 w-4" /></button>
          <div v-if="catalogOpen" class="absolute left-0 top-full w-[720px] border border-border bg-white p-7 shadow-subtle" role="menu">
            <div class="grid grid-cols-3 gap-x-6 gap-y-4">
              <NuxtLink v-for="category in categories" :key="category.id" :to="`/catalog/${category.slug}`" class="text-sm hover:text-accent" role="menuitem">{{ category.name }}</NuxtLink>
            </div>
            <NuxtLink to="/catalog" class="mt-6 inline-block border-t border-border pt-5 text-sm font-medium text-accent">Весь каталог</NuxtLink>
          </div>
        </div>
        <NuxtLink to="/custom-furniture">Мебель на заказ</NuxtLink>
        <div class="relative flex h-full items-center">
          <button type="button" class="inline-flex items-center gap-1.5" :aria-expanded="servicesOpen" @click.stop="servicesOpen = !servicesOpen; catalogOpen = false">Услуги <ChevronDown class="h-4 w-4" /></button>
          <div v-if="servicesOpen" class="absolute left-0 top-full w-64 border border-border bg-white p-5 shadow-subtle" role="menu">
            <NuxtLink v-for="service in services" :key="service[1]" :to="service[1]" class="block py-2 text-sm hover:text-accent" role="menuitem">{{ service[0] }}</NuxtLink>
          </div>
        </div>
        <NuxtLink to="/contacts">Контакты</NuxtLink>
      </nav>
      <form class="ml-auto hidden w-full max-w-[230px] items-center border-b border-border xl:flex" role="search" @submit.prevent="search">
        <label class="sr-only" for="header-search">Поиск по каталогу</label>
        <input id="header-search" v-model="query" class="w-full bg-transparent py-2 text-sm outline-none" placeholder="Название или артикул">
        <button type="submit" class="p-2" aria-label="Найти"><Search class="h-4 w-4" /></button>
      </form>
      <div class="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 xl:ml-3">
        <NuxtLink to="/search" class="icon-button xl:hidden" aria-label="Поиск"><Search class="h-5 w-5" /></NuxtLink>
        <NuxtLink to="/favorites" class="icon-button relative" aria-label="Избранное"><Heart class="h-5 w-5" /><span v-if="favorites.length" class="counter-dot">{{ favorites.length }}</span></NuxtLink>
        <button type="button" class="relative inline-flex h-10 items-center gap-2 border border-border px-3" aria-label="Открыть корзину" @click="cartOpen = true">
          <ShoppingBag class="h-5 w-5" /><span v-if="count" class="text-xs font-semibold">{{ count }}</span><span class="hidden text-xs xl:block">{{ formatPrice(total) }}</span>
        </button>
      </div>
    </div>
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="menuOpen" class="fixed inset-0 z-50 bg-black/45 lg:hidden" role="dialog" aria-modal="true" aria-label="Мобильное меню" @click="menuOpen = false">
          <nav ref="mobileNav" class="h-full w-[88%] max-w-sm overflow-y-auto bg-white p-6" @click.stop>
            <div class="mb-10 flex items-center justify-between"><b class="text-lg">OFFICEPEAK</b><button type="button" class="icon-button" aria-label="Закрыть меню" @click="menuOpen = false"><X class="h-5 w-5" /></button></div>
            <div class="flex flex-col gap-5 text-xl font-light">
              <NuxtLink to="/">Главная</NuxtLink><NuxtLink to="/catalog">Каталог</NuxtLink><NuxtLink to="/custom-furniture">Мебель на заказ</NuxtLink><NuxtLink to="/design-project">Дизайн-проект</NuxtLink><NuxtLink to="/delivery">Доставка</NuxtLink><NuxtLink to="/contacts">Контакты</NuxtLink>
            </div>
            <div class="my-8 border-t border-border" />
            <div class="flex flex-col gap-3 text-sm text-secondary"><NuxtLink to="/government">Государственным заказчикам</NuxtLink><NuxtLink to="/business">Коммерческим организациям</NuxtLink><NuxtLink to="/designers">Дизайнерам</NuxtLink></div>
            <div class="mt-8 grid gap-3"><button type="button" class="btn-primary" @click="menuOpen = false; openLead('callback')">Заказать звонок</button><button type="button" class="btn-secondary" @click="menuOpen = false; openLead('design')">Дизайн-проект</button></div>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

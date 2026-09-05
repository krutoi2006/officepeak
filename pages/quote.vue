<script setup lang="ts">
import { Copy, Printer, Share2 } from 'lucide-vue-next'
import { availabilityLabel, formatPrice } from '~/data/catalog'
import { publicOfferDisclaimer, siteConfig } from '~/config/site'

const { items, total } = useShop()
const client = reactive({ name: '', company: '', email: '', phone: '' })
const shareStatus = ref('')
const date = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long' }).format(new Date())
const printQuote = () => window.print()
const shareText = computed(() => [`Коммерческое предложение OFFICEPEAK от ${date}`, client.company || client.name || 'Клиент не указан', ...items.value.map(item => `${item.product.name}, ${item.variant.article}, ${item.quantity} шт. — ${formatPrice(item.lineTotal)}`), `Итого: ${formatPrice(total.value)}`, siteConfig.phone, siteConfig.email].join('\n'))
const share = async () => {
  shareStatus.value = ''
  if (navigator.share) {
    try { await navigator.share({ title: 'Коммерческое предложение OFFICEPEAK', text: shareText.value, url: location.href }); shareStatus.value = 'Предложение передано в меню «Поделиться».'; return } catch (error: any) { if (error?.name === 'AbortError') return }
  }
  try { await navigator.clipboard.writeText(`${shareText.value}\n${location.href}`); shareStatus.value = 'Текст и ссылка скопированы.' } catch { shareStatus.value = 'Скопируйте ссылку из адресной строки браузера.' }
}
const copy = async () => { try { await navigator.clipboard.writeText(shareText.value); shareStatus.value = 'Текст предложения скопирован.' } catch { shareStatus.value = 'Не удалось скопировать автоматически.' } }
usePageSeo('Коммерческое предложение', 'Предварительный просмотр коммерческого предложения по товарам OFFICEPEAK.', '/quote')
</script>

<template>
  <section class="container-page py-10 md:py-14">
    <div class="no-print"><Breadcrumbs :items="[{ label: 'Главная', to: '/' }, { label: 'Корзина', to: '/cart' }, { label: 'Коммерческое предложение' }]" /><div class="mb-8 flex flex-wrap items-end justify-between gap-6"><div><h1 class="display-title">Коммерческое предложение</h1></div><div v-if="items.length" class="flex flex-wrap gap-2"><button type="button" class="btn-secondary" @click="printQuote"><Printer class="h-4 w-4" /> Печать / PDF</button><button type="button" class="btn-secondary" @click="copy"><Copy class="h-4 w-4" /> Копировать</button><button type="button" class="btn-primary" @click="share"><Share2 class="h-4 w-4" /> Поделиться</button></div></div><p v-if="shareStatus" class="mb-6 text-sm text-accent">{{ shareStatus }}</p><div v-if="items.length" class="mb-10 grid gap-4 border border-border p-5 sm:grid-cols-2 lg:grid-cols-4"><label class="field-label">Контактное лицо<input v-model="client.name" class="field-input"></label><label class="field-label">Компания<input v-model="client.company" class="field-input"></label><label class="field-label">Телефон<input v-model="client.phone" type="tel" class="field-input"></label><label class="field-label">Email<input v-model="client.email" type="email" class="field-input"></label></div></div>
    <article v-if="items.length" class="quote-sheet mx-auto max-w-6xl border border-border bg-white p-5 sm:p-8 lg:p-12">
      <header class="mb-10 flex flex-col justify-between gap-6 border-b-2 border-primary pb-7 sm:flex-row sm:items-end"><div><p class="text-2xl font-semibold tracking-[-.06em]">OFFICE<span class="font-light">PEAK</span></p><p class="mt-2 text-xs text-secondary">{{ siteConfig.tagline }}</p></div><div class="text-sm sm:text-right"><p><b>Коммерческое предложение</b></p><p>{{ date }}</p></div></header>
      <section class="mb-9 grid gap-3 text-sm sm:grid-cols-2"><div><h2 class="mb-2 text-lg font-medium">Контакты OFFICEPEAK</h2><p>{{ siteConfig.phone }}</p><p>{{ siteConfig.email }}</p></div><div><h2 class="mb-2 text-lg font-medium">Клиент</h2><p>{{ client.company || 'Компания не указана' }}</p><p>{{ client.name || 'Контактное лицо не указано' }}</p><p v-if="client.phone">{{ client.phone }}</p><p v-if="client.email">{{ client.email }}</p></div></section>
      <h2 class="mb-5 text-2xl font-light">Состав предложения</h2>
      <div class="space-y-4"><article v-for="item in items" :key="item.key" class="grid gap-4 border-b border-border pb-5 sm:grid-cols-[90px_1fr_auto]"><img :src="item.product.images[item.variant.imageIndex]?.src ?? item.product.images[0]?.src" :alt="item.product.name" class="aspect-square w-full object-cover"><div><h3 class="font-medium">{{ item.product.name }}</h3><p class="mt-1 text-xs text-secondary">Арт. {{ item.variant.article }}</p><p class="mt-2 text-sm">{{ item.variant.color.name }} · {{ item.variant.dimensions.label }}</p><p class="mt-1 text-xs" :class="item.variant.availability === 'in-stock' ? 'text-emerald-700' : 'text-amber-700'">{{ availabilityLabel(item.variant.availability) }}</p></div><div class="text-sm sm:text-right"><p>{{ item.quantity }} × {{ formatPrice(item.variant.price) }}</p><b class="mt-2 block">{{ formatPrice(item.lineTotal) }}</b></div></article></div>
      <div class="mt-8 flex justify-end"><div class="w-full max-w-sm border-t-2 border-primary pt-4"><div class="flex justify-between text-xl"><span>Итого</span><b>{{ formatPrice(total) }}</b></div></div></div>
      <p class="mt-12 text-xs leading-5 text-secondary">{{ publicOfferDisclaimer }} Цены и услуги подтвердит менеджер. Это не счёт на оплату.</p>
    </article>
    <div v-else class="bg-surface p-12 text-center"><h2 class="mb-3 text-3xl font-light">Предложение пусто</h2><p class="mb-7 text-secondary">Добавьте товары в корзину.</p><NuxtLink to="/catalog" class="btn-primary">Перейти в каталог</NuxtLink></div>
  </section>
</template>

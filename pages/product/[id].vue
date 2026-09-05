<script setup lang="ts">
import { Heart, Maximize2, ShoppingBag, X } from 'lucide-vue-next'
import { availabilityLabel, categoryById, collectionById, formatPrice, productById, products } from '~/data/catalog'

const route = useRoute()
const product = productById(String(route.params.id))
if (!product) throw createError({ statusCode: 404, statusMessage: 'Товар не найден' })
const category = categoryById(product.categoryId)
const collection = collectionById(product.collectionId)
const selectedVariantId = ref(product.variants[0]?.id ?? '')
const quantity = ref(1)
const galleryIndex = ref(0)
const zoomOpen = ref(false)
const { add, favorites, toggleFavorite } = useShop()
const { open: openLead } = useLeadModal()
const variant = computed(() => product.variants.find(item => item.id === selectedVariantId.value) ?? product.variants[0]!)
const image = computed(() => product.images[galleryIndex.value] ?? product.images[0]!)
const related = products.filter(item => item.id !== product.id && (item.collectionId === product.collectionId || item.categoryId === product.categoryId)).slice(0, 4)

watch(variant, value => { galleryIndex.value = value.imageIndex })
usePageSeo(product.name, product.description, `/product/${product.slug}`)
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: product.name, sku: variant.value.article, image: product.images.map(item => item.src), description: product.description, offers: { '@type': 'Offer', priceCurrency: 'RUB', price: variant.value.price, availability: variant.value.availability === 'in-stock' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder' } }) }] })
</script>

<template>
  <div>
    <section class="container-page py-10 md:py-14">
      <Breadcrumbs :items="[{ label: 'Главная', to: '/' }, { label: 'Каталог', to: '/catalog' }, { label: category?.name ?? 'Категория', to: category ? `/catalog/${category.slug}` : '/catalog' }, { label: product.name }]" />
      <div class="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div>
          <button type="button" class="group relative block aspect-[4/3] w-full overflow-hidden bg-surface" aria-label="Увеличить изображение" @click="zoomOpen = true"><img :src="image.src" :alt="image.alt" class="h-full w-full object-cover"><span class="icon-button absolute bottom-4 right-4 bg-white"><Maximize2 class="h-4 w-4" /></span></button>
          <div class="mt-3 grid grid-cols-3 gap-3"><button v-for="(item, index) in product.images" :key="item.src" type="button" class="aspect-[4/3] overflow-hidden border" :class="index === galleryIndex ? 'border-primary' : 'border-transparent'" :aria-label="`Показать изображение ${index + 1}`" @click="galleryIndex = index"><img :src="item.src" :alt="item.alt" loading="lazy" class="h-full w-full object-cover"></button></div>
        </div>
        <div class="lg:py-3">
          <div class="mb-4 flex flex-wrap items-center gap-3"><span class="status-pill" :class="variant.availability === 'in-stock' ? 'status-in-stock' : 'status-on-order'">{{ availabilityLabel(variant.availability) }}</span><span class="text-xs uppercase tracking-wide text-secondary">Артикул {{ variant.article }}</span></div>
          <h1 class="mb-5 text-4xl font-light leading-[1.05] sm:text-5xl">{{ product.name }}</h1>
          <p v-if="collection" class="mb-7 text-sm text-secondary">Коллекция <NuxtLink :to="`/collections/${collection.slug}`" class="underline">{{ collection.name }}</NuxtLink></p>
          <div class="mb-8 flex items-baseline gap-3"><strong class="text-2xl">{{ formatPrice(variant.price) }}</strong><s v-if="variant.oldPrice" class="text-secondary">{{ formatPrice(variant.oldPrice) }}</s></div>
          <fieldset class="mb-7"><legend class="mb-3 text-sm font-medium">Вариант: {{ variant.color.name }}, {{ variant.dimensions.label }}</legend><div class="grid gap-2 sm:grid-cols-2"><button v-for="item in product.variants" :key="item.id" type="button" class="flex items-center gap-3 border p-3 text-left text-sm" :class="item.id === variant.id ? 'border-primary bg-surface' : 'border-border'" @click="selectedVariantId = item.id"><span class="h-6 w-6 shrink-0 rounded-full border border-black/10" :style="{ backgroundColor: item.color.hex }" /><span><b class="block">{{ item.color.name }}</b><span class="text-xs text-secondary">{{ item.dimensions.label }}</span></span></button></div></fieldset>
          <div class="mb-7 grid gap-3 sm:grid-cols-[auto_1fr_auto]"><QuantityInput v-model="quantity" :label="`Количество ${product.name}`" /><button type="button" class="btn-primary" @click="add(product, quantity, variant)"><ShoppingBag class="h-4 w-4" /> Добавить в корзину</button><button type="button" class="btn-secondary px-4" :aria-label="favorites.includes(product.id) ? 'Удалить из избранного' : 'Добавить в избранное'" @click="toggleFavorite(product.id)"><Heart class="h-5 w-5" :class="favorites.includes(product.id) && 'fill-current text-accent'" /></button></div>
          <p class="mb-7 leading-7 text-secondary">{{ product.description }}</p>
          <button type="button" class="text-sm font-medium underline underline-offset-4" @click="openLead('callback')">Получить консультацию</button>
          <dl class="mt-9 border-t border-border"><div class="grid grid-cols-2 gap-4 border-b border-border py-4"><dt class="text-sm text-secondary">Цвет и материал</dt><dd class="text-sm font-medium">{{ variant.color.name }} · {{ variant.color.material }}</dd></div><div class="grid grid-cols-2 gap-4 border-b border-border py-4"><dt class="text-sm text-secondary">Размер</dt><dd class="text-sm font-medium">{{ variant.dimensions.label }}</dd></div><div class="grid grid-cols-2 gap-4 border-b border-border py-4"><dt class="text-sm text-secondary">Статус</dt><dd class="text-sm font-medium">{{ availabilityLabel(variant.availability) }}</dd></div></dl>
        </div>
      </div>
    </section>
    <section class="bg-surface section-space"><div class="container-page grid gap-12 lg:grid-cols-2"><div><h2 class="mb-6 text-4xl font-light">О товаре</h2><p class="mb-6 max-w-xl leading-7 text-secondary">{{ product.description }}</p><ul class="space-y-3 text-sm"><li v-for="item in product.features" :key="item" class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{{ item }}</li></ul></div><div><h2 class="mb-5 text-2xl font-light">Характеристики</h2><dl class="border-t border-border"><div v-for="(value, key) in product.specifications" :key="key" class="grid grid-cols-2 gap-4 border-b border-border py-4 text-sm"><dt class="text-secondary">{{ key }}</dt><dd class="font-medium">{{ value }}</dd></div></dl><h3 class="mb-3 mt-8 text-xl font-medium">Материалы</h3><p class="text-sm leading-6 text-secondary">{{ product.materials.join(' · ') }}</p><h3 class="mb-3 mt-8 text-xl font-medium">Гарантия</h3><p class="text-sm leading-6 text-secondary">{{ product.warranty }}</p></div></div></section>
    <section class="container-page section-space"><div class="grid gap-px bg-border md:grid-cols-3"><article v-for="item in [{ title: 'Доставка', text: 'Рассчитаем для вашего адреса.', to: '/delivery' }, { title: 'Оплата', text: 'Укажем способ оплаты в заказе.', to: '/payment' }, { title: 'Сборка', text: 'Соберём мебель в вашем офисе.', to: '/assembly' }]" :key="item.to" class="bg-white p-7"><h2 class="mb-3 text-2xl font-light">{{ item.title }}</h2><p class="mb-5 text-sm leading-6 text-secondary">{{ item.text }}</p><NuxtLink :to="item.to" class="text-sm font-medium underline">Подробнее</NuxtLink></article></div></section>
    <section v-if="related.length" class="bg-surface section-space"><div class="container-page"><div class="mb-9"><h2 class="text-4xl font-light">Похожие товары</h2></div><div class="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"><ProductCard v-for="item in related" :key="item.id" :product="item" /></div></div></section>
    <Teleport to="body"><div v-if="zoomOpen" class="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label="Увеличенное изображение" @click.self="zoomOpen = false"><button type="button" class="icon-button absolute right-4 top-4 border-white/30 text-white" aria-label="Закрыть" @click="zoomOpen = false"><X class="h-5 w-5" /></button><img :src="image.src" :alt="image.alt" class="max-h-[90vh] max-w-[95vw] object-contain"></div></Teleport>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown, ChevronLeft, ChevronRight, Heart, Maximize2, ShoppingBag, X } from 'lucide-vue-next'
import { availabilityLabel, categoryById, formatPrice, isOrderablePrice } from '~/data/catalog'
import type { Collection, Product, ProductListResponse } from '~/types/catalog'

const route = useRoute()
const { catalog } = await useCatalog()
const requestFetch = useCatalogRequest()
const { data: productData } = await useAsyncData<Product>(
  `product-${String(route.params.id)}`,
  () => requestFetch<Product>(`/api/catalog/products/${String(route.params.id)}`),
)
const product = productData.value
if (!product) throw createError({ statusCode: 404, statusMessage: 'Товар не найден' })
const category = categoryById(catalog.value, product.categoryId)
const { data: collectionData } = await useAsyncData<Collection | null>(
  `product-collection-${product.collectionId ?? 'none'}`,
  () => product.collectionId
    ? requestFetch<Collection>(`/api/catalog/collections/${product.collectionId}`)
    : Promise.resolve(null),
)
const collection = collectionData.value
const selectedVariantId = ref(product.variants[0]?.id ?? '')
const quantity = ref(1)
const galleryIndex = ref(0)
const zoomOpen = ref(false)
const { add, favorites, toggleFavorite, registerProduct } = useShop()
registerProduct(product)
const { open: openLead } = useLeadModal()
const variant = computed(() => product.variants.find(item => item.id === selectedVariantId.value) ?? product.variants[0]!)
const orderable = computed(() => isOrderablePrice(variant.value.price))
const image = computed(() => product.images[galleryIndex.value] ?? product.images[0]!)
const { data: relatedData } = await useAsyncData<ProductListResponse>(
  `product-related-${product.id}`,
  () => requestFetch<ProductListResponse>('/api/catalog/product-list', {
    query: {
      collectionId: product.collectionId || undefined,
      categoryId: product.collectionId ? undefined : product.categoryId,
      limit: 5,
    },
  }),
)
const related = computed(() => (relatedData.value?.items ?? []).filter(item => item.id !== product.id).slice(0, 4))

const showImage = (index: number) => {
  const count = product.images.length
  if (count) galleryIndex.value = (index + count) % count
}

watch(variant, value => { galleryIndex.value = value.imageIndex })
usePageSeo(product.name, product.description, `/product/${product.slug}`)
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: product.name, sku: variant.value.article, image: product.images.map(item => item.src), description: product.description, ...(orderable.value ? { offers: { '@type': 'Offer', priceCurrency: 'RUB', price: variant.value.price, availability: variant.value.availability === 'in-stock' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder' } } : {}) }) }] })
</script>

<template>
  <div>
    <section class="container-page py-10 md:py-14">
      <Breadcrumbs :items="[{ label: 'Главная', to: '/' }, { label: 'Каталог', to: '/catalog' }, { label: category?.name ?? 'Категория', to: category ? `/catalog/${category.slug}` : '/catalog' }, { label: product.name }]" />
      <div class="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div>
          <div class="group relative aspect-[4/3] w-full overflow-hidden bg-surface">
            <button type="button" class="block h-full w-full" aria-label="Увеличить изображение" @click="zoomOpen = true"><img :key="image.src" :src="image.src" :alt="image.alt" class="h-full w-full object-contain p-3 sm:p-5"><span class="icon-button absolute bottom-4 right-4 bg-white"><Maximize2 class="h-4 w-4" /></span></button>
            <template v-if="product.images.length > 1">
              <button type="button" class="icon-button absolute left-4 top-1/2 -translate-y-1/2 bg-white/90" aria-label="Предыдущее изображение" @click="showImage(galleryIndex - 1)"><ChevronLeft class="h-5 w-5" /></button>
              <button type="button" class="icon-button absolute right-4 top-1/2 -translate-y-1/2 bg-white/90" aria-label="Следующее изображение" @click="showImage(galleryIndex + 1)"><ChevronRight class="h-5 w-5" /></button>
            </template>
          </div>
          <div v-if="product.images.length > 1" class="mt-3 flex gap-3 overflow-x-auto pb-1"><button v-for="(item, index) in product.images" :key="item.src" type="button" class="aspect-[4/3] w-28 shrink-0 overflow-hidden border bg-white sm:w-36" :class="index === galleryIndex ? 'border-primary' : 'border-transparent'" :aria-label="`Показать изображение ${index + 1}`" @click="showImage(index)"><img :src="item.src" :alt="item.alt" loading="lazy" class="h-full w-full object-contain p-1"></button></div>
          <details class="group mt-5 border-y border-border">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">Описание товара <ChevronDown class="h-4 w-4 shrink-0 transition group-open:rotate-180" /></summary>
            <p class="whitespace-pre-line pb-5 text-sm leading-6 text-secondary">{{ product.description }}</p>
          </details>
        </div>
        <div class="lg:py-3">
          <div class="mb-4 flex flex-wrap items-center gap-3"><span class="status-pill" :class="variant.availability === 'in-stock' ? 'status-in-stock' : 'status-on-order'">{{ availabilityLabel(variant.availability) }}</span><span class="text-xs uppercase tracking-wide text-secondary">Артикул {{ variant.article }}</span></div>
          <h1 class="mb-5 text-4xl font-light leading-[1.05] sm:text-5xl">{{ product.name }}</h1>
          <p v-if="collection" class="mb-7 text-sm text-secondary">Коллекция <NuxtLink :to="`/collections/${collection.slug}`" class="underline">{{ collection.name }}</NuxtLink></p>
          <div class="mb-8 flex items-baseline gap-3"><strong class="text-2xl">{{ formatPrice(variant.price) }}</strong><s v-if="variant.oldPrice" class="text-secondary">{{ formatPrice(variant.oldPrice) }}</s></div>
          <fieldset class="mb-7"><legend class="mb-3 text-sm font-medium">Вариант: {{ variant.color.name }}, {{ variant.dimensions.label }}</legend><div class="grid gap-2 sm:grid-cols-2"><button v-for="item in product.variants" :key="item.id" type="button" class="flex items-center gap-3 border p-3 text-left text-sm" :class="item.id === variant.id ? 'border-primary bg-surface' : 'border-border'" @click="selectedVariantId = item.id"><span class="h-6 w-6 shrink-0 rounded-full border border-black/10" :style="{ backgroundColor: item.color.hex }" /><span><b class="block">{{ item.color.name }}</b><span class="text-xs text-secondary">{{ item.dimensions.label }}</span></span></button></div></fieldset>
          <div class="mb-7 grid gap-3 sm:grid-cols-[auto_1fr_auto]"><QuantityInput v-if="orderable" v-model="quantity" :label="`Количество ${product.name}`" /><button v-if="orderable" type="button" class="btn-primary" @click="add(product, quantity, variant)"><ShoppingBag class="h-4 w-4" /> Добавить в корзину</button><button v-else type="button" class="btn-primary sm:col-span-2" @click="openLead('manager')">Уточнить цену</button><button type="button" class="btn-secondary px-4" :aria-label="favorites.includes(product.id) ? 'Удалить из избранного' : 'Добавить в избранное'" @click="toggleFavorite(product.id)"><Heart class="h-5 w-5" :class="favorites.includes(product.id) && 'fill-current text-accent'" /></button></div>
          <button type="button" class="text-sm font-medium underline underline-offset-4" @click="openLead('callback')">Получить консультацию</button>
          <dl class="mt-9 border-t border-border"><div class="grid grid-cols-2 gap-4 border-b border-border py-4"><dt class="text-sm text-secondary">Цвет и материал</dt><dd class="text-sm font-medium">{{ variant.color.name }} · {{ variant.color.material }}</dd></div><div class="grid grid-cols-2 gap-4 border-b border-border py-4"><dt class="text-sm text-secondary">Размер</dt><dd class="text-sm font-medium">{{ variant.dimensions.label }}</dd></div><div class="grid grid-cols-2 gap-4 border-b border-border py-4"><dt class="text-sm text-secondary">Статус</dt><dd class="text-sm font-medium">{{ availabilityLabel(variant.availability) }}</dd></div></dl>
        </div>
      </div>
    </section>
    <section class="bg-surface section-space"><div class="container-page grid gap-12 lg:grid-cols-2"><div><h2 class="mb-6 text-4xl font-light">Особенности</h2><ul v-if="product.features.length" class="space-y-3 text-sm"><li v-for="item in product.features" :key="item" class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{{ item }}</li></ul><p v-else class="text-sm text-secondary">Дополнительные особенности уточняйте у менеджера.</p></div><div><h2 class="mb-5 text-2xl font-light">Характеристики</h2><dl class="border-t border-border"><div v-for="(value, key) in product.specifications" :key="key" class="grid grid-cols-2 gap-4 border-b border-border py-4 text-sm"><dt class="text-secondary">{{ key }}</dt><dd class="font-medium">{{ value }}</dd></div></dl><h3 class="mb-3 mt-8 text-xl font-medium">Материалы</h3><p class="text-sm leading-6 text-secondary">{{ product.materials.join(' · ') }}</p><h3 class="mb-3 mt-8 text-xl font-medium">Гарантия</h3><p class="text-sm leading-6 text-secondary">{{ product.warranty }}</p></div></div></section>
    <section class="container-page section-space"><div class="grid gap-px bg-border md:grid-cols-3"><article v-for="item in [{ title: 'Доставка', text: 'Рассчитаем для вашего адреса.', to: '/delivery' }, { title: 'Оплата', text: 'Укажем способ оплаты в заказе.', to: '/payment' }, { title: 'Сборка', text: 'Соберём мебель в вашем офисе.', to: '/assembly' }]" :key="item.to" class="bg-white p-7"><h2 class="mb-3 text-2xl font-light">{{ item.title }}</h2><p class="mb-5 text-sm leading-6 text-secondary">{{ item.text }}</p><NuxtLink :to="item.to" class="text-sm font-medium underline">Подробнее</NuxtLink></article></div></section>
    <section v-if="related.length" class="bg-surface section-space"><div class="container-page"><div class="mb-9"><h2 class="text-4xl font-light">Похожие товары</h2></div><div class="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"><ProductCard v-for="item in related" :key="item.id" :product="item" /></div></div></section>
    <Teleport to="body"><div v-if="zoomOpen" class="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label="Увеличенное изображение" @click.self="zoomOpen = false"><button type="button" class="icon-button absolute right-4 top-4 border-white/30 text-white" aria-label="Закрыть" @click="zoomOpen = false"><X class="h-5 w-5" /></button><img :src="image.src" :alt="image.alt" class="max-h-[90vh] max-w-[95vw] object-contain"></div></Teleport>
  </div>
</template>

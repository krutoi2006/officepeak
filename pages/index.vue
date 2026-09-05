<script setup lang="ts">
import { ArrowRight, Blocks, Box, BriefcaseBusiness, DraftingCompass, Handshake, Landmark, Layers3, Move3d, ShieldCheck } from 'lucide-vue-next'
import { categories, collections, products } from '~/data/catalog'
import { demoMedia } from '~/data/demoMedia'

const { open: openLead } = useLeadModal()
const featuredCollections = collections.filter(item => item.isFeatured).slice(0, 4)
const featuredProducts = products.filter(item => item.isRecommended || item.isNew).slice(0, 4)
const services = [
  { title: 'Дизайн-проект', to: '/design-project', icon: DraftingCompass },
  { title: 'Оплата', to: '/payment', icon: ShieldCheck },
  { title: 'Доставка', to: '/delivery', icon: Box },
  { title: 'Подъём', to: '/lifting', icon: Move3d },
  { title: 'Сборка', to: '/assembly', icon: Blocks },
  { title: 'Гарантия', to: '/warranty', icon: ShieldCheck },
  { title: 'Возврат', to: '/returns', icon: ArrowRight },
]
const audiences = [
  { title: 'Госзаказчикам', text: 'Подберём мебель для закупки.', to: '/government', icon: Landmark },
  { title: 'Для бизнеса', text: 'Подберём мебель для вашего офиса.', to: '/business', icon: BriefcaseBusiness },
  { title: 'Дизайнерам', text: 'Поможем выбрать мебель и материалы.', to: '/designers', icon: Layers3 },
]
usePageSeo('Офисная мебель', 'Офисная мебель OFFICEPEAK для работы, встреч и отдыха.', '/')
</script>

<template>
  <div>
    <HeroSlider />

    <section class="container-page section-space">
      <div class="mb-10 grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div><h2 class="display-title">Мебель для офиса</h2></div>
        <p class="max-w-2xl text-base leading-7 text-secondary lg:justify-self-end">Столы, кресла, шкафы и мебель для разных зон.</p>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <NuxtLink v-for="category in categories" :key="category.id" :to="`/catalog/${category.slug}`" class="group relative aspect-[4/3] overflow-hidden bg-surface">
          <img :src="category.image.src" :alt="category.image.alt" loading="lazy" class="h-full w-full object-cover transition duration-700 group-hover:scale-105">
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white"><h3 class="text-xl font-light">{{ category.name }}</h3><ArrowRight class="h-5 w-5 shrink-0 transition group-hover:translate-x-1" /></div>
        </NuxtLink>
      </div>
    </section>

    <section class="bg-surface section-space">
      <div class="container-page"><div class="mb-10 flex items-end justify-between gap-6"><div><h2 class="display-title">Популярные коллекции</h2></div><NuxtLink to="/catalog" class="hidden text-sm underline underline-offset-4 md:block">Смотреть все</NuxtLink></div><div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4"><CollectionCard v-for="collection in featuredCollections" :key="collection.id" :collection="collection" /></div></div>
    </section>

    <section class="container-page section-space">
      <div class="mb-10"><h2 class="display-title">Новые товары</h2></div>
      <div class="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"><ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" /></div>
    </section>

    <section class="border-y border-border bg-white section-space">
      <div class="container-page"><div class="mb-10 grid gap-5 lg:grid-cols-2"><div><h2 class="display-title">Все услуги в одном месте</h2></div><p class="max-w-xl self-end text-secondary">Поможем с проектом, доставкой и сборкой мебели.</p></div><div class="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4"><NuxtLink v-for="service in services" :key="service.to" :to="service.to" class="group min-h-40 border-b border-r border-border p-5 transition hover:bg-surface"><component :is="service.icon" class="mb-8 h-6 w-6 stroke-1 text-accent" /><h3 class="flex items-center justify-between gap-3 text-lg font-medium">{{ service.title }}<ArrowRight class="h-4 w-4 transition group-hover:translate-x-1" /></h3></NuxtLink></div></div>
    </section>

    <section class="container-page section-space grid gap-10 lg:grid-cols-2 lg:items-center">
      <img :src="demoMedia.project" alt="Мебель в офисе" loading="lazy" class="aspect-[4/3] h-full w-full object-cover">
      <div class="lg:px-10"><h2 class="mb-6 display-title">Мебель на заказ</h2><p class="mb-8 max-w-xl leading-7 text-secondary">Сделаем мебель под размеры и задачи вашего офиса.</p><div class="flex flex-wrap gap-3"><NuxtLink to="/custom-furniture" class="btn-primary">Подробнее</NuxtLink><button type="button" class="btn-secondary" @click="openLead('manager')">Вызвать менеджера</button></div></div>
    </section>

    <section class="bg-primary section-space text-white">
      <div class="container-page"><div class="mb-10"><h2 class="display-title max-w-3xl">Работаем с компаниями</h2></div><div class="grid gap-px bg-white/15 lg:grid-cols-3"><article v-for="audience in audiences" :key="audience.to" class="bg-primary p-7 sm:p-9"><component :is="audience.icon" class="mb-16 h-8 w-8 stroke-1 text-accentSoft" /><h3 class="mb-4 text-2xl font-light">{{ audience.title }}</h3><p class="mb-7 text-sm leading-6 text-white/60">{{ audience.text }}</p><NuxtLink :to="audience.to" class="inline-flex items-center gap-2 text-sm">Подробнее <ArrowRight class="h-4 w-4" /></NuxtLink></article></div><button type="button" class="btn-light mt-6" @click="openLead('tender')">Отправить заявку</button></div>
    </section>

    <section class="container-page section-space grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
      <div><h2 class="mb-6 display-title">Покажем будущий офис</h2><p class="mb-8 max-w-2xl leading-7 text-secondary">Подготовим план и подберём мебель до начала работ.</p><button type="button" class="btn-primary" @click="openLead('design')">Заказать дизайн-проект</button></div>
      <div class="grid gap-px bg-border sm:grid-cols-2"><div v-for="item in ['Понятный каталог', 'Готовые коллекции', 'Мебель для бизнеса', 'Помощь на каждом этапе']" :key="item" class="bg-surface p-7"><Handshake class="mb-8 h-6 w-6 stroke-1 text-accent" /><h3 class="text-lg font-medium">{{ item }}</h3></div></div>
    </section>

    <section class="bg-accent py-14 text-white">
      <div class="container-page flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center"><div><h2 class="text-3xl font-light sm:text-4xl">Нужна мебель для офиса?</h2></div><button type="button" class="btn-light shrink-0" @click="openLead('message')">Написать нам <ArrowRight class="h-4 w-4" /></button></div>
    </section>
  </div>
</template>

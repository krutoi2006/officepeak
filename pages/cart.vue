<script setup lang="ts">
import { FileText, ShoppingBag, Trash2 } from 'lucide-vue-next'
import { availabilityLabel, formatPrice } from '~/data/catalog'

const { items, total, remove, setQuantity } = useShop()
usePageSeo('Корзина', 'Корзина товаров OFFICEPEAK перед оформлением заявки или коммерческого предложения.', '/cart')
</script>

<template>
  <section class="container-page py-10 md:py-14">
    <Breadcrumbs :items="[{ label: 'Главная', to: '/' }, { label: 'Корзина' }]" />
    <div class="mb-10"><h1 class="display-title">Корзина</h1></div>
    <div v-if="items.length" class="grid gap-10 xl:grid-cols-[1fr_370px]">
      <div class="border-t border-border">
        <article v-for="item in items" :key="item.key" class="grid gap-5 border-b border-border py-6 sm:grid-cols-[150px_1fr]">
          <NuxtLink :to="`/product/${item.product.slug}`"><img :src="item.product.images[item.variant.imageIndex]?.src ?? item.product.images[0]?.src" :alt="item.product.name" class="aspect-[4/3] w-full object-cover"></NuxtLink>
          <div class="grid gap-5 md:grid-cols-[1fr_auto]"><div><NuxtLink :to="`/product/${item.product.slug}`" class="text-xl font-medium hover:text-accent">{{ item.product.name }}</NuxtLink><p class="mt-2 text-sm text-secondary">Арт. {{ item.variant.article }}</p><dl class="mt-4 grid gap-1 text-sm"><div class="flex gap-2"><dt class="text-secondary">Цвет:</dt><dd>{{ item.variant.color.name }}</dd></div><div class="flex gap-2"><dt class="text-secondary">Размер:</dt><dd>{{ item.variant.dimensions.label }}</dd></div><div class="flex gap-2"><dt class="text-secondary">Статус:</dt><dd :class="item.variant.availability === 'in-stock' ? 'text-emerald-700' : 'text-amber-700'">{{ availabilityLabel(item.variant.availability) }}</dd></div></dl></div><div class="flex flex-row items-center justify-between gap-4 md:flex-col md:items-end"><button type="button" class="inline-flex items-center gap-2 text-xs text-secondary hover:text-primary" @click="remove(item.productId, item.variantId)"><Trash2 class="h-4 w-4" /> Удалить</button><QuantityInput :model-value="item.quantity" :label="`Количество ${item.product.name}`" @update:model-value="setQuantity(item.productId, item.variantId, $event)" /><b>{{ formatPrice(item.lineTotal) }}</b></div></div>
        </article>
      </div>
      <aside class="h-fit bg-surface p-6 sm:p-8 xl:sticky xl:top-36"><h2 class="mb-6 text-2xl font-light">Итого</h2><div class="mb-7 flex justify-between border-b border-border pb-6"><span class="text-secondary">Сумма товаров</span><b class="text-xl">{{ formatPrice(total) }}</b></div><p class="mb-6 text-xs leading-5 text-secondary">Менеджер подтвердит цену и условия заказа.</p><div class="grid gap-3"><NuxtLink to="/checkout" class="btn-primary">Оформить заказ</NuxtLink><NuxtLink to="/quote" class="btn-secondary"><FileText class="h-4 w-4" /> Получить КП</NuxtLink></div></aside>
    </div>
    <div v-else class="flex min-h-[48vh] flex-col items-center justify-center bg-surface p-8 text-center"><ShoppingBag class="mb-6 h-14 w-14 stroke-1 text-secondary" /><h2 class="mb-3 text-3xl font-light">Корзина пуста</h2><p class="mb-7 max-w-md text-secondary">Добавьте товары из каталога.</p><NuxtLink to="/catalog" class="btn-primary">Перейти в каталог</NuxtLink></div>
  </section>
</template>

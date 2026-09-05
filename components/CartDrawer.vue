<script setup lang="ts">
import { FileText, ShoppingBag, Trash2, X } from 'lucide-vue-next'
import { availabilityLabel, formatPrice } from '~/data/catalog'

const { items, cartOpen, count, total, remove, setQuantity } = useShop()
const drawer = ref<HTMLElement | null>(null)
let opener: HTMLElement | null = null
const close = () => { cartOpen.value = false }
const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') { close(); return }
  if (event.key !== 'Tab' || !cartOpen.value || !drawer.value) return
  const focusable = [...drawer.value.querySelectorAll<HTMLElement>('a, button, input, [tabindex]:not([tabindex="-1"])')]
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
}
watch(cartOpen, async (value) => {
  if (!import.meta.client) return
  document.body.style.overflow = value ? 'hidden' : ''
  if (value) { opener = document.activeElement as HTMLElement; await nextTick(); drawer.value?.querySelector<HTMLElement>('button')?.focus() }
  else opener?.focus()
})
onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => { document.removeEventListener('keydown', onKeydown); document.body.style.overflow = '' })
</script>

<template>
  <Teleport to="body">
    <Transition name="fade"><div v-if="cartOpen" class="fixed inset-0 z-50 bg-black/45" aria-hidden="true" @click="close" /></Transition>
    <Transition name="drawer">
      <aside v-if="cartOpen" ref="drawer" class="fixed inset-y-0 right-0 z-[55] flex w-full max-w-[520px] flex-col bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
        <header class="flex items-center justify-between border-b border-border p-5 sm:p-6"><h2 id="cart-drawer-title" class="text-2xl font-light">Корзина <small class="text-sm text-secondary">{{ count }} шт.</small></h2><button type="button" class="icon-button" aria-label="Закрыть корзину" @click="close"><X class="h-5 w-5" /></button></header>
        <div class="flex-1 overflow-auto p-5 sm:p-6">
          <div v-if="!items.length" class="flex h-full min-h-64 flex-col items-center justify-center text-center text-secondary"><ShoppingBag class="mb-5 h-12 w-12 stroke-1" /><p class="mb-5">В корзине пока нет товаров</p><NuxtLink to="/catalog" class="btn-secondary" @click="close">Перейти в каталог</NuxtLink></div>
          <div v-else class="space-y-6">
            <article v-for="item in items" :key="item.key" class="grid grid-cols-[88px_1fr] gap-4 border-b border-border pb-6">
              <NuxtLink :to="`/product/${item.product.slug}`" @click="close"><img :src="item.product.images[item.variant.imageIndex]?.src ?? item.product.images[0]?.src" :alt="item.product.name" class="h-24 w-full object-cover"></NuxtLink>
              <div class="min-w-0"><div class="flex items-start justify-between gap-3"><NuxtLink :to="`/product/${item.product.slug}`" class="text-sm font-medium leading-5 hover:text-accent" @click="close">{{ item.product.name }}</NuxtLink><button type="button" class="p-1 text-secondary hover:text-primary" :aria-label="`Удалить ${item.product.name}`" @click="remove(item.productId, item.variantId)"><Trash2 class="h-4 w-4" /></button></div><p class="mt-1 text-xs text-secondary">{{ item.variant.article }} · {{ item.variant.color.name }} · {{ item.variant.dimensions.label }}</p><p class="mt-1 text-xs" :class="item.variant.availability === 'in-stock' ? 'text-emerald-700' : 'text-amber-700'">{{ availabilityLabel(item.variant.availability) }}</p><div class="mt-4 flex items-center justify-between gap-3"><QuantityInput :model-value="item.quantity" :label="`Количество ${item.product.name}`" @update:model-value="setQuantity(item.productId, item.variantId, $event)" /><b class="text-sm">{{ formatPrice(item.lineTotal) }}</b></div></div>
            </article>
          </div>
        </div>
        <footer v-if="items.length" class="border-t border-border bg-surface p-5 sm:p-6"><div class="mb-5 flex justify-between"><span>Итого</span><b class="text-xl">{{ formatPrice(total) }}</b></div><div class="grid gap-3 sm:grid-cols-2"><NuxtLink to="/cart" class="btn-secondary" @click="close">Вся корзина</NuxtLink><NuxtLink to="/checkout" class="btn-primary" @click="close">Оформить заказ</NuxtLink><NuxtLink to="/quote" class="btn-secondary sm:col-span-2" @click="close"><FileText class="h-4 w-4" /> Получить КП</NuxtLink></div></footer>
      </aside>
    </Transition>
  </Teleport>
</template>

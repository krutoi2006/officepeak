<script setup lang="ts">
import { ShoppingBag, Trash2, X } from 'lucide-vue-next'
import { formatPrice } from '~/data/catalog'
const { cart, cartOpen, count, total, remove } = useShop()
</script>
<template>
  <Teleport to="body">
    <Transition name="fade"><div v-if="cartOpen" class="fixed inset-0 z-50 bg-black/40" @click="cartOpen=false" /></Transition>
    <Transition name="drawer"><aside v-if="cartOpen" class="fixed inset-y-0 right-0 z-50 flex w-full max-w-[460px] flex-col bg-white shadow-2xl">
      <header class="flex items-center justify-between border-b border-border p-6"><h2 class="text-xl font-light">Корзина <small class="text-secondary">({{ count }})</small></h2><button @click="cartOpen=false"><X /></button></header>
      <div class="flex-1 overflow-auto p-6">
        <div v-if="!cart.length" class="flex h-full flex-col items-center justify-center text-secondary"><ShoppingBag class="mb-5 h-12 w-12 stroke-1"/><p>В корзине пока нет товаров</p></div>
        <div v-else class="space-y-6"><div v-for="item in cart" :key="item.id+item.selectedColor" class="flex gap-4"><img :src="item.image" class="h-24 w-24 object-cover"><div class="flex flex-1 flex-col"><div class="flex justify-between gap-2"><p class="text-sm font-medium">{{ item.name }}</p><button @click="remove(item.id,item.selectedColor)"><Trash2 class="h-4 w-4"/></button></div><small class="text-secondary">{{ item.selectedColor }}</small><div class="mt-auto flex justify-between"><span>{{ item.quantity }} шт.</span><b class="text-sm">{{ formatPrice(item.price*item.quantity) }}</b></div></div></div></div>
      </div>
      <footer v-if="cart.length" class="border-t border-border bg-surface p-6"><div class="mb-5 flex justify-between"><span>Итого</span><b class="text-xl">{{ formatPrice(total) }}</b></div><NuxtLink to="/checkout" class="btn-primary w-full" @click="cartOpen=false">Оформить заказ</NuxtLink></footer>
    </aside></Transition>
  </Teleport>
</template>

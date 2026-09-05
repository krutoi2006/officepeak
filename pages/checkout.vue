<script setup lang="ts">
import { AlertTriangle, Loader2 } from 'lucide-vue-next'
import { formatPrice } from '~/data/catalog'

const { items, total } = useShop()
const sending = ref(false)
const result = ref<{ requestId: string; message: string } | null>(null)
const errors = reactive<Record<string, string>>({})
const form = reactive({ clientType: 'organization', name: '', phone: '', email: '', company: '', inn: '', city: '', fulfillment: 'delivery', address: '', comment: '', consent: false, website: '' })

const validate = () => {
  Object.keys(errors).forEach(key => delete errors[key])
  if (!items.value.length) errors.cart = 'Корзина пуста.'
  if (form.name.trim().length < 2) errors.name = 'Укажите контактное лицо.'
  if (form.phone.replace(/\D/g, '').length < 10) errors.phone = 'Укажите телефон полностью.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Проверьте email.'
  if (form.clientType === 'organization' && form.company.trim().length < 2) errors.company = 'Укажите название организации.'
  if (form.city.trim().length < 2) errors.city = 'Укажите город.'
  if (form.fulfillment === 'delivery' && form.address.trim().length < 5) errors.address = 'Укажите адрес доставки.'
  if (!form.consent) errors.consent = 'Необходимо согласие на обработку данных.'
  return !Object.values(errors).some(Boolean)
}
const submit = async () => {
  if (sending.value || !validate()) return
  sending.value = true
  try {
    const response = await $fetch<{ requestId: string; message: string }>('/api/orders', {
      method: 'POST',
      body: { ...form, lines: items.value.map(item => ({ productId: item.productId, variantId: item.variantId, quantity: item.quantity })) },
    })
    result.value = response
  } catch (error: any) {
    errors.submit = error?.data?.statusMessage ?? 'Не удалось проверить заявку. Попробуйте ещё раз.'
  } finally { sending.value = false }
}
usePageSeo('Оформление заказа', 'Оформление заявки по выбранным товарам OFFICEPEAK без онлайн-оплаты.', '/checkout')
</script>

<template>
  <section class="container-page py-10 md:py-14">
    <Breadcrumbs :items="[{ label: 'Главная', to: '/' }, { label: 'Корзина', to: '/cart' }, { label: 'Оформление заказа' }]" />
    <div v-if="result" class="mx-auto max-w-2xl py-16 text-center"><h1 class="mb-5 display-title">Заявка принята</h1><p class="mb-4 text-lg">Номер заявки: <b>{{ result.requestId }}</b></p><p class="mb-8 leading-7 text-secondary">{{ result.message }}</p><div class="flex flex-wrap justify-center gap-3"><NuxtLink to="/cart" class="btn-secondary">Вернуться в корзину</NuxtLink><NuxtLink to="/contacts" class="btn-primary">Контакты</NuxtLink></div></div>
    <div v-else-if="items.length" class="grid gap-12 xl:grid-cols-[1fr_410px]">
      <div><h1 class="mb-10 display-title">Оформление заказа</h1><form id="order-form" class="grid gap-5 sm:grid-cols-2" novalidate @submit.prevent="submit">
        <fieldset class="sm:col-span-2"><legend class="mb-3 text-sm font-medium">Тип клиента</legend><div class="flex flex-wrap gap-3"><label class="flex items-center gap-2 border border-border px-4 py-3 text-sm"><input v-model="form.clientType" type="radio" value="individual"> Физическое лицо</label><label class="flex items-center gap-2 border border-border px-4 py-3 text-sm"><input v-model="form.clientType" type="radio" value="organization"> Организация</label></div></fieldset>
        <label class="field-label">Контактное лицо *<input v-model="form.name" autocomplete="name" class="field-input" :aria-invalid="Boolean(errors.name)"><span v-if="errors.name" class="field-error">{{ errors.name }}</span></label>
        <label class="field-label">Телефон *<input v-model="form.phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+7 999 000-00-00" class="field-input" :aria-invalid="Boolean(errors.phone)"><span v-if="errors.phone" class="field-error">{{ errors.phone }}</span></label>
        <label class="field-label sm:col-span-2">Email *<input v-model="form.email" type="email" autocomplete="email" class="field-input" :aria-invalid="Boolean(errors.email)"><span v-if="errors.email" class="field-error">{{ errors.email }}</span></label>
        <label v-if="form.clientType === 'organization'" class="field-label">Название организации *<input v-model="form.company" autocomplete="organization" class="field-input" :aria-invalid="Boolean(errors.company)"><span v-if="errors.company" class="field-error">{{ errors.company }}</span></label>
        <label v-if="form.clientType === 'organization'" class="field-label">ИНН <span class="font-normal text-secondary">(необязательно)</span><input v-model="form.inn" inputmode="numeric" class="field-input"></label>
        <label class="field-label">Город *<input v-model="form.city" autocomplete="address-level2" class="field-input" :aria-invalid="Boolean(errors.city)"><span v-if="errors.city" class="field-error">{{ errors.city }}</span></label>
        <label class="field-label">Способ получения *<select v-model="form.fulfillment" class="field-input"><option value="delivery">Доставка</option><option value="pickup">Самовывоз</option></select></label>
        <label v-if="form.fulfillment === 'delivery'" class="field-label sm:col-span-2">Адрес доставки *<input v-model="form.address" autocomplete="street-address" class="field-input" :aria-invalid="Boolean(errors.address)"><span v-if="errors.address" class="field-error">{{ errors.address }}</span></label>
        <label class="field-label sm:col-span-2">Комментарий<textarea v-model="form.comment" rows="4" class="field-input resize-y" /></label>
        <label class="sr-only" aria-hidden="true">Сайт<input v-model="form.website" tabindex="-1" autocomplete="off"></label>
        <label class="flex items-start gap-3 text-sm leading-5 sm:col-span-2"><input v-model="form.consent" type="checkbox" class="mt-1 h-4 w-4 accent-accent"><span>Я согласен на <NuxtLink to="/personal-data-consent" class="underline">обработку персональных данных</NuxtLink>.</span></label><span v-if="errors.consent" class="field-error sm:col-span-2">{{ errors.consent }}</span>
      </form></div>
      <aside class="h-fit bg-surface p-6 sm:p-8 xl:sticky xl:top-36"><h2 class="mb-6 text-2xl font-light">Ваш заказ</h2><div class="max-h-72 space-y-4 overflow-y-auto pr-2"><div v-for="item in items" :key="item.key" class="grid grid-cols-[1fr_auto] gap-4 text-sm"><div><p class="font-medium">{{ item.product.name }} × {{ item.quantity }}</p><p class="text-xs text-secondary">{{ item.variant.color.name }}, {{ item.variant.dimensions.label }}</p></div><b>{{ formatPrice(item.lineTotal) }}</b></div></div><div class="my-6 border-t border-border" /><div class="mb-7 flex justify-between text-xl"><span>Итого</span><b>{{ formatPrice(total) }}</b></div><button form="order-form" type="submit" class="btn-primary w-full" :disabled="sending"><Loader2 v-if="sending" class="h-4 w-4 animate-spin" />{{ sending ? 'Проверяем…' : 'Подтвердить заявку' }}</button><p class="mt-5 flex gap-2 text-xs leading-5 text-secondary"><AlertTriangle class="mt-0.5 h-4 w-4 shrink-0 text-accent" />Онлайн-оплата не выполняется. Пока транспорт CRM/почты не настроен, сервер только валидирует заявку и корзина сохраняется.</p><p v-if="errors.submit" class="field-error mt-4">{{ errors.submit }}</p></aside>
    </div>
    <div v-else class="bg-surface p-12 text-center"><h1 class="mb-3 text-4xl font-light">Корзина пуста</h1><p class="mb-7 text-secondary">Добавьте товары из каталога.</p><NuxtLink to="/catalog" class="btn-primary">Перейти в каталог</NuxtLink></div>
  </section>
</template>

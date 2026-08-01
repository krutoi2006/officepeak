<script setup lang="ts">
const route = useRoute()
const content: Record<string, [string, string]> = {
  services: ['Индивидуальный заказ', 'Проектируем и производим мебель нестандартных размеров для вашего пространства.'],
  delivery: ['Доставка и оплата', 'Доставляем и собираем мебель по Москве и всей России.'],
  contacts: ['Контакты', '8 (800) 000-00-00 · hello@officepeak.ru']
}
const fallback: [string, string] = ['Страница', 'Раздел находится в разработке.']
const data = computed(() => content[String(route.params.page)] ?? fallback)
</script>

<template>
  <section class="container-page min-h-[55vh] py-20">
    <p class="mb-4 text-xs uppercase tracking-widest text-secondary">OFFICEPEAK</p>
    <h1 class="mb-8 text-5xl font-light">{{ data[0] }}</h1>
    <p class="max-w-2xl text-lg leading-8 text-secondary">{{ data[1] }}</p>
  </section>
</template>

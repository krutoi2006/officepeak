<script setup lang="ts">
import { categories } from '~/data/catalog'
import { publicOfferDisclaimer, siteConfig } from '~/config/site'
import { ArrowUpRight } from 'lucide-vue-next'

const services = [['Дизайн-проект', '/design-project'], ['Оплата', '/payment'], ['Доставка', '/delivery'], ['Подъём', '/lifting'], ['Сборка', '/assembly'], ['Гарантия', '/warranty'], ['Возврат', '/returns']]
const clients = [['Государственным заказчикам', '/government'], ['Коммерческим организациям', '/business'], ['Дизайнерам', '/designers']]
</script>

<template>
  <footer class="site-footer bg-primary pb-8 pt-16 text-white md:pt-20">
    <div class="container-page grid gap-12 md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_1fr]">
      <div>
        <div class="mb-3 text-2xl font-semibold tracking-[-.06em]">OFFICE<span class="font-light text-white/55">PEAK</span></div>
        <p class="max-w-xs text-sm leading-6 text-white/60">{{ siteConfig.tagline }}</p>
        <div class="mt-7 space-y-2 text-sm"><a :href="siteConfig.phoneHref" class="block hover:text-accentSoft">{{ siteConfig.phone }}</a><a :href="siteConfig.emailHref" class="block hover:text-accentSoft">{{ siteConfig.email }}</a></div>
        <div v-if="siteConfig.social.telegram || siteConfig.social.max" class="mt-5 flex gap-4 text-sm">
          <a v-if="siteConfig.social.telegram" :href="siteConfig.social.telegram" target="_blank" rel="noopener">Telegram <ArrowUpRight class="inline h-3 w-3" /></a>
          <a v-if="siteConfig.social.max" :href="siteConfig.social.max" target="_blank" rel="noopener">MAX <ArrowUpRight class="inline h-3 w-3" /></a>
        </div>
      </div>
      <div><h2 class="footer-heading">Каталог</h2><div class="footer-links"><NuxtLink v-for="category in categories.slice(0, 6)" :key="category.id" :to="`/catalog/${category.slug}`">{{ category.name }}</NuxtLink><NuxtLink to="/catalog" class="text-white">Весь каталог</NuxtLink></div></div>
      <div><h2 class="footer-heading">Услуги</h2><div class="footer-links"><NuxtLink v-for="service in services" :key="service[1]" :to="service[1]">{{ service[0] }}</NuxtLink><NuxtLink to="/custom-furniture">Мебель на заказ</NuxtLink><NuxtLink to="/contacts">Контакты</NuxtLink></div></div>
      <div><h2 class="footer-heading">Клиентам</h2><div class="footer-links"><NuxtLink v-for="item in clients" :key="item[1]" :to="item[1]">{{ item[0] }}</NuxtLink><NuxtLink to="/privacy">Политика конфиденциальности</NuxtLink><NuxtLink to="/personal-data-consent">Согласие на обработку данных</NuxtLink></div></div>
    </div>
    <div class="container-page mt-14 border-t border-white/15 pt-7">
      <p class="max-w-5xl text-xs leading-5 text-white/45">{{ publicOfferDisclaimer }}</p>
      <p class="mt-4 text-xs text-white/35">© {{ new Date().getFullYear() }} OFFICEPEAK</p>
    </div>
  </footer>
</template>

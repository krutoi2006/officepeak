<script setup lang="ts">
import { ArrowRight, CheckCircle2 } from 'lucide-vue-next'
import { siteConfig } from '~/config/site'
import type { LeadFormType } from '~/composables/useLeadModal'

type InfoPage = { title: string; lead: string; sections: Array<{ title: string; text: string; items?: string[] }>; cta?: LeadFormType; legal?: boolean }
const content: Record<string, InfoPage> = {
  government: { title: 'Госзаказчикам', lead: 'Поможем подобрать мебель для закупки.', sections: [{ title: 'Что нужно', text: 'Пришлите список помещений и требования к мебели.', items: ['Подбор мебели', 'Список товаров', 'Материалы для согласования'] }, { title: 'Участие в тендере', text: 'Оставьте контакты и название организации. Мы свяжемся с вами.' }], cta: 'tender' },
  business: { title: 'Для бизнеса', lead: 'Подберём мебель для офиса любого размера.', sections: [{ title: 'Для разных зон', text: 'Можно выбрать готовую коллекцию или собрать свой комплект.', items: ['Рабочие места', 'Переговорные зоны', 'Шкафы и акустика'] }, { title: 'Понятный заказ', text: 'В заказе будут указаны цвет, размер, количество и цена.' }], cta: 'manager' },
  designers: { title: 'Дизайнерам', lead: 'Поможем выбрать мебель и материалы для проекта.', sections: [{ title: 'Помощь с выбором', text: 'Подберём коллекции, товары, размеры и цвета.', items: ['Материалы и цвета', 'Размеры', 'Товары из одной коллекции'] }, { title: 'Что прислать', text: 'Добавьте план или примеры к заявке.' }], cta: 'design' },
  'custom-furniture': { title: 'Мебель на заказ', lead: 'Сделаем мебель под ваши размеры и задачи.', sections: [{ title: 'Как начать', text: 'Пришлите план и расскажите, какая мебель нужна.', items: ['План помещения', 'Размеры мебели', 'Расчёт цены'] }, { title: 'Цена и сроки', text: 'Назовём цену и сроки после изучения задачи.' }], cta: 'manager' },
  'design-project': { title: 'Дизайн-проект', lead: 'Покажем, как будет выглядеть офис с новой мебелью.', sections: [{ title: 'Что нужно', text: 'Пришлите план помещения и расскажите о своих задачах.', items: ['План офиса', 'Расположение зон', 'Подбор мебели и цветов'] }, { title: 'Что вы получите', text: 'Состав проекта согласуем перед началом работы.' }], cta: 'design' },
  payment: { title: 'Оплата', lead: 'Способ оплаты укажем в заказе.', sections: [{ title: 'Оплата на сайте', text: 'Онлайн-оплаты пока нет. Заказ подтвердит менеджер.' }, { title: 'Условия оплаты', text: 'Реквизиты, НДС и порядок оплаты будут указаны в документах.' }] },
  delivery: { title: 'Доставка', lead: 'Доставим заказ по согласованному адресу.', sections: [{ title: 'Цена и срок', text: 'Рассчитаем стоимость и срок для вашего адреса.' }, { title: 'Что указать', text: 'Напишите город и адрес при оформлении заказа.' }] },
  lifting: { title: 'Подъём', lead: 'Поднимем мебель на нужный этаж.', sections: [{ title: 'Что указать', text: 'Напишите этаж и есть ли грузовой лифт.' }, { title: 'Цена', text: 'Стоимость подъёма рассчитаем отдельно.' }] },
  assembly: { title: 'Сборка', lead: 'Соберём мебель в вашем офисе.', sections: [{ title: 'Перед сборкой', text: 'Нам нужны адрес и список мебели.' }, { title: 'Цена и срок', text: 'Стоимость и время сборки согласуем заранее.' }] },
  warranty: { title: 'Гарантия', lead: 'Гарантия зависит от товара и производителя.', sections: [{ title: 'Условия', text: 'Срок гарантии будет указан в заказе.' }, { title: 'Если есть вопрос', text: 'Свяжитесь с нами по телефону или почте.' }] },
  returns: { title: 'Возврат', lead: 'Условия возврата зависят от товара.', sections: [{ title: 'Мебель на заказ', text: 'Для мебели по вашим размерам действуют отдельные правила.' }, { title: 'Как обратиться', text: 'Позвоните или напишите нам.' }], legal: true },
  contacts: { title: 'Контакты', lead: 'Позвоните или напишите нам.', sections: [{ title: siteConfig.phone, text: 'Телефон для вопросов и заказов.' }, { title: siteConfig.email, text: 'Почта для заявок и файлов.' }], cta: 'message' },
  privacy: { title: 'Политика конфиденциальности', lead: 'Текст политики пока готовится.', sections: [{ title: 'Какие данные', text: 'Здесь будет список данных, которые собирает сайт.' }, { title: 'Как мы их храним', text: 'Здесь будут сроки и правила хранения данных.' }, { title: 'Важно', text: 'Документ нужно проверить перед публикацией.' }], legal: true },
  'personal-data-consent': { title: 'Согласие на обработку данных', lead: 'Текст согласия пока готовится.', sections: [{ title: 'Какие данные', text: 'Здесь будет список данных и цель их сбора.' }, { title: 'Срок и отзыв', text: 'Здесь будет срок согласия и способ его отзыва.' }, { title: 'Важно', text: 'Документ нужно проверить перед публикацией.' }], legal: true },
  services: { title: 'Услуги', lead: 'Поможем с проектом, доставкой и сборкой мебели.', sections: [{ title: 'Наши услуги', text: 'Выберите нужную услугу.', items: ['Дизайн-проект', 'Оплата', 'Доставка', 'Подъём', 'Сборка', 'Гарантия', 'Возврат'] }] },
}

const route = useRoute()
const page = content[String(route.params.page)]
if (!page) throw createError({ statusCode: 404, statusMessage: 'Страница не найдена' })
const { open } = useLeadModal()
usePageSeo(page.title, page.lead, `/${String(route.params.page)}`)
</script>

<template>
  <div>
    <section class="container-page py-10 md:py-16"><Breadcrumbs :items="[{ label: 'Главная', to: '/' }, { label: page.title }]" /><div class="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><h1 class="display-title">{{ page.title }}</h1></div><p class="max-w-2xl text-lg leading-8 text-secondary">{{ page.lead }}</p></div></section>
    <section class="border-y border-border bg-surface section-space"><div class="container-page grid gap-5 lg:grid-cols-2"><article v-for="section in page.sections" :key="section.title" class="bg-white p-7 sm:p-9"><h2 class="mb-4 text-3xl font-light">{{ section.title }}</h2><p class="leading-7 text-secondary">{{ section.text }}</p><ul v-if="section.items" class="mt-6 space-y-3 text-sm"><li v-for="item in section.items" :key="item" class="flex gap-3"><CheckCircle2 class="mt-0.5 h-4 w-4 shrink-0 text-accent" />{{ item }}</li></ul></article></div></section>
    <section v-if="page.legal" class="container-page py-10"><p class="max-w-4xl border-l-2 border-accent pl-5 text-sm leading-6 text-secondary"><b class="text-primary">Документ ещё не готов.</b> Его нужно проверить перед публикацией.</p></section>
    <section class="container-page section-space"><div class="flex flex-col items-start justify-between gap-7 bg-primary p-7 text-white sm:p-10 lg:flex-row lg:items-center"><div><h2 class="text-3xl font-light">Остались вопросы?</h2></div><button v-if="page.cta" type="button" class="btn-light shrink-0" @click="open(page.cta)">Написать нам <ArrowRight class="h-4 w-4" /></button><NuxtLink v-else to="/contacts" class="btn-light shrink-0">Контакты <ArrowRight class="h-4 w-4" /></NuxtLink></div></section>
  </div>
</template>

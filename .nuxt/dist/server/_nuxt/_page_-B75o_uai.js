import { _ as _sfc_main$1 } from "./Breadcrumbs-CZBzi1AX.js";
import { u as useRoute, c as createError, _ as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { CheckCircle2, ArrowRight } from "lucide-vue-next";
import { s as siteConfig } from "./site-Dljnoeow.js";
import { u as useLeadModal } from "./useLeadModal-DaBbHceU.js";
import { u as usePageSeo } from "./usePageSeo-9zNTc1yH.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/hookable/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/unctx/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/defu/dist/defu.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ufo/dist/index.mjs";
import "./state-tqLlnwND.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[page]",
  __ssrInlineRender: true,
  setup(__props) {
    const content = {
      government: { title: "Госзаказчикам", lead: "Поможем подобрать мебель для закупки.", sections: [{ title: "Что нужно", text: "Пришлите список помещений и требования к мебели.", items: ["Подбор мебели", "Список товаров", "Материалы для согласования"] }, { title: "Участие в тендере", text: "Оставьте контакты и название организации. Мы свяжемся с вами." }], cta: "tender" },
      business: { title: "Для бизнеса", lead: "Подберём мебель для офиса любого размера.", sections: [{ title: "Для разных зон", text: "Можно выбрать готовую коллекцию или собрать свой комплект.", items: ["Рабочие места", "Переговорные зоны", "Шкафы и акустика"] }, { title: "Понятный заказ", text: "В заказе будут указаны цвет, размер, количество и цена." }], cta: "manager" },
      designers: { title: "Дизайнерам", lead: "Поможем выбрать мебель и материалы для проекта.", sections: [{ title: "Помощь с выбором", text: "Подберём коллекции, товары, размеры и цвета.", items: ["Материалы и цвета", "Размеры", "Товары из одной коллекции"] }, { title: "Что прислать", text: "Добавьте план или примеры к заявке." }], cta: "design" },
      "custom-furniture": { title: "Мебель на заказ", lead: "Сделаем мебель под ваши размеры и задачи.", sections: [{ title: "Как начать", text: "Пришлите план и расскажите, какая мебель нужна.", items: ["План помещения", "Размеры мебели", "Расчёт цены"] }, { title: "Цена и сроки", text: "Назовём цену и сроки после изучения задачи." }], cta: "manager" },
      "design-project": { title: "Дизайн-проект", lead: "Покажем, как будет выглядеть офис с новой мебелью.", sections: [{ title: "Что нужно", text: "Пришлите план помещения и расскажите о своих задачах.", items: ["План офиса", "Расположение зон", "Подбор мебели и цветов"] }, { title: "Что вы получите", text: "Состав проекта согласуем перед началом работы." }], cta: "design" },
      payment: { title: "Оплата", lead: "Способ оплаты укажем в заказе.", sections: [{ title: "Оплата на сайте", text: "Онлайн-оплаты пока нет. Заказ подтвердит менеджер." }, { title: "Условия оплаты", text: "Реквизиты, НДС и порядок оплаты будут указаны в документах." }] },
      delivery: { title: "Доставка", lead: "Доставим заказ по согласованному адресу.", sections: [{ title: "Цена и срок", text: "Рассчитаем стоимость и срок для вашего адреса." }, { title: "Что указать", text: "Напишите город и адрес при оформлении заказа." }] },
      lifting: { title: "Подъём", lead: "Поднимем мебель на нужный этаж.", sections: [{ title: "Что указать", text: "Напишите этаж и есть ли грузовой лифт." }, { title: "Цена", text: "Стоимость подъёма рассчитаем отдельно." }] },
      assembly: { title: "Сборка", lead: "Соберём мебель в вашем офисе.", sections: [{ title: "Перед сборкой", text: "Нам нужны адрес и список мебели." }, { title: "Цена и срок", text: "Стоимость и время сборки согласуем заранее." }] },
      warranty: { title: "Гарантия", lead: "Гарантия зависит от товара и производителя.", sections: [{ title: "Условия", text: "Срок гарантии будет указан в заказе." }, { title: "Если есть вопрос", text: "Свяжитесь с нами по телефону или почте." }] },
      returns: { title: "Возврат", lead: "Условия возврата зависят от товара.", sections: [{ title: "Мебель на заказ", text: "Для мебели по вашим размерам действуют отдельные правила." }, { title: "Как обратиться", text: "Позвоните или напишите нам." }], legal: true },
      contacts: { title: "Контакты", lead: "Позвоните или напишите нам.", sections: [{ title: siteConfig.phone, text: "Телефон для вопросов и заказов." }, { title: siteConfig.email, text: "Почта для заявок и файлов." }], cta: "message" },
      privacy: { title: "Политика конфиденциальности", lead: "Текст политики пока готовится.", sections: [{ title: "Какие данные", text: "Здесь будет список данных, которые собирает сайт." }, { title: "Как мы их храним", text: "Здесь будут сроки и правила хранения данных." }, { title: "Важно", text: "Документ нужно проверить перед публикацией." }], legal: true },
      "personal-data-consent": { title: "Согласие на обработку данных", lead: "Текст согласия пока готовится.", sections: [{ title: "Какие данные", text: "Здесь будет список данных и цель их сбора." }, { title: "Срок и отзыв", text: "Здесь будет срок согласия и способ его отзыва." }, { title: "Важно", text: "Документ нужно проверить перед публикацией." }], legal: true },
      services: { title: "Услуги", lead: "Поможем с проектом, доставкой и сборкой мебели.", sections: [{ title: "Наши услуги", text: "Выберите нужную услугу.", items: ["Дизайн-проект", "Оплата", "Доставка", "Подъём", "Сборка", "Гарантия", "Возврат"] }] }
    };
    const route = useRoute();
    const page = content[String(route.params.page)];
    if (!page) throw createError({ statusCode: 404, statusMessage: "Страница не найдена" });
    useLeadModal();
    usePageSeo(page.title, page.lead, `/${String(route.params.page)}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="container-page py-10 md:py-16">`);
      _push(ssrRenderComponent(_component_Breadcrumbs, {
        items: [{ label: "Главная", to: "/" }, { label: unref(page).title }]
      }, null, _parent));
      _push(`<div class="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><h1 class="display-title">${ssrInterpolate(unref(page).title)}</h1></div><p class="max-w-2xl text-lg leading-8 text-secondary">${ssrInterpolate(unref(page).lead)}</p></div></section><section class="border-y border-border bg-surface section-space"><div class="container-page grid gap-5 lg:grid-cols-2"><!--[-->`);
      ssrRenderList(unref(page).sections, (section) => {
        _push(`<article class="bg-white p-7 sm:p-9"><h2 class="mb-4 text-3xl font-light">${ssrInterpolate(section.title)}</h2><p class="leading-7 text-secondary">${ssrInterpolate(section.text)}</p>`);
        if (section.items) {
          _push(`<ul class="mt-6 space-y-3 text-sm"><!--[-->`);
          ssrRenderList(section.items, (item) => {
            _push(`<li class="flex gap-3">`);
            _push(ssrRenderComponent(unref(CheckCircle2), { class: "mt-0.5 h-4 w-4 shrink-0 text-accent" }, null, _parent));
            _push(`${ssrInterpolate(item)}</li>`);
          });
          _push(`<!--]--></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      });
      _push(`<!--]--></div></section>`);
      if (unref(page).legal) {
        _push(`<section class="container-page py-10"><p class="max-w-4xl border-l-2 border-accent pl-5 text-sm leading-6 text-secondary"><b class="text-primary">Документ ещё не готов.</b> Его нужно проверить перед публикацией.</p></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="container-page section-space"><div class="flex flex-col items-start justify-between gap-7 bg-primary p-7 text-white sm:p-10 lg:flex-row lg:items-center"><div><h2 class="text-3xl font-light">Остались вопросы?</h2></div>`);
      if (unref(page).cta) {
        _push(`<button type="button" class="btn-light shrink-0">Написать нам `);
        _push(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4" }, null, _parent));
        _push(`</button>`);
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/contacts",
          class: "btn-light shrink-0"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Контакты `);
              _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode("Контакты "),
                createVNode(unref(ArrowRight), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[page].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_page_-B75o_uai.js.map

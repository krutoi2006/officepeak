import { _ as _sfc_main$1 } from "./Breadcrumbs-CZBzi1AX.js";
import { _ as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, reactive, ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Printer, Copy, Share2 } from "lucide-vue-next";
import { u as useShop, f as formatPrice, a as availabilityLabel } from "./useShop-Ct_x_K-c.js";
import { s as siteConfig, p as publicOfferDisclaimer } from "./site-Dljnoeow.js";
import { u as usePageSeo } from "./usePageSeo-9zNTc1yH.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/hookable/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/unctx/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/defu/dist/defu.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ufo/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/destr/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ohash/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/klona/dist/index.mjs";
import "./state-tqLlnwND.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "quote",
  __ssrInlineRender: true,
  setup(__props) {
    const { items, total } = useShop();
    const client = reactive({ name: "", company: "", email: "", phone: "" });
    const shareStatus = ref("");
    const date = new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" }).format(/* @__PURE__ */ new Date());
    computed(() => [`Коммерческое предложение OFFICEPEAK от ${date}`, client.company || client.name || "Клиент не указан", ...items.value.map((item) => `${item.product.name}, ${item.variant.article}, ${item.quantity} шт. — ${formatPrice(item.lineTotal)}`), `Итого: ${formatPrice(total.value)}`, siteConfig.phone, siteConfig.email].join("\n"));
    usePageSeo("Коммерческое предложение", "Предварительный просмотр коммерческого предложения по товарам OFFICEPEAK.", "/quote");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-10 md:py-14" }, _attrs))}><div class="no-print">`);
      _push(ssrRenderComponent(_component_Breadcrumbs, { items: [{ label: "Главная", to: "/" }, { label: "Корзина", to: "/cart" }, { label: "Коммерческое предложение" }] }, null, _parent));
      _push(`<div class="mb-8 flex flex-wrap items-end justify-between gap-6"><div><h1 class="display-title">Коммерческое предложение</h1></div>`);
      if (unref(items).length) {
        _push(`<div class="flex flex-wrap gap-2"><button type="button" class="btn-secondary">`);
        _push(ssrRenderComponent(unref(Printer), { class: "h-4 w-4" }, null, _parent));
        _push(` Печать / PDF</button><button type="button" class="btn-secondary">`);
        _push(ssrRenderComponent(unref(Copy), { class: "h-4 w-4" }, null, _parent));
        _push(` Копировать</button><button type="button" class="btn-primary">`);
        _push(ssrRenderComponent(unref(Share2), { class: "h-4 w-4" }, null, _parent));
        _push(` Поделиться</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(shareStatus)) {
        _push(`<p class="mb-6 text-sm text-accent">${ssrInterpolate(unref(shareStatus))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(items).length) {
        _push(`<div class="mb-10 grid gap-4 border border-border p-5 sm:grid-cols-2 lg:grid-cols-4"><label class="field-label">Контактное лицо<input${ssrRenderAttr("value", unref(client).name)} class="field-input"></label><label class="field-label">Компания<input${ssrRenderAttr("value", unref(client).company)} class="field-input"></label><label class="field-label">Телефон<input${ssrRenderAttr("value", unref(client).phone)} type="tel" class="field-input"></label><label class="field-label">Email<input${ssrRenderAttr("value", unref(client).email)} type="email" class="field-input"></label></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(items).length) {
        _push(`<article class="quote-sheet mx-auto max-w-6xl border border-border bg-white p-5 sm:p-8 lg:p-12"><header class="mb-10 flex flex-col justify-between gap-6 border-b-2 border-primary pb-7 sm:flex-row sm:items-end"><div><p class="text-2xl font-semibold tracking-[-.06em]">OFFICE<span class="font-light">PEAK</span></p><p class="mt-2 text-xs text-secondary">${ssrInterpolate(unref(siteConfig).tagline)}</p></div><div class="text-sm sm:text-right"><p><b>Коммерческое предложение</b></p><p>${ssrInterpolate(unref(date))}</p></div></header><section class="mb-9 grid gap-3 text-sm sm:grid-cols-2"><div><h2 class="mb-2 text-lg font-medium">Контакты OFFICEPEAK</h2><p>${ssrInterpolate(unref(siteConfig).phone)}</p><p>${ssrInterpolate(unref(siteConfig).email)}</p></div><div><h2 class="mb-2 text-lg font-medium">Клиент</h2><p>${ssrInterpolate(unref(client).company || "Компания не указана")}</p><p>${ssrInterpolate(unref(client).name || "Контактное лицо не указано")}</p>`);
        if (unref(client).phone) {
          _push(`<p>${ssrInterpolate(unref(client).phone)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(client).email) {
          _push(`<p>${ssrInterpolate(unref(client).email)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></section><h2 class="mb-5 text-2xl font-light">Состав предложения</h2><div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(items), (item) => {
          _push(`<article class="grid gap-4 border-b border-border pb-5 sm:grid-cols-[90px_1fr_auto]"><img${ssrRenderAttr("src", item.product.images[item.variant.imageIndex]?.src ?? item.product.images[0]?.src)}${ssrRenderAttr("alt", item.product.name)} class="aspect-square w-full object-cover"><div><h3 class="font-medium">${ssrInterpolate(item.product.name)}</h3><p class="mt-1 text-xs text-secondary">Арт. ${ssrInterpolate(item.variant.article)}</p><p class="mt-2 text-sm">${ssrInterpolate(item.variant.color.name)} · ${ssrInterpolate(item.variant.dimensions.label)}</p><p class="${ssrRenderClass([item.variant.availability === "in-stock" ? "text-emerald-700" : "text-amber-700", "mt-1 text-xs"])}">${ssrInterpolate(unref(availabilityLabel)(item.variant.availability))}</p></div><div class="text-sm sm:text-right"><p>${ssrInterpolate(item.quantity)} × ${ssrInterpolate(unref(formatPrice)(item.variant.price))}</p><b class="mt-2 block">${ssrInterpolate(unref(formatPrice)(item.lineTotal))}</b></div></article>`);
        });
        _push(`<!--]--></div><div class="mt-8 flex justify-end"><div class="w-full max-w-sm border-t-2 border-primary pt-4"><div class="flex justify-between text-xl"><span>Итого</span><b>${ssrInterpolate(unref(formatPrice)(unref(total)))}</b></div></div></div><p class="mt-12 text-xs leading-5 text-secondary">${ssrInterpolate(unref(publicOfferDisclaimer))} Цены и услуги подтвердит менеджер. Это не счёт на оплату.</p></article>`);
      } else {
        _push(`<div class="bg-surface p-12 text-center"><h2 class="mb-3 text-3xl font-light">Предложение пусто</h2><p class="mb-7 text-secondary">Добавьте товары в корзину.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalog",
          class: "btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Перейти в каталог`);
            } else {
              return [
                createTextVNode("Перейти в каталог")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/quote.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=quote-UG33iLyK.js.map

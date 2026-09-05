import { _ as _sfc_main$1 } from "./Breadcrumbs-CZBzi1AX.js";
import { _ as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, ref, reactive, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderAttr, ssrLooseContain, ssrRenderList } from "vue/server-renderer";
import { Loader2, AlertTriangle } from "lucide-vue-next";
import { u as useShop, f as formatPrice } from "./useShop-Ct_x_K-c.js";
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
import "./site-Dljnoeow.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const { items, total } = useShop();
    const sending = ref(false);
    const result = ref(null);
    const errors = reactive({});
    const form = reactive({ clientType: "organization", name: "", phone: "", email: "", company: "", inn: "", city: "", fulfillment: "delivery", address: "", comment: "", consent: false, website: "" });
    usePageSeo("Оформление заказа", "Оформление заявки по выбранным товарам OFFICEPEAK без онлайн-оплаты.", "/checkout");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-10 md:py-14" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Breadcrumbs, { items: [{ label: "Главная", to: "/" }, { label: "Корзина", to: "/cart" }, { label: "Оформление заказа" }] }, null, _parent));
      if (unref(result)) {
        _push(`<div class="mx-auto max-w-2xl py-16 text-center"><h1 class="mb-5 display-title">Заявка принята</h1><p class="mb-4 text-lg">Номер заявки: <b>${ssrInterpolate(unref(result).requestId)}</b></p><p class="mb-8 leading-7 text-secondary">${ssrInterpolate(unref(result).message)}</p><div class="flex flex-wrap justify-center gap-3">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/cart",
          class: "btn-secondary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Вернуться в корзину`);
            } else {
              return [
                createTextVNode("Вернуться в корзину")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/contacts",
          class: "btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Контакты`);
            } else {
              return [
                createTextVNode("Контакты")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else if (unref(items).length) {
        _push(`<div class="grid gap-12 xl:grid-cols-[1fr_410px]"><div><h1 class="mb-10 display-title">Оформление заказа</h1><form id="order-form" class="grid gap-5 sm:grid-cols-2" novalidate><fieldset class="sm:col-span-2"><legend class="mb-3 text-sm font-medium">Тип клиента</legend><div class="flex flex-wrap gap-3"><label class="flex items-center gap-2 border border-border px-4 py-3 text-sm"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).clientType, "individual")) ? " checked" : ""} type="radio" value="individual"> Физическое лицо</label><label class="flex items-center gap-2 border border-border px-4 py-3 text-sm"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).clientType, "organization")) ? " checked" : ""} type="radio" value="organization"> Организация</label></div></fieldset><label class="field-label">Контактное лицо *<input${ssrRenderAttr("value", unref(form).name)} autocomplete="name" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).name))}>`);
        if (unref(errors).name) {
          _push(`<span class="field-error">${ssrInterpolate(unref(errors).name)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label><label class="field-label">Телефон *<input${ssrRenderAttr("value", unref(form).phone)} type="tel" autocomplete="tel" inputmode="tel" placeholder="+7 999 000-00-00" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).phone))}>`);
        if (unref(errors).phone) {
          _push(`<span class="field-error">${ssrInterpolate(unref(errors).phone)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label><label class="field-label sm:col-span-2">Email *<input${ssrRenderAttr("value", unref(form).email)} type="email" autocomplete="email" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).email))}>`);
        if (unref(errors).email) {
          _push(`<span class="field-error">${ssrInterpolate(unref(errors).email)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
        if (unref(form).clientType === "organization") {
          _push(`<label class="field-label">Название организации *<input${ssrRenderAttr("value", unref(form).company)} autocomplete="organization" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).company))}>`);
          if (unref(errors).company) {
            _push(`<span class="field-error">${ssrInterpolate(unref(errors).company)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</label>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(form).clientType === "organization") {
          _push(`<label class="field-label">ИНН <span class="font-normal text-secondary">(необязательно)</span><input${ssrRenderAttr("value", unref(form).inn)} inputmode="numeric" class="field-input"></label>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<label class="field-label">Город *<input${ssrRenderAttr("value", unref(form).city)} autocomplete="address-level2" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).city))}>`);
        if (unref(errors).city) {
          _push(`<span class="field-error">${ssrInterpolate(unref(errors).city)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label><label class="field-label">Способ получения *<select class="field-input"><option value="delivery"${ssrIncludeBooleanAttr(Array.isArray(unref(form).fulfillment) ? ssrLooseContain(unref(form).fulfillment, "delivery") : ssrLooseEqual(unref(form).fulfillment, "delivery")) ? " selected" : ""}>Доставка</option><option value="pickup"${ssrIncludeBooleanAttr(Array.isArray(unref(form).fulfillment) ? ssrLooseContain(unref(form).fulfillment, "pickup") : ssrLooseEqual(unref(form).fulfillment, "pickup")) ? " selected" : ""}>Самовывоз</option></select></label>`);
        if (unref(form).fulfillment === "delivery") {
          _push(`<label class="field-label sm:col-span-2">Адрес доставки *<input${ssrRenderAttr("value", unref(form).address)} autocomplete="street-address" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).address))}>`);
          if (unref(errors).address) {
            _push(`<span class="field-error">${ssrInterpolate(unref(errors).address)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</label>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<label class="field-label sm:col-span-2">Комментарий<textarea rows="4" class="field-input resize-y">${ssrInterpolate(unref(form).comment)}</textarea></label><label class="sr-only" aria-hidden="true">Сайт<input${ssrRenderAttr("value", unref(form).website)} tabindex="-1" autocomplete="off"></label><label class="flex items-start gap-3 text-sm leading-5 sm:col-span-2"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).consent) ? ssrLooseContain(unref(form).consent, null) : unref(form).consent) ? " checked" : ""} type="checkbox" class="mt-1 h-4 w-4 accent-accent"><span>Я согласен на `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/personal-data-consent",
          class: "underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`обработку персональных данных`);
            } else {
              return [
                createTextVNode("обработку персональных данных")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`.</span></label>`);
        if (unref(errors).consent) {
          _push(`<span class="field-error sm:col-span-2">${ssrInterpolate(unref(errors).consent)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></div><aside class="h-fit bg-surface p-6 sm:p-8 xl:sticky xl:top-36"><h2 class="mb-6 text-2xl font-light">Ваш заказ</h2><div class="max-h-72 space-y-4 overflow-y-auto pr-2"><!--[-->`);
        ssrRenderList(unref(items), (item) => {
          _push(`<div class="grid grid-cols-[1fr_auto] gap-4 text-sm"><div><p class="font-medium">${ssrInterpolate(item.product.name)} × ${ssrInterpolate(item.quantity)}</p><p class="text-xs text-secondary">${ssrInterpolate(item.variant.color.name)}, ${ssrInterpolate(item.variant.dimensions.label)}</p></div><b>${ssrInterpolate(unref(formatPrice)(item.lineTotal))}</b></div>`);
        });
        _push(`<!--]--></div><div class="my-6 border-t border-border"></div><div class="mb-7 flex justify-between text-xl"><span>Итого</span><b>${ssrInterpolate(unref(formatPrice)(unref(total)))}</b></div><button form="order-form" type="submit" class="btn-primary w-full"${ssrIncludeBooleanAttr(unref(sending)) ? " disabled" : ""}>`);
        if (unref(sending)) {
          _push(ssrRenderComponent(unref(Loader2), { class: "h-4 w-4 animate-spin" }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`${ssrInterpolate(unref(sending) ? "Проверяем…" : "Подтвердить заявку")}</button><p class="mt-5 flex gap-2 text-xs leading-5 text-secondary">`);
        _push(ssrRenderComponent(unref(AlertTriangle), { class: "mt-0.5 h-4 w-4 shrink-0 text-accent" }, null, _parent));
        _push(`Онлайн-оплата не выполняется. Пока транспорт CRM/почты не настроен, сервер только валидирует заявку и корзина сохраняется.</p>`);
        if (unref(errors).submit) {
          _push(`<p class="field-error mt-4">${ssrInterpolate(unref(errors).submit)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</aside></div>`);
      } else {
        _push(`<div class="bg-surface p-12 text-center"><h1 class="mb-3 text-4xl font-light">Корзина пуста</h1><p class="mb-7 text-secondary">Добавьте товары из каталога.</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=checkout-DKHGehAY.js.map

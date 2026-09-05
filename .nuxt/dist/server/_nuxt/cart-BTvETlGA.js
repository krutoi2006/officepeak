import { _ as _sfc_main$1 } from "./Breadcrumbs-CZBzi1AX.js";
import { _ as __nuxt_component_0 } from "../server.mjs";
import { _ as _sfc_main$2 } from "./QuantityInput-C7yvggq_.js";
import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Trash2, FileText, ShoppingBag } from "lucide-vue-next";
import { u as useShop, a as availabilityLabel, f as formatPrice } from "./useShop-Ct_x_K-c.js";
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
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const { items, total, setQuantity } = useShop();
    usePageSeo("Корзина", "Корзина товаров OFFICEPEAK перед оформлением заявки или коммерческого предложения.", "/cart");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_QuantityInput = _sfc_main$2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-10 md:py-14" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Breadcrumbs, { items: [{ label: "Главная", to: "/" }, { label: "Корзина" }] }, null, _parent));
      _push(`<div class="mb-10"><h1 class="display-title">Корзина</h1></div>`);
      if (unref(items).length) {
        _push(`<div class="grid gap-10 xl:grid-cols-[1fr_370px]"><div class="border-t border-border"><!--[-->`);
        ssrRenderList(unref(items), (item) => {
          _push(`<article class="grid gap-5 border-b border-border py-6 sm:grid-cols-[150px_1fr]">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/product/${item.product.slug}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", item.product.images[item.variant.imageIndex]?.src ?? item.product.images[0]?.src)}${ssrRenderAttr("alt", item.product.name)} class="aspect-[4/3] w-full object-cover"${_scopeId}>`);
              } else {
                return [
                  createVNode("img", {
                    src: item.product.images[item.variant.imageIndex]?.src ?? item.product.images[0]?.src,
                    alt: item.product.name,
                    class: "aspect-[4/3] w-full object-cover"
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="grid gap-5 md:grid-cols-[1fr_auto]"><div>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/product/${item.product.slug}`,
            class: "text-xl font-medium hover:text-accent"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.product.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.product.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<p class="mt-2 text-sm text-secondary">Арт. ${ssrInterpolate(item.variant.article)}</p><dl class="mt-4 grid gap-1 text-sm"><div class="flex gap-2"><dt class="text-secondary">Цвет:</dt><dd>${ssrInterpolate(item.variant.color.name)}</dd></div><div class="flex gap-2"><dt class="text-secondary">Размер:</dt><dd>${ssrInterpolate(item.variant.dimensions.label)}</dd></div><div class="flex gap-2"><dt class="text-secondary">Статус:</dt><dd class="${ssrRenderClass(item.variant.availability === "in-stock" ? "text-emerald-700" : "text-amber-700")}">${ssrInterpolate(unref(availabilityLabel)(item.variant.availability))}</dd></div></dl></div><div class="flex flex-row items-center justify-between gap-4 md:flex-col md:items-end"><button type="button" class="inline-flex items-center gap-2 text-xs text-secondary hover:text-primary">`);
          _push(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent));
          _push(` Удалить</button>`);
          _push(ssrRenderComponent(_component_QuantityInput, {
            "model-value": item.quantity,
            label: `Количество ${item.product.name}`,
            "onUpdate:modelValue": ($event) => unref(setQuantity)(item.productId, item.variantId, $event)
          }, null, _parent));
          _push(`<b>${ssrInterpolate(unref(formatPrice)(item.lineTotal))}</b></div></div></article>`);
        });
        _push(`<!--]--></div><aside class="h-fit bg-surface p-6 sm:p-8 xl:sticky xl:top-36"><h2 class="mb-6 text-2xl font-light">Итого</h2><div class="mb-7 flex justify-between border-b border-border pb-6"><span class="text-secondary">Сумма товаров</span><b class="text-xl">${ssrInterpolate(unref(formatPrice)(unref(total)))}</b></div><p class="mb-6 text-xs leading-5 text-secondary">Менеджер подтвердит цену и условия заказа.</p><div class="grid gap-3">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/checkout",
          class: "btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Оформить заказ`);
            } else {
              return [
                createTextVNode("Оформить заказ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/quote",
          class: "btn-secondary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(FileText), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(` Получить КП`);
            } else {
              return [
                createVNode(unref(FileText), { class: "h-4 w-4" }),
                createTextVNode(" Получить КП")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></aside></div>`);
      } else {
        _push(`<div class="flex min-h-[48vh] flex-col items-center justify-center bg-surface p-8 text-center">`);
        _push(ssrRenderComponent(unref(ShoppingBag), { class: "mb-6 h-14 w-14 stroke-1 text-secondary" }, null, _parent));
        _push(`<h2 class="mb-3 text-3xl font-light">Корзина пуста</h2><p class="mb-7 max-w-md text-secondary">Добавьте товары из каталога.</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=cart-BTvETlGA.js.map

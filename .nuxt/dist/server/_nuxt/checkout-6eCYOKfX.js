import { _ as __nuxt_component_0 } from "./nuxt-link-rH_ixKZi.js";
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { u as useShop, f as formatPrice } from "./useShop-BLxPHoy8.js";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/hookable/dist/index.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/unctx/dist/index.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/defu/dist/defu.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const { cart, total } = useShop();
    const sent = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-16" }, _attrs))}>`);
      if (unref(sent)) {
        _push(`<div class="mx-auto max-w-2xl py-20 text-center"><p class="mb-3 text-xs uppercase tracking-widest text-secondary">Спасибо</p><h1 class="mb-5 text-5xl font-light">Заказ принят</h1><p class="mb-8 text-secondary">Менеджер свяжется с вами для подтверждения деталей.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalog",
          class: "btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Вернуться в каталог`);
            } else {
              return [
                createTextVNode("Вернуться в каталог")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="grid gap-14 lg:grid-cols-[1fr_420px]"><div><h1 class="mb-10 text-5xl font-light">Оформление заказа</h1><form id="order" class="grid gap-5 md:grid-cols-2"><label class="text-sm">Имя<input required class="mt-2 w-full border border-border p-3 outline-none focus:border-primary"></label><label class="text-sm">Телефон<input required class="mt-2 w-full border border-border p-3 outline-none focus:border-primary"></label><label class="text-sm md:col-span-2">E-mail<input type="email" required class="mt-2 w-full border border-border p-3 outline-none focus:border-primary"></label><label class="text-sm md:col-span-2">Адрес доставки<textarea class="mt-2 w-full border border-border p-3 outline-none focus:border-primary" rows="4"></textarea></label></form></div><aside class="h-fit bg-surface p-7"><h2 class="mb-6 text-xl">Ваш заказ</h2><!--[-->`);
        ssrRenderList(unref(cart), (item) => {
          _push(`<div class="mb-4 flex justify-between gap-4 text-sm"><span>${ssrInterpolate(item.name)} × ${ssrInterpolate(item.quantity)}</span><b>${ssrInterpolate(unref(formatPrice)(item.price * item.quantity))}</b></div>`);
        });
        _push(`<!--]--><div class="my-6 border-t border-border"></div><div class="mb-7 flex justify-between text-xl"><span>Итого</span><b>${ssrInterpolate(unref(formatPrice)(unref(total)))}</b></div><button form="order" class="btn-primary w-full"${ssrIncludeBooleanAttr(!unref(cart).length) ? " disabled" : ""}>Подтвердить заказ</button></aside></div>`);
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
//# sourceMappingURL=checkout-6eCYOKfX.js.map

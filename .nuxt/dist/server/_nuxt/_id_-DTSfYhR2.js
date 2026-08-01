import { defineComponent, computed, ref, watchEffect, unref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { Minus, Plus, Heart, Truck } from "lucide-vue-next";
import { p as products, u as useShop, c as categories, f as formatPrice } from "./useShop-BLxPHoy8.js";
import { u as useRoute } from "../server.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/hookable/dist/index.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/unctx/dist/index.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/defu/dist/defu.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ufo/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const product = computed(() => products.find((p) => p.id === route.params.id));
    const qty = ref(1);
    const color = ref("");
    const { favorites } = useShop();
    watchEffect(() => {
      if (product.value && !color.value) color.value = product.value.colors[0] ?? "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(product)) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-12" }, _attrs))}><p class="mb-8 text-xs text-secondary">Главная / ${ssrInterpolate(unref(categories).find((c) => c.id === unref(product).categoryId)?.name)} / ${ssrInterpolate(unref(product).name)}</p><div class="grid gap-10 lg:grid-cols-2 lg:gap-20"><div class="aspect-[4/5] bg-surface"><img${ssrRenderAttr("src", unref(product).image)}${ssrRenderAttr("alt", unref(product).name)} class="h-full w-full object-cover"></div><div class="py-4"><p class="mb-4 text-xs uppercase tracking-wider text-secondary">Артикул ${ssrInterpolate(unref(product).article)}</p><h1 class="mb-6 text-4xl font-light leading-tight md:text-5xl">${ssrInterpolate(unref(product).name)}</h1><div class="mb-10 flex gap-3 text-xl"><b>${ssrInterpolate(unref(formatPrice)(unref(product).price))}</b>`);
        if (unref(product).oldPrice) {
          _push(`<s class="text-secondary">${ssrInterpolate(unref(formatPrice)(unref(product).oldPrice))}</s>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mb-8"><p class="mb-3 text-sm font-medium">Цвет: ${ssrInterpolate(unref(color))}</p><div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(unref(product).colors, (c) => {
          _push(`<button class="${ssrRenderClass([c === unref(color) ? "border-primary" : "border-border", "border px-4 py-2 text-sm"])}">${ssrInterpolate(c)}</button>`);
        });
        _push(`<!--]--></div></div><div class="mb-6 flex gap-3"><div class="flex items-center border border-border"><button class="p-3">`);
        _push(ssrRenderComponent(unref(Minus), { class: "h-4" }, null, _parent));
        _push(`</button><span class="w-8 text-center">${ssrInterpolate(unref(qty))}</span><button class="p-3">`);
        _push(ssrRenderComponent(unref(Plus), { class: "h-4" }, null, _parent));
        _push(`</button></div><button class="btn-primary flex-1"${ssrIncludeBooleanAttr(!unref(product).inStock) ? " disabled" : ""}>${ssrInterpolate(unref(product).inStock ? "Добавить в корзину" : "Под заказ")}</button><button class="border border-border p-3">`);
        _push(ssrRenderComponent(unref(Heart), {
          class: unref(favorites).includes(unref(product).id) && "fill-primary"
        }, null, _parent));
        _push(`</button></div><div class="flex items-center gap-3 border-t border-border py-6 text-sm">`);
        _push(ssrRenderComponent(unref(Truck), null, null, _parent));
        _push(`<span>Доставка по Москве от 2 рабочих дней</span></div><p class="leading-7 text-secondary">Лаконичная геометрия, долговечные материалы и продуманная эргономика. Подходит для современных рабочих пространств.</p></div></div></section>`);
      } else {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-24" }, _attrs))}><h1 class="text-4xl">Товар не найден</h1></section>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_id_-DTSfYhR2.js.map

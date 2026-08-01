globalThis.__timing__.logStart('Load chunks/build/ProductCard-VbsXtiXX');import { _ as __nuxt_component_0 } from './nuxt-link-rH_ixKZi.mjs';
import { defineComponent, computed, mergeProps, withCtx, createVNode, unref, createTextVNode, toDisplayString, useSSRContext } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue/server-renderer/index.mjs';
import { Heart } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';
import { u as useShop, c as categories, f as formatPrice } from './useShop-BLxPHoy8.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  setup(__props) {
    const props = __props;
    const { favorites } = useShop();
    const category = computed(() => {
      var _a;
      return (_a = categories.find((c) => c.id === props.product.categoryId)) == null ? void 0 : _a.name;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "group flex flex-col" }, _attrs))}><div class="relative mb-4 aspect-[4/5] overflow-hidden bg-surface">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/product/${__props.product.id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", __props.product.image)}${ssrRenderAttr("alt", __props.product.name)} class="h-full w-full object-cover transition duration-700 group-hover:scale-105"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: __props.product.image,
                alt: __props.product.name,
                class: "h-full w-full object-cover transition duration-700 group-hover:scale-105"
              }, null, 8, ["src", "alt"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.product.isNew) {
        _push(`<span class="absolute left-4 top-4 bg-white px-2 py-1 text-[10px] uppercase tracking-wider">\u041D\u043E\u0432\u0438\u043D\u043A\u0430</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="absolute right-3 top-3 rounded-full bg-white/80 p-2" aria-label="\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435">`);
      _push(ssrRenderComponent(unref(Heart), {
        class: ["h-5 w-5", unref(favorites).includes(__props.product.id) && "fill-primary"]
      }, null, _parent));
      _push(`</button><button class="absolute inset-x-4 bottom-4 translate-y-3 bg-white py-3 text-sm font-medium opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"${ssrIncludeBooleanAttr(!__props.product.inStock) ? " disabled" : ""}>${ssrInterpolate(__props.product.inStock ? "\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443" : "\u041F\u043E\u0434 \u0437\u0430\u043A\u0430\u0437")}</button></div><p class="mb-1 text-[11px] uppercase tracking-wider text-secondary">${ssrInterpolate(unref(category))}</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/product/${__props.product.id}`,
        class: "mb-2 text-sm font-medium hover:text-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.product.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.product.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-auto flex gap-2 text-sm"><b>${ssrInterpolate(unref(formatPrice)(__props.product.price))}</b>`);
      if (__props.product.oldPrice) {
        _push(`<s class="text-secondary">${ssrInterpolate(unref(formatPrice)(__props.product.oldPrice))}</s>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };;globalThis.__timing__.logEnd('Load chunks/build/ProductCard-VbsXtiXX');
//# sourceMappingURL=ProductCard-VbsXtiXX.mjs.map

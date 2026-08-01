import { _ as __nuxt_component_0 } from "./nuxt-link-rH_ixKZi.js";
import { _ as _sfc_main$1 } from "./ProductCard-VbsXtiXX.js";
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { c as categories, p as products } from "./useShop-BLxPHoy8.js";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/hookable/dist/index.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/unctx/dist/index.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/defu/dist/defu.mjs";
import "lucide-vue-next";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ProductCard = _sfc_main$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-14" }, _attrs))}><p class="mb-5 text-xs text-secondary">Главная / Каталог</p><h1 class="mb-4 text-5xl font-light">Каталог мебели</h1><p class="mb-12 max-w-2xl text-secondary">Современные решения для офисов, переговорных и общественных пространств.</p><div class="mb-14 flex gap-3 overflow-auto pb-2"><!--[-->`);
      ssrRenderList(unref(categories), (c) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: c.id,
          to: `/catalog/${c.slug}`,
          class: "whitespace-nowrap border border-border px-4 py-2 text-sm hover:border-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(c.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(c.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4"><!--[-->`);
      ssrRenderList(unref(products), (p) => {
        _push(ssrRenderComponent(_component_ProductCard, {
          key: p.id,
          product: p
        }, null, _parent));
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CSnDGgZ9.js.map

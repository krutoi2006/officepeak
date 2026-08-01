import { _ as _sfc_main$1 } from "./ProductCard-VbsXtiXX.js";
import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { u as useShop, p as products } from "./useShop-BLxPHoy8.js";
import "./nuxt-link-rH_ixKZi.js";
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
  __name: "favorites",
  __ssrInlineRender: true,
  setup(__props) {
    const { favorites } = useShop();
    const list = computed(() => products.filter((product) => favorites.value.includes(product.id)));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductCard = _sfc_main$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-16" }, _attrs))}><h1 class="mb-12 text-5xl font-light">Избранное</h1>`);
      if (unref(list).length) {
        _push(`<div class="grid grid-cols-2 gap-4 lg:grid-cols-4"><!--[-->`);
        ssrRenderList(unref(list), (product) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: product.id,
            product
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<p class="bg-surface p-12 text-center text-secondary">Вы пока ничего не добавили в избранное.</p>`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/favorites.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=favorites-DgjlnXm3.js.map

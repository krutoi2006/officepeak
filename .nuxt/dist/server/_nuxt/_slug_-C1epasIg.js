import { _ as _sfc_main$1 } from "./ProductCard-VbsXtiXX.js";
import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { c as categories, p as products } from "./useShop-BLxPHoy8.js";
import { u as useRoute } from "../server.mjs";
import "./nuxt-link-rH_ixKZi.js";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ufo/dist/index.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/defu/dist/defu.mjs";
import "lucide-vue-next";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/hookable/dist/index.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/unctx/dist/index.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/h3/dist/index.mjs";
import "vue-router";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const category = computed(() => categories.find((c) => c.slug === route.params.slug));
    const filtered = computed(() => products.filter((p) => p.categoryId === category.value?.id));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductCard = _sfc_main$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-14" }, _attrs))}><p class="mb-5 text-xs text-secondary">Главная / Каталог / ${ssrInterpolate(unref(category)?.name)}</p><h1 class="mb-12 text-5xl font-light">${ssrInterpolate(unref(category)?.name || "Категория")}</h1>`);
      if (unref(filtered).length) {
        _push(`<div class="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4"><!--[-->`);
        ssrRenderList(unref(filtered), (p) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: p.id,
            product: p
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="bg-surface p-12 text-center text-secondary">Товары этой категории скоро появятся.</div>`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalog/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_slug_-C1epasIg.js.map

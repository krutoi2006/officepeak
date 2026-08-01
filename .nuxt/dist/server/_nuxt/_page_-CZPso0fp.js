import { defineComponent, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
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
  __name: "[page]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const content = {
      services: ["Индивидуальный заказ", "Проектируем и производим мебель нестандартных размеров для вашего пространства."],
      delivery: ["Доставка и оплата", "Доставляем и собираем мебель по Москве и всей России."],
      contacts: ["Контакты", "8 (800) 000-00-00 · hello@officepeak.ru"]
    };
    const fallback = ["Страница", "Раздел находится в разработке."];
    const data = computed(() => content[String(route.params.page)] ?? fallback);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page min-h-[55vh] py-20" }, _attrs))}><p class="mb-4 text-xs uppercase tracking-widest text-secondary">OFFICEPEAK</p><h1 class="mb-8 text-5xl font-light">${ssrInterpolate(unref(data)[0])}</h1><p class="max-w-2xl text-lg leading-8 text-secondary">${ssrInterpolate(unref(data)[1])}</p></section>`);
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
//# sourceMappingURL=_page_-CZPso0fp.js.map

import { _ as _sfc_main$1 } from "./Breadcrumbs-CZBzi1AX.js";
import { u as useRoute, a as useRouter, _ as __nuxt_component_0 } from "../server.mjs";
import { _ as _sfc_main$2 } from "./CollectionCard--dUroSxt.js";
import { _ as _sfc_main$3 } from "./ProductCard-DXifnGgt.js";
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Search } from "lucide-vue-next";
import { p as products, e as productSearchText, c as collections, b as categories } from "./useShop-Ct_x_K-c.js";
import { u as usePageSeo } from "./usePageSeo-9zNTc1yH.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/hookable/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/unctx/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/defu/dist/defu.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ufo/dist/index.mjs";
import "./QuantityInput-C7yvggq_.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/destr/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ohash/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/klona/dist/index.mjs";
import "./state-tqLlnwND.js";
import "./site-Dljnoeow.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const query = ref(String(route.query.q ?? ""));
    const normalized = computed(() => query.value.trim().toLocaleLowerCase("ru-RU"));
    const productResults = computed(() => normalized.value.length < 2 ? [] : products.filter((product) => productSearchText(product).includes(normalized.value)));
    const collectionResults = computed(() => normalized.value.length < 2 ? [] : collections.filter((item) => `${item.name} ${item.description}`.toLocaleLowerCase("ru-RU").includes(normalized.value)));
    const categoryResults = computed(() => normalized.value.length < 2 ? [] : categories.filter((item) => `${item.name} ${item.description} ${item.subcategories.map((sub) => sub.name).join(" ")}`.toLocaleLowerCase("ru-RU").includes(normalized.value)));
    const totalResults = computed(() => productResults.value.length + collectionResults.value.length + categoryResults.value.length);
    watch(() => route.query.q, (value) => {
      query.value = String(value ?? "");
    });
    usePageSeo("Поиск", "Поиск по названиям, артикулам, категориям, коллекциям и характеристикам каталога OFFICEPEAK.", "/search");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CollectionCard = _sfc_main$2;
      const _component_ProductCard = _sfc_main$3;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-10 md:py-14" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Breadcrumbs, { items: [{ label: "Главная", to: "/" }, { label: "Поиск" }] }, null, _parent));
      _push(`<h1 class="mb-8 display-title">Поиск по каталогу</h1><form class="flex max-w-3xl border-b-2 border-primary" role="search"><label for="search-page-input" class="sr-only">Поисковый запрос</label><input id="search-page-input"${ssrRenderAttr("value", unref(query))} autofocus class="min-w-0 flex-1 bg-transparent py-4 text-xl outline-none" placeholder="Название, артикул, коллекция…"><button type="submit" class="px-4" aria-label="Найти">`);
      _push(ssrRenderComponent(unref(Search), { class: "h-6 w-6" }, null, _parent));
      _push(`</button></form>`);
      if (unref(normalized).length >= 2) {
        _push(`<p class="mt-4 text-sm text-secondary">${ssrInterpolate(unref(totalResults) ? `Найдено: ${unref(totalResults)}` : "Результатов нет")}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(normalized).length < 2) {
        _push(`<div class="mt-16 bg-surface p-10 text-center text-secondary">Введите не менее двух символов. Поиск учитывает название, артикул, категорию, коллекцию и характеристики.</div>`);
      } else if (unref(totalResults)) {
        _push(`<div class="mt-14 space-y-16">`);
        if (unref(categoryResults).length) {
          _push(`<section aria-labelledby="search-categories"><h2 id="search-categories" class="mb-6 text-3xl font-light">Категории</h2><div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
          ssrRenderList(unref(categoryResults), (item) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: item.id,
              to: `/catalog/${item.slug}`,
              class: "border border-border p-5 transition hover:bg-surface"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<h3 class="mb-2 text-lg font-medium"${_scopeId}>${ssrInterpolate(item.name)}</h3><p class="text-sm leading-6 text-secondary"${_scopeId}>${ssrInterpolate(item.description)}</p>`);
                } else {
                  return [
                    createVNode("h3", { class: "mb-2 text-lg font-medium" }, toDisplayString(item.name), 1),
                    createVNode("p", { class: "text-sm leading-6 text-secondary" }, toDisplayString(item.description), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(collectionResults).length) {
          _push(`<section aria-labelledby="search-collections"><h2 id="search-collections" class="mb-6 text-3xl font-light">Коллекции</h2><div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
          ssrRenderList(unref(collectionResults), (item) => {
            _push(ssrRenderComponent(_component_CollectionCard, {
              key: item.id,
              collection: item
            }, null, _parent));
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(productResults).length) {
          _push(`<section aria-labelledby="search-products"><h2 id="search-products" class="mb-6 text-3xl font-light">Товары</h2><div class="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><!--[-->`);
          ssrRenderList(unref(productResults), (item) => {
            _push(ssrRenderComponent(_component_ProductCard, {
              key: item.id,
              product: item
            }, null, _parent));
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="mt-16 bg-surface p-10 text-center"><h2 class="mb-3 text-2xl font-light">Ничего не найдено</h2><p class="mb-6 text-secondary">Проверьте запрос или перейдите в каталог.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalog",
          class: "btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Открыть каталог`);
            } else {
              return [
                createTextVNode("Открыть каталог")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=search-yFq8xtPo.js.map

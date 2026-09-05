globalThis.__timing__.logStart('Load chunks/build/search-yFq8xtPo');import { _ as _sfc_main$1 } from './Breadcrumbs-CZBzi1AX.mjs';
import { u as useRoute, a as useRouter, _ as __nuxt_component_0 } from './server.mjs';
import { _ as _sfc_main$2 } from './CollectionCard--dUroSxt.mjs';
import { _ as _sfc_main$3 } from './ProductCard-DXifnGgt.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Search } from 'lucide-vue-next';
import { p as products, e as productSearchText, c as collections, b as categories } from './useShop-Ct_x_K-c.mjs';
import { u as usePageSeo } from './usePageSeo-9zNTc1yH.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import './QuantityInput-C7yvggq_.mjs';
import './state-tqLlnwND.mjs';
import './site-Dljnoeow.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const route = useRoute();
    useRouter();
    const query = ref(String((_a = route.query.q) != null ? _a : ""));
    const normalized = computed(() => query.value.trim().toLocaleLowerCase("ru-RU"));
    const productResults = computed(() => normalized.value.length < 2 ? [] : products.filter((product) => productSearchText(product).includes(normalized.value)));
    const collectionResults = computed(() => normalized.value.length < 2 ? [] : collections.filter((item) => `${item.name} ${item.description}`.toLocaleLowerCase("ru-RU").includes(normalized.value)));
    const categoryResults = computed(() => normalized.value.length < 2 ? [] : categories.filter((item) => `${item.name} ${item.description} ${item.subcategories.map((sub) => sub.name).join(" ")}`.toLocaleLowerCase("ru-RU").includes(normalized.value)));
    const totalResults = computed(() => productResults.value.length + collectionResults.value.length + categoryResults.value.length);
    watch(() => route.query.q, (value) => {
      query.value = String(value != null ? value : "");
    });
    usePageSeo("\u041F\u043E\u0438\u0441\u043A", "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F\u043C, \u0430\u0440\u0442\u0438\u043A\u0443\u043B\u0430\u043C, \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u043C, \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F\u043C \u0438 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0430\u043C \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430 OFFICEPEAK.", "/search");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CollectionCard = _sfc_main$2;
      const _component_ProductCard = _sfc_main$3;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-10 md:py-14" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Breadcrumbs, { items: [{ label: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", to: "/" }, { label: "\u041F\u043E\u0438\u0441\u043A" }] }, null, _parent));
      _push(`<h1 class="mb-8 display-title">\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0443</h1><form class="flex max-w-3xl border-b-2 border-primary" role="search"><label for="search-page-input" class="sr-only">\u041F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441</label><input id="search-page-input"${ssrRenderAttr("value", unref(query))} autofocus class="min-w-0 flex-1 bg-transparent py-4 text-xl outline-none" placeholder="\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435, \u0430\u0440\u0442\u0438\u043A\u0443\u043B, \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F\u2026"><button type="submit" class="px-4" aria-label="\u041D\u0430\u0439\u0442\u0438">`);
      _push(ssrRenderComponent(unref(Search), { class: "h-6 w-6" }, null, _parent));
      _push(`</button></form>`);
      if (unref(normalized).length >= 2) {
        _push(`<p class="mt-4 text-sm text-secondary">${ssrInterpolate(unref(totalResults) ? `\u041D\u0430\u0439\u0434\u0435\u043D\u043E: ${unref(totalResults)}` : "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043D\u0435\u0442")}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(normalized).length < 2) {
        _push(`<div class="mt-16 bg-surface p-10 text-center text-secondary">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 \u0434\u0432\u0443\u0445 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432. \u041F\u043E\u0438\u0441\u043A \u0443\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u0442 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435, \u0430\u0440\u0442\u0438\u043A\u0443\u043B, \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E, \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044E \u0438 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438.</div>`);
      } else if (unref(totalResults)) {
        _push(`<div class="mt-14 space-y-16">`);
        if (unref(categoryResults).length) {
          _push(`<section aria-labelledby="search-categories"><h2 id="search-categories" class="mb-6 text-3xl font-light">\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438</h2><div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
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
          _push(`<section aria-labelledby="search-collections"><h2 id="search-collections" class="mb-6 text-3xl font-light">\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438</h2><div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
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
          _push(`<section aria-labelledby="search-products"><h2 id="search-products" class="mb-6 text-3xl font-light">\u0422\u043E\u0432\u0430\u0440\u044B</h2><div class="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><!--[-->`);
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
        _push(`<div class="mt-16 bg-surface p-10 text-center"><h2 class="mb-3 text-2xl font-light">\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E</h2><p class="mb-6 text-secondary">\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441 \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalog",
          class: "btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433`);
            } else {
              return [
                createTextVNode("\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433")
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

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/search-yFq8xtPo');
//# sourceMappingURL=search-yFq8xtPo.mjs.map

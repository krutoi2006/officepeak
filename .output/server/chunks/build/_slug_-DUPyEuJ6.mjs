globalThis.__timing__.logStart('Load chunks/build/_slug_-DUPyEuJ6');import { _ as _sfc_main$1 } from './Breadcrumbs-CZBzi1AX.mjs';
import { u as useRoute, c as createError, _ as __nuxt_component_0 } from './server.mjs';
import { _ as _sfc_main$2 } from './CollectionCard--dUroSxt.mjs';
import { _ as _sfc_main$3 } from './ProductCard-DXifnGgt.mjs';
import { defineComponent, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { ArrowRight } from 'lucide-vue-next';
import { k as categoryBySlug, c as collections, p as products } from './useShop-Ct_x_K-c.mjs';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const category = categoryBySlug(String(route.params.slug));
    if (!category) throw createError({ statusCode: 404, statusMessage: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430" });
    const categoryCollections = collections.filter((item) => item.categoryId === category.id);
    const categoryProducts = products.filter((item) => item.categoryId === category.id);
    usePageSeo(category.name, category.description, `/catalog/${category.slug}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CollectionCard = _sfc_main$2;
      const _component_ProductCard = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="container-page py-10 md:py-14">`);
      _push(ssrRenderComponent(_component_Breadcrumbs, {
        items: [{ label: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", to: "/" }, { label: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433", to: "/catalog" }, { label: unref(category).name }]
      }, null, _parent));
      _push(`<div class="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><h1 class="display-title">${ssrInterpolate(unref(category).name)}</h1></div><p class="max-w-xl leading-7 text-secondary lg:justify-self-end">${ssrInterpolate(unref(category).description)}</p></div>`);
      if (unref(category).subcategories.length) {
        _push(`<div class="mt-10 flex flex-wrap gap-2" aria-label="\u041F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"><!--[-->`);
        ssrRenderList(unref(category).subcategories, (item) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.id,
            to: { path: "/catalog", query: { category: unref(category).id, subcategory: item.id } },
            class: "border border-border px-4 py-2 text-sm transition hover:border-primary hover:bg-surface"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
      if (unref(categoryCollections).length) {
        _push(`<section class="bg-surface section-space"><div class="container-page"><div class="mb-9"><h2 class="text-4xl font-light">\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438</h2></div><div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
        ssrRenderList(unref(categoryCollections), (item) => {
          _push(ssrRenderComponent(_component_CollectionCard, {
            key: item.id,
            collection: item
          }, null, _parent));
        });
        _push(`<!--]--></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="container-page section-space"><div class="mb-9 flex flex-wrap items-end justify-between gap-5"><div><h2 class="text-4xl font-light">\u0422\u043E\u0432\u0430\u0440\u044B</h2></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: { path: "/catalog", query: { category: unref(category).id } },
        class: "inline-flex items-center gap-2 text-sm font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0412\u0441\u0435 \u0442\u043E\u0432\u0430\u0440\u044B `);
            _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode("\u0412\u0441\u0435 \u0442\u043E\u0432\u0430\u0440\u044B "),
              createVNode(unref(ArrowRight), { class: "h-4 w-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(categoryProducts).length) {
        _push(`<div class="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><!--[-->`);
        ssrRenderList(unref(categoryProducts), (item) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: item.id,
            product: item
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="bg-surface p-12 text-center"><h3 class="mb-2 text-2xl font-light">\u0422\u043E\u0432\u0430\u0440\u044B \u0441\u043A\u043E\u0440\u043E \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F</h3><p class="text-secondary">\u041C\u044B \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u043C \u0442\u043E\u0432\u0430\u0440\u044B \u0432 \u044D\u0442\u0443 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E.</p></div>`);
      }
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalog/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/_slug_-DUPyEuJ6');
//# sourceMappingURL=_slug_-DUPyEuJ6.mjs.map

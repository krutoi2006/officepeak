globalThis.__timing__.logStart('Load chunks/build/_slug_-DalrYtef');import { _ as _sfc_main$1 } from './Breadcrumbs-CZBzi1AX.mjs';
import { _ as _sfc_main$2 } from './ProductCard-DXifnGgt.mjs';
import { _ as _sfc_main$3 } from './CollectionCard--dUroSxt.mjs';
import { defineComponent, ref, computed, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';
import { l as collectionBySlug, h as categoryById, p as products, c as collections } from './useShop-Ct_x_K-c.mjs';
import { u as useRoute, c as createError } from './server.mjs';
import { u as usePageSeo } from './usePageSeo-9zNTc1yH.mjs';
import './QuantityInput-C7yvggq_.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './state-tqLlnwND.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import './site-Dljnoeow.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const collection = collectionBySlug(String(route.params.slug));
    if (!collection) throw createError({ statusCode: 404, statusMessage: "\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430" });
    const category = categoryById(collection.categoryId);
    const activeGroup = ref("");
    const collectionProducts = computed(() => products.filter((item) => item.collectionId === collection.id && (!activeGroup.value || item.groupId === activeGroup.value)));
    const related = collections.filter((item) => collection.relatedCollectionIds.includes(item.id));
    usePageSeo(`\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F ${collection.name}`, collection.description, `/collections/${collection.slug}`);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Breadcrumbs = _sfc_main$1;
      const _component_ProductCard = _sfc_main$2;
      const _component_CollectionCard = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="container-page py-10 md:py-14">`);
      _push(ssrRenderComponent(_component_Breadcrumbs, {
        items: [{ label: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", to: "/" }, { label: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433", to: "/catalog" }, { label: (_b = (_a = unref(category)) == null ? void 0 : _a.name) != null ? _b : "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F", to: unref(category) ? `/catalog/${unref(category).slug}` : "/catalog" }, { label: unref(collection).name }]
      }, null, _parent));
      _push(`<div class="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><h1 class="display-title">${ssrInterpolate(unref(collection).name)}</h1></div><p class="max-w-2xl text-lg leading-8 text-secondary">${ssrInterpolate(unref(collection).description)}</p></div><div class="mt-10 flex flex-wrap items-center gap-3"><span class="text-sm font-medium">\u0426\u0432\u0435\u0442\u043E\u0432\u044B\u0435 \u0438\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F:</span><!--[-->`);
      ssrRenderList(unref(collection).colors, (item) => {
        _push(`<span class="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs"><span class="h-4 w-4 rounded-full border border-black/10" style="${ssrRenderStyle({ backgroundColor: item.hex })}"></span>${ssrInterpolate(item.name)}</span>`);
      });
      _push(`<!--]--></div></section><section class="container-page pb-10"><div class="flex snap-x gap-4 overflow-x-auto pb-4"><!--[-->`);
      ssrRenderList(unref(collection).images, (item) => {
        _push(`<figure class="min-w-[86%] snap-start sm:min-w-[60%] lg:min-w-[46%]"><img${ssrRenderAttr("src", item.src)}${ssrRenderAttr("alt", item.alt)} class="aspect-[4/3] w-full object-cover"></figure>`);
      });
      _push(`<!--]--></div></section><section class="border-y border-border bg-surface section-space"><div class="container-page grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><h2 class="text-4xl font-light">\u041E \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438</h2></div><dl class="border-t border-border"><!--[-->`);
      ssrRenderList(unref(collection).specifications, (value, key) => {
        _push(`<div class="grid gap-2 border-b border-border py-4 sm:grid-cols-2"><dt class="text-sm text-secondary">${ssrInterpolate(key)}</dt><dd class="text-sm font-medium">${ssrInterpolate(value)}</dd></div>`);
      });
      _push(`<!--]--></dl></div></section><section class="container-page section-space"><div class="mb-8"><h2 class="text-4xl font-light">\u0422\u043E\u0432\u0430\u0440\u044B \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438</h2></div><div class="mb-10 flex flex-wrap gap-2"><button type="button" class="${ssrRenderClass([!unref(activeGroup) ? "border-primary bg-primary text-white" : "border-border", "border px-4 py-2 text-sm"])}">\u0412\u0441\u0435</button><!--[-->`);
      ssrRenderList(unref(collection).groups, (group) => {
        _push(`<button type="button" class="${ssrRenderClass([unref(activeGroup) === group.id ? "border-primary bg-primary text-white" : "border-border", "border px-4 py-2 text-sm"])}">${ssrInterpolate(group.name)}</button>`);
      });
      _push(`<!--]--></div>`);
      if (unref(collectionProducts).length) {
        _push(`<div class="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><!--[-->`);
        ssrRenderList(unref(collectionProducts), (item) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: item.id,
            product: item
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<p class="bg-surface p-10 text-center text-secondary">\u0412 \u044D\u0442\u043E\u0439 \u0433\u0440\u0443\u043F\u043F\u0435 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0442\u043E\u0432\u0430\u0440\u043E\u0432.</p>`);
      }
      _push(`</section>`);
      if (unref(related).length) {
        _push(`<section class="bg-surface section-space"><div class="container-page"><div class="mb-9 flex items-center justify-between"><div><h2 class="text-4xl font-light">\u0414\u0440\u0443\u0433\u0438\u0435 \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438</h2></div><div class="hidden gap-2 md:flex">`);
        _push(ssrRenderComponent(unref(ArrowLeft), { class: "h-5 w-5" }, null, _parent));
        _push(ssrRenderComponent(unref(ArrowRight), { class: "h-5 w-5" }, null, _parent));
        _push(`</div></div><div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
        ssrRenderList(unref(related), (item) => {
          _push(ssrRenderComponent(_component_CollectionCard, {
            key: item.id,
            collection: item
          }, null, _parent));
        });
        _push(`<!--]--></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/collections/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/_slug_-DalrYtef');
//# sourceMappingURL=_slug_-DalrYtef.mjs.map

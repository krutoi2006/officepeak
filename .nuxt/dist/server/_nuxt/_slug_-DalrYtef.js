import { _ as _sfc_main$1 } from "./Breadcrumbs-CZBzi1AX.js";
import { _ as _sfc_main$2 } from "./ProductCard-DXifnGgt.js";
import { _ as _sfc_main$3 } from "./CollectionCard--dUroSxt.js";
import { defineComponent, ref, computed, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { ArrowLeft, ArrowRight } from "lucide-vue-next";
import { l as collectionBySlug, h as categoryById, p as products, c as collections } from "./useShop-Ct_x_K-c.js";
import { u as useRoute, c as createError } from "../server.mjs";
import { u as usePageSeo } from "./usePageSeo-9zNTc1yH.js";
import "./QuantityInput-C7yvggq_.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/h3/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/destr/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ohash/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/klona/dist/index.mjs";
import "./state-tqLlnwND.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/hookable/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/defu/dist/defu.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ufo/dist/index.mjs";
import "./site-Dljnoeow.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const collection = collectionBySlug(String(route.params.slug));
    if (!collection) throw createError({ statusCode: 404, statusMessage: "Коллекция не найдена" });
    const category = categoryById(collection.categoryId);
    const activeGroup = ref("");
    const collectionProducts = computed(() => products.filter((item) => item.collectionId === collection.id && (!activeGroup.value || item.groupId === activeGroup.value)));
    const related = collections.filter((item) => collection.relatedCollectionIds.includes(item.id));
    usePageSeo(`Коллекция ${collection.name}`, collection.description, `/collections/${collection.slug}`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      const _component_ProductCard = _sfc_main$2;
      const _component_CollectionCard = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="container-page py-10 md:py-14">`);
      _push(ssrRenderComponent(_component_Breadcrumbs, {
        items: [{ label: "Главная", to: "/" }, { label: "Каталог", to: "/catalog" }, { label: unref(category)?.name ?? "Категория", to: unref(category) ? `/catalog/${unref(category).slug}` : "/catalog" }, { label: unref(collection).name }]
      }, null, _parent));
      _push(`<div class="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><h1 class="display-title">${ssrInterpolate(unref(collection).name)}</h1></div><p class="max-w-2xl text-lg leading-8 text-secondary">${ssrInterpolate(unref(collection).description)}</p></div><div class="mt-10 flex flex-wrap items-center gap-3"><span class="text-sm font-medium">Цветовые исполнения:</span><!--[-->`);
      ssrRenderList(unref(collection).colors, (item) => {
        _push(`<span class="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs"><span class="h-4 w-4 rounded-full border border-black/10" style="${ssrRenderStyle({ backgroundColor: item.hex })}"></span>${ssrInterpolate(item.name)}</span>`);
      });
      _push(`<!--]--></div></section><section class="container-page pb-10"><div class="flex snap-x gap-4 overflow-x-auto pb-4"><!--[-->`);
      ssrRenderList(unref(collection).images, (item) => {
        _push(`<figure class="min-w-[86%] snap-start sm:min-w-[60%] lg:min-w-[46%]"><img${ssrRenderAttr("src", item.src)}${ssrRenderAttr("alt", item.alt)} class="aspect-[4/3] w-full object-cover"></figure>`);
      });
      _push(`<!--]--></div></section><section class="border-y border-border bg-surface section-space"><div class="container-page grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><h2 class="text-4xl font-light">О коллекции</h2></div><dl class="border-t border-border"><!--[-->`);
      ssrRenderList(unref(collection).specifications, (value, key) => {
        _push(`<div class="grid gap-2 border-b border-border py-4 sm:grid-cols-2"><dt class="text-sm text-secondary">${ssrInterpolate(key)}</dt><dd class="text-sm font-medium">${ssrInterpolate(value)}</dd></div>`);
      });
      _push(`<!--]--></dl></div></section><section class="container-page section-space"><div class="mb-8"><h2 class="text-4xl font-light">Товары коллекции</h2></div><div class="mb-10 flex flex-wrap gap-2"><button type="button" class="${ssrRenderClass([!unref(activeGroup) ? "border-primary bg-primary text-white" : "border-border", "border px-4 py-2 text-sm"])}">Все</button><!--[-->`);
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
        _push(`<p class="bg-surface p-10 text-center text-secondary">В этой группе пока нет товаров.</p>`);
      }
      _push(`</section>`);
      if (unref(related).length) {
        _push(`<section class="bg-surface section-space"><div class="container-page"><div class="mb-9 flex items-center justify-between"><div><h2 class="text-4xl font-light">Другие коллекции</h2></div><div class="hidden gap-2 md:flex">`);
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
export {
  _sfc_main as default
};
//# sourceMappingURL=_slug_-DalrYtef.js.map

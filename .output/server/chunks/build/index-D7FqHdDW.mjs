globalThis.__timing__.logStart('Load chunks/build/index-D7FqHdDW');import { _ as _sfc_main$1 } from './Breadcrumbs-CZBzi1AX.mjs';
import { u as useRoute, a as useRouter, _ as __nuxt_component_0 } from './server.mjs';
import { _ as _sfc_main$2 } from './CollectionCard--dUroSxt.mjs';
import { _ as _sfc_main$3 } from './ProductCard-DXifnGgt.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from 'vue/server-renderer';
import { Filter, Grid2X2, LayoutGrid, X, RotateCcw } from 'lucide-vue-next';
import { p as products, j as productStartingPrice, b as categories, c as collections } from './useShop-Ct_x_K-c.mjs';
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

const perPage = 8;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const readQuery = (key) => {
      var _a;
      return String((_a = route.query[key]) != null ? _a : "");
    };
    const priceFloor = Math.floor(Math.min(...products.map(productStartingPrice)) / 1e3) * 1e3;
    const priceCeil = Math.ceil(Math.max(...products.flatMap((product) => product.variants.map((variant) => variant.price))) / 1e3) * 1e3;
    const minPrice = ref(Number(readQuery("min")) || priceFloor);
    const maxPrice = ref(Number(readQuery("max")) || priceCeil);
    const category = ref(readQuery("category"));
    const subcategory = ref(readQuery("subcategory"));
    const collection = ref(readQuery("collection"));
    const availability = ref(readQuery("availability"));
    const color = ref(readQuery("color"));
    const sort = ref(readQuery("sort") || "default");
    const view = ref(readQuery("view") || "grid");
    const page = ref(Math.max(1, Number(readQuery("page")) || 1));
    const filtersOpen = ref(false);
    const allColors = products.flatMap((item) => item.variants.map((variant) => variant.color)).filter((item, index, list) => list.findIndex((candidate) => candidate.id === item.id) === index);
    const activeCategory = computed(() => categories.find((item) => item.id === category.value));
    const visibleSubcategories = computed(() => {
      var _a, _b;
      return (_b = (_a = activeCategory.value) == null ? void 0 : _a.subcategories) != null ? _b : categories.flatMap((item) => item.subcategories);
    });
    const visibleCollections = computed(() => category.value ? collections.filter((item) => item.categoryId === category.value) : collections);
    const filtered = computed(() => {
      const list = products.filter((product) => {
        const matchesPrice = product.variants.some((variant) => variant.price >= minPrice.value && variant.price <= maxPrice.value);
        const matchesAvailability = !availability.value || product.variants.some((variant) => variant.availability === availability.value);
        const matchesColor = !color.value || product.variants.some((variant) => variant.color.id === color.value);
        return matchesPrice && matchesAvailability && matchesColor && (!category.value || product.categoryId === category.value) && (!subcategory.value || product.subcategoryId === subcategory.value) && (!collection.value || product.collectionId === collection.value);
      });
      return [...list].sort((a, b) => {
        if (sort.value === "price-asc") return productStartingPrice(a) - productStartingPrice(b);
        if (sort.value === "price-desc") return productStartingPrice(b) - productStartingPrice(a);
        if (sort.value === "name") return a.name.localeCompare(b.name, "ru");
        if (sort.value === "new") return Number(b.isNew) - Number(a.isNew);
        return 0;
      });
    });
    const visibleProducts = computed(() => filtered.value.slice(0, page.value * perPage));
    const activeFilters = computed(() => [category.value, subcategory.value, collection.value, availability.value, color.value].filter(Boolean).length + Number(minPrice.value !== priceFloor || maxPrice.value !== priceCeil));
    const syncQuery = () => {
      const query = {};
      if (minPrice.value !== priceFloor) query.min = String(minPrice.value);
      if (maxPrice.value !== priceCeil) query.max = String(maxPrice.value);
      if (category.value) query.category = category.value;
      if (subcategory.value) query.subcategory = subcategory.value;
      if (collection.value) query.collection = collection.value;
      if (availability.value) query.availability = availability.value;
      if (color.value) query.color = color.value;
      if (sort.value !== "default") query.sort = sort.value;
      if (view.value !== "grid") query.view = view.value;
      if (page.value > 1) query.page = String(page.value);
      router.replace({ query });
    };
    watch([minPrice, maxPrice, category, subcategory, collection, availability, color, sort, view, page], syncQuery);
    watch(category, () => {
      if (subcategory.value && !visibleSubcategories.value.some((item) => item.id === subcategory.value)) subcategory.value = "";
      if (collection.value && !visibleCollections.value.some((item) => item.id === collection.value)) collection.value = "";
      page.value = 1;
    });
    watch([minPrice, maxPrice, subcategory, collection, availability, color, sort], () => {
      page.value = 1;
    });
    usePageSeo("\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u043E\u0444\u0438\u0441\u043D\u043E\u0439 \u043C\u0435\u0431\u0435\u043B\u0438", "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438, \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438 \u0438 \u0442\u043E\u0432\u0430\u0440\u044B OFFICEPEAK \u0441 \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u043C\u0438 \u043F\u043E \u0446\u0435\u043D\u0435, \u043D\u0430\u043B\u0438\u0447\u0438\u044E, \u0446\u0432\u0435\u0442\u0443 \u0438 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044E.", "/catalog");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CollectionCard = _sfc_main$2;
      const _component_ProductCard = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-page py-10 md:py-14" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Breadcrumbs, { items: [{ label: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", to: "/" }, { label: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433" }] }, null, _parent));
      _push(`<div class="mb-12 grid gap-5 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><h1 class="display-title">\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u043E\u0444\u0438\u0441\u043D\u043E\u0439 \u043C\u0435\u0431\u0435\u043B\u0438</h1></div><p class="max-w-2xl leading-7 text-secondary lg:justify-self-end">\u041C\u0435\u0431\u0435\u043B\u044C \u0434\u043B\u044F \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u043C\u0435\u0441\u0442, \u043F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043D\u044B\u0445 \u0438 \u0434\u0440\u0443\u0433\u0438\u0445 \u0437\u043E\u043D \u043E\u0444\u0438\u0441\u0430.</p></div><section aria-labelledby="catalog-categories" class="mb-16"><h2 id="catalog-categories" class="sr-only">\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438</h2><div class="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><!--[-->`);
      ssrRenderList(unref(categories), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.id,
          to: `/catalog/${item.slug}`,
          class: "group flex min-h-28 items-center gap-4 bg-white p-4 transition hover:bg-surface"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", item.image.src)}${ssrRenderAttr("alt", item.image.alt)} loading="lazy" class="h-16 w-20 shrink-0 object-cover"${_scopeId}><span class="text-sm font-medium leading-5 group-hover:text-accent"${_scopeId}>${ssrInterpolate(item.name)}</span>`);
            } else {
              return [
                createVNode("img", {
                  src: item.image.src,
                  alt: item.image.alt,
                  loading: "lazy",
                  class: "h-16 w-20 shrink-0 object-cover"
                }, null, 8, ["src", "alt"]),
                createVNode("span", { class: "text-sm font-medium leading-5 group-hover:text-accent" }, toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section><section class="mb-16" aria-labelledby="collections-heading"><div class="mb-7 flex items-end justify-between"><div><h2 id="collections-heading" class="text-3xl font-light md:text-4xl">\u0421\u0435\u0440\u0438\u0438 \u043C\u0435\u0431\u0435\u043B\u0438</h2></div></div><div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(unref(collections).slice(0, 3), (item) => {
        _push(ssrRenderComponent(_component_CollectionCard, {
          key: item.id,
          collection: item
        }, null, _parent));
      });
      _push(`<!--]--></div></section><section aria-labelledby="products-heading"><div class="mb-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4"><div><h2 id="products-heading" class="text-2xl font-light">\u0422\u043E\u0432\u0430\u0440\u044B \u0438 \u043C\u043E\u0434\u0443\u043B\u0438</h2><p class="text-xs text-secondary">\u041D\u0430\u0439\u0434\u0435\u043D\u043E: ${ssrInterpolate(unref(filtered).length)}</p></div><div class="flex items-center gap-2"><button type="button" class="btn-secondary lg:hidden">`);
      _push(ssrRenderComponent(unref(Filter), { class: "h-4 w-4" }, null, _parent));
      _push(` \u0424\u0438\u043B\u044C\u0442\u0440\u044B `);
      if (unref(activeFilters)) {
        _push(`<span>(${ssrInterpolate(unref(activeFilters))})</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><label class="sr-only" for="sort">\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430</label><select id="sort" class="h-11 border border-border bg-white px-3 text-sm"><option value="default"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "default") : ssrLooseEqual(unref(sort), "default")) ? " selected" : ""}>\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E</option><option value="price-asc"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "price-asc") : ssrLooseEqual(unref(sort), "price-asc")) ? " selected" : ""}>\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u0435\u0448\u0435\u0432\u043B\u0435</option><option value="price-desc"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "price-desc") : ssrLooseEqual(unref(sort), "price-desc")) ? " selected" : ""}>\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0434\u043E\u0440\u043E\u0436\u0435</option><option value="name"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "name") : ssrLooseEqual(unref(sort), "name")) ? " selected" : ""}>\u041F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E</option><option value="new"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "new") : ssrLooseEqual(unref(sort), "new")) ? " selected" : ""}>\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u043E\u0432\u0438\u043D\u043A\u0438</option></select><div class="hidden border border-border sm:flex"><button type="button" class="${ssrRenderClass([unref(view) === "grid" && "bg-surface", "p-3"])}" aria-label="\u0421\u0435\u0442\u043A\u0430 \u043F\u043E \u0447\u0435\u0442\u044B\u0440\u0435">`);
      _push(ssrRenderComponent(unref(Grid2X2), { class: "h-4 w-4" }, null, _parent));
      _push(`</button><button type="button" class="${ssrRenderClass([unref(view) === "wide" && "bg-surface", "p-3"])}" aria-label="\u041A\u0440\u0443\u043F\u043D\u0430\u044F \u0441\u0435\u0442\u043A\u0430">`);
      _push(ssrRenderComponent(unref(LayoutGrid), { class: "h-4 w-4" }, null, _parent));
      _push(`</button></div></div></div><div class="grid gap-8 lg:grid-cols-[260px_1fr]">`);
      if (unref(filtersOpen)) {
        _push(`<div class="fixed inset-0 z-40 bg-black/45 lg:hidden" aria-hidden="true"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([unref(filtersOpen) ? "fixed inset-y-0 left-0 w-[88%] max-w-sm overflow-y-auto p-6 shadow-2xl" : "hidden", "z-50 bg-white lg:static lg:z-auto lg:block"])}"><div class="mb-7 flex items-center justify-between"><h3 class="text-lg font-medium">\u0424\u0438\u043B\u044C\u0442\u0440\u044B</h3><button type="button" class="icon-button lg:hidden" aria-label="\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440\u044B">`);
      _push(ssrRenderComponent(unref(X), { class: "h-4 w-4" }, null, _parent));
      _push(`</button></div><div class="space-y-7"><fieldset><legend class="mb-3 text-sm font-medium">\u0426\u0435\u043D\u0430, \u20BD</legend><div class="grid grid-cols-2 gap-2"><label class="text-xs text-secondary">\u041E\u0442<input${ssrRenderAttr("value", unref(minPrice))} type="number"${ssrRenderAttr("min", priceFloor)}${ssrRenderAttr("max", unref(maxPrice))} class="field-input"></label><label class="text-xs text-secondary">\u0414\u043E<input${ssrRenderAttr("value", unref(maxPrice))} type="number"${ssrRenderAttr("min", unref(minPrice))}${ssrRenderAttr("max", priceCeil)} class="field-input"></label></div></fieldset><label class="field-label">\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F<select class="field-input"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(category)) ? ssrLooseContain(unref(category), "") : ssrLooseEqual(unref(category), "")) ? " selected" : ""}>\u0412\u0441\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438</option><!--[-->`);
      ssrRenderList(unref(categories), (item) => {
        _push(`<option${ssrRenderAttr("value", item.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(category)) ? ssrLooseContain(unref(category), item.id) : ssrLooseEqual(unref(category), item.id)) ? " selected" : ""}>${ssrInterpolate(item.name)}</option>`);
      });
      _push(`<!--]--></select></label><label class="field-label">\u041F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F<select class="field-input"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(subcategory)) ? ssrLooseContain(unref(subcategory), "") : ssrLooseEqual(unref(subcategory), "")) ? " selected" : ""}>\u0412\u0441\u0435 \u043F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438</option><!--[-->`);
      ssrRenderList(unref(visibleSubcategories), (item) => {
        _push(`<option${ssrRenderAttr("value", item.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(subcategory)) ? ssrLooseContain(unref(subcategory), item.id) : ssrLooseEqual(unref(subcategory), item.id)) ? " selected" : ""}>${ssrInterpolate(item.name)}</option>`);
      });
      _push(`<!--]--></select></label><label class="field-label">\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F<select class="field-input"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(collection)) ? ssrLooseContain(unref(collection), "") : ssrLooseEqual(unref(collection), "")) ? " selected" : ""}>\u0412\u0441\u0435 \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438</option><!--[-->`);
      ssrRenderList(unref(visibleCollections), (item) => {
        _push(`<option${ssrRenderAttr("value", item.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(collection)) ? ssrLooseContain(unref(collection), item.id) : ssrLooseEqual(unref(collection), item.id)) ? " selected" : ""}>${ssrInterpolate(item.name)}</option>`);
      });
      _push(`<!--]--></select></label><fieldset><legend class="mb-3 text-sm font-medium">\u041D\u0430\u043B\u0438\u0447\u0438\u0435</legend><div class="space-y-2 text-sm"><label class="flex gap-2"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(availability), "")) ? " checked" : ""} type="radio" value="">\u0412\u0441\u0435</label><label class="flex gap-2"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(availability), "in-stock")) ? " checked" : ""} type="radio" value="in-stock">\u0412 \u043D\u0430\u043B\u0438\u0447\u0438\u0438</label><label class="flex gap-2"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(availability), "on-order")) ? " checked" : ""} type="radio" value="on-order">\u041F\u043E\u0434 \u0437\u0430\u043A\u0430\u0437</label></div></fieldset><label class="field-label">\u0426\u0432\u0435\u0442<select class="field-input"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(color)) ? ssrLooseContain(unref(color), "") : ssrLooseEqual(unref(color), "")) ? " selected" : ""}>\u0412\u0441\u0435 \u0446\u0432\u0435\u0442\u0430</option><!--[-->`);
      ssrRenderList(unref(allColors), (item) => {
        _push(`<option${ssrRenderAttr("value", item.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(color)) ? ssrLooseContain(unref(color), item.id) : ssrLooseEqual(unref(color), item.id)) ? " selected" : ""}>${ssrInterpolate(item.name)}</option>`);
      });
      _push(`<!--]--></select></label><button type="button" class="btn-secondary w-full">`);
      _push(ssrRenderComponent(unref(RotateCcw), { class: "h-4 w-4" }, null, _parent));
      _push(` \u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C</button></div></aside><div>`);
      if (unref(visibleProducts).length) {
        _push(`<div class="${ssrRenderClass([unref(view) === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "md:grid-cols-2", "grid gap-x-4 gap-y-12"])}"><!--[-->`);
        ssrRenderList(unref(visibleProducts), (product) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: product.id,
            product
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="flex min-h-72 flex-col items-center justify-center bg-surface p-8 text-center"><h3 class="mb-2 text-2xl font-light">\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E</h3><p class="mb-6 max-w-md text-sm text-secondary">\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0438\u043B\u0438 \u0441\u0431\u0440\u043E\u0441\u044C\u0442\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u044B.</p><button type="button" class="btn-primary">\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440\u044B</button></div>`);
      }
      if (unref(visibleProducts).length < unref(filtered).length) {
        _push(`<div class="mt-12 text-center"><button type="button" class="btn-secondary">\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0451</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/index-D7FqHdDW');
//# sourceMappingURL=index-D7FqHdDW.mjs.map

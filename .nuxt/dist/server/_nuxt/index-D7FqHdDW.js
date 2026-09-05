import { _ as _sfc_main$1 } from "./Breadcrumbs-CZBzi1AX.js";
import { u as useRoute, a as useRouter, _ as __nuxt_component_0 } from "../server.mjs";
import { _ as _sfc_main$2 } from "./CollectionCard--dUroSxt.js";
import { _ as _sfc_main$3 } from "./ProductCard-DXifnGgt.js";
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from "vue/server-renderer";
import { Filter, Grid2X2, LayoutGrid, X, RotateCcw } from "lucide-vue-next";
import { p as products, j as productStartingPrice, b as categories, c as collections } from "./useShop-Ct_x_K-c.js";
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
const perPage = 8;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const readQuery = (key) => String(route.query[key] ?? "");
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
    const visibleSubcategories = computed(() => activeCategory.value?.subcategories ?? categories.flatMap((item) => item.subcategories));
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
    usePageSeo("Каталог офисной мебели", "Категории, коллекции и товары OFFICEPEAK с фильтрами по цене, наличию, цвету и назначению.", "/catalog");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CollectionCard = _sfc_main$2;
      const _component_ProductCard = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container-page py-10 md:py-14" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Breadcrumbs, { items: [{ label: "Главная", to: "/" }, { label: "Каталог" }] }, null, _parent));
      _push(`<div class="mb-12 grid gap-5 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><h1 class="display-title">Каталог офисной мебели</h1></div><p class="max-w-2xl leading-7 text-secondary lg:justify-self-end">Мебель для рабочих мест, переговорных и других зон офиса.</p></div><section aria-labelledby="catalog-categories" class="mb-16"><h2 id="catalog-categories" class="sr-only">Категории</h2><div class="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><!--[-->`);
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
      _push(`<!--]--></div></section><section class="mb-16" aria-labelledby="collections-heading"><div class="mb-7 flex items-end justify-between"><div><h2 id="collections-heading" class="text-3xl font-light md:text-4xl">Серии мебели</h2></div></div><div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(unref(collections).slice(0, 3), (item) => {
        _push(ssrRenderComponent(_component_CollectionCard, {
          key: item.id,
          collection: item
        }, null, _parent));
      });
      _push(`<!--]--></div></section><section aria-labelledby="products-heading"><div class="mb-6 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4"><div><h2 id="products-heading" class="text-2xl font-light">Товары и модули</h2><p class="text-xs text-secondary">Найдено: ${ssrInterpolate(unref(filtered).length)}</p></div><div class="flex items-center gap-2"><button type="button" class="btn-secondary lg:hidden">`);
      _push(ssrRenderComponent(unref(Filter), { class: "h-4 w-4" }, null, _parent));
      _push(` Фильтры `);
      if (unref(activeFilters)) {
        _push(`<span>(${ssrInterpolate(unref(activeFilters))})</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button><label class="sr-only" for="sort">Сортировка</label><select id="sort" class="h-11 border border-border bg-white px-3 text-sm"><option value="default"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "default") : ssrLooseEqual(unref(sort), "default")) ? " selected" : ""}>По умолчанию</option><option value="price-asc"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "price-asc") : ssrLooseEqual(unref(sort), "price-asc")) ? " selected" : ""}>Сначала дешевле</option><option value="price-desc"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "price-desc") : ssrLooseEqual(unref(sort), "price-desc")) ? " selected" : ""}>Сначала дороже</option><option value="name"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "name") : ssrLooseEqual(unref(sort), "name")) ? " selected" : ""}>По названию</option><option value="new"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "new") : ssrLooseEqual(unref(sort), "new")) ? " selected" : ""}>Сначала новинки</option></select><div class="hidden border border-border sm:flex"><button type="button" class="${ssrRenderClass([unref(view) === "grid" && "bg-surface", "p-3"])}" aria-label="Сетка по четыре">`);
      _push(ssrRenderComponent(unref(Grid2X2), { class: "h-4 w-4" }, null, _parent));
      _push(`</button><button type="button" class="${ssrRenderClass([unref(view) === "wide" && "bg-surface", "p-3"])}" aria-label="Крупная сетка">`);
      _push(ssrRenderComponent(unref(LayoutGrid), { class: "h-4 w-4" }, null, _parent));
      _push(`</button></div></div></div><div class="grid gap-8 lg:grid-cols-[260px_1fr]">`);
      if (unref(filtersOpen)) {
        _push(`<div class="fixed inset-0 z-40 bg-black/45 lg:hidden" aria-hidden="true"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([unref(filtersOpen) ? "fixed inset-y-0 left-0 w-[88%] max-w-sm overflow-y-auto p-6 shadow-2xl" : "hidden", "z-50 bg-white lg:static lg:z-auto lg:block"])}"><div class="mb-7 flex items-center justify-between"><h3 class="text-lg font-medium">Фильтры</h3><button type="button" class="icon-button lg:hidden" aria-label="Закрыть фильтры">`);
      _push(ssrRenderComponent(unref(X), { class: "h-4 w-4" }, null, _parent));
      _push(`</button></div><div class="space-y-7"><fieldset><legend class="mb-3 text-sm font-medium">Цена, ₽</legend><div class="grid grid-cols-2 gap-2"><label class="text-xs text-secondary">От<input${ssrRenderAttr("value", unref(minPrice))} type="number"${ssrRenderAttr("min", priceFloor)}${ssrRenderAttr("max", unref(maxPrice))} class="field-input"></label><label class="text-xs text-secondary">До<input${ssrRenderAttr("value", unref(maxPrice))} type="number"${ssrRenderAttr("min", unref(minPrice))}${ssrRenderAttr("max", priceCeil)} class="field-input"></label></div></fieldset><label class="field-label">Категория<select class="field-input"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(category)) ? ssrLooseContain(unref(category), "") : ssrLooseEqual(unref(category), "")) ? " selected" : ""}>Все категории</option><!--[-->`);
      ssrRenderList(unref(categories), (item) => {
        _push(`<option${ssrRenderAttr("value", item.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(category)) ? ssrLooseContain(unref(category), item.id) : ssrLooseEqual(unref(category), item.id)) ? " selected" : ""}>${ssrInterpolate(item.name)}</option>`);
      });
      _push(`<!--]--></select></label><label class="field-label">Подкатегория<select class="field-input"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(subcategory)) ? ssrLooseContain(unref(subcategory), "") : ssrLooseEqual(unref(subcategory), "")) ? " selected" : ""}>Все подкатегории</option><!--[-->`);
      ssrRenderList(unref(visibleSubcategories), (item) => {
        _push(`<option${ssrRenderAttr("value", item.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(subcategory)) ? ssrLooseContain(unref(subcategory), item.id) : ssrLooseEqual(unref(subcategory), item.id)) ? " selected" : ""}>${ssrInterpolate(item.name)}</option>`);
      });
      _push(`<!--]--></select></label><label class="field-label">Коллекция<select class="field-input"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(collection)) ? ssrLooseContain(unref(collection), "") : ssrLooseEqual(unref(collection), "")) ? " selected" : ""}>Все коллекции</option><!--[-->`);
      ssrRenderList(unref(visibleCollections), (item) => {
        _push(`<option${ssrRenderAttr("value", item.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(collection)) ? ssrLooseContain(unref(collection), item.id) : ssrLooseEqual(unref(collection), item.id)) ? " selected" : ""}>${ssrInterpolate(item.name)}</option>`);
      });
      _push(`<!--]--></select></label><fieldset><legend class="mb-3 text-sm font-medium">Наличие</legend><div class="space-y-2 text-sm"><label class="flex gap-2"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(availability), "")) ? " checked" : ""} type="radio" value="">Все</label><label class="flex gap-2"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(availability), "in-stock")) ? " checked" : ""} type="radio" value="in-stock">В наличии</label><label class="flex gap-2"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(availability), "on-order")) ? " checked" : ""} type="radio" value="on-order">Под заказ</label></div></fieldset><label class="field-label">Цвет<select class="field-input"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(color)) ? ssrLooseContain(unref(color), "") : ssrLooseEqual(unref(color), "")) ? " selected" : ""}>Все цвета</option><!--[-->`);
      ssrRenderList(unref(allColors), (item) => {
        _push(`<option${ssrRenderAttr("value", item.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(color)) ? ssrLooseContain(unref(color), item.id) : ssrLooseEqual(unref(color), item.id)) ? " selected" : ""}>${ssrInterpolate(item.name)}</option>`);
      });
      _push(`<!--]--></select></label><button type="button" class="btn-secondary w-full">`);
      _push(ssrRenderComponent(unref(RotateCcw), { class: "h-4 w-4" }, null, _parent));
      _push(` Сбросить</button></div></aside><div>`);
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
        _push(`<div class="flex min-h-72 flex-col items-center justify-center bg-surface p-8 text-center"><h3 class="mb-2 text-2xl font-light">Ничего не найдено</h3><p class="mb-6 max-w-md text-sm text-secondary">Измените или сбросьте фильтры.</p><button type="button" class="btn-primary">Сбросить фильтры</button></div>`);
      }
      if (unref(visibleProducts).length < unref(filtered).length) {
        _push(`<div class="mt-12 text-center"><button type="button" class="btn-secondary">Показать ещё</button></div>`);
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
export {
  _sfc_main as default
};
//# sourceMappingURL=index-D7FqHdDW.js.map

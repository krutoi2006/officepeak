import { _ as _sfc_main$1 } from "./Breadcrumbs-CZBzi1AX.js";
import { u as useRoute, c as createError, _ as __nuxt_component_0 } from "../server.mjs";
import { _ as _sfc_main$2 } from "./QuantityInput-C7yvggq_.js";
import { _ as _sfc_main$3 } from "./ProductCard-DXifnGgt.js";
import { defineComponent, ref, computed, watch, unref, withCtx, createTextVNode, toDisplayString, isRef, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderTeleport } from "vue/server-renderer";
import { Maximize2, ShoppingBag, Heart, X } from "lucide-vue-next";
import { g as productById, h as categoryById, i as collectionById, u as useShop, p as products, a as availabilityLabel, f as formatPrice } from "./useShop-Ct_x_K-c.js";
import { u as useLeadModal } from "./useLeadModal-DaBbHceU.js";
import { u as usePageSeo, a as useHead } from "./usePageSeo-9zNTc1yH.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/hookable/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/unctx/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/defu/dist/defu.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ufo/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/destr/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ohash/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/klona/dist/index.mjs";
import "./state-tqLlnwND.js";
import "./site-Dljnoeow.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const product = productById(String(route.params.id));
    if (!product) throw createError({ statusCode: 404, statusMessage: "Товар не найден" });
    const category = categoryById(product.categoryId);
    const collection = collectionById(product.collectionId);
    const selectedVariantId = ref(product.variants[0]?.id ?? "");
    const quantity = ref(1);
    const galleryIndex = ref(0);
    const zoomOpen = ref(false);
    const { favorites } = useShop();
    useLeadModal();
    const variant = computed(() => product.variants.find((item) => item.id === selectedVariantId.value) ?? product.variants[0]);
    const image = computed(() => product.images[galleryIndex.value] ?? product.images[0]);
    const related = products.filter((item) => item.id !== product.id && (item.collectionId === product.collectionId || item.categoryId === product.categoryId)).slice(0, 4);
    watch(variant, (value) => {
      galleryIndex.value = value.imageIndex;
    });
    usePageSeo(product.name, product.description, `/product/${product.slug}`);
    useHead({ script: [{ type: "application/ld+json", innerHTML: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: product.name, sku: variant.value.article, image: product.images.map((item) => item.src), description: product.description, offers: { "@type": "Offer", priceCurrency: "RUB", price: variant.value.price, availability: variant.value.availability === "in-stock" ? "https://schema.org/InStock" : "https://schema.org/PreOrder" } }) }] });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_QuantityInput = _sfc_main$2;
      const _component_ProductCard = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="container-page py-10 md:py-14">`);
      _push(ssrRenderComponent(_component_Breadcrumbs, {
        items: [{ label: "Главная", to: "/" }, { label: "Каталог", to: "/catalog" }, { label: unref(category)?.name ?? "Категория", to: unref(category) ? `/catalog/${unref(category).slug}` : "/catalog" }, { label: unref(product).name }]
      }, null, _parent));
      _push(`<div class="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16"><div><button type="button" class="group relative block aspect-[4/3] w-full overflow-hidden bg-surface" aria-label="Увеличить изображение"><img${ssrRenderAttr("src", unref(image).src)}${ssrRenderAttr("alt", unref(image).alt)} class="h-full w-full object-cover"><span class="icon-button absolute bottom-4 right-4 bg-white">`);
      _push(ssrRenderComponent(unref(Maximize2), { class: "h-4 w-4" }, null, _parent));
      _push(`</span></button><div class="mt-3 grid grid-cols-3 gap-3"><!--[-->`);
      ssrRenderList(unref(product).images, (item, index) => {
        _push(`<button type="button" class="${ssrRenderClass([index === unref(galleryIndex) ? "border-primary" : "border-transparent", "aspect-[4/3] overflow-hidden border"])}"${ssrRenderAttr("aria-label", `Показать изображение ${index + 1}`)}><img${ssrRenderAttr("src", item.src)}${ssrRenderAttr("alt", item.alt)} loading="lazy" class="h-full w-full object-cover"></button>`);
      });
      _push(`<!--]--></div></div><div class="lg:py-3"><div class="mb-4 flex flex-wrap items-center gap-3"><span class="${ssrRenderClass([unref(variant).availability === "in-stock" ? "status-in-stock" : "status-on-order", "status-pill"])}">${ssrInterpolate(unref(availabilityLabel)(unref(variant).availability))}</span><span class="text-xs uppercase tracking-wide text-secondary">Артикул ${ssrInterpolate(unref(variant).article)}</span></div><h1 class="mb-5 text-4xl font-light leading-[1.05] sm:text-5xl">${ssrInterpolate(unref(product).name)}</h1>`);
      if (unref(collection)) {
        _push(`<p class="mb-7 text-sm text-secondary">Коллекция `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/collections/${unref(collection).slug}`,
          class: "underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(collection).name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(collection).name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-8 flex items-baseline gap-3"><strong class="text-2xl">${ssrInterpolate(unref(formatPrice)(unref(variant).price))}</strong>`);
      if (unref(variant).oldPrice) {
        _push(`<s class="text-secondary">${ssrInterpolate(unref(formatPrice)(unref(variant).oldPrice))}</s>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><fieldset class="mb-7"><legend class="mb-3 text-sm font-medium">Вариант: ${ssrInterpolate(unref(variant).color.name)}, ${ssrInterpolate(unref(variant).dimensions.label)}</legend><div class="grid gap-2 sm:grid-cols-2"><!--[-->`);
      ssrRenderList(unref(product).variants, (item) => {
        _push(`<button type="button" class="${ssrRenderClass([item.id === unref(variant).id ? "border-primary bg-surface" : "border-border", "flex items-center gap-3 border p-3 text-left text-sm"])}"><span class="h-6 w-6 shrink-0 rounded-full border border-black/10" style="${ssrRenderStyle({ backgroundColor: item.color.hex })}"></span><span><b class="block">${ssrInterpolate(item.color.name)}</b><span class="text-xs text-secondary">${ssrInterpolate(item.dimensions.label)}</span></span></button>`);
      });
      _push(`<!--]--></div></fieldset><div class="mb-7 grid gap-3 sm:grid-cols-[auto_1fr_auto]">`);
      _push(ssrRenderComponent(_component_QuantityInput, {
        modelValue: unref(quantity),
        "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
        label: `Количество ${unref(product).name}`
      }, null, _parent));
      _push(`<button type="button" class="btn-primary">`);
      _push(ssrRenderComponent(unref(ShoppingBag), { class: "h-4 w-4" }, null, _parent));
      _push(` Добавить в корзину</button><button type="button" class="btn-secondary px-4"${ssrRenderAttr("aria-label", unref(favorites).includes(unref(product).id) ? "Удалить из избранного" : "Добавить в избранное")}>`);
      _push(ssrRenderComponent(unref(Heart), {
        class: ["h-5 w-5", unref(favorites).includes(unref(product).id) && "fill-current text-accent"]
      }, null, _parent));
      _push(`</button></div><p class="mb-7 leading-7 text-secondary">${ssrInterpolate(unref(product).description)}</p><button type="button" class="text-sm font-medium underline underline-offset-4">Получить консультацию</button><dl class="mt-9 border-t border-border"><div class="grid grid-cols-2 gap-4 border-b border-border py-4"><dt class="text-sm text-secondary">Цвет и материал</dt><dd class="text-sm font-medium">${ssrInterpolate(unref(variant).color.name)} · ${ssrInterpolate(unref(variant).color.material)}</dd></div><div class="grid grid-cols-2 gap-4 border-b border-border py-4"><dt class="text-sm text-secondary">Размер</dt><dd class="text-sm font-medium">${ssrInterpolate(unref(variant).dimensions.label)}</dd></div><div class="grid grid-cols-2 gap-4 border-b border-border py-4"><dt class="text-sm text-secondary">Статус</dt><dd class="text-sm font-medium">${ssrInterpolate(unref(availabilityLabel)(unref(variant).availability))}</dd></div></dl></div></div></section><section class="bg-surface section-space"><div class="container-page grid gap-12 lg:grid-cols-2"><div><h2 class="mb-6 text-4xl font-light">О товаре</h2><p class="mb-6 max-w-xl leading-7 text-secondary">${ssrInterpolate(unref(product).description)}</p><ul class="space-y-3 text-sm"><!--[-->`);
      ssrRenderList(unref(product).features, (item) => {
        _push(`<li class="flex gap-3"><span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"></span>${ssrInterpolate(item)}</li>`);
      });
      _push(`<!--]--></ul></div><div><h2 class="mb-5 text-2xl font-light">Характеристики</h2><dl class="border-t border-border"><!--[-->`);
      ssrRenderList(unref(product).specifications, (value, key) => {
        _push(`<div class="grid grid-cols-2 gap-4 border-b border-border py-4 text-sm"><dt class="text-secondary">${ssrInterpolate(key)}</dt><dd class="font-medium">${ssrInterpolate(value)}</dd></div>`);
      });
      _push(`<!--]--></dl><h3 class="mb-3 mt-8 text-xl font-medium">Материалы</h3><p class="text-sm leading-6 text-secondary">${ssrInterpolate(unref(product).materials.join(" · "))}</p><h3 class="mb-3 mt-8 text-xl font-medium">Гарантия</h3><p class="text-sm leading-6 text-secondary">${ssrInterpolate(unref(product).warranty)}</p></div></div></section><section class="container-page section-space"><div class="grid gap-px bg-border md:grid-cols-3"><!--[-->`);
      ssrRenderList([{ title: "Доставка", text: "Рассчитаем для вашего адреса.", to: "/delivery" }, { title: "Оплата", text: "Укажем способ оплаты в заказе.", to: "/payment" }, { title: "Сборка", text: "Соберём мебель в вашем офисе.", to: "/assembly" }], (item) => {
        _push(`<article class="bg-white p-7"><h2 class="mb-3 text-2xl font-light">${ssrInterpolate(item.title)}</h2><p class="mb-5 text-sm leading-6 text-secondary">${ssrInterpolate(item.text)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.to,
          class: "text-sm font-medium underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Подробнее`);
            } else {
              return [
                createTextVNode("Подробнее")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</article>`);
      });
      _push(`<!--]--></div></section>`);
      if (unref(related).length) {
        _push(`<section class="bg-surface section-space"><div class="container-page"><div class="mb-9"><h2 class="text-4xl font-light">Похожие товары</h2></div><div class="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
        ssrRenderList(unref(related), (item) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: item.id,
            product: item
          }, null, _parent));
        });
        _push(`<!--]--></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(zoomOpen)) {
          _push2(`<div class="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label="Увеличенное изображение"><button type="button" class="icon-button absolute right-4 top-4 border-white/30 text-white" aria-label="Закрыть">`);
          _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent));
          _push2(`</button><img${ssrRenderAttr("src", unref(image).src)}${ssrRenderAttr("alt", unref(image).alt)} class="max-h-[90vh] max-w-[95vw] object-contain"></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_id_-AUCR7yLF.js.map

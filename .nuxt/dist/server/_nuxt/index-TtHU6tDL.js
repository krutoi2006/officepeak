import { _ as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext, toDisplayString, resolveDynamicComponent, openBlock, createBlock } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderVNode } from "vue/server-renderer";
import { ArrowRight, DraftingCompass, ShieldCheck, Box, Move3d, Blocks, Landmark, BriefcaseBusiness, Layers3, Handshake } from "lucide-vue-next";
import { d as demoMedia, c as collections, p as products, b as categories } from "./useShop-Ct_x_K-c.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/hookable/dist/index.mjs";
import { _ as _sfc_main$2 } from "./CollectionCard--dUroSxt.js";
import { _ as _sfc_main$3 } from "./ProductCard-DXifnGgt.js";
import { u as useLeadModal } from "./useLeadModal-DaBbHceU.js";
import { u as usePageSeo } from "./usePageSeo-9zNTc1yH.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
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
import "./QuantityInput-C7yvggq_.js";
import "./site-Dljnoeow.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/@unhead/vue/dist/index.mjs";
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = (() => {
  console.error(intervalError);
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HeroSlider",
  __ssrInlineRender: true,
  setup(__props) {
    const slides = [
      { image: demoMedia.hero[0], alt: "Светлый офис" },
      { image: demoMedia.hero[1], alt: "Современный офис" },
      { image: demoMedia.hero[2], alt: "Рабочее пространство" }
    ];
    const current = ref(0);
    const paused = ref(false);
    const reducedMotion = ref(false);
    const position = ref(1);
    const transitionEnabled = ref(true);
    let timer;
    const renderedSlides = [slides[slides.length - 1], ...slides, slides[0]];
    const restart = () => {
      if (timer) clearInterval(timer);
      if (!paused.value && !reducedMotion.value) timer = setInterval();
    };
    watch([paused, current], restart);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "relative min-h-[620px] overflow-hidden bg-primary text-white md:min-h-[720px]",
        "aria-roledescription": "carousel",
        "aria-label": "Предложения OFFICEPEAK",
        tabindex: "0"
      }, _attrs))}><div class="${ssrRenderClass([unref(transitionEnabled) && !unref(reducedMotion) ? "transition-transform duration-700 ease-in-out" : "", "absolute inset-0 flex will-change-transform motion-reduce:transition-none"])}" style="${ssrRenderStyle({ transform: `translate3d(-${unref(position) * 100}%, 0, 0)` })}"><!--[-->`);
      ssrRenderList(renderedSlides, (slide, index) => {
        _push(`<article class="relative h-full w-full shrink-0"${ssrRenderAttr("aria-hidden", index !== unref(position))}><img${ssrRenderAttr("src", slide.image)}${ssrRenderAttr("alt", slide.alt)}${ssrRenderAttr("loading", index <= 1 ? "eager" : "lazy")} class="absolute inset-0 h-full w-full object-cover"><div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10"></div></article>`);
      });
      _push(`<!--]--></div><div class="container-page relative z-10 flex min-h-[620px] items-end pb-24 pt-28 md:min-h-[720px] md:items-center md:py-28"><div class="max-w-3xl"><h1 class="mb-7 max-w-3xl text-[42px] font-light leading-[.98] sm:text-6xl md:text-7xl lg:text-[86px]">Офисная мебель нового поколения</h1><p class="mb-9 max-w-xl text-base font-light leading-7 text-white/80 md:text-lg">Функциональные решения для вашего офиса</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalog",
        class: "btn-light"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Смотреть каталог `);
            _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode("Смотреть каталог "),
              createVNode(unref(ArrowRight), { class: "h-4 w-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="container-page absolute inset-x-0 bottom-6 z-20"><div class="flex gap-2" role="tablist" aria-label="Выбор слайда"><!--[-->`);
      ssrRenderList(slides, (_, index) => {
        _push(`<button type="button" class="${ssrRenderClass([index === unref(current) ? "w-10 bg-white" : "w-5 bg-white/40", "h-1.5 transition-all"])}"${ssrRenderAttr("aria-label", `Слайд ${index + 1}`)}${ssrRenderAttr("aria-selected", index === unref(current))} role="tab"></button>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSlider.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useLeadModal();
    const featuredCollections = collections.filter((item) => item.isFeatured).slice(0, 4);
    const featuredProducts = products.filter((item) => item.isRecommended || item.isNew).slice(0, 4);
    const services = [
      { title: "Дизайн-проект", to: "/design-project", icon: DraftingCompass },
      { title: "Оплата", to: "/payment", icon: ShieldCheck },
      { title: "Доставка", to: "/delivery", icon: Box },
      { title: "Подъём", to: "/lifting", icon: Move3d },
      { title: "Сборка", to: "/assembly", icon: Blocks },
      { title: "Гарантия", to: "/warranty", icon: ShieldCheck },
      { title: "Возврат", to: "/returns", icon: ArrowRight }
    ];
    const audiences = [
      { title: "Госзаказчикам", text: "Подберём мебель для закупки.", to: "/government", icon: Landmark },
      { title: "Для бизнеса", text: "Подберём мебель для вашего офиса.", to: "/business", icon: BriefcaseBusiness },
      { title: "Дизайнерам", text: "Поможем выбрать мебель и материалы.", to: "/designers", icon: Layers3 }
    ];
    usePageSeo("Офисная мебель", "Офисная мебель OFFICEPEAK для работы, встреч и отдыха.", "/");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeroSlider = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CollectionCard = _sfc_main$2;
      const _component_ProductCard = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_HeroSlider, null, null, _parent));
      _push(`<section class="container-page section-space"><div class="mb-10 grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><h2 class="display-title">Мебель для офиса</h2></div><p class="max-w-2xl text-base leading-7 text-secondary lg:justify-self-end">Столы, кресла, шкафы и мебель для разных зон.</p></div><div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: category.id,
          to: `/catalog/${category.slug}`,
          class: "group relative aspect-[4/3] overflow-hidden bg-surface"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", category.image.src)}${ssrRenderAttr("alt", category.image.alt)} loading="lazy" class="h-full w-full object-cover transition duration-700 group-hover:scale-105"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"${_scopeId}></div><div class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white"${_scopeId}><h3 class="text-xl font-light"${_scopeId}>${ssrInterpolate(category.name)}</h3>`);
              _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-5 w-5 shrink-0 transition group-hover:translate-x-1" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("img", {
                  src: category.image.src,
                  alt: category.image.alt,
                  loading: "lazy",
                  class: "h-full w-full object-cover transition duration-700 group-hover:scale-105"
                }, null, 8, ["src", "alt"]),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" }),
                createVNode("div", { class: "absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white" }, [
                  createVNode("h3", { class: "text-xl font-light" }, toDisplayString(category.name), 1),
                  createVNode(unref(ArrowRight), { class: "h-5 w-5 shrink-0 transition group-hover:translate-x-1" })
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section><section class="bg-surface section-space"><div class="container-page"><div class="mb-10 flex items-end justify-between gap-6"><div><h2 class="display-title">Популярные коллекции</h2></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalog",
        class: "hidden text-sm underline underline-offset-4 md:block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Смотреть все`);
          } else {
            return [
              createTextVNode("Смотреть все")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4"><!--[-->`);
      ssrRenderList(unref(featuredCollections), (collection) => {
        _push(ssrRenderComponent(_component_CollectionCard, {
          key: collection.id,
          collection
        }, null, _parent));
      });
      _push(`<!--]--></div></div></section><section class="container-page section-space"><div class="mb-10"><h2 class="display-title">Новые товары</h2></div><div class="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
      ssrRenderList(unref(featuredProducts), (product) => {
        _push(ssrRenderComponent(_component_ProductCard, {
          key: product.id,
          product
        }, null, _parent));
      });
      _push(`<!--]--></div></section><section class="border-y border-border bg-white section-space"><div class="container-page"><div class="mb-10 grid gap-5 lg:grid-cols-2"><div><h2 class="display-title">Все услуги в одном месте</h2></div><p class="max-w-xl self-end text-secondary">Поможем с проектом, доставкой и сборкой мебели.</p></div><div class="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
      ssrRenderList(services, (service) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: service.to,
          to: service.to,
          class: "group min-h-40 border-b border-r border-border p-5 transition hover:bg-surface"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(service.icon), { class: "mb-8 h-6 w-6 stroke-1 text-accent" }, null), _parent2, _scopeId);
              _push2(`<h3 class="flex items-center justify-between gap-3 text-lg font-medium"${_scopeId}>${ssrInterpolate(service.title)}`);
              _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4 transition group-hover:translate-x-1" }, null, _parent2, _scopeId));
              _push2(`</h3>`);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(service.icon), { class: "mb-8 h-6 w-6 stroke-1 text-accent" })),
                createVNode("h3", { class: "flex items-center justify-between gap-3 text-lg font-medium" }, [
                  createTextVNode(toDisplayString(service.title), 1),
                  createVNode(unref(ArrowRight), { class: "h-4 w-4 transition group-hover:translate-x-1" })
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section><section class="container-page section-space grid gap-10 lg:grid-cols-2 lg:items-center"><img${ssrRenderAttr("src", unref(demoMedia).project)} alt="Мебель в офисе" loading="lazy" class="aspect-[4/3] h-full w-full object-cover"><div class="lg:px-10"><h2 class="mb-6 display-title">Мебель на заказ</h2><p class="mb-8 max-w-xl leading-7 text-secondary">Сделаем мебель под размеры и задачи вашего офиса.</p><div class="flex flex-wrap gap-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/custom-furniture",
        class: "btn-primary"
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
        _: 1
      }, _parent));
      _push(`<button type="button" class="btn-secondary">Вызвать менеджера</button></div></div></section><section class="bg-primary section-space text-white"><div class="container-page"><div class="mb-10"><h2 class="display-title max-w-3xl">Работаем с компаниями</h2></div><div class="grid gap-px bg-white/15 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(audiences, (audience) => {
        _push(`<article class="bg-primary p-7 sm:p-9">`);
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(audience.icon), { class: "mb-16 h-8 w-8 stroke-1 text-accentSoft" }, null), _parent);
        _push(`<h3 class="mb-4 text-2xl font-light">${ssrInterpolate(audience.title)}</h3><p class="mb-7 text-sm leading-6 text-white/60">${ssrInterpolate(audience.text)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: audience.to,
          class: "inline-flex items-center gap-2 text-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Подробнее `);
              _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode("Подробнее "),
                createVNode(unref(ArrowRight), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</article>`);
      });
      _push(`<!--]--></div><button type="button" class="btn-light mt-6">Отправить заявку</button></div></section><section class="container-page section-space grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><h2 class="mb-6 display-title">Покажем будущий офис</h2><p class="mb-8 max-w-2xl leading-7 text-secondary">Подготовим план и подберём мебель до начала работ.</p><button type="button" class="btn-primary">Заказать дизайн-проект</button></div><div class="grid gap-px bg-border sm:grid-cols-2"><!--[-->`);
      ssrRenderList(["Понятный каталог", "Готовые коллекции", "Мебель для бизнеса", "Помощь на каждом этапе"], (item) => {
        _push(`<div class="bg-surface p-7">`);
        _push(ssrRenderComponent(unref(Handshake), { class: "mb-8 h-6 w-6 stroke-1 text-accent" }, null, _parent));
        _push(`<h3 class="text-lg font-medium">${ssrInterpolate(item)}</h3></div>`);
      });
      _push(`<!--]--></div></section><section class="bg-accent py-14 text-white"><div class="container-page flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center"><div><h2 class="text-3xl font-light sm:text-4xl">Нужна мебель для офиса?</h2></div><button type="button" class="btn-light shrink-0">Написать нам `);
      _push(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4" }, null, _parent));
      _push(`</button></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-TtHU6tDL.js.map

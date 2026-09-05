globalThis.__timing__.logStart('Load chunks/build/index-TtHU6tDL');import { _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, unref, withCtx, createVNode, toDisplayString, createTextVNode, resolveDynamicComponent, openBlock, createBlock, ref, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderVNode, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { ArrowRight, DraftingCompass, ShieldCheck, Box, Move3d, Blocks, Landmark, BriefcaseBusiness, Layers3, Handshake } from 'lucide-vue-next';
import { c as collections, p as products, b as categories, d as demoMedia } from './useShop-Ct_x_K-c.mjs';
import { _ as _sfc_main$2 } from './CollectionCard--dUroSxt.mjs';
import { _ as _sfc_main$3 } from './ProductCard-DXifnGgt.mjs';
import { u as useLeadModal } from './useLeadModal-DaBbHceU.mjs';
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
import './state-tqLlnwND.mjs';
import './QuantityInput-C7yvggq_.mjs';
import './site-Dljnoeow.mjs';

const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = (() => {
  console.error(intervalError);
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HeroSlider",
  __ssrInlineRender: true,
  setup(__props) {
    const slides = [
      { image: demoMedia.hero[0], alt: "\u0421\u0432\u0435\u0442\u043B\u044B\u0439 \u043E\u0444\u0438\u0441" },
      { image: demoMedia.hero[1], alt: "\u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0439 \u043E\u0444\u0438\u0441" },
      { image: demoMedia.hero[2], alt: "\u0420\u0430\u0431\u043E\u0447\u0435\u0435 \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u043E" }
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
        "aria-label": "\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F OFFICEPEAK",
        tabindex: "0"
      }, _attrs))}><div class="${ssrRenderClass([unref(transitionEnabled) && !unref(reducedMotion) ? "transition-transform duration-700 ease-in-out" : "", "absolute inset-0 flex will-change-transform motion-reduce:transition-none"])}" style="${ssrRenderStyle({ transform: `translate3d(-${unref(position) * 100}%, 0, 0)` })}"><!--[-->`);
      ssrRenderList(renderedSlides, (slide, index) => {
        _push(`<article class="relative h-full w-full shrink-0"${ssrRenderAttr("aria-hidden", index !== unref(position))}><img${ssrRenderAttr("src", slide.image)}${ssrRenderAttr("alt", slide.alt)}${ssrRenderAttr("loading", index <= 1 ? "eager" : "lazy")} class="absolute inset-0 h-full w-full object-cover"><div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10"></div></article>`);
      });
      _push(`<!--]--></div><div class="container-page relative z-10 flex min-h-[620px] items-end pb-24 pt-28 md:min-h-[720px] md:items-center md:py-28"><div class="max-w-3xl"><h1 class="mb-7 max-w-3xl text-[42px] font-light leading-[.98] sm:text-6xl md:text-7xl lg:text-[86px]">\u041E\u0444\u0438\u0441\u043D\u0430\u044F \u043C\u0435\u0431\u0435\u043B\u044C \u043D\u043E\u0432\u043E\u0433\u043E \u043F\u043E\u043A\u043E\u043B\u0435\u043D\u0438\u044F</h1><p class="mb-9 max-w-xl text-base font-light leading-7 text-white/80 md:text-lg">\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u043E\u0444\u0438\u0441\u0430</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalog",
        class: "btn-light"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433 `);
            _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode("\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433 "),
              createVNode(unref(ArrowRight), { class: "h-4 w-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="container-page absolute inset-x-0 bottom-6 z-20"><div class="flex gap-2" role="tablist" aria-label="\u0412\u044B\u0431\u043E\u0440 \u0441\u043B\u0430\u0439\u0434\u0430"><!--[-->`);
      ssrRenderList(slides, (_, index) => {
        _push(`<button type="button" class="${ssrRenderClass([index === unref(current) ? "w-10 bg-white" : "w-5 bg-white/40", "h-1.5 transition-all"])}"${ssrRenderAttr("aria-label", `\u0421\u043B\u0430\u0439\u0434 ${index + 1}`)}${ssrRenderAttr("aria-selected", index === unref(current))} role="tab"></button>`);
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
      { title: "\u0414\u0438\u0437\u0430\u0439\u043D-\u043F\u0440\u043E\u0435\u043A\u0442", to: "/design-project", icon: DraftingCompass },
      { title: "\u041E\u043F\u043B\u0430\u0442\u0430", to: "/payment", icon: ShieldCheck },
      { title: "\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430", to: "/delivery", icon: Box },
      { title: "\u041F\u043E\u0434\u044A\u0451\u043C", to: "/lifting", icon: Move3d },
      { title: "\u0421\u0431\u043E\u0440\u043A\u0430", to: "/assembly", icon: Blocks },
      { title: "\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u044F", to: "/warranty", icon: ShieldCheck },
      { title: "\u0412\u043E\u0437\u0432\u0440\u0430\u0442", to: "/returns", icon: ArrowRight }
    ];
    const audiences = [
      { title: "\u0413\u043E\u0441\u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430\u043C", text: "\u041F\u043E\u0434\u0431\u0435\u0440\u0451\u043C \u043C\u0435\u0431\u0435\u043B\u044C \u0434\u043B\u044F \u0437\u0430\u043A\u0443\u043F\u043A\u0438.", to: "/government", icon: Landmark },
      { title: "\u0414\u043B\u044F \u0431\u0438\u0437\u043D\u0435\u0441\u0430", text: "\u041F\u043E\u0434\u0431\u0435\u0440\u0451\u043C \u043C\u0435\u0431\u0435\u043B\u044C \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u043E\u0444\u0438\u0441\u0430.", to: "/business", icon: BriefcaseBusiness },
      { title: "\u0414\u0438\u0437\u0430\u0439\u043D\u0435\u0440\u0430\u043C", text: "\u041F\u043E\u043C\u043E\u0436\u0435\u043C \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0435\u0431\u0435\u043B\u044C \u0438 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B.", to: "/designers", icon: Layers3 }
    ];
    usePageSeo("\u041E\u0444\u0438\u0441\u043D\u0430\u044F \u043C\u0435\u0431\u0435\u043B\u044C", "\u041E\u0444\u0438\u0441\u043D\u0430\u044F \u043C\u0435\u0431\u0435\u043B\u044C OFFICEPEAK \u0434\u043B\u044F \u0440\u0430\u0431\u043E\u0442\u044B, \u0432\u0441\u0442\u0440\u0435\u0447 \u0438 \u043E\u0442\u0434\u044B\u0445\u0430.", "/");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeroSlider = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CollectionCard = _sfc_main$2;
      const _component_ProductCard = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_HeroSlider, null, null, _parent));
      _push(`<section class="container-page section-space"><div class="mb-10 grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><h2 class="display-title">\u041C\u0435\u0431\u0435\u043B\u044C \u0434\u043B\u044F \u043E\u0444\u0438\u0441\u0430</h2></div><p class="max-w-2xl text-base leading-7 text-secondary lg:justify-self-end">\u0421\u0442\u043E\u043B\u044B, \u043A\u0440\u0435\u0441\u043B\u0430, \u0448\u043A\u0430\u0444\u044B \u0438 \u043C\u0435\u0431\u0435\u043B\u044C \u0434\u043B\u044F \u0440\u0430\u0437\u043D\u044B\u0445 \u0437\u043E\u043D.</p></div><div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><!--[-->`);
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
      _push(`<!--]--></div></section><section class="bg-surface section-space"><div class="container-page"><div class="mb-10 flex items-end justify-between gap-6"><div><h2 class="display-title">\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438</h2></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalog",
        class: "hidden text-sm underline underline-offset-4 md:block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0441\u0435`);
          } else {
            return [
              createTextVNode("\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0441\u0435")
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
      _push(`<!--]--></div></div></section><section class="container-page section-space"><div class="mb-10"><h2 class="display-title">\u041D\u043E\u0432\u044B\u0435 \u0442\u043E\u0432\u0430\u0440\u044B</h2></div><div class="grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
      ssrRenderList(unref(featuredProducts), (product) => {
        _push(ssrRenderComponent(_component_ProductCard, {
          key: product.id,
          product
        }, null, _parent));
      });
      _push(`<!--]--></div></section><section class="border-y border-border bg-white section-space"><div class="container-page"><div class="mb-10 grid gap-5 lg:grid-cols-2"><div><h2 class="display-title">\u0412\u0441\u0435 \u0443\u0441\u043B\u0443\u0433\u0438 \u0432 \u043E\u0434\u043D\u043E\u043C \u043C\u0435\u0441\u0442\u0435</h2></div><p class="max-w-xl self-end text-secondary">\u041F\u043E\u043C\u043E\u0436\u0435\u043C \u0441 \u043F\u0440\u043E\u0435\u043A\u0442\u043E\u043C, \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u043E\u0439 \u0438 \u0441\u0431\u043E\u0440\u043A\u043E\u0439 \u043C\u0435\u0431\u0435\u043B\u0438.</p></div><div class="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4"><!--[-->`);
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
      _push(`<!--]--></div></div></section><section class="container-page section-space grid gap-10 lg:grid-cols-2 lg:items-center"><img${ssrRenderAttr("src", unref(demoMedia).project)} alt="\u041C\u0435\u0431\u0435\u043B\u044C \u0432 \u043E\u0444\u0438\u0441\u0435" loading="lazy" class="aspect-[4/3] h-full w-full object-cover"><div class="lg:px-10"><h2 class="mb-6 display-title">\u041C\u0435\u0431\u0435\u043B\u044C \u043D\u0430 \u0437\u0430\u043A\u0430\u0437</h2><p class="mb-8 max-w-xl leading-7 text-secondary">\u0421\u0434\u0435\u043B\u0430\u0435\u043C \u043C\u0435\u0431\u0435\u043B\u044C \u043F\u043E\u0434 \u0440\u0430\u0437\u043C\u0435\u0440\u044B \u0438 \u0437\u0430\u0434\u0430\u0447\u0438 \u0432\u0430\u0448\u0435\u0433\u043E \u043E\u0444\u0438\u0441\u0430.</p><div class="flex flex-wrap gap-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/custom-furniture",
        class: "btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435`);
          } else {
            return [
              createTextVNode("\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="button" class="btn-secondary">\u0412\u044B\u0437\u0432\u0430\u0442\u044C \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430</button></div></div></section><section class="bg-primary section-space text-white"><div class="container-page"><div class="mb-10"><h2 class="display-title max-w-3xl">\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0441 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F\u043C\u0438</h2></div><div class="grid gap-px bg-white/15 lg:grid-cols-3"><!--[-->`);
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
              _push2(`\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 `);
              _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode("\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 "),
                createVNode(unref(ArrowRight), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</article>`);
      });
      _push(`<!--]--></div><button type="button" class="btn-light mt-6">\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443</button></div></section><section class="container-page section-space grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><h2 class="mb-6 display-title">\u041F\u043E\u043A\u0430\u0436\u0435\u043C \u0431\u0443\u0434\u0443\u0449\u0438\u0439 \u043E\u0444\u0438\u0441</h2><p class="mb-8 max-w-2xl leading-7 text-secondary">\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u0438\u043C \u043F\u043B\u0430\u043D \u0438 \u043F\u043E\u0434\u0431\u0435\u0440\u0451\u043C \u043C\u0435\u0431\u0435\u043B\u044C \u0434\u043E \u043D\u0430\u0447\u0430\u043B\u0430 \u0440\u0430\u0431\u043E\u0442.</p><button type="button" class="btn-primary">\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0434\u0438\u0437\u0430\u0439\u043D-\u043F\u0440\u043E\u0435\u043A\u0442</button></div><div class="grid gap-px bg-border sm:grid-cols-2"><!--[-->`);
      ssrRenderList(["\u041F\u043E\u043D\u044F\u0442\u043D\u044B\u0439 \u043A\u0430\u0442\u0430\u043B\u043E\u0433", "\u0413\u043E\u0442\u043E\u0432\u044B\u0435 \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438", "\u041C\u0435\u0431\u0435\u043B\u044C \u0434\u043B\u044F \u0431\u0438\u0437\u043D\u0435\u0441\u0430", "\u041F\u043E\u043C\u043E\u0449\u044C \u043D\u0430 \u043A\u0430\u0436\u0434\u043E\u043C \u044D\u0442\u0430\u043F\u0435"], (item) => {
        _push(`<div class="bg-surface p-7">`);
        _push(ssrRenderComponent(unref(Handshake), { class: "mb-8 h-6 w-6 stroke-1 text-accent" }, null, _parent));
        _push(`<h3 class="text-lg font-medium">${ssrInterpolate(item)}</h3></div>`);
      });
      _push(`<!--]--></div></section><section class="bg-accent py-14 text-white"><div class="container-page flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center"><div><h2 class="text-3xl font-light sm:text-4xl">\u041D\u0443\u0436\u043D\u0430 \u043C\u0435\u0431\u0435\u043B\u044C \u0434\u043B\u044F \u043E\u0444\u0438\u0441\u0430?</h2></div><button type="button" class="btn-light shrink-0">\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043D\u0430\u043C `);
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

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/index-TtHU6tDL');
//# sourceMappingURL=index-TtHU6tDL.mjs.map

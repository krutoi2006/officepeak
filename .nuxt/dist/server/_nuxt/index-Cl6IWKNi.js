import { _ as __nuxt_component_0 } from "./nuxt-link-rH_ixKZi.js";
import { _ as _sfc_main$1 } from "./ProductCard-VbsXtiXX.js";
import { defineComponent, withCtx, unref, createTextVNode, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { ArrowRight } from "lucide-vue-next";
import { c as categories, p as products } from "./useShop-BLxPHoy8.js";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/hookable/dist/index.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/unctx/dist/index.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/defu/dist/defu.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ProductCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="relative min-h-[680px] overflow-hidden bg-primary text-white"><img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&amp;fit=crop&amp;w=2000&amp;q=90" alt="Современный офис" class="absolute inset-0 h-full w-full object-cover opacity-60"><div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent"></div><div class="container-page relative flex min-h-[680px] items-end py-20 md:items-center"><div class="max-w-3xl"><p class="mb-5 text-xs uppercase tracking-[.28em]">Пространство для больших идей</p><h1 class="mb-8 text-5xl font-light leading-[1.05] md:text-7xl">Офисная мебель нового поколения</h1><p class="mb-10 max-w-xl text-base font-light leading-7 text-white/80">Проектируем функциональные пространства, в которых удобно работать, встречаться и расти.</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalog",
        class: "inline-flex items-center gap-4 bg-white px-7 py-4 text-sm font-medium text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Смотреть каталог `);
            _push2(ssrRenderComponent(unref(ArrowRight), { class: "h-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode("Смотреть каталог "),
              createVNode(unref(ArrowRight), { class: "h-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section class="container-page py-24"><div class="mb-10 flex items-end justify-between"><div><p class="mb-3 text-xs uppercase tracking-widest text-secondary">Направления</p><h2 class="text-4xl font-light md:text-5xl">Мебель для каждого пространства</h2></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalog",
        class: "hidden text-sm underline md:block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Весь каталог`);
          } else {
            return [
              createTextVNode("Весь каталог")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(unref(categories), (c) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: c.id,
          to: `/catalog/${c.slug}`,
          class: "group relative aspect-[4/3] overflow-hidden bg-surface"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", c.image)}${ssrRenderAttr("alt", c.name)} class="h-full w-full object-cover transition duration-700 group-hover:scale-105"${_scopeId}><div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"${_scopeId}></div><h3 class="absolute bottom-6 left-6 text-xl font-light text-white"${_scopeId}>${ssrInterpolate(c.name)}</h3>`);
            } else {
              return [
                createVNode("img", {
                  src: c.image,
                  alt: c.name,
                  class: "h-full w-full object-cover transition duration-700 group-hover:scale-105"
                }, null, 8, ["src", "alt"]),
                createVNode("div", { class: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }),
                createVNode("h3", { class: "absolute bottom-6 left-6 text-xl font-light text-white" }, toDisplayString(c.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section><section class="bg-surface py-24"><div class="container-page"><div class="mb-10"><p class="mb-3 text-xs uppercase tracking-widest text-secondary">Выбор OFFICEPEAK</p><h2 class="text-4xl font-light md:text-5xl">Новинки</h2></div><div class="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4"><!--[-->`);
      ssrRenderList(unref(products).slice(0, 4), (p) => {
        _push(ssrRenderComponent(_component_ProductCard, {
          key: p.id,
          product: p
        }, null, _parent));
      });
      _push(`<!--]--></div></div></section><section class="container-page grid gap-12 py-24 lg:grid-cols-2 lg:items-center"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&amp;fit=crop&amp;w=1200&amp;q=85" alt="Проектирование офиса" class="aspect-[4/3] h-full w-full object-cover"><div class="lg:px-12"><p class="mb-4 text-xs uppercase tracking-widest text-secondary">Проектный отдел</p><h2 class="mb-7 text-4xl font-light md:text-5xl">Создаем офисы под ключ</h2><p class="mb-8 leading-7 text-secondary">От планировочного решения и подбора материалов до производства, доставки и сборки. Один партнер на всех этапах проекта.</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/services",
        class: "btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Обсудить проект`);
          } else {
            return [
              createTextVNode("Обсудить проект")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section></div>`);
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
//# sourceMappingURL=index-Cl6IWKNi.js.map

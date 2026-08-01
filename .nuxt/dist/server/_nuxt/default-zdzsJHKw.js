import { _ as __nuxt_component_0 } from "./nuxt-link-rH_ixKZi.js";
import { defineComponent, unref, withCtx, createTextVNode, useSSRContext, watch, mergeProps, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString } from "vue";
import { ssrRenderTeleport, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { X, ShoppingBag, Trash2, Menu, Search, User, Heart } from "lucide-vue-next";
import { u as useShop, f as formatPrice, c as categories } from "./useShop-BLxPHoy8.js";
import { u as useRoute } from "../server.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ufo/dist/index.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/defu/dist/defu.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/hookable/dist/index.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/unctx/dist/index.mjs";
import "C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/h3/dist/index.mjs";
import "vue-router";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CartDrawer",
  __ssrInlineRender: true,
  setup(__props) {
    const { cart, cartOpen, count, total } = useShop();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(cartOpen)) {
          _push2(`<div class="fixed inset-0 z-50 bg-black/40"></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (unref(cartOpen)) {
          _push2(`<aside class="fixed inset-y-0 right-0 z-50 flex w-full max-w-[460px] flex-col bg-white shadow-2xl"><header class="flex items-center justify-between border-b border-border p-6"><h2 class="text-xl font-light">Корзина <small class="text-secondary">(${ssrInterpolate(unref(count))})</small></h2><button>`);
          _push2(ssrRenderComponent(unref(X), null, null, _parent));
          _push2(`</button></header><div class="flex-1 overflow-auto p-6">`);
          if (!unref(cart).length) {
            _push2(`<div class="flex h-full flex-col items-center justify-center text-secondary">`);
            _push2(ssrRenderComponent(unref(ShoppingBag), { class: "mb-5 h-12 w-12 stroke-1" }, null, _parent));
            _push2(`<p>В корзине пока нет товаров</p></div>`);
          } else {
            _push2(`<div class="space-y-6"><!--[-->`);
            ssrRenderList(unref(cart), (item) => {
              _push2(`<div class="flex gap-4"><img${ssrRenderAttr("src", item.image)} class="h-24 w-24 object-cover"><div class="flex flex-1 flex-col"><div class="flex justify-between gap-2"><p class="text-sm font-medium">${ssrInterpolate(item.name)}</p><button>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent));
              _push2(`</button></div><small class="text-secondary">${ssrInterpolate(item.selectedColor)}</small><div class="mt-auto flex justify-between"><span>${ssrInterpolate(item.quantity)} шт.</span><b class="text-sm">${ssrInterpolate(unref(formatPrice)(item.price * item.quantity))}</b></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
          }
          _push2(`</div>`);
          if (unref(cart).length) {
            _push2(`<footer class="border-t border-border bg-surface p-6"><div class="mb-5 flex justify-between"><span>Итого</span><b class="text-xl">${ssrInterpolate(unref(formatPrice)(unref(total)))}</b></div>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/checkout",
              class: "btn-primary w-full",
              onClick: ($event) => cartOpen.value = false
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`Оформить заказ`);
                } else {
                  return [
                    createTextVNode("Оформить заказ")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(`</footer>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</aside>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CartDrawer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const { menuOpen, count, total, favorites } = useShop();
    watch(useRoute(), () => menuOpen.value = false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_CartDrawer = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col" }, _attrs))}><header class="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur"><div class="container-page flex h-20 items-center justify-between"><button class="lg:hidden">`);
      _push(ssrRenderComponent(unref(Menu), null, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-2xl font-semibold tracking-tighter"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`OFFICE<span class="font-light"${_scopeId}>PEAK</span>`);
          } else {
            return [
              createTextVNode("OFFICE"),
              createVNode("span", { class: "font-light" }, "PEAK")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden items-center gap-8 lg:flex">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/catalog" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`КАТАЛОГ`);
          } else {
            return [
              createTextVNode("КАТАЛОГ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/services" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`НА ЗАКАЗ`);
          } else {
            return [
              createTextVNode("НА ЗАКАЗ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/delivery" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`ДОСТАВКА`);
          } else {
            return [
              createTextVNode("ДОСТАВКА")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/contacts" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`КОНТАКТЫ`);
          } else {
            return [
              createTextVNode("КОНТАКТЫ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(unref(Search), { class: "hidden h-5 sm:block" }, null, _parent));
      _push(ssrRenderComponent(unref(User), { class: "hidden h-5 sm:block" }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/favorites",
        class: "relative"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Heart), { class: "h-5" }, null, _parent2, _scopeId));
            if (unref(favorites).length) {
              _push2(`<span class="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Heart), { class: "h-5" }),
              unref(favorites).length ? (openBlock(), createBlock("span", {
                key: 0,
                class: "absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(ShoppingBag), { class: "h-5" }, null, _parent));
      if (unref(count)) {
        _push(`<span class="text-xs">${ssrInterpolate(unref(count))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="hidden text-sm lg:block">${ssrInterpolate(unref(formatPrice)(unref(total)))}</span></button></div></div></header>`);
      if (unref(menuOpen)) {
        _push(`<div class="fixed inset-0 z-50 bg-black/40 lg:hidden"><nav class="h-full w-[85%] max-w-sm bg-white p-6"><div class="mb-12 flex justify-between"><b>МЕНЮ</b><button>`);
        _push(ssrRenderComponent(unref(X), null, null, _parent));
        _push(`</button></div><div class="flex flex-col gap-6 text-xl font-light">`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Главная`);
            } else {
              return [
                createTextVNode("Главная")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/catalog" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Каталог мебели`);
            } else {
              return [
                createTextVNode("Каталог мебели")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/services" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Индивидуальный заказ`);
            } else {
              return [
                createTextVNode("Индивидуальный заказ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/delivery" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Доставка и оплата`);
            } else {
              return [
                createTextVNode("Доставка и оплата")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/contacts" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Контакты`);
            } else {
              return [
                createTextVNode("Контакты")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></nav></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="flex-1">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="bg-primary py-16 text-white"><div class="container-page grid gap-10 md:grid-cols-2 lg:grid-cols-4"><div><div class="mb-5 text-2xl font-semibold">OFFICE<span class="font-light text-white/50">PEAK</span></div><p class="text-sm font-light leading-6 text-white/60">Архитектурный подход к созданию функциональных и эстетичных коммерческих пространств.</p></div><div><h3 class="mb-5 text-xs uppercase text-white/40">Каталог</h3><div class="space-y-3 text-sm font-light"><!--[-->`);
      ssrRenderList(unref(categories).slice(0, 4), (c) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: c.id,
          to: `/catalog/${c.slug}`,
          class: "block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(c.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(c.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div><div><h3 class="mb-5 text-xs uppercase text-white/40">Сервисы</h3><div class="space-y-3 text-sm font-light">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/services",
        class: "block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Индивидуальный заказ`);
          } else {
            return [
              createTextVNode("Индивидуальный заказ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/delivery",
        class: "block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Доставка и сборка`);
          } else {
            return [
              createTextVNode("Доставка и сборка")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div><h3 class="mb-5 text-xs uppercase text-white/40">Контакты</h3><p class="text-sm">8 (800) 000-00-00</p><p class="text-sm">hello@officepeak.ru</p></div></div></footer>`);
      _push(ssrRenderComponent(_component_CartDrawer, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-zdzsJHKw.js.map

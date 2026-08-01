globalThis.__timing__.logStart('Load chunks/build/default-zdzsJHKw');import { _ as __nuxt_component_0 } from './nuxt-link-rH_ixKZi.mjs';
import { defineComponent, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderList, ssrRenderTeleport, ssrRenderAttr } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue/server-renderer/index.mjs';
import { Menu, Search, User, Heart, ShoppingBag, X, Trash2 } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';
import { u as useShop, f as formatPrice, c as categories } from './useShop-BLxPHoy8.mjs';
import { u as useRoute } from './server.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ufo/dist/index.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/h3/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/destr/dist/index.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/hookable/dist/index.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/unstorage/dist/index.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ohash/dist/index.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/klona/dist/index.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/defu/dist/defu.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/scule/dist/index.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/pathe/dist/index.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/unhead/dist/server.mjs';
import 'node:async_hooks';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/devalue/index.js';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/unhead/dist/utils.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/unctx/dist/index.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue-router/vue-router.node.mjs';

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
          _push2(`<aside class="fixed inset-y-0 right-0 z-50 flex w-full max-w-[460px] flex-col bg-white shadow-2xl"><header class="flex items-center justify-between border-b border-border p-6"><h2 class="text-xl font-light">\u041A\u043E\u0440\u0437\u0438\u043D\u0430 <small class="text-secondary">(${ssrInterpolate(unref(count))})</small></h2><button>`);
          _push2(ssrRenderComponent(unref(X), null, null, _parent));
          _push2(`</button></header><div class="flex-1 overflow-auto p-6">`);
          if (!unref(cart).length) {
            _push2(`<div class="flex h-full flex-col items-center justify-center text-secondary">`);
            _push2(ssrRenderComponent(unref(ShoppingBag), { class: "mb-5 h-12 w-12 stroke-1" }, null, _parent));
            _push2(`<p>\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0442\u043E\u0432\u0430\u0440\u043E\u0432</p></div>`);
          } else {
            _push2(`<div class="space-y-6"><!--[-->`);
            ssrRenderList(unref(cart), (item) => {
              _push2(`<div class="flex gap-4"><img${ssrRenderAttr("src", item.image)} class="h-24 w-24 object-cover"><div class="flex flex-1 flex-col"><div class="flex justify-between gap-2"><p class="text-sm font-medium">${ssrInterpolate(item.name)}</p><button>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent));
              _push2(`</button></div><small class="text-secondary">${ssrInterpolate(item.selectedColor)}</small><div class="mt-auto flex justify-between"><span>${ssrInterpolate(item.quantity)} \u0448\u0442.</span><b class="text-sm">${ssrInterpolate(unref(formatPrice)(item.price * item.quantity))}</b></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
          }
          _push2(`</div>`);
          if (unref(cart).length) {
            _push2(`<footer class="border-t border-border bg-surface p-6"><div class="mb-5 flex justify-between"><span>\u0418\u0442\u043E\u0433\u043E</span><b class="text-xl">${ssrInterpolate(unref(formatPrice)(unref(total)))}</b></div>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/checkout",
              class: "btn-primary w-full",
              onClick: ($event) => cartOpen.value = false
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437`);
                } else {
                  return [
                    createTextVNode("\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437")
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
            _push2(`\u041A\u0410\u0422\u0410\u041B\u041E\u0413`);
          } else {
            return [
              createTextVNode("\u041A\u0410\u0422\u0410\u041B\u041E\u0413")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/services" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u041D\u0410 \u0417\u0410\u041A\u0410\u0417`);
          } else {
            return [
              createTextVNode("\u041D\u0410 \u0417\u0410\u041A\u0410\u0417")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/delivery" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0414\u041E\u0421\u0422\u0410\u0412\u041A\u0410`);
          } else {
            return [
              createTextVNode("\u0414\u041E\u0421\u0422\u0410\u0412\u041A\u0410")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/contacts" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u041A\u041E\u041D\u0422\u0410\u041A\u0422\u042B`);
          } else {
            return [
              createTextVNode("\u041A\u041E\u041D\u0422\u0410\u041A\u0422\u042B")
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
        _push(`<div class="fixed inset-0 z-50 bg-black/40 lg:hidden"><nav class="h-full w-[85%] max-w-sm bg-white p-6"><div class="mb-12 flex justify-between"><b>\u041C\u0415\u041D\u042E</b><button>`);
        _push(ssrRenderComponent(unref(X), null, null, _parent));
        _push(`</button></div><div class="flex flex-col gap-6 text-xl font-light">`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u0413\u043B\u0430\u0432\u043D\u0430\u044F`);
            } else {
              return [
                createTextVNode("\u0413\u043B\u0430\u0432\u043D\u0430\u044F")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/catalog" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u043C\u0435\u0431\u0435\u043B\u0438`);
            } else {
              return [
                createTextVNode("\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u043C\u0435\u0431\u0435\u043B\u0438")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/services" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0437\u0430\u043A\u0430\u0437`);
            } else {
              return [
                createTextVNode("\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0437\u0430\u043A\u0430\u0437")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/delivery" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u0438 \u043E\u043F\u043B\u0430\u0442\u0430`);
            } else {
              return [
                createTextVNode("\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u0438 \u043E\u043F\u043B\u0430\u0442\u0430")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/contacts" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B`);
            } else {
              return [
                createTextVNode("\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B")
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
      _push(`</main><footer class="bg-primary py-16 text-white"><div class="container-page grid gap-10 md:grid-cols-2 lg:grid-cols-4"><div><div class="mb-5 text-2xl font-semibold">OFFICE<span class="font-light text-white/50">PEAK</span></div><p class="text-sm font-light leading-6 text-white/60">\u0410\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u043D\u044B\u0439 \u043F\u043E\u0434\u0445\u043E\u0434 \u043A \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044E \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0438 \u044D\u0441\u0442\u0435\u0442\u0438\u0447\u043D\u044B\u0445 \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0445 \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432.</p></div><div><h3 class="mb-5 text-xs uppercase text-white/40">\u041A\u0430\u0442\u0430\u043B\u043E\u0433</h3><div class="space-y-3 text-sm font-light"><!--[-->`);
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
      _push(`<!--]--></div></div><div><h3 class="mb-5 text-xs uppercase text-white/40">\u0421\u0435\u0440\u0432\u0438\u0441\u044B</h3><div class="space-y-3 text-sm font-light">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/services",
        class: "block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0437\u0430\u043A\u0430\u0437`);
          } else {
            return [
              createTextVNode("\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0437\u0430\u043A\u0430\u0437")
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
            _push2(`\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u0438 \u0441\u0431\u043E\u0440\u043A\u0430`);
          } else {
            return [
              createTextVNode("\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u0438 \u0441\u0431\u043E\u0440\u043A\u0430")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div><h3 class="mb-5 text-xs uppercase text-white/40">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</h3><p class="text-sm">8 (800) 000-00-00</p><p class="text-sm">hello@officepeak.ru</p></div></div></footer>`);
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

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/default-zdzsJHKw');
//# sourceMappingURL=default-zdzsJHKw.mjs.map

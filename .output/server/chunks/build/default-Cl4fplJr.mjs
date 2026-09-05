globalThis.__timing__.logStart('Load chunks/build/default-Cl4fplJr');import { b as _export_sfc, u as useRoute, _ as __nuxt_component_0 } from './server.mjs';
import { mergeProps, defineComponent, ref, watch, withCtx, createTextVNode, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, reactive, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderTeleport, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { Menu, ChevronDown, Search, User, Heart, ShoppingBag, X, ArrowUpRight, Trash2, FileText, Loader2, CheckCircle2, AlertCircle } from 'lucide-vue-next';
import { u as useShop, b as categories, f as formatPrice, a as availabilityLabel } from './useShop-Ct_x_K-c.mjs';
import { s as siteConfig, p as publicOfferDisclaimer } from './site-Dljnoeow.mjs';
import { u as useLeadModal } from './useLeadModal-DaBbHceU.mjs';
import { _ as _sfc_main$5 } from './QuantityInput-C7yvggq_.mjs';
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

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SiteHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { menuOpen, count, total, favorites } = useShop();
    useLeadModal();
    const header = ref(null);
    const catalogOpen = ref(false);
    const servicesOpen = ref(false);
    const query = ref("");
    ref(null);
    ref(null);
    const services = [
      ["\u0414\u0438\u0437\u0430\u0439\u043D-\u043F\u0440\u043E\u0435\u043A\u0442", "/design-project"],
      ["\u041E\u043F\u043B\u0430\u0442\u0430", "/payment"],
      ["\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430", "/delivery"],
      ["\u041F\u043E\u0434\u044A\u0451\u043C", "/lifting"],
      ["\u0421\u0431\u043E\u0440\u043A\u0430", "/assembly"],
      ["\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u044F", "/warranty"],
      ["\u0412\u043E\u0437\u0432\u0440\u0430\u0442", "/returns"]
    ];
    const closeMenus = () => {
      catalogOpen.value = false;
      servicesOpen.value = false;
    };
    watch(() => route.fullPath, () => {
      closeMenus();
      menuOpen.value = false;
    });
    watch(menuOpen, async (value, previous) => {
      return;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({
        ref_key: "header",
        ref: header,
        class: "site-header sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur"
      }, _attrs))}><div class="hidden border-b border-border bg-surface lg:block"><div class="container-page flex h-10 items-center justify-between text-xs"><nav class="flex gap-6" aria-label="\u0420\u0430\u0437\u0434\u0435\u043B\u044B \u0434\u043B\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/government",
        class: "hover:text-accent"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0413\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u043C \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430\u043C`);
          } else {
            return [
              createTextVNode("\u0413\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u043C \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430\u043C")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/business",
        class: "hover:text-accent"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u043C \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F\u043C`);
          } else {
            return [
              createTextVNode("\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u043C \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F\u043C")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/designers",
        class: "hover:text-accent"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0414\u0438\u0437\u0430\u0439\u043D\u0435\u0440\u0430\u043C`);
          } else {
            return [
              createTextVNode("\u0414\u0438\u0437\u0430\u0439\u043D\u0435\u0440\u0430\u043C")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="flex items-center gap-5"><button type="button" class="font-medium hover:text-accent">\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u0432\u043E\u043D\u043E\u043A</button><button type="button" class="font-medium text-accent hover:text-primary">\u0414\u0438\u0437\u0430\u0439\u043D-\u043F\u0440\u043E\u0435\u043A\u0442</button></div></div></div><div class="container-page flex h-[76px] items-center gap-4 lg:h-[88px]"><button type="button" class="icon-button lg:hidden" aria-label="\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E">`);
      _push(ssrRenderComponent(unref(Menu), { class: "h-5 w-5" }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "shrink-0",
        "aria-label": "OFFICEPEAK \u2014 \u0433\u043B\u0430\u0432\u043D\u0430\u044F"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="block text-xl font-semibold tracking-[-.06em] sm:text-2xl"${_scopeId}>OFFICE<span class="font-light"${_scopeId}>PEAK</span></span><span class="hidden text-[9px] tracking-wide text-secondary xl:block"${_scopeId}>${ssrInterpolate(unref(siteConfig).tagline)}</span>`);
          } else {
            return [
              createVNode("span", { class: "block text-xl font-semibold tracking-[-.06em] sm:text-2xl" }, [
                createTextVNode("OFFICE"),
                createVNode("span", { class: "font-light" }, "PEAK")
              ]),
              createVNode("span", { class: "hidden text-[9px] tracking-wide text-secondary xl:block" }, toDisplayString(unref(siteConfig).tagline), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="ml-5 hidden h-full items-center gap-7 text-sm lg:flex" aria-label="\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F"><div class="relative flex h-full items-center"><button type="button" class="inline-flex items-center gap-1.5 font-medium"${ssrRenderAttr("aria-expanded", unref(catalogOpen))}>\u041A\u0430\u0442\u0430\u043B\u043E\u0433 `);
      _push(ssrRenderComponent(unref(ChevronDown), { class: "h-4 w-4" }, null, _parent));
      _push(`</button>`);
      if (unref(catalogOpen)) {
        _push(`<div class="absolute left-0 top-full w-[720px] border border-border bg-white p-7 shadow-subtle" role="menu"><div class="grid grid-cols-3 gap-x-6 gap-y-4"><!--[-->`);
        ssrRenderList(unref(categories), (category) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: category.id,
            to: `/catalog/${category.slug}`,
            class: "text-sm hover:text-accent",
            role: "menuitem"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(category.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(category.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalog",
          class: "mt-6 inline-block border-t border-border pt-5 text-sm font-medium text-accent"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u0412\u0435\u0441\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433`);
            } else {
              return [
                createTextVNode("\u0412\u0435\u0441\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/custom-furniture" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u041C\u0435\u0431\u0435\u043B\u044C \u043D\u0430 \u0437\u0430\u043A\u0430\u0437`);
          } else {
            return [
              createTextVNode("\u041C\u0435\u0431\u0435\u043B\u044C \u043D\u0430 \u0437\u0430\u043A\u0430\u0437")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative flex h-full items-center"><button type="button" class="inline-flex items-center gap-1.5"${ssrRenderAttr("aria-expanded", unref(servicesOpen))}>\u0423\u0441\u043B\u0443\u0433\u0438 `);
      _push(ssrRenderComponent(unref(ChevronDown), { class: "h-4 w-4" }, null, _parent));
      _push(`</button>`);
      if (unref(servicesOpen)) {
        _push(`<div class="absolute left-0 top-full w-64 border border-border bg-white p-5 shadow-subtle" role="menu"><!--[-->`);
        ssrRenderList(services, (service) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: service[1],
            to: service[1],
            class: "block py-2 text-sm hover:text-accent",
            role: "menuitem"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(service[0])}`);
              } else {
                return [
                  createTextVNode(toDisplayString(service[0]), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
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
      _push(`</nav><form class="ml-auto hidden w-full max-w-[230px] items-center border-b border-border xl:flex" role="search"><label class="sr-only" for="header-search">\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0443</label><input id="header-search"${ssrRenderAttr("value", unref(query))} class="w-full bg-transparent py-2 text-sm outline-none" placeholder="\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u043B\u0438 \u0430\u0440\u0442\u0438\u043A\u0443\u043B"><button type="submit" class="p-2" aria-label="\u041D\u0430\u0439\u0442\u0438">`);
      _push(ssrRenderComponent(unref(Search), { class: "h-4 w-4" }, null, _parent));
      _push(`</button></form><div class="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 xl:ml-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/search",
        class: "icon-button xl:hidden",
        "aria-label": "\u041F\u043E\u0438\u0441\u043A"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Search), { class: "h-5 w-5" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Search), { class: "h-5 w-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/account",
        class: "icon-button hidden sm:inline-flex",
        "aria-label": "\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(User), { class: "h-5 w-5" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(User), { class: "h-5 w-5" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/favorites",
        class: "icon-button relative",
        "aria-label": "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Heart), { class: "h-5 w-5" }, null, _parent2, _scopeId));
            if (unref(favorites).length) {
              _push2(`<span class="counter-dot"${_scopeId}>${ssrInterpolate(unref(favorites).length)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Heart), { class: "h-5 w-5" }),
              unref(favorites).length ? (openBlock(), createBlock("span", {
                key: 0,
                class: "counter-dot"
              }, toDisplayString(unref(favorites).length), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="button" class="relative inline-flex h-10 items-center gap-2 border border-border px-3" aria-label="\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u043E\u0440\u0437\u0438\u043D\u0443">`);
      _push(ssrRenderComponent(unref(ShoppingBag), { class: "h-5 w-5" }, null, _parent));
      if (unref(count)) {
        _push(`<span class="text-xs font-semibold">${ssrInterpolate(unref(count))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="hidden text-xs xl:block">${ssrInterpolate(unref(formatPrice)(unref(total)))}</span></button></div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(menuOpen)) {
          _push2(`<div class="fixed inset-0 z-50 bg-black/45 lg:hidden" role="dialog" aria-modal="true" aria-label="\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u043D\u044E"><nav class="h-full w-[88%] max-w-sm overflow-y-auto bg-white p-6"><div class="mb-10 flex items-center justify-between"><b class="text-lg">OFFICEPEAK</b><button type="button" class="icon-button" aria-label="\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E">`);
          _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent));
          _push2(`</button></div><div class="flex flex-col gap-5 text-xl font-light">`);
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`\u0413\u043B\u0430\u0432\u043D\u0430\u044F`);
              } else {
                return [
                  createTextVNode("\u0413\u043B\u0430\u0432\u043D\u0430\u044F")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/catalog" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`\u041A\u0430\u0442\u0430\u043B\u043E\u0433`);
              } else {
                return [
                  createTextVNode("\u041A\u0430\u0442\u0430\u043B\u043E\u0433")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/custom-furniture" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`\u041C\u0435\u0431\u0435\u043B\u044C \u043D\u0430 \u0437\u0430\u043A\u0430\u0437`);
              } else {
                return [
                  createTextVNode("\u041C\u0435\u0431\u0435\u043B\u044C \u043D\u0430 \u0437\u0430\u043A\u0430\u0437")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/design-project" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`\u0414\u0438\u0437\u0430\u0439\u043D-\u043F\u0440\u043E\u0435\u043A\u0442`);
              } else {
                return [
                  createTextVNode("\u0414\u0438\u0437\u0430\u0439\u043D-\u043F\u0440\u043E\u0435\u043A\u0442")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/delivery" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430`);
              } else {
                return [
                  createTextVNode("\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/contacts" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B`);
              } else {
                return [
                  createTextVNode("\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/account" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442`);
              } else {
                return [
                  createTextVNode("\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div class="my-8 border-t border-border"></div><div class="flex flex-col gap-3 text-sm text-secondary">`);
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/government" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`\u0413\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u043C \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430\u043C`);
              } else {
                return [
                  createTextVNode("\u0413\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u043C \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430\u043C")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/business" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u043C \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F\u043C`);
              } else {
                return [
                  createTextVNode("\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u043C \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F\u043C")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/designers" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`\u0414\u0438\u0437\u0430\u0439\u043D\u0435\u0440\u0430\u043C`);
              } else {
                return [
                  createTextVNode("\u0414\u0438\u0437\u0430\u0439\u043D\u0435\u0440\u0430\u043C")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div class="mt-8 grid gap-3"><button type="button" class="btn-primary">\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u0432\u043E\u043D\u043E\u043A</button><button type="button" class="btn-secondary">\u0414\u0438\u0437\u0430\u0439\u043D-\u043F\u0440\u043E\u0435\u043A\u0442</button></div></nav></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</header>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteHeader.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SiteFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const services = [["\u0414\u0438\u0437\u0430\u0439\u043D-\u043F\u0440\u043E\u0435\u043A\u0442", "/design-project"], ["\u041E\u043F\u043B\u0430\u0442\u0430", "/payment"], ["\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430", "/delivery"], ["\u041F\u043E\u0434\u044A\u0451\u043C", "/lifting"], ["\u0421\u0431\u043E\u0440\u043A\u0430", "/assembly"], ["\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u044F", "/warranty"], ["\u0412\u043E\u0437\u0432\u0440\u0430\u0442", "/returns"]];
    const clients = [["\u0413\u043E\u0441\u0443\u0434\u0430\u0440\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u043C \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430\u043C", "/government"], ["\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u043C \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F\u043C", "/business"], ["\u0414\u0438\u0437\u0430\u0439\u043D\u0435\u0440\u0430\u043C", "/designers"]];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "site-footer bg-primary pb-8 pt-16 text-white md:pt-20" }, _attrs))}><div class="container-page grid gap-12 md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_1fr]"><div><div class="mb-3 text-2xl font-semibold tracking-[-.06em]">OFFICE<span class="font-light text-white/55">PEAK</span></div><p class="max-w-xs text-sm leading-6 text-white/60">${ssrInterpolate(unref(siteConfig).tagline)}</p><div class="mt-7 space-y-2 text-sm"><a${ssrRenderAttr("href", unref(siteConfig).phoneHref)} class="block hover:text-accentSoft">${ssrInterpolate(unref(siteConfig).phone)}</a><a${ssrRenderAttr("href", unref(siteConfig).emailHref)} class="block hover:text-accentSoft">${ssrInterpolate(unref(siteConfig).email)}</a></div>`);
      if (unref(siteConfig).social.telegram || unref(siteConfig).social.max) {
        _push(`<div class="mt-5 flex gap-4 text-sm">`);
        if (unref(siteConfig).social.telegram) {
          _push(`<a${ssrRenderAttr("href", unref(siteConfig).social.telegram)} target="_blank" rel="noopener">Telegram `);
          _push(ssrRenderComponent(unref(ArrowUpRight), { class: "inline h-3 w-3" }, null, _parent));
          _push(`</a>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(siteConfig).social.max) {
          _push(`<a${ssrRenderAttr("href", unref(siteConfig).social.max)} target="_blank" rel="noopener">MAX `);
          _push(ssrRenderComponent(unref(ArrowUpRight), { class: "inline h-3 w-3" }, null, _parent));
          _push(`</a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><h2 class="footer-heading">\u041A\u0430\u0442\u0430\u043B\u043E\u0433</h2><div class="footer-links"><!--[-->`);
      ssrRenderList(unref(categories).slice(0, 6), (category) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: category.id,
          to: `/catalog/${category.slug}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(category.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(category.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/catalog",
        class: "text-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0412\u0435\u0441\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433`);
          } else {
            return [
              createTextVNode("\u0412\u0435\u0441\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div><h2 class="footer-heading">\u0423\u0441\u043B\u0443\u0433\u0438</h2><div class="footer-links"><!--[-->`);
      ssrRenderList(services, (service) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: service[1],
          to: service[1]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(service[0])}`);
            } else {
              return [
                createTextVNode(toDisplayString(service[0]), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/custom-furniture" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u041C\u0435\u0431\u0435\u043B\u044C \u043D\u0430 \u0437\u0430\u043A\u0430\u0437`);
          } else {
            return [
              createTextVNode("\u041C\u0435\u0431\u0435\u043B\u044C \u043D\u0430 \u0437\u0430\u043A\u0430\u0437")
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
      _push(`</div></div><div><h2 class="footer-heading">\u041A\u043B\u0438\u0435\u043D\u0442\u0430\u043C</h2><div class="footer-links"><!--[-->`);
      ssrRenderList(clients, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item[1],
          to: item[1]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item[0])}`);
            } else {
              return [
                createTextVNode(toDisplayString(item[0]), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/privacy" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438`);
          } else {
            return [
              createTextVNode("\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/personal-data-consent" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u0434\u0430\u043D\u043D\u044B\u0445`);
          } else {
            return [
              createTextVNode("\u0421\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u0434\u0430\u043D\u043D\u044B\u0445")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="container-page mt-14 border-t border-white/15 pt-7"><p class="max-w-5xl text-xs leading-5 text-white/45">${ssrInterpolate(unref(publicOfferDisclaimer))}</p><p class="mt-4 text-xs text-white/35">\xA9 ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} OFFICEPEAK</p></div></footer>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SiteFooter.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CartDrawer",
  __ssrInlineRender: true,
  setup(__props) {
    const { items, cartOpen, count, total, setQuantity } = useShop();
    ref(null);
    const close = () => {
      cartOpen.value = false;
    };
    watch(cartOpen, async (value) => {
      return;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_QuantityInput = _sfc_main$5;
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(cartOpen)) {
          _push2(`<div class="fixed inset-0 z-50 bg-black/45" aria-hidden="true"></div>`);
        } else {
          _push2(`<!---->`);
        }
        if (unref(cartOpen)) {
          _push2(`<aside class="fixed inset-y-0 right-0 z-[55] flex w-full max-w-[520px] flex-col bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title"><header class="flex items-center justify-between border-b border-border p-5 sm:p-6"><h2 id="cart-drawer-title" class="text-2xl font-light">\u041A\u043E\u0440\u0437\u0438\u043D\u0430 <small class="text-sm text-secondary">${ssrInterpolate(unref(count))} \u0448\u0442.</small></h2><button type="button" class="icon-button" aria-label="\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043A\u043E\u0440\u0437\u0438\u043D\u0443">`);
          _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent));
          _push2(`</button></header><div class="flex-1 overflow-auto p-5 sm:p-6">`);
          if (!unref(items).length) {
            _push2(`<div class="flex h-full min-h-64 flex-col items-center justify-center text-center text-secondary">`);
            _push2(ssrRenderComponent(unref(ShoppingBag), { class: "mb-5 h-12 w-12 stroke-1" }, null, _parent));
            _push2(`<p class="mb-5">\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0442\u043E\u0432\u0430\u0440\u043E\u0432</p>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/catalog",
              class: "btn-secondary",
              onClick: close
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433`);
                } else {
                  return [
                    createTextVNode("\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(`</div>`);
          } else {
            _push2(`<div class="space-y-6"><!--[-->`);
            ssrRenderList(unref(items), (item) => {
              _push2(`<article class="grid grid-cols-[88px_1fr] gap-4 border-b border-border pb-6">`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: `/product/${item.product.slug}`,
                onClick: close
              }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  var _a, _b, _c, _d, _e, _f;
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", (_c = (_a = item.product.images[item.variant.imageIndex]) == null ? void 0 : _a.src) != null ? _c : (_b = item.product.images[0]) == null ? void 0 : _b.src)}${ssrRenderAttr("alt", item.product.name)} class="h-24 w-full object-cover"${_scopeId}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: (_f = (_d = item.product.images[item.variant.imageIndex]) == null ? void 0 : _d.src) != null ? _f : (_e = item.product.images[0]) == null ? void 0 : _e.src,
                        alt: item.product.name,
                        class: "h-24 w-full object-cover"
                      }, null, 8, ["src", "alt"])
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push2(`<div class="min-w-0"><div class="flex items-start justify-between gap-3">`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: `/product/${item.product.slug}`,
                class: "text-sm font-medium leading-5 hover:text-accent",
                onClick: close
              }, {
                default: withCtx((_, _push3, _parent2, _scopeId) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(item.product.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item.product.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
              _push2(`<button type="button" class="p-1 text-secondary hover:text-primary"${ssrRenderAttr("aria-label", `\u0423\u0434\u0430\u043B\u0438\u0442\u044C ${item.product.name}`)}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent));
              _push2(`</button></div><p class="mt-1 text-xs text-secondary">${ssrInterpolate(item.variant.article)} \xB7 ${ssrInterpolate(item.variant.color.name)} \xB7 ${ssrInterpolate(item.variant.dimensions.label)}</p><p class="${ssrRenderClass([item.variant.availability === "in-stock" ? "text-emerald-700" : "text-amber-700", "mt-1 text-xs"])}">${ssrInterpolate(unref(availabilityLabel)(item.variant.availability))}</p><div class="mt-4 flex items-center justify-between gap-3">`);
              _push2(ssrRenderComponent(_component_QuantityInput, {
                "model-value": item.quantity,
                label: `\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E ${item.product.name}`,
                "onUpdate:modelValue": ($event) => unref(setQuantity)(item.productId, item.variantId, $event)
              }, null, _parent));
              _push2(`<b class="text-sm">${ssrInterpolate(unref(formatPrice)(item.lineTotal))}</b></div></div></article>`);
            });
            _push2(`<!--]--></div>`);
          }
          _push2(`</div>`);
          if (unref(items).length) {
            _push2(`<footer class="border-t border-border bg-surface p-5 sm:p-6"><div class="mb-5 flex justify-between"><span>\u0418\u0442\u043E\u0433\u043E</span><b class="text-xl">${ssrInterpolate(unref(formatPrice)(unref(total)))}</b></div><div class="grid gap-3 sm:grid-cols-2">`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/cart",
              class: "btn-secondary",
              onClick: close
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`\u0412\u0441\u044F \u043A\u043E\u0440\u0437\u0438\u043D\u0430`);
                } else {
                  return [
                    createTextVNode("\u0412\u0441\u044F \u043A\u043E\u0440\u0437\u0438\u043D\u0430")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/checkout",
              class: "btn-primary",
              onClick: close
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
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/quote",
              class: "btn-secondary sm:col-span-2",
              onClick: close
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(FileText), { class: "h-4 w-4" }, null, _parent2, _scopeId));
                  _push3(` \u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u041A\u041F`);
                } else {
                  return [
                    createVNode(unref(FileText), { class: "h-4 w-4" }),
                    createTextVNode(" \u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u041A\u041F")
                  ];
                }
              }),
              _: 1
            }, _parent));
            _push2(`</div></footer>`);
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CartDrawer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LeadModal",
  __ssrInlineRender: true,
  setup(__props) {
    const { isOpen, type } = useLeadModal();
    ref(null);
    ref(null);
    const sending = ref(false);
    const submitted = ref(false);
    const result = ref("");
    const errors = reactive({});
    const form = reactive({ name: "", phone: "", email: "", company: "", message: "", consent: false, website: "" });
    const definitions = {
      callback: { title: "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u0432\u043E\u043D\u043E\u043A", intro: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0438\u043C\u044F \u0438 \u0442\u0435\u043B\u0435\u0444\u043E\u043D. \u041C\u044B \u0432\u0430\u043C \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u043C." },
      design: { title: "\u0414\u0438\u0437\u0430\u0439\u043D-\u043F\u0440\u043E\u0435\u043A\u0442", intro: "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435, \u0447\u0442\u043E \u043D\u0443\u0436\u043D\u043E \u0441\u0434\u0435\u043B\u0430\u0442\u044C. \u041C\u043E\u0436\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B.", email: "required", file: true },
      message: { title: "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043D\u0430\u043C", intro: "\u0417\u0430\u0434\u0430\u0439\u0442\u0435 \u0432\u043E\u043F\u0440\u043E\u0441 \u0438\u043B\u0438 \u043E\u043F\u0438\u0448\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u0447\u0443.", email: "optional", message: true },
      manager: { title: "\u0412\u044B\u0437\u0432\u0430\u0442\u044C \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430", intro: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0438\u043C\u044F \u0438 \u0442\u0435\u043B\u0435\u0444\u043E\u043D." },
      tender: { title: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443", intro: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0438\u043C\u044F \u0438 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438.", company: true }
    };
    const definition = computed(() => definitions[type.value]);
    watch(isOpen, async (value) => {
      return;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(isOpen)) {
          _push2(`<div class="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/55 p-4"><section role="dialog" aria-modal="true"${ssrRenderAttr("aria-labelledby", `lead-title-${unref(type)}`)} class="relative my-auto w-full max-w-2xl bg-white p-6 shadow-2xl sm:p-9"><button type="button" class="icon-button absolute right-4 top-4" aria-label="\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0444\u043E\u0440\u043C\u0443">`);
          _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent));
          _push2(`</button><h2${ssrRenderAttr("id", `lead-title-${unref(type)}`)} class="mb-3 pr-12 text-3xl font-light sm:text-4xl">${ssrInterpolate(unref(definition).title)}</h2><p class="mb-7 max-w-xl text-sm leading-6 text-secondary">${ssrInterpolate(unref(definition).intro)}</p><form class="grid gap-5 sm:grid-cols-2" novalidate><label class="field-label">\u0418\u043C\u044F <span aria-hidden="true">*</span><input${ssrRenderAttr("value", unref(form).name)} autocomplete="name" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).name))}>`);
          if (unref(errors).name) {
            _push2(`<span class="field-error">${ssrInterpolate(unref(errors).name)}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</label><label class="field-label">\u0422\u0435\u043B\u0435\u0444\u043E\u043D <span aria-hidden="true">*</span><input${ssrRenderAttr("value", unref(form).phone)} type="tel" autocomplete="tel" inputmode="tel" placeholder="+7 999 000-00-00" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).phone))}>`);
          if (unref(errors).phone) {
            _push2(`<span class="field-error">${ssrInterpolate(unref(errors).phone)}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</label>`);
          if (unref(definition).email) {
            _push2(`<label class="field-label sm:col-span-2">Email `);
            if (unref(definition).email === "required") {
              _push2(`<span aria-hidden="true">*</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<input${ssrRenderAttr("value", unref(form).email)} type="email" autocomplete="email" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).email))}>`);
            if (unref(errors).email) {
              _push2(`<span class="field-error">${ssrInterpolate(unref(errors).email)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</label>`);
          } else {
            _push2(`<!---->`);
          }
          if (unref(definition).company) {
            _push2(`<label class="field-label sm:col-span-2">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 <span aria-hidden="true">*</span><input${ssrRenderAttr("value", unref(form).company)} autocomplete="organization" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).company))}>`);
            if (unref(errors).company) {
              _push2(`<span class="field-error">${ssrInterpolate(unref(errors).company)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</label>`);
          } else {
            _push2(`<!---->`);
          }
          if (unref(definition).message) {
            _push2(`<label class="field-label sm:col-span-2">\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435<textarea rows="4" class="field-input resize-y">${ssrInterpolate(unref(form).message)}</textarea></label>`);
          } else {
            _push2(`<!---->`);
          }
          if (unref(definition).file) {
            _push2(`<label class="field-label sm:col-span-2">\u0424\u0430\u0439\u043B \u043F\u0440\u043E\u0435\u043A\u0442\u0430<input type="file" class="field-input file:mr-4 file:border-0 file:bg-surface file:px-3 file:py-2"${ssrRenderAttr("accept", unref(siteConfig).forms.acceptedFileExtensions.join(","))}><span class="mt-1 block text-xs font-normal text-secondary">PDF, DOC(X), XLS(X), JPG \u0438\u043B\u0438 PNG, \u0434\u043E 10 \u041C\u0411.</span>`);
            if (unref(errors).file) {
              _push2(`<span class="field-error">${ssrInterpolate(unref(errors).file)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</label>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<label class="sr-only" aria-hidden="true">\u0421\u0430\u0439\u0442<input${ssrRenderAttr("value", unref(form).website)} tabindex="-1" autocomplete="off"></label><label class="flex items-start gap-3 text-sm leading-5 sm:col-span-2"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).consent) ? ssrLooseContain(unref(form).consent, null) : unref(form).consent) ? " checked" : ""} type="checkbox" class="mt-1 h-4 w-4 accent-accent"><span>\u042F \u0441\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430 `);
          _push2(ssrRenderComponent(_component_NuxtLink, {
            to: "/personal-data-consent",
            class: "underline"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445`);
              } else {
                return [
                  createTextVNode("\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`.</span></label>`);
          if (unref(errors).consent) {
            _push2(`<span class="field-error sm:col-span-2">${ssrInterpolate(unref(errors).consent)}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="sm:col-span-2"><button type="submit" class="btn-primary min-w-48"${ssrIncludeBooleanAttr(unref(sending) || unref(submitted)) ? " disabled" : ""}>`);
          if (unref(sending)) {
            _push2(ssrRenderComponent(unref(Loader2), { class: "h-4 w-4 animate-spin" }, null, _parent));
          } else {
            _push2(`<!---->`);
          }
          _push2(`${ssrInterpolate(unref(sending) ? "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" : unref(submitted) ? "\u0424\u043E\u0440\u043C\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u0430" : "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C")}</button></div></form>`);
          if (unref(result)) {
            _push2(`<p class="mt-6 flex items-start gap-2 border-t border-border pt-5 text-sm leading-6">`);
            if (unref(result).includes("\u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u044B")) {
              _push2(ssrRenderComponent(unref(CheckCircle2), { class: "mt-0.5 h-5 w-5 shrink-0 text-accent" }, null, _parent));
            } else {
              _push2(ssrRenderComponent(unref(AlertCircle), { class: "mt-0.5 h-5 w-5 shrink-0 text-accent" }, null, _parent));
            }
            _push2(`${ssrInterpolate(unref(result))}</p>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</section></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LeadModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_SiteHeader = _sfc_main$4;
  const _component_SiteFooter = _sfc_main$3;
  const _component_CartDrawer = _sfc_main$2;
  const _component_LeadModal = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_SiteHeader, null, null, _parent));
  _push(`<main id="main-content" class="flex-1">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_SiteFooter, null, null, _parent));
  _push(ssrRenderComponent(_component_CartDrawer, null, null, _parent));
  _push(ssrRenderComponent(_component_LeadModal, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };;globalThis.__timing__.logEnd('Load chunks/build/default-Cl4fplJr');
//# sourceMappingURL=default-Cl4fplJr.mjs.map

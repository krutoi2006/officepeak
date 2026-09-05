import { u as useRoute, _ as __nuxt_component_0, b as _export_sfc } from "../server.mjs";
import { defineComponent, ref, watch, mergeProps, withCtx, createTextVNode, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext, reactive, computed } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderTeleport, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderSlot } from "vue/server-renderer";
import { Menu, ChevronDown, Search, User, Heart, ShoppingBag, X, ArrowUpRight, Trash2, FileText, Loader2, CheckCircle2, AlertCircle } from "lucide-vue-next";
import { u as useShop, b as categories, f as formatPrice, a as availabilityLabel } from "./useShop-Ct_x_K-c.js";
import { s as siteConfig, p as publicOfferDisclaimer } from "./site-Dljnoeow.js";
import { u as useLeadModal } from "./useLeadModal-DaBbHceU.js";
import { _ as _sfc_main$5 } from "./QuantityInput-C7yvggq_.js";
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
      ["Дизайн-проект", "/design-project"],
      ["Оплата", "/payment"],
      ["Доставка", "/delivery"],
      ["Подъём", "/lifting"],
      ["Сборка", "/assembly"],
      ["Гарантия", "/warranty"],
      ["Возврат", "/returns"]
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
      }, _attrs))}><div class="hidden border-b border-border bg-surface lg:block"><div class="container-page flex h-10 items-center justify-between text-xs"><nav class="flex gap-6" aria-label="Разделы для клиентов">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/government",
        class: "hover:text-accent"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Государственным заказчикам`);
          } else {
            return [
              createTextVNode("Государственным заказчикам")
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
            _push2(`Коммерческим организациям`);
          } else {
            return [
              createTextVNode("Коммерческим организациям")
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
            _push2(`Дизайнерам`);
          } else {
            return [
              createTextVNode("Дизайнерам")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="flex items-center gap-5"><button type="button" class="font-medium hover:text-accent">Заказать звонок</button><button type="button" class="font-medium text-accent hover:text-primary">Дизайн-проект</button></div></div></div><div class="container-page flex h-[76px] items-center gap-4 lg:h-[88px]"><button type="button" class="icon-button lg:hidden" aria-label="Открыть меню">`);
      _push(ssrRenderComponent(unref(Menu), { class: "h-5 w-5" }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "shrink-0",
        "aria-label": "OFFICEPEAK — главная"
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
      _push(`<nav class="ml-5 hidden h-full items-center gap-7 text-sm lg:flex" aria-label="Основная навигация"><div class="relative flex h-full items-center"><button type="button" class="inline-flex items-center gap-1.5 font-medium"${ssrRenderAttr("aria-expanded", unref(catalogOpen))}>Каталог `);
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
              _push2(`Весь каталог`);
            } else {
              return [
                createTextVNode("Весь каталог")
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
            _push2(`Мебель на заказ`);
          } else {
            return [
              createTextVNode("Мебель на заказ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative flex h-full items-center"><button type="button" class="inline-flex items-center gap-1.5"${ssrRenderAttr("aria-expanded", unref(servicesOpen))}>Услуги `);
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
            _push2(`Контакты`);
          } else {
            return [
              createTextVNode("Контакты")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><form class="ml-auto hidden w-full max-w-[230px] items-center border-b border-border xl:flex" role="search"><label class="sr-only" for="header-search">Поиск по каталогу</label><input id="header-search"${ssrRenderAttr("value", unref(query))} class="w-full bg-transparent py-2 text-sm outline-none" placeholder="Название или артикул"><button type="submit" class="p-2" aria-label="Найти">`);
      _push(ssrRenderComponent(unref(Search), { class: "h-4 w-4" }, null, _parent));
      _push(`</button></form><div class="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 xl:ml-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/search",
        class: "icon-button xl:hidden",
        "aria-label": "Поиск"
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
        "aria-label": "Личный кабинет"
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
        "aria-label": "Избранное"
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
      _push(`<button type="button" class="relative inline-flex h-10 items-center gap-2 border border-border px-3" aria-label="Открыть корзину">`);
      _push(ssrRenderComponent(unref(ShoppingBag), { class: "h-5 w-5" }, null, _parent));
      if (unref(count)) {
        _push(`<span class="text-xs font-semibold">${ssrInterpolate(unref(count))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="hidden text-xs xl:block">${ssrInterpolate(unref(formatPrice)(unref(total)))}</span></button></div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(menuOpen)) {
          _push2(`<div class="fixed inset-0 z-50 bg-black/45 lg:hidden" role="dialog" aria-modal="true" aria-label="Мобильное меню"><nav class="h-full w-[88%] max-w-sm overflow-y-auto bg-white p-6"><div class="mb-10 flex items-center justify-between"><b class="text-lg">OFFICEPEAK</b><button type="button" class="icon-button" aria-label="Закрыть меню">`);
          _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent));
          _push2(`</button></div><div class="flex flex-col gap-5 text-xl font-light">`);
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`Главная`);
              } else {
                return [
                  createTextVNode("Главная")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/catalog" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`Каталог`);
              } else {
                return [
                  createTextVNode("Каталог")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/custom-furniture" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`Мебель на заказ`);
              } else {
                return [
                  createTextVNode("Мебель на заказ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/design-project" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`Дизайн-проект`);
              } else {
                return [
                  createTextVNode("Дизайн-проект")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/delivery" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`Доставка`);
              } else {
                return [
                  createTextVNode("Доставка")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/contacts" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`Контакты`);
              } else {
                return [
                  createTextVNode("Контакты")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/account" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`Личный кабинет`);
              } else {
                return [
                  createTextVNode("Личный кабинет")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div class="my-8 border-t border-border"></div><div class="flex flex-col gap-3 text-sm text-secondary">`);
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/government" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`Государственным заказчикам`);
              } else {
                return [
                  createTextVNode("Государственным заказчикам")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/business" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`Коммерческим организациям`);
              } else {
                return [
                  createTextVNode("Коммерческим организациям")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(ssrRenderComponent(_component_NuxtLink, { to: "/designers" }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`Дизайнерам`);
              } else {
                return [
                  createTextVNode("Дизайнерам")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div class="mt-8 grid gap-3"><button type="button" class="btn-primary">Заказать звонок</button><button type="button" class="btn-secondary">Дизайн-проект</button></div></nav></div>`);
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
    const services = [["Дизайн-проект", "/design-project"], ["Оплата", "/payment"], ["Доставка", "/delivery"], ["Подъём", "/lifting"], ["Сборка", "/assembly"], ["Гарантия", "/warranty"], ["Возврат", "/returns"]];
    const clients = [["Государственным заказчикам", "/government"], ["Коммерческим организациям", "/business"], ["Дизайнерам", "/designers"]];
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
      _push(`</div><div><h2 class="footer-heading">Каталог</h2><div class="footer-links"><!--[-->`);
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
            _push2(`Весь каталог`);
          } else {
            return [
              createTextVNode("Весь каталог")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div><h2 class="footer-heading">Услуги</h2><div class="footer-links"><!--[-->`);
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
            _push2(`Мебель на заказ`);
          } else {
            return [
              createTextVNode("Мебель на заказ")
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
      _push(`</div></div><div><h2 class="footer-heading">Клиентам</h2><div class="footer-links"><!--[-->`);
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
            _push2(`Политика конфиденциальности`);
          } else {
            return [
              createTextVNode("Политика конфиденциальности")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/personal-data-consent" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Согласие на обработку данных`);
          } else {
            return [
              createTextVNode("Согласие на обработку данных")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="container-page mt-14 border-t border-white/15 pt-7"><p class="max-w-5xl text-xs leading-5 text-white/45">${ssrInterpolate(unref(publicOfferDisclaimer))}</p><p class="mt-4 text-xs text-white/35">© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} OFFICEPEAK</p></div></footer>`);
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
          _push2(`<aside class="fixed inset-y-0 right-0 z-[55] flex w-full max-w-[520px] flex-col bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title"><header class="flex items-center justify-between border-b border-border p-5 sm:p-6"><h2 id="cart-drawer-title" class="text-2xl font-light">Корзина <small class="text-sm text-secondary">${ssrInterpolate(unref(count))} шт.</small></h2><button type="button" class="icon-button" aria-label="Закрыть корзину">`);
          _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent));
          _push2(`</button></header><div class="flex-1 overflow-auto p-5 sm:p-6">`);
          if (!unref(items).length) {
            _push2(`<div class="flex h-full min-h-64 flex-col items-center justify-center text-center text-secondary">`);
            _push2(ssrRenderComponent(unref(ShoppingBag), { class: "mb-5 h-12 w-12 stroke-1" }, null, _parent));
            _push2(`<p class="mb-5">В корзине пока нет товаров</p>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/catalog",
              class: "btn-secondary",
              onClick: close
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`Перейти в каталог`);
                } else {
                  return [
                    createTextVNode("Перейти в каталог")
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
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", item.product.images[item.variant.imageIndex]?.src ?? item.product.images[0]?.src)}${ssrRenderAttr("alt", item.product.name)} class="h-24 w-full object-cover"${_scopeId}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: item.product.images[item.variant.imageIndex]?.src ?? item.product.images[0]?.src,
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
              _push2(`<button type="button" class="p-1 text-secondary hover:text-primary"${ssrRenderAttr("aria-label", `Удалить ${item.product.name}`)}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent));
              _push2(`</button></div><p class="mt-1 text-xs text-secondary">${ssrInterpolate(item.variant.article)} · ${ssrInterpolate(item.variant.color.name)} · ${ssrInterpolate(item.variant.dimensions.label)}</p><p class="${ssrRenderClass([item.variant.availability === "in-stock" ? "text-emerald-700" : "text-amber-700", "mt-1 text-xs"])}">${ssrInterpolate(unref(availabilityLabel)(item.variant.availability))}</p><div class="mt-4 flex items-center justify-between gap-3">`);
              _push2(ssrRenderComponent(_component_QuantityInput, {
                "model-value": item.quantity,
                label: `Количество ${item.product.name}`,
                "onUpdate:modelValue": ($event) => unref(setQuantity)(item.productId, item.variantId, $event)
              }, null, _parent));
              _push2(`<b class="text-sm">${ssrInterpolate(unref(formatPrice)(item.lineTotal))}</b></div></div></article>`);
            });
            _push2(`<!--]--></div>`);
          }
          _push2(`</div>`);
          if (unref(items).length) {
            _push2(`<footer class="border-t border-border bg-surface p-5 sm:p-6"><div class="mb-5 flex justify-between"><span>Итого</span><b class="text-xl">${ssrInterpolate(unref(formatPrice)(unref(total)))}</b></div><div class="grid gap-3 sm:grid-cols-2">`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/cart",
              class: "btn-secondary",
              onClick: close
            }, {
              default: withCtx((_, _push3, _parent2, _scopeId) => {
                if (_push3) {
                  _push3(`Вся корзина`);
                } else {
                  return [
                    createTextVNode("Вся корзина")
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
                  _push3(`Оформить заказ`);
                } else {
                  return [
                    createTextVNode("Оформить заказ")
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
                  _push3(` Получить КП`);
                } else {
                  return [
                    createVNode(unref(FileText), { class: "h-4 w-4" }),
                    createTextVNode(" Получить КП")
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
      callback: { title: "Заказать звонок", intro: "Оставьте имя и телефон. Мы вам позвоним." },
      design: { title: "Дизайн-проект", intro: "Расскажите, что нужно сделать. Можно добавить файл.", email: "required", file: true },
      message: { title: "Написать нам", intro: "Задайте вопрос или опишите задачу.", email: "optional", message: true },
      manager: { title: "Вызвать менеджера", intro: "Оставьте имя и телефон." },
      tender: { title: "Отправить заявку", intro: "Укажите имя и название организации.", company: true }
    };
    const definition = computed(() => definitions[type.value]);
    watch(isOpen, async (value) => {
      return;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(isOpen)) {
          _push2(`<div class="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/55 p-4"><section role="dialog" aria-modal="true"${ssrRenderAttr("aria-labelledby", `lead-title-${unref(type)}`)} class="relative my-auto w-full max-w-2xl bg-white p-6 shadow-2xl sm:p-9"><button type="button" class="icon-button absolute right-4 top-4" aria-label="Закрыть форму">`);
          _push2(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent));
          _push2(`</button><h2${ssrRenderAttr("id", `lead-title-${unref(type)}`)} class="mb-3 pr-12 text-3xl font-light sm:text-4xl">${ssrInterpolate(unref(definition).title)}</h2><p class="mb-7 max-w-xl text-sm leading-6 text-secondary">${ssrInterpolate(unref(definition).intro)}</p><form class="grid gap-5 sm:grid-cols-2" novalidate><label class="field-label">Имя <span aria-hidden="true">*</span><input${ssrRenderAttr("value", unref(form).name)} autocomplete="name" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).name))}>`);
          if (unref(errors).name) {
            _push2(`<span class="field-error">${ssrInterpolate(unref(errors).name)}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</label><label class="field-label">Телефон <span aria-hidden="true">*</span><input${ssrRenderAttr("value", unref(form).phone)} type="tel" autocomplete="tel" inputmode="tel" placeholder="+7 999 000-00-00" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).phone))}>`);
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
            _push2(`<label class="field-label sm:col-span-2">Название компании <span aria-hidden="true">*</span><input${ssrRenderAttr("value", unref(form).company)} autocomplete="organization" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).company))}>`);
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
            _push2(`<label class="field-label sm:col-span-2">Сообщение<textarea rows="4" class="field-input resize-y">${ssrInterpolate(unref(form).message)}</textarea></label>`);
          } else {
            _push2(`<!---->`);
          }
          if (unref(definition).file) {
            _push2(`<label class="field-label sm:col-span-2">Файл проекта<input type="file" class="field-input file:mr-4 file:border-0 file:bg-surface file:px-3 file:py-2"${ssrRenderAttr("accept", unref(siteConfig).forms.acceptedFileExtensions.join(","))}><span class="mt-1 block text-xs font-normal text-secondary">PDF, DOC(X), XLS(X), JPG или PNG, до 10 МБ.</span>`);
            if (unref(errors).file) {
              _push2(`<span class="field-error">${ssrInterpolate(unref(errors).file)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</label>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<label class="sr-only" aria-hidden="true">Сайт<input${ssrRenderAttr("value", unref(form).website)} tabindex="-1" autocomplete="off"></label><label class="flex items-start gap-3 text-sm leading-5 sm:col-span-2"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).consent) ? ssrLooseContain(unref(form).consent, null) : unref(form).consent) ? " checked" : ""} type="checkbox" class="mt-1 h-4 w-4 accent-accent"><span>Я согласен на `);
          _push2(ssrRenderComponent(_component_NuxtLink, {
            to: "/personal-data-consent",
            class: "underline"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`обработку персональных данных`);
              } else {
                return [
                  createTextVNode("обработку персональных данных")
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
          _push2(`${ssrInterpolate(unref(sending) ? "Проверяем…" : unref(submitted) ? "Форма проверена" : "Отправить")}</button></div></form>`);
          if (unref(result)) {
            _push2(`<p class="mt-6 flex items-start gap-2 border-t border-border pt-5 text-sm leading-6">`);
            if (unref(result).includes("проверены")) {
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
export {
  _default as default
};
//# sourceMappingURL=default-Cl4fplJr.js.map

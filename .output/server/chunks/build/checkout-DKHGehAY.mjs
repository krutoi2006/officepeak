globalThis.__timing__.logStart('Load chunks/build/checkout-DKHGehAY');import { _ as _sfc_main$1 } from './Breadcrumbs-CZBzi1AX.mjs';
import { _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, ref, reactive, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderAttr, ssrLooseContain, ssrRenderList } from 'vue/server-renderer';
import { Loader2, AlertTriangle } from 'lucide-vue-next';
import { u as useShop, f as formatPrice } from './useShop-Ct_x_K-c.mjs';
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
import './site-Dljnoeow.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const { items, total } = useShop();
    const sending = ref(false);
    const result = ref(null);
    const errors = reactive({});
    const form = reactive({ clientType: "organization", name: "", phone: "", email: "", company: "", inn: "", city: "", fulfillment: "delivery", address: "", comment: "", consent: false, website: "" });
    usePageSeo("\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430", "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u044F\u0432\u043A\u0438 \u043F\u043E \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u043C \u0442\u043E\u0432\u0430\u0440\u0430\u043C OFFICEPEAK \u0431\u0435\u0437 \u043E\u043D\u043B\u0430\u0439\u043D-\u043E\u043F\u043B\u0430\u0442\u044B.", "/checkout");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-10 md:py-14" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Breadcrumbs, { items: [{ label: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", to: "/" }, { label: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430", to: "/cart" }, { label: "\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430" }] }, null, _parent));
      if (unref(result)) {
        _push(`<div class="mx-auto max-w-2xl py-16 text-center"><h1 class="mb-5 display-title">\u0417\u0430\u044F\u0432\u043A\u0430 \u043F\u0440\u0438\u043D\u044F\u0442\u0430</h1><p class="mb-4 text-lg">\u041D\u043E\u043C\u0435\u0440 \u0437\u0430\u044F\u0432\u043A\u0438: <b>${ssrInterpolate(unref(result).requestId)}</b></p><p class="mb-8 leading-7 text-secondary">${ssrInterpolate(unref(result).message)}</p><div class="flex flex-wrap justify-center gap-3">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/cart",
          class: "btn-secondary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443`);
            } else {
              return [
                createTextVNode("\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/contacts",
          class: "btn-primary"
        }, {
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
        _push(`</div></div>`);
      } else if (unref(items).length) {
        _push(`<div class="grid gap-12 xl:grid-cols-[1fr_410px]"><div><h1 class="mb-10 display-title">\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430</h1><form id="order-form" class="grid gap-5 sm:grid-cols-2" novalidate><fieldset class="sm:col-span-2"><legend class="mb-3 text-sm font-medium">\u0422\u0438\u043F \u043A\u043B\u0438\u0435\u043D\u0442\u0430</legend><div class="flex flex-wrap gap-3"><label class="flex items-center gap-2 border border-border px-4 py-3 text-sm"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).clientType, "individual")) ? " checked" : ""} type="radio" value="individual"> \u0424\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043B\u0438\u0446\u043E</label><label class="flex items-center gap-2 border border-border px-4 py-3 text-sm"><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).clientType, "organization")) ? " checked" : ""} type="radio" value="organization"> \u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F</label></div></fieldset><label class="field-label">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u043E\u0435 \u043B\u0438\u0446\u043E *<input${ssrRenderAttr("value", unref(form).name)} autocomplete="name" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).name))}>`);
        if (unref(errors).name) {
          _push(`<span class="field-error">${ssrInterpolate(unref(errors).name)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label><label class="field-label">\u0422\u0435\u043B\u0435\u0444\u043E\u043D *<input${ssrRenderAttr("value", unref(form).phone)} type="tel" autocomplete="tel" inputmode="tel" placeholder="+7 999 000-00-00" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).phone))}>`);
        if (unref(errors).phone) {
          _push(`<span class="field-error">${ssrInterpolate(unref(errors).phone)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label><label class="field-label sm:col-span-2">Email *<input${ssrRenderAttr("value", unref(form).email)} type="email" autocomplete="email" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).email))}>`);
        if (unref(errors).email) {
          _push(`<span class="field-error">${ssrInterpolate(unref(errors).email)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label>`);
        if (unref(form).clientType === "organization") {
          _push(`<label class="field-label">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438 *<input${ssrRenderAttr("value", unref(form).company)} autocomplete="organization" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).company))}>`);
          if (unref(errors).company) {
            _push(`<span class="field-error">${ssrInterpolate(unref(errors).company)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</label>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(form).clientType === "organization") {
          _push(`<label class="field-label">\u0418\u041D\u041D <span class="font-normal text-secondary">(\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)</span><input${ssrRenderAttr("value", unref(form).inn)} inputmode="numeric" class="field-input"></label>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<label class="field-label">\u0413\u043E\u0440\u043E\u0434 *<input${ssrRenderAttr("value", unref(form).city)} autocomplete="address-level2" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).city))}>`);
        if (unref(errors).city) {
          _push(`<span class="field-error">${ssrInterpolate(unref(errors).city)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</label><label class="field-label">\u0421\u043F\u043E\u0441\u043E\u0431 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F *<select class="field-input"><option value="delivery"${ssrIncludeBooleanAttr(Array.isArray(unref(form).fulfillment) ? ssrLooseContain(unref(form).fulfillment, "delivery") : ssrLooseEqual(unref(form).fulfillment, "delivery")) ? " selected" : ""}>\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430</option><option value="pickup"${ssrIncludeBooleanAttr(Array.isArray(unref(form).fulfillment) ? ssrLooseContain(unref(form).fulfillment, "pickup") : ssrLooseEqual(unref(form).fulfillment, "pickup")) ? " selected" : ""}>\u0421\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437</option></select></label>`);
        if (unref(form).fulfillment === "delivery") {
          _push(`<label class="field-label sm:col-span-2">\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438 *<input${ssrRenderAttr("value", unref(form).address)} autocomplete="street-address" class="field-input"${ssrRenderAttr("aria-invalid", Boolean(unref(errors).address))}>`);
          if (unref(errors).address) {
            _push(`<span class="field-error">${ssrInterpolate(unref(errors).address)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</label>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<label class="field-label sm:col-span-2">\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439<textarea rows="4" class="field-input resize-y">${ssrInterpolate(unref(form).comment)}</textarea></label><label class="sr-only" aria-hidden="true">\u0421\u0430\u0439\u0442<input${ssrRenderAttr("value", unref(form).website)} tabindex="-1" autocomplete="off"></label><label class="flex items-start gap-3 text-sm leading-5 sm:col-span-2"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).consent) ? ssrLooseContain(unref(form).consent, null) : unref(form).consent) ? " checked" : ""} type="checkbox" class="mt-1 h-4 w-4 accent-accent"><span>\u042F \u0441\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430 `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/personal-data-consent",
          class: "underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445`);
            } else {
              return [
                createTextVNode("\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`.</span></label>`);
        if (unref(errors).consent) {
          _push(`<span class="field-error sm:col-span-2">${ssrInterpolate(unref(errors).consent)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></div><aside class="h-fit bg-surface p-6 sm:p-8 xl:sticky xl:top-36"><h2 class="mb-6 text-2xl font-light">\u0412\u0430\u0448 \u0437\u0430\u043A\u0430\u0437</h2><div class="max-h-72 space-y-4 overflow-y-auto pr-2"><!--[-->`);
        ssrRenderList(unref(items), (item) => {
          _push(`<div class="grid grid-cols-[1fr_auto] gap-4 text-sm"><div><p class="font-medium">${ssrInterpolate(item.product.name)} \xD7 ${ssrInterpolate(item.quantity)}</p><p class="text-xs text-secondary">${ssrInterpolate(item.variant.color.name)}, ${ssrInterpolate(item.variant.dimensions.label)}</p></div><b>${ssrInterpolate(unref(formatPrice)(item.lineTotal))}</b></div>`);
        });
        _push(`<!--]--></div><div class="my-6 border-t border-border"></div><div class="mb-7 flex justify-between text-xl"><span>\u0418\u0442\u043E\u0433\u043E</span><b>${ssrInterpolate(unref(formatPrice)(unref(total)))}</b></div><button form="order-form" type="submit" class="btn-primary w-full"${ssrIncludeBooleanAttr(unref(sending)) ? " disabled" : ""}>`);
        if (unref(sending)) {
          _push(ssrRenderComponent(unref(Loader2), { class: "h-4 w-4 animate-spin" }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`${ssrInterpolate(unref(sending) ? "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" : "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443")}</button><p class="mt-5 flex gap-2 text-xs leading-5 text-secondary">`);
        _push(ssrRenderComponent(unref(AlertTriangle), { class: "mt-0.5 h-4 w-4 shrink-0 text-accent" }, null, _parent));
        _push(`\u041E\u043D\u043B\u0430\u0439\u043D-\u043E\u043F\u043B\u0430\u0442\u0430 \u043D\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F. \u041F\u043E\u043A\u0430 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 CRM/\u043F\u043E\u0447\u0442\u044B \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D, \u0441\u0435\u0440\u0432\u0435\u0440 \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u0430\u043B\u0438\u0434\u0438\u0440\u0443\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0443 \u0438 \u043A\u043E\u0440\u0437\u0438\u043D\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442\u0441\u044F.</p>`);
        if (unref(errors).submit) {
          _push(`<p class="field-error mt-4">${ssrInterpolate(unref(errors).submit)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</aside></div>`);
      } else {
        _push(`<div class="bg-surface p-12 text-center"><h1 class="mb-3 text-4xl font-light">\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430</h1><p class="mb-7 text-secondary">\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0442\u043E\u0432\u0430\u0440\u044B \u0438\u0437 \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalog",
          class: "btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433`);
            } else {
              return [
                createTextVNode("\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/checkout-DKHGehAY');
//# sourceMappingURL=checkout-DKHGehAY.mjs.map

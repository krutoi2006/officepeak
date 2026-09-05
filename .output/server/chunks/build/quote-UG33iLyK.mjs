globalThis.__timing__.logStart('Load chunks/build/quote-UG33iLyK');import { _ as _sfc_main$1 } from './Breadcrumbs-CZBzi1AX.mjs';
import { _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, reactive, ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { Printer, Copy, Share2 } from 'lucide-vue-next';
import { u as useShop, f as formatPrice, a as availabilityLabel } from './useShop-Ct_x_K-c.mjs';
import { s as siteConfig, p as publicOfferDisclaimer } from './site-Dljnoeow.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "quote",
  __ssrInlineRender: true,
  setup(__props) {
    const { items, total } = useShop();
    const client = reactive({ name: "", company: "", email: "", phone: "" });
    const shareStatus = ref("");
    const date = new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" }).format(/* @__PURE__ */ new Date());
    computed(() => [`\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 OFFICEPEAK \u043E\u0442 ${date}`, client.company || client.name || "\u041A\u043B\u0438\u0435\u043D\u0442 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D", ...items.value.map((item) => `${item.product.name}, ${item.variant.article}, ${item.quantity} \u0448\u0442. \u2014 ${formatPrice(item.lineTotal)}`), `\u0418\u0442\u043E\u0433\u043E: ${formatPrice(total.value)}`, siteConfig.phone, siteConfig.email].join("\n"));
    usePageSeo("\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435", "\u041F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043F\u043E \u0442\u043E\u0432\u0430\u0440\u0430\u043C OFFICEPEAK.", "/quote");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-10 md:py-14" }, _attrs))}><div class="no-print">`);
      _push(ssrRenderComponent(_component_Breadcrumbs, { items: [{ label: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", to: "/" }, { label: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430", to: "/cart" }, { label: "\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435" }] }, null, _parent));
      _push(`<div class="mb-8 flex flex-wrap items-end justify-between gap-6"><div><h1 class="display-title">\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435</h1></div>`);
      if (unref(items).length) {
        _push(`<div class="flex flex-wrap gap-2"><button type="button" class="btn-secondary">`);
        _push(ssrRenderComponent(unref(Printer), { class: "h-4 w-4" }, null, _parent));
        _push(` \u041F\u0435\u0447\u0430\u0442\u044C / PDF</button><button type="button" class="btn-secondary">`);
        _push(ssrRenderComponent(unref(Copy), { class: "h-4 w-4" }, null, _parent));
        _push(` \u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C</button><button type="button" class="btn-primary">`);
        _push(ssrRenderComponent(unref(Share2), { class: "h-4 w-4" }, null, _parent));
        _push(` \u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(shareStatus)) {
        _push(`<p class="mb-6 text-sm text-accent">${ssrInterpolate(unref(shareStatus))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(items).length) {
        _push(`<div class="mb-10 grid gap-4 border border-border p-5 sm:grid-cols-2 lg:grid-cols-4"><label class="field-label">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u043E\u0435 \u043B\u0438\u0446\u043E<input${ssrRenderAttr("value", unref(client).name)} class="field-input"></label><label class="field-label">\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F<input${ssrRenderAttr("value", unref(client).company)} class="field-input"></label><label class="field-label">\u0422\u0435\u043B\u0435\u0444\u043E\u043D<input${ssrRenderAttr("value", unref(client).phone)} type="tel" class="field-input"></label><label class="field-label">Email<input${ssrRenderAttr("value", unref(client).email)} type="email" class="field-input"></label></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(items).length) {
        _push(`<article class="quote-sheet mx-auto max-w-6xl border border-border bg-white p-5 sm:p-8 lg:p-12"><header class="mb-10 flex flex-col justify-between gap-6 border-b-2 border-primary pb-7 sm:flex-row sm:items-end"><div><p class="text-2xl font-semibold tracking-[-.06em]">OFFICE<span class="font-light">PEAK</span></p><p class="mt-2 text-xs text-secondary">${ssrInterpolate(unref(siteConfig).tagline)}</p></div><div class="text-sm sm:text-right"><p><b>\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435</b></p><p>${ssrInterpolate(unref(date))}</p></div></header><section class="mb-9 grid gap-3 text-sm sm:grid-cols-2"><div><h2 class="mb-2 text-lg font-medium">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B OFFICEPEAK</h2><p>${ssrInterpolate(unref(siteConfig).phone)}</p><p>${ssrInterpolate(unref(siteConfig).email)}</p></div><div><h2 class="mb-2 text-lg font-medium">\u041A\u043B\u0438\u0435\u043D\u0442</h2><p>${ssrInterpolate(unref(client).company || "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u0430")}</p><p>${ssrInterpolate(unref(client).name || "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u043E\u0435 \u043B\u0438\u0446\u043E \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E")}</p>`);
        if (unref(client).phone) {
          _push(`<p>${ssrInterpolate(unref(client).phone)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(client).email) {
          _push(`<p>${ssrInterpolate(unref(client).email)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></section><h2 class="mb-5 text-2xl font-light">\u0421\u043E\u0441\u0442\u0430\u0432 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F</h2><div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(items), (item) => {
          var _a, _b, _c;
          _push(`<article class="grid gap-4 border-b border-border pb-5 sm:grid-cols-[90px_1fr_auto]"><img${ssrRenderAttr("src", (_c = (_a = item.product.images[item.variant.imageIndex]) == null ? void 0 : _a.src) != null ? _c : (_b = item.product.images[0]) == null ? void 0 : _b.src)}${ssrRenderAttr("alt", item.product.name)} class="aspect-square w-full object-cover"><div><h3 class="font-medium">${ssrInterpolate(item.product.name)}</h3><p class="mt-1 text-xs text-secondary">\u0410\u0440\u0442. ${ssrInterpolate(item.variant.article)}</p><p class="mt-2 text-sm">${ssrInterpolate(item.variant.color.name)} \xB7 ${ssrInterpolate(item.variant.dimensions.label)}</p><p class="${ssrRenderClass([item.variant.availability === "in-stock" ? "text-emerald-700" : "text-amber-700", "mt-1 text-xs"])}">${ssrInterpolate(unref(availabilityLabel)(item.variant.availability))}</p></div><div class="text-sm sm:text-right"><p>${ssrInterpolate(item.quantity)} \xD7 ${ssrInterpolate(unref(formatPrice)(item.variant.price))}</p><b class="mt-2 block">${ssrInterpolate(unref(formatPrice)(item.lineTotal))}</b></div></article>`);
        });
        _push(`<!--]--></div><div class="mt-8 flex justify-end"><div class="w-full max-w-sm border-t-2 border-primary pt-4"><div class="flex justify-between text-xl"><span>\u0418\u0442\u043E\u0433\u043E</span><b>${ssrInterpolate(unref(formatPrice)(unref(total)))}</b></div></div></div><p class="mt-12 text-xs leading-5 text-secondary">${ssrInterpolate(unref(publicOfferDisclaimer))} \u0426\u0435\u043D\u044B \u0438 \u0443\u0441\u043B\u0443\u0433\u0438 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440. \u042D\u0442\u043E \u043D\u0435 \u0441\u0447\u0451\u0442 \u043D\u0430 \u043E\u043F\u043B\u0430\u0442\u0443.</p></article>`);
      } else {
        _push(`<div class="bg-surface p-12 text-center"><h2 class="mb-3 text-3xl font-light">\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043F\u0443\u0441\u0442\u043E</h2><p class="mb-7 text-secondary">\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0442\u043E\u0432\u0430\u0440\u044B \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443.</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/quote.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/quote-UG33iLyK');
//# sourceMappingURL=quote-UG33iLyK.mjs.map

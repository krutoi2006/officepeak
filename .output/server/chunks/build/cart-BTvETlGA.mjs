globalThis.__timing__.logStart('Load chunks/build/cart-BTvETlGA');import { _ as _sfc_main$1 } from './Breadcrumbs-CZBzi1AX.mjs';
import { _ as __nuxt_component_0 } from './server.mjs';
import { _ as _sfc_main$2 } from './QuantityInput-C7yvggq_.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { Trash2, FileText, ShoppingBag } from 'lucide-vue-next';
import { u as useShop, a as availabilityLabel, f as formatPrice } from './useShop-Ct_x_K-c.mjs';
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
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const { items, total, setQuantity } = useShop();
    usePageSeo("\u041A\u043E\u0440\u0437\u0438\u043D\u0430", "\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u0442\u043E\u0432\u0430\u0440\u043E\u0432 OFFICEPEAK \u043F\u0435\u0440\u0435\u0434 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435\u043C \u0437\u0430\u044F\u0432\u043A\u0438 \u0438\u043B\u0438 \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F.", "/cart");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_QuantityInput = _sfc_main$2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-10 md:py-14" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Breadcrumbs, { items: [{ label: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", to: "/" }, { label: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430" }] }, null, _parent));
      _push(`<div class="mb-10"><h1 class="display-title">\u041A\u043E\u0440\u0437\u0438\u043D\u0430</h1></div>`);
      if (unref(items).length) {
        _push(`<div class="grid gap-10 xl:grid-cols-[1fr_370px]"><div class="border-t border-border"><!--[-->`);
        ssrRenderList(unref(items), (item) => {
          _push(`<article class="grid gap-5 border-b border-border py-6 sm:grid-cols-[150px_1fr]">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/product/${item.product.slug}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a, _b, _c, _d, _e, _f;
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", (_c = (_a = item.product.images[item.variant.imageIndex]) == null ? void 0 : _a.src) != null ? _c : (_b = item.product.images[0]) == null ? void 0 : _b.src)}${ssrRenderAttr("alt", item.product.name)} class="aspect-[4/3] w-full object-cover"${_scopeId}>`);
              } else {
                return [
                  createVNode("img", {
                    src: (_f = (_d = item.product.images[item.variant.imageIndex]) == null ? void 0 : _d.src) != null ? _f : (_e = item.product.images[0]) == null ? void 0 : _e.src,
                    alt: item.product.name,
                    class: "aspect-[4/3] w-full object-cover"
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="grid gap-5 md:grid-cols-[1fr_auto]"><div>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/product/${item.product.slug}`,
            class: "text-xl font-medium hover:text-accent"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.product.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.product.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<p class="mt-2 text-sm text-secondary">\u0410\u0440\u0442. ${ssrInterpolate(item.variant.article)}</p><dl class="mt-4 grid gap-1 text-sm"><div class="flex gap-2"><dt class="text-secondary">\u0426\u0432\u0435\u0442:</dt><dd>${ssrInterpolate(item.variant.color.name)}</dd></div><div class="flex gap-2"><dt class="text-secondary">\u0420\u0430\u0437\u043C\u0435\u0440:</dt><dd>${ssrInterpolate(item.variant.dimensions.label)}</dd></div><div class="flex gap-2"><dt class="text-secondary">\u0421\u0442\u0430\u0442\u0443\u0441:</dt><dd class="${ssrRenderClass(item.variant.availability === "in-stock" ? "text-emerald-700" : "text-amber-700")}">${ssrInterpolate(unref(availabilityLabel)(item.variant.availability))}</dd></div></dl></div><div class="flex flex-row items-center justify-between gap-4 md:flex-col md:items-end"><button type="button" class="inline-flex items-center gap-2 text-xs text-secondary hover:text-primary">`);
          _push(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent));
          _push(` \u0423\u0434\u0430\u043B\u0438\u0442\u044C</button>`);
          _push(ssrRenderComponent(_component_QuantityInput, {
            "model-value": item.quantity,
            label: `\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E ${item.product.name}`,
            "onUpdate:modelValue": ($event) => unref(setQuantity)(item.productId, item.variantId, $event)
          }, null, _parent));
          _push(`<b>${ssrInterpolate(unref(formatPrice)(item.lineTotal))}</b></div></div></article>`);
        });
        _push(`<!--]--></div><aside class="h-fit bg-surface p-6 sm:p-8 xl:sticky xl:top-36"><h2 class="mb-6 text-2xl font-light">\u0418\u0442\u043E\u0433\u043E</h2><div class="mb-7 flex justify-between border-b border-border pb-6"><span class="text-secondary">\u0421\u0443\u043C\u043C\u0430 \u0442\u043E\u0432\u0430\u0440\u043E\u0432</span><b class="text-xl">${ssrInterpolate(unref(formatPrice)(unref(total)))}</b></div><p class="mb-6 text-xs leading-5 text-secondary">\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442 \u0446\u0435\u043D\u0443 \u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430.</p><div class="grid gap-3">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/checkout",
          class: "btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437`);
            } else {
              return [
                createTextVNode("\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/quote",
          class: "btn-secondary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(FileText), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(` \u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u041A\u041F`);
            } else {
              return [
                createVNode(unref(FileText), { class: "h-4 w-4" }),
                createTextVNode(" \u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u041A\u041F")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></aside></div>`);
      } else {
        _push(`<div class="flex min-h-[48vh] flex-col items-center justify-center bg-surface p-8 text-center">`);
        _push(ssrRenderComponent(unref(ShoppingBag), { class: "mb-6 h-14 w-14 stroke-1 text-secondary" }, null, _parent));
        _push(`<h2 class="mb-3 text-3xl font-light">\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430</h2><p class="mb-7 max-w-md text-secondary">\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0442\u043E\u0432\u0430\u0440\u044B \u0438\u0437 \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0430.</p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/cart-BTvETlGA');
//# sourceMappingURL=cart-BTvETlGA.mjs.map

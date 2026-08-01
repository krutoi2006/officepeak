globalThis.__timing__.logStart('Load chunks/build/checkout-6eCYOKfX');import { _ as __nuxt_component_0 } from './nuxt-link-rH_ixKZi.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue/server-renderer/index.mjs';
import { u as useShop, f as formatPrice } from './useShop-BLxPHoy8.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ufo/dist/index.mjs';
import './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const { cart, total } = useShop();
    const sent = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-16" }, _attrs))}>`);
      if (unref(sent)) {
        _push(`<div class="mx-auto max-w-2xl py-20 text-center"><p class="mb-3 text-xs uppercase tracking-widest text-secondary">\u0421\u043F\u0430\u0441\u0438\u0431\u043E</p><h1 class="mb-5 text-5xl font-light">\u0417\u0430\u043A\u0430\u0437 \u043F\u0440\u0438\u043D\u044F\u0442</h1><p class="mb-8 text-secondary">\u041C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0434\u043B\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0434\u0435\u0442\u0430\u043B\u0435\u0439.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalog",
          class: "btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433`);
            } else {
              return [
                createTextVNode("\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="grid gap-14 lg:grid-cols-[1fr_420px]"><div><h1 class="mb-10 text-5xl font-light">\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430</h1><form id="order" class="grid gap-5 md:grid-cols-2"><label class="text-sm">\u0418\u043C\u044F<input required class="mt-2 w-full border border-border p-3 outline-none focus:border-primary"></label><label class="text-sm">\u0422\u0435\u043B\u0435\u0444\u043E\u043D<input required class="mt-2 w-full border border-border p-3 outline-none focus:border-primary"></label><label class="text-sm md:col-span-2">E-mail<input type="email" required class="mt-2 w-full border border-border p-3 outline-none focus:border-primary"></label><label class="text-sm md:col-span-2">\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438<textarea class="mt-2 w-full border border-border p-3 outline-none focus:border-primary" rows="4"></textarea></label></form></div><aside class="h-fit bg-surface p-7"><h2 class="mb-6 text-xl">\u0412\u0430\u0448 \u0437\u0430\u043A\u0430\u0437</h2><!--[-->`);
        ssrRenderList(unref(cart), (item) => {
          _push(`<div class="mb-4 flex justify-between gap-4 text-sm"><span>${ssrInterpolate(item.name)} \xD7 ${ssrInterpolate(item.quantity)}</span><b>${ssrInterpolate(unref(formatPrice)(item.price * item.quantity))}</b></div>`);
        });
        _push(`<!--]--><div class="my-6 border-t border-border"></div><div class="mb-7 flex justify-between text-xl"><span>\u0418\u0442\u043E\u0433\u043E</span><b>${ssrInterpolate(unref(formatPrice)(unref(total)))}</b></div><button form="order" class="btn-primary w-full"${ssrIncludeBooleanAttr(!unref(cart).length) ? " disabled" : ""}>\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437</button></aside></div>`);
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

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/checkout-6eCYOKfX');
//# sourceMappingURL=checkout-6eCYOKfX.mjs.map

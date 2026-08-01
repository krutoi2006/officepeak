globalThis.__timing__.logStart('Load chunks/build/_id_-DTSfYhR2');import { defineComponent, computed, ref, watchEffect, unref, mergeProps, useSSRContext } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrIncludeBooleanAttr } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue/server-renderer/index.mjs';
import { Minus, Plus, Heart, Truck } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';
import { p as products, u as useShop, c as categories, f as formatPrice } from './useShop-BLxPHoy8.mjs';
import { u as useRoute } from './server.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/h3/dist/index.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ufo/dist/index.mjs';
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
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const product = computed(() => products.find((p) => p.id === route.params.id));
    const qty = ref(1);
    const color = ref("");
    const { favorites } = useShop();
    watchEffect(() => {
      var _a;
      if (product.value && !color.value) color.value = (_a = product.value.colors[0]) != null ? _a : "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      if (unref(product)) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-12" }, _attrs))}><p class="mb-8 text-xs text-secondary">\u0413\u043B\u0430\u0432\u043D\u0430\u044F / ${ssrInterpolate((_a = unref(categories).find((c) => c.id === unref(product).categoryId)) == null ? void 0 : _a.name)} / ${ssrInterpolate(unref(product).name)}</p><div class="grid gap-10 lg:grid-cols-2 lg:gap-20"><div class="aspect-[4/5] bg-surface"><img${ssrRenderAttr("src", unref(product).image)}${ssrRenderAttr("alt", unref(product).name)} class="h-full w-full object-cover"></div><div class="py-4"><p class="mb-4 text-xs uppercase tracking-wider text-secondary">\u0410\u0440\u0442\u0438\u043A\u0443\u043B ${ssrInterpolate(unref(product).article)}</p><h1 class="mb-6 text-4xl font-light leading-tight md:text-5xl">${ssrInterpolate(unref(product).name)}</h1><div class="mb-10 flex gap-3 text-xl"><b>${ssrInterpolate(unref(formatPrice)(unref(product).price))}</b>`);
        if (unref(product).oldPrice) {
          _push(`<s class="text-secondary">${ssrInterpolate(unref(formatPrice)(unref(product).oldPrice))}</s>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mb-8"><p class="mb-3 text-sm font-medium">\u0426\u0432\u0435\u0442: ${ssrInterpolate(unref(color))}</p><div class="flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(unref(product).colors, (c) => {
          _push(`<button class="${ssrRenderClass([c === unref(color) ? "border-primary" : "border-border", "border px-4 py-2 text-sm"])}">${ssrInterpolate(c)}</button>`);
        });
        _push(`<!--]--></div></div><div class="mb-6 flex gap-3"><div class="flex items-center border border-border"><button class="p-3">`);
        _push(ssrRenderComponent(unref(Minus), { class: "h-4" }, null, _parent));
        _push(`</button><span class="w-8 text-center">${ssrInterpolate(unref(qty))}</span><button class="p-3">`);
        _push(ssrRenderComponent(unref(Plus), { class: "h-4" }, null, _parent));
        _push(`</button></div><button class="btn-primary flex-1"${ssrIncludeBooleanAttr(!unref(product).inStock) ? " disabled" : ""}>${ssrInterpolate(unref(product).inStock ? "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443" : "\u041F\u043E\u0434 \u0437\u0430\u043A\u0430\u0437")}</button><button class="border border-border p-3">`);
        _push(ssrRenderComponent(unref(Heart), {
          class: unref(favorites).includes(unref(product).id) && "fill-primary"
        }, null, _parent));
        _push(`</button></div><div class="flex items-center gap-3 border-t border-border py-6 text-sm">`);
        _push(ssrRenderComponent(unref(Truck), null, null, _parent));
        _push(`<span>\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430 \u043F\u043E \u041C\u043E\u0441\u043A\u0432\u0435 \u043E\u0442 2 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u0434\u043D\u0435\u0439</span></div><p class="leading-7 text-secondary">\u041B\u0430\u043A\u043E\u043D\u0438\u0447\u043D\u0430\u044F \u0433\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u044F, \u0434\u043E\u043B\u0433\u043E\u0432\u0435\u0447\u043D\u044B\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u0438 \u043F\u0440\u043E\u0434\u0443\u043C\u0430\u043D\u043D\u0430\u044F \u044D\u0440\u0433\u043E\u043D\u043E\u043C\u0438\u043A\u0430. \u041F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0434\u043B\u044F \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445 \u0440\u0430\u0431\u043E\u0447\u0438\u0445 \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432.</p></div></div></section>`);
      } else {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-24" }, _attrs))}><h1 class="text-4xl">\u0422\u043E\u0432\u0430\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D</h1></section>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/_id_-DTSfYhR2');
//# sourceMappingURL=_id_-DTSfYhR2.mjs.map

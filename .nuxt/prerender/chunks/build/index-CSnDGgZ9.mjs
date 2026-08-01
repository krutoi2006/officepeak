globalThis.__timing__.logStart('Load chunks/build/index-CSnDGgZ9');import { _ as __nuxt_component_0 } from './nuxt-link-rH_ixKZi.mjs';
import { _ as _sfc_main$1 } from './ProductCard-VbsXtiXX.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue/server-renderer/index.mjs';
import { c as categories, p as products } from './useShop-BLxPHoy8.mjs';
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
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ProductCard = _sfc_main$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-14" }, _attrs))}><p class="mb-5 text-xs text-secondary">\u0413\u043B\u0430\u0432\u043D\u0430\u044F / \u041A\u0430\u0442\u0430\u043B\u043E\u0433</p><h1 class="mb-4 text-5xl font-light">\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u043C\u0435\u0431\u0435\u043B\u0438</h1><p class="mb-12 max-w-2xl text-secondary">\u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u043E\u0444\u0438\u0441\u043E\u0432, \u043F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043D\u044B\u0445 \u0438 \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445 \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432.</p><div class="mb-14 flex gap-3 overflow-auto pb-2"><!--[-->`);
      ssrRenderList(unref(categories), (c) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: c.id,
          to: `/catalog/${c.slug}`,
          class: "whitespace-nowrap border border-border px-4 py-2 text-sm hover:border-primary"
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
      _push(`<!--]--></div><div class="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4"><!--[-->`);
      ssrRenderList(unref(products), (p) => {
        _push(ssrRenderComponent(_component_ProductCard, {
          key: p.id,
          product: p
        }, null, _parent));
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/index-CSnDGgZ9');
//# sourceMappingURL=index-CSnDGgZ9.mjs.map

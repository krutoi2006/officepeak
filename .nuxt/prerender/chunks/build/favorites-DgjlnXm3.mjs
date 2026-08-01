globalThis.__timing__.logStart('Load chunks/build/favorites-DgjlnXm3');import { _ as _sfc_main$1 } from './ProductCard-VbsXtiXX.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue/server-renderer/index.mjs';
import { u as useShop, p as products } from './useShop-BLxPHoy8.mjs';
import './nuxt-link-rH_ixKZi.mjs';
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
  __name: "favorites",
  __ssrInlineRender: true,
  setup(__props) {
    const { favorites } = useShop();
    const list = computed(() => products.filter((product) => favorites.value.includes(product.id)));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductCard = _sfc_main$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-16" }, _attrs))}><h1 class="mb-12 text-5xl font-light">\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435</h1>`);
      if (unref(list).length) {
        _push(`<div class="grid grid-cols-2 gap-4 lg:grid-cols-4"><!--[-->`);
        ssrRenderList(unref(list), (product) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: product.id,
            product
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<p class="bg-surface p-12 text-center text-secondary">\u0412\u044B \u043F\u043E\u043A\u0430 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u0434\u043E\u0431\u0430\u0432\u0438\u043B\u0438 \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435.</p>`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/favorites.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/favorites-DgjlnXm3');
//# sourceMappingURL=favorites-DgjlnXm3.mjs.map

globalThis.__timing__.logStart('Load chunks/build/_slug_-C1epasIg');import { _ as _sfc_main$1 } from './ProductCard-VbsXtiXX.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/vue/server-renderer/index.mjs';
import { c as categories, p as products } from './useShop-BLxPHoy8.mjs';
import { u as useRoute } from './server.mjs';
import './nuxt-link-rH_ixKZi.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/ufo/dist/index.mjs';
import 'file://C:/Users/Krutoi2006/newOFFICEPEAK/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const category = computed(() => categories.find((c) => c.slug === route.params.slug));
    const filtered = computed(() => products.filter((p) => {
      var _a;
      return p.categoryId === ((_a = category.value) == null ? void 0 : _a.id);
    }));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_ProductCard = _sfc_main$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-14" }, _attrs))}><p class="mb-5 text-xs text-secondary">\u0413\u043B\u0430\u0432\u043D\u0430\u044F / \u041A\u0430\u0442\u0430\u043B\u043E\u0433 / ${ssrInterpolate((_a = unref(category)) == null ? void 0 : _a.name)}</p><h1 class="mb-12 text-5xl font-light">${ssrInterpolate(((_b = unref(category)) == null ? void 0 : _b.name) || "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F")}</h1>`);
      if (unref(filtered).length) {
        _push(`<div class="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4"><!--[-->`);
        ssrRenderList(unref(filtered), (p) => {
          _push(ssrRenderComponent(_component_ProductCard, {
            key: p.id,
            product: p
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="bg-surface p-12 text-center text-secondary">\u0422\u043E\u0432\u0430\u0440\u044B \u044D\u0442\u043E\u0439 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u0441\u043A\u043E\u0440\u043E \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F.</div>`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalog/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/_slug_-C1epasIg');
//# sourceMappingURL=_slug_-C1epasIg.mjs.map

import { _ as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { ArrowUpRight } from "lucide-vue-next";
import { f as formatPrice } from "./useShop-Ct_x_K-c.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CollectionCard",
  __ssrInlineRender: true,
  props: {
    collection: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "group flex h-full flex-col border border-border bg-white" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/collections/${__props.collection.slug}`,
        class: "relative block aspect-[4/3] overflow-hidden bg-surface"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", __props.collection.image.src)}${ssrRenderAttr("alt", __props.collection.image.alt)} loading="lazy" class="h-full w-full object-cover transition duration-700 group-hover:scale-105"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: __props.collection.image.src,
                alt: __props.collection.image.alt,
                loading: "lazy",
                class: "h-full w-full object-cover transition duration-700 group-hover:scale-105"
              }, null, 8, ["src", "alt"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-1 flex-col p-5"><div class="mb-4 flex items-start justify-between gap-4"><h3 class="text-2xl font-light">${ssrInterpolate(__props.collection.name)}</h3><span class="text-sm text-secondary">от ${ssrInterpolate(unref(formatPrice)(__props.collection.priceFrom))}</span></div><div class="mb-6 flex gap-2"${ssrRenderAttr("aria-label", `Цвета коллекции ${__props.collection.name}`)}><!--[-->`);
      ssrRenderList(__props.collection.colors, (item) => {
        _push(`<span class="h-4 w-4 rounded-full border border-black/10" style="${ssrRenderStyle({ backgroundColor: item.hex })}"${ssrRenderAttr("title", item.name)}></span>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/collections/${__props.collection.slug}`,
        class: "mt-auto inline-flex items-center gap-2 text-sm font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Подробнее `);
            _push2(ssrRenderComponent(unref(ArrowUpRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Подробнее "),
              createVNode(unref(ArrowUpRight), { class: "h-4 w-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CollectionCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=CollectionCard--dUroSxt.js.map

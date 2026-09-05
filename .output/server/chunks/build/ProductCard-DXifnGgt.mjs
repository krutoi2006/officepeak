globalThis.__timing__.logStart('Load chunks/build/ProductCard-DXifnGgt');import { _ as __nuxt_component_0 } from './server.mjs';
import { _ as _sfc_main$1 } from './QuantityInput-C7yvggq_.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { Heart, ShoppingBag } from 'lucide-vue-next';
import { u as useShop, h as categoryById, a as availabilityLabel, f as formatPrice } from './useShop-Ct_x_K-c.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const { favorites } = useShop();
    const selectedVariantId = ref((_b = (_a = props.product.variants[0]) == null ? void 0 : _a.id) != null ? _b : "");
    const quantity = ref(1);
    const variant = computed(() => {
      var _a2;
      return (_a2 = props.product.variants.find((item) => item.id === selectedVariantId.value)) != null ? _a2 : props.product.variants[0];
    });
    const category = computed(() => categoryById(props.product.categoryId));
    const productImage = computed(() => {
      var _a2;
      return (_a2 = props.product.images[variant.value.imageIndex]) != null ? _a2 : props.product.images[0];
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_QuantityInput = _sfc_main$1;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "product-card group flex h-full min-w-0 flex-col" }, _attrs))}><div class="relative mb-4 aspect-[4/3] overflow-hidden bg-surface">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/product/${__props.product.slug}`,
        class: "block h-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", unref(productImage).src)}${ssrRenderAttr("alt", unref(productImage).alt)} loading="lazy" class="h-full w-full object-cover transition duration-700 group-hover:scale-105"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: unref(productImage).src,
                alt: unref(productImage).alt,
                loading: "lazy",
                class: "h-full w-full object-cover transition duration-700 group-hover:scale-105"
              }, null, 8, ["src", "alt"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.product.isNew) {
        _push(`<span class="absolute left-3 top-3 bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">\u041D\u043E\u0432\u0438\u043D\u043A\u0430</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="icon-button absolute right-3 top-3 bg-white/90"${ssrRenderAttr("aria-label", unref(favorites).includes(__props.product.id) ? "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0438\u0437 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E" : "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435")}>`);
      _push(ssrRenderComponent(unref(Heart), {
        class: ["h-4 w-4", unref(favorites).includes(__props.product.id) && "fill-current text-accent"]
      }, null, _parent));
      _push(`</button></div><p class="mb-1 text-[11px] uppercase tracking-[.14em] text-secondary">${ssrInterpolate((_a2 = unref(category)) == null ? void 0 : _a2.name)}</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/product/${__props.product.slug}`,
        class: "mb-2 text-base font-medium leading-snug hover:text-accent"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.product.name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.product.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="mb-3 text-xs text-secondary">\u0410\u0440\u0442. ${ssrInterpolate(unref(variant).article)} \xB7 ${ssrInterpolate(unref(variant).dimensions.label)}</p><div class="mb-3 flex items-center justify-between gap-2"><span class="${ssrRenderClass([unref(variant).availability === "in-stock" ? "status-in-stock" : "status-on-order", "status-pill"])}">${ssrInterpolate(unref(availabilityLabel)(unref(variant).availability))}</span><select class="max-w-[56%] border-0 bg-transparent py-1 text-right text-xs text-secondary"${ssrRenderAttr("aria-label", `\u0412\u0430\u0440\u0438\u0430\u043D\u0442 ${__props.product.name}`)}><!--[-->`);
      ssrRenderList(__props.product.variants, (item) => {
        _push(`<option${ssrRenderAttr("value", item.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedVariantId)) ? ssrLooseContain(unref(selectedVariantId), item.id) : ssrLooseEqual(unref(selectedVariantId), item.id)) ? " selected" : ""}>${ssrInterpolate(item.color.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="mb-4 mt-auto flex items-baseline gap-2"><strong>${ssrInterpolate(unref(formatPrice)(unref(variant).price))}</strong>`);
      if (unref(variant).oldPrice) {
        _push(`<s class="text-sm text-secondary">${ssrInterpolate(unref(formatPrice)(unref(variant).oldPrice))}</s>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-[auto_1fr] gap-2">`);
      _push(ssrRenderComponent(_component_QuantityInput, {
        modelValue: unref(quantity),
        "onUpdate:modelValue": ($event) => isRef(quantity) ? quantity.value = $event : null,
        label: `\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E ${__props.product.name}`
      }, null, _parent));
      _push(`<button type="button" class="btn-primary px-3">`);
      _push(ssrRenderComponent(unref(ShoppingBag), { class: "h-4 w-4" }, null, _parent));
      _push(` \u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443 </button></div></article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };;globalThis.__timing__.logEnd('Load chunks/build/ProductCard-DXifnGgt');
//# sourceMappingURL=ProductCard-DXifnGgt.mjs.map

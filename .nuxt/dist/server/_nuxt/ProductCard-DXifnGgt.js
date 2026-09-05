import { _ as __nuxt_component_0 } from "../server.mjs";
import { _ as _sfc_main$1 } from "./QuantityInput-C7yvggq_.js";
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, isRef, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { Heart, ShoppingBag } from "lucide-vue-next";
import { u as useShop, h as categoryById, a as availabilityLabel, f as formatPrice } from "./useShop-Ct_x_K-c.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  setup(__props) {
    const props = __props;
    const { favorites } = useShop();
    const selectedVariantId = ref(props.product.variants[0]?.id ?? "");
    const quantity = ref(1);
    const variant = computed(() => props.product.variants.find((item) => item.id === selectedVariantId.value) ?? props.product.variants[0]);
    const category = computed(() => categoryById(props.product.categoryId));
    const productImage = computed(() => props.product.images[variant.value.imageIndex] ?? props.product.images[0]);
    return (_ctx, _push, _parent, _attrs) => {
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
        _push(`<span class="absolute left-3 top-3 bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Новинка</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="button" class="icon-button absolute right-3 top-3 bg-white/90"${ssrRenderAttr("aria-label", unref(favorites).includes(__props.product.id) ? "Удалить из избранного" : "Добавить в избранное")}>`);
      _push(ssrRenderComponent(unref(Heart), {
        class: ["h-4 w-4", unref(favorites).includes(__props.product.id) && "fill-current text-accent"]
      }, null, _parent));
      _push(`</button></div><p class="mb-1 text-[11px] uppercase tracking-[.14em] text-secondary">${ssrInterpolate(unref(category)?.name)}</p>`);
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
      _push(`<p class="mb-3 text-xs text-secondary">Арт. ${ssrInterpolate(unref(variant).article)} · ${ssrInterpolate(unref(variant).dimensions.label)}</p><div class="mb-3 flex items-center justify-between gap-2"><span class="${ssrRenderClass([unref(variant).availability === "in-stock" ? "status-in-stock" : "status-on-order", "status-pill"])}">${ssrInterpolate(unref(availabilityLabel)(unref(variant).availability))}</span><select class="max-w-[56%] border-0 bg-transparent py-1 text-right text-xs text-secondary"${ssrRenderAttr("aria-label", `Вариант ${__props.product.name}`)}><!--[-->`);
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
        label: `Количество ${__props.product.name}`
      }, null, _parent));
      _push(`<button type="button" class="btn-primary px-3">`);
      _push(ssrRenderComponent(unref(ShoppingBag), { class: "h-4 w-4" }, null, _parent));
      _push(` В корзину </button></div></article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=ProductCard-DXifnGgt.js.map

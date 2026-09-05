import { defineComponent, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { Minus, Plus } from "lucide-vue-next";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "QuantityInput",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    label: { default: "Количество" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "inline-flex h-11 items-center border border-border",
        role: "group",
        "aria-label": __props.label
      }, _attrs))}><button type="button" class="icon-button h-full rounded-none"${ssrRenderAttr("aria-label", `Уменьшить: ${__props.label}`)}>`);
      _push(ssrRenderComponent(unref(Minus), { class: "h-4 w-4" }, null, _parent));
      _push(`</button><input${ssrRenderAttr("value", __props.modelValue)} type="number" min="1" max="999" inputmode="numeric" class="h-full w-12 border-x border-border bg-transparent text-center text-sm outline-none"${ssrRenderAttr("aria-label", __props.label)}><button type="button" class="icon-button h-full rounded-none"${ssrRenderAttr("aria-label", `Увеличить: ${__props.label}`)}>`);
      _push(ssrRenderComponent(unref(Plus), { class: "h-4 w-4" }, null, _parent));
      _push(`</button></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuantityInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=QuantityInput-C7yvggq_.js.map

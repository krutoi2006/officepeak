import { _ as _sfc_main$1 } from "./Breadcrumbs-CZBzi1AX.js";
import { defineComponent, ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { LockKeyhole } from "lucide-vue-next";
import { u as usePageSeo } from "./usePageSeo-9zNTc1yH.js";
import "../server.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/hookable/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/unctx/dist/index.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/defu/dist/defu.mjs";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/ufo/dist/index.mjs";
import "./site-Dljnoeow.js";
import "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "account",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    const message = ref("");
    usePageSeo("Личный кабинет", "Интерфейс входа в будущий личный кабинет OFFICEPEAK.", "/account");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-10 md:py-16" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Breadcrumbs, { items: [{ label: "Главная", to: "/" }, { label: "Личный кабинет" }] }, null, _parent));
      _push(`<div class="mx-auto grid max-w-5xl overflow-hidden border border-border lg:grid-cols-2"><div class="bg-primary p-8 text-white sm:p-12">`);
      _push(ssrRenderComponent(unref(LockKeyhole), { class: "mb-20 h-9 w-9 stroke-1 text-accentSoft" }, null, _parent));
      _push(`<h1 class="mb-5 text-4xl font-light">Личный кабинет</h1><p class="max-w-md leading-7 text-white/60">Здесь можно будет сохранять проекты и заказы.</p></div><div class="p-8 sm:p-12"><h2 class="mb-7 text-3xl font-light">Вход</h2><form class="space-y-5"><label class="field-label">Email<input${ssrRenderAttr("value", unref(email))} type="email" autocomplete="email" required class="field-input"></label><label class="field-label">Пароль<input${ssrRenderAttr("value", unref(password))} type="password" autocomplete="current-password" required class="field-input"></label><button type="submit" class="btn-primary w-full">Войти</button></form>`);
      if (unref(message)) {
        _push(`<p class="mt-6 border-t border-border pt-5 text-sm leading-6 text-secondary">${ssrInterpolate(unref(message))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="mt-6 text-xs leading-5 text-secondary">Вход и регистрация пока не работают.</p></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=account-AGAPmCCM.js.map

globalThis.__timing__.logStart('Load chunks/build/account-AGAPmCCM');import { _ as _sfc_main$1 } from './Breadcrumbs-CZBzi1AX.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { LockKeyhole } from 'lucide-vue-next';
import { u as usePageSeo } from './usePageSeo-9zNTc1yH.mjs';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import './site-Dljnoeow.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "account",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    const message = ref("");
    usePageSeo("\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442", "\u0418\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u0432\u0445\u043E\u0434\u0430 \u0432 \u0431\u0443\u0434\u0443\u0449\u0438\u0439 \u043B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 OFFICEPEAK.", "/account");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Breadcrumbs = _sfc_main$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "container-page py-10 md:py-16" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_Breadcrumbs, { items: [{ label: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", to: "/" }, { label: "\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442" }] }, null, _parent));
      _push(`<div class="mx-auto grid max-w-5xl overflow-hidden border border-border lg:grid-cols-2"><div class="bg-primary p-8 text-white sm:p-12">`);
      _push(ssrRenderComponent(unref(LockKeyhole), { class: "mb-20 h-9 w-9 stroke-1 text-accentSoft" }, null, _parent));
      _push(`<h1 class="mb-5 text-4xl font-light">\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442</h1><p class="max-w-md leading-7 text-white/60">\u0417\u0434\u0435\u0441\u044C \u043C\u043E\u0436\u043D\u043E \u0431\u0443\u0434\u0435\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442\u044B \u0438 \u0437\u0430\u043A\u0430\u0437\u044B.</p></div><div class="p-8 sm:p-12"><h2 class="mb-7 text-3xl font-light">\u0412\u0445\u043E\u0434</h2><form class="space-y-5"><label class="field-label">Email<input${ssrRenderAttr("value", unref(email))} type="email" autocomplete="email" required class="field-input"></label><label class="field-label">\u041F\u0430\u0440\u043E\u043B\u044C<input${ssrRenderAttr("value", unref(password))} type="password" autocomplete="current-password" required class="field-input"></label><button type="submit" class="btn-primary w-full">\u0412\u043E\u0439\u0442\u0438</button></form>`);
      if (unref(message)) {
        _push(`<p class="mt-6 border-t border-border pt-5 text-sm leading-6 text-secondary">${ssrInterpolate(unref(message))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="mt-6 text-xs leading-5 text-secondary">\u0412\u0445\u043E\u0434 \u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u043F\u043E\u043A\u0430 \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442.</p></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/account-AGAPmCCM');
//# sourceMappingURL=account-AGAPmCCM.mjs.map

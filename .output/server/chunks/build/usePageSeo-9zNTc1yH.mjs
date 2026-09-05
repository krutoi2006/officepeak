globalThis.__timing__.logStart('Load chunks/build/usePageSeo-9zNTc1yH');import { s as siteConfig } from './site-Dljnoeow.mjs';
import { computed, toValue, hasInjectionContext, inject } from 'vue';
import { t as tryUseNuxtApp } from './server.mjs';
import { u as useHead$1, a as useSeoMeta$1, h as headSymbol } from '../routes/renderer.mjs';

function injectHead(nuxtApp) {
  var _a;
  const nuxt = nuxtApp || tryUseNuxtApp();
  return ((_a = nuxt == null ? void 0 : nuxt.ssrContext) == null ? void 0 : _a.head) || (nuxt == null ? void 0 : nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      return inject(headSymbol);
    }
  }));
}
function useHead(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useHead$1(input, { head, ...options });
  }
}
function useSeoMeta(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useSeoMeta$1(input, { head, ...options });
  }
}
const usePageSeo = (title, description, path) => {
  const resolvedTitle = computed(() => `${toValue(title)} | ${siteConfig.name}`);
  const resolvedDescription = computed(() => toValue(description));
  const canonical = computed(() => new URL(toValue(path), siteConfig.siteUrl).toString());
  useSeoMeta({ title: resolvedTitle, description: resolvedDescription, ogTitle: resolvedTitle, ogDescription: resolvedDescription, ogType: "website", ogUrl: canonical });
  useHead({ link: [{ rel: "canonical", href: canonical }] });
};

export { useHead as a, usePageSeo as u };;globalThis.__timing__.logEnd('Load chunks/build/usePageSeo-9zNTc1yH');
//# sourceMappingURL=usePageSeo-9zNTc1yH.mjs.map

import { s as siteConfig } from "./site-Dljnoeow.js";
import { hasInjectionContext, inject, computed, toValue } from "vue";
import { useHead as useHead$1, useSeoMeta as useSeoMeta$1, headSymbol } from "C:/Users/Krutoi2006/Desktop/newOFFICEPEAK/node_modules/@unhead/vue/dist/index.mjs";
import { t as tryUseNuxtApp } from "../server.mjs";
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || tryUseNuxtApp();
  return nuxt?.ssrContext?.head || nuxt?.runWithContext(() => {
    if (hasInjectionContext()) {
      return inject(headSymbol);
    }
  });
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
export {
  useHead as a,
  usePageSeo as u
};
//# sourceMappingURL=usePageSeo-9zNTc1yH.js.map

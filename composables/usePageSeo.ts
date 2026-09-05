import { siteConfig } from '~/config/site'

export const usePageSeo = (title: MaybeRefOrGetter<string>, description: MaybeRefOrGetter<string>, path: MaybeRefOrGetter<string>) => {
  const resolvedTitle = computed(() => `${toValue(title)} | ${siteConfig.name}`)
  const resolvedDescription = computed(() => toValue(description))
  const canonical = computed(() => new URL(toValue(path), siteConfig.siteUrl).toString())
  useSeoMeta({ title: resolvedTitle, description: resolvedDescription, ogTitle: resolvedTitle, ogDescription: resolvedDescription, ogType: 'website', ogUrl: canonical })
  useHead({ link: [{ rel: 'canonical', href: canonical }] })
}

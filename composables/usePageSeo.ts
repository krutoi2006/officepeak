import { siteConfig } from '~/config/site'
import { truncateSeoText } from '~/utils/seo'

interface PageSeoOptions {
  image?: MaybeRefOrGetter<string | undefined>
  noindex?: MaybeRefOrGetter<boolean>
  type?: 'website' | 'article'
}

export const usePageSeo = (
  title: MaybeRefOrGetter<string>,
  description: MaybeRefOrGetter<string>,
  path: MaybeRefOrGetter<string>,
  options: PageSeoOptions = {},
) => {
  const resolvedTitle = computed(() => `${toValue(title)} | ${siteConfig.name}`)
  const resolvedDescription = computed(() => truncateSeoText(toValue(description)))
  const canonical = computed(() => new URL(toValue(path), siteConfig.siteUrl).toString())
  const image = computed(() => toValue(options.image) || siteConfig.defaultOgImage)
  const robots = computed(() => toValue(options.noindex ?? false) ? 'noindex, follow' : 'index, follow')
  useSeoMeta({
    title: resolvedTitle,
    description: resolvedDescription,
    robots,
    ogTitle: resolvedTitle,
    ogDescription: resolvedDescription,
    ogType: options.type ?? 'website',
    ogUrl: canonical,
    ogImage: image,
    ogImageAlt: resolvedTitle,
    ogLocale: 'ru_RU',
    twitterCard: 'summary_large_image',
    twitterTitle: resolvedTitle,
    twitterDescription: resolvedDescription,
    twitterImage: image,
  })
  useHead({ link: [{ rel: 'canonical', href: canonical }] })
}

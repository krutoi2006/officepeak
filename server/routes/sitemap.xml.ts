import { loadCatalogState } from '~/server/utils/catalogRepository'
import { siteConfig } from '~/config/site'

export default defineEventHandler(async (event) => {
  const { snapshot } = await loadCatalogState()
  const staticPages = ['', 'catalog', 'government', 'business', 'designers', 'custom-furniture', 'design-project', 'payment', 'delivery', 'lifting', 'assembly', 'warranty', 'returns', 'contacts', 'privacy', 'cookie-policy', 'personal-data-consent']
  const paths = [...new Set([
    ...staticPages.map(path => `/${path}`),
    ...snapshot.categories.map(item => `/catalog/${item.slug}`),
    ...snapshot.collections.map(item => `/collections/${item.slug}`),
    ...snapshot.products.map(item => `/product/${item.slug}`),
  ])]
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600, stale-while-revalidate=86400')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path => `  <url><loc>${new URL(path, siteConfig.siteUrl).toString()}</loc></url>`).join('\n')}\n</urlset>`
})

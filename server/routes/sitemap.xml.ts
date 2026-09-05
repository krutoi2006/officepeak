import { categories, collections, products } from '~/data/catalog'
import { siteConfig } from '~/config/site'

export default defineEventHandler((event) => {
  const staticPages = ['', 'catalog', 'search', 'cart', 'favorites', 'government', 'business', 'designers', 'custom-furniture', 'design-project', 'payment', 'delivery', 'lifting', 'assembly', 'warranty', 'returns', 'contacts', 'privacy', 'personal-data-consent']
  const paths = [
    ...staticPages.map(path => `/${path}`),
    ...categories.map(item => `/catalog/${item.slug}`),
    ...collections.map(item => `/collections/${item.slug}`),
    ...products.map(item => `/product/${item.slug}`),
  ]
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path => `  <url><loc>${new URL(path, siteConfig.siteUrl).toString()}</loc></url>`).join('\n')}\n</urlset>`
})

const baseUrl = process.argv[2] || 'http://127.0.0.1:3000'

const decodeHtml = value => String(value ?? '')
  .replaceAll('&quot;', '"')
  .replaceAll('&amp;', '&')
  .replaceAll('&#39;', "'")

const attribute = (tag, name) => decodeHtml(tag.match(new RegExp(`\\s${name}=["']([^"']*)["']`, 'i'))?.[1])
const meta = (html, name) => {
  for (const match of html.matchAll(/<meta\s+[^>]*>/gi)) {
    if (attribute(match[0], 'name') === name || attribute(match[0], 'property') === name) return attribute(match[0], 'content')
  }
  return ''
}
const canonical = html => {
  for (const match of html.matchAll(/<link\s+[^>]*>/gi)) {
    if (attribute(match[0], 'rel') === 'canonical') return attribute(match[0], 'href')
  }
  return ''
}
const title = html => decodeHtml(html.match(/<title>(.*?)<\/title>/i)?.[1])
const jsonLd = (html) => [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  .map(match => JSON.parse(decodeHtml(match[1])))
const schemaTypes = value => value['@graph']?.flatMap(schemaTypes) ?? [value['@type']]
const ensure = (condition, message) => { if (!condition) throw new Error(message) }

const fetchText = async (path, options) => {
  const response = await fetch(new URL(path, baseUrl), options)
  return { response, text: await response.text() }
}

const oldProduct = await fetch(new URL('/product/unitex-product-210167', baseUrl), { redirect: 'manual' })
ensure(oldProduct.status === 301, `Старый товарный URL должен отвечать 301, получен ${oldProduct.status}.`)
const productLocation = oldProduct.headers.get('location') || ''
ensure(productLocation && !/\/product\/(unitex|riva)-product-\d+$/i.test(productLocation), 'Редирект должен вести на читаемый товарный URL.')

const productResult = await fetchText(productLocation)
const productSchemas = jsonLd(productResult.text)
const productSchema = productSchemas.find(item => item['@type'] === 'Product')
ensure(productResult.response.ok, 'Новая товарная страница недоступна.')
ensure(title(productResult.text).length <= 70, 'Title товара длиннее 70 символов.')
ensure(meta(productResult.text, 'description').length <= 160, 'Description товара длиннее 160 символов.')
ensure(canonical(productResult.text) === new URL(productLocation, 'https://officepeak.ru').toString(), 'Canonical товара не совпадает с новым URL.')
ensure(Boolean(meta(productResult.text, 'og:image')), 'У товара отсутствует og:image.')
ensure(meta(productResult.text, 'twitter:card') === 'summary_large_image', 'У товара отсутствует Twitter Card.')
ensure(schemaTypes(productSchemas.find(item => item['@graph']) || {}).includes('Organization'), 'Отсутствует schema Organization.')
ensure(schemaTypes(productSchemas.find(item => item['@graph']) || {}).includes('WebSite'), 'Отсутствует schema WebSite.')
ensure(schemaTypes(productSchemas.find(item => item['@type'] === 'BreadcrumbList') || {}).includes('BreadcrumbList'), 'Отсутствует schema BreadcrumbList.')
ensure(productSchema?.url && productSchema?.offers?.seller, 'Schema Product не содержит URL или продавца.')
ensure(/<img[^>]+width=["']1200["'][^>]+height=["']900["']/i.test(productResult.text), 'У главного изображения товара отсутствуют размеры.')
ensure(/fetchpriority=["']high["']/i.test(productResult.text), 'Не установлен высокий приоритет главного изображения.')

const oldCollection = await fetch(new URL('/collections/riva-collection-3331', baseUrl), { redirect: 'manual' })
ensure(oldCollection.status === 301, `Старый URL коллекции должен отвечать 301, получен ${oldCollection.status}.`)

for (const path of ['/search', '/cart', '/favorites', '/checkout', '/quote']) {
  const result = await fetchText(path)
  ensure(result.response.headers.get('x-robots-tag')?.includes('noindex'), `${path}: отсутствует X-Robots-Tag noindex.`)
  ensure(meta(result.text, 'robots').includes('noindex'), `${path}: отсутствует meta robots noindex.`)
}

const filteredCatalog = await fetchText('/catalog?category=unitex-category-1')
ensure(meta(filteredCatalog.text, 'robots').includes('noindex'), 'Фильтрованный каталог должен иметь noindex.')

const sitemap = await fetchText('/sitemap.xml')
const sitemapUrls = [...sitemap.text.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
ensure(sitemap.response.ok && sitemapUrls.length > 100, 'Sitemap пуст или недоступен.')
ensure(sitemapUrls.length === new Set(sitemapUrls).size, 'В sitemap обнаружены дубли URL.')
ensure(!sitemapUrls.some(url => /\/(search|cart|favorites)$/.test(url)), 'В sitemap остались служебные страницы.')
ensure(!sitemapUrls.some(url => /\/product\/(unitex|riva)-product-\d+$/.test(url)), 'В sitemap остались технические товарные URL.')

const api = await fetch(new URL('/api/catalog/home', baseUrl))
ensure(api.headers.get('x-robots-tag')?.includes('noindex'), 'API не закрыт через X-Robots-Tag.')

console.log(JSON.stringify({
  productRedirect: { status: oldProduct.status, location: productLocation },
  collectionRedirect: { status: oldCollection.status, location: oldCollection.headers.get('location') },
  product: {
    status: productResult.response.status,
    title: title(productResult.text),
    titleLength: title(productResult.text).length,
    descriptionLength: meta(productResult.text, 'description').length,
    canonical: canonical(productResult.text),
    schemas: productSchemas.flatMap(schemaTypes).filter(Boolean),
  },
  sitemap: {
    urls: sitemapUrls.length,
    duplicates: sitemapUrls.length - new Set(sitemapUrls).size,
    cacheControl: sitemap.response.headers.get('cache-control'),
  },
}, null, 2))

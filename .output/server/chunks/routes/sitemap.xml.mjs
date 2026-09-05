globalThis.__timing__.logStart('Load chunks/routes//sitemap.xml');import { c as defineEventHandler, h as setHeader } from '../_/nitro.mjs';
import { c as categories, a as collections, b as products } from '../_/catalog.mjs';
import { s as siteConfig } from '../_/site.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const sitemap_xml = defineEventHandler((event) => {
  const staticPages = ["", "catalog", "search", "cart", "favorites", "account", "government", "business", "designers", "custom-furniture", "design-project", "payment", "delivery", "lifting", "assembly", "warranty", "returns", "contacts", "privacy", "personal-data-consent"];
  const paths = [
    ...staticPages.map((path) => `/${path}`),
    ...categories.map((item) => `/catalog/${item.slug}`),
    ...collections.map((item) => `/collections/${item.slug}`),
    ...products.map((item) => `/product/${item.slug}`)
  ];
  setHeader(event, "content-type", "application/xml; charset=utf-8");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${new URL(path, siteConfig.siteUrl).toString()}</loc></url>`).join("\n")}
</urlset>`;
});

export { sitemap_xml as default };;globalThis.__timing__.logEnd('Load chunks/routes//sitemap.xml');
//# sourceMappingURL=sitemap.xml.mjs.map

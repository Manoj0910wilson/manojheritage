// Builds the whole website into docs/ (served by GitHub Pages).
// Run: npm run build      (set SITE_URL=https://yourdomain.com to build for a custom domain)
import { mkdir, rm, cp, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { build as esbuild } from 'esbuild';
import { site } from '../content/site.mjs';
import { articles } from '../content/articles.mjs';
import { makeCtx, layout, absUrl, plainText, breadcrumbLd, faqLd } from './templates.mjs';
import { englishPages } from './pages-en.mjs';
import { arabicPages } from './pages-ar.mjs';

const OUT = 'docs';
await rm(OUT, { recursive: true, force: true });
await mkdir(`${OUT}/assets`, { recursive: true });
if (existsSync('public')) await cp('public', OUT, { recursive: true });

// 1) Bundle CSS + JS (names are fixed; a content hash is appended to URLs for cache-busting)
await esbuild({
  entryPoints: { site: 'src/main.js' },
  bundle: true, minify: true, target: ['es2019'],
  outdir: `${OUT}/assets`, entryNames: '[name]',
  loader: { '.png': 'file', '.webp': 'file' },
  external: ['./img/*'],
  logLevel: 'warning',
});
const hash = createHash('sha1');
for (const f of ['site.css', 'site.js']) hash.update(await readFile(`${OUT}/assets/${f}`));
const version = hash.digest('hex').slice(0, 8);

// 2) Render pages
const pages = [...englishPages(), ...arabicPages()];
const searchIndex = [];
const sitemap = [];

const articleLd = (ctx, a) => ({
  '@context': 'https://schema.org', '@type': 'Article',
  headline: a.title, description: a.summary, inLanguage: 'en',
  datePublished: site.published, dateModified: site.published,
  mainEntityOfPage: absUrl(ctx.path),
  image: absUrl('og-image.jpg'),
  author: { '@type': 'Organization', name: site.name, url: `${site.url}/` },
  publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: absUrl('assets/heritage-spices-logo.png') } },
});
// No Product markup on purpose: Google requires a price, review or rating for Product rich results,
// and we do not publish prices or reviews. WebPage + about keeps the entity information without that claim.
// Switch back to Product (with real offers) once prices and genuine reviews exist.
const productLd = (ctx, p) => ({
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: p.name, url: absUrl(ctx.path), image: absUrl('og-image.jpg'),
  about: { '@type': 'Thing', name: p.name, description: p.description },
  isPartOf: { '@type': 'WebSite', name: site.name, url: `${site.url}/` },
});

for (const page of pages) {
  const isFile = Boolean(page.file);
  const ctx = makeCtx(isFile ? '' : page.path, page.lang);
  ctx.version = version;
  if (isFile) { ctx.root = `${site.url}/`; ctx.path = page.path; } // 404 may be served from any depth
  const main = page.render(ctx);

  const ld = [];
  if (typeof page.jsonld === 'function') ld.push(...page.jsonld());
  else if (Array.isArray(page.jsonld)) ld.push(...page.jsonld);
  if (page.crumbs?.length) ld.push(breadcrumbLd(ctx, page.crumbs));
  if (page.faq?.length) ld.push(faqLd(page.faq));
  if (page.product) ld.push(productLd(ctx, page.product));
  if (page.article) ld.push(articleLd(ctx, page.article));
  page.jsonld = ld;

  const html = layout(ctx, page, main);
  const target = isFile ? `${OUT}/${page.file}` : `${OUT}/${page.path}index.html`;
  await mkdir(target.replace(/\/[^/]*$/, ''), { recursive: true });
  await writeFile(target, html);

  if (!page.noindex) {
    sitemap.push(page);
    if (page.lang === 'en') {
      const text = plainText(main.replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
      searchIndex.push({ t: plainText(page.title), d: page.description, k: text.slice(0, 1800), u: page.path });
    }
  }
}

// 3) sitemap.xml, robots.txt, search index
const urlEntry = (p) => {
  const alts = p.alternates
    ? Object.entries(p.alternates).map(([l, path]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${absUrl(path)}"/>`).join('')
      + `<xhtml:link rel="alternate" hreflang="x-default" href="${absUrl(p.alternates.en)}"/>`
    : '';
  const priority = p.path === '' ? '1.0' : /^(products|markets)\//.test(p.path) ? '0.9' : '0.7';
  return `<url><loc>${absUrl(p.path)}</loc><lastmod>${site.published}</lastmod><priority>${priority}</priority>${alts}</url>`;
};
await writeFile(`${OUT}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemap.map(urlEntry).join('\n')}\n</urlset>\n`);
// Backup sitemaps: no hreflang extensions (some crawlers fetch the plain format more reliably)
await writeFile(`${OUT}/sitemap-simple.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap.map((p) => `<url><loc>${absUrl(p.path)}</loc><lastmod>${site.published}</lastmod></url>`).join('\n')}\n</urlset>\n`);
await writeFile(`${OUT}/sitemap.txt`, `${sitemap.map((p) => absUrl(p.path)).join('\n')}\n`);
await writeFile(`${OUT}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
await writeFile(`${OUT}/search-index.json`, JSON.stringify(searchIndex));
if (!existsSync(`${OUT}/.nojekyll`)) await writeFile(`${OUT}/.nojekyll`, '');

console.log(`Built ${pages.length} pages (${sitemap.length} indexable) -> ${OUT}/  [v${version}]`);

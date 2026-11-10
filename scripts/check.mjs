// Post-build sanity checks: links, assets, basic on-page SEO. Run: npm run check
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'docs';
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const htmlFiles = walk(OUT).filter((f) => f.endsWith('.html') && !/google[0-9a-f]+\.html$/.test(f));
const problems = [];
const titles = new Map(); const descs = new Map();

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const is404 = file.endsWith('404.html');
  const rel = file.slice(OUT.length + 1);
  const dir = file.replace(/[^/]*$/, '');
  const add = (msg) => problems.push(`${rel}: ${msg}`);

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (!title) add('missing <title>'); else if (title.length > 65) add(`title too long (${title.length}): ${title}`);
  if (!desc) add('missing meta description'); else if (desc.length > 165) add(`description too long (${desc.length})`);
  if (h1s !== 1) add(`expected 1 <h1>, found ${h1s}`);
  if (!/<link rel="canonical"/.test(html)) add('missing canonical');
  if (!is404) {
    if (titles.has(title)) add(`duplicate title with ${titles.get(title)}`); titles.set(title, rel);
    if (descs.has(desc)) add(`duplicate description with ${descs.get(desc)}`); descs.set(desc, rel);
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(m[0])) add(`img without alt: ${m[0].slice(0, 60)}`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { add('invalid JSON-LD'); }
  }
  if (is404) continue;
  // internal links + assets (relative URLs only)
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let url = m[1].split('?')[0];
    if (/^(https?:|mailto:|tel:|data:|#|\/\/)/.test(url) || !url) continue;
    const [pathPart] = url.split('#');
    if (!pathPart) continue;
    let target = join(dir, pathPart);
    if (pathPart.endsWith('/')) target = join(target, 'index.html');
    if (!existsSync(target)) add(`broken link/asset: ${m[1]}`);
  }
  // anchors (#enquiry etc.) that point to ids on the same page
  for (const m of html.matchAll(/href="#([^"]+)"/g)) if (!html.includes(`id="${m[1]}"`)) add(`missing in-page anchor #${m[1]}`);
}
for (const f of ['sitemap.xml', 'robots.txt', 'search-index.json', 'og-image.jpg', 'favicon.png']) if (!existsSync(join(OUT, f))) problems.push(`missing ${f}`);

console.log(`Checked ${htmlFiles.length} HTML files.`);
if (problems.length) { console.log(problems.join('\n')); process.exit(1); }
console.log('No problems found.');

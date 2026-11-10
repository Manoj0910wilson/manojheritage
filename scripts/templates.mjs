import { site } from '../content/site.mjs';
import { articles } from '../content/articles.mjs';
import { markets } from '../content/markets.mjs';

/* ---------- helpers ---------- */
export const esc = (value = '') => String(value)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function makeCtx(path, lang = 'en') {
  const depth = path ? path.split('/').filter(Boolean).length : 0;
  return { path, lang, dir: lang === 'ar' ? 'rtl' : 'ltr', root: depth ? '../'.repeat(depth) : './' };
}
export const href = (ctx, path = '') => `${ctx.root}${path}`;
export const absUrl = (path = '') => `${site.url}/${path}`;

// Turns {link:path|text} into an internal link and **bold** is not supported on purpose.
export function inline(text, ctx) {
  return String(text).replace(/\{link:([^|}]+)\|([^}]+)\}/g, (_, path, label) => `<a href="${href(ctx, path)}">${label}</a>`);
}
export function plainText(text) {
  return String(text).replace(/\{link:[^|}]+\|([^}]+)\}/g, '$1').replace(/<br\s*\/?>/g, ' ').replace(/<[^>]+>/g, '');
}

export const whatsappLink = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
export const waHello = whatsappLink('Hello Heritage Spices, I would like to enquire about your green cardamom.');
export const waHelloAr = whatsappLink('Hello Heritage Spices, I would like to enquire about green cardamom. / مرحباً، أود الاستفسار عن الهيل الأخضر.');
export const tel = `tel:${site.phoneTel}`;

/* ---------- UI strings ---------- */
const nav = {
  en: [
    ['Products', 'products/'],
    ['India', 'india/'],
    ['Gulf', 'markets/'],
    ['Export', 'export/'],
    ['About', 'about/'],
    ['Journal', 'journal/'],
    ['Contact', 'contact/'],
  ],
  ar: [
    ['الرئيسية', 'ar/'],
    ['الهيل الأخضر', 'ar/green-cardamom/'],
    ['تواصل معنا', 'ar/#contact'],
  ],
};

/* ---------- header / footer ---------- */
function header(ctx, page) {
  const items = nav[ctx.lang];
  const isActive = (target) => {
    const clean = target.replace(/#.*/, '');
    if (!clean) return false;
    if (clean === 'ar/') return ctx.path === 'ar/';
    return ctx.path === clean || ctx.path.startsWith(clean);
  };
  const links = items.map(([label, target]) => `<a href="${href(ctx, target)}"${isActive(target) ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  const altHref = page.alt ? href(ctx, page.alt) : null;
  const isAr = ctx.lang === 'ar';
  const langLink = isAr
    ? `<a class="lang-link" href="${href(ctx, page.alt || '')}" hreflang="en" lang="en">English</a>`
    : `<a class="lang-link" href="${altHref || href(ctx, 'ar/')}" hreflang="ar" lang="ar">العربية</a>`;
  const ctaLabel = isAr ? 'اطلب عيّنة' : 'Request a sample';
  const ctaHref = isAr ? href(ctx, 'ar/#enquiry') : href(ctx, 'request-a-sample/');
  return `
  <a class="skip-link" href="#main">${isAr ? 'تخطَّ إلى المحتوى' : 'Skip to content'}</a>
  <header class="site-header" data-header>
    <a class="brand" href="${href(ctx, isAr ? 'ar/' : '')}" aria-label="Heritage Spices home">
      <img src="${href(ctx, 'assets/heritage-spices-logo.png')}" alt="Heritage Spices" width="164" height="109" />
    </a>
    <nav class="desktop-nav" aria-label="${isAr ? 'التنقل الرئيسي' : 'Primary navigation'}">${links}</nav>
    <div class="header-actions">
      ${langLink}
      ${isAr ? '' : `<button class="icon-button" aria-label="Open search" data-search-button><span class="search-icon"></span></button>`}
      <a class="outline-button header-cta" href="${ctaHref}">${ctaLabel} <span aria-hidden="true">↗</span></a>
      <button class="menu-button" aria-label="${isAr ? 'فتح القائمة' : 'Open navigation'}" aria-expanded="false" data-menu-button><span></span><span></span></button>
    </div>
    <div class="mobile-menu" data-mobile-menu>
      ${links}
      ${langLink}
      <a class="outline-button" href="${tel}">${isAr ? 'اتصل' : 'Call'} <bdi>${site.phoneDisplay}</bdi></a>
    </div>
  </header>`;
}

function footer(ctx) {
  const isAr = ctx.lang === 'ar';
  const year = new Date().getFullYear();
  const social = site.social.length
    ? `<div class="footer-social">${site.social.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join('')}</div>`
    : '';
  if (isAr) {
    return `
  <footer class="site-footer v2">
    <div class="footer-grid">
      <div class="footer-about">
        <a class="brand footer-brand" href="${href(ctx, 'ar/')}"><img src="${href(ctx, 'assets/heritage-spices-logo.png')}" alt="Heritage Spices" width="145" height="97" loading="lazy" /></a>
        <p>هيل نقي. جذوره في التراث.</p>
      </div>
      <div><h4>روابط</h4><a href="${href(ctx, 'ar/')}">الرئيسية</a><a href="${href(ctx, 'ar/green-cardamom/')}">الهيل الأخضر</a><a href="${href(ctx, '')}" hreflang="en" lang="en">English</a></div>
      <div><h4>تواصل معنا</h4><a href="mailto:${site.email}">${site.email}</a><a href="${tel}" dir="ltr">${site.phoneDisplay}</a><a href="${waHelloAr}" target="_blank" rel="noopener">واتساب</a></div>
    </div>
    ${social}
    <div class="footer-bottom"><span>© ${year} Heritage Spices</span></div>
  </footer>`;
  }
  return `
  <footer class="site-footer v2">
    <div class="footer-grid">
      <div class="footer-about">
        <a class="brand footer-brand" href="${href(ctx, '')}"><img src="${href(ctx, 'assets/heritage-spices-logo.png')}" alt="Heritage Spices" width="145" height="97" loading="lazy" /></a>
        <p>Pure cardamom. Rooted in heritage.</p>
        <p class="footer-small">Premium green cardamom from Idukki, Kerala, India, for buyers in India and importers in the Gulf.</p>
      </div>
      <div><h4>Products</h4>
        <a href="${href(ctx, 'products/green-cardamom/')}">Whole green cardamom</a>
        <a href="${href(ctx, 'products/cardamom-seeds/')}">Cardamom seeds</a>
        <a href="${href(ctx, 'request-a-sample/')}">Request a sample</a>
      </div>
      <div><h4>Markets</h4>
        <a href="${href(ctx, 'india/')}">India</a>
        ${markets.map((m) => `<a href="${href(ctx, `markets/${m.slug}/`)}">${m.name}</a>`).join('')}
      </div>
      <div><h4>Company</h4>
        <a href="${href(ctx, 'about/')}">About us</a>
        <a href="${href(ctx, 'export/')}">Export process</a>
        <a href="${href(ctx, 'faq/')}">FAQ</a>
        <a href="${href(ctx, 'journal/')}">Journal</a>
        <a href="${href(ctx, 'contact/')}">Contact</a>
        <a href="${href(ctx, 'ar/')}" hreflang="ar" lang="ar">العربية</a>
      </div>
      <div><h4>Get in touch</h4>
        <a href="mailto:${site.email}">${site.email}</a>
        <a href="${tel}">${site.phoneDisplay}</a>
        <a href="${waHello}" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </div>
    ${social}
    <div class="footer-bottom"><span>© ${year} Heritage Spices. All rights reserved.</span><span>Idukki, Kerala, India</span></div>
  </footer>`;
}

function floatingWhatsApp(ctx) {
  const isAr = ctx.lang === 'ar';
  return `
  <a class="wa-float" href="${isAr ? waHelloAr : waHello}" target="_blank" rel="noopener" data-track="whatsapp" aria-label="${isAr ? 'تحدث معنا عبر واتساب' : 'Chat with Heritage Spices on WhatsApp'}">
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.2 3.6c-.4.3-1-.0-1-.5V16A2.5 2.5 0 0 1 4 13.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
    <span>${isAr ? 'واتساب' : 'WhatsApp'}</span>
  </a>`;
}

function searchPanel() {
  return `
  <div class="search-panel" data-search-panel aria-hidden="true">
    <button data-close-search aria-label="Close search">×</button>
    <p class="eyebrow">Search Heritage Spices</p>
    <input type="search" placeholder="Try “Dubai”, “sizes”, or “export”" data-search-input autocomplete="off" aria-label="Search the site" />
    <div class="search-results" data-search-results></div>
  </div>`;
}

/* ---------- reusable components ---------- */
export function breadcrumbs(ctx, crumbs) {
  // crumbs: [{ name, path }] ending with the current page (path optional on the last one)
  const all = [{ name: ctx.lang === 'ar' ? 'الرئيسية' : 'Home', path: ctx.lang === 'ar' ? 'ar/' : '' }, ...crumbs];
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${all.map((c, i) => (i === all.length - 1
    ? `<li aria-current="page">${c.name}</li>`
    : `<li><a href="${href(ctx, c.path)}">${c.name}</a></li>`)).join('')}</ol></nav>`;
}

export function pageHero(ctx, { kicker, h1, lede, crumbs = [] }) {
  return `
  <section class="inner-hero">
    ${crumbs.length ? breadcrumbs(ctx, crumbs) : ''}
    <p class="section-kicker">${kicker}</p>
    <h1 class="page-title">${h1}</h1>
    ${lede ? `<p class="page-lede">${lede}</p>` : ''}
  </section>`;
}

export function ctaBand(ctx, { kicker, title, text, primary, secondary }) {
  return `
  <section class="cta-band">
    <div>
      <p class="eyebrow">${kicker}</p>
      <h2>${title}</h2>
      ${text ? `<p>${text}</p>` : ''}
    </div>
    <div class="cta-actions">
      <a class="solid-button" href="${href(ctx, primary.path)}">${primary.label} <span aria-hidden="true">↗</span></a>
      ${secondary ? `<a class="outline-button dark-outline" href="${secondary.external ? secondary.path : href(ctx, secondary.path)}"${secondary.external ? ' target="_blank" rel="noopener" data-track="whatsapp"' : ''}>${secondary.label} <span aria-hidden="true">↗</span></a>` : ''}
    </div>
  </section>`;
}

export function faqList(items, ctx) {
  return `<div class="faq">${items.map((item) => `
    <details>
      <summary>${esc(item.q)}</summary>
      <p>${inline(item.a, ctx)}</p>
    </details>`).join('')}</div>`;
}

export function stepsList(steps) {
  return `<ol class="steps">${steps.map((s, i) => `
    <li><span class="step-num">${String(i + 1).padStart(2, '0')}</span><div><h3>${s.h}</h3><p>${s.p}</p></div></li>`).join('')}</ol>`;
}

export function specTable(rows) {
  return `<dl class="spec-table">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
}

export function articleBody(blocks, ctx) {
  return blocks.map((block) => (block.startsWith('## ')
    ? `<h2>${esc(block.slice(3))}</h2>`
    : `<p>${inline(block, ctx)}</p>`)).join('');
}

const formText = {
  en: {
    name: 'Your name', company: 'Company', optional: '(optional)', country: 'Country', reach: 'Email or phone',
    message: 'What are you looking for?', placeholder: 'Product, size or grade, approximate quantity, packing, delivery port, timeline…',
    wa: 'Send on WhatsApp', email: 'Send by email',
    intro: 'Hello Heritage Spices, I would like to request a quote and a sample of cardamom.',
  },
  ar: {
    name: 'الاسم', company: 'الشركة', optional: '(اختياري)', country: 'الدولة', reach: 'البريد الإلكتروني أو الهاتف',
    message: 'ما الذي تبحث عنه؟', placeholder: 'المنتج، الحجم أو الدرجة، الكمية التقريبية، التعبئة، ميناء التسليم، الموعد المطلوب…',
    wa: 'أرسل عبر واتساب', email: 'أرسل بالبريد الإلكتروني',
    intro: 'Hello Heritage Spices, I would like to request a quote and a sample of cardamom. / مرحباً، أود طلب عرض سعر وعيّنة من الهيل.',
  },
};

export function enquiryForm(ctx, { variant = 'quote', light = false } = {}) {
  const t = formText[ctx.lang];
  const placeholder = variant === 'sample' && ctx.lang === 'en'
    ? 'Product, size or grade, approximate quantity, packing, destination and the address for the sample…'
    : t.placeholder;
  return `
  <form class="enquiry-form${light ? ' on-light' : ''}" data-enquiry-form data-lang="${ctx.lang}" data-source="${esc(ctx.path || 'home')}" data-whatsapp="${site.whatsapp}" data-email="${site.email}" data-intro="${esc(t.intro)}">
    <label>${t.name}<input type="text" name="name" autocomplete="name" required /></label>
    <label>${t.company} <small>${t.optional}</small><input type="text" name="company" autocomplete="organization" /></label>
    <label>${t.country}<input type="text" name="country" autocomplete="country-name" required /></label>
    <label>${t.reach}<input type="text" name="reach" autocomplete="email" required ${ctx.lang === 'ar' ? 'dir="ltr"' : ''} /></label>
    <label class="field-wide">${t.message}<textarea name="message" rows="4" placeholder="${esc(placeholder)}" required></textarea></label>
    <div class="form-actions field-wide">
      <button class="solid-button" type="submit" data-track="whatsapp-form">${t.wa} <span aria-hidden="true">↗</span></button>
      <button class="outline-button${light ? '' : ' dark-outline'}" type="button" data-email-button>${t.email} <span aria-hidden="true">↗</span></button>
    </div>
    <p class="form-status" data-form-status role="status" aria-live="polite"></p>
  </form>`;
}

export function contactDetails(ctx) {
  const isAr = ctx.lang === 'ar';
  return `
  <ul class="contact-list">
    <li><span>${isAr ? 'البريد الإلكتروني' : 'Email'}</span><a href="mailto:${site.email}">${site.email}</a></li>
    <li><span>${isAr ? 'الهاتف' : 'Phone'}</span><a href="${tel}" dir="ltr">${site.phoneDisplay}</a></li>
    <li><span>WhatsApp</span><a href="${isAr ? waHelloAr : waHello}" target="_blank" rel="noopener" data-track="whatsapp" dir="ltr">${site.phoneDisplay}</a></li>
    <li><span>${isAr ? 'التوقيت' : 'Time zone'}</span><b>${isAr ? 'توقيت الهند (UTC+5:30)' : 'India Standard Time (UTC+5:30)'}</b></li>
    <li><span>${isAr ? 'المصدر' : 'Origin'}</span><b>${isAr ? 'إدوكي، كيرالا، الهند' : 'Idukki, Kerala, India'}</b></li>
  </ul>`;
}

/* ---------- structured data ---------- */
export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: `${site.url}/`,
    logo: absUrl('assets/heritage-spices-logo.png'),
    image: absUrl('og-image.jpg'),
    description: 'Heritage Spices sources premium green cardamom from Idukki, Kerala, India for buyers in India and importers in the Gulf.',
    email: site.email,
    telephone: site.phoneTel,
    areaServed: [{ '@type': 'Country', name: 'India' }, ...markets.map((m) => ({ '@type': 'Country', name: m.name }))],
    knowsAbout: ['Green cardamom', 'Cardamom export', 'Idukki cardamom', 'Spices'],
    contactPoint: [{
      '@type': 'ContactPoint', contactType: 'sales', email: site.email, telephone: site.phoneTel,
      availableLanguage: ['English', 'Arabic'], areaServed: ['IN', 'AE', 'SA', 'QA', 'KW', 'OM', 'BH'],
    }],
    ...(site.social.length ? { sameAs: site.social.map((s) => s.url) } : {}),
  };
}
export function websiteLd() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${site.url}/#website`, url: `${site.url}/`, name: site.name, inLanguage: ['en', 'ar'], publisher: { '@id': `${site.url}/#organization` } };
}
export function breadcrumbLd(ctx, crumbs) {
  const all = [{ name: ctx.lang === 'ar' ? 'الرئيسية' : 'Home', path: ctx.lang === 'ar' ? 'ar/' : '' }, ...crumbs];
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: plainText(c.name), item: c.path !== undefined && i < all.length - 1 ? absUrl(c.path) : absUrl(ctx.path) })),
  };
}
export function faqLd(items) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: plainText(i.a) } })) };
}

/* ---------- full document ---------- */
export function layout(ctx, page, mainHtml) {
  const title = page.title.includes(site.name) ? page.title : `${page.title} | ${site.name}`;
  const canonical = absUrl(ctx.path);
  const desc = esc(page.description);
  const keywords = page.keywords?.length ? `<meta name="keywords" content="${esc(page.keywords.join(', '))}" />` : '';
  const region = page.geo?.region ? `<meta name="geo.region" content="${esc(page.geo.region)}" />` : '';
  const placename = page.geo?.placename ? `<meta name="geo.placename" content="${esc(page.geo.placename)}" />` : '';
  const isAr = ctx.lang === 'ar';
  const fonts = isAr
    ? 'family=Noto+Naskh+Arabic:wght@500;600;700&family=Tajawal:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,500;1,400&family=DM+Sans:wght@400;500;600;700'
    : 'family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;600;700';
  const alternates = page.alternates
    ? Object.entries(page.alternates).map(([lang, path]) => `<link rel="alternate" hreflang="${lang}" href="${absUrl(path)}" />`).join('\n    ')
      + `\n    <link rel="alternate" hreflang="x-default" href="${absUrl(page.alternates.en)}" />`
    : '';
  const ld = [...(page.jsonld || [])].map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`).join('\n    ');
  const analytics = site.analyticsId
    ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${site.analyticsId}"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.analyticsId}');</script>`
    : '';
  const gsc = site.searchConsoleVerification ? `<meta name="google-site-verification" content="${esc(site.searchConsoleVerification)}" />` : '';
  const ogImage = absUrl('og-image.jpg');
  const locale = page.locale || (isAr ? 'ar_AE' : 'en_IN');
  const alternateLocales = page.alternateLocales || (isAr ? ['en_IN'] : []);
  return `<!doctype html>
<html lang="${ctx.lang}" dir="${ctx.dir}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(title)}</title>
    <meta name="description" content="${desc}" />
    ${keywords}
    <meta name="author" content="${site.name}" />
    <meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />
    ${region}${placename}
    <link rel="canonical" href="${canonical}" />
    ${alternates}
    <meta name="theme-color" content="#f6f1e7" />
    <meta property="og:site_name" content="${site.name}" />
    <meta property="og:type" content="${page.ogType || 'website'}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="${locale}" />
    ${alternateLocales.map((value) => `<meta property="og:locale:alternate" content="${esc(value)}" />`).join('\n    ')}
    <meta property="og:image:alt" content="${esc(page.imageAlt || 'Heritage Spices green cardamom from Idukki, Kerala')}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${ogImage}" />
    <meta name="twitter:image:alt" content="${esc(page.imageAlt || 'Heritage Spices green cardamom from Idukki, Kerala')}" />
    ${gsc}
    <link rel="icon" type="image/png" href="${href(ctx, 'favicon.png')}" />
    <link rel="apple-touch-icon" href="${href(ctx, 'apple-touch-icon.png')}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fonts}&display=swap" />
    ${page.preload ? `<link rel="preload" as="image" href="${href(ctx, page.preload)}" type="image/webp" />` : ''}
    <link rel="stylesheet" href="${href(ctx, 'assets/site.css')}?v=${ctx.version}" />
    ${ld}
    ${analytics}
    <script>document.documentElement.classList.add('js')</script>
  </head>
  <body class="${page.bodyClass || 'on-page'}" data-root="${ctx.root}" data-lang="${ctx.lang}">
    ${header(ctx, page)}
    <main id="main">${mainHtml}</main>
    ${footer(ctx)}
    ${floatingWhatsApp(ctx)}
    ${isAr ? '' : searchPanel()}
    <script defer src="${href(ctx, 'assets/site.js')}?v=${ctx.version}"></script>
  </body>
</html>
`;
}

export { articles, markets, site };

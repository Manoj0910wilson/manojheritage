import './style.css';
import './extras.css';
import { contact, articles } from './site-data.js';

const logoPath = './assets/heritage-spices-logo.png';
const podPath = './assets/heritage-cardamom-pod.png';

const navItems = [
  ['Our Story', '#story'],
  ['Our Spices', '#products'],
  ['Markets', '#markets'],
  ['Journal', '#journal'],
  ['Contact', '#contact'],
];

const tel = `tel:${contact.phoneTel}`;
const whatsappBase = `https://wa.me/${contact.whatsapp}`;
const whatsappHello = `${whatsappBase}?text=${encodeURIComponent('Hello Heritage Spices, I would like to enquire about your cardamom.')}`;
const journalClasses = ['one', 'two', 'three'];

const contactLinks = [
  contact.email ? { label: contact.email, href: `mailto:${contact.email}` } : null,
  ...contact.social.map((item) => ({ label: item.label, href: item.url })),
].filter(Boolean);

const contactLinksMarkup = contactLinks.length
  ? `<ul class="contact-links">${contactLinks.map((link) => `<li><a href="${link.href}" ${link.href.startsWith('mailto:') ? '' : 'target="_blank" rel="noopener"'}>${link.label} <span aria-hidden="true">↗</span></a></li>`).join('')}</ul>`
  : '';

const footerSocialMarkup = contact.social.length
  ? `<div class="footer-social">${contact.social.map((item) => `<a href="${item.url}" target="_blank" rel="noopener">${item.label}</a>`).join('')}</div>`
  : '';

const journalCards = articles.map((article, index) => `
  <article>
    <div class="journal-image journal-image-${journalClasses[index % journalClasses.length]}"><span>${article.tag}</span></div>
    <p class="journal-meta">${article.meta}</p>
    <h3>${article.title}</h3>
    <a href="#/journal/${article.slug}">Read the note <span>↗</span></a>
  </article>`).join('');

const app = document.querySelector('#root');

app.innerHTML = `
  <header class="site-header" data-header>
    <a class="brand" href="#top" aria-label="Heritage Spices home">
      <img src="${logoPath}" alt="Heritage Spices" />
    </a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      ${navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}
    </nav>
    <div class="header-actions">
      <button class="icon-button" aria-label="Open search" data-search-button>
        <span class="search-icon"></span>
      </button>
      <a class="outline-button header-cta" href="#contact">Enquire now <span aria-hidden="true">↗</span></a>
      <button class="menu-button" aria-label="Open navigation" aria-expanded="false" data-menu-button>
        <span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" data-mobile-menu>
      ${navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}
      <a class="outline-button" href="${tel}">Call ${contact.phoneDisplay}</a>
    </div>
  </header>

  <main id="top" data-home>
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-haze"></div>
      <div class="hero-copy reveal">
        <p class="eyebrow">Premium cardamom · Idukki, Kerala</p>
        <h1 id="hero-title">Pure Cardamom.<br /><em>Rooted in Heritage.</em></h1>
        <p class="hero-lede">A bright, aromatic harvest sourced directly from the hills of Idukki and prepared for discerning kitchens around the world.</p>
        <div class="hero-actions">
          <a class="solid-button" href="#products">Explore our cardamom <span aria-hidden="true">↗</span></a>
          <a class="text-button" href="${tel}"><span class="phone-dot">⌕</span> Call ${contact.phoneDisplay}</a>
        </div>
        <div class="hero-proof"><span>Direct from farmers</span><i></i><span>Carefully selected</span><i></i><span>Export-ready quality</span></div>
      </div>
      <div class="hero-stage" data-stage aria-label="Animated cardamom pod">
        <div class="orbit orbit-one"></div>
        <div class="orbit orbit-two"></div>
        <div class="leaf leaf-a"></div><div class="leaf leaf-b"></div><div class="leaf leaf-c"></div>
        <div class="pod-shadow"></div>
        <img class="pod-image" data-pod src="${podPath}" alt="A fresh green cardamom pod" />
        <p class="stage-note">Scroll to explore <span>↓</span></p>
      </div>
      <div class="hero-origin"><span class="origin-pin"></span><span>Idukki, Kerala<br />India</span></div>
      <div class="hero-bottom-line"></div>
    </section>

    <section class="intro-section" id="story" aria-labelledby="story-title">
      <div class="section-kicker">01 / The heritage</div>
      <div class="intro-grid">
        <h2 id="story-title">A small pod.<br /><em>A lasting impression.</em></h2>
        <div class="intro-text">
          <p>We believe exceptional cardamom begins with exceptional care. From farmer-direct relationships in Idukki to careful selection and preparation, every pod carries the character of its origin.</p>
          <a class="arrow-link" href="#products">Meet the harvest <span>↗</span></a>
        </div>
      </div>
      <div class="botanical-band" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
    </section>

    <section class="journey-section" id="products" data-journey aria-labelledby="journey-title">
      <div class="journey-sticky">
        <div class="journey-intro">
          <div class="section-kicker">02 / The product</div>
          <h2 id="journey-title">Discover<br /><em>what is inside.</em></h2>
          <p>Scroll to follow the pod from whole fruit to fragrant seed.</p>
          <div class="journey-progress"><span data-progress-bar></span></div>
          <div class="journey-steps" aria-label="Product story steps">
            <span class="journey-step is-active" data-step-label="0">01 <b>Whole pod</b></span>
            <span class="journey-step" data-step-label="1">02 <b>Natural aroma</b></span>
            <span class="journey-step" data-step-label="2">03 <b>Carefully selected</b></span>
          </div>
        </div>
        <div class="journey-canvas">
          <div class="journey-glow"></div>
          <div class="journey-track"></div>
          <div class="journey-pod pod-state-0" data-journey-pod>
            <img src="${podPath}" alt="Cardamom pod in three product-story states" />
          </div>
          <div class="journey-seeds" data-seeds aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
          <div class="state-caption" data-state-caption>Freshly harvested whole pod</div>
        </div>
        <aside class="product-details">
          <div class="detail-card">
            <p class="eyebrow">Product details</p>
            <dl>
              <div><dt>Origin</dt><dd>Idukki, Kerala</dd></div>
              <div><dt>Source</dt><dd>Direct from farmers</dd></div>
              <div><dt>Format</dt><dd>Whole green cardamom</dd></div>
            </dl>
          </div>
          <div class="buyers-note"><span>For international buyers</span><strong>Clean aroma.<br />Clear provenance.</strong></div>
        </aside>
      </div>
    </section>

    <section class="products-section" aria-labelledby="range-title">
      <div class="section-kicker">03 / The range</div>
      <div class="section-heading-row"><h2 id="range-title">The character<br /><em>of the harvest.</em></h2><p>Built for buyers who care where every flavour begins.</p></div>
      <div class="range-grid">
        <article class="range-card range-card-main"><div class="card-number">01</div><div class="mini-pod mini-pod-whole"></div><h3>Whole green cardamom</h3><p>Fresh, fragrant pods with a naturally clean finish.</p><a href="#enquiry">Discuss your requirements <span>↗</span></a></article>
        <article class="range-card range-card-light"><div class="card-number">02</div><div class="seed-cluster"><i></i><i></i><i></i><i></i></div><h3>Selected seed profile</h3><p>Consistent selection for aroma-led food and beverage applications.</p><a href="#enquiry">Talk to our team <span>↗</span></a></article>
        <article class="range-card range-card-photo"><div class="card-number">03</div><div class="plant-line"></div><h3>Made for global buyers</h3><p>Origin-led conversations, clear communication, and flexible enquiries.</p><a href="#markets">See our markets <span>↗</span></a></article>
      </div>
    </section>

    <section class="markets-section" id="markets" aria-labelledby="markets-title">
      <div class="markets-visual"><div class="hill hill-back"></div><div class="hill hill-front"></div><div class="market-leaf market-leaf-one"></div><div class="market-leaf market-leaf-two"></div><span class="map-pin pin-origin">Idukki</span></div>
      <div class="markets-copy"><div class="section-kicker">04 / From our hills</div><h2 id="markets-title">From Idukki<br /><em>to global kitchens.</em></h2><p>Rooted in Kerala. Prepared for the world. Heritage Spices is building thoughtful supply relationships with buyers who value a traceable beginning and a distinctive finish.</p><div class="market-list"><span>Europe</span><span>Middle East</span><span>Southeast Asia</span></div><a class="solid-button" href="#enquiry">Talk to our export team <span>↗</span></a></div>
    </section>

    <section class="journal-section" id="journal" aria-labelledby="journal-title">
      <div class="section-kicker">05 / The journal</div>
      <div class="section-heading-row"><h2 id="journal-title">Notes from<br /><em>the spice trail.</em></h2><a class="arrow-link" href="#/journal">View all stories <span>↗</span></a></div>
      <div class="journal-grid">${journalCards}</div>
    </section>

    <section class="contact-section" id="contact" aria-labelledby="contact-title">
      <div class="contact-pattern" aria-hidden="true"></div><div class="section-kicker">06 / Let’s talk</div>
      <div class="contact-grid">
        <div><h2 id="contact-title">A better conversation<br /><em>starts with one pod.</em></h2><p>Tell us what you are looking for, where you are sourcing from, and how we can help you bring Kerala cardamom to your market.</p></div>
        <div class="contact-actions">
          <a class="solid-button" href="${tel}">Call ${contact.phoneDisplay} <span>↗</span></a>
          <a class="outline-button dark-outline" href="${whatsappHello}" target="_blank" rel="noopener">Chat on WhatsApp <span>↗</span></a>
          <a class="outline-button dark-outline" href="#enquiry">Request a quote <span>↗</span></a>
          ${contactLinksMarkup}
        </div>
      </div>
      <div class="enquiry" id="enquiry">
        <div class="enquiry-intro">
          <p class="eyebrow">Request a quote</p>
          <h3>Send us your requirements</h3>
          <p>Share a few details about what you need. Your message opens in WhatsApp, ready to send to our export team.</p>
        </div>
        <form class="enquiry-form" data-enquiry-form>
          <label>Your name<input type="text" name="name" autocomplete="name" required /></label>
          <label>Company <small>(optional)</small><input type="text" name="company" autocomplete="organization" /></label>
          <label>Country<input type="text" name="country" autocomplete="country-name" required /></label>
          <label>Email or phone<input type="text" name="reach" autocomplete="email" required /></label>
          <label class="field-wide">What are you looking for?<textarea name="message" rows="4" placeholder="Product, approximate quantity, packing, timeline…" required></textarea></label>
          <div class="form-actions field-wide">
            <button class="solid-button" type="submit">Send on WhatsApp <span aria-hidden="true">↗</span></button>
            ${contact.email ? '<button class="outline-button dark-outline" type="button" data-email-button>Send by email <span aria-hidden="true">↗</span></button>' : ''}
          </div>
          <p class="form-status" data-form-status role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  </main>

  <div class="page-view" data-page hidden></div>

  <footer class="site-footer"><a class="brand footer-brand" href="#top"><img src="${logoPath}" alt="Heritage Spices" /></a><p>Pure cardamom. Rooted in heritage.</p><div class="footer-links"><a href="#story">Our Story</a><a href="#products">Our Spices</a><a href="#markets">Markets</a><a href="#/journal">Journal</a><a href="#contact">Contact</a></div><span class="footer-legal">© 2026 Heritage Spices</span>${footerSocialMarkup}</footer>

  <a class="wa-float" href="${whatsappHello}" target="_blank" rel="noopener" aria-label="Chat with Heritage Spices on WhatsApp">
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.2 3.6c-.4.3-1-.0-1-.5V16A2.5 2.5 0 0 1 4 13.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
    <span>WhatsApp</span>
  </a>

  <div class="search-panel" data-search-panel aria-hidden="true">
    <button data-close-search aria-label="Close search">×</button>
    <p class="eyebrow">Search Heritage Spices</p>
    <input type="search" placeholder="Try “Idukki”, “quality”, or “export”" data-search-input autocomplete="off" />
    <div class="search-results" data-search-results></div>
  </div>
`;

const header = document.querySelector('[data-header]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const menuButton = document.querySelector('[data-menu-button]');
const searchPanel = document.querySelector('[data-search-panel]');
const searchButton = document.querySelector('[data-search-button]');
const closeSearch = document.querySelector('[data-close-search]');
const searchInput = document.querySelector('[data-search-input]');
const searchResults = document.querySelector('[data-search-results]');
const homeEl = document.querySelector('[data-home]');
const pageEl = document.querySelector('[data-page]');
const siteTitle = document.title;

menuButton.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.mobile-menu a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

/* ---------- Search ---------- */
const searchIndex = [
  { title: 'Our Story', desc: 'Farmer-direct relationships in Idukki and careful selection.', href: '#story', keywords: 'story heritage farmers care selection preparation origin' },
  { title: 'Our Spices', desc: 'Whole green cardamom from pod to seed.', href: '#products', keywords: 'products spices cardamom pod seed green whole aroma format' },
  { title: 'Markets', desc: 'Europe, Middle East and Southeast Asia.', href: '#markets', keywords: 'markets export europe middle east southeast asia global buyers countries' },
  { title: 'Journal', desc: 'Notes from the spice trail.', href: '#/journal', keywords: 'journal blog notes stories articles' },
  { title: 'Contact & enquiries', desc: 'Call, WhatsApp or request a quote.', href: '#contact', keywords: 'contact call phone whatsapp quote enquire enquiry email' },
  ...articles.map((article) => ({
    title: article.title,
    desc: article.summary,
    href: `#/journal/${article.slug}`,
    keywords: `${article.tag} ${article.meta} ${article.body.join(' ')}`,
  })),
];

function openSearch() {
  searchPanel.classList.add('is-open');
  searchPanel.setAttribute('aria-hidden', 'false');
  setTimeout(() => searchInput.focus(), 100);
}
function closeSearchPanel() {
  searchPanel.classList.remove('is-open');
  searchPanel.setAttribute('aria-hidden', 'true');
}
function renderSearchResults(query) {
  searchResults.textContent = '';
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return;
  const matches = searchIndex.filter((item) => {
    const haystack = `${item.title} ${item.desc} ${item.keywords}`.toLowerCase();
    return terms.every((term) => haystack.includes(term));
  }).slice(0, 6);
  if (!matches.length) {
    const empty = document.createElement('p');
    empty.className = 'search-empty';
    empty.textContent = `No results for “${query}”. Try “Idukki”, “quality” or “export”.`;
    searchResults.append(empty);
    return;
  }
  matches.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.href;
    const title = document.createElement('strong');
    title.textContent = item.title;
    const desc = document.createElement('span');
    desc.textContent = item.desc;
    link.append(title, desc);
    link.addEventListener('click', closeSearchPanel);
    searchResults.append(link);
  });
}

searchButton.addEventListener('click', openSearch);
closeSearch.addEventListener('click', closeSearchPanel);
searchInput.addEventListener('input', () => renderSearchResults(searchInput.value.trim()));
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') searchResults.querySelector('a')?.click();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeSearchPanel();
});

/* ---------- Enquiry form ---------- */
const enquiryForm = document.querySelector('[data-enquiry-form]');
const formStatus = document.querySelector('[data-form-status]');

function enquiryText() {
  const data = new FormData(enquiryForm);
  const lines = [
    'Hello Heritage Spices, I would like to request a quote for cardamom.',
    '',
    `Name: ${data.get('name')}`,
    data.get('company') ? `Company: ${data.get('company')}` : null,
    `Country: ${data.get('country')}`,
    `Contact: ${data.get('reach')}`,
    '',
    `Requirements: ${data.get('message')}`,
  ].filter((line) => line !== null);
  return lines.join('\n');
}

enquiryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  window.open(`${whatsappBase}?text=${encodeURIComponent(enquiryText())}`, '_blank', 'noopener');
  formStatus.textContent = 'Opening WhatsApp with your message. Press send there to reach our team.';
});

document.querySelector('[data-email-button]')?.addEventListener('click', () => {
  if (!enquiryForm.reportValidity()) return;
  const subject = encodeURIComponent('Cardamom enquiry from the Heritage Spices website');
  window.location.href = `mailto:${contact.email}?subject=${subject}&body=${encodeURIComponent(enquiryText())}`;
  formStatus.textContent = 'Opening your email app with your message.';
});

/* ---------- Scroll motion ---------- */
const pod = document.querySelector('[data-pod]');
const journey = document.querySelector('[data-journey]');
const journeyPod = document.querySelector('[data-journey-pod]');
const progressBar = document.querySelector('[data-progress-bar]');
const stateCaption = document.querySelector('[data-state-caption]');
const seeds = document.querySelector('[data-seeds]');
const stepLabels = [...document.querySelectorAll('[data-step-label]')];
const captions = ['Freshly harvested whole pod', 'The aroma begins inside', 'Selected for a clean, expressive finish'];
let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function clamp(value, min = 0, max = 1) { return Math.min(max, Math.max(min, value)); }
function updateMotion() {
  if (homeEl.hidden) {
    header.classList.add('is-scrolled');
    return;
  }
  const heroHeight = window.innerHeight * 1.1;
  const heroProgress = clamp(window.scrollY / heroHeight);
  if (pod && !reducedMotion) {
    const rotate = heroProgress * 420 - 18;
    const translateY = heroProgress * 160;
    const translateX = heroProgress * -80;
    const scale = 1.05 + heroProgress * 0.22;
    pod.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`;
  }
  if (journey) {
    const rect = journey.getBoundingClientRect();
    const range = Math.max(1, journey.offsetHeight - window.innerHeight);
    const progress = clamp(-rect.top / range);
    const stage = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2;
    progressBar.style.transform = `scaleX(${Math.max(progress, 0.04)})`;
    journeyPod.dataset.stage = String(stage);
    journeyPod.className = `journey-pod pod-state-${stage}`;
    stateCaption.textContent = captions[stage];
    seeds.classList.toggle('is-visible', stage === 2);
    stepLabels.forEach((label, index) => label.classList.toggle('is-active', index === stage));
    if (!reducedMotion) {
      const y = progress * 230 - 20;
      const rotation = progress * -24;
      journeyPod.style.transform = `translate3d(0, ${y}px, 0) rotate(${rotation}deg) scale(${1 + progress * 0.12})`;
    }
  }
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}

window.addEventListener('scroll', updateMotion, { passive: true });
window.addEventListener('resize', () => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  updateMotion();
});

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) entry.target.classList.add('is-visible');
}), { threshold: 0.12 });
document.querySelectorAll('.reveal, .range-card, .journal-grid article').forEach((element) => revealObserver.observe(element));

/* ---------- Journal pages (hash routes: #/journal and #/journal/<slug>) ---------- */
function renderArticleBody(body) {
  return body.map((block) => (block.startsWith('## ') ? `<h3>${block.slice(3)}</h3>` : `<p>${block}</p>`)).join('');
}

function renderJournalIndex() {
  return `
    <section class="page-section">
      <div class="section-kicker">The journal</div>
      <h1 class="page-title">Notes from<br /><em>the spice trail.</em></h1>
      <p class="page-lede">Short, practical reads on Idukki cardamom, quality and the conversations behind international spice trade.</p>
      <div class="journal-list">
        ${articles.map((article, index) => `
          <a class="journal-row" href="#/journal/${article.slug}">
            <span class="journal-row-num">0${index + 1}</span>
            <span class="journal-row-body"><span class="journal-meta">${article.tag} · ${article.readTime}</span><strong>${article.title}</strong><span>${article.summary}</span></span>
            <span class="journal-row-arrow" aria-hidden="true">↗</span>
          </a>`).join('')}
      </div>
    </section>`;
}

function renderArticle(article) {
  const index = articles.indexOf(article);
  const next = articles[(index + 1) % articles.length];
  return `
    <article class="page-section article">
      <a class="arrow-link back-link" href="#/journal"><span aria-hidden="true">←</span> All stories</a>
      <p class="journal-meta article-meta">${article.meta} · ${article.readTime}</p>
      <h1 class="page-title article-title">${article.title}</h1>
      <p class="page-lede">${article.summary}</p>
      <div class="article-body">${renderArticleBody(article.body)}</div>
      <div class="article-cta">
        <div><p class="eyebrow">Talk to Heritage Spices</p><strong>Have questions about Idukki cardamom?</strong></div>
        <a class="solid-button" href="#enquiry">Request a quote <span aria-hidden="true">↗</span></a>
      </div>
      <a class="next-article" href="#/journal/${next.slug}"><span class="journal-meta">Read next</span><strong>${next.title}</strong><span aria-hidden="true">↗</span></a>
    </article>`;
}

function route(initial = false) {
  const hash = decodeURIComponent(window.location.hash || '');
  const match = hash.match(/^#\/journal(?:\/([a-z0-9-]+))?$/);
  const wasHome = !homeEl.hidden;

  if (match) {
    const article = match[1] ? articles.find((item) => item.slug === match[1]) : null;
    pageEl.innerHTML = article ? renderArticle(article) : renderJournalIndex();
    document.title = article ? `${article.title} | Heritage Spices` : 'Journal | Heritage Spices';
    homeEl.hidden = true;
    pageEl.hidden = false;
    document.body.classList.add('on-page');
    window.scrollTo(0, 0);
  } else {
    pageEl.hidden = true;
    homeEl.hidden = false;
    document.body.classList.remove('on-page');
    document.title = siteTitle;
    const target = hash.length > 1 ? document.getElementById(hash.slice(1)) : null;
    if (!wasHome || (initial && target)) {
      requestAnimationFrame(() => {
        if (target) target.scrollIntoView();
        else window.scrollTo(0, 0);
        updateMotion();
      });
    } else if (!hash) {
      window.scrollTo(0, 0);
    }
  }
  mobileMenu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  updateMotion();
}

window.addEventListener('hashchange', () => route());
route(true);

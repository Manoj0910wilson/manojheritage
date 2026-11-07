import './style.css';
import './extras.css';
import { initFloatingPod, initExplode, initParallax } from './motion.js';

const body = document.body;
const root = body.dataset.root || './';
const lang = body.dataset.lang || 'en';

/* ---------- Old hash links (#/journal/...) now live on real pages ---------- */
const legacy = window.location.hash.match(/^#\/journal(?:\/([a-z0-9-]+))?$/);
if (legacy) {
  window.location.replace(`${root}journal/${legacy[1] ? `${legacy[1]}/` : ''}`);
}

/* ---------- Analytics helper (does nothing unless Google Analytics is configured) ---------- */
function track(name, params = {}) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params);
}
document.addEventListener('click', (event) => {
  const link = event.target.closest('[data-track="whatsapp"]');
  if (link) track('whatsapp_click', { page: location.pathname });
});

/* ---------- Header and mobile menu ---------- */
const header = document.querySelector('[data-header]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const menuButton = document.querySelector('[data-menu-button]');

menuButton?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

/* ---------- Site search (loads the index only when first opened) ---------- */
const searchPanel = document.querySelector('[data-search-panel]');
if (searchPanel) {
  const searchButton = document.querySelector('[data-search-button]');
  const closeSearch = document.querySelector('[data-close-search]');
  const searchInput = document.querySelector('[data-search-input]');
  const searchResults = document.querySelector('[data-search-results]');
  let indexPromise = null;

  const loadIndex = () => {
    if (!indexPromise) {
      indexPromise = fetch(`${root}search-index.json`).then((r) => r.json()).catch(() => []);
    }
    return indexPromise;
  };
  const open = () => {
    searchPanel.classList.add('is-open');
    searchPanel.setAttribute('aria-hidden', 'false');
    loadIndex();
    setTimeout(() => searchInput.focus(), 100);
  };
  const close = () => {
    searchPanel.classList.remove('is-open');
    searchPanel.setAttribute('aria-hidden', 'true');
  };
  const render = async (query) => {
    searchResults.textContent = '';
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return;
    const index = await loadIndex();
    const scored = index
      .map((item) => {
        const hay = `${item.t} ${item.d} ${item.k}`.toLowerCase();
        if (!terms.every((term) => hay.includes(term))) return null;
        const titleHits = terms.filter((term) => item.t.toLowerCase().includes(term)).length;
        return { item, score: titleHits * 3 + terms.length };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 7);
    if (!scored.length) {
      const empty = document.createElement('p');
      empty.className = 'search-empty';
      empty.textContent = `No results for “${query}”. Try “Dubai”, “sizes” or “export”.`;
      searchResults.append(empty);
      return;
    }
    scored.forEach(({ item }) => {
      const link = document.createElement('a');
      link.href = `${root}${item.u}`;
      const title = document.createElement('strong');
      title.textContent = item.t;
      const desc = document.createElement('span');
      desc.textContent = item.d;
      link.append(title, desc);
      searchResults.append(link);
    });
  };

  searchButton?.addEventListener('click', open);
  closeSearch?.addEventListener('click', close);
  searchInput.addEventListener('input', () => render(searchInput.value.trim()));
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') searchResults.querySelector('a')?.click();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
}

/* ---------- Enquiry forms (WhatsApp or email) ---------- */
document.querySelectorAll('[data-enquiry-form]').forEach((form) => {
  const status = form.querySelector('[data-form-status]');
  const emailButton = form.querySelector('[data-email-button]');
  const field = (name) => (form.elements.namedItem(name)?.value || '').trim();

  const buildText = () => [
    form.dataset.intro,
    '',
    `Name: ${field('name')}`,
    field('company') ? `Company: ${field('company')}` : null,
    `Country: ${field('country')}`,
    `Contact: ${field('reach')}`,
    '',
    `Requirements: ${field('message')}`,
    '',
    `(Sent from the website page: ${form.dataset.source})`,
  ].filter((line) => line !== null).join('\n');

  const messages = {
    en: { wa: 'Opening WhatsApp with your message. Press send there to reach our team.', mail: 'Opening your email app with your message.' },
    ar: { wa: 'يتم فتح واتساب مع رسالتك. اضغط إرسال هناك للوصول إلى فريقنا.', mail: 'يتم فتح تطبيق البريد الإلكتروني مع رسالتك.' },
  }[lang === 'ar' ? 'ar' : 'en'];

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    track('generate_lead', { method: 'whatsapp', source: form.dataset.source });
    window.open(`https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(buildText())}`, '_blank', 'noopener');
    status.textContent = messages.wa;
  });

  emailButton?.addEventListener('click', () => {
    if (!form.reportValidity()) return;
    track('generate_lead', { method: 'email', source: form.dataset.source });
    const subject = encodeURIComponent('Cardamom enquiry from the Heritage Spices website');
    window.location.href = `mailto:${form.dataset.email}?subject=${subject}&body=${encodeURIComponent(buildText())}`;
    status.textContent = messages.mail;
  });
});

/* ---------- Header state + home-page scroll motion ---------- */
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
if (body.classList.contains('is-home')) {
  initFloatingPod();
  initExplode();
  initParallax();
}

/* ---------- Reveal on scroll ---------- */
const revealTargets = document.querySelectorAll('.reveal, .range-card, .journal-grid article, .process-grid li');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
}

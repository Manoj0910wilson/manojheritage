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
  const a = event.target.closest('a[href]');
  if (!a) return;
  const h = a.getAttribute('href') || '';
  if (h.startsWith('tel:')) track('call_click', { page: location.pathname });
  else if (h.startsWith('mailto:')) track('email_click', { page: location.pathname });
  else if (/instagram\.com|facebook\.com|linkedin\.com/.test(h)) track('social_click', { network: (h.match(/instagram|facebook|linkedin/) || [''])[0], page: location.pathname });
  else if (/request-a-sample\/?$/.test(h)) track('sample_click', { page: location.pathname });
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
    searchPanel.removeAttribute('inert');
    searchPanel.classList.add('is-open');
    searchPanel.setAttribute('aria-hidden', 'false');
    loadIndex();
    setTimeout(() => searchInput.focus(), 100);
  };
  const close = () => {
    searchPanel.setAttribute('inert', '');
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
const DARK = '.photo, .range-card-photo, .contact-section, .cta-band, .site-footer, [data-dark]';
const headerItems = header ? [...header.querySelectorAll('.brand, .desktop-nav a, .header-actions > a, .header-actions > button')] : [];
let darkFrame = 0;
const paintHeader = () => {
  darkFrame = 0;
  const menuOpen = Boolean(mobileMenu?.classList.contains('is-open'));
  headerItems.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (!r.width) return;
    const hit = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2)
      .find((n) => !header.contains(n) && !n.classList?.contains('float-pod') && n.closest(DARK));
    el.classList.toggle('on-dark', Boolean(hit) && !menuOpen);
  });
};
const onScroll = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
  if (!darkFrame) darkFrame = requestAnimationFrame(paintHeader);
};
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


// Social follow dial: tap to pop out the profile icons
(() => {
  const dial = document.querySelector('[data-social-dial]');
  if (!dial) return;
  const toggle = dial.querySelector('.dial-toggle');
  const set = (open) => { dial.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); };
  const canHover = window.matchMedia('(hover: hover)').matches;
  toggle.addEventListener('click', (e) => { e.stopPropagation(); if (canHover) return; set(!dial.classList.contains('open')); });
  document.addEventListener('click', (e) => { if (!dial.contains(e.target)) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
})();


// Shop order panels: grade + weight dropdowns + quantity -> WhatsApp order message
document.querySelectorAll('[data-order]').forEach((panel) => {
  let cfg;
  try { cfg = JSON.parse(panel.getAttribute('data-config')); } catch { return; }
  const gSel = panel.querySelector('[data-op-grade]');
  const sel = panel.querySelector('[data-op-weight]');
  const out = panel.querySelector('[data-op-qty]');
  const total = panel.querySelector('[data-op-total]');
  const per = panel.querySelector('[data-op-per]');
  const img = panel.querySelector('[data-op-img]');
  const btn = panel.querySelector('[data-op-order]');
  let qty = 1;
  const fmt = (n) => '₹' + n.toLocaleString('en-IN');
  const grade = () => cfg.grades.find((g) => g.id === (gSel ? gSel.value : cfg.grades[0].id)) || cfg.grades[0];
  const fillWeights = () => {
    const cur = sel.value;
    const g = grade();
    sel.innerHTML = g.variants.map((v) => `<option value="${v.id}">${v.label} · ${fmt(v.price)}</option>`).join('');
    if (g.variants.some((v) => v.id === cur)) sel.value = cur;
  };
  const render = () => {
    const g = grade();
    const v = g.variants.find((x) => x.id === sel.value) || g.variants[0];
    out.textContent = String(qty);
    total.textContent = fmt(v.price * qty);
    per.textContent = qty > 1 ? `${qty} x ${fmt(v.price)} · ${fmt(v.perKg)} / kg` : `${fmt(v.perKg)} / kg`;
    if (img.getAttribute('src') !== v.img) img.setAttribute('src', v.img);
    const gl = cfg.multi ? ` (${g.label})` : '';
    const text = `Hello Heritage Spices, I would like to order:\n\n${cfg.name}${gl} - ${v.label} x ${qty}\nTotal: ${fmt(v.price * qty)}\n\nName:\nCity and PIN code:\n\nPlease confirm availability and delivery.`;
    btn.setAttribute('href', `https://wa.me/${cfg.wa}?text=${encodeURIComponent(text)}`);
    return { g, v };
  };
  if (gSel) gSel.addEventListener('change', () => { fillWeights(); render(); });
  sel.addEventListener('change', render);
  panel.querySelector('[data-op-minus]').addEventListener('click', () => { qty = Math.max(1, qty - 1); render(); });
  panel.querySelector('[data-op-plus]').addEventListener('click', () => { qty = Math.min(20, qty + 1); render(); });
  btn.addEventListener('click', () => { const { g, v } = render(); track('order_click', { product: cfg.name, grade: g.label, weight: v.label, quantity: qty, value: v.price * qty }); });
  // Remember the chosen size, weight and quantity across refreshes (and allow ?size=8mm&weight=5kg links)
  const key = 'hs-order-' + (cfg.name || 'p');
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; } },
    set(v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage unavailable */ } },
  };
  const save = () => store.set({ g: gSel ? gSel.value : null, w: sel.value, q: qty });
  fillWeights();
  const params = new URLSearchParams(location.search);
  const saved = store.get() || {};
  const wantG = (cfg.name === 'Green Cardamom' && params.get('size')) || saved.g;
  const wantW = (cfg.name === 'Green Cardamom' && params.get('weight')) || saved.w;
  if (gSel && wantG && cfg.grades.some((g) => g.id === wantG)) { gSel.value = wantG; fillWeights(); }
  if (wantW && grade().variants.some((v) => v.id === wantW)) sel.value = wantW;
  else if (grade().variants.some((v) => v.id === '1kg')) sel.value = '1kg';
  if (saved.q && Number(saved.q) >= 1 && Number(saved.q) <= 20) qty = Number(saved.q);
  panel.addEventListener('change', save);
  panel.addEventListener('click', () => setTimeout(save, 0));
  render();
});

// Header dropdowns: tap to open on touch screens, Escape or outside click to close
(() => {
  const groups = document.querySelectorAll('.nav-group');
  const closeAll = (except) => groups.forEach((g) => { if (g !== except) { g.classList.remove('is-open'); const b = g.querySelector('[data-nav-parent]'); if (b) b.setAttribute('aria-expanded', 'false'); } });
  groups.forEach((g) => {
    const btn = g.querySelector('[data-nav-parent]');
    if (!btn) return;
    btn.addEventListener('click', (e) => { e.stopPropagation(); const open = !g.classList.contains('is-open'); closeAll(g); g.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); });
  });
  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });
})();

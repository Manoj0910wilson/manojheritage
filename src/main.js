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
    const subject = encodeURIComponent('Cardamom enquiry from the Senvora Spices website');
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
    el.classList.toggle('on-dark', Boolean(hit) && !menuOpen && !header.classList.contains('is-scrolled'));
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


// ---------- Cart (saved in this browser, order is sent on WhatsApp) ----------
const CART_KEY = 'hs-cart';
const fmtInr = (n) => '₹' + n.toLocaleString('en-IN');
const cartStore = {
  get() { try { const c = JSON.parse(localStorage.getItem(CART_KEY) || '[]'); return Array.isArray(c) ? c.filter((i) => i && i.id && i.q > 0) : []; } catch { return []; } },
  set(c) { try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch { /* storage unavailable */ } updateCartBadge(); },
};
function cartCount() { return cartStore.get().reduce((n, i) => n + i.q, 0); }
function updateCartBadge() {
  const n = cartCount();
  document.querySelectorAll('[data-cart-count]').forEach((el) => { el.textContent = String(n); el.hidden = n === 0; });
  document.querySelectorAll('[data-cart-link]').forEach((el) => el.setAttribute('aria-label', n ? `Cart, ${n} item${n === 1 ? '' : 's'}` : 'Cart'));
}
updateCartBadge();
window.addEventListener('storage', updateCartBadge);

// Shop order panels: size + weight + quantity -> Add to cart
document.querySelectorAll('[data-order]').forEach((panel) => {
  let cfg;
  try { cfg = JSON.parse(panel.getAttribute('data-config')); } catch { return; }
  const gSel = panel.querySelector('[data-op-grade]');
  const sel = panel.querySelector('[data-op-weight]');
  const out = panel.querySelector('[data-op-qty]');
  const total = panel.querySelector('[data-op-total]');
  const per = panel.querySelector('[data-op-per]');
  const img = panel.querySelector('[data-op-img]');
  const addBtn = panel.querySelector('[data-op-add]');
  const added = panel.querySelector('[data-op-added]');
  let qty = 1;
  const grade = () => cfg.grades.find((g) => g.id === (gSel ? gSel.value : cfg.grades[0].id)) || cfg.grades[0];
  const fillWeights = () => {
    const cur = sel.value;
    const g = grade();
    sel.innerHTML = g.variants.map((v) => `<option value="${v.id}">${v.label} · ${fmtInr(v.price)}</option>`).join('');
    if (g.variants.some((v) => v.id === cur)) sel.value = cur;
  };
  const render = () => {
    const g = grade();
    const v = g.variants.find((x) => x.id === sel.value) || g.variants[0];
    out.textContent = String(qty);
    total.textContent = fmtInr(v.price * qty);
    per.textContent = qty > 1 ? `${qty} x ${fmtInr(v.price)} · ${fmtInr(v.perKg)} / kg` : `${fmtInr(v.perKg)} / kg`;
    if (img.getAttribute('src') !== v.img) img.setAttribute('src', v.img);
    return { g, v };
  };
  if (gSel) gSel.addEventListener('change', () => { fillWeights(); render(); });
  sel.addEventListener('change', () => { if (added) added.hidden = true; render(); });
  panel.querySelector('[data-op-minus]').addEventListener('click', () => { qty = Math.max(1, qty - 1); render(); });
  panel.querySelector('[data-op-plus]').addEventListener('click', () => { qty = Math.min(20, qty + 1); render(); });
  addBtn.addEventListener('click', () => {
    const { g, v } = render();
    const id = `${cfg.id || cfg.name}|${g.id}|${v.id}`;
    const cart = cartStore.get();
    const line = cart.find((i) => i.id === id);
    if (line) line.q = Math.min(50, line.q + qty);
    else cart.push({ id, name: cfg.name, gl: cfg.multi ? g.label : '', vl: v.label, price: v.price, perKg: v.perKg, img: v.img.split('/').pop(), q: qty });
    cartStore.set(cart);
    if (added) added.hidden = false;
    track('add_to_cart', { product: cfg.name, grade: g.label, weight: v.label, quantity: qty, value: v.price * qty });
  });
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

// Cart page: items, details, Place Order -> WhatsApp message with every line
(() => {
  const root = document.querySelector('[data-cart]');
  if (!root) return;
  const $ = (sel) => root.querySelector(sel);
  const packs = root.getAttribute('data-packs') || '';
  const wa = root.getAttribute('data-wa');
  const nameIn = $('[data-cart-name]'), cityIn = $('[data-cart-city]'), pinIn = $('[data-cart-pin]'), addrIn = $('[data-cart-addr]');
  const errEl = $('[data-cart-error]'), place = $('[data-cart-place]');
  const itemsEl = $('[data-cart-items]');
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sums = () => { const c = cartStore.get(); return { c, n: c.reduce((a, i) => a + i.q, 0), t: c.reduce((a, i) => a + i.q * i.price, 0) }; };
  const message = () => {
    const { c, t } = sums();
    const lines = c.map((i, k) => `${k + 1}. ${i.name}${i.gl ? ` (${i.gl})` : ''} - ${i.vl} x ${i.q} = ${fmtInr(i.q * i.price)}`).join('\n');
    const addr = addrIn && addrIn.value.trim() ? `\nAddress: ${addrIn.value.trim()}` : '';
    return `Hello Senvora Spices, I would like to place this order:\n\n${lines}\n\nTotal: ${fmtInr(t)} (delivery to be confirmed)\n\nName: ${nameIn.value.trim()}\nCity: ${cityIn.value.trim()}\nPIN code: ${pinIn.value.trim()}${addr}\n\nPlease confirm availability and delivery.`;
  };
  const draw = () => {
    const { c, n, t } = sums();
    const empty = c.length === 0;
    root.classList.toggle('is-empty', empty);
    $('[data-cart-empty]').hidden = !empty;
    $('[data-cart-n]').textContent = String(n);
    $('[data-cart-sub]').textContent = fmtInr(t);
    $('[data-cart-total2]').textContent = fmtInr(t);
    $('[data-cart-total]').textContent = fmtInr(t);
    itemsEl.innerHTML = c.map((i) => `
      <div class="cart-item" data-id="${esc(i.id)}">
        <div class="cart-thumb"><img src="${esc(packs + i.img)}" alt="" width="64" height="64" /><span>${i.q}</span></div>
        <div class="cart-info"><strong>${esc(i.name)}${i.gl ? ` ${esc(i.gl)}` : ''}</strong><small>${esc(i.vl)} pouch · ${fmtInr(i.price)} each</small>
          <div class="cart-ctl"><button type="button" data-dec aria-label="Decrease quantity">−</button><output>${i.q}</output><button type="button" data-inc aria-label="Increase quantity">+</button><button type="button" class="cart-remove" data-rm>Remove</button></div>
        </div>
        <strong class="cart-line">${fmtInr(i.q * i.price)}</strong>
      </div>`).join('');
    place.setAttribute('href', `https://wa.me/${wa}?text=${encodeURIComponent(message())}`);
  };
  itemsEl.addEventListener('click', (e) => {
    const row = e.target.closest('.cart-item'); if (!row) return;
    const cart = cartStore.get(); const line = cart.find((i) => i.id === row.getAttribute('data-id')); if (!line) return;
    if (e.target.closest('[data-inc]')) line.q = Math.min(50, line.q + 1);
    else if (e.target.closest('[data-dec]')) line.q = Math.max(1, line.q - 1);
    else if (e.target.closest('[data-rm]')) line.q = 0;
    else return;
    cartStore.set(cart); draw();
  });
  $('[data-cart-clear]').addEventListener('click', () => { cartStore.set([]); draw(); });
  const detailsOk = () => {
    const bad = [];
    if (nameIn.value.trim().length < 2) bad.push(nameIn);
    if (cityIn.value.trim().length < 2) bad.push(cityIn);
    if (!/^\d{6}$/.test(pinIn.value.trim())) bad.push(pinIn);
    [nameIn, cityIn, pinIn].forEach((el) => el.classList.toggle('is-invalid', bad.includes(el)));
    errEl.hidden = bad.length === 0;
    if (bad.length) bad[0].focus();
    return bad.length === 0;
  };
  [nameIn, cityIn, pinIn, addrIn].forEach((el) => el.addEventListener('input', () => {
    if (el === pinIn) el.value = el.value.replace(/\D/g, '').slice(0, 6);
    el.classList.remove('is-invalid'); if (!root.querySelector('.is-invalid')) errEl.hidden = true; draw();
    try { localStorage.setItem('hs-cust', JSON.stringify({ n: nameIn.value, c: cityIn.value, p: pinIn.value, a: addrIn.value })); } catch { /* storage unavailable */ }
  }));
  try { const c = JSON.parse(localStorage.getItem('hs-cust') || 'null'); if (c) { nameIn.value = c.n || ''; cityIn.value = c.c || ''; pinIn.value = c.p || ''; addrIn.value = c.a || ''; } } catch { /* ignore */ }
  place.addEventListener('click', (e) => {
    if (!detailsOk()) { e.preventDefault(); return; }
    const { n, t } = sums();
    draw();
    track('place_order', { items: n, value: t });
  });
  draw();
})();

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

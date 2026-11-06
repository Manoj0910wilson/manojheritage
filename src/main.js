import './style.css';
import './extras.css';

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

/* ---------- Scroll motion (home page only) ---------- */
const pod = document.querySelector('[data-pod]');
const journey = document.querySelector('[data-journey]');
const journeyPod = document.querySelector('[data-journey-pod]');
const progressBar = document.querySelector('[data-progress-bar]');
const stateCaption = document.querySelector('[data-state-caption]');
const seeds = document.querySelector('[data-seeds]');
const stepLabels = [...document.querySelectorAll('[data-step-label]')];
const captions = ['Freshly harvested whole pod', 'The aroma begins inside', 'Selected for a clean, expressive finish'];
let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

function updateMotion() {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
  if (!pod && !journey) return;
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
}

window.addEventListener('scroll', updateMotion, { passive: true });
window.addEventListener('resize', () => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  updateMotion();
});
updateMotion();

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

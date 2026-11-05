import './style.css';

const logoPath = '/manus-storage/HeritageSpicesCardamomEmblem_59a65003.png';
const podPath = '/manus-storage/heritage-cardamom-pod_c09e249e.png';

const navItems = [
  ['Our Story', '#story'],
  ['Our Spices', '#products'],
  ['Markets', '#markets'],
  ['Journal', '#journal'],
  ['Contact', '#contact'],
];

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
      <a class="outline-button" href="tel:+918939535151">Call +91 89395 35151</a>
    </div>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-haze"></div>
      <div class="hero-copy reveal">
        <p class="eyebrow">Premium cardamom · Idukki, Kerala</p>
        <h1 id="hero-title">Pure Cardamom.<br /><em>Rooted in Heritage.</em></h1>
        <p class="hero-lede">A bright, aromatic harvest sourced directly from the hills of Idukki and prepared for discerning kitchens around the world.</p>
        <div class="hero-actions">
          <a class="solid-button" href="#products">Explore our cardamom <span aria-hidden="true">↗</span></a>
          <a class="text-button" href="tel:+918939535151"><span class="phone-dot">⌕</span> Call +91 89395 35151</a>
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
        <article class="range-card range-card-main"><div class="card-number">01</div><div class="mini-pod mini-pod-whole"></div><h3>Whole green cardamom</h3><p>Fresh, fragrant pods with a naturally clean finish.</p><a href="#contact">Discuss your requirements <span>↗</span></a></article>
        <article class="range-card range-card-light"><div class="card-number">02</div><div class="seed-cluster"><i></i><i></i><i></i><i></i></div><h3>Selected seed profile</h3><p>Consistent selection for aroma-led food and beverage applications.</p><a href="#contact">Talk to our team <span>↗</span></a></article>
        <article class="range-card range-card-photo"><div class="card-number">03</div><div class="plant-line"></div><h3>Made for global buyers</h3><p>Origin-led conversations, clear communication, and flexible enquiries.</p><a href="#markets">See our markets <span>↗</span></a></article>
      </div>
    </section>

    <section class="markets-section" id="markets" aria-labelledby="markets-title">
      <div class="markets-visual"><div class="hill hill-back"></div><div class="hill hill-front"></div><div class="market-leaf market-leaf-one"></div><div class="market-leaf market-leaf-two"></div><span class="map-pin pin-origin">Idukki</span></div>
      <div class="markets-copy"><div class="section-kicker">04 / From our hills</div><h2 id="markets-title">From Idukki<br /><em>to global kitchens.</em></h2><p>Rooted in Kerala. Prepared for the world. Heritage Spices is building thoughtful supply relationships with buyers who value a traceable beginning and a distinctive finish.</p><div class="market-list"><span>Europe</span><span>Middle East</span><span>Southeast Asia</span></div><a class="solid-button" href="#contact">Talk to our export team <span>↗</span></a></div>
    </section>

    <section class="journal-section" id="journal" aria-labelledby="journal-title">
      <div class="section-kicker">05 / The journal</div>
      <div class="section-heading-row"><h2 id="journal-title">Notes from<br /><em>the spice trail.</em></h2><a class="arrow-link" href="#contact">View all stories <span>↗</span></a></div>
      <div class="journal-grid"><article><div class="journal-image journal-image-one"><span>Origin</span></div><p class="journal-meta">Field notes · Idukki</p><h3>Why Idukki cardamom has a character of its own</h3><a href="#contact">Read the note <span>↗</span></a></article><article><div class="journal-image journal-image-two"><span>Quality</span></div><p class="journal-meta">Buyer guide</p><h3>What to look for in a premium green pod</h3><a href="#contact">Read the note <span>↗</span></a></article><article><div class="journal-image journal-image-three"><span>Trade</span></div><p class="journal-meta">Export conversations</p><h3>Building clearer conversations across the supply chain</h3><a href="#contact">Read the note <span>↗</span></a></article></div>
    </section>

    <section class="contact-section" id="contact" aria-labelledby="contact-title">
      <div class="contact-pattern" aria-hidden="true"></div><div class="section-kicker">06 / Let’s talk</div><div class="contact-grid"><div><h2 id="contact-title">A better conversation<br /><em>starts with one pod.</em></h2><p>Tell us what you are looking for, where you are sourcing from, and how we can help you bring Kerala cardamom to your market.</p></div><div class="contact-actions"><a class="solid-button" href="tel:+918939535151">Call +91 89395 35151 <span>↗</span></a><a class="outline-button dark-outline" href="tel:+918939535151">Request a quote <span>↗</span></a><div class="placeholder-note">Email and social links will be added here once supplied.</div></div></div>
    </section>
  </main>

  <footer class="site-footer"><a class="brand footer-brand" href="#top"><img src="${logoPath}" alt="Heritage Spices" /></a><p>Pure cardamom. Rooted in heritage.</p><div class="footer-links"><a href="#story">Our Story</a><a href="#products">Our Spices</a><a href="#markets">Markets</a><a href="#journal">Journal</a><a href="#contact">Contact</a></div><span class="footer-legal">© 2026 Heritage Spices</span></footer>
  <div class="search-panel" data-search-panel aria-hidden="true"><button data-close-search aria-label="Close search">×</button><p class="eyebrow">Search Heritage Spices</p><input type="search" placeholder="Try “Idukki”, “quality”, or “export”" data-search-input /></div>
`;

const header = document.querySelector('[data-header]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const menuButton = document.querySelector('[data-menu-button]');
const searchPanel = document.querySelector('[data-search-panel]');
const searchButton = document.querySelector('[data-search-button]');
const closeSearch = document.querySelector('[data-close-search]');

menuButton.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.mobile-menu a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

searchButton.addEventListener('click', () => {
  searchPanel.classList.add('is-open');
  searchPanel.setAttribute('aria-hidden', 'false');
  setTimeout(() => document.querySelector('[data-search-input]')?.focus(), 100);
});
closeSearch.addEventListener('click', () => {
  searchPanel.classList.remove('is-open');
  searchPanel.setAttribute('aria-hidden', 'true');
});

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
updateMotion();

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) entry.target.classList.add('is-visible');
}), { threshold: 0.12 });
document.querySelectorAll('.reveal, .range-card, .journal-grid article').forEach((element) => revealObserver.observe(element));

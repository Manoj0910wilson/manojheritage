(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const v="./assets/heritage-spices-logo.png",m="./assets/heritage-cardamom-pod.png",f=[["Our Story","#story"],["Our Spices","#products"],["Markets","#markets"],["Journal","#journal"],["Contact","#contact"]],k=document.querySelector("#root");k.innerHTML=`
  <header class="site-header" data-header>
    <a class="brand" href="#top" aria-label="Heritage Spices home">
      <img src="${v}" alt="Heritage Spices" />
    </a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      ${f.map(([a,t])=>`<a href="${t}">${a}</a>`).join("")}
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
      ${f.map(([a,t])=>`<a href="${t}">${a}</a>`).join("")}
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
        <img class="pod-image" data-pod src="${m}" alt="A fresh green cardamom pod" />
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
            <img src="${m}" alt="Cardamom pod in three product-story states" />
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

  <footer class="site-footer"><a class="brand footer-brand" href="#top"><img src="${v}" alt="Heritage Spices" /></a><p>Pure cardamom. Rooted in heritage.</p><div class="footer-links"><a href="#story">Our Story</a><a href="#products">Our Spices</a><a href="#markets">Markets</a><a href="#journal">Journal</a><a href="#contact">Contact</a></div><span class="footer-legal">© 2026 Heritage Spices</span></footer>
  <div class="search-panel" data-search-panel aria-hidden="true"><button data-close-search aria-label="Close search">×</button><p class="eyebrow">Search Heritage Spices</p><input type="search" placeholder="Try “Idukki”, “quality”, or “export”" data-search-input /></div>
`;const w=document.querySelector("[data-header]"),y=document.querySelector("[data-mobile-menu]"),p=document.querySelector("[data-menu-button]"),n=document.querySelector("[data-search-panel]"),j=document.querySelector("[data-search-button]"),S=document.querySelector("[data-close-search]");p.addEventListener("click",()=>{const a=y.classList.toggle("is-open");p.setAttribute("aria-expanded",String(a))});document.querySelectorAll(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>{y.classList.remove("is-open"),p.setAttribute("aria-expanded","false")}));j.addEventListener("click",()=>{n.classList.add("is-open"),n.setAttribute("aria-hidden","false"),setTimeout(()=>{var a;return(a=document.querySelector("[data-search-input]"))==null?void 0:a.focus()},100)});S.addEventListener("click",()=>{n.classList.remove("is-open"),n.setAttribute("aria-hidden","true")});const g=document.querySelector("[data-pod]"),d=document.querySelector("[data-journey]"),l=document.querySelector("[data-journey-pod]"),q=document.querySelector("[data-progress-bar]"),x=document.querySelector("[data-state-caption]"),L=document.querySelector("[data-seeds]"),$=[...document.querySelectorAll("[data-step-label]")],E=["Freshly harvested whole pod","The aroma begins inside","Selected for a clean, expressive finish"];let u=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function b(a,t=0,r=1){return Math.min(r,Math.max(t,a))}function h(){const a=window.innerHeight*1.1,t=b(window.scrollY/a);if(g&&!u){const r=t*420-18,o=t*160,e=t*-80,s=1.05+t*.22;g.style.transform=`translate3d(${e}px, ${o}px, 0) rotate(${r}deg) scale(${s})`}if(d){const r=d.getBoundingClientRect(),o=Math.max(1,d.offsetHeight-window.innerHeight),e=b(-r.top/o),s=e<.34?0:e<.67?1:2;if(q.style.transform=`scaleX(${Math.max(e,.04)})`,l.dataset.stage=String(s),l.className=`journey-pod pod-state-${s}`,x.textContent=E[s],L.classList.toggle("is-visible",s===2),$.forEach((i,c)=>i.classList.toggle("is-active",c===s)),!u){const i=e*230-20,c=e*-24;l.style.transform=`translate3d(0, ${i}px, 0) rotate(${c}deg) scale(${1+e*.12})`}}w.classList.toggle("is-scrolled",window.scrollY>24)}window.addEventListener("scroll",h,{passive:!0});window.addEventListener("resize",()=>{u=window.matchMedia("(prefers-reduced-motion: reduce)").matches,h()});h();const O=new IntersectionObserver(a=>a.forEach(t=>{t.isIntersecting&&t.target.classList.add("is-visible")}),{threshold:.12});document.querySelectorAll(".reveal, .range-card, .journal-grid article").forEach(a=>O.observe(a));

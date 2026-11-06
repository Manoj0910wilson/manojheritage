(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function r(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=r(a);fetch(a.href,s)}})();const i={phoneDisplay:"+91 89395 35151",phoneTel:"+918939535151",whatsapp:"918939535151",email:"",social:[]},l=[{slug:"why-idukki-cardamom-has-a-character-of-its-own",tag:"Origin",meta:"Field notes · Idukki",readTime:"3 min read",title:"Why Idukki cardamom has a character of its own",summary:"How hills, shade, rain and careful hand harvesting shape the aroma of cardamom from the Western Ghats.",body:["Cardamom is a plant of the forest understory. It grows best on cool, humid, shaded hillsides with steady rainfall, which describes much of the Western Ghats in Kerala. Idukki district sits in the middle of that landscape and is closely tied to the story of Indian cardamom. The surrounding region is often called the Cardamom Hills.","## Hills, shade and rain","Elevation, regular rain and filtered light all influence how a cardamom plant grows and how its pods develop. Plantations in Idukki are commonly laid out beneath taller shade trees, which keeps the plants cool and protects the soil. Many are managed at a small scale, often by families who know their land closely.","## A harvest that comes in rounds","Cardamom pods do not ripen all at once. A plant flowers and fruits over an extended period, so pickers return to the same plants several times in a season and choose pods at the right stage of maturity by hand. Picking at the right moment matters because it affects colour, aroma and how well a pod holds its character after drying.","## Why origin matters to a buyer","For a buyer, origin is more than a place name. Knowing where a pod was grown, and who grew it, makes it easier to talk about consistency, to trace a lot, and to understand why one harvest smells and tastes the way it does. That is the idea behind Heritage Spices: staying close to the farmers of Idukki and keeping the conversation clear from the first sample to the final shipment."]},{slug:"what-to-look-for-in-a-premium-green-pod",tag:"Quality",meta:"Buyer guide",readTime:"3 min read",title:"What to look for in a premium green pod",summary:"A simple checklist for judging colour, size, aroma and consistency in green cardamom.",body:["Green cardamom is judged first with the eyes and the nose. Specifications and lab tests matter too, but an experienced buyer can learn a great deal from a handful of pods on a table.","## Colour","Good green cardamom is known for a bright, even green. Pods that look pale, patchy or bleached can point to uneven drying or long storage. Colour is not the only measure of quality, but it is often the first thing a buyer notices.","## Size and uniformity","Pods are usually graded by size, and size is often discussed alongside price and intended use. Just as important is uniformity: a lot where the pods are similar in size, shape and colour is easier to work with and easier to repeat from one shipment to the next.","## Aroma","Break a pod or crush a few seeds and smell them. The aroma should be fresh, sweet and clean. Musty, flat or dusty notes suggest moisture or old stock.","## Condition and cleanliness","Look for whole pods with few splits, stalks or foreign matter. Moisture control matters, because pods that are too damp can deteriorate in storage and in transit.","## Ask for a sample","The best way to judge any lot is to see it. Ask for a sample, compare it with your own specification, and talk through the points that matter for your market, such as grade, packing and how the cardamom will be used."]},{slug:"building-clearer-conversations-across-the-supply-chain",tag:"Trade",meta:"Export conversations",readTime:"3 min read",title:"Building clearer conversations across the supply chain",summary:"Practical points that help importers and exporters agree on specifications, samples and paperwork early.",body:["Most problems in the spice trade are not caused by the spice. They come from a gap between what the buyer imagined and what the supplier understood. Clear conversations at the start prevent most of them.","## Start with the specification","Describe the product you need in plain terms: grade or size, colour, moisture expectations, packing and the market it is for. A written specification gives both sides something to check against.","## Agree on samples","Samples are the common language of the trade. Agree what the sample represents, how it was drawn from the lot, and what the buyer will approve before anything ships.","## Raise paperwork early","Documents and requirements differ by destination country. Buyers should share any import rules, testing or labelling needs at the start, and suppliers should confirm what they can provide, so there are no surprises close to the shipping date.","## Keep communication simple","Quick, direct answers, a single point of contact and honest updates on harvest and availability go a long way. Heritage Spices welcomes enquiries from importers, distributors and food and beverage makers, and is happy to talk through requirements before anything is committed."]}],S="./assets/heritage-spices-logo.png",j="./assets/heritage-cardamom-pod.png",x=[["Our Story","#story"],["Our Spices","#products"],["Markets","#markets"],["Journal","#journal"],["Contact","#contact"]],g=`tel:${i.phoneTel}`,M=`https://wa.me/${i.whatsapp}`,C=`${M}?text=${encodeURIComponent("Hello Heritage Spices, I would like to enquire about your cardamom.")}`,A=["one","two","three"],L=[null,...i.social.map(e=>({label:e.label,href:e.url}))].filter(Boolean),R=L.length?`<ul class="contact-links">${L.map(e=>`<li><a href="${e.href}" ${e.href.startsWith("mailto:")?"":'target="_blank" rel="noopener"'}>${e.label} <span aria-hidden="true">↗</span></a></li>`).join("")}</ul>`:"",B=i.social.length?`<div class="footer-social">${i.social.map(e=>`<a href="${e.url}" target="_blank" rel="noopener">${e.label}</a>`).join("")}</div>`:"",F=l.map((e,t)=>`
  <article>
    <div class="journal-image journal-image-${A[t%A.length]}"><span>${e.tag}</span></div>
    <p class="journal-meta">${e.meta}</p>
    <h3>${e.title}</h3>
    <a href="#/journal/${e.slug}">Read the note <span>↗</span></a>
  </article>`).join(""),D=document.querySelector("#root");D.innerHTML=`
  <header class="site-header" data-header>
    <a class="brand" href="#top" aria-label="Heritage Spices home">
      <img src="${S}" alt="Heritage Spices" />
    </a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      ${x.map(([e,t])=>`<a href="${t}">${e}</a>`).join("")}
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
      ${x.map(([e,t])=>`<a href="${t}">${e}</a>`).join("")}
      <a class="outline-button" href="${g}">Call ${i.phoneDisplay}</a>
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
          <a class="text-button" href="${g}"><span class="phone-dot">⌕</span> Call ${i.phoneDisplay}</a>
        </div>
        <div class="hero-proof"><span>Direct from farmers</span><i></i><span>Carefully selected</span><i></i><span>Export-ready quality</span></div>
      </div>
      <div class="hero-stage" data-stage aria-label="Animated cardamom pod">
        <div class="orbit orbit-one"></div>
        <div class="orbit orbit-two"></div>
        <div class="leaf leaf-a"></div><div class="leaf leaf-b"></div><div class="leaf leaf-c"></div>
        <div class="pod-shadow"></div>
        <img class="pod-image" data-pod src="${j}" alt="A fresh green cardamom pod" />
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
            <img src="${j}" alt="Cardamom pod in three product-story states" />
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
      <div class="journal-grid">${F}</div>
    </section>

    <section class="contact-section" id="contact" aria-labelledby="contact-title">
      <div class="contact-pattern" aria-hidden="true"></div><div class="section-kicker">06 / Let’s talk</div>
      <div class="contact-grid">
        <div><h2 id="contact-title">A better conversation<br /><em>starts with one pod.</em></h2><p>Tell us what you are looking for, where you are sourcing from, and how we can help you bring Kerala cardamom to your market.</p></div>
        <div class="contact-actions">
          <a class="solid-button" href="${g}">Call ${i.phoneDisplay} <span>↗</span></a>
          <a class="outline-button dark-outline" href="${C}" target="_blank" rel="noopener">Chat on WhatsApp <span>↗</span></a>
          <a class="outline-button dark-outline" href="#enquiry">Request a quote <span>↗</span></a>
          ${R}
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
            
          </div>
          <p class="form-status" data-form-status role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  </main>

  <div class="page-view" data-page hidden></div>

  <footer class="site-footer"><a class="brand footer-brand" href="#top"><img src="${S}" alt="Heritage Spices" /></a><p>Pure cardamom. Rooted in heritage.</p><div class="footer-links"><a href="#story">Our Story</a><a href="#products">Our Spices</a><a href="#markets">Markets</a><a href="#/journal">Journal</a><a href="#contact">Contact</a></div><span class="footer-legal">© 2026 Heritage Spices</span>${B}</footer>

  <a class="wa-float" href="${C}" target="_blank" rel="noopener" aria-label="Chat with Heritage Spices on WhatsApp">
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.2 3.6c-.4.3-1-.0-1-.5V16A2.5 2.5 0 0 1 4 13.5z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
    <span>WhatsApp</span>
  </a>

  <div class="search-panel" data-search-panel aria-hidden="true">
    <button data-close-search aria-label="Close search">×</button>
    <p class="eyebrow">Search Heritage Spices</p>
    <input type="search" placeholder="Try “Idukki”, “quality”, or “export”" data-search-input autocomplete="off" />
    <div class="search-results" data-search-results></div>
  </div>
`;const E=document.querySelector("[data-header]"),k=document.querySelector("[data-mobile-menu]"),p=document.querySelector("[data-menu-button]"),u=document.querySelector("[data-search-panel]"),z=document.querySelector("[data-search-button]"),N=document.querySelector("[data-close-search]"),h=document.querySelector("[data-search-input]"),d=document.querySelector("[data-search-results]"),c=document.querySelector("[data-home]"),y=document.querySelector("[data-page]"),K=document.title;p.addEventListener("click",()=>{const e=k.classList.toggle("is-open");p.setAttribute("aria-expanded",String(e))});document.querySelectorAll(".mobile-menu a").forEach(e=>e.addEventListener("click",()=>{k.classList.remove("is-open"),p.setAttribute("aria-expanded","false")}));const J=[{title:"Our Story",desc:"Farmer-direct relationships in Idukki and careful selection.",href:"#story",keywords:"story heritage farmers care selection preparation origin"},{title:"Our Spices",desc:"Whole green cardamom from pod to seed.",href:"#products",keywords:"products spices cardamom pod seed green whole aroma format"},{title:"Markets",desc:"Europe, Middle East and Southeast Asia.",href:"#markets",keywords:"markets export europe middle east southeast asia global buyers countries"},{title:"Journal",desc:"Notes from the spice trail.",href:"#/journal",keywords:"journal blog notes stories articles"},{title:"Contact & enquiries",desc:"Call, WhatsApp or request a quote.",href:"#contact",keywords:"contact call phone whatsapp quote enquire enquiry email"},...l.map(e=>({title:e.title,desc:e.summary,href:`#/journal/${e.slug}`,keywords:`${e.tag} ${e.meta} ${e.body.join(" ")}`}))];function U(){u.classList.add("is-open"),u.setAttribute("aria-hidden","false"),setTimeout(()=>h.focus(),100)}function $(){u.classList.remove("is-open"),u.setAttribute("aria-hidden","true")}function Y(e){d.textContent="";const t=e.toLowerCase().split(/\s+/).filter(Boolean);if(!t.length)return;const r=J.filter(o=>{const a=`${o.title} ${o.desc} ${o.keywords}`.toLowerCase();return t.every(s=>a.includes(s))}).slice(0,6);if(!r.length){const o=document.createElement("p");o.className="search-empty",o.textContent=`No results for “${e}”. Try “Idukki”, “quality” or “export”.`,d.append(o);return}r.forEach(o=>{const a=document.createElement("a");a.href=o.href;const s=document.createElement("strong");s.textContent=o.title;const n=document.createElement("span");n.textContent=o.desc,a.append(s,n),a.addEventListener("click",$),d.append(a)})}z.addEventListener("click",U);N.addEventListener("click",$);h.addEventListener("input",()=>Y(h.value.trim()));h.addEventListener("keydown",e=>{var t;e.key==="Enter"&&((t=d.querySelector("a"))==null||t.click())});document.addEventListener("keydown",e=>{e.key==="Escape"&&$()});const q=document.querySelector("[data-enquiry-form]"),P=document.querySelector("[data-form-status]");function O(){const e=new FormData(q);return["Hello Heritage Spices, I would like to request a quote for cardamom.","",`Name: ${e.get("name")}`,e.get("company")?`Company: ${e.get("company")}`:null,`Country: ${e.get("country")}`,`Contact: ${e.get("reach")}`,"",`Requirements: ${e.get("message")}`].filter(r=>r!==null).join(`
`)}q.addEventListener("submit",e=>{e.preventDefault(),window.open(`${M}?text=${encodeURIComponent(O())}`,"_blank","noopener"),P.textContent="Opening WhatsApp with your message. Press send there to reach our team."});var H;(H=document.querySelector("[data-email-button]"))==null||H.addEventListener("click",()=>{if(!q.reportValidity())return;const e=encodeURIComponent("Cardamom enquiry from the Heritage Spices website");window.location.href=`mailto:${i.email}?subject=${e}&body=${encodeURIComponent(O())}`,P.textContent="Opening your email app with your message."});const I=document.querySelector("[data-pod]"),v=document.querySelector("[data-journey]"),b=document.querySelector("[data-journey-pod]"),_=document.querySelector("[data-progress-bar]"),G=document.querySelector("[data-state-caption]"),V=document.querySelector("[data-seeds]"),Q=[...document.querySelectorAll("[data-step-label]")],X=["Freshly harvested whole pod","The aroma begins inside","Selected for a clean, expressive finish"];let w=window.matchMedia("(prefers-reduced-motion: reduce)").matches;function T(e,t=0,r=1){return Math.min(r,Math.max(t,e))}function m(){if(c.hidden){E.classList.add("is-scrolled");return}const e=window.innerHeight*1.1,t=T(window.scrollY/e);if(I&&!w){const r=t*420-18,o=t*160,a=t*-80,s=1.05+t*.22;I.style.transform=`translate3d(${a}px, ${o}px, 0) rotate(${r}deg) scale(${s})`}if(v){const r=v.getBoundingClientRect(),o=Math.max(1,v.offsetHeight-window.innerHeight),a=T(-r.top/o),s=a<.34?0:a<.67?1:2;if(_.style.transform=`scaleX(${Math.max(a,.04)})`,b.dataset.stage=String(s),b.className=`journey-pod pod-state-${s}`,G.textContent=X[s],V.classList.toggle("is-visible",s===2),Q.forEach((n,f)=>n.classList.toggle("is-active",f===s)),!w){const n=a*230-20,f=a*-24;b.style.transform=`translate3d(0, ${n}px, 0) rotate(${f}deg) scale(${1+a*.12})`}}E.classList.toggle("is-scrolled",window.scrollY>24)}window.addEventListener("scroll",m,{passive:!0});window.addEventListener("resize",()=>{w=window.matchMedia("(prefers-reduced-motion: reduce)").matches,m()});const Z=new IntersectionObserver(e=>e.forEach(t=>{t.isIntersecting&&t.target.classList.add("is-visible")}),{threshold:.12});document.querySelectorAll(".reveal, .range-card, .journal-grid article").forEach(e=>Z.observe(e));function ee(e){return e.map(t=>t.startsWith("## ")?`<h3>${t.slice(3)}</h3>`:`<p>${t}</p>`).join("")}function ae(){return`
    <section class="page-section">
      <div class="section-kicker">The journal</div>
      <h1 class="page-title">Notes from<br /><em>the spice trail.</em></h1>
      <p class="page-lede">Short, practical reads on Idukki cardamom, quality and the conversations behind international spice trade.</p>
      <div class="journal-list">
        ${l.map((e,t)=>`
          <a class="journal-row" href="#/journal/${e.slug}">
            <span class="journal-row-num">0${t+1}</span>
            <span class="journal-row-body"><span class="journal-meta">${e.tag} · ${e.readTime}</span><strong>${e.title}</strong><span>${e.summary}</span></span>
            <span class="journal-row-arrow" aria-hidden="true">↗</span>
          </a>`).join("")}
      </div>
    </section>`}function te(e){const t=l.indexOf(e),r=l[(t+1)%l.length];return`
    <article class="page-section article">
      <a class="arrow-link back-link" href="#/journal"><span aria-hidden="true">←</span> All stories</a>
      <p class="journal-meta article-meta">${e.meta} · ${e.readTime}</p>
      <h1 class="page-title article-title">${e.title}</h1>
      <p class="page-lede">${e.summary}</p>
      <div class="article-body">${ee(e.body)}</div>
      <div class="article-cta">
        <div><p class="eyebrow">Talk to Heritage Spices</p><strong>Have questions about Idukki cardamom?</strong></div>
        <a class="solid-button" href="#enquiry">Request a quote <span aria-hidden="true">↗</span></a>
      </div>
      <a class="next-article" href="#/journal/${r.slug}"><span class="journal-meta">Read next</span><strong>${r.title}</strong><span aria-hidden="true">↗</span></a>
    </article>`}function W(e=!1){const t=decodeURIComponent(window.location.hash||""),r=t.match(/^#\/journal(?:\/([a-z0-9-]+))?$/),o=!c.hidden;if(r){const a=r[1]?l.find(s=>s.slug===r[1]):null;y.innerHTML=a?te(a):ae(),document.title=a?`${a.title} | Heritage Spices`:"Journal | Heritage Spices",c.hidden=!0,y.hidden=!1,document.body.classList.add("on-page"),window.scrollTo(0,0)}else{y.hidden=!0,c.hidden=!1,document.body.classList.remove("on-page"),document.title=K;const a=t.length>1?document.getElementById(t.slice(1)):null;!o||e&&a?requestAnimationFrame(()=>{a?a.scrollIntoView():window.scrollTo(0,0),m()}):t||window.scrollTo(0,0)}k.classList.remove("is-open"),p.setAttribute("aria-expanded","false"),m()}window.addEventListener("hashchange",()=>W());W(!0);

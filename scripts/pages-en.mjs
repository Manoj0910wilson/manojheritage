import { indiaPages } from '../content/india.mjs';
import {
  site, articles, markets, href, inline, plainText, esc, pageHero, ctaBand, faqList, stepsList, specTable,
  articleBody, enquiryForm, contactDetails, breadcrumbs, organizationLd, websiteLd, breadcrumbLd, faqLd,
  waHello, whatsappLink, tel, absUrl,
} from './templates.mjs';

const journalClasses = ['one', 'two', 'three'];
const sampleWa = whatsappLink('Hello Heritage Spices, I would like to request a cardamom sample.');

/* =========================================================
   HOME (keeps the approved animated design, now pre-rendered)
   ========================================================= */
function homeMain(ctx) {
  const pod = href(ctx, 'assets/heritage-cardamom-pod.webp');
  const img = (name) => href(ctx, `assets/img/${name}`);
  const stage = (name) => href(ctx, `assets/stages/${name}`);
  const journalCards = articles.slice(0, 3).map((a, i) => `
      <article>
        <div class="journal-image journal-image-${journalClasses[i]}"><span>${a.tag}</span></div>
        <p class="journal-meta">${a.meta}</p>
        <h3>${a.title}</h3>
        <a href="${href(ctx, `journal/${a.slug}/`)}">Read the note <span>↗</span></a>
      </article>`).join('');
  return `
    <div id="top"></div>
    <canvas class="float-pod" data-float-pod data-frames="${href(ctx, 'assets/pod/f')}" data-count="62" width="560" height="273" aria-hidden="true"></canvas>
    <section class="hero" aria-labelledby="hero-title" data-pod="0.78,0.52,340,-4,1" data-pod-m="0.74,0.87,300,-4,1">
      <div class="hero-bg" aria-hidden="true">
        <img src="${img('hills-1600.webp')}" srcset="${img('hills-900.webp')} 900w, ${img('hills-1600.webp')} 1600w" sizes="100vw" alt="" width="1600" height="907" fetchpriority="high" decoding="async" />
      </div>
      <div class="hero-haze"></div>
      <div class="hero-copy reveal">
        <p class="eyebrow">Premium cardamom · Idukki, Kerala</p>
        <h1 id="hero-title">Pure Cardamom.<br /><em>Rooted in Heritage.</em></h1>
        <p class="hero-lede">A bright, aromatic harvest sourced directly from the hills of Idukki and prepared for discerning kitchens around the world.</p>
        <p class="hero-markets">Supplying buyers across <a href="${href(ctx, 'india/')}">India</a> and importers in the <a href="${href(ctx, 'markets/uae/')}">UAE</a>, <a href="${href(ctx, 'markets/saudi-arabia/')}">Saudi Arabia</a>, <a href="${href(ctx, 'markets/qatar/')}">Qatar</a> and the <a href="${href(ctx, 'markets/')}">Gulf</a>.</p>
        <div class="hero-actions">
          <a class="solid-button" href="${href(ctx, 'products/green-cardamom/')}">Explore our cardamom <span aria-hidden="true">↗</span></a>
          <a class="text-button" href="${href(ctx, 'request-a-sample/')}"><span class="phone-dot">✦</span> Request a sample</a>
        </div>
        <div class="hero-proof"><span>Direct from farmers</span><i></i><span>Carefully selected</span><i></i><span>Export-ready quality</span></div>
      </div>
      <div class="hero-stage" data-stage aria-label="Animated cardamom pod">
        <img class="pod-image" src="${pod}" alt="A fresh green cardamom pod from Idukki" width="993" height="1000" fetchpriority="high" />
        <p class="stage-note">Scroll to explore <span>↓</span></p>
      </div>
      <div class="hero-origin"><span class="origin-pin"></span><span>Idukki, Kerala<br />India</span></div>
      <div class="hero-bottom-line"></div>
    </section>

    <section class="intro-section" id="story" aria-labelledby="story-title" data-pod="0.5,0.62,230,10,1">
      <div class="section-kicker">01 / The heritage</div>
      <div class="intro-grid">
        <h2 id="story-title">A small pod.<br /><em>A lasting impression.</em></h2>
        <div class="intro-text">
          <p>We believe exceptional cardamom begins with exceptional care. From farmer-direct relationships in Idukki to careful selection and preparation, every pod carries the character of its origin.</p>
          <a class="arrow-link" href="${href(ctx, 'about/')}">Our story <span>↗</span></a>
        </div>
      </div>
      <div class="intro-photos">
        <figure class="photo photo-tall" data-parallax>
          <img src="${img('plant.webp')}" alt="Cardamom plant with clusters of green pods growing close to the ground" width="736" height="1104" loading="lazy" decoding="async" />
          <figcaption>Grown in the shade of the hills</figcaption>
        </figure>
        <figure class="photo photo-wide" data-parallax>
          <img src="${img('farmers.webp')}" alt="Two harvesters holding baskets of freshly picked green pods in a plantation" width="900" height="1158" loading="lazy" decoding="async" />
          <figcaption>Hand harvesting, season by season</figcaption>
        </figure>
      </div>
    </section>

    <section class="explode" id="products" data-explode aria-labelledby="explode-title">
      <div class="explode-head">
        <div class="section-kicker">02 / The product</div>
        <h2 id="explode-title">Discover<br /><em>what is inside.</em></h2>
        <p>Keep scrolling and the pod opens up: the whole pod, the pod split open, and the seeds that carry the aroma.</p>
      </div>
      <div class="explode-track" data-explode-track>
        <div class="explode-sticky">
          <div class="explode-glow"></div>
          <div class="explode-stage" data-explode-stage>
            <div class="ex ex-seeds"><img src="${stage('seeds.webp')}" alt="Cardamom seeds" width="380" height="237" loading="lazy" decoding="async" /></div>
            <img class="ex ex-seed es1" src="${stage('seed-1.webp')}" alt="" width="184" height="114" loading="lazy" />
            <img class="ex ex-seed es2" src="${stage('seed-1.webp')}" alt="" width="184" height="114" loading="lazy" />
            <img class="ex ex-seed es3" src="${stage('seed-1.webp')}" alt="" width="184" height="114" loading="lazy" />
            <div class="ex ex-open"><img src="${stage('open.webp')}" alt="A green cardamom pod split open to show the seeds" width="900" height="527" loading="lazy" decoding="async" /></div>
            <div class="ex ex-whole"><img src="${stage('whole.webp')}" alt="A whole green cardamom pod" width="690" height="310" loading="lazy" decoding="async" /></div>
            <span class="ex-label ex-label-whole">01 · Whole pod</span>
            <span class="ex-label ex-label-open">02 · Inside the pod</span>
            <span class="ex-label ex-label-seeds">03 · The seeds</span>
          </div>
        </div>
      </div>
      <div class="stage-cards">
        <article class="info-card"><span class="card-index">01 · WHOLE POD</span><h3>What buyers judge first</h3><p>Colour, size, aroma and cleanliness are what we select for, and what we invite you to check against your own specification in a sample.</p></article>
        <article class="info-card"><span class="card-index">02 · INSIDE THE POD</span><h3>Where the aroma lives</h3><p>The husk protects small dark seeds until the pod is opened, which is why whole pods hold their fragrance well in storage and transit.</p></article>
        <article class="info-card"><span class="card-index">03 · THE SEEDS</span><h3>Where it is used</h3><p>Arabic coffee, tea and karak, sweets and desserts, rice dishes and spice blends. <a class="arrow-link" href="${href(ctx, 'journal/cardamom-in-arabic-coffee/')}">Cardamom in Arabic coffee <span>↗</span></a></p></article>
      </div>
      <div class="detail-strip">
        <dl>
          <div><dt>Origin</dt><dd>Idukki, Kerala</dd></div>
          <div><dt>Source</dt><dd>Direct from farmers</dd></div>
          <div><dt>Format</dt><dd>Whole green cardamom</dd></div>
        </dl>
        <a class="solid-button" href="${href(ctx, 'products/green-cardamom/')}">See specifications <span aria-hidden="true">↗</span></a>
      </div>
    </section>

    <section class="products-section" aria-labelledby="range-title" data-pod="0.94,0.1,150,-12,1">
      <div class="section-kicker">03 / The range</div>
      <div class="section-heading-row"><h2 id="range-title">The character<br /><em>of the harvest.</em></h2><p>Built for buyers who care where every flavour begins.</p></div>
      <div class="range-grid">
        <article class="range-card range-card-main"><div class="card-number">01</div><img class="range-img" src="${stage('whole.webp')}" alt="Whole green cardamom pod" width="690" height="310" loading="lazy" decoding="async" /><h3>Whole green cardamom</h3><p>Fresh, fragrant pods with a naturally clean finish.</p><a href="${href(ctx, 'products/green-cardamom/')}">View the product <span>↗</span></a></article>
        <article class="range-card range-card-light"><div class="card-number">02</div><img class="range-img range-img-seeds" src="${stage('seeds.webp')}" alt="Cardamom seeds" width="380" height="237" loading="lazy" decoding="async" /><h3>Selected seed profile</h3><p>Consistent selection for aroma-led food and beverage applications.</p><a href="${href(ctx, 'products/cardamom-seeds/')}">View the product <span>↗</span></a></article>
        <article class="range-card range-card-photo"><div class="card-number">03</div><img class="range-bg" src="${img('plant.webp')}" alt="" width="736" height="1104" loading="lazy" decoding="async" /><h3>Made for global buyers</h3><p>Origin-led conversations, clear communication, and flexible enquiries.</p><a href="${href(ctx, 'markets/')}">See our markets <span>↗</span></a></article>
      </div>
    </section>

    <section class="markets-section" id="markets" aria-labelledby="markets-title" data-pod="0.455,0.62,230,8,1">
      <div class="markets-visual"><img class="markets-photo" src="${img('hills-1600.webp')}" alt="Misty plantation hills at sunrise in Kerala" width="1600" height="907" loading="lazy" decoding="async" /><span class="map-pin pin-origin">Idukki, Kerala</span></div>
      <div class="markets-copy"><div class="section-kicker">04 / From our hills</div><h2 id="markets-title">From Idukki<br /><em>to Gulf kitchens.</em></h2><p>Rooted in Kerala. Prepared for the world. Heritage Spices is building thoughtful supply relationships with buyers who value a traceable beginning and a distinctive finish, starting with the Gulf.</p>
        <div class="market-list">${markets.map((m) => `<a href="${href(ctx, `markets/${m.slug}/`)}">${m.short}</a>`).join('')}</div>
        <a class="solid-button" href="${href(ctx, 'markets/')}">Explore our markets <span>↗</span></a></div>
    </section>

    <section class="process-section" aria-labelledby="process-title" data-pod="0.95,0.5,170,-8,1">
      <div class="section-kicker">05 / How it works</div>
      <div class="section-heading-row"><h2 id="process-title">From first message<br /><em>to your port.</em></h2><a class="arrow-link" href="${href(ctx, 'export/')}">The full export process <span>↗</span></a></div>
      <ol class="process-grid">
        <li><span class="step-num">01</span><h3>Tell us what you need</h3><p>Share size, quantity, packing and destination.</p></li>
        <li><span class="step-num">02</span><h3>Approve a sample</h3><p>Check the pods against your specification.</p></li>
        <li><span class="step-num">03</span><h3>Confirm your order</h3><p>Agree quantity, packing and delivery terms.</p></li>
        <li><span class="step-num">04</span><h3>We prepare and ship</h3><p>Packing, documents and shipment, step by step.</p></li>
      </ol>
    </section>

    <section class="journal-section" id="journal" aria-labelledby="journal-title" data-pod="0.94,0.4,160,10,1">
      <div class="section-kicker">06 / The journal</div>
      <div class="section-heading-row"><h2 id="journal-title">Notes from<br /><em>the spice trail.</em></h2><a class="arrow-link" href="${href(ctx, 'journal/')}">View all stories <span>↗</span></a></div>
      <div class="journal-grid">${journalCards}</div>
    </section>

    <section class="contact-section" id="contact" aria-labelledby="contact-title">
      <div class="contact-pattern" aria-hidden="true"></div><div class="section-kicker">07 / Let’s talk</div>
      <div class="contact-grid" data-pod="0.86,0.42,250,-10,1" data-pod-m="0.84,0.12,300,-10,1">
        <div><h2 id="contact-title">A better conversation<br /><em>starts with one pod.</em></h2><p>Tell us what you are looking for, where you are sourcing from, and how we can help you bring Kerala cardamom to your market.</p></div>
        <div class="contact-actions">
          <a class="solid-button" href="${tel}">Call ${site.phoneDisplay} <span>↗</span></a>
          <a class="outline-button dark-outline" href="${waHello}" target="_blank" rel="noopener" data-track="whatsapp">Chat on WhatsApp <span>↗</span></a>
          <a class="outline-button dark-outline" href="mailto:${site.email}">${site.email} <span>↗</span></a>
        </div>
      </div>
      <div class="enquiry" id="enquiry">
        <div class="enquiry-intro">
          <p class="eyebrow">Request a quote</p>
          <h3>Send us your requirements</h3>
          <p>Share a few details about what you need. You can send them to us on WhatsApp or by email.</p>
        </div>
        ${enquiryForm(ctx)}
      </div>
    </section>`;
}

/* =========================================================
   Inner pages
   ========================================================= */
function aboutMain(ctx) {
  return `
  ${pageHero(ctx, {
    kicker: 'About Heritage Spices',
    h1: 'Rooted in Idukki.<br /><em>Built for global kitchens.</em>',
    lede: 'Heritage Spices is an export business built around one ingredient we care deeply about: green cardamom from the hills of Idukki, Kerala.',
    crumbs: [{ name: 'About' }],
  })}
  <div class="content-wrap">
    <section class="prose">
      <h2>Our story</h2>
      <p>Cardamom is often called the queen of spices, and Kerala’s Idukki district is one of the places it has long been grown. We started Heritage Spices to bring that harvest to buyers who care about where their ingredients begin, and who want a supplier that communicates clearly.</p>
      <p>We work directly with farmers in Idukki, and we select pods carefully for colour, aroma and condition before they are prepared for export. Our focus today is on importers, wholesalers and food and beverage businesses in the Gulf, where cardamom is part of everyday hospitality.</p>
    </section>
    <section>
      <h2 class="h2-small">What we stand for</h2>
      <div class="card-grid three">
        <article class="info-card"><span class="card-index">01</span><h3>A traceable origin</h3><p>We source directly from growers in Idukki, so we can talk about where your cardamom came from and who grew it.</p></article>
        <article class="info-card"><span class="card-index">02</span><h3>Careful selection</h3><p>Pods are chosen for a clean aroma, even colour and good condition, because small differences are easy to taste.</p></article>
        <article class="info-card"><span class="card-index">03</span><h3>Clear communication</h3><p>Written specifications, samples before orders, and straight answers on availability, packing and paperwork.</p></article>
      </div>
    </section>
    <section class="prose">
      <h2>Where our cardamom grows</h2>
      <p>Idukki sits in the Western Ghats, a cool, humid, rainy landscape that suits cardamom. Plants grow under tall shade trees, and pods are picked by hand in rounds as they ripen. You can read more in our journal note on {link:journal/why-idukki-cardamom-has-a-character-of-its-own/|why Idukki cardamom has a character of its own}.</p>
      <h2>Who we work with</h2>
      <p>We talk to spice importers and wholesalers, coffee and tea blenders, bakeries and sweet makers, and food manufacturers. If you buy for the {link:markets/uae/|UAE}, {link:markets/saudi-arabia/|Saudi Arabia}, {link:markets/qatar/|Qatar}, {link:markets/kuwait/|Kuwait}, {link:markets/oman/|Oman} or {link:markets/bahrain/|Bahrain}, we would be glad to hear from you. Buyers from other countries are welcome to get in touch too.</p>
      <h2>Working with us</h2>
      <p>Read how an order works on our {link:export/|export process page}, browse the {link:faq/|frequently asked questions}, or {link:request-a-sample/|request a sample} to begin.</p>
    </section>
  </div>
  ${ctaBand(ctx, { kicker: 'Start a conversation', title: 'Tell us what you are looking for.', text: 'A short message is enough. We will reply with next steps.', primary: { label: 'Request a sample', path: 'request-a-sample/' }, secondary: { label: 'Chat on WhatsApp', path: waHello, external: true } })}`
    .replace(/\{link:([^|}]+)\|([^}]+)\}/g, (_, p, l) => `<a href="${href(ctx, p)}">${l}</a>`);
}

function productsIndexMain(ctx) {
  return `
  ${pageHero(ctx, {
    kicker: 'Our products',
    h1: 'The character<br /><em>of the harvest.</em>',
    lede: 'Whole green cardamom from Idukki, Kerala, selected for a clean aroma and prepared for export.',
    crumbs: [{ name: 'Products' }],
  })}
  <div class="content-wrap">
    <div class="card-grid two">
      <article class="info-card tall"><span class="card-index">01</span><h2>Whole green cardamom</h2><p>Fresh, fragrant whole pods with a naturally clean finish. The pod protects the seeds, which helps keep the aroma, and it lets you judge colour, size and condition before you buy.</p><a class="arrow-link" href="${href(ctx, 'products/green-cardamom/')}">View specifications <span>↗</span></a></article>
      <article class="info-card tall"><span class="card-index">02</span><h2>Cardamom seeds</h2><p>Selected seeds for aroma-led food and beverage applications where whole pods are not needed. Availability and specification are confirmed on enquiry.</p><a class="arrow-link" href="${href(ctx, 'products/cardamom-seeds/')}">View details <span>↗</span></a></article>
    </div>
    <section class="prose">
      <h2>How to specify your order</h2>
      <p>Because every buyer’s needs are different, we do not publish a fixed price list. Prices depend on size, quantity, packing, destination and delivery terms. Tell us what you need and we will respond with a quotation.</p>
      <p>The points that matter most when you specify green cardamom are size in millimetres, colour, aroma, moisture and packing. Our guides can help: {link:journal/green-cardamom-sizes-explained/|green cardamom sizes explained} and {link:journal/what-to-look-for-in-a-premium-green-pod/|what to look for in a premium green pod}.</p>
    </section>
  </div>
  ${ctaBand(ctx, { kicker: 'Ready when you are', title: 'Request a sample and quotation.', primary: { label: 'Request a sample', path: 'request-a-sample/' }, secondary: { label: 'Chat on WhatsApp', path: waHello, external: true } })}`
    .replace(/\{link:([^|}]+)\|([^}]+)\}/g, (_, p, l) => `<a href="${href(ctx, p)}">${l}</a>`);
}

export const greenFaq = [
  { q: 'What size is your green cardamom?', a: 'Size is specified in millimetres to suit your requirement, for example 6 mm, 7 mm or 8 mm and above, subject to availability. Tell us the size you need and we will confirm what is currently available and send a sample.' },
  { q: 'What is the minimum order quantity?', a: 'Minimum quantities are shared on enquiry because they depend on size, packing and shipping method. Send us your expected volume and we will respond with options.' },
  { q: 'How should whole green cardamom be stored?', a: 'Keep it sealed, in a cool, dry place away from direct sunlight and strong odours. Stored this way, whole pods keep their aroma far better than ground cardamom.' },
  { q: 'Do you quote prices on the website?', a: 'No. Prices depend on size, quantity, packing, destination and delivery terms, so we quote on request.' },
];

function greenMain(ctx) {
  return `
  ${pageHero(ctx, {
    kicker: 'Product',
    h1: 'Whole green<br /><em>cardamom.</em>',
    lede: 'Fresh, fragrant whole pods from Idukki, Kerala, selected for a bright colour and a clean, sweet aroma.',
    crumbs: [{ name: 'Products', path: 'products/' }, { name: 'Whole green cardamom' }],
  })}
  <div class="content-wrap two-col">
    <div>
      <section class="prose">
        <h2>Overview</h2>
        <p>Green cardamom (<i>Elettaria cardamomum</i>) is the whole dried pod of a plant grown in the shaded, rainy hills of the Western Ghats. Our pods come from Idukki, Kerala, and are sourced directly from farmers, then selected for colour, aroma and condition before export.</p>
        <p>Buying whole pods keeps the aroma protected until you are ready to use it, and it lets you inspect size, colour and cleanliness yourself, which is why many Gulf importers and coffee blenders prefer them.</p>
        <h2>Common uses</h2>
        <p>Arabic coffee, tea and karak, sweets and halwa, bakery and pastry, rice dishes, spice blends and beverage mixes. Read more about {link:journal/cardamom-in-arabic-coffee/|cardamom in Arabic coffee}.</p>
        <h2>Who it is for</h2>
        <p>Wholesalers, coffee and tea blenders, packers and food manufacturers, across {link:india/|India} and in the {link:markets/|Gulf}.</p>
      </section>
    </div>
    <aside class="side-card">
      <p class="eyebrow">Specification</p>
      ${specTable([
        ['Product', 'Whole green cardamom'],
        ['Botanical name', 'Elettaria cardamomum'],
        ['Origin', 'Idukki, Kerala, India'],
        ['Form', 'Whole dried pods'],
        ['Colour', 'Green, selected for an even colour'],
        ['Size', 'Specified in mm to your requirement, subject to availability'],
        ['Aroma', 'Fresh, sweet and clean'],
        ['Packing', 'Food-grade packing; size agreed with you'],
        ['Minimum order', 'Shared on enquiry'],
        ['Samples', 'Available on request'],
        ['Delivery terms', 'FOB, CFR or CIF on discussion'],
        ['Documents', 'Confirmed for your destination'],
      ])}
      <a class="solid-button full" href="${href(ctx, 'request-a-sample/')}">Request a sample <span aria-hidden="true">↗</span></a>
    </aside>
  </div>
  <div class="content-wrap">
    <section>
      <h2 class="h2-small">Frequently asked questions</h2>
      ${faqList(greenFaq, ctx)}
    </section>
  </div>
  ${ctaBand(ctx, { kicker: 'Next step', title: 'See it, smell it, then decide.', text: 'Ask for a sample and compare it with your own specification.', primary: { label: 'Request a sample', path: 'request-a-sample/' }, secondary: { label: 'Chat on WhatsApp', path: sampleWa, external: true } })}`
    .replace(/\{link:([^|}]+)\|([^}]+)\}/g, (_, p, l) => `<a href="${href(ctx, p)}">${l}</a>`);
}

const seedsFaq = [
  { q: 'Why choose whole pods over seeds?', a: 'Seeds can lose aroma faster once they leave the pod, and whole pods are easier to inspect. Many buyers therefore prefer whole green cardamom. Seeds suit applications where pods are not needed.' },
  { q: 'Is the seed product always available?', a: 'Availability and specification are confirmed on enquiry. Send us your requirements and we will tell you what we can offer.' },
];
function seedsMain(ctx) {
  return `
  ${pageHero(ctx, {
    kicker: 'Product',
    h1: 'Cardamom<br /><em>seeds.</em>',
    lede: 'Selected cardamom seeds for aroma-led food and beverage applications.',
    crumbs: [{ name: 'Products', path: 'products/' }, { name: 'Cardamom seeds' }],
  })}
  <div class="content-wrap two-col">
    <div>
      <section class="prose">
        <h2>Overview</h2>
        <p>Cardamom seeds are the small, dark seeds found inside the pod. They carry most of the aroma and are used where whole pods are not practical, for example in some spice blends, bakery recipes and beverage mixes.</p>
        <p>If you are not sure which form suits you, we are glad to talk it through. Many buyers who make coffee blends choose {link:products/green-cardamom/|whole green cardamom} instead, because the pod helps protect the aroma.</p>
        <h2>Specifying seeds</h2>
        <p>Tell us your application, expected quantity and packing needs, and we will confirm availability and specification.</p>
      </section>
    </div>
    <aside class="side-card">
      <p class="eyebrow">At a glance</p>
      ${specTable([
        ['Product', 'Cardamom seeds'],
        ['Origin', 'Idukki, Kerala, India'],
        ['Use', 'Aroma-led food and beverage applications'],
        ['Availability', 'Confirmed on enquiry'],
        ['Samples', 'Available on request'],
      ])}
      <a class="solid-button full" href="${href(ctx, 'request-a-sample/')}">Request a sample <span aria-hidden="true">↗</span></a>
    </aside>
  </div>
  <div class="content-wrap"><section><h2 class="h2-small">Frequently asked questions</h2>${faqList(seedsFaq, ctx)}</section></div>
  ${ctaBand(ctx, { kicker: 'Next step', title: 'Tell us what you are making.', primary: { label: 'Request a sample', path: 'request-a-sample/' }, secondary: { label: 'Chat on WhatsApp', path: waHello, external: true } })}`
    .replace(/\{link:([^|}]+)\|([^}]+)\}/g, (_, p, l) => `<a href="${href(ctx, p)}">${l}</a>`);
}

function marketsIndexMain(ctx) {
  return `
  ${pageHero(ctx, {
    kicker: 'Markets',
    h1: 'From Idukki<br /><em>to Gulf kitchens.</em>',
    lede: 'Heritage Spices welcomes importers, wholesalers and food businesses across the Gulf. Choose your market to see what matters there.',
    crumbs: [{ name: 'Markets' }],
  })}
  <div class="content-wrap">
    <div class="card-grid three">
      ${markets.map((m, i) => `
      <a class="info-card link-card" href="${href(ctx, `markets/${m.slug}/`)}">
        <span class="card-index">${String(i + 1).padStart(2, '0')}</span>
        <h2>${m.name}</h2>
        <p>${esc(m.lede)}</p>
        <span class="arrow-link">View market <span>↗</span></span>
      </a>`).join('')}
    </div>
    <section class="prose">
      <h2>Why the Gulf</h2>
      <p>Across the Arabian Peninsula, cardamom is part of daily hospitality, from the cup of Arabic coffee offered to every guest to the sweets served at celebrations. That steady, culture-driven demand makes the region one of the world’s most important markets for green cardamom, and aroma is what buyers care about most.</p>
      <h2>Buyers from elsewhere</h2>
      <p>We focus on the Gulf, but we are glad to hear from importers in other countries too. {link:contact/|Contact us} with your requirements and we will tell you what is possible.</p>
    </section>
  </div>
  ${ctaBand(ctx, { kicker: 'Start here', title: 'Request a sample for your market.', primary: { label: 'Request a sample', path: 'request-a-sample/' }, secondary: { label: 'Chat on WhatsApp', path: waHello, external: true } })}`
    .replace(/\{link:([^|}]+)\|([^}]+)\}/g, (_, p, l) => `<a href="${href(ctx, p)}">${l}</a>`);
}

function indiaMain(ctx, d) {
  return `
  ${pageHero(ctx, { kicker: d.kicker, h1: d.h1, lede: d.lede, crumbs: d.path === 'india/' ? [{ name: 'India' }] : [{ name: 'India', path: 'india/' }, { name: d.crumbName }] })}
  <div class="content-wrap two-col">
    <div>
      <section class="prose">${d.sections.map((x) => `<h2>${esc(x.h)}</h2>${x.p.map((t) => `<p>${inline(t, ctx)}</p>`).join('')}`).join('')}</section>
      <section><h2 class="h2-small">Questions from Indian buyers</h2>${faqList(d.faq, ctx)}</section>
    </div>
    <aside class="side-card">
      <p class="eyebrow">At a glance</p>
      ${specTable(d.glance)}
      <a class="solid-button full" href="${href(ctx, 'request-a-sample/')}">Request a sample <span aria-hidden="true">↗</span></a>
      <a class="outline-button full" href="${waHello}" target="_blank" rel="noopener" data-track="whatsapp">Chat on WhatsApp <span aria-hidden="true">↗</span></a>
    </aside>
  </div>
  ${ctaBand(ctx, { kicker: 'India', title: 'Buying cardamom in India? Let’s talk.', text: 'Send your requirements and we will reply with options and a sample.', primary: { label: 'Request a sample', path: 'request-a-sample/' }, secondary: { label: 'Contact us', path: 'contact/' } })}`;
}

function marketMain(ctx, m) {
  const others = markets.filter((x) => x.slug !== m.slug);
  return `
  ${pageHero(ctx, {
    kicker: `Market · ${m.name}`,
    h1: m.h1,
    lede: m.lede,
    crumbs: [{ name: 'Markets', path: 'markets/' }, { name: m.name }],
  })}
  <div class="content-wrap two-col">
    <div>
      <section class="prose">
        ${m.sections.map((s) => `<h2>${esc(s.h)}</h2>${s.p.map((p) => `<p>${inline(p, ctx)}</p>`).join('')}`).join('')}
      </section>
      <section>
        <h2 class="h2-small">Questions from ${esc(m.short)} buyers</h2>
        ${faqList(m.faq, ctx)}
      </section>
    </div>
    <aside class="side-card">
      <p class="eyebrow">At a glance</p>
      ${specTable([
        ['Market', m.name],
        ['Key areas', m.focus],
        ['Main ports', m.ports],
        ['Product', 'Whole green cardamom from Idukki, Kerala'],
        ['Delivery terms', 'FOB, CFR or CIF on discussion'],
      ])}
      <a class="solid-button full" href="${href(ctx, 'request-a-sample/')}">Request a sample <span aria-hidden="true">↗</span></a>
      <a class="outline-button full" href="${waHello}" target="_blank" rel="noopener" data-track="whatsapp">Chat on WhatsApp <span aria-hidden="true">↗</span></a>
    </aside>
  </div>
  <div class="content-wrap">
    <section>
      <h2 class="h2-small">Other markets</h2>
      <div class="chip-row">${others.map((x) => `<a href="${href(ctx, `markets/${x.slug}/`)}">${x.name}</a>`).join('')}</div>
      <p class="related-line">Also read: <a href="${href(ctx, 'journal/cardamom-in-arabic-coffee/')}">cardamom in Arabic coffee</a> · <a href="${href(ctx, 'journal/how-to-import-cardamom-from-india/')}">how to import cardamom from India</a> · <a href="${href(ctx, 'export/')}">our export process</a></p>
    </section>
  </div>
  ${ctaBand(ctx, { kicker: m.short, title: `Supplying ${m.short}? Let’s talk.`, text: 'Send your requirements and we will reply with next steps and a sample.', primary: { label: 'Request a sample', path: 'request-a-sample/' }, secondary: { label: 'Contact us', path: 'contact/' } })}`;
}

function exportMain(ctx) {
  const steps = [
    { h: 'Tell us what you need', p: 'Share the size or grade, colour, aroma, quantity, packing and destination. A short message is enough to begin.' },
    { h: 'Approve a sample', p: 'We send a sample so you can compare it with your specification. Agree what it represents before anything is committed.' },
    { h: 'Receive a quotation', p: 'We respond with a quotation based on size, quantity, packing, destination and delivery terms.' },
    { h: 'Confirm the order', p: 'Agree the quantity, packing, delivery terms and timing, including any seasonal peak you are planning for.' },
    { h: 'Packing and documents', p: 'We prepare and pack your cardamom and arrange the shipping documents your destination needs, working with your clearing agent.' },
    { h: 'Shipment and delivery', p: 'Your cardamom travels to the agreed port, usually by sea, with air freight available for small or urgent lots.' },
  ];
  return `
  ${pageHero(ctx, {
    kicker: 'Export process',
    h1: 'From first message<br /><em>to your port.</em>',
    lede: 'A clear, step-by-step way of working, so importers know what happens next at every stage.',
    crumbs: [{ name: 'Export process' }],
  })}
  <div class="content-wrap">
    ${stepsList(steps)}
    <section class="prose">
      <h2>Delivery terms we can discuss</h2>
      ${specTable([
        ['FOB (Free on Board)', 'We deliver the goods to the vessel at the Indian port. You arrange and pay for freight and insurance.'],
        ['CFR (Cost and Freight)', 'We pay the sea freight to your destination port. You arrange insurance and import clearance.'],
        ['CIF (Cost, Insurance and Freight)', 'As CFR, with marine insurance arranged to the destination port.'],
      ])}
      <h2>Documents</h2>
      <p>Shipments typically involve a commercial invoice, a packing list, a bill of lading or airway bill and a certificate of origin, plus any other certificates your destination requires. Rules differ by country and can change, so we confirm the exact list with you and your clearing agent for each order.</p>
      <h2>Packing</h2>
      <p>Cardamom is packed in food-grade packaging. We agree the packing size with you based on your storage, turnover and market.</p>
      <h2>Prices</h2>
      <p>Prices depend on size, quantity, packing, destination and delivery terms, so we quote on request instead of publishing a list.</p>
      <h2>Questions?</h2>
      <p>See the {link:faq/|frequently asked questions} or {link:contact/|contact us}. Buyers in the Gulf can also read our pages for the {link:markets/uae/|UAE}, {link:markets/saudi-arabia/|Saudi Arabia} and {link:markets/qatar/|Qatar}.</p>
    </section>
  </div>
  ${ctaBand(ctx, { kicker: 'Step one', title: 'Send us your requirements.', primary: { label: 'Request a sample', path: 'request-a-sample/' }, secondary: { label: 'Chat on WhatsApp', path: waHello, external: true } })}`
    .replace(/\{link:([^|}]+)\|([^}]+)\}/g, (_, p, l) => `<a href="${href(ctx, p)}">${l}</a>`);
}

export const generalFaq = [
  { q: 'Where does your cardamom come from?', a: 'Our green cardamom comes from Idukki, Kerala, in the Western Ghats of southern India, and is sourced directly from farmers.' },
  { q: 'Which products do you supply?', a: 'Our main product is whole green cardamom. Cardamom seeds are available on enquiry. See the {link:products/|products page}.' },
  { q: 'Which countries do you supply?', a: 'India is one of our main markets (see {link:india/|buying cardamom in India}). We also supply importers in the Gulf: the {link:markets/uae/|UAE}, {link:markets/saudi-arabia/|Saudi Arabia}, {link:markets/qatar/|Qatar}, {link:markets/kuwait/|Kuwait}, {link:markets/oman/|Oman} and {link:markets/bahrain/|Bahrain}. Buyers from other countries are welcome to enquire.' },
  { q: 'Can I get a sample before ordering?', a: 'Yes. Samples are available on request. Use the {link:request-a-sample/|sample request page} and tell us your requirements and destination.' },
  { q: 'What is your minimum order quantity?', a: 'Minimum quantities depend on size, packing and shipping method and are shared on enquiry. Tell us the volume you are considering and we will respond with options.' },
  { q: 'Do you publish prices?', a: 'No. Prices depend on size, quantity, packing, destination and delivery terms, so we quote on request.' },
  { q: 'Which delivery terms do you offer?', a: 'We are happy to discuss FOB, CFR and CIF. Read more on the {link:export/|export process page}.' },
  { q: 'Which documents come with a shipment?', a: 'Typically a commercial invoice, packing list, bill of lading or airway bill and certificate of origin, plus any certificates your destination requires. We confirm the exact list with you for each order.' },
  { q: 'How should I store green cardamom?', a: 'Keep it sealed, in a cool, dry place, away from direct sunlight and strong odours.' },
  { q: 'How do I place an order?', a: 'Send us your requirements, approve a sample, receive a quotation and confirm the order. The full process is on the {link:export/|export process page}.' },
];

function faqMain(ctx) {
  return `
  ${pageHero(ctx, {
    kicker: 'FAQ',
    h1: 'Frequently asked<br /><em>questions.</em>',
    lede: 'Quick answers for importers and buyers. If yours is not here, just ask.',
    crumbs: [{ name: 'FAQ' }],
  })}
  <div class="content-wrap narrow">${faqList(generalFaq, ctx)}</div>
  ${ctaBand(ctx, { kicker: 'Still wondering?', title: 'Ask us directly.', primary: { label: 'Contact us', path: 'contact/' }, secondary: { label: 'Chat on WhatsApp', path: waHello, external: true } })}`;
}

function contactMain(ctx) {
  return `
  ${pageHero(ctx, {
    kicker: 'Contact',
    h1: 'A better conversation<br /><em>starts with one pod.</em>',
    lede: 'Tell us what you are looking for and where you are sourcing from. We will reply with next steps.',
    crumbs: [{ name: 'Contact' }],
  })}
  <div class="content-wrap two-col wide-form">
    <aside class="side-card">
      <p class="eyebrow">Reach us</p>
      ${contactDetails(ctx)}
      <a class="solid-button full" href="${waHello}" target="_blank" rel="noopener" data-track="whatsapp">Chat on WhatsApp <span aria-hidden="true">↗</span></a>
    </aside>
    <div id="enquiry" class="form-card">
      <h2 class="h2-small">Send us your requirements</h2>
      ${enquiryForm(ctx, { light: true })}
    </div>
  </div>`;
}

function sampleMain(ctx) {
  const steps = [
    { h: 'Send your requirements', p: 'Product, size or grade, approximate quantity, packing and your destination.' },
    { h: 'We confirm availability', p: 'We check what we can offer against your specification and reply with next steps.' },
    { h: 'Review your sample', p: 'Compare the sample with your specification, then tell us how to proceed with a quotation.' },
  ];
  return `
  ${pageHero(ctx, {
    kicker: 'Request a sample',
    h1: 'See it, smell it,<br /><em>then decide.</em>',
    lede: 'Tell us what you need and we will arrange a cardamom sample for your approval.',
    crumbs: [{ name: 'Request a sample' }],
  })}
  <div class="content-wrap two-col wide-form">
    <div>
      <section class="prose">
        <h2>How it works</h2>
      </section>
      ${stepsList(steps)}
      <section class="prose">
        <h2>What to include</h2>
        <p>The more you tell us, the better we can match your needs: the size in millimetres, how you will use the cardamom, your expected quantity, packing preference, destination country and port, and the delivery address for the sample.</p>
        <p>Not sure of the details? Just describe your business, and we will help you specify. You can also read our {link:journal/green-cardamom-sizes-explained/|guide to green cardamom sizes}.</p>
      </section>
    </div>
    <div id="enquiry" class="form-card">
      <h2 class="h2-small">Your sample request</h2>
      ${enquiryForm(ctx, { light: true, variant: 'sample' })}
    </div>
  </div>`
    .replace(/\{link:([^|}]+)\|([^}]+)\}/g, (_, p, l) => `<a href="${href(ctx, p)}">${l}</a>`);
}

function journalIndexMain(ctx) {
  return `
  ${pageHero(ctx, {
    kicker: 'The journal',
    h1: 'Notes from<br /><em>the spice trail.</em>',
    lede: 'Short, practical reads on Idukki cardamom, quality and the conversations behind international spice trade.',
    crumbs: [{ name: 'Journal' }],
  })}
  <div class="content-wrap">
    <div class="journal-list">
      ${articles.map((a, i) => `
      <a class="journal-row" href="${href(ctx, `journal/${a.slug}/`)}">
        <span class="journal-row-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="journal-row-body"><span class="journal-meta">${a.tag} · ${a.readTime}</span><strong>${a.title}</strong><span>${esc(a.summary)}</span></span>
        <span class="journal-row-arrow" aria-hidden="true">↗</span>
      </a>`).join('')}
    </div>
  </div>`;
}

function articleMain(ctx, a) {
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  return `
  <article>
  ${pageHero(ctx, {
    kicker: `${a.meta} · ${a.readTime}`,
    h1: esc(a.title),
    lede: esc(a.summary),
    crumbs: [{ name: 'Journal', path: 'journal/' }, { name: esc(a.title) }],
  })}
  <div class="content-wrap narrow article-body">${articleBody(a.body, ctx)}</div>
  </article>
  <div class="content-wrap">
    <section>
      <h2 class="h2-small">Keep reading</h2>
      <div class="journal-list compact">
        ${related.map((r) => `<a class="journal-row" href="${href(ctx, `journal/${r.slug}/`)}"><span class="journal-row-body"><span class="journal-meta">${r.tag} · ${r.readTime}</span><strong>${r.title}</strong></span><span class="journal-row-arrow" aria-hidden="true">↗</span></a>`).join('')}
      </div>
    </section>
  </div>
  ${ctaBand(ctx, { kicker: 'Talk to Heritage Spices', title: 'Have questions about Idukki cardamom?', primary: { label: 'Request a sample', path: 'request-a-sample/' }, secondary: { label: 'Chat on WhatsApp', path: waHello, external: true } })}`;
}

function notFoundMain(ctx) {
  return `
  ${pageHero(ctx, { kicker: '404', h1: 'This page has<br /><em>wandered off.</em>', lede: 'The page you are looking for is not here. Try one of these instead.' })}
  <div class="content-wrap">
    <div class="chip-row">
      <a href="${href(ctx, '')}">Home</a><a href="${href(ctx, 'products/')}">Products</a><a href="${href(ctx, 'markets/')}">Markets</a><a href="${href(ctx, 'export/')}">Export process</a><a href="${href(ctx, 'journal/')}">Journal</a><a href="${href(ctx, 'contact/')}">Contact</a>
    </div>
  </div>`;
}

/* =========================================================
   Page registry
   ========================================================= */
export function englishPages() {
  const pages = [];
  const add = (p) => pages.push({ lang: 'en', ...p });

  add({
    path: '',
    title: 'Heritage Spices | Premium Green Cardamom, Idukki',
    description: 'Premium whole green cardamom from Idukki, Kerala for buyers across India and importers in the UAE, Saudi Arabia and the Gulf. Request a sample.',
    bodyClass: 'is-home',
    alternates: { en: '', ar: 'ar/' }, alt: 'ar/',
    jsonld: () => [organizationLd(), websiteLd()],
    render: homeMain,
  });
  add({ path: 'about/', title: 'About Us', description: 'Heritage Spices sources premium green cardamom directly from farmers in Idukki, Kerala. Learn about our story, our values and how we work with importers.', crumbs: [{ name: 'About' }], render: aboutMain });
  add({ path: 'products/', title: 'Products', description: 'Whole green cardamom and cardamom seeds from Idukki, Kerala, selected for a clean aroma and prepared for export. View specifications and request a sample.', crumbs: [{ name: 'Products' }], render: productsIndexMain });
  add({
    path: 'products/green-cardamom/', title: 'Whole Green Cardamom from Idukki, Kerala',
    description: 'Whole green cardamom from Idukki, Kerala: specification, uses, packing and FAQs for importers and food businesses. Request a sample from Heritage Spices.',
    alternates: { en: 'products/green-cardamom/', ar: 'ar/green-cardamom/' }, alt: 'ar/green-cardamom/',
    crumbs: [{ name: 'Products', path: 'products/' }, { name: 'Whole green cardamom' }], faq: greenFaq,
    product: { name: 'Whole green cardamom', description: 'Whole dried green cardamom pods (Elettaria cardamomum) from Idukki, Kerala, India, selected for colour and aroma and prepared for export.', category: 'Spices' },
    render: greenMain,
  });
  add({ path: 'products/cardamom-seeds/', title: 'Cardamom Seeds from Idukki, Kerala', description: 'Selected cardamom seeds from Idukki, Kerala for aroma-led food and beverage applications. Availability and specification confirmed on enquiry.', crumbs: [{ name: 'Products', path: 'products/' }, { name: 'Cardamom seeds' }], faq: seedsFaq, render: seedsMain });
  for (const d of indiaPages) add({ path: d.path, title: d.metaTitle, description: d.metaDescription, keywords: d.keywords, geo: d.geo, locale: 'en_IN', crumbs: d.path === 'india/' ? [{ name: 'India' }] : [{ name: 'India', path: 'india/' }, { name: d.crumbName }], faq: d.faq, render: (ctx) => indiaMain(ctx, d) });
  add({ path: 'markets/', title: 'Markets: Cardamom for the Gulf', description: 'Heritage Spices supplies whole green cardamom to importers in the UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain. Choose your market to learn more.', crumbs: [{ name: 'Markets' }], render: marketsIndexMain });
  for (const m of markets) {
    add({
      path: `markets/${m.slug}/`, title: m.metaTitle, description: m.metaDescription, keywords: m.keywords, geo: m.geo, locale: m.locale,
      crumbs: [{ name: 'Markets', path: 'markets/' }, { name: m.name }], faq: m.faq,
      ...(['uae', 'saudi-arabia'].includes(m.slug) ? { alternates: { en: `markets/${m.slug}/`, ar: `ar/markets/${m.slug}/` }, alt: `ar/markets/${m.slug}/` } : {}),
      render: (ctx) => marketMain(ctx, m),
    });
  }
  add({ path: 'export/', title: 'Export Process: Order Cardamom from India', description: 'How Heritage Spices works with importers: requirements, samples, quotation, packing, documents and shipment, with FOB, CFR and CIF delivery terms explained.', crumbs: [{ name: 'Export process' }], render: exportMain });
  add({ path: 'faq/', title: 'FAQ: Buying Cardamom from India', description: 'Answers to common questions from importers about Heritage Spices’ green cardamom: samples, minimum orders, prices, delivery terms, documents and storage.', crumbs: [{ name: 'FAQ' }], faq: generalFaq, render: faqMain });
  add({ path: 'contact/', title: 'Contact', description: 'Contact Heritage Spices by email, phone or WhatsApp, or send your cardamom requirements through our enquiry form.', crumbs: [{ name: 'Contact' }], render: contactMain });
  add({ path: 'request-a-sample/', title: 'Request a Cardamom Sample', description: 'Request a sample of green cardamom from Idukki, Kerala. Tell Heritage Spices your requirements and destination and we will reply with next steps.', crumbs: [{ name: 'Request a sample' }], render: sampleMain });
  add({ path: 'journal/', title: 'Journal: Notes from the Spice Trail', description: 'Practical articles on Idukki cardamom, quality, sizes, Arabic coffee and importing spices from India, from Heritage Spices.', crumbs: [{ name: 'Journal' }], render: journalIndexMain });
  for (const a of articles) {
    add({
      path: `journal/${a.slug}/`, title: a.metaTitle || a.title, description: a.summary, ogType: 'article',
      crumbs: [{ name: 'Journal', path: 'journal/' }, { name: a.title }], article: a,
      render: (ctx) => articleMain(ctx, a),
    });
  }
  add({ path: '404.html', file: '404.html', title: 'Page not found', description: 'Page not found.', noindex: true, notFound: true, render: notFoundMain });
  return pages;
}

export { absUrl, plainText, breadcrumbLd, faqLd, organizationLd };

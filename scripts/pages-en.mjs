import { marketsAr } from '../content/markets-ar.mjs';
import { guidePage } from '../content/guide.mjs';
import { indiaPages, cityPages } from '../content/india.mjs';
import { shop, priceUpdated } from '../content/shop.mjs';
import { grades, retailPerKg, wholesalePerKg, settings, updatedLabel } from '../content/pricing.mjs';
import {
  site, articles, markets, href, inline, plainText, esc, pageHero, ctaBand, faqList, stepsList, specTable,
  articleBody, enquiryForm, contactDetails, breadcrumbs, organizationLd, websiteLd, breadcrumbLd, faqLd,
  waHello, whatsappLink, tel, absUrl,
} from './templates.mjs';

const journalClasses = ['one', 'two', 'three'];
const sampleWa = whatsappLink('Hello Senvora Spices, I would like to request a cardamom sample.');

/* =========================================================
   HOME (keeps the approved animated design, now pre-rendered)
   ========================================================= */
function homeMain(ctx) {
  const img = (name) => href(ctx, `assets/img/${name}`);
  const stage = (name) => href(ctx, `assets/stages/${name}`);
  const ugc = (name) => href(ctx, `assets/ugc/${name}`);
  const heroGrade = grades.find((g) => g.id === '7mm');
  const heroFrom = grades.map((g) => retailPerKg(g, 1)).reduce((a, b) => Math.min(a, b));
  const heroPrice = (retailPerKg(heroGrade, 1) - 1).toLocaleString('en-IN');
  return `
    <div id="top"></div>
    <canvas class="float-pod" data-float-pod data-frames="${href(ctx, 'assets/pod/f')}" data-count="62" width="560" height="273" aria-hidden="true"></canvas>
    <section class="hero" aria-labelledby="hero-title" data-pod="0.78,0.52,340,-4,0" data-pod-m="0.74,0.87,300,-4,0">
      <div class="hero-bg">
        <picture>
          <source media="(max-width: 720px)" srcset="${ugc('hero-m-750.webp')}" />
          <img src="${ugc('hero-1600.webp')}" srcset="${ugc('hero-900.webp')} 900w, ${ugc('hero-1600.webp')} 1600w" sizes="70vw" alt="A sack full of fresh green cardamom pods from Idukki, Kerala" width="1600" height="900" fetchpriority="high" decoding="async" />
        </picture>
        <a class="price-chip" href="${href(ctx, 'products/')}" aria-label="Open the cardamom shop">
          <span>Fresh green cardamom · 7mm</span>
          <b>₹${heroPrice}<small>/kg</small></b>
          <em>Updated ${updatedLabel}</em>
        </a>
      </div>
      <div class="hero-haze"></div>
      <div class="hero-copy reveal">
        <p class="eyebrow">Buy cardamom (elaichi) · Idukki, Kerala</p>
        <h1 id="hero-title">Pure Cardamom.<br /><em>Rooted in Idukki.</em></h1>
        <p class="hero-lede">Green cardamom (elaichi) grown on our own farm in Idukki, Kerala. Order 25 g to 10 kg packs on WhatsApp, or ask for wholesale and export rates.</p>
        <p class="hero-markets">Supplying buyers across <a href="${href(ctx, 'india/')}">India</a> and importers in the <a href="${href(ctx, 'markets/uae/')}">UAE</a>, <a href="${href(ctx, 'markets/saudi-arabia/')}">Saudi Arabia</a>, <a href="${href(ctx, 'markets/qatar/')}">Qatar</a> and the <a href="${href(ctx, 'markets/')}">Gulf</a>.</p>
        <div class="hero-actions">
          <a class="solid-button" href="${href(ctx, 'products/')}">Shop cardamom <span aria-hidden="true">↗</span></a>
          <a class="text-button" href="${waHello}" target="_blank" rel="noopener" data-track="whatsapp"><span class="phone-dot">✦</span> Order on WhatsApp</a>
        </div>
        <div class="hero-proof"><span>Grown on our own farm</span><i></i><span>Carefully selected</span><i></i><span>Export-ready quality</span></div>
      </div>
      <div class="hero-origin"><span class="origin-pin"></span><span>Idukki, Kerala<br />India</span></div>
      <div class="hero-bottom-line"></div>
    </section>

    <section class="intro-section" id="story" aria-labelledby="story-title" data-pod="0.5,0.62,230,10,1">
      <div class="section-kicker">01 / The farm</div>
      <div class="intro-grid">
        <h2 id="story-title">A small pod.<br /><em>A lasting impression.</em></h2>
        <div class="intro-text">
          <p>We believe exceptional cardamom begins with exceptional care. From our own farm in Idukki to careful selection and preparation, every pod carries the character of its origin.</p>
          <a class="arrow-link" href="${href(ctx, 'about/')}">Our story <span>↗</span></a>
        </div>
      </div>
      <div class="intro-photos">
        <figure class="photo photo-tall">
          <img src="${img('plant.webp')}" alt="Cardamom plants growing in the shade of tall trees on our farm in Idukki" width="1000" height="1500" loading="lazy" decoding="async" />
          <figcaption>Grown in the shade of the hills</figcaption>
        </figure>
        <figure class="photo photo-wide">
          <img src="${img('farmers.webp')}" alt="A handful of freshly picked green cardamom pods from our farm" width="900" height="1158" loading="lazy" decoding="async" />
          <figcaption>Picked and sorted by hand</figcaption>
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
          <div><dt>Source</dt><dd>Our own farm, Idukki</dd></div>
          <div><dt>Format</dt><dd>Whole green cardamom</dd></div>
        </dl>
        <a class="solid-button" href="${href(ctx, 'products/green-cardamom/')}">See specifications <span aria-hidden="true">↗</span></a>
      </div>
      <p class="pack-line">Retail packs <strong>25 g to 10 kg</strong> · Wholesale on request · Now also <a href="${href(ctx, 'products/tea-powder/')}">tea powder</a></p>
    </section>

    <section class="markets-section" id="markets" aria-labelledby="markets-title" data-pod="0.455,0.62,230,8,1">
      <div class="markets-visual"><img class="markets-photo" src="${img('markets.webp')}" alt="Green cardamom pods in a wooden spoon on jute cloth, the way they are used in chai and Arabic coffee" width="1400" height="1102" loading="lazy" decoding="async" /></div>
      <div class="markets-copy"><div class="section-kicker">03 / From our hills</div><h2 id="markets-title">From Idukki<br /><em>to Gulf kitchens.</em></h2><p>Rooted in Kerala. Prepared for the world. Senvora Spices is building thoughtful supply relationships with buyers who value a traceable beginning and a distinctive finish, starting with the Gulf.</p>
        <div class="market-list">${markets.map((m) => `<a href="${href(ctx, `markets/${m.slug}/`)}">${m.short}</a>`).join('')}</div>
        <a class="solid-button" href="${href(ctx, 'markets/')}">Explore our markets <span>↗</span></a></div>
    </section>

    <section class="contact-section" id="contact" aria-labelledby="contact-title">
      <div class="contact-pattern" aria-hidden="true"></div><div class="section-kicker">04 / Let’s talk</div>
      <div class="contact-grid" data-pod="0.86,0.42,250,-10,1" data-pod-m="0.84,0.12,300,-10,1">
        <div><h2 id="contact-title">A better conversation<br /><em>starts with one pod.</em></h2><p>Tell us what you are looking for, where you are sourcing from, and how we can help you bring Kerala cardamom to your market.</p></div>
        <div class="contact-actions">
          <a class="solid-button" href="${tel}">Call ${site.phoneDisplay} <span>↗</span></a>
          <a class="outline-button dark-outline" href="${waHello}" target="_blank" rel="noopener" data-track="whatsapp">Chat on WhatsApp <span>↗</span></a>
          <a class="outline-button dark-outline" href="mailto:${site.email}">${site.email} <span>↗</span></a>
          <a class="outline-button dark-outline" href="${href(ctx, 'request-a-sample/')}">Request a sample <span>↗</span></a>
        </div>
      </div>
    </section>`;
}

/* =========================================================
   Inner pages
   ========================================================= */
function aboutMain(ctx) {
  return `
  ${pageHero(ctx, {
    kicker: 'About Senvora Spices',
    h1: 'Rooted in Idukki.<br /><em>Built for global kitchens.</em>',
    lede: 'Senvora Spices is an export business built around one ingredient we care deeply about: green cardamom from the hills of Idukki, Kerala.',
    crumbs: [{ name: 'About' }],
  })}
  <div class="content-wrap">
    <section class="prose">
      <h2>Our story</h2>
      <figure class="about-photo"><img src="${href(ctx, 'assets/ugc/dewy.webp')}" alt="Young green cardamom pods and a white-and-pink flower on the plant on our farm in Idukki" width="1600" height="900" loading="lazy" decoding="async" /><figcaption>Young pods and a cardamom flower on our farm in Idukki</figcaption></figure>
      <p>Cardamom is often called the queen of spices, and Kerala’s Idukki district is one of the places it has long been grown. We started Senvora Spices to bring that harvest to buyers who care about where their ingredients begin, and who want a supplier that communicates clearly.</p>
      <p>We grow our cardamom on our own farm in Idukki, and we select pods carefully for colour, aroma and condition before they are prepared for export. Our focus today is on importers, wholesalers and food and beverage businesses in the Gulf, where cardamom is part of everyday hospitality.</p>
    </section>
    <section class="prose">
      <h2>Senvora Spices at a glance</h2>
      <ul>
        <li><strong>What we are:</strong> Senvora Spices, also written Senvora Spices Idukki, a green cardamom (elaichi) grower and supplier based in Pallivasal, Idukki, Kerala, India, selling cardamom grown on its own farm. We are not affiliated with other businesses that use a similar name.</li>
        <li><strong>What we supply:</strong> whole green cardamom pods; cardamom seeds on request.</li>
        <li><strong>Who we supply:</strong> wholesalers, traders, masala and chai blenders, coffee blenders, restaurants, retail packers and importers.</li>
        <li><strong>Where we supply:</strong> India, and the UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain.</li>
        <li><strong>Languages:</strong> English and Arabic.</li>
        <li><strong>How to order:</strong> choose a size and weight in the {link:products/|shop}, or send your requirements for a sample and quotation. See the {link:products/green-cardamom-price-list/|grade-wise price list}.</li>
        <li><strong>Contact:</strong> WhatsApp +91 89395 35151, senvoraspices@gmail.com.</li>
        <li><strong>Learn more:</strong> {link:green-cardamom-guide/|green cardamom buyer’s guide} · {link:faq/|frequently asked questions} · {link:india/|buying in India} · {link:markets/|Gulf markets}.</li>
      </ul>
    </section>
    <section>
      <h2 class="h2-small">What we stand for</h2>
      <div class="card-grid three">
        <article class="info-card"><span class="card-index">01</span><h3>A traceable origin</h3><p>We grow it on our own farm in Idukki, so we can tell you exactly where your cardamom came from and who grew it.</p></article>
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

const inr = (n) => '₹' + n.toLocaleString('en-IN');

function orderPanel(ctx, prod, { link = true } = {}) {
  const multi = prod.grades.length > 1;
  const g0 = prod.grades.find((g) => g.id === prod.defaultGrade) || prod.grades[0];
  const v0 = g0.variants.find((x) => x.id === '1kg') || g0.variants[0];
  const gl = (g) => (multi ? ` (${g.label})` : '');
  const msg = (g, v) => `Hello Senvora Spices, I would like to order:\n\n${prod.name}${gl(g)} - ${v.label} x 1\nPrice: ${inr(v.price)}\n\nName:\nCity and PIN code:\n\nPlease confirm availability and delivery.`;
  const data = JSON.stringify({
    name: prod.name, wa: site.whatsapp, multi,
    grades: prod.grades.map((g) => ({ id: g.id, label: g.label, variants: g.variants.map((v) => ({ id: v.id, label: v.label, price: v.price, perKg: v.perKg, img: href(ctx, `assets/packs/${v.img}`) })) })),
  });
  return `
  <article class="order-panel" data-order data-config='${data.replace(/'/g, '&#39;')}'>
    <div class="op-media"><img data-op-img src="${href(ctx, `assets/packs/${v0.img}`)}" alt="${prod.alt}" width="900" height="900" decoding="async" /></div>
    <div class="op-body">
      <h2 class="op-title">${prod.name}</h2>
      <p class="op-short">${prod.short}</p>
      ${multi ? `<label class="op-field"><span>Size</span>
        <select data-op-grade aria-label="Choose size">${prod.grades.map((g) => `<option value="${g.id}"${g.id === g0.id ? ' selected' : ''}>${g.label} · ${g.sub}</option>`).join('')}</select>
      </label>` : ''}
      <div class="op-row">
        <label class="op-field"><span>Weight</span>
          <select data-op-weight aria-label="Choose weight">${g0.variants.map((v) => `<option value="${v.id}"${v.id === v0.id ? ' selected' : ''}>${v.label} · ${inr(v.price)}</option>`).join('')}</select>
        </label>
        <div class="op-field"><span>Quantity</span>
          <div class="op-qty"><button type="button" data-op-minus aria-label="Decrease quantity">−</button><output data-op-qty>1</output><button type="button" data-op-plus aria-label="Increase quantity">+</button></div>
        </div>
      </div>
      <div class="op-price"><strong data-op-total>${inr(v0.price)}</strong><small data-op-per>${inr(v0.perKg)} / kg</small></div>
      <a class="solid-button op-order" data-op-order href="${whatsappLink(msg(g0, v0))}" target="_blank" rel="noopener">Order on WhatsApp <span aria-hidden="true">↗</span></a>
      <p class="op-note">Prices follow the daily market. Delivery extra. Final price confirmed on WhatsApp.</p>
      ${link ? `<a class="arrow-link" href="${href(ctx, prod.link)}">Details <span>↗</span></a>` : ''}
    </div>
  </article>`;
}

function priceListMain(ctx) {
  const inrk = (n) => inr(n) + ' / kg';
  const rows = grades.map((g) => `
    <tr>
      <th scope="row"><strong>${g.code}</strong> ${g.name}<small>${g.size}</small></th>
      <td>${g.use}</td>
      <td>${inrk(retailPerKg(g, 1) - 1)}</td>
      <td>${inrk(wholesalePerKg(g))}</td>
      <td><a class="arrow-link" href="${whatsappLink(`Hello Senvora Spices, please send me a wholesale quotation for green cardamom ${g.code} ${g.name}.\n\nQuantity (kg):\nCity / country:`)}" target="_blank" rel="noopener">Quote <span>↗</span></a></td>
    </tr>`).join('');
  return `
  <section class="inner-hero compact">
    ${breadcrumbs(ctx, [{ name: 'Products', path: 'products/' }, { name: 'Price list' }])}
    <h1 class="page-title">Green cardamom <em>price list.</em></h1>
    <p class="page-lede">Size and grade-wise prices from Idukki, Kerala. Updated ${priceUpdated}, following the daily Spices Board of India cardamom auction.</p>
  </section>
  <div class="content-wrap">
    <div class="price-table-wrap">
      <table class="price-table">
        <thead><tr><th scope="col">Size and grade</th><th scope="col">Best for</th><th scope="col">Retail (1 kg pack)</th><th scope="col">Wholesale (${settings.wholesaleMinKg} kg and above)</th><th scope="col"><span class="sr-only">Quote</span></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p class="price-updated">Retail packs from 25 g to 10 kg get a small per-kg saving on larger packs. Prices change with the daily market. Delivery extra. Final price confirmed on WhatsApp.</p>
    <p class="shop-more"><a class="solid-button" href="${href(ctx, 'products/')}">Order retail packs <span aria-hidden="true">↗</span></a></p>
    <section>
      <h2 class="h2-small">Frequently asked questions</h2>
      ${faqList(priceFaq, ctx)}
    </section>
  </div>`.replace(/\{link:([^|}]+)\|([^}]+)\}/g, (_, p, l) => `<a href="${href(ctx, p)}">${l}</a>`);
}

const priceFaq = [
  { q: 'How are your cardamom prices set?', a: 'Prices follow the daily Spices Board of India small cardamom auction, adjusted for grade, with our margin on top. They update every day.' },
  { q: 'What do AGEB, AGB and AGS mean?', a: 'They are Alleppey Green grades: Extra Bold, Bold and Superior. Larger, greener, more uniform pods sit in higher grades. See {link:journal/indian-cardamom-grades-agb-ageb-explained/|grades explained}.' },
  { q: 'What is the minimum for wholesale prices?', a: 'Wholesale prices apply from 25 kg. For export or larger quantities, message us on WhatsApp for a quotation.' },
  { q: 'What is the price of 1 kg of green cardamom today?', a: 'The table above shows today\u2019s retail rate per kg for each grade at a 1 kg pack, and the wholesale rate from 25 kg. It updates every day.' },
  { q: 'Is the price final?', a: 'Prices are indicative and follow the market. We confirm the final price, availability and delivery on WhatsApp before you pay.' },
];

function productsIndexMain(ctx) {
  return `
  <section class="inner-hero compact">
    ${breadcrumbs(ctx, [{ name: 'Products' }])}
    <h1 class="page-title">Shop <em>Senvora Spices.</em></h1>
    <p class="page-lede">Choose a weight and order on WhatsApp. Retail packs from Idukki, Kerala.</p>
  </section>
  <div class="content-wrap">
    <div class="shop-grid">${shop.map((p) => orderPanel(ctx, p)).join('')}</div>
    <p class="price-updated">Prices updated ${priceUpdated}. They follow the daily Spices Board of India cardamom auction.</p>
    <section class="how-order" aria-label="How ordering works">
      <h2 class="h2-small">How ordering works</h2>
      <ol class="how-steps">
        <li><strong>Choose</strong><span>Pick the grade, weight and quantity.</span></li>
        <li><strong>Send</strong><span>Tap Order on WhatsApp. Your message is filled in for you.</span></li>
        <li><strong>Confirm</strong><span>We confirm today\u2019s price, availability and delivery.</span></li>
        <li><strong>Receive</strong><span>Payment and dispatch are agreed with you on WhatsApp.</span></li>
      </ol>
      <ul class="trust-row"><li>Direct from Idukki, Kerala</li><li>Size-wise daily prices</li><li>Sample on request</li></ul>
    </section>
    <p class="shop-more">Buying in bulk? <a href="${waHello}" target="_blank" rel="noopener">WhatsApp us</a> for wholesale quotes · <a href="${href(ctx, 'products/green-cardamom-price-list/')}">Grade-wise price list</a> · <a href="${href(ctx, 'products/cardamom-seeds/')}">Cardamom seeds</a> · <a href="${href(ctx, 'request-a-sample/')}">Request a sample</a></p>
  </div>`;
}

const RETAIL_KG = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const packChips = () => `<ul class="pack-chips" aria-label="Retail pack sizes">${RETAIL_KG.map((n) => `<li>${n} kg</li>`).join('')}</ul>`;

export const greenFaq = [
  { q: 'What size is your green cardamom?', a: 'Size is specified in millimetres to suit your requirement, for example 6 mm, 7 mm or 8 mm and above, subject to availability. Tell us the size you need and we will confirm what is currently available and send a sample.' },
  { q: 'What is the minimum order quantity?', a: 'Minimum quantities are shared on enquiry because they depend on size, packing and shipping method. Send us your expected volume and we will respond with options.' },
  { q: 'How should whole green cardamom be stored?', a: 'Keep it sealed, in a cool, dry place away from direct sunlight and strong odours. Stored this way, whole pods keep their aroma far better than ground cardamom.' },
  { q: 'Is green cardamom the same as black cardamom?', a: 'No. They are different spices. Green cardamom is small, sweet and floral and is used in tea, coffee and sweets. Black cardamom is larger, smoky and used mainly in savoury cooking.' },
  { q: 'Which countries do you supply?', a: 'We supply buyers across India and importers in the UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain.' },
  { q: 'Can I get a sample before ordering?', a: 'Yes. Send your requirements on the sample request page and we will explain how a sample can reach you.' },
  { q: 'Do you sell retail packs?', a: 'Yes. Along with wholesale quantities, we offer retail packs from 1 kg up to 10 kg (1, 2, 3, 4, 5, 6, 7, 8, 9 and 10 kg). Tell us the pack size and quantity you need and we will send a quotation.' },
  { q: 'Where can I buy 8 mm green cardamom?', a: 'You can buy 8 mm bold green cardamom (AGEB grade) directly from Senvora Spices in Idukki, Kerala. Choose the size and a 1 kg to 10 kg pack in our shop and order on WhatsApp, or ask for a bulk quotation.' },
  { q: 'What is the price of 1 kg green cardamom today?', a: 'It changes every day with the Spices Board of India auction and depends on the grade. See today\u2019s retail and wholesale rate for each grade on our {link:products/green-cardamom-price-list/|price list}.' },
  { q: 'Is Idukki cardamom good quality?', a: 'Idukki is one of India\u2019s main cardamom-growing districts and is known for aromatic, well-coloured pods. Quality still depends on the lot, so check size, colour and aroma, or request a sample.' },
  { q: 'Do you show prices on the website?', a: 'Yes for retail packs from 25 g to 10 kg, which you can order on WhatsApp. Wholesale, export and delivery terms depend on size, quantity, packing and destination, so we quote those on request.' },
];

function productSpecPage(ctx, prod, { crumb, rows, faq, links }) {
  return `
  <section class="inner-hero compact">
    ${breadcrumbs(ctx, [{ name: 'Products', path: 'products/' }, { name: crumb }])}
    <h1 class="page-title">${prod.name}</h1>
  </section>
  <div class="content-wrap">
    <div class="shop-single">${orderPanel(ctx, prod, { link: false })}
      <aside class="side-card">
        <p class="eyebrow">At a glance</p>
        ${specTable(rows)}
      </aside>
    </div>
    <p class="price-updated">Prices updated ${priceUpdated}.</p>
    <p class="shop-more">${links}</p>
    <section>
      <h2 class="h2-small">Frequently asked questions</h2>
      ${faqList(faq, ctx)}
    </section>
  </div>`.replace(/\{link:([^|}]+)\|([^}]+)\}/g, (_, p, l) => `<a href="${href(ctx, p)}">${l}</a>`);
}

const teaFaq = [
  { q: 'Do you sell tea powder in retail and wholesale?', a: 'Yes. Choose a retail pack above and order on WhatsApp, or message us for wholesale quantities.' },
  { q: 'Can I order tea powder with green cardamom?', a: 'Yes. Many customers order both for chai. See our {link:products/green-cardamom/|green cardamom}.' },
  { q: 'How do I order?', a: 'Pick the weight and quantity, tap Order on WhatsApp, and send the message. We confirm availability, delivery and payment on WhatsApp.' },
];

function teaMain(ctx) {
  return productSpecPage(ctx, shop[1], {
    crumb: 'Tea powder',
    rows: [['Product', 'Tea powder'], ['Retail packs', '250 g, 500 g, 1 kg'], ['Wholesale', 'On request'], ['Order', 'WhatsApp']],
    faq: teaFaq,
    links: 'Wholesale quantities? <a href="' + waHello + '" target="_blank" rel="noopener">WhatsApp us</a> · {link:products/|All products}',
  });
}

function greenMain(ctx) {
  return productSpecPage(ctx, shop[0], {
    crumb: 'Whole green cardamom',
    rows: [
      ['Product', 'Whole green cardamom (elaichi)'], ['Origin', 'Idukki, Kerala, India'], ['Form', 'Whole dried pods'],
      ['Sizes', '8 mm, 7 mm, 6 mm, 5 mm, rejects'], ['Retail packs', '25 g to 10 kg'], ['Wholesale', '25 kg and above, see price list'], ['Samples', 'Available on request'],
    ],
    faq: greenFaq,
    links: '{link:products/green-cardamom-price-list/|Grade-wise price list} · {link:green-cardamom-guide/|buyer’s guide} · {link:journal/indian-cardamom-grades-agb-ageb-explained/|grades} · {link:journal/how-to-store-green-cardamom-keep-aroma/|storage} · {link:india/bulk-cardamom-wholesale/|bulk and wholesale}',
  });
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
        <h2>Seeds or whole pods?</h2>
        <p>Whole pods protect the seeds, so aroma lasts longer in storage, and size and colour are easy to check by eye. Seeds save the step of removing the husk, which suits blenders who want only the kernel. Because seeds lose fragrance faster once out of the pod, they are best bought in quantities you can use within a reasonable time. Our note on {link:journal/cardamom-pods-vs-seeds-vs-powder/|pods vs seeds vs powder} compares the forms in more detail.</p>
        <h2>Where cardamom seeds are used</h2>
        <p>Seeds are used in spice and masala blends, bakery and sweet recipes, beverage mixes, rice and meat dishes, and in coffee and tea preparations where the husk is not wanted. Aroma, cleanliness and dryness matter most, so tell us how you will use them and we can advise on the right form.</p>
        <h2>Origin: Idukki, Kerala</h2>
        <p>Our cardamom comes from Idukki in the Western Ghats, a cool, humid, shaded region long known for green cardamom. You can read more in our {link:green-cardamom-guide/|complete green cardamom guide} and in why {link:journal/why-idukki-cardamom-has-a-character-of-its-own/|Idukki cardamom has a character of its own}.</p>
        <h2>Storage and handling</h2>
        <p>Keep seeds in a sealed, airtight container in a cool, dry place away from sunlight and strong odours. See {link:journal/how-to-store-green-cardamom-keep-aroma/|how to store green cardamom} and {link:journal/how-long-does-green-cardamom-last/|how long it lasts}.</p>
        <h2>Specifying seeds</h2>
        <p>Tell us your application, expected quantity and packing needs, and we will confirm availability and specification. We quote on request because price depends on quantity, packing and destination, and samples are available before you order.</p>
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
    lede: 'Senvora Spices welcomes importers, wholesalers and food businesses across the Gulf. Choose your market to see what matters there.',
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
  ${pageHero(ctx, { kicker: d.kicker, h1: d.h1, lede: d.lede, crumbs: d.crumbs || (d.path === 'india/' ? [{ name: 'India' }] : [{ name: 'India', path: 'india/' }, { name: d.crumbName }]) })}
  <div class="content-wrap two-col">
    <div>
      <section class="prose">${d.sections.map((x) => `<h2>${esc(x.h)}</h2>${x.p.map((t) => `<p>${inline(t, ctx)}</p>`).join('')}`).join('')}</section>
      <section><h2 class="h2-small">${esc(d.faqTitle || 'Questions from Indian buyers')}</h2>${faqList(d.faq, ctx)}</section>
    </div>
    <aside class="side-card">
      <p class="eyebrow">At a glance</p>
      ${specTable(d.glance)}
      <a class="solid-button full" href="${href(ctx, 'request-a-sample/')}">Request a sample <span aria-hidden="true">↗</span></a>
      <a class="outline-button full" href="${waHello}" target="_blank" rel="noopener" data-track="whatsapp">Chat on WhatsApp <span aria-hidden="true">↗</span></a>
    </aside>
  </div>
  ${ctaBand(ctx, { kicker: d.cta?.kicker || 'India', title: d.cta?.title || 'Buying cardamom in India? Let’s talk.', text: d.cta?.text || 'Send your requirements and we will reply with options and a sample.', primary: { label: 'Request a sample', path: 'request-a-sample/' }, secondary: { label: 'Contact us', path: 'contact/' } })}`;
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
      <p>Retail pack prices are shown on the {link:products/|Products page}. Wholesale and export prices depend on size, quantity, packing, destination and delivery terms, so we quote those on request.</p>
      <h2>Questions?</h2>
      <p>See the {link:faq/|frequently asked questions} or {link:contact/|contact us}. Buyers in the Gulf can also read our pages for the {link:markets/uae/|UAE}, {link:markets/saudi-arabia/|Saudi Arabia} and {link:markets/qatar/|Qatar}.</p>
    </section>
  </div>
  ${ctaBand(ctx, { kicker: 'Step one', title: 'Send us your requirements.', primary: { label: 'Request a sample', path: 'request-a-sample/' }, secondary: { label: 'Chat on WhatsApp', path: waHello, external: true } })}`
    .replace(/\{link:([^|}]+)\|([^}]+)\}/g, (_, p, l) => `<a href="${href(ctx, p)}">${l}</a>`);
}

export const generalFaq = [
  { q: 'Where does your cardamom come from?', a: 'Our green cardamom comes from Idukki, Kerala, in the Western Ghats of southern India, and is grown on our own farm.' },
  { q: 'Which products do you supply?', a: 'Our main product is whole green cardamom. Cardamom seeds are available on enquiry. See the {link:products/|products page}.' },
  { q: 'Which countries do you supply?', a: 'India is one of our main markets (see {link:india/|buying cardamom in India}). We also supply importers in the Gulf: the {link:markets/uae/|UAE}, {link:markets/saudi-arabia/|Saudi Arabia}, {link:markets/qatar/|Qatar}, {link:markets/kuwait/|Kuwait}, {link:markets/oman/|Oman} and {link:markets/bahrain/|Bahrain}. Buyers from other countries are welcome to enquire.' },
  { q: 'Can I get a sample before ordering?', a: 'Yes. Samples are available on request. Use the {link:request-a-sample/|sample request page} and tell us your requirements and destination.' },
  { q: 'What is your minimum order quantity?', a: 'Minimum quantities depend on size, packing and shipping method and are shared on enquiry. Tell us the volume you are considering and we will respond with options.' },
  { q: 'Do you publish prices?', a: 'Yes, for retail packs from 25 g to 10 kg: see the {link:products/|Products page} and order on WhatsApp. Wholesale and export prices depend on size, quantity, packing, destination and delivery terms, so we quote those on request.' },
  { q: 'Which delivery terms do you offer?', a: 'We are happy to discuss FOB, CFR and CIF. Read more on the {link:export/|export process page}.' },
  { q: 'Which documents come with a shipment?', a: 'Typically a commercial invoice, packing list, bill of lading or airway bill and certificate of origin, plus any certificates your destination requires. We confirm the exact list with you for each order.' },
  { q: 'How should I store green cardamom?', a: 'Keep it sealed, in a cool, dry place, away from direct sunlight and strong odours.' },
  { q: 'Why is cardamom expensive?', a: 'It is grown in shaded hills and picked by hand in several rounds, then carefully dried and sorted. Prices also move with crop size, grade and demand. Read {link:journal/why-is-cardamom-so-expensive/|why cardamom is so expensive}.' },
  { q: 'What is the difference between green and black cardamom?', a: 'Green cardamom is small, light and sweetly aromatic, and is used in coffee, tea, sweets and rice. Black cardamom is larger, dried over smoke and has a smoky flavour. See {link:journal/green-vs-black-cardamom-differences/|green vs black cardamom}.' },
  { q: 'Are cardamom pods, seeds and powder the same?', a: 'They come from the same spice, but whole pods keep aroma longest while seeds and powder fade faster. See {link:journal/cardamom-pods-vs-seeds-vs-powder/|pods vs seeds vs powder}.' },
  { q: 'How long does green cardamom last?', a: 'Whole pods stored sealed in a cool, dry place keep their aroma for many months. See {link:journal/how-long-does-green-cardamom-last/|how long green cardamom lasts}.' },
  { q: 'When is cardamom harvested in Kerala?', a: 'Pods are picked by hand in rounds over several months, mainly in the later part of the year. See {link:journal/cardamom-harvest-season-kerala/|the Kerala harvest season}.' },
  { q: 'What is elaichi?', a: 'Elaichi is the Hindi and Urdu name for cardamom. Senvora Spices supplies whole green elaichi from Idukki, Kerala. Read the {link:green-cardamom-guide/|complete guide}.' },
  { q: 'How can I check cardamom quality at home?', a: 'Check colour, size, dryness, cleanliness, aroma and the seeds inside. See {link:journal/how-to-check-cardamom-quality-at-home/|6 simple quality tests}.' },
  { q: 'What is cardamom called in Malayalam and Arabic?', a: 'It is elakka in Malayalam, elaichi in Hindi and hail (هيل) in Arabic. See {link:journal/cardamom-names-elaichi-elakka-hail/|cardamom names in other languages}.' },
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
  const related = articles.filter((x) => x.slug !== a.slug)
    .map((x, i) => ({ x, score: (x.tag === a.tag ? 10 : 0) + i }))
    .sort((m, n) => n.score - m.score).map((m) => m.x).slice(0, 3);
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
      <div class="chip-row"><a href="${href(ctx, 'products/green-cardamom-price-list/')}">Grade-wise price list</a><a href="${href(ctx, 'products/')}">Shop retail packs</a><a href="${href(ctx, 'products/cardamom-seeds/')}">Cardamom seeds</a><a href="${href(ctx, 'markets/')}">Gulf markets</a></div>
    </section>
  </div>
  ${ctaBand(ctx, { kicker: 'Talk to Senvora Spices', title: 'Have questions about Idukki cardamom?', primary: { label: 'Request a sample', path: 'request-a-sample/' }, secondary: { label: 'Chat on WhatsApp', path: waHello, external: true } })}`;
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
    title: 'Buy Cardamom (Elaichi) Online, Idukki',
    description: 'Buy cardamom (elaichi) direct from our Idukki farm: 8, 7 and 6 mm green pods, 1 to 10 kg packs, bulk wholesale. Live prices, India and Gulf.',
    bodyClass: 'is-home',
    alternates: { en: '', ar: 'ar/' }, alt: 'ar/',
    jsonld: () => [organizationLd(), websiteLd()],
    render: homeMain,
  });
  add({ path: 'about/', title: 'About Senvora Spices Idukki, Kerala', description: 'Senvora Spices (Idukki, Kerala) supplies premium green cardamom from Pallivasal, Idukki to buyers in India and the Gulf. Our story, values and how we work.', crumbs: [{ name: 'About' }], render: aboutMain });
  add({ path: 'products/', title: 'Buy Cardamom Online, Green Elaichi 1 to 10 kg', description: 'Buy green cardamom (elaichi) online from Idukki, Kerala. Choose 8 mm, 7 mm or 6 mm pods and a 1 kg to 10 kg pack, then order on WhatsApp. Bulk wholesale available.', crumbs: [{ name: 'Products' }], render: productsIndexMain });
  add({
    path: 'products/green-cardamom/', title: 'Green Cardamom (Elaichi) Price & Buy Online',
    description: 'Whole green cardamom (elaichi) from Idukki, Kerala: 8 mm bold, 7 mm and small pods. Retail packs, bulk wholesale and Gulf supply. Specification, uses and FAQs.',
    alternates: { en: 'products/green-cardamom/', ar: 'ar/green-cardamom/' }, alt: 'ar/green-cardamom/',
    crumbs: [{ name: 'Products', path: 'products/' }, { name: 'Whole green cardamom' }], faq: greenFaq,
    product: { name: 'Whole green cardamom', description: 'Whole dried green cardamom pods (Elettaria cardamomum) from Idukki, Kerala, India, selected for colour and aroma and prepared for export.', category: 'Spices' },
    render: greenMain,
  });
  add({ path: 'products/green-cardamom-price-list/', title: 'Green Cardamom Price per Kg by Grade, Idukki', description: 'Green cardamom (elaichi) price per kg today by size and grade: 8 mm AGEB, 7 mm AGB/AGS, 6 mm, 5 mm. Retail and wholesale from Idukki, updated daily.', crumbs: [{ name: 'Products', path: 'products/' }, { name: 'Price list' }], faq: priceFaq, render: priceListMain });
  add({ path: 'products/tea-powder/', title: 'Tea Powder: Wholesale and Retail', description: 'Tea powder from Senvora Spices for wholesale and retail buyers, supplied alongside green cardamom from Idukki, Kerala. Request a quote.', crumbs: [{ name: 'Products', path: 'products/' }, { name: 'Tea powder' }], faq: teaFaq, render: teaMain });
  add({ path: 'products/cardamom-seeds/', title: 'Cardamom Seeds from Idukki, Kerala', description: 'Selected cardamom seeds from Idukki, Kerala for aroma-led food and beverage applications. Availability and specification confirmed on enquiry.', crumbs: [{ name: 'Products', path: 'products/' }, { name: 'Cardamom seeds' }], faq: seedsFaq, render: seedsMain });
  { const g = { ...guidePage, crumbs: [{ name: 'Green cardamom guide' }] }; add({ path: g.path, alternates: { en: g.path, ar: `ar/${g.path}` }, alt: `ar/${g.path}`, title: g.metaTitle, description: g.metaDescription, crumbs: g.crumbs, faq: g.faq, render: (ctx) => indiaMain(ctx, g) }); }
  for (const d of indiaPages) add({ path: d.path, title: d.metaTitle, description: d.metaDescription, keywords: d.keywords, geo: d.geo, locale: 'en_IN', crumbs: d.path === 'india/' ? [{ name: 'India' }] : [{ name: 'India', path: 'india/' }, { name: d.crumbName }], faq: d.faq, render: (ctx) => indiaMain(ctx, d) });
  for (const d of cityPages) add({ path: d.path, title: d.metaTitle, description: d.metaDescription, keywords: d.keywords, geo: d.geo, locale: 'en_IN', crumbs: d.path === 'india/' ? [{ name: 'India' }] : [{ name: 'India', path: 'india/' }, { name: d.crumbName }], faq: d.faq, render: (ctx) => indiaMain(ctx, d) });
  add({ path: 'markets/', title: 'Markets: Cardamom for the Gulf', description: 'Senvora Spices supplies whole green cardamom to importers in the UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain. Choose your market to learn more.', crumbs: [{ name: 'Markets' }], render: marketsIndexMain });
  for (const m of markets) {
    add({
      path: `markets/${m.slug}/`, title: m.metaTitle, description: m.metaDescription, keywords: m.keywords, geo: m.geo, locale: m.locale,
      crumbs: [{ name: 'Markets', path: 'markets/' }, { name: m.name }], faq: m.faq,
      ...(Object.hasOwn(marketsAr, m.slug) ? { alternates: { en: `markets/${m.slug}/`, ar: `ar/markets/${m.slug}/` }, alt: `ar/markets/${m.slug}/` } : {}),
      render: (ctx) => marketMain(ctx, m),
    });
  }
  add({ path: 'export/', title: 'Export Process: Order Cardamom from India', description: 'How Senvora Spices works with importers: requirements, samples, quotation, packing, documents and shipment, with FOB, CFR and CIF delivery terms explained.', crumbs: [{ name: 'Export process' }], render: exportMain });
  add({ path: 'faq/', alternates: { en: 'faq/', ar: 'ar/faq/' }, alt: 'ar/faq/', title: 'FAQ: Buying Cardamom from India', description: 'Answers to common questions from importers about Senvora Spices’ green cardamom: samples, minimum orders, prices, delivery terms, documents and storage.', crumbs: [{ name: 'FAQ' }], faq: generalFaq, render: faqMain });
  add({ path: 'contact/', title: 'Contact', description: 'Contact Senvora Spices by email, phone or WhatsApp, or send your cardamom requirements through our enquiry form.', crumbs: [{ name: 'Contact' }], render: contactMain });
  add({ path: 'request-a-sample/', title: 'Request a Cardamom Sample', description: 'Request a sample of green cardamom from Idukki, Kerala. Tell Senvora Spices your requirements and destination and we will reply with next steps.', crumbs: [{ name: 'Request a sample' }], render: sampleMain });
  add({ path: 'journal/', title: 'Journal: Notes from the Spice Trail', description: 'Practical articles on Idukki cardamom, quality, sizes, Arabic coffee and importing spices from India, from Senvora Spices.', crumbs: [{ name: 'Journal' }], render: journalIndexMain });
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

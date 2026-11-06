import {
  site, markets, href, pageHero, ctaBand, faqList, specTable, enquiryForm, contactDetails,
  organizationLd, websiteLd, waHelloAr, tel, whatsappLink,
} from './templates.mjs';

const arFaqHome = [
  { q: 'من أين يأتي الهيل الذي تقدمونه؟', a: 'يأتي الهيل الأخضر لدينا من منطقة إدوكي في ولاية كيرالا جنوب الهند، ونحصل عليه مباشرة من المزارعين.' },
  { q: 'هل يمكنني الحصول على عيّنة قبل الطلب؟', a: 'نعم، العيّنات متاحة عند الطلب. أرسل لنا متطلباتك ووجهة الشحن وسنرد عليك بالخطوات التالية.' },
  { q: 'ما هي الكمية الدنيا للطلب؟', a: 'تعتمد الكمية الدنيا على الحجم والتعبئة وطريقة الشحن، ونوافيك بها عند الاستفسار. أخبرنا بالكمية التي تفكر بها وسنعرض عليك الخيارات.' },
  { q: 'هل تعرضون الأسعار على الموقع؟', a: 'لا. تعتمد الأسعار على الحجم والكمية والتعبئة والوجهة وشروط التسليم، لذلك نقدم عرض السعر عند الطلب.' },
  { q: 'ما شروط التسليم التي يمكنكم مناقشتها؟', a: 'يسعدنا مناقشة شروط FOB وCFR وCIF بحسب ما يناسب ترتيبات الشحن لديك.' },
];

function homeMain(ctx) {
  const pod = href(ctx, 'assets/heritage-cardamom-pod.webp');
  return `
  <section class="inner-hero ar-hero">
    <p class="section-kicker">الهيل الأخضر من إدوكي، كيرالا</p>
    <h1 class="page-title">هيل أخضر نقي.<br /><em>جذوره في التراث.</em></h1>
    <p class="page-lede">نوفّر الهيل الأخضر الكامل من تلال إدوكي في كيرالا بالهند، للمستوردين وتجار الجملة وشركات القهوة والأغذية في الإمارات والسعودية وقطر والكويت وعُمان والبحرين.</p>
    <div class="hero-actions">
      <a class="solid-button" href="#enquiry">اطلب عيّنة وعرض سعر <span aria-hidden="true">↖</span></a>
      <a class="outline-button" href="${waHelloAr}" target="_blank" rel="noopener" data-track="whatsapp">تواصل عبر واتساب <span aria-hidden="true">↖</span></a>
    </div>
    <img class="ar-pod" src="${pod}" alt="حبة هيل أخضر طازجة من إدوكي" width="320" height="322" fetchpriority="high" />
  </section>
  <div class="content-wrap">
    <section class="prose">
      <h2>لماذا الهيل من إدوكي؟</h2>
      <p>تقع إدوكي في سلسلة جبال غات الغربية، حيث الأجواء الباردة الرطبة والأمطار المنتظمة التي يحبها الهيل. تنمو النباتات تحت ظلال الأشجار العالية، ويُقطف الثمر يدوياً على دفعات عند نضجه. وهذا ما يمنح الهيل لوناً أخضر زاهياً ورائحة عطرية نقية.</p>
      <h2>الهيل في القهوة العربية</h2>
      <p>الهيل عنصر أساسي في القهوة العربية في دول الخليج. ولأن القهوة العربية خفيفة التحميص، تظهر رائحة الهيل بوضوح في الفنجان، فكلما كانت الحبة طازجة وحلوة الرائحة ونظيفة، ارتقى طعم القهوة. لذلك نركز على الهيل الأخضر الكامل المنتقى بعناية.</p>
    </section>
    <section>
      <h2 class="h2-small">الهيل الأخضر الكامل</h2>
      ${specTable([
        ['المنتج', 'هيل أخضر كامل (حبوب كاملة مجففة)'],
        ['المنشأ', 'إدوكي، كيرالا، الهند'],
        ['اللون', 'أخضر، منتقى للون متجانس'],
        ['الحجم', 'يُحدَّد بالمليمتر حسب طلبك، بحسب التوفر'],
        ['الرائحة', 'طازجة وحلوة ونظيفة'],
        ['التعبئة', 'تعبئة صالحة للأغذية، يُتفق على حجمها معك'],
        ['العيّنات', 'متاحة عند الطلب'],
        ['شروط التسليم', 'FOB أو CFR أو CIF بالاتفاق'],
      ])}
    </section>
    <section>
      <h2 class="h2-small">الأسواق التي نخدمها</h2>
      <div class="chip-row">${markets.map((m) => `<a href="${href(ctx, `markets/${m.slug}/`)}" hreflang="en" lang="en">${m.name}</a>`).join('')}</div>
      <p class="related-line">صفحات الأسواق متوفرة حالياً بالإنجليزية.</p>
    </section>
    <section class="prose">
      <h2>كيف نعمل</h2>
      <ol class="steps ar-steps">
        <li><span class="step-num">١</span><div><h3>أخبرنا بما تحتاجه</h3><p>الحجم أو الدرجة، والكمية، والتعبئة، ووجهة الشحن.</p></div></li>
        <li><span class="step-num">٢</span><div><h3>اعتمد العيّنة</h3><p>قارن الحبوب بالمواصفات التي تريدها.</p></div></li>
        <li><span class="step-num">٣</span><div><h3>استلم عرض السعر</h3><p>نرسل لك عرضاً بحسب الحجم والكمية والتعبئة وشروط التسليم.</p></div></li>
        <li><span class="step-num">٤</span><div><h3>التأكيد والشحن</h3><p>نجهز التعبئة والمستندات ونشحن إلى الميناء المتفق عليه.</p></div></li>
      </ol>
    </section>
    <section>
      <h2 class="h2-small">أسئلة شائعة</h2>
      ${faqList(arFaqHome, ctx)}
    </section>
  </div>
  <section class="contact-section ar-contact" id="contact">
    <div class="contact-pattern" aria-hidden="true"></div>
    <p class="section-kicker">تواصل معنا</p>
    <div class="contact-grid">
      <div><h2 id="contact-title">محادثة أفضل<br /><em>تبدأ بحبة هيل.</em></h2><p>أخبرنا بما تبحث عنه وأين تبيع، وسنرد عليك بالخطوات التالية.</p></div>
      <div class="contact-actions">${contactDetails(ctx)}</div>
    </div>
    <div class="enquiry" id="enquiry">
      <div class="enquiry-intro">
        <p class="eyebrow">اطلب عرض سعر</p>
        <h3>أرسل لنا متطلباتك</h3>
        <p>شاركنا بعض التفاصيل وأرسلها إلينا عبر واتساب أو البريد الإلكتروني.</p>
      </div>
      ${enquiryForm(ctx)}
    </div>
  </section>`;
}

const arGreenFaq = [
  { q: 'ما حجم الهيل الأخضر لديكم؟', a: 'يُحدَّد الحجم بالمليمتر بحسب احتياجك، مثل ٦ أو ٧ أو ٨ مم فأكثر، بحسب التوفر. أخبرنا بالحجم المطلوب وسنؤكد المتاح ونرسل لك عيّنة.' },
  { q: 'ما هي الكمية الدنيا للطلب؟', a: 'نوافيك بها عند الاستفسار لأنها تعتمد على الحجم والتعبئة وطريقة الشحن.' },
  { q: 'كيف يُخزَّن الهيل الأخضر؟', a: 'يُحفظ في عبوة محكمة الإغلاق، في مكان بارد وجاف، بعيداً عن أشعة الشمس المباشرة والروائح القوية.' },
];

function greenMain(ctx) {
  return `
  <section class="inner-hero ar-hero">
    <p class="section-kicker">المنتج</p>
    <h1 class="page-title">الهيل الأخضر<br /><em>الكامل.</em></h1>
    <p class="page-lede">حبوب هيل كاملة طازجة وعطرية من إدوكي في كيرالا، منتقاة للونها الزاهي ورائحتها الحلوة النظيفة.</p>
  </section>
  <div class="content-wrap two-col">
    <div>
      <section class="prose">
        <h2>نظرة عامة</h2>
        <p>الهيل الأخضر (Elettaria cardamomum) هو الثمرة الكاملة المجففة لنبات ينمو في التلال الظليلة الممطرة في غات الغربية. تأتي حبوبنا من إدوكي في كيرالا، ونحصل عليها مباشرة من المزارعين، ثم ننتقيها بحسب اللون والرائحة والحالة قبل التصدير.</p>
        <p>شراء الحبوب الكاملة يحمي الرائحة حتى وقت الاستخدام، ويتيح لك فحص الحجم واللون والنظافة بنفسك، ولهذا يفضلها كثير من المستوردين ومحمصي القهوة في الخليج.</p>
        <h2>الاستخدامات الشائعة</h2>
        <p>القهوة العربية، والشاي والكرك، والحلويات والحلوى العُمانية، والمخبوزات والمعجنات، وأطباق الأرز، وخلطات البهارات.</p>
        <h2>لمن هو مناسب؟</h2>
        <p>المستوردون وتجار الجملة وخالطو القهوة والشاي ومعبّئو التوابل وشركات تصنيع الأغذية.</p>
      </section>
    </div>
    <aside class="side-card">
      <p class="eyebrow">المواصفات</p>
      ${specTable([
        ['المنتج', 'هيل أخضر كامل'],
        ['الاسم العلمي', 'Elettaria cardamomum'],
        ['المنشأ', 'إدوكي، كيرالا، الهند'],
        ['الشكل', 'حبوب كاملة مجففة'],
        ['اللون', 'أخضر، منتقى للون متجانس'],
        ['الحجم', 'بالمليمتر حسب طلبك، بحسب التوفر'],
        ['الرائحة', 'طازجة وحلوة ونظيفة'],
        ['الكمية الدنيا', 'عند الاستفسار'],
        ['العيّنات', 'متاحة عند الطلب'],
        ['شروط التسليم', 'FOB أو CFR أو CIF بالاتفاق'],
      ])}
      <a class="solid-button full" href="${href(ctx, 'ar/#enquiry')}">اطلب عيّنة <span aria-hidden="true">↖</span></a>
    </aside>
  </div>
  <div class="content-wrap">
    <section><h2 class="h2-small">أسئلة شائعة</h2>${faqList(arGreenFaq, ctx)}</section>
  </div>
  ${ctaBand(ctx, { kicker: 'الخطوة التالية', title: 'انظر إليه وشمّه، ثم قرّر.', text: 'اطلب عيّنة وقارنها بمواصفاتك.', primary: { label: 'اطلب عيّنة', path: 'ar/#enquiry' }, secondary: { label: 'تواصل عبر واتساب', path: whatsappLink('Hello Heritage Spices, I would like a cardamom sample. / مرحباً، أود طلب عيّنة هيل.'), external: true } })}`;
}

export function arabicPages() {
  const pages = [];
  pages.push({
    lang: 'ar', path: 'ar/',
    title: 'هيريتج سبايسز | هيل أخضر فاخر من إدوكي، كيرالا',
    description: 'هيل أخضر كامل فاخر من إدوكي في كيرالا للمستوردين في الإمارات والسعودية وقطر والكويت وعُمان والبحرين. مصدر مباشر من المزارعين. اطلب عيّنة.',
    bodyClass: 'on-page is-ar',
    alternates: { en: '', ar: 'ar/' }, alt: '',
    faq: arFaqHome,
    jsonld: () => [organizationLd(), websiteLd()],
    render: homeMain,
  });
  pages.push({
    lang: 'ar', path: 'ar/green-cardamom/',
    title: 'الهيل الأخضر الكامل من إدوكي، كيرالا',
    description: 'هيل أخضر كامل من إدوكي في كيرالا: المواصفات والاستخدامات والتعبئة وأسئلة شائعة للمستوردين وشركات الأغذية. اطلب عيّنة من هيريتج سبايسز.',
    bodyClass: 'on-page is-ar',
    alternates: { en: 'products/green-cardamom/', ar: 'ar/green-cardamom/' }, alt: 'products/green-cardamom/',
    crumbs: [{ name: 'الهيل الأخضر' }], faq: arGreenFaq,
    render: greenMain,
  });
  return pages;
}

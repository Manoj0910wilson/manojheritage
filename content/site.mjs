// Central settings for the whole website. Edit here, then run `npm run build`.

export const site = {
  name: 'Heritage Spices',
  tagline: 'Pure Cardamom. Rooted in Heritage.',

  // The public address of the site WITHOUT a trailing slash.
  // Today it is the free GitHub address. When you buy a custom domain, change this
  // (or build with SITE_URL=https://yourdomain.com) and add a CNAME file in /public.
  url: (process.env.SITE_URL || 'https://manoj0910wilson.github.io/manojheritage').replace(/\/$/, ''),

  email: 'heritagespices01@gmail.com',
  phoneDisplay: '+91 89395 35151',
  phoneTel: '+918939535151',
  whatsapp: '918939535151', // country code + number, no "+" or spaces

  // Add real profiles when you have them, e.g. { label: 'Instagram', url: 'https://instagram.com/yourhandle' }
  social: [{ label: 'Instagram', url: 'https://www.instagram.com/heri.tagespice/' }],

  // Paste your Google Analytics 4 measurement ID here (looks like G-XXXXXXXXXX) to start tracking visits.
  analyticsId: 'G-7X6CN8SRDV',
  // Paste the token from Google Search Console's "HTML tag" verification method (just the content value).
  searchConsoleVerification: '',

  // Dates used in article markup and the sitemap.
  published: '2026-11-06',
};

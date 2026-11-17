// Retail shop data. Prices are in INR and are the owner's to change.
// Basis (17 Nov 2026): Idukki auction average about Rs 2,970-3,010/kg, online 8 mm bold retail
// listings Rs 3,000-3,300/kg (B2B marketplace), branded small-pack retail far higher.
export const priceUpdated = '17 November 2026';

const cardamomPerKg = (n) => (n === 1 ? 4000 : n <= 3 ? 3950 : n <= 5 ? 3900 : n <= 7 ? 3850 : 3800);

export const shop = [
  {
    id: 'green-cardamom',
    name: 'Green Cardamom',
    short: 'Premium whole pods from Idukki, Kerala. Size and grade confirmed on WhatsApp.',
    link: 'products/green-cardamom/',
    alt: 'Heritage Spices green cardamom pouch',
    variants: Array.from({ length: 10 }, (_, i) => {
      const n = i + 1;
      return { id: `${n}kg`, label: `${n} kg`, price: cardamomPerKg(n) * n, perKg: cardamomPerKg(n), img: `cardamom-${n}kg.webp` };
    }),
  },
  {
    id: 'tea-powder',
    name: 'Tea Powder',
    short: 'Premium tea powder for daily chai. Wholesale on request.',
    link: 'products/tea-powder/',
    alt: 'Heritage Spices tea powder pouch',
    variants: [
      { id: '250g', label: '250 g', price: 170, perKg: 680, img: 'tea-250g.webp' },
      { id: '500g', label: '500 g', price: 330, perKg: 660, img: 'tea-500g.webp' },
      { id: '1kg', label: '1 kg', price: 640, perKg: 640, img: 'tea-1kg.webp' },
    ],
  },
];

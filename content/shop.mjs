// Retail shop data. Prices come from content/pricing.mjs (auction-linked, margin applied).
import { grades, defaultGradeId, retailPerKg, updatedLabel } from './pricing.mjs';

export const priceUpdated = updatedLabel;
const kgs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const shop = [
  {
    id: 'green-cardamom',
    name: 'Green Cardamom',
    short: 'Premium whole pods from Idukki, Kerala. Choose a size and weight.',
    link: 'products/green-cardamom/',
    alt: 'Heritage Spices green cardamom pouch',
    defaultGrade: defaultGradeId,
    grades: grades.map((g) => ({
      id: g.id,
      label: g.code,
      sub: g.size,
      variants: kgs.map((n) => {
        const perKg = retailPerKg(g, n);
        return { id: `${n}kg`, label: `${n} kg`, price: perKg * n, perKg, img: `cardamom-${n}kg.webp` };
      }),
    })),
  },
  {
    id: 'tea-powder',
    name: 'Tea Powder',
    short: 'Premium tea powder for daily chai. Wholesale on request.',
    link: 'products/tea-powder/',
    alt: 'Heritage Spices tea powder pouch',
    grades: [{
      id: 'tea', label: '', variants: [
        { id: '250g', label: '250 g', price: 170, perKg: 680, img: 'tea-250g.webp' },
        { id: '500g', label: '500 g', price: 330, perKg: 660, img: 'tea-500g.webp' },
        { id: '1kg', label: '1 kg', price: 640, perKg: 640, img: 'tea-1kg.webp' },
      ],
    }],
  },
];

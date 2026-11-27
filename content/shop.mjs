// Retail shop data. Prices come from content/pricing.mjs (auction-linked, margin applied).
import { grades, defaultGradeId, retailPerKg, wholesalePerKg, settings, updatedLabel } from './pricing.mjs';

export const priceUpdated = updatedLabel;
const smalls = [{ id: '25g', label: '25 g', kg: 0.025 }, { id: '50g', label: '50 g', kg: 0.05 }, { id: '100g', label: '100 g', kg: 0.1 }, { id: '500g', label: '500 g', kg: 0.5 }];
const kgs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const shop = [
  {
    id: 'green-cardamom',
    name: 'Green Cardamom',
    short: 'Premium whole pods from Idukki, Kerala. Choose a size and weight.',
    link: 'products/green-cardamom/',
    alt: 'Senvora Spices green cardamom pouch',
    defaultGrade: defaultGradeId,
    grades: grades.map((g) => ({
      id: g.id,
      label: g.code,
      sub: g.size,
      variants: [...smalls.map((x) => {
        const perKg = retailPerKg(g, x.kg);
        // price = the larger of the normal retail price and (market cost + minimum profit), rounded up to a Rs 10 step, then charm-priced to end in 9
        const floor = Math.ceil((wholesalePerKg(g) * x.kg + settings.minProfitPerPack) / 10) * 10;
        const price = Math.max(Math.round(perKg * x.kg / 10) * 10, floor) - 1;
        return { id: x.id, label: x.label, price, perKg: Math.round((price + 1) / x.kg) - 1, img: `cardamom-${x.id}.webp` };
      }), ...kgs.map((n) => {
        const perKg = retailPerKg(g, n);
        return { id: `${n}kg`, label: `${n} kg`, price: perKg * n - 1, perKg: perKg - 1, img: `cardamom-${n}kg.webp` };
      })],
    })),
  },
  {
    id: 'tea-powder',
    name: 'Tea Powder',
    short: 'Premium tea powder for daily chai. Wholesale on request.',
    link: 'products/tea-powder/',
    alt: 'Senvora Spices tea powder pouch',
    grades: [{
      id: 'tea', label: '', variants: [
        { id: '250g', label: '250 g', price: 169, perKg: 679, img: 'tea-250g.webp' },
        { id: '500g', label: '500 g', price: 329, perKg: 659, img: 'tea-500g.webp' },
        { id: '1kg', label: '1 kg', price: 639, perKg: 639, img: 'tea-1kg.webp' },
      ],
    }],
  },
];

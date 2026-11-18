// Grade-wise price engine for green cardamom.
// Inputs: the latest Spices Board of India daily auction numbers (content/prices-data.json,
// refreshed every day by scripts/update-prices.mjs through GitHub Actions) and the settings below.
// EDIT THE SETTINGS to match your real buying cost and the margin you want. Nothing else needs to change.
import { readFileSync } from 'node:fs';

export const settings = {
  retailMargin: 0.20,      // markup over the cost basis for retail packs (1-10 kg)
  wholesaleMargin: 0.10,   // markup for wholesale (wholesaleMinKg and above)
  wholesaleMinKg: 25,
  smoothDays: 3,           // average the last N auction days so the price does not jump daily
  roundTo: 10,             // round prices to the nearest Rs 10
  // per-kg discount for bigger retail packs (applies from this weight upward)
  tiers: [ { fromKg: 1, off: 0 }, { fromKg: 2, off: 0.0125 }, { fromKg: 4, off: 0.025 }, { fromKg: 6, off: 0.0375 }, { fromKg: 8, off: 0.05 } ],
};

// mult = grade price as a multiple of the auction average (the auction average mixes all grades,
// so bigger, greener pods sit above it and smaller or mixed pods below it).
export const grades = [
  { id: 'ageb', code: 'AGEB', name: 'Extra Bold', size: 'approx. 8 mm and above', mult: 1.20, use: 'Premium retail, gifting, Arabic coffee' },
  { id: 'agb', code: 'AGB', name: 'Bold', size: 'approx. 7.5 to 8 mm', mult: 1.08, use: 'Everyday premium use, chai, sweets' },
  { id: 'ags', code: 'AGS', name: 'Superior', size: 'approx. 7 to 7.5 mm', mult: 0.98, use: 'Restaurants, blenders, value packs' },
  { id: 'std', code: 'Standard', name: 'Mixed', size: 'approx. 6 to 7 mm', mult: 0.88, use: 'Masala blends, bulk processing' },
  { id: 'sm', code: '4-5 mm', name: 'Small pods', size: 'approx. 4 to 5 mm', mult: 0.72, use: 'Spice mixes, grinding, tea masala' },
  { id: 'rej', code: 'Rejects', name: 'Broken pieces', size: 'split, broken and light pods', mult: 0.55, use: 'Powder, extracts, bulk processing' },
];
export const defaultGradeId = 'agb';

const data = JSON.parse(readFileSync(new URL('./prices-data.json', import.meta.url), 'utf8'));
const hist = [...(data.history || [])].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, settings.smoothDays);
export const basisAvg = hist.reduce((s, h) => s + h.avg, 0) / Math.max(1, hist.length);

const round = (n) => Math.round(n / settings.roundTo) * settings.roundTo;
const tierOff = (kg) => settings.tiers.filter((t) => kg >= t.fromKg).pop().off;

export const retailPerKg = (g, kg = 1) => round(basisAvg * g.mult * (1 + settings.retailMargin) * (1 - tierOff(kg)));
export const wholesalePerKg = (g) => round(basisAvg * g.mult * (1 + settings.wholesaleMargin));

const d = new Date((data.updated || data.auctionDate) + 'T00:00:00Z');
export const updatedLabel = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const auctionLabel = data.auctionDate ? new Date(data.auctionDate + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : updatedLabel;

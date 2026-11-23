// Grade-wise price engine for green cardamom.
// Inputs: the latest Spices Board of India daily auction numbers (content/prices-data.json,
// refreshed every day by scripts/update-prices.mjs through GitHub Actions) and the settings below.
// EDIT THE SETTINGS to match your real buying cost and the margin you want. Nothing else needs to change.
import { readFileSync } from 'node:fs';

export const settings = {
  retailMargin: 0.15,      // retail packs (1-10 kg): 15% over the market-based price
  wholesaleMargin: 0.00,   // wholesale (wholesaleMinKg and above) is priced at the market-based rate, ~Rs 50-100 under comparable Idukki sellers
  wholesaleMinKg: 25,
  smoothDays: 3,           // average the last N auction days so the price does not jump daily
  roundTo: 10,             // round prices to the nearest Rs 10
  // per-kg discount for bigger retail packs (applies from this weight upward)
  tiers: [ { fromKg: 0.025, off: -0.20 }, { fromKg: 0.05, off: -0.15 }, { fromKg: 0.1, off: -0.10 }, { fromKg: 0.5, off: -0.04 }, { fromKg: 1, off: 0 }, { fromKg: 2, off: 0.0125 }, { fromKg: 4, off: 0.025 }, { fromKg: 6, off: 0.0375 }, { fromKg: 8, off: 0.05 } ],
};

// mult = grade price as a multiple of the auction average (the auction average mixes all grades,
// so bigger, greener pods sit above it and smaller or mixed pods below it).
export const grades = [
  { id: '8mm', code: '8 mm', name: 'Extra Bold (AGEB)', size: '8 mm and above', mult: 1.11, use: 'Premium retail, gifting, Arabic coffee' },
  { id: '7mm', code: '7 mm', name: 'Bold (AGB / AGS)', size: '7 to 8 mm', mult: 1.00, use: 'Everyday premium use, chai, sweets, restaurants' },
  { id: '6mm', code: '6 mm', name: 'Standard', size: '6 to 7 mm', mult: 0.84, use: 'Masala blends, bulk processing' },
  { id: '5mm', code: '5 mm', name: 'Small pods', size: '4 to 5 mm', mult: 0.77, use: 'Spice mixes, grinding, tea masala' },
  { id: 'rej', code: 'Rejects', name: 'Broken pieces', size: 'split, broken and light pods', mult: 0.55, use: 'Powder, extracts, bulk processing' },
];
export const defaultGradeId = '7mm';

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

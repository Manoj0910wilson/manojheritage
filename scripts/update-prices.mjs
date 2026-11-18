// Fetches the Spices Board of India small-cardamom auction ticker and updates content/prices-data.json.
// Exits non-zero (keeping old prices) if nothing valid is found, so GitHub emails the owner.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const FILE = new URL('../content/prices-data.json', import.meta.url);
const URLS = ['https://www.indianspices.com/', 'https://www.indianspices.com/sales/cardamom-small-market.html'];
const MON = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };

const num = (s) => parseFloat(String(s).replace(/,/g, ''));

export function parseTicker(text) {
  const t = text.replace(/\s+/g, ' ');
  const d = t.match(/Date of Auction\s*:?\s*(\d{1,2})[-\/ ]([A-Za-z]{3}|\d{1,2})[a-z]*[-\/ ,]*(\d{4})/i);
  const max = t.match(/Max(?:imum)?\.? Price(?:\s*\(?(?:Rs\.?|₹)[^)]*\)?)?\s*:?\s*(?:Rs\.?|₹)?\s*([\d,]+(?:\.\d+)?)/i);
  const avg = t.match(/Avg\.?(?:erage)? Price(?:\s*\(?(?:Rs\.?|₹)[^)]*\)?)?\s*:?\s*(?:Rs\.?|₹)?\s*([\d,]+(?:\.\d+)?)/i);
  if (!d || !max || !avg) return null;
  const mi = /^\d+$/.test(d[2]) ? Number(d[2]) - 1 : MON[d[2].toLowerCase()];
  if (mi === undefined || mi < 0 || mi > 11) return null;
  const date = `${d[3]}-${String(mi + 1).padStart(2, '0')}-${String(d[1]).padStart(2, '0')}`;
  return { date, avg: num(avg[1]), max: num(max[1]) };
}

export function validate(r, now = new Date()) {
  if (!r) return 'could not parse';
  if (!(r.avg >= 500 && r.avg <= 20000)) return `avg out of range: ${r.avg}`;
  if (!(r.max >= r.avg && r.max <= 30000)) return `max invalid: ${r.max}`;
  const age = (now - new Date(r.date + 'T00:00:00Z')) / 864e5;
  if (!(age >= -1 && age <= 5)) return `auction date stale or invalid: ${r.date}`;
  return null;
}

export function merge(data, r, now = new Date()) {
  const hist = (data.history || []).filter((h) => h.date !== r.date);
  hist.push({ date: r.date, avg: r.avg, max: r.max });
  hist.sort((a, b) => a.date.localeCompare(b.date));
  return { ...data, updated: now.toISOString().slice(0, 10), auctionDate: r.date, history: hist.slice(-14) };
}

async function fetchText() {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch();
  try {
    for (const url of URLS) {
      const page = await browser.newPage();
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(3000);
        const text = await page.evaluate(() => document.body.innerText);
        if (/Date of Auction/i.test(text)) return text;
      } catch (e) { console.error(url, e.message); }
      await page.close();
    }
  } finally { await browser.close(); }
  return '';
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const text = await fetchText();
  const r = parseTicker(text);
  const err = validate(r);
  if (err) { console.error('Price update failed:', err); process.exit(1); }
  const data = merge(JSON.parse(readFileSync(FILE, 'utf8')), r);
  writeFileSync(FILE, JSON.stringify(data, null, 2) + '\n');
  console.log('Updated prices:', r);
}

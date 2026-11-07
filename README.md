# Heritage Spices

Multi-page, search-engine-friendly website for Heritage Spices (premium green cardamom from Idukki, Kerala), built for importers in the UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain. English and Arabic.

## How it works

`npm run build` renders every page to plain HTML in `docs/`, which GitHub Pages serves (Settings → Pages → `main` branch, `/docs` folder).

| What | Where |
| --- | --- |
| Contact details, site URL, analytics ID, Search Console token, social links | `content/site.mjs` |
| Gulf market pages (one per country) | `content/markets.mjs` |
| Journal articles | `content/articles.mjs` |
| Page layouts and copy for English / Arabic pages | `scripts/pages-en.mjs`, `scripts/pages-ar.mjs` |
| Header, footer, SEO tags, structured data | `scripts/templates.mjs` |
| Styles / browser script | `src/*.css`, `src/main.js` |
| Images, favicon, share image | `public/` |
| Floating pod frames (62 transparent WebP frames, turntable) | `public/assets/pod/` |
| Exploded-view cutouts (whole pod, split pod, seeds) | `public/assets/stages/` (made with `scripts/cutout-stages.py`) |
| Background and story photos | `public/assets/img/` |
| Scroll motion (floating pod, exploded view, parallax) | `src/motion.js` |

## Everyday tasks

```bash
npm install
npm run build      # rebuild docs/
npm run check      # broken links, titles, descriptions, headings, JSON-LD
npm run dev        # build and preview at http://localhost:3000
```

After any change: `npm run build && npm run check`, commit, push to `main`. The live site updates in a minute or two.

## SEO set-up checklist

- [ ] Google Search Console: add the site, paste the HTML-tag token into `searchConsoleVerification`, submit `sitemap.xml`.
- [ ] Google Analytics 4: paste the measurement ID into `analyticsId`.
- [ ] Custom domain (later): build with `SITE_URL=https://yourdomain.com npm run build`, add a `CNAME` file to `public/`, and set the domain in Settings → Pages.
- [ ] Add credentials (IEC, Spices Board, lab reports) to the About and Export pages once obtained.
- [ ] Replace placeholder visuals with real farm and product photos in `public/assets/`.

## Home page motion

- One pod floats down the home page. Its position per section is set with `data-pod="x,y,size,tilt,opacity"` (fractions of the screen; `data-pod-m` overrides it on phones) in `scripts/pages-en.mjs`.
- The product section is an exploded view (whole pod, pod split open, seeds) driven by scroll. It is fully shown, without animation, for visitors who prefer reduced motion.
- Keep photos under about 200 KB each (WebP) so the site stays fast for visitors in the Gulf.

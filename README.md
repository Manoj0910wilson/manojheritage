# Heritage Spices

Responsive cardamom export homepage for Heritage Spices, with a scroll-driven product story, Idukki provenance messaging, buyer CTAs, and a click-to-call contact action.

## Run locally

```bash
npm install
npm run dev
```

## Build the static site

```bash
npm run build
```

The production output is written to `docs/` so it can be served directly by GitHub Pages.

## Publish for free with GitHub Pages

1. Open the `manojheritage` repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/docs` folder, then press **Save**.
5. GitHub will provide the live Pages URL after the first deployment finishes.

## Editing contact details and journal articles

All contact details and journal articles live in `src/site-data.js`:

- **Phone / WhatsApp:** `contact.phoneTel`, `contact.phoneDisplay`, `contact.whatsapp` (currently +91 89395 35151).
- **Email:** set `contact.email`. The Contact section, footer and the form's "Send by email" button appear automatically once it is filled in.
- **Social links:** add entries to `contact.social`, for example `{ label: 'Instagram', url: 'https://instagram.com/your-handle' }`.
- **Journal articles:** edit or add items in the `articles` list. Each one gets its own page at `#/journal/<slug>`, and is included in site search.

After any change run `npm run build`, then commit and push to `main`. GitHub Pages updates the live site within a minute or two.

## Features

- Journal index and article pages (`#/journal`, `#/journal/<slug>`).
- Working site search (header magnifier).
- Quote enquiry form that opens a pre-filled WhatsApp message, plus a floating WhatsApp button.

# Heritage Spices — implementation checklist

## Approved homepage experience
- [x] Build a responsive homepage using the Heritage Spices logo and the approved light ivory, greenery, and warm gold visual direction.
- [x] Provide clean, traditional-but-readable typography and uncluttered navigation for international buyers.
- [x] Include hero messaging for premium cardamom from Idukki, Kerala, direct farmer sourcing, and export-ready quality.
- [x] Include buyer actions: Explore our cardamom, Request a quote, Talk to our export team, and Call now.

## Scroll-driven product story
- [x] Implement a single cardamom pod that moves vertically and rotates alongside the user's scroll.
- [x] Reveal a sequential product story covering the whole pod, the opening pod, and inner seeds.
- [x] Keep interaction responsive and provide a reduced-motion alternative.

## Buyer information architecture
- [x] Include Products, Countries/Markets, Journal/Blog, and Contact sections in the first homepage.
- [x] Prepare navigation structure for future standalone Products, Markets, Journal, About, and Contact pages.
- [x] Communicate Idukki, Kerala origin, direct farmer sourcing, quality-led selection, and international buyer relevance without unsupported claims or pricing.
- [x] Include SEO-oriented journal preview content about cardamom origin, quality, sourcing, and export topics.

## Contact and delivery
- [x] Make +91 89395 35151 a clickable tel link.
- [ ] Add the final email address and social media links when supplied by the user (set `contact.email` / `contact.social` in `src/site-data.js`; they appear automatically).
- [x] Working journal pages, site search, WhatsApp enquiry form and floating WhatsApp button.
- [x] Serve the required /manus-routes.json route manifest.
- [x] Configure a production build that outputs static files with index.html.
- [x] Validate the running preview and save the first checkpoint.
- [x] Connect the canonical repository to the user's GitHub after owner confirmation.
- [x] Produce a self-contained static `docs` build with repository-local assets for GitHub Pages-style hosting.
- [ ] Enable GitHub Pages from the repository settings when the user is ready to make the site public.

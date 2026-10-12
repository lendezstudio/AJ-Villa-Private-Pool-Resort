# AJ Villa Private Pool & Resort — Website

A one-page static website for AJ Villa Private Pool & Resort in Calbayog, Samar. Built by [Lendez Studio](https://lendezstudio.com/).
It is plain HTML, CSS and JavaScript with no build step or dependencies, and is ready for GitHub Pages.

## Structure

```
index.html              ← page content (all sections, SEO tags, structured data)
404.html                ← "page not found" page (self-contained)
assets/
  css/styles.css        ← all styling (colours and fonts at the top in :root)
  js/site-data.js       ← ★ EDIT HERE: contact details, WhatsApp messages, gallery photos
  js/main.js            ← behaviour (menu, tour tabs, gallery, lightbox, inquiry form)
  fonts/                ← self-hosted Instrument Serif + Manrope (Google Fonts, OFL licence)
  img/photos/           ← optimised WebP photos, in 2–3 sizes each
  img/icons/            ← favicon + app icons
  img/og-image.jpg      ← social sharing preview (1200×630)
favicon.ico, site.webmanifest, robots.txt, sitemap.xml, .nojekyll
CONTENT-TO-CONFIRM.md   ← details still waiting for the owner
```

`Images from Facebook/`, the strategy PDFs and `_build/` are internal and listed in `.gitignore`, so they are never published.

## Common edits

| Change | Where |
|--------|-------|
| Phone, WhatsApp number, Facebook, map link | `assets/js/site-data.js` → `business`. Also search `index.html` for the old value (it is kept there as a no-JavaScript fallback). |
| Pre-written WhatsApp messages | `assets/js/site-data.js` → `whatsapp` |
| Gallery photos, order, captions, alt text | `assets/js/site-data.js` → `photos` (one line per photo) |
| How many photos show before "See All Photos" | `site-data.js` → `gallery.initialCount` |
| Headlines and body text | `index.html`. Each section is marked with a `=====` comment. |
| "A Closer Look" spaces | `index.html` → TOUR section (one tab + one panel per space) |
| Plan Your Visit details (rates, capacity, rules) | `index.html` → PLAN YOUR VISIT, the `<dl class="details">` list |
| FAQs | `index.html` → FAQS. Copy a `<details class="faq">` block. Unapproved questions are kept in a comment. |
| Colours / fonts | `assets/css/styles.css` → `:root` |

### Adding a photo
1. Export WebP versions named `name-480.webp`, `name-960.webp`, `name-1400.webp` (portrait) or `name-640.webp`, `name-1200.webp`, `name-2000.webp` (landscape) into `assets/img/photos/`.
   With Google's `cwebp`: `cwebp -q 72 -resize 960 0 input.jpg -o name-960.webp`
2. Add a line to `photos` in `site-data.js` with its original pixel size, category and an accurate description.

## Preview locally
Open the folder in VS Code and use **Live Preview** (right-click `index.html` → *Show Preview*), or run any static server from this folder (for example `npx serve` or `python -m http.server`).

## Deploy to GitHub Pages
1. Create a repository and push this folder (the `.gitignore` keeps internal files out).
2. In the repo, go to **Settings → Pages → Deploy from a branch → `main` / root**.
3. For a custom domain: add it under Settings → Pages (this creates a `CNAME` file), point the DNS at GitHub Pages, and turn on **Enforce HTTPS**.
4. Replace `https://ajvilla.example.com/` with the real domain in `index.html` (canonical, Open Graph, Twitter and JSON-LD tags), `robots.txt` and `sitemap.xml`.
5. Test the share preview with the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and submit the sitemap in Google Search Console.

> `404.html` uses root-relative paths (`/assets/...`), which is correct for a custom domain. If the site is served from a `username.github.io/repo/` sub-path instead, the 404 page falls back to system fonts, but its link still works.

## What's included
- Responsive layout tested at phone (360–390px), tablet (768–1024px), laptop and desktop widths
- Mobile menu (focus-managed, Esc to close), sticky mobile inquiry bar, active-section navigation
- Tour of the spaces with accessible tabs (arrow-key support)
- Filterable gallery with full-screen lightbox (keyboard arrows, swipe, Esc)
- Inquiry form that writes a WhatsApp message (no data is stored or sent to a server)
- SEO: title/description, canonical, Open Graph/Twitter cards, `Resort` structured data (verified fields only), sitemap, robots
- Performance: WebP images with `srcset`, lazy loading, preloaded hero and fonts, self-hosted fonts, no frameworks
- Accessibility: semantic landmarks, skip link, alt text for every photo, visible focus states, reduced-motion support

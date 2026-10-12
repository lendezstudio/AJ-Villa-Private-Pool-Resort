# AJ Villa Private Pool & Resort — Details to Confirm with the Owner

Prepared by Lendez Studio · 12 October 2026

The website only publishes information from the business briefing, the approved copy, and what the property photos visibly show. Everything below is **missing or unverified**. Nothing here has been made up and put on the site. Once the owner confirms each item, update the site (see `README.md`) and tick it off.

---

## 1. Must confirm before launch

| # | Item | Current website treatment | Where to update |
|---|------|---------------------------|-----------------|
| 1 | **WhatsApp number** +63 927 394 9163 (`639273949163`). Does it receive WhatsApp messages, and who replies? | Used for every inquiry button and the form | `assets/js/site-data.js` → `business` (+ fallbacks in `index.html`) |
| 2 | **Phone number** for calls (same number?) | Click-to-call links | same as above |
| 3 | **Address**: Cabanas Street, Calbayog, Samar 6710 | Shown as "listed at…" with a note to confirm directions | `index.html` (Find Us, footer, JSON-LD), `site-data.js` |
| 4 | **Exact Google Maps pin** for the entrance | "Open Map Search" uses a general Google Maps search link | `site-data.js` → `mapLink` |
| 5 | **Facebook page** URL (profile.php?id=61580922493500) | Linked in footer and FAQ | `site-data.js` → `facebook` |
| 6 | **Permission to use the photos** from the Facebook page on the website | 38 photos used (see `assets/img/photos/`) | — |
| 7 | **Logo / brand mark**. Is there an official logo? | A simple "AJ" monogram with a water line was made as a placeholder | `assets/img/icons/`, header SVG in `index.html` |
| 8 | **Live domain name** | Placeholder `https://ajvilla.example.com/` in the SEO tags | `index.html` head + JSON-LD, `robots.txt`, `sitemap.xml` |

## 2. Offer, rates and policies (not on the site yet)

The site says *"Rates and availability are available upon inquiry"* until these are approved:

- [ ] Rental options: day use, overnight, or both? Hours and check-in / check-out times
- [ ] Rates (weekday / weekend / holiday), plus any extra-person charges
- [ ] What's included in a reservation
- [ ] Maximum number of guests (day use and overnight)
- [ ] Is the whole property and pool **reserved for one group**? (The site does **not** say "exclusive" or "private to your group")
- [ ] Deposit, payment methods, balance due date
- [ ] Cancellation, rebooking and refund policy
- [ ] House rules (noise / quiet hours, outside food and drinks, corkage, smoking, pets, pool rules, children supervision)
- [ ] How far ahead guests should book

## 3. Amenities seen in photos, but not yet confirmed as available to guests

The photos clearly show the items below. The website describes the **spaces** as they look in the photos and does **not** list them as included amenities. Please confirm which ones guests can use:

- [ ] Pool shade canopy (newer photos), pool lighting at night, poolside tables and chairs
- [ ] Shallow ledge / kids' area in the pool (the site only says "built-in ledge")
- [ ] Air-conditioning (wall units are visible in the bedrooms)
- [ ] Number of bedrooms and the beds in each (photos show double beds, bunk beds and floor mattresses)
- [ ] Number of bathrooms; hot shower (water heaters are visible)
- [ ] Kitchen use: cooktop, range hood, refrigerator, rice cooker / kettle, cookware and utensils
- [ ] Dining areas (indoor table, balcony dining set)
- [ ] TV, sound system / speakers, karaoke (a TV wall with speakers is visible)
- [ ] Wi-Fi
- [ ] Grilling area (one Facebook photo shows fish being grilled, which was **not** used on the site)
- [ ] Parking (a covered carport area is visible in one unused photo)
- [ ] Towels, toiletries, drinking water
- [ ] CCTV / security (a camera is visible on the exterior)
- [ ] Events: birthdays, reunions, team outings? Decorations allowed?

## 4. FAQs waiting for answers

These questions are written but **hidden** in `index.html` (search for "HIDDEN UNTIL OWNER APPROVES"):

- Is the pool reserved for one group?
- Do you offer overnight stays?
- What is included in a reservation?
- What are the deposit and cancellation terms?
- How many guests can the villa accommodate?
- Is parking available? Can we bring outside food? Are children welcome?

## 5. Photos and captions

- [ ] Approve the photo captions in `assets/js/site-data.js` (they describe only what's visible)
- [ ] Is the pool shade canopy permanent? Older photos (no canopy) are still used, including the desktop hero.
- [ ] Two photos with guests in them were left out on purpose (privacy).
- [ ] Nice to have: a daytime wide shot from the gate/entrance, a parking photo, and a photo of the approach road to help guests find the place.

## 6. Optional extras after launch

- [ ] Google Business Profile: link it, and swap in the verified map pin
- [ ] Google Search Console: verify the domain and submit `sitemap.xml`
- [ ] Analytics (privacy-friendly, e.g. Plausible / GA4 with consent) to count WhatsApp clicks, calls and direction taps
- [ ] Instagram / TikTok / email, if they exist
- [ ] Real guest reviews, but only with guest permission (no star-rating markup until then)

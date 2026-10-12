/* ==========================================================================
   AJ VILLA PRIVATE POOL & RESORT — EDITABLE SITE DATA
   --------------------------------------------------------------------------
   This is the main file to edit for future revisions:
     1. BUSINESS   – name, phone/WhatsApp, address, social and map links
     2. WHATSAPP   – the pre-written messages guests send
     3. TOUR       – the "A Closer Look at AJ Villa" spaces
     4. GALLERY    – every photo in the gallery (order = display order)

   Photos live in assets/img/photos/ as  <name>-<width>.webp
   Portrait photos have widths 480 / 960 / 1400, landscape 640 / 1200 / 2000.
   To add a photo: export those sizes with the same naming, then add one line
   to GALLERY below. Only describe what the photo actually shows.

   Contact details also appear as plain-HTML fallbacks in index.html (for
   visitors without JavaScript and for search engines). If the phone number
   or address changes, search index.html for the old value too.
   ========================================================================== */

window.AJV = {
  business: {
    name: "AJ Villa Private Pool & Resort",
    shortName: "AJ Villa",
    phoneDisplay: "+63 927 394 9163",
    phoneHref: "+639273949163",
    whatsappNumber: "639273949163",          // digits only, country code first
    address: {
      street: "Cabanas Street",
      city: "Calbayog",
      province: "Samar",
      postal: "6710",
      country: "Philippines"
    },
    facebook: "https://www.facebook.com/profile.php?id=61580922493500",
    // Replace with the verified Google Maps pin link once confirmed by the owner.
    mapLink: "https://www.google.com/maps/search/?api=1&query=AJ+Villa+Private+Pool+%26+Resort+Calbayog+Samar"
  },

  whatsapp: {
    general:    "Hi AJ Villa! I'd like to ask about availability and rates.",
    question:   "Hi AJ Villa! I have a question about the property.",
    directions: "Hi AJ Villa! Could you share directions to the property on Cabanas Street, Calbayog?",
    // Inquiry form template. {date}, {guests}, {name}, {note} are filled in automatically.
    form: "Hi AJ Villa! I'd like to inquire about {date} for {guests}. Could you share your availability, rates, and inclusions?"
  },

  gallery: {
    // Category keys used by the gallery filter buttons in index.html
    categories: {
      pool: "Pool",
      living: "Living spaces",
      kitchen: "Kitchen & dining",
      rooms: "Bedrooms & baths",
      exterior: "Exterior & balcony"
    },
    // How many photos show under "All" before "See All Photos" is pressed
    initialCount: 12
  },

  /* Each photo: src (name without size), o ("l" landscape / "p" portrait),
     w/h (original pixels, for layout), cat, alt (what is visible), caption. */
  photos: [
    { src: "pool-villa-day",        o: "l", w: 2048, h: 1180, cat: "pool",     alt: "The swimming pool in front of the two-storey villa under a bright blue sky", caption: "The pool and villa on a bright afternoon" },
    { src: "living-double-height",  o: "p", w: 1536, h: 2048, cat: "living",   alt: "Double-height living room with a long sofa, TV wall and a cascading ring pendant light", caption: "The double-height living room" },
    { src: "kitchen-breakfast-bar", o: "p", w: 1536, h: 2048, cat: "kitchen",  alt: "Kitchen with a marble-look breakfast bar and three bar stools", caption: "Kitchen and breakfast bar" },
    { src: "pool-evening",          o: "l", w: 2048, h: 1536, cat: "pool",     alt: "Wall lights reflecting on the pool in the evening under a shade canopy", caption: "The pool as the evening lights come on" },
    { src: "bedroom-double",        o: "p", w: 1536, h: 2048, cat: "rooms",    alt: "Bedroom with a made double bed, white bedding and window blinds", caption: "A bedroom with a double bed" },
    { src: "balcony-dining",        o: "p", w: 1536, h: 2048, cat: "exterior", alt: "Covered balcony with a dining table and chairs overlooking open fields", caption: "The covered balcony and its open view" },
    { src: "pool-from-above",       o: "p", w: 1536, h: 2048, cat: "pool",     alt: "The pool seen from above, with greenery and sky beyond the perimeter wall", caption: "The pool from the upper floor" },
    { src: "villa-dusk",            o: "l", w: 1660, h: 948,  cat: "exterior", alt: "Front of the villa at dusk with warm wall lights, wood-slat cladding and a gated wall", caption: "The villa's frontage at dusk" },
    { src: "lounge-upstairs",       o: "p", w: 1536, h: 2048, cat: "living",   alt: "Lounge with wood-look floors, a sofa, round coffee table and ceiling fan", caption: "The upper-level lounge" },
    { src: "bathroom-shower",       o: "p", w: 1536, h: 2048, cat: "rooms",    alt: "Bathroom with a glass shower enclosure, toilet and backlit mirror cabinet", caption: "Bathroom with glass shower" },
    { src: "pool-canopy-above",     o: "p", w: 1536, h: 2048, cat: "pool",     alt: "The pool under a shade canopy, viewed from above with its built-in ledge", caption: "The pool under its shade canopy" },
    { src: "dining-nook",           o: "p", w: 1536, h: 2048, cat: "kitchen",  alt: "Round dining table with white chairs next to the kitchen bar", caption: "Dining area beside the kitchen" },

    { src: "pool-lengthwise",       o: "p", w: 720,  h: 960,  cat: "pool",     alt: "Looking down the length of the pool beside the villa", caption: "Along the length of the pool" },
    { src: "pool-deck-seating",     o: "p", w: 1536, h: 2048, cat: "pool",     alt: "Poolside table and chairs on the patterned tile deck", caption: "Poolside seating" },
    { src: "pool-night-glow",       o: "p", w: 720,  h: 960,  cat: "pool",     alt: "The pool and villa lit up at night", caption: "The pool at night" },
    { src: "pool-canopy-deck",      o: "p", w: 720,  h: 960,  cat: "pool",     alt: "The pool edge and wood-look deck under the shade canopy", caption: "Pool edge and deck" },
    { src: "pool-canopy-side",      o: "p", w: 1536, h: 2048, cat: "pool",     alt: "Side view of the pool with the shade canopy overhead", caption: "Another angle of the pool" },
    { src: "pool-night",            o: "l", w: 2048, h: 1536, cat: "pool",     alt: "The pool after dark, lit by warm wall lights", caption: "The pool after dark" },
    { src: "villa-facade",          o: "l", w: 2048, h: 1536, cat: "exterior", alt: "Villa exterior with wood-slat and charcoal panel cladding", caption: "The villa's exterior" },
    { src: "living-ring-light",     o: "p", w: 1536, h: 2048, cat: "living",   alt: "Ring pendant light hanging in the double-height living room", caption: "The living room's ring pendant light" },
    { src: "living-tv-wall",        o: "p", w: 1536, h: 2048, cat: "living",   alt: "Living room with a long sofa facing a TV wall, beside tall windows", caption: "Living room seating" },
    { src: "living-from-above",     o: "p", w: 1536, h: 2048, cat: "living",   alt: "The living room seen from the upper level, with the pool visible through the window", caption: "The living room from above" },
    { src: "living-media-wall",     o: "l", w: 2048, h: 1536, cat: "living",   alt: "Wall-mounted TV with speakers on a wood-accented media wall", caption: "The living room media wall" },
    { src: "kitchen-open-plan",     o: "p", w: 1536, h: 2048, cat: "kitchen",  alt: "Open-plan kitchen and hallway with marble-look floors leading to the staircase", caption: "Open-plan kitchen" },
    { src: "kitchen-island",        o: "p", w: 1536, h: 2048, cat: "kitchen",  alt: "Kitchen counter with bar stools and a linear pendant light", caption: "Kitchen counter" },
    { src: "dining-table",          o: "p", w: 1536, h: 2048, cat: "kitchen",  alt: "Round dining table with chairs beyond the marble-look kitchen counter", caption: "Dining area" },
    { src: "kitchen-cooktop",       o: "p", w: 1536, h: 2048, cat: "kitchen",  alt: "Kitchen counter with a cooktop, range hood and white cabinets", caption: "Kitchen counter and cooktop" },
    { src: "lounge-sofa",           o: "p", w: 1536, h: 2048, cat: "living",   alt: "Grey sofa bed and round coffee table beneath a ring pendant light", caption: "Lounge seating" },
    { src: "lounge-hallway",        o: "p", w: 1536, h: 2048, cat: "living",   alt: "Hallway with wood-look floors and wooden bedroom doors", caption: "Upper-level hallway" },
    { src: "staircase-lit",         o: "p", w: 1536, h: 2048, cat: "living",   alt: "Staircase with lit steps and a glass railing", caption: "The lit staircase" },
    { src: "staircase-glass",       o: "p", w: 1536, h: 2048, cat: "living",   alt: "Looking down the staircase with glass railing and step lighting", caption: "Staircase, looking down" },
    { src: "balcony-corridor",      o: "p", w: 1604, h: 2048, cat: "exterior", alt: "Covered balcony with wood-panel wall, recessed ceiling and dining set", caption: "Along the covered balcony" },
    { src: "balcony-pool-view",     o: "p", w: 1536, h: 2048, cat: "exterior", alt: "Balcony with a railing looking down to the pool", caption: "Looking down to the pool" },
    { src: "bunk-room",             o: "p", w: 1536, h: 2048, cat: "rooms",    alt: "Bedroom with a bunk bed and a floor mattress", caption: "A bedroom with bunk beds" },
    { src: "bunk-room-two",         o: "p", w: 1536, h: 2048, cat: "rooms",    alt: "Bedroom with a black metal bunk bed and a mattress on the floor", caption: "Another bunk bed room" },
    { src: "bedroom-ensuite",       o: "p", w: 1536, h: 2048, cat: "rooms",    alt: "Bedroom with a double bed and an open door to a bathroom", caption: "Bedroom with a bathroom beside it" },
    { src: "bathroom-vanity",       o: "p", w: 1536, h: 2048, cat: "rooms",    alt: "Bathroom with a shower enclosure, toilet and dark vanity cabinet", caption: "Bathroom and vanity" },
    { src: "bathroom-mirror",       o: "p", w: 1536, h: 2048, cat: "rooms",    alt: "Bathroom with a backlit mirror cabinet, small sink and toilet", caption: "Bathroom with backlit mirror" }
  ]
};

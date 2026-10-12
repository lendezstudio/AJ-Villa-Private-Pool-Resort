/* AJ Villa Private Pool & Resort — site behaviour.
   Content and contact details live in site-data.js; this file only wires things up. */
(function () {
  "use strict";

  var DATA = window.AJV || {};
  var BIZ = DATA.business || {};
  var WA = DATA.whatsapp || {};
  var PHOTO_DIR = "assets/img/photos/";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Contact links from site-data.js ---------- */
  function waLink(message) {
    return "https://wa.me/" + BIZ.whatsappNumber + (message ? "?text=" + encodeURIComponent(message) : "");
  }

  function bindContacts() {
    if (BIZ.whatsappNumber) {
      $$("[data-wa]").forEach(function (a) {
        var key = a.getAttribute("data-wa");
        a.href = waLink(WA[key] || WA.general);
      });
    }
    if (BIZ.phoneHref) $$("[data-tel]").forEach(function (a) { a.href = "tel:" + BIZ.phoneHref; });
    $$("[data-bind]").forEach(function (el) {
      var v = BIZ[el.getAttribute("data-bind")];
      if (v) el.textContent = v;
    });
    $$("[data-bind-href]").forEach(function (a) {
      var v = BIZ[a.getAttribute("data-bind-href")];
      if (v) a.href = v;
    });
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- Header ---------- */
  function initHeader() {
    var header = $("[data-header]");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 12); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    var toggle = $("[data-menu-toggle]");
    var menu = $("[data-menu]");
    if (!toggle || !menu) return;
    var label = $(".visually-hidden", toggle);
    var main = $("#main");
    var footer = $(".site-footer");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      if (label) label.textContent = open ? "Close menu" : "Open menu";
      menu.hidden = !open;
      document.documentElement.classList.toggle("menu-open", open);
      document.body.classList.toggle("menu-open", open);
      [main, footer].forEach(function (el) { if (el) el.inert = open; });
      if (open) {
        var first = $("a", menu);
        if (first) first.focus();
      }
    }

    toggle.addEventListener("click", function () { setOpen(menu.hidden); });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia("(min-width: 1080px)").addEventListener("change", function (mq) {
      if (mq.matches && !menu.hidden) setOpen(false);
    });
  }

  /* ---------- Active nav link ---------- */
  function initActiveNav() {
    var links = $$(".site-nav a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var sections = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute("aria-current"); });
        var link = map[entry.target.id];
        if (link) link.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- Tour tabs ---------- */
  function initTour() {
    var root = $("[data-tour]");
    if (!root) return;
    var tabs = $$("[role='tab']", root);
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute("aria-controls")); });

    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        panels[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
      // keep the active chip visible in the horizontal scroller (mobile)
      var list = tabs[i].parentElement;
      if (list.scrollWidth > list.clientWidth) {
        list.scrollTo({ left: tabs[i].offsetLeft - 16, behavior: reduceMotion ? "auto" : "smooth" });
      }
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(i, false); });
      tab.addEventListener("keydown", function (e) {
        var n = tabs.length, next = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = n - 1;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    });
    select(0, false);
  }

  /* ---------- Photo helpers ---------- */
  function sizesFor(p) { return p.o === "l" ? [640, 1200, 2000] : [480, 960, 1400]; }
  function srcset(p) {
    var max = p.w;
    var seen = {};
    return sizesFor(p).map(function (s) { return Math.min(s, max); })
      .filter(function (s) { if (seen[s]) return false; seen[s] = 1; return true; })
      .map(function (s) { return PHOTO_DIR + p.src + "-" + s + ".webp " + s + "w"; }).join(", ");
  }
  function srcAt(p, want) {
    var list = sizesFor(p).map(function (s) { return Math.min(s, p.w); });
    for (var i = 0; i < list.length; i++) if (list[i] >= want) return PHOTO_DIR + p.src + "-" + list[i] + ".webp";
    return PHOTO_DIR + p.src + "-" + list[list.length - 1] + ".webp";
  }

  /* ---------- Lightbox ---------- */
  var lightbox = (function () {
    var dlg = $("[data-lightbox]");
    if (!dlg || typeof dlg.showModal !== "function") return null;
    var img = $("[data-lb-img]", dlg);
    var cap = $("[data-lb-caption]", dlg);
    var count = $("[data-lb-count]", dlg);
    var stage = $("[data-lb-stage]", dlg);
    var list = [], index = 0;

    function bestWidth() {
      var w = Math.min(window.innerWidth, 1800) * Math.min(window.devicePixelRatio || 1, 2);
      return w;
    }

    function show(i) {
      index = (i + list.length) % list.length;
      var p = list[index];
      img.classList.add("is-loading");
      var src = srcAt(p, p.o === "l" ? bestWidth() : bestWidth() * 0.75);
      var pre = new Image();
      pre.onload = pre.onerror = function () {
        if (list[index] !== p) return;
        img.src = src;
        img.alt = p.alt;
        img.width = p.w; img.height = p.h;
        img.classList.remove("is-loading");
      };
      pre.src = src;
      cap.textContent = p.caption || p.alt;
      count.textContent = (index + 1) + " / " + list.length;
      // preload neighbours
      [index + 1, index - 1].forEach(function (k) {
        var q = list[(k + list.length) % list.length];
        if (q) { var x = new Image(); x.src = srcAt(q, q.o === "l" ? bestWidth() : bestWidth() * 0.75); }
      });
    }

    function open(photos, start) {
      list = photos; if (!list.length) return;
      show(start || 0);
      dlg.showModal();
      document.body.style.overflow = "hidden";
    }

    dlg.addEventListener("close", function () {
      document.body.style.overflow = "";
      img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    });
    $("[data-lb-close]", dlg).addEventListener("click", function () { dlg.close(); });
    $("[data-lb-prev]", dlg).addEventListener("click", function () { show(index - 1); });
    $("[data-lb-next]", dlg).addEventListener("click", function () { show(index + 1); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1); }
    });
    // click on the empty stage (not the photo) closes
    stage.addEventListener("click", function (e) { if (e.target === stage) dlg.close(); });

    // swipe
    var startX = null, startY = null;
    stage.addEventListener("pointerdown", function (e) { startX = e.clientX; startY = e.clientY; });
    stage.addEventListener("pointerup", function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      startX = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1));
    });

    return { open: open };
  })();

  /* ---------- Gallery ---------- */
  function initGallery() {
    var grid = $("[data-gallery-grid]");
    if (!grid) return;
    var photos = DATA.photos || [];
    var cats = (DATA.gallery && DATA.gallery.categories) || {};
    var initial = (DATA.gallery && DATA.gallery.initialCount) || 12;
    var moreBtn = $("[data-gallery-more]");
    var moreCount = $("[data-gallery-count]");
    var filterBtns = $$("[data-filter]");
    var current = "all", expanded = false;

    var frag = document.createDocumentFragment();
    var items = photos.map(function (p, i) {
      var li = document.createElement("li");
      li.className = "gallery__item";
      li.dataset.cat = p.cat;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gallery__btn";
      btn.setAttribute("aria-label", "View larger: " + (p.caption || p.alt) + (cats[p.cat] ? " (" + cats[p.cat] + ")" : ""));
      var im = document.createElement("img");
      im.src = srcAt(p, 480);
      im.srcset = srcset(p);
      im.sizes = "(min-width: 700px) min(25vw, 340px), 50vw";
      im.width = p.w; im.height = p.h;
      im.loading = i < 4 ? "eager" : "lazy";
      im.decoding = "async";
      im.alt = p.alt;
      var cap = document.createElement("span");
      cap.className = "gallery__cap";
      cap.setAttribute("aria-hidden", "true");
      cap.textContent = p.caption || "";
      btn.appendChild(im); btn.appendChild(cap); li.appendChild(btn);
      btn.addEventListener("click", function () {
        var visible = visiblePhotos();
        lightbox && lightbox.open(visible, visible.indexOf(p));
      });
      frag.appendChild(li);
      return li;
    });
    grid.appendChild(frag);

    function matches(p) { return current === "all" || p.cat === current; }
    function visiblePhotos() {
      return photos.filter(function (p, i) { return !items[i].hidden; });
    }

    // Photo counts next to each filter label
    filterBtns.forEach(function (b) {
      var f = b.getAttribute("data-filter");
      var n = f === "all" ? photos.length : photos.filter(function (p) { return p.cat === f; }).length;
      var sup = document.createElement("sup");
      sup.textContent = n;
      sup.setAttribute("aria-label", n + " photos");
      b.appendChild(sup);
    });

    /* Editorial tile layout. Visible photos are laid out in "blocks" that
       each fill complete rows, so the grid never ends with gaps.
       Desktop (4 columns, 2 rows per block) and phone (2 columns) differ. */
    var desktopMQ = window.matchMedia("(min-width: 700px)");
    var DESKTOP_BLOCKS = [
      ["g-big", "g-tall", "g-tall"],
      ["g-tall", "", "", "g-tall", "", ""],
      ["g-tall", "g-tall", "g-big"],
      ["", "", "g-big", "", ""],
      ["g-tall", "g-tall", "g-tall", "g-tall"]
    ];
    var PHONE_BLOCKS = [["g-big"], ["g-tall", "", ""], ["g-big"], ["", "g-tall", ""], ["", ""]];

    function layoutClasses(n) {
      var blocks = desktopMQ.matches ? DESKTOP_BLOCKS : PHONE_BLOCKS;
      var out = [], b = 0, left = n;
      if (desktopMQ.matches && n < 3) { while (out.length < n) out.push("g-big"); return out; }
      while (left > 0) {
        var pick = null;
        for (var k = 0; k < blocks.length; k++) {
          var cand = blocks[(b + k) % blocks.length];
          var rest = left - cand.length;
          if (rest === 0 || (rest > 0 && (!desktopMQ.matches || rest > 2))) { pick = cand; b = (b + k + 1) % blocks.length; break; }
        }
        if (!pick) pick = blocks[0].slice(0, left);
        out = out.concat(pick);
        left -= pick.length;
      }
      return out;
    }

    function applyLayout() {
      var visible = items.filter(function (li) { return !li.hidden; });
      var classes = layoutClasses(visible.length);
      visible.forEach(function (li, k) {
        li.classList.remove("g-big", "g-tall");
        if (classes[k]) li.classList.add(classes[k]);
        var im = li.querySelector("img");
        im.sizes = classes[k] === "g-big"
          ? "(min-width: 700px) min(50vw, 680px), 100vw"
          : "(min-width: 700px) min(25vw, 340px), 50vw";
      });
    }
    desktopMQ.addEventListener("change", applyLayout);

    function render(animate) {
      var shown = 0;
      photos.forEach(function (p, i) {
        var show = matches(p) && (current !== "all" || expanded || shown < initial);
        if (show) shown++;
        var wasHidden = items[i].hidden;
        items[i].hidden = !show;
        items[i].classList.toggle("is-new", Boolean(animate && show && wasHidden));
      });
      applyLayout();
      var remaining = current === "all" && !expanded ? photos.length - initial : 0;
      if (moreBtn) {
        moreBtn.hidden = remaining <= 0;
        if (moreCount) moreCount.textContent = "(" + photos.length + ")";
      }
    }

    filterBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        current = b.getAttribute("data-filter");
        filterBtns.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        render(true);
      });
    });
    if (moreBtn) moreBtn.addEventListener("click", function () {
      expanded = true; render(true);
      // move focus to the first newly revealed photo
      var next = items[initial] && $("button", items[initial]);
      if (next) next.focus({ preventScroll: true });
    });

    // "View … photos" buttons in the tour open the lightbox on that category
    $$("[data-open-gallery]").forEach(function (b) {
      b.addEventListener("click", function () {
        var cat = b.getAttribute("data-open-gallery");
        lightbox && lightbox.open(photos.filter(function (p) { return p.cat === cat; }), 0);
      });
    });

    render(false);
  }

  /* ---------- Inquiry form → WhatsApp ---------- */
  function initInquiry() {
    var form = $("[data-inquiry]");
    if (!form) return;
    var name = form.elements.name, date = form.elements.date, guests = form.elements.guests;
    var flexible = form.elements.flexible, note = form.elements.note;
    var success = $("[data-inquiry-success]", form);

    // earliest selectable date = today (local time)
    var t = new Date();
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    date.min = t.getFullYear() + "-" + pad(t.getMonth() + 1) + "-" + pad(t.getDate());

    flexible.addEventListener("change", function () {
      date.required = !flexible.checked;
      if (flexible.checked) setError(date, false);
    });

    function setError(input, show) {
      var err = document.getElementById(input.id + "-err");
      input.setAttribute("aria-invalid", show ? "true" : "false");
      if (err) {
        err.hidden = !show;
        if (show) input.setAttribute("aria-describedby", err.id); else input.removeAttribute("aria-describedby");
      }
    }
    [name, date, guests].forEach(function (input) {
      input.addEventListener("input", function () { if (input.getAttribute("aria-invalid") === "true") setError(input, false); });
    });

    function formatDate(value) {
      var parts = value.split("-");
      var d = new Date(+parts[0], +parts[1] - 1, +parts[2]);
      try {
        return d.toLocaleDateString("en-PH", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      } catch (e) { return value; }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var guestCount = parseInt(guests.value, 10);
      var checks = [
        [name, name.value.trim().length > 0],
        [date, flexible.checked || (date.value && date.value >= date.min)],
        [guests, guestCount > 0]
      ];
      var firstBad = null;
      checks.forEach(function (c) {
        setError(c[0], !c[1]);
        if (!c[1] && !firstBad) firstBad = c[0];
      });
      if (firstBad) { firstBad.focus(); return; }

      var when = date.value ? formatDate(date.value) : "flexible dates";
      if (flexible.checked && date.value) when += " (my dates are flexible)";
      var who = guestCount + (guestCount === 1 ? " guest" : " guests");
      var msg = (WA.form || "Hi AJ Villa! I'd like to inquire about {date} for {guests}.")
        .replace("{date}", when).replace("{guests}", who);
      msg += "\n\nName: " + name.value.trim();
      if (note.value.trim()) msg += "\nNote: " + note.value.trim();

      var url = waLink(msg);
      var win = window.open(url, "_blank");
      if (win) win.opener = null; else window.location.href = url;
      if (success) success.hidden = false;
    });
  }

  /* ---------- Sticky mobile CTA ---------- */
  function initSticky() {
    var bar = $("[data-sticky-cta]");
    var hero = $(".hero");
    var hideZones = [$("#plan"), $("#inquire"), $(".site-footer")].filter(Boolean);
    if (!bar || !hero) return;
    var links = $$("a", bar), shown = null;
    // Show once the hero is mostly scrolled past; hide while the inquiry
    // form, final CTA or footer (which have their own buttons) are on screen.
    function update() {
      var vh = window.innerHeight;
      var show = hero.getBoundingClientRect().bottom < vh * 0.4 && !hideZones.some(function (z) {
        var r = z.getBoundingClientRect();
        return r.top < vh * 0.85 && r.bottom > vh * 0.15;
      });
      if (show === shown) return;
      shown = show;
      bar.classList.toggle("is-visible", show);
      bar.setAttribute("aria-hidden", String(!show));
      links.forEach(function (a) { a.tabIndex = show ? 0 : -1; });
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("load", update);
    update();
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var pending = els.slice();
    function show(el) {
      el.classList.add("is-in");
      io.unobserve(el);
      pending.splice(pending.indexOf(el), 1);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting && pending.indexOf(en.target) > -1) show(en.target); });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });

    // Belt and braces: also check on scroll/load so content can never stay
    // hidden (e.g. after jumping to an #anchor, or in throttled frames).
    function check() {
      var vh = window.innerHeight;
      pending.slice().forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) show(el);
      });
      if (!pending.length) {
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    }
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    window.addEventListener("load", check);
    window.addEventListener("hashchange", check);
  }

  bindContacts();
  initHeader();
  initMenu();
  initActiveNav();
  initTour();
  initGallery();
  initInquiry();
  initSticky();
  initReveal();
})();

/* 409 New Lido Drive — site behavior (no dependencies). Photos live in js/photos.js. */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("js");

  /* ---------- Navigation ---------- */
  var nav = doc.getElementById("nav");
  var toggle = doc.getElementById("nav-toggle");
  var links = doc.getElementById("nav-links");

  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    doc.body.classList.toggle("no-scroll", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("is-open"));
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) setMenu(false);
  });

  var navAnchors = Array.prototype.slice.call(links.querySelectorAll('a[href^="#"]'));
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        navAnchors.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    doc.querySelectorAll("main section[id]").forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Hero photo ---------- */
  if (typeof HERO_PHOTO === "string" && HERO_PHOTO) {
    var hero = doc.querySelector(".hero");
    var heroPhoto = doc.getElementById("hero-photo");
    var probe = new Image();
    probe.onload = function () {
      heroPhoto.style.backgroundImage = 'url("' + HERO_PHOTO + '")';
      hero.classList.add("has-photo");
    };
    probe.src = HERO_PHOTO;
  }

  /* ---------- Gallery ---------- */
  var photos = (typeof GALLERY !== "undefined" && Array.isArray(GALLERY)) ? GALLERY : [];
  var groups = (typeof GALLERY_GROUPS !== "undefined" && Array.isArray(GALLERY_GROUPS))
    ? GALLERY_GROUPS
    : [{ id: "all", label: "All" }];
  var grid = doc.getElementById("gallery-grid");
  var filtersEl = doc.getElementById("gallery-filters");
  var tones = ["tone-a", "tone-b", "tone-c", "tone-d"];
  var placeholderIcon =
    '<svg class="tile__icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5"/>' +
    '<circle cx="8.5" cy="10" r="1.6"/><path d="m21 15.5-5-5-8.5 8.5"/></svg>';
  var activeGroup = "all";
  var visible = photos.map(function (_, i) { return i; });

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function buildFilters() {
    if (!filtersEl) return;
    filtersEl.innerHTML = "";
    groups.forEach(function (g) {
      var btn = doc.createElement("button");
      btn.type = "button";
      btn.className = "filter" + (g.id === activeGroup ? " is-active" : "");
      btn.textContent = g.label;
      btn.dataset.group = g.id;
      btn.setAttribute("aria-pressed", String(g.id === activeGroup));
      filtersEl.appendChild(btn);
    });
  }

  function buildGrid() {
    grid.innerHTML = "";
    visible = [];
    photos.forEach(function (p, i) {
      if (activeGroup !== "all" && p.group !== activeGroup) return;
      visible.push(i);
      var btn = doc.createElement("button");
      btn.type = "button";
      btn.className = "tile reveal is-visible" + (p.size ? " tile--" + p.size : "") + (p.src ? " tile--photo" : " tile--placeholder " + tones[i % tones.length]);
      btn.setAttribute("aria-label", "View " + (p.caption || "photo"));
      btn.dataset.index = i;
      if (p.src) {
        var thumb = p.thumb || p.src;
        btn.innerHTML =
          '<img src="' + esc(thumb) + '" ' +
          'srcset="' + esc(thumb) + ' 800w, ' + esc(p.src) + ' 2400w" ' +
          'sizes="(max-width: 600px) 50vw, (max-width: 900px) 50vw, 25vw" ' +
          'alt="' + esc(p.alt || p.caption || "") + '" loading="lazy" decoding="async">' +
          '<span class="tile__label">' + esc(p.caption || "") + "</span>";
      } else {
        btn.innerHTML = '<span class="tile__inner">' + placeholderIcon +
          '<span class="tile__caption">' + esc(p.caption || "Photo") + "</span>" +
          '<span class="tile__soon">Photo coming soon</span></span>';
      }
      grid.appendChild(btn);
    });
  }

  if (filtersEl) {
    buildFilters();
    filtersEl.addEventListener("click", function (e) {
      var b = e.target.closest(".filter");
      if (!b) return;
      activeGroup = b.dataset.group;
      Array.prototype.forEach.call(filtersEl.children, function (c) {
        var on = c === b;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      buildGrid();
    });
  }
  buildGrid();

  /* ---------- Lightbox ---------- */
  var lb = doc.getElementById("lightbox");
  var stage = doc.getElementById("lightbox-stage");
  var caption = doc.getElementById("lightbox-caption");
  var count = doc.getElementById("lightbox-count");
  var current = 0; // index into photos[]
  var lastFocus = null;

  function visiblePos(i) {
    var p = visible.indexOf(i);
    return p < 0 ? 0 : p;
  }

  function render() {
    var p = photos[current];
    if (p.src) {
      var thumb = p.thumb || p.src;
      stage.innerHTML =
        '<img src="' + esc(p.src) + '" ' +
        'srcset="' + esc(thumb) + ' 800w, ' + esc(p.src) + ' 2400w" ' +
        'sizes="(max-width: 900px) 100vw, 1200px" ' +
        'alt="' + esc(p.alt || p.caption || "") + '">';
    } else {
      stage.innerHTML = '<div class="lightbox__placeholder ' + tones[current % tones.length] + '">' + placeholderIcon +
        '<span class="tile__caption">' + esc(p.caption || "Photo") + '</span><span class="tile__soon">Photo coming soon</span></div>';
    }
    caption.textContent = p.caption || "";
    count.textContent = (visiblePos(current) + 1) + " / " + visible.length;
  }
  function open(i) {
    current = i;
    lastFocus = doc.activeElement;
    render();
    lb.hidden = false;
    requestAnimationFrame(function () { lb.classList.add("is-open"); });
    doc.body.classList.add("no-scroll");
    lb.querySelector(".lightbox__close").focus();
  }
  function close() {
    lb.classList.remove("is-open");
    doc.body.classList.remove("no-scroll");
    setTimeout(function () { lb.hidden = true; }, reduceMotion ? 0 : 300);
    if (lastFocus) lastFocus.focus();
  }
  function step(d) {
    if (!visible.length) return;
    var pos = visiblePos(current);
    pos = (pos + d + visible.length) % visible.length;
    current = visible[pos];
    render();
  }

  grid.addEventListener("click", function (e) {
    var t = e.target.closest(".tile");
    if (t) open(Number(t.dataset.index));
  });
  lb.querySelector(".lightbox__close").addEventListener("click", close);
  lb.querySelector(".lightbox__nav--prev").addEventListener("click", function () { step(-1); });
  lb.querySelector(".lightbox__nav--next").addEventListener("click", function () { step(1); });
  lb.addEventListener("click", function (e) {
    if (e.target === lb || e.target.classList.contains("lightbox__figure")) close();
  });
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) setMenu(false);
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "Tab") {
      var f = lb.querySelectorAll("button");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var x0 = null;
  lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
    x0 = null;
  });

  /* ---------- Reveal-on-scroll ---------- */
  var revealEls = doc.querySelectorAll(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  var y = doc.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  requestAnimationFrame(function () { root.classList.add("is-loaded"); });
})();

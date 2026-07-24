/* ==========================================================
   READY STEADY GROW — repre (Elba)
   Interakcje: GSAP + ScrollTrigger (z fallbackiem)
   ========================================================== */
(function () {
  "use strict";

  var hasGsap = typeof window.gsap !== "undefined";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  if (!hasGsap || reduced) document.documentElement.classList.add("no-anim");
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ---------- bramka 18+ ---------- */
  var gate = document.getElementById("agegate");
  var gateOk = false;
  try { gateOk = sessionStorage.getItem("rsg_age_ok") === "1"; } catch (e) {}
  if (gate) {
    if (gateOk) { gate.hidden = true; }
    else { document.body.classList.add("lock"); }
    var yes = document.getElementById("age-yes");
    var no = document.getElementById("age-no");
    if (yes) yes.addEventListener("click", function () {
      try { sessionStorage.setItem("rsg_age_ok", "1"); } catch (e) {}
      if (hasGsap && !reduced) {
        gsap.to(gate, { autoAlpha: 0, duration: .6, ease: "power2.inOut", onComplete: function () { gate.hidden = true; } });
      } else { gate.hidden = true; }
      document.body.classList.remove("lock");
    });
    if (no) no.addEventListener("click", function () { window.location.href = "https://www.google.com"; });
  }

  /* ---------- preloader ---------- */
  var loader = document.getElementById("loader");
  function heroIntro() {
    if (!hasGsap || reduced) return;
    var lines = document.querySelectorAll(".hero__title .ln > span, .hero-cine__title .ln > span");
    var tl = gsap.timeline();
    if (document.querySelector(".hero-cine__bg img")) {
      tl.fromTo(".hero-cine__bg img", { scale: 1.3, opacity: .25 }, { scale: 1.12, opacity: 1, duration: 1.9, ease: "power3.out" }, 0);
    }
    if (lines.length) {
      tl.fromTo(lines, { yPercent: 120 }, { yPercent: 0, duration: 1.15, stagger: .12, ease: "power4.out" }, .1);
    }
    tl.fromTo(".hero__kicker", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .8, ease: "power2.out" }, .2)
      .fromTo(".hero__sub, .hero-cine__sub", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .9, ease: "power2.out" }, .55)
      .fromTo(".hero__cta, .hero-cine__cta", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .9, ease: "power2.out" }, .7)
      .fromTo(".hero__meta, .hero-cine__meta", { opacity: 0 }, { opacity: 1, duration: .9, ease: "power2.out" }, .85)
      .fromTo(".hero__reticle", { opacity: 0, scale: .8, rotation: -25 }, { opacity: .5, scale: 1, rotation: 0, duration: 1.6, ease: "power3.out" }, .3);
  }
  if (loader) {
    if (hasGsap && !reduced) {
      document.body.classList.add("lock");
      var count = { v: 0 };
      var num = loader.querySelector(".loader__count");
      var tl = gsap.timeline({
        onComplete: function () {
          if (!gate || gate.hidden) document.body.classList.remove("lock");
          loader.style.display = "none";
          heroIntro();
        }
      });
      tl.to(loader.querySelectorAll(".loader__brand span"), { y: 0, duration: .9, stagger: .08, ease: "power4.out" }, 0)
        .to(loader.querySelector(".loader__bar i"), { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, .2)
        .to(count, { v: 100, duration: 1.5, ease: "power2.inOut", onUpdate: function () { if (num) num.textContent = String(Math.round(count.v)).padStart(3, "0"); } }, .2)
        .to(loader.querySelector(".loader__inner"), { opacity: 0, y: -24, duration: .5, ease: "power2.in" }, "+=.15")
        .to(loader, { clipPath: "inset(0 0 100% 0)", duration: .8, ease: "power4.inOut" }, "-=.1");
    } else {
      loader.style.display = "none";
      if (!gate || gate.hidden) document.body.classList.remove("lock");
    }
  } else {
    heroIntro();
  }

  /* ---------- custom cursor ---------- */
  if (!touch) {
    var cur = document.createElement("div"); cur.className = "cursor";
    var curF = document.createElement("div"); curF.className = "cursor-f";
    document.body.appendChild(cur); document.body.appendChild(curF);
    var cx = -100, cy = -100, fx = -100, fy = -100;
    document.addEventListener("mousemove", function (e) { cx = e.clientX; cy = e.clientY; });
    (function loop() {
      fx += (cx - fx) * .16; fy += (cy - fy) * .16;
      cur.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
      curF.style.transform = "translate(" + fx + "px," + fy + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("a, button, .gal-item").forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        curF.classList.add(el.hasAttribute("data-cursor-view") || el.classList.contains("gal-item") ? "is-view" : "is-link");
        if (curF.classList.contains("is-view")) curF.textContent = "zobacz";
      });
      el.addEventListener("mouseleave", function () { curF.classList.remove("is-view", "is-link"); curF.textContent = ""; });
    });
  }

  /* ---------- menu overlay ---------- */
  var menuBtn = document.getElementById("menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      menuBtn.querySelector(".txt").textContent = open ? "Zamknij" : "Menu";
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".menu__list a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
        menuBtn.querySelector(".txt").textContent = "Menu";
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- chowany header ---------- */
  var head = document.querySelector(".site-head");
  if (head) {
    var lastY = 0;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      head.classList.toggle("is-solid", y > 40);
      if (!document.body.classList.contains("menu-open")) {
        head.classList.toggle("is-hidden", y > lastY && y > 320);
      }
      lastY = y;
    }, { passive: true });
  }

  /* ---------- rok ---------- */
  var yEl = document.getElementById("year");
  if (yEl) yEl.textContent = new Date().getFullYear();

  /* ---------- pasek postępu scrolla (na każdej stronie) ---------- */
  var pbar = document.createElement("div"); pbar.className = "progress-bar";
  document.body.appendChild(pbar);
  function updatePbar() {
    var h = document.documentElement, s = h.scrollHeight - h.clientHeight;
    pbar.style.transform = "scaleX(" + (s > 0 ? Math.min(1, window.scrollY / s) : 0) + ")";
  }
  window.addEventListener("scroll", updatePbar, { passive: true });
  window.addEventListener("resize", updatePbar, { passive: true });
  updatePbar();

  /* ---------- prosty formularz (mailto) ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var mail = form.getAttribute("data-mail") || "";
      var name = (form.querySelector("[name=name]") || {}).value || "";
      var topic = (form.querySelector("[name=topic]") || {}).value || "";
      var msg = (form.querySelector("[name=message]") || {}).value || "";
      var from = (form.querySelector("[name=email]") || {}).value || "";
      var subject = encodeURIComponent("RSG — zapytanie: " + topic + " (" + name + ")");
      var body = encodeURIComponent(msg + "\n\n— " + name + "\nKontakt: " + from);
      window.location.href = "mailto:" + mail + "?subject=" + subject + "&body=" + body;
    });
  }

  /* ---------- lightbox ---------- */
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var lbCount = lb.querySelector(".lightbox__count");
    var items = Array.prototype.slice.call(document.querySelectorAll(".gal-item[data-full]"));
    var curI = 0;
    function lbShow(i) {
      curI = (i + items.length) % items.length;
      var it = items[curI];
      lbImg.src = it.getAttribute("data-full");
      var im = it.querySelector("img"); lbImg.alt = im ? im.alt : "";
      if (lbCount) lbCount.textContent = (curI + 1) + " / " + items.length;
    }
    items.forEach(function (a, i) {
      a.addEventListener("click", function (e) { e.preventDefault(); lbShow(i); lb.classList.add("open"); });
    });
    var prev = lb.querySelector(".lightbox__prev");
    var next = lb.querySelector(".lightbox__next");
    if (prev) prev.addEventListener("click", function (e) { e.stopPropagation(); lbShow(curI - 1); });
    if (next) next.addEventListener("click", function (e) { e.stopPropagation(); lbShow(curI + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lightbox__close")) lb.classList.remove("open"); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") lb.classList.remove("open");
      if (e.key === "ArrowLeft") lbShow(curI - 1);
      if (e.key === "ArrowRight") lbShow(curI + 1);
    });
  }

  if (!hasGsap || reduced) return; /* dalej tylko animacje scrollowe */

  /* ---------- marquee ---------- */
  document.querySelectorAll(".marquee__track").forEach(function (track) {
    var half = track.scrollWidth / 2;
    gsap.to(track, { x: -half, duration: 24, ease: "none", repeat: -1 });
  });

  /* ---------- reveal: linie i bloki ---------- */
  document.querySelectorAll(".rline > .rline-in").forEach(function (el) {
    gsap.to(el, { y: 0, yPercent: 0, duration: 1.1, ease: "power4.out", scrollTrigger: { trigger: el.closest(".rline"), start: "top 90%" } });
  });
  gsap.utils.toArray("[data-reveal]").forEach(function (el) {
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: (parseFloat(el.getAttribute("data-reveal")) || 0), scrollTrigger: { trigger: el, start: "top 90%" } });
  });

  /* ---------- hero: parallax reticle + wyjście ---------- */
  var reticle = document.querySelector(".hero__reticle");
  if (reticle) {
    gsap.to(reticle, { rotation: 60, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    if (!touch) {
      var hero = document.querySelector(".hero");
      hero.addEventListener("mousemove", function (e) {
        var r = hero.getBoundingClientRect();
        var nx = (e.clientX - r.left) / r.width - .5;
        var ny = (e.clientY - r.top) / r.height - .5;
        gsap.to(reticle, { x: nx * 26, y: ny * 20, duration: 1.1, ease: "power2.out" });
        gsap.to(".hero__title", { x: nx * -10, y: ny * -6, duration: 1.2, ease: "power2.out" });
      });
    }
  }

  /* ---------- hero kinowy: parallax tła + scope za kursorem ---------- */
  var heroCine = document.querySelector(".hero-cine");
  if (heroCine) {
    var hcBg = heroCine.querySelector(".hero-cine__bg img");
    if (hcBg) gsap.to(hcBg, { yPercent: 12, ease: "none", scrollTrigger: { trigger: heroCine, start: "top top", end: "bottom top", scrub: true } });
    gsap.to(heroCine.querySelector(".hero-cine__inner"), { yPercent: -6, opacity: .25, ease: "none", scrollTrigger: { trigger: heroCine, start: "top top", end: "bottom top", scrub: true } });
    var scan = heroCine.querySelector(".hero-cine__scan");
    if (scan) gsap.fromTo(scan, { top: "2%" }, { top: "98%", duration: 5, ease: "sine.inOut", repeat: -1, yoyo: true });
    var scope = heroCine.querySelector(".scope");
    if (scope && !touch) {
      gsap.set(scope, { xPercent: -50, yPercent: -50 });
      heroCine.addEventListener("mouseenter", function () { heroCine.classList.add("scope-on"); });
      heroCine.addEventListener("mouseleave", function () { heroCine.classList.remove("scope-on"); });
      heroCine.addEventListener("mousemove", function (e) {
        var r = heroCine.getBoundingClientRect();
        gsap.to(scope, { x: e.clientX - r.left, y: e.clientY - r.top, duration: .45, ease: "power2.out" });
        var nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
        if (hcBg) gsap.to(hcBg, { x: nx * -22, y: ny * -14, duration: 1, ease: "power2.out" });
        gsap.to(heroCine.querySelector(".hero-cine__title"), { x: nx * -8, duration: 1, ease: "power2.out" });
      });
    }
  }

  /* ---------- pasy parallax (band) ---------- */
  gsap.utils.toArray(".band").forEach(function (band) {
    var bg = band.querySelector(".band__bg img");
    if (bg) gsap.fromTo(bg, { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: true } });
    var ret = band.querySelector(".band__reticle");
    if (ret) gsap.to(ret, { rotation: 65, ease: "none", scrollTrigger: { trigger: band, start: "top bottom", end: "bottom top", scrub: true } });
  });

  /* ---------- clip-path reveal obrazów ---------- */
  gsap.utils.toArray(".clip-reveal").forEach(function (el) {
    gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.25, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 86%" } });
  });

  /* ---------- liczby ---------- */
  gsap.utils.toArray(".stat__num[data-to]").forEach(function (el) {
    var target = parseFloat(el.getAttribute("data-to"));
    var obj = { v: 0 };
    gsap.to(obj, { v: target, duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" }, onUpdate: function () { el.childNodes[0].nodeValue = Math.round(obj.v); } });
  });

  /* ---------- claim: słowa scrubem ---------- */
  var claim = document.querySelector(".bigclaim");
  if (claim) {
    var words = claim.querySelectorAll(".w");
    gsap.to(words, { opacity: 1, stagger: .06, ease: "none", scrollTrigger: { trigger: ".claim", start: "top 72%", end: "center center", scrub: true } });
    var cr = document.querySelector(".claim__reticle");
    if (cr) gsap.to(cr, { rotation: 90, ease: "none", scrollTrigger: { trigger: ".claim", start: "top bottom", end: "bottom top", scrub: true } });
  }

  /* ---------- etapy / pilary / karty: wejście ---------- */
  gsap.utils.toArray(".stage, .pillar, .pkg, .card, .review, .prod, .gal-item").forEach(function (card, i) {
    gsap.fromTo(card, { opacity: 0, y: 54 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: (i % 3) * .1, scrollTrigger: { trigger: card, start: "top 88%" } });
  });

  /* ---------- przyciski magnetyczne ---------- */
  if (!touch) {
    document.querySelectorAll(".btn-solid, .btn-ghost").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - r.left - r.width / 2) * .22, y: (e.clientY - r.top - r.height / 2) * .3, duration: .5, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", function () { gsap.to(btn, { x: 0, y: 0, duration: .7, ease: "elastic.out(1, .45)" }); });
    });
  }

  /* ---------- wielkie słowo w CTA ---------- */
  var ctaWord = document.querySelector(".cta__word");
  if (ctaWord) {
    gsap.fromTo(ctaWord, { xPercent: -56 }, { xPercent: -44, ease: "none", scrollTrigger: { trigger: ".cta", start: "top bottom", end: "bottom top", scrub: true } });
  }

  /* ---------- podstrony: wejście nagłówka ---------- */
  var ph = document.querySelector(".page-head");
  if (ph) {
    var tlp = gsap.timeline();
    tlp.fromTo(ph.querySelector(".label"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .8, ease: "power3.out" }, .1)
       .fromTo(ph.querySelectorAll("h1 .rline-in"), { yPercent: 120 }, { yPercent: 0, duration: 1.1, stagger: .08, ease: "power4.out" }, .2)
       .fromTo(ph.querySelector(".page-head__lead"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .9, ease: "power3.out" }, .5)
       .fromTo(ph.querySelector(".page-head__no"), { opacity: 0 }, { opacity: 1, duration: 1.4, ease: "power2.out" }, .5);
  }

  ScrollTrigger.refresh();
})();

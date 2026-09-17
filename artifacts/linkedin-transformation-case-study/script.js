(function () {
  "use strict";

  var progress = document.getElementById("reading-progress");
  var backTop = document.querySelector(".back-to-top");
  var header = document.querySelector(".site-header");
  var menuToggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var PORTFOLIO_EMAIL = "CONFIGURE_PORTFOLIO_EMAIL";
  var PORTFOLIO_LINKEDIN_URL = "CONFIGURE_LINKEDIN_PROFILE_URL";

  if (window.lucide) window.lucide.createIcons();

  function isConfigured(value) {
    return value && value.indexOf("CONFIGURE_") !== 0;
  }

  function configureExternalLinks() {
    document.querySelectorAll("[data-contact-link]").forEach(function (link) {
      if (!isConfigured(PORTFOLIO_EMAIL)) return;
      var subject = link.getAttribute("data-contact-subject");
      link.href = "mailto:" + PORTFOLIO_EMAIL + (subject ? "?subject=" + encodeURIComponent(subject) : "");
    });

    document.querySelectorAll("[data-linkedin-link]").forEach(function (link) {
      if (isConfigured(PORTFOLIO_LINKEDIN_URL)) link.href = PORTFOLIO_LINKEDIN_URL;
    });
  }
  configureExternalLinks();

  function updateScrollUI() {
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progress) progress.style.width = percentage + "%";
    if (backTop) backTop.classList.toggle("is-visible", window.scrollY > 600);
  }
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      var open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      var label = menuToggle.querySelector("span");
      if (label) label.textContent = open ? "Menu" : "Close";
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        var label = menuToggle.querySelector("span");
        if (label) label.textContent = "Menu";
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      window.history.pushState(null, "", link.getAttribute("href"));
    });
  });

  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  var revealItems = document.querySelectorAll(".reveal");
  if (typeof window.IntersectionObserver === "function" && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.body.classList.add("reveal-enabled");
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }

  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  if (typeof window.IntersectionObserver === "function") {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-28% 0px -62% 0px", threshold: 0 });
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  var comparison = document.querySelector("[data-comparison]");
  var handle = document.querySelector(".comparison-handle");
  var dragging = false;
  function setComparison(value) {
    var bounded = Math.max(8, Math.min(92, value));
    if (comparison) comparison.style.setProperty("--split", bounded + "%");
    if (handle) {
      handle.style.left = bounded + "%";
      handle.setAttribute("aria-valuenow", String(Math.round(bounded)));
    }
    if (comparison) {
      var before = comparison.querySelector(".before-panel");
      var after = comparison.querySelector(".after-panel");
      if (before && after) {
        if (comparison.classList.contains("view-before")) {
          before.style.width = "100%";
          after.style.width = "0%";
        } else if (comparison.classList.contains("view-after")) {
          before.style.width = "0%";
          after.style.width = "100%";
        } else {
          before.style.width = bounded + "%";
          after.style.width = (100 - bounded) + "%";
        }
      }
    }
  }
  setComparison(50);
  function positionFromPointer(clientX) {
    if (!comparison) return;
    var rect = comparison.getBoundingClientRect();
    setComparison(((clientX - rect.left) / rect.width) * 100);
  }
  if (handle && comparison) {
    handle.addEventListener("pointerdown", function (event) {
      dragging = true;
      handle.setPointerCapture(event.pointerId);
      positionFromPointer(event.clientX);
    });
    handle.addEventListener("pointermove", function (event) {
      if (dragging) positionFromPointer(event.clientX);
    });
    handle.addEventListener("pointerup", function () { dragging = false; });
    handle.addEventListener("pointercancel", function () { dragging = false; });
    handle.addEventListener("keydown", function (event) {
      var current = Number(handle.getAttribute("aria-valuenow")) || 50;
      if (event.key === "ArrowLeft" || event.key === "ArrowDown") { event.preventDefault(); setComparison(current - 5); }
      if (event.key === "ArrowRight" || event.key === "ArrowUp") { event.preventDefault(); setComparison(current + 5); }
      if (event.key === "Home") { event.preventDefault(); setComparison(8); }
      if (event.key === "End") { event.preventDefault(); setComparison(92); }
    });
  }
  document.querySelectorAll(".view-button").forEach(function (button) {
    button.addEventListener("click", function () {
      var view = button.getAttribute("data-view");
      document.querySelectorAll(".view-button").forEach(function (item) {
        var active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      if (!comparison) return;
      comparison.classList.remove("view-before", "view-after");
      if (view === "before") comparison.classList.add("view-before");
      if (view === "after") comparison.classList.add("view-after");
      setComparison(view === "before" ? 8 : view === "after" ? 92 : 50);
    });
  });
}());
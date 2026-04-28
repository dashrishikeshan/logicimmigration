(function () {
  "use strict";

  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  var nav = document.getElementById("nav");

  function closeMenu() {
    if (!navToggle || !navLinks) return;
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  }

  function toggleMenu() {
    if (!navToggle || !navLinks) return;
    var open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    navLinks.classList.toggle("is-open", !open);
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", toggleMenu);
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Nav shadow on scroll
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 24) {
      nav.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)";
    } else {
      nav.style.boxShadow = "";
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // IntersectionObserver for reveal
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // Contact form (client-side feedback only)
  var form = document.getElementById("contactForm");
  var formNote = document.getElementById("formNote");

  if (form && formNote) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        formNote.textContent = "Please fill in all fields.";
        formNote.style.color = "#fbbf24";
        return;
      }
      formNote.textContent =
        "Thank you — your message has been noted. We will connect with you shortly. (Connect this form to your email or backend when ready.)";
      formNote.style.color = "#e8c547";
      form.reset();
    });
  }
})();

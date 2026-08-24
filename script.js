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

  // Fluid Orb Parallax Effect
  var orbs = document.querySelectorAll(".orb");
  if (orbs.length) {
    // Wrap each orb dynamically to preserve their CSS float animation
    var orbData = [];
    orbs.forEach(function (orb, index) {
      var wrapper = document.createElement("div");
      wrapper.style.position = "absolute";
      wrapper.style.inset = "0";
      wrapper.style.pointerEvents = "none";
      orb.parentNode.insertBefore(wrapper, orb);
      wrapper.appendChild(orb);
      
      orbData.push({
        el: wrapper,
        speed: (index + 1) * 25 // Different depth speeds: 25, 50, 75
      });
    });

    var targetX = 0, targetY = 0;
    var currentX = 0, currentY = 0;

    window.addEventListener("mousemove", function (e) {
      // Normalize mouse coordinates from -1 to 1
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function renderParallax() {
      // Lerp for fluid motion
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      orbData.forEach(function (data) {
        // Invert the movement so orbs shift away from the cursor
        var x = -currentX * data.speed;
        var y = -currentY * data.speed;
        data.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      requestAnimationFrame(renderParallax);
    }
    requestAnimationFrame(renderParallax);
  }
})();

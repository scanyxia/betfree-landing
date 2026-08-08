(function () {
  "use strict";

  /* ---------------------------------------------------------
     Nav — shrink/blur on scroll
  --------------------------------------------------------- */
  var nav = document.getElementById("nav");
  var stickyCta = document.getElementById("stickyCta");
  var hero = document.querySelector(".hero");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("is-scrolled", y > 20);

    if (stickyCta && hero) {
      var heroBottom = hero.getBoundingClientRect().bottom;
      stickyCta.classList.toggle("is-visible", heroBottom < 0);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     Scroll reveal — IntersectionObserver
  --------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = (i % 4) * 70;
            setTimeout(function () {
              el.classList.add("is-visible");
            }, delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------------------------------------------------------
     FAQ accordion
  --------------------------------------------------------- */
  var triggers = document.querySelectorAll(".accordion__trigger");

  triggers.forEach(function (trigger) {
    var panel = trigger.nextElementSibling;

    trigger.addEventListener("click", function () {
      var isOpen = trigger.getAttribute("aria-expanded") === "true";

      triggers.forEach(function (t) {
        t.setAttribute("aria-expanded", "false");
        var p = t.nextElementSibling;
        if (p) p.style.maxHeight = null;
      });

      if (!isOpen) {
        trigger.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---------------------------------------------------------
     CTA click tracking hook (no-op placeholder, safe to extend)
  --------------------------------------------------------- */
  var ctaLinks = document.querySelectorAll(".js-cta");
  ctaLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.dataLayer) {
        window.dataLayer.push({ event: "cta_click", cta_label: link.textContent.trim() });
      }
    });
  });
})();

/* ============================================================
   DFN WORLDWIDE — SHARED SITE BEHAVIOR
   Loaded on every page. Depends on config.js being loaded first.
   ============================================================ */

(function () {
  "use strict";

  /* --------------------------------------------------------
     Header scroll state
  -------------------------------------------------------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --------------------------------------------------------
     Mobile nav toggle
  -------------------------------------------------------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });
    // Close menu when a link is tapped
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* --------------------------------------------------------
     Mark active nav link based on current path
  -------------------------------------------------------- */
  const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    const normalizedHref = href.replace(/\/index\.html$/, "/");
    if (
      normalizedHref === currentPath ||
      (currentPath.endsWith(normalizedHref) && normalizedHref !== "/")
    ) {
      a.classList.add("active");
    }
  });

  /* --------------------------------------------------------
     Scroll-triggered reveals (.reveal, .reveal-stagger, .division-card)
  -------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    ".reveal, .reveal-stagger, .division-card"
  );

  if ("IntersectionObserver" in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show everything
    revealTargets.forEach((el) => el.classList.add("in-view"));
  }

  /* --------------------------------------------------------
     Back to top button
  -------------------------------------------------------- */
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener(
      "scroll",
      () => {
        backToTop.classList.toggle("visible", window.scrollY > 600);
      },
      { passive: true }
    );
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --------------------------------------------------------
     Populate elements from DFN_CONFIG (data-dfn attributes)
     Usage examples:
       <span data-dfn="brand.name"></span>
       <a data-dfn-href="links.spotify">Spotify</a>
       <span data-dfn="brand.legalName"></span> · Reg. No. <span data-dfn="brand.regNumber"></span>
  -------------------------------------------------------- */
  if (typeof DFN_CONFIG !== "undefined") {
    const getPath = (obj, path) =>
      path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);

    document.querySelectorAll("[data-dfn]").forEach((el) => {
      const value = getPath(DFN_CONFIG, el.getAttribute("data-dfn"));
      if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll("[data-dfn-href]").forEach((el) => {
      const value = getPath(DFN_CONFIG, el.getAttribute("data-dfn-href"));
      if (value !== undefined) el.setAttribute("href", value);
    });

    // Current year for footer copyright
    document.querySelectorAll("[data-dfn-year]").forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }
})();

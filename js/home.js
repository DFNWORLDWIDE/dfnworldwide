/* ============================================================
   DFN WORLDWIDE — HOMEPAGE
   Renders the division grid from DFN_CONFIG.divisions so the
   four divisions stay in sync with config.js everywhere.
   ============================================================ */

(function () {
  "use strict";

  const grid = document.getElementById("division-grid");
  if (!grid || typeof DFN_CONFIG === "undefined") return;

  DFN_CONFIG.divisions.forEach((division) => {
    const card = document.createElement("a");
    card.className = "division-card";
    card.href = division.href;

    const statusClass = division.status === "ACTIVE" ? "active" : "";

    card.innerHTML = `
      <div class="division-top">
        <span class="division-code mono">${division.code}</span>
        <span class="division-status ${statusClass}">${division.status}</span>
      </div>
      <div>
        <span class="division-role">${division.role}</span>
        <h3>${division.name}</h3>
      </div>
      <p>${division.desc}</p>
      <span class="division-link">
        ${division.cta} <span class="arrow">→</span>
      </span>
    `;

    grid.appendChild(card);
  });

  // Re-observe newly added cards for the reveal animation
  if ("IntersectionObserver" in window) {
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
    grid.querySelectorAll(".division-card").forEach((el) => observer.observe(el));
  } else {
    grid.querySelectorAll(".division-card").forEach((el) => el.classList.add("in-view"));
  }
})();

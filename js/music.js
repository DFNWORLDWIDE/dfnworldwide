/* ============================================================
   DFN WORLDWIDE — MUSIC PAGE
   Renders the tracklist from DFN_CONFIG.release.tracks
   ============================================================ */

(function () {
  "use strict";

  const list = document.getElementById("tracklist");
  if (!list || typeof DFN_CONFIG === "undefined") return;

  DFN_CONFIG.release.tracks.forEach((track, i) => {
    const row = document.createElement("div");
    row.className = "release-track";
    row.innerHTML = `
      <span><span class="track-num">${String(i + 1).padStart(2, "0")}</span>${track}</span>
      <span>${DFN_CONFIG.release.artist}</span>
    `;
    list.appendChild(row);
  });
})();

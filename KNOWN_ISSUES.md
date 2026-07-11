# Known Issues

Two classes of things live here: **bugs found and fixed** in this engineering
pass, and **gaps that are still open** because they need something only you
can provide (real photography, real store links, a hosting budget) — not
because they were missed.

---

## Session 2 — additional fixes

### 11. Contact form still had no client-side email validation gap closed further
Covered in Session 1; confirmed still correct after this session's form
refactor (see #12).

### 12. Formspree/n8n endpoints were hardcoded in two separate places
`submitEmail()` and `initContactForm()` each had their own hardcoded
`DFN.formspree`/`DFN.n8nWebhook` fetch calls. Refactored into a single
`DFN.formSubmitTargets` array and one `submitToBackends()` helper both
functions call — adding, removing, or swapping a backend (relevant given
the parallel Zoho CRM setup in progress) is now a one-line config change.
**The current Formspree → n8n pipeline was not removed or altered in
behavior** — this was a pure refactor of *how* the code reaches those same
two endpoints, not a change to *what* it does.

### 13. Sub-pages had no Open Graph/Twitter/canonical tags; the four original
sub-pages, plus five new ones, all now carry the same meta pattern as
`index.html`.

### 14. No spam protection, no focus-visible ring, no modal focus trap
Same fixes as Session 1's #3, #8, #9 — now also applied to the five new
pages built this session (they were built with these already included,
not retrofitted).

### 15. Emoji icons rendered inconsistently across OS/browser combinations
Replaced with an inline SVG icon system (see `ARCHITECTURE.md`).

### 16. An engineering mistake this session, disclosed in full
A script meant to extract only hero-related CSS out of four sub-pages'
inline `<style>` blocks instead deleted three of those blocks in their
entirety — because on `devs.html`, `designs.html`, and `publishing.html`,
the hero rules and page-specific rules (the Discipline Tracker widget, the
hoodie grid, the book layout) lived in one combined `<style>` block, and the
script's pattern matched to that block's single closing tag rather than
stopping at the hero rules specifically. Caught within the same session via
a post-edit verification step (checking that key selectors like
`.tracker-shell` still existed), and fully restored from the verified
original source before any further edits touched those files. Full account
in `CHANGELOG.md` under v1.1.0. Flagging it here too, explicitly, because a
known-issues document that omits the issues its own author caused isn't
actually a known-issues document.

**What changed as a result:** every subsequent multi-file scripted edit in
this session was verified by diffing full before/after content and
re-checking that specific selectors survived, not just by counting how many
replacements were "successfully" applied. Counting successes was exactly
what made the original mistake invisible until an explicit content check
caught it.

---

## Session 1 — fixed

### 1. Contact form silently lost the enquiry type (data-loss bug)
`script.js` sent the contact form's `type` field (press / sponsor / book /
etc.) to Formspree correctly, but the n8n payload did
`{...data, type: 'contact'}` — that literal `type: 'contact'` overwrote the
real value before the object was even sent. The n8n Code node then computed
`enquiryType` from that already-overwritten field, so it always resolved to
the string `"contact"`. Every row in the "Contact Enquiries" Google Sheet and
every team-notification email subject line said "contact" instead of what
the person actually selected — since the form went live.

**Fix:** the field is now named `enquiryType` from the moment it's read out
of the form. Also fixed in `n8n-workflow.json`'s Normalize Data node, which
now also maps the short form values (`press`, `sponsor`, ...) to readable
labels. **Re-import the n8n workflow** for the fix to take effect.

### 2. Countdown banner text could silently go stale
Fixed — `DFN.nextDropName` and `DFN.nextDropDateStr` now drive the banner
label text directly instead of living hardcoded in HTML.

### 3. No spam protection on any form
Fixed — invisible honeypot field, checked client and server-side.

### 4. No client-side email validation on the contact form
Fixed.

### 5. Sub-pages had no Open Graph / Twitter Card / canonical tags
Fixed on all four original sub-pages, plus `index.html` itself was missing
its own canonical tag.

### 6. No `robots.txt`, `sitemap.xml`, or 404 page
Fixed.

### 7. Privacy Policy and Terms of Service were written but never published
Fixed — published at `pages/privacy.html`/`pages/terms.html`, linked in
every footer, with the third-party services list corrected to match what's
actually deployed instead of a stale "Mailchimp or similar" placeholder.

### 8. Modal had no keyboard focus management
Fixed — focus trap, focus-on-open, focus-return-on-close.

### 9. No visible focus indicator anywhere on the site
Fixed — site-wide `:focus-visible` ring.

### 10. No skip-to-content link
Fixed on every page.

---

## Still open — needs your input, not more engineering

### Real photography and artwork
`assets/images/` doesn't exist in the repository at all — every image
reference in the code is currently unfulfilled. The site is built to
degrade gracefully without them (most images have CSS fallback backgrounds
or hidden-on-error behavior, so nothing looks visibly "broken"), but this is
the single highest-leverage remaining item. No amount of engineering
substitutes for the actual EP covers, book covers, and founder portrait.

### Five placeholder links
`spotify`, `appleMusic`, `amazonMusic`, `kdpBook`, and `etsy` are still `'#'`
in the `DFN` config object in `script.js`. These are correctly flagged
already in your own README pre-drop checklist — leaving them here as a
reminder they're still unresolved as of this pass.

### n8n Google Sheet ID and Brevo List ID
Still literally the placeholder strings `REPLACE_WITH_YOUR_GOOGLE_SHEET_ID`
and `REPLACE_WITH_YOUR_BREVO_LIST_ID` in `n8n-workflow.json`. This is
expected — they can only be filled in once you've created those resources,
per `AUTOMATION_SETUP.md`.

### No analytics
There is currently no way to measure how many people visit, where they come
from, or where they drop off in the funnel from visit → email signup →
Gumroad download. Deliberately not added in this pass without your sign-off,
because doing it properly means a cookie-consent mechanism under POPIA if
you use anything beyond privacy-respecting, cookie-free analytics (e.g.
Plausible or GoatCounter avoid this; Google Analytics does not). This is a
real decision with a compliance dimension, not a default I should pick for
you — see `ROADMAP.md`.

### Site search index is hand-maintained
`SEARCH_INDEX` in `script.js` is a hardcoded array, the same pattern as
`AI_KB`. Add a new page, and it won't show up in search results until you
add a matching entry — there's no automatic crawling/indexing, because
there's no backend to crawl with. Fine at 21 entries; worth remembering
if the page count grows significantly.

### Zoho CRM migration is prepared for, not built
Per the parallel Zoho CRM setup: `DFN.formSubmitTargets` in `script.js` is
now the single place a new backend gets added, and nothing about current
form behavior, validation, styling, or spam protection changed. Actually
adding Zoho's web forms as a target — once tested and approved on your
end — is a config addition to that array, not a code rewrite. Not done in
this pass because there's nothing to test against yet.

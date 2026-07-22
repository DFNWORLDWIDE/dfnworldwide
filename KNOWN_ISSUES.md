# Known Issues

Two classes of things live here: **bugs found and fixed** in this engineering
pass, and **gaps that are still open** because they need something only you
can provide (real photography, real store links, a hosting budget) — not
because they were missed.

---

## Session 4 — DFN AI everywhere + dedicated AI page

### 21. AI chat navigation buttons would have silently broken off the homepage
The widget's nav buttons (e.g. "Open Records") used hrefs like
`pages/records.html` — correct only when the chat runs on `index.html`,
which was the only place it ran until this session. Rolling it out to all
14 other pages meant those same hrefs would have resolved wrong from
inside `/pages/` itself (`pages/records.html` from within `/pages/`
resolves to the nonexistent `/pages/pages/records.html`). Caught this
before shipping, not after: fixed by routing every nav button through the
same depth-aware URL resolver already built and proven for site search
(`resolveSearchUrl()`), instead of duplicating that logic or hand-fixing
each entry differently. In-page anchor buttons (e.g. "Meet the Founder",
which points to `#founder`, a section that only exists on the homepage)
now also fall back to navigating to `index.html#founder` when clicked from
a page that doesn't have that section, instead of silently doing nothing.

### 22. DFN AI is now on all 15 pages
Previously homepage-only (see `ROADMAP.md`'s "Shipped since last update").
Same widget, same knowledge base, same voice features — now reachable
from anywhere on the site.

### 23. New page: `pages/ai.html`
A dedicated page explaining what DFN AI actually does and, honestly, what
it currently isn't (a language model) — framed as a real architecture
choice (zero cost, zero data collection, instant) rather than a
limitation to downplay. Cross-links to Services, since an AI-powered
interface built in-house is itself evidence of what DFN Devs can build
for a client.

---

## Session 3 — Store page + performance audit

### 17. records.html was missing `loading="lazy"` on its one real image
The DFNCHALLENGE cover image tag on `records.html` didn't have
`loading="lazy"` — the *identical* image reference on `index.html`'s
slider did. Fixed, plus added explicit `width`/`height` and
`decoding="async"` to every content image site-wide (prevents layout
shift as images load in, standard Core Web Vitals practice).

### 18. Facebook footer icon regression on records.html specifically
The Session 2 emoji-to-SVG icon replacement pass covered Instagram, TikTok,
YouTube, X, and LinkedIn's footer variants but missed one exact-text-match
pattern for Facebook that only `records.html`'s footer used (a subtle
whitespace difference from the other pages meant the batch script's pattern
didn't match). Every other page already had the correct icon; only
`records.html` was showing bare "FB" text. Fixed.

### 19. The custom cursor's animation loop never stopped
`initCursor()`'s `requestAnimationFrame` loop ran forever, unconditionally,
including on a backgrounded/inactive browser tab — real, needless CPU and
battery cost on every desktop visit to every page, not specific to
records.html. Added a Page Visibility API check that pauses the loop when
the tab isn't visible and resumes it when it is.

### On "records.html is very slow" specifically
Investigated directly rather than guessed. Found and fixed the two real,
verifiable code issues above. Did **not** find a records-specific script,
duplicate resource load, or render-blocking pattern beyond those — the
page's HTML is actually smaller than three of the four other division
pages. The most likely remaining explanation, which I can't verify or fix
from here: **if you've added a real `dfnchallenge.webp` file locally
since this repo was last shared with me, and it's a large, uncompressed
export (a multi-megabyte PNG-as-webp, a raw camera/design-tool export),
that alone would explain a page feeling "very slow" while every other
page — which either has no image yet or uses one as a small CSS
background — doesn't.** Concrete target: keep any single product image
under roughly 150–250KB at the display size it's actually shown at
(600×600 for the EP covers is what the code now expects). Squoosh
(squoosh.app, free, runs in-browser) or TinyPNG will get you there in
seconds. If the page is still slow after that with real images in place,
that's a genuinely new data point worth sending over.

### 20. Store page added
`pages/store.html` — every real product and access point in one place
(the free book, DFNCHALLENGE streaming, beat licensing via BeatStars, the
free Discipline Tracker) plus what's coming (Hoodie and premium book,
clearly marked with real dates, not fake "buy" buttons). No cart, no
checkout built here — every card routes to wherever that product's real
checkout already lives (Gumroad, Spotify, BeatStars, or a waitlist join
for anything not live yet). Wired into nav, footer, search, sitemap, and
the AI's knowledge base (which previously said no store existed — that
answer was live-corrected too).

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

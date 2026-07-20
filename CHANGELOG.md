# Changelog

Technical version history. For the visitor-facing version, see
`pages/changelog.html`.

## v1.1.0 — Pre-launch engineering pass

### Fixed
- Contact form enquiry type was silently overwritten by a field-name
  collision (`type`) before reaching n8n — every submission recorded
  "contact" regardless of what was selected. Fixed in `script.js` and
  `n8n-workflow.json`'s Normalize Data node.
- Countdown banner label text was hardcoded separately from
  `DFN.nextDrop`, meaning updating the drop date would silently leave a
  stale label. `DFN.nextDropName`/`nextDropDateStr` now drive both.
- Contact form had no client-side email format validation (hero/join
  forms did).
- No spam protection on any form. Added honeypot field + client and
  server-side checks.
- Modal had no keyboard focus management — Tab could escape it while
  open, and opening it via keyboard didn't move focus in.
- `outline:none` was set globally on inputs/textarea/select with nothing
  replacing it — keyboard users had no visible focus indicator anywhere
  on the site. Added a site-wide `:focus-visible` ring.
- Sub-pages (`records.html`, `publishing.html`, `designs.html`,
  `devs.html`) had no Open Graph/Twitter Card/canonical tags — only
  `index.html` did. `index.html` itself was missing its canonical tag.
- **Engineering incident, self-inflicted and self-corrected:** a
  deduplication script intended to extract only the `.div-hero` rules
  from each sub-page's inline `<style>` block instead matched to the
  block's *only* closing `</style>` tag, deleting the entire block —
  including page-specific CSS unrelated to the hero section (the
  Discipline Tracker widget's full styling on `devs.html`, the hoodie
  grid on `designs.html`, the book layout on `publishing.html`).
  Caught immediately via a post-edit selector-presence check, and fully
  restored from the verified original source before any further work
  continued. Root cause: the script assumed a structural property (that
  hero rules lived in their own dedicated `<style>` block) without
  verifying it held across all four files it ran against. Logged here
  rather than quietly fixed, because a change log that only shows
  clean work isn't trustworthy.

### Added
- Privacy Policy and Terms of Service, published and linked in every
  footer (previously drafted, never deployed)
- `robots.txt`, `sitemap.xml`, branded `404.html`
- DFN AI: real navigation actions (buttons under replies), voice input
  (`SpeechRecognition`) and voice output (`speechSynthesis`), both
  feature-detected and hidden where unsupported
- Inline SVG icon system (sprite-based, `.icon` utility class) replacing
  emoji glyphs site-wide — generic pictograms, not platform logomarks
- Selective glassmorphism (backdrop-filter) on the AI panel, product
  modal, and search overlay — the three genuinely appropriate
  floating-over-content surfaces, not applied indiscriminately
- New pages: Services (with a working CRM-wired quote form and the real
  Upwork profile link), Portfolio, FAQ, Roadmap, Changelog
- Site search — hardcoded client-side index, `/` keyboard shortcut,
  depth-aware URL resolution so the same index works from root and from
  `/pages/`
- Breadcrumbs on every sub-page
- Share button (Web Share API + clipboard fallback) on product modals
- Print stylesheet
- `formSubmitTargets` array replacing two hardcoded endpoint fields —
  adding or swapping a form backend (e.g. once Zoho CRM's web forms are
  tested) is now a config change, not a multi-file edit
- Centralized `.div-hero` and its variants into `style.css` (previously
  duplicated as inline `<style>` blocks in four separate files) plus a
  subtle hairline pattern overlay
- `KNOWN_ISSUES.md`, `ARCHITECTURE.md`, `AI_SYSTEM.md`, `VOICE_SYSTEM.md`,
  `LAUNCH_CHECKLIST.md`, `ROADMAP.md`, `RELEASE_REPORT.md`

### Changed
- Footer restructured to 4 columns (`Brand`/`Explore`/`Company`/implicit
  legal row) to fit new pages without crowding
- Primary nav gained a `Services` link and a search button, consistently
  across all 13 pages

## v1.0.0 — July 23, 2026

Initial public launch. DFNCHALLENGE EP live via RouteNote, The Reset
System published free on Gumroad, Discipline Tracker live, site live at
dfnworldwide.com.

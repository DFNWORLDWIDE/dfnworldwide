# Architecture Reference

This covers the technical shape of the site: what exists, why it's built the
way it is, and the constraints that shaped it. `README.md` is the owner's
manual for day-to-day edits — this is the deeper reference for anyone
(including future-you) trying to understand *why* something works the way it
does.

> **A note on scope:** this document, and this pass generally, deliberately
> did not produce separate `DESIGN_SYSTEM.md`, `STYLE_GUIDE.md`,
> `PERFORMANCE.md`, `ACCESSIBILITY.md`, and `SEO.md` files. For a one-person,
> six-page static site, six mostly-overlapping documents is overhead that
> nobody will keep updated — they'd go stale within a month and become
> actively misleading. Everything those docs would have said lives in the
> sections below instead, where it's more likely to actually get read.

---

## The stack, and why

Static HTML/CSS/vanilla JS, hosted on GitHub Pages, forms handled by
Formspree, automation by n8n. No build step, no framework, no server to
maintain, no monthly software bill beyond what's opt-in (n8n, Brevo have free
tiers this is sized for). This is the right stack for the current stage: a
single founder who needs to be able to edit copy in a text editor and push,
with zero DevOps surface area. The tradeoff, made consciously, is that
anything requiring a backend — real AI, a real store with inventory, user
accounts — is out of reach until that changes. See `ROADMAP.md` for what
that would take.

## File map

```
dfn/
├── index.html, style.css, script.js   ← the whole site (see README's "Three Files, Three Jobs")
├── robots.txt, sitemap.xml, 404.html  ← crawl/SEO/error-page basics
├── n8n-workflow.json                  ← import into n8n for CRM + email automation
├── AUTOMATION_SETUP.md                ← n8n/Sheets/Brevo setup walkthrough
├── README.md                          ← day-to-day owner's manual
├── KNOWN_ISSUES.md                    ← what's fixed, what's still open
├── ROADMAP.md                         ← sequenced next steps, including what needs a backend
├── ARCHITECTURE.md                    ← this file
├── pages/
│   ├── records.html, publishing.html, designs.html, devs.html
│   └── privacy.html, terms.html       ← POPIA-required, now actually published
└── assets/images/                     ← not yet populated — see KNOWN_ISSUES.md
```

## Design tokens

All brand values live as CSS custom properties in `style.css`'s `:root`
block — one source of truth for color, spacing, easing, and type scale.
Three fonts, three fixed roles, documented in the brand guidelines: Cormorant
Garamond (display/editorial), Barlow Condensed (UI/labels), Barlow (body).
Don't introduce a fourth typeface or a color outside this palette without
updating both `style.css` and the Brand Guidelines doc — they're meant to
stay in lockstep.

## Accessibility posture

Semantic landmarks (`header`, `nav`, `footer`, `section` with `aria-label`),
skip-links on every page, a `:focus-visible` ring restored site-wide (the
base stylesheet sets `outline:none` globally — `:focus-visible` reintroduces
a visible indicator without fighting the custom cursor on mouse input),
keyboard-trapped modal with focus return, `prefers-reduced-motion` respected
throughout, decorative elements (`aria-hidden`) kept out of the accessibility
tree. Not done: a full screen-reader pass with real AT software (VoiceOver /
NVDA) — the fixes here address the categories of issue that show up in
automated audits and code review, not a substitute for testing with real
assistive technology before a high-stakes launch.

## SEO posture

Every page: unique title, meta description, canonical URL, Open Graph +
Twitter Card tags. `sitemap.xml` and `robots.txt` at the root. What's
missing: structured data (JSON-LD `Organization` / `MusicGroup` / `Book`
schema would materially help how this shows up in search and AI-assistant
answers) and per-product OG images instead of the shared logo — both are
straightforward additions once real cover art exists.

## Performance posture

`font-display=swap` on the Google Fonts request, `preconnect` hints, lazy
loading on below-the-fold images, WebP throughout, no render-blocking
scripts (single `script.js` at the end of `body`), CSS custom cursor and
particle effects gated behind `prefers-reduced-motion` and `hover`/pointer
media queries so they don't run on devices that don't want or need them. The
honest caveat: none of this has been run through Lighthouse or WebPageTest
against production, because there's no production yet — real numbers depend
on final image weights, which don't exist in this repo. Treat this as
"engineered not to have obvious performance problems," not as a verified
score.

## Security posture

Client-side email validation on all three forms (cosmetic — real validation
has to happen server-side, which for this stack means the n8n Code node).
Honeypot spam field, checked both client-side (skip the fetch) and
server-side (n8n drops it silently). No secrets in client code — the n8n
webhook URL is meant to be public (it's a form endpoint), but note that
*nothing currently authenticates that the request came from this site*
specifically; anyone who finds the URL could POST directly to it. That's a
reasonable risk for a v1 lead-capture form and is not worth the complexity
of adding shared-secret auth yet, but if spam volume becomes a real problem,
that's the next lever (see `ROADMAP.md`).

## The AI widget

Covered in its own doc, `AI_SYSTEM.md`, because it's substantial enough and
distinct enough from the rest of the site to deserve one — not because every
feature deserves its own file.

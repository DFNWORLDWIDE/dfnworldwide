# Roadmap

Sequenced by what actually blocks what — not a wishlist. Anything marked
**needs a decision** is deliberately not something engineering should decide
on your behalf (spend, legal exposure, or brand voice calls).

## Before launch (blocks going live for real)

1. **Real photography and cover art** in `assets/images/`. Nothing else on
   this list matters if the site looks unfinished. Already flagged in your
   own pre-drop checklist in `README.md`.
2. **Resolve the five placeholder links** (`spotify`, `appleMusic`,
   `amazonMusic`, `kdpBook`, `etsy`) once those platforms are actually live.
3. **Re-import `n8n-workflow.json`** — the enquiry-type bug fix and honeypot
   only take effect once the updated workflow replaces the currently
   imported one. See `KNOWN_ISSUES.md` #1.
4. **Submit a real end-to-end test** through all three forms once n8n is
   reconnected — confirm Sheets, Brevo, and the notification email all fire
   with the correct enquiry type this time.

## Near-term (real value, no new infrastructure)

5. **Structured data (JSON-LD).** `Organization`, `MusicGroup`, and `Book`
   schema on the relevant pages. Meaningfully improves how the site is
   represented in search results and by AI-assistant answers. Needs final
   copy/art to be worth doing once, not twice.
6. **Expand `AI_KB`.** The keyword-matched widget is only as good as its
   coverage. Watch what people actually ask (once there's traffic) and add
   entries for the real gaps, the same way `services`/`store` entries were
   added this pass.
7. **Analytics — needs a decision.** Cookie-free options (Plausible,
   GoatCounter, Fathom) need no consent banner under POPIA and would give
   real funnel visibility (visit → email signup → Gumroad download) for a
   small monthly fee. Google Analytics is free but requires a proper cookie
   consent mechanism to stay POPIA-compliant, which is itself a real feature
   to build. Pick one; either is a small, contained addition once decided.

## Later (needs a backend — real infrastructure + budget)

8. **A real conversational AI**, per `AI_SYSTEM.md`: a serverless function
   holding an API key, calling an LLM, fed the book content and site
   knowledge as context. This is the single biggest jump on this list —
   everything above it is a variation on "static site," this is the first
   item that isn't.
9. **A real store** (inventory, checkout, order history) instead of
   Etsy/Printify links — only worth it once volume justifies owning that
   complexity instead of paying Etsy's cut for it.
10. **CRM beyond Google Sheets**, customer accounts, a courses platform — all
    real backend systems, all premature before there's an audience and
    revenue to justify them. Listed here so they're not forgotten, not
    because now is the time.

## Explicitly not on this roadmap

Voice-cloning, a native mobile app, and a live "DFN Summit" platform were
in the original spec's long-term vision. They're not sequenced here because
at this stage they're not roadmap items, they're speculation — there's no
version of "next" where they're the right next step. Revisit once items 1–9
are real and there's an audience whose actual behavior can inform whether
any of them are worth building.

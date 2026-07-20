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

5. **DFN AI only exists on the homepage.** Found during the Session 3
   audit: the chat widget's HTML only lives in `index.html` — every other
   page (Records, Store, Services, all 12 of them) has none of it. Anyone
   landing directly on a sub-page — from a Google result, a shared link,
   an ad — has zero access to search, voice, or the assistant until they
   go back to the homepage first. This is a real inconsistency in what's
   otherwise your flagship feature. Not fixed in this pass: it means
   duplicating real markup (trigger button + panel, not just a snippet)
   across 13 files, which changes the visual footprint of every page at
   once — worth a quick look on one page before replicating it
   everywhere, not something to do silently inside an unrelated audit.
   Flagging it clearly instead. Straightforward to do next: the JS
   (`initAIChat()`) already runs on every page and simply no-ops where
   the markup is missing, so this is a markup-only change, not new logic.

6. **Structured data (JSON-LD).** `Organization`, `MusicGroup`, and `Book`
   schema on the relevant pages. Meaningfully improves how the site is
   represented in search results and by AI-assistant answers. Needs final
   copy/art to be worth doing once, not twice.
7. **Expand `AI_KB`.** The keyword-matched widget is only as good as its
   coverage. Watch what people actually ask (once there's traffic) and add
   entries for the real gaps, the same way `services`/`store` entries were
   added this pass.
8. **Analytics — needs a decision.** Cookie-free options (Plausible,
   GoatCounter, Fathom) need no consent banner under POPIA and would give
   real funnel visibility (visit → email signup → Gumroad download) for a
   small monthly fee. Google Analytics is free but requires a proper cookie
   consent mechanism to stay POPIA-compliant, which is itself a real feature
   to build. Pick one; either is a small, contained addition once decided.

## Later (needs a backend — real infrastructure + budget)

9. **A real conversational AI**, per `AI_SYSTEM.md`: a serverless function
   holding an API key, calling an LLM, fed the book content and site
   knowledge as context. This is the single biggest jump on this list —
   everything above it is a variation on "static site," this is the first
   item that isn't.
10. **A full e-commerce checkout** (cart, inventory, order history) to
    replace routing out to Gumroad/Etsy/BeatStars. The Store page built
    this session is the honest aggregator version — every product, real
    links, no fake cart. This item is the much bigger "DFN Worldwide
    processes its own payments" version, worth it only once volume
    justifies owning that complexity instead of paying Gumroad/Etsy/
    BeatStars their cut.
11. **CRM beyond Google Sheets**, customer accounts, a courses platform — all
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

## On the larger page-list request (Session 2)

Built: Services, Portfolio, FAQ, Roadmap, Changelog — see `CHANGELOG.md`.

Deliberately not built, each for a specific reason rather than a blanket
"not enough time":

- **Downloads page** — there is exactly one real free download right now
  (the Reset System). A dedicated page for one link is a link wearing a
  page's clothes. Revisit once there's a second real downloadable asset
  (wallpapers, brand assets, a sample chapter) — then it's a real page.
- **Support Center** — the proposed content was almost entirely links to
  FAQ, Contact, and Downloads. Folded into the top of the FAQ page as a
  two-button "Need Help Fast?" row instead of shipping a third page that's
  90% duplicate links to the other two. A thin page that exists mainly to
  link to two other pages is a maintenance cost with no corresponding
  reader value.
- **Partners page** — the request's own notes say "keep it hidden until
  needed." Respecting that literally: not built.
- **Dashboard, Blog, Community, Academy, Careers, Investor Info, API
  Docs, Client Dashboard, Developer Docs** — the request's own notes say
  "don't build now, but plan for them." Also not built, for the same
  reason: these are real products in their own right, not pages, and
  building empty shells for them now creates upkeep debt (stale "coming
  soon" pages are worse for trust than not having the page at all) without
  any current audience to serve.
- **A live company analytics dashboard** (visitors, revenue, AI
  conversations, top countries, etc.) — flagged in the original request
  itself as "not for launch — a long-term vision." Also, structurally,
  this isn't buildable honestly right now: there's no backend, no
  analytics pipeline, and no revenue-tracking system feeding real numbers
  into it. A "dashboard" without a real data source behind it would mean
  either wiring up fake/static numbers (actively misleading if anyone
  ever saw it) or shipping an empty shell. Neither is worth doing. This
  becomes real once analytics (item 7 above) and real revenue tracking
  exist to feed it.
- **A global "recently added" widget, a live status page, breadcrumb-style
  "related products" automation** — all of these want to be automatically
  driven by a CMS or backend event log that doesn't exist. Manually
  maintained versions are possible but are a standing chore, not a
  feature, at one-founder scale. The static "Keep Exploring" cross-links
  added to the Services page this session are the manually-maintained,
  right-sized version of "related products" for where the site is now.

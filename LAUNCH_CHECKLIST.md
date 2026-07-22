# Launch Checklist

Work through this in order. Nothing here is automated — it's a manual pass
because the things that actually break launches (a stale link, a form that
silently fails, a share preview with no image) are exactly the things
automation doesn't catch on a site this size.

## Content

- [ ] All product images in place in `assets/images/` — see the exact filename
      list in `README.md`'s File Structure section
- [ ] Five placeholder links resolved in `script.js`'s `DFN` object:
      `spotify`, `appleMusic`, `amazonMusic`, `kdpBook`, `etsy`
- [ ] `n8n-workflow.json`'s `REPLACE_WITH_YOUR_GOOGLE_SHEET_ID` and
      `REPLACE_WITH_YOUR_BREVO_LIST_ID` filled in with real IDs
- [ ] Proofread every page mentioning the current drop for stale "Coming
      Soon" language that should now say "Live"
- [ ] Status badges flipped from `badge-soon`/`badge-announced` to
      `badge-live` where accurate

## Forms & automation

- [ ] Re-imported `n8n-workflow.json` if you had an older version already
      imported (the enquiry-type bug fix only applies to a fresh import —
      see `KNOWN_ISSUES.md`)
- [ ] Submitted a real test through the hero email form — confirm it lands
      in Google Sheets' `Subscribers` tab and triggers the Brevo welcome
      sequence
- [ ] Submitted a real test through the contact form with each enquiry
      type — confirm the CRM row and notification email both show the
      *correct* type, not "contact" or blank
- [ ] Submitted a test with the honeypot field manually filled (via
      browser dev tools) — confirm it's silently dropped, not delivered
- [ ] CRM categorizes enquiries correctly by division/type for reporting

## AI widget

- [ ] Asked DFN AI each of the four quick-action prompts — confirm
      accurate answers with working navigation buttons
- [ ] Asked DFN AI 3–5 questions in your own words that aren't exact
      matches for `AI_KB` entries — confirm the fallback response is
      graceful, not confusing
- [ ] Tested the mic button on a phone (Chrome/Android or Safari/iOS) if
      voice input matters to you — coverage varies, see `VOICE_SYSTEM.md`
- [ ] Tested the voice-output toggle reads a reply aloud and can be muted

## Search

- [ ] Tried 5–6 real search queries a visitor might type — confirm
      relevant results surface
- [ ] Confirmed search works identically from `index.html` and from a
      page inside `/pages/` (the link-resolving logic is depth-aware —
      worth a manual check once)

## SEO & sharing

- [ ] Google Search Console verified and `sitemap.xml` submitted
- [ ] Pasted the homepage URL into Facebook's Sharing Debugger, Twitter/X's
      Card Validator, and a LinkedIn post preview — confirm the OG image,
      title, and description all render correctly on all three
- [ ] Repeated the share-preview check for at least one sub-page (Records
      or Services) once real images exist — shared previews currently use
      the shared logo image as a placeholder
- [ ] Confirmed `robots.txt` and `sitemap.xml` are reachable at
      `dfnworldwide.com/robots.txt` and `/sitemap.xml` once DNS is live

## Analytics (if you've decided to add it — see `ROADMAP.md`)

- [ ] Analytics snippet installed and firing on at least 3 different pages
- [ ] If using anything beyond cookie-free analytics: consent mechanism
      live and tested, Privacy Policy's Cookies section (`pages/privacy.html`)
      updated to match what's actually deployed

## Mobile & browser testing

- [ ] Tested on a real iPhone (Safari) and a real Android phone (Chrome) —
      simulators miss real touch-target and viewport issues
- [ ] Tested at a narrow width (~360px) and a tablet width (~768px), not
      just phone and desktop
- [ ] Tested with a keyboard only, no mouse — skip link, nav, forms, modal,
      search, and the AI widget should all be reachable and usable
- [ ] Tested in Firefox at least once — it's the one major browser without
      `SpeechRecognition` support, worth confirming the mic button correctly
      stays hidden there rather than showing broken

## Countdown & dates

- [ ] Confirmed the countdown banner currently reads the correct
      Experience name and date (see `README.md` Recipe 3 — one edit updates
      both the numbers and the label now)
- [ ] Set a personal reminder for the day the countdown needs to switch —
      it does not switch itself

## Before you actually deploy

- [ ] Full backup of the current live site taken (or confirm you can
      `git checkout` back to the last known-good commit)
- [ ] This release tagged as `v1.0.0` (or whatever version is accurate) in
      git, so there's a clean rollback point
- [ ] `pages/privacy.html` and `pages/terms.html`'s "Last updated" dates
      reflect the actual publish date, not a placeholder

# Known Issues

Two classes of things live here: **bugs found and fixed** in this engineering
pass, and **gaps that are still open** because they need something only you
can provide (real photography, real store links, a hosting budget) — not
because they were missed.

---

## Fixed this pass

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
of the form, so there's nothing for the later `type: 'contact'` spread to
collide with. Also fixed in `n8n-workflow.json`'s Normalize Data node, which
now also maps the short form values (`press`, `sponsor`, ...) to readable
labels ("Press / Media", "Sponsorship / Partnership", ...). **Re-import the
n8n workflow** for the fix to take effect on the automation side — the old
imported workflow still has the bug baked into its Code node.

### 2. Countdown banner text could silently go stale
The banner's "The Rise Experience — Sep 23, 2026" text was hardcoded in
`index.html`, completely separate from `DFN.nextDrop` in `script.js`. The
README's Recipe 3 told you to update the JS date after each drop but never
mentioned the banner text was a second, separate edit — so the first time
you followed that recipe, the countdown numbers would update correctly and
the label would keep saying the wrong experience and date.

**Fix:** `DFN.nextDropName` and `DFN.nextDropDateStr` now drive the banner
label text directly. Updating the drop just means editing three lines in one
place in `script.js` — see the updated Recipe 3 in `README.md`.

### 3. No spam protection on any form
**Fix:** added an invisible honeypot field (`website`) to all three forms.
Real visitors never see or fill it (feature-detected off-screen, not
`display:none`, since some bots skip hidden fields specifically). Bots that
fill every field blindly get silently ignored — no error, no CRM entry, no
notification email. Also fixed in the n8n Code node.

### 4. No client-side email validation on the contact form
The hero/join forms validated email format; the contact form didn't. Fixed.

### 5. Sub-pages had no Open Graph / Twitter Card / canonical tags
Only `index.html` had them. Shared links to Records, Publishing, Designs, or
Devs on social platforms rendered with no preview image or title. Fixed on
all four, plus the canonical tag was missing from `index.html` itself.

### 6. No `robots.txt`, `sitemap.xml`, or 404 page
Standard pre-launch essentials that didn't exist. Added all three.

### 7. Privacy Policy and Terms of Service were written but never published
The Legal Compliance Pack has fully-drafted, ready-to-publish POPIA-compliant
text for both — the compliance checklist in that document even has both
items checked off as "not done." They were sitting in a Word doc, unlinked
from anywhere on the live site, while the site was actively collecting email
addresses through three different forms. Published both at
`pages/privacy.html` and `pages/terms.html`, linked in every page's footer.
One correction from the original draft: the Third-Party Services section
listed "Mailchimp or similar" — the site actually runs Formspree → n8n →
Google Sheets + Brevo, so the published policy now names the real pipeline
instead of a placeholder.

### 8. Modal had no keyboard focus management
Opening a product modal with Enter/Space didn't move focus into it, and Tab
could escape the modal into the page behind it while it was still open.
Fixed: focus now moves to the close button on open, Tab is trapped inside
the modal while open, and focus returns to whatever triggered it on close.

### 9. No visible focus indicator anywhere on the site
`input,textarea,select{outline:none}` was set globally with nothing to
replace it. Combined with the custom cursor, keyboard-only users had no way
to see where they were on the page. Added a `:focus-visible` gold outline
site-wide — it only appears for keyboard/programmatic focus, so it doesn't
interfere with the intentional custom-cursor mouse experience.

### 10. No skip-to-content link
Added to every page. Keyboard and screen-reader users previously had to tab
through the entire header and (on the homepage) the countdown banner before
reaching any actual content, on every single page load.

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

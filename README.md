# DFN Worldwide — Official Website

> From Nothing, Build Everything.

**DFN Worldwide PTY Ltd** · Reg. 2026/408693/07 · Tembisa, Gauteng, South Africa
Live at: `dfnworldwide.com` (once DNS is connected) · `dfnworldwide.github.io/dfnworldwide` (default)

---

## What This Is

The entire public web presence of DFN Worldwide — homepage, all four division pages, the free Discipline Tracker app, and the automation wiring behind every form. No CMS, no page builder, no software subscription standing between you and your own website. Every line is yours, in plain HTML/CSS/JavaScript, forever editable with nothing more than a text editor.

## Tech Stack

| Layer | Technology | Why it was chosen |
|---|---|---|
| Structure | HTML5 | No build step. Opens in any browser, forever. |
| Styling | CSS3 (custom properties) | One file of design tokens controls the entire brand. |
| Behavior | Vanilla JavaScript | No framework to version, update, or break. |
| Hosting | GitHub Pages | Free, fast, no server to maintain. |
| Forms | Formspree | Zero backend needed for email capture. |
| Automation | n8n → Google Sheets + Brevo | See `AUTOMATION_SETUP.md`. |
| Fonts | Cormorant Garamond, Barlow Condensed, Barlow | Loaded from Google Fonts CDN. |

---

## File Structure

```
dfn/
├── index.html              ← Homepage: hero, drop calendar, divisions, slider, AI chat, contact
├── style.css                ← Every visual rule on the entire site lives in this one file
├── script.js                 ← All behavior, all your links, the DFN config object, the AI chat brain
├── n8n-workflow.json        ← Import into n8n to wire up CRM + email automation
├── AUTOMATION_SETUP.md      ← Step-by-step: connect Google Sheets + Brevo
├── README.md                ← This file
├── robots.txt, sitemap.xml  ← Search engine crawling
├── 404.html                 ← Branded not-found page (GitHub Pages serves this automatically)
├── KNOWN_ISSUES.md          ← What's been fixed, what's still genuinely open
├── ARCHITECTURE.md          ← Technical reference — how the site is built and why
├── AI_SYSTEM.md             ← What the AI widget does today vs. what a real AI backend needs
├── VOICE_SYSTEM.md          ← Voice input/output implementation and future upgrade path
├── ROADMAP.md               ← Sequenced next steps, including what was deliberately not built
├── CHANGELOG.md             ← Technical version history
├── LAUNCH_CHECKLIST.md      ← Manual checks to work through before deploying
├── RELEASE_REPORT.md        ← Honest production-readiness assessment
│
├── pages/
│   ├── records.html        ← DFN Worldwide Records — all music, all EPs
│   ├── publishing.html     ← DFN Worldwide Publishing — all books
│   ├── designs.html        ← DFN Worldwide Designs — all merch
│   ├── devs.html           ← DFN Worldwide Devs — the working Discipline Tracker + tech stack
│   ├── services.html       ← Hire DFN Worldwide — quote form wired into the CRM pipeline
│   ├── portfolio.html      ← What DFN Worldwide has actually built
│   ├── faq.html            ← Frequently asked questions + quick-help links
│   ├── roadmap.html        ← Public-facing version of what's live/next
│   ├── changelog.html      ← Public-facing version history
│   ├── privacy.html        ← Privacy Policy (POPIA) — linked in every page's footer
│   └── terms.html          ← Terms of Service — linked in every page's footer
│
└── assets/images/          ← You supply these — see filenames below
    ├── logo1.webp
    ├── background1.webp
    ├── dfnchallenge.webp
    ├── records.webp
    ├── publishing.webp
    ├── designs.webp
    └── devs.webp
```

---

## Preview Before You Publish

Never push straight to the live site blind.

**Fastest:** double-click `index.html`. It opens in your browser exactly as visitors see it (the automation calls just won't fire, since those need a real webhook).

**Better**, if you have Python installed:
```bash
cd dfn
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

---

## Deploy to GitHub Pages — Starting From Zero

If you've never used GitHub before, start here. This is the whole path from "files on my PC" to "live at dfnworldwide.com," assuming nothing.

### Step 1 — Get a GitHub account
Go to `github.com` → sign up. Free.

### Step 2 — Create the repository
On GitHub, click **New repository** → name it `dfnworldwide` → keep it **Public** (required for free GitHub Pages) → don't add a README or .gitignore, you already have this one.

### Step 3 — Get your files onto GitHub (pick one)

**Method A — No software, fastest to start**
On your new repo's page, click **uploading an existing file**, drag in everything from this folder (`index.html`, `style.css`, `script.js`, the whole `pages/` folder, everything), click **Commit changes**. Done. Downside: every future edit means repeating this manual upload.

**Method B — GitHub Desktop (recommended — this is how you should actually run it)**
1. Download GitHub Desktop from `desktop.github.com` — a visual app, no typed commands
2. Sign in with your GitHub account
3. **Clone** your new repository — this downloads an empty folder linked to GitHub
4. Copy every file from this project into that folder
5. GitHub Desktop shows you what changed → type a short summary → **Commit to main** → **Push origin**
6. Your site updates automatically, every time, from here on

**Method C — Git command line**, if you're already comfortable with a terminal:
```bash
git add .
git commit -m "Describe what you changed"
git push
```

### Step 4 — Turn on GitHub Pages
Repo → **Settings** → **Pages** → Source: `main` branch → `/ (root)` → **Save**. Live in ~60 seconds at `https://[your-username].github.io/dfnworldwide`.

### Step 5 — Connect dfnworldwide.com
1. Same **Settings → Pages** screen → enter `dfnworldwide.com` under Custom Domain
2. At your domain registrar, add these DNS records:
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  [your-username].github.io
   ```
3. Allow up to 48 hours to propagate, then tick **Enforce HTTPS**

### The Daily Workflow, Forever
This is the entire loop, every time you want to change anything, for the rest of this site's life:
1. Open the project folder on your PC
2. Make the edit (see the Recipes below for exactly where)
3. Save the file
4. Open GitHub Desktop → **Commit to main** → **Push origin**
5. Live in about 60 seconds. No one else touches this. You don't need anyone.

---

## The Owner's Manual

Everything below is written so you never have to wait on anyone to change your own website.

### The Mental Model — Three Files, Three Jobs

- **`index.html` / `pages/*.html`** — *what exists on the page.* Every headline, button, image, section.
- **`style.css`** — *what it looks like.* Every color, spacing value, font, animation.
- **`script.js`** — *what it does.* Your links, the countdown, the forms, the slider, the AI chat.

Almost every edit you'll ever make lives in exactly ONE of these files. You rarely need to touch all three.

---

### Recipe 1 — Change any text on the site

Open the relevant `.html` file, search (Ctrl+F / Cmd+F) for the text you see on the live site, edit it between the tags, save.

```html
<!-- Before -->
<p class="hero-sub">Music · Books · Design · Technology · Legacy</p>

<!-- After -->
<p class="hero-sub">Music · Books · Design · Technology · Empire</p>
```

### Recipe 2 — Update any link (Spotify, Etsy, KDP...)

Every external link on the *entire site* lives in ONE place — the `DFN` object at the top of `script.js`. Change it once, it updates everywhere automatically.

```javascript
const DFN = {
  spotify: 'https://open.spotify.com/artist/YOUR_REAL_LINK',  // was '#'
  etsy:    'https://etsy.com/shop/YOUR_REAL_SHOP',             // was '#'
  ...
};
```

### Recipe 3 — Move the countdown to the next drop

In `script.js`, find:
```javascript
nextDrop:        new Date('2026-09-23T00:00:00+02:00'), // Rise Experience
nextDropName:    'The Rise Experience',
nextDropDateStr: 'Sep 23, 2026',
```
After September 23 passes, update all three lines together for the Legacy Experience — the date drives the countdown numbers, and the other two drive the banner's label text, so they can no longer drift out of sync with each other the way they used to.

### Recipe 4 — Add a product to the homepage slider

In `index.html`, find `id="slider-track"`. Copy one whole `<div class="slider-card">...</div>` block, paste it as a new sibling, edit the contents. The slider re-counts arrows and dots automatically — no JavaScript changes needed.

### Recipe 5 — Update a track listing

Track listings live in two places: the release block in `pages/records.html`, and — for the EP currently up next — the preview section on `index.html`. Search for the EP name to find both spots.

### Recipe 6 — Swap or add an image

Drop the new file into `assets/images/` using the *exact same filename* already referenced (e.g. replace `dfnchallenge.webp` with your real cover art, keeping that filename) — nothing else changes. To use a different filename, update the `src="..."` attribute everywhere it's referenced.

### Recipe 7 — Add a brand-new page

1. Copy `pages/designs.html` (the simplest template)
2. Rename the copy
3. Update the `<title>` and `<meta description>` in `<head>`
4. Update the nav links at the top of `<body>` — mark your new page active with `style="color:var(--gold)"`
5. Replace the `<section>` content with your new page's content
6. Link to it from `index.html`'s nav and footer

### Recipe 8 — Edit what the DFN AI chat says

In `script.js`, find `const AI_KB = [...]`. Each entry is `{ keys: [...], ans: '...' }`. `keys` are the trigger phrases, `ans` is the response. Add a new entry in the same shape, or edit an existing `ans`.

### Recipe 9 — Edit the Discipline Tracker's rules or daily tasks

In `pages/devs.html`, near the bottom, find `NN_LABELS` (the 4 daily non-negotiables) and `RULES` (the 8 DFN Rules) inside the `<script>` tag. Edit the array entries directly — the app re-renders from these automatically.

### Recipe 10 — Publish your changes

```bash
git add .
git commit -m "Describe what you changed"
git push
```
GitHub Pages rebuilds automatically within about a minute.

---

### What NOT to Touch Unless You're Comfortable With JavaScript

- Inside `function initSlider()`, `initModals()`, `initAIChat()` in `script.js` — this is *mechanism*, not content. A misplaced bracket here can silently break the whole page.
- The `:root { }` block at the top of `style.css` — these are the master brand variables. Changing `--gold` here changes gold *everywhere on the entire site at once.* Powerful — so change it on purpose, not by accident.
- The hidden `<input name="website">` field inside each form — that's not leftover debris, it's a spam honeypot (real visitors never see or fill it; bots that fill every field blindly get silently ignored). Leave it in place and empty.

### If Something Breaks

1. Open the page → right-click → **Inspect** → **Console** tab. Red text tells you what broke and on which line.
2. `git diff` shows exactly what you changed since the last working version.
3. `git checkout -- filename.html` reverts a single file to its last committed state if you want to undo an edit entirely.

---

## Brand System Reference

| Element | Value |
|---|---|
| Gold | `#C9A84C` |
| Gold Bright | `#FFD700` |
| Obsidian Black | `#080808` |
| Warm White | `#F0EAD6` |
| Display Font | Cormorant Garamond |
| UI Font | Barlow Condensed |
| Body Font | Barlow |
| Tagline | FROM NOTHING, BUILD EVERYTHING |

---

## Automation

Every form (email capture + contact form) posts to Formspree (`maqgbydo`, already live) and your n8n webhook. Full setup — connecting Google Sheets and Brevo — is in **`AUTOMATION_SETUP.md`**.

---

## Pre-Drop Maintenance Checklist

Run this before each of the three 2026 Experiences.

**30 days before:**
- [ ] Confirm all streaming/store links are real (no leftover `#` in `script.js`)
- [ ] Update `nextDrop` countdown target date
- [ ] Add real cover art / product images to `assets/images/`

**7 days before:**
- [ ] Submit a real test through every form — confirm it reaches Sheets + Brevo
- [ ] Proofread every page mentioning the drop
- [ ] Check for any lingering "Coming Soon" language that should now say "Live"

**Day of:**
- [ ] Flip status badges from `badge-soon` / `badge-announced` to `badge-live`
- [ ] Update division page status badges
- [ ] Post the announcement, then verify the live site reflects it

---

## Contact

DFN Worldwide PTY Ltd · Reg. 2026/408693/07
dfnworldwide@gmail.com · +27 83 682 1802
Tembisa, Gauteng, South Africa

*From Nothing — We Build Everything.*

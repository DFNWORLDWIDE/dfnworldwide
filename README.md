# DFN WORLDWIDE PTY LTD
### Official Website — `dfnworldwide.com`

> **From Nothing, Build Everything.**

---

## Company

**DFN Worldwide PTY Ltd**  
Registration No. `2026/408693/07`  
Registered with CIPC & SARS — 24 May 2026  
Tembisa, Gauteng, South Africa

℗ & © 2026 DFN Worldwide PTY Ltd. All Rights Reserved.

---

## Repository Structure

```
dfnworldwide/
│
├── index.html          ← Complete single-page headquarters
├── style.css           ← All styling — brand tokens, animations, responsive
├── script.js           ← All JavaScript — nav, parallax, forms, counters
├── README.md           ← This file
│
└── assets/
    └── images/
        ├── logo1.webp              ← DFN Globe logo (used in nav + favicon)
        ├── background1.webp        ← Hero background + founder portrait
        ├── dfnchallenge.webp       ← DFNCHALLENGE EP cover art (3000×3000)
        ├── records.webp            ← DFN Worldwide Records division image
        ├── publishing.webp         ← DFN Worldwide Publishing division + book cover
        ├── designs.webp            ← DFN Worldwide Designs division image
        └── devs.webp               ← DFN Worldwide Devs division image
```

> **All images are referenced but not included in the repo.**  
> Drop your `.webp` files into `assets/images/` using the exact filenames above.  
> The site degrades gracefully if images are missing — gradients are used as fallbacks.

---

## Deploy to GitHub Pages

### Step 1 — Push to your repo
```bash
git add .
git commit -m "DFN Worldwide headquarters v2.0"
git push origin main
```

### Step 2 — Enable GitHub Pages
1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select `main` branch → `/ (root)`
4. Click **Save**
5. Your site is live at `https://dfnworldwide.github.io/dfnworldwide` within ~60 seconds

### Step 3 — Connect your custom domain
1. In **Settings → Pages**, enter `dfnworldwide.com` under Custom Domain
2. At your domain registrar, add these DNS records:
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  dfnworldwide.github.io
   ```
3. Wait 24–48 hours for DNS propagation
4. Tick **Enforce HTTPS** once it's live

---

## Update Your Links

All links are centralised in `script.js` in the `DFN` config object at the top of the file.

```javascript
const DFN = {
  spotify:      '#',   // ← UPDATE: your Spotify artist URL
  appleMusic:   '#',   // ← UPDATE: your Apple Music URL
  amazonMusic:  '#',   // ← UPDATE: your Amazon Music URL
  kdpBook:      '#',   // ← UPDATE: your Amazon KDP book URL
  etsy:         '#',   // ← UPDATE: your Etsy store URL
  formAction:   'https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID',
  // ...
};
```

Change values here — they propagate to every button and link on the site automatically.

---

## Set Up Email Capture (Formspree)

The email forms will work once you connect Formspree (free):

1. Go to [formspree.io](https://formspree.io) → Create a free account
2. Create a new form → copy the endpoint URL (looks like `https://formspree.io/f/xyzabc`)
3. In `script.js`, replace `REPLACE_WITH_YOUR_FORM_ID` with your actual form ID
4. Push the change — forms are now live

Free tier: 50 submissions/month. Upgrade when you outgrow it.

---

## Add Your Images

Drop these exact files into `assets/images/`:

| Filename | What It Is | Recommended Size |
|---|---|---|
| `logo1.webp` | DFN Globe logo | 400×400px |
| `background1.webp` | Hero section bg + founder portrait | 1920×1080px |
| `dfnchallenge.webp` | EP cover art | 3000×3000px |
| `records.webp` | DFN Records division card | 800×600px |
| `publishing.webp` | DFN Publishing division + book cover | 800×600px |
| `designs.webp` | DFN Designs division card | 800×600px |
| `devs.webp` | DFN Devs division card | 800×600px |

All images use WebP format for optimal performance on GitHub Pages.

---

## Brand Identity

| Element | Value |
|---|---|
| Primary Gold | `#C9A84C` |
| Obsidian Black | `#080808` |
| Warm White | `#F0EAD6` |
| Display Font | Cormorant Garamond |
| UI Font | Barlow Condensed |
| Body Font | Barlow |
| Tagline | FROM NOTHING, BUILD EVERYTHING |

---

## Registrations

All music registered with **SAMRO · CAPASSO · SAMPRA · SoundExchange**  
Distributed via **RouteNote**  
Company registered with **CIPC & SARS**

---

## Founder

**Suave Melodies**  
Artist · Producer · System Builder · CEO  
DFN Worldwide PTY Ltd — Tembisa, South Africa

*"From nothing — we build everything."*

---

*℗ & © 2026 DFN Worldwide PTY Ltd · Reg. 2026/408693/07 · All Rights Reserved*

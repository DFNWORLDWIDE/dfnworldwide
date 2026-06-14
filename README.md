# DFN Worldwide — Official Website

The hub website for **DFN Worldwide PTY Ltd** (Reg. No. 2026/408693/07) and artist
**Suave Melodies**. Built as a static site for GitHub Pages — no build step required.

**Live principle:** Discipline From Nothing. Every page on this site reflects that.

---

## 🗂 Repository Structure

```
/
├── index.html              → Homepage / hub
├── css/
│   └── style.css           → Full design system (tokens, components, animations)
├── js/
│   ├── config.js           → ⭐ SINGLE SOURCE OF TRUTH — edit links/copy here
│   ├── script.js            → Shared site behavior (nav, scroll reveals, footer)
│   ├── home.js              → Renders the division grid on the homepage
│   ├── music.js             → Renders the tracklist on the music page
│   └── tracker.js           → Discipline Tracker app logic (localStorage)
├── pages/
│   ├── music.html           → Beat player / EP page
│   ├── books.html           → Book landing page
│   └── press.html           → Press kit
├── bio/
│   └── index.html           → Link-in-bio page
├── apps/
│   └── tracker/
│       └── index.html       → Discipline Tracker app
└── assets/
    └── images/               → Logos, banners, cover art
```

---

## ⭐ The Config File — `js/config.js`

This is the most important file in the repo. It controls:

- Brand name, tagline, founder info, legal/registration details
- All external links (Spotify, Gumroad, social media, etc.)
- Navigation menu items
- The four division cards on the homepage
- The featured release (EP title, tracklist, UPC, release date)
- The book details
- The founder story copy

**To update something across the whole site — including links, the EP tracklist,
or division descriptions — edit `js/config.js` once.** Pages that use
`data-dfn="..."` attributes or read `DFN_CONFIG` directly in their JS will update
automatically.

### Example: updating a link
```js
// js/config.js
links: {
  spotify: "https://open.spotify.com/artist/your-real-link",
  // ...
}
```

### Example: using config values in HTML
```html
<a data-dfn-href="links.spotify">Spotify</a>
<span data-dfn="brand.legalName"></span>
```

---

## 🎨 Design System

- **Palette:** near-black background (`#0A0A0A`), gold accent (`#D4AF37`),
  off-white text (`#F5F1E8`). Fully ATS/contrast-safe.
- **Display font:** Oswald (condensed, industrial — used for all headings)
- **Body font:** Inter
- **Mono/labels font:** JetBrains Mono (used for nav, labels, tags, eyebrows —
  ties into the "DFN Dev System" / terminal aesthetic)

All design tokens live at the top of `css/style.css` under `:root`. Change a
color or font there and it updates everywhere.

---

## ✨ Features & Animations

- **Hero text reveal** — "Discipline / From Nothing" animates in on load, line by line
- **Scanning line** — ambient gold scan line animates across the hero
- **Discipline meter** — animated progress bar in the hero, ties into the
  Discipline Tracker app
- **Scroll reveals** — sections and cards fade/slide in as you scroll
  (`IntersectionObserver`, respects `prefers-reduced-motion`)
- **Division dashboard grid** — homepage renders DFN's four divisions directly
  from `config.js`
- **Discipline Tracker app** — fully working daily checklist with streak
  tracking, saved to `localStorage` on the visitor's device
- **Mobile nav** — responsive hamburger menu under 860px
- **Back-to-top button** — appears after scrolling

---

## 🚀 Deploying to GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Set source to the `main` branch, root folder (`/`).
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

If deploying to a custom domain, update any absolute paths (`/index.html`,
`/pages/...`, etc.) if needed, or add a `CNAME` file with your domain.

---

## 🔧 Local Development

No build tools needed. To preview locally:

```bash
# From the repo root
python3 -m http.server 8080
# Visit http://localhost:8080
```

---

## 📋 To-Do / Roadmap

- [ ] Replace placeholder links in `js/config.js` with real URLs
      (Spotify, Apple Music, Instagram, TikTok, YouTube, X, Facebook)
- [ ] Add real cover art to `assets/images/` and reference it in
      `pages/music.html` (replace the `.release-art` placeholder)
- [ ] Add logo image assets and swap the text-based `.logo-mark` for an
      `<img>` if desired
- [ ] Connect streaming links once DFNCHALLENGE EP goes live (23 July 2026)
- [ ] Add DFN Fashion page once that division launches

---

**Discipline From Nothing.**

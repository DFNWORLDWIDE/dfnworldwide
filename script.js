/* ============================================================
   DFN WORLDWIDE PTY LTD — script.js v4.0
   Reg. 2026/408693/07 · Tembisa · FROM NOTHING, BUILD EVERYTHING
   ============================================================ */

/* ── CONFIG ─────────────────────────────────────────────────── */
const DFN = {
  // ── LIVE ENDPOINTS ──
  // Every form POSTs to every entry in this array — currently Formspree
  // (backup/notifications) and n8n (CRM automation). Production system;
  // do not remove. To add or swap a backend later (e.g. once Zoho CRM's
  // web forms are tested and approved), add/replace an entry here — no
  // other code needs to change, since submitToBackends() below just loops
  // this list. Keep the underlying automation swap isolated to this array.
  formSubmitTargets: [
    { name: 'formspree', url: 'https://formspree.io/f/maqgbydo', headers: { 'Content-Type': 'application/json', Accept: 'application/json' } },
    // Set this after creating your n8n webhook node:
    // Workflow URL: https://dfnworldwide.app.n8n.cloud/home/workflows
    { name: 'n8n', url: 'https://dfnworldwide.app.n8n.cloud/webhook/dfn-subscriber', headers: { 'Content-Type': 'application/json' } },
  ],

  // ── SOCIAL ──
  instagram:     'https://instagram.com/suavemelodies',
  tiktok:        'https://tiktok.com/@suavemelodies',
  youtube:       'https://youtube.com/@DFNWorldwide',
  twitter:       'https://twitter.com/DFNWorldwide',
  facebook:      'https://facebook.com/DFNWorldwide',
  linkedin:      'https://www.linkedin.com/in/suave-melodies-00b02739b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  github:        'https://github.com/dfnworldwide',

  // ── MUSIC ──  (update when live on platforms)
  spotify:       'https://open.spotify.com/album/14tUxXqebZGz7SgULhOA4j?si=RsWo8CPlSNqF20DBoX8Ofw&utm_source=copy-link',
  appleMusic:    '#',
  amazonMusic:   '#',
  audiomack:     'https://audiomack.com/suavemelodies',
  bandlab:       'https://www.bandlab.com/suavemelodies',
  beatstars:     'https://www.beatstars.com/suavemelodies',

  // ── PRODUCTS ──
  gumroad:       'https://suavemelodies.gumroad.com',
  kdpBook:       '#',   // update when KDP live
  etsy:          '#',   // update when Etsy store live

  // ── CONTACT ──
  email:         'mailto:dfnworldwide@gmail.com',
  emailRaw:      'dfnworldwide@gmail.com',
  whatsapp:      'https://wa.me/27836821802',

  // ── DROP DATES ──
  // Changing nextDrop used to require also hand-editing hardcoded banner text
  // in index.html — the two could silently fall out of sync. Now nextDropName
  // and nextDropDateStr drive that text directly, so there is one place to edit.
  nextDrop:        new Date('2026-09-23T00:00:00+02:00'), // Rise Experience
  nextDropName:    'The Rise Experience',
  nextDropDateStr: 'Sep 23, 2026',
};

/* ── MODAL DATA ─────────────────────────────────────────────── */
const MODALS = {
  reset: {
    badge:   '<span class="badge-pill badge-live">Live Now — July 23, 2026</span>',
    title:   'The Reset Experience',
    meta:    'July 23, 2026 · DFN Worldwide PTY Ltd',
    desc:    'The first landmark drop. The Blueprint and the Soundtrack to rebuild your life. Two products released simultaneously — the debut EP and the foundation book.',
    tracks:  [
      ['DFNCHALLENGE EP','3 tracks · Amapiano · UPC: 5064011441301'],
      ['DFN Challenge','ISRC: GXESV2676603 · 3:07'],
      ['DFN Story','ISRC: GXESV2685015 · 5:09'],
      ['DFN Legacy','ISRC: GXESV2600184 · 4:17'],
      ['Discipline From Nothing: The Reset System','Free eBook · 8 Chapters · Gumroad + KDP'],
    ],
    actions: [
      {label:'Stream DFNCHALLENGE',href:'pages/records.html',style:'btn-gold'},
      {label:'Download Free Book',href:'https://suavemelodies.gumroad.com',style:'btn-outline',external:true},
    ],
  },
  rise: {
    badge:   '<span class="badge-pill badge-soon">September 23, 2026</span>',
    title:   'The Rise Experience',
    meta:    'September 23, 2026 · DFN Worldwide PTY Ltd',
    desc:    'Three products. One night. The second chapter of the trilogy — the EP, the premium book, and the first DFN Worldwide apparel drop.',
    tracks:  [
      ['DFNSTORY EP','6 tracks · Amapiano · DFN Worldwide Records'],
      ['01. My Son\'s Will Know','DFNSTORY'],
      ['02. Nothing Was Given','DFNSTORY'],
      ['03. Pressure Made Me','DFNSTORY'],
      ['04. I Choose The Grind','DFNSTORY'],
      ['05. Zero Excuses','DFNSTORY'],
      ['06. DFN STORY II','DFNSTORY'],
      ['The System That Forces You To Win','16 Chapters · DFN Worldwide Publishing'],
      ['DFN Worldwide Hoodie','First Drop · Limited Run · ~R650'],
    ],
    actions: [
      {label:'Join the Waitlist',href:'#join',style:'btn-gold'},
      {label:'Preview the EP',href:'pages/records.html',style:'btn-outline'},
    ],
  },
  legacy: {
    badge:   '<span class="badge-pill badge-announced">November 23, 2026</span>',
    title:   'The Legacy Experience',
    meta:    'November 23, 2026 · DFN Worldwide PTY Ltd',
    desc:    'The trilogy concludes. The 8-track EP, the Artist Bible, and the DFN Artist System app release together as the closing chapter of the DFN 2026 journey.',
    tracks:  [
      ['DFNLEGACY EP','8 tracks · Amapiano · DFN Worldwide Records'],
      ['Tracks 1–8','TBA — announced closer to drop'],
      ['Artist Bible','DFN Worldwide Publishing · Independent artist operating manual'],
      ['DFN Artist System','DFN Worldwide Devs · App for independent artists'],
    ],
    actions: [
      {label:'Get Notified',href:'#join',style:'btn-gold'},
      {label:'View All Devs',href:'pages/devs.html',style:'btn-outline'},
    ],
  },
  ep1: {
    badge:   '<span class="badge-pill badge-live">Streaming Now</span>',
    title:   'DFNCHALLENGE EP',
    meta:    'July 23, 2026 · DFN Worldwide Records · Amapiano · 3 Tracks',
    desc:    'The debut. Three beats of amapiano and cinematic production built in Tembisa with no label, no budget, and no safety net. UPC: 5064011441301.',
    tracks:  [
      ['01. DFN CHALLENGE','3:07 · ISRC: GXESV2676603'],
      ['02. DFN STORY','5:09 · ISRC: GXESV2685015'],
      ['03. DFN LEGACY','4:17 · ISRC: GXESV2600184'],
    ],
    actions: [
      {label:'Stream on Spotify',href:'#',style:'btn-gold',dataLink:'spotify'},
      {label:'All Streaming Links',href:'pages/records.html',style:'btn-outline'},
    ],
  },
  ep2: {
    badge:   '<span class="badge-pill badge-soon">September 23, 2026</span>',
    title:   'DFNSTORY EP',
    meta:    'September 23, 2026 · DFN Worldwide Records · Amapiano · 6 Tracks',
    desc:    'Six tracks documenting what the discipline costs and what it builds. The sound of the rise — raw, honest, earned. Releasing as part of The Rise Experience.',
    tracks:  [
      ['01. My Son\'s Will Know','DFNSTORY'],
      ['02. Nothing Was Given','DFNSTORY'],
      ['03. Pressure Made Me','DFNSTORY'],
      ['04. I Choose The Grind','DFNSTORY'],
      ['05. Zero Excuses','DFNSTORY'],
      ['06. DFN STORY II','DFNSTORY'],
    ],
    actions: [
      {label:'Join the Waitlist',href:'#join',style:'btn-gold'},
      {label:'View All Music',href:'pages/records.html',style:'btn-outline'},
    ],
  },
  ep3: {
    badge:   '<span class="badge-pill badge-announced">November 23, 2026</span>',
    title:   'DFNLEGACY EP',
    meta:    'November 23, 2026 · DFN Worldwide Records · Amapiano · 8 Tracks',
    desc:    'The closing chapter of the trilogy. DFNLEGACY is not about the grind — it is about what remains when the grind is done. Track listing to be announced.',
    tracks:  [['8 Tracks','Track listing announced closer to November 23, 2026']],
    actions: [
      {label:'Get Notified',href:'#join',style:'btn-gold'},
      {label:'View All Music',href:'pages/records.html',style:'btn-outline'},
    ],
  },
  book2: {
    badge:   '<span class="badge-pill badge-soon">September 23, 2026</span>',
    title:   'The System That Forces You To Win',
    meta:    'September 23, 2026 · DFN Worldwide Publishing · 16 Chapters · Premium',
    desc:    'The complete system. 16 chapters across four parts: Destruction, Rebuild, Execution, Dominance. Five income pillars. The full blueprint for building an empire from scratch.',
    tracks:  [
      ['Part I — Destruction','Ch. 1–4 · Eliminate the false identity'],
      ['Part II — Rebuild','Ch. 5–8 · Install the daily system'],
      ['Part III — Execution','Ch. 9–12 · Deploy the five income pillars'],
      ['Part IV — Dominance','Ch. 13–16 · Scale, protect, legacy'],
    ],
    actions: [
      {label:'Join the Waitlist',href:'#join',style:'btn-gold'},
      {label:'View All Books',href:'pages/publishing.html',style:'btn-outline'},
    ],
  },
  book3: {
    badge:   '<span class="badge-pill badge-announced">November 23, 2026</span>',
    title:   'Artist Bible',
    meta:    'November 23, 2026 · DFN Worldwide Publishing',
    desc:    'Every system DFN Worldwide used to build a four-division company from a bedroom in Tembisa — distilled into one operating manual for independent artists. How to register rights, distribute music, write books, build your brand, and own everything.',
    tracks:  [
      ['Registration & IP','CIPC, SARS, SAMRO, CAPASSO, SAMPRA, SoundExchange'],
      ['Distribution','RouteNote, KDP, Gumroad, Printify — setup and optimization'],
      ['Brand Architecture','The DFN framework for independent creatives'],
      ['Revenue Systems','Five income pillars for the independent artist'],
    ],
    actions: [
      {label:'Get Notified',href:'#join',style:'btn-gold'},
      {label:'View All Books',href:'pages/publishing.html',style:'btn-outline'},
    ],
  },
};

/* ── DFN AI KNOWLEDGE BASE ──────────────────────────────────── */
// Each entry can carry an optional `nav` — { label, href } — which renders
// as a real button under the reply so the AI can actually take someone to
// the page it's talking about, instead of just describing where it is.
// Matching is deliberately simple substring matching on `keys`, run in
// order (first match wins) — it is a fast, dependency-free, zero-backend
// router, not real language understanding. Keep single-word keys specific
// enough that they won't false-match inside unrelated words (e.g. avoid
// bare 'app', which matches inside "happened", "happy", etc).
const AI_KB = [
  { keys:['what is dfn','who is dfn','about dfn','tell me about'],
    ans: 'DFN Worldwide is a registered South African multimedia company (Reg. 2026/408693/07) built from nothing in Tembisa, Gauteng. Four divisions: Records, Publishing, Designs, and Devs. Founded and operated by Suave Melodies. From Nothing, Build Everything.',
    nav: { label: 'About DFN', href: '#about' } },
  { keys:['three drops','2026 drops','experiences','release calendar'],
    ans: '3 drops in 2026:\n\n🔥 July 23 — The Reset Experience\nDFNCHALLENGE EP + Free Reset System Book\n\n⬆️ Sep 23 — The Rise Experience\nDFNSTORY EP (6 tracks) + Full System Book + DFN Hoodie\n\n🏆 Nov 23 — The Legacy Experience\nDFNLEGACY EP (8 tracks) + Artist Bible + DFN Artist System App',
    nav: { label: 'View Release Calendar', href: '#experiences' } },
  { keys:['free book','reset system','download','gumroad'],
    ans: 'The Reset System is 100% free. Download it now:\nsuavemelodies.gumroad.com\n\n8 chapters. The 15-Minute Reset. The 30-Day Protocol. Full worksheets. No credit card. No sign-up required.',
    nav: { label: 'Download Free Book', href: 'https://suavemelodies.gumroad.com', external: true } },
  { keys:['stream','spotify','music','listen','apple music','audiomack'],
    ans: 'DFNCHALLENGE EP is live on 40+ streaming platforms via RouteNote.\n\nSearch "DFNCHALLENGE" or "Suave Melodies" on Spotify, Apple Music, YouTube Music, Amazon Music, and Audiomack. Or visit dfnworldwide.com/pages/records.html for all links.',
    nav: { label: 'Open Records', href: 'pages/records.html' } },
  { keys:['dfnstory','story ep','6 tracks','september','rise experience'],
    ans: 'DFNSTORY EP — 6 tracks — dropping September 23, 2026 as part of The Rise Experience.\n\nTracklist:\n01. My Son\'s Will Know\n02. Nothing Was Given\n03. Pressure Made Me\n04. I Choose The Grind\n05. Zero Excuses\n06. DFN STORY II\n\nJoin the waitlist at #join to be first notified.',
    nav: { label: 'Join the Waitlist', href: '#join' } },
  { keys:['dfnlegacy','legacy ep','8 tracks','november'],
    ans: 'DFNLEGACY EP — 8 tracks — dropping November 23, 2026 as part of The Legacy Experience alongside the Artist Bible book and the DFN Artist System app. Track listing TBA.',
    nav: { label: 'Open Records', href: 'pages/records.html' } },
  { keys:['hoodie','merch','designs','apparel','clothing'],
    ans: 'The DFN Worldwide Signature Hoodie drops September 23, 2026 as part of The Rise Experience.\n\nOversized fit. DFN Globe chest-left. "FROM NOTHING, BUILD EVERYTHING" back. ~R650. Limited first run.\n\nJoin the waitlist to be notified: dfnworldwide.com/#join',
    nav: { label: 'Open Designs', href: 'pages/designs.html' } },
  { keys:['artist bible','artist system','legacy experience'],
    ans: 'The Legacy Experience (November 23, 2026) includes:\n\n📖 Artist Bible — every system DFN Worldwide used to build a four-division company, as an operating manual for independent artists.\n\n📱 DFN Artist System — the companion app. Coming November 23.',
    nav: { label: 'Open Publishing', href: 'pages/publishing.html' } },
  { keys:['discipline tracker','tracker app','free app'],
    ans: 'The DFN Discipline Tracker is live and free at dfnworldwide.com/pages/devs.html\n\nDaily non-negotiables. 30-day protocol tracker. 15-Minute Reset built in. Zero Score tracking. No account needed. No ads.',
    nav: { label: 'Open Discipline Tracker', href: 'pages/devs.html' } },
  { keys:['services','hire','freelance','web dev','website for my','build me a','fiverr','upwork'],
    ans: 'DFN Worldwide Devs takes on freelance web development work — the same stack that runs this site. Reach out directly with what you need and a timeline: dfnworldwide@gmail.com',
    nav: { label: 'Open Devs', href: 'pages/devs.html' } },
  { keys:['store','shop','buy merch','buy something','etsy','products page'],
    ans: 'Everything DFN Worldwide sells or gives away is on one page: the free book, DFNCHALLENGE streaming, beat licensing, the free Discipline Tracker, and what\'s coming next (the Hoodie and premium book, both September 23). Nothing there is fake — every card links to where that product actually lives.',
    nav: { label: 'Open the Store', href: 'pages/store.html' } },
  { keys:['contact','whatsapp','get in touch','reach you','reach out'],
    ans: 'Contact DFN Worldwide:\n\n📧 dfnworldwide@gmail.com\n📱 WhatsApp: +27 83 682 1802\n💼 LinkedIn: linkedin.com/in/suavemelodies\n📍 Tembisa, Gauteng, South Africa\n\nWe respond to every message within 24–48 hours.',
    nav: { label: 'Open Contact Form', href: '#contact' } },
  { keys:['samro','capasso','sampra','soundexchange','royalties','registered'],
    ans: 'DFN Worldwide Records is registered with:\n• SAMRO (performing rights)\n• CAPASSO (mechanical rights)\n• SAMPRA (neighbouring rights)\n• SoundExchange (US digital performance)\n\nDistributed via RouteNote across 40+ global stores. Reg. 2026/408693/07 — CIPC & SARS.' },
  { keys:['what is dfn ai','how does dfn ai work','are you real ai','are you gpt','how do you work','is this chatgpt'],
    ans: 'I\'m a fast, hand-built matching system, not a language model. No third-party AI API, nothing you type leaves your browser, zero cost to run. A real conversational upgrade is on the roadmap. Full honest breakdown on the DFN AI page.',
    nav: { label: 'How DFN AI Works', href: 'pages/ai.html' } },
  { keys:['suave melodies','founder','ceo','who made','creator'],
    ans: 'Suave Melodies is the founder and CEO of DFN Worldwide PTY Ltd. Independent creator, amapiano producer, and author from Tembisa, South Africa. Built the entire DFN Worldwide ecosystem solo — four divisions, three EP drops, three books, and a tech arm — with no external investment.',
    nav: { label: 'Meet the Founder', href: '#founder' } },
  { keys:['how to join','join the movement','movement','subscribe','email list'],
    ans: 'Join the DFN movement at dfnworldwide.com/#join\n\nYou get:\n✓ Free Reset System book instantly\n✓ Early access to every drop\n✓ DFN movement updates\n\nFree. No spam. Unsubscribe anytime.',
    nav: { label: 'Join Now', href: '#join' } },
];

function aiAnswer(q) {
  const lower = q.toLowerCase().trim();
  for (const item of AI_KB) {
    if (item.keys.some(k => lower.includes(k))) return { ans: item.ans, nav: item.nav || null };
  }
  return {
    ans: `Good question. For that one, reach out directly:\n📧 dfnworldwide@gmail.com\n\nOr explore the site — everything about DFN Worldwide is here. From Nothing, Build Everything.`,
    nav: { label: 'Open Contact Form', href: '#contact' },
  };
}

/* ── DOM READY ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initScrollReveal();
  initParallax();
  initCounters();
  initCountdown();
  initParticles();
  initEmailForms();
  initContactForm();
  injectExternalLinks();
  initSlider();
  initModals();
  initAIChat();
  initCursor();
  initScrollProgress();
  initMagneticBtns();
  initRipple();
  initPageTransitions();
  initCountdownBanner();
  initSearch();
  consoleSignature();
});

/* ── HEADER ─────────────────────────────────────────────────── */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const check = () => header.classList.toggle('scrolled', window.scrollY > 60);
  check();
  window.addEventListener('scroll', check, { passive: true });
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });
}

/* ── MOBILE NAV ─────────────────────────────────────────────── */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;
  const close = () => { nav.classList.remove('open'); toggle.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); document.body.style.overflow = ''; };
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(l => l.addEventListener('click', close));
  document.addEventListener('click', e => { const h = document.getElementById('site-header'); if (h && !h.contains(e.target)) close(); });
}

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('visible')); return; }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const sibs = [...(entry.target.parentElement?.querySelectorAll('.reveal') || [])];
      const idx  = sibs.indexOf(entry.target);
      const hasDelay = /reveal-delay-[1-4]/.test(entry.target.className);
      if (!hasDelay && idx > 0) entry.target.style.transitionDelay = `${idx * 0.09}s`;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ── PARALLAX ───────────────────────────────────────────────── */
function initParallax() {
  const bg = document.getElementById('hero-bg');
  if (!bg || window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        const heroH = document.getElementById('hero')?.offsetHeight || 0;
        if (sy < heroH) bg.style.transform = `scale(1.08) translateY(${sy * 0.38}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ── PARTICLES ──────────────────────────────────────────────── */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container || window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const count = window.innerWidth < 768 ? 18 : 36;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const dur  = Math.random() * 12 + 8;
    const delay= Math.random() * 10;
    p.style.cssText = `position:absolute;border-radius:50%;background:var(--gold);width:${size}px;height:${size}px;left:${left}%;bottom:-5px;opacity:0;animation:particleFloat ${dur}s ${delay}s linear infinite`;
    container.appendChild(p);
  }
}

/* ── COUNTERS ───────────────────────────────────────────────── */
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.6 });
  els.forEach(el => obs.observe(el));
}
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const dur    = 1800, start = performance.now();
  const tick   = now => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = `${Math.round((1 - Math.pow(1-p, 3)) * target * 10) / 10}${suffix}`;
    if (p < 1) requestAnimationFrame(tick); else el.textContent = `${target}${suffix}`;
  };
  requestAnimationFrame(tick);
}

/* ── COUNTDOWN TO NEXT DROP ─────────────────────────────────── */
function initCountdown() {
  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hrs');
  const mEl = document.getElementById('cd-min');
  const sEl = document.getElementById('cd-sec');
  if (!dEl) return;

  // Drive the banner's label/date text from config so it can never drift
  // out of sync with the actual nextDrop date the way hardcoded HTML could.
  const nameEl = document.getElementById('cd-name');
  const dateEl = document.getElementById('cd-date');
  if (nameEl) nameEl.textContent = DFN.nextDropName + ' —';
  if (dateEl) dateEl.textContent = '— ' + DFN.nextDropDateStr;

  const tick = () => {
    const diff = DFN.nextDrop - Date.now();
    if (diff <= 0) { dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00'; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);
    dEl.textContent = String(d).padStart(2,'0');
    hEl.textContent = String(h).padStart(2,'0');
    mEl.textContent = String(m).padStart(2,'0');
    sEl.textContent = String(s).padStart(2,'0');
  };
  tick();
  setInterval(tick, 1000);
}

/* ── COUNTDOWN BANNER CLOSE ─────────────────────────────────── */
function initCountdownBanner() {
  const btn    = document.getElementById('countdown-close');
  const banner = document.getElementById('countdown-banner');
  if (!btn || !banner) return;
  if (sessionStorage.getItem('dfn-banner-closed')) banner.style.display = 'none';
  btn.addEventListener('click', () => {
    banner.style.opacity = '0';
    banner.style.transition = 'opacity 0.3s ease';
    setTimeout(() => { banner.style.display = 'none'; }, 300);
    sessionStorage.setItem('dfn-banner-closed','1');
  });
}

/* ── SITE SEARCH ─────────────────────────────────────────────── */
// A hardcoded index, filtered client-side — matches the AI_KB pattern
// elsewhere in this file: fast, zero-backend, easy to extend by hand.
// URLs are written root-relative (as if called from index.html); resolveSearchUrl()
// adjusts them on the fly depending on whether the current page lives at
// the root or inside /pages/, so the same index works everywhere.
const SEARCH_INDEX = [
  { title: 'Home', desc: 'DFN Worldwide homepage', url: 'index.html', keys: 'home start dfn worldwide' },
  { title: 'About DFN Worldwide', desc: 'Company overview and registration', url: 'index.html#about', keys: 'about company registration reg number' },
  { title: 'Release Calendar', desc: 'The three 2026 Experiences', url: 'index.html#experiences', keys: 'experiences drops release calendar reset rise legacy' },
  { title: 'DFN Worldwide Records', desc: 'Music — DFNCHALLENGE, DFNSTORY, DFNLEGACY', url: 'pages/records.html', keys: 'records music ep spotify stream amapiano dfnchallenge dfnstory dfnlegacy' },
  { title: 'DFN Worldwide Publishing', desc: 'Books — The Reset System and beyond', url: 'pages/publishing.html', keys: 'publishing books reset system artist bible' },
  { title: 'DFN Worldwide Designs', desc: 'Apparel — the DFN Hoodie', url: 'pages/designs.html', keys: 'designs merch hoodie apparel clothing' },
  { title: 'DFN Worldwide Devs', desc: 'Discipline Tracker app and tech stack', url: 'pages/devs.html', keys: 'devs discipline tracker app software tech stack' },
  { title: 'Discipline Tracker', desc: 'Free daily habit tracker', url: 'pages/devs.html#tracker', keys: 'tracker discipline daily habit free app' },
  { title: 'Services', desc: 'Hire DFN Worldwide — web dev, AI, design, publishing', url: 'pages/services.html', keys: 'services hire freelance fiverr upwork quote website development' },
  { title: 'Store', desc: 'Every DFN Worldwide product in one place', url: 'pages/store.html', keys: 'store shop buy products merch catalog' },
  { title: 'DFN AI', desc: 'The AI assistant built into every page', url: 'pages/ai.html', keys: 'ai artificial intelligence chat assistant voice how it works' },
  { title: 'Portfolio', desc: 'What DFN Worldwide has actually built', url: 'pages/portfolio.html', keys: 'portfolio work proof case study' },
  { title: 'FAQ & Support', desc: 'Common questions, answered', url: 'pages/faq.html', keys: 'faq help support questions answers' },
  { title: 'Roadmap', desc: 'What\'s live and what\'s next', url: 'pages/roadmap.html', keys: 'roadmap future plans upcoming' },
  { title: 'Changelog', desc: 'Version history', url: 'pages/changelog.html', keys: 'changelog version history updates' },
  { title: 'Free Book — The Reset System', desc: 'Download free on Gumroad', url: 'https://suavemelodies.gumroad.com', keys: 'free book download gumroad reset system' },
  { title: 'Contact', desc: 'Get in touch with DFN Worldwide', url: 'index.html#contact', keys: 'contact email whatsapp reach message' },
  { title: 'Join the Movement', desc: 'Get the free book, join the list', url: 'index.html#join', keys: 'join subscribe email list movement' },
  { title: 'Press & Media', desc: 'Media kit and press contacts', url: 'index.html#press', keys: 'press media kit journalist' },
  { title: 'Partnerships', desc: 'Sponsor and brand partner tiers', url: 'index.html#sponsors', keys: 'partnerships sponsors brand deal' },
  { title: 'Suave Melodies', desc: 'Founder & CEO', url: 'index.html#founder', keys: 'founder ceo suave melodies about' },
  { title: 'Privacy Policy', desc: 'How your data is handled', url: 'pages/privacy.html', keys: 'privacy policy popia data' },
  { title: 'Terms of Service', desc: 'Site terms', url: 'pages/terms.html', keys: 'terms service legal' },
];

function resolveSearchUrl(url) {
  if (/^https?:\/\//.test(url)) return url;
  const inPages = location.pathname.includes('/pages/');
  if (!inPages) return url;
  if (url.startsWith('pages/')) return url.slice('pages/'.length);
  if (url.startsWith('index.html')) return '../' + url;
  return url;
}

function initSearch() {
  const btn = document.getElementById('nav-search-btn');
  if (!btn) return;

  let overlay = null, input = null, results = null, lastFocus = null;

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Search DFN Worldwide');
    overlay.innerHTML = `
      <div class="search-box">
        <div class="search-input-row">
          <svg class="icon" aria-hidden="true"><use href="#i-search"/></svg>
          <input type="text" class="search-input" placeholder="Search music, books, services, pages..." aria-label="Search">
          <button class="search-close" aria-label="Close search">&times;</button>
        </div>
        <div class="search-results" role="listbox"></div>
      </div>`;
    document.body.appendChild(overlay);
    input   = overlay.querySelector('.search-input');
    results = overlay.querySelector('.search-results');

    overlay.querySelector('.search-close').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    input.addEventListener('input', () => render(input.value));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });
  }

  function render(query) {
    const q = query.trim().toLowerCase();
    const matches = q
      ? SEARCH_INDEX.filter(item => item.keys.includes(q) || item.title.toLowerCase().includes(q)).slice(0, 8)
      : SEARCH_INDEX.slice(0, 6);
    results.innerHTML = matches.length ? matches.map(item => `
      <a class="search-result" href="${resolveSearchUrl(item.url)}"${item.url.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>
        <span class="search-result-title">${item.title}</span>
        <span class="search-result-desc">${item.desc}</span>
      </a>`).join('') : '<p class="search-empty">Nothing found. Try a different word, or <a href="' + (location.pathname.includes('/pages/') ? '../index.html' : 'index.html') + '#contact">ask us directly</a>.</p>';
  }

  function open_() {
    if (!overlay) build();
    lastFocus = document.activeElement;
    render('');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 50);
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  btn.addEventListener('click', open_);
  // Keyboard shortcut: "/" opens search, same convention as most modern sites.
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      open_();
    }
  });
}

/* ── EMAIL FORMS (hero + join) ──────────────────────────────── */
function initEmailForms() {
  [['hero-email','hero-submit'], ['join-email','join-submit']].forEach(([inId, btnId]) => {
    const input = document.getElementById(inId);
    const btn   = document.getElementById(btnId);
    if (!input || !btn) return;
    btn.addEventListener('click', () => submitEmail(input, 'hero_join'));
    input.addEventListener('keydown', e => { if (e.key === 'Enter') submitEmail(input, 'hero_join'); });
  });
}

/* Fires payload at every configured backend in DFN.formSubmitTargets.
   Fire-and-forget by design (matches the site's existing no-backend model —
   see README) — a failed backend never blocks the user-facing confirmation.
   Adding/replacing a backend (Zoho or otherwise) means editing the config
   array once; this function and every caller stay unchanged. */
async function submitToBackends(payload) {
  await Promise.all(DFN.formSubmitTargets.map(target =>
    fetch(target.url, { method: 'POST', headers: target.headers, body: JSON.stringify(payload) }).catch(() => {})
  ));
}

async function submitEmail(inputEl, source = 'website') {
  const email = inputEl.value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    inputEl.style.borderColor = '#e53935';
    inputEl.focus();
    setTimeout(() => inputEl.style.borderColor = '', 1800);
    showToast('Please enter a valid email address.');
    return;
  }

  // Honeypot: a field named "website" is hidden from real visitors with CSS
  // but visible to most form-filling bots. If it's filled in, silently drop
  // the submission — pretend success so the bot doesn't learn to adapt.
  const honeypotId = inputEl.id === 'hero-email' ? 'hero-website' : 'join-website';
  const honeypot   = document.getElementById(honeypotId);
  if (honeypot && honeypot.value.trim()) {
    inputEl.value = '';
    showToast('Welcome to the movement. The Reset System is in your inbox.');
    return;
  }

  const payload = { email, source, type: 'subscriber', timestamp: new Date().toISOString(), site: 'dfnworldwide.com' };
  await submitToBackends(payload);

  inputEl.value = '';
  showToast('Welcome to the movement. The Reset System is in your inbox.');
  setTimeout(() => window.open(DFN.gumroad, '_blank', 'noopener'), 900);
}

/* ── CONTACT FORM ───────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('contact-submit');

    // Honeypot — see submitEmail() for the same pattern.
    const honeypot = document.getElementById('cf-website');
    if (honeypot && honeypot.value.trim()) {
      form.reset();
      showToast('Message sent. We respond within 24–48 hours.');
      return;
    }

    const data = {
      name:        document.getElementById('cf-name')?.value.trim(),
      email:       document.getElementById('cf-email')?.value.trim(),
      // NOTE: this field is intentionally named enquiryType, not "type".
      // The n8n payload below also needs a top-level "type" of its own
      // (subscriber vs. contact, used for CRM routing). Those two concepts
      // used to share the same field name — the spread below silently
      // overwrote the real enquiry type ("press", "sponsor", etc.) with the
      // literal string "contact" on every single submission, so the CRM
      // sheet and the team notification email always showed "contact"
      // instead of what the person actually selected. Keeping the field
      // names distinct fixes that at the source.
      enquiryType: document.getElementById('cf-type')?.value,
      subject:     document.getElementById('cf-subject')?.value.trim(),
      message:     document.getElementById('cf-message')?.value.trim(),
      source:      'contact_form',
      type:        'contact',
      timestamp:   new Date().toISOString(),
      site:        'dfnworldwide.com',
    };
    if (!data.name || !data.email || !data.message) {
      showToast('Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      showToast('Please enter a valid email address.');
      document.getElementById('cf-email')?.focus();
      return;
    }
    if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

    await submitToBackends(data);

    form.reset();
    if (btn) { btn.textContent = 'Message Sent'; btn.disabled = false; setTimeout(() => { btn.textContent = 'Send Message'; }, 3000); }
    showToast('Message sent. We respond within 24–48 hours.');
  });
}

/* ── EXTERNAL LINKS ─────────────────────────────────────────── */
function injectExternalLinks() {
  document.querySelectorAll('[data-link]').forEach(el => {
    const href = DFN[el.getAttribute('data-link')];
    if (!href || href === '#') return;
    if (el.tagName === 'A') {
      el.href = href;
      if (!href.startsWith('mailto:')) { el.target = '_blank'; el.rel = 'noopener noreferrer'; }
    }
  });
}

/* ── PRODUCT SLIDER ─────────────────────────────────────────── */
function initSlider() {
  const track = document.getElementById('slider-track');
  const prev  = document.getElementById('slider-prev');
  const next  = document.getElementById('slider-next');
  const dotsC = document.getElementById('slider-dots');
  if (!track || !prev || !next) return;

  const cards   = [...track.querySelectorAll('.slider-card')];
  const visible = () => window.innerWidth < 580 ? 1 : window.innerWidth < 900 ? 2 : 3;
  let current   = 0;
  let startX    = 0;
  let dragging  = false;

  function maxIdx() { return Math.max(0, cards.length - visible()); }
  function cardW()  {
    if (!cards[0]) return 0;
    const g = parseFloat(getComputedStyle(track).gap) || 24;
    return cards[0].offsetWidth + g;
  }

  // Build dots
  function buildDots() {
    if (!dotsC) return;
    dotsC.innerHTML = '';
    const total = maxIdx() + 1;
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'slider-dot' + (i === current ? ' active' : '');
      d.setAttribute('aria-label', `Slide ${i+1}`);
      d.addEventListener('click', () => goTo(i));
      dotsC.appendChild(d);
    }
  }

  function updateDots() {
    if (!dotsC) return;
    dotsC.querySelectorAll('.slider-dot').forEach((d,i) => d.classList.toggle('active', i === current));
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIdx()));
    track.style.transform = `translateX(${-current * cardW()}px)`;
    prev.disabled = current === 0;
    next.disabled = current >= maxIdx();
    updateDots();
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));

  // Touch / swipe
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; dragging = true; }, { passive: true });
  track.addEventListener('touchend',   e => {
    if (!dragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    dragging = false;
  });

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  buildDots();
  goTo(0);
  window.addEventListener('resize', () => { buildDots(); goTo(Math.min(current, maxIdx())); });
}

/* ── MODAL SYSTEM ───────────────────────────────────────────── */
let _modalOpenedBy = null;

function openModal(id) {
  const data    = MODALS[id]; if (!data) return;
  const backdrop = document.getElementById('modal-backdrop');
  const img      = document.getElementById('modal-img');
  const badge    = document.getElementById('modal-badge');
  const title    = document.getElementById('modal-title');
  const meta     = document.getElementById('modal-meta');
  const desc     = document.getElementById('modal-desc');
  const tlEl     = document.getElementById('modal-tracklist');
  const actEl    = document.getElementById('modal-actions');
  if (!backdrop) return;

  _modalOpenedBy = document.activeElement;

  if (badge)  badge.innerHTML  = data.badge  || '';
  if (title)  title.textContent = data.title  || '';
  if (meta)   meta.textContent  = data.meta   || '';
  if (desc)   desc.textContent  = data.desc   || '';
  if (img)    { img.src = ''; img.style.display = 'none'; }

  if (tlEl) {
    tlEl.innerHTML = '';
    if (data.tracks?.length) {
      const list = document.createElement('div');
      list.className = 'modal-tracks';
      data.tracks.forEach(([name, detail]) => {
        list.innerHTML += `<div class="m-track"><span class="m-track-name">${name}</span><span style="color:var(--muted);font-size:0.78rem">${detail}</span></div>`;
      });
      tlEl.appendChild(list);
    }
  }

  if (actEl) {
    actEl.innerHTML = '';
    (data.actions || []).forEach(a => {
      const btn = document.createElement('a');
      btn.href        = a.href || '#';
      btn.className   = `btn ${a.style || 'btn-outline'}`;
      btn.textContent = a.label;
      if (a.external) { btn.target = '_blank'; btn.rel = 'noopener'; }
      actEl.appendChild(btn);
    });
    // Share button — native share sheet where supported, copy-link fallback elsewhere.
    const shareBtn = document.createElement('button');
    shareBtn.type = 'button';
    shareBtn.className = 'btn btn-ghost';
    shareBtn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-share"/></svg>';
    shareBtn.setAttribute('aria-label', 'Share');
    shareBtn.addEventListener('click', async () => {
      const shareData = { title: `${data.title} — DFN Worldwide`, text: data.desc, url: location.href.split('#')[0] };
      if (navigator.share) { try { await navigator.share(shareData); } catch (_) {} }
      else if (navigator.clipboard) {
        try { await navigator.clipboard.writeText(shareData.url); showToast('Link copied.'); } catch (_) {}
      }
    });
    actEl.appendChild(shareBtn);
  }

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
  const closeBtnEl = document.getElementById('modal-close');
  if (closeBtnEl) closeBtnEl.focus();
}

function initModals() {
  const backdrop = document.getElementById('modal-backdrop');
  const box       = document.getElementById('modal-box');
  const closeBtn = document.getElementById('modal-close');
  if (!backdrop) return;

  const close = () => {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    // Return focus to whatever triggered the modal (a slider card, an
    // experience card, etc.) so keyboard users don't lose their place.
    if (_modalOpenedBy && typeof _modalOpenedBy.focus === 'function') _modalOpenedBy.focus();
    _modalOpenedBy = null;
  };
  if (closeBtn) closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });

  document.addEventListener('keydown', e => {
    if (!backdrop.classList.contains('open')) return;
    if (e.key === 'Escape') { close(); return; }
    // Trap Tab focus inside the modal while it's open.
    if (e.key === 'Tab' && box) {
      const focusable = box.querySelectorAll('a[href], button:not([disabled])');
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

/* ── DFN AI CHAT ─────────────────────────────────────────────── */
function initAIChat() {
  const trigger    = document.getElementById('dfn-ai-trigger');
  const panel      = document.getElementById('dfn-ai-panel');
  const closeBtn   = document.getElementById('dfn-ai-close');
  const input      = document.getElementById('dfn-ai-input');
  const sendBtn    = document.getElementById('dfn-ai-send');
  const micBtn     = document.getElementById('dfn-ai-mic');
  const voiceToggle= document.getElementById('dfn-ai-voice-toggle');
  const msgs       = document.getElementById('dfn-ai-messages');
  const quick      = document.getElementById('dfn-ai-quick');
  if (!trigger || !panel) return;

  const open  = () => { panel.classList.add('open'); trigger.setAttribute('aria-expanded','true'); if (input) setTimeout(() => input.focus(), 300); };
  const close = () => { panel.classList.remove('open'); trigger.setAttribute('aria-expanded','false'); };
  trigger.addEventListener('click', () => panel.classList.contains('open') ? close() : open());
  if (closeBtn) closeBtn.addEventListener('click', close);

  // ── Voice output (speechSynthesis) — off by default, no backend, no API key.
  // Browsers without support simply never show the toggle (feature-detected below).
  let speakReplies = false;
  function speak(text) {
    if (!speakReplies || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, ''));
    u.rate = 1.02;
    window.speechSynthesis.speak(u);
  }
  if (voiceToggle && 'speechSynthesis' in window) {
    voiceToggle.hidden = false;
    voiceToggle.addEventListener('click', () => {
      speakReplies = !speakReplies;
      voiceToggle.classList.toggle('active', speakReplies);
      voiceToggle.setAttribute('aria-pressed', String(speakReplies));
      voiceToggle.setAttribute('aria-label', speakReplies ? 'Mute spoken replies' : 'Read replies aloud');
      if (!speakReplies) window.speechSynthesis.cancel();
    });
  }

  // ── Voice input (Web Speech API) — same rule: hidden entirely if unsupported.
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (micBtn && SpeechRec) {
    micBtn.hidden = false;
    const recognition = new SpeechRec();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    let listening = false;
    micBtn.addEventListener('click', () => {
      if (listening) { recognition.stop(); return; }
      try { recognition.start(); listening = true; micBtn.classList.add('listening'); }
      catch (_) { /* already started — ignore */ }
    });
    recognition.addEventListener('result', e => {
      const heard = e.results?.[0]?.[0]?.transcript;
      if (heard && input) { input.value = heard; ask(heard); }
    });
    const stopListening = () => { listening = false; micBtn.classList.remove('listening'); };
    recognition.addEventListener('end', stopListening);
    recognition.addEventListener('error', stopListening);
  }

  function addMsg(text, who, nav) {
    if (!msgs) return;
    const wrap   = document.createElement('div');
    wrap.className = `chat-msg ${who}`;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.style.whiteSpace = 'pre-wrap';
    bubble.textContent = text;
    wrap.appendChild(bubble);

    // Real navigation action, not just a description of where to go.
    // resolveSearchUrl() (defined for site search) handles the same depth-aware
    // resolution here — this widget now runs on every page, not just index.html,
    // so a bare 'pages/records.html' or 'index.html#about' needs adjusting
    // depending on where the chat is actually open.
    if (nav && nav.href) {
      const a = document.createElement('a');
      a.className = 'chat-action-btn';
      const isHash = nav.href.startsWith('#');
      a.href = isHash ? nav.href : resolveSearchUrl(nav.href);
      a.textContent = nav.label + ' →';
      if (nav.external) { a.target = '_blank'; a.rel = 'noopener'; }
      else if (isHash) {
        a.addEventListener('click', e => {
          e.preventDefault();
          const el = document.querySelector(nav.href);
          if (el) {
            close();
            window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
          } else {
            // Section doesn't exist on this page (e.g. #founder only lives on
            // index.html) — go to index.html with the hash instead of silently
            // doing nothing, which is what a dangling in-page anchor did before.
            window.location.href = resolveSearchUrl('index.html' + nav.href);
          }
        });
      }
      wrap.appendChild(a);
    }

    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const t = document.createElement('div');
    t.className = 'chat-typing'; t.id = 'typing-indicator';
    t.innerHTML = '<span></span><span></span><span></span>';
    if (msgs) { msgs.appendChild(t); msgs.scrollTop = msgs.scrollHeight; }
    return t;
  }

  async function ask(q) {
    if (!q.trim()) return;
    addMsg(q, 'user');
    if (quick) quick.style.display = 'none';
    if (input) input.value = '';
    const typing = showTyping();
    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    typing.remove();
    const { ans, nav } = aiAnswer(q);
    addMsg(ans, 'bot', nav);
    speak(ans);
  }

  if (sendBtn) sendBtn.addEventListener('click', () => { if (input) ask(input.value); });
  if (input)   input.addEventListener('keydown', e => { if (e.key === 'Enter') ask(input.value); });

  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => { if (!panel.classList.contains('open')) open(); ask(btn.dataset.q || btn.textContent); });
  });
}

/* ── CUSTOM CURSOR ──────────────────────────────────────────── */
function initCursor() {
  if (window.matchMedia('(hover:none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  let mx=0, my=0, rx=0, ry=0, rafId=null;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; dot.style.transform=`translate(${mx}px,${my}px)`; });
  const loop = () => {
    rx += (mx-rx)*0.12; ry += (my-ry)*0.12;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    rafId = requestAnimationFrame(loop);
  };
  loop();
  // The lerp loop above ran unconditionally forever, including on a backgrounded
  // tab — real, needless CPU/battery cost. Pause it when the tab isn't visible,
  // resume from wherever the cursor actually is when it comes back.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(rafId); }
    else { loop(); }
  });
  const grow = 'a,button,.btn,.division-card,.slider-card,.experience-card,.social-btn,.quick-btn';
  document.querySelectorAll(grow).forEach(el => {
    el.addEventListener('mouseenter', () => { ring.classList.add('cursor-ring--hover'); dot.classList.add('cursor-dot--hover'); });
    el.addEventListener('mouseleave', () => { ring.classList.remove('cursor-ring--hover'); dot.classList.remove('cursor-dot--hover'); });
  });
  document.addEventListener('mouseleave', () => { dot.style.opacity='0'; ring.style.opacity='0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity='1'; ring.style.opacity='1'; });
}

/* ── SCROLL PROGRESS ─────────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = `${Math.min(pct,100)}%`;
  }, { passive: true });
}

/* ── MAGNETIC BUTTONS ────────────────────────────────────────── */
function initMagneticBtns() {
  if (window.matchMedia('(hover:none)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  document.querySelectorAll('.btn-gold,.btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.22;
      const y = (e.clientY - r.top  - r.height / 2) * 0.22;
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.5s var(--ease-spring)';
      btn.style.transform  = '';
      setTimeout(() => btn.style.transition = '', 500);
    });
  });
}

/* ── RIPPLE EFFECT ───────────────────────────────────────────── */
function initRipple() {
  document.querySelectorAll('.btn-gold,.btn-outline,.btn-ghost').forEach(btn => {
    btn.addEventListener('click', e => {
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2;
      const rpl  = document.createElement('span');
      rpl.className = 'ripple-wave';
      rpl.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px`;
      btn.style.position = 'relative'; btn.style.overflow = 'hidden';
      btn.appendChild(rpl);
      rpl.addEventListener('animationend', () => rpl.remove());
    });
  });
}

/* ── PAGE TRANSITIONS ────────────────────────────────────────── */
function initPageTransitions() {
  const overlay = document.getElementById('page-overlay');
  if (!overlay) return;
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http') || href.startsWith('tel') || a.getAttribute('target') === '_blank') return;
    a.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.add('active');
      setTimeout(() => { window.location.href = href; }, 350);
    });
  });
  window.addEventListener('pageshow', () => overlay.classList.remove('active'));
}

/* ── ACTIVE NAV ──────────────────────────────────────────────── */
const _sectionIds = ['about','experiences','divisions','products-slider','philosophy','founder','press','sponsors','contact','join'];
const _navLinks   = document.querySelectorAll('.main-nav a, .mobile-nav a');
if ('IntersectionObserver' in window) {
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      _navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { threshold: 0.4 });
  _sectionIds.forEach(id => { const el = document.getElementById(id); if (el) navObs.observe(el); });
}

/* ── TOAST ───────────────────────────────────────────────────── */
let _toastTimer = null;
function showToast(msg, dur = 4000) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), dur);
}

/* ── CONSOLE SIGNATURE ───────────────────────────────────────── */
function consoleSignature() {
  console.log('%c DFN WORLDWIDE PTY LTD ','background:#C9A84C;color:#080808;font-size:14px;font-weight:bold;padding:8px 20px;');
  console.log('%c FROM NOTHING, BUILD EVERYTHING ','color:#C9A84C;font-size:11px;letter-spacing:4px;');
  console.log('%c Reg. 2026/408693/07 · Tembisa, South Africa · dfnworldwide.com','color:#555;font-size:10px;');
}

/* ── EXPOSE openModal GLOBALLY ───────────────────────────────── */
window.openModal = openModal;

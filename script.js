/* ============================================================
   DFN WORLDWIDE PTY LTD — script.js
   ℗ & © 2026 DFN Worldwide PTY Ltd. All Rights Reserved.
   Reg. 2026/408693/07 · Tembisa, South Africa
   FROM NOTHING, BUILD EVERYTHING
   ============================================================ */

/* ── CONFIG — UPDATE YOUR LINKS HERE ────────────────────────
   Change values once — they propagate everywhere on the site.
   ─────────────────────────────────────────────────────────── */
const DFN = {
  // Social
  instagram:    'https://instagram.com/suavemelodies',
  tiktok:       'https://tiktok.com/@suavemelodies',
  youtube:      'https://youtube.com/@DFNWorldwide',
  twitter:      'https://twitter.com/DFNWorldwide',
  facebook:     'https://facebook.com/DFNWorldwide',
  github:       'https://dfnworldwide.github.io/dfnworldwide',

  // Music — update when live on each platform
  spotify:      'https://open.spotify.com/user/31orpyszlrk4ivbqq6n3zcfczdie?si=oIy8F3-zQByu85MWBjKTuA',   // UPDATE: https://open.spotify.com/artist/...
  appleMusic:   '#',   // UPDATE when live
  amazonMusic:  '#',   // UPDATE when live
  bandlab:      'https://www.bandlab.com/suavemelodies',
  beatstars:    'https://www.beatstars.com/suavemelodies',

  // Store
  gumroad:      'https://dfnworldwide.gumroad.com/l/bsawq',
  kdpBook:      '#',   // UPDATE when KDP page is live
  etsy:         '#',   // UPDATE when Etsy store is live

  // Contact
  email:        'mailto:dfnworldwide@gmail.com',
  whatsapp:     'https://wa.me/27836821802',
  website:      'https://dfnworldwide.com',

  // Email form — replace with your Formspree endpoint
  // 1. Go to formspree.io → New Form
  // 2. Paste the form URL here
  // 3. Forms are free up to 50 submissions/month
  formAction:   'https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID',
};

/* ── DOM READY ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initScrollReveal();
  initParallax();
  initCounters();
  initEmailForms();
  injectExternalLinks();
  initToast();
  consoleSignature();
});

/* ── HEADER SCROLL STATE ────────────────────────────────────── */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  onScroll(); // run once on load

  window.addEventListener('scroll', onScroll, { passive: true });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── MOBILE NAV ─────────────────────────────────────────────── */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav    = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    const header = document.getElementById('site-header');
    if (header && !header.contains(e.target) && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // Stagger siblings that are all .reveal inside the same parent
      const parent   = entry.target.parentElement;
      const siblings = parent ? [...parent.querySelectorAll('.reveal')] : [];
      const idx      = siblings.indexOf(entry.target);

      // Only apply stagger if we haven't set a manual delay class
      const hasManualDelay = entry.target.classList.contains('reveal-delay-1') ||
                              entry.target.classList.contains('reveal-delay-2') ||
                              entry.target.classList.contains('reveal-delay-3') ||
                              entry.target.classList.contains('reveal-delay-4');

      if (!hasManualDelay && idx > 0) {
        entry.target.style.transitionDelay = `${idx * 0.09}s`;
      }

      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold:  0.12,
    rootMargin: '0px 0px -48px 0px',
  });

  elements.forEach(el => observer.observe(el));
}

/* ── HERO PARALLAX ──────────────────────────────────────────── */
function initParallax() {
  const bg = document.getElementById('hero-bg');
  if (!bg) return;

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY;
    const heroH   = document.getElementById('hero')?.offsetHeight || 0;

    // Only apply while hero is in view
    if (scrollY < heroH) {
      const offset = scrollY * 0.38;
      bg.style.transform = `scale(1.08) translateY(${offset}px)`;
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

/* ── ANIMATED COUNTERS ──────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target   = parseFloat(el.dataset.count);
  const suffix   = el.dataset.suffix || '';
  const duration = 1800;
  const start    = performance.now();

  const update = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const ease    = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(ease * target * 10) / 10;

    el.textContent = `${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = `${target}${suffix}`;
    }
  };

  requestAnimationFrame(update);
}

/* ── EMAIL FORMS ─────────────────────────────────────────────── */
function initEmailForms() {
  // Hero form
  const heroInput  = document.getElementById('hero-email');
  const heroBtn    = document.getElementById('hero-submit');
  if (heroInput && heroBtn) {
    heroBtn.addEventListener('click', () => submitEmail(heroInput));
    heroInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') submitEmail(heroInput);
    });
  }

  // Join form
  const joinInput  = document.getElementById('join-email');
  const joinBtn    = document.getElementById('join-submit');
  if (joinInput && joinBtn) {
    joinBtn.addEventListener('click', () => submitEmail(joinInput));
    joinInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') submitEmail(joinInput);
    });
  }
}

function submitEmail(inputEl) {
  const email = inputEl.value.trim();

  // Validate
  if (!email || !email.includes('@') || !email.includes('.')) {
    inputEl.style.borderColor = '#e53935';
    inputEl.focus();
    setTimeout(() => { inputEl.style.borderColor = ''; }, 1800);
    showToast('Please enter a valid email address.');
    return;
  }

  // Send to Formspree (replace DFN.formAction with your endpoint)
  if (DFN.formAction && !DFN.formAction.includes('REPLACE')) {
    fetch(DFN.formAction, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify({ email, source: 'dfnworldwide.com' }),
    })
    .then(res => {
      if (res.ok) {
        inputEl.value = '';
        showToast('Welcome to the movement. Check your inbox.');
      } else {
        showToast('Something went wrong — email dfnworldwide@gmail.com directly.');
      }
    })
    .catch(() => {
      // Fallback: open mailto
      window.location.href = `mailto:dfnworldwide@gmail.com?subject=DFN%20Movement%20Sign-up&body=Email%3A%20${encodeURIComponent(email)}`;
    });
  } else {
    // No form action set — show success and open mailto as fallback
    inputEl.value = '';
    showToast('Welcome to the movement. Check your inbox.');
    // Open gumroad so they get the book immediately
    setTimeout(() => {
      window.open(DFN.gumroad, '_blank', 'noopener');
    }, 800);
  }
}

/* ── INJECT EXTERNAL LINKS ───────────────────────────────────── */
function injectExternalLinks() {
  document.querySelectorAll('[data-link]').forEach(el => {
    const key  = el.getAttribute('data-link');
    const href = DFN[key];
    if (!href || href === '#') return;

    if (el.tagName === 'A') {
      el.href   = href;
      if (!el.href.startsWith('mailto:') && !el.href.startsWith('tel:')) {
        el.target = '_blank';
        el.rel    = 'noopener noreferrer';
      }
    }
  });
}

/* ── TOAST NOTIFICATION ──────────────────────────────────────── */
let _toastTimer = null;

function initToast() {
  // Toast element already in HTML — nothing to inject
}

function showToast(message, duration = 3600) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* ── ACTIVE NAV LINK ON SCROLL ───────────────────────────────── */
(() => {
  const sections = ['about','divisions','music','books','founder','join'];
  const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  }, { threshold: 0.45 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();

/* ── LAZY IMAGE FALLBACK ─────────────────────────────────────── */
(() => {
  // For any img with data-src, use IntersectionObserver lazy loading
  const lazy = document.querySelectorAll('img[data-src]');
  if (!lazy.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      io.unobserve(img);
    });
  }, { rootMargin: '300px' });

  lazy.forEach(img => io.observe(img));
})();

/* ── DIVISION CARD IMAGE FALLBACKS ──────────────────────────── */
(() => {
  // If division background images fail to load, apply a gradient fallback
  const fallbacks = {
    records:    'linear-gradient(135deg, #1a0a00, #080808)',
    publishing: 'linear-gradient(135deg, #0a1a00, #080808)',
    designs:    'linear-gradient(135deg, #1a001a, #080808)',
    devs:       'linear-gradient(135deg, #00101a, #080808)',
  };

  document.querySelectorAll('.division-bg').forEach(bg => {
    const style = bg.getAttribute('style') || '';
    const match = style.match(/url\(['"]?([^'"]+)['"]?\)/);
    if (!match) return;

    const src = match[1];
    const key = Object.keys(fallbacks).find(k => src.includes(k));
    if (!key) return;

    const img = new Image();
    img.onerror = () => {
      bg.style.backgroundImage = fallbacks[key];
    };
    img.src = src;
  });
})();

/* ── PERFORMANCE: DEBOUNCE ───────────────────────────────────── */
function debounce(fn, delay = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

/* ── CONSOLE SIGNATURE ───────────────────────────────────────── */
function consoleSignature() {
  console.log(
    '%c DFN WORLDWIDE PTY LTD ',
    'background:#C9A84C;color:#080808;font-size:14px;font-weight:bold;padding:8px 20px;',
  );
  console.log(
    '%c FROM NOTHING, BUILD EVERYTHING ',
    'color:#C9A84C;font-size:11px;letter-spacing:4px;',
  );
  console.log(
    '%c Reg. 2026/408693/07 · Tembisa, South Africa · dfnworldwide.com',
    'color:#555;font-size:10px;',
  );
}

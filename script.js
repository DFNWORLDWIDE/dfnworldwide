/* ============================================================
   DFN WORLDWIDE PTY LTD — script.js
   © 2026 DFN Worldwide PTY Ltd. All Rights Reserved.
   Reg. 2026/408693/07 · Tembisa, South Africa
   ============================================================ */

/* ── SITE CONFIG — UPDATE YOUR LINKS HERE ───────────────────────
   Change these values and they apply everywhere on the site.
   ─────────────────────────────────────────────────────────── */
const CONFIG = {
  // Social media
  instagram:  'https://instagram.com/suavemelodies',
  tiktok:     'https://tiktok.com/@suavemelodies',
  youtube:    'https://youtube.com/@DFNWorldwide',
  twitter:    'https://twitter.com/suavemelodies',
  facebook:   'https://facebook.com/DFNWorldwide',
  github:     'https://github.com/suavemelodies',

  // Music
  spotify:    'https://open.spotify.com/artist/DFNcHallenGe',  // UPDATE when live
  appleMusic: '#',   // UPDATE when live
  amazonMusic:'#',   // UPDATE when live
  audiomack:  '#',   // UPDATE when live

  // Store
  gumroad:    'https://suavemelodies.gumroad.com',
  etsy:       '#',   // UPDATE when Etsy store is live
  merch:      '#',   // UPDATE when merch store is live

  // Email — replace with your Mailchimp/ConvertKit action URL
  emailFormAction: '#',

  // Contact
  email:      'info@dfnworldwide.com',
  website:    'https://dfnworldwide.com',
};

/* ── DOM READY ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initEmailForms();
  initExternalLinks();
  initToast();
  initCounters();
});

/* ── NAVIGATION ─────────────────────────────────────────────── */
function initNav() {
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('nav-mobile');

  // Scroll state
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile toggle
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('open');
      toggle.classList.toggle('active', open);
      toggle.setAttribute('aria-expanded', open);
    });

    // Close on link click
    mobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobile.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ── SCROLL REVEAL ──────────────────────────────────────────── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach(el => {
          if (el === entry.target) {
            el.style.transitionDelay = `${delay}s`;
            el.classList.add('visible');
          }
          delay += 0.08;
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ── EMAIL FORMS ────────────────────────────────────────────── */
function initEmailForms() {
  document.querySelectorAll('.email-form').forEach(form => {
    const input = form.querySelector('.email-form__input');
    const btn   = form.querySelector('.email-form__btn');

    if (!input || !btn) return;

    btn.addEventListener('click', () => submitEmail(input.value, input));

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') submitEmail(input.value, input);
    });
  });
}

function submitEmail(email, inputEl) {
  if (!email || !email.includes('@') || !email.includes('.')) {
    inputEl.style.borderColor = '#ff4444';
    inputEl.focus();
    setTimeout(() => (inputEl.style.borderColor = ''), 1500);
    return;
  }

  // If you have a real form action, submit it here
  // For now, show the welcome toast
  inputEl.value = '';
  showToast('Welcome to the movement. Check your inbox.');

  // TODO: Replace with actual Mailchimp/ConvertKit fetch
  // fetch(CONFIG.emailFormAction, {
  //   method: 'POST',
  //   body: JSON.stringify({ email }),
  //   headers: { 'Content-Type': 'application/json' }
  // });
}

/* ── EXTERNAL LINK INJECTION ────────────────────────────────── */
function initExternalLinks() {
  // Apply CONFIG links to data-link elements
  document.querySelectorAll('[data-link]').forEach(el => {
    const key  = el.getAttribute('data-link');
    const href = CONFIG[key];
    if (href && href !== '#') {
      if (el.tagName === 'A') {
        el.href = href;
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
      }
    }
  });
}

/* ── TOAST NOTIFICATION ─────────────────────────────────────── */
let toastTimer = null;

function initToast() {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.id = 'toast';
  document.body.appendChild(toast);
}

function showToast(message, duration = 3500) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* ── ANIMATED COUNTERS ──────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target   = parseFloat(el.getAttribute('data-count'));
  const suffix   = el.getAttribute('data-suffix') || '';
  const prefix   = el.getAttribute('data-prefix') || '';
  const duration = 1800;
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(ease * target * 10) / 10;

    el.textContent = `${prefix}${current}${suffix}`;

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = `${prefix}${target}${suffix}`;
  }

  requestAnimationFrame(update);
}

/* ── UTILITY FUNCTIONS ──────────────────────────────────────── */

/**
 * Debounce function for scroll/resize handlers
 */
function debounce(fn, delay = 150) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Detect if element is in viewport
 */
function inViewport(el, offset = 0) {
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight - offset && rect.bottom >= 0;
}

/**
 * Format currency for merch/book prices
 */
function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/* ── PERFORMANCE: LAZY LOAD IMAGES ─────────────────────────── */
(function lazyLoad() {
  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  images.forEach(img => observer.observe(img));
})();

/* ── CONSOLE SIGNATURE ──────────────────────────────────────── */
console.log(
  '%c DFN WORLDWIDE PTY LTD ',
  'background:#C9A84C;color:#080808;font-size:14px;font-weight:bold;padding:8px 16px;',
);
console.log(
  '%c FROM NOTHING, BUILD EVERYTHING. ',
  'color:#C9A84C;font-size:11px;letter-spacing:4px;',
);
console.log('%c Reg. 2026/408693/07 · Tembisa, South Africa', 'color:#555;font-size:10px;');

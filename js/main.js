/* =========================================
   NAVO main.js — entry point, loads partials
   ========================================= */

import { applyTheme, getPreferredTheme } from './theme.js';
import { loadTranslations }              from './lang.js';
import { initHeader }                    from './header.js';
import { initTicker }                    from './ticker.js';
import { initBookmarks }                 from './bookmarks.js';
import { loadMotion, initAnimations }    from './animations.js';
import { initRadio }                     from './radio.js';

/* Apply theme immediately to avoid flash */
applyTheme(getPreferredTheme());

async function bootstrap() {
  await loadTranslations();
  await loadPartials();

  initHeader();
  initRadio();
  initTicker();
  initBookmarks();
  initCookieBanner();

  await loadMotion();
  initAnimations();

  // Page-specific init (lazy-loaded by each page module)
  const pageInit = window.__pageInit;
  if (typeof pageInit === 'function') await pageInit();
}

/* Fetch & inject HTML partials */
async function loadPartials() {
  const targets = [
    { id: 'header-placeholder', url: './partials/header.html' },
    { id: 'footer-placeholder', url:  './partials/footer.html' },
  ];

  await Promise.all(targets.map(async ({ id, url }) => {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const res  = await fetch(url);
      const html = await res.text();
      el.outerHTML = html;
    } catch (e) {
      console.warn(`Could not load partial: ${url}`, e);
    }
  }));
}

/* Cookie banner */
function initCookieBanner() {
  const COOKIE_KEY = 'navo-cookie-ok';
  if (localStorage.getItem(COOKIE_KEY)) return;

  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;

  setTimeout(() => banner.classList.add('visible'), 1500);

  banner.querySelector('.btn-cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem(COOKIE_KEY, '1');
    banner.classList.remove('visible');
  });

  banner.querySelector('.btn-cookie-decline')?.addEventListener('click', () => {
    banner.classList.remove('visible');
  });
}

/* Lazy-load images via IntersectionObserver */
function initLazyImages() {
  if ('loading' in HTMLImageElement.prototype) return; // native lazy loading

  const imgs = document.querySelectorAll('img[loading="lazy"]');
  const io   = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const img = e.target;
      if (img.dataset.src) img.src = img.dataset.src;
      io.unobserve(img);
    });
  }, { rootMargin: '200px' });

  imgs.forEach(img => io.observe(img));
}

document.addEventListener('DOMContentLoaded', () => {
  bootstrap();
  initLazyImages();
});

/* =========================================
   NAVO Header — sticky, mobile menu, search
   ========================================= */

import { toggleTheme, applyTheme, getPreferredTheme } from './theme.js';
import { initLangSwitcher } from './lang.js';

function initHeader() {
  initStickyHeader();
  initMobileMenu();
  initSearchOverlay();
  initThemeToggle();
  initLangSwitcher();
  markActiveNav();
}

/* Sticky header — compact on scroll */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScroll = 0;

  const observer = new IntersectionObserver(
    ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
    { rootMargin: '-1px 0px 0px 0px', threshold: 0 }
  );

  // Observe sentinel element just below the ad banner
  const sentinel = document.getElementById('header-sentinel');
  if (sentinel) observer.observe(sentinel);
  else {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }
}

/* Mobile hamburger + drawer */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const drawer    = document.querySelector('.mobile-drawer');
  const overlay   = document.querySelector('.mobile-drawer-overlay');
  const closeBtn  = document.querySelector('.mobile-drawer-close');

  if (!hamburger || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });

  overlay?.addEventListener('click', closeDrawer);
  closeBtn?.addEventListener('click', closeDrawer);

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });
}

/* Search overlay */
function initSearchOverlay() {
  const searchBtns    = document.querySelectorAll('.search-btn');
  const overlay       = document.querySelector('.search-overlay');
  const input         = document.querySelector('.search-input');
  const suggestions   = document.querySelector('.search-suggestions');

  if (!overlay) return;

  function openSearch() {
    overlay.classList.add('open');
    setTimeout(() => input?.focus(), 100);
  }

  function closeSearch() {
    overlay.classList.remove('open');
    if (input) input.value = '';
    if (suggestions) suggestions.classList.remove('visible');
  }

  searchBtns.forEach(btn => btn.addEventListener('click', openSearch));

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeSearch();
  });

  document.querySelector('.search-overlay-close')?.addEventListener('click', closeSearch);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });

  // Autocomplete from articles.json
  let articles = [];
  fetch('./js/data/articles.json')
    .then(r => r.json())
    .then(data => { articles = data; })
    .catch(() => {});

  input?.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!suggestions) return;

    if (q.length < 2) {
      suggestions.classList.remove('visible');
      suggestions.innerHTML = '';
      return;
    }

    const matches = articles
      .filter(a => a.title.toLowerCase().includes(q))
      .slice(0, 6);

    if (matches.length === 0) {
      suggestions.classList.remove('visible');
      return;
    }

    suggestions.innerHTML = matches.map(a => `
      <a class="search-suggestion-item" href="article.html?id=${a.id}">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span>${a.title}</span>
        <span style="margin-left:auto;font-size:var(--text-xs);color:var(--color-text-tertiary)">${a.category}</span>
      </a>
    `).join('');
    suggestions.classList.add('visible');
  });

  // Submit search form
  document.querySelector('.search-submit')?.addEventListener('click', () => {
    const q = input?.value.trim();
    if (q) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
  });
}

/* Theme toggle button */
function initThemeToggle() {
  applyTheme(getPreferredTheme());

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
}

/* Mark current section as active in nav */
function markActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item a').forEach(link => {
    if (link.getAttribute('href') === path) link.classList.add('active');
  });
}

export { initHeader };

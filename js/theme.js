/* =========================================
   NAVO Theme — light / dark / system
   ========================================= */

const STORAGE_KEY = 'navo-theme';
const THEMES = ['light', 'dark', 'system'];

function getPreferredTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && THEMES.includes(saved)) return saved;
  return 'light'; // default
}

function resolveTheme(theme) {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

function applyTheme(theme) {
  const resolved = resolveTheme(theme);
  document.documentElement.setAttribute('data-theme', resolved);
  document.documentElement.setAttribute('data-theme-pref', theme);

  // Update toggle icons
  const iconSun  = document.querySelectorAll('.icon-sun');
  const iconMoon = document.querySelectorAll('.icon-moon');
  const iconAuto = document.querySelectorAll('.icon-auto');

  iconSun .forEach(el => el.style.display = resolved === 'light' ? 'block' : 'none');
  iconMoon.forEach(el => el.style.display = resolved === 'dark'  ? 'block' : 'none');
  iconAuto.forEach(el => el.style.display = theme === 'system'   ? 'block' : 'none');
}

function toggleTheme() {
  const current = getPreferredTheme();
  // Cycle: light → dark → light
  const next = current === 'light' ? 'dark' : 'light';
  localStorage.setItem(STORAGE_KEY, next);
  applyTheme(next);
}

// Listen for system preference changes when in "system" mode
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (getPreferredTheme() === 'system') applyTheme('system');
});

export { getPreferredTheme, applyTheme, toggleTheme };

/* =========================================
   NAVO Language Switcher — RU / TJ / EN
   ========================================= */

const LANG_KEY  = 'navo-lang';
const LANGS     = ['ru', 'tj', 'en'];
const LANG_META = {
  ru: { label: 'Рус', full: 'Русский',   html: 'ru' },
  tj: { label: 'Тоҷ', full: 'Тоҷикӣ',   html: 'tg' },
  en: { label: 'Eng', full: 'English',   html: 'en' },
};

let translations = {};

function getCurrentLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved && LANGS.includes(saved)) return saved;
  return 'ru'; // default
}

async function loadTranslations() {
  try {
    const res  = await fetch('./js/data/translations.json');
    translations = await res.json();
  } catch {
    console.warn('Could not load translations.json');
    translations = {};
  }
}

function t(key, lang) {
  const l = lang || getCurrentLang();
  return translations?.[l]?.[key] ?? translations?.['ru']?.[key] ?? key;
}

function applyLang(lang) {
  if (!LANGS.includes(lang)) lang = 'ru';
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = LANG_META[lang].html;

  // Update all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key, lang);
    if (val) el.textContent = val;
  });

  // Update placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const val = t(key, lang);
    if (val) el.placeholder = val;
  });

  // Update active state on lang buttons
  document.querySelectorAll('.lang-option').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });

  // Update lang button label
  document.querySelectorAll('.lang-current').forEach(el => {
    el.textContent = LANG_META[lang].label;
  });
}

function initLangSwitcher() {
  const lang = getCurrentLang();
  applyLang(lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = btn.nextElementSibling;
      if (dropdown) dropdown.classList.toggle('open');
    });
  });

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const newLang = opt.dataset.lang;
      applyLang(newLang);
      opt.closest('.lang-dropdown')?.classList.remove('open');
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.lang-dropdown.open').forEach(d => d.classList.remove('open'));
  });
}

export { getCurrentLang, loadTranslations, t, applyLang, initLangSwitcher, LANG_META };

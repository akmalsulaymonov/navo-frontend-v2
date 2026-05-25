# NAVO — инструкции для Claude Code

## Проект

- **Название:** NAVO — новостной сайт (информационное агентство)
- **Стек:** чистый HTML5 + CSS3 + Vanilla JS (ES2022+, `<script type="module">`)
- **Цель:** статический сайт, открывается через http-server; деплой на GitHub Pages / Netlify / Vercel
- **Эталон дизайна:** reuters.com — минималистичный, контентный, без визуального шума

---

## Запрещено

- React, Vue, Svelte, Angular и любые SPA-фреймворки
- TypeScript, Webpack, Vite, Parcel, Rollup и любые сборщики
- Tailwind CSS, jQuery, Bootstrap
- `localStorage` / `sessionStorage` в демонстрационных артефактах — только в реальном коде браузера

---

## Разрешённые библиотеки

- **Motion One** через CDN: `https://cdn.jsdelivr.net/npm/motion@12/+esm` — только для микроанимаций (fade-in, hover, scroll-progress); не злоупотреблять
- **Google Fonts** через `<link>` (Inter, Manrope, Source Serif 4)
- **SVG-иконки** inline или из Lucide / Heroicons / Phosphor
- **Изображения** с Unsplash через прямые URL (`https://images.unsplash.com/...?w=800&q=80`)

---

## Дизайн-система

Все переменные хранятся в `css/tokens.css` как CSS Custom Properties.

| Токен | Значение |
|---|---|
| Primary | `#2E6ECF` |
| Accent (рубрики, breaking) | `#E85D04` |
| Secondary | `#460094` |
| Text primary | `#0A0A0A` |
| Border | `#E5E7EB` |

**Шрифты:** Manrope — заголовки · Inter — интерфейс · Source Serif 4 — тело статьи

**Размеры:**
- `--container`: 1280px (max-width страницы)
- `--content-width`: 720px (max-width текста статьи)
- Spacing: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px

**Тёмная тема:** через `[data-theme="dark"]` на `<html>`, сохраняется в `localStorage`.

---

## Архитектура файлов

```
navo/
├── index.html          # Главная
├── article.html        # Статья
├── category.html       # Категория
├── tag.html            # Тег
├── author.html         # Автор
├── search.html         # Поиск
├── person.html         # Персона
├── region.html         # Регион
├── about.html          # О нас
├── 404.html
│
├── css/
│   ├── tokens.css      # Design tokens — единственное место для CSS-переменных
│   ├── base.css        # Reset + базовая типографика
│   ├── layout.css      # Контейнеры, сетки
│   ├── main.css        # @import всего
│   ├── components/     # header, footer, card, hero, ticker, sidebar, buttons, tags, widgets
│   └── pages/          # home, article, category, ...
│
├── js/
│   ├── main.js         # Точка входа: загружает партиалы, инициализирует всё
│   ├── theme.js        # Тёмная/светлая тема
│   ├── lang.js         # Переключатель RU/TJ/EN
│   ├── header.js       # Sticky, mobile-меню, search overlay
│   ├── ticker.js       # Бегущая строка breaking news
│   ├── animations.js   # Motion One — только микроанимации
│   ├── bookmarks.js    # Закладки в localStorage
│   ├── load-more.js    # Догрузка карточек из articles.json
│   └── data/
│       ├── articles.json      # 30+ статей
│       ├── authors.json       # 8–10 авторов
│       ├── persons.json       # 15–20 персон для тултипов
│       ├── categories.json
│       └── translations.json  # RU / TJ / EN
│
├── partials/           # HTML-фрагменты, загружаются через fetch() в main.js
│   ├── header.html
│   └── footer.html
│
└── assets/
    ├── logo.png
    └── icons/
```

---

## Правила кода

**HTML:**
- Семантические теги: `<header>`, `<main>`, `<article>`, `<aside>`, `<nav>`, `<section>`, `<figure>`
- Все `<img>` — с `alt`, `width`, `height`, `loading="lazy"` (кроме LCP-картинки — `fetchpriority="high"`)
- Skip-link `<a href="#main-content">` в начале `<body>`
- Schema.org JSON-LD на каждой странице

**CSS:**
- Только CSS Custom Properties из `tokens.css` — не хардкодить цвета и отступы
- `font-display: swap` для всех шрифтов
- `@media (prefers-reduced-motion: reduce)` отключает все анимации

**JavaScript:**
- Все файлы — ES-модули: `export` / `import`
- Подключение: `<script type="module" defer>`
- Партиалы грузятся через `fetch('./partials/header.html')` — нужен http-server

**Доступность (a11y):**
- Все интерактивные элементы — `:focus-visible` с видимым outline
- ARIA-атрибуты для modal, tooltip, dropdown, mobile drawer
- `lang` на `<html>` меняется при смене языка
- Контрастность текста ≥ 4.5:1

---

## Многоязычность

- Языки: **RU** (по умолчанию) / **TJ** / **EN**
- Переводы интерфейса (меню, кнопки, плейсхолдеры) — в `js/data/translations.json`
- Элементы с `data-i18n="ключ"` заменяются через `lang.js` при смене языка
- Текст статей — только на русском; язык `<html lang="ru">` меняется при переключении

---

## Контент / мок-данные

- Заголовки новостей — реальные, на русском, **не lorem ipsum**
- Авторы — вымышленные таджикские и русские имена
- Изображения — публичные фото с Unsplash (реальные URL)
- Минимум **30 статей** в `articles.json`, минимум **8 авторов** в `authors.json`

---

## Качество (чек-лист перед завершением этапа)

- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] Адаптив проверен на: 375px / 768px / 1024px / 1440px
- [ ] Тёмная и светлая тема работают на всех страницах, выбор сохраняется
- [ ] Нет ошибок и предупреждений в консоли браузера
- [ ] Все изображения с alt-текстами
- [ ] `prefers-reduced-motion` отключает анимации

---

## Воркфлоу

1. Не начинай код без подтверждения плана от пользователя
2. После каждого крупного блока (header, главная, статья) — показывай результат и жди обратной связи
3. Используй `UI UX Pro Max` skill для проверки accessibility и UX-паттернов
4. Веди `README.md` параллельно с разработкой
5. Делай маленькими итерациями: лучше один безупречный компонент, чем десять сырых

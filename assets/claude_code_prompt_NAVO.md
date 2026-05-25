# Промпт для Claude Code: Разработка новостного сайта NAVO

> Скопируй и вставь этот промпт целиком в Claude Code (или в первое сообщение проекта).
> Перед запуском помести `logo.png` в папку `/assets/` и приложи файл `structure.txt` к беседе.

---

## РОЛЬ И КОНТЕКСТ

Ты — senior frontend-разработчик с 10+ лет опыта в построении высоконагруженных новостных порталов уровня **Reuters / BBC / The Guardian / Axios**. У тебя экспертиза в семантической вёрстке, accessibility (WCAG 2.2 AA), Core Web Vitals, дизайн-системах и современной UI-типографике. Сейчас ты строишь информационный портал **NAVO** — современное минималистичное новостное издание для таджикоязычной, русскоязычной и англоязычной аудитории.

---

## ЦЕЛЬ ПРОЕКТА

Разработать полностью функциональный фронтенд новостного сайта **NAVO** на **чистом HTML5, CSS3 и vanilla JavaScript** — без React, Vue, Next.js и сборщиков. Сайт должен открываться по двойному клику на `index.html` (опционально — через простой `http-server`) и быть готов к деплою на любой статический хостинг (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

**Эталон стиля:** reuters.com — чистый, минималистичный, контентный, без визуального шума.

---

## ТЕХНИЧЕСКИЕ ОГРАНИЧЕНИЯ

✅ **МОЖНО использовать:**
- HTML5 (семантические теги: `<header>`, `<main>`, `<article>`, `<aside>`, `<nav>`, `<section>`, `<figure>`)
- CSS3 (Grid, Flexbox, CSS Variables, `@container`, `clamp()`, `:has()`)
- Vanilla JavaScript (ES2022+, модули `<script type="module">`)
- Google Fonts (через `<link>`)
- **Motion One** (бывший Framer Motion) для анимаций — подключать через CDN как vanilla JS, НЕ как React-пакет. Использовать только для микро-анимаций (hover, fade-in, stagger), не злоупотреблять.
- SVG-иконки (inline или из открытых наборов: Lucide, Heroicons, Phosphor)
- Шрифты Google Fonts
- Изображения с Unsplash / Pexels (через прямые URL или локально)

❌ **НЕЛЬЗЯ использовать:**
- React, Vue, Svelte, Angular и любые SPA-фреймворки
- Webpack, Vite, Parcel, Rollup и любые сборщики
- TypeScript (только чистый JS, чтобы запускалось без компиляции)
- Tailwind CSS (только нативный CSS с переменными)
- jQuery (устарело)
- Bootstrap (тяжёлый, ломает дизайн-систему)

---

## БИБЛИОТЕКИ И ИНСТРУМЕНТЫ — ОТВЕТ НА ВОПРОСЫ ПОЛЬЗОВАТЕЛЯ

### 1. Motion One / Framer Motion — ДА, можно использовать

`framer-motion` теперь называется просто **Motion** и поддерживает не только React, но и **vanilla JS** через пакет `motion`. Для нашего проекта подключаем через CDN:

```html
<script type="module">
  import { animate, scroll, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@12/+esm";

  // Пример: fade-in карточек при появлении в viewport
  inView(".news-card", (info) => {
    animate(info.target, { opacity: [0, 1], y: [20, 0] }, { duration: 0.4 });
  });

  // Пример: scroll-progress bar в шапке статьи
  scroll(animate(".reading-progress", { scaleX: [0, 1] }));
</script>
```

**Правила использования Motion в проекте:**
- Использовать **только для микро-анимаций** (fade-in карточек, hover, scroll-progress, появление меню)
- **НЕ** анимировать всё подряд — Reuters/BBC намеренно сдержанны
- Все анимации должны уважать `prefers-reduced-motion` (Motion делает это автоматически при правильном API)
- Анимации не должны мешать чтению или замедлять LCP

### 2. UI UX Pro Max Skill — ДА, очень рекомендую установить

Это **Claude Code skill** — расширение, которое даёт Claude Code базу из 67 UI-стилей, 161 цветовой палитры, 57 пар шрифтов и 161 правила UX/accessibility. Это **не библиотека для сайта**, а инструмент для Claude Code, который сделает дизайн заметно более профессиональным.

**Установка перед началом работы (выполни первым делом):**

```bash
# Через plugin marketplace (рекомендуется)
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

После установки активно используй этот skill для:
- Поиска подходящих UX-паттернов для новостного сайта
- Проверки accessibility (контраст, focus states, ARIA)
- Валидации touch-targets и spacing
- Подбора шрифтовых пар
- Аудита готовых компонентов

---

## ДИЗАЙН-СИСТЕМА (обязательная)

Создай файл `css/tokens.css` со всеми design tokens в `:root` и `[data-theme="dark"]`.

### Цвета
```css
:root {
  /* Brand */
  --color-primary: #2E6ECF;
  --color-primary-hover: #2557A7;
  --color-secondary: #460094;
  --color-accent: #E85D04;  /* оранжевый — рубрики, breaking, цитаты */

  /* Text */
  --color-text-primary: #0A0A0A;
  --color-text-secondary: #525866;
  --color-text-tertiary: #868C98;
  --color-text-inverse: #FFFFFF;

  /* Surface */
  --color-bg: #FFFFFF;
  --color-bg-subtle: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-surface-hover: #F5F5F5;

  /* Border */
  --color-border: #E5E7EB;
  --color-border-strong: #CCCCCC;

  /* Status */
  --color-success: #16A34A;
  --color-error: #DC2626;
  --color-warning: #F59E0B;
  --color-breaking: #DC2626;
}

[data-theme="dark"] {
  --color-text-primary: #F5F5F5;
  --color-text-secondary: #A1A1AA;
  --color-text-tertiary: #71717A;
  --color-bg: #0F0F10;
  --color-bg-subtle: #18181B;
  --color-surface: #1A1A1C;
  --color-surface-hover: #27272A;
  --color-border: #27272A;
  --color-border-strong: #3F3F46;
}
```

### Типографика (Google Fonts)
```css
:root {
  --font-sans: 'Inter', 'Manrope', system-ui, -apple-system, sans-serif;
  --font-heading: 'Manrope', 'Inter Tight', sans-serif;
  --font-serif: 'Source Serif 4', 'Lora', Georgia, serif;  /* для текста статьи */

  /* Type scale (modular 1.25) */
  --text-xs: 0.75rem;     /* 12px — caption, meta */
  --text-sm: 0.875rem;    /* 14px — anons, tags */
  --text-base: 1rem;      /* 16px — body */
  --text-lg: 1.125rem;    /* 18px — lead */
  --text-xl: 1.25rem;     /* 20px — h3 */
  --text-2xl: 1.5rem;     /* 24px — h2 */
  --text-3xl: 2rem;       /* 32px — section title */
  --text-4xl: 2.5rem;     /* 40px — h1 article */
  --text-5xl: 3.5rem;     /* 56px — hero on homepage */

  /* Responsive (для главного заголовка) */
  --text-hero: clamp(2rem, 5vw, 3.5rem);
}
```

Подключение шрифтов:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&family=Source+Serif+4:wght@400;600&display=swap" rel="stylesheet">
```

### Spacing, радиусы, тени
```css
:root {
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 20px;  --space-6: 24px;
  --space-8: 32px;  --space-10: 40px; --space-12: 48px;
  --space-16: 64px; --space-20: 80px; --space-24: 96px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.12);

  --container: 1280px;
  --content-width: 720px;  /* ширина текста статьи */
}
```

---

## СТРУКТУРА ПРОЕКТА

Создай следующую структуру файлов:

```
navo/
├── index.html                  # Главная страница
├── article.html                # Страница статьи
├── category.html               # Страница категории
├── tag.html                    # Страница тега
├── author.html                 # Страница автора
├── search.html                 # Страница поиска
├── person.html                 # Страница персоны
├── region.html                 # Страница региона
├── about.html                  # О нас
├── 404.html                    # Страница 404
│
├── css/
│   ├── tokens.css              # Design tokens (CSS variables)
│   ├── base.css                # Reset, типографика, базовые стили
│   ├── layout.css              # Сетка, контейнеры
│   ├── components/
│   │   ├── header.css
│   │   ├── footer.css
│   │   ├── card.css            # Карточка новости
│   │   ├── hero.css            # Hero-блок
│   │   ├── ticker.css          # Бегущая строка
│   │   ├── sidebar.css
│   │   ├── article.css         # Тело статьи
│   │   ├── breadcrumbs.css
│   │   ├── buttons.css
│   │   ├── tags.css
│   │   ├── comments.css
│   │   ├── tooltip.css         # Тултип для персон
│   │   ├── modal.css
│   │   └── widgets.css         # Курсы, погода, топ-5
│   ├── pages/
│   │   ├── home.css
│   │   ├── article.css
│   │   ├── category.css
│   │   └── ...
│   └── main.css                # @import всех файлов
│
├── js/
│   ├── main.js                 # Точка входа, инициализация
│   ├── theme.js                # Светлая/тёмная тема
│   ├── lang.js                 # Переключатель языков (RU/TJ/EN)
│   ├── header.js               # Sticky-header, mobile-menu, search
│   ├── ticker.js               # Бегущая строка breaking news
│   ├── search.js               # Поиск с автодополнением
│   ├── tooltip.js              # Тултипы персон в статьях
│   ├── share.js                # Шеринг в соцсети + copy-link
│   ├── reading-progress.js     # Прогресс-бар чтения
│   ├── load-more.js            # Загрузить ещё новости
│   ├── gallery.js              # Lightbox для фото
│   ├── lazy-images.js          # Lazy-loading с IntersectionObserver
│   ├── animations.js           # Motion One анимации
│   ├── audio-tts.js            # Озвучка статьи (Web Speech API)
│   ├── reading-mode.js         # Режим чтения
│   ├── bookmarks.js            # Закладки (localStorage)
│   └── data/
│       ├── articles.json       # Мок-данные новостей
│       ├── authors.json        # Авторы
│       ├── persons.json        # Персоны (для тултипов)
│       ├── categories.json
│       └── translations.json   # Переводы для RU/TJ/EN
│
├── assets/
│   ├── logo.png                # Логотип NAVO
│   ├── logo-dark.svg           # Логотип для тёмной темы
│   ├── icons/                  # SVG-иконки
│   └── images/                 # Локальные изображения
│
├── partials/                   # HTML-фрагменты для переиспользования (загружаются через fetch)
│   ├── header.html
│   ├── footer.html
│   └── sidebar.html
│
└── README.md                   # Документация
```

---

## ШАГИ ВЫПОЛНЕНИЯ (порядок строгий)

### Шаг 1. Инициализация
1. Создай структуру папок и пустые файлы
2. Установи UI UX Pro Max skill (см. выше)
3. Создай `css/tokens.css` со всеми design tokens
4. Создай `css/base.css` с CSS reset (нормализация box-sizing, margins) и базовой типографикой
5. В `index.html` подключи все CSS и JS, добавь meta-теги (charset, viewport, og:tags, schema.org)
6. Подключи Motion One через CDN

### Шаг 2. Глобальные компоненты
1. **Header** (`partials/header.html`, `css/components/header.css`, `js/header.js`):
   - Логотип слева, главное меню по центру, поиск + язык + тема справа
   - Sticky при прокрутке, компактная версия при скролле вниз
   - Mobile-меню (гамбургер → выдвижная панель)
   - Прогресс-бар чтения (только на странице статьи)
   - Breaking News-метка при наличии срочной новости
2. **Footer** — 4 колонки + соцсети + email-подписка + копирайт
3. **Theme toggle** — переключатель тёмной/светлой/системной темы, сохранение в `localStorage`
4. **Language switcher** — RU / TJ / EN с сохранением в `localStorage` и `cookie`

### Шаг 3. Главная страница (`index.html`)
Реализуй ВСЕ блоки из `structure.txt`:
1. Рекламный баннер 970×90 над шапкой (закрываемый)
2. Бегущая строка breaking news (auto-pause, доступно для скринридеров)
3. Hero — главная новость дня (большое фото 2:1, заголовок, анонс, мета)
4. 3 карточки важных новостей рядом с Hero
5. Лента 9 карточек 3×3
6. Кнопка «Загрузить ещё»
7. Тематические блоки: Политика, Экономика, Технологии (по 5 карточек)
8. Спецблоки: Лонгриды и расследования, Мультимедиа, Мнения, Регионы, Цифра дня
9. Sidebar справа: курсы валют, погода, реклама 300×250, самые читаемые, последние, реклама 300×600 (sticky)

### Шаг 4. Страница статьи (`article.html`)
1. Breadcrumbs + рубрика оранжевым
2. H1 + lead + мета (автор, дата, обновлено, время чтения, просмотры)
3. Кнопки шеринга: Telegram, X, Facebook, WhatsApp, copy-link, email
4. Кнопка «Прослушать» (Web Speech API через `audio-tts.js`)
5. Главное фото с подписью
6. **TL;DR блок** в начале — буллет-лист 3–5 пунктов
7. **Оглавление** sticky слева для лонгридов
8. Тело статьи серифным шрифтом, max-width 720px, line-height 1.7
9. **Прогресс-бар чтения** в шапке (Motion One + scroll progress)
10. Упоминания персон — пунктирное подчёркивание + тултип с фото (через `tooltip.js`)
11. Цитаты с оранжевой полосой слева
12. Рекламный блок после 3-го абзаца
13. Фотогалерея (lightbox)
14. Видеогалерея
15. Теги-пилюли
16. Блок «Об авторе» + «Читайте также» (3-4 карточки)
17. Комментарии (мок-данные, заглушки)
18. Метки прозрачности: «Факт-чек проверен», «Используется AI», «Реклама» (если применимо)
19. Sidebar: реклама, самые читаемые, последние категории

### Шаг 5. Остальные страницы (по `structure.txt`)
- Страница категории
- Страница тега
- Страница автора (с разворачиваемым био)
- Страница поиска (с автодополнением)
- Страница персоны (с инфокарточкой, timeline, связями)
- Страница региона (с интерактивной картой)
- 404, About

### Шаг 6. JavaScript-функционал
1. **Theme toggle** — переключение `data-theme` атрибута на `<html>`
2. **Lang switcher** — загрузка переводов из `translations.json`
3. **Sticky header** — добавление класса при скролле
4. **Breaking news ticker** — CSS-анимация + JS-управление
5. **Search autocomplete** — поиск по `articles.json`
6. **Person tooltips** — наведение на имя → fetch данных из `persons.json` → показ карточки
7. **Reading progress** — Motion One `scroll()` API
8. **Lazy-loading** — IntersectionObserver для всех `<img loading="lazy">`
9. **Share buttons** — генерация ссылок для соцсетей + Clipboard API
10. **Load more** — догрузка карточек из `articles.json`
11. **Lightbox** — открытие фото на весь экран
12. **TTS** — Web Speech API для озвучки статьи
13. **Bookmarks** — сохранение ID статей в `localStorage`
14. **Cookie banner** — гранулярные настройки

### Шаг 7. Accessibility (обязательно)
- Все интерактивные элементы доступны с клавиатуры (`Tab`, видимый `:focus-visible`)
- Skip-link «Перейти к содержимому» в начале `<body>`
- ARIA-атрибуты для динамических компонентов (modal, tooltip, accordion)
- Альт-тексты для всех `<img>`
- Корректная семантика (`<main>`, `<article>`, `<nav>`, `<aside>`)
- Контрастность текста ≥ 4.5:1 (проверь через UI UX Pro Max skill)
- Поддержка `prefers-reduced-motion`
- Lang-атрибут на `<html>` меняется при смене языка

### Шаг 8. Производительность
- `<img loading="lazy">` для всех картинок ниже fold
- `<img>` с `width` и `height` (предотвращение CLS)
- `<link rel="preload">` для критических шрифтов
- `<link rel="preconnect">` для Google Fonts и CDN
- Минификация не требуется (проект на чистом JS), но JS — модульный
- `<script type="module" defer>` для всех JS-файлов
- Используй `content-visibility: auto` для блоков ниже первого экрана

### Шаг 9. SEO и метаданные
На каждой странице добавь:
- `<title>` и `<meta name="description">`
- Open Graph: `og:title`, `og:description`, `og:image`, `og:type="article"`
- Twitter Cards
- Schema.org разметку JSON-LD: `NewsArticle`, `Person`, `Organization`, `BreadcrumbList`
- Canonical URL
- `hreflang` для трёх языков

### Шаг 10. Мок-данные
Создай в `js/data/`:
- `articles.json` — минимум **30 новостей** с реальными изображениями с Unsplash, вымышленными авторами на таджикские/русские имена, разными рубриками
- `authors.json` — 8–10 авторов с фото, био, должностью
- `persons.json` — 15–20 персон (для тултипов): фото, имя, должность, страна
- `categories.json` — 8 рубрик с описаниями
- `translations.json` — переводы интерфейса для RU / TJ / EN (минимум: меню, кнопки, плейсхолдеры)

---

## КРИТЕРИИ КАЧЕСТВА (чек-лист перед сдачей)

- [ ] Сайт открывается двойным кликом по `index.html` без ошибок в консоли
- [ ] Все 8+ страниц работают и связаны между собой ссылками
- [ ] Адаптив на 360px / 768px / 1024px / 1440px / 1920px
- [ ] Тёмная и светлая темы работают на всех страницах, выбор сохраняется
- [ ] Переключатель языка работает (минимум для шапки/футера/кнопок)
- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- [ ] Все изображения с alt-текстами
- [ ] Schema.org разметка валидна (проверь через validator.schema.org)
- [ ] Скрол-прогресс на статье плавный, не дёргается
- [ ] Тултипы персон появляются на hover/focus, доступны с клавиатуры
- [ ] Поиск с автодополнением работает
- [ ] Шеринг открывает корректные ссылки на соцсети
- [ ] TTS-озвучка работает (хотя бы для русского)
- [ ] Закладки сохраняются между перезагрузками
- [ ] Cookie-баннер появляется при первом визите
- [ ] Skip-link работает (Tab → видимый «Перейти к содержимому»)
- [ ] Тест на медленном 3G — сайт остаётся юзабельным
- [ ] `prefers-reduced-motion` — анимации отключаются
- [ ] Нет ошибок в консоли браузера

---

## РАБОЧИЙ ПРОЦЕСС

1. **Перед началом** установи UI UX Pro Max skill
2. **Делай маленькими итерациями:** сначала структура → tokens → header → главная → одна статья → остальные страницы → JS-функционал → полировка
3. **После каждой итерации** показывай результат и проси проверить
4. **Не торопись:** лучше один безупречный компонент, чем десять сырых
5. **Используй UI UX Pro Max** для проверки каждого экрана — попроси его сделать аудит после готовности страницы
6. **Тестируй на трёх размерах экрана** после каждого нового компонента (mobile 375px, tablet 768px, desktop 1440px)
7. **Комментарии в коде** — на русском или английском, поясняй сложные места
8. **Не вставляй заглушки `lorem ipsum`** — используй реальные таджикские/российские/мировые новостные заголовки

---

## ОТВЕТ НА ПЕРВЫЙ ВОПРОС

Прежде чем начать кодить, **подтверди что:**
1. Ты установил UI UX Pro Max skill
2. Ты понял структуру проекта
3. Ты прочитал `structure.txt` (приложенный файл)
4. У тебя есть `logo.png` в `assets/`

После подтверждения создавай структуру файлов и начинай с `css/tokens.css` и `index.html`.

Поехали! 🚀

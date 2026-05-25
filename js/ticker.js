/* =========================================
   NAVO Breaking News Ticker
   ========================================= */

async function initTicker() {
  const track = document.querySelector('.ticker-list');
  if (!track) return;

  try {
    const res      = await fetch('./js/data/articles.json');
    const articles = await res.json();

    // Pick breaking / latest 8 articles
    const breaking = articles
      .filter(a => a.breaking || a.featured)
      .concat(articles)
      .slice(0, 8);

    const items = breaking.map(a => `
      <li class="ticker-item" role="listitem">
        <a href="article.html?id=${a.id}">${a.title}</a>
      </li>
      <li class="ticker-dot" aria-hidden="true"></li>
    `).join('');

    // Duplicate for seamless loop
    track.innerHTML = items + items;

    // Adjust animation duration based on content width
    requestAnimationFrame(() => {
      const fullWidth = track.scrollWidth / 2;
      const duration  = Math.max(30, fullWidth / 80); // ~80px/s
      track.style.animationDuration = `${duration}s`;
    });

  } catch {
    // Fallback static items already in HTML
  }
}

export { initTicker };

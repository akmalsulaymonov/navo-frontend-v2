/* =========================================
   NAVO Load More — paginated card loading
   ========================================= */

const PAGE_SIZE = 9;

async function initLoadMore() {
  const btn      = document.querySelector('.btn-load-more');
  const grid     = document.querySelector('.news-feed-grid');
  if (!btn || !grid) return;

  let articles = [];
  let page     = 1; // page 0 already rendered

  try {
    const res = await fetch('./js/data/articles.json');
    articles  = await res.json();
  } catch {
    btn.remove();
    return;
  }

  // Hide button if nothing left to load
  function updateBtn() {
    const loaded = page * PAGE_SIZE;
    if (loaded >= articles.length) btn.style.display = 'none';
  }

  updateBtn();

  btn.addEventListener('click', async () => {
    btn.classList.add('loading');
    btn.disabled = true;

    await new Promise(r => setTimeout(r, 400)); // visual delay

    const start = page * PAGE_SIZE;
    const slice = articles.slice(start, start + PAGE_SIZE);

    slice.forEach(article => {
      const card = buildCard(article);
      grid.appendChild(card);
    });

    page++;
    btn.classList.remove('loading');
    btn.disabled = false;
    updateBtn();

    // Animate new cards
    if (window.motionAnimate) {
      const newCards = Array.from(grid.children).slice(-slice.length);
      window.motionAnimate(newCards, { opacity: [0, 1], y: [20, 0] }, { duration: 0.4, delay: window.motionStagger?.(0.05) });
    }
  });
}

function buildCard(a) {
  const li = document.createElement('li');
  li.className = 'news-card';
  li.innerHTML = `
    <a href="article.html?id=${a.id}" class="card-image">
      <img src="${a.image}" alt="${a.title}" loading="lazy" width="400" height="225">
      <span class="category-badge">${a.category}</span>
    </a>
    <div class="card-body">
      <h3 class="card-title line-clamp-2">
        <a href="article.html?id=${a.id}">${a.title}</a>
      </h3>
      <p class="card-excerpt line-clamp-2">${a.excerpt}</p>
      <div class="card-meta">
        <span class="card-author">
          <img src="${a.authorAvatar}" alt="${a.author}" class="card-author-avatar" width="20" height="20">
          ${a.author}
        </span>
        <time class="card-date" datetime="${a.date}">${formatDate(a.date)}</time>
      </div>
    </div>
  `;
  return li;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export { initLoadMore, buildCard, formatDate };

/* =========================================
   NAVO Bookmarks — localStorage persistence
   ========================================= */

const KEY = 'navo-bookmarks';

function getBookmarks() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

function isBookmarked(id) {
  return getBookmarks().includes(String(id));
}

function toggleBookmark(id) {
  const bookmarks = getBookmarks();
  const sid       = String(id);
  const idx       = bookmarks.indexOf(sid);

  if (idx === -1) bookmarks.push(sid);
  else            bookmarks.splice(idx, 1);

  localStorage.setItem(KEY, JSON.stringify(bookmarks));
  updateBookmarkButtons(sid);
  return idx === -1; // true = added
}

function updateBookmarkButtons(id) {
  document.querySelectorAll(`[data-bookmark="${id}"]`).forEach(btn => {
    const saved = isBookmarked(id);
    btn.classList.toggle('bookmarked', saved);
    btn.setAttribute('aria-pressed', String(saved));
    btn.title = saved ? 'Убрать из закладок' : 'В закладки';
  });
}

function initBookmarks() {
  document.querySelectorAll('[data-bookmark]').forEach(btn => {
    const id = btn.dataset.bookmark;
    updateBookmarkButtons(id);

    btn.addEventListener('click', () => {
      const added = toggleBookmark(id);
      showToast(added ? 'Добавлено в закладки' : 'Убрано из закладок');
    });
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('visible'), 2500);
}

export { getBookmarks, isBookmarked, toggleBookmark, initBookmarks, showToast };

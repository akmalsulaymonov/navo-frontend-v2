/* =========================================
   NAVO Radio Player — RADIO NAVO 96,5 FM
   Handles play/pause for the header player.
   ========================================= */

export function initRadio() {
  const btn   = document.getElementById('radio-toggle');
  const audio = document.getElementById('radio-audio');
  if (!btn) return;

  let playing = false;

  btn.addEventListener('click', () => {
    playing ? pause() : play();
  });

  function play() {
    playing = true;
    btn.classList.add('loading');
    btn.setAttribute('aria-pressed', 'true');
    btn.setAttribute('aria-label', 'Остановить RADIO NAVO 96,5 FM');

    if (audio) {
      audio.play()
        .then(() => {
          btn.classList.remove('loading');
          btn.classList.add('playing');
        })
        .catch(() => {
          // Stream unavailable (demo mode) — still show playing UI
          btn.classList.remove('loading');
          btn.classList.add('playing');
        });
    } else {
      btn.classList.remove('loading');
      btn.classList.add('playing');
    }
  }

  function pause() {
    playing = false;
    if (audio) audio.pause();
    btn.classList.remove('playing', 'loading');
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', 'Слушать RADIO NAVO 96,5 FM');
  }
}

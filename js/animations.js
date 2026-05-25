/* =========================================
   NAVO Animations — Motion One micro-animations
   ========================================= */

let animate, inView, stagger;

async function loadMotion() {
  try {
    const m = await import('https://cdn.jsdelivr.net/npm/motion@12/+esm');
    animate = m.animate;
    inView  = m.inView;
    stagger = m.stagger;

    // Expose for other modules
    window.motionAnimate = animate;
    window.motionStagger = stagger;
  } catch {
    // Motion not available — degrade gracefully
    window.motionAnimate = null;
    window.motionStagger = null;
  }
}

function initAnimations() {
  if (!animate || !inView) return;

  // Fade-in + slide-up for news cards
  inView('.news-card', info => {
    animate(
      info.target,
      { opacity: [0, 1], y: [24, 0] },
      { duration: 0.45, easing: [0.25, 0, 0, 1] }
    );
  }, { margin: '0px 0px -60px 0px' });

  // Section headers
  inView('.section-header', info => {
    animate(info.target, { opacity: [0, 1], x: [-16, 0] }, { duration: 0.4 });
  });

  // Hero card stagger
  const heroCards = document.querySelectorAll('.hero-card');
  if (heroCards.length) {
    inView('.hero-sidebar', () => {
      animate(heroCards, { opacity: [0, 1], y: [16, 0] }, {
        duration: 0.4,
        delay: stagger(0.08)
      });
    });
  }

  // Special blocks
  const specialBlocks = document.querySelectorAll('.special-block');
  if (specialBlocks.length) {
    inView('.special-blocks', () => {
      animate(specialBlocks, { opacity: [0, 1], y: [20, 0] }, {
        duration: 0.45,
        delay: stagger(0.06)
      });
    });
  }
}

export { loadMotion, initAnimations };

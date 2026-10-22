import { $ } from './dom.js';

// Native overflow handles touch and trackpads; pointer drag adds mouse support.
export function initGallery(track, motion) {
  const previous = $('#project-prev'), next = $('#project-next');
  let drag, suppressClick = false;
  const step = () => track.firstElementChild?.getBoundingClientRect().width +
    parseFloat(getComputedStyle(track).columnGap) || track.clientWidth;

  function update() {
    previous.disabled = track.scrollLeft <= 6;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  }
  function advance(direction) {
    track.scrollBy({ left: step() * direction, behavior: motion.enabled() ? 'smooth' : 'instant' });
  }
  previous.addEventListener('click', () => advance(-1));
  next.addEventListener('click', () => advance(1));
  track.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(track);
  track.addEventListener('keydown', (event) => {
    if (event.target !== track) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key.startsWith('Arrow')) advance(event.key === 'ArrowRight' ? 1 : -1);
    else track.scrollTo({ left: event.key === 'Home' ? 0 : track.scrollWidth, behavior: 'instant' });
  });
  track.addEventListener('dragstart', (event) => event.preventDefault());
  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('a')) return;
    suppressClick = false;
    drag = { id: event.pointerId, x: event.clientX, left: track.scrollLeft, moved: false };
  });
  track.addEventListener('pointermove', (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const distance = event.clientX - drag.x;
    if (!drag.moved && Math.abs(distance) < 8) return;
    if (!drag.moved) {
      drag.moved = true;
      track.classList.add('is-dragging');
      track.setPointerCapture(drag.id);
    }
    event.preventDefault();
    track.scrollLeft = drag.left - distance;
  });
  function finish() {
    if (!drag) return;
    suppressClick = drag.moved;
    if (track.hasPointerCapture(drag.id)) track.releasePointerCapture(drag.id);
    drag = null;
    track.classList.remove('is-dragging');
  }
  track.addEventListener('pointerup', finish);
  track.addEventListener('pointercancel', finish);
  track.addEventListener('lostpointercapture', finish);
  track.addEventListener('pointerleave', () => { if (drag && !drag.moved) finish(); });
  track.addEventListener('click', (event) => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick = false;
  }, true);
  return { reset() { finish(); track.scrollLeft = 0; update(); } };
}

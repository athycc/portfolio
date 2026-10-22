import { $ } from './dom.js';

const HOLD = 4000;

// Native overflow handles touch/trackpads; only mouse dragging needs pointer logic.
export function initGallery(track, motion) {
  const root = track.closest('#work');
  const previous = $('#project-prev'), next = $('#project-next');
  const toggle = $('#project-autoplay'), position = $('#project-position');
  let drag, timer, suppressClick = false, paused = false, visible = false, direction = 1;
  const step = () => track.firstElementChild?.getBoundingClientRect().width +
    parseFloat(getComputedStyle(track).columnGap) || track.clientWidth;

  function update() {
    previous.disabled = track.scrollLeft <= 6;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    const index = Math.min(track.children.length, Math.round(track.scrollLeft / step()) + 1);
    position.textContent = `${String(index).padStart(2, '0')} / ${String(track.children.length).padStart(2, '0')}`;
  }
  function advance(value) {
    track.scrollBy({ left: step() * value, behavior: motion.enabled() ? 'smooth' : 'instant' });
  }
  function sync() {
    clearTimeout(timer);
    timer = null;
    toggle.classList.remove('is-playing');
    toggle.disabled = !motion.enabled();
    toggle.setAttribute('aria-label', paused ? 'Play project slideshow' : 'Pause project slideshow');
    toggle.setAttribute('aria-pressed', String(paused));
    $('span', toggle).textContent = paused ? 'Play' : 'Pause';
    const focused = root.contains(document.activeElement) && document.activeElement !== toggle;
    if (paused || !motion.enabled() || !visible || document.hidden || drag ||
        $('dialog[open]') || track.matches(':hover') || focused ||
        track.scrollWidth <= track.clientWidth + 2) return;
    // A fresh CSS animation marks the same four-second interval as the timer.
    toggle.style.setProperty('--cycle', `${HOLD}ms`);
    requestAnimationFrame(() => {
      if (timer) toggle.classList.add('is-playing');
    });
    timer = setTimeout(() => {
      timer = null;
      if (next.disabled) direction = -1;
      if (previous.disabled) direction = 1;
      advance(direction);
      sync();
    }, HOLD);
  }
  previous.addEventListener('click', () => { advance(-1); sync(); });
  next.addEventListener('click', () => { advance(1); sync(); });
  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  track.addEventListener('scroll', update, { passive: true });
  // Restart after direct scrolling, so autoplay never interrupts an unfinished swipe.
  track.addEventListener('wheel', sync, { passive: true });
  track.addEventListener('touchstart', () => { clearTimeout(timer); timer = null; toggle.classList.remove('is-playing'); }, { passive: true });
  track.addEventListener('touchend', sync, { passive: true });
  track.addEventListener('touchcancel', sync, { passive: true });
  track.addEventListener('scrollend', sync);
  new ResizeObserver(() => { update(); sync(); }).observe(track);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); },
      { threshold: .25 }).observe(track);
  } else visible = true;
  ['pointerenter', 'pointerleave'].forEach(event => track.addEventListener(event, sync));
  ['focusin', 'focusout'].forEach(event => root.addEventListener(event, sync));
  ['motionchange', 'visibilitychange', 'dialogchange'].forEach(event => document.addEventListener(event, sync));
  track.addEventListener('keydown', (event) => {
    if (event.target !== track || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    if (event.key.startsWith('Arrow')) advance(event.key === 'ArrowRight' ? 1 : -1);
    else track.scrollTo({ left: event.key === 'Home' ? 0 : track.scrollWidth, behavior: 'instant' });
  });
  track.addEventListener('dragstart', (event) => event.preventDefault());
  track.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('a')) return;
    suppressClick = false;
    drag = { id: event.pointerId, x: event.clientX, left: track.scrollLeft, moved: false };
    sync();
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
    sync();
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
  return { reset() { finish(); direction = 1; track.scrollLeft = 0; update(); sync(); } };
}

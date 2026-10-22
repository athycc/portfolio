import { $ } from './dom.js';

const CYCLE = 4200;
const wrap = (value, size) => ((value % size) + size) % size;

// One visible-only animation loop; geometry is cached on resize, never read per frame.
export function initGallery(track, motion, onChange) {
  const summary = $('#project-summary');
  const previous = $('#project-prev'), next = $('#project-next'), position = $('#project-position');
  let cards = [], phase = 0, spacing = 300, visible = false, drag, tween;
  let frameId = 0, lastTime = 0, selected = -1, suppressClick = false;

  function canPlay() {
    return visible && cards.length > 1 && motion.enabled() && !document.hidden && !drag &&
      !$('dialog[open]') && !track.matches(':hover,:focus-within') && !summary.matches(':hover,:focus-within');
  }
  function render() {
    const count = cards.length;
    if (!count) return;
    cards.forEach((card, index) => {
      const distance = wrap(index - phase + count / 2, count) - count / 2;
      const shown = Math.abs(distance) < 2.05;
      card.inert = !shown;
      card.style.visibility = shown ? 'visible' : 'hidden';
      if (!shown) return;
      const depth = Math.abs(distance);
      card.style.transform = `translateX(calc(-50% + ${distance * spacing}px)) translateZ(${-depth * 110}px) rotateY(${-distance * 18}deg) scale(${1 - Math.min(depth, 2) * .06})`;
      card.style.opacity = Math.min(1, (2.05 - depth) * 1.4);
      card.style.zIndex = String(10 - Math.round(depth * 3));
    });
    const index = wrap(Math.round(phase), count);
    if (index !== selected) {
      selected = index;
      track.dataset.activeProject = cards[index].dataset.id;
      position.textContent = `${String(index + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;
      onChange(index);
    }
  }
  function frame(now) {
    frameId = 0;
    const delta = Math.min(now - (lastTime || now), 48);
    lastTime = now;
    if (tween) {
      const progress = Math.min(1, (now - tween.start) / 550);
      phase = tween.from + (tween.to - tween.from) * (1 - (1 - progress) ** 3);
      if (progress === 1) tween = null;
    } else if (canPlay()) phase += delta / CYCLE;
    render();
    if (tween || canPlay()) frameId = requestAnimationFrame(frame);
  }
  function sync() {
    if (!motion.enabled() && tween) { phase = tween.to; tween = null; render(); }
    if (tween || canPlay()) {
      if (!frameId) { lastTime = 0; frameId = requestAnimationFrame(frame); }
    } else {
      cancelAnimationFrame(frameId);
      frameId = 0;
      lastTime = 0;
    }
  }
  function go(target) {
    if (!cards.length) return;
    if (motion.enabled()) tween = { from: phase, to: target, start: performance.now() };
    else { phase = target; render(); }
    sync();
  }
  previous.addEventListener('click', () => go(Math.round(phase) - 1));
  next.addEventListener('click', () => go(Math.round(phase) + 1));
  track.addEventListener('keydown', event => {
    if (event.target !== track || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    go(event.key === 'Home' ? 0 : event.key === 'End' ? cards.length - 1 :
      Math.round(phase) + (event.key === 'ArrowRight' ? 1 : -1));
  });
  track.addEventListener('dragstart', event => event.preventDefault());
  track.addEventListener('pointerdown', event => {
    if (event.button !== 0 || event.target.closest('a')) return;
    suppressClick = false;
    tween = null;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, phase, moved: false };
    sync();
  });
  track.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
    if (!drag.moved && Math.abs(dy) > Math.max(8, Math.abs(dx))) { drag = null; sync(); return; }
    if (!drag.moved && Math.abs(dx) < 8) return;
    if (!drag.moved) {
      drag.moved = true;
      track.setPointerCapture(drag.id);
      track.classList.add('is-dragging');
    }
    event.preventDefault();
    phase = drag.phase - dx / spacing;
    render();
  });
  function finish() {
    if (!drag) return;
    const current = drag;
    drag = null;
    suppressClick = current.moved;
    if (track.hasPointerCapture(current.id)) track.releasePointerCapture(current.id);
    track.classList.remove('is-dragging');
    if (current.moved) go(Math.round(phase));
    else sync();
  }
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(event => track.addEventListener(event, finish));
  track.addEventListener('pointerleave', () => { if (drag && !drag.moved) finish(); sync(); });
  track.addEventListener('click', event => {
    if (!suppressClick) return;
    event.preventDefault(); event.stopPropagation(); suppressClick = false;
  }, true);
  ['pointerenter', 'focusin', 'focusout'].forEach(event => track.addEventListener(event, sync));
  ['pointerenter', 'pointerleave', 'focusin', 'focusout'].forEach(event => summary.addEventListener(event, sync));
  ['motionchange', 'visibilitychange', 'dialogchange'].forEach(event => document.addEventListener(event, sync));
  new ResizeObserver(() => {
    spacing = track.firstElementChild ? track.firstElementChild.offsetWidth * .98 : 300;
    render();
  }).observe(track);
  if ('IntersectionObserver' in window) new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting; sync();
  }, { threshold: .15 }).observe(track);
  else visible = true;
  return { reset() {
    finish(); tween = null; phase = 0; selected = -1;
    cards = [...track.children];
    previous.disabled = next.disabled = cards.length < 2;
    spacing = cards[0] ? cards[0].offsetWidth * .98 : 300;
    render(); sync();
  } };
}

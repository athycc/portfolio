import { $, $$ } from './dom.js';

export function initSlideshow(motion) {
  const gallery = $('.about-gallery'), stage = $('.photo-stage', gallery);
  const images = $$('[data-slide]', gallery), canvas = $('canvas', gallery);
  const context = canvas.getContext('2d');
  let index = 0, requested = 0, revision = 0, refinement, wipe;
  let lastY = window.scrollY, distance = 0, scrollFrame = 0, visible = false;

  function clearTransition() {
    clearTimeout(refinement);
    wipe?.cancel(); wipe = null;
    stage.classList.remove('is-transitioning');
  }
  function display(next, manual) {
    index = next;
    images.forEach((image, position) => {
      image.classList.toggle('is-active', position === index);
      image.setAttribute('aria-hidden', String(position !== index));
    });
    $('.gallery-count', gallery).textContent = `0${index + 1} / 03`;
    if (manual) $('#gallery-status').textContent = `Photo ${index + 1} of 3: ${images[index].alt}.`;
  }
  function drawPixels(image, columns) {
    canvas.width = columns;
    canvas.height = Math.round(columns * stage.clientHeight / stage.clientWidth);
    context.fillStyle = '#e8eef7';
    context.fillRect(0, 0, canvas.width, canvas.height);
    const scale = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const width = image.naturalWidth * scale, height = image.naturalHeight * scale;
    context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
  }
  async function select(next, manual = false) {
    clearTransition();
    requested = ((next % images.length) + images.length) % images.length;
    next = requested;
    const current = ++revision;
    try { await images[next].decode(); } catch { return; }
    if (current !== revision) return;
    if (next === index || !motion.enabled() || !context || !canvas.animate) { display(next, manual); return; }
    drawPixels(images[next], 12);
    stage.classList.add('is-transitioning');
    wipe = canvas.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0)' }],
      { duration: 180, easing: 'ease-out', fill: 'forwards' });
    const levels = [24, 48, 96];
    let step = 0;
    function sharpen() {
      if (current !== revision) return;
      if (step < levels.length) {
        drawPixels(images[next], levels[step++]);
        refinement = setTimeout(sharpen, 40);
      } else { display(next, manual); clearTransition(); }
    }
    refinement = setTimeout(sharpen, 80);
  }
  function onScroll() {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      const currentY = window.scrollY;
      distance += currentY - lastY; lastY = currentY;
      if (!motion.enabled() || document.hidden || $('dialog[open]')) { distance = 0; return; }
      const steps = Math.trunc(distance / 96);
      if (steps) { distance -= steps * 96; select(requested + Math.sign(steps)); }
    });
  }
  function sync() {
    window.removeEventListener('scroll', onScroll);
    cancelAnimationFrame(scrollFrame); scrollFrame = 0;
    lastY = window.scrollY; distance = 0;
    if (visible && motion.enabled() && !document.hidden && !$('dialog[open]'))
      window.addEventListener('scroll', onScroll, { passive: true });
    if (!motion.enabled()) { revision++; clearTransition(); }
  }
  $('.gallery-next', gallery).addEventListener('click', () => select(requested + 1, true));
  ['visibilitychange', 'motionchange', 'dialogchange'].forEach(event => document.addEventListener(event, sync));
  if ('IntersectionObserver' in window) new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting; sync();
  }, { threshold: .05 }).observe(gallery);
  else visible = true;
  sync();
}

import { $, $$ } from './dom.js';

export function photoIndex(distance, step, count) {
  return Math.max(0, Math.min(count - 1, Math.floor(distance / step)));
}

export function initSlideshow(motion) {
  const gallery = $('.about-gallery'), stage = $('.photo-stage', gallery);
  const scene = $('.about-scene'), section = $('#about');
  const images = $$('[data-slide]', gallery), canvas = $('canvas', gallery);
  const context = canvas.getContext('2d');
  let index = 0, requested = 0, revision = 0, refinement, wipe;
  let scrollFrame = 0, step = 1;

  function clearTransition() {
    clearTimeout(refinement);
    wipe?.cancel(); wipe = null;
    stage.classList.remove('is-transitioning');
  }
  function display(next, manual) {
    index = next;
    images.forEach((image, position) => {
      image.dataset.stackDepth = String((position - index + images.length) % images.length);
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
    const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
    const width = image.naturalWidth * scale, height = image.naturalHeight * scale;
    const position = getComputedStyle(image).objectPosition.split(' ').map(value => parseFloat(value) / 100);
    context.drawImage(image, (canvas.width - width) * position[0], (canvas.height - height) * position[1], width, height);
  }
  async function select(next, manual = false) {
    requested = ((next % images.length) + images.length) % images.length;
    next = requested;
    clearTransition();
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
  function start() {
    return window.scrollY + scene.getBoundingClientRect().top + Math.max(0, section.offsetHeight - innerHeight);
  }
  function onScroll() {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      if (!motion.enabled() || document.hidden || $('dialog[open]')) return;
      const next = photoIndex(window.scrollY - start(), step, images.length);
      if (next !== requested) select(next);
    });
  }
  function measure() {
    step = Math.max(320, innerHeight * .85);
    scene.style.setProperty('--about-height', `${section.offsetHeight}px`);
    scene.style.setProperty('--photo-travel', `${images.length * step}px`);
    onScroll();
  }
  function sync() {
    window.removeEventListener('scroll', onScroll);
    cancelAnimationFrame(scrollFrame); scrollFrame = 0;
    if (motion.enabled() && !document.hidden && !$('dialog[open]'))
      window.addEventListener('scroll', onScroll, { passive: true });
    if (!motion.enabled()) { revision++; clearTransition(); }
    measure();
  }
  $('.gallery-next', gallery).addEventListener('click', () => {
    const next = (requested + 1) % images.length;
    select(next, true);
    if (motion.enabled()) window.scrollTo({ top: start() + next * step + 1, behavior: 'instant' });
  });
  ['visibilitychange', 'motionchange', 'dialogchange'].forEach(event => document.addEventListener(event, sync));
  new ResizeObserver(measure).observe(section);
  addEventListener('resize', measure, { passive: true });
  document.fonts?.ready.then(measure);
  sync();
}

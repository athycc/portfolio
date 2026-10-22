import { $, $$ } from './dom.js';

export function initSlideshow(motion) {
  const gallery = $('.about-gallery');
  const stage = $('.photo-stage', gallery);
  const images = $$('[data-slide]', gallery);
  const choices = $$('[data-photo]', gallery);
  const toggle = $('.slideshow-toggle', gallery);
  const canvas = $('canvas', gallery);
  const context = canvas.getContext('2d');
  let index = 0, visible = false, paused = false, userStarted = false;
  let autoplay, refinement, wipe, revision = 0;

  function clearTransition() {
    clearTimeout(refinement);
    wipe?.cancel();
    wipe = null;
    stage.classList.remove('is-transitioning');
  }

  function display(next, manual) {
    index = next;
    images.forEach((image, position) => {
      image.classList.toggle('is-active', position === index);
      image.setAttribute('aria-hidden', String(position !== index));
    });
    choices.forEach((button, position) => button.setAttribute('aria-pressed', String(position === index)));
    $('.gallery-count', gallery).textContent = `0${index + 1} / 03`;
    if (manual) $('#gallery-status').textContent = `Photo ${index + 1} of 3: ${choices[index].textContent.trim()}.`;
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
    clearTimeout(autoplay);
    clearTransition();
    const current = ++revision;
    next = (next + images.length) % images.length;
    if (manual) { paused = true; userStarted = false; }
    try { await images[next].decode(); } catch {
      $('#gallery-status').textContent = 'This photo could not load. Choose another photo.';
      sync();
      return;
    }
    if (current !== revision) return;
    if (next === index || !motion.enabled() || !context || !canvas.animate) {
      display(next, manual);
      sync();
      return;
    }
    drawPixels(images[next], 12);
    stage.classList.add('is-transitioning');
    wipe = canvas.animate([
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)' },
    ], { duration: 460, easing: 'ease-in-out', fill: 'forwards' });
    const levels = [20, 36, 64, 112];
    let step = 0;
    function sharpen() {
      if (current !== revision) return;
      if (step < levels.length) {
        drawPixels(images[next], levels[step++]);
        refinement = setTimeout(sharpen, 120);
      } else {
        display(next, manual);
        clearTransition();
        sync();
      }
    }
    refinement = setTimeout(sharpen, 220);
  }

  function sync() {
    clearTimeout(autoplay);
    toggle.disabled = !motion.enabled();
    toggle.textContent = paused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-label', paused ? 'Play photo slideshow' : 'Pause photo slideshow');
    toggle.setAttribute('aria-pressed', String(paused));
    if (!motion.enabled()) { revision++; clearTransition(); }
    const blocked = !visible || document.hidden || $('dialog[open]') ||
      (!userStarted && gallery.matches(':focus-within,:hover'));
    if (motion.enabled() && !paused && !blocked) autoplay = setTimeout(() => select(index + 1), 4200);
  }

  choices.forEach((button) => button.addEventListener('click', () => select(Number(button.dataset.photo), true)));
  $('.gallery-next', gallery).addEventListener('click', () => select(index + 1, true));
  toggle.addEventListener('click', () => { paused = !paused; userStarted = !paused; sync(); });
  ['pointerenter', 'pointerleave', 'focusin', 'focusout'].forEach((event) => gallery.addEventListener(event, sync));
  ['visibilitychange', 'motionchange', 'dialogchange'].forEach((event) => document.addEventListener(event, sync));
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.15 }).observe(gallery);
  } else visible = true;
  sync();
}

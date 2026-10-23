// Scroll-driven scenes work without CSS view-timeline support, including narrow screens.
export function initScenes(motion) {
  const scene = document.querySelector('.hero-scene');
  const hero = document.querySelector('#home');
  const video = hero.querySelector('video');
  const surfaces = [...document.querySelectorAll('[data-flow]')];
  const visible = new Set();
  let frame = 0, heroHeight = 0, viewport = innerHeight;
  const clamp = value => Math.max(0, Math.min(1, value));
  function update() {
    frame = 0;
    if (!motion.enabled() || document.hidden) return;
    const progress = clamp((scrollY - Math.max(0, heroHeight - viewport)) / viewport);
    scene.style.setProperty('--scene-progress', progress.toFixed(4));
    for (const surface of visible) {
      const rect = surface.getBoundingClientRect();
      const travel = (viewport - rect.top) / (viewport + rect.height) - .5;
      surface.style.setProperty('--field-shift', `${(travel * 140).toFixed(1)}px`);
    }
  }
  function schedule() {
    if (!frame && motion.enabled() && !document.hidden) frame = requestAnimationFrame(update);
  }
  function measure() {
    viewport = innerHeight;
    heroHeight = hero.offsetHeight;
    scene.style.setProperty('--hero-height', `${heroHeight}px`);
    schedule();
  }
  function sync() {
    const playing = motion.enabled() && !document.hidden && !document.querySelector('dialog[open]') && visible.has(hero);
    if (playing) video.play().catch(() => {});
    else video.pause();
    measure();
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
      sync();
    }).observe(hero);
    const fields = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
      schedule();
    });
    surfaces.slice(1).forEach(surface => fields.observe(surface));
  } else surfaces.forEach(surface => visible.add(surface));
  new ResizeObserver(measure).observe(hero);
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', measure, { passive: true });
  for (const event of ['motionchange','visibilitychange','dialogchange']) document.addEventListener(event, sync);
  document.fonts?.ready.then(measure);
  sync();
}

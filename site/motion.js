import { $, $$ } from './dom.js';

export function createMotion() {
  const system = matchMedia('(prefers-reduced-motion: reduce)');
  const enabled = () => !system.matches;
  const surfaces = $$('[data-flow]');
  surfaces.slice(1).forEach(surface => {
    [...surface.children].filter(child => !child.classList.contains('flow-field')).forEach((child, index) => {
      child.classList.add('section-content');
      child.style.setProperty('--section-order', index);
    });
  });
  const seen = new WeakSet();
  const navigation = $$('nav a[href^="#"]');

  function syncFlow() {
    const playing = enabled() && !document.hidden && !$('dialog[open]');
    surfaces.forEach((surface) => surface.classList.toggle('flow-active',
      playing && surface.dataset.inView === 'true'));
  }
  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove('is-pending');
        entry.target.classList.add('is-visible');
        seen.add(entry.target);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.04 }) : null;

  function reveal(root = document) {
    $$('.reveal,.project,.timeline-item,.volunteer-item,.award,.skill-group,.cert-item,.photo-pair figure', root)
      .forEach((element) => {
        element.classList.add('motion-reveal');
        if (!enabled() || !observer || seen.has(element)) {
          element.classList.remove('is-pending');
          return;
        }
        if (element.getBoundingClientRect().bottom <= 0) return;
        element.classList.add('is-pending');
        observer.observe(element);
      });
  }

  function apply() {
    document.documentElement.dataset.motion = enabled() ? 'full' : 'reduced';
    if (!enabled()) $$('.is-pending').forEach((item) => item.classList.remove('is-pending'));
    syncFlow();
    document.dispatchEvent(new Event('motionchange'));
  }

  if ('IntersectionObserver' in window) {
    const visibility = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { entry.target.dataset.inView = String(entry.isIntersecting); });
      syncFlow();
    });
    surfaces.forEach((surface) => visibility.observe(surface));
    const sections = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        navigation.forEach((link) => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-15% 0px -65% 0px' });
    surfaces.forEach((surface) => sections.observe(surface));
  } else surfaces.forEach((surface) => { surface.dataset.inView = 'true'; });

  document.addEventListener('focusin', (event) => {
    const pending = event.target.closest('.is-pending');
    pending?.classList.remove('is-pending');
  });
  system.addEventListener('change', apply);
  document.addEventListener('visibilitychange', syncFlow);
  document.addEventListener('dialogchange', syncFlow);
  document.body.classList.add('hero-reveal');
  apply();
  reveal();
  const clear = (root) => $$('.motion-reveal', root).forEach((item) => observer?.unobserve(item));
  return { enabled, reveal, clear };
}

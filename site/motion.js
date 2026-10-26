import { $, $$ } from './dom.js';

// Keep the existing basic reveals; the shared motion system is a separate approval stage.
export function createMotion() {
  const system = matchMedia('(prefers-reduced-motion: reduce)');
  const enabled = () => !system.matches;
  const navigation = $$('nav a[href^="#"]');
  function setCurrent(id) {
    navigation.forEach(link => {
      if (id && link.hash === '#' + id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const {target,isIntersecting} of entries) {
      if(!isIntersecting) continue;
      target.classList.remove('is-pending');
      observer.unobserve(target);
    }
  }, {threshold:.04}) : null;
  const items = $$('.reveal,.timeline-item,.volunteer-item,.award,.skill-group,.cert-item,.photo-pair figure');
  items.forEach(item => {
    item.classList.add('motion-reveal');
    if(enabled() && observer) { item.classList.add('is-pending'); observer.observe(item); }
  });
  function apply() {
    document.documentElement.dataset.motion = enabled() ? 'full' : 'reduced';
    if(!enabled()) items.forEach(item=>item.classList.remove('is-pending'));
    document.dispatchEvent(new Event('motionchange'));
  }
  if ('IntersectionObserver' in window) {
    const surfaces = $$('main > [data-flow]');
    let sections, resizeFrame;
    function watchSections() {
      sections?.disconnect();
      const line = Math.round(innerHeight * .3);
      const bottom = Math.max(0, innerHeight - line - 1);
      sections = new IntersectionObserver(() => {
        const current = surfaces.find(surface => {
          const rect = surface.getBoundingClientRect();
          return rect.top <= line && rect.bottom > line;
        });
        setCurrent(current?.id);
      }, { root: document, rootMargin: '-'+line+'px 0px -'+bottom+'px 0px' });
      surfaces.forEach(surface => sections.observe(surface));
    }
    watchSections();
    window.addEventListener('resize', () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(watchSections);
    }, { passive: true });
  }
  document.addEventListener('focusin',event=>event.target.closest('.is-pending')?.classList.remove('is-pending'));
  system.addEventListener('change',apply);
  apply();
  return { enabled, activate: section => setCurrent(section.closest('[data-flow]')?.id) };
}

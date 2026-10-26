import { $, $$ } from './dom.js';

// Keep the existing basic reveals; the shared motion system is a separate approval stage.
export function createMotion() {
  const system = matchMedia('(prefers-reduced-motion: reduce)');
  const enabled = () => !system.matches;
  const navigation = $$('nav a[href^="#"]');
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
  if('IntersectionObserver' in window) {
    const sections = new IntersectionObserver(entries=>{
      for(const {target,isIntersecting} of entries) {
        if(!isIntersecting) continue;
        navigation.forEach(link=>{
          if(link.hash==='#'+target.id) link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        });
      }
    }, {rootMargin:'-15% 0px -65% 0px'});
    $$('main > [data-flow]').forEach(section=>sections.observe(section));
  }
  document.addEventListener('focusin',event=>event.target.closest('.is-pending')?.classList.remove('is-pending'));
  system.addEventListener('change',apply);
  apply();
  return {enabled};
}

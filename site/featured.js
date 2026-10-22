import { $, $$ } from './dom.js';

export function initFeatured(motion) {
  const features = [
    ['south', 'S↗', 'Featured · Web development', 'AWS SCD South', 'Built. Animated. Tested.'],
    ['sync', 'S.', 'Featured · Quality assurance', 'SYNC Event Platform', '400+ users. A clearer flow.'],
    ['backlog', '170', 'Featured · Data analytics', 'Product Backlog Dashboard', '170 items. One clear view.'],
  ];
  let selected = 0, visible = false, timer;
  function update(index) {
    selected = index;
    const [id, mark, kicker, title, subtitle] = features[index];
    $('#featured-mini').dataset.project = id;
    $('#mini-art').textContent = mark;
    $('#mini-kicker').textContent = kicker;
    $('#mini-title').replaceChildren(document.createTextNode(title), document.createElement('br'), document.createTextNode(subtitle));
    $$('[data-feature]').forEach((button) => button.setAttribute('aria-current', String(Number(button.dataset.feature) === index)));
  }
  function sync() {
    clearInterval(timer);
    if (!motion.enabled() || !visible || document.hidden || $('dialog[open]')) return;
    timer = setInterval(() => {
      if (!$('.featured-area').matches(':focus-within,:hover')) update((selected + 1) % features.length);
    }, 4200);
  }
  $$('[data-feature]').forEach((button) => button.addEventListener('click', () => {
    update(Number(button.dataset.feature)); sync();
  }));
  if ('IntersectionObserver' in window) new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting; sync();
  }).observe($('#home'));
  else visible = true;
  ['motionchange','visibilitychange','dialogchange'].forEach((event) => document.addEventListener(event, sync));
  sync();
}

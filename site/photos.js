import { $, $$ } from './dom.js';

export function initPhotos() {
  const gallery = $('.about-gallery');
  const images = $$('[data-slide]', gallery);
  let index = 0;
  function show(next) {
    index = (next + images.length) % images.length;
    images.forEach((image, i) => {
      image.classList.toggle('is-active', i === index);
      image.hidden = i !== index;
      image.setAttribute('aria-hidden', String(i !== index));
    });
    $('.gallery-count', gallery).textContent = '0'+(index+1)+' / 0'+images.length;
    $('#gallery-status').textContent = 'Photo '+(index+1)+' of '+images.length+': '+images[index].alt;
  }
  $('.gallery-next', gallery).addEventListener('click', () => show(index+1));
  $('.gallery-prev', gallery).addEventListener('click', () => show(index-1));
  show(0);
}

export function initHeroMedia(motion) {
  const video = $('.hero-film');
  let visible = false, ready = false;
  function sync() {
    if(ready && visible && motion.enabled() && !document.hidden && !$('dialog[open]')) {
      video.play().catch(() => {});
    } else video.pause();
  }
  if('IntersectionObserver' in window) new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting; sync();
  }).observe(video);
  else visible = true;
  const start = () => {
    ready = true; sync();
  };
  if(document.readyState === 'complete') start();
  else window.addEventListener('load', start, {once:true});
  ['motionchange','visibilitychange','dialogchange'].forEach(event => document.addEventListener(event,sync));
}

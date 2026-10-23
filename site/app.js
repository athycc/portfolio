import data from './data.js';
import { $, $$ } from './dom.js';
import { renderContent } from './content.js';
import { createMotion } from './motion.js';
import { createDialogs } from './dialogs.js';
import { initProjects } from './projects.js';
import { initSlideshow } from './slideshow.js';
import { initFeatured } from './featured.js';
import { initPointerHints } from './pointer.js';
import { initScenes } from './scene.js';

renderContent(data);
const motion = createMotion();
const dialogs = createDialogs(motion.enabled);
initProjects(data, dialogs, motion);
initSlideshow(motion);
initFeatured(motion);
initPointerHints(motion);
initScenes(motion);

$$('.menu-content a').forEach((link, index) => link.style.setProperty('--menu-index', index));
document.addEventListener('click', async (event) => {
  const target = event.target.closest('button,a');
  if (!target) return;
  const destinations = { 'data-contact': '#contact-dialog', 'data-resume': '#resume-dialog', 'data-menu': '#menu-dialog' };
  for (const [attribute, selector] of Object.entries(destinations)) {
    if (target.hasAttribute(attribute)) dialogs.open($(selector), target);
  }
  if (!target.matches('#menu-dialog a[href^="#"]')) return;
  event.preventDefault();
  const hash = target.getAttribute('href');
  const section = $(hash), heading = $('h1,h2', section);
  heading.tabIndex = -1;
  await dialogs.close($('#menu-dialog'), heading);
  history.pushState(null, '', hash);
  section.scrollIntoView({ behavior: motion.enabled() ? 'smooth' : 'instant' });
  heading.focus({ preventScroll: true });
});

$('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const fields = new FormData(form);
  const subject = encodeURIComponent('Portfolio enquiry from ' + fields.get('name'));
  const body = encodeURIComponent(`${fields.get('message')}\n\nFrom: ${fields.get('name')}\nReply to: ${fields.get('email')}`);
  const draft = document.createElement('a');
  draft.href = `mailto:notadocath@gmail.com?subject=${subject}&body=${body}`;
  draft.click();
  $('#copy-status').textContent = 'Email draft requested. Your email app will handle sending.';
});
$('#copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('notadocath@gmail.com');
    $('#copy-status').textContent = 'Email address copied.';
  } catch { $('#copy-status').textContent = 'Copy this email address: notadocath@gmail.com'; }
});

import data from './data.js';
import { $, $$ } from './dom.js';
import { renderContent, renderResume } from './content.js';
import { createMotion } from './motion.js';
import { createDialogs } from './dialogs.js';
import { initProjects } from './projects.js';
import { initPhotos, initHeroMedia } from './photos.js';

renderContent(data);
const motion = createMotion();
const dialogs = createDialogs(motion.enabled);
initProjects(data, dialogs, motion);
initPhotos();
initHeroMedia(motion);

$$('.menu-content a').forEach((link, index) => link.style.setProperty('--menu-index', index));
document.addEventListener('click', async (event) => {
  const target = event.target.closest('button,a');
  if (!target) return;
  const destinations = { 'data-contact': '#contact-dialog', 'data-resume': '#resume-dialog', 'data-menu': '#menu-dialog' };
  for (const [attribute, selector] of Object.entries(destinations)) {
    if (!target.hasAttribute(attribute)) continue;
    if (attribute === 'data-resume') renderResume(data);
    dialogs.open($(selector), target);
  }
  if (!target.matches('a[href^="#"]')) return;
  const hash = target.getAttribute('href');
  const section = document.getElementById(hash.slice(1));
  if (!section) return;
  event.preventDefault();
  const heading = section.matches('h1,h2,h3,main') ? section : $('h1,h2,h3', section) || section;
  heading.tabIndex = -1;
  if (target.closest('#menu-dialog')) await dialogs.close($('#menu-dialog'), heading);
  if (location.hash !== hash) history.pushState(null, '', hash);
  section.scrollIntoView({ behavior: 'instant' });
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

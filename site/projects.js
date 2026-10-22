import { $, $$, escapeHTML as esc, arrow, tags } from './dom.js';
import { initGallery } from './gallery.js';

export function initProjects(data, dialogs, motion) {
  const container = $('#projects');
  let filter = 'all';
  let matching = data.projects;
  const gallery = initGallery(container, motion, (index) => {
    const project = matching[index];
    if (!project) return;
    $('#project-summary').innerHTML = `
      <div><span class="eyebrow">${esc(project.label)} · ${esc(project.year)}</span>
      <h3><button class="plain-button" data-project="${project.id}">${esc(project.title)} ${arrow}</button></h3>
      <p>${esc(project.summary)}</p><div class="tags">${tags(project.tech)}</div></div>
      <div class="project-summary-actions">
        <button class="pill" data-project="${project.id}">Explore project ${arrow}</button>
        ${project.archive ? link(project.archive, 'Project folder') : project.url ? link(project.url, project.url.replace('https://', '')) : ''}
      </div>`;
  });
  function artwork(project) {
    return `<img src="${esc(project.image)}" alt="${esc(project.imageAlt || project.title + ' portfolio image')}"
      width="${project.imageWidth || 1200}" height="${project.imageHeight || 800}" loading="lazy" decoding="async"
      class="${project.brandImage || ['backlog','looker'].includes(project.id) ? 'project-brand' : ''}">`;
  }
  function link(url, label, className = 'project-url', accessibleName = label) {
    return `<a class="${className}" aria-label="${esc(accessibleName)}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
  }
  function render() {
    matching = data.projects.filter((project) => filter === 'all' || project.category === filter);
    motion.clear(container);
    container.innerHTML = matching.map((project) => `
      <article class="project" data-id="${project.id}" aria-label="${esc(project.title)}">
        <div class="project-visual">${artwork(project)}
          <button class="project-open" data-project="${project.id}" aria-label="Open ${esc(project.title)} project details"><span class="visual-arrow">${arrow}</span></button>
        </div>
        <h3><button data-project="${project.id}">${esc(project.title)}</button></h3>
      </article>`).join('');
    $('#project-count').textContent = `${matching.length} projects`;
    gallery.reset();
  }
  function openProject(id, trigger) {
    const project = data.projects.find((item) => item.id === id);
    if (!project) return;
    $('#project-dialog-body').innerHTML = `
      <span class="eyebrow">${esc(project.label)}</span>
      <h2 id="project-dialog-title">${esc(project.title)}</h2>
      <p>${esc(project.summary)}</p><div class="tags">${tags(project.tech)}</div>
      <h3>My contribution</h3><ul>${project.details.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      ${project.image ? `<div class="project-modal-media"><img src="${esc(project.image)}" alt="${esc(project.imageAlt || project.title)}"></div>` : ''}
      ${project.video ? `<div class="project-modal-media"><video controls preload="none" playsinline poster="${esc(project.image)}"><source src="${esc(project.video)}" type="video/mp4"></video></div>` : ''}
      <p class="project-stage-note">${esc(project.note)}</p>
      <div class="dialog-actions">
        ${project.url ? link(project.url, project.url.includes('github.com') ? 'View repository' : 'Visit website', 'pill') : ''}
        ${project.archive ? link(project.archive, 'Open project folder', 'pill outline') : ''}
        ${project.media ? link(project.media, 'Open original demo', 'pill outline') : ''}
      </div>`;
    dialogs.open($('#project-dialog'), trigger);
  }
  document.addEventListener('click', (event) => {
    const project = event.target.closest('[data-project]');
    if (project) openProject(project.dataset.project, project);
    const choice = event.target.closest('[data-filter]');
    if (!choice) return;
    filter = choice.dataset.filter;
    $$('[data-filter]').forEach((button) => button.setAttribute('aria-pressed', String(button === choice)));
    render();
  });
  render();
}

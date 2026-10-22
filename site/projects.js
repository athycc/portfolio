import { $, $$, escapeHTML as esc, arrow, tags } from './dom.js';

export function initProjects(data, dialogs, motion) {
  const container = $('#projects');
  let expanded = false, filter = 'all';
  const art = {
    agent: `<div class="agent-flow"><div class="flow-step">Research public sources</div><div class="flow-step">Verify and track contacts</div><div class="flow-step approval">Human review & approval</div><div class="flow-step">Prepare outreach</div></div>`,
    learning: `<div class="learning-window"><strong>AegisLearn.</strong><small>Internship learning and secure documents.</small><div class="learning-blocks"><span>Internship learning</span><span>Secure documents</span></div></div>`,
  };
  function artwork(project) {
    if (!project.image) return `<div class="project-art" aria-hidden="true">${art[project.art]}<span class="art-caption">Project illustration</span></div>`;
    return `<img src="${esc(project.image)}" alt="${esc(project.imageAlt || project.title + ' portfolio image')}"
      width="${project.imageWidth || 1200}" height="${project.imageHeight || 800}" loading="lazy" decoding="async"
      class="${project.brandImage || ['backlog','financial'].includes(project.id) ? 'project-brand' : ''}">`;
  }
  function link(url, label, className = 'project-url', accessibleName = label) {
    return `<a class="${className}" aria-label="${esc(accessibleName)}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
  }
  function render() {
    const matching = data.projects.filter((project) => filter === 'all' || project.category === filter);
    const visible = expanded || filter !== 'all' ? matching : matching.slice(0, 6);
    motion.clear(container);
    container.innerHTML = visible.map((project) => `
      <article class="project" data-id="${project.id}">
        <div class="project-visual">${artwork(project)}
          <button class="project-open" data-project="${project.id}" aria-label="Open ${esc(project.title)} project details"><span class="visual-arrow">${arrow}</span></button>
        </div>
        <div class="project-meta"><span>${esc(project.label)}</span><span>${esc(project.year)}</span></div>
        <h3><button data-project="${project.id}">${esc(project.title)}</button></h3>
        <p class="project-description">${esc(project.summary)}</p>
        <div class="tags">${tags(project.tech)}</div>
        <div class="project-bottom">
          <button class="text-link plain-button" data-project="${project.id}">Project notes ${arrow}</button>
          ${project.archive ? link(project.archive, 'Project folder', 'project-url', 'Open '+project.title+' project folder') : project.url
            ? link(project.url, project.url.replace('https://', '')) : `<span class="project-url">${esc(project.status)}</span>`}
        </div>
      </article>`).join('');
    $('#project-count').textContent = `${visible.length} of ${matching.length} projects`;
    const more = $('#show-more');
    more.hidden = filter !== 'all';
    more.textContent = expanded ? 'Show selected projects −' : `Show all ${data.projects.length} projects +`;
    motion.reveal(container);
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
  $('#show-more').addEventListener('click', () => {
    expanded = !expanded;
    render();
    if (!expanded) $('#work').scrollIntoView({ behavior: motion.enabled() ? 'smooth' : 'instant' });
  });
  render();
}

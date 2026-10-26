import { $, $$, escapeHTML as esc, tags } from './dom.js';

export function matchingProjects(projects, filter = 'all') {
  return projects.filter(project => filter === 'all' || project.filters.includes(filter))
    .sort((a, b) => a.priority - b.priority);
}

const websiteArtwork = { south: '/projects/scd-south.png', mega: '/projects/scd-mega-manila.png' };
const link = (url, label, className = 'project-url') => '<a class="'+className+'" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' <span aria-hidden="true">↗</span></a>';

export function projectCard(project, featured = false) {
  const source = project.resource || project.url || project.archive;
  const tools = project.tech.includes('Playwright') ? ['Playwright', ...project.tech.filter(tool => tool !== 'Playwright')] : project.tech;
  const inset = websiteArtwork[project.id] ? '<span class="project-inset" aria-hidden="true"><img src="'+websiteArtwork[project.id]+'" alt="" width="1200" height="800" loading="lazy"><span>Website preview</span></span>' : '';
  const art = project.image ? '<img src="'+esc(project.image)+'" alt="'+esc(project.imageAlt || project.title+' portfolio image')+'" width="'+(project.imageWidth||1200)+'" height="'+(project.imageHeight||800)+'" loading="lazy" decoding="async">' : '<div class="story-art" aria-hidden="true"><span>OUTREACH → WORKFLOW → REPORTING</span><strong>Edukasyon.ph</strong><span>APPS SCRIPT · GMAIL · SHEETS</span></div>';
  return '<article class="project work-card" data-id="'+project.id+'"><div class="project-visual">'+art+inset+'</div><div class="work-card-body"><div class="card-kicker">'+(featured ? 'Featured · ' : project.featured ? 'Featured · ' : '')+esc(featured && project.featuredLabel || project.label)+'</div><h4><button class="project-title" data-project="'+project.id+'">'+esc(project.title)+' <span aria-hidden="true">↗</span></button></h4><div class="tags">'+tags(tools.slice(0,featured ? 4 : 3))+'</div><p>'+esc(featured && project.featuredSummary || project.summary)+'</p><div class="work-card-actions"><button class="text-link" data-project="'+project.id+'" aria-label="Read case study: '+esc(project.title)+'">Read case study <span aria-hidden="true">↗</span></button>'+(source?link(source,project.resource?'Project file':project.url?.includes('github.com')?'Repository':project.url?'Live site':'Project folder'):'<span class="card-kicker">Experience case study</span>')+'</div></div></article>';
}

export function initProjects(data, dialogs, motion) {
  const container = $('#projects');
  const records = [...data.projects, ...data.deliveryStories];
  if (!$('#featured-projects').children.length) $('#featured-projects').innerHTML = ['mega','south','edukasyon','sync'].map(id=>projectCard(records.find(p=>p.id===id),true)).join('');
  let selected = 'all';
  function render(animate = false) {
    const matching = matchingProjects(data.projects,selected);
    const before = new Map([...container.children].map(el=>[el.dataset.id,el.getBoundingClientRect()]));
    container.innerHTML = matching.map(p=>projectCard(p)).join('');
    $('#project-count').textContent = matching.length+' of '+data.projects.length+' projects · '+($('[data-filter="'+selected+'"]').textContent);
    if (animate && motion.enabled()) [...container.children].forEach((el,index)=>{
      const old = before.get(el.dataset.id), next=el.getBoundingClientRect();
      el.animate([{opacity:old?1:0,transform:old?'translate('+(old.left-next.left)+'px,'+(old.top-next.top)+'px)':'translateY(12px)'},{opacity:1,transform:'none'}],{duration:400,easing:'cubic-bezier(.22,1,.36,1)',delay:Math.min(index*40,160)});
    });
  }
  function openProject(id, trigger) {
    const project = records.find(p=>p.id===id);
    if(!project) return;
    const study = project.caseStudy;
    const extraArtwork = websiteArtwork[project.id] ? '<figure class="case-artwork"><img src="'+websiteArtwork[project.id]+'" alt="'+esc(project.title)+' website interface" width="1200" height="800" loading="lazy"><figcaption>Website artwork · '+esc(project.label)+'</figcaption></figure>' : '';
    const block = (title, text) => '<section class="case-section"><h3>'+title+'</h3><p>'+esc(text)+'</p></section>';
    $('#project-dialog-body').innerHTML = '<p class="eyebrow">'+esc(project.label)+'</p><h2 id="project-dialog-title">'+esc(project.title)+'</h2>'+(project.image?'<div class="project-screen">'+(project.video?'<video controls muted playsinline preload="metadata" poster="'+esc(project.image)+'"><source src="'+esc(project.video)+'" type="video/mp4"></video>':'<img src="'+esc(project.image)+'" alt="'+esc(project.imageAlt||project.title)+'" width="'+(project.imageWidth||1200)+'" height="'+(project.imageHeight||800)+'">')+'</div>':'')+extraArtwork+'<p>'+esc(project.summary)+'</p><div class="case-grid">'+block('Goal',study.goal)+block('My role',study.role)+block('Team &amp; stakeholders',study.team)+block('Timeline',study.timeline)+'<section class="case-section"><h3>Tools</h3><div class="tags">'+tags(project.tech)+'</div></section><section class="case-section case-wide"><h3>How I ran it</h3><ul>'+(study.approach || project.details).map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></section>'+block('Risks &amp; fixes',study.risks)+block('Result',study.result || project.summary)+block('What I’d do differently',study.reflection)+'</div><p class="project-stage-note">'+esc(project.note)+'</p><div class="dialog-actions">'+(project.resource?link(project.resource,project.resourceLabel,'pill'):'')+(project.url?link(project.url,project.url.includes('github.com')?'View repository':'Visit website','pill'):'')+(project.archive?link(project.archive,'Open project folder','pill outline'):'')+(project.media?link(project.media,'Open original demo','pill outline'):'')+'</div>';
    dialogs.open($('#project-dialog'),trigger);
    $('#project-dialog').scrollTop=0;
  }
  document.addEventListener('click',event=>{
    const project=event.target.closest('[data-project]');
    if(project) openProject(project.dataset.project,project);
    const choice=event.target.closest('[data-filter]');
    if(!choice || selected===choice.dataset.filter) return;
    selected=choice.dataset.filter;
    $$('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button===choice)));
    render(true);
  });
  render();
}

import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const data = (await import('../site/data.js')).default;
for (const project of data.projects) {
  if (!/^[a-z][a-z0-9-]*$/.test(project.id)) throw new Error('Invalid project ID');
  for (const url of [project.url, project.resource, project.archive, project.media].filter(Boolean)) {
    if (new URL(url).protocol !== 'https:') throw new Error('Project links must use HTTPS');
  }
}
const resume = [
  'NOTADO, CATHERINE',
  'Quezon City, Philippines | +63 920 306 6498 | notadocath@gmail.com',
  'https://www.linkedin.com/in/catherine-notado-679a29246/',
  'https://cathportfolio.vercel.app/ | https://github.com/athycc',
  '', 'EXPERIENCES',
  ...data.experience.flatMap(e => ['', `${e.role} — ${e.org}`, e.period, ...e.bullets.map(b => `- ${b}`)]),
  '', 'TECHNICAL SKILLS',
  ...data.skills.map(([title,...items]) => `${title}: ${items.join(', ')}`),
  '', 'PROJECTS & PARTICIPATION',
  ...data.projects.flatMap(p => ['', `${p.title} — ${p.status}`, p.year, p.summary, `Technologies / methods: ${p.tech.join(', ')}`, ...(p.url ? [p.url] : []), ...(p.resource ? [`Project file: ${p.resource}`] : []), ...(p.archive ? [`Project folder: ${p.archive}`] : []), ...(p.media ? [`Original demo: ${p.media}`] : [])]),
  '', 'LEADERSHIP EXPERIENCE',
  'Founder & CEO — AWS Student Builder Group Alpha | September 2025–Present',
  '- Founded RTU’s AWS Learning Club, leading chapter strategy, operations, partnerships, and student engagement.',
  '- Led AWS Student Community Day Mega Manila 2026 as Event Head for 390 attendees, coordinating 52 volunteers and 5 sponsors.',
  '- Oversaw speaker coordination, registration, volunteer assignments, logistics, and post-event reporting.',
  'AWS Student Builder Group Lead | November 2025–Present',
  '- Organize cloud education initiatives and university chapter student engagement.',
  'RTU Student Council Department of Archives | October 2023–August 2024',
  '- Managed document distribution and archives; supported event planning and coordination.',
  '', 'EDUCATION',
  'Rizal Technological University | Bachelor of Science in Information Technology | 2023–Present',
  'Academic Achiever',
  'Scholarships: Quezon City Youth Development Organization; Data Engineering Pilipinas DataCamp; AWS AI & ML.',
  'Coursework: Software Development, Object Oriented Programming, Integrative Programming and Technologies, Web Systems, Database Management, Operating Systems, Networking.',
  '', 'CERTIFICATIONS & TRAINING',
  ...data.certifications.map(c => c.join(' | ')),
  '', 'COMPETITIONS',
  ...data.awards.map(a => a.join(' | ')),
  '', 'VOLUNTEER EXPERIENCES',
  ...data.volunteering.map(v => v.join(' | ')),
  '', 'Updated October 2026', ''
].join('\n');
await rm(dist, {recursive:true,force:true});
await mkdir(path.join(dist,'assets'), {recursive:true});
await cp(path.join(root,'public'),dist,{recursive:true,filter:source=>!path.basename(source).startsWith('.')});
const styles = await Promise.all(['base','hero','about','projects','sections','dialogs','layout','motion','slideshow','flow','gallery','journey','cinematic'].map(name => readFile(path.join(root,'site/styles',name+'.css'),'utf8')));
const modules = await Promise.all((await readdir(path.join(root,'site'))).filter(name => name.endsWith('.js')).sort().map(name => readFile(path.join(root,'site',name),'utf8')));
const version = createHash('sha256').update([...styles,...modules].join('\n')).digest('hex').slice(0,12);
const assetPath = `assets/site-${version}`;
await cp(path.join(root,'site'),path.join(dist,assetPath),{recursive:true});
await writeFile(path.join(dist,assetPath+'.css'), styles.join('\n'));
await rm(path.join(dist,assetPath,'styles'), {recursive:true});
await writeFile(path.join(dist,'index.html'),html.replace('/assets/site.css',`/${assetPath}.css`).replace('/assets/site/app.js',`/${assetPath}/app.js`));
await writeFile(path.join(dist,'Catherine-Notado-Resume.txt'),resume);
await writeFile(path.join(dist,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://cathportfolio.vercel.app/sitemap.xml\n');
await writeFile(path.join(dist,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://cathportfolio.vercel.app/</loc></url></urlset>\n');
console.log('Built static portfolio, existing media, and synchronized text résumé in dist/');

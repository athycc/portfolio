import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { matchingProjects, projectCard } from '../site/projects.js';
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
const records = [...data.projects, ...data.deliveryStories];
const renderedHtml = html.replace('<!--FEATURED_WORK-->', ['mega','south','edukasyon','sync'].map(id => projectCard(records.find(project => project.id === id), true)).join(''))
  .replace('<!--ALL_WORK-->', matchingProjects(data.projects).map(project => projectCard(project)).join(''));
const resumeUrl = data.resume.pdfPath || data.resume.backupUrl;
if (data.resume.pdfPath) {
  const resumeFile = path.resolve(root, 'public', data.resume.pdfPath.replace(/^\/+/, ''));
  if (!resumeFile.startsWith(path.join(root, 'public') + path.sep) || path.extname(resumeFile) !== '.pdf') throw new Error('Résumé path must point to a hosted PDF inside public/');
  if (!(await stat(resumeFile)).isFile()) throw new Error('Hosted résumé PDF is missing');
}
await rm(dist, {recursive:true,force:true});
await mkdir(path.join(dist,'assets'), {recursive:true});
await cp(path.join(root,'public'),dist,{recursive:true,filter:source=>!path.basename(source).startsWith('.')});
const styles = await Promise.all(['base','hero','about','sections','dialogs','motion','flow','pm-layout'].map(name => readFile(path.join(root,'site/styles',name+'.css'),'utf8')));
const modules = await Promise.all((await readdir(path.join(root,'site'))).filter(name => name.endsWith('.js')).sort().map(name => readFile(path.join(root,'site',name),'utf8')));
const version = createHash('sha256').update([...styles,...modules].join('\n')).digest('hex').slice(0,12);
const assetPath = `assets/site-${version}`;
await cp(path.join(root,'site'),path.join(dist,assetPath),{recursive:true});
await writeFile(path.join(dist,assetPath+'.css'), styles.join('\n').replace(/\/\*[\s\S]*?\*\//g,'').split('\n').map(line=>line.trim()).join(''));
await rm(path.join(dist,assetPath,'styles'), {recursive:true});
await writeFile(path.join(dist,'index.html'),renderedHtml.replaceAll('__RESUME_PDF__', resumeUrl).replace('/assets/site.css',`/${assetPath}.css`).replace('/assets/site/app.js',`/${assetPath}/app.js`));
await writeFile(path.join(dist,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://cathportfolio.vercel.app/sitemap.xml\n');
await writeFile(path.join(dist,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://cathportfolio.vercel.app/</loc></url></urlset>\n');
console.log('Built static portfolio with preserved project media in dist/');

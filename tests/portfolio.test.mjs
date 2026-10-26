import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import data from '../site/data.js';
import { matchingProjects, projectCard } from '../site/projects.js';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const html=await readFile(path.join(root,'index.html'),'utf8');
const content=html+JSON.stringify(data);

test('filters retain every project, use multiple categories, and preserve PM order without mutating data',()=>{
  for(const id of ['mega','south']) assert.match(projectCard(data.projects.find(p=>p.id===id)),/class="project-inset"/,'keep the original website inset artwork');
  const original=data.projects.map(p=>p.id);
  assert.equal(matchingProjects(data.projects).length,12);
  assert.deepEqual(matchingProjects(data.projects).slice(0,4).map(p=>p.id),['mega','south','sync','email']);
  assert.deepEqual(matchingProjects(data.projects,'events').map(p=>p.id),['mega','south','sync']);
  const represented=new Set(['events','web','data','automation','exploration'].flatMap(filter=>matchingProjects(data.projects,filter).map(p=>p.id)));
  assert.equal(represented.size,12);
  for(const id of ['mega','south','sync']) assert.ok(matchingProjects(data.projects,'web').some(p=>p.id===id));
  assert.deepEqual(data.projects.map(p=>p.id),original);
});

test('all maintained browser modules parse as native JavaScript',async()=>{
  for(const file of (await readdir(path.join(root,'site'))).filter(name=>name.endsWith('.js'))) {
    execFileSync(process.execPath,['--check',path.join(root,'site',file)]);
  }
  assert.equal((html.match(/<script/g)||[]).length,1);
  assert.match(html, /<textarea[^>]*><\/textarea>/, 'the empty contact message must not gain formatting whitespace');
  assert.ok(html.includes('type="module" src="/assets/site/app.js"'));
});

test('all project records have unique IDs and complete case-study content',()=>{
  assert.equal(new Set(data.projects.map(p=>p.id)).size,data.projects.length);
  assert.equal(data.projects.length,12);
  for(const id of ['meow','healthcare','aegis','qcpd','hoshi','financial']) assert.ok(!data.projects.some(p=>p.id===id));
  assert.equal(data.projects.find(p=>p.id==='looker').image,'/projects/archive/financial.webp');
  assert.equal(data.projects.find(p=>p.id==='backlog').image,'/projects/archive/backlog.webp');
  assert.equal(data.projects.find(p=>p.id==='backlog').video,undefined,'Power BI project details must show the Power BI image');
  for(const project of data.projects.filter(p=>/\bQA\b|quality assurance/i.test(p.label+' '+p.status))) {
    assert.ok(project.tech.includes('Playwright'),project.id);
    assert.match(project.summary,/Playwright/,project.id);
    assert.ok(project.details.some(detail=>detail.includes('Playwright')),project.id);
  }
  for(const [id,title,file] of [
    ['backlog','Product Backlog Dashboard','1Uh9bJjxc0A22boYsUxMzbzf83pK0wQaQ'],
    ['capycademy','Capycademy','1PRYsDeffIIBvqUPual322HVbgf4calIz'],
    ['looker','Financial Dashboard','188QVEm6pZugXMkiR1mU7qrMpp5vDL9Sf']
  ]) {
    const project=data.projects.find(p=>p.id===id);
    assert.equal(project.title,title);
    assert.equal(project.resource,`https://drive.google.com/file/d/${file}/view?usp=drive_link`);
  }
  for(const p of data.projects){
    assert.ok(p.summary&&p.title&&p.label&&p.status&&p.note,p.id);
    assert.ok(p.details.length>0&&p.tech.length>0,p.id);
    assert.ok(['web','data','automation','exploration'].includes(p.category));
    for(const url of [p.url,p.resource,p.media,p.archive].filter(Boolean))assert.equal(new URL(url).protocol,'https:');
  }
});

test('résumé corrections and contribution boundaries are retained',async()=>{
  assert.equal(data.experience.find(e=>e.org==='Exist Software Labs Inc.').period,'Hybrid · August 2026–Present');
  assert.ok(html.includes('1tGHgGV_S_Psj7qlHdQhn-7bWlYJkNifQ'));
  assert.equal(data.experience.find(e=>e.org==='Edukasyon.ph').period,'Hybrid · March–June 2026');
  assert.equal(data.experience.find(e=>e.org==='Eskwelabs').period,'Hybrid · February–May 2026');
  assert.doesNotMatch(html, /1\.46|\bGWA\b/);
  assert.doesNotMatch(await readFile(path.join(root,'site/content.js'),'utf8'), /1\.46|\bGWA\b/);
  assert.match(data.certifications.find(c=>c[0].includes('Security+'))[0],/training/);
  assert.equal(data.projects.find(p=>p.id==='sync').status,'QA contribution');
  assert.equal(data.projects.find(p=>p.id==='mega').status,'QA contribution');
  assert.equal(data.projects.find(p=>p.id==='south').url,'https://aws.scd-south.cloud/');
});

test('build preserves local media and supplies a real PDF fallback without a public phone or text résumé',async()=>{
  execFileSync(process.execPath,['scripts/build-static.mjs'],{cwd:root,stdio:'pipe'});
  for(const p of data.projects) for(const file of [p.image,p.video].filter(Boolean)) assert.ok((await stat(path.join(root,'dist',file))).size>0,file);
  const builtHtml=await readFile(path.join(root,'dist/index.html'),'utf8');
  assert.doesNotMatch(builtHtml,/__RESUME_PDF__|FEATURED_WORK|ALL_WORK|tel:|Catherine-Notado-Resume\.txt/);
  const grid=builtHtml.slice(builtHtml.indexOf('id="projects"'),builtHtml.indexOf('class="project-more"'));
  assert.equal((grid.match(/data-id=/g)||[]).length,12,'all projects must exist before browser JavaScript runs');
  for(const p of data.projects) assert.ok(grid.includes('data-id="'+p.id+'"'),p.id);
  assert.ok(builtHtml.includes(data.resume.backupUrl));
  await assert.rejects(stat(path.join(root,'dist/Catherine-Notado-Resume.txt')),{code:'ENOENT'});
  for(const src of new Set([...builtHtml.matchAll(/\bsrc="(\/[^" ]+)"/g)].map(match=>match[1]))) assert.ok((await stat(path.join(root,'dist',src))).size>0,src);
  const version=builtHtml.match(/\/assets\/site-([a-f0-9]{12})\.css/)[1];
  assert.ok(builtHtml.includes('/assets/site-'+version+'/app.js'));
  const og=await readFile(path.join(root,'dist/og/catherine-notado-pm.png'));
  assert.equal(og.readUInt32BE(16),1200); assert.equal(og.readUInt32BE(20),630);
});

test('archive entries point to the seven verified project folders',()=>{
  const folders=new Set(data.projects.map(p=>p.archive).filter(Boolean));
  assert.equal(folders.size,7);
  const expected={capycademy:'10Turmdj5dJxymT1nazKWnjTAuPLTrBmg',robotics:'1S564VR7LJtovR2mT28XPlipMC3YsSBXH',credivest:'1ozoGQhvZdlvmvb0Atjy6ZMTUtgxEi5h1',poro:'157KtG4CGbU0aJH4nN7eNxeYS-HxjJgRr',gabay:'1MTaMhuUPGgy8sYWmtd18Tfati9xcz0VQ',skillgap:'1d0lsU1-cBcNqNIWLcn2RafRWIE6Thl15',backlog:'122VPxokv9yFkh3wk8OUBiZoyVhNaEWN4'};
  for(const [id,folder] of Object.entries(expected))assert.equal(new URL(data.projects.find(p=>p.id===id).archive).pathname,'/drive/folders/'+folder,id);
  for(const id of ['robotics','credivest'])assert.equal(data.projects.find(p=>p.id===id).media,undefined,'photos must not be described as video demos');
});


test('published code has no runtime dependencies and uses a restricted script policy',async()=>{
  const pkg=JSON.parse(await readFile(path.join(root,'package.json'),'utf8'));
  assert.equal(Object.keys(pkg.dependencies||{}).length,0);
  const configuration=JSON.parse(await readFile(path.join(root,'vercel.json'),'utf8'));
  const headers=Object.fromEntries(configuration.headers[0].headers.map(({key,value})=>[key,value]));
  const policy=headers['Content-Security-Policy'];
  assert.match(policy,/script-src 'self';/);
  assert.match(policy,/frame-ancestors 'none'/);
  assert.match(policy,/object-src 'none'/);
  assert.equal(headers['X-Frame-Options'],'DENY');
  for (const project of data.projects) {
    for (const url of [project.url,project.resource,project.archive,project.media].filter(Boolean)) {
      assert.equal(new URL(url).protocol,'https:');
    }
  }
});

test('case studies distinguish missing facts and the separate Edukasyon experience',()=>{
  assert.equal(data.projects.length,12);
  assert.equal(data.deliveryStories.length,1);
  assert.equal(data.deliveryStories[0].id,'edukasyon');
  for(const entry of [...data.projects,...data.deliveryStories]) {
    for(const key of ['goal','role','team','timeline','risks','reflection']) assert.ok(entry.caseStudy[key],entry.id+': '+key);
  }
  assert.match(data.deliveryStories[0].note,/target.*not a claimed result/);
  assert.match(data.projects.find(p=>p.id==='mega').caseStudy.role,/Event Head.*QA contribution/);
});

test('section order and five-link navigation expose the hiring journey',()=>{
  const ids=['home','opportunities','leadership','work','approach','experience','about','background','contact'];
  assert.deepEqual([...ids].sort((a,b)=>html.indexOf('id="'+a+'"')-html.indexOf('id="'+b+'"')),ids);
  const nav=html.match(/<nav class="desktop-nav"[\s\S]*?<\/nav>/)[0];
  assert.equal((nav.match(/<a /g)||[]).length,5);
  assert.match(html,/Catherine Notado \| Project Coordination &amp; Operations/);
});

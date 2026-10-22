import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import data from '../site/data.js';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const html=await readFile(path.join(root,'index.html'),'utf8');
const content=html+JSON.stringify(data);

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
  assert.equal(data.projects.find(p=>p.id==='looker').image,'/assets/dashboard-detail.jpg');
  for(const p of data.projects){
    assert.ok(p.summary&&p.title&&p.label&&p.status&&p.note,p.id);
    assert.ok(p.details.length>0&&p.tech.length>0,p.id);
    assert.ok(['web','data','automation','exploration'].includes(p.category));
    for(const url of [p.url,p.media,p.archive].filter(Boolean))assert.equal(new URL(url).protocol,'https:');
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

test('build produces an actual downloadable résumé and every local image/video target',async()=>{
  execFileSync(process.execPath,['scripts/build-static.mjs'],{cwd:root,stdio:'pipe'});
  const resume=await readFile(path.join(root,'dist/Catherine-Notado-Resume.txt'),'utf8');
  assert.doesNotMatch(resume, /1\.46|\bGWA\b/);
  for(const phrase of ['NOTADO, CATHERINE','12-image','August 2026','October 7, 2026','June 23, 2025','400+','52 volunteers','5 sponsors','April 2025–March 2026'])assert.ok(resume.includes(phrase),phrase);
  for(const p of data.projects){
    for(const file of [p.image,p.video].filter(Boolean))assert.ok((await stat(path.join(root,'dist',file))).size>0,file);
    assert.ok(resume.includes(p.title),p.title);
  }
  for(const src of new Set([...html.matchAll(/\bsrc="(\/[^"]+)"/g)].map(match=>match[1]))) assert.ok((await stat(path.join(root,'dist',src))).size>0,src);
  assert.ok((await stat(path.join(root,'dist/assets/site.css'))).size>0);
  for(const file of ['index.html','GENAI.jpg','AIM.jpg','FEU.jpg','monogram.svg','robots.txt','sitemap.xml'])assert.ok((await stat(path.join(root,'dist',file))).size>0,file);
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
    for (const url of [project.url,project.archive,project.media].filter(Boolean)) {
      assert.equal(new URL(url).protocol,'https:');
    }
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { Script } from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const html=await readFile(path.join(root,'index.html'),'utf8');
const data=JSON.parse(html.match(/<script id="portfolio-data" type="application\/json">([\s\S]*?)<\/script>/)[1]);

test('the standalone interaction script parses without a build transform',()=>{
  const script=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  assert.equal(script.length,1);
  assert.doesNotThrow(()=>new Script(script[0][1]));
});

test('all project records have unique IDs and complete case-study content',()=>{
  assert.equal(new Set(data.projects.map(p=>p.id)).size,data.projects.length);
  for(const p of data.projects){
    assert.ok(p.summary&&p.title&&p.label&&p.status&&p.note,p.id);
    assert.ok(p.details.length>0&&p.tech.length>0,p.id);
    assert.ok(['web','data','automation','exploration'].includes(p.category));
    for(const url of [p.url,p.media].filter(Boolean))assert.equal(new URL(url).protocol,'https:');
  }
});

test('résumé corrections and contribution boundaries are retained',()=>{
  assert.equal(data.experience.find(e=>e.org==='Edukasyon.ph').period,'Hybrid · March–June 2026');
  assert.equal(data.experience.find(e=>e.org==='Eskwelabs').period,'Hybrid · February–May 2026');
  assert.ok(html.includes('Cumulative GWA: 1.46'));
  assert.match(data.certifications.find(c=>c[0].includes('Security+'))[0],/training/);
  assert.equal(data.projects.find(p=>p.id==='sync').status,'QA contribution');
  assert.equal(data.projects.find(p=>p.id==='mega').status,'QA contribution');
  assert.equal(data.projects.find(p=>p.id==='healthcare').status,'Proof of concept');
  assert.equal(data.projects.find(p=>p.id==='aegis').status,'Capstone prototype');
  assert.equal(data.projects.find(p=>p.id==='south').url,'https://aws.scd-south.cloud/');
});

test('build produces an actual downloadable résumé and every local image/video target',async()=>{
  execFileSync(process.execPath,['scripts/build-static.mjs'],{cwd:root,stdio:'pipe'});
  const resume=await readFile(path.join(root,'dist/Catherine-Notado-Resume.txt'),'utf8');
  for(const phrase of ['NOTADO, CATHERINE','1.46','12-image','5-hospital','6-step','400+','52 volunteers','5 sponsors','April 2025–March 2026'])assert.ok(resume.includes(phrase),phrase);
  for(const p of data.projects){
    for(const file of [p.image,p.video].filter(Boolean))assert.ok((await stat(path.join(root,'dist',file))).size>0,file);
    assert.ok(resume.includes(p.title),p.title);
  }
  for(const file of ['index.html','GENAI.jpg','AIM.jpg','FEU.jpg','monogram.svg','robots.txt','sitemap.xml'])assert.ok((await stat(path.join(root,'dist',file))).size>0,file);
});

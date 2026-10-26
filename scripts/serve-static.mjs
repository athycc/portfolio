import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import './build-static.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.pdf':'application/pdf','.woff2':'font/woff2','.mp4':'video/mp4','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const configuration=JSON.parse(await readFile(new URL('../vercel.json',import.meta.url),'utf8'));
const security=Object.fromEntries(configuration.headers[0].headers.map(({key,value})=>[key,value]));
// Local-only harness needs same-origin framing; production remains DENY.
security['Content-Security-Policy']=security['Content-Security-Policy'].replace("frame-ancestors 'none'","frame-ancestors 'self'").replace('; upgrade-insecure-requests','');
security['X-Frame-Options']='SAMEORIGIN';
const port=Number(process.env.PORT||4173);
createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    // Development-only viewport harness; never copied into the production build.
    if(url.pathname==='/__qa'){
      const width=[320,360,375,500,768,1024,1280,1440].includes(Number(url.searchParams.get('width')))?Number(url.searchParams.get('width')):375;
      const height=[568,667,800,844,900].includes(Number(url.searchParams.get('height')))?Number(url.searchParams.get('height')):844;
      const section=['home','about','work','experience','leadership','community','background','contact'].includes(url.searchParams.get('section'))?url.searchParams.get('section'):'home';
      res.writeHead(200,{'content-type':'text/html; charset=utf-8'});
      res.end(`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Portfolio viewport QA</title><style>body{margin:0;background:#e1e5ec;font:14px system-ui;padding:16px}p{margin:0 0 12px}iframe{display:block;background:white;border:0;width:${width}px;height:${height}px;max-width:none}</style></head><body><p>Development preview · ${width}px browser viewport · <a href="/__qa?width=375">Mobile</a> · <a href="/__qa?width=768">Tablet</a> · <a href="/">Desktop</a></p><iframe title="Portfolio responsive viewport" src="/#${section}"></iframe></body></html>`);
      return;
    }
    const filename=decodeURIComponent(url.pathname)==='/'?'index.html':decodeURIComponent(url.pathname).replace(/^\/+/, '');
    const target=path.resolve(root,filename);
    if(!target.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
    const info=await stat(target);if(!info.isFile())throw new Error('Not found');
    const headers={'content-type':types[path.extname(target)]||'application/octet-stream',...security,'cache-control':'no-store','accept-ranges':'bytes'};
    if(req.headers.range){
      const match=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range);
      if(!match){res.writeHead(416);res.end();return;}
      const start=Number(match[1]),end=match[2]?Math.min(Number(match[2]),info.size-1):info.size-1;
      if(start>end||start>=info.size){res.writeHead(416,{'content-range':`bytes */${info.size}`});res.end();return;}
      res.writeHead(206,{...headers,'content-length':end-start+1,'content-range':`bytes ${start}-${end}/${info.size}`});
      if(req.method==='HEAD')res.end();else createReadStream(target,{start,end}).pipe(res);
    }else{
      res.writeHead(200,{...headers,'content-length':info.size});
      if(req.method==='HEAD')res.end();else createReadStream(target).pipe(res);
    }
  }catch{res.writeHead(404,{'content-type':'text/plain'});res.end('Not found');}
}).listen(port,'0.0.0.0',()=>console.log(`Portfolio preview listening on 0.0.0.0:${port}`));

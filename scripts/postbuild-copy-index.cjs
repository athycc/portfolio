const fs = require('fs');
const path = require('path');

const clientAssetsDir = path.join(process.cwd(), 'dist', 'client', 'assets');
const outIndex = path.join(process.cwd(), 'dist', 'index.html');

if (!fs.existsSync(clientAssetsDir)) {
  console.error(`Client assets directory not found: ${clientAssetsDir}`);
  process.exit(1);
}

const files = fs.readdirSync(clientAssetsDir);
const cssFile = files.find((f) => f.endsWith('.css'));
const jsFiles = files.filter((f) => f.endsWith('.js'));

if (jsFiles.length === 0) {
  console.error('No JS assets found in', clientAssetsDir);
  process.exit(1);
}

const cssTag = cssFile ? `<link rel="stylesheet" href="./client/assets/${cssFile}">` : '';
const scripts = jsFiles.map((f) => `<script type="module" src="./client/assets/${f}"></script>`).join('\n');

const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Portfolio</title>
    ${cssTag}
  </head>
  <body>
    <div id="root"></div>
    ${scripts}
  </body>
</html>`;

try {
  fs.writeFileSync(outIndex, html, 'utf8');
  console.log('Wrote', outIndex);
} catch (err) {
  console.error('Failed to write index.html:', err);
  process.exit(1);
}

const fs = require('fs');
const path = require('path');

const clientDir = path.join(process.cwd(), 'dist', 'client');
const clientIndex = path.join(clientDir, 'index.html');
const outIndex = path.join(process.cwd(), 'dist', 'index.html');

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      if (entry === 'index.html') continue;
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }

  fs.copyFileSync(src, dest);
}

try {
  copyRecursive(clientDir, path.join(process.cwd(), 'dist'));

  if (fs.existsSync(clientIndex)) {
    fs.copyFileSync(clientIndex, outIndex);
    console.log('Mirrored client output into dist/');
  } else {
    console.warn(`Client index not found: ${clientIndex}`);
    console.warn('Skipped copying prerendered index.html because prerender is disabled.');
  }
} catch (err) {
  console.error('Failed to mirror client output:', err);
  process.exit(1);
}

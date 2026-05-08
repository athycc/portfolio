const fs = require('fs');
const path = require('path');

const src = path.join(process.cwd(), 'dist', 'client', 'index.html');
const dest = path.join(process.cwd(), 'dist', 'index.html');

try {
  if (!fs.existsSync(src)) {
    console.error(`Source not found: ${src}`);
    process.exit(1);
  }
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} -> ${dest}`);
} catch (err) {
  console.error('Failed to copy index.html:', err);
  process.exit(1);
}

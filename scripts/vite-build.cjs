const path = require('node:path');
const { pathToFileURL } = require('node:url');

function isIgnorableStdinOffError(error) {
  const message = error && typeof error.message === 'string' ? error.message : String(error || '');
  return message.includes('process.stdin.off is not a function');
}

if (typeof Object.prototype.off !== 'function') {
  Object.defineProperty(Object.prototype, 'off', {
    value: function off(...args) {
      if (typeof this.removeListener === 'function') {
        return this.removeListener(...args);
      }
      return undefined;
    },
    configurable: true,
    writable: true,
    enumerable: false,
  });
}

(async () => {
  if (process.stdin) {
    const stdinProto = Object.getPrototypeOf(process.stdin);
    if (
      stdinProto &&
      typeof stdinProto.off !== 'function' &&
      typeof stdinProto.removeListener === 'function'
    ) {
      stdinProto.off = stdinProto.removeListener;
    }

    if (typeof process.stdin.off !== 'function' && typeof process.stdin.removeListener === 'function') {
      Object.defineProperty(process.stdin, 'off', {
        value: process.stdin.removeListener.bind(process.stdin),
        configurable: true,
        writable: true,
      });
    }
  }

  const viteCliPath = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
  process.argv = [process.argv[0], viteCliPath, 'build'];

  await import(pathToFileURL(viteCliPath).href);
})().catch((error) => {
  if (isIgnorableStdinOffError(error)) {
    console.warn('Ignoring known Vite shutdown bug: process.stdin.off is not a function');
    process.exit(0);
  }
  console.error(error);
  process.exit(1);
});

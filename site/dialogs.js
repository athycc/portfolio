import { $$ } from './dom.js';

export function createDialogs(motionEnabled) {
  const dialogs = $$('dialog');
  const closing = new Map();
  let returnFocus, returnScroll;
  const changed = () => document.dispatchEvent(new Event('dialogchange'));

  function open(dialog, trigger) {
    for (const other of dialogs) {
      closing.get(other)?.cancel();
      if (other.open) other.close();
    }
    returnFocus = trigger || document.activeElement;
    returnScroll = { left: scrollX, top: scrollY };
    dialog.showModal();
    const target = dialog.id === 'contact-dialog'
      ? dialog.querySelector('input') : dialog.querySelector('[data-close]');
    target?.focus({ preventScroll: true });
    changed();
  }

  async function close(dialog, destination) {
    if (!dialog.open) return;
    if (destination) { returnFocus = destination; returnScroll = null; }
    if (closing.has(dialog)) return;
    if (motionEnabled() && dialog.animate) {
      const animation = dialog.animate([
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(12px)' },
      ], { duration: 180, easing: 'ease-out' });
      closing.set(dialog, animation);
      let timer;
      await Promise.race([
        animation.finished.catch(() => {}),
        new Promise((resolve) => { timer = setTimeout(resolve, 240); }),
      ]);
      clearTimeout(timer);
      animation.cancel();
      closing.delete(dialog);
    }
    dialog.close();
  }

  for (const dialog of dialogs) {
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      close(dialog);
    });
    dialog.addEventListener('click', (event) => {
      if (event.target.closest('[data-close]')) close(dialog);
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right ||
          event.clientY < rect.top || event.clientY > rect.bottom) close(dialog);
    });
    dialog.addEventListener('close', () => {
      dialog.querySelectorAll('video').forEach((video) => video.pause());
      if (!dialogs.some((item) => item.open) && returnFocus?.isConnected) {
        returnFocus.focus({ preventScroll: true });
        if (returnScroll) window.scrollTo({ ...returnScroll, behavior: 'instant' });
      }
      changed();
    });
  }
  return { open, close };
}

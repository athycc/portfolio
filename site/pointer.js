// A contextual desktop label; the native pointer remains visible.
export function initPointerHints(motion) {
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const hint = document.createElement('div');
  hint.className = 'pointer-hint';
  hint.setAttribute('aria-hidden', 'true');
  document.body.append(hint);
  const hide = () => hint.classList.remove('is-visible');
  function show(event) {
    if (!fine.matches || !motion.enabled() || document.querySelector('dialog[open]')) return hide();
    const target = event.target.closest('[data-project],.projects,.gallery-next,.hero-scene,.about');
    if (!target || target.closest('a') || document.querySelector('.is-dragging')) return hide();
    hint.textContent = target.matches('.gallery-next') ? 'Next photo' : target.hasAttribute('data-project') ? target.dataset.pointerLabel || 'View project' : target.matches('.projects') ? 'Drag to explore' : 'Scroll to explore';
    hint.style.transform = `translate3d(${Math.min(event.clientX + 20, innerWidth - 155)}px, ${Math.min(event.clientY + 20, innerHeight - 44)}px, 0)`;
    hint.classList.add('is-visible');
  }
  document.addEventListener('pointermove', show, { passive: true });
  document.addEventListener('pointerup', show, { passive: true });
  for (const event of ['pointerdown','scroll','dialogchange','motionchange','visibilitychange']) document.addEventListener(event, hide, { passive: true });
  document.documentElement.addEventListener('pointerleave', hide);
}

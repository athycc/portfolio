export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
export const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
export const arrow = '<svg class="arrow" aria-hidden="true"><use href="#arrow"/></svg>';
export const tags = (items) => items.map((item) => `<span class="tag">${escapeHTML(item)}</span>`).join('');

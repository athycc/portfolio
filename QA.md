# Portfolio refresh validation

## Scope

Single HTML portfolio adapted from the supplied visual brief, with the October 2026 résumé updates. Tested locally in Chromium through the supported cloud browser and managed preview server.

## Passed

- `npm test`: four Node tests covering JavaScript parsing, unique/complete project records, résumé corrections and role boundaries, and a build with all local asset targets and the generated résumé.
- Desktop viewport: 1363 × 936. Hero and project section visually reviewed; no document horizontal overflow or failed loaded images observed.
- Responsive iframe viewports: 375 and 768 pixels wide, 844 pixels high. No document horizontal overflow; mobile single-column and tablet two-column project layouts verified. These are CSS viewport checks, not physical-device tests.
- Project filters: Web & QA returns 4 projects; Data & analytics returns 3; Automation & AI returns 3; Show all returns 12.
- SCD South project card opens its details; the live website link matches the supplied URL.
- Escape dismisses the project dialog and restores focus to its trigger.
- Mobile navigation opens and a section link closes it and navigates to the project section.
- Mobile project dialog fits within its viewport without internal horizontal overflow.
- Healthcare project notes explicitly identify the work as a proof of concept and disclose unproven production capabilities.
- Résumé dialog opens and links to the real generated text résumé.
- Contact form native required-field validation focuses the missing name field; email and message are also required.
- Clipboard denial in the HTTP preview displays the email address for manual copying.
- No initial Google Drive iframes; videos use `preload="none"` and are only added when their project is opened.

## Fixed during validation

Illustration stacking initially intercepted project-card clicks. The full-card trigger now has an explicit stacking position, and label layers ignore pointer events. The original failure was reproduced and the interaction was retested successfully.

## Limits

- The contact action creates an email-app draft. No email was sent during QA, and the site does not claim delivery.
- Clipboard writes require browser permission and a secure context; the fallback was tested in the HTTP preview.
- Reduced-motion support was reviewed in source; the browser did not expose OS preference emulation for this run.
- External websites and Google Drive demos retain their own availability and access requirements.
- No measured performance gain, full accessibility compliance, Safari/Firefox certification, or physical-device compatibility is claimed from this run.

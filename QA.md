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

## Layout refinement and résumé reconciliation — October 22, 2026

### Findings addressed

- Replaced the separated GWA badge, undersized About title, and oversized decorative photo stage with a bounded photo/content grid.
- Increased body copy to 15px on phones and 16px for primary desktop paragraphs; raised small labels, links, form fields, and résumé details.
- Aligned project footer actions within each desktop row; preserved visible URLs and role labels.
- Moved skills into an independent grid, preventing the education/skills column from creating an empty certification column.
- Stacked awards and footer navigation on phones; expanded touch areas and constrained fullscreen navigation to the available height.
- Fixed certification-date overflow reproduced at a 500px CSS viewport.
- Added the supplied original résumé PDF link, Exist's August 2026 start date, South's October 7 date, and the June 23, 2025 email automation date.
- Reused official artwork for South, Mega Manila, and SYNC; added community photos from the South and Mega Manila sites. Images are local, dimensioned, lazy loaded, and given descriptive alternatives.

### Verification

| Surface / journey | Result |
| --- | --- |
| CSS viewport widths 320, 375, 500, 768, 1024, 1440 | No document horizontal overflow; headings, paragraphs, certification rows, and project footers checked for clipped horizontal content. The 500px certification failure was fixed and retested. |
| Desktop About and project composition | Visually reviewed in Chromium; About body text is 16px, and the first project-row footer positions match. |
| Phone hero and project cards | Visually reviewed at 375 × 844; body copy is 15px and primary actions remain available. |
| Short phone navigation | At 375 × 568 all menu links fit; dialog scroll height equals viewport height. |
| Project filters | Web & QA = 4, Data = 3, Automation = 3, Other = 2; expanded All work = 12. |
| Phone menu → Selected work | Menu dismisses and project navigation succeeds. |
| Phone South project dialog | Opens, fits horizontally, focuses Close; Escape dismisses and returns focus to the originating project control. |
| Résumé | Dialog opens; original PDF URL matches the user-supplied file. |
| Contact required fields | Blank submit focuses name and reports name/email/message as invalid; no email sent. |
| Build / content regressions | Existing four Node checks pass, including source parsing, project records, résumé facts and build assets. |

Testing used Chromium CSS viewports in a development-only iframe harness. It does not establish physical-device compatibility, cross-browser certification, full accessibility compliance, or measured speed improvements. Original-source photos can show other community events; captions do not claim that all photos are from the 2026 event.

## Immersive motion — October 23, 2026 (Philippine Time)

| Check | Result |
| --- | --- |
| Motion-enabled layouts at 320, 375, 500, 768, 1024, 1440px | No document horizontal overflow or horizontal text clipping in the checked headings, paragraphs, certification rows, and project actions. |
| 320 × 568 phone header/menu | Both motion and menu controls fit; all navigation links fit within the menu viewport. |
| Scroll feedback | Reading progress updates, the current section is identified in navigation, and visible project cards complete their reveals. |
| Metric counters | Final visual and accessible values remain 390, 52, 5, and 400+. |
| Global motion pause | Changes to reduced mode, removes pending hidden content, and stops the hero glow; preference persists after reload. Both controls agree after re-enabling. |
| Animated menu navigation | Link names remain unchanged; menu closes and focus moves to the destination heading. |
| Project dialogs | Open and focus Close; Escape completes dismissal and restores focus to the project trigger on desktop and a 320px phone viewport. |
| Paused résumé dialog | Opens the original PDF link; closes immediately. |
| Contact validation | Blank submission focuses name; name, email, and message remain required. No email was sent. |
| Filter updates | Data = 3, Web & QA = 4, Automation = 3 after repeated filtering; removed cards are detached from the reveal observer. |
| Build/content | Four Node checks pass; résumé/project data preserved. |

### Corrections made during QA

- A decorative CSS menu arrow entered the accessible link name. It now uses an `aria-hidden` element.
- Added a bounded exit fallback so a delayed/cancelled animation cannot leave a dialog awaiting its finish event.
- Menu navigation now restores focus to its destination heading instead of the menu trigger.
- Clamped photo translation to the image height and retained image overscan to avoid exposed edges.

### Limits

The managed browser did not expose direct pointer-hover or OS reduced-motion emulation. Tilt/glare gating and OS-preference handling were reviewed in source; actual pause/re-enable behavior was exercised. No frame-rate, battery, CPU, physical-device, or cross-browser performance claims are made.

## About photo deck — October 23, 2026 (Philippine Time)

| Check | Result |
| --- | --- |
| Requested removals | Experience across teams strip, old photo caption, and About footnote absent from rendered DOM. |
| Photo loading | All three optimized local WebP images loaded with nonzero natural widths. |
| Direct selection | Portrait, Building, Speaking, and next control update the active photo, count, pressed state, and manual status; one photo remains exposed to assistive technology. |
| Scroll interaction | Native 150px forward movement changed Speaking to Portrait; reverse movement returned to Speaking. Page scrolling remains available. |
| Motion pause | Scrolling 150px in reduced mode kept Speaking selected; manual Portrait selection still worked. Re-enabled motion afterward. |
| Responsive layout | Configured iframe widths 320, 375, 768, 1440px had no document horizontal overflow. Mobile About copy visually reviewed; gallery control heights were 44px, next control 48px. Desktop portrait and robotics framing visually reviewed. |
| Content regression | Portfolio/resume JSON identical to the prior version; revised copy adds no new metrics or unsupported claims. |
| Build | Four existing Node checks pass, covering script parsing, project records, resume facts, and all built local assets. |

Browser verification used Chromium with CSS viewport harnesses, not physical devices or a cross-browser matrix. System reduced-motion handling was reviewed in source; actual site pause was exercised. The supplied robotics image is 203×277px, so no additional source detail is claimed.

## Flowing background, native scrolling, and archive reconciliation — October 23, 2026

### Changes grounded in source and supplied references

- Reviewed the supplied 32.63-second screen recording at multiple timestamps. Its flowing light-ribbon direction is implemented as original blue SVG artwork with transform-only CSS animation.
- Removed the Lenis import and perpetual requestAnimationFrame loop, wheel smoothing, pointer-driven tilt/glare, photo parallax, scroll-time section geometry scans, root progress-variable writes, and startup overlay.
- The scroll listener is passive and schedules a single frame only when the About photo deck is visible and motion is enabled. Reading progress uses a browser scroll timeline when supported. Navigation uses IntersectionObserver.
- Backgrounds and the featured carousel pause offscreen; backgrounds also pause in dialogs and hidden tabs. Phones render one ribbon layer rather than two. Reveals were shortened from 750ms to 350ms.
- Listed all ten folders in the supplied Drive archive, then inspected their children. Downloaded and inspected source images and rendered the backlog and skills-gap PDFs before using their first pages.
- Added six missing archive projects and corrected Credivest's title/contribution from the résumé and original Home Credit screenshot. The resulting list has 18 unique projects, including 12 folder-linked cards across 10 unique folders.
- Replaced email automation artwork with the uploaded repository screenshot. Replaced CapyCademy, robotics, Credivest, and backlog artwork with actual source images; added archive images for the six new entries.
- Corrected original robotics and Credivest file links: Drive metadata identifies them as JPEG photos, so they no longer appear as video demos.

### Browser and build verification

| Check | Observed result |
| --- | --- |
| Hero background | SVG layers loaded; computed transforms changed while running. Hero ran while visible and paused after scrolling out of view. Leadership ran when its section entered view. |
| Scroll journey | Exercised native scrolling from hero through About into work; document position advanced and the photo deck changed. Source contains no wheel/touch interception or continuous scrolling renderer. |
| Motion controls | Pause changed to reduced mode and removed all active flow surfaces; re-enable restored motion. |
| Complete project list | Expansion rendered 18 distinct titles and 12 folder actions without horizontal overflow. Expansion did not jump to the newly relocated bottom button. |
| Filters | Web & QA: 8; Data: 3; Automation & AI: 3; Other builds: 4. |
| Email automation dialog | Uses the attached screenshot; repository URL remains correct. Opens focused on Close; Escape dismisses and restores focus to the project trigger. |
| Robotics dialog | Shows the original team photo and its matching robotics folder; no mislabeled demo action. |
| CapyCademy dialog | Shows its matching project folder and original MKV presentation link; dialog fits horizontally. |
| CSS viewport widths 320, 375, 500, 768, 1024, 1440px | No document horizontal overflow. Checked horizontal clipping in headings, paragraphs, certification rows, and project footers at intermediate and large widths. |
| 320 × 568 menu | Header controls fit; all menu links fit the 568px dialog. Selected work closes menu, navigates, and focuses work-heading. |
| Phone work layout | Visually inspected at configured 375px width; filters wrap, project images fit, text and actions remain available. |
| Runtime errors | No application errors in the collected browser error log; extension metadata errors excluded. |
| Build/content checks | Five Node checks pass: script parsing, unique/complete projects, résumé boundaries, real build/assets, and exact matching against the ten verified Drive folder IDs. |

### Scope limits

This run verifies Chromium behavior and CSS viewport layouts, not the user's physical phone or laptop. No before/after FPS, CPU, load-time, or percentage speed improvement is claimed. The changes remove identified ongoing work and scrolling inertia; actual smoothness still depends on the visitor's device/browser. OS reduced motion is reviewed in source; the actual site pause control was exercised. Drive sharing was preserved; folder visibility remains governed by the original Drive permissions.

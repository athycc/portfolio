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

## Ponytail refactor, pixel slideshow, and full-site flow — October 23, 2026

### Scope and changes

- Split HTML, project data, component styles and browser behavior into maintained `site/` modules. Removed 67 unused legacy source/build/configuration files and relocated four retained dashboard assets. Removed the old package dependencies and lockfile entries.
- Removed obsolete scroll-photo logic, artwork generators, startup code, dormant progress decoration, and unused tilt/parallax styles. Repeated filtering detaches prior cards from the reveal observer.
- Replaced the scroll-driven deck with a timed slideshow and a short, low-resolution canvas wipe followed by the clear original photo. Direct selection pauses autoplay; Play resumes it. Rapid selection cancels previous transitions. The full-resolution portrait and 1080px archive robotics photo replace smaller display sources; the speaking photo retains original source detail.
- Added the reusable light field to all seven main sections and the footer. CSS view timelines move the field as each section scrolls; ambient animation pauses offscreen. No JavaScript scroll listener or persistent rendering loop remains.
- Added source/deployment hardening described in SECURITY.md. The local preview uses the production resource policy with a documented same-origin framing exception for its viewport harness.

### Verification

| Check | Result |
| --- | --- |
| Pixel wipe | Manual Building selection exposed the transition canvas at 20 columns; it then disappeared and the clear 1080px photo became active. |
| Autoplay | Observed first-photo state followed by timed advancement to Building. Explicit Play resumed advancement while its control remained focused. |
| Direct selection / scrolling | Manual choice set Play and exposed one active image; subsequent scrolling kept the selected photo. |
| Rapid selection | Building → Speaking → Portrait settled on 01 / 03, with one active image and no pending canvas transition. |
| Site pause | Reduced mode disabled autoplay; manual Speaking selection completed without the pixel transition. Re-enabled afterward. |
| Whole-site flow | Eight flow fields present. About's transform changed between native scroll positions, verifying the section-linked effect beyond the hero. |
| Project regressions | Expansion = 18 cards / 12 folder actions; category counts remain 8, 3, 3, 4. Robotics dialog retains the correct folder. |
| Modal keyboard behavior | Project dialog focuses Close; Escape dismisses and restores focus to the originating trigger. |
| Phone menu | At 320 × 568, header and slideshow controls fit; the menu's scroll height equals its viewport. Selected work dismisses it and focuses work-heading. |
| Phone project modal | Opens without horizontal overflow and dismisses with Escape. |
| Responsive widths | Configured 320, 375, 500, 768, 1024, 1440px viewports have no horizontal document overflow. Text/certification/project-footer clipping checks pass at intermediate/wide widths; the 375px photo and controls were visually inspected. Controls are 44px minimum; next control is 48px. |
| Contact / résumé | Name, email and message all fail a blank submission; focus returns to name. PDF URL and eight résumé summary sections retained. No email was sent. |
| Runtime | No application errors observed during the checked project/dialog/filter journeys; browser-extension metadata errors excluded. |
| Build / content | Six Node checks pass, including all native modules, current résumé facts, 18 project records, ten exact folder mappings, local build resources and deployment policy. |

### Correction found during QA

HTML formatting inserted whitespace into the textarea's initial value. The textarea is now truly empty, the browser reports all three fields as invalid on blank submit, and a regression assertion protects that behavior.

### Limits

Verification uses Chromium CSS viewports, not physical devices or a cross-browser matrix. Timed slideshow observations are not frame-rate benchmarks. System reduced-motion behavior is reviewed in source and the actual site pause is exercised. The focused security review is not a full audit or penetration test; provider account, firewall, rate-limit and backup settings remain outside this pass.

## October 23, 2026 — Full-bleed layout and project gallery

- All eight animated section surfaces reach both viewport edges; outer main padding and rounded section corners are removed. Reading columns remain bounded.
- Native horizontal gallery contains 12 projects after removing Meowlogy, Healthcare Outreach Agent, AegisLearn, QCPD Website and Hoshi Bookstore. Financial Dashboard is consolidated into Looker Financial Model with the requested financial image, metrics and contribution details.
- Browser checks: next arrow advanced from 4px to 600px; mouse drag advanced to 1196px without opening a dialog; Data filter showed exactly Product Backlog Dashboard and Looker Financial Model. Financial dialog displayed the expected image/content and original folder/demo actions.
- Keyboard End reached the gallery's 5920px endpoint with Next disabled; Home returned to the beginning. Project dialog opens and dismisses with Escape.
- Configured Chromium widths 320, 375, 768 and desktop (1363px) have no horizontal document overflow. All eight surfaces remain full width; 375px gallery and controls visually inspected. Phone next arrow advances the gallery.
- About photo labels are removed. Autoplay advances through clear source photos with a 3000ms hold between pixel transitions. Pause/manual next and global reduced-motion controls are retained.
- Six Node checks pass, covering 12 project records, seven verified folder destinations, current résumé facts, native JavaScript parsing, built resources and the restricted deployment policy. No application errors observed during checked journeys; unrelated extension metadata errors excluded.
- Scope: Chromium viewport checks, not physical-device or cross-browser certification. No new dependencies or security policy changes.

## October 23, 2026 — Automatic interactive galleries

- Projects advance automatically with a four-second reading interval and native smooth scrolling. Direction reverses at either end; no cloned cards or extra animation dependency. Position counter, Pause/Play control and cycle indicator are included.
- Autoplay stops while off screen, during hover/drag/keyboard focus, when dialogs open, in hidden tabs, and when motion is disabled. Native dragging, swipe, arrow and keyboard behavior remain available. Reduced-motion mode also disables hover lift.
- Browser observations: automatic advance reached 02 / 12 (596px); Pause held that position, Play resumed. Mouse dragging reached 1192px without opening a dialog and suspended autoplay. Site motion pause disabled both slideshow controls.
- About photos now change on a 1000ms cadence, including a shortened ~260ms pixel refinement. A full three-photo cycle was observed, with successive browser checks 1045ms and 1021ms apart. Pause changed the control to Play. Original image assets and manual next remain.
- At a configured 320px Chromium viewport, document width equals scroll width (305px after scrollbar); gallery controls measure 72×48px and 48×48px. No horizontal document overflow.
- Six Node checks pass. Timing observations include browser polling overhead and are not rendering benchmarks; QA scope remains Chromium CSS viewports.

## October 23, 2026 — Reference-matched card stream and scroll photos

- Inspected the supplied `Recording 2026-10-23 022308(1).mp4` (15.07 seconds): a horizontal card stream with perspective, angled neighbors and centered emphasis. Replaced the interval-based flat gallery with continuous circular movement and matching depth treatment. Original project images are retained; descriptions, stacks and actions appear in a synchronized summary below the centered card.
- Removed every visible pause control (header, footer, featured cards, About photos and projects), related handlers/styles and persisted site-pause state. System reduced motion remains the motion gate.
- Photo changes now follow scroll distance rather than a timer. Browser observations: at y=880 photo 2; scrolling down to y=1048 changed to photo 0; scrolling upward to y=880 restored photo 2. Another stationary observation retained photo 2 at the same scroll position. Manual next remains available.
- Continuous gallery movement was observed through changing perspective transforms and active-project state. Mouse drag changed the centered project from Mega Manila to Email without opening a dialog. Next moves smoothly; keyboard End followed by ArrowRight wraps the last project back to South (01 / 12).
- Configured 375px and 320px Chromium viewports have no horizontal document overflow (360/360px and 305/305px after scrollbar). The perspective stream, counter and arrow controls were visually inspected on mobile.
- Data filtering returns two cards. Looker Financial Model details open with the correct financial folder/demo links and no modal overflow (328/328px); Escape dismisses it.
- All six Node checks pass. Geometry is cached on resize; one animation loop runs only for visible project motion or a short manual transition. The photo scroll listener is passive, coalesced by animation frame and detached outside the visible section. No framework or animation dependency added. Browser checks are not a physical-device, cross-browser or FPS certification.

## October 23, 2026 — About photo stack and GWA removal

- Removed the GWA number/labels from About and Education, the résumé dialog and generated text download. Academic Achiever, degree and education dates remain. The externally linked original PDF is not modified.
- About now displays three real photo cards: one at the front and two tilted behind it, each with its own border and shadow. Scroll and manual-next selection rotate the three depth positions while retaining the brief pixel transition and original image files.
- Browser observations: all three cards have distinct depth values 0/1/2; manual selection and scrolling reorder them with exactly one front card. Desktop About was visually inspected. Public page text and the opened résumé preview have no GWA text; Academic Achiever remains in the preview.
- At configured Chromium widths 375px and 320px there is no horizontal document overflow (360/360px and 305/305px after scrollbar). All transformed card bounds fit inside the viewport; the layered photos were visually inspected at 375px.
- Six Node checks pass, including no GWA in public HTML, résumé preview source or generated text résumé. Responsive checks are CSS viewport tests, not physical-device or cross-browser certification.


## October 23, 2026 — Section transitions and direct project files

- Added a curved seam on each incoming section through the contact footer, with CSS view-timeline morphing and gentle content lift/scale. Existing visibility observers provide a staggered fallback; system reduced motion and focused content show content directly. No new scroll listener, frame loop, dependency or scroll interception.
- Chromium native-scroll observations at y=131 and y=337 showed the About seam progress from scaleY(.572) with asymmetric curved corners to scaleY(.02) with flat corners. The boundary was visually inspected; all seven incoming surfaces resolve the section-seam animation.
- Product Backlog Dashboard, Capycademy and Financial Dashboard now use the three exact user-supplied Drive file URLs as primary gallery/dialog actions. The connected Drive metadata identifies them as a backlog PDF, a Capycademy MKV demo and a financial MP4 demo. Existing folders remain secondary actions. Drive sharing was not changed; anonymous access was not verified.
- Verified exact destinations in all three project dialogs. Data filtering returns the two correctly named dashboards; keyboard End selects Financial Dashboard and Capycademy in their respective filters. Escape dismisses dialogs. Generated text résumé and preview also include the primary file links.
- Configured Chromium widths 375px and 320px have no horizontal document overflow (360/360px and 305/305px after scrollbar). The mobile financial dialog fits horizontally at 328/328px. About retains distinct photo depths 0/1/2; GWA and visible pause controls remain absent.
- Six Node checks pass, including exact names/file mappings and generated résumé links. No application errors observed during checked journeys; unrelated extension metadata errors excluded. Checks cover Chromium CSS viewports, not physical devices, other browser engines or frame-rate benchmarking.


## October 23, 2026 — Cinematic opening and layered interactions

- Adapted the inspected King O’Holi reference’s pinned/receding opening, overlapping next section, masked heading motion, project emphasis and contextual pointer hints to the portfolio’s existing blue palette, photos and content. No reference assets were copied.
- Large desktop viewports (minimum 900×650 with view-timeline support) use a 160svh scene and 60svh overlap. Native scrolling moves the hero through a small scale/rotation/fade while About rises above it. At y=0 the hero resolves to identity transform and opacity 1; at y=449 an earlier checked frame resolved to approximately scale .935 and opacity .579 with About at viewport y=487. View-timeline inset was explicitly set to zero to preserve a crisp initial frame.
- Fourteen line masks across seven section headings preserve each heading’s text and semantics. The existing reveal observer triggers them once; existing section backgrounds continue moving independently. No additional scroll animation loop or motion dependency. No new full-section backdrop blur. Desktop pointer hints preserve the native pointer and hide during scrolling, dragging, dialogs, coarse input and reduced motion.
- Data filtering and keyboard End select Financial Dashboard. The project modal resolves project-expand animation, contains focus and retains the exact Drive file/folder destinations. Escape closes it. The mobile menu’s Selected work action closes the menu, updates the hash and focuses work-heading.
- At configured Chromium widths 375px and 320px there is no horizontal page overflow (360/360px and 305/305px after scrollbar). Hero position is relative and About margin is 0px in these viewports. The mobile Financial Dashboard modal fits at 328/328px. About photo depths remain distinct 0/1/2. Public GWA remains absent.
- QA revealed Financial Dashboard still used a backlog screenshot. Replaced it with an actual 1200px frame from its existing financial demo, visually checked the finance title/revenue/cost/P&L content, and verified the new asset in the mobile dialog. Dashboard metrics and user-provided links remain unchanged.
- Reduced-motion branches reviewed in source; OS preference emulation was unavailable in this browser session. Checks cover Chromium CSS viewports and native desktop scrolling; they do not establish physical-device, cross-browser or FPS results.


## October 23, 2026 — Complete reference effects and remove viewport gating

- Corrected the incomplete prior adaptation: removed the 900×650 / CSS view-timeline gate, added a real translucent blur overlap, layered project previews and a dark media-first overlay. Existing résumé facts, names, file links, photo stack and circular gallery remain.
- Hero uses native sticky positioning plus one scroll-scheduled frame for progress and independent background motion. A nine-second, approximately 192KB crossfade film uses existing SCD builders, SCD South community and robotics photos. It pauses off-screen, for dialogs, hidden tabs and reduced motion; static poster remains available.
- Desktop observations: hero film was playing (time 3.90s, no media error); About backdrop blur resolves to 14px. At scroll y=580, progress .6197 produced scale approximately .876, rotation, blur 2.48px and About top y=356; the About background had an independent -21.8px transform. Visually inspected the video-backed hero receding beneath the glass layer.
- Heading masks now replay with later entry and 1.05s staggered movement. Experience and education content bypass broad content transforms to provide a calm reading interval. Source review confirms no CSS view-timeline dependency for hero/parallax; the OS reduced-motion branch remains honored.
- A native click on empty hero space displayed the contextual Scroll to explore label. Keyboard focus on South showed its inset community photo (opacity 1, transform none). Cards preserve native drag/keyboard behavior and direct file links.
- Financial Dashboard opens a dark overlay (rgb 9,20,35 with a dark backdrop), contains focus, retains the exact direct demo/folder URLs and plays its actual muted video (readyState 4; time advanced beyond 11s). Escape closes it.
- At configured 375px width, hero remains sticky with -844px overlap and 14px glass blur; native scrolling progressed to .7204. At configured 320×568, its 859px hero pins at -291px so taller content remains reachable; no horizontal document overflow (305/305px). Mobile menu navigation closes the menu, updates #work and focuses work-heading. The mobile dark backlog dialog fits at 271/271px and its video progressed beyond 17s.
- Added content fingerprints shared by built CSS and the entire module directory. Verified matching versioned asset URLs in the browser. All six Node checks pass, including built resource paths and synchronized version references. No application errors observed during checked journeys. Browser scope is Chromium CSS viewports; OS preference emulation, other engines, physical devices and FPS benchmarks were not tested.


## October 23, 2026 — Uploaded SCD video and event photos

- Replaced the generated photo montage in the hero with an optimized full-length copy of the uploaded AWS SCD VIDEO.mp4. Source duration 67.547s and size 82,656,824 bytes; web copy duration 67.55s and size 1,763,640 bytes, H.264, 768×432, 20fps, no audio track for ambient playback. The original attachment remains unchanged.
- Mapped the first image (109.png) to Mega Manila and the second image (image(20261023-045507).png) to South. Both web copies are 1600×900 and appear in their matching project cards/details and community figures; Mega Manila also supplies the hero poster. Existing event artwork remains in inset hover/focus previews.
- Chromium hero playback verified readyState 4, paused false and time beyond 21s with the new source URL and 67.55s duration. Both community images decoded at 1600×900 and were visually inspected on desktop.
- Configured 375px viewport has no horizontal page overflow (360/360px). Both project images load; South’s dark detail dialog displays its full image, preserves https://aws.scd-south.cloud/ and fits horizontally at 326/326px. Escape dismisses it. All six Node checks pass. Scope is Chromium CSS viewport inspection, not physical-device or other-engine certification.

- Publication recovery: the missing video upload was regenerated from the supplied 82,656,824-byte original using the same 768×432 / 20fps bitrate settings. Full decode completed for all 1,351 frames; the web copy is 1,763,640 bytes with no audio track. The two committed image files were reused unchanged, and all six existing Node checks passed again.

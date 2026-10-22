# Catherine Notado Portfolio

A single HTML portfolio adapted from the supplied Baseline visual brief. Navy and white editorial layouts, Onest typography, masked text reveals, real community photography, project filters, native dialogs, and a downloadable résumé present Catherine's development, QA, analytics, marketing, and community work.

## Run

Requires Node.js 22 or later. No dependency installation is needed for the static site.

```sh
npm run build
npm run dev
```

The preview uses port 4173 by default or the `PORT` environment variable. Vercel publishes `dist/` using the configuration in `vercel.json`.

The development server also exposes `/__qa?width=375` and `/__qa?width=768`, which frame the actual application at mobile/tablet CSS viewport widths for browser inspection. This harness is not part of the production build and does not emulate physical devices.

## Edit

- `index.html`: HTML, CSS, interaction code, and the `portfolio-data` JSON block.
- `public/`: retained photographs, favicon, and existing demo videos.
- `src/assets/`: retained dashboard images copied into `dist/assets/`.
- `scripts/build-static.mjs`: validates the data, copies assets, and generates the synchronized text résumé, robots file, and sitemap.

The previous React/TanStack implementation remains in `src/` for reference. The public website now uses the requested HTML/CSS/JavaScript approach and does not need a framework runtime. The legacy build is available as `npm run build:legacy` after installing the original dependencies.

## Behavior and content

- Project filters, expand/collapse, case-study dialogs, menu, contact dialog, featured carousel controls, and résumé download are functional.
- Contact opens a `mailto:` draft. It never claims a message has been delivered.
- Wheel and touch scrolling are browser-native; no smooth-wheel dependency or persistent JavaScript scroll loop is used.
- Animations respect reduced motion. Native dialogs provide focus containment, Escape dismissal, and focus restoration.
- Existing project demos are retained. Videos load only when a project dialog opens and playback is requested; no Google Drive iframes load on initial render.
- Metrics describe verified project or dataset scope. Healthcare and AegisLearn remain explicitly labeled prototypes. SCD Mega Manila and SYNC are identified as QA contributions.
- The 2026 résumé supplies the internship end dates, GWA 1.46, project URLs, and the distinction between KodeKloud Security+ training and a CompTIA credential.

## Verification

Run the static assertions with `npm test`. Browser validation should cover desktop and mobile viewport widths, keyboard navigation, dialog focus and Escape behavior, project filters, external links, résumé download, and reduced motion. Chromium emulation does not establish physical-device certification.

## October 2026 layout refinement

Shared reading sizes are now 15–16px for body copy, with bounded desktop columns, aligned project actions, and single-column phone layouts. The About section uses a normal photo/content grid. Skills sit in their own grid below education and certifications. Navigation uses a flex layout that fits short phone viewports.

Content dates and the original résumé link were reconciled with Catherine's supplied October 22 PDF:
https://drive.google.com/file/d/1tGHgGV_S_Psj7qlHdQhn-7bWlYJkNifQ/view?usp=drivesdk

The generated text download is labeled a portfolio summary because it also contains supplementary project notes. Development and QA contributions remain labeled per project.

### Image sources

The existing portfolio's photos, dashboard images, and demo links are retained. The following public assets were copied locally with Catherine's instruction to use imagery from these project websites:

- `public/projects/scd-south.png`: https://aws.scd-south.cloud/assets/social/south-summit-card.png
- `public/projects/scd-mega-manila.png`: https://www.aws-scd.cloud/og.png
- `public/projects/sync.png`: https://sync.aws-scd.cloud/opengraph-image.png?opengraph-image.0b1c6zzqz7er5.png
- `public/projects/scd-south-community.webp`: https://aws.scd-south.cloud/assets/story/community-team.webp
- `public/projects/scd-builders.webp`: https://www.aws-scd.cloud/photography/story-work.webp

These are official project artwork/community photos, rather than screenshots of an application UI. Dates and roles belong to the résumé; current website branding can change independently.

## Immersive motion

The portfolio uses coordinated hero entrances, short viewport reveals, metric counters, and a browser scroll-timeline reading-progress line where supported. The later flow/performance pass removes photo parallax and project-card tilt/glare. Menu links enter in sequence; project, contact, and résumé dialogs have short exit transitions with a 280ms completion fallback. Keyboard menu navigation moves focus to the destination heading.

The pause button in the hero header and footer stops site animation and saves the visitor's choice locally. System reduced-motion preferences take priority. Paused motion restores all pending content and final metric values; no information depends on animation. Reveals and counters run once, removed project nodes are unobserved, and flowing backgrounds stop offscreen, in dialogs, when paused, or when the page is hidden.

## Scroll-driven About gallery

The About section now uses Catherine's three supplied photos: portrait, robotics work, and presenting. Optimized local WebP files live in `public/about/`; the portrait offers 480px and 960px variants. The robotics and presenting sources retain their original pixel dimensions.

A three-card deck advances with roughly 75–120px of visible page travel and reverses with scrolling. It shares the existing single-frame scroll scheduler and uses native page movement. Labeled photo buttons and a next control provide direct selection; manual selection alone updates the polite status announcement. System reduced motion and the site pause setting disable scroll-driven changes while preserving the controls.

The experience-logo strip, old About photo caption, and About closing footnote have been removed. The revised introduction focuses on development, QA, analytics, automation, and AWS student community leadership.

## Flowing background and project archive — October 23, 2026

The supplied Relay video is a motion reference: the implementation uses original blue SVG light ribbons in the hero and leadership section. Two transform-only layers run on desktop and one on phones. No reference video is embedded. IntersectionObserver pauses offscreen layers and the hero carousel. Native scrolling replaces Lenis; scroll-driven parallax, pointer tilt, repeated section geometry reads, root-variable updates per scroll, and the startup overlay have been removed. The visible About photo deck remains scroll-driven.

The list contains 18 projects: six selected entries followed by the remaining work on expansion. Filters expose Web & QA (8), Data & analytics (3), Automation & AI (3), and Other builds (4). Live event sites and the email repository remain direct links; archived work links to the matching folder. CapyCademy and data projects retain original demo links. Robotics and Credivest were verified as photos and no longer labeled demos.

### Image provenance

- Email automation: supplied `image(20261022-171103).png`, optimized as `public/projects/archive/email.webp`.
- Backlog: page 1 of `Copy of product_backlog in power bi.pdf`, file `1Uh9bJjxc0A22boYsUxMzbzf83pK0wQaQ`.
- CapyCademy: `received_2414760442229430.png`, file `15hAfZul74zbk_rUFzODKYRWBOZXgI79s`.
- Robotics: `20250625_093016.jpg`, file `1-L-y9HmeiYiTbSzZgVzJpY68oBJjPBQ4`.
- Credivest: `20250625_095429.jpg`, file `15S-jCubYu47TG3Z6Aom0Hwn-st8k-Cz5`.
- Hoshi: `20250625_095527.jpg`, file `1tL1VgT9xpNZjs2bjI6FmUqIHhJXaXUOu`.
- QCPD: file `13tOkOm4_tcE6B1zblcjUYEg6kJtFazvY`.
- Meowlogy: `Landing`, file `1oa2lpXNyom3EClCt6hRuVmAuzA_SD-HK`.
- Poro: file `1gi0VJ516Rdfere8eH7nzKSFCRbklyNQ3`.
- Gabay: `Mobile`, file `1022qa0yleLImzPmlwmmli6Py5ZGWEpPB`.
- Skills gap research: page 1 of the supplied archive PDF, file `1OHZmPp_AMdYo4ofS8uxr0KNpRJK19S_M`.

All archive image copies are WebP, downscaled to at most 1000px without inventing detail. Their combined size is 455,480 bytes; the shared SVG is 3,344 bytes. Images load lazily with dimensions; videos use `preload=none`. Original attachments and Drive sharing were not modified. Additional archive descriptions are bounded by the provided images; undocumented implementation stacks and usage metrics are not invented.

### Verified folder mapping

| Project | Folder |
| --- | --- |
| Product Backlog Dashboard | https://drive.google.com/drive/folders/122VPxokv9yFkh3wk8OUBiZoyVhNaEWN4 |
| Financial Dashboard | https://drive.google.com/drive/folders/122VPxokv9yFkh3wk8OUBiZoyVhNaEWN4 |
| CapyCademy | https://drive.google.com/drive/folders/10Turmdj5dJxymT1nazKWnjTAuPLTrBmg |
| Autonomous Sumobot | https://drive.google.com/drive/folders/1S564VR7LJtovR2mT28XPlipMC3YsSBXH |
| Looker Financial Model | https://drive.google.com/drive/folders/122VPxokv9yFkh3wk8OUBiZoyVhNaEWN4 |
| Credivest · Home Credit Hackada | https://drive.google.com/drive/folders/1ozoGQhvZdlvmvb0Atjy6ZMTUtgxEi5h1 |
| Camp Karingal · QCPD Website | https://drive.google.com/drive/folders/10u5YdYS1lvSJm9y4194lGQSbCq1gKOl_ |
| Hoshi Bookstore | https://drive.google.com/drive/folders/1mgokW96vT_xrzR-aBzCRgsHbyr3DOCXZ |
| Meowlogy | https://drive.google.com/drive/folders/1BT7eSu4nW3QqJH5N2f4F4RREFc8Qsh6v |
| Poro · Time Management | https://drive.google.com/drive/folders/157KtG4CGbU0aJH4nN7eNxeYS-HxjJgRr |
| Gabay | https://drive.google.com/drive/folders/1MTaMhuUPGgy8sYWmtd18Tfati9xcz0VQ |
| Skills Gap Assessment Research | https://drive.google.com/drive/folders/1d0lsU1-cBcNqNIWLcn2RafRWIE6Thl15 |

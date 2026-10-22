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
- Lenis is an optional CDN enhancement; native scrolling and all interactions work without it.
- Animations respect reduced motion. Native dialogs provide focus containment, Escape dismissal, and focus restoration.
- Existing project demos are retained. Videos load only when a project dialog opens and playback is requested; no Google Drive iframes load on initial render.
- Metrics describe verified project or dataset scope. Healthcare and AegisLearn remain explicitly labeled prototypes. SCD Mega Manila and SYNC are identified as QA contributions.
- The 2026 résumé supplies the internship end dates, GWA 1.46, project URLs, and the distinction between KodeKloud Security+ training and a CompTIA credential.

## Verification

Run the static assertions with `npm test`. Browser validation should cover desktop and mobile viewport widths, keyboard navigation, dialog focus and Escape behavior, project filters, external links, résumé download, and reduced motion. Chromium emulation does not establish physical-device certification.

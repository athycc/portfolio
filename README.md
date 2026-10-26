# Catherine Notado — Portfolio

A portfolio for project coordination, project management, operations, and community/program coordination internships, with all 12 technical and event projects retained.

Production: https://cathportfolio.vercel.app/
Review branch: feature/pm-layout-and-motion · Draft PR: https://github.com/athycc/portfolio/pull/19

## Run and verify

```sh
npm run dev
npm run build
npm test
```

The static server defaults to port 4173; set PORT to use another port. Vercel builds with Node and serves dist/. No framework runtime or npm package dependencies are required. dist/, local credentials, and QA scratch artifacts are excluded from Git.

## Maintained source

| File | Responsibility |
| --- | --- |
| index.html | Ordered sections, five-link navigation, contact form, metadata, dialogs, and build placeholders |
| site/data.js | All 12 original projects, filter mappings/order, case-study facts/placeholders, experience, skills, credentials, awards, and the separate Edukasyon experience |
| site/projects.js | Shared build/browser card renderer, category filters, and nine-section case studies |
| site/content.js | Experience/background rendering and the résumé preview, loaded when opened |
| site/app.js | Initialization, accessible internal anchors, contact mailto draft, and Copy email |
| site/dialogs.js | Native dialogs, Escape/close, focus return, and exact scroll restoration |
| site/photos.js | Manual three-photo About gallery and visibility-aware muted hero video |
| site/motion.js | Existing basic reveals, reduced-motion preference, and current-section navigation |
| site/styles/pm-layout.css | Responsive PM layout, shared spacing, cards, cases, forms, and header |
| site/styles/flow.css | Existing flow-ribbon SVG treatment; restrained motion is pending Part B approval |
| scripts/build-static.mjs | Static cards, validated PDF fallback, asset fingerprinting, CSS trimming, sitemap, and public assets |
| scripts/serve-static.mjs | Local preview, range requests for media, and development-only responsive viewport harness |
| tests/portfolio.test.mjs | Nine focused content, filtering, build, media, and privacy checks |

## Current layout

Hero → proof strip → skills strip → open-to-work → leadership & delivery (including community/volunteering) → featured & all work → Plan / Coordinate / Deliver / Report → experience → About → education, skills & credentials → contact.

Featured: Mega Manila, South Summit, Edukasyon.ph automation planning (an experience case), and SYNC QA. All work contains every original project in a 3/2/1-column responsive grid. Featured entries are labeled in the grid. Filters are native buttons with aria-pressed and a live result count. Cards are present in the initial HTML, including with JavaScript unavailable; filtering and dialogs require JavaScript.

All original project IDs, links, description facts, contribution boundaries, Power BI artwork, Financial Dashboard artwork/demo, and project archive links remain. QA entries retain Playwright. Original alternate website artwork is retained as event card insets and case-study images.

## Media and brand

- Full 67.55-second muted video: /videos/aws-scd-highlights.mp4, hero only, with the Mega Manila poster. Reduced motion keeps the poster.
- 109.png optimized asset: /projects/scd-mega-highlights.webp, Mega Manila cards/community/poster.
- South Summit supplied image optimized asset: /projects/scd-south-highlights.webp, South cards/community.
- Portrait, robotics, and speaking images remain in About; a portrait also appears in the hero.
- Navy #0f2f63, the existing flow-ribbons.svg, white image frames, and Onest are preserved. Onest Latin is self-hosted in public/fonts with its OFL license.
- Sharing placeholder: public/og/catherine-notado-pm.png (1200×630); editable vector source sits beside it.

## Facts still needed

See PLACEHOLDERS.md for the complete per-case list. Availability and preferred arrangement are intentionally unspecified. No missing achievements, tools, teams, dates, or outcomes have been invented.

To host the actual résumé PDF, place it inside public/ and set resume.pdfPath in site/data.js to its site-relative path. The build validates the file and uses the original Drive PDF while pdfPath is null. The old public text résumé is no longer generated. The public page and résumé preview contain no phone number; the original external PDF remains the supplied document.

## Review gate

Part A layout is ready for review. Part B remains unimplemented pending approval: the session preloader, coordinated word/section reveals, counters, directional nav, smooth anchors, Manila clock, case-study transitions, and subtle ribbon motion. Current internal anchors deliberately move directly while the layout is reviewed.

See QA.md for executed checks and their scope. Preview deployments do not update the production domain.

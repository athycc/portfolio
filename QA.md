# Part A verification — 26 October 2026 (Asia/Manila)

Scope: approved PM internship layout on feature/pm-layout-and-motion. Part B motion requires a separate approval. This report supersedes the old carousel QA; historical evidence remains in Git at 37dcc42.

## Automated checks — passed

- npm test: 9/9 passed.
- npm run build: passed, static output in dist/.
- Every maintained native JavaScript module parses.
- All 12 projects, unique IDs, HTTPS links, archived folders, contribution boundaries, and existing factual résumé corrections remain.
- The initial generated HTML contains every project before JavaScript runs.
- Filter mapping/order preserves all projects and supports multi-category event/web entries.
- Power BI uses the Power BI image, without the Financial demo. Financial retains its own artwork/demo. Original website inset artwork remains.
- Every case-study record supplies facts or explicit placeholders for the required sections. Edukasyon remains a separate experience case; 280K remains a target, not an achieved result.
- Local image/video paths exist. The OG PNG is 1200×630.
- The built page has no phone link, old text résumé, or unresolved build tokens. The original PDF fallback works; hosted PDF configuration rejects missing or out-of-tree files.
- No runtime dependencies were added; restricted script/frame/object policies remain.

## In-app browser checks — passed

Browser: managed in-app browser via cua_repl, on Windows. Exact CSS viewport harnesses were used to avoid the desktop capture surface's DPI scaling. These are browser viewport checks, not physical-device tests.

| Viewport | All work columns | Projects | Horizontal overflow |
| --- | --- | --- | --- |
| 360px | 1 | 12 | None |
| 768px | 2 | 12 | None |
| 1280px | 3 | 12 | None |

- All six filters: All 12, Projects & Events 3, Web & QA 4, Data & Analytics 2, Automation & AI 2, Other 4. Selected state and live counts update.
- All 13 case-study views (12 projects + Edukasyon experience) open with all nine requested sections.
- Power BI shows the correct dashboard image. Financial shows /videos/financial-looker.mp4 with /projects/archive/financial.webp as its poster.
- Escape closes dialogs and returns focus to the opening project. Exact scroll restoration was reproduced and fixed, then verified with identical before/after scroll positions.
- Mobile navigation opens, closes, updates the anchor, and focuses the destination heading. Browse all 12 projects moves directly to the grid heading beneath the sticky header.
- About photos advance 1→2→3 and reverse 3→2, with one visible image and a matching announced status.
- Required contact fields and email type reject invalid input; the invalid form keeps focus on the first missing field. Copy email reports success. No email was sent.
- Résumé dialog opens, contains all 12 project summaries and the original PDF link, and has no phone/text-download link.
- The desktop hero video was observed playing with duration 67.55 seconds, muted=true, paused=false, and the correct Mega Manila poster.
- No broken loaded images were observed.

## Lighthouse

Lighthouse 13.5.0 / Headless Chrome 155. Mobile uses the default simulated mobile/network/CPU profile; desktop uses --preset=desktop. Local runs use the same preview server and cold-run conditions. Performance varies with host load.

| Local preview | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Previous layout baseline | 67 | 100 | 100 | 100 |
| Completed Part A, mobile | 86 | 100 | 100 | 100 |
| Completed Part A, desktop | 100 | 100 | 100 | 100 |

Mobile final measured FCP 1.7s, LCP 3.9s, TBT 60ms, speed index 3.3s. Performance exceeds the baseline; mobile remains below the 90+ target. Self-hosting the existing font, trimming CSS, removing repeated forced-layout reads and obsolete scenes, rendering project cards at build time, and lazy-rendering the hidden résumé improved startup without adding dependencies.

Raw Lighthouse JSON and desktop/mobile screenshots are stored outside the repository in the task evidence directory. Temporary QA files are not committed or deployed.

## Release boundaries

- Vercel preview is built from the feature branch; production remains the approved main branch while Part A is reviewed.
- Availability, work arrangement, hosted PDF path, and missing case-study facts are listed in PLACEHOLDERS.md.
- The mailto workflow still requires a configured email application; no server sends messages. Valid-draft handoff was reviewed in the existing code; no outgoing email was sent.
- Reduced-motion branches and CSS were reviewed in source. An OS-level preference toggle and physical mobile devices were not tested in this run.
- Lighthouse and these targeted checks are not a full accessibility certification or a claim of real-device coverage.

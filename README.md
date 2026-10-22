# Catherine Notado — Portfolio

Live: https://cathportfolio.vercel.app/

A static portfolio built with HTML, CSS, native JavaScript modules, and Node standard-library build scripts. No application package dependencies or framework runtime are required.

## Run

```sh
npm run dev
npm run build
npm test
```

The development server listens on port 4173. `dist/` is generated and is not source. Vercel uses `vercel.json` and publishes `dist/`.

## Maintained source

| Location | Responsibility |
| --- | --- |
| `index.html` | Page structure, metadata and accessible dialogs |
| `site/data.js` | The 12 projects, experience, skills, awards and volunteering |
| `site/app.js` | Initialization, menu navigation and the mailto contact workflow |
| `site/content.js` | Experience lists and the résumé preview |
| `site/projects.js` | Project filters, cards and case-study content |
| `site/gallery.js` | Native horizontal gallery, mouse drag, arrows and keyboard navigation |
| `site/dialogs.js` | Native modal focus, Escape and dismissal |
| `site/slideshow.js` | Timed photo selection, pixel wipe, pause and direct controls |
| `site/featured.js` | The hero's featured-project selector |
| `site/motion.js` | Reduced motion, viewport reveals, current navigation and visible flow layers |
| `site/styles/` | Styles grouped by component and layout; composed into one stylesheet at build time |
| `public/` | Local images, artwork and videos |
| `scripts/` | Static build, synchronized summary and local preview |

The unused React/TanStack tree, build adapters, framework configuration and dependencies were removed. Prior versions remain in Git history. Dashboard images moved from the old source tree to `public/assets/`.

## Behavior

Every main section and the footer has the same reusable flowing light field. CSS view timelines move it through the scroll journey where supported; ambient motion continues without a JavaScript scroll loop. Only visible sections animate. Native wheel/touch scrolling is retained.

The About gallery advances on a timer rather than scroll position. Its brief canvas wipe starts pixelated and resolves to the actual source photo. Manual selection pauses autoplay; Play resumes it. Motion pauses offscreen, with hidden tabs, in dialogs, and with system/site reduced motion. Manual choices remain available. The portrait uses its 1302px original; Building uses the 1080px robotics photo from the supplied archive; the speaking image retains its 425px source detail. No generated facial detail is added.

Project filters expose 4 Web & QA, 2 Data, 2 Automation & AI and 4 Other builds. All 12 projects are available in a native horizontal gallery with touch/trackpad scrolling, mouse dragging, arrow buttons and keyboard navigation. Live websites/repository URLs and seven matching Drive folders are retained. The About photos pause for three seconds between pixel transitions, with manual next and pause controls. Full-bleed flow fields cover every section edge. The original résumé PDF stays linked. The generated text download is a portfolio summary that also includes archive projects.

Contact opens a mailto draft. It does not send email or store submitted content. Security scope and deployment policy are documented in [SECURITY.md](SECURITY.md); browser checks and limitations are in [QA.md](QA.md).

### Image provenance

- Email automation: supplied `image(20261022-171103).png`, optimized as `public/projects/archive/email.webp`.
- Backlog: page 1 of `Copy of product_backlog in power bi.pdf`, file `1Uh9bJjxc0A22boYsUxMzbzf83pK0wQaQ`.
- CapyCademy: `received_2414760442229430.png`, file `15hAfZul74zbk_rUFzODKYRWBOZXgI79s`.
- Robotics: `20250625_093016.jpg`, file `1-L-y9HmeiYiTbSzZgVzJpY68oBJjPBQ4`.
- Credivest: `20250625_095429.jpg`, file `15S-jCubYu47TG3Z6Aom0Hwn-st8k-Cz5`.
- Poro: file `1gi0VJ516Rdfere8eH7nzKSFCRbklyNQ3`.
- Gabay: `Mobile`, file `1022qa0yleLImzPmlwmmli6Py5ZGWEpPB`.
- Skills gap research: page 1 of the supplied archive PDF, file `1OHZmPp_AMdYo4ofS8uxr0KNpRJK19S_M`.

Project archive image copies are WebP, downscaled to at most 1000px without inventing detail. Their combined size is 455,480 bytes; the shared SVG is 3,344 bytes. Images load lazily with dimensions; videos use `preload=none`. Original attachments and Drive sharing were not modified. Additional archive descriptions are bounded by the provided images; undocumented implementation stacks and usage metrics are not invented.

### Verified folder mapping

| Project | Folder |
| --- | --- |
| Product Backlog Dashboard | https://drive.google.com/drive/folders/122VPxokv9yFkh3wk8OUBiZoyVhNaEWN4 |
| CapyCademy | https://drive.google.com/drive/folders/10Turmdj5dJxymT1nazKWnjTAuPLTrBmg |
| Autonomous Sumobot | https://drive.google.com/drive/folders/1S564VR7LJtovR2mT28XPlipMC3YsSBXH |
| Looker Financial Model | https://drive.google.com/drive/folders/122VPxokv9yFkh3wk8OUBiZoyVhNaEWN4 |
| Credivest · Home Credit Hackada | https://drive.google.com/drive/folders/1ozoGQhvZdlvmvb0Atjy6ZMTUtgxEi5h1 |
| Poro · Time Management | https://drive.google.com/drive/folders/157KtG4CGbU0aJH4nN7eNxeYS-HxjJgRr |
| Gabay | https://drive.google.com/drive/folders/1MTaMhuUPGgy8sYWmtd18Tfati9xcz0VQ |
| Skills Gap Assessment Research | https://drive.google.com/drive/folders/1d0lsU1-cBcNqNIWLcn2RafRWIE6Thl15 |

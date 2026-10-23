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
| `site/gallery.js` | Continuous 3D project stream, pointer drag, arrows and keyboard navigation |
| `site/dialogs.js` | Native modal focus, Escape and dismissal |
| `site/slideshow.js` | Scroll-distance photo selection, pixel wipe and manual next |
| `site/scene.js` | Native sticky hero, scroll-scheduled parallax and visible-only film playback |
| `site/pointer.js` | Contextual desktop pointer hints; native pointer retained |
| `site/featured.js` | The hero's featured-project selector |
| `site/motion.js` | Reduced motion, viewport reveals, current navigation and visible flow layers |
| `site/styles/` | Styles grouped by component and layout; composed into one stylesheet at build time |
| `public/` | Local images, artwork and videos |
| `scripts/` | Static build, synchronized summary and local preview |

The unused React/TanStack tree, build adapters, framework configuration and dependencies were removed. Prior versions remain in Git history. Dashboard images moved from the old source tree to `public/assets/`.

## Behavior

Every main section and the footer share a flowing light field. One scroll-scheduled animation frame updates the receding hero and slower background travel for visible sections; it does not require CSS view timelines. The hero pins on desktop and mobile, accounting for content taller than the viewport so short-screen controls remain reachable. About overlaps it through a translucent 14px blur layer. Fourteen masked heading lines replay as their headings enter the reading area. Experience and education content stay steady. System reduced motion uses ordinary document flow and a static hero poster.

The hero film is a nine-second muted crossfade of three existing community/robotics photos, compressed to about 192KB. It plays only while visible, with motion enabled and no modal open. Project cards show an inset image on hover/keyboard focus. Selection opens a dark media-first overlay: actual local demos play muted with controls, while other projects show their image and existing links. The native pointer stays visible alongside contextual labels. Build output fingerprints CSS and the complete JavaScript module directory together so new deployments cannot mix cached code versions.

The About photos form a three-card stack, with two real photos angled behind the active image. The stack rotates as the visitor scrolls: each 96px of travel requests the next or previous photo, with one coalesced update per animation frame while the gallery is visible. The short canvas wipe resolves to the original image; there is no idle timer. Manual next remains available. GWA is omitted from the public page, résumé preview and generated text résumé. The portrait uses its 1302px original, robotics uses the supplied 1080px photo, and speaking retains its 425px source detail.

Project filters expose 4 Web & QA, 2 Data, 2 Automation & AI and 4 Other builds. The reference-inspired continuous 3D stream uses a larger center card, angled side cards, perspective depth and circular wrapping. It supports horizontal pointer drag on mouse/touch, arrows, keyboard navigation and click-through details. The centered project's summary, stack and live/archive links appear beneath it. The gallery’s own visible-only frame loop uses cached geometry; interaction, dialogs, hidden tabs and system reduced motion suspend automatic movement. No cards are cloned. All visible pause controls and their persisted state are removed; the operating system's reduced-motion preference remains respected. Full-bleed flow fields, the original résumé PDF, generated text résumé and seven verified Drive folders are retained.

Contact opens a mailto draft. It does not send email or store submitted content. Security scope and deployment policy are documented in [SECURITY.md](SECURITY.md); browser checks and limitations are in [QA.md](QA.md).

### Image provenance

- Email automation: supplied `image(20261022-171103).png`, optimized as `public/projects/archive/email.webp`.
- Financial Dashboard: frame at 0.5 seconds from the supplied local `financial-looker.mp4` demo, saved as `public/projects/archive/financial.webp`; replaces the unrelated backlog screenshot.
- Backlog: page 1 of `Copy of product_backlog in power bi.pdf`, file `1Uh9bJjxc0A22boYsUxMzbzf83pK0wQaQ`.
- Capycademy: `received_2414760442229430.png`, file `15hAfZul74zbk_rUFzODKYRWBOZXgI79s`.
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
| Capycademy | https://drive.google.com/drive/folders/10Turmdj5dJxymT1nazKWnjTAuPLTrBmg |
| Autonomous Sumobot | https://drive.google.com/drive/folders/1S564VR7LJtovR2mT28XPlipMC3YsSBXH |
| Financial Dashboard | https://drive.google.com/drive/folders/122VPxokv9yFkh3wk8OUBiZoyVhNaEWN4 |
| Credivest · Home Credit Hackada | https://drive.google.com/drive/folders/1ozoGQhvZdlvmvb0Atjy6ZMTUtgxEi5h1 |
| Poro · Time Management | https://drive.google.com/drive/folders/157KtG4CGbU0aJH4nN7eNxeYS-HxjJgRr |
| Gabay | https://drive.google.com/drive/folders/1MTaMhuUPGgy8sYWmtd18Tfati9xcz0VQ |
| Skills Gap Assessment Research | https://drive.google.com/drive/folders/1d0lsU1-cBcNqNIWLcn2RafRWIE6Thl15 |

### Primary project files

The gallery summary, project dialog and résumé use these user-supplied direct destinations. Archive folders remain available in project details.

| Project | File |
| --- | --- |
| Product Backlog Dashboard | https://drive.google.com/file/d/1Uh9bJjxc0A22boYsUxMzbzf83pK0wQaQ/view?usp=drive_link |
| Capycademy | https://drive.google.com/file/d/1PRYsDeffIIBvqUPual322HVbgf4calIz/view?usp=drive_link |
| Financial Dashboard | https://drive.google.com/file/d/188QVEm6pZugXMkiR1mU7qrMpp5vDL9Sf/view?usp=drive_link |

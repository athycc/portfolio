# Focused portfolio security review

Reviewed source: the static portfolio refactor following commit 88c924c8095c2e817ed2e66d96268a090bdde79e. This is a source review and deployment hardening pass, not a penetration test or security certification.

## Actual surfaces

The public site serves static HTML, first-party JavaScript modules, styles, images, videos and a text résumé. Project data is maintained in `site/data.js`. There is no application login, password store, database, server-side email sender or secret-bearing API. The contact form validates required fields and opens an encoded mailto draft; sending happens in the visitor's email app. Only the animation preference is stored locally.

## Controls applied

- `vercel.json` restricts scripts to the same origin with CSP. It forbids plugin content, base elements, form submissions and embedding. It retains MIME-sniffing/referrer controls and adds denied camera, microphone, location, payment and USB permissions.
- CSS inline declarations remain allowed because existing trusted templates use them. Google Fonts stylesheet and font hosts remain allowed; third-party JavaScript is not allowed. This is a focused script policy, not a claim of the strictest possible CSP.
- Rendered project and résumé text is escaped. The build rejects malformed project identifiers and non-HTTPS public project links. External tabs retain `noopener noreferrer`.
- Native form requirements and length limits remain in place: name 100, email 200, message 4000 characters. Values are URL-encoded for the draft. No form contents are stored or submitted to this site.
- Unused legacy framework, error-capture implementation, server scaffolding, configuration, and dependency manifests have been removed. The maintained build uses Node standard libraries and native browser APIs.
- `.env` and environment-file variants are ignored. No credentials are required in public source.
- The preview server confines paths to `dist/`. Its same-origin framing exception exists only for the local viewport harness; production framing remains denied.

## Classification and limits

Missing CSP/embedding restrictions were hardening opportunities; no established exploitable boundary failure is claimed. Authentication, password hashing, SQL injection and row-level security are not present application surfaces. Account MFA, repository access, Vercel firewall/rate limits, provider logs and operational recovery settings were not inspected. Git history preserves prior versions, but no independent backup or restore drill was performed.

No intrusive endpoint probes, vulnerability payloads, traffic/load tests or independent audit verification were performed. Normal development build checks and browser interaction QA are recorded in QA.md. Deployment success alone does not prove a browser security header was delivered; production CSP behavior must be checked with the deployed page.

References: [Vercel static headers](https://vercel.com/docs/project-configuration/vercel-json#headers), [MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP).

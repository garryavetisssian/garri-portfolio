# Portfolio revision contract · 2026-10-21

- **Surface:** personal portfolio homepage (including the method section), case discovery, About, CV, and four legacy case studies.
- **Audience:** design directors and hiring teams assessing Garri for Senior Product Designer roles, especially iGaming.
- **User job:** understand his specialism and ownership quickly, find a relevant case, then distinguish demonstrated work from unverified outcome claims.
- **Primary action:** open the Duck Master case or the iGaming collection; secondary action is browse all 14 cases.
- **Hierarchy:** role and specialty → distinctive product-design proposition → shipped-but-closed game → selected cases → evidence-bounded case story → original screens.
- **Method content:** replace generic claims about research/testing with actual project decisions and clear evidence boundaries.
- **Tone:** editorial, confident, precise; retain the existing dark, typographic visual system and violet accent.
- **Memorable detail:** a game that reached release and was later closed, stated plainly alongside current product stages, rather than treating all cases as equivalent launches.
- **Reference observations:** prior hiring audit in `senior-product-designer-portfolio-audit-2026-10-20.md`, current site, actual case assets, and user-supplied project explanations. On 2026-10-21 the user clarified that Duck Master was published, then failed and closed after about one year; the reason is not documented here. Do not invent a cause, metrics, research or testimonials.
- **Rendered viewports captured:** mobile 384×831 and desktop 1434×900 for the first revision; mobile 390×844 and desktop 1440×900 for the latest copy and editorial maps.
- **Constraints:** Next.js existing routes and design tokens, English/Russian/Armenian copy, keyboard-readable navigation, no new dependency, no invented evidence. Publication was subsequently requested as part of completing the remaining work.

## Content states

The revised homepage and editorial cases are static content. Loading, empty and permission states do not apply to these sections. Success is opening a case from a visible link; partial evidence is explicitly labelled within a case. The contact form's empty-submit error state was additionally checked, without sending a real message.

## Verification boundary

All 14 case pages plus Home, Work, About, CV and Contact were inspected at 390px and 1440px; tablet-width routes were also checked at 768px. No horizontal overflow or broken first-viewport image was observed. The maps are labelled as editorial explanations, not original shipped screens. BalVoi's tall original screenshots use per-frame preview focal points so the feature, rather than the site header, appears in the rail; opening a frame still shows the untouched source. Original project boards remain available in a collapsed source archive, which opened and closed with Enter. The mobile menu and language chooser were exercised by keyboard; small header targets were enlarged to at least 44px. The contact form's empty-submit warning exposes an alert and invalid fields, but a real message was not sent. XY tabs switched to `#xygo`; its original film loaded, played in the viewport, paused offscreen and resumed on return. The film now also respects page visibility and reduced-motion preference in code. These are targeted checks, not an assistive-technology or pixel-regression certification; no visual baselines exist.

The final production build completed successfully on 2026-10-21, generating 71 static pages and the dynamic case/chat routes. TypeScript passed, `git diff --check` was clean, and lint had zero errors with 29 existing warnings concentrated in image-heavy game-case assets and a few unused imports. The earlier font-fetch issue was environmental and was resolved by running the build with network access.

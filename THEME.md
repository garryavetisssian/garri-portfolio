# Portfolio appearance

The portfolio keeps its editorial-tech visual system in both themes: Unbounded display type, Manrope body text, JetBrains Mono labels, squared controls and fine rules. Light mode uses warm paper rather than pure white, with deep violet accents and charcoal text. Dark mode retains the original near-black palette with stronger secondary-label contrast.

## Theme behavior

`src/app/globals.css` owns semantic color tokens. `data-theme` on the root selects the palette. A small synchronous head script applies the saved `portfolio-theme` preference before content renders. Without a saved preference, the website follows the OS appearance, including subsequent OS changes. Storage failures are non-fatal; a user can still switch themes in the current page. Cross-tab storage changes synchronize appearance.

The localized, keyboard-operable sun/moon control is beside language selection on desktop and immediately before Menu on mobile. Its accessible name describes the action; its target is 44×44px. The closed mobile menu is inert so hidden links cannot receive keyboard focus.

Case-study artwork, branded game scenes and the printable CV sheet retain their authored colors; portfolio chrome and surrounding text use theme tokens. Evidence images are not recolored or inverted. This avoids changing the design evidence or downloadable CV appearance.

## Contrast checks

Normal text targets at least 4.5:1, and large text at least 3:1, following [WCAG contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Secondary labels, placeholders, hover text and accent-colored labels must be checked against their actual surface, not just the page background.

Run `THEME_TEST_ORIGIN=http://127.0.0.1:3011 node scripts/check-themes.mjs` against the production preview. The test uses axe-core color-contrast checks on the main pages, all 13 case studies, collections and Russian/Armenian collection pages at 390px and 1440px in both themes. It also checks horizontal overflow and keyboard-toggle persistence after reload and navigation. It cannot certify text inside raster design evidence or every possible interactive game/chat state; those require separate visual review.

Verification on 2026-10-09: production build passed; 72 semantic text/control-boundary combinations passed; all 88 page/theme checks at 390px and 1440px passed after entrance animations settled. Another 16 checks at 320px and 768px passed for localized collections and Contact. Keyboard activation, reload/navigation persistence and live OS appearance changes passed. Automated checks reported no text-contrast violations or horizontal overflow in these tested states.

## Vivaro cover

The collection cover uses the same shared HTML/CSS cover system as NexWave, Dispatch Center and AI Hive: an oversized title, low-contrast decorative letter field, accent lighting, metadata rails and a product detail. Vivaro keeps a magenta accent and its original mobile feed screen. `CoverEditorial.webp` is generated separately; the supplied `Cover.png` remains unchanged in the case-study hero.

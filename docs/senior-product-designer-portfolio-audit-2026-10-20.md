# Portfolio hiring audit — Senior Product Designer

**Date:** 20 October 2026
**Review lens:** Design director hiring a Senior Product Designer
**Scope:** Local running site (`http://127.0.0.1:3011/en`), English homepage, Work and its three collections, About, CV, Contact, and all 14 case-study routes; repository content and rendering code where needed. No site changes were made.

## Verdict

**Interpretation:** This is a visually memorable, unusually broad portfolio, but it currently supports a **strong mid-level / emerging senior interview**, not a confident senior hire on the published evidence alone. That is a judgment about the *portfolio's proof*, not a claim about the designer's actual ceiling. I would shortlist for a conversation because Ineed, BalVoi and XY suggest real systems work; I would not infer senior-level product impact from the visual polish or the current numbers.

**Three strongest signals**

1. **Systems breadth:** Ineed spans two marketplace sides; BalVoi spans reading, analysis and editing; XY spans related product surfaces. The portfolio explicitly claims end-to-end UX, UI and reusable systems.
2. **Distinctive visual voice:** black/paper contrast, acid-purple accents, editorial typography, rules and serial labels create recognition across the site. The detailed Vivaro and gaming cases show range beyond generic SaaS cards.
3. **Improved evidence honesty:** the featured cases distinguish registrations from bookings, interface scope from outcomes, and approved pre-production design from launched use. This restraint is a credibility asset.

**Five biggest weaknesses**

1. **Outcome evidence is thin.** Ineed's ~800/~100 are approximate registrations; Duck Master's ~300→~2,000 is approximate audience context, not attributed impact; BalVoi's 8,000/5/2 and XY's 4/1/12+ measure scope, not improved behaviour or business performance. The recruiter still cannot answer “what changed because of your design?”
2. **The site leads with style before proof.** At the observed 1280×720 desktop viewport, the homepage's large “DESIGN IS A BUSINESS FUNCTION.” consumes the opening view; the role, evidence and selected case are lower. The case template likewise opens with title/metadata and substantial empty space before the actual decision.
3. **Several cases are image collections with assertions, not reconstructed decisions.** NexWave, Dispatch Center and AI Hive describe sensible principles but show little evidence of alternatives, constraints, evaluation, or effect. The gaming concepts primarily show craft, not senior product leadership.
4. **Portfolio arithmetic and role labels are inconsistent.** Homepage hero says 07 projects, About says 6 case studies, footer says 14 case studies, while the archive contains 14 unique cases. Duck Master is “Creative Director” in work history but “Product Designer” in its case; both may be true, but the relationship is unexplained.
5. **Selection and pacing obscure the strongest work.** Fourteen cases plus method manifesto, mini-games and technical colophon diffuse attention. The entertainment collection leads with KENO/Roo/Spearthrone while a released product, Duck Master, appears sixth.

## Method and limits

- **Observed:** Opened the running English pages and all 14 case routes in the browser; reviewed page text, headings, imagery counts, opening compositions and available controls. Checked the homepage and representative case visuals at desktop size, and Duck Master's case template at **390×844**. At 390 px, its header collapsed to a menu and its measured document width was **384 px against a 390 px viewport**, with no horizontal overflow in that sampled state.
- **Observed:** Attempted activation of the Work collection switch and XY gallery's second tab by pointer and keyboard in the in-app browser. The selected state did not change in those attempts; direct `#xygo` navigation also left the first gallery selected. There were no console errors in the captured log. This is an **interaction regression to reproduce in a second environment**, not a confirmed cross-browser defect. The XYGO video could not be inspected in its active state, so its presence/playback is **unverified** in this audit.
- **Not fully inspected:** A browser-control interruption stopped the full 390 px sweep; mobile layout, tap behaviour and overflow were not visually verified on every page. Tablet was not inspected. Contact form was not submitted (to avoid a real outbound message). Contrast ratios were not measured, assistive technology was not run, and live external product links, analytics and Figma sources were not authenticated. Recommendations involving these are hypotheses, not observed failures.
- **Implementation checks:** Read case content in `src/data/projects.ts` and `src/data/case-evidence.ts`, plus the case and work renderers. `src/app/globals.css` defines a global `:focus-visible` outline and reduced-motion rules; those are positive provisions, not proof that every interaction is accessible. Image links have descriptive accessible names in the main case renderer, but many names are generic “visual N.”
- **Prior material worth reconciling:** The existing `garri-portfolio-v2` project research note records an earlier asset-by-asset review finding that the live descriptions of **AI Hive, Dispatch Center, NexWave and Razer UI** do not fully match their supplied assets. I did not independently repeat that entire asset review in this session, so treat this as a documented **content-verification risk**, not a newly observed visual fact. Check those four cases against original files before publishing stronger claims.
- **Independent lenses:** Separate visual-craft, product-thinking and storytelling reviewers were initiated. They supplied partial findings, then reached tool usage limits. The ranking and verdict below are my reconciliation, not three complete independent audits. The available Ruflo tools were searched for and were not exposed in this session; no plugin was installed.

“Observed” below means directly seen on the local site or its implementation. “Interpretation” is a hiring inference. “Recommendation” is a proposed change, not a claim that an undocumented research activity or outcome happened.

## Audience and positioning

**Observed:** The homepage calls you a “Product Designer with 5+ years” across AI, Web3, SaaS and marketplaces; selected work is BalVoi, Ineed, XY and NexWave. About and CV emphasize strategy, research, UI, systems and AI-assisted work. The site says “available for work” but not “Senior Product Designer.” You confirmed **Senior Product Designer** as the intended target.

**10-second read:** “A visually bold generalist product designer who likes complex digital products and builds polished interfaces.” I cannot quickly tell the depth of your ownership, the business outcomes, or whether you lead teams and product decisions. “Design is a business function” is an effective thesis, but the first screen does not immediately prove it.

**Distinctive:** Two-sided service design, human-controlled AI analysis, and cross-product Web3 consistency are more differentiating than an industry list. The black editorial site is recognizable, but brutalist portfolios are common enough that typography alone will not distinguish you for senior hiring.

**Recommendation:** Put a concrete positioning sentence and proof pair near the hero: one line naming the kind of complex product problem you lead, followed by two linked examples (e.g. Ineed's marketplace pivot and BalVoi's inspectable AI workflow). Preserve the expressive headline as supporting voice, not the only first-screen message. Do not add “Senior” as a self-awarded title unless the case evidence backs it up.

## Perceived designer level by dimension

| Dimension | Published signal | Confidence | What remains unknown |
|---|---|---:|---|
| Visual craft | Strong, distinctive, but uneven legibility within screenshot galleries and dense dark-on-dark artifacts | Medium | Accessibility decisions inside delivered products; production quality across all breakpoints |
| Interaction design | Multi-state flows in Ineed/BalVoi; responsive concepts in Vivaro; game-state clarity in KENO | Medium | Tested failure states, interaction specifications, usability outcomes |
| Product thinking | Genuine pivots and tradeoffs in Ineed, BalVoi, XY and Duck Master | Medium | Decision authority, rejected options, prioritization under constraints |
| Ownership and collaboration | Lead roles are stated; whole-product and design-system scope is described | Low–medium | Stakeholder conflicts, engineer/data-scientist collaboration, how design changed roadmap or implementation |
| Strategic influence | Ineed investor-triggered model pivot; XY cross-surface language | Low | Whether you initiated or shaped strategic choices versus executing an agreed direction; downstream business effect |
| Measured impact | Limited and properly caveated | High | Conversion, completion, retention, support, comprehension, quality, revenue or time-saved measures |

**Assessment:** Strong mid-level evidence, with plausible senior potential. The gap is demonstrated product leadership and validated consequence, not necessarily ability. A visually polished case cannot substitute for a causal chain from problem → evidence → options → decision → release → measured learning.

## Comparative case ranking for senior hiring

This ranks **current hiring impact of the published case**, not the person's talent or absolute quality of the underlying work. “Work” and “presentation” are separate judgments.

| Rank | Case | Underlying work signal | Current presentation | Senior hiring use |
|---:|---|---|---|---|
| 1 | [Ineed](http://127.0.0.1:3011/en/work/ineed) | High: two-sided release and business-model pivot | Medium: decision is real, before/after scattered | Lead case after revision |
| 2 | [BalVoi](http://127.0.0.1:3011/en/work/balvoi) | High: shipped, intricate AI editorial workflow | Medium–high: clear walkthrough; impact absent | Lead/second case |
| 3 | [XY Ecosystem](http://127.0.0.1:3011/en/work/xy-ecosystem) | Medium–high: multi-product system and trust patterns | Medium: broad scope, tiny gallery text; pre-launch | Feature with explicit stage |
| 4 | [Duck Master](http://127.0.0.1:3011/en/work/duck-master) | Medium–high: released, varied game system and mechanic | Medium: one mechanic dominates; role mismatch | Feature selectively |
| 5 | [Soloos](http://127.0.0.1:3011/en/work/soloos) | Medium: independently coded full-stack product | High: clear boundaries and verification | Show as supporting systems/technical range |
| 6 | [Meridian HR](http://127.0.0.1:3011/en/work/meridian-hr) | Medium: structured brief-to-prototype workflow | High: traceable artifacts; take-home scope | Supporting evidence, not flagship |
| 7 | [Vivaro.me](http://127.0.0.1:3011/en/work/vivaro) | Medium: coherent five-surface concept | High visually and honestly labeled | Short supporting concept |
| 8 | [Dispatch Center](http://127.0.0.1:3011/en/work/dispatch-center) | Potentially medium; real-time domain is rich | Low: brief and image gallery | Improve before featuring |
| 9 | [NexWave](http://127.0.0.1:3011/en/work/nexwave) | Potentially medium; IoT hierarchy | Low: principle asserted, little validation | Improve or compress |
| 10 | [KENO](http://127.0.0.1:3011/en/work/keno) | Medium craft/game-state design | High visual storytelling | Keep in specialist gallery |
| 11 | [AI Hive](http://127.0.0.1:3011/en/work/aihive) | Unclear; concept/prototype | Low: generic AI workflow wording | Replace or compress |
| 12 | [Roo's Ruckus](http://127.0.0.1:3011/en/work/roos-ruckus) | High game-art/feature craft, low product evidence | Medium–high for art direction | Specialist gallery only |
| 13 | [Spearthrone](http://127.0.0.1:3011/en/work/spearthrone) | High visual-world craft, low product evidence | Medium–high for art direction | Specialist gallery only |
| 14 | [Razer UI](http://127.0.0.1:3011/en/work/razer-ui) | Narrow two-week visual exploration | Low–medium, dated relative to current work | Archive, not senior selection |

## Detailed case reviews

### 1. Ineed — feature first, revise first

**Observed:** The case states you designed both the original company-led platform and later two-app home-appliance release. It identifies investor rejection of a broad/company-only model, the move to licensed individuals, a two-sided state sequence, and approximate ~800 customer/~100 professional registrations. Customer and professional journeys are shown, but the earlier deck and later flows sit in separate galleries; the first old-version hero asset is not representative of the released interface. **Interpretation:** Best evidence of product/market reframing and multi-actor design, but readers must assemble the “before → decision → after” story themselves. Registration counts establish interest, not successful service matching. **Keep:** the pivot, both sides, state synchronization, honest metric caveat. **Cut/compress:** most undifferentiated gallery pages and any outdated promotional slide as a hero. **Expand:** one paired journey per actor, why home appliances won over alternatives, how licensing/trust and pricing were handled, release constraints, your decision authority, and what happened after launch. **Most valuable real material:** dated registration definition/source, request-to-match and job-completion funnel (if available), investor/client feedback, annotated original and released flows. **Visual:** a legible side-by-side “company dashboard → two mobile apps” architecture and a request-state map shared by customer/professional.

### 2. BalVoi — feature, sharpen the evidence

**Observed:** Shipped in supported regions. DeBiasIt shows style/reading/language inputs, processing states, source versus recommended text, summary/detailed score comparison and sentence-level alternatives/manual rewriting. The 8,000-word limit, five measures and two depths are capability counts. **Interpretation:** Strong human-in-the-loop AI design and useful progressive disclosure; “reducing bias” is a sensitive claim that needs model/score explanation and user comprehension, not only an attractive chart. **Keep:** article-to-revision walkthrough, visibility of AI states, manual control. **Cut/compress:** repeated full-page captures with unreadable text and footer chrome. **Expand:** what users misunderstood, why summary/detail split beat alternatives, score limitations, editorial safeguards and collaboration with data science. **Most valuable real material:** dated usability feedback, score methodology/limitations, task success or edit acceptance (if collected), readable annotated result. **Visual:** one magnified three-frame sequence—source, comparison, sentence decision—with precise callouts.

### 3. XY Ecosystem — feature carefully as pre-production

**Observed:** Approved design/pre-production, not a full platform launch. The case spans XYGO, market, Earn, Cybele and XYU with shared navigation, asset/position views, transaction patterns and terms. Counts describe scope/duration, not adoption. The XYGO gallery tab did not switch in this browser attempt; its video was not verifiable. **Interpretation:** Senior-scale information architecture and system thinking are plausible; the narrative currently over-relies on breadth and remote, tiny screens. **Keep:** cross-product trust logic and clear stage label. **Cut/compress:** repetitive board images and any launch-sounding phrasing unsupported by a release. **Expand:** component decisions across two protocols, where consistency intentionally breaks, risk/fee/lock comprehension, approvals and engineering handoff. **Most valuable real material:** approved end-to-end flow, design-system source, decision record, formative testing or stakeholder acceptance notes. **Visual:** one shared component matrix and one readable transaction sequence; retain XYGO video and verify playback/viewport behaviour before release.

### 4. Duck Master — feature selectively

**Observed:** Released Telegram mini-app; the case describes broad career/cards/market/social systems and one redesign from buy/sell timing to a 10-second directional round. The ~300→~2,000 audience estimate is historical Google Analytics context, explicitly not causal proof. About/work history calls the role Creative Director; the case says Product Designer. **Interpretation:** Good demonstration of simplifying a mechanic and creating a coherent game world, but the betting/variable-multiplier pattern also raises clarity and responsible-play questions. **Keep:** real product capture, system-wide contribution, mechanical tradeoff. **Cut/compress:** generic game-world statements and any invented player quote. **Expand:** precisely how founder/team feedback was gathered, safeguards around stake/odds/outcome, constraints of Telegram, your role versus creative-direction title. **Most valuable real material:** old-flow artifact, dated real feedback, round participation/completion or retention data with period/source. **Visual:** annotated old/new mechanic frames and one gameplay-state strip.

### 5. Soloos — supporting proof of technical range

**Observed:** Independent, implemented product; page clearly labels its hero content illustrative, documents the profile → job signals → draft → human review flow, code boundaries and 11 automated tests. **Interpretation:** Strong ownership and craft, not yet evidence of market fit or user value. **Keep:** control model, implementation choices, honesty about tests/scope. **Cut/compress:** generic AI ambition or repeated mock interface cards. **Expand:** a real end-to-end task recording, errors/failure recovery, what actual users (if any) found difficult. **Most valuable real material:** real pilot usage or usability notes, deployment status, task-completion evidence. **Placement:** supporting case near the end of featured work, not ahead of shipped client products.

### 6. Meridian HR — supporting process case

**Observed:** Explicit recruitment test task; six role-specific prompts, eight request-state screens and two coded deliverables. It explains contracts, tokens, context, handoff and review. **Interpretation:** Strong process traceability and technical fluency, but a take-home cannot establish long-term stakeholder influence or release impact. **Keep:** brief-to-system-to-prototype trace. **Cut/compress:** artifacts that repeat the workflow without a decision. **Expand:** one critique of the generated output, a human correction, and the tradeoff between speed and quality. **Most valuable real material:** review notes, prototype task test, evaluator feedback if permitted. **Placement:** specialist AI-engineering collection.

### 7. Vivaro.me — concise concept showcase

**Observed:** Clearly labeled recruitment concept (not employment/release); five experiences on desktop/mobile; coherent shell and distinct discovery modes. **Interpretation:** Good information architecture and presentation, but no usage or organizational constraints. **Keep:** honest status, cross-surface navigation logic. **Cut/compress:** repeated screens and generic feature inventories. **Expand:** alternatives considered and accessibility/reward-pressure tradeoffs already identified in its “next steps.” **Most valuable real material:** brief, actual critique, prototype testing. **Placement:** one short supporting concept, not evidence of shipped senior impact.

### 8. Dispatch Center — upgrade or demote

**Observed:** Real-time fleet dashboard; “4+ tools” replacement claim, live map, routing, chat, alerts and trip history. A quote says “show what needs action now.” The case then moves to image assets and a generic reflection. **Interpretation:** Potentially excellent senior case because triage and operational failure states are complex; present write-up does not prove the work. **Keep:** time-critical hierarchy. **Cut:** unsubstantiated quantitative replacement wording unless sourced. **Expand:** dispatcher task model, alert prioritization, stale-data/connection states, routing alternatives, operator validation and launch status. **Most valuable material:** source for “4+ tools,” annotated alert workflow, evidence of actual dispatcher use. **Placement:** feature only after reconstruction.

### 9. NexWave — upgrade or shorten

**Observed:** Three-month smart-home case organized by rooms/devices/automations; claims one app replacing 5+ apps and a “research insight” about rooms/routines, followed by assets. **Interpretation:** Credible organizing principle but thin evidence and no integration or error-state detail. **Keep:** mental-model decision. **Cut:** “5+” and research attribution without actual source. **Expand:** device onboarding, permissions, automations, offline/error states, tested navigation alternatives. **Most valuable material:** interviews/observation notes, prototype findings, integrations and shipping status. **Placement:** shortened support case until evidence exists.

### 10. KENO — specialist visual/UI case

**Observed:** One-view 80-number/20-draw interface, selection/draw/result states and a film with native video controls. **Interpretation:** Strong temporal/state craft; numeric facts are game rules, not product metrics. **Keep:** state sequence and legibility rationale. **Cut/compress:** decorative repetition. **Expand:** betslip/error states, contrast at table density, any real usability test; distinguish simulated game from shipped product. **Most valuable material:** clickable build or test recording. **Placement:** first in a clearly separate game-UI gallery, not top of product-design shortlist.

### 11. AI Hive — likely replace

**Observed:** Four-month concept/interactive prototype; copy says “AI should be helpful, never autonomous,” lists suggestions/dashboard/collaboration and 14 assets. **Interpretation:** Too interchangeable with generic AI SaaS concepts and insufficiently differentiated next to BalVoi/Soloos. **Keep:** only if there is a specific workflow with credible evidence. **Cut:** unsourced broad research/design-system claims and stock principles. **Expand:** one concrete task, human override, failed suggestion, prototype test and your decision. **Most valuable material:** original brief and test/iteration artifacts. **Placement:** archive or replace if those are unavailable.

### 12. Roo's Ruckus — specialist art/game case

**Observed:** Labeled independent concept with a 5×5 slot board, character-based wild/multiplier/respins, motion and supporting screens. Some metric-like tiles are game specifications and appeared as `0` in browser text during the observed render, likely animated-count initial state; verify their settled display. **Interpretation:** Character art and feature logic are distinctive but not product-outcome evidence. **Keep:** character-to-mechanic rationale. **Cut/compress:** repetitive world-building boards. **Expand:** readability and responsible-play states; ensure concept status stays unmistakable. **Most valuable material:** working interaction and critique. **Placement:** specialist entertainment gallery, not main senior-product sequence.

### 13. Spearthrone — specialist art/game case

**Observed:** Explicit independent Spartan slot concept, materials, symbol hierarchy, 6×5 reels, tumbling wins, multipliers and cinematic motion. **Interpretation:** Strong art direction; overlapping signal with Roo and KENO. **Keep:** best one or two visual frames plus animation. **Cut/compress:** repeated spectacle with little design reasoning. **Expand:** readability at reel scale, win-state legibility, motion-reduction behaviour. **Most valuable material:** playable prototype or critique. **Placement:** gallery thumbnail/short case.

### 14. Razer UI — archive

**Observed:** Two-week solo 2022 brand-inspired UI exploration, five assets, concept label. **Interpretation:** Narrow and now dated relative to current work; it competes with stronger craft elsewhere. **Keep:** only as an archive sample if the visual system is still representative. **Cut:** implication that a two-week concept proves senior product work. **Expand:** not worth major investment for this target role. **Placement:** archive, not homepage or CV.

## Page-by-page UI and usability review

| Page / precise reference | Observation | Interpretation and recommendation |
|---|---|---|
| **Home** `/en`, hero through first project | Oversized display headline, small numbered navigation, portrait and proof lower in the scroll; hero says **07 projects** while footer says **14 cases**. Selected products start BalVoi/Ineed/XY/NexWave. | Excellent character; slow hiring comprehension. Put role/problem space, one ownership claim and proof links in the first viewport. Reconcile all counts. Keep a shorter editorial headline. |
| **Home**, method/history/contact/mini-games/footer | Four-step method text, five positions, contact links, three mini-games and a technical colophon. | The method reads like standard design-process promises; mini-games and framework credits dilute senior-product positioning. Replace some manifesto space with a specific decision artifact and move games/technical details to a secondary area. |
| **Work** `/en/work` and **Products** `/en/work/products` | 14 unique cases across 8/6/2 overlapping collections; the products grid opens with three strong cases then NexWave, Dispatch, AI Hive, Vivaro, Razer. | Labels and stage caveat help, but the archive implies similar weight across unequal evidence. Add visible status/evidence labels and a curated “start here” 3-case path. |
| **Entertainment** `/en/work/entertainment` | KENO, Roo, Spearthrone precede Duck Master; Vivaro and XY also appear. | Works for an art-director/game-UI audience, less so for senior product design. Make released Duck Master easy to find, or clearly separate “released game” from concepts. |
| **AI Engineering** `/en/work/ai-engineering` | Soloos and Meridian HR are clearly independent/test-task work. | Clear scope. Keep separate from client impact claims; make the link back to product design explicit. |
| **About** `/en/about` | Big “DESIGN IS A BUSINESS.” thesis, capabilities/tools, work history; says **6 case studies**. | Strong voice but generic proof and count conflict. Replace some list items with two concise leadership examples and align count/status terminology. |
| **CV** `/en/cv` | Five-role experience and skills; selected projects include BalVoi and XY but omit Ineed. | The best marketplace-pivot story is missing from the hiring document. Reorder selected projects around evidence, clarify Duck Master title, give concise outcome/scope with caveats. |
| **Contact** `/en/contact` | Direct contact and a name/email/subject/message form, “reply within 24h” claim. | Good multiple paths. Test invalid/empty/error/success states and keyboard order; this audit did not submit. Keep the 24-hour promise only if operationally reliable. |
| **Featured case template** Ineed/BalVoi/XY/Duck | Dark editorial shell, consistent metadata, whole-project scope, capability tiles and one decision in context. Desktop opening at `/en/work/ineed` leaves large vertical space before the actual problem. | Attractive but slow. Bring one legible product visual and decision/result summary into the first screen; reduce template repetition. Show “your role / evidence quality / status” consistently. |
| **Legacy brief template** NexWave/Dispatch/AI Hive/Razer | Four-panel brief, zeros visible in immediate text capture for count-up tiles, gallery, short reflection. | Feels more like a pitch deck than a rigorous case. Ensure numbers render correctly without animation and do not treat duration/asset counts as impact. |
| **Special cases** Vivaro/Soloos/Meridian/KENO | More bespoke narrative and state sequences; Soloos/Meridian use code-like interface illustrations, KENO video controls visible in DOM. | Better pacing and specificity. Avoid overlong screens, make in-image text readable, add alt/captions that explain design decisions instead of counting frames. |

### Visual craft

**Excellent:** expressive typographic voice; clear title/metadata grammar; recurring acid accent; intentional distinction between editorial website and project imagery; rich case-specific color worlds. **Generic/unfinished:** four-step process copy, interchangeable “research · UX · UI · design system” role strings, and large unannotated galleries. **Legibility risks:** hairline/low-contrast metadata; dense black-on-black XY imagery; full-page BalVoi and early Ineed screenshots with text too small to inspect at normal width. **Motion:** count-up tiles and media add energy, but key facts should be readable before/without animation. Global reduced-motion CSS exists; actual behaviour for every animation was not verified.

**Concrete visual direction:** retain the editorial black/cream/purple identity, but introduce an “evidence plate” component: a bright, readable product crop on one side; a short labelled decision, constraint, alternative and result on the other. Use project color only inside media/callouts. For Ineed, show a two-column before/after service architecture; for BalVoi, a magnified source→analysis→edit strip; for XY, a single transaction flow with fee/risk callouts; for Duck, an old/new game mechanic storyboard. Replace page-sized screenshot mosaics with fewer, captioned frames that can be read without opening originals. On mobile, stack the artifact before commentary and keep captions adjacent.

### Usability and accessibility

**Observed positives:** semantic headings on most pages, link targets in the archive, native video controls in KENO, a mobile header/menu in the 390 px Duck Master sample, and implementation-wide focus-visible and reduced-motion rules. Desktop pages sampled at 1280 px had no document-level horizontal overflow; Duck Master at 390 px did not overflow.

**Observed friction:** the Work collection and XY gallery tab activation did not change state in repeated in-app-browser pointer/keyboard attempts; reproduce in a second browser before assigning root cause. Header text links measured around 17 px tall on desktop, a small target; mobile MENU text measured 17 px while the adjacent theme button was 44 px, so inspect actual tappable box around MENU. The persistent “Ask AI about this project” control overlaps the lower-right area of desktop case screenshots; it risks covering gallery details. Large screenshots open originals, but accessible names such as “visual 1” are technically labelled yet not informative.

**To test next:** full keyboard path (skip link, menu, collection tabs, gallery tabs, form, chat), visible focus on dark/light backgrounds, WCAG contrast measurements, menu dismissal/scroll lock, image loading/fallbacks, video autoplay/pause at intersection and reduced motion, form validation and delivery, 375/768/1440 px layouts. These are test requests, not currently claimed defects. No automated accessibility score is claimed.

## Portfolio composition and recommended order

For a **Senior Product Designer** shortlist, show three flagship cases first: **Ineed → BalVoi → XY Ecosystem** (or BalVoi first for AI/editorial roles), then **Duck Master** as a product/game-system breadth case. Place **Soloos** in a clearly marked “independent build” slot. Keep **Vivaro** and **Meridian HR** in concept/process collections. Compress or archive **AI Hive and Razer UI**. Keep KENO/Roo/Spearthrone in a separate, visually enticing specialist gallery so the product-design argument is not diluted.

The range is real—marketplace, AI/editorial, Web3, game systems, code—but the **depth is uneven**. The missing portfolio category is not another shiny domain; it is one deeply evidenced shipped case with baseline, measure, period, source, outcome and retrospective. Ineed or BalVoi could become that case if real records exist. Do not fabricate them. If no quantitative source survives, use defensible qualitative proof and clearly say what was not measured.

## Prioritized backlog

| Priority | Change | Impact | Effort | Dependency / proof needed |
|---|---|---|---|---|
| P0 | Reconcile 07/6/14 project counts and Duck Master role label | High trust | Low | Confirm intended taxonomy and titles |
| P0 | Reproduce and resolve collection/gallery activation; verify XYGO video | High usability | Medium | Second-browser interaction test, media asset/route check |
| P0 | Rebuild Ineed into paired before/after actor journeys with one readable architecture map | Very high hiring | Medium–high | Original/released source frames and decision context |
| P0 | Add real evidence ledger to Ineed/BalVoi/Duck: metric definition, period, source, caveat; no synthetic numbers | Very high hiring | Medium | Analytics/notes or explicit “not retained” statement |
| P1 | Put senior-relevant proof and selected work in first desktop/mobile screen | High hiring | Medium | Decide headline/positioning and proof examples |
| P1 | Redesign BalVoi/XY media into legible annotated sequences | High | Medium | Higher-resolution crops/source files |
| P1 | Reproduce full responsive, keyboard, contrast, form and media QA | High usability | Medium | Test devices/browsers; no new content required |
| P1 | Shorten or archive AI Hive/Razer and de-emphasize redundant slot concepts | Medium–high focus | Low | Editorial choice |
| P2 | Reconstruct Dispatch/NexWave only if original decision and validation material exists | Medium | High | Briefs, research, product stage, feedback |
| P2 | Add collaboration/retrospective to each flagship | High senior signal | Medium | Specific stakeholder/engineering episodes and what you would change |

### Practical roadmap

**Quick improvements (1–3 days):** correct counts/titles, fix or verify tab/video interactions, change homepage and CV case order, label case stages and evidence quality, reduce duplicated generic statements, check visible focus and core responsive pages.

**Deeper revisions (1–3 weeks):** rebuild Ineed and BalVoi around artifacts and decisions; create a reusable evidence-plate pattern; edit XY into a readable cross-product system case; obtain real metric definitions and source notes; do proper keyboard/mobile usability QA.

**Longer-term work (as evidence becomes available):** collect post-release product signals, run/record user-comprehension tests, document cross-functional decisions, and replace weak concept cases with one genuinely validated product story. If historic analytics are gone, a bounded retrospective with actual artifacts is better than plausible-looking numbers.

## Five actions most likely to improve senior hiring odds

1. Turn **Ineed** into a clear, evidence-backed two-sided pivot case with paired old/new journeys and honest adoption definitions.
2. Turn **BalVoi** into a legible human-in-the-loop AI decision case, including score limitations and any real comprehension feedback.
3. Bring **role, ownership and proof** above the homepage fold; align homepage, About and CV around the same three flagship cases.
4. Remove credibility leaks: conflicting counts/titles, broken or unverified tabs/video, and “metric” tiles that only count features or animation states.
5. Reduce the 14-case menu to a curated senior-product path, keeping concepts and game-art showcases clearly secondary.

**Approval boundary:** This document is an audit and proposal. No portfolio UI, copy, case data, deployment or source content was modified. Await approval before implementing changes.

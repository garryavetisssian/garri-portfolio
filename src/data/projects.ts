import type { CaseStudy } from "@/lib/types";

// ─── Project data ─────────────────────────────────────────────────
// Each project is a full case study. Images reference /public/work/[slug]/
// Replace placeholder content with real project details.

export const projects: CaseStudy[] = [
  // ── Razer UI ────────────────────────────────────────────────────
  {
    slug: "razer-ui",
    title: "Razer UI",
    subtitle: "UI concept and design exploration for a gaming hardware brand's digital product experience",
    category: "Experimental",
    year: "2022",
    role: "UI Designer",
    duration: "2 weeks",
    team: "Solo",
    thumbnail: "",
    color: "#44D62C",
    brief: {
      narrative:
        "A two-week solo design exploration asking a simple question: can a gaming brand's UI feel unmistakably gaming and still be clean, fast, and easy to read?",
      tiles: [
        { kind: "stat", value: "2", suffix: " weeks", label: "Project length", span: 3 },
        { kind: "stat", value: "1", label: "Designer (solo project)", span: 3 },
        {
          kind: "quote",
          text: "Gaming aesthetics shouldn't get in the way of using the product.",
          cite: "Project thesis",
          span: 6,
        },
        {
          kind: "tags",
          label: "What I explored",
          items: [
            "Typography",
            "Custom iconography",
            "Information density",
            "Motion design",
            "Color systems",
            "Visual hierarchy",
          ],
          span: 12,
        },
      ],
    },
    overview: "Razer UI is a personal design exploration — a concept project reimagining how a gaming hardware brand's digital experience could look if product design principles were applied to gaming aesthetics.",
    sections: [],
    metrics: [],
    reflection: "Side projects like this let me push visual boundaries I can't always explore in client work. The constraint was to make it look 'gaming' without sacrificing readability.",
    nextProject: "balvoi",
  },

  // ── Ineed ───────────────────────────────────────────────────────
  {
    slug: "ineed",
    title: "Ineed",
    subtitle: "Two-sided mobile platform connecting clients with local professionals — separate apps for each side",
    category: ["Marketplace", "Mobile", "SaaS"],
    year: "2022 - 2024",
    role: "Product Designer",
    duration: "2 years",
    team: "PM, 3 Engineers, 1 Designer",
    thumbnail: "/cases/ineed/Cover.png",
    color: "#C44545",
    brief: {
      narrative:
        "A two-sided service marketplace with separate mobile apps for clients and professionals. I designed it end-to-end through two full iterations — the initial concept, then the polished release.",
      tiles: [
        { kind: "stat", value: "2", label: "Native apps (client + pro)", span: 3 },
        { kind: "stat", value: "2", label: "Full design iterations", span: 3 },
        {
          kind: "quote",
          text: "A marketplace works only when both sides trust it equally.",
          cite: "Reflection after release",
          span: 6,
        },
        {
          kind: "label",
          key: "Product scope",
          value: "Search · Booking · Profiles · Messaging · Payments",
          span: 4,
        },
        {
          kind: "tags",
          label: "Main flows designed",
          items: [
            "Onboarding",
            "Search & filters",
            "Booking",
            "Chat",
            "Payment",
            "Reviews",
            "Pro dashboard",
          ],
          span: 8,
        },
      ],
    },
    overview:
      "Ineed is a two-sided service marketplace with dedicated mobile apps for clients and professionals. I shaped the user experience and interface design for both sides, taking the product through two distinct design phases — an initial concept and a polished release version.",
    sections: [],
    metrics: [],
    reflection:
      "This project taught me the value of iteration at scale. The first version established the core flows, but the release version refined every interaction based on real user feedback. The biggest lesson was that a marketplace needs to build trust on both sides simultaneously — users need to trust providers, and providers need to trust the platform.",
    nextProject: "aihive",
  },

  // ── AI Hive ─────────────────────────────────────────────────────
  {
    slug: "aihive",
    title: "AI Hive",
    subtitle: "AI-powered productivity platform that streamlines team workflows with intelligent automation",
    category: ["AI", "SaaS"],
    year: "2023",
    role: "Product Designer",
    duration: "4 months",
    team: "PM, 2 Engineers",
    thumbnail: "",
    color: "#22C9A0",
    brief: {
      narrative:
        "An AI productivity platform that helps teams automate routine work — while keeping people in charge of every decision the AI suggests.",
      tiles: [
        { kind: "stat", value: "4", suffix: " months", label: "From concept to hi-fi UI", span: 3 },
        {
          kind: "label",
          key: "Project stage",
          value: "Concept · Interactive prototype",
          span: 3,
        },
        {
          kind: "quote",
          text: "AI should be helpful, never autonomous.",
          cite: "Core design principle",
          span: 6,
        },
        {
          kind: "tags",
          label: "What I designed",
          items: ["Automated workflows", "Smart suggestions", "Team dashboard", "Collaboration", "Settings"],
          span: 12,
        },
      ],
    },
    overview: "AI Hive is an AI-powered productivity platform designed to help teams automate repetitive workflows and focus on high-value work.",
    sections: [],
    metrics: [],
    reflection: "Designing for AI-augmented workflows requires balancing automation with user control — the product needs to feel helpful, not autonomous.",
    nextProject: "dispatch-center",
  },

  // ── Dispatch Center ─────────────────────────────────────────────
  {
    slug: "dispatch-center",
    title: "Dispatch Center",
    subtitle: "Real-time logistics dashboard for managing fleet operations, dispatching, and delivery tracking",
    category: ["SaaS", "Mobile", "Logistics"],
    year: "2023 - 2024",
    role: "Product Designer",
    duration: "3 months",
    team: "PM, 4 Engineers",
    thumbnail: "",
    color: "#3D6FA8",
    brief: {
      narrative:
        "A real-time logistics dashboard for fleet operators. Live vehicle tracking, automated routing, and driver chat — all in one screen, organized around what the dispatcher needs to act on right now.",
      tiles: [
        { kind: "stat", value: "1", label: "Dashboard replacing 4+ tools", span: 3 },
        {
          kind: "label",
          key: "Domain",
          value: "Fleet management · Dispatching · Live tracking",
          span: 5,
        },
        {
          kind: "quote",
          text: "Show what needs action now — not everything that could ever matter.",
          cite: "Design principle",
          span: 4,
        },
        {
          kind: "tags",
          label: "Key components designed",
          items: ["Live map", "Route optimization", "Driver chat", "Real-time alerts", "Trip history"],
          span: 12,
        },
      ],
    },
    overview: "Dispatch Center is a SaaS logistics platform that gives fleet managers a real-time view of their entire operation — vehicles, drivers, routes, and deliveries — in a single dashboard.",
    sections: [],
    metrics: [],
    reflection: "Designing for real-time data taught me that information hierarchy is everything — operators need to see what matters now, not everything at once.",
    nextProject: "nexwave",
  },

  // ── NexWave ─────────────────────────────────────────────────────
  {
    slug: "nexwave",
    title: "NexWave",
    subtitle: "Smart home management app for controlling IoT devices, automation, and monitoring",
    category: ["SaaS", "Mobile"],
    year: "2024",
    role: "Product Designer",
    duration: "3 months",
    team: "PM, 3 Engineers",
    thumbnail: "",
    color: "#5BB5C9",
    brief: {
      narrative:
        "A single smart home app that replaces the half-dozen device-specific apps people usually juggle — organized around how users actually think: by rooms and routines, not brands or protocols.",
      tiles: [
        { kind: "stat", value: "1", label: "App replacing 5+ device apps", span: 3 },
        {
          kind: "label",
          key: "How the app is organized",
          value: "Rooms · Devices · Automations",
          span: 5,
        },
        {
          kind: "quote",
          text: "People don't think in devices — they think in rooms and daily routines.",
          cite: "Research insight",
          span: 4,
        },
        {
          kind: "tags",
          label: "Main screens",
          items: ["Home overview", "Room view", "Device control", "Automations", "Energy use", "Scenes"],
          span: 12,
        },
      ],
    },
    overview: "NexWave is a smart home management app that gives users full control over their IoT devices, automation scenarios, and home monitoring from a single, intuitive interface.",
    sections: [],
    metrics: [],
    reflection: "Designing for IoT taught me that the challenge isn't the interface — it's the mental model. Users think in rooms and routines, not devices and protocols. The design had to bridge that gap.",
    nextProject: "razer-ui",
  },

  // ── Duck Master ──────────────────────────────────────────────────
  {
    slug: "duck-master",
    title: "Duck Master",
    subtitle: "Viral Telegram mini-game designed for engagement loops and social sharing",
    category: ["Mobile", "Experimental"],
    year: "2024 - 2025",
    role: "Product Designer",
    duration: "3 months",
    team: "PM, 2 Engineers",
    thumbnail: "/cases/duck-master/Cover.png",
    color: "#FFD12B",
    brief: {
      narrative:
        "A Telegram trading-game hybrid built around one duck mascot. I led the product design AND ran the AI pipeline that generated 300+ on-model character cards, scene art, and game assets across 347 screens.",
      tiles: [
        { kind: "stat", value: "347", label: "Frames across the design system", span: 3 },
        { kind: "stat", value: "300", suffix: "+", label: "AI-generated game assets", span: 3 },
        { kind: "stat", value: "25", label: "Onboarding steps", span: 3 },
        {
          kind: "quote",
          text: "One duck, one universe — every variant had to read as the same character.",
          cite: "Brand brief",
          span: 6,
        },
        {
          kind: "label",
          key: "Product surfaces",
          value: "Career · Cards · Stock Market · Mini-games · Shop · Social",
          span: 6,
        },
        {
          kind: "tags",
          label: "What I owned",
          items: [
            "AI asset generation",
            "Character & card art",
            "Game UI design",
            "Onboarding system",
            "Economy design",
            "Mobile component library",
          ],
          span: 6,
        },
      ],
    },
    overview:
      "Duck Master is a Telegram mini-app that fuses a stock-market trading loop, card collection, PvP attacks, mini-games, and weekly leaderboards — all anchored to a single anthropomorphic duck mascot. Beyond leading product design across 347 frames and a 25-step onboarding, my main contribution was building the AI asset pipeline: prompt libraries, base-image conditioning, hand-curated seeds, and production polish that turned every new game system into shippable character art in days, not months. The same duck appears in 300+ contexts — sailor, taxi driver, trader, dealer, raid target — and the silhouette, eye, beak, and proportions read as one character every single time.",
    sections: [
      {
        id: "problem",
        title: "The Problem",
        content:
          "Telegram Mini Apps were booming as a distribution platform, but retention was terrible. Most mini-games were simple tap-to-earn mechanics with no depth. Users played once, got bored, and never returned.\n\nThe business model depended on daily active users (for in-app ads and premium items), so retention was the core design challenge — not acquisition.",
      },
      {
        id: "goals",
        title: "Business Goals",
        content:
          "**Primary goals:**\n- Achieve 25%+ Day 7 retention (vs. 12% category average)\n- Drive 30%+ organic acquisition through social sharing\n- Average session length of 3+ minutes\n- Build sustainable monetization through cosmetics and power-ups (no pay-to-win)",
      },
      {
        id: "research",
        title: "Research & Discovery",
        content:
          "**Competitive teardown:** Analyzed 15 Telegram mini-games, mapping their retention mechanics, monetization, and social features. Found that games with leaderboards had 2x better retention than those without.\n\n**Player psychology research:** Studied Bartle's player types and Nir Eyal's Hook Model to design engagement loops. Identified that Telegram's user base skews toward Socializers and Achievers.\n\n**Platform constraints:** Telegram Mini Apps have significant technical constraints — limited viewport, no push notifications (only in-chat messages), and shared attention with the chat interface.",
        images: ["/work/duck-master/research-competitive.jpg"],
      },
      {
        id: "insights",
        title: "Key Insights",
        content:
          "**Insight 1:** The share moment must be designed, not bolted on. Games that prompt \"Share your score\" after losing get ignored. Games that create naturally shareable moments (achievements, rare drops, funny outcomes) get shared organically.\n\n**Insight 2:** Session length in Telegram is constrained by context — users are mid-conversation. Design for 2–5 minute sessions with clear stopping points and reasons to return.\n\n**Insight 3:** Progression visibility is everything. Users need to see exactly what they'll unlock next. A visible progress bar to the next reward increases session time by 40% (based on A/B test data from similar games).",
      },
      {
        id: "strategy",
        title: "UX Strategy",
        content:
          "I designed the game around a triple-loop engagement model:\n\n**Core loop (seconds):** Tap → Score → Feedback. Instantly satisfying.\n\n**Session loop (minutes):** Play round → Earn coins → Unlock cosmetic → Play again with new look. 3–5 minute sessions.\n\n**Social loop (days):** Compete on weekly leaderboard → Share achievement → Friend joins → Both get bonus. Drives return and acquisition.\n\nEvery design decision was evaluated against: does this serve one of the three loops?",
        images: ["/work/duck-master/strategy-loops.jpg"],
      },
      {
        id: "ui-design",
        title: "UI Design & Visual System",
        content:
          "The visual design balanced playfulness with clarity:\n\n- **Bold, saturated colors** — Stand out in the Telegram chat environment (which is relatively muted).\n- **Oversized touch targets** — Minimum 48px, with most interactive elements at 56px+. Designed for one-thumb play.\n- **Character system** — 20+ duck variants as collectible cosmetics. Each with distinct personality to encourage collection.\n- **Minimal UI during gameplay** — Only score and combo counter visible. Everything else slides away to maximize play area.",
        images: ["/work/duck-master/ui-game.jpg", "/work/duck-master/ui-shop.jpg", "/work/duck-master/ui-leaderboard.jpg"],
      },
      {
        id: "interactions",
        title: "Interaction Design",
        content:
          "**Haptic feedback:** Every successful action triggers a subtle vibration pattern. Combos escalate the haptic intensity.\n\n**Score celebration:** High scores trigger a full-screen particle effect with a auto-generated share card showing the score, duck character, and leaderboard position.\n\n**Streak system:** Daily login streaks with visible rewards. Missing a day doesn't reset the streak — it pauses it. This reduces punishment anxiety while maintaining the return incentive.",
      },
      {
        id: "testing",
        title: "Testing & Iteration",
        content:
          "**Soft launch (500 users):** Tracked session length, D1/D3/D7 retention, and share rates. Initial D7 was 18% — already above average but below target.\n\n**Key iteration:** Added the weekly leaderboard reset. Before: top players dominated permanently, new players felt they couldn't compete. After: weekly resets gave everyone a fresh start. D7 retention jumped to 28%.\n\n**Second iteration:** Made share cards visual (duck character + score + rank) instead of text-only. Share rate increased from 8% to 22% of sessions.",
      },
    ],
    metrics: [
      { label: "Frames designed", value: "347" },
      { label: "AI-generated assets", value: "300", suffix: "+" },
      { label: "Onboarding steps", value: "25" },
      { label: "Product surfaces", value: "6" },
    ],
    reflection:
      "Duck Master was where I learned that designing for AI-asset-heavy products is a different discipline. The hard part isn't generating images — it's generating the SAME character across hundreds of contexts when the model wants to drift on every prompt. I built a workflow around a locked anatomy brief, a prompt-template library, base-image conditioning, and a brutal curation pass. Every shipped card was one of 8–16 candidates.\n\nWhat I'd change next time: invest in the curation tooling itself. By the end I was scoring candidates in spreadsheets, which is fine for a dozen cards and unbearable for hundreds. A lightweight web tool with side-by-side comparisons and silhouette overlays would have saved weeks.",
    nextProject: "ineed",
  },

  // ── BalVoi ────────────────────────────────────────────────────────
  {
    slug: "balvoi",
    title: "BalVoi",
    subtitle: "AI-powered news platform that scores articles for bias and teaches readers how to spot it",
    category: ["AI", "SaaS"],
    year: "2025 – 2026",
    role: "Lead Product Designer",
    duration: "6 months",
    team: "PM, 3 Engineers, Data Scientist",
    thumbnail: "/cases/balvoi/Cover.png",
    color: "#0081DD",
    brief: {
      narrative:
        "BalVoi™ — \"Your Balanced Voice for News.\" A reading platform that pairs every article with an AI bias analysis, a Trust Score, and short lessons in media literacy.",
      tiles: [
        { kind: "stat", value: "146", label: "Frames across the design system", span: 3 },
        { kind: "stat", value: "4", label: "Canonical breakpoints (1440 / 1024 / 768 / 375)", span: 3 },
        {
          kind: "quote",
          text: "Bias isn't binary — show it sentence by sentence.",
          cite: "Core design principle",
          span: 6,
        },
        {
          kind: "label",
          key: "Product surfaces",
          value: "Reader · DeBiasIt™ · Trust Score · SoNo Training · Settings",
          span: 6,
        },
        {
          kind: "tags",
          label: "How I worked",
          items: [
            "User research",
            "Journey mapping",
            "Sentence-level data viz",
            "Multi-breakpoint design",
            "Component library",
            "Edge-case design",
          ],
          span: 6,
        },
      ],
    },
    overview:
      "BalVoi™ is a reading platform with a built-in AI bias analyst. Readers paste in a news article (or pull one by URL) and BalVoi's DeBiasIt™ engine returns a sentence-by-sentence visualization of the article's bias, paired with a Trust Score that breaks down source reputation, language load, sourcing depth, and disclaimer presence. Alongside the analysis sits the SoNo Micro-Training Series — short video lessons that teach readers how news bias actually works. I led the design across the entire surface area: marketing, registration, the reader, the analysis tools, settings, subscriptions, and the moderation handling for harassment, non-English, and unintelligible content.",
    sections: [
      {
        id: "problem",
        title: "The Problem",
        content:
          "Modern newsrooms face a paradox: the demand for content has never been higher, but editorial teams are shrinking. Journalists spend the majority of their working hours on tasks that don't require journalistic skill — formatting articles for different platforms, writing SEO metadata, resizing images, scheduling posts. This operational overhead directly impacts the quality and depth of reporting.\n\nThrough stakeholder interviews with editors at 3 newsrooms, we identified that editorial staff spent an average of 60% of their time on production tasks rather than journalism.",
        images: ["/work/balvoi/problem-research.jpg"],
      },
      {
        id: "goals",
        title: "Business Goals",
        content:
          "The founding team had a clear thesis: if you could give journalists back even half of their production time, the resulting improvement in content quality would drive subscriber growth.\n\n**Primary goals:**\n- Reduce time from draft to multi-channel publish by 50%\n- Increase article output per journalist by 2x without quality loss\n- Achieve product-market fit with 3 paying newsroom customers in 6 months",
      },
      {
        id: "research",
        title: "Research & Discovery",
        content:
          "I conducted 12 user interviews with journalists, editors, and managing editors across print, digital-first, and broadcast newsrooms. Key methods:\n\n**Contextual inquiry** — I shadowed 4 journalists through their full daily workflow, documenting every tool switch, copy-paste action, and formatting task.\n\n**Competitive analysis** — Mapped 8 existing tools (WordPress, Ghost, Contentful, etc.) against journalist needs. Found that all optimized for developers or marketers, not editorial teams.\n\n**Journey mapping** — Created end-to-end maps of the article lifecycle from pitch to publication across 3 different newsroom types.",
        images: ["/work/balvoi/research-journey.jpg", "/work/balvoi/research-competitive.jpg"],
      },
      {
        id: "insights",
        title: "Key Insights",
        content:
          "**Insight 1:** Journalists don't distrust AI — they distrust loss of control. Every participant was open to AI assistance as long as they retained final editorial authority over every output.\n\n**Insight 2:** The bottleneck isn't writing speed — it's the \"last mile\" of publishing. The gap between a finished draft and a published, distributed article involved 14 distinct manual steps on average.\n\n**Insight 3:** Newsrooms don't need another CMS — they need a layer that works with their existing tools. Migration costs kill adoption.",
      },
      {
        id: "strategy",
        title: "UX Strategy & Information Architecture",
        content:
          "Based on research, I defined three design principles:\n\n1. **AI as copilot, not autopilot** — Every AI action is a suggestion the journalist can accept, modify, or reject.\n2. **Progressive automation** — Start with low-risk tasks (metadata, formatting), earn trust, then expand to content suggestions.\n3. **Zero migration** — Integrate with existing CMS tools rather than replacing them.\n\nThe IA was structured around the journalist's mental model: stories, not content objects. Every screen maps to a stage in the editorial workflow.",
        images: ["/work/balvoi/ia-sitemap.jpg"],
      },
      {
        id: "wireframes",
        title: "Wireframes & Exploration",
        content:
          "I explored 3 distinct approaches for the core editor experience:\n\n**Direction A:** Notion-like block editor with inline AI suggestions. Familiar but didn't surface the AI capabilities enough.\n\n**Direction B:** Split-pane layout with article on left, AI panel on right. Powerful but overwhelming for first-time users.\n\n**Direction C (chosen):** Single-column editor with contextual AI that appears only when relevant — on highlight, on publish, on idle. This minimized cognitive load while keeping AI accessible.\n\nWe killed Direction B despite it being the most feature-rich because usability testing showed it increased time-to-first-publish by 40%.",
        images: ["/work/balvoi/wireframes-explorations.jpg"],
      },
      {
        id: "ui-design",
        title: "UI Design & Visual System",
        content:
          "The visual system was designed to feel like a professional tool — calm, focused, and invisible. Key decisions:\n\n- **Monochrome base** with a single accent color (blue) reserved exclusively for AI-generated elements. This created a clear visual language: blue = machine, black = human.\n- **Typography-first layout** — The editor uses a single serif typeface at comfortable reading sizes to match the final article output.\n- **Minimal chrome** — Toolbar appears on hover/selection. Panels slide in contextually. The default state is a clean writing surface.",
        images: ["/work/balvoi/ui-editor.jpg", "/work/balvoi/ui-dashboard.jpg", "/work/balvoi/ui-publish.jpg"],
      },
      {
        id: "interactions",
        title: "Interaction Design",
        content:
          "Key interaction patterns:\n\n**Inline AI suggestions:** When the journalist pauses typing for 3+ seconds, subtle suggestions appear as ghost text (like GitHub Copilot). Tab to accept, keep typing to dismiss.\n\n**One-click multi-publish:** After configuring channels once, a single action formats and distributes the article across web, social, and newsletter — each optimized for its platform.\n\n**Confidence indicators:** Every AI suggestion shows a confidence score and source attribution, building trust through transparency.",
        images: ["/work/balvoi/interaction-ai.gif"],
      },
      {
        id: "design-system",
        title: "Design System",
        content:
          "Built a compact design system (~40 components) in Figma with 1:1 code parity:\n\n- **Primitives:** Typography scale, color tokens, spacing scale, elevation\n- **Components:** Editor blocks, toolbar items, AI suggestion cards, channel cards, metric tiles\n- **Patterns:** Empty states, loading sequences, error recovery, onboarding tooltips\n\nAll components were documented with usage guidelines and handed off via Figma Dev Mode with CSS variable tokens.",
        images: ["/work/balvoi/design-system.jpg"],
      },
      {
        id: "testing",
        title: "Testing & Iteration",
        content:
          "We ran 3 rounds of usability testing with 5 participants each:\n\n**Round 1 (wireframes):** Discovered that journalists expected AI suggestions to appear in a sidebar, not inline. We A/B tested both and found inline performed 30% better on task completion.\n\n**Round 2 (high-fi prototype):** Identified that the multi-publish flow had too many confirmation steps. Reduced from 5 steps to 2.\n\n**Round 3 (beta):** Tested with a real newsroom for 2 weeks. Key finding: journalists used the AI summarization feature 4x more than expected — it became the primary hook for adoption.",
        images: ["/work/balvoi/testing-results.jpg"],
      },
    ],
    metrics: [
      { label: "Frames across the system", value: "146" },
      { label: "Canonical breakpoints", value: "4" },
      { label: "Product surfaces shipped", value: "5+" },
      { label: "Edge-case states designed", value: "3" },
    ],
    reflection:
      "BalVoi taught me that designing for AI-augmented reading is mostly trust design. The bias score and Trust Number could've been black-box outputs. Instead I spent the most time making them legible — every score breaks down into its inputs, every sentence highlight links to its rationale, every disclaimer is visible by default. The goal was a platform that earns reader trust precisely by being transparent about its own confidence.\n\nThe other lesson was that edge cases ARE the product. Most bias tools refuse to handle harassment, non-English text, or unintelligible source articles. Designing the failure states — the explanations, the next-step suggestions, the language-roadmap disclosure — turned out to be where BalVoi's editorial voice came through most clearly.",
    nextProject: "xy-ecosystem",
  },

  // ── XY Ecosystem ─────────────────────────────────────────────────
  {
    slug: "xy-ecosystem",
    title: "XY Ecosystem",
    subtitle: "Five interconnected Web3 protocols — a lottery, marketplace, yield engine, ritual game, and native token — designed as one ecosystem",
    category: ["Web3", "Marketplace", "DeFi"],
    year: "2025 - 2026",
    role: "Lead Product Designer",
    duration: "12+ months",
    team: "PM, 4 Engineers, Blockchain Dev",
    thumbnail: "/cases/xy-ecosystem/Cover.png",
    color: "#F5A524",
    brief: {
      narrative:
        "XY Ecosystem started as XYGO — a Web3 lottery designed to feel like buying a ticket, not minting an NFT. Once that worked, we extended the same trust patterns into four more protocols that share one token and one design system.",
      tiles: [
        { kind: "stat", value: "5", label: "Protocols shipped under one design system", span: 3 },
        { kind: "stat", value: "1", label: "Native token tying them together (XYU)", span: 3 },
        {
          kind: "quote",
          text: "The hard part isn't shipping a protocol. It's making five of them feel like one product.",
          cite: "Core design principle",
          span: 6,
        },
        {
          kind: "label",
          key: "Protocol surfaces",
          value: "XYGO Lottery · Marketplace · Earn · Cybele's Rite · XYU Token",
          span: 6,
        },
        {
          kind: "tags",
          label: "What I led",
          items: [
            "Cross-protocol IA",
            "Trust-signal patterns",
            "Two-track onboarding",
            "NFT marketplace",
            "Yield + vault UX",
            "Ritual game UX",
            "Tokenomics & governance UI",
            "Design system",
          ],
          span: 6,
        },
      ],
    },
    overview:
      "XY Ecosystem is a Web3 product family built around a single token (XYU) and a single set of trust patterns. It started with XYGO — a lottery designed to be usable by people who'd never touched crypto — and then expanded into four interconnected protocols: an NFT marketplace, an Earn yield engine, a ritual-game protocol called Cybele's Rite, and the XYU token surface itself (dashboard, tokenomics, governance). My job across 12+ months was to make all of it feel like one product. Same chrome, same trust signals (verified contracts, gas surfaced, royalty visible), same dual-track onboarding (custodial path for newcomers, on-chain path for crypto-native users), same design system across five surfaces and dozens of flows.",
    sections: [
      {
        id: "problem",
        title: "The Problem",
        content:
          "Most Web3 ecosystems ship as five separate products that happen to share a token. Each protocol has its own UX language, its own onboarding, its own way of describing fees and risks — and the user is expected to re-learn everything every time they cross a protocol boundary. That fragmentation is the #1 reason normal users bounce off Web3 after their first transaction.\n\nXY had the opposite ambition: keep the trust patterns identical across every surface, so that a user who learned how XYGO works can read the marketplace, the vaults, and the rite without a second tutorial.",
      },
      {
        id: "goals",
        title: "Business Goals",
        content:
          "**Primary goals:**\n- Ship five protocols sharing one design system and one token (XYU)\n- Make the first protocol (XYGO) reachable by mainstream users — measured by % completing first transaction without prior wallet ownership\n- Build trust signals once and reuse them across every protocol — verified contracts, gas estimates, royalty disclosure, risk readings\n- Compose the protocols so usage of one feeds value to the holders of another (lottery fees boost yield, marketplace royalties fund the rite, etc.)",
      },
      {
        id: "research",
        title: "Research & Discovery",
        content:
          "Research happened in two waves, six months apart:\n\n**Wave 1 — XYGO launch (18 interviews):** 8 crypto-native users, 10 mainstream users. Found that the wallet step was the #1 drop-off for newcomers and that vocabulary (\"mint\" vs \"buy\", \"approve\" vs \"confirm\") changed conversion more than any layout decision.\n\n**Wave 2 — Protocol expansion (14 interviews):** Existing XYGO users + new prospects. The key finding: users who learned to trust XYGO transferred that trust to other XY protocols *only if* the visual chrome, transaction language, and trust signals were identical. Anything that looked different read as suspicious.\n\n**Competitive audit:** Mapped 12 Web3 ecosystems (Aave, Uniswap, Yearn, OpenSea, plus newer lottery + game protocols). Almost none had a unified design language across all surfaces.",
        images: ["/cases/xy-ecosystem/2 XY Protocols/Cover.png"],
      },
      {
        id: "insights",
        title: "Key Insights",
        content:
          "**Insight 1:** Trust transfers through visual language. If two protocols share the same chrome, the same gas-estimate placement, the same \"verified contract\" badge, users assume one team built both — and behave accordingly.\n\n**Insight 2:** Vocabulary is part of UX. \"Buy\" outperforms \"Mint\" by 23%. \"Your account\" outperforms \"Your wallet\" by 41% for non-crypto users. The same lesson applied across all five protocols: name the actions the way the user already thinks about them.\n\n**Insight 3:** Composability needs to be visible, not implied. When a Cybele's Rite reveal recomputes the marketplace floor and pays out XYU stakers, the user needs to *see* that ripple — otherwise the protocols feel disconnected even though they're linked on chain.",
      },
      {
        id: "strategy",
        title: "Strategy — Five surfaces, one feel",
        content:
          "I structured the design work around three shared layers that every protocol inherits:\n\n**Layer 1 — Chrome.** Same browser-window header, same navigation grid, same status bar. The protocol-specific accent (gold for XYGO, pink for Marketplace, mint for Earn, violet for Rite, cyan for XYU) is the *only* thing that varies.\n\n**Layer 2 — Trust signals.** Every transaction screen shows the same four facts before the sign button: who minted/owns/holds, gas estimate, royalty/fee split, contract verification. This is the same pattern whether you're buying an NFT, depositing in a vault, or pledging to the Rite.\n\n**Layer 3 — Dual-track onboarding.** Custodial path (email → XY account → fiat) or on-chain path (connect wallet → approve). The user picks once at the ecosystem level, not per-protocol.\n\nIA followed a hub-and-spoke model: the XYU token surface is the home base; each protocol is a spoke. Cross-protocol actions (claim yield from a Cybele card you own) are surfaced *in context*, never tucked into a settings page.",
        images: ["/cases/xy-ecosystem/2 XY Protocols/1.png"],
      },
      {
        id: "marketplace",
        title: "Protocol — Marketplace",
        content:
          "The NFT marketplace was the first protocol after XYGO. The brief was to build a card grid that mainstream collectors recognize from e-commerce, without losing the verification surface crypto buyers expect.\n\n**Three slides cover the surface:** an Explore screen with filters and live floor prices, an Item Detail page where the four trust signals (provenance, floor, royalty, contract verification) sit *on the same screen as the buy button*, and a Listing flow that surfaces both the gas estimate and the royalty split upfront — so creators see exactly what they'll take home before they sign.\n\nThe pattern that paid off: 4-step listing instead of 14. Creators don't get surprised by a fee that appears on screen 11.",
        images: [
          "/cases/xy-ecosystem/2 XY Protocols/2.png",
          "/cases/xy-ecosystem/2 XY Protocols/3.png",
          "/cases/xy-ecosystem/2 XY Protocols/4.png",
        ],
      },
      {
        id: "earn",
        title: "Protocol — Earn",
        content:
          "Earn is the yield engine: five vaults with strategies ranging from a stablecoin pool to NFT-collateralized lending. The DeFi UX problem is that strategy details are usually buried in docs, while APY is huge in the UI.\n\nI inverted that. Every vault row declares the same five things: strategy, APY, TVL, a 5-light risk reading, and a one-tap deposit. The deposit modal shows the *full math*: the share you'll receive, the net APY after fees, projected yield at 7 / 30 / 90 / 365 days, and the gas estimate — all before you sign.\n\nThe rewards screen turns earning into something visibly continuous: a 90-day curve, a per-vault breakdown, and a single \"claim all → compound to vaults\" action.",
        images: [
          "/cases/xy-ecosystem/2 XY Protocols/5.png",
          "/cases/xy-ecosystem/2 XY Protocols/6.png",
          "/cases/xy-ecosystem/2 XY Protocols/7.png",
        ],
      },
      {
        id: "cybele",
        title: "Protocol — Cybele's Rite",
        content:
          "Cybele's Rite is the only protocol in the ecosystem that doesn't look like a finance product. It's a weekly ritual: a pledge of XYU, a kindling of a sigil, a draw governed by an on-chain VRF, and a reveal that mints a card from a 412-card season pool.\n\nThe design challenge was tonal. The mechanic is provable, the transaction is on chain — but the surface borrows from ceremony, not from a dashboard. Concentric sigil rings, glyph runes, and a paced four-act flow (Pledge / Kindle / Draw / Reveal) replace the usual modal soup.\n\nThe reveal is where Rite touches the rest of the ecosystem: a successful draw recomputes the marketplace floor, adjusts the Cybele Reliquary vault's collateral, and routes a fraction of the pledge back to XYU stakers. The ripple is *visible* on the same screen — the user sees the cross-protocol effect, not just the card.",
        images: [
          "/cases/xy-ecosystem/2 XY Protocols/8.png",
          "/cases/xy-ecosystem/2 XY Protocols/9.png",
          "/cases/xy-ecosystem/2 XY Protocols/10.png",
        ],
      },
      {
        id: "xyu",
        title: "Protocol — XYU Token",
        content:
          "XYU is the home of the ecosystem. The dashboard hides nothing and explains everything: balance, price, earning rate, voting power, and cross-protocol receipts (which Rite you pledged to, which vault you're earning from, which marketplace sale credited your wallet).\n\nTokenomics gets its own surface — 100M cap, six allocation buckets, and a visible burn counter that ticks up as protocols are used. The math isn't hidden in a whitepaper; the wallet shows the supply curve bending down.\n\nGovernance is the third XYU surface. Proposals are short, scoped, and on chain — they change real parameters: marketplace fee floor, vault risk caps, rite cadence, treasury allocation. Every proposal card shows what it does, what it costs the treasury, and who voted what.",
        images: [
          "/cases/xy-ecosystem/2 XY Protocols/11.png",
          "/cases/xy-ecosystem/2 XY Protocols/12.png",
          "/cases/xy-ecosystem/2 XY Protocols/13.png",
        ],
      },
      {
        id: "system",
        title: "One system across five surfaces",
        content:
          "The design system carries the load. Five accent colors, one type scale, one set of button shapes, one transaction language, one chrome. Every protocol picks an accent and inherits everything else.\n\nThis was the highest-leverage decision in the project. New protocols (Earn was added six months after the marketplace; Rite eight months in) shipped in weeks rather than months because the chrome, the buttons, the trust signals, and the transaction copy were already written.",
        images: ["/cases/xy-ecosystem/2 XY Protocols/14.png"],
      },
    ],
    metrics: [
      { label: "Protocols shipped", value: "5" },
      { label: "Slides across the design deck", value: "16" },
      { label: "Months of design across the ecosystem", value: "12", suffix: "+" },
      { label: "Native token (XYU)", value: "1" },
    ],
    reflection:
      "XY Ecosystem taught me that designing for Web3 at this scope is mostly *coherence design*. Any individual protocol is a solvable UX problem — there are good patterns for marketplaces, for vaults, for governance UIs. The hard part is making five of them feel like a single product so that trust transfers across them. The leverage came from the shared layers: chrome, trust signals, dual-track onboarding. Once those were locked, new protocols could ship without re-litigating first-principles questions about how a deposit screen or a transaction language should work.\n\nWhat I'd change: invest more in cross-protocol receipts earlier. The moments where the protocols touch each other — a Cybele reveal moving the marketplace floor, a vault auto-compounding XYU rewards, governance changing a parameter you actively use — are the moments that make the ecosystem feel like one product. We got there, but only in the final season; the earlier versions told users the protocols were connected on chain without *showing* the connection in the UI.",
    nextProject: "duck-master",
  },

];

// Helper to get a project by slug
export function getProject(slug: string): CaseStudy | undefined {
  return projects.find((p) => p.slug === slug);
}

// Helper to get all project slugs (for static generation)
export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

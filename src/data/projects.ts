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
        "A two-week solo exploration: can gaming UI feel unmistakably gaming and still stay clean, fast, and readable?",
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
        "A two-sided service marketplace with separate mobile apps for clients and professionals — designed end-to-end across two iterations.",
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
        "An AI productivity platform that automates routine work while keeping people in charge of every decision.",
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
        "A real-time logistics dashboard — live tracking, routing, and driver chat in one screen, organized around what dispatchers need now.",
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
        "A single smart home app that replaces the device-specific apps people juggle — organized by rooms and routines, not brands.",
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
        "A Telegram trading-game hybrid built around one duck mascot — 347 screens, 300+ AI-generated assets, one on-model character.",
      tiles: [
        { kind: "stat", value: "347", label: "Frames across the design system", span: 4 },
        { kind: "stat", value: "300", suffix: "+", label: "AI-generated game assets", span: 4 },
        { kind: "stat", value: "25", label: "Onboarding steps", span: 4 },
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
          span: 12,
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
        "A reading platform that pairs every article with AI bias analysis, a Trust Score, and short lessons in media literacy.",
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
    thumbnail: "/cases/xy-ecosystem/Cover.webp",
    color: "#F5A524",
    brief: {
      narrative:
        "Four Web3 protocols connected by one token (XYU) and one design system — designed end-to-end across web and mobile.",
      tiles: [
        { kind: "stat", value: "4", label: "Protocols, one system", span: 3 },
        { kind: "stat", value: "1", label: "Native token · BSC", span: 3 },
        {
          kind: "quote",
          text: "Every payout is real capital.",
          cite: "XYU manifesto",
          span: 6,
        },
        {
          kind: "label",
          key: "Surfaces",
          value: "XY.Market · Earn · Cybele's Rite · XYU Token",
          span: 6,
        },
        {
          kind: "tags",
          label: "What I led",
          items: [
            "NFT marketplace",
            "P.NFT & LP.NFT mint",
            "Cybele's Rite ritual",
            "XYU token engine",
            "Design system",
          ],
          span: 6,
        },
      ],
    },
    overview:
      "XY Ecosystem is a Web3 product family on BSC built around a single token (XYU) and a shared design system. XY.Market is the marketplace surface — it trades Grid NFTs (fractional ownership of a coordinate grid where holders earn from tickets and jackpots inside their zone) and Parking NFTs (LP.NFT and P.NFT positions minted by the Earn protocol). Earn lets holders stake XYU directly (P.NFT, 100% to the holder) or provide liquidity (LP.NFT, 60/40 share split with an instant protocol boost) — locked into time tiers from 1 to 24 months. Cybele's Rite is the protocol that turns XYU spending into permanent ecosystem Weight via a public leaderboard. XYU itself is a scrollytelling page that doubles as a product tour and a whitepaper — distribution donut, supply burns, lock-duration tiers, epoch unlocks, all visible.",
    sections: [
      {
        id: "problem",
        title: "The Problem",
        content:
          "Most Web3 product families ship as separate apps that happen to share a token. Each protocol has its own UX language, its own onboarding, its own way of naming fees and locks. The user re-learns the surface every time they cross a protocol boundary, and trust doesn't transfer.\n\nXY had the opposite ambition: ship four protocols that share one chrome, one modal pattern, one item-page structure, and one trust language — so that a user who learns how XY.Market works can read Earn, Cybele's Rite, and XYU without a second tutorial.",
      },
      {
        id: "goals",
        title: "Business Goals",
        content:
          "**Primary goals:**\n- Ship four production protocols (Marketplace, Earn, Cybele's Rite, XYU Token) sharing one design system and one token\n- Make the marketplace usable by mainstream collectors — Grid NFTs read as 'shop items', not crypto primitives\n- Build trust signals once and reuse them across every protocol — verified contracts, KYC + terms verification, royalty disclosure, lifetime rewards visible\n- Compose the protocols so usage of one feeds value to holders of another (ticket buys → Grid NFT holders, XYU sacrifices → Cybele leaderboard, XYU locks → tradeable LP/P.NFT)",
      },
      {
        id: "marketplace",
        title: "XY.Market — Coordinate NFTs as a shop",
        content:
          "The marketplace is the entry point. Grid NFTs are sold by Layer (L1 = 25% of grid, L2 = 504 NFTs, L3 = 0.25% per NFT) — each one is a zone with X,Y coordinates that earns a percentage of every ticket bought inside it plus a bonus when a jackpot hits there. Parking NFTs trade the LP.NFT and P.NFT positions minted by the Earn protocol — each shows assets locked, value locked, weight, lifetime rewards, and a place-bid action.\n\nEvery item page has the same five tabs (Current Bids, Activity, Statistics, Listings, Description) and the same trust signals: certificate of digital asset ownership, contract address, token standard, last sale date, jackpot history. Big-ticket Genesis NFTs go through a full Terms of Purchase read + email-code verification flow before purchase — KYC isn't an afterthought, it's a first-class screen.",
        images: [
          "/cases/xy-ecosystem/2 XY Protocols/2.webp",
          "/cases/xy-ecosystem/2 XY Protocols/3.webp",
          "/cases/xy-ecosystem/2 XY Protocols/4.webp",
          "/cases/xy-ecosystem/2 XY Protocols/5.webp",
          "/cases/xy-ecosystem/2 XY Protocols/6.webp",
          "/cases/xy-ecosystem/2 XY Protocols/7.webp",
        ],
      },
      {
        id: "earn",
        title: "Earn — Mint a tradeable position",
        content:
          "Earn turns a stake into a portable, sellable NFT. Two mint flows share the same form chrome:\n\n**P.NFT — Direct staking.** Stake XYU for 1 / 6 / 12 / 24 months at weights 2000 → 16,000 kg. 100% of earnings go to the holder — no protocol share. The output is a QR-coded NFT that can be listed on XY.Market.\n\n**LP.NFT — Provide liquidity.** Deposit USDT (100 / 250 / 500 / 1k / 10k) into a PancakeSwap LP XYU/USDT pool. The share is split 60% / 40% (Your Share / Protocol Share) with an Instant Protocol Boost of 20%. The math — share, weight, boost, projected rewards — is the form itself; nothing is hidden until sign-time.",
        images: [
          "/cases/xy-ecosystem/2 XY Protocols/8.webp",
          "/cases/xy-ecosystem/2 XY Protocols/9.webp",
        ],
      },
      {
        id: "cybele",
        title: "Cybele's Rite — Sacrifice → Weight",
        content:
          "Cybele's Rite is the only protocol in the ecosystem that doesn't trade in numbers — it trades in weight. Sacrifice XYU at a published conversion rate (1 XYU = 0.25 Weight), gain Weight permanently in the ecosystem, and climb a public leaderboard of Top Sacrifiers. The countdown to *dies Sanguinis* runs at the top.\n\nThe design decision was tonal: this protocol carries the cult-like, ceremonial side of the ecosystem (the name itself is mythic). But the receipts are pure crypto — every sacrifice writes an on-chain transaction with a hash, visible in 'My Sacrifices'. Ceremony on the surface, blockchain underneath.",
        images: [
          "/cases/xy-ecosystem/2 XY Protocols/10.webp",
          "/cases/xy-ecosystem/2 XY Protocols/11.webp",
        ],
      },
      {
        id: "xyu",
        title: "XYU Token — The engine",
        content:
          "XYU is the long-scroll page that ties the ecosystem together. The hero band shows price, chain (BNB), 24h change, and rank — alongside the Read Whitepaper / View Smart Contract buttons. Underneath, the page walks a reader through:\n\n- **What XYU does for you** — Play in XYGO · Trade NFTs · Earn yield via Parking · Provide liquidity via SL.Mining\n- **How supply works** — L1 / L2 / L3 supply table, Epoch Burns, In-Game Bonus Burns, Parking Locks, Cybele's Protocol (CRP Vault)\n- **Distribution & vesting** — donut chart with 71% L1 Mining + In-Game Reserve, 10% Liquidity Pools, 5% Team, 5% Growth, 3% NFT Investors, 1% Community\n- **Lock duration tiers** — 1m / 6m / 12m / 24m → 51% / 56% / 60% / 70% share\n- **Protocol share routing per epoch** — Parking Vault, SL.Mining Reserve, Cybele's Protocol\n- **Why the economics hold** — Supply Can't Inflate, Demand Is Built Into the Product, Liquidity is Self-Reinforcing\n- **Trust & Security** — Audited, Time-Lock + Multi-Sig, Licensed & Regulated, Fully On-Chain\n- **Roadmap** — Foundation, Expansion, Governance, Ecosystem Growth\n\nClosing line: *Every payout is real capital.*",
        images: [
          "/cases/xy-ecosystem/2 XY Protocols/12.webp",
          "/cases/xy-ecosystem/2 XY Protocols/13.webp",
        ],
      },
      {
        id: "system",
        title: "One design system across four protocols",
        content:
          "The whole ecosystem runs on one design system: dark-on-dark line-art chrome, single gold accent (#F5A524), shared five-tab item page, shared modal pattern (Sell NFT looks like Accept Bid looks like Sign Terms looks like the Sacrifice form), shared QR-coded NFT artwork format, and a mobile dock that surfaces the same four-protocol nav (Explore · NFT Collections · Earn · Cybele · XYU Token) at the bottom of every screen.\n\nThis was the highest-leverage decision in the project. Adding the Cybele's Rite protocol was a matter of reusing the modal, the leaderboard table, and the transaction-list pattern — not redesigning trust from scratch.",
        images: ["/cases/xy-ecosystem/2 XY Protocols/14.webp"],
      },
    ],
    metrics: [
      { label: "Protocols shipped", value: "4" },
      { label: "Slides covering the design surface", value: "16" },
      { label: "Months of design across the ecosystem", value: "12", suffix: "+" },
      { label: "Native token (XYU) · BSC", value: "1" },
    ],
    reflection:
      "XY Ecosystem taught me that designing for a multi-protocol Web3 product family is mostly *coherence design*. Any individual protocol is a solvable UX problem — there are good patterns for NFT marketplaces, for staking flows, for token economics pages. The hard part is making four of them feel like one product so trust transfers across them. The leverage came from one design system: shared chrome, shared modal pattern, shared trust-signal stack (verified contract, terms verification, lifetime rewards visible). Once those were locked, the fourth protocol (Cybele's Rite) shipped in weeks rather than months.\n\nWhat I'd change: invest more in cross-protocol receipts earlier. The marketplace and Earn already trade each other's NFTs (LP.NFT/P.NFT). Cybele and XYU connect through Weight and the protocol-share routing. But surfacing those connections *in the UI* — a Cybele sacrifice showing 'this is where your XYU is going on the routing diagram' — would close the loop for the user. The economics are connected on chain; the next milestone is making the connections visible.",
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

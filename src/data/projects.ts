import type { CaseStudy } from "@/lib/types";

// ─── Project data ─────────────────────────────────────────────────
// Each project is a full case study. Images reference /public/work/[slug]/
// Replace placeholder content with real project details.

export const projects: CaseStudy[] = [
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
    nextProject: "xygo",
  },

  // ── XYGO ─────────────────────────────────────────────────────────
  {
    slug: "xygo",
    title: "XYGO",
    subtitle: "Web3 lottery platform with NFT marketplace — making crypto accessible to mainstream users",
    category: ["Web3", "Marketplace"],
    year: "2025 - 2026",
    role: "Product Designer",
    duration: "8 months",
    team: "PM, 4 Engineers, Blockchain Dev",
    thumbnail: "/work/xygo/hero.jpg",
    color: "#F5A524",
    brief: {
      narrative:
        "A Web3 lottery and NFT marketplace designed for two very different audiences: crypto-native users, and people who just want to buy a ticket without learning crypto first.",
      tiles: [
        { kind: "stat", value: "2", label: "Audiences in one product", span: 3 },
        { kind: "stat", value: "23", suffix: "%", label: "Lift after renaming the buy button", span: 3 },
        {
          kind: "quote",
          text: "The words on a button matter as much as the layout.",
          cite: "Lesson from launch",
          span: 6,
        },
        {
          kind: "label",
          key: "Onboarding approach",
          value: "Two paths — easy for newcomers, full control for crypto users",
          span: 6,
        },
        {
          kind: "tags",
          label: "Product surfaces",
          items: ["Lottery", "NFT marketplace", "Wallet", "Live draw", "Tickets", "Profile"],
          span: 6,
        },
      ],
    },
    overview:
      "XYGO is a Web3 lottery platform combined with an NFT marketplace. The core challenge was designing for two radically different audiences: crypto-native users who expect decentralization and transparency, and mainstream users who just want to buy a lottery ticket without understanding blockchain.",
    sections: [
      {
        id: "problem",
        title: "The Problem",
        content:
          "Existing Web3 lottery platforms were built by developers for developers. They required users to already own a crypto wallet, understand gas fees, and trust smart contracts they couldn't read. This limited the addressable market to roughly 5% of potential users.\n\nThe business opportunity was clear: if you could make a Web3 lottery as easy to use as a traditional one while retaining the transparency benefits of blockchain, you'd unlock a massive new audience.",
      },
      {
        id: "goals",
        title: "Business Goals",
        content:
          "**Primary goals:**\n- Achieve 10,000 registered users within 3 months of launch\n- Maintain at least 50% non-crypto-native users (measured by first-time wallet creation during onboarding)\n- Generate secondary revenue through NFT marketplace transactions\n- Build trust through provably fair lottery mechanics",
      },
      {
        id: "research",
        title: "Research & Discovery",
        content:
          "I conducted research across two user segments:\n\n**Crypto-native users (8 interviews):** These users valued transparency and decentralization but were frustrated by poor UX across Web3 platforms. They wanted to verify fairness on-chain but didn't need hand-holding.\n\n**Mainstream users (10 interviews):** These users were curious about crypto but intimidated by wallets, seed phrases, and gas fees. They associated Web3 with scams and needed significant trust signals.\n\n**Competitive audit:** Analyzed 6 Web3 lottery platforms and 4 traditional online lottery platforms to map UX patterns across both worlds.",
        images: ["/work/xygo/research-personas.jpg"],
      },
      {
        id: "insights",
        title: "Key Insights",
        content:
          "**Insight 1:** The wallet connection step is the #1 drop-off point for non-crypto users. Every platform that led with \"Connect Wallet\" lost 80%+ of mainstream users.\n\n**Insight 2:** Mainstream users understand \"buying a ticket\" but not \"minting an NFT.\" Same action, different framing — language choice determines adoption.\n\n**Insight 3:** Trust in Web3 comes from transparency features that users can verify independently. Showing the smart contract address and explaining provable fairness increased stated trust by 3x in concept testing.",
      },
      {
        id: "strategy",
        title: "UX Strategy & Information Architecture",
        content:
          "I designed a dual-track experience:\n\n**Track 1 (Mainstream):** Email signup → custodial wallet created silently → fiat payment → ticket purchased. The user never sees the word \"blockchain\" unless they look for it.\n\n**Track 2 (Crypto-native):** Connect wallet → approve transaction → ticket purchased. All on-chain data exposed.\n\nBoth tracks converge on the same core experience. The difference is onboarding and payment — not the product itself.\n\nIA was structured around actions (Buy, Play, Win, Trade) rather than crypto concepts (Mint, Stake, Bridge).",
        images: ["/work/xygo/ia-flow.jpg"],
      },
      {
        id: "wireframes",
        title: "Wireframes & Exploration",
        content:
          "I explored how to present lottery mechanics to both audiences:\n\n**Killed concept:** A dashboard-heavy approach that showed live on-chain data, transaction history, and pool statistics upfront. Crypto-native users loved it; mainstream users found it overwhelming and \"scammy.\"\n\n**Chosen approach:** A clean, e-commerce-inspired layout where the lottery ticket is the hero. On-chain verification is available via expandable sections for users who want it — progressive disclosure applied to trust signals.",
        images: ["/work/xygo/wireframes.jpg"],
      },
      {
        id: "ui-design",
        title: "UI Design & Visual System",
        content:
          "The visual design had to bridge two worlds: the playfulness of lottery/gaming and the credibility of fintech.\n\n- **Dark mode primary** — Aligned with Web3 conventions and gaming aesthetics.\n- **Accent colors** tied to lottery tiers (Gold, Silver, Bronze) creating a natural visual hierarchy.\n- **Card-based layout** for NFTs and tickets, using familiar e-commerce patterns.\n- **Trust badges and security indicators** placed at every transaction touchpoint.",
        images: ["/work/xygo/ui-home.jpg", "/work/xygo/ui-lottery.jpg", "/work/xygo/ui-marketplace.jpg"],
      },
      {
        id: "interactions",
        title: "Interaction Design",
        content:
          "**Ticket reveal animation:** After purchase, the ticket \"scratches\" to reveal the number — adding delight and a tangible moment of anticipation.\n\n**Live draw visualization:** Real-time lottery draw with on-chain verification happening transparently in the background. Users see balls drawn; technically, smart contract results are being rendered.\n\n**NFT preview on hover:** Marketplace items show 3D rotation preview on hover, making the browsing experience tactile.",
        images: ["/work/xygo/interaction-reveal.gif"],
      },
      {
        id: "design-system",
        title: "Design System",
        content:
          "Built a design system optimized for dark mode with light mode support:\n\n- **Token structure:** Color, typography, spacing, elevation, motion\n- **Web3-specific components:** Wallet connector, transaction status, gas estimator, chain selector\n- **Responsive grid:** Optimized for the marketplace browse experience on mobile (single column cards with horizontal scroll categories)",
        images: ["/work/xygo/design-system.jpg"],
      },
      {
        id: "testing",
        title: "Testing & Iteration",
        content:
          "**Usability testing (Round 1):** 6 non-crypto participants attempted to purchase a ticket. 4/6 completed the task. Failures were caused by confusion around the custodial wallet creation step — users didn't understand why they needed a \"wallet\" for a lottery.\n\n**Fix:** Removed the word \"wallet\" entirely for mainstream flow. Reframed as \"Your XYGO Account\" with a balance.\n\n**Usability testing (Round 2):** 6/6 completion rate. Average time to first purchase: 2 minutes 15 seconds.\n\n**A/B test (live):** Tested \"Buy Ticket\" vs \"Enter Draw\" as primary CTA. \"Buy Ticket\" won with 23% higher conversion — familiarity beats novelty.",
      },
    ],
    metrics: [
      { label: "Registered users (3 months)", value: "12,000" },
      { label: "Non-crypto-native ratio", value: "68", suffix: "%" },
      { label: "Task completion rate", value: "96", suffix: "%" },
      { label: "Time to first purchase", value: "2:15" },
    ],
    reflection:
      "The biggest lesson from XYGO was that language design is UX design. Changing a single label from \"Mint\" to \"Buy\" had more impact on conversion than any layout or visual change. In Web3, the vocabulary barrier is higher than the usability barrier.\n\nI'd also invest more in the NFT marketplace discovery experience. We focused most of our design effort on the lottery flow, and the marketplace felt like a secondary feature as a result. User data showed strong interest in NFT trading, but the browse/discover experience wasn't compelling enough to drive repeat visits.",
    nextProject: "duck-master",
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
    thumbnail: "/work/duck-master/hero.jpg",
    color: "#F59E0B",
    brief: {
      narrative:
        "A casual Telegram mini-game designed to bring people back daily and pull their friends in — through quick play, weekly leaderboards, and share-worthy moments.",
      tiles: [
        { kind: "stat", value: "35", suffix: "%", label: "Day 7 retention (3x category avg)", span: 3 },
        { kind: "stat", value: "22", suffix: "%", label: "Sessions that end in a share", span: 3 },
        { kind: "stat", value: "40", suffix: "%", label: "New players from organic shares", span: 3 },
        { kind: "stat", value: "4:12", label: "Average session length", span: 3 },
        {
          kind: "quote",
          text: "Share moments should feel natural — not like the game asking you for a favor.",
          cite: "Research insight",
          span: 8,
        },
        {
          kind: "label",
          key: "Platform limits",
          value: "Telegram chat viewport · no push notifications",
          span: 4,
        },
        {
          kind: "tags",
          label: "What I designed",
          items: ["Daily streaks", "Leaderboards", "Collectible skins", "Haptic feedback", "Share cards"],
          span: 12,
        },
      ],
    },
    overview:
      "Duck Master is a casual game built as a Telegram Mini App. The design challenge was unique: create a game that's simple enough to play in a chat conversation, compelling enough to drive daily return, and social enough to spread organically through Telegram's network effects.",
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
      { label: "Day 7 retention", value: "35", suffix: "%" },
      { label: "Organic acquisition", value: "40", suffix: "%" },
      { label: "Average session length", value: "4:12" },
      { label: "Share rate per session", value: "22", suffix: "%" },
    ],
    reflection:
      "Duck Master taught me that product design and game design share more DNA than either discipline usually admits. The engagement loops, feedback systems, and progression mechanics I designed here are directly applicable to SaaS onboarding, marketplace activation, and any product that needs to build habits.\n\nWhat I'd change: I'd build an analytics dashboard for myself earlier. For the first month, I was making decisions based on aggregate metrics when I needed cohort analysis. Understanding how different player segments (casual vs. competitive) behaved differently would have let me personalize the experience sooner.",
    nextProject: "ineed",
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
];

// Helper to get a project by slug
export function getProject(slug: string): CaseStudy | undefined {
  return projects.find((p) => p.slug === slug);
}

// Helper to get all project slugs (for static generation)
export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

import type { CaseStudy } from "@/lib/types";
import { getMeridianProject } from "./meridian";
import { getSoloosProject } from "./soloos";
import { getVivaroProject } from "./vivaro";
import { getKenoProject } from "./keno";

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
    roleBreakdown: {
      summary: "Solo two-week visual exploration — concept, UI, and motion, all my call.",
      tracks: [
        { label: "Concept", value: 100 },
        { label: "UI", value: 100 },
        { label: "Visual style", value: 100 },
        { label: "Motion", value: 60 },
        { label: "Research", value: 20 },
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
    subtitle: "A two-sided service platform designed across its original company-led version and a focused two-app release",
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
    roleBreakdown: {
      summary: "Lead designer across two product versions — both apps, end-to-end, two years.",
      tracks: [
        { label: "Research", value: 70 },
        { label: "UX", value: 100 },
        { label: "UI", value: 100 },
        { label: "Design system", value: 80 },
        { label: "PM", value: 30 },
      ],
    },
    overview:
      "I designed Ineed across both product versions: the first company-led marketplace and the later home-appliance service with dedicated customer and professional apps, including the UX, UI and design system.",
    sections: [],
    metrics: [],
    reflection:
      "The product pivot changed more than the visual style: it changed who could supply services, what customers could request, and how both sides tracked a job.",
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
    roleBreakdown: {
      summary: "Designed the product from concept to a clickable hi-fi prototype.",
      tracks: [
        { label: "Research", value: 50 },
        { label: "UX", value: 100 },
        { label: "UI", value: 100 },
        { label: "Prototype", value: 100 },
        { label: "Design system", value: 60 },
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
    roleBreakdown: {
      summary: "Designed the operator dashboard top-to-bottom — live tracking, routing, and chat.",
      tracks: [
        { label: "Research", value: 60 },
        { label: "UX", value: 100 },
        { label: "UI", value: 100 },
        { label: "Design system", value: 70 },
        { label: "PM", value: 30 },
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
    roleBreakdown: {
      summary: "Designed the whole app — onboarding, rooms, automations, energy.",
      tracks: [
        { label: "Research", value: 70 },
        { label: "UX", value: 100 },
        { label: "UI", value: 100 },
        { label: "Design system", value: 70 },
        { label: "PM", value: 30 },
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
    subtitle: "A Telegram game and visual system spanning trading, collecting, progression and social play",
    category: ["Mobile", "Gaming"],
    year: "2024 - 2025",
    role: "Product Designer",
    duration: "2024–2025",
    team: "PM, 2 Engineers",
    thumbnail: "/cases/duck-master/Cover.webp",
    color: "#FFD12B",
    brief: {
      narrative:
        "A connected Telegram game spanning progression, collecting, trading, social play and a consistent duck character world.",
      tiles: [
        { kind: "label", key: "Core challenge", value: "Make a complex mechanic understandable to players", span: 6 },
        { kind: "label", key: "Design ownership", value: "Game UX/UI · design system · character and asset pipeline", span: 6 },
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
    roleBreakdown: {
      summary: "Led product design AND ran the AI asset pipeline — character art, cards, scenes.",
      tracks: [
        { label: "UX", value: 100 },
        { label: "UI", value: 100 },
        { label: "AI pipeline", value: 100 },
        { label: "Character art", value: 100 },
        { label: "Onboarding", value: 100 },
        { label: "Design system", value: 70 },
      ],
    },
    overview:
      "I designed Duck Master as a connected Telegram game: its interfaces, game loops, character system, onboarding and asset pipeline. The trading round was one product decision inside that wider work.",
    sections: [],
    metrics: [],
    reflection:
      "The strongest lesson was to test whether the core mechanic is understandable before expanding the game around it. A visually rich system still fails if players cannot explain what to do next.",
    nextProject: "ineed",
  },

  // ── BalVoi ────────────────────────────────────────────────────────
  {
    slug: "balvoi",
    title: "BalVoi",
    subtitle: "A news and media-literacy platform spanning reading, AI analysis, learning and a responsive design system",
    category: ["AI", "SaaS"],
    year: "2025 – 2026",
    role: "Lead Product Designer",
    duration: "6 months",
    team: "PM, 3 Engineers, Data Scientist",
    thumbnail: "/cases/balvoi/Cover.webp",
    color: "#0081DD",
    brief: {
      narrative:
        "A reading platform that pairs every article with AI bias analysis, a Trust Score, and short lessons in media literacy.",
      tiles: [
        { kind: "label", key: "Product question", value: "How should readers interpret AI analysis?", span: 6 },
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
    roleBreakdown: {
      summary: "Lead design across marketing, reader, analysis tools, and every edge case.",
      tracks: [
        { label: "Research", value: 90 },
        { label: "UX", value: 100 },
        { label: "UI", value: 100 },
        { label: "Design system", value: 90 },
        { label: "Strategy", value: 80 },
      ],
    },
    overview:
      "I designed BalVoi across its news-reading experience, DeBiasIt analysis, trust and learning surfaces, edge cases and responsive component system. The documented DeBiasIt UI is implemented in supported regions.",
    sections: [],
    metrics: [],
    reflection:
      "For AI analysis, an answer is not enough: readers also need context for the answer and a clear path when the system cannot analyze a source. The current case needs primary evidence to show how well those explanations worked.",
    nextProject: "xy-ecosystem",
  },

  // ── XY Ecosystem ─────────────────────────────────────────────────
  {
    slug: "xy-ecosystem",
    title: "XY Ecosystem",
    subtitle: "A unified Web3 product system for lottery, marketplace, Earn, Cybele and token experiences",
    category: ["Web3", "Marketplace", "DeFi"],
    year: "2025 - 2026",
    role: "Lead Product Designer",
    duration: "12+ months",
    team: "PM, 4 Engineers, Blockchain Dev",
    thumbnail: "/cases/xy-ecosystem/Cover.webp",
    color: "#F5A524",
    brief: {
      narrative:
        "Approved product design unifies related Web3 experiences while the full platform moves through pre-production.",
      tiles: [
        { kind: "stat", value: "4", label: "Protocols, one system", span: 3 },
        { kind: "stat", value: "1", label: "Native token · BSC", span: 3 },
        {
          kind: "quote",
          text: "Make terms, fees, and risk legible before commitment.",
          cite: "Design direction",
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
    roleBreakdown: {
      summary: "Lead design across four protocols on one shared system.",
      tracks: [
        { label: "Research", value: 70 },
        { label: "UX", value: 100 },
        { label: "UI", value: 100 },
        { label: "Design system", value: 100 },
        { label: "Strategy", value: 90 },
      ],
    },
    overview:
      "I led the UX, UI and shared design system across XYGO and the connected marketplace, Earn, Cybele's Rite and XYU experiences. The approved core direction is in pre-production; public landing pages were outside my contribution.",
    sections: [],
    metrics: [],
    reflection:
      "The design work belongs to an approved product in development. Its effect on comprehension and business performance can only be evaluated after launch and validation.",
    nextProject: "duck-master",
  },

  // ── Spearthrone ────────────────────────────────────────────────
  {
    slug: "spearthrone",
    title: "Spearthrone",
    subtitle:
      "A cinematic Spartan slot concept built around tumbling wins, divine multipliers, and a high-impact free-spins feature",
    category: ["Gaming", "Experimental"],
    year: "2026",
    role: "Game UI · Art Direction",
    duration: "Portfolio case",
    team: "Independent concept",
    thumbnail: "/cases/Spearthrone/Cover.png",
    color: "#F2B33D",
    brief: {
      narrative:
        "Myth built for impact.",
      tiles: [
        { kind: "stat", value: "6×5", label: "Tumbling reel grid", span: 3 },
        { kind: "stat", value: "500", suffix: "×", label: "Reference multiplier ceiling", span: 3 },
        {
          kind: "quote",
          text: "From symbol to spectacle.",
          cite: "Visual direction",
          span: 6,
        },
        {
          kind: "label",
          key: "Reference loop",
          value: "Tumbles · Random multipliers · Scatter bonus · Free spins",
          span: 6,
        },
        {
          kind: "tags",
          label: "Case scope",
          items: ["Art direction", "Game UI", "Symbol system", "Motion", "Win states", "Responsive screens"],
          span: 6,
        },
      ],
    },
    roleBreakdown: {
      summary: "A complete visual concept spanning the core game, feature states, symbols, and motion language.",
      tracks: [
        { label: "Art direction", value: 100 },
        { label: "Game UI", value: 100 },
        { label: "Symbol design", value: 100 },
        { label: "Motion", value: 90 },
        { label: "Game UX", value: 80 },
      ],
    },
    overview:
      "Spearthrone is an original Spartan-themed slot concept built around a six-reel tumble loop recast as a battlefield spectacle. Warrior symbols, mythic creatures, weaponry, and jewel tiers establish the pay hierarchy, while fiery multiplier strikes turn wins into staged moments. The case focuses on making dense slot logic readable without losing the scale and drama of the theme—across the base game, bonus presentation, controls, responsive layouts, and animated win states.",
    sections: [],
    metrics: [
      { label: "Reels × rows", value: "6×5" },
      { label: "Matching symbols in the reference pay system", value: "8–30" },
      { label: "Free spins in the reference feature", value: "15" },
      { label: "Reference multiplier ceiling", value: "500", suffix: "×" },
    ],
    reflection:
      "The central design problem was balance. Slot screens carry a lot of information—symbol values, bet controls, feature entry, multipliers, credits, and win feedback—yet the experience still needs a single emotional focal point. Building the hierarchy around the warrior and the falling multiplier strikes let the interface stay legible while the game retained a cinematic identity. The strongest lesson was that motion cannot be added at the end: the symbols, fire trails, impact zones, and win-state composition have to be designed as one system from the beginning.",
    nextProject: "xy-ecosystem",
  },

  // ── Roo's Ruckus ───────────────────────────────────────────────
  {
    slug: "roos-ruckus",
    title: "Roo's Ruckus",
    subtitle:
      "A character-led Australian outback slot concept built around nudging Wilds, sticky multipliers, and escalating respins",
    category: ["Gaming", "Experimental"],
    year: "2026",
    role: "Game UI · Art Direction",
    duration: "Portfolio case",
    team: "Independent concept",
    thumbnail: "/cases/Roo's%20Ruckus/Cover.png",
    color: "#C8F24A",
    brief: {
      narrative:
        "Characters make the mechanics.",
      tiles: [
        { kind: "stat", value: "5×5", label: "Reel grid", span: 3 },
        { kind: "stat", value: "259", label: "Ways to win", span: 3 },
        {
          kind: "quote",
          text: "Characters are mechanics, not decoration.",
          cite: "Design principle",
          span: 6,
        },
        {
          kind: "label",
          key: "Reference loop",
          value: "Nudging Wilds · Sticky multipliers · Respins · Bonus game",
          span: 6,
        },
        {
          kind: "tags",
          label: "Case scope",
          items: ["Art direction", "Character design", "Game UI", "Feature logic", "Motion", "Supporting screens"],
          span: 6,
        },
      ],
    },
    roleBreakdown: {
      summary: "A character-first game concept connecting feature behavior, interface feedback, and a complete supporting-screen system.",
      tracks: [
        { label: "Art direction", value: 100 },
        { label: "Character design", value: 100 },
        { label: "Game UI", value: 100 },
        { label: "Feature logic", value: 90 },
        { label: "Motion", value: 90 },
      ],
    },
    overview:
      "Roo's Ruckus is an original Australian-outback slot concept built around a 5×5 game board and two feature characters: Roo becomes a full-reel sticky multiplier Wild, while Mango behaves as a nudging Wild that extends the action through respins. The visual system connects the dusty landscape, saturated fruit symbols, elastic character animation, feature overlays, paytable, and onboarding screens so that the rules feel like part of the world rather than instructions placed on top of it.",
    sections: [],
    metrics: [
      { label: "Reels × rows", value: "5×5" },
      { label: "Ways to win shown in the concept", value: "259" },
      { label: "Mechanic-driving Wild characters", value: "2" },
      { label: "Reference maximum win", value: "10,000", suffix: "×" },
    ],
    reflection:
      "Roo's Ruckus works because the feature logic has a face. Instead of asking players to remember abstract Wild variants, the game gives each behavior a character, silhouette, color, and movement pattern. That makes the loop easier to learn and gives every respin a sense of anticipation. The case also reinforced how important supporting screens are in slot design: feature explanations, bonus entry, paytable, and responsive states need the same personality and clarity as the main reels or the world immediately feels incomplete.",
    nextProject: "spearthrone",
  },

  getMeridianProject(),
  getSoloosProject(),
  getVivaroProject(),
  getKenoProject(),
];

// Helper to get a project by slug
export function getProject(slug: string): CaseStudy | undefined {
  return projects.find((p) => p.slug === slug);
}

// Helper to get all project slugs (for static generation)
export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

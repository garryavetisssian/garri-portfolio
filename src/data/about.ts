import type { Experience, Skill } from "@/lib/types";

export const INTRO = {
  headline: "Design is a business function, not an aesthetic one.",
  bio: [
    "I'm Garri Avetisyan, a Product Designer based in Yerevan, Armenia. For the past 5+ years, I've been designing complex digital products across AI, Web3, SaaS, and marketplaces — the kind of products where getting the UX wrong means real business consequences.",
    "I believe the best design work happens at the intersection of user needs and business goals. A beautiful interface that doesn't drive outcomes isn't design — it's decoration. I focus on solving the right problems, structuring information clearly, and making complex systems feel simple.",
    "Before every pixel, I ask: what's the business goal? Who's the user? What does success look like? This thinking shapes everything from information architecture to micro-interactions.",
  ],
};

export const PROCESS = [
  { step: "01", title: "Understand", description: "Research the problem space, talk to users, analyze data, and map the business context. No assumptions — evidence." },
  { step: "02", title: "Frame", description: "Define the real problem (not the first one), set constraints, identify success metrics, and align stakeholders on direction." },
  { step: "03", title: "Design", description: "Explore broadly, then converge. Wireframes, prototypes, visual design — always tied back to the strategy. Kill your darlings early." },
  { step: "04", title: "Validate", description: "Test with real users, measure against goals, iterate based on evidence. Ship, learn, improve. Design doesn't end at handoff." },
];

export const COLLABORATION =
  "I work best when embedded in cross-functional teams. I partner closely with PMs to define scope, with engineers to understand constraints, and with stakeholders to align on priorities. I communicate through artifacts — flows, prototypes, and documented decisions — not slide decks. I believe in strong opinions loosely held, and I'd rather be proven wrong early than right too late.";

export const SKILLS: Skill[] = [
  {
    category: "What I do",
    items: [
      "UX Strategy",
      "Product Thinking",
      "User Research",
      "Information Architecture",
      "Interaction Design",
      "Wireframing & Prototyping",
      "UI Design",
      "Design Systems",
      "Vibe Coding",
    ],
  },
  {
    category: "What I use",
    items: [
      "Figma",
      "Adobe Creative Suite",
      "Midjourney",
      "ChatGPT",
      "Claude Code",
      "Whimsical",
      "Maze",
      "Notion",
      "Linear",
    ],
  },
];

export const LANGUAGES = [
  { name: "Armenian", level: "Native" },
  { name: "Russian", level: "Fluent" },
  { name: "English", level: "Professional" },
];

// ─── Work experience — EXACT text from CV, do not modify ──────────

export interface WorkExperience {
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
}

// ─── Full-time work experience (left column) ───────────────────

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: "ANUNA LLC",
    location: "Yerevan",
    role: "Product Designer",
    period: "Dec 2025 - Present",
    bullets: [
      "Conceptualize and execute end-to-end design strategies that harmonize user requirements with core business objectives.",
      "Translate complex ideas into high-fidelity interactive prototypes and visual assets to validate product architecture prior to engineering.",
      "Facilitate cross-functional synergy by partnering with engineering and product leads to streamline the handoff and implementation process.",
      "Leverage qualitative and quantitative insights—including user interviews and competitive analysis—to steer the product roadmap.",
      "Drive product evolution through a rigorous cycle of testing and data-driven refinements to maximize engagement and resolve friction points.",
    ],
  },
  {
    company: "Duck Master",
    location: "Russia",
    role: "Creative Director",
    period: "Sep 2024 - May 2025",
    bullets: [
      "Develop intuitive, user-focused design solutions for products, ensuring functionality, usability, and aesthetic appeal align with both business goals and user needs.",
      "Create wireframes, prototypes, and mockups to communicate design concepts and test product functionality before development.",
      "Work closely with product managers, developers, and other stakeholders to ensure seamless communication and alignment throughout the product development process.",
      "Gather and analyze user feedback, perform usability testing, and conduct market research to inform and improve design decisions.",
      "Continuously iterate on product designs based on user feedback, analytics, and performance data to enhance the product experience.",
    ],
  },
  {
    company: "Ineed Inc",
    location: "Armenia",
    role: "Product Designer",
    period: "May 2022 - May 2024",
    bullets: [
      "Played a key role in shaping the user experience and interface design for both the mobile app and landing page.",
      "Created intuitive, user-friendly interfaces to enhance the user journey and ensure seamless interaction with app features.",
      "Designed the landing page to effectively communicate Ineed's value proposition and attract users.",
      "Conducted user research and usability testing to refine designs and ensure they meet user needs.",
      "Collaborated with developers to ensure successful implementation of design elements.",
    ],
  },
  {
    company: "TIRSoft LLC",
    location: "Armenia",
    role: "UX/UI Designer",
    period: "Oct 2020 – May 2024",
    bullets: [
      "Gathering and evaluating user requirements in collaboration with product managers and engineers.",
      "Illustrate design ideas using storyboards, process flows and sitemaps.",
      "Develop UI mockups and prototypes.",
      "Identify and troubleshoot UX problems.",
      "Prepare and present rough drafts to internal teams and stakeholders.",
    ],
  },
];

// ─── Freelance projects (right column) ──────────────────────────

export interface FreelanceProject {
  name: string;
  tag: string;
  tagColor: string;
  period: string;
  description: string;
  details: string[];
}

export const FREELANCE_PROJECTS: FreelanceProject[] = [
  {
    name: "BalVoi",
    tag: "AI",
    tagColor: "#00D4AA",
    period: "2025",
    description: "Designing an AI-powered news platform focused on debiasing articles using a variety of large language models and a custom-trained AI.",
    details: [
      "End-to-end product design from research to high-fidelity UI",
      "Designed AI-assisted editorial workflows for journalists",
      "Built a design system with 40+ components for the platform",
      "Focused on trust calibration — designing for when AI gets it wrong",
    ],
  },
  {
    name: "XYGO",
    tag: "Web3",
    tagColor: "#A78BFA",
    period: "2025",
    description: "Creating the interface and NFT structure for a Web3 lottery and marketplace.",
    details: [
      "Designed dual-track UX for crypto-native and mainstream users",
      "Built progressive Web3 onboarding that hides blockchain complexity",
      "Designed NFT marketplace browse and trading experience",
      "Achieved 68% non-crypto-native user ratio through UX simplification",
    ],
  },
];

// Legacy export for old route pages
export const EXPERIENCE: { company: string; role: string; period: string; scope: string }[] =
  WORK_EXPERIENCE.map((w) => ({
    company: w.company,
    role: w.role,
    period: w.period,
    scope: w.bullets[0],
  }));

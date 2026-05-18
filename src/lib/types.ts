// ─── Core data types ──────────────────────────────────────────────

export type ProjectCategory =
  | "AI"
  | "Web3"
  | "Mobile"
  | "SaaS"
  | "Marketplace"
  | "Logistics"
  | "Experimental";

export interface ProjectMeta {
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory | ProjectCategory[];
  year: string;
  role: string;
  duration: string;
  team: string;
  thumbnail: string; // path to hero image
  color: string; // accent color for this project
}

export interface CaseStudyTLDR {
  problem: string;
  solution: string;
  outcome: string;
}

export interface CaseStudySection {
  id: string;
  title: string;
  content: string; // markdown or plain text
  images?: string[];
  annotations?: { text: string; position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }[];
}

export interface CaseStudy extends ProjectMeta {
  tldr: CaseStudyTLDR;
  overview: string;
  sections: CaseStudySection[];
  metrics?: { label: string; value: string; prefix?: string; suffix?: string }[];
  reflection: string;
  nextProject?: string; // slug of next case study
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  scope: string;
}

export interface Skill {
  category: string;
  items: string[];
}

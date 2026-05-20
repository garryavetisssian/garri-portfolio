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

/* Per-case "Brief" — replaces the generic TL;DR strip.
   Bespoke content per case: short narrative line + a mixed grid of tiles. */
export type BriefTile =
  | {
      kind: "stat";
      value: string;
      label: string;
      prefix?: string;
      suffix?: string;
      span?: number;
    }
  | {
      kind: "label";
      key: string;
      value: string;
      span?: number;
    }
  | {
      kind: "quote";
      text: string;
      cite?: string;
      span?: number;
    }
  | {
      kind: "tags";
      label: string;
      items: string[];
      span?: number;
    };

export interface CaseBrief {
  narrative: string; // one-or-two-sentence story-in-a-breath
  tiles: BriefTile[]; // 3-6 tiles, authored per case
}

export interface CaseStudySection {
  id: string;
  title: string;
  content: string; // markdown or plain text
  images?: string[];
  annotations?: { text: string; position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }[];
}

export interface CaseStudy extends ProjectMeta {
  brief: CaseBrief;
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

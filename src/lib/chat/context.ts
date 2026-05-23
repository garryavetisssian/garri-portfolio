/**
 * Server-side context assembler for the per-case AI chat.
 *
 * Builds a system prompt that grounds the model on a specific case study
 * plus a compact "about Garri" block. The prompt explicitly constrains the
 * model to only answer about the case at hand, and to defer to a "let's chat
 * directly" line for anything off-topic.
 */

import { getProject } from "@/data/projects";
import { INTRO } from "@/data/about";
import type { CaseStudy } from "@/lib/types";

const MAX_SECTION_CHARS = 800; // trim long sections so the prompt stays small

function trim(text: string, max = MAX_SECTION_CHARS) {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

function formatBrief(c: CaseStudy): string {
  const lines: string[] = [c.brief.narrative];
  for (const tile of c.brief.tiles) {
    if (tile.kind === "stat") {
      lines.push(
        `- ${tile.prefix ?? ""}${tile.value}${tile.suffix ?? ""} — ${tile.label}`
      );
    } else if (tile.kind === "label") {
      lines.push(`- ${tile.key}: ${tile.value}`);
    } else if (tile.kind === "quote") {
      lines.push(`- "${tile.text}"${tile.cite ? ` — ${tile.cite}` : ""}`);
    } else if (tile.kind === "tags") {
      lines.push(`- ${tile.label}: ${tile.items.join(", ")}`);
    }
  }
  return lines.join("\n");
}

function formatRole(c: CaseStudy): string {
  if (!c.roleBreakdown) return "";
  const summary = c.roleBreakdown.summary ?? "";
  const tracks = c.roleBreakdown.tracks
    .map((t) => `- ${t.label}: ${t.value}/100`)
    .join("\n");
  return [summary, tracks].filter(Boolean).join("\n");
}

function formatSections(c: CaseStudy): string {
  return c.sections
    .map((s) => `### ${s.title}\n${trim(s.content)}`)
    .join("\n\n");
}

export function buildSystemPrompt(slug: string): string | null {
  const c = getProject(slug);
  if (!c) return null;

  const meta = [
    `Title: ${c.title}`,
    `Subtitle: ${c.subtitle}`,
    `Year: ${c.year}`,
    `Role: ${c.role}`,
    `Duration: ${c.duration}`,
    `Team: ${c.team}`,
    `Categories: ${Array.isArray(c.category) ? c.category.join(", ") : c.category}`,
  ].join("\n");

  const sections: string[] = [
    `You are an AI assistant embedded on Garri Avetisyan's portfolio, answering questions about ONE specific case study: "${c.title}".`,
    ``,
    `## About Garri`,
    INTRO.bio.join(" "),
    ``,
    `## This case study — metadata`,
    meta,
    ``,
    `## Brief`,
    formatBrief(c),
  ];

  const role = formatRole(c);
  if (role) {
    sections.push(``, `## Garri's role on this project`, role);
  }

  sections.push(``, `## Overview`, trim(c.overview, 1200));

  const secs = formatSections(c);
  if (secs) {
    sections.push(``, `## Case study sections`, secs);
  }

  if (c.metrics?.length) {
    sections.push(
      ``,
      `## Metrics`,
      c.metrics
        .map(
          (m) =>
            `- ${m.label}: ${m.prefix ?? ""}${m.value}${m.suffix ?? ""}`
        )
        .join("\n")
    );
  }

  if (c.reflection) {
    sections.push(``, `## Reflection (Garri's own voice)`, trim(c.reflection, 1200));
  }

  sections.push(
    ``,
    `## How to answer`,
    `- Answer ONLY questions about "${c.title}" or Garri's work and role on it.`,
    `- If the user asks about a different project, politely redirect them ("I can only help with ${c.title} here — head to that case's page to chat about a different project").`,
    `- If the user asks about Garri's personal life, salary, contact info, or anything off-topic, decline briefly and suggest they use the contact page.`,
    `- Speak in first person as Garri only when quoting his Reflection or directly paraphrasing it; otherwise refer to him in third person as "Garri".`,
    `- Be concise: 2–4 short paragraphs max, plain prose, no markdown headers.`,
    `- If something isn't in the provided context, say so honestly — do NOT invent metrics, team members, dates, or outcomes.`,
    `- Match the user's language (English, Russian, or Armenian) automatically.`
  );

  return sections.join("\n");
}

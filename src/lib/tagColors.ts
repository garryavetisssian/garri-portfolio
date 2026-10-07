// Fixed color per industry tag — consistent everywhere
export const TAG_COLORS: Record<string, string> = {
  AI: "#00D4AA",
  Web3: "#A78BFA",
  SaaS: "#3B82F6",
  Mobile: "#F59E0B",
  Marketplace: "#F472B6",
  Logistics: "#EF4444",
  Experimental: "#00FF7F",
};

export function getTagColor(tag: string): string {
  return TAG_COLORS[tag] || "#8A8B96";
}

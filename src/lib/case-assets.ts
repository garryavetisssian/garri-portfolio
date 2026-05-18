import fs from "fs";
import path from "path";

const ALLOWED_EXT = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".mp4", ".webm"];

export interface CaseAsset {
  src: string;
  type: "image" | "video";
  ext: string;
}

export interface CaseTab {
  name: string;
  cover: string | null;
  assets: CaseAsset[];
}

export interface CaseAssets {
  cover: string | null;
  /** Flat asset list (used when there are no sub-tabs). */
  assets: CaseAsset[];
  /** Sub-tabbed assets (e.g. Ineed has "First Version" + "Release Version"). */
  tabs: CaseTab[];
  /** Index of the tab to show by default (prefers "Release"). */
  defaultTab: number;
  /** True when the case has nothing visual on disk. */
  isEmpty: boolean;
}

function numericSort(a: string, b: string): number {
  const numA = parseInt(a.match(/^(\d+)/)?.[1] || "999999", 10);
  const numB = parseInt(b.match(/^(\d+)/)?.[1] || "999999", 10);
  if (numA !== numB) return numA - numB;
  return a.localeCompare(b);
}

function classify(ext: string): "image" | "video" {
  return ext === ".mp4" || ext === ".webm" ? "video" : "image";
}

function findCover(dirPath: string, urlPrefix: string): string | null {
  if (!fs.existsSync(dirPath)) return null;
  const files = fs.readdirSync(dirPath);
  for (const f of files) {
    if (f.toLowerCase().startsWith("cover") && ALLOWED_EXT.includes(path.extname(f).toLowerCase())) {
      return `${urlPrefix}/${encodeURIComponent(f)}`;
    }
  }
  return null;
}

function scanDir(dirPath: string, urlPrefix: string): CaseAsset[] {
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return ALLOWED_EXT.includes(ext) && !f.toLowerCase().startsWith("cover");
  });
  files.sort(numericSort);
  return files.map((f) => {
    const ext = path.extname(f).toLowerCase();
    return {
      src: `${urlPrefix}/${encodeURIComponent(f)}`,
      type: classify(ext),
      ext,
    };
  });
}

/**
 * Scan public/cases/[slug]/ for visual assets.
 * Runs at build/request time on the server; the result is baked into the
 * generated HTML for static pages, so the client never has to fetch it.
 */
export function getCaseAssets(slug: string): CaseAssets {
  const dir = path.join(process.cwd(), "public", "cases", slug);

  if (!fs.existsSync(dir)) {
    return { cover: null, assets: [], tabs: [], defaultTab: 0, isEmpty: true };
  }

  const cover = findCover(dir, `/cases/${slug}`);
  const rootEntries = fs.readdirSync(dir);

  // Detect sub-tab folders (Ineed: "First Version" / "Release Version")
  const subfolders = rootEntries
    .filter((f) => {
      try {
        return fs.statSync(path.join(dir, f)).isDirectory();
      } catch {
        return false;
      }
    })
    .sort();

  if (subfolders.length > 0) {
    const tabs: CaseTab[] = subfolders.map((folder) => {
      const folderPath = path.join(dir, folder);
      const urlPrefix = `/cases/${slug}/${encodeURIComponent(folder)}`;
      return {
        name: folder,
        cover: findCover(folderPath, urlPrefix),
        assets: scanDir(folderPath, urlPrefix),
      };
    });

    // Prefer "Release" as the default tab if it exists
    let defaultTab = tabs.length - 1;
    const releaseIdx = tabs.findIndex((t) => t.name.toLowerCase().includes("release"));
    if (releaseIdx !== -1) defaultTab = releaseIdx;

    const total = tabs.reduce((sum, t) => sum + t.assets.length, 0);
    return { cover, assets: [], tabs, defaultTab, isEmpty: total === 0 };
  }

  const assets = scanDir(dir, `/cases/${slug}`);
  return { cover, assets, tabs: [], defaultTab: 0, isEmpty: assets.length === 0 };
}

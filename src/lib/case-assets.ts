import fs from "fs";
import path from "path";
import { projects } from "@/data/projects";
import type { CaseStudy } from "@/lib/types";

const ALLOWED_EXT = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".mp4", ".webm"];

export interface CaseAsset {
  src: string;
  type: "image" | "video";
  ext: string;
  /** Intrinsic pixel dimensions (images only). Set so the gallery can reserve
   *  the correct box height before the image loads — without this, lazy-loaded
   *  images have 0 height and the gallery collapses to a single visible slide
   *  on slower connections. */
  width?: number;
  height?: number;
}

/**
 * Read intrinsic pixel dimensions from an image file header, synchronously and
 * with no extra dependencies. Supports the formats used by case assets
 * (PNG / JPEG / WebP / GIF). Returns null for anything it can't parse, so the
 * caller simply omits the attributes. Validated byte-for-byte against `sharp`
 * across every case image.
 */
function imageDimensions(filePath: string): { width: number; height: number } | null {
  let buf: Buffer;
  try {
    buf = fs.readFileSync(filePath);
  } catch {
    return null;
  }
  if (buf.length < 24) return null;

  // PNG — 8-byte signature, then IHDR: width @16, height @20 (big-endian).
  if (buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // GIF — "GIF8", logical screen width/height @6/@8 (little-endian).
  if (buf.toString("ascii", 0, 4) === "GIF8") {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }

  // WebP — "RIFF"…"WEBP" then a VP8 / VP8L / VP8X chunk (each packs size differently).
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const fmt = buf.toString("ascii", 12, 16);
    if (fmt === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (fmt === "VP8L") {
      const b0 = buf[21], b1 = buf[22], b2 = buf[23], b3 = buf[24];
      return {
        width: 1 + (((b1 & 0x3f) << 8) | b0),
        height: 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)),
      };
    }
    if (fmt === "VP8X") {
      return {
        width: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)),
        height: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)),
      };
    }
    return null;
  }

  // JPEG — scan for a Start-Of-Frame marker (0xFFC0–0xFFCF, excluding
  // DHT/JPG/DAC) which carries height @+5 and width @+7 (big-endian).
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let off = 2;
    while (off + 9 < buf.length) {
      if (buf[off] !== 0xff) {
        off++;
        continue;
      }
      const marker = buf[off + 1];
      if (
        marker >= 0xc0 && marker <= 0xcf &&
        marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc
      ) {
        return { width: buf.readUInt16BE(off + 7), height: buf.readUInt16BE(off + 5) };
      }
      const len = buf.readUInt16BE(off + 2);
      if (len < 2) break;
      off += 2 + len;
    }
    return null;
  }

  return null;
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
    const type = classify(ext);
    const asset: CaseAsset = {
      src: `${urlPrefix}/${encodeURIComponent(f)}`,
      type,
      ext,
    };
    if (type === "image") {
      const dim = imageDimensions(path.join(dirPath, f));
      if (dim) {
        asset.width = dim.width;
        asset.height = dim.height;
      }
    }
    return asset;
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
      // Strip a leading numeric sort prefix like "1 ", "01 ", "1 — " so the
      // displayed tab label stays clean while the folder name controls order.
      const displayName = folder.replace(/^\d+\s*[—–-]?\s*/, "");
      return {
        name: displayName,
        cover: findCover(folderPath, urlPrefix),
        assets: scanDir(folderPath, urlPrefix),
      };
    });

    // Default to the first tab. Override to a tab containing "release" if one
    // exists (preserves legacy behavior for Ineed's First/Release Version tabs).
    let defaultTab = 0;
    const releaseIdx = tabs.findIndex((t) => t.name.toLowerCase().includes("release"));
    if (releaseIdx !== -1) defaultTab = releaseIdx;

    const total = tabs.reduce((sum, t) => sum + t.assets.length, 0);
    return { cover, assets: [], tabs, defaultTab, isEmpty: total === 0 };
  }

  const assets = scanDir(dir, `/cases/${slug}`);
  return { cover, assets, tabs: [], defaultTab: 0, isEmpty: assets.length === 0 };
}

/**
 * Whether a case has a public/cases/[slug]/ folder on disk.
 * Used to filter out cases whose visual assets have been deleted.
 */
export function hasCaseFolder(slug: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "cases", slug));
}

/**
 * Projects array filtered to only those with a case folder on disk,
 * reversed so the most recent project (last in projects.ts) appears first.
 */
export function getAvailableProjects(): CaseStudy[] {
  return projects.filter((p) => hasCaseFolder(p.slug)).reverse();
}

export function getAvailableProjectSlugs(): string[] {
  return getAvailableProjects().map((p) => p.slug);
}

/**
 * Compute the "next project" slug as the project immediately after the
 * current one in the available list (cycles back to the first). Replaces
 * the hardcoded `nextProject` field which breaks when cases are deleted.
 */
export function getNextProjectSlug(currentSlug: string): string | undefined {
  const all = getAvailableProjects();
  if (all.length === 0) return undefined;
  const idx = all.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return undefined;
  return all[(idx + 1) % all.length].slug;
}


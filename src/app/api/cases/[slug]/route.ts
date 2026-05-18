import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ALLOWED_EXT = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".mp4", ".webm"];

function numericSort(a: string, b: string): number {
  const numA = parseInt(a.match(/^(\d+)/)?.[1] || "999999", 10);
  const numB = parseInt(b.match(/^(\d+)/)?.[1] || "999999", 10);
  if (numA !== numB) return numA - numB;
  return a.localeCompare(b);
}

interface Asset { src: string; type: "image" | "video"; }
interface Tab { name: string; cover: string | null; assets: Asset[]; }

function findCover(dirPath: string, urlPrefix: string): string | null {
  if (!fs.existsSync(dirPath)) return null;
  const files = fs.readdirSync(dirPath);
  for (const f of files) {
    if (f.toLowerCase().startsWith("cover") && ALLOWED_EXT.includes(path.extname(f).toLowerCase())) {
      return `${urlPrefix}/${f}`;
    }
  }
  return null;
}

function scanDir(dirPath: string, urlPrefix: string): Asset[] {
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return ALLOWED_EXT.includes(ext) && !f.toLowerCase().startsWith("cover");
  });
  files.sort(numericSort);
  return files.map((f) => {
    const ext = path.extname(f).toLowerCase();
    return {
      src: `${urlPrefix}/${f}`,
      type: (ext === ".mp4" || ext === ".webm" ? "video" : "image") as "image" | "video",
    };
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const casesDir = path.join(process.cwd(), "public", "cases", slug);

  if (!fs.existsSync(casesDir)) {
    return NextResponse.json({ cover: null, assets: [], tabs: [], defaultTab: 0 });
  }

  // Root cover
  const cover = findCover(casesDir, `/cases/${slug}`);
  const rootFiles = fs.readdirSync(casesDir);

  // Check for subfolders
  const subfolders = rootFiles
    .filter((f) => fs.statSync(path.join(casesDir, f)).isDirectory())
    .sort();

  if (subfolders.length > 0) {
    const tabs: Tab[] = subfolders.map((folder) => {
      const folderPath = path.join(casesDir, folder);
      const urlPrefix = `/cases/${slug}/${encodeURIComponent(folder)}`;
      return {
        name: folder,
        cover: findCover(folderPath, urlPrefix),
        assets: scanDir(folderPath, urlPrefix),
      };
    });

    let defaultTab = tabs.length - 1;
    const releaseIdx = tabs.findIndex((t) => t.name.toLowerCase().includes("release"));
    if (releaseIdx !== -1) defaultTab = releaseIdx;

    const totalAssets = tabs.reduce((sum, t) => sum + t.assets.length, 0);
    return NextResponse.json({ cover, assets: [], tabs, defaultTab, isEmpty: totalAssets === 0 });
  }

  const assets = scanDir(casesDir, `/cases/${slug}`);
  return NextResponse.json({ cover, assets, tabs: [], defaultTab: 0, isEmpty: assets.length === 0 });
}

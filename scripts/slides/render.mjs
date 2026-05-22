#!/usr/bin/env node
/**
 * Renders all slide HTML files in scripts/slides/<deck>/ to PNGs in
 * public/cases/<deck>/ (or an explicit output path under public/cases/).
 *
 *   node scripts/slides/render.mjs balvoi
 *   node scripts/slides/render.mjs xy-protocols "xy-ecosystem/2 XY Protocols"
 *
 * File-name convention:
 *   00-cover.html      → Cover.png
 *   01-brand.html      → 1.png
 *   02-reader.html     → 2.png
 *   ...
 */

import puppeteer from 'puppeteer';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');

const deck = process.argv[2];
const outSubpath = process.argv[3] ?? deck;
if (!deck) {
  console.error('Usage: node scripts/slides/render.mjs <deck> [outSubpath]');
  process.exit(1);
}

const slidesDir = path.join(__dirname, deck);
const outDir = path.join(repoRoot, 'public', 'cases', outSubpath);

const files = (await readdir(slidesDir))
  .filter((f) => /^\d{2}-[\w-]+\.html$/.test(f))
  .sort();

if (files.length === 0) {
  console.error(`No slide files found in ${slidesDir}`);
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

console.log(`Rendering ${files.length} slides for "${deck}"...`);
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });

for (const file of files) {
  const url = `file://${path.join(slidesDir, file)}`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 });
  // Wait an extra beat for fonts to settle (Google Fonts can race)
  await new Promise((r) => setTimeout(r, 500));

  // 00-cover → Cover.png, 01-brand → 1.png, 11-closing → 11.png
  const m = file.match(/^(\d{2})-([\w-]+)\.html$/);
  const idx = parseInt(m[1], 10);
  const outName = idx === 0 ? 'Cover.png' : `${idx}.png`;
  const outPath = path.join(outDir, outName);

  await page.screenshot({ path: outPath, type: 'png' });
  const rel = path.relative(repoRoot, outPath);
  console.log(`  ✓ ${file.padEnd(22)} → ${rel}`);
}

await browser.close();
console.log(`\nDone. ${files.length} slides written to ${path.relative(repoRoot, outDir)}/`);

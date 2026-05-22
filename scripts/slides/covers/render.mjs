#!/usr/bin/env node
/**
 * Renders each cover HTML in scripts/slides/covers/ to a specific destination
 * path under public/cases/. Mapping declared below.
 *
 *   node scripts/slides/covers/render.mjs
 */

import puppeteer from 'puppeteer';
import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..', '..');
const cases = path.join(repoRoot, 'public', 'cases');

// One HTML cover may map to multiple destination files (e.g. Ineed has two tab
// subfolders that should both show the same generated cover).
const TARGETS = [
  { html: 'aihive.html',          out: ['aihive/Cover.png'] },
  { html: 'dispatch-center.html', out: ['dispatch-center/Cover.png'] },
  { html: 'ineed.html',           out: ['ineed/First Version/Cover.png', 'ineed/Release Version/Cover.png'] },
  { html: 'nexwave.html',         out: ['nexwave/Cover.png'] },
  { html: 'razer-ui.html',        out: ['razer-ui/Cover.png'] },
  { html: 'xygo.html',            out: ['xy-ecosystem/1 XYGO - WEB3 Lottery/Cover.png'] },
];

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });

for (const { html, out } of TARGETS) {
  const url = `file://${path.join(__dirname, html)}`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 });
  await new Promise((r) => setTimeout(r, 600));

  for (const dest of out) {
    const absDest = path.join(cases, dest);
    await mkdir(path.dirname(absDest), { recursive: true });
    await page.screenshot({ path: absDest, type: 'png' });
    console.log(`  ✓ ${html.padEnd(22)} → ${path.relative(repoRoot, absDest)}`);
  }
}

await browser.close();
console.log(`\nDone. Rendered ${TARGETS.length} covers.`);

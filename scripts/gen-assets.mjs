// One-off asset generator for the Mini-Games covers, using the existing
// GOOGLE_GEMINI_API_KEY (Gemini native image generation). Usage:
//   node scripts/gen-assets.mjs "<prompt>" public/games/<name>.png
import fs from "fs";

const env = fs.readFileSync(".env.local", "utf8");
const key = (env.match(/GOOGLE_GEMINI_API_KEY=(.+)/) || [])[1]?.trim();
if (!key) {
  console.error("No GOOGLE_GEMINI_API_KEY in .env.local");
  process.exit(2);
}

// Try the current image-capable Gemini models in order.
const MODELS = [
  "gemini-2.5-flash-image",
  "gemini-2.5-flash-image-preview",
  "gemini-2.0-flash-preview-image-generation",
];

async function gen(prompt, out) {
  for (const model of MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
    };
    let r;
    try {
      r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.error(model, "fetch failed", String(e).slice(0, 160));
      continue;
    }
    if (!r.ok) {
      console.error(model, r.status, (await r.text()).slice(0, 240));
      continue;
    }
    const j = await r.json();
    const parts = j?.candidates?.[0]?.content?.parts || [];
    const img = parts.find((p) => p.inlineData || p.inline_data);
    const data = img?.inlineData?.data || img?.inline_data?.data;
    if (data) {
      fs.writeFileSync(out, Buffer.from(data, "base64"));
      console.log("OK", model, out, fs.statSync(out).size, "bytes");
      return true;
    }
    console.error(model, "no image part", JSON.stringify(j).slice(0, 240));
  }
  return false;
}

const [, , prompt, out] = process.argv;
if (!prompt || !out) {
  console.error('Usage: node scripts/gen-assets.mjs "<prompt>" <out.png>');
  process.exit(2);
}
gen(prompt, out).then((ok) => process.exit(ok ? 0 : 1));

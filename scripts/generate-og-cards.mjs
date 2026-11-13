/**
 * Renders the 1200x630 social cards for the /work/<slug> pages.
 *
 * These are design artifacts, not part of the build: commit the PNGs and the
 * site keeps building without Chrome. Re-run only when a card's copy or its
 * screenshot changes.
 *
 *   node scripts/generate-og-cards.mjs
 *
 * CHROME_BIN overrides the browser path on a non-macOS machine.
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const OUT_DIR = join(ROOT, "public", "assets", "og");
const TMP_DIR = join(ROOT, ".og-tmp");
const CHROME =
  process.env.CHROME_BIN || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const cards = [
  {
    slug: "hundjager",
    index: "01",
    title: "Hundj\u00e4ger",
    subtitle: "Media stream inspector & download server",
    image: join(ROOT, "public", "assets", "projects", "hundjager.png"),
    fit: "contain",
  },
  {
    slug: "solana-liquidity-stream-tracker",
    index: "02",
    title: "Solana Liquidity Stream Tracker",
    subtitle: "Market-data monitor: async WebSocket to a React ticker",
    image: join(ROOT, "public", "assets", "projects", "tracker-ticker.png"),
    fit: "contain",
  },
  {
    slug: "halo",
    index: "03",
    title: "Halo",
    subtitle: "Non-custodial mutual aid on Base",
    image: join(ROOT, "public", "assets", "projects", "halo.png"),
    fit: "contain",
  },
];

const page = (card) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  @page { size: 1200px 630px; margin: 0; }
  html, body { margin: 0; padding: 0; width: 1200px; height: 630px; }
  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    background:
      radial-gradient(120% 140% at 92% -20%, #12211a 0%, rgba(1,1,3,0) 58%),
      radial-gradient(90% 120% at 100% 120%, #0b1113 0%, rgba(1,1,3,0) 60%),
      #010103;
    color: #e4e4e6;
    overflow: hidden;
    position: relative;
  }
  .grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: linear-gradient(90deg, rgba(0,0,0,0.8), transparent 62%);
  }
  .content { position: absolute; left: 72px; top: 96px; width: 500px; }
  .kicker { margin: 0 0 22px; font-size: 15px; letter-spacing: 0.34em; text-transform: uppercase; color: #8a8c94; }
  .title { margin: 0; font-size: 58px; font-weight: 600; line-height: 1.06; letter-spacing: -0.02em; color: #fff; }
  .subtitle { margin: 22px 0 0; font-size: 23px; line-height: 1.4; color: #a9abb3; }
  .url { position: absolute; left: 72px; bottom: 62px; margin: 0; font-size: 20px; color: #3fb950; letter-spacing: 0.01em; }
  .shot {
    position: absolute; right: 60px; top: 50%; transform: translateY(-50%);
    width: 520px; height: 400px;
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 14px;
    background: #0e0e10;
    overflow: hidden;
    box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  }
  .shot img { width: 100%; height: 100%; object-fit: ${card.fit}; display: block; }
</style>
</head>
<body>
  <div class="grid"></div>
  <div class="content">
    <p class="kicker">Selected work \u2014 ${card.index}</p>
    <h1 class="title">${card.title}</h1>
    <p class="subtitle">${card.subtitle}</p>
  </div>
  <p class="url">devkik.vercel.app/work/${card.slug}</p>
  <div class="shot"><img src="file://${card.image}" alt="" /></div>
</body>
</html>`;

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(TMP_DIR, { recursive: true });

for (const card of cards) {
  const source = join(TMP_DIR, `${card.slug}.html`);
  const target = join(OUT_DIR, `work-${card.slug}.png`);
  writeFileSync(source, page(card), "utf8");
  execFileSync(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=1200,630",
      `--screenshot=${target}`,
      `file://${source}`,
    ],
    { stdio: "ignore" }
  );
  console.log(`wrote ${target}`);
}

rmSync(TMP_DIR, { recursive: true, force: true });
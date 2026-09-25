import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT_DIR = new URL("../.screenshots/", import.meta.url).pathname;
mkdirSync(OUT_DIR, { recursive: true });

const stories = [
  "hud-resource-bars--mind-orbital-hud",
  "hud-resource-bars--body-orbital-hud",
  "hud-resource-bars--body-center-icon-variants",
  "hud-resource-bars--label-motion-variants",
  "hud-resource-bars--both-corners",
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1100, height: 760 } });
for (const id of stories) {
  await page.goto(`http://localhost:6311/iframe.html?id=${id}&viewMode=story`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  const out = `${OUT_DIR}${id}.png`;
  await page.screenshot({ path: out });
  console.log("shot", out);
}
await browser.close();

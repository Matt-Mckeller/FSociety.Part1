/**
 * Captures the screenshots that replace the Web 4 plan's stale images.
 *
 * Run against a dev server: `npm run dev` in one shell, `npm run shots` in
 * another. Kept separate from the build because it needs the site running and
 * a browser — a build should not depend on either.
 *
 * The mapping from these files to the document's image labels lives in
 * IMAGE_REPLACEMENTS in build-docs-index.mjs.
 */
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const APP_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(APP_ROOT, "public/media/docs-shots");
const ORIGIN = process.env.SHOT_ORIGIN ?? "http://localhost:3400";

/** Named for what the capture shows, not for the route it came from. */
const SHOTS = [
  ["4eye-home", "/4eye"],
  ["4eye-profile", "/4eye/appRealm/profile"],
  ["4eye-money", "/4eye/money"],
  ["4eye-sequences", "/4eye/appRealm/map"],
  ["integration-layers", "/integration-layer"],
  ["command-center", "/mounted/command-center"],
  ["symbol-grid", "/mounted/symbol-grid"],
  ["4wing", "/mounted/4wing"],
  ["4wing-pitch", "/mounted/4wing-pitch"],
  ["4wing-brand", "/mounted/4wing-brand"],
  ["expanse-edu", "/mounted/expanse-edu"],
  ["storybook", "/mounted/storybook/index.html"],
];

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  console.error("playwright is not resolvable from this workspace; skipping captures.");
  process.exit(0);
}

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
let ok = 0;

for (const [name, route] of SHOTS) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  try {
    await page.goto(ORIGIN + route, { waitUntil: "networkidle", timeout: 180000 });
    // Animated surfaces need a moment to settle before they photograph well.
    await page.waitForTimeout(5000);
    await page.screenshot({ path: join(OUT, `${name}.png`) });
    ok++;
  } catch (err) {
    console.warn(`  ! ${name}: ${String(err).split("\n")[0].slice(0, 90)}`);
  }
  await page.close();
}

await browser.close();
console.log(`\ndoc screenshots: ${ok} of ${SHOTS.length} captured -> public/media/docs-shots/\n`);

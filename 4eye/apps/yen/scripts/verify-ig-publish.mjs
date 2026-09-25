/**
 * Verify Instagram _publish staging folders have exact platform pixels.
 *
 * Usage: node scripts/verify-ig-publish.mjs [day1]
 */

import { existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const APP_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MEDIA_IG = resolve(APP_ROOT, "../../../Media/Instagram");
const day = process.argv[2] || "day1";
const root = join(MEDIA_IG, "_publish", day);

const EXPECT = {
  "feed-carousel": { width: 1080, height: 1350, label: "IG Feed 4:5" },
  "stories-capture": { width: 1080, height: 1920, label: "IG Story 9:16" },
};

function probe(path) {
  const out = execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=width,height",
      "-of",
      "csv=p=0:s=x",
      path,
    ],
    { encoding: "utf8" },
  ).trim();
  const [w, h] = out.split("x").map(Number);
  return { width: w, height: h };
}

if (!existsSync(root)) {
  console.error(`Missing ${root}`);
  process.exit(1);
}

let failed = 0;
for (const [folder, expect] of Object.entries(EXPECT)) {
  const dir = join(root, folder);
  if (!existsSync(dir)) {
    console.error(`✗ missing ${folder}/`);
    failed++;
    continue;
  }
  const files = readdirSync(dir)
    .filter((f) => /\.jpe?g$/i.test(f))
    .filter((f) => statSync(join(dir, f)).isFile())
    .sort();
  if (!files.length) {
    console.error(`✗ ${folder}/ empty`);
    failed++;
    continue;
  }
  console.log(`\n${folder}/ → ${expect.label} (${expect.width}×${expect.height})`);
  for (const f of files) {
    const dims = probe(join(dir, f));
    const ok = dims.width === expect.width && dims.height === expect.height;
    console.log(`  ${ok ? "✓" : "✗"} ${f}  ${dims.width}×${dims.height}`);
    if (!ok) failed++;
  }
}

if (failed) {
  console.error(`\n${failed} check(s) failed — do not upload.`);
  process.exit(1);
}
console.log(`\nAll clear — ${day} is safe to upload.`);

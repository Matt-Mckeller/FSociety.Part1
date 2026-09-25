/**
 * Crop Media/Instagram masters into exact platform sizes.
 *
 * Source truth stays in Media/Instagram/{_stories,_ready,feed}/.
 * Platform variants land in Media/Instagram/_exports/{platformId}/…
 * VARIATIONS.json tracks every source → variant mapping.
 *
 * Usage:
 *   node scripts/export-platform-media.mjs
 *   node scripts/export-platform-media.mjs --platforms=ig-feed-4x5,ig-story-9x16
 */

import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PROJECTS = resolve(APP_ROOT, "../../..");
const MEDIA_IG = join(PROJECTS, "Media/Instagram");
const OUT_ROOT = join(MEDIA_IG, "_exports");
const PLATFORMS_PATH = join(APP_ROOT, "scripts/data/media-platforms.json");

const IMAGE_RE = /\.(png|jpe?g|webp)$/i;
const SKIP_DIR = new Set([
  "_exports",
  "_backup",
  "_human_backup",
  "_source_notes",
  "Reference",
  "node_modules",
]);

const catalog = JSON.parse(readFileSync(PLATFORMS_PATH, "utf8"));
const platformById = new Map(catalog.platforms.map((p) => [p.id, p]));

function parsePlatformsArg(argv) {
  const flag = argv.find((a) => a.startsWith("--platforms="));
  if (!flag) return catalog.defaultExportPlatforms;
  return flag
    .slice("--platforms=".length)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

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
  const [w, h] = out.split("x").map((n) => Number(n));
  return { width: w, height: h };
}

function detectSourceKind(width, height) {
  for (const kind of catalog.sourceKinds) {
    if (kind.match.width === width && kind.match.height === height) return kind;
  }
  const g = gcd(width, height);
  return {
    id: `custom-${width / g}x${height / g}`,
    label: `${width}×${height}`,
    note: "Unrecognized source size — cropped with cover fit.",
  };
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

function walkImages(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const abs = join(dir, name);
    let st;
    try {
      st = statSync(abs);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      if (SKIP_DIR.has(name) || name.startsWith("_backup") || name.endsWith("_backup")) continue;
      walkImages(abs, acc);
    } else if (st.isFile() && IMAGE_RE.test(name)) {
      acc.push(abs);
    }
  }
  return acc;
}

function relativeSourceKey(abs) {
  return relative(MEDIA_IG, abs).split("\\").join("/");
}

function outPathFor(platformId, sourceRel) {
  const base = sourceRel.replace(/\.[^.]+$/, ".jpg");
  return join(OUT_ROOT, platformId, base);
}

function exportCover(src, dest, width, height) {
  mkdirSync(dirname(dest), { recursive: true });
  const vf = `scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height},setsar=1`;
  execFileSync("ffmpeg", ["-v", "error", "-i", src, "-vf", vf, "-q:v", "2", "-y", dest]);
}

function sizeStatus(source, platform) {
  if (source.width === platform.width && source.height === platform.height) return "exact";
  const sRatio = source.width / source.height;
  const pRatio = platform.width / platform.height;
  if (Math.abs(sRatio - pRatio) < 0.02) return "same-ratio";
  return "needs-crop";
}

const platforms = parsePlatformsArg(process.argv.slice(2))
  .map((id) => platformById.get(id))
  .filter(Boolean);

if (!platforms.length) {
  console.error("No valid platforms. Known:", [...platformById.keys()].join(", "));
  process.exit(1);
}

if (!existsSync(MEDIA_IG)) {
  console.error(`Missing ${MEDIA_IG}`);
  process.exit(1);
}

const roots = ["_stories", "_ready", "feed"].map((d) => join(MEDIA_IG, d));
const sources = roots.flatMap((r) => walkImages(r));

console.log(
  `export-platform-media: ${sources.length} sources → ${platforms.map((p) => p.id).join(", ")}`,
);

rmSync(OUT_ROOT, { recursive: true, force: true });
mkdirSync(OUT_ROOT, { recursive: true });

const variations = {
  generatedAt: new Date().toISOString(),
  platforms: platforms.map((p) => ({
    id: p.id,
    label: p.label,
    width: p.width,
    height: p.height,
    ratio: p.ratio,
  })),
  items: [],
};

let wrote = 0;
let failed = 0;

for (const src of sources) {
  const rel = relativeSourceKey(src);
  let dims;
  try {
    dims = probe(src);
  } catch {
    failed++;
    console.warn(`  ! probe failed: ${rel}`);
    continue;
  }
  const kind = detectSourceKind(dims.width, dims.height);
  const item = {
    source: rel,
    width: dims.width,
    height: dims.height,
    sourceKind: kind.id,
    sourceLabel: kind.label,
    note: kind.note,
    variants: [],
  };

  for (const platform of platforms) {
    const dest = outPathFor(platform.id, rel);
    const status = sizeStatus(dims, platform);
    try {
      if (status === "exact") {
        // Re-encode to jpg at exact size so packs are uniform.
        exportCover(src, dest, platform.width, platform.height);
      } else {
        exportCover(src, dest, platform.width, platform.height);
      }
      wrote++;
      item.variants.push({
        platform: platform.id,
        path: relative(MEDIA_IG, dest).split("\\").join("/"),
        width: platform.width,
        height: platform.height,
        status,
        fit: platform.fit,
      });
    } catch (err) {
      failed++;
      console.warn(`  ! export failed ${rel} → ${platform.id}: ${err.message ?? err}`);
    }
  }

  variations.items.push(item);
}

writeFileSync(join(OUT_ROOT, "VARIATIONS.json"), JSON.stringify(variations, null, 2));
writeFileSync(
  join(OUT_ROOT, "README.md"),
  `# Instagram platform exports

Generated by \`apps/yen/scripts/export-platform-media.mjs\`.

## Why Stories looked wrong

Most masters in \`_stories/\` are **1080×1350 (4:5)** — Instagram **Feed** portrait —
or **1024×1536 (2:3)** AI defaults. Instagram **Stories** need **1080×1920 (9:16)**.

| Folder | Purpose |
|---|---|
| \`ig-feed-4x5/\` | Exact feed / carousel stills |
| \`ig-story-9x16/\` | Exact Stories / Highlights |

See \`VARIATIONS.json\` for per-file source size → variant tracking.

Do not edit these by hand — re-run the script after changing masters.
`,
);

console.log(
  `wrote ${wrote} files under Media/Instagram/_exports/ (${variations.items.length} sources, ${failed} failures)`,
);
console.log(`catalog: ${join(OUT_ROOT, "VARIATIONS.json")}`);

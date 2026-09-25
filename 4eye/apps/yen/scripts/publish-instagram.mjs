/**
 * Publish staged Instagram media via Graph API.
 *
 * BLOCKED until env is set:
 *   IG_USER_ID
 *   IG_ACCESS_TOKEN
 *   IG_IMAGE_BASE_URL  — public HTTPS prefix that serves the staged JPGs
 *
 * Day-1 layout assumed under Media/Instagram/_publish/day1/:
 *   feed-carousel/*.jpg  → one carousel feed post
 *   stories-capture/*.jpg → sequential Stories (media_type=STORIES)
 *
 * Usage:
 *   node scripts/verify-ig-publish.mjs day1
 *   node scripts/publish-instagram.mjs --dry-run
 *   node scripts/publish-instagram.mjs --feed
 *   node scripts/publish-instagram.mjs --stories
 *   node scripts/publish-instagram.mjs --all
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MEDIA_IG = resolve(APP_ROOT, "../../../Media/Instagram");
const DAY = join(MEDIA_IG, "_publish", "day1");

function loadDotEnv() {
  const envPath = join(APP_ROOT, ".env.local");
  const alt = join(APP_ROOT, ".env");
  for (const p of [envPath, alt]) {
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, "utf8").split("\n")) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!m) continue;
      if (process.env[m[1]] == null) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

loadDotEnv();

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const doFeed = args.has("--feed") || args.has("--all");
const doStories = args.has("--stories") || args.has("--all");

if (!doFeed && !doStories) {
  console.log(`Instagram publish helper

Prepare:
  1. node scripts/verify-ig-publish.mjs day1
  2. Host day1 JPGs at a public HTTPS base (GCS / yen media)
  3. Set IG_USER_ID, IG_ACCESS_TOKEN, IG_IMAGE_BASE_URL in apps/yen/.env.local

Run:
  node scripts/publish-instagram.mjs --dry-run --all
  node scripts/publish-instagram.mjs --feed
  node scripts/publish-instagram.mjs --stories
`);
  process.exit(0);
}

const IG_USER_ID = process.env.IG_USER_ID;
const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;
const IG_IMAGE_BASE_URL = (process.env.IG_IMAGE_BASE_URL || "").replace(/\/$/, "");
const API = process.env.IG_GRAPH_HOST || "https://graph.facebook.com/v21.0";

function listJpgs(dir) {
  return readdirSync(dir)
    .filter((f) => /\.jpe?g$/i.test(f))
    .filter((f) => statSync(join(dir, f)).isFile())
    .sort();
}

async function graph(path, params = {}, method = "POST") {
  const url = new URL(`${API}${path}`);
  const body = new URLSearchParams({ ...params, access_token: IG_ACCESS_TOKEN });
  if (method === "GET") {
    for (const [k, v] of body) url.searchParams.set(k, v);
    const res = await fetch(url);
    const json = await res.json();
    if (!res.ok || json.error) throw new Error(JSON.stringify(json.error || json));
    return json;
  }
  const res = await fetch(url, { method, body });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(JSON.stringify(json.error || json));
  return json;
}

async function waitFinished(creationId) {
  for (let i = 0; i < 30; i++) {
    const st = await graph(`/${creationId}`, { fields: "status_code" }, "GET");
    if (st.status_code === "FINISHED") return;
    if (st.status_code === "ERROR") throw new Error(`container ${creationId} ERROR`);
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error(`container ${creationId} timed out`);
}

async function publishFeedCarousel() {
  const dir = join(DAY, "feed-carousel");
  const files = listJpgs(dir);
  if (files.length < 2) throw new Error("feed-carousel needs ≥2 images");

  const captionPath = join(DAY, "CAPTION.txt");
  const caption = existsSync(captionPath) ? readFileSync(captionPath, "utf8").trim() : "";

  const children = [];
  for (const f of files) {
    const image_url = `${IG_IMAGE_BASE_URL}/feed-carousel/${f}`;
    console.log(`  container ${f} ← ${image_url}`);
    if (dryRun) {
      children.push(`dry-${f}`);
      continue;
    }
    const created = await graph(`/${IG_USER_ID}/media`, {
      image_url,
      is_carousel_item: "true",
    });
    await waitFinished(created.id);
    children.push(created.id);
  }

  console.log(`  parent carousel (${children.length} children)`);
  if (dryRun) {
    console.log("  dry-run: skip publish");
    return;
  }
  const parent = await graph(`/${IG_USER_ID}/media`, {
    media_type: "CAROUSEL",
    children: children.join(","),
    caption,
  });
  await waitFinished(parent.id);
  const pub = await graph(`/${IG_USER_ID}/media_publish`, { creation_id: parent.id });
  console.log(`  published feed id=${pub.id}`);
}

async function publishStories() {
  const dir = join(DAY, "stories-capture");
  const files = listJpgs(dir);
  for (const f of files) {
    const image_url = `${IG_IMAGE_BASE_URL}/stories-capture/${f}`;
    console.log(`  story ${f} ← ${image_url}`);
    if (dryRun) continue;
    const created = await graph(`/${IG_USER_ID}/media`, {
      image_url,
      media_type: "STORIES",
    });
    await waitFinished(created.id);
    const pub = await graph(`/${IG_USER_ID}/media_publish`, { creation_id: created.id });
    console.log(`  published story id=${pub.id}`);
    // Gentle pacing — IG rate limits + story order
    await new Promise((r) => setTimeout(r, 1500));
  }
}

if (!dryRun) {
  const missing = ["IG_USER_ID", "IG_ACCESS_TOKEN", "IG_IMAGE_BASE_URL"].filter(
    (k) => !process.env[k],
  );
  if (missing.length) {
    console.error(
      `Cannot publish — missing ${missing.join(", ")}.\n` +
        `Add them to apps/yen/.env.local, host day1 images publicly, then re-run.\n` +
        `For now: upload manually from Media/Instagram/_publish/day1/ (Finder).`,
    );
    process.exit(1);
  }
}

console.log(dryRun ? "DRY RUN" : "LIVE PUBLISH");
if (doFeed) {
  console.log("\nFeed carousel");
  await publishFeedCarousel();
}
if (doStories) {
  console.log("\nStories");
  await publishStories();
}
console.log("\nDone.");

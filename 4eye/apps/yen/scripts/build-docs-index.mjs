/**
 * Docs build step. Run before `next build`.
 *
 * Scans the documentation sources scattered across ~/Projects, converts each
 * markdown file to HTML, and writes:
 *
 *   src/generated/docs-index.json   collection + document metadata
 *   src/generated/docs/<slug>.html  one rendered body per document
 *
 * Markdown is converted here rather than in the app so no markdown library ever
 * reaches the browser — the doc pages ship as plain prerendered HTML.
 *
 * Sources live in sibling repositories. Any that are missing are skipped with a
 * warning rather than failing the build, so the site still builds on a machine
 * that only has this repo checked out.
 */

import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const APP_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PROJECTS = resolve(APP_ROOT, "../../..");
const OUT_DIR = join(APP_ROOT, "src/generated");
const HTML_DIR = join(OUT_DIR, "docs");
const PUBLIC_DIR = join(APP_ROOT, "public");
const IMG_DIR = join(PUBLIC_DIR, "media/docs");
const FILE_DIR = join(PUBLIC_DIR, "media/files");

/*
  `npm run dev` sets this so a warm machine does not re-walk fourteen doc
  trees and reconvert 500 markdown files before Next can bind the port.
  Missing output still generates — skip is a cache hit, not a license to
  boot a docs site with no index. `npm run docs` / `npm run build` leave
  it unset and always rebuild.
*/
if (process.env.SKIP_DOCS_INDEX === "1") {
  const indexPath = join(OUT_DIR, "docs-index.json");
  if (existsSync(indexPath) && existsSync(HTML_DIR)) {
    console.log("docs index: skipped (already generated)\n");
    process.exit(0);
  }
  console.warn("docs index: skip requested but output missing, generating");
}

/**
 * `status` mirrors the plan's staleness vocabulary:
 *   current    — maintained
 *   superseded — later work improved on it, details still useful
 *   archive    — kept for the record
 *
 * Collection authority — which feeds the per-document score — lives in
 * COLLECTION_WEIGHT below rather than inline here, so this list stays about
 * where files come from and scoring policy stays in one readable block.
 */
const SOURCES = [
  {
    id: "expanse-edu",
    title: "Expanse EDU",
    blurb: "The education product: research, positioning, curriculum and operations.",
    dir: "ExpanseFrontend/Expanse-Edu-Docs",
    status: "current",
    accent: "#0ea5e9",
  },
  {
    id: "4up",
    title: "4up",
    blurb: "Multi-business operations — data architecture, business details, build notes.",
    dirs: ["ExpanseFrontend/apps/4up/docs", "ExpanseFrontend/apps/4up/plans"],
    files: [
      "ExpanseFrontend/apps/4up/plan-4up-business-details.md",
      "ExpanseFrontend/apps/4up/plan-master-current.md",
      "ExpanseFrontend/apps/4up/notes-from-build.md",
      "ExpanseFrontend/docs/planning/4up-multi-business-data-architecture.md",
      "ExpanseFrontend/docs/planning/4up-storybook-migration-plan.md",
    ],
    status: "current",
    accent: "#f59e0b",
  },
  {
    id: "technical",
    title: "Technical",
    blurb: "HUD specification, display and theming.",
    dir: "4eyeWebPlan/Technical Documentation",
    status: "current",
    accent: "#7c3aed",
  },
  {
    id: "implementation",
    title: "Implementation plans",
    blurb: "How the 4eye web surface was planned and sequenced.",
    dir: "4eyeWebPlan/_Implementation_plans",
    status: "current",
    accent: "#14b8a6",
  },
  {
    id: "lottie",
    title: "Lottie",
    blurb: "The animation system: naming, theming and the product plan.",
    files: [
      "ExpanseFrontend/plans/lottie-plan.md",
      "ExpanseFrontend/plans/LottieAnimationProductPlan.md",
    ],
    status: "current",
    accent: "#ef4444",
  },
  {
    id: "roadmap",
    title: "Roadmap",
    blurb:
      "The coded build plan — core platform, infrastructure, features and surfaces, each with its own status.",
    dir: "4eye/_current/planning_Project_4eye/plans",
    status: "current",
    accent: "#8b5cf6",
  },
  {
    id: "web4",
    title: "Web 4",
    blurb:
      "The current plan for the whole thing, and the script for the site presentation: vision, spatial navigation, the integration layers, every app, and the story running underneath. Its screenshots have fallen behind the build — the thinking has not.",
    files: [
      "Planning/other_dated_documentation/Web 4 + Projects + _Story(#WhoAmI-_#WhoAreWe).md",
      "Planning/other_dated_documentation/Emotion.Inspect - Anger (HealthCare Food Tools Choice).md",
    ],
    status: "current",
    accent: "#7c3aed",
  },
  {
    id: "active-plans",
    title: "Active plans",
    blurb:
      "The plans actually being worked on right now — profile layout and information architecture, the layers fix, contrast and docs cleanups.",
    dir: "Planning/projects/_active-plans",
    status: "current",
    accent: "#22c55e",
  },
  {
    id: "product-plans",
    title: "Product plans",
    blurb:
      "The 4eye web plan by area: marketing, gamification, knowledge base, security and privacy, the home page, and the planning process itself.",
    dirs: [
      "4eyeWebPlan/Marketing",
      "4eyeWebPlan/_PlanMetaData_Product Documentation & Plans",
      /*
        `4eyeWebPlan/Hidden` was here. A directory whose name says it is not for
        reading does not belong in a publish pipeline, whatever is in it today —
        the contents can change without anyone re-checking this list.
      */
      "4eyeWebPlan/Gamification",
      "4eyeWebPlan/Knowledge Base",
      "4eyeWebPlan/Home Page & Highlights",
      "4eyeWebPlan/Security & Privacy",
      "4eyeWebPlan/Learning & Content",
    ],
    status: "current",
    accent: "#e11d48",
  },
  {
    id: "frontend-planning",
    title: "Frontend planning",
    blurb:
      "Plans for the applications themselves — command center, expanse services, lottie studio, onboarding, logo and component work.",
    dir: "ExpanseFrontend/docs/planning",
    /*
      Personal bank/credit mockup figures lived in this plan. Moved to
      `_private-redaction/finance/personal-accounts/` on 2026-08-10. Keep the
      filename excluded so a restore cannot re-enter the public docs index.
    */
    exclude: ["financials-page-layout-improvement.md"],
    status: "current",
    accent: "#6366f1",
  },
  {
    id: "milestones",
    title: "2026 roadmap",
    blurb:
      "Milestones, quarterly plans, features and process notes for 2026.",
    dir: "Planning/roadmap",
    /*
      Both directories were moved to `_private-redaction/personal/roadmap-2026/`
      on 2026-08-06, so this rule currently matches nothing. It stays as a guard:
      if that material is ever restored here, it must not reach the site as a
      side effect of pointing the indexer at a parent directory.
    */
    exclude: ["Stories", "PersonStoryline"],
    status: "current",
    accent: "#0d9488",
  },
  {
    id: "strategy",
    title: "Strategy",
    blurb: "Brand, design system and positioning work.",
    dir: "Planning/strategy",
    status: "current",
    accent: "#c026d3",
  },
  {
    id: "4ear",
    title: "4ear",
    blurb:
      "The audio product — speaker feedback, recaps and pricing. Planned, and not represented anywhere else on this site.",
    dir: "4ear/plans",
    status: "current",
    accent: "#ea580c",
  },
  {
    id: "archive",
    title: "Archive",
    blurb:
      "Earlier documentation, kept for the record. Later work has improved on much of this, but the detail here is still worth reading.",
    dir: "Planning/other_dated_documentation",
    /*
      The Web 4 plan physically lives in this folder but is not archive material
      — it is the current plan, and it has its own collection above. Both the
      markdown and the .docx it was exported from are excluded here so it is not
      listed twice, once correctly and once as out of date.
    */
    exclude: [
      "Web 4 + Projects + _Story(#WhoAmI-_#WhoAreWe).md",
      "Web 4 + Projects + _Story(#WhoAmI-_#WhoAreWe).docx",
    ],
    status: "archive",
    accent: "#94a3b8",
  },
];

const SKIP_DIRS = new Set(["node_modules", ".git", ".next", "dist", "build"]);

/* ------------------------------------------------------------------ scoring */

/**
 * Collection authority, 0–1.
 *
 * One question: if two documents were otherwise identical, which collection
 * would you rather the reader landed in? The Web 4 plan and the plans actually
 * being worked on rank highest. The archive ranks lowest — calling something
 * archive is precisely a statement that newer work exists.
 *
 * Unlisted collections score 0.5, so adding a source without touching this
 * gives it a neutral standing rather than accidentally burying it.
 */
const COLLECTION_WEIGHT = {
  web4: 1.0,
  "active-plans": 0.95,
  roadmap: 0.85,
  "expanse-edu": 0.8,
  technical: 0.75,
  strategy: 0.7,
  "product-plans": 0.7,
  "4up": 0.65,
  "frontend-planning": 0.65,
  implementation: 0.6,
  lottie: 0.6,
  milestones: 0.6,
  "4ear": 0.55,
  archive: 0.2,
};

/** How much a document's own declared state counts for it. */
const STATE_VALUE = {
  complete: 1,
  "in-progress": 0.95,
  ready: 0.85,
  partial: 0.7,
  planned: 0.55,
  draft: 0.45,
  other: 0.4,
  "not-planned": 0.2,
  superseded: 0.1,
};

/**
 * Subjects, for filtering and for ranking within a topic.
 *
 * A near-twin of TAG_VOCABULARY in `@yen/content/media`, and deliberately a
 * separate copy rather than a shared import: that module is TypeScript compiled
 * into the browser bundle, this is a Node build script, and the only ways to
 * share one literal across that boundary are a build step for the build step or
 * a stub `.d.ts`. Both cost more than sixteen lines. If a subject is added to
 * one, add it to the other.
 */
const TOPIC_VOCABULARY = [
  { topic: "Web 4", terms: ["web 4", "web4", "spatial", "minimap", "mini-map"] },
  { topic: "Architecture", terms: ["architecture", "schema", "data model", "monorepo", "package", "packages"] },
  { topic: "Navigation", terms: ["navigation", "nav", "grid", "keypad", "tile", "symbol grid", "wayfinding"] },
  { topic: "Gamification", terms: ["gamification", "xp", "quest", "quests", "reward", "rewards", "leaderboard", "currency", "coins"] },
  { topic: "Learning", terms: ["learning", "curriculum", "lesson", "lessons", "classroom", "homework", "teacher", "student"] },
  { topic: "AI", terms: ["ai", "llm", "agent", "agents", "prompt", "prompts", "model", "inference"] },
  { topic: "Profile", terms: ["profile", "profiles", "identity", "identities", "character", "persona", "personas"] },
  { topic: "Design system", terms: ["design system", "theme", "theming", "tokens", "typography", "palette", "brand"] },
  { topic: "Infrastructure", terms: ["infrastructure", "deployment", "deploy", "kubernetes", "docker", "ci", "pipeline"] },
  { topic: "Security", terms: ["security", "privacy", "auth", "authentication", "authorization", "secrets", "gdpr"] },
  { topic: "Business", terms: ["pricing", "revenue", "market", "investor", "business", "financial", "cost", "costs"] },
  { topic: "Marketing", terms: ["marketing", "campaign", "positioning", "audience", "funnel", "seo"] },
  { topic: "Mental health", terms: ["mental health", "counselling", "counseling", "therapy", "trauma", "healing", "anxiety", "depression"] },
  { topic: "Animation", terms: ["lottie", "animation", "animations", "animated", "motion"] },
  { topic: "Process", terms: ["process", "workflow", "roadmap", "milestone", "milestones", "sprint", "planning"] },
];

/** Whole-word, case-insensitive, punctuation-tolerant. */
function mentions(haystack, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}([^\\p{L}\\p{N}]|$)`, "iu").test(haystack);
}

/**
 * Subjects for one document, from its title and headings only.
 *
 * Headings rather than the whole body on purpose: a 4,000-word plan mentions
 * nearly every term in the vocabulary somewhere, so scanning the body tags
 * everything with everything and the filter stops separating anything. What a
 * document puts in its headings is what it is actually about.
 */
/**
 * Capped at five, strongest first.
 *
 * Uncapped, the Web 4 plan came out with thirteen — which is defensible as a
 * description and useless as a filter, because a document in every bucket
 * separates nothing. Ranking by how many distinct terms hit keeps the subjects
 * a document keeps returning to and drops the ones it mentions once.
 */
const MAX_TOPICS = 5;

function topicsOf(md, title) {
  const headings = md.match(/^#{1,3}\s+.+$/gm) ?? [];
  /* The title counts twice: it is the strongest statement of subject there is. */
  const haystack = [title, title, ...headings].join(" \n ");

  return TOPIC_VOCABULARY.map((v) => ({
    topic: v.topic,
    hits: v.terms.filter((t) => mentions(haystack, t)).length,
  }))
    .filter((v) => v.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, MAX_TOPICS)
    .map((v) => v.topic);
}

/**
 * Gives every heading an `id`, so sections can be linked to.
 *
 * Done to the rendered HTML rather than through a marked renderer on purpose:
 * marked's renderer signature has changed shape three times across the versions
 * these scripts have run on (positional args, then token objects), and a
 * post-pass over output we generate ourselves cannot break when it changes
 * again. The ids are the same slugs `slugify` produces everywhere else, so a
 * link written by hand against a heading's text resolves.
 *
 * Duplicates get a numeric suffix — several plans use "Overview" twice — and
 * the first occurrence keeps the bare slug so existing links stay pointed at
 * the section a reader would expect.
 */
function addHeadingIds(html) {
  const used = new Map();
  return html.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (all, level, inner) => {
    const text = inner.replace(/<[^>]*>/g, "").trim();
    const base = slugify(text);
    if (!base) return all;
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    const id = n === 0 ? base : `${base}-${n + 1}`;
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
}

/** Days since a timestamp. */
const daysSince = (ms) => (Date.now() - ms) / 86_400_000;

function ageBandOf(days) {
  if (days < 30) return "fresh";
  if (days < 90) return "recent";
  if (days < 365) return "aging";
  return "old";
}

/**
 * A document's score, 0–100.
 *
 * Five weighted parts, all normalised to 0–1 first so the weights are the only
 * thing that expresses priority:
 *
 *   substance 0.30  length, log-scaled — a 4,000-word plan tops out, and the
 *                   curve is steep early so a 300-word note is not scored as
 *                   near-worthless, just lower
 *   freshness 0.25  decays to zero over 18 months
 *   authority 0.20  the collection's own weight
 *   state     0.15  what the document declares about itself
 *   linkage   0.10  how many other indexed documents link to it
 *
 * The number is a reading order, not a quality judgement, and the page says so.
 * It exists because 517 documents sorted alphabetically put the Web 4 plan next
 * to a stub with equal weight, which is the same as not ranking at all.
 */
function scoreOf({ words, mtimeMs, weight, planState, inbound }) {
  const substance = Math.min(1, Math.log10(words + 1) / Math.log10(4000));
  const freshness = Math.max(0, 1 - daysSince(mtimeMs) / 548);
  const authority = weight ?? 0.5;
  const state = planState ? (STATE_VALUE[planState] ?? 0.4) : 0.5;
  const linkage = Math.min(1, inbound / 5);

  return Math.round(
    100 * (0.3 * substance + 0.25 * freshness + 0.2 * authority + 0.15 * state + 0.1 * linkage),
  );
}

/*
  Calibrated against the actual spread rather than to round numbers. Across the
  517 documents the scores run 45–90 with a median of 61, so a "low" band cut at
  45 was empty and a "high" band at 70 held the top tenth. These cuts sit near
  the 25th and 90th percentiles, which is what makes the bands mean "unusually
  low for this corpus" and "unusually high" rather than "below average".
*/
const scoreBandOf = (score) => (score >= 74 ? "high" : score >= 58 ? "mid" : "low");

/**
 * Every document this one links to, as lowercased basenames.
 *
 * Used to build the inbound-link counts that feed `linkage`. Basenames rather
 * than resolved paths because these documents live in a dozen repositories and
 * link to each other with relative paths that were correct where they were
 * written and are not resolvable from here.
 */
function outboundLinks(md) {
  const hrefs = [...md.matchAll(/\]\(([^)\s]+)/g)].map((m) => m[1]);
  return hrefs
    .filter((h) => /\.(md|markdown)$/i.test(h))
    .map((h) => basename(h, extname(h)).toLowerCase());
}

/**
 * Binary documents cleared for publication, by exact title.
 *
 * An allowlist, and deliberately not a denylist. The same folders hold a
 * shareholder agreement, an invoice, a client list, sales leads, and follow-up
 * notes naming individuals at Goldman Sachs and LG. Publishing by default and
 * subtracting the sensitive ones fails open — one new file in a scanned folder
 * and it is public. This fails closed: a document is listed and downloadable
 * only once it appears here.
 *
 * Titles absent from this list are dropped from the index entirely rather than
 * shown without a link, because a title is itself a disclosure — "Larry Mai
 * Goldman Sachs Follow-up" tells a reader who you are talking to.
 */
const PUBLIC_BINARIES = new Set([
  // Decks that say on their face that sensitive material was removed.
  "10 Min Sample Expanse EDU Pitch Deck - Sensitive Info Omitted",
  "Copy of 10 Min Sample Expanse EDU Pitch Deck - Sensitive Info Omitted ",
  // Positioning and product, written to be read by outsiders.
  "Expanse EDU High Level Overview",
  "Mission Vision Values",
  "Quick Pitch ( 1 Sentence and 60 Seconds )",
  "What - Product Description",
  "What - Product Description 2",
  "Product Offering_ Development Services",
  "Product Offerings_ Types of Documentation",
  "Personas",
  "MVP",
  "Website Content",
  "Why and Home Content",
  // Essays already written for publication.
  "Truly Agile Development - Why hourly pay is a thing of the past",
  "Schneiderman’s 8th Rule for #ux_ Reduce Short-Term Memory Load",
]);

function walk(dir, acc = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    if (entry.name.startsWith(".") || SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function fromFilename(file) {
  const name = basename(file, extname(file)).replace(/[-_]+/g, " ").trim();
  return name.replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * First markdown heading, else the filename.
 *
 * Several source documents were started from a template and still carry an
 * unfilled `# [Risk Title]` placeholder as their first heading. Those fall back
 * to the filename, which is always more informative than the placeholder.
 */
/**
 * Roadmap plans carry a code (`# C5 — AI Provider Abstraction Layer`) and a
 * declared status (`**Status:** Planned`). Both are pulled out so the extension
 * page can group and label them without restating anything.
 */
/**
 * Normalised buckets for the declared status, so the UI can colour and filter
 * without matching on free text. The declared string is kept alongside for
 * display — several plans say something more specific than the bucket does.
 */
function planStateOf(raw) {
  if (!raw) return null;
  // Plans decorate status with ticks and flags; the words carry the meaning.
  const s = raw.toLowerCase().replace(/[^\p{L}\p{N}\s—–-]/gu, " ").replace(/\s+/g, " ").trim();
  // Order matters: "Not Started" must not read as started, and a phase marked
  // complete outranks the plan-shaped words around it.
  if (s.startsWith("superseded")) return "superseded";
  if (/\bnot started\b|\bnot yet planned\b|\bnot planned\b/.test(s)) return "not-planned";
  if (/\b(complete|completed|done|fixed|shipped)\b/.test(s)) return "complete";
  if (/\bin progress\b|\bactive\b|\bmostly decided\b|\bunderway\b/.test(s)) return "in-progress";
  if (s.startsWith("partial")) return "partial";
  if (s.startsWith("draft")) return "draft";
  if (/\bready\b/.test(s)) return "ready";
  if (s.startsWith("planned") || s.startsWith("planning")) return "planned";
  return "other";
}

function planMetaOf(md) {
  const code = md.match(/^#\s+([A-Z]\d+)\s+[—-]\s+/m)?.[1] ?? null;
  /*
    Horizontal whitespace only. `\s*` used to run past the end of the line, so a
    plan with an empty status picked up the first bullet of the next section and
    reported "- Generating innovative ideas" as its status.
  */
  const raw = md.match(/\*\*Status:\*\*[^\S\n]*([^\n|*]+)/)?.[1]?.trim() ?? null;
  // Several files write "Planned — Core Infrastructure"; keep the first clause.
  let planStatus = raw ? raw.split("—")[0].trim().replace(/[.,]$/, "") : null;
  // "Superseded by [x.md](./x.md)" should read as prose, not as a broken link.
  if (planStatus) planStatus = planStatus.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").trim();
  // A sentence is a note, not a status. Keep the clause that classifies.
  if (planStatus && planStatus.length > 48) planStatus = planStatus.split(/[.:]/)[0].trim();
  if (planStatus && planStatus.length > 48) planStatus = null;
  return { code, planStatus, planState: planStateOf(planStatus) };
}

function titleOf(md, file) {
  const heading = md.match(/^#\s+(.+)$/m);
  let raw = heading?.[1]?.trim();
  if (!raw || /^\[.*\]$/.test(raw) || raw.length < 3) return fromFilename(file);
  // "C5 — AI Provider Abstraction Layer" displays as the title; the code is
  // carried separately so it can be shown as a badge.
  raw = raw.replace(/^[A-Z]\d+\s+[—-]\s+/, "");
  // Google Docs exports escape punctuation, so "# 1. Web 4" arrives as "1\. Web 4".
  raw = raw.replace(/\\([.\-+*_#()[\]])/g, "$1");
  // A leading section number is scaffolding, not part of the title.
  raw = raw.replace(/^\d+\.\s+/, "");
  return raw;
}

/** First non-heading, non-empty line, trimmed to a summary length. */
function summaryOf(md) {
  const lines = md.split("\n");
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#") || line.startsWith(">") || line.startsWith("---")) continue;
    if (line.startsWith("|") || line.startsWith("```")) continue;
    const plain = line.replace(/[*_`\[\]]/g, "").replace(/\(.*?\)/g, "");
    if (plain.length < 20) continue;
    return plain.length > 180 ? `${plain.slice(0, 177)}…` : plain;
  }
  return "";
}

/**
 * Pulls base64 images out of a document and writes them as files.
 *
 * Documents exported from Google Docs inline every image as a data URI. The Web
 * 4 plan does this 69 times and lands at 3.1 MB — thirty times the next largest
 * page, all of it arriving before the reader sees a word. Extracted, the images
 * become ordinary files the browser fetches lazily and caches separately.
 *
 * Returns the rewritten markdown; the caller does not need to know whether any
 * extraction happened.
 */
/**
 * Repoints links that were written against a local dev server.
 *
 * The plan documents were written while the apps were running on localhost, so
 * they are full of `http://localhost:3341/...` links. Published, those go
 * nowhere. Where the app is now mounted on this site, the link is rewritten to
 * the mount and the deep path is kept — the app's own router resolves it.
 *
 * Ports with no mounted equivalent are left alone rather than pointed somewhere
 * plausible-but-wrong; a visibly local link is more honest than a broken one
 * dressed up as a real destination.
 */
const DEV_PORTS = {
  3341: "/mounted/command-center",
  6311: "/mounted/storybook",
};

function repointDevLinks(md) {
  return md.replace(/https?:\/\/localhost:(\d+)/g, (all, port) => DEV_PORTS[port] ?? all);
}

/**
 * Screenshots that replace the plan's original images.
 *
 * The Web 4 plan's screenshots were taken while the apps were being built and
 * have fallen behind them. These are captured from the running site by
 * `npm run shots`, so the document shows the software as it is now.
 *
 * Keyed by the label the document uses. Only sections whose subject can be
 * screenshotted are listed — the personal photographs, the hand-drawn concepts
 * and the sketches that were never software are left exactly as written.
 */
const IMAGE_REPLACEMENTS = {
  // Profiles, Identities, Agents
  image15: "4eye-profile.png",
  image16: "4eye-profile.png",
  image17: "4eye-profile.png",
  // Currency & xCoins
  image34: "4eye-money.png",
  image35: "4eye-money.png",
  // Layers Overview
  image41: "integration-layers.png",
  // 4eye.AI — The Human AI
  image42: "4eye-home.png",
  // Command Center
  image43: "command-center.png",
  image44: "command-center.png",
  image45: "command-center.png",
  image46: "command-center.png",
  image47: "command-center.png",
  // Symbol Grid
  image50: "symbol-grid.png",
  image51: "symbol-grid.png",
  image52: "symbol-grid.png",
  image53: "symbol-grid.png",
  image54: "symbol-grid.png",
  image55: "symbol-grid.png",
  image56: "symbol-grid.png",
  // 4Wing — counselling
  image67: "4wing.png",
  image68: "4wing.png",
};

function extractInlineImages(md, slug) {
  if (!md.includes("base64,")) return md;

  const dir = join(IMG_DIR, slug.replace("/", "__"));
  let n = 0;

  const rewritten = md.replace(
    /^\[(image\d+)\](:\s*)<data:image\/(png|jpe?g|gif|webp);base64,([A-Za-z0-9+/=\s]+)>/gm,
    (_all, label, sep, ext, b64) => {
      // A replaced image never needs its original decoded or written to disk.
      const shot = IMAGE_REPLACEMENTS[label];
      if (shot) {
        replaced++;
        return `[${label}]${sep}/media/docs-shots/${shot}`;
      }
      if (!n) mkdirSync(dir, { recursive: true });
      n++;
      const file = `${n}.${ext === "jpeg" ? "jpg" : ext}`;
      writeFileSync(join(dir, file), Buffer.from(b64.replace(/\s+/g, ""), "base64"));
      return `[${label}]${sep}/media/docs/${slug.replace("/", "__")}/${file}`;
    },
  );

  if (n) extractedImages += n;
  return rewritten;
}

/*
  Clear only what this script owns. `src/generated` is shared — the photo
  manifest is written there by another step — and removing the whole directory
  deleted a sibling's output whenever this ran on its own.
*/
rmSync(HTML_DIR, { recursive: true, force: true });
rmSync(join(OUT_DIR, "docs-index.json"), { force: true });
rmSync(IMG_DIR, { recursive: true, force: true });
rmSync(FILE_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(HTML_DIR, { recursive: true });
let extractedImages = 0;
let withheldBinaries = 0;
let replaced = 0;

const collections = [];
const seen = new Set();
let total = 0;
let binaries = 0;
/** basename → how many indexed documents link to it. Filled during the scan. */
const inboundLinks = new Map();
/**
 * basename → published slug. Filled during the scan, consumed by the link
 * rewrite afterwards. Basename-keyed for the same reason `outboundLinks` is:
 * these documents came from a dozen repositories and their relative paths were
 * correct where they were written, not from here.
 */
const slugByBasename = new Map();

for (const source of SOURCES) {
  const candidates = [];

  for (const d of source.dirs ?? (source.dir ? [source.dir] : [])) {
    const abs = join(PROJECTS, d);
    if (!existsSync(abs)) {
      console.warn(`  ! missing source, skipped: ${d}`);
      continue;
    }
    let found = walk(abs);
    if (source.exclude?.length) {
      const before = found.length;
      // Matches either a path segment (a directory) or the file's own name.
      found = found.filter((f) => {
        const parts = relative(abs, f).split("/");
        return !source.exclude.some((x) => parts.includes(x) || basename(f) === x);
      });
      console.log(`  · ${source.id}: excluded ${before - found.length} under ${source.exclude.join(", ")}`);
    }
    candidates.push(...found);
  }
  for (const f of source.files ?? []) {
    const abs = join(PROJECTS, f);
    if (existsSync(abs)) candidates.push(abs);
    else console.warn(`  ! missing file, skipped: ${f}`);
  }

  const docs = [];

  for (const file of candidates) {
    const ext = extname(file).toLowerCase();
    const rel = relative(PROJECTS, file);

    /*
      Binary documents cannot render in a browser, so they are offered as
      downloads — but only the ones cleared in PUBLIC_BINARIES. Everything else
      is dropped here and counted, so the number held back stays visible.
    */
    if ([".docx", ".pptx", ".odt", ".xlsx", ".pdf", ".zip"].includes(ext)) {
      const title = basename(file, ext);
      if (!PUBLIC_BINARIES.has(title)) {
        withheldBinaries++;
        continue;
      }
      binaries++;

      const fileName = `${slugify(title)}${ext}`;
      mkdirSync(FILE_DIR, { recursive: true });
      copyFileSync(file, join(FILE_DIR, fileName));

      docs.push({
        slug: null,
        href: `/media/files/${fileName}`,
        title,
        summary: `${ext.slice(1).toUpperCase()} document — ${(statSync(file).size / 1048576).toFixed(1)} MB.`,
        source: rel,
        format: ext.slice(1),
        status: source.status,
        modified: statSync(file).mtime.toISOString().slice(0, 10),
      });
      continue;
    }

    if (ext !== ".md" && ext !== ".markdown") continue;

    const md = readFileSync(file, "utf8");
    if (md.trim().length < 80) continue; // stubs are noise in an index

    const title = titleOf(md, file);
    let slug = `${source.id}/${slugify(basename(file, ext))}`;
    let n = 2;
    while (seen.has(slug)) slug = `${source.id}/${slugify(basename(file, ext))}-${n++}`;
    seen.add(slug);

    const body = repointDevLinks(extractInlineImages(md, slug));
    writeFileSync(
      join(HTML_DIR, `${slug.replace("/", "__")}.html`),
      addHeadingIds(marked.parse(body)),
    );

    /* First writer wins, so a duplicated filename resolves to the higher-weighted
       collection rather than to whichever source happened to be scanned last. */
    const key = basename(file, ext).toLowerCase();
    if (!slugByBasename.has(key)) slugByBasename.set(key, slug);

    /* Counted now, consumed after the scan — a document can be linked to by
       one that has not been read yet, so scoring cannot happen inline. */
    for (const target of new Set(outboundLinks(md))) {
      inboundLinks.set(target, (inboundLinks.get(target) ?? 0) + 1);
    }

    const stat = statSync(file);
    docs.push({
      slug,
      title,
      summary: summaryOf(md),
      source: rel,
      format: "md",
      status: source.status,
      modified: stat.mtime.toISOString().slice(0, 10),
      words: md.split(/\s+/).length,
      topics: topicsOf(md, title),
      /* Kept for the scoring pass below, then removed from the emitted row. */
      _basename: basename(file, ext).toLowerCase(),
      _mtimeMs: stat.mtimeMs,
      _weight: COLLECTION_WEIGHT[source.id] ?? 0.5,
      ...planMetaOf(md),
    });
    total++;
  }

  collections.push({ ...source, dir: undefined, dirs: undefined, files: undefined, docs });
}

/*
  Repoint cross-document links, after every slug is known.

  These documents linked to each other with relative paths — `./foo.md`,
  `../plans/Bar.md` — that were correct in the repository where they were
  written. Published as-is, they 404: 115 of 520 pages carried at least one.
  That is the most visible signal that a corpus was dumped rather than
  published, and unlike the writing itself it is mechanical to fix.

  Two outcomes per link. If the target is a document that also published, the
  href becomes its slug and the link works. If it is not — the target was
  excluded, or lives in a repository that is not scanned — the anchor is
  unwrapped to its own text, which keeps the sentence readable and removes the
  dead end. Nothing is deleted and no text changes.

  Runs as a post-pass over HTML this script generated a moment ago, for the same
  reason `addHeadingIds` does: it cannot be broken by a marked renderer API
  change, and the pattern it matches is one we emit ourselves.
*/
let linksRepointed = 0;
let linksUnwrapped = 0;
let filesTouched = 0;

for (const collection of collections) {
  for (const doc of collection.docs) {
    if (!doc.slug) continue;
    const htmlPath = join(HTML_DIR, `${doc.slug.replace("/", "__")}.html`);
    const before = readFileSync(htmlPath, "utf8");

    const after = before.replace(
      /<a href="([^"]+\.(?:md|markdown))(#[^"]*)?"([^>]*)>([\s\S]*?)<\/a>/gi,
      (all, href, hash = "", attrs, text) => {
        // Absolute URLs happen to end in .md; they are somebody else's page.
        if (/^[a-z]+:\/\//i.test(href)) return all;
        const target = slugByBasename.get(
          decodeURIComponent(basename(href, extname(href))).toLowerCase(),
        );
        if (target) {
          linksRepointed++;
          return `<a href="/docs/${target}${hash}"${attrs}>${text}</a>`;
        }
        linksUnwrapped++;
        return text;
      },
    );

    if (after !== before) {
      writeFileSync(htmlPath, after);
      filesTouched++;
    }
  }
}

console.log(
  `  · links: ${linksRepointed} repointed, ${linksUnwrapped} unwrapped, across ${filesTouched} documents`,
);

/*
  Scoring, after every document has been read.

  It has to be a second pass: `linkage` counts inbound links, and a document can
  be linked to by one the scanner has not reached yet. Sorting moves here too —
  it used to be `title.localeCompare` inside the loop, which put the Web 4 plan
  next to a stub and asked the reader to do the ranking.

  Binary rows have no markdown to score. They keep their place by falling to the
  bottom of their collection rather than being given an invented number.
*/
for (const collection of collections) {
  for (const doc of collection.docs) {
    if (!doc.slug) continue;
    doc.score = scoreOf({
      words: doc.words,
      mtimeMs: doc._mtimeMs,
      weight: doc._weight,
      planState: doc.planState,
      inbound: inboundLinks.get(doc._basename) ?? 0,
    });
    doc.scoreBand = scoreBandOf(doc.score);
    doc.ageBand = ageBandOf(daysSince(doc._mtimeMs));
    delete doc._basename;
    delete doc._mtimeMs;
    delete doc._weight;
  }

  collection.docs.sort(
    (a, b) => (b.score ?? -1) - (a.score ?? -1) || a.title.localeCompare(b.title),
  );
}

/**
 * The highest-scoring documents across every collection.
 *
 * Capped at two per collection before the overall cut. Without that, the four
 * highest-weighted collections filled the entire strip and it stopped being a
 * way in to the whole index — which is the only thing it is for.
 */
const perCollection = new Map();
const topRanked = collections
  .flatMap((c) => c.docs.filter((d) => d.slug).map((d) => ({ ...d, collection: c.id, accent: c.accent })))
  .sort((a, b) => b.score - a.score)
  .filter((d) => {
    const n = perCollection.get(d.collection) ?? 0;
    if (n >= 2) return false;
    perCollection.set(d.collection, n + 1);
    return true;
  })
  .slice(0, 8);

/** Every topic present, with how many documents carry it. */
const topicCounts = new Map();
for (const c of collections) {
  for (const d of c.docs) {
    for (const t of d.topics ?? []) topicCounts.set(t, (topicCounts.get(t) ?? 0) + 1);
  }
}
const topics = [...topicCounts.entries()]
  .sort((a, b) => b[1] - a[1])
  .map(([topic, count]) => ({ topic, count }));

writeFileSync(
  join(OUT_DIR, "docs-index.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), collections, topRanked, topics }, null, 2),
);

/*
  A second, much smaller index for search, written to `public/` rather than
  imported. At this document count the full index is far too heavy to ship to
  the browser, and the search box is not worth a page-load cost to anyone who
  never types in it — the component fetches this on first keystroke.
*/
const searchRows = [];
for (const c of collections) {
  for (const d of c.docs) {
    if (!d.slug) continue;
    searchRows.push([d.slug, d.title, d.summary?.slice(0, 120) ?? "", c.id, d.planState ?? "", d.score ?? 0]);
  }
}
/* Highest first, so a two-character query returns the documents worth reading. */
searchRows.sort((a, b) => b[5] - a[5]);
writeFileSync(
  join(PUBLIC_DIR, "docs-search.json"),
  JSON.stringify({
    fields: ["slug", "title", "summary", "collection", "planState", "score"],
    collections: Object.fromEntries(collections.map((c) => [c.id, c.title])),
    rows: searchRows,
  }),
);

const withStatus = collections.reduce(
  (n, c) => n + c.docs.filter((d) => d.planState).length,
  0,
);

/*
  The curated highlights deep-link into sections of published documents by
  anchor, and those anchors are written by hand. A reworded heading silently
  turns one into a link that lands at the top of a 1,169-line document — which
  looks like it worked. Checked here because this is the only place that knows
  which ids were actually generated.

  Read as text rather than imported: `highlights.ts` is TypeScript compiled for
  the browser, and this is a Node script. A warning rather than a failure, so a
  stale anchor never blocks a build.
*/
function checkHighlightAnchors() {
  const file = resolve(APP_ROOT, "../../packages/@yen/content/src/highlights.ts");
  if (!existsSync(file)) return;

  const src = readFileSync(file, "utf8");
  const doc = join(HTML_DIR, "web4__web-4-projects-story-whoami-whoarewe.html");
  if (!existsSync(doc)) return;

  const ids = new Set(
    [...readFileSync(doc, "utf8").matchAll(/<h[1-6] id="([^"]+)"/g)].map((m) => m[1]),
  );
  const missing = [...src.matchAll(/WEB4\}#([a-z0-9-]+)`/g)]
    .map((m) => m[1])
    .filter((a) => !ids.has(a));

  if (missing.length) {
    console.warn(
      `  ! highlights: ${missing.length} anchor(s) no longer resolve — ${missing.join(", ")}`,
    );
  }
}

checkHighlightAnchors();

const scored = collections.reduce((n, c) => n + c.docs.filter((d) => d.score != null).length, 0);

console.log(
  `\ndocs index: ${total} markdown documents, ${binaries} binary published, ` +
    `${withheldBinaries} binary withheld, ` +
    `${collections.length} collections, ${withStatus} with a declared status -> src/generated/\n` +
    `scoring: ${scored} scored, ${topics.length} topics, top score ${topRanked[0]?.score ?? 0} ` +
    `(${topRanked[0]?.title ?? "—"})\n` +
    (extractedImages
      ? `inline images: ${extractedImages} extracted from data URIs -> public/media/docs/\n`
      : "") +
    (replaced ? `screenshots: ${replaced} stale images replaced with current captures\n` : "") +
    `search index: ${searchRows.length} rows -> public/docs-search.json\n`,
);

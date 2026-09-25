/**
 * Builds the photo library from ~/Projects/Media (+ select yen public packs).
 *
 * Albums are an allowlist, not a directory walk. `Media/` is a working folder:
 * alongside the design work it holds a camera roll of other people's tweets and
 * LinkedIn posts, Twitch streams showing identifiable strangers, third-party
 * artwork with the artist's signature visible, and screenshots of Matthew's own
 * Anthropic account. None of that belongs on a public page, and none of it is
 * distinguishable from the design work by file extension — so albums are named
 * explicitly and everything else is ignored by default.
 *
 * Images are copied out at a web size rather than referenced in place, so the
 * site is self-contained and the originals stay untouched.
 *
 * Album metadata:
 *   nest        growth | personal | vision | design
 *   kind        story | stills | vision | design | export
 *   tags        string[]
 *   exportable  show in Photos → Exports mode
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
const MEDIA = join(PROJECTS, "Media");
const OUT_IMG = join(APP_ROOT, "public/media/photos");
const OUT_JSON = join(APP_ROOT, "src/generated/photos.json");

/*
  Cloud / CI images do not mount ~/Projects/Media. Skip regeneration when asked
  and keep the committed-or-copied `src/generated/photos.json` from the build
  context. `npm run dev` uses the same skip on a warm machine — converting
  300 images through ffmpeg is the dominant cost of `npm run dev` and none of
  it is needed to open the home page.

  If the manifest is missing, skip is ignored so a fresh clone still builds.
*/
if (process.env.SKIP_PHOTO_MANIFEST === "1" && existsSync(OUT_JSON)) {
  console.log("photo library: skipped (already generated)\n");
  process.exit(0);
}
if (process.env.SKIP_PHOTO_MANIFEST === "1") {
  console.warn("photo library: skip requested but photos.json missing, generating");
}
const PLATFORMS_PATH = join(APP_ROOT, "scripts/data/media-platforms.json");
const PLATFORM_CATALOG = existsSync(PLATFORMS_PATH)
  ? JSON.parse(readFileSync(PLATFORMS_PATH, "utf8"))
  : { platforms: [], sourceKinds: [] };

/** Longest edge for web browse copies. Platform export albums keep exact pixels. */
const MAX_EDGE = 1600;

/**
 * `nest` groups albums in the Photos UI rail.
 * Growth/personal/vision lead; design archive sorts below.
 * `root: "app"` resolves `dir` from apps/yen instead of ~/Projects/Media.
 */
const ALBUMS = [
  // —— Growth ——
  {
    id: "capture-sequence",
    dir: "Instagram/feed/carousel_capture",
    title: "Capture sequence",
    nest: "growth",
    kind: "story",
    aspect: "portrait",
    tags: ["ig-ready", "capture", "carousel", "instagram"],
    exportable: true,
    blurb:
      "Now → HUD becoming → red crown → destination. Exact capture moodboard carousel (purple skipped).",
  },
  {
    id: "mirror",
    dir: "Instagram/_stories/09_mirror_lulu_janna",
    title: "Mirror",
    nest: "growth",
    kind: "story",
    aspect: "portrait",
    tags: ["android", "dual", "instagram"],
    exportable: true,
    blurb: "Dual android mirror · explore · expanse · evolved — teal grounded.",
  },
  {
    id: "date-night",
    dir: "Instagram/_stories/10_date_night",
    title: "Date night",
    nest: "growth",
    kind: "story",
    aspect: "portrait",
    tags: ["android", "date", "instagram"],
    exportable: true,
    blurb: "Professional chemistry with android companion — dinner · plaza · lounge · atrium · cafe.",
  },
  {
    id: "lfm",
    dir: "Instagram/_stories/07_lfm_fruit_of_the_future",
    title: "LFM · Fruit of The Future",
    nest: "growth",
    kind: "story",
    aspect: "portrait",
    tags: ["lfm", "brand", "instagram"],
    exportable: true,
    blurb: "Lulu · Janna · Annie brand pack.",
  },
  {
    id: "pick-a-class",
    dir: "Instagram/_stories/02_pick_a_class",
    title: "Pick a class",
    nest: "growth",
    kind: "story",
    aspect: "portrait",
    tags: ["instagram", "class"],
    exportable: true,
    blurb: "Class / weapon variants — Instagram story pack.",
  },
  {
    id: "who-am-i",
    dir: "Instagram/_stories/04_who_am_i",
    title: "Who am I",
    nest: "growth",
    kind: "story",
    aspect: "portrait",
    tags: ["instagram", "identity", "hud"],
    exportable: true,
    blurb: "Serious · think · HUD eyes — identity story pack.",
  },
  {
    id: "desire-variants",
    dir: "Instagram/_stories/05_desire_variants",
    title: "Desire variants",
    nest: "growth",
    kind: "story",
    aspect: "portrait",
    tags: ["instagram", "desire"],
    exportable: true,
    blurb: "Desire crown variants — Instagram story pack.",
  },
  {
    id: "venture-freedom",
    dir: "Instagram/_stories/12_venture_to_freedom",
    title: "Venture → Freedom",
    nest: "growth",
    kind: "story",
    aspect: "portrait",
    tags: ["venture", "freedom", "instagram"],
    exportable: true,
    blurb:
      "Solo dark laptop grind → team → real bank cash → home/yacht → Expanse HQ → tutorial island → schools → stream → spreading joy.",
  },
  {
    id: "heart-evolve-export",
    dir: "public/media/heart-evolve/exports/instagram",
    root: "app",
    title: "Heart.Evolve · IG export",
    nest: "growth",
    kind: "export",
    aspect: "portrait",
    tags: ["ig-ready", "export", "heart-evolve", "instagram"],
    exportable: true,
    blurb: "Publish pack — Now · Becoming · Red crown · Destination.",
  },
  // —— Personal ——
  {
    id: "presence",
    dir: "Instagram/_stories/03_real_presence",
    title: "Real presence",
    nest: "personal",
    kind: "stills",
    aspect: "portrait",
    tags: ["presence", "now", "instagram"],
    exportable: true,
    blurb: "Outdoor · expression · presence · think · fist/cyphertext win.",
  },
  {
    id: "ready-4x5",
    dir: "Instagram/_ready/4x5",
    title: "Ready 4×5",
    nest: "personal",
    kind: "export",
    aspect: "portrait",
    tags: ["ig-ready", "export", "4x5", "instagram"],
    exportable: true,
    platform: "ig-feed-4x5",
    blurb: "IG Feed 4×5 stills (1080×1350). Use Stories export pack for 9:16.",
  },
  {
    id: "future-world",
    dir: "Instagram/_stories/08_future_world",
    title: "Future world",
    nest: "vision",
    kind: "story",
    aspect: "portrait",
    tags: ["instagram", "future", "vision"],
    exportable: true,
    blurb: "Leadership / future kids / stable supported learning.",
  },
  {
    id: "grow-sexy-space",
    dir: "Instagram/_stories/11_grow_sexy_space_flow",
    title: "Grow Sexy · space flow",
    nest: "growth",
    kind: "story",
    aspect: "portrait",
    tags: ["instagram", "capture", "grow"],
    exportable: true,
    blurb: "Exact capture moodboard flow → space (same arc as Capture sequence).",
  },
  // —— Platform-exact exports (from export-platform-media.mjs) ——
  {
    id: "export-ig-feed-4x5",
    dir: "Instagram/_exports/ig-feed-4x5",
    title: "Export · IG Feed 4×5",
    nest: "growth",
    kind: "export",
    aspect: "portrait",
    tags: ["instagram", "export", "ig-feed-4x5", "platform"],
    exportable: true,
    platform: "ig-feed-4x5",
    recursive: true,
    exactSize: true,
    blurb: "Every Instagram master cropped to exact 1080×1350 Feed size.",
  },
  {
    id: "export-ig-story-9x16",
    dir: "Instagram/_exports/ig-story-9x16",
    title: "Export · IG Story 9:16",
    nest: "growth",
    kind: "export",
    aspect: "portrait",
    tags: ["instagram", "export", "ig-story-9x16", "platform"],
    exportable: true,
    platform: "ig-story-9x16",
    recursive: true,
    exactSize: true,
    blurb: "Every Instagram master cropped to exact 1080×1920 Stories size.",
  },
  // —— Vision ——
  {
    id: "expanse-hq",
    dir: "Instagram/_stories/13_expanse_hq",
    title: "Expanse HQ",
    nest: "vision",
    kind: "vision",
    aspect: "portrait",
    tags: ["hq", "expanse", "instagram"],
    exportable: true,
    blurb: "Starship-shaped campus — Expanse on Earth.",
  },
  {
    id: "tutorial-island",
    dir: "Instagram/_stories/14_tutorial_island",
    title: "Tutorial Island",
    nest: "vision",
    kind: "vision",
    aspect: "portrait",
    tags: ["island", "learning", "led", "instagram"],
    exportable: true,
    blurb:
      "Modern open campus — still water, LED trees, homes, interactive learning, automation.",
  },
  {
    id: "learning",
    dir: "Instagram/_stories/06_learning_environments",
    title: "Learning environments",
    nest: "vision",
    kind: "vision",
    aspect: "portrait",
    tags: ["learning", "fulldive", "4wing", "instagram"],
    exportable: true,
    blurb: "Full-dive learning — HUD orbs, screens, projection, 4wing companions.",
  },
  // —— Design archive ——
  {
    id: "symbol-grid",
    dir: "SymbolGrid",
    title: "Symbol Grid",
    nest: "design",
    kind: "design",
    tags: ["ui"],
    exportable: false,
    blurb:
      "The spellbook interface — context panels, spell-casting options, keypad interactivity, and how entities get found and categorised.",
  },
  {
    id: "web4-nav",
    dir: "Web4_Nav_Spatial",
    title: "Web 4 — navigation and space",
    nest: "design",
    kind: "design",
    tags: ["ui", "web4"],
    exportable: false,
    blurb:
      "Spatial navigation studies: map HUD components, the companion robot, resource allocation, documentation and marketing input surfaces.",
  },
  {
    id: "presentation",
    dir: "Presentation_App",
    title: "Presentation app",
    nest: "design",
    kind: "design",
    tags: ["ui"],
    exportable: false,
    blurb:
      "Map styles, minimaps, character decoration, slideshow header rails and home page treatments — including the older versions kept for comparison.",
  },
  {
    id: "4up",
    dir: "4up",
    title: "4up",
    nest: "design",
    kind: "design",
    tags: ["ui", "feedback"],
    exportable: false,
    blurb:
      "AI feedback / guided-editor screens versioned v1–v6 (v6 current: AIGuidedEditor V7 shells), plus content goals and the plans-plus-future-of-work option.",
  },
  {
    id: "4wing",
    dir: "4wings",
    title: "4wing",
    nest: "design",
    kind: "design",
    tags: ["ui", "4wing"],
    exportable: false,
    blurb: "Counsellor support: features, how it works, and the character design.",
  },
  {
    id: "resource-bars",
    dir: "ResourceBars",
    title: "Resource bars",
    nest: "design",
    kind: "design",
    tags: ["ui"],
    exportable: false,
    blurb:
      "The bar that shows an attribute and what is modifying it — layout symmetry, grouping, symbol states and config options.",
  },
  {
    id: "rooms",
    dir: "RoomsOfTomorrow",
    title: "Rooms of tomorrow",
    nest: "design",
    kind: "design",
    tags: ["ui"],
    exportable: false,
    blurb: "Generated room concepts.",
  },
  {
    id: "profile",
    dir: "Profile",
    title: "Profile",
    nest: "design",
    kind: "design",
    tags: ["ui"],
    exportable: false,
    blurb: "Emotion display studies for the character profile.",
  },
  {
    id: "nav",
    dir: "Nav",
    title: "Navigation",
    nest: "design",
    kind: "design",
    tags: ["ui"],
    exportable: false,
    blurb: "Keypad navigation.",
  },
  {
    id: "nesting",
    dir: "Nesting",
    title: "Nesting",
    nest: "design",
    kind: "design",
    tags: ["ui"],
    exportable: false,
    blurb: "Nested layout study.",
  },
  {
    id: "learn-tips",
    dir: "Learn_Tips",
    title: "Learn tips",
    nest: "design",
    kind: "design",
    tags: ["ui"],
    exportable: false,
    blurb: "Image layout reference.",
  },
];

/**
 * Loose files at the top of `Media/` worth publishing. Named individually for
 * the same reason albums are: the rest of that directory is a camera roll.
 */
const LOOSE = [
  ["command-center-nav", "CommandCenterExample_Plus_Nav_Example.png", "Command Center with navigation", "The Command Center surface shown together with the navigation treatment."],
  ["scene-studio", "SceneStudio_Example.png", "Scene Studio", "The storyboard tool: a story broken into scenes — cold open, gift sequence, HUD handoff, engaged classroom, gear accumulation, progress journey, lens transition — each with its own frames."],
  ["edu-coins", "EDU_COINS_EXAMPLE.png", "EDU coins", "The coin treatment for Expanse EDU."],
  ["web4-coins", "Web4CoinsExample.png", "Web 4 coins", "Coins as they appear in the Web 4 surface."],
  ["x-coin", "xCoin.png", "Coin", "A single coin asset."],
  ["edu-talking-points", "EDU_Incremental_Talking_Points_But_Short.png", "EDU talking points", "Incremental talking points for Expanse EDU, in short form."],
  ["reward-slide", "Reward_Example_Slide.png", "Reward slide", "An example reward slide."],
  ["date-night", "DateNightActions.png", "Date night actions", "The date night action set."],
  ["school-notes", "Sample_School_Notes.png", "School notes", "A sample of the school notes format."],
];

const OVERRIDES = {
  "4up_Feedback.png": [
    "Feedback v1 — first panel",
    "Earliest AI feedback capture. Superseded by later revisions; kept in the version branch.",
  ],
  "4up_Feedback2.png": [
    "Feedback v2 — second pass",
    "Richer scoring layout. Branched from v1.",
  ],
  "4up_feedback_varitions_and_transformations.png": [
    "Feedback v3 — variations & transforms",
    "Feedback shown with content variations and transformation options.",
  ],
  "4up_Feedback_v4.png": [
    "Feedback v4 — guided editor",
    "Feedback inside the AI guided editor, before the FeedbackScreens rewrite.",
  ],
  "4up_Feedback_v5_Compare.png": [
    "Feedback v5 — compare all three",
    "Score overview, Section explorer, and Action-first side by side (Storybook Screens/FeedbackScreens). Superseded by v6 editor polish.",
  ],
  "4up_Feedback_v5_A_ScoreOverview.png": [
    "Feedback v5A — Score overview",
    "Glanceable health check: overall score, rings, strengths, top tips.",
  ],
  "4up_Feedback_v5_B_SectionExplorer.png": [
    "Feedback v5B — Section explorer",
    "Deep dive across goals, audience, platforms, tone, tips, themes, pain points.",
  ],
  "4up_Feedback_v5_C_ActionFirst.png": [
    "Feedback v5C — Action-first",
    "Tips drive edits; ratings hidden until revealed.",
  ],
  "4up_Feedback_v6_Compare.png": [
    "Feedback v6 — compare editor shells",
    "Current. AIGuidedEditor V7 shells side by side — Calm Workbench, Focused Write, Character Studio.",
  ],
  "4up_Feedback_v6_A_CalmWorkbench.png": [
    "Feedback v6A — Calm Workbench",
    "Default V7 shell: outlined content-type chips, flat surfaces, FeedbackPanel with view modes.",
  ],
  "4up_Feedback_v6_B_FocusedWrite.png": [
    "Feedback v6B — Focused Write",
    "Setup collapsed; writing surface first; feedback in a drawer.",
  ],
  "4up_Feedback_v6_C_CharacterStudio.png": [
    "Feedback v6C — Character Studio",
    "Same V7 components with grid chrome and mood/energy strip.",
  ],
  "4up_Content_Goals.png": [
    "Content goals",
    "Goal configuration surface used by guided create.",
  ],
  "4up_LinkedIn.png": [
    "LinkedIn preview",
    "Platform preview treatment for LinkedIn.",
  ],
  "4up_Plans+FutureOfWork_Option.png": [
    "Plans + Future of Work option",
    "Plans surface with the Future of Work option highlighted.",
  ],
  "ScreenShot_Wrong_Dimensions.png": [
    "AI integration layers",
    "All eight layers listed together — human, computer, robot, store, neural controller, AR glasses, neural link, and full dive — with the human layer opened to show goals and character profile.",
  ],
  "Screenshot 2026-07-28 at 12.05.02 AM.png": [
    "AI 4 Your Eyes — offerings",
    "The offerings catalog with every modality as its own chip: nonverbal, verbal, auditory, social, visual, semiotic, logic, memory, kinesthetic, recall and in-context.",
  ],
  "Screenshot 2026-07-28 at 4.43.32 AM.png": [
    "Navigation rail — app and profile",
    "The collapsed rail showing the App realm beside the profile control.",
  ],
  "Screenshot 2026-07-28 at 4.43.35 AM.png": [
    "Navigation rail — all three realms",
    "The expanded rail with Website, App and Technical shown as a path, profile at the end.",
  ],
  "Screenshot 2026-08-05 at 3.46.49 AM.png": [
    "Next action card",
    "The next-action prompt running its four steps — pick, prep, run, log — stopped at run: do the action once, start to finish, without stopping to re-plan.",
  ],
  "ChatGPT Image May 22, 2026, 04_52_17 PM (1).png": [
    "Classroom of tomorrow",
    "A student reaching into a floating panel of lenses while a companion robot waits alongside, the rest of the class working behind her.",
  ],
  "ChatGPT Image May 22, 2026, 04_52_17 PM (2).png": [
    "Classroom of tomorrow, second pass",
    "A second generation of the same classroom concept.",
  ],
  "01-now.jpg": ["Now", "Heart.Evolve export — Now slide."],
  "02-becoming.jpg": ["Becoming", "Heart.Evolve export — Becoming / HUD slide."],
  "03-red-crown.jpg": ["Red crown", "Heart.Evolve export — destination desire cue."],
  "04-destination.jpg": ["Destination", "Heart.Evolve export — destination still."],
};

const normalizeName = (s) => s.replace(/[  ]/g, " ");
const OVERRIDE_LOOKUP = new Map(
  Object.entries(OVERRIDES).map(([k, v]) => [normalizeName(k), v]),
);

function toTitle(file) {
  return basename(file, extname(file))
    .replace(/[_]+/g, " ")
    .replace(/\s*\(\d+\)\s*$/, "")
    .replace(/\bv(\d)\b/gi, "v$1")
    .replace(/\s+/g, " ")
    .trim();
}

function convert(src, dest, { exactSize = false } = {}) {
  if (exactSize) {
    // Keep platform pixels — do not downscale export packs.
    execFileSync("ffmpeg", ["-v", "error", "-i", src, "-q:v", "2", "-y", dest]);
    return;
  }
  execFileSync("ffmpeg", [
    "-v", "error",
    "-i", src,
    "-vf", `scale='min(${MAX_EDGE},iw)':-2`,
    "-y", dest,
  ]);
}

function probeDims(path) {
  try {
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
    if (!w || !h) return { width: null, height: null };
    return { width: w, height: h };
  } catch {
    return { width: null, height: null };
  }
}

function detectSourceKind(width, height) {
  if (!width || !height) return null;
  const hit = (PLATFORM_CATALOG.sourceKinds ?? []).find(
    (k) => k.match?.width === width && k.match?.height === height,
  );
  return hit?.id ?? null;
}

function listAlbumFiles(dir, { recursive = false } = {}) {
  if (!recursive) {
    return readdirSync(dir)
      .filter((f) => !f.startsWith(".") && !f.startsWith("_"))
      .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
      .filter((f) => {
        try {
          return statSync(join(dir, f)).isFile();
        } catch {
          return false;
        }
      })
      .sort()
      .map((f) => ({ rel: f, abs: join(dir, f) }));
  }

  const acc = [];
  function walk(cur) {
    for (const name of readdirSync(cur)) {
      if (name.startsWith(".") || name === "VARIATIONS.json" || name === "README.md") continue;
      if (name.startsWith("_backup") || name.endsWith("_backup")) continue;
      const abs = join(cur, name);
      let st;
      try {
        st = statSync(abs);
      } catch {
        continue;
      }
      if (st.isDirectory()) walk(abs);
      else if (st.isFile() && /\.(png|jpe?g|webp|gif)$/i.test(name)) {
        acc.push({ rel: relative(dir, abs).split("\\").join("/"), abs });
      }
    }
  }
  walk(dir);
  return acc.sort((a, b) => a.rel.localeCompare(b.rel));
}

mkdirSync(OUT_IMG, { recursive: true });

const albums = [];
const written = new Set();
let count = 0;
let skipped = 0;
let converted = 0;
let cached = 0;

function addImage(absSrc, id, title, description, outSub, { exactSize = false } = {}) {
  const destName = `${id}.jpg`;
  const dest = join(OUT_IMG, outSub, destName);
  mkdirSync(join(OUT_IMG, outSub), { recursive: true });
  written.add(dest);
  const sourceDims = probeDims(absSrc);
  const destFresh =
    existsSync(dest) && statSync(dest).mtimeMs >= statSync(absSrc).mtimeMs;
  if (!destFresh) {
    try {
      convert(absSrc, dest, { exactSize });
      converted++;
    } catch {
      skipped++;
      return null;
    }
  } else {
    cached++;
  }
  const webDims = exactSize ? sourceDims : probeDims(dest);
  count++;
  return {
    id,
    title,
    description,
    src: `/media/photos/${outSub}/${destName}`,
    width: webDims.width,
    height: webDims.height,
    sourceWidth: sourceDims.width,
    sourceHeight: sourceDims.height,
    sourceKind: detectSourceKind(sourceDims.width, sourceDims.height),
  };
}

for (const album of ALBUMS) {
  const dir =
    album.root === "app" ? join(APP_ROOT, album.dir) : join(MEDIA, album.dir);
  if (!existsSync(dir)) {
    console.warn(`  ! missing album, skipped: ${album.dir}`);
    continue;
  }
  const files = listAlbumFiles(dir, { recursive: Boolean(album.recursive) });
  const photos = [];
  for (const file of files) {
    const stem = file.rel
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
    const id = `${album.id}-${stem}`;
    const baseName = basename(file.rel);
    const [title, description] =
      OVERRIDE_LOOKUP.get(normalizeName(baseName)) ??
      [album.recursive ? file.rel.replace(/\.[^.]+$/, "") : toTitle(baseName), ""];
    const entry = addImage(file.abs, id, title, description, album.id, {
      exactSize: Boolean(album.exactSize),
    });
    if (entry) photos.push(entry);
  }
  if (photos.length) {
    albums.push({
      id: album.id,
      title: album.title,
      blurb: album.blurb,
      nest: album.nest ?? "design",
      kind: album.kind ?? "design",
      aspect: album.aspect ?? "landscape",
      tags: album.tags ?? [],
      exportable: Boolean(album.exportable),
      platform: album.platform ?? null,
      coverId: photos[0]?.id ?? null,
      photos,
    });
  }
}

const loose = [];
for (const [id, file, title, description] of LOOSE) {
  const abs = join(MEDIA, file);
  if (!existsSync(abs)) {
    console.warn(`  ! missing file, skipped: ${file}`);
    continue;
  }
  const entry = addImage(abs, id, title, description, "assorted");
  if (entry) loose.push(entry);
}
if (loose.length) {
  albums.push({
    id: "assorted",
    title: "Assorted",
    blurb: "Individual pieces that do not belong to a set.",
    nest: "design",
    kind: "design",
    aspect: "landscape",
    tags: ["assorted"],
    exportable: false,
    platform: null,
    coverId: loose[0]?.id ?? null,
    photos: loose,
  });
}

const NEST_ORDER = { growth: 0, personal: 1, vision: 2, design: 3 };
albums.sort(
  (a, b) =>
    (NEST_ORDER[a.nest] ?? 9) - (NEST_ORDER[b.nest] ?? 9) ||
    a.title.localeCompare(b.title),
);

function pruneOrphans(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      pruneOrphans(full);
      if (existsSync(full) && readdirSync(full).length === 0) {
        rmSync(full, { recursive: true, force: true });
      }
    } else if (!written.has(full)) {
      rmSync(full, { force: true });
    }
  }
}
pruneOrphans(OUT_IMG);

mkdirSync(dirname(OUT_JSON), { recursive: true });
writeFileSync(
  OUT_JSON,
  JSON.stringify({ generatedAt: new Date().toISOString(), albums }, null, 2),
);

const bytes = albums
  .flatMap((a) => a.photos)
  .reduce((n, p) => n + statSync(join(APP_ROOT, "public", p.src.slice(1))).size, 0);

console.log(
  `photo library: ${count} images (${converted} converted, ${cached} cached) in ${albums.length} albums, ` +
    `${(bytes / 1048576).toFixed(1)} MB -> public/media/photos/` +
    (skipped ? ` (${skipped} failed to convert)` : "") +
    "\n",
);

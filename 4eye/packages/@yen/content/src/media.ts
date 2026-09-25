/**
 * Video and photo manifests.
 *
 * Files are not committed to the repo — drop them in `apps/yen/public/media/`
 * and point `src` at the path. An entry with `src: null` renders as a labelled
 * placeholder rather than a broken player, so the page is presentable before
 * the assets exist.
 *
 * Every entry carries a title and a description. That is deliberate: an
 * uncaptioned library is a folder, and a folder is not worth publishing.
 *
 * ── The vocabulary ────────────────────────────────────────────────────────
 * The library is versioned like source, because that is what it actually is: a
 * recording gets re-cut, re-recorded, translated and commented over, and all of
 * those are the same asset at different points rather than five separate
 * videos. So one metaphor covers the whole page — segments are **branches**,
 * cuts are **versions**, and a recording states which branch it is on and what
 * it descends from. Learning it once buys you the segment rail, the version
 * picker and the branch diagram.
 */

/* ------------------------------------------------------------------ segments */

/**
 * A segment is a branch of the library.
 *
 *   `shorts`   — vertical Phenominal clips cut from the July sessions for social.
 *   `mainline` — the current canonical walkthroughs. What a newcomer should watch.
 *   `origin`   — the July 2026 full-length session recordings, kept as history.
 *   `field`    — captures from the working session; reference, not product.
 */
export type SegmentId = "mainline" | "origin" | "field" | "shorts";

export interface VideoSegment {
  id: SegmentId;
  label: string;
  /** The git-ish ref shown beside the label. Decorative, but consistent. */
  ref: string;
  /** One line on what belongs in this branch. */
  blurb: string;
  /** Segments marked `fresh` get the new section frame. */
  fresh?: boolean;
  /**
   * The branch's own colour.
   *
   * Every segment used to share the page's one accent, which meant the three
   * branches were distinguishable only by reading their headings. A branch is
   * the top-level division of this page; giving each its own hue lets a reader
   * tell where they are while scrolling, and makes the difference between a
   * walkthrough and a reference capture visible before the words are read.
   */
  accent?: string;
}

export const VIDEO_SEGMENTS: VideoSegment[] = [
  {
    id: "shorts",
    label: "Phenominal shorts",
    ref: "shorts/2026-07",
    blurb:
      "Vertical clips from the July Phenominal sessions — education, product, and on-camera. Cut for social; watch these first.",
    fresh: true,
    accent: "#e11d48",
  },
  {
    id: "mainline",
    label: "Walkthroughs",
    ref: "main",
    blurb:
      "Canonical teaching path. Start here — re-cuts, translations and commentary land on this branch.",
    fresh: true,
    accent: "#7c3aed",
  },
  {
    id: "origin",
    label: "Origin session",
    ref: "origin/2026-07",
    blurb:
      "The first session: four recordings made in one night, kept as they were. History, not a draft. Folded by default.",
    accent: "#0891b2",
  },
  {
    id: "field",
    label: "Field / feeds",
    ref: "field/2026-08",
    blurb:
      "Captures from the working session — feeds, streams, searches, beach camera, and app moments. Reference, not product. Folded by default.",
    accent: "#d97706",
  },
];
/* ------------------------------------------------------------------- pieces */

/** A named stretch inside a recording. Times are seconds from the start. */
export interface VideoChapter {
  id: string;
  label: string;
  start: number;
  /** One line on what this stretch covers; shown in the chapter list. */
  note?: string;
}

/** An alternate cut of the same recording. */
export interface VideoVersion {
  /** Semantic-ish label — "v2", "v1.1", "rough". */
  id: string;
  label: string;
  /** Which version this was cut from, or null for the root. */
  parent: string | null;
  /** Branch this cut lives on. */
  segment: SegmentId;
  date?: string;
  /** What changed. The reason the version list is worth having. */
  note: string;
  src: string | null;
  /** The one served by default. Exactly one per entry. */
  current?: boolean;
}

/** A translated or re-voiced edition. */
export interface VideoLanguage {
  /** BCP-47 tag. */
  code: string;
  label: string;
  /** How this edition was produced — it matters to how much you trust it. */
  kind: "original" | "dubbed" | "subtitled";
  src: string | null;
  /** WebVTT track, when the edition is subtitles over the original audio. */
  track?: string | null;
}

/**
 * The talk-over: a second recording of the presenter narrating the first.
 *
 * Kept as its own asset rather than as a version, because it is meant to play
 * *with* the video rather than instead of it — the player opens it in a
 * secondary window and keeps the two clocks in step.
 */
export interface VideoCommentary {
  label: string;
  src: string | null;
  recordedOn?: string;
  /** Seconds to add to the main clock to line the two up. */
  offset?: number;
}

export interface VideoEntry {
  id: string;
  title: string;
  description: string;
  /** Path under /public, or null while the file is outstanding. */
  src: string | null;
  /** Poster image path, optional. */
  poster?: string | null;
  /** Display duration, e.g. "4:12". Optional. */
  duration?: string;
  /**
   * The original filename or folder this came from. Kept because the working
   * names carry judgements the polished title does not — one of these demos is
   * filed as "mediocre" by the person who recorded it.
   */
  filedAs?: string;
  /** Compact pointer to the original recording, e.g. GT@1:30. */
  sourceCode?: string;
  /** Origin video id on /videos to jump to the full session. */
  sourceVideoId?: string;
  /** ISO date the recording was made, when known. */
  recordedOn?: string;

  /** Which branch this sits on. Defaults to `origin` for untagged entries. */
  segment?: SegmentId;
  /** Frame shape. Portrait shorts use 9∶16; everything else is landscape. */
  orientation?: "landscape" | "portrait";
  /** Named stretches, in order. */
  chapters?: VideoChapter[];
  /** Cut history. The last `current: true` entry is what plays. */
  versions?: VideoVersion[];
  /** Editions. The `original` one is the fallback. */
  languages?: VideoLanguage[];
  /** The talk-over recording, when one exists. */
  commentary?: VideoCommentary;
  /**
   * Tags the deriver cannot know — a subject that is discussed but never named
   * in the copy. Merged with, and always ranked above, the derived set.
   */
  pinnedTags?: string[];
}

export interface PhotoEntry {
  id: string;
  title: string;
  description: string;
  src: string | null;
  /** Loose grouping shown as a filter chip. */
  album?: string;
}

/* --------------------------------------------------------------- auto-tagging */

/**
 * Tags are derived, not typed in.
 *
 * A hand-maintained tag list on a growing library is a list that stops being
 * maintained: the fifth video gets tagged carefully, the fifteenth gets
 * whatever the last one had. So tags are computed from the copy that already
 * has to be right — title, description and chapter labels — against a
 * vocabulary of subjects this body of work actually has. The copy is the single
 * source; if a tag is wrong, the description was wrong first.
 *
 * Matching is on whole words, case-insensitively, so "app" does not fire on
 * "happen" and "hud" does not fire on "should". `pinnedTags` exists for the one
 * case derivation cannot cover: a subject that is discussed but never named.
 */
const TAG_VOCABULARY: Array<{ tag: string; terms: string[] }> = [
  { tag: "HUD", terms: ["hud", "heads-up", "overlay"] },
  { tag: "Profile", terms: ["profile", "identity", "identities", "character sheet"] },
  { tag: "Character", terms: ["character", "attributes", "perks", "progression", "titles"] },
  { tag: "Progression", terms: ["xp", "level", "levels", "progression", "reach", "stages"] },
  { tag: "Navigation", terms: ["navigation", "grid", "rail", "realm", "realms", "switcher"] },
  { tag: "Catalog", terms: ["catalog", "catalogue", "offerings", "chips", "filter", "sort", "shuffle"] },
  { tag: "Planning", terms: ["plan", "planning", "roadmap", "projects", "command center"] },
  { tag: "Web 4", terms: ["web 4", "web4"] },
  { tag: "Animation", terms: ["lottie", "lotties", "animation", "animations", "animated"] },
  { tag: "Design system", terms: ["theme", "themed", "tokens", "design system", "naming"] },
  { tag: "On camera", terms: ["camera", "lens", "narrated", "talking", "straight to camera"] },
  { tag: "Learning", terms: ["learn", "learning", "understanding", "memory", "recall", "semiotic"] },
  { tag: "AI", terms: ["ai", "agent", "agents", "ask 4eye", "feedback"] },
  { tag: "Money", terms: ["money", "donate", "pricing", "revenue", "coins", "funding", "sponsor"] },
  { tag: "Walkthrough", terms: ["walkthrough", "walk-through", "read-through", "demo"] },
  { tag: "Education", terms: ["school", "education", "classroom", "student", "students", "homework", "grades"] },
  { tag: "Design", terms: ["shapes", "color", "colour", "ux", "corners", "spatial"] },
  { tag: "Shorts", terms: ["short", "shorts", "phenominal", "clip", "clips"] },
];

/** Whole-word, case-insensitive, punctuation-tolerant. */
function mentions(haystack: string, term: string): boolean {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}([^\\p{L}\\p{N}]|$)`, "iu").test(haystack);
}

/**
 * Derived tags for one entry, pinned ones first, then vocabulary order.
 *
 * Vocabulary order rather than match count: the list is written most-specific
 * first, and a subject mentioned once in a chapter title is usually a better
 * tag than one mentioned four times in passing.
 */
export function videoTags(entry: VideoEntry): string[] {
  const haystack = [
    entry.title,
    entry.description,
    ...(entry.chapters ?? []).flatMap((c) => [c.label, c.note ?? ""]),
  ].join(" \n ");

  const derived = TAG_VOCABULARY.filter((v) => v.terms.some((t) => mentions(haystack, t))).map(
    (v) => v.tag,
  );

  return [...new Set([...(entry.pinnedTags ?? []), ...derived])];
}

/** Every tag present across a set, in vocabulary order — the filter rail. */
export function allVideoTags(entries: VideoEntry[]): string[] {
  const present = new Set(entries.flatMap(videoTags));
  const ordered = TAG_VOCABULARY.map((v) => v.tag).filter((t) => present.has(t));
  const pinnedOnly = [...present].filter((t) => !ordered.includes(t)).sort();
  return [...ordered, ...pinnedOnly];
}

/* ------------------------------------------------------------------ helpers */

export function videosInSegment(entries: VideoEntry[], segment: SegmentId): VideoEntry[] {
  return entries.filter((v) => (v.segment ?? "origin") === segment);
}

/** The cut that should play: the one marked current, else the newest, else `src`. */
export function currentVersion(entry: VideoEntry): VideoVersion | null {
  if (!entry.versions?.length) return null;
  return entry.versions.find((v) => v.current) ?? entry.versions[entry.versions.length - 1];
}

/* ------------------------------------------------------------------- videos */

export const VIDEOS: VideoEntry[] = [
  /* ── shorts (Phenominal, July 2026) ───────────────────────────────────── */

  /*
    Vertical cuts from the same July sessions as `origin`. Titles and hooks come
    from Media/Phenominal/shorts/v2_edited/CUTLIST.json. Files live under
    public/media/videos/shorts/{godtier,future-gov-war,vid3}/.
  */

  /* Godtier — education / rewards */
  {
    id: "short-godtier-01-transform-education",
    title: "Education Needs a Rebuild",
    description: "Work, school, and AI can all level up. Building the systems that make learning actually progress.",
    src: "/media/videos/shorts/godtier/01_transform_education.mp4?v=theme3",
    poster: "/media/posters/shorts/godtier_01_transform_education.png",
    duration: "1:40",
    filedAs: "Phenominal/shorts/v2_edited/godtier/01_transform_education.mp4",
    sourceCode: "GT@1:30",
    sourceVideoId: "4eye-website-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Education", "On camera"],
  },
  {
    id: "short-godtier-02-info-value",
    title: "Your Info Has Ridiculous Value",
    description: "They track you anyway. Take the value back — data should pay into your growth, not just theirs.",
    src: "/media/videos/shorts/godtier/02_info_has_ridiculous_value.mp4?v=theme4",
    poster: "/media/posters/shorts/godtier_02_info_has_ridiculous_value.png",
    duration: "0:50",
    filedAs: "Phenominal/shorts/v2_edited/godtier/02_info_has_ridiculous_value.mp4",
    sourceCode: "GT@12:50",
    sourceVideoId: "4eye-website-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Money", "On camera"],
  },
  {
    id: "short-godtier-03-gotta-go-to-school",
    title: "Nobody Told Me Why School",
    description: "They said go. Never said why. Purpose belongs in the classroom — and in the software.",
    src: "/media/videos/shorts/godtier/03_gotta_go_to_school.mp4?v=theme3",
    poster: "/media/posters/shorts/godtier_03_gotta_go_to_school.png",
    duration: "0:40",
    filedAs: "Phenominal/shorts/v2_edited/godtier/03_gotta_go_to_school.mp4",
    sourceCode: "GT@14:28",
    sourceVideoId: "4eye-website-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Education", "On camera"],
  },
  {
    id: "short-godtier-04-classroom-each-student",
    title: "A Classroom Built for Each Student",
    description: "Autonomy is missing. One classroom per mind isn't a fantasy — it's the product.",
    src: "/media/videos/shorts/godtier/04_classroom_for_each_student.mp4?v=theme3",
    poster: "/media/posters/shorts/godtier_04_classroom_for_each_student.png",
    duration: "1:25",
    filedAs: "Phenominal/shorts/v2_edited/godtier/04_classroom_for_each_student.mp4",
    sourceCode: "GT@15:00",
    sourceVideoId: "4eye-website-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Education", "On camera"],
  },
  {
    id: "short-godtier-05-rewards-map-coins",
    title: "Homework → XP → Coins",
    description: "Finish the quest. Earn the reward. Leaderboards and scores make learning stick.",
    src: "/media/videos/shorts/godtier/05_rewards_map_coins.mp4?v=theme3",
    poster: "/media/posters/shorts/godtier_05_rewards_map_coins.png",
    duration: "0:50",
    filedAs: "Phenominal/shorts/v2_edited/godtier/05_rewards_map_coins.mp4",
    sourceCode: "GT@17:00",
    sourceVideoId: "4eye-website-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Education", "Money", "On camera"],
  },
  {
    id: "short-godtier-06-twelve-grades",
    title: "12 Grades Is Not Progression",
    description: "One number a year isn't a climb. Real progression needs levels, feedback, and goals that move.",
    src: "/media/videos/shorts/godtier/06_twelve_grades_problem.mp4?v=theme3",
    poster: "/media/posters/shorts/godtier_06_twelve_grades_problem.png",
    duration: "0:32",
    filedAs: "Phenominal/shorts/v2_edited/godtier/06_twelve_grades_problem.mp4",
    sourceCode: "GT@14:00",
    sourceVideoId: "4eye-website-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Education", "Progression", "On camera"],
  },
  {
    id: "short-godtier-07-need-builders",
    title: "I Need Builders",
    description: "Education. Code. Anyone chasing unicorn-scale impact on how we learn and work — build with me.",
    src: "/media/videos/shorts/godtier/07_need_builders.mp4?v=theme3",
    poster: "/media/posters/shorts/godtier_07_need_builders.png",
    duration: "0:55",
    filedAs: "Phenominal/shorts/v2_edited/godtier/07_need_builders.mp4",
    sourceCode: "GT@0:00",
    sourceVideoId: "4eye-website-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Money", "On camera"],
  },

  /* Future Gov War — product / HUD / mind */
  {
    id: "short-gov-01-mil-vs-win",
    title: "Winning Beats the Easy Million",
    description: "I climb because growth motivates. Leaderboards. Goals. Unicorn opportunity is room to build Web4 — not the finish line.",
    src: "/media/videos/shorts/future-gov-war/01_1_mil_vs_win.mp4?v=theme3",
    poster: "/media/posters/shorts/gov_01_1_mil_vs_win.png",
    duration: "0:45",
    filedAs: "Phenominal/shorts/v2_edited/future-gov-war/01_1_mil_vs_win.mp4",
    sourceCode: "GV@6:25",
    sourceVideoId: "4eye-app-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Money", "On camera"],
  },
  {
    id: "short-gov-02-shapes-sword",
    title: "Shapes Teach Before Words",
    description: "A sharp triangle already means something. Design teaches before the lesson starts.",
    src: "/media/videos/shorts/future-gov-war/02_shapes_sword_triangle.mp4?v=theme3",
    poster: "/media/posters/shorts/gov_02_shapes_sword_triangle.png",
    duration: "0:55",
    filedAs: "Phenominal/shorts/v2_edited/future-gov-war/02_shapes_sword_triangle.mp4",
    sourceCode: "GV@9:00",
    sourceVideoId: "4eye-app-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Design", "On camera"],
  },
  {
    id: "short-gov-03-invent-government",
    title: "One Person Can Invent a Government",
    description: "The world's changing. Work can too. One builder with the right systems can rewrite the rules.",
    src: "/media/videos/shorts/future-gov-war/03_invent_a_government.mp4?v=theme3",
    poster: "/media/posters/shorts/gov_03_invent_a_government.png",
    duration: "1:05",
    filedAs: "Phenominal/shorts/v2_edited/future-gov-war/03_invent_a_government.mp4",
    sourceCode: "GV@13:00",
    sourceVideoId: "4eye-app-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "On camera"],
  },
  {
    id: "short-gov-04-defense-students",
    title: "Teach Them — And Defend Them",
    description: "Smartest students. Real stakes. Teach hard — and protect the minds you're training.",
    src: "/media/videos/shorts/future-gov-war/04_defense_smart_students.mp4?v=theme3",
    poster: "/media/posters/shorts/gov_04_defense_smart_students.png",
    duration: "0:55",
    filedAs: "Phenominal/shorts/v2_edited/future-gov-war/04_defense_smart_students.mp4",
    sourceCode: "GV@14:45",
    sourceVideoId: "4eye-app-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Education", "On camera"],
  },
  {
    id: "short-gov-05-info-has-power",
    title: "Information Has Power",
    description: "Broke on purpose while holding ideas worth funding. Information is leverage — use it to climb.",
    src: "/media/videos/shorts/future-gov-war/05_info_has_power.mp4?v=theme3",
    poster: "/media/posters/shorts/gov_05_info_has_power.png",
    duration: "0:55",
    filedAs: "Phenominal/shorts/v2_edited/future-gov-war/05_info_has_power.mp4",
    sourceCode: "GV@17:30",
    sourceVideoId: "4eye-app-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Money", "On camera"],
  },
  {
    id: "short-gov-06-evolve-creator",
    title: "Evolve as a Creator",
    description: "Everything kept evolving. I kept needing more tooling to solve bigger problems. Evolve with the work.",
    src: "/media/videos/shorts/future-gov-war/06_evolve_content_creator.mp4?v=theme3",
    poster: "/media/posters/shorts/gov_06_evolve_content_creator.png",
    duration: "0:55",
    filedAs: "Phenominal/shorts/v2_edited/future-gov-war/06_evolve_content_creator.mp4",
    sourceCode: "GV@18:30",
    sourceVideoId: "4eye-app-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "On camera"],
  },
  {
    id: "short-gov-07-spatial-minds",
    title: "Spatial Beats Flat Chat",
    description: "Students are losing navigation of the mind. Spatial UI brings the map back.",
    src: "/media/videos/shorts/future-gov-war/07_spatial_minds.mp4?v=theme3",
    poster: "/media/posters/shorts/gov_07_spatial_minds.png",
    duration: "1:00",
    filedAs: "Phenominal/shorts/v2_edited/future-gov-war/07_spatial_minds.mp4",
    sourceCode: "GV@19:30",
    sourceVideoId: "4eye-app-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Design", "Education", "On camera"],
  },
  {
    id: "short-gov-08-color-attention",
    title: "Color Can Steer Attention",
    description: "If you don't know this, you're already being steered. Color is a control surface — learn it.",
    src: "/media/videos/shorts/future-gov-war/08_color_guides_attention.mp4?v=theme3",
    poster: "/media/posters/shorts/gov_08_color_guides_attention.png",
    duration: "1:10",
    filedAs: "Phenominal/shorts/v2_edited/future-gov-war/08_color_guides_attention.mp4",
    sourceCode: "GV@22:15",
    sourceVideoId: "4eye-app-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Design", "On camera"],
  },
  {
    id: "short-gov-09-ram-of-mind",
    title: "Save RAM in the Mind",
    description: "Simplify the UI. Free brain cycles for the actual lesson. Cognitive RAM is the scarce resource.",
    src: "/media/videos/shorts/future-gov-war/09_ram_of_the_mind.mp4?v=theme3",
    poster: "/media/posters/shorts/gov_09_ram_of_the_mind.png",
    duration: "1:20",
    filedAs: "Phenominal/shorts/v2_edited/future-gov-war/09_ram_of_the_mind.mp4",
    sourceCode: "GV@23:40",
    sourceVideoId: "4eye-app-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Design", "Learning", "On camera"],
  },
  {
    id: "short-gov-10-rewards-not-crypto",
    title: "Rewards Without Forcing Crypto",
    description: "You pick the currency. Rewards should motivate the climb — tools either way.",
    src: "/media/videos/shorts/future-gov-war/10_rewards_not_crypto_by_default.mp4?v=theme3",
    poster: "/media/posters/shorts/gov_10_rewards_not_crypto_by_default.png",
    duration: "1:30",
    filedAs: "Phenominal/shorts/v2_edited/future-gov-war/10_rewards_not_crypto_by_default.mp4",
    sourceCode: "GV@25:00",
    sourceVideoId: "4eye-app-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Money", "On camera"],
  },
  {
    id: "short-gov-11-who-are-you",
    title: "Who Are You — Really?",
    description: "Goals aren't even saved. Character details should stick — know yourself, then level up.",
    src: "/media/videos/shorts/future-gov-war/11_who_are_you.mp4?v=theme3",
    poster: "/media/posters/shorts/gov_11_who_are_you.png",
    duration: "1:15",
    filedAs: "Phenominal/shorts/v2_edited/future-gov-war/11_who_are_you.mp4",
    sourceCode: "GV@29:05",
    sourceVideoId: "4eye-app-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Profile", "On camera"],
  },
  {
    id: "short-gov-12-brain-human-right",
    title: "Knowing Your Brain Is a Human Right",
    description: "You don't need a degree in neuroscience. You need the symbol — and the right to understand your own mind.",
    src: "/media/videos/shorts/future-gov-war/12_brain_is_a_human_right.mp4?v=theme3",
    poster: "/media/posters/shorts/gov_12_brain_is_a_human_right.png",
    duration: "1:48",
    filedAs: "Phenominal/shorts/v2_edited/future-gov-war/12_brain_is_a_human_right.mp4",
    sourceCode: "GV@31:25",
    sourceVideoId: "4eye-app-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Learning", "On camera"],
  },
  {
    id: "short-gov-13-presence-leader",
    title: "Leaders Have Presence",
    description: "Welcome. Inspired. Connected. Trust. Presence is a skill — and a product surface.",
    src: "/media/videos/shorts/future-gov-war/13_presence_of_a_leader.mp4?v=theme3",
    poster: "/media/posters/shorts/gov_13_presence_of_a_leader.png",
    duration: "0:50",
    filedAs: "Phenominal/shorts/v2_edited/future-gov-war/13_presence_of_a_leader.mp4",
    sourceCode: "GV@14:00",
    sourceVideoId: "4eye-app-walkthrough",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "On camera"],
  },

  /* Vid3 — straight to camera */
  {
    id: "short-vid3-01-sponsor-look",
    title: "Who's Sponsoring the Look?",
    description: "Shirts. Makeup. Hair. Built for the ladies too. The look is part of the story — sponsor the climb.",
    src: "/media/videos/shorts/vid3/01_sponsor_the_look.mp4?v=theme3",
    poster: "/media/posters/shorts/vid3_01_sponsor_the_look.png",
    duration: "1:00",
    filedAs: "Phenominal/shorts/v2_edited/vid3/01_sponsor_the_look.mp4",
    sourceCode: "V3@0:00",
    sourceVideoId: "talk-2026-07-15",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Money", "On camera"],
  },
  {
    id: "short-vid3-02-irl-highest-power",
    title: "IRL Is the Highest Level of Power",
    description: "Digital is strong. Live experience hits different. Highest level is still in the room.",
    src: "/media/videos/shorts/vid3/02_irl_is_highest_power.mp4?v=theme3",
    poster: "/media/posters/shorts/vid3_02_irl_is_highest_power.png",
    duration: "0:50",
    filedAs: "Phenominal/shorts/v2_edited/vid3/02_irl_is_highest_power.mp4",
    sourceCode: "V3@1:00",
    sourceVideoId: "talk-2026-07-15",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "On camera"],
  },
  {
    id: "short-vid3-03-shapes-color-mental",
    title: "Shapes, Color & Mental Health",
    description: "Lines that look like a smile. Design can heal — or hurt. Treat mental health as a UX problem.",
    src: "/media/videos/shorts/vid3/03_shapes_color_mental_health.mp4?v=theme3",
    poster: "/media/posters/shorts/vid3_03_shapes_color_mental_health.png",
    duration: "1:30",
    filedAs: "Phenominal/shorts/v2_edited/vid3/03_shapes_color_mental_health.mp4",
    sourceCode: "V3@5:30",
    sourceVideoId: "talk-2026-07-15",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Design", "On camera"],
  },
  {
    id: "short-vid3-04-ux-everything-ai",
    title: "This UX Stuff Applies to Everything",
    description: "Mind + content + AI = leverage. Same rules everywhere. I want your input on the next layer.",
    src: "/media/videos/shorts/vid3/04_ux_is_everything_with_ai.mp4?v=theme3",
    poster: "/media/posters/shorts/vid3_04_ux_is_everything_with_ai.png",
    duration: "1:10",
    filedAs: "Phenominal/shorts/v2_edited/vid3/04_ux_is_everything_with_ai.mp4",
    sourceCode: "V3@7:30",
    sourceVideoId: "talk-2026-07-15",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Design", "AI", "On camera"],
  },
  {
    id: "short-vid3-05-round-corners",
    title: "Rounded Corners Train Peace",
    description: "Sharp vs soft changes how people feel. Peace can be taught in the geometry.",
    src: "/media/videos/shorts/vid3/05_round_corners_teach_peace.mp4?v=theme3",
    poster: "/media/posters/shorts/vid3_05_round_corners_teach_peace.png",
    duration: "1:20",
    filedAs: "Phenominal/shorts/v2_edited/vid3/05_round_corners_teach_peace.mp4",
    sourceCode: "V3@10:45",
    sourceVideoId: "talk-2026-07-15",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Design", "On camera"],
  },
  {
    id: "short-vid3-06-women-shapes",
    title: "Gender, Shapes & What You Click",
    description: "Sharp → rounded. Every tap teaches. Design is curriculum — whether we admit it or not.",
    src: "/media/videos/shorts/vid3/06_women_shapes_learning.mp4?v=theme3",
    poster: "/media/posters/shorts/vid3_06_women_shapes_learning.png",
    duration: "1:35",
    filedAs: "Phenominal/shorts/v2_edited/vid3/06_women_shapes_learning.mp4",
    sourceCode: "V3@12:00",
    sourceVideoId: "talk-2026-07-15",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Design", "Learning", "On camera"],
  },
  {
    id: "short-vid3-07-help-me-build",
    title: "Help Me Build It",
    description: "Too much surface area for one person. Builders wanted — Web4, education, character systems.",
    src: "/media/videos/shorts/vid3/07_help_me_build_it.mp4?v=theme3",
    poster: "/media/posters/shorts/vid3_07_help_me_build_it.png",
    duration: "0:26",
    filedAs: "Phenominal/shorts/v2_edited/vid3/07_help_me_build_it.mp4",
    sourceCode: "V3@14:00",
    sourceVideoId: "talk-2026-07-15",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Money", "On camera"],
  },
  {
    id: "short-vid3-08-donation-house",
    title: "Donate Into a House & a Story",
    description: "Support that means something — apps polished, a house, a story worth growing into.",
    src: "/media/videos/shorts/vid3/08_donation_house_story.mp4?v=theme3",
    poster: "/media/posters/shorts/vid3_08_donation_house_story.png",
    duration: "1:10",
    filedAs: "Phenominal/shorts/v2_edited/vid3/08_donation_house_story.mp4",
    sourceCode: "V3@4:00",
    sourceVideoId: "talk-2026-07-15",
    recordedOn: "2026-07-15",
    segment: "shorts",
    orientation: "portrait",
    pinnedTags: ["Shorts", "Money", "On camera"],
  },

  /* ── mainline ─────────────────────────────────────────────────────────── */

  /*
    The three series, announced before they are shot.

    `src: null` renders as a labelled placeholder rather than a broken player,
    which is the point: the home page states that these three recordings are
    the way in, and a named empty slot is a commitment a reader can hold you to.
    Chapters are written now because deciding what a recording says is the hard
    part and it is already done — recording it is then a morning's work.

    Keep the ids in step with `videoId` in ./series.
  */
  {
    id: "site-intro-all",
    title: "Site intro — everything here",
    description:
      "Placeholder for the recording intro of the whole yen site: what is offered, where to start, Web 4, Profile, Plans, EDU, and the content path. Record this first.",
    src: null,
    segment: "mainline",
    chapters: [
      { id: "offer", label: "What this site is", start: 0 },
      { id: "path", label: "Web 4 · Profile · Plans · EDU", start: 90 },
      { id: "content", label: "Videos, posts, live", start: 210 },
      { id: "apps", label: "The products running here", start: 360 },
    ],
    pinnedTags: ["Intro", "Series"],
  },
  {
    id: "highlights-what-is-here",
    title: "Highlights — what is here",
    description:
      "A highlights-section walkthrough explaining what exists on yen: series, docs, systems, workshop, and how to navigate without drowning.",
    src: null,
    segment: "mainline",
    chapters: [
      { id: "map", label: "Map of the site", start: 0 },
      { id: "series", label: "Series band", start: 120 },
      { id: "docs", label: "Documentation", start: 240 },
      { id: "systems", label: "Systems underneath", start: 360 },
    ],
    pinnedTags: ["Intro", "Highlights"],
  },
  {
    id: "heart-evolve-walk",
    title: "Heart.Evolve — walkthrough",
    description:
      "Placeholder: narrate the Now → Becoming → Destination arc on the profile Core Media album (Grow Sexy Vision). Record over the wired stills anytime.",
    src: null,
    segment: "mainline",
    chapters: [
      { id: "now", label: "Now", start: 0 },
      { id: "becoming", label: "Becoming", start: 60 },
      { id: "destination", label: "Destination", start: 120 },
      { id: "profile", label: "Profile album", start: 180 },
    ],
    pinnedTags: ["Intro", "Heart.Evolve"],
  },
  {
    id: "series-all-in-one",
    title: "All_In_One — 4Eye: Web4 + HumanAI",
    description:
      "This is my start to the everything you need all in one website. Made for you.\n\nMy years long journey of unbelievably interesting experiences. I am very thankful for although currently also seeking truth. Years of learning and playing turned into a seed for the future.\n\nAlso experimenting with different app and game types here — even just using your human and visualizing is pretty powerful. Eventually we will have AI that can edit the page, and characters you set up yourself offline or online (Feedback, and Support Appreciated).\n\nWatch this one to figure out What.",
    src: null,
    segment: "mainline",
    chapters: [
      { id: "profile", label: "Profile:TheHuman", start: 0, note: "Modeled after Me — and the people met; IRL character, robots, play *.*." },
      { id: "plan", label: "Plan:CommandCenter", start: 180, note: "Planning inside the app." },
      { id: "aichat", label: "AiChat", start: 360, note: "Evolved learning chat — people, work, web, anything. May become Command Center." },
      { id: "edu", label: "Presentations & EDU", start: 540, note: "Teaching and presenting." },
      { id: "mental", label: "Mental Health", start: 720, note: "Counsellor support in the stack." },
      { id: "kb", label: "KnowledgeBase", start: 900, note: "Somewhat searchable, somewhat ranked — still being written; needs cleanup help." },
    ],
    pinnedTags: ["Series"],
  },
  {
    id: "series-all-in-won",
    title: "All_In_Won — 4Eye (MM), and AION at the end of it",
    description:
      "The same system read from the inside: one modelled person — attributes, goals, mood, what is surfaced right now — followed outward until the interface stops being a screen. What it is for, rather than what it does.",
    src: null,
    segment: "mainline",
    chapters: [
      { id: "person", label: "One person, modelled", start: 0 },
      { id: "character", label: "Acting and equipping", start: 260 },
      { id: "web4", label: "Where the plan came from", start: 540, note: "Web 4, in brief." },
      { id: "aion", label: "AION", start: 820, note: "Full dive, and what it would actually mean." },
    ],
    pinnedTags: ["Series", "Web 4"],
  },
  {
    id: "series-all-in-neo",
    title: "ALL_IN_NEO — Human, Computer, and every layer between",
    description:
      "Eight integration layers from a person standing in a room up to full dive, walked in order. Two are live, two are being built, four are ahead — and the recording says which is which at every step rather than presenting a roadmap as a product.",
    src: null,
    segment: "mainline",
    chapters: [
      { id: "human", label: "Human", start: 0, note: "Live." },
      { id: "computer", label: "Computer", start: 240, note: "Live." },
      { id: "robot", label: "Robot", start: 520, note: "Building." },
      { id: "store", label: "Store", start: 700, note: "Building." },
      { id: "ahead", label: "Neural, glasses, brainwave, AION", start: 900, note: "Ahead, and honestly labelled." },
    ],
    pinnedTags: ["Series"],
  },
  /* Alias kept so old deep-links to #series-layers still resolve. */
  {
    id: "series-layers",
    title: "ALL_IN_NEO — Human, Computer, and every layer between",
    description:
      "Renamed to ALL_IN_NEO. Eight integration layers from a person standing in a room up to full dive, walked in order.",
    src: null,
    segment: "mainline",
    chapters: [
      { id: "human", label: "Human", start: 0, note: "Live." },
      { id: "computer", label: "Computer", start: 240, note: "Live." },
      { id: "robot", label: "Robot", start: 520, note: "Building." },
      { id: "store", label: "Store", start: 700, note: "Building." },
      { id: "ahead", label: "Neural, glasses, brainwave, AION", start: 900, note: "Ahead, and honestly labelled." },
    ],
    pinnedTags: ["Series", "Alias"],
  },
  {
    id: "expanse-edu-walkthrough",
    title: "Expanse EDU — the product walkthrough",
    description:
      "The education product on its own terms: the classroom store, what a student earns and how, what a teacher sets up, and the loop that connects them. Recorded to replace the old Expanse EDU website as the thing to send people.",
    src: null,
    segment: "mainline",
    pinnedTags: ["Series", "Expanse EDU"],
  },
  {
    id: "4eye-guided-tour",
    title: "4eye — the guided tour",
    description:
      "The re-cut of the July walkthroughs into one pass: the website surface, then the application and its HUD, then where the two meet. Chaptered, so the grid navigation, the Next Best Actions panel and the realm switcher can each be reached directly instead of scrubbed for.",
    src: null,
    poster: "/media/posters/4eye-website-walkthrough.jpg",
    duration: "22:40",
    recordedOn: "2026-08-06",
    segment: "mainline",
    chapters: [
      { id: "open", label: "Cold open", start: 0, note: "What this is and who it is for." },
      { id: "surface", label: "The website surface", start: 95, note: "REACH progression and the offerings catalog." },
      { id: "grid", label: "Grid navigation", start: 480, note: "Money, Gamification, Why, Projects, Home, Learn, Who." },
      { id: "nba", label: "Next Best Actions", start: 812, note: "WHY / WHAT / HOW / WHO resolving in the panel." },
      { id: "hud", label: "The HUD", start: 1030, note: "Rails, orbs and the realm switcher." },
      { id: "profile", label: "Profile and character", start: 1215, note: "Attributes, perks and progression." },
    ],
    versions: [
      { id: "v1", label: "v1 — first cut", parent: null, segment: "mainline", date: "2026-08-01", note: "Straight assembly of the July session. Too long, no chapters.", src: null },
      { id: "v2", label: "v2 — chaptered", parent: "v1", segment: "mainline", date: "2026-08-06", note: "Cut to 22 minutes, chapter marks added, HUD section re-recorded.", src: null, current: true },
    ],
    languages: [
      { code: "en", label: "English", kind: "original", src: null },
      { code: "es", label: "Español", kind: "dubbed", src: null },
      { code: "fr", label: "Français", kind: "subtitled", src: null, track: null },
      { code: "ja", label: "日本語", kind: "subtitled", src: null, track: null },
    ],
    commentary: {
      label: "Matthew, talking over the tour",
      src: null,
      recordedOn: "2026-08-06",
      offset: 0,
    },
  },
  {
    id: "character-lens-tour",
    title: "The character lens, end to end",
    description:
      "A short pass over the profile's character lens: the action band and what separates invoked controls from gesture bindings, the perk grid and how its colour system encodes kind and rank, and the equipment and spell book panels.",
    src: null,
    poster: "/media/preview/character.png",
    duration: "8:05",
    recordedOn: "2026-08-07",
    segment: "mainline",
    chapters: [
      { id: "band", label: "Actions and Swipe Cast", start: 0, note: "Two kinds of control, and why they look different." },
      { id: "perks", label: "Perks", start: 168, note: "Hue means kind, pips mean rank." },
      { id: "gear", label: "Equipment and the spell book", start: 342 },
      { id: "layouts", label: "Panel layouts", start: 430, note: "Paired, single and flow." },
    ],
    versions: [
      { id: "v1", label: "v1 — as recorded", parent: null, segment: "mainline", date: "2026-08-07", note: "Single take, no edits.", src: null, current: true },
    ],
    languages: [{ code: "en", label: "English", kind: "original", src: null }],
    pinnedTags: ["Colour system"],
  },

  /*
    Two short captures of the application, made on 5 August while the profile
    lens work was in progress. Kept on mainline rather than in `field` because
    they show the product: everything in `field` shows something else.
  */
  {
    id: "daily-focus-panel",
    title: "Daily Focus, collapsing",
    description:
      "Six seconds of the profile's Daily Focus panel: the current mood reading at 101% with its one-line note, the habit bar at two of nine, Meditation carrying a fourteen-day streak, and the control that folds the whole panel away.",
    src: "/media/videos/daily-focus-panel.mp4",
    duration: "0:06",
    filedAs: "Screen Recording 2026-08-05 at 2.38.09 AM.mov",
    recordedOn: "2026-08-05",
    segment: "mainline",
    languages: [{ code: "en", label: "English", kind: "original", src: "/media/videos/daily-focus-panel.mp4" }],
    pinnedTags: ["Habits", "Mood"],
  },
  {
    id: "profile-lens-rail",
    title: "The profile lens rail",
    description:
      "Ten seconds across the top of the profile — Core, Brain, Body, Life, then the Facets group — with Daily Focus, the current goal, the next action and the highest-value strip sitting underneath. The clearest short record of the lens layout as it stood in early August.",
    src: "/media/videos/profile-lens-rail.mp4",
    duration: "0:10",
    filedAs: "Screen Recording 2026-08-05 at 2.38.30 AM.mov",
    recordedOn: "2026-08-05",
    segment: "mainline",
    languages: [{ code: "en", label: "English", kind: "original", src: "/media/videos/profile-lens-rail.mp4" }],
    pinnedTags: ["Profile", "Navigation"],
  },

  /* ── field ────────────────────────────────────────────────────────────── */

  /*
    Reference captures, 3–5 August 2026. These show other people's screens —
    posts, streams and their chat — rather than anything built here, and they
    are described as what they are rather than dressed up as product footage.

    Published at Matthew's explicit direction after the third-party content in
    them was pointed out. If that decision is ever revisited, this whole block
    and the `field` segment come out together and nothing else is affected.
  */
  {
    id: "field-feed-2026-08-03",
    title: "Feed, 3 August — the marathon post",
    description:
      "A pass down the X timeline, stopping on a post about there being no passive route to building wealth. Captured as reference while working, not as commentary; the posts and the video in them belong to their authors.",
    src: "/media/videos/field-feed-2026-08-03.mp4",
    duration: "0:06",
    filedAs: "gg_Screen Recording 2026-08-03 at 2.15.55 PM.mov",
    recordedOn: "2026-08-03",
    segment: "field",
    pinnedTags: ["Reference"],
  },
  {
    id: "field-feed-connection",
    title: "Feed — human connection as the meaning",
    description:
      "A timeline stop on a clip of Mark Zuckerberg arguing that human connection is the meaning of life and that schooling systematically undervalues it. Kept because that claim is close to the thesis this whole system is built on.",
    src: "/media/videos/field-feed-connection.mp4",
    duration: "0:05",
    filedAs: "gg1.mov",
    recordedOn: "2026-08-03",
    segment: "field",
    pinnedTags: ["Reference", "Learning"],
  },
  {
    id: "field-feed-scroll",
    title: "Feed — a scroll",
    description: "Four seconds down the same timeline. No particular stop; kept for completeness of the session.",
    src: "/media/videos/field-feed-scroll.mp4",
    duration: "0:04",
    filedAs: "gg2.mov",
    recordedOn: "2026-08-03",
    segment: "field",
    pinnedTags: ["Reference"],
  },
  {
    id: "field-feed-compute",
    title: "Feed — the compute argument",
    description:
      "A timeline stop on Jensen Huang on why collecting world data is expensive and who is positioned to do it, followed by the human-connection clip again. The two together are roughly the poles this project sits between.",
    src: "/media/videos/field-feed-compute.mp4",
    duration: "0:08",
    filedAs: "gg3.mov",
    recordedOn: "2026-08-03",
    segment: "field",
    pinnedTags: ["Reference", "AI"],
  },
  {
    id: "field-feed-2026-08-03-pm",
    title: "Feed — a disagreement, in public",
    description:
      "Four seconds on a streamer-to-streamer exchange playing out on the timeline. Reference for how public conflict reads and resolves, which is a subject the counselling product has to have a view on.",
    src: "/media/videos/field-feed-2026-08-03-pm.mp4",
    duration: "0:04",
    filedAs: "Screen Recording 2026-08-03 at 2.24.04 PM.mov",
    recordedOn: "2026-08-03",
    segment: "field",
    pinnedTags: ["Reference"],
  },
  {
    id: "field-search-sakuna",
    title: "Searching — Sakuna: Of Rice and Ruin",
    description:
      "A search for a farming-and-combat game, read down through the AI overview and the mechanics summary. Game systems are research material here rather than a distraction — the progression model in 4eye came out of exactly this kind of reading.",
    src: "/media/videos/field-search-sakuna.mp4",
    duration: "0:07",
    filedAs: "Screen Recording 2026-08-04 at 1.49.40 PM.mov",
    recordedOn: "2026-08-04",
    segment: "field",
    pinnedTags: ["Reference", "Gaming"],
  },
  {
    id: "field-stream-1",
    title: "A stream, running",
    description:
      "Thirty-seven seconds of a live IRL stream with its chat alongside. Reference for the format — a person, a camera, a room of people reacting in real time — which is the shape the social side of this is aimed at. The stream, its chat and everyone in both belong to them.",
    src: "/media/videos/field-stream-1.mp4",
    duration: "0:37",
    filedAs: "Screen Recording 2026-08-04 at 3.17.21 AM.mov",
    recordedOn: "2026-08-04",
    segment: "field",
    pinnedTags: ["Reference", "Social"],
  },
  {
    id: "field-stream-2",
    title: "A stream, continued",
    description:
      "Fifty-six seconds from later in the same session, on the performance rather than the room. Same note as above: the content and the people in it are not this project's.",
    src: "/media/videos/field-stream-2.mp4",
    duration: "0:56",
    filedAs: "Screen Recording 2026-08-04 at 3.47.41 AM.mov",
    recordedOn: "2026-08-04",
    segment: "field",
    pinnedTags: ["Reference", "Social"],
  },
  {
    id: "field-encinitas-cam",
    title: "Encinitas, live",
    description:
      "Five seconds of a public beach camera on the California coast — grey water, lifeguard tower, a handful of people. The quietest thing in this branch, and the reason it is here: the ambient-context layer is supposed to feel like this rather than like a dashboard.",
    src: "/media/videos/field-encinitas-cam.mp4",
    duration: "0:05",
    filedAs: "Screen Recording 2026-08-05 at 10.05.38 AM.mov",
    recordedOn: "2026-08-05",
    segment: "field",
    pinnedTags: ["Reference"],
  },
  {
    id: "field-humanai-note",
    title: "HumanAI — the note, as written",
    description:
      "Twenty-four seconds reading a working note: HumanAI framed as −Love / +Love, variables of energy, cognition, information, mood, time, context and situation, and the question of how to measure a relationship's value. It ends on the two things it is actually about — becoming the best possible version of yourself, and finding the best possible love knowing what you now know. This is the raw form of what the Core lens is meant to hold.",
    src: "/media/videos/field-humanai-note.mp4",
    duration: "0:24",
    filedAs: "HumanAI.[-Love,Love+].mov",
    recordedOn: "2026-08-04",
    segment: "field",
    pinnedTags: ["Reference", "Love", "AI"],
  },

  /* ── origin ───────────────────────────────────────────────────────────── */
  {
    id: "4eye-website-walkthrough",
    title: "4eye — the website surface",
    description:
      "A walkthrough of the public 4eye surface, narrated on camera. Covers the REACH progression as it steps through its seven stages and the “AI 4 Your Eyes” offerings catalog, where each way of understanding — nonverbal, verbal, auditory, social, visual, semiotic, logic, memory, kinesthetic, recall, in-context — is its own chip, with filter, sort and shuffle over the set.",
    src: "/media/videos/4eye-website-walkthrough.mp4",
    poster: "/media/posters/4eye-website-walkthrough.jpg",
    duration: "19:31",
    filedAs: "video2068306961_godtier.mp4",
    recordedOn: "2026-07-15",
    segment: "origin",
    chapters: [
      { id: "intro", label: "Opening", start: 0 },
      { id: "reach", label: "The REACH progression", start: 240, note: "Seven stages, stepped through one at a time." },
      { id: "catalog", label: "The offerings catalog", start: 690, note: "Filter, sort and shuffle over the chips." },
    ],
    languages: [{ code: "en", label: "English", kind: "original", src: "/media/videos/4eye-website-walkthrough.mp4" }],
  },
  {
    id: "4eye-app-walkthrough",
    title: "4eye — the application and its HUD",
    description:
      "The longest of the four, and the one that shows the app rather than the pitch. Grid navigation across Money, Gamification, Why, Projects, Home, Learn and Who; the Next Best Actions panel resolving into WHY / WHAT / HOW / WHO; the Website · App · Technical realm switcher; guest XP and progression; and the Ask 4eye bar along the bottom.",
    src: "/media/videos/4eye-app-walkthrough.mp4",
    poster: "/media/posters/4eye-app-walkthrough.jpg",
    duration: "33:14",
    filedAs: "video1525440693__Future_Gov_War_Phenominal.mp4",
    recordedOn: "2026-07-15",
    segment: "origin",
    chapters: [
      { id: "grid", label: "Grid navigation", start: 0 },
      { id: "nba", label: "Next Best Actions", start: 700 },
      { id: "realms", label: "The realm switcher", start: 1320 },
      { id: "xp", label: "Guest XP and progression", start: 1610 },
      { id: "ask", label: "The Ask 4eye bar", start: 1830 },
    ],
    languages: [{ code: "en", label: "English", kind: "original", src: "/media/videos/4eye-app-walkthrough.mp4" }],
  },
  {
    id: "web4-plan-walkthrough",
    title: "Web 4 — the plan, read end to end",
    description:
      "A read-through of the “Web 4 + Projects + Story (#WhoAmI → #WhoAreWe)” document. Moves through the system intro and map, domains, profiles and identities, the human and computer layers, and then the projects themselves — 4eye, Command Center, Symbol Grid, Expanse EDU and 4up — ending on AI feedback screens and posting processes.",
    src: "/media/videos/web4-plan-walkthrough.mp4",
    poster: "/media/posters/web4-plan-walkthrough.jpg",
    duration: "36:39",
    filedAs: "Demo_Vid/App_Demo_1_Mediocre.mp4",
    recordedOn: "2026-07-15",
    segment: "origin",
    chapters: [
      { id: "map", label: "System intro and map", start: 0 },
      { id: "domains", label: "Domains, profiles and identities", start: 520 },
      { id: "layers", label: "The human and computer layers", start: 1180 },
      { id: "projects", label: "The projects", start: 1600, note: "4eye, Command Center, Symbol Grid, Expanse EDU, 4up." },
    ],
    languages: [{ code: "en", label: "English", kind: "original", src: "/media/videos/web4-plan-walkthrough.mp4" }],
  },
  {
    id: "talk-2026-07-15",
    title: "Straight to camera",
    description:
      "No screen share and no slides — fourteen minutes of talking directly to the lens, recorded last on the night of the other three. The subject is not written down anywhere in the files, so this description covers only what can be seen; the summary is Matthew's to write.",
    src: "/media/videos/talk-2026-07-15.mp4",
    poster: "/media/posters/talk-2026-07-15.jpg",
    duration: "14:27",
    recordedOn: "2026-07-15",
    segment: "origin",
    languages: [{ code: "en", label: "English", kind: "original", src: "/media/videos/talk-2026-07-15.mp4" }],
  },
  {
    id: "lottie-system",
    title: "Lottie System Overview",
    description:
      "Walkthrough of the animation system: how Lotties are named, themed, and pulled into the apps without hand-editing each file. Recording still outstanding.",
    src: null,
    segment: "origin",
  },
];

export const PHOTOS: PhotoEntry[] = [];

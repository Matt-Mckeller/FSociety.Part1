/**
 * The three signature goals shown on the Human layer. These are the
 * character's real goals (each with a coded label, a Target, and a longer
 * WhatItMeans narrative revealed on click) — rendered as bespoke animated art.
 */

import { type HeartEvolveNote } from "@yen/content/heart-evolve";

/** A target line is a sequence of plain text and cyphertext (morphing) words. */
export type TargetSegment =
  | string
  | {
      morph: string[];
      ch?: number;
      /** Full cycles through `morph` (null = forever). Ignored when `swaps` is set. */
      maxPasses?: number | null;
      /** Absolute word-transition cap — e.g. 1 = swap once, then hold. */
      swaps?: number;
      /** Quieter body-text morph (inherit face, no accent ink, minimal tracking). */
      subtle?: boolean;
    };

export interface VisionGoal {
  id: string;
  /** Monospace coded label (the "code" form of the goal). */
  code: string;
  /** What achieving it means — one line, always visible (supports cyphertext). */
  target: TargetSegment[];
  /** Plain-text form of the target, for aria. */
  targetPlain: string;
  /** The longer narrative, revealed on click. Supports cyphertext segments. Omit in favor of `tagline` for a terser card. */
  meaning?: string | TargetSegment[];
  /** Extra coded lines shown alongside the meaning, revealed on click. */
  detailCodes?: string[];
  /** Short coded closing line, revealed on click — replaces the `meaning` paragraph when set. */
  tagline?: string;
  /** Shape shown at the center of the Target bullseye icon. */
  targetShape: "circle" | "square" | "triangle";
  accent: string;
  accent2: string;
  /**
   * Subtle card watermark — large, low-opacity mark in the corner
   * (e.g. `+` on Save, heart on Heart.Evolve).
   */
  mark?: string;
  /** Pill badge on the goal chip row (e.g. Controversial unlock). */
  badge?: {
    label: string;
    /** Hover / title explanation. */
    hint?: string;
  };
  /**
   * Theatrical “purchase the details” gate. Not a real lock — the CTA always
   * succeeds; the point is the badge and the bit of friction, not entitlement.
   */
  purchaseDetails?: {
    cta: string;
    priceLabel: string;
    note: string;
  };
  /**
   * Verbatim field notes (e.g. Heart.Evolve). Shown as concise expandable rows
   * under the meaning — bodies must not be rewritten in UI.
   */
  notes?: HeartEvolveNote[];
  /**
   * Fibonacci estimate shown on the card (crew / work language).
   * Optional — signature vision cards on the profile omit it.
   */
  points?: 1 | 2 | 3 | 5 | 8 | 13;
  /** Short labels on the card header (Bond, Heal, Path, …). */
  tags?: string[];
}

/**
 * Cyphertext options for Goal 1's "collecting" — brand-aligned words for
 * gathering the world's information: preserving it evermore, and honoring it
 * (memory / learning / preservation / respect).
 */
export const COLLECT_WORDS = ["collecting", "preserving", "harvesting", "remembering", "respecting", "appreciating", "utilizing"];

/** Money-culture critique subject — one quiet swap from place to people. */
export const COUNTRY_WORDS = ["America", "humans"];

export const GOALS: VisionGoal[] = [
  {
    id: "save",
    code: "🌍.Save() + 🌏.Save() + 🌎.Save();",
    target: ["Transforming Our Reality. ", { morph: COLLECT_WORDS, ch: 12 }, " its information, evermore."],
    targetPlain: "Transforming Our Reality. Collecting its information, evermore.",
    detailCodes: ["🧬🧠.Save()", "🧍‍♂️.Evolve()", "💊🕶️.Matrix()", "🗡️🛡️.SAO()"],
    targetShape: "circle",
    accent: "#6fd3ff",
    accent2: "#4fe0b0",
    mark: "+",
  },
  {
    id: "value",
    // The money-symbol prefix ($ · ¥ · MoneyMark) is rendered separately in
    // GoalRow — this is just the rest of the coded flow line.
    code: "→ 🛰️💻🕐🌲🙂💊🩸🧭🧠🦾 → 🪙 → /👑",
    target: ["Evolving Humanity to Achieve our Best Future — and present."],
    targetPlain: "Evolving Humanity to Achieve our Best Future — and present.",
    meaning: [
      "Updating ",
      { morph: COUNTRY_WORDS, ch: 7, swaps: 1, subtle: true },
      " values of money and helping them see other things of value in life too, such as learning, and understanding what it means to be a human. For 99% of humans, the world is run by a 1%. America, and our World is entering a new age of civilization and existence. Together we create the new united world for our best future. I want to see 1 earth not Country A and Country B. Japan values different things. Still: layers we can control, and human operating systems we can utilize. I value money highly too, which makes the best paths harder to chase. Better strategies exist — value and time have both changed. What do we value next? I want people to see value in other things and learn what it means to be human — to update our broken system. Now we have better leadership, vision, and tools. Along side Technology, AI, Software, and Robots we will enjoy this journey together.",
    ],
    targetShape: "square",
    // Match education / Depth blue (not warm metal) — value is learning what matters.
    accent: "#7cc4ff",
    accent2: "#b6ddff",
    mark: "🪙",
  },
  {
    id: "king",
    code: "/👑",
    target: ["Command King Game — Win. Rise. ", { morph: ["claim", "share", "enjoy", "compete for"], ch: 10 }, " the throne."],
    targetPlain: "Command King Game — Win. Rise. claim the throne.",
    meaning:
      "The Command King Game: win, rise, and claim the throne. An evolved terminal — many mediums of input converging into a single crown. Currency flows in from one side; the crown reigns on the other.",
    targetShape: "triangle",
    accent: "#ff5c7a",
    accent2: "#b06cff",
    mark: "👑",
  },
];


/**
 * Parent goals — the same shape and the same bespoke graphics as the character's
 * signature goals, aimed at outcomes *for their children* rather than at
 * administration.
 *
 * The parent profile previously read as compliance: linked students, approvals,
 * "reviews weekly progress". That describes a school's relationship to a parent,
 * not a parent's relationship to their child, and it is the opposite of what
 * Expanse EDU is for. These are written as things a parent actually wants.
 */
export const PARENT_GOALS: VisionGoal[] = [
  {
    id: "spark",
    code: "child.findSpark();",
    target: [{ morph: ["excited", "curious", "absorbed", "lit up"] }, " to learn something of their own"],
    targetPlain: "Excited to learn something of their own",
    tagline: "curiosity.isNotAssigned();",
    targetShape: "circle",
    accent: "#4fe0b0",
    accent2: "#8ef0d2",
  },
  {
    id: "pride",
    code: "screenTime -> progress.theyOwn();",
    target: ["Turn screen time into ", { morph: ["progress", "mastery", "something built"] }, " they're proud of"],
    targetPlain: "Turn screen time into progress they're proud of",
    tagline: "pride.compounds();",
    targetShape: "square",
    accent: "#7cc4ff",
    accent2: "#b6ddff",
  },
  {
    id: "notice",
    code: "if (struggling) notice(before.reportCard);",
    target: ["Notice when they're ", { morph: ["struggling", "stuck", "quietly lost"] }, " before the report card does"],
    targetPlain: "Notice when they're struggling before the report card does",
    tagline: "ensureGrowth(); earlier.isKinder(); applyAutoCorrect();",
    targetShape: "triangle",
    accent: "#ffb86b",
    accent2: "#ffd6a8",
  },
  {
    id: "together",
    code: "habit = we.doTogether();",
    target: ["Build a habit we ", { morph: ["do together", "share", "keep"] }, " — not one I enforce"],
    targetPlain: "Build a habit we do together, not one I enforce",
    tagline: "with > at.",
    targetShape: "circle",
    accent: "#d8a8ff",
    accent2: "#ecd2ff",
  },
];


/**
 * Brackets on the profile:
 *
 *   1–3  Vision — Save+ / Value+currency / Command King
 *   4–7  Ongoing — Heart.Evolve + weekly process
 *        Other people — Janna (heal / open / grow · record / present / spice)
 *        Children — parent facet
 */

/** 1–3 · Vision / top of pyramid — same as Human panel signature goals. */
export const VISION_GOALS: VisionGoal[] = GOALS;

/** 4–7 · Ongoing / process — Heart.Evolve + weekly practice. */
export const ONGOING_GOALS: VisionGoal[] = [
  {
    id: "perfect-loves",
    code: "Heart.Evolve();",
    target: [
      "Heart.Evolve — ",
      { morph: ["love", "growth", "bond", "becoming"], ch: 8 },
    ],
    targetPlain: "Heart.Evolve — love, growth, bond, becoming",
    meaning:
      "Love as a primary goal — not a sidebar. Heart.Evolve is choosing and protecting the real thing across mediums, exploring, growing, and improving it rather than being a puppet. The controversial part is naming desire in public systems that pretend love is private or optional; the details are free because locking them would miss the point.",
    tagline: "Heart.Evolve();",
    detailCodes: ["Heart.Evolve()", "growth.with(love)", "desire.named();", "bond.protected();"],
    targetShape: "circle",
    accent: "#ff5c7a",
    accent2: "#ff8fab",
    mark: "♥",
    badge: {
      label: "Controversial unlock",
      hint: "Named desire in a public system — the unlock is the badge, not a gate.",
    },
    purchaseDetails: {
      cta: "Purchase details",
      priceLabel: "✦ 0",
      note: "Not actually locked. The purchase is theatre — details were always yours.",
    },
  },
  {
    id: "build",
    code: "ship(); learn(); repeat();",
    target: ["Build something ", { morph: ["real", "used", "shipped", "alive"] }, " every week"],
    targetPlain: "Build something real every week",
    tagline: "momentum > motivation;",
    targetShape: "square",
    accent: "#4fe0b0",
    accent2: "#8ef0d2",
    mark: "↻",
  },
  {
    id: "depth",
    code: "focus.breadthAndDepth();",
    target: [
      "Prioritize what you focus on — ",
      { morph: ["depth", "breadth", "how you learn", "what compounds"], ch: 12 },
    ],
    targetPlain: "Prioritize what you focus on — depth, breadth, and how you learn",
    meaning:
      "Wide variety is real — the skill is ranking attention and choosing how to learn so both depth and breadth compound. Not one thing only; the most effective thing next, learned the right way.",
    tagline: "priority > volume; learn.how > learn.more;",
    targetShape: "circle",
    accent: "#7cc4ff",
    accent2: "#b6ddff",
    mark: "◎",
  },
  {
    id: "carry",
    code: "lift(others);",
    target: ["Leave people ", { morph: ["better", "steadier", "further along"] }, " than I found them"],
    targetPlain: "Leave people better than I found them",
    tagline: "with > at.",
    targetShape: "triangle",
    accent: "#d8a8ff",
    accent2: "#ecd2ff",
    mark: "↗",
  },
  {
    id: "gain-money",
    code: "money.gain(optimal);",
    target: ["Optimally gaining money"],
    targetPlain: "Optimally gaining money",
    tagline: "strategy > hustle; compound > chase;",
    targetShape: "square",
    accent: "#fbbf24",
    accent2: "#fde68a",
    mark: "🪙",
  },
];

/**
 * Goals held for other people — Janna's path, not the character's own pyramid.
 * Compact on the profile (behind Show more); the working cards live on Crew.
 */
export const OTHER_PEOPLE_GOALS: VisionGoal[] = [
  {
    id: "heal-janna",
    code: "Janna.Heal(); happier(); path.optimize();",
    target: [
      "Healing Janna — making her ",
      { morph: ["happier", "lighter", "freer", "steadier"], ch: 9 },
      ", optimizing her path.",
    ],
    targetPlain: "Healing Janna — making her happier, optimizing her path.",
    meaning:
      "Heal first. Happiness is the metric. The path is hers — optimize it with her, not at her. Her communication planner is a tool for that path; this profile is the person walking it with her.",
    detailCodes: ["heal.first();", "happier.metric();", "path.with(her);"],
    targetShape: "circle",
    accent: "#4fe0b0",
    accent2: "#8ef0d2",
    mark: "✚",
    points: 8,
    tags: ["Heal", "Path", "Personal"],
  },
  {
    id: "open-janna",
    code: "Janna.Speak(); barriers.drop(); trust.add();",
    target: [
      "Get Janna to ",
      { morph: ["speak", "share", "open", "trust"], ch: 7 },
      " — connect like a real human.",
    ],
    targetPlain: "Get Janna to speak and share — open up, connect like a real human.",
    meaning:
      "Remove barriers. Add trust. She speaks and shares information with me optimally — opening up, connecting like a real human. I gain what I need to understand my reality, and I bring her into it.",
    detailCodes: ["barriers.drop();", "trust.add();", "reality.shared();"],
    targetShape: "square",
    accent: "#7cc4ff",
    accent2: "#b6ddff",
    mark: "◎",
    points: 8,
    tags: ["Trust", "Bond"],
  },
  {
    id: "grow-together",
    code: "we.GrowTogether();",
    target: [
      "Growing ",
      { morph: ["together", "as one path", "without parallel tracks"], ch: 10 },
      ".",
    ],
    targetPlain: "Growing together.",
    meaning:
      "Not parallel tracks. One combined path — her planner, this profile, the recording, and the life after it. Grow together or it is just a demo.",
    detailCodes: ["we.Grow();", "path.combined();", "after.theRecording();"],
    targetShape: "triangle",
    accent: "#ff5c7a",
    accent2: "#ff8fab",
    mark: "↗",
    points: 13,
    tags: ["Bond", "Path"],
  },
  {
    id: "record-phenomenal",
    code: "record.phenomenal();",
    target: [
      "Recording ",
      { morph: ["phenomenal", "unforgettable", "alive", "perfect"], ch: 12 },
      " content",
    ],
    targetPlain: "Recording phenomenal content",
    meaning:
      "The planner and the profile, captured so they can be felt later — not a walkthrough that dies in the take.",
    tagline: "phenomenal > finished;",
    targetShape: "square",
    accent: "#4fe0b0",
    accent2: "#8ef0d2",
    mark: "◉",
    points: 5,
    tags: ["Record", "Create"],
  },
  {
    id: "present-perfect",
    code: "present.perfectly(Janna);",
    target: [
      "Presenting ",
      { morph: ["perfectly", "clearly", "warmly", "without armor"], ch: 10 },
      " to Janna",
    ],
    targetPlain: "Presenting perfectly to Janna",
    meaning:
      "Her communication planner and this character profile — happy, excited, humor on. Peace, love, friendship in the field. Informative, educational, engaging. Influence without a hard sell.",
    tagline: "present.perfectly(Janna);",
    targetShape: "circle",
    accent: "#7cc4ff",
    accent2: "#b6ddff",
    mark: "✦",
    points: 8,
    tags: ["Present", "Bond"],
  },
  {
    id: "spice-seduction",
    code: "seduction.spice();",
    target: [
      "Adding a spice of ",
      { morph: ["seduction", "warmth", "pull", "named desire"], ch: 10 },
    ],
    targetPlain: "Adding a spice of seduction",
    meaning: "Found an antacid waiting on a washer.",
    tagline: "spice.named(); antacid.on(washer);",
    targetShape: "triangle",
    accent: "#ff5c7a",
    accent2: "#ff8fab",
    mark: "♥",
    points: 3,
    tags: ["Spice", "Bond"],
  },
];

/** Full equipped set — vision then ongoing. Prefer the named groups in UI. */
export const PROFILE_GOALS: VisionGoal[] = [...VISION_GOALS, ...ONGOING_GOALS];

/** @deprecated Use ONGOING_GOALS — kept so older imports keep working. */
export const MYSELF_GOALS: VisionGoal[] = ONGOING_GOALS;

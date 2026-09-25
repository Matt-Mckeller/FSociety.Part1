/**
 * Seeding — sample fixture: the marketing-video "See" (brand intro) cut.
 *
 * Migrated from code-only seeds into the browsable model. Mirrors the
 * scene breakdown in Planning/.../marketing-video-see/ (3 main scenes +
 * lens transitions are omitted here for brevity).
 *
 * Goal links demonstrate inheritance: sequence-level goals (Grow, Trust)
 * apply to every scene; individual scenes override the weight/depth and
 * add their own focus goals (Engagement, Connection, Vision).
 */

import type {
  Goal,
  GoalLink,
  Project,
  Scene,
  Sequence,
  Seed,
} from "../model/types";
import { goalImage } from "./goal-image";

/** Build an ISO timestamp `n` days (and optional hours) before now. */
function ago(days: number, hours = 0): string {
  return new Date(Date.now() - (days * 24 + hours) * 3_600_000).toISOString();
}

/**
 * The active creative Project — "Animation" (the cut being built by the
 * gallery app). Wraps the See sequence; this is the lightweight Project
 * layer the Create screen is centred on.
 */
export const PROJECTS: Project[] = [
  {
    id: "00000000-0000-4000-8000-00000000000a",
    slug: "project-animation",
    type: "project",
    symbol: "🎞️",
    glyph: "animation",
    title: "Animation",
    tagline: "4ear brand film — built in the gallery app",
    status: "sequence",
    medium: "animation",
    sequenceIds: ["11111111-1111-4111-8111-111111111111"],
    version: 6,
    history: [
      { id: "p1", at: ago(8), actor: "you", kind: "created", summary: "Project created — Animation (brand film)" },
      { id: "p2", at: ago(1), actor: "you", kind: "edited", summary: "Synced sequence from the gallery app" },
    ],
  },
];

export const SEQUENCES: Sequence[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    slug: "sequence-see",
    type: "sequence",
    symbol: "🎬",
    glyph: "sequence",
    title: "See — Brand Intro (~75s)",
    status: "sequence",
    projectId: "00000000-0000-4000-8000-00000000000a",
    sceneIds: [
      "22222222-2222-4222-8222-000000000001",
      "22222222-2222-4222-8222-000000000002",
      "22222222-2222-4222-8222-000000000003",
    ],
  },
];

export const SCENES: Scene[] = [
  {
    id: "22222222-2222-4222-8222-000000000001",
    slug: "scene-1-classroom",
    type: "scene",
    symbol: "🏫",
    glyph: "classroom",
    title: "Scene 1 — Classroom Awakening",
    sequenceId: "11111111-1111-4111-8111-111111111111",
    status: "sequence",
    promptScripts: [
      "Anime-influenced classroom, students slumped, muted palette. A teacher receives a glowing 4eye HUD; it activates, warm light spills, students lift their heads.",
      "Lens shape: circle. 1:2:3 growth motif begins. No labels, no callouts.",
    ],
    perspectives: [
      {
        type: "objective",
        interpretation: "Engagement transformation — disengaged → excited to learn.",
        likelihood: "high",
      },
    ],
    seedIds: ["33333333-3333-4333-8333-000000000001"],
    version: 4,
    history: [
      { id: "h1-1", at: ago(6), actor: "you", kind: "created", summary: "Scene created from the See cut" },
      { id: "h1-2", at: ago(4, 3), actor: "you", kind: "goal-linked", summary: "Linked goal “Engagement”", goalId: "44444444-4444-4444-8444-000000000003" },
      { id: "h1-3", at: ago(2), actor: "you", kind: "edited", summary: "Refined prompt scripts (lens + growth motif)" },
      { id: "h1-4", at: ago(0, 5), actor: "ai-pipeline", kind: "generated", summary: "Generated toward “Grow”", goalId: "44444444-4444-4444-8444-000000000001" },
    ],
  },
  {
    id: "22222222-2222-4222-8222-000000000002",
    slug: "scene-2-coffee-shop",
    type: "scene",
    symbol: "☕",
    glyph: "cafe",
    title: "Scene 2 — Coffee Shop Connection",
    sequenceId: "11111111-1111-4111-8111-111111111111",
    status: "draft",
    promptScripts: [
      "Warm café, adults connecting; neural-link motif as electric connections between people. Tasteful desire, adult-coded. Lens shape: triangle.",
    ],
    perspectives: [
      {
        type: "business",
        interpretation: "Relationships and connection deepen through shared understanding.",
        likelihood: "medium",
      },
    ],
    seedIds: ["33333333-3333-4333-8333-000000000002"],
  },
  {
    id: "22222222-2222-4222-8222-000000000003",
    slug: "scene-3-neural-sea",
    type: "scene",
    symbol: "🌊",
    glyph: "vision",
    title: "Scene 3 — Neural Sea (Dream / Future)",
    sequenceId: "11111111-1111-4111-8111-111111111111",
    status: "draft",
    promptScripts: [
      "Aspirational future: ocean + neural sharing, worn gear/armor (never surgical). HUD expands 4 → 8 actions → swipe screens. Lens shape: square → leveled circle.",
    ],
    perspectives: [
      {
        type: "ai",
        interpretation: "Vision of shared knowledge and human empowerment.",
        likelihood: "high",
      },
    ],
    seedIds: [],
  },
];

export const GOALS: Goal[] = [
  {
    id: "44444444-4444-4444-8444-000000000001",
    slug: "goal-grow",
    type: "goal",
    symbol: "🌱",
    glyph: "grow",
    title: "Grow",
    focusArea: "Vision",
    imageUrl: goalImage({ glyph: "grow", from: "#34d399", to: "#059669" }),
  },
  {
    id: "44444444-4444-4444-8444-000000000002",
    slug: "goal-trust",
    type: "goal",
    symbol: "🤝",
    glyph: "trust",
    title: "Build Trust",
    focusArea: "Trust",
    imageUrl: goalImage({ glyph: "trust", from: "#60a5fa", to: "#2563eb" }),
  },
  {
    id: "44444444-4444-4444-8444-000000000003",
    slug: "goal-engagement",
    type: "goal",
    symbol: "⚡",
    glyph: "engagement",
    title: "Engagement",
    focusArea: "Engagement",
    imageUrl: goalImage({ glyph: "engagement", from: "#fbbf24", to: "#d97706" }),
  },
  {
    id: "44444444-4444-4444-8444-000000000004",
    slug: "goal-connection",
    type: "goal",
    symbol: "🔗",
    glyph: "connection",
    title: "Connection",
    focusArea: "Mental health",
    imageUrl: goalImage({ glyph: "connection", from: "#a78bfa", to: "#7c3aed" }),
  },
];

export const SEEDS: Seed[] = [
  {
    id: "33333333-3333-4333-8333-000000000001",
    slug: "seed-classroom-style-ref",
    type: "seed",
    kind: "reference",
    title: "Style ref: comic-strip 1-1",
    body: "anime-influenced, futuristic-grounded, HUD-overlay, embedded-data-in-environment",
  },
  {
    id: "33333333-3333-4333-8333-000000000002",
    slug: "seed-cafe-desire-note",
    type: "seed",
    kind: "text",
    title: "Tone note",
    body: "Tasteful, adult-coded only; never student-coded. Brand-safe + platform-safe.",
  },
];

/**
 * Goal edges. Sequence-level (Grow, Trust) are inherited by all scenes;
 * scene-level links override weight/depth and add focus goals.
 */
export const GOAL_LINKS: GoalLink[] = [
  // Sequence-wide
  {
    goalId: "44444444-4444-4444-8444-000000000001",
    toId: "11111111-1111-4111-8111-111111111111",
    toType: "sequence",
    weight: 90,
    depth: 5,
    instructions:
      "Carry the Grow theme through every scene — visible progression, small→large, dark→light.",
    associations: [
      { label: "Brand: 4ear", glyph: "trust", tooltip: "Aligned to the 4ear brand system" },
      { label: "intro-opener.mp4", glyph: "sequence", tooltip: "Reference asset: public/videos/intro-opener.mp4" },
    ],
  },
  { goalId: "44444444-4444-4444-8444-000000000002", toId: "11111111-1111-4111-8111-111111111111", toType: "sequence", weight: 60, depth: 4 },
  // Scene 1 — override Grow weight + add Engagement
  {
    goalId: "44444444-4444-4444-8444-000000000001",
    toId: "22222222-2222-4222-8222-000000000001",
    toType: "scene",
    weight: 100,
    depth: 3,
    instructions:
      "Open on the classroom awakening — make Grow the dominant read; keep depth light so the beat lands fast.",
    associations: [
      { label: "Seed: style ref", glyph: "seed", tooltip: "Style ref: comic-strip 1-1" },
      { label: "Perspective: business", glyph: "perspective", tone: "info", tooltip: "Targets the business interpretation" },
    ],
  },
  { goalId: "44444444-4444-4444-8444-000000000003", toId: "22222222-2222-4222-8222-000000000001", toType: "scene", weight: 85, depth: 3 },
  // Scene 2 — Connection focus
  { goalId: "44444444-4444-4444-8444-000000000004", toId: "22222222-2222-4222-8222-000000000002", toType: "scene", weight: 80, depth: 4 },
  // Scene 3 — deep Grow
  {
    goalId: "44444444-4444-4444-8444-000000000001",
    toId: "22222222-2222-4222-8222-000000000003",
    toType: "scene",
    weight: 95,
    depth: 7,
    instructions:
      "Neural-sea dream sequence — push depth to Profound; abstract, embedded-data environment, emotional payoff.",
    associations: [
      { label: "Mood: hopeful", glyph: "grow", tone: "success", tooltip: "Emotional target for the close" },
    ],
  },
];

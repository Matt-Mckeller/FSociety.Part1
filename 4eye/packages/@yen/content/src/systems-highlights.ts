/**
 * Systems underneath — one Pure-text catalogue.
 *
 * Order matters: Web 4 is the plan (Vision is King), then the stack, then
 * running surfaces. Symbol Grid is an important *example* of utilising symbols
 * for comprehension — not the final OS implementation. Learning tips that live
 * inside the essay (Color / Spatial / Cyphertext) sit under Plan, not a fat
 * Docs dump. Technical docs stay as a quiet More entry.
 *
 * Apps stay in `apps.ts` for compass / routes; they are not re-tiled here.
 */

import { WEB4_INTRO_HREF } from "./walkthroughs";

/** Section deep-links into the deprecated essay — keep for archive tips only. */
const WEB4 = "/docs/web4/web-4-projects-story-whoami-whoarewe";

export type SystemBand = "plan" | "stack" | "examples" | "apps" | "more";

export interface SystemHighlight {
  id: string;
  title: string;
  blurb: string;
  href: string;
  band: SystemBand;
  /** Quiet rarity — draw the icon, do not print the word on the card. */
  rarity?: "legendary";
  /** Optional editorial chip (Plan · Example · Preview · Learn …). */
  chip?: string;
  /** Quiet honesty under the blurb (stub / shared anchor / not final OS). */
  note?: string;
}

export const SYSTEM_BANDS: Array<{ id: SystemBand; label: string; blurb: string }> = [
  {
    id: "plan",
    label: "Plan",
    blurb: "Web 4 first — the human OS story, then the learnings inside it.",
  },
  {
    id: "stack",
    label: "Stack",
    blurb: "Pipelines · Processes · Context · Data · AI · UI · Consensus.",
  },
  {
    id: "examples",
    label: "Examples",
    blurb: "Important utilisations — not the final OS yet.",
  },
  {
    id: "apps",
    label: "Surfaces",
    blurb: "Running and planned system apps — same Pure-text cards.",
  },
  {
    id: "more",
    label: "More",
    blurb: "Technical collection when you want the full find list.",
  },
];

export const SYSTEM_HIGHLIGHTS: SystemHighlight[] = [
  /* ── Plan (Web 4 leads) ─────────────────────────────────────────────── */
  {
    id: "web4",
    title: "Web 4",
    blurb: "Video intro — human OS, spatial architecture, stories, #WhoAmI → #WhoAreWe. Start here; the long essay is deprecated.",
    href: WEB4_INTRO_HREF,
    band: "plan",
    rarity: "legendary",
    chip: "Video",
  },
  {
    id: "color",
    title: "Color is Powerful",
    blurb: "Organisation, retention, mood, identity — colour as UX law, used carefully because it trains people.",
    href: `${WEB4}#color-is-powerful-learn-ux-ux-law`,
    band: "plan",
    chip: "Learn",
  },
  {
    id: "spatial",
    title: "Spatial is Powerful",
    blurb: "Position carries meaning — minimaps, HUD bars, and grouping with less space.",
    href: `${WEB4}#spatial-is-powerful-cyphertext-is-powerful`,
    band: "plan",
    chip: "Learn",
    note: "Shares one essay section with Cyphertext — two ideas, one pin.",
  },
  {
    id: "cyphertext",
    title: "Cyphertext is Powerful",
    blurb: "Words that compress, unlock, and group — opacity and position as teaching tools.",
    href: `${WEB4}#spatial-is-powerful-cyphertext-is-powerful`,
    band: "plan",
    chip: "Learn",
    note: "Shares one essay section with Spatial — two ideas, one pin.",
  },

  /* ── Stack ──────────────────────────────────────────────────────────── */
  {
    id: "pipelines",
    title: "Pipelines",
    blurb: "How work moves from plan to running surface — build, mount, publish.",
    href: "/4eye/technical/pipelines",
    band: "stack",
  },
  {
    id: "processes",
    title: "Processes",
    blurb:
      "The operating loops behind the products. Highest-value technical story in the set — how things actually get done.",
    href: `${WEB4}#improved-navigation-amp-human-guidance`,
    band: "stack",
    rarity: "legendary",
    note: "Pinned to Web 4 · Improved navigation until a dedicated Processes page exists.",
  },
  {
    id: "context",
    title: "Context",
    blurb: "Situation, place, mood, and ambient inputs the system is allowed to see.",
    href: "/integration-layer",
    band: "stack",
  },
  {
    id: "data",
    title: "Data",
    blurb: "What is stored, what is scored, and what is highest-value.",
    href: "/4eye/technical/data",
    band: "stack",
    chip: "Stub",
    note: "Placeholder route — honest stub, not a finished write-up.",
  },
  {
    id: "ai",
    title: "AI",
    blurb: "Profiles, identities, and agents — many voices, not a single model as oracle.",
    href: `${WEB4}#profiles-identities-agents`,
    band: "stack",
    chip: "Essay",
  },
  {
    id: "ui",
    title: "UI",
    blurb: "Spatial navigation, HUD, lenses, and the surfaces people actually touch.",
    href: "/surfaces",
    band: "stack",
  },
  {
    id: "consensus-engine",
    title: "ConsensusEngine",
    blurb:
      "Pool multiple AIs, collect every opinion, surface agreement and disagreement. Preview concept — not a live service yet.",
    href: "/integration-layer?mode=app",
    band: "stack",
    chip: "Preview",
    note: "Lives on Integration Layer app mode until it has its own route.",
  },
  {
    id: "aion-notes",
    title: "AION — working notes",
    blurb: "Host AI / OS, Ion → Unlimited, time aspect, current reading of the root.",
    href: "/integration-layer/aion",
    band: "stack",
    chip: "Working notes",
    note: "Still learning / creating this — not a finished doctrine. Accuracy is being optimized.",
  },

  /* ── Examples (utilisations — not final OS) ─────────────────────────── */
  {
    id: "symbol-grid",
    title: "Symbol Grid",
    blurb:
      "An important example of utilising symbols and icons for comprehension without a paragraph — a working demonstration, not the final OS implementation.",
    href: "/apps/symbol-grid",
    band: "examples",
    chip: "Example",
    note: "Useful and live · the real OS story is Web 4, not this surface alone.",
  },

  /* ── Surfaces ───────────────────────────────────────────────────────── */
  {
    id: "command-center",
    title: "Command Center",
    blurb: "Planning model, missions, and records — the alternate view of Plan data.",
    href: "/apps/command-center",
    band: "apps",
    chip: "Alternate",
  },
  {
    id: "4eye-extension",
    title: "4eye Extension Plan",
    blurb: "How 4eye reaches outward — platform, infrastructure, and the features that consume it.",
    href: "/4eye-extension",
    band: "apps",
  },
  {
    id: "integration-layer",
    title: "Integration Layer",
    blurb: "Eight layers from human ground to full dive — infrastructure on its own terms.",
    href: "/integration-layer",
    band: "apps",
    note: "Layer 8 working notes live at /integration-layer/aion — still being learned.",
  },
  {
    id: "themed-animation-nfts",
    title: "ThemedAnimationNFTs",
    blurb: "Animations as owned, themed, tradeable assets — highest-value data class here.",
    href: "/apps/lottie",
    band: "apps",
    rarity: "legendary",
    chip: "Preview",
  },
  {
    id: "communication-planner",
    title: "Communication Planner",
    blurb: "Clarify communications and relationship intent — runs here on a public demo session.",
    href: "/apps/communication-planner",
    band: "apps",
    chip: "Live",
    note: "Demo session only. Private drafts stay in the local app.",
  },
  {
    id: "backup",
    title: "Backup & encrypt",
    blurb:
      "Backup and encrypt on your machine — GPG keys, a password, localhost. Not Ion.",
    href: "/apps/backup",
    band: "apps",
    chip: "Not Ion",
    note: "Localhost only. Public captures use invented paths, sizes and archive names.",
  },

  /* ── More (not a Docs dump) ─────────────────────────────────────────── */
  {
    id: "docs-technical",
    title: "Technical docs",
    blurb: "HUD, display, theming, and the rest of the searchable technical collection.",
    href: "/docs#docs-top",
    band: "more",
    chip: "Docs",
  },
];

export function highlightsInBand(band: SystemBand): SystemHighlight[] {
  return SYSTEM_HIGHLIGHTS.filter((h) => h.band === band);
}

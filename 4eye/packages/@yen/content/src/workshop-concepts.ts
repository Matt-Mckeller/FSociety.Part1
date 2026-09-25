/**
 * Workshop concepts — Currency, Equipment, Quests, Gamification, Learning.
 *
 * First-class topics in Expanse EDU / 4eye. Destinations are concept pages or
 * live product surfaces — not deep-links into the Web 4 essay.
 *
 * Bands are for the reader:
 *   ideas   — what the loops are (one card each)
 *   places  — where you can open them in the product
 *   writing — docs and planning that spell them out
 */

export type WorkshopConceptBand = "ideas" | "places" | "writing";

export interface WorkshopConcept {
  id: string;
  title: string;
  /** One plain sentence: what this is. */
  blurb: string;
  href: string;
  band: WorkshopConceptBand;
  rarity?: "legendary";
  /** Short category label on the card. */
  chip?: string;
  /** Extra honesty under the blurb (stub, docs-first, etc.). */
  note?: string;
}

export const WORKSHOP_CONCEPT_BANDS: Array<{
  id: WorkshopConceptBand;
  label: string;
  blurb: string;
}> = [
  {
    id: "ideas",
    label: "Core ideas",
    blurb: "The product loops — one card each. Open a card to read what it means.",
  },
  {
    id: "places",
    label: "Open in the product",
    blurb: "Live screens where those ideas show up — different URLs from the cards above.",
  },
  {
    id: "writing",
    label: "Written out",
    blurb: "Longer docs and the planning model that backs the loops.",
  },
];

export const WORKSHOP_CONCEPTS: WorkshopConcept[] = [
  /* ── Core ideas ─────────────────────────────────────────────────────── */
  {
    id: "learning",
    title: "Learning",
    blurb:
      "How knowledge sticks: spaced practice, quests, and streaks — the classroom loop that Expanse EDU is built around.",
    href: "/concepts/learning",
    band: "ideas",
    chip: "Start here",
    rarity: "legendary",
  },
  {
    id: "currency",
    title: "Currency & coins",
    blurb:
      "What you earn, what it is worth, and how coins inside a learning product stay useful instead of becoming a slot machine.",
    href: "/concepts/currency",
    band: "ideas",
    chip: "Economy",
  },
  {
    id: "equipment",
    title: "Equipment",
    blurb:
      "Gear by slot and rarity — real modifiers on the character, plus the board that shows every piece.",
    href: "/equipment",
    band: "ideas",
    chip: "Loadout",
  },
  {
    id: "quests",
    title: "Quests",
    blurb:
      "Goals broken into missions and story points — the planning spine for what to do next.",
    href: "/mounted/command-center/docs",
    band: "ideas",
    chip: "Plan",
    note: "Opens the docs first — the live Plan tile is under Written out.",
  },
  {
    id: "progression",
    title: "Progression",
    blurb:
      "Streaks, XP, and tiers — how effort compounds when the reward rules stay visible.",
    href: "/4eye/gamification",
    band: "ideas",
    chip: "Streaks",
  },
  {
    id: "gamification",
    title: "Gamification",
    blurb:
      "Coins, quests, streaks, and progression together — the motivational spine, stated plainly enough to argue with.",
    href: "/4eye/gamification",
    band: "ideas",
    rarity: "legendary",
    chip: "Spine",
  },

  /* ── Open in the product ────────────────────────────────────────────── */
  {
    id: "learn-suite",
    title: "Learn your way",
    blurb: "Pick a path across the project suite — different products for how you like to learn.",
    href: "/4eye/learn",
    band: "places",
    chip: "Suite",
  },
  {
    id: "expanse-edu-run",
    title: "Expanse EDU (running)",
    blurb: "The education product itself — classrooms, store, and the live demo flows.",
    href: "/apps/expanse-edu",
    band: "places",
    chip: "Product",
  },
  {
    id: "money",
    title: "Money",
    blurb: "Value, tokens, and revenue — the sibling screen to Currency & coins.",
    href: "/4eye/money",
    band: "places",
  },
  {
    id: "character-loadout",
    title: "Character loadout",
    blurb: "Where gear, spells, and perks actually equip on the character sheet.",
    href: "/4eye/appRealm/character",
    band: "places",
  },

  /* ── Written out ────────────────────────────────────────────────────── */
  {
    id: "cc-reward",
    title: "Reward system docs",
    blurb: "How coins are generated and spent — written beside the planning model.",
    href: "/mounted/command-center/docs/documentation?section=reward-system",
    band: "writing",
    chip: "Docs",
  },
  {
    id: "cc-docs",
    title: "Command Center docs",
    blurb:
      "The fullest write-up here: quest hierarchy, goals, reward layer, and economy.",
    href: "/mounted/command-center/docs",
    band: "writing",
    rarity: "legendary",
    chip: "Docs",
  },
  {
    id: "cc-plan-tile",
    title: "Plan tile (in 4eye)",
    blurb: "The same planning data inside the app — missions, quests, and focus.",
    href: "/4eye/appRealm/command-center",
    band: "writing",
    chip: "App",
  },
];

export function workshopConceptsInBand(band: WorkshopConceptBand): WorkshopConcept[] {
  return WORKSHOP_CONCEPTS.filter((c) => c.band === band);
}

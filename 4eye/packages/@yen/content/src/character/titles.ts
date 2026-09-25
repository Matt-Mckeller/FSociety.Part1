/**
 * Role titles — the selectable "user roles" the hero can equip.
 *
 * Equipped roles live on {@link Character.titles} (an ordered list of labels).
 * The header role-equip input toggles entries from {@link ROLE_TITLE_OPTIONS},
 * capped at {@link MAX_EQUIPPED_ROLES} at a time.
 *
 * Titles with {@link RoleTitleOption.href} open a dedicated page (new tab from chips).
 */

/** Maximum number of roles equipped at once. */
export const MAX_EQUIPPED_ROLES = 3;

export interface RoleTitleOption {
  /** Stable key. */
  id: string;
  /** Display label — also the value stored in {@link Character.titles}. */
  label: string;
  /** Optional one-line flavor shown in the picker / chip tooltip. */
  hint?: string;
  /**
   * Longer description for the role's own page.
   * Prefer plain paragraphs separated by blank lines.
   */
  description?: string;
  /** In-app route to the role dossier (use with `route()` when linking). */
  href?: string;
}

/** Catalog of roles the hero can choose from. */
export const ROLE_TITLE_OPTIONS: RoleTitleOption[] = [
  {
    id: "game-master",
    label: "Game Master",
    hint: "Runs the world as a game — content, systems, and people in one campaign.",
    href: "/appRealm/roles/game-master",
    description: [
      "Game Master is the role that treats reality as a campaign you can design, run, and win.",
      "You hold the table: content, systems, people, and the rules that make them playable. Story becomes structure; structure becomes something others can enter.",
      "In 4eye this is not cosplay — it is how Matthew runs the stack. Plan the quests, cast the spells, equip the party, and keep the world coherent enough that play stays possible.",
      "Path: Storyteller → Game Master → CEO. The GM sits in the middle — narrating enough to move people, systems enough to keep score.",
    ].join("\n\n"),
  },
  { id: "legendary-leader", label: "Legendary Leader", hint: "Leads with vision. Multiplies impact. The room follows the story." },
  { id: "won", label: "Won", hint: "Won → Now → Neo. The system is already seen; the game is already won." },
  { id: "grand-master-leadership-influence", label: "Grand Master of Leadership & Influence", hint: "Teacher · lifelong learner. Leads with vision and multiplies impact through people." },
  { id: "neo", label: "Neo", hint: "Won → Now → Neo. Sees the system for what it is." },
  { id: "storyteller", label: "Storyteller", hint: "Storyteller → Game Master → CEO. Narrates the world, then runs it." },
  { id: "storyteller-in-chief", label: "Storyteller in Chief", hint: "Turns the journey into a movement." },
  { id: "visionary-architect", label: "Visionary Architect", hint: "Designs the future before building it." },
  { id: "quality-guardian", label: "Quality Guardian", hint: "Refuses to ship anything less than excellent." },
  { id: "strategist", label: "Strategist", hint: "Plays the long game, several moves ahead." },
  { id: "the-oracle", label: "The Oracle", hint: "Answers the questions before they're asked." },
  { id: "community-builder", label: "Community Builder", hint: "Gathers and grows the people who care." },
  { id: "builder", label: "Builder", hint: "Makes the thing, then makes it better." },
  { id: "educator", label: "Educator", hint: "Unlocks others' potential through teaching." },
  { id: "explorer", label: "Explorer", hint: "Goes and looks rather than waiting to be told." },
];

/**
 * Titles that scramble through anagram cyphertext instead of static labels.
 *
 * First word is the resting label (shown when the chip is idle). Scramble only
 * runs on hover — see ProfileTitleChips / RoleEquip.
 */
export const TITLE_CYPHER_WORDS: Record<string, string[]> = {
  "Game Master": ["Game Master", "Storyteller", "CEO"],
  "Legendary Leader": ["grand master", "GrandMaster.*"],
  Won: ["Won", "Now", "Neo"],
  Neo: ["Neo", "Won", "Now"],
  Storyteller: ["Storyteller", "Game Master", "CEO"],
};

/** Resting chip / picker label — cypher word 0 when the title morphs, else the stored label. */
export function roleDisplayLabel(label: string): string {
  return TITLE_CYPHER_WORDS[label]?.[0] ?? label;
}

/** Look up a role option by display label. */
export function roleOptionForLabel(label: string): RoleTitleOption | undefined {
  return ROLE_TITLE_OPTIONS.find((o) => o.label === label);
}

/** Look up a role option by stable id. */
export function roleOptionForId(id: string): RoleTitleOption | undefined {
  return ROLE_TITLE_OPTIONS.find((o) => o.id === id);
}

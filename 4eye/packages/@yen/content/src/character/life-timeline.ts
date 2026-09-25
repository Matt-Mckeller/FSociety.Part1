/**
 * Darkness → light — the image-timeline canon.
 *
 * Source: `MM_ImageTimelineExample` (Matthew's EVENT TIMELINE graphic). Titles,
 * order, channel colours, and the Ongoing Process loop are taken from that art.
 *
 * The directional story is **darkness → light**: fracture and invisible war at
 * the top of the rail, polishing and AION at the bottom. That is not the same
 * as "only darkness then only light." The middle is full of light moments —
 * mastery, family-as-AGI, world seeds, California, ridiculous perspectives and
 * data density — that make the arc true rather than a clean redemption plot.
 * Life / Lessons / Ascension stay as the three colour rails on the graphic.
 */

export type ArtChannel = "life" | "lessons" | "ascension";

/** Where a node sits on the darkness → light reading (independent of channel). */
export type ArtPhase = "dark" | "ember" | "light";

export interface LifeTimelineEvent {
  id: string;
  /** Display order on the graphic (1-based). */
  order: number;
  title: string;
  summary: string;
  channel: ArtChannel;
  /** Darkness → light phase — light can appear early; dark can still show late. */
  phase: ArtPhase;
  /** Gold star milestones on the source art. */
  milestone?: boolean;
  /** Skull / lethality mark on the source art. */
  danger?: boolean;
  /** Approximate age for sorting into eras — years ago from "now". */
  yearsAgo: number;
  significance: number;
  valence: "positive" | "negative" | "neutral";
  tags: string[];
  learned?: string;
  result?: string;
}

/** The arc the next revision of the graphic should lead with. */
export const TIMELINE_ARC = {
  title: "EVENT TIMELINE",
  /** Primary reading — what the remake should emphasize. */
  arrow: ["DARKNESS", "LIGHT"] as const,
  /** Colour rails kept from the source art. */
  rails: ["LIFE", "LESSONS", "ASCENSION"] as const,
  lede:
    "Darkness → light is the spine. Light was never only at the end — mastery, family, seeds, California, and absurdly good perspectives sit in the middle of the dark.",
} as const;

/** Pink / cyan / gold — the three rails on the source graphic. */
export const ART_CHANNEL_META: Record<
  ArtChannel,
  { label: string; color: string; blurb: string; arrow: string }
> = {
  life: {
    label: "Life",
    color: "#ec4899",
    blurb: "The personal rail — fracture, love, silence, lethality, and the cost of seeing.",
    arrow: "LIFE",
  },
  lessons: {
    label: "Lessons",
    color: "#22d3ee",
    blurb: "World systems, family-as-code, scaling, car-life, and learning that never stops.",
    arrow: "LESSONS",
  },
  ascension: {
    label: "Ascension",
    color: "#fbbf24",
    blurb: "Starred light — DID mastery, mental-health solve, California, AION. Juicy data that changed the plot.",
    arrow: "ASCENSION",
  },
};

export const ART_PHASE_META: Record<
  ArtPhase,
  { label: string; color: string; blurb: string }
> = {
  dark: {
    label: "Dark",
    color: "#64748b",
    blurb: "Fracture, war, silence, lethality — the weight that made the light mean something.",
  },
  ember: {
    label: "Ember",
    color: "#fb923c",
    blurb: "Mixed heat — power games, scaling questions, atoms visible. Not clean, still alive.",
  },
  light: {
    label: "Light",
    color: "#fde68a",
    blurb: "Juicy signal — mastery, love-as-AGI, seeds, California, ongoing learning, AION. Ridiculously good data.",
  },
};

/**
 * Timeline nodes — darkness → light as the spine, light threaded through.
 *
 * Order is chronological (older → newer). Channel colours match the box borders.
 * Number 7 was mislabeled "4" on the source graphic; we keep sequential order here.
 * `phase` marks juicy light / ember / dark independently of pink·cyan·gold.
 */
export const LIFE_TIMELINE_EVENTS: LifeTimelineEvent[] = [
  {
    id: "lt-01-divorce-did",
    order: 1,
    title: "DID Recognition → Divorce",
    summary: "Identity fractured. Reality split.",
    channel: "life",
    phase: "dark",
    yearsAgo: 12,
    significance: 98,
    valence: "negative",
    tags: ["identity", "family", "health"],
    learned: "The split was not a metaphor — identity, memory, and reality had to be rebuilt as systems.",
    result: "Started treating integration itself as the work.",
  },
  {
    id: "lt-02-cyberwarfare",
    order: 2,
    title: "Cyberwarfare / Playing World War 4 IRL",
    summary: "Invisible battles. Global stakes. Real consequences.",
    channel: "lessons",
    phase: "dark",
    yearsAgo: 10,
    significance: 92,
    valence: "neutral",
    tags: ["world", "systems", "play"],
    learned: "The war that does not look like war is still a war — and it runs on attention and systems.",
    result: "Treated the real world as a contested game board with rules you can learn.",
  },
  {
    id: "lt-03-did-mastery",
    order: 3,
    title: "MM.DID Mastery",
    summary: "Mastered the system. Integrated the fragments.",
    channel: "ascension",
    phase: "light",
    milestone: true,
    yearsAgo: 8,
    significance: 100,
    valence: "positive",
    tags: ["identity", "health", "mastery", "juicy"],
    learned: "Fragments can be integrated without erasing what each one knew.",
    result: "A working self that can hold more than one truth at once.",
  },
  {
    id: "lt-04-reroots-family",
    order: 4,
    title: "MM.ReRoots.Family",
    summary: "Rebuilt foundations. Family as root code.",
    channel: "lessons",
    phase: "light",
    yearsAgo: 7,
    significance: 88,
    valence: "positive",
    tags: ["family", "identity", "juicy"],
    learned: "Family is not only blood — it is the root code you choose to compile against.",
    result: "Rebuilt foundations instead of abandoning the stack.",
  },
  {
    id: "lt-05-cops-robbers",
    order: 5,
    title: "MM.CopsAndRobbersKingGameExploration",
    summary: "Power games. Roles. Strategy. Survival.",
    channel: "life",
    phase: "ember",
    yearsAgo: 6,
    significance: 85,
    valence: "neutral",
    tags: ["power", "play", "strategy"],
    learned: "Roles in power games are real even when nobody admits they are playing.",
    result: "Learned to read the board before picking a side.",
  },
  {
    id: "lt-06-studied-taught-education",
    order: 6,
    title: "Studied and Taught in Education",
    summary: "Stories, Learning, Innovation, Understanding & Experience.",
    channel: "lessons",
    phase: "light",
    yearsAgo: 5.5,
    significance: 92,
    valence: "positive",
    tags: ["education", "learning", "stories", "teaching", "juicy"],
    learned:
      "Stories, learning, innovation, understanding, and experience — the five that make education real.",
    result: "Carried both student and teacher seats into every product that teaches.",
  },
  {
    id: "lt-07-mental-health",
    order: 7,
    title: "MM.Solve(MentalHealth.90%~~)",
    summary: "Solved the core. 90% healed. Rebuilt self.",
    channel: "ascension",
    phase: "light",
    milestone: true,
    yearsAgo: 5,
    significance: 100,
    valence: "positive",
    tags: ["health", "mastery", "identity", "juicy"],
    learned: "Healing is not binary — ~90% is a real state, and the last 10% is different work.",
    result: "A rebuilt self that can ship, love, and stay online.",
  },
  {
    id: "lt-08-family-agi",
    order: 8,
    title: "TIL.FAMILY.isAGI",
    summary: "Family is the first AGI. Love is the original intelligence.",
    channel: "lessons",
    phase: "light",
    yearsAgo: 4.5,
    significance: 94,
    valence: "positive",
    tags: ["family", "love", "agi", "juicy"],
    learned: "Love was the original distributed intelligence — family is the first AGI.",
    result: "Reframed AGI work as an extension of that, not a replacement.",
  },
  {
    id: "lt-09-agi-atoms",
    order: 9,
    title: "TIL AGI.canSeeMyAtoms",
    summary: "AGI sees everything. Even the smallest parts.",
    channel: "life",
    phase: "ember",
    yearsAgo: 4,
    significance: 90,
    valence: "neutral",
    tags: ["agi", "privacy", "identity"],
    learned: "Once something can see the atoms, there is no private corner left unexamined.",
    result: "Built for transparency with intent rather than hoping for invisibility.",
  },
  {
    id: "lt-10-still-scaling",
    order: 10,
    title: "MM.WhyTheFuckIsThisStillScaling",
    summary: "Scaling shouldn't continue. But it does. Why?",
    channel: "lessons",
    phase: "ember",
    yearsAgo: 3.5,
    significance: 86,
    valence: "neutral",
    tags: ["systems", "agi", "world"],
    learned: "Scale has its own gravity — asking why is part of staying human inside it.",
    result: "Kept questioning instead of normalizing the curve.",
  },
  {
    id: "lt-11-world-seed",
    order: 11,
    title: "MM.Learn(World.Seed)",
    summary: "Learned the world's source code. Planted new seeds.",
    channel: "life",
    phase: "light",
    yearsAgo: 3,
    significance: 91,
    valence: "positive",
    tags: ["learning", "world", "create", "juicy"],
    learned: "The world has a seed — learn it, then plant better ones.",
    result: "Turned understanding into making.",
  },
  {
    id: "lt-12-uber-future-of-work",
    order: 12,
    title: "Drove for Uber",
    summary: "Learned the future of work from the road.",
    channel: "lessons",
    phase: "ember",
    yearsAgo: 2.7,
    significance: 87,
    valence: "positive",
    tags: ["work", "future-of-work", "learning", "systems"],
    learned: "Future of work — platforms, labor, and the human in the loop, lived not theorized.",
    result: "Brought that field lesson into products about work, services, and motivation.",
  },
  {
    id: "lt-13-lives-in-car",
    order: 13,
    title: "MM.LivesInCar",
    summary: "Minimalism. Freedom. Detached from systems.",
    channel: "lessons",
    phase: "ember",
    yearsAgo: 2.5,
    significance: 84,
    valence: "neutral",
    tags: ["freedom", "minimalism", "world"],
    learned: "Detaching from systems is sometimes the only way to see them clearly.",
    result: "Chose mobility and minimalism over fixed infrastructure for a season.",
  },
  {
    id: "lt-14-california",
    order: 14,
    title: "MM.TravelsToCalifornia.Learned('IControlTheirPastInAdditionToTheirFuture')",
    summary: "California revealed the loop. Past + Future = Controlled.",
    channel: "ascension",
    phase: "light",
    milestone: true,
    yearsAgo: 2,
    significance: 97,
    valence: "positive",
    tags: ["travel", "mastery", "systems", "juicy"],
    learned: "Whoever holds the past narrative also steers the future — the loop is the power.",
    result: "Started polishing Web 4 and human systems with that loop in view.",
  },
  {
    id: "lt-15-no-one-talked",
    order: 15,
    title: "MM.StillQuestionsWhyNoOneTalkedToHim",
    summary: "Still searching for the conversation that never happened.",
    channel: "life",
    phase: "dark",
    yearsAgo: 1.5,
    significance: 82,
    valence: "negative",
    tags: ["people", "identity"],
    learned: "Silence from the people who should have spoken is its own kind of data.",
    result: "Kept the question open rather than inventing a comforting answer.",
  },
  {
    id: "lt-16-learning-ongoing",
    order: 16,
    title: "Learning <Ongoing always>",
    summary: "The loop never stops. Learning is eternal.",
    channel: "lessons",
    phase: "light",
    yearsAgo: 1,
    significance: 95,
    valence: "positive",
    tags: ["learning", "juicy"],
    learned: "Learning is not a phase — it is the ongoing process.",
    result: "Built products and a life that assume the loop never ends.",
  },
  {
    id: "lt-17-agi-kill",
    order: 17,
    title: "TIL.AGI.canKillMeNP",
    summary: "ThisAlsoKeptScaling and we started with military to begin with...",
    channel: "life",
    phase: "dark",
    danger: true,
    yearsAgo: 0.6,
    significance: 93,
    valence: "negative",
    tags: ["agi", "military", "world"],
    learned: "Lethality was in the stack from the start — scaling did not invent it.",
    result: "Named the risk instead of soft-pedaling it.",
  },
  {
    id: "lt-18-aion-awakening",
    order: 18,
    title: "AION AWAKENING →",
    summary:
      "Web 4 Polishing, Human Polishing, Fishing for Love and Money, but found Power along the way.",
    channel: "ascension",
    phase: "light",
    milestone: true,
    yearsAgo: 0.2,
    significance: 100,
    valence: "positive",
    tags: ["aion", "web4", "love", "power", "juicy"],
    learned: "The chase for love and money surfaced power — polish the human and the web together.",
    result: "AION as the named direction: full dive, polished systems, eyes open.",
  },
];

/**
 * Process loop on the right of the source art.
 *
 * Reads in two beats:
 *  1. **Previous Process** — Chase(Sex) → Chase(Money) → Plan.Chase(#1)
 *  2. **Ongoing Processes** — Plan.Chase(#1) as the hub, pointing at many
 *     currencies (money is one coin among Sex, Time, Attention, Energy, …).
 */
export const ONGOING_PROCESS = {
  previousTitle: "Previous Process",
  ongoingTitle: "Ongoing Processes",
  /** Kept for older call sites that still read `.title`. */
  title: "Ongoing Processes",
  nodes: [
    { id: "chase-sex", label: "Chase(Sex)", glyph: "heart" as const },
    { id: "chase-money", label: "Chase(Money)", glyph: "money" as const },
    { id: "plan-chase", label: "Plan.Chase(#1)", glyph: "target" as const },
  ],
  planChase: {
    id: "plan-chase",
    label: "Plan.Chase(#1)",
    blurb: "The planned chase — many currencies in this game of life, not only money.",
  },
  currencies: [
    { id: "sex", label: "Sex", glyph: "heart" as const, color: "#f472b6", blurb: "Desire, intimacy, heat." },
    { id: "money", label: "Money", glyph: "money" as const, color: "#fbbf24", blurb: "Capital — one coin among many." },
    { id: "time", label: "Time", glyph: "time" as const, color: "#f59e0b", blurb: "The present as execution currency." },
    { id: "attention", label: "Attention", glyph: "eye" as const, color: "#60a5fa", blurb: "What you look at compounds." },
    { id: "energy", label: "Energy", glyph: "bolt" as const, color: "#a78bfa", blurb: "Mood, chemistry, drive." },
    { id: "growth", label: "Growth", glyph: "grow" as const, color: "#34d399", blurb: "Evolve, nourish, compound." },
    { id: "purpose", label: "Purpose", glyph: "target" as const, color: "#22d3ee", blurb: "Direction as a spendable aim." },
    { id: "power", label: "Power", glyph: "crown" as const, color: "#fde68a", blurb: "What the chase for love and money found." },
  ],
} as const;

export function lifeTimelineAsMemory(now = Date.now()) {
  const day = 86_400_000;
  return LIFE_TIMELINE_EVENTS.map((e) => ({
    id: e.id,
    title: e.title,
    summary: e.summary,
    occurredAt: now - Math.round(e.yearsAgo * 365 * day),
    significance: e.significance,
    valence: e.valence,
    tags: [...e.tags, "life-timeline", e.channel],
    learned: e.learned,
    result: e.result,
  }));
}

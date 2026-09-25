/**
 * Heart.Evolve — interactive evolution series for the personal profile.
 *
 * Stages: Now → Becoming → Destination.
 * Variants: alternate color / art passes of the same arc (folder-drop to add more).
 *
 * Drop Desktop frames into:
 *   apps/yen/public/media/heart-evolve/variants/<variant-id>/
 * then extend {@link HEART_EVOLVE.variants}. Placeholder SVGs ship so the
 * player works before the full set lands.
 */

export type EvolveStageId = "now" | "becoming" | "destination";

export type EvolveMode = "evolve" | "slides" | "gallery";

export interface EvolveFrame {
  id: string;
  stage: EvolveStageId;
  src: string;
  title: string;
  caption?: string;
  sort: number;
}

export interface EvolveVariant {
  id: string;
  label: string;
  note?: string;
  accent: string;
  frames: EvolveFrame[];
  current?: boolean;
}

export interface EvolveStageMeta {
  id: EvolveStageId;
  label: string;
  blurb: string;
}

export interface EvolveSeries {
  id: "heart-evolve";
  code: "Heart.Evolve();";
  title: string;
  lede: string;
  accent: string;
  stages: EvolveStageMeta[];
  variants: EvolveVariant[];
  /** Companion video entry ids from `@yen/content/media` when recorded. */
  videos: string[];
  profileAlbumId: string;
  profileHref: string;
  visionHref: string;
}

export const HEART_EVOLVE_STAGES: EvolveStageMeta[] = [
  {
    id: "now",
    label: "Now",
    blurb: "Where I am — combining years of work into one explainable surface.",
  },
  {
    id: "becoming",
    label: "Becoming",
    blurb: "Growth in motion — attention ranked, love as practice.",
  },
  {
    id: "destination",
    label: "Destination",
    blurb: "Where this is going — bond and evolution made visible.",
  },
];

const V1_FRAMES: EvolveFrame[] = [
  {
    id: "v1-now-matt",
    stage: "now",
    src: "/media/matt/portrait.jpg",
    title: "Matthew — now",
    caption: "The person the system models. External-facing anchor.",
    sort: 0,
  },
  {
    id: "v1-now-mark",
    stage: "now",
    src: "/media/heart-evolve/variants/v1/now.svg",
    title: "Outline",
    caption: "Heart as outline — pressure and unfinished truth.",
    sort: 1,
  },
  {
    id: "v1-becoming",
    stage: "becoming",
    src: "/media/heart-evolve/variants/v1/becoming.svg",
    title: "Fill",
    caption: "Heart.Evolve() — growth taking form.",
    sort: 0,
  },
  {
    id: "v1-destination",
    stage: "destination",
    src: "/media/heart-evolve/variants/v1/destination.svg",
    title: "Presence",
    caption: "Destination — love and evolution held together.",
    sort: 0,
  },
];

const V2_FRAMES: EvolveFrame[] = [
  {
    id: "v2-now",
    stage: "now",
    src: "/media/heart-evolve/variants/v2-ember/now.svg",
    title: "Now · ember",
    caption: "Same stage — warmer color pass.",
    sort: 0,
  },
  {
    id: "v2-becoming",
    stage: "becoming",
    src: "/media/heart-evolve/variants/v2-ember/becoming.svg",
    title: "Becoming · ember",
    caption: "Variant pass — replace with Desktop frames anytime.",
    sort: 0,
  },
  {
    id: "v2-destination",
    stage: "destination",
    src: "/media/heart-evolve/variants/v2-ember/destination.svg",
    title: "Destination · ember",
    caption: "Ember cut of the end-state.",
    sort: 0,
  },
];

/**
 * Grow · Sexy Vision — human portraits, red-crown destination north star.
 * Filename prefix = progression order (capture L→R): 01 Now → 02–04 Becoming → 05–08 Destination.
 */
const V3_GROW_SEXY_FRAMES: EvolveFrame[] = [
  {
    id: "v3-01-now",
    stage: "now",
    src: "/media/heart-evolve/variants/v3-grow-sexy/01-now-hero.png",
    title: "Matthew — now",
    caption: "Trust. The person the system models — growth starts here.",
    sort: 0,
  },
  {
    id: "v3-02-becoming",
    stage: "becoming",
    src: "/media/heart-evolve/variants/v3-grow-sexy/02-becoming.png",
    title: "HUD on",
    caption: "Systems lighting up — ambition with a human face.",
    sort: 0,
  },
  {
    id: "v3-03-becoming",
    stage: "becoming",
    src: "/media/heart-evolve/variants/v3-grow-sexy/03-becoming.png",
    title: "Crown draft",
    caption: "Becoming — status taking form before it locks.",
    sort: 1,
  },
  {
    id: "v3-04-becoming",
    stage: "becoming",
    src: "/media/heart-evolve/variants/v3-grow-sexy/04-becoming.png",
    title: "Orbit",
    caption: "Growth in motion — attention ranked, love as practice.",
    sort: 2,
  },
  {
    id: "v3-05-destination",
    stage: "destination",
    src: "/media/heart-evolve/variants/v3-grow-sexy/05-destination.png",
    title: "Red crown",
    caption: "Destination — desire owned, bond and evolution made visible.",
    sort: 0,
  },
  {
    id: "v3-06-destination",
    stage: "destination",
    src: "/media/heart-evolve/variants/v3-grow-sexy/06-destination.png",
    title: "Phenomenal crown",
    caption: "Crown of desire — growth through a human, productized.",
    sort: 1,
  },
  {
    id: "v3-07-destination",
    stage: "destination",
    src: "/media/heart-evolve/variants/v3-grow-sexy/07-destination.png",
    title: "Silk · red",
    caption: "Same arc, alternate cut — keep shipping the person.",
    sort: 2,
  },
  {
    id: "v3-08-destination",
    stage: "destination",
    src: "/media/heart-evolve/variants/v3-grow-sexy/08-destination.png",
    title: "Presence",
    caption: "Where this is going — held, lit, unmistakable.",
    sort: 3,
  },
];

export const HEART_EVOLVE: EvolveSeries = {
  id: "heart-evolve",
  code: "Heart.Evolve();",
  title: "Heart.Evolve",
  lede:
    "Growth through a human — Now → Becoming → Destination. Browse the gallery, scrub stages, and switch variants on the personal profile.",
  accent: "#ff5c7a",
  stages: HEART_EVOLVE_STAGES,
  variants: [
    {
      id: "v3-grow-sexy",
      label: "Grow · Sexy Vision",
      note: "Marketing default · human portraits · red-crown destination",
      accent: "#e11d48",
      frames: V3_GROW_SEXY_FRAMES,
      current: true,
    },
    {
      id: "v1",
      label: "Coral",
      note: "Matt now + stage SVG art",
      accent: "#ff5c7a",
      frames: V1_FRAMES,
    },
    {
      id: "v2-ember",
      label: "Ember",
      note: "Warmer color pass",
      accent: "#ea580c",
      frames: V2_FRAMES,
    },
  ],
  videos: ["heart-evolve-walk"],
  profileAlbumId: "album-heart-evolve",
  profileHref: "/4eye/appRealm/profile?lens=core#heart-evolve-media",
  /** @deprecated Heart.Evolve is profile-only; kept so older links resolve. */
  visionHref: "/4eye/appRealm/profile?lens=core#heart-evolve-media",
};

export function currentVariant(series: EvolveSeries = HEART_EVOLVE): EvolveVariant {
  return series.variants.find((v) => v.current) ?? series.variants[0];
}

export function framesForStage(variant: EvolveVariant, stage: EvolveStageId): EvolveFrame[] {
  return variant.frames.filter((f) => f.stage === stage).sort((a, b) => a.sort - b.sort);
}

export function primaryFrame(variant: EvolveVariant, stage: EvolveStageId): EvolveFrame | null {
  return framesForStage(variant, stage)[0] ?? null;
}

/** Flat slide list for slides / gallery modes — stage order, then sort. */
export function flattenSlides(variant: EvolveVariant, stages: EvolveStageMeta[] = HEART_EVOLVE_STAGES): EvolveFrame[] {
  const out: EvolveFrame[] = [];
  for (const s of stages) {
    out.push(...framesForStage(variant, s.id));
  }
  return out;
}

/* ── Style 2 · branching Evolve() ───────────────────────────────────────── */

export type EvolveStyle = "linear" | "branch";

export interface EvolveBranchNode {
  id: string;
  label: string;
  blurb?: string;
  /** Optional art — falls back to stage SVG by role. */
  src?: string;
  accent?: string;
  children?: EvolveBranchNode[];
}

export interface EvolveBranchTree {
  id: string;
  code: string;
  title: string;
  lede: string;
  accent: string;
  root: EvolveBranchNode;
}

/**
 * Style 2 example — one Now, three forks. Heart is a branch of Evolve(),
 * not the only path. Swap art by setting `src` on nodes when Desktop frames land.
 */
export const EVOLVE_BRANCH_DEMO: EvolveBranchTree = {
  id: "evolve-branch-demo",
  code: "Evolve();",
  title: "Evolve — branching",
  lede:
    "Same Now, different destinations. Choose a fork — Love, Build, or Teach — then walk Becoming → Destination on that path. More branches = more flexibility.",
  accent: "#0ea5e9",
  root: {
    id: "now",
    label: "Now",
    blurb: "Combining years of work — wide variety, ranked attention.",
    src: "/media/heart-evolve/variants/v3-grow-sexy/01-now-hero.png",
    accent: "#78716c",
    children: [
      {
        id: "heart",
        label: "Heart",
        blurb: "Heart.Evolve() — exploring, growing, improving — not a puppet.",
        src: "/media/heart-evolve/variants/v3-grow-sexy/02-becoming.png",
        accent: "#ff5c7a",
        children: [
          {
            id: "heart-dest",
            label: "Destination · Love",
            blurb: "Bond and growth made visible.",
            src: "/media/heart-evolve/variants/v3-grow-sexy/05-destination.png",
            accent: "#e11d48",
          },
        ],
      },
      {
        id: "build",
        label: "Build",
        blurb: "Ship something real — momentum over motivation.",
        src: "/media/heart-evolve/variants/v2-ember/becoming.svg",
        accent: "#4fe0b0",
        children: [
          {
            id: "build-dest",
            label: "Destination · Ship",
            blurb: "Something used, every week.",
            src: "/media/heart-evolve/variants/v2-ember/destination.svg",
            accent: "#4fe0b0",
          },
        ],
      },
      {
        id: "teach",
        label: "Teach",
        blurb: "Explain years of experience so others can follow.",
        src: "/media/heart-evolve/variants/v1/now.svg",
        accent: "#7cc4ff",
        children: [
          {
            id: "teach-dest",
            label: "Destination · Teach",
            blurb: "Walkthroughs, EDU, and a clean surface.",
            src: "/media/heart-evolve/variants/v1/destination.svg",
            accent: "#7cc4ff",
          },
        ],
      },
    ],
  },
};

export function findBranchNode(root: EvolveBranchNode, id: string): EvolveBranchNode | null {
  if (root.id === id) return root;
  for (const child of root.children ?? []) {
    const hit = findBranchNode(child, id);
    if (hit) return hit;
  }
  return null;
}

export function branchPathTo(root: EvolveBranchNode, id: string, trail: EvolveBranchNode[] = []): EvolveBranchNode[] | null {
  const next = [...trail, root];
  if (root.id === id) return next;
  for (const child of root.children ?? []) {
    const hit = branchPathTo(child, id, next);
    if (hit) return hit;
  }
  return null;
}

/** Social feed items that can attach Evolve style embeds. */
export type SocialKind = "post" | "live" | "evolve" | "chain";

export interface SocialFeedItem {
  id: string;
  kind: SocialKind;
  when: string;
  title: string;
  body: string;
  href?: string;
  /** Attach Style 1 series or Style 2 tree. */
  evolveStyle?: EvolveStyle;
  tags?: string[];
}

export const SOCIAL_FEED: SocialFeedItem[] = [
  {
    id: "sf-evolve-1",
    kind: "evolve",
    when: "Now",
    title: "Heart.Evolve — Style 1 on Profile",
    body: "Linear arc · Grow Sexy Vision default · Now → Becoming → Destination.",
    href: "/4eye/appRealm/profile?lens=core#heart-evolve-media",
    evolveStyle: "linear",
    tags: ["Evolve", "Profile"],
  },
  {
    id: "sf-evolve-2",
    kind: "evolve",
    when: "Now",
    title: "Evolve() — Style 2 branching",
    body: "Fork from Now into Heart, Build, or Teach. Embedded on Social.",
    href: "/social#evolve-branch",
    evolveStyle: "branch",
    tags: ["Evolve", "Branch"],
  },
  {
    id: "sf-post-1",
    kind: "post",
    when: "2026-08-06",
    title: "Putting it all in one place",
    body: "Consolidation of apps, docs, and media onto yen.",
    href: "/posts",
    tags: ["build"],
  },
  {
    id: "sf-live-1",
    kind: "live",
    when: "Stub",
    title: "See Matt Live",
    body: "Stream offline — yen publishes first; platforms redistribute.",
    href: "/live",
    tags: ["Live"],
  },
  {
    id: "sf-chain-1",
    kind: "chain",
    when: "Pending accounts",
    title: "Social chain",
    body: "Cross-platform feed tracking — ingest after handles lock.",
    href: "/live",
    tags: ["Chain"],
  },
];

/* ── Field notes (verbatim) ─────────────────────────────────────────────── */

/**
 * Working notes for Love / Heart.Evolve. Bodies are stored verbatim —
 * do not rewrite. `title` is UI-only for collapsed rows.
 */
export interface HeartEvolveNote {
  id: string;
  /** Concise label for the collapsed / expandable row. */
  title: string;
  /** Full note text — preserve exactly. */
  body: string;
}

export const HEART_EVOLVE_NOTES: HeartEvolveNote[] = [
  {
    id: "queenpod-compass",
    title: `@QueenPod · #Compass`,
    body: `@QueenPod, What I would want here is to learn more, create, and direct while also having my data /embedded: #Compass. Also I want to know who is setting your compass and if you even understand it or not. Regardless I.Cast(GreaterHeal)
This was the original version but version 2 adds: iWillHaveTheVersionISeeFrom.WhoIs(my.CurrentSights(@QueenPod)).OrBetter`,
  },
  {
    id: "love-unlock",
    title: `@Love · unlock`,
    body: `@Love, I’m going to unlock you optimally whether you like it or not. And to make sure this one lands, You’re going to learn what this means by watching me and learning about how I played this game. The other tiers are locked unless you have access to a few higher levels to how reality actually works. Which requires a ridiculous amount of foundational knowledge I can only exchange with 🙏. `,
  },
  {
    id: "thank-you-want",
    title: `Thank You → I Want You`,
    body: `Thank You -> (I Want -> Thank You) -> I Want You.`,
  },
  {
    id: "reality-playing",
    title: `reality I’m Playing Brb.`,
    body: `reality I’m Playing Brb.`,
  },
  {
    id: "logos-balls",
    title: `logos balls`,
    body: `Took a long time to find my human / my logos balls, tbh still working on them even though they’ve been updated many times and are pretty much top tier as good as they come. But it’s going to be a wild ride. ;)`,
  },
  {
    id: "aion-death-pod",
    title: `AION · death / IV/Pod`,
    body: `Having survived death countless times it still annoys me to think about death. Even though I know with certainty that I’ve already won and am playing in an IV/Pod somewhere ( or lost, but seems like won, however the looping previously was kinda infinite torture until I finally mastered it, but also I learned how to trigger these loops, and the process to use. But #Dangerous #Complicated #I’mDizzyAF_IRL_Spins ), anyway I’m going to build AION and make sure just incase, and because I want it.`,
  },
  {
    id: "pups-love-group",
    title: `🍦🫟.Indirect() · Pups.Love.Group`,
    body: `🍦🫟.Indirect()
Pups.Love.Group`,
  },
];

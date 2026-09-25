/**
 * Planning — Traits (the "Component" in ECS)
 *
 * Traits are composable data slices attached to an Entity. Every entity can
 * carry any subset; shared views read traits uniformly (e.g. all entities
 * with a WeightTrait render a WeightMeter).
 *
 * Discriminated union on `kind`.
 */

/** Depth / complexity, 1 (shallow) → 7 (deep). Optional per relationship. */
export interface DepthTrait {
  kind: "depth";
  /** 1..7 */
  value: number;
}

/** Broad importance / weight, 0..100. */
export interface WeightTrait {
  kind: "weight";
  /** 0..100 */
  value: number;
}

export type StatusValue =
  | "idea"
  | "planned"
  | "active"
  | "blocked"
  | "review"
  | "done"
  | "archived";

export interface StatusTrait {
  kind: "status";
  value: StatusValue;
}

/** Scheduling window. */
export interface ScheduleTrait {
  kind: "schedule";
  start?: number;
  due?: number;
  completedAt?: number;
}

/** Fibonacci estimate points. */
export type EstimatePoints = 1 | 2 | 3 | 5 | 8 | 13 | 21;

export interface EstimateTrait {
  kind: "estimate";
  points: EstimatePoints;
}

/**
 * Marks an entity as goal-directed and able to own a work hierarchy
 * (Epics-per-Entity). Children are linked via Relationship edges
 * (relationType: "epic-of" | "task-of"), not embedded here.
 */
export interface GoalDirectedTrait {
  kind: "goalDirected";
  /** Optional outcome statement. */
  outcome?: string;
}

/** Ownership / assignment. */
export interface OwnerTrait {
  kind: "owner";
  /** Owning profile/user entity id. */
  ownerId: string;
}

/**
 * A named version milestone along an item's completion journey — e.g. the
 * point at which it became "MVP", "v2", or "1.0". Positioned by completion %,
 * NOT by date, so the same bar reads as both progress and a release roadmap.
 */
export interface ProgressMilestone {
  /** 0..100 — the completion point at which this version is reached. */
  at: number;
  /** Short version label, e.g. "MVP", "v2", "1.0". */
  label: string;
  /** Optional one-line description of what this version delivers. */
  note?: string;
}

/**
 * Completion / build-out progress, distinct from {@link StatusTrait} (a single
 * lifecycle state) and {@link WeightTrait} (importance). Splits the *envisioned*
 * scope into three contiguous bands so a glance answers "how much is done, how
 * much is committed, and how much is still open horizon":
 *
 *   done      — finished and shipped
 *   planned   — committed but not yet done
 *   ideas     — the remainder (100 - done - planned): open horizon that can
 *               still grow as new ideas land
 *
 * `milestones` overlay named versions (MVP/v2/...) onto that bar.
 */
export interface ProgressTrait {
  kind: "progress";
  /** 0..100 — share of envisioned scope completed. */
  done: number;
  /**
   * 0..100 — committed-but-unfinished share. `done + planned` should be ≤ 100;
   * the remainder is treated as open "ideas / horizon". Defaults to 0.
   */
  planned?: number;
  /** Named version milestones along the journey, ordered by completion %. */
  milestones?: ProgressMilestone[];
}

export type Trait =
  | DepthTrait
  | WeightTrait
  | StatusTrait
  | ScheduleTrait
  | EstimateTrait
  | GoalDirectedTrait
  | OwnerTrait
  | ProgressTrait;

export type TraitKind = Trait["kind"];

/** Narrowing helper: find the first trait of a given kind. */
export function getTrait<K extends TraitKind>(
  traits: Trait[],
  kind: K,
): Extract<Trait, { kind: K }> | undefined {
  return traits.find((t) => t.kind === kind) as
    | Extract<Trait, { kind: K }>
    | undefined;
}

/** The three contiguous scope bands derived from a {@link ProgressTrait}. */
export interface ProgressBands {
  /** 0..100 — finished. */
  done: number;
  /** 0..100 — committed but unfinished. */
  planned: number;
  /** 0..100 — open horizon / new ideas (the remainder). */
  ideas: number;
}

/** Resolve and clamp the done/planned/ideas bands so they always sum to 100. */
export function progressBands(p: ProgressTrait): ProgressBands {
  const done = Math.max(0, Math.min(100, p.done));
  const planned = Math.max(0, Math.min(100 - done, p.planned ?? 0));
  return { done, planned, ideas: 100 - done - planned };
}

/** Derived version standing for a {@link ProgressTrait}. */
export interface VersionState {
  /** Milestones sorted ascending by `at`. */
  ordered: ProgressMilestone[];
  /** Highest milestone whose `at` ≤ `done` — the version the item is "at" now. */
  current?: ProgressMilestone;
  /** First milestone still ahead of `done` — the version being worked toward. */
  next?: ProgressMilestone;
  /** Completion points remaining until `next` is reached (0 if none). */
  toNext: number;
}

/**
 * Derive the current/next named version from a progress trait. "Current" is the
 * latest milestone already reached by `done`; "next" is the first one ahead.
 */
export function versionState(p: ProgressTrait): VersionState {
  const ordered = (p.milestones ?? []).slice().sort((a, b) => a.at - b.at);
  const done = Math.max(0, Math.min(100, p.done));
  let current: ProgressMilestone | undefined;
  let next: ProgressMilestone | undefined;
  for (const m of ordered) {
    if (m.at <= done) current = m;
    else if (!next) next = m;
  }
  return { ordered, current, next, toNext: next ? Math.max(0, next.at - done) : 0 };
}

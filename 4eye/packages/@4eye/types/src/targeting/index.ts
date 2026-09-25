/**
 * Targeting System — Actor / Aim role assignments
 *
 * Three relations, not three equal buckets:
 *
 * - Actor: who performs the prompt.
 * - Aim (target role): the directed action — the primary cursor.
 * - Who else (audiences): the room we are also targeting and trying
 *   to fit into. Surrounds the work; it is not the cursor.
 *
 * Targets in selected context that are not aimed are *included*: they
 * ride along without being the focus. Connections are inferred at the
 * AI layer.
 */

export type TargetRole = "actor" | "target";

export interface TargetRoleMeta {
  id: TargetRole;
  label: string;
  pluralLabel: string;
  /** Verb-ish label for the directed action ("Aim" for targets). */
  actionLabel: string;
  /** Empty-state copy. */
  emptyLabel: string;
  /** One-line hint for tooltips. */
  hint: string;
  /** Primary brand color for the role (used in chips, panels). */
  color: string;
  /** Soft fill (rgba) for panel backgrounds. */
  softColor: string;
  /** Border tint (rgba) for panel outlines. */
  borderColor: string;
}

export const TARGET_ROLE_META: Record<TargetRole, TargetRoleMeta> = {
  actor: {
    id: "actor",
    label: "Actor",
    pluralLabel: "Actors",
    actionLabel: "Who",
    emptyLabel: "Who acts",
    hint: "Who performs the prompt",
    // Blue — synced with the Targets entity-kind color so the action
    // bar's Actor panel and the Targets & Actors screen read as one
    // system. Differentiation from Aim is by cursor, not hue.
    color: "#3b82f6",
    softColor: "rgba(59, 130, 246, 0.10)",
    borderColor: "rgba(59, 130, 246, 0.35)",
  },
  target: {
    id: "target",
    label: "Target",
    pluralLabel: "Targets",
    actionLabel: "Aim",
    emptyLabel: "Aim here",
    hint: "Direct action — the primary cursor of this prompt. Other people can ride along as included without being the aim.",
    color: "#ef4444",
    softColor: "rgba(239, 68, 68, 0.10)",
    borderColor: "rgba(239, 68, 68, 0.35)",
  },
};

/** Who else we are targeting and trying to fit in — not the cursor. */
export const AUDIENCE_CAST_META = {
  label: "Who else",
  emptyLabel: "who else",
  hint: "Who else this is for — the room we are fitting into, not the cursor",
  color: "#22c55e",
} as const;

/** Selected targets that ride along without being the aim. */
export const INCLUDED_CAST_META = {
  label: "Included",
  emptyLabel: "none included",
  hint: "In the prompt without being the cursor — things that ride along",
  color: "#94a3b8",
} as const;

export const TARGET_ROLES: TargetRole[] = ["actor", "target"];

/**
 * A single role-assignment of a Target to a prompt.
 * `id` is the assignment id (so the same Target can be assigned
 * multiple times with distinct removal handles).
 */
export interface TargetAssignment {
  id: string;
  role: TargetRole;
  /** Reference to a Target entity in ContextData. */
  targetId: string;
  createdAt: number;
}

export interface TargetingState {
  actors: TargetAssignment[];
  targets: TargetAssignment[];
}

export const EMPTY_TARGETING_STATE: TargetingState = {
  actors: [],
  targets: [],
};

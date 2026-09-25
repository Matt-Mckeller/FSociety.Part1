/**
 * Shared types for the right-side map context panel.
 *
 * Two data domains:
 *  - RoleGoalContent: keyed by (role, goal). Drives the Features /
 *    Problems / Goals accordions — role-relevant lenses on 4eye.
 *  - LocationContent: keyed by current map page. Drives the Next
 *    Best Actions list + Navigation Suggestions per direction.
 */

import type { ComponentType } from "react";
import type { SvgIconProps } from "@mui/material";

import type { RealmKey } from "@4eye/web/lib/hud/realmRegistry";

export type RoleKey =
  | "default"
  | "students"
  | "teachers"
  | "professionals"
  | "organizations"
  | "parents";

/**
 * @deprecated Prefer {@link RealmKey} from `@4eye/web/lib/hud/realmRegistry`. Kept as a
 * back-compat alias while HUD components migrate to the registry name.
 */
export type ActiveMapKey = RealmKey;

export type Direction = "up" | "down" | "left" | "right";

export type SvgIconLike = ComponentType<SvgIconProps>;

/** A clickable list item under Features / Problems / Goals / NBA. */
export interface ContentItem {
  id: string;
  label: string;
  Icon?: SvgIconLike;
  blurb?: string;
  /** Tile id to navigate to when clicked. */
  tileId?: string;
}

/** Content shown by the role-relevant accordions for a (role, goal) pair. */
export interface RoleGoalContent {
  features: ContentItem[];
  problems: ContentItem[];
  goals: ContentItem[];
}

/** A single direction slot in the Navigation Suggestions section. */
export interface DirectionSlot {
  question: "Why" | "What" | "Who" | "How";
  QuestionIcon: SvgIconLike;
  pageLabel: string;
  /**
   * Small icon shown next to `pageLabel` in the card header so the
   * destination reads as `Strategy 📊` etc.
   */
  PageIcon: SvgIconLike;
  /**
   * Effort to reach / engage with the destination.
   * 1 = easy, 5 = hard. Drives the heart-meter at the bottom-right
   * of the card.
   */
  difficulty: 1 | 2 | 3 | 4 | 5;
  /**
   * Rough time-to-value. Shows in the difficulty tooltip so the game
   * vibe (hearts) is preserved while adding actionable context.
   * Example: `"~2 min"`
   */
  minutesEstimate?: string;
  /**
   * One-line reason why this direction is recommended for the user
   * right now. Only rendered on the recommended card.
   */
  recommendationReason?: string;
  tileId?: string;
  chipKinds: ChipKind[];
}

/** Per-page overrides for the lower-right panel sections. */
export interface LocationContent {
  nextBestActions?: ContentItem[];
  navigation?: Partial<Record<Direction, DirectionSlot>>;
}

/** Chip kinds in the Navigation Suggestions chip taxonomy. */
export type ChipKind =
  | "emotion"
  | "purpose"
  | "highValue"
  | "highlights"
  | "explore"
  | "details"
  | "demo"
  | "feelings"
  | "process"
  | "memory"
  | "factual"
  | "media"
  | "brand"
  | "money"
  | "future";

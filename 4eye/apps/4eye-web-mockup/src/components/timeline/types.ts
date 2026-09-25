/**
 * Shared types for the SlideshowTimeline family (desktop + mobile variants
 * + the responsive facade).
 */

import type { ComponentType } from "react";

/**
 * Render-prop interface for the per-step icon shown under each dot in the
 * timeline. Kept intentionally small and source-agnostic so the host can
 * mix MUI icons (`<MuiIcon sx={{ fontSize: size, color }} />`) with custom
 * brand SVGs (e.g. `<CoinStackIcon size={size} color={color} />`) by
 * wrapping each one in a thin adapter component.
 */
export interface TimelineStepIconProps {
  /** Square render size in px (width = height). */
  size: number;
  /**
   * Foreground color. Adapters should use this for the icon's primary
   * fill so each icon picks up the active/group dot color.
   */
  color: string;
}

export type TimelineStepIconComponent = ComponentType<TimelineStepIconProps>;

/**
 * One step in a SlideshowTimeline. The host page maps each of its slides
 * to one TimelineStep.
 */
export interface TimelineStep {
  /** Stable id; can be a slide DOM id or a synthetic key. */
  id: string;
  /** Short label shown under the dot on desktop. Kept under ~12 chars. */
  label: string;
  /**
   * Optional uppercase eyebrow word shown ABOVE the active group label in
   * the header (e.g. "Domain" for the Reach step). Per-step so different
   * steps in the same group can frame the act differently.
   */
  tabTitle?: string;
  /**
   * Optional secondary descriptor shown BELOW the active group label in the
   * header (e.g. "where and when"). On mobile it replaces the per-step title
   * line if present, since mobile only has room for one descriptor.
   */
  subLabel?: string;
  /**
   * Optional grouping bucket (e.g. an "act" / "section" id). When two
   * adjacent steps share the same `groupId`, they're treated as part of
   * the same group for color and the active-group label in the header.
   */
  groupId?: string | number;
  /**
   * Optional icon shown UNDER the dot in place of the inline text label
   * for the active and future cells. When present, the cell renders
   * `<Icon size={...} color={...} />` instead of the `tabTitle`/`label`
   * text. Past beads + mobile future-overflow beads stay bare regardless
   * (they show `label` as a tooltip on hover/focus).
   */
  Icon?: TimelineStepIconComponent;
}

/**
 * Visual metadata for a group of steps. Matched against
 * `TimelineStep.groupId`.
 *
 * In the windowed timeline design, group `color` values are used to build the
 * deck-spanning SVG gradient line (stops ordered by deck traversal), the active
 * bottom-edge accent, and the active-group label in the header. Per-dot colors
 * are sampled from the gradient at each step's deck position (past/active dots
 * filled, future dots hollow).
 */
export interface TimelineGroup {
  id: string | number;
  /** Display label shown in the active-group header. */
  label: string;
  /**
   * CSS color used for this group's segment of the gradient line, the
   * bottom-edge accent when this group is active, and the header label tint.
   */
  color: string;
}

export interface SlideshowTimelineProps {
  /** All steps, in slideshow order. */
  steps: TimelineStep[];
  /** Index of the currently visible slide. Controlled. */
  activeIdx: number;
  /** Called when the user clicks a step / chevron. */
  onStepClick: (idx: number) => void;
  /**
   * Optional group definitions. When provided, group colors are used to
   * build the deck-spanning SVG gradient line (stops in deck order) and
   * the active group's color tints the bottom accent, header label, and
   * AutoplayProgressBar. The active group's label shows in the header.
   */
  groups?: TimelineGroup[];
  /**
   * Default color used when no group is active or when groups are absent.
   * @default theme primary-ish blue
   */
  defaultColor?: string;
  /**
   * Per-slide auto-advance progress, in milliseconds. When provided,
   * the timeline renders a thin top-edge progress bar that fills from
   * 0% to 100% over `autoplayDurationMs`, then resets when
   * {@link autoplayKey} changes (typically the active slide id or a
   * play-cycle counter). Pass `null`/`undefined` to hide the bar
   * (e.g. when auto-play is paused or the cursor is over the stage).
   */
  autoplayDurationMs?: number | null;
  /**
   * Identifier that, when changed, restarts the auto-advance progress
   * bar from 0%. Typically the active step id concatenated with a
   * play-cycle counter so toggling pause→play also resets the fill.
   */
  autoplayKey?: string | number;
}

/**
 * Intrinsic heights (px) of each variant, including their floating top
 * inset. Consumers reserving space below the timeline should use
 * {@link useSlideshowTimelineHeight} so they switch in lockstep with the
 * facade's variant choice.
 *
 * Desktop height unchanged at 144px — the windowed dot strip + header fit
 * within the same envelope as before (no LinearProgress row to account for;
 * the gradient dot row replaces it at similar height).
 */
export const TIMELINE_HEIGHT_DESKTOP_PX = 144;
export const TIMELINE_HEIGHT_MOBILE_PX = 76;

import * as React from "react";

import { BrandIcon, type BrandIconProps } from "./BrandIcon";

/**
 * Section and surfaced-card glyphs for the profile surface, plus the two
 * control icons the disclosure and density toggles need.
 *
 * Same house style as `lenses.tsx`: 24×24, `currentColor`, secondary detail at
 * `opacity 0.85`, circle-and-orbit geometry over literal objects.
 */

/** Goals — a target with an offset mark. */
export function GoalsIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z" opacity="0.85" />
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" opacity="0.85" />
      <circle cx="12" cy="12" r="1.8" />
    </BrandIcon>
  );
}

/** Actions — a bolt. */
export function ActionsIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M13.5 2 5 13h5.2l-1.7 9L19 11h-5.2l1.7-9h-2Z" />
    </BrandIcon>
  );
}

/** Events — a dial with a swept hand. */
export function EventsIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z" opacity="0.85" />
      <path d="M11 6.5h2V12l3.6 2.1-1 1.7L11 13.2V6.5Z" />
    </BrandIcon>
  );
}

/** Summary — stacked bars: state at a glance. */
export function SummaryIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M3 5h13a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2Z" />
      <path d="M3 11h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2Z" opacity="0.85" />
      <path d="M3 17h9a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2Z" opacity="0.85" />
    </BrandIcon>
  );
}

/** Focus — a ring narrowed by brackets. */
export function FocusIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M3 7V4a1 1 0 0 1 1-1h3v2H5v2H3Zm18 0V5h-2V3h3a1 1 0 0 1 1 1v3h-2ZM3 17h2v2h2v2H4a1 1 0 0 1-1-1v-3Zm18 0v3a1 1 0 0 1-1 1h-3v-2h2v-2h2Z" opacity="0.85" />
    </BrandIcon>
  );
}

/** Current goal — a flag. */
export function CurrentGoalIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M5 2a1 1 0 0 1 1 1v18a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1Z" />
      <path d="M7 4h11.5a1 1 0 0 1 .8 1.6L16.8 9l2.5 3.4a1 1 0 0 1-.8 1.6H7V4Z" opacity="0.85" />
    </BrandIcon>
  );
}

/** Next action — a forward chevron in a ring. */
export function NextActionIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z" opacity="0.85" />
      <path d="M10.5 8 15 12l-4.5 4-1.4-1.4L12.2 12 9.1 9.4 10.5 8Z" />
    </BrandIcon>
  );
}

/** Highest value — a faceted mark. */
export function HighestValueIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2 3 9l9 13 9-13-9-7Zm0 2.6 6.3 4.9L12 18.4 5.7 9.5 12 4.6Z" />
      <path d="M12 7.5 15.5 10 12 15 8.5 10 12 7.5Z" opacity="0.85" />
    </BrandIcon>
  );
}

/**
 * Chevron — the disclosure affordance. Points right when collapsed; callers
 * rotate it 90° when open rather than swapping glyphs, so the motion reads.
 */
export function ChevronIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M9 5.5 15.5 12 9 18.5 7.6 17.1 12.7 12 7.6 6.9 9 5.5Z" />
    </BrandIcon>
  );
}

/** Density — three rules at decreasing gaps. */
export function DensityIcon(props: BrandIconProps) {
  return (
    <BrandIcon {...props}>
      <path d="M3 4h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2Z" />
      <path d="M3 11h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2Z" opacity="0.85" />
      <path d="M3 15.5h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2Z" opacity="0.85" />
      <path d="M3 19.5h18a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2Z" opacity="0.85" />
    </BrandIcon>
  );
}

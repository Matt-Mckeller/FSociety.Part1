"use client";

/**
 * Command Center — strategic focus glyphs.
 *
 * One custom mark per entry in `STRATEGIC_FOCUSES`, built on the shared
 * {@link BrandIcon} shell (24×24, `currentColor`) exactly like
 * `planning-glyphs.tsx`.
 *
 * These replace the emoji that the focus data carries in its `glyph` field.
 * Emoji were doing real work — they made a row scannable — but they render at
 * the platform's whim rather than ours: fixed colour, inconsistent optical
 * weight, and a different metric box per glyph, which is why the direction rows
 * never quite lined up. A `currentColor` mark takes the focus's own colour, so
 * the row's identity comes from the same palette as everything else on the
 * surface.
 *
 * The `glyph` emoji stays in the data. It is still the fallback for any surface
 * that has not moved over, and it is the authored intent each mark was drawn
 * from.
 *
 * Keyed by focus id rather than by name or emoji: ids are the stable handle,
 * and an unknown id falls back to the generic focus mark rather than rendering
 * a hole.
 */

import * as React from "react";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

import { StrategicFocusGlyph } from "./planning-glyphs";

type GlyphProps = Omit<BrandIconProps, "children">;

/**
 * Marketing / storytelling / support (✨) — a source broadcasting outward.
 * The story is the core; the arcs are it reaching people.
 */
export function SignalGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="6.5" cy="12" r="3.1" />
      <path d="M11.5 6.6 A7.4 7.4 0 0 1 11.5 17.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M16 3.8 A11.4 11.4 0 0 1 16 20.2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.42" />
    </BrandIcon>
  );
}

/**
 * Planning & clarity (🧭) — a plan sheet with the decided point marked.
 * Clarity is the marker, not the sheet: a plan with nothing settled on it is
 * the state this focus exists to leave.
 */
export function PlanGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <rect x="3.4" y="3.6" width="17.2" height="16.8" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.45" />
      <path d="M7 8.6 H17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M7 12.6 H13.4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      <circle cx="16.4" cy="16.2" r="2.6" />
    </BrandIcon>
  );
}

/** Launch strategy (🚀) — a trajectory off a fixed origin, nose already clear. */
export function LaunchGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M4 20.5 Q7.5 7.5 18.5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="4" cy="20.5" r="2.2" opacity="0.5" />
      <path d="M21.4 2.6 L14.6 5.2 L18.8 9.4 Z" />
    </BrandIcon>
  );
}

/** Product development (⚙️) — a built object: three faces, assembled. */
export function BuildGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 2.4 L21 7 L12 11.6 L3 7 Z" />
      <path d="M3 8.8 L11.2 13 L11.2 21.4 L3 17.2 Z" opacity="0.72" />
      <path d="M21 8.8 L21 17.2 L12.8 21.4 L12.8 13 Z" opacity="0.46" />
    </BrandIcon>
  );
}

/** Health & mind optimization (🧠) — a vital sign crossing the whole system. */
export function VitalityGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.4" />
      <path
        d="M3.4 12 H7.6 L9.6 7.6 L12.6 16.4 L14.6 12 H20.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BrandIcon>
  );
}

/** Growth, scaling & timing (📈) — a compounding curve off a baseline. */
export function GrowthGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M3 20.8 H21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.3" />
      <path d="M4 18.2 C10 17.6 14.4 13.4 16.4 6.4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20.6 3.2 L13.9 5.2 L18.2 9.2 Z" opacity="0.85" />
    </BrandIcon>
  );
}

/** Financial goals (💰) — a coin stack, drawn bottom-up so the top reads first. */
export function CoinsGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <ellipse cx="12" cy="17.4" rx="8" ry="3.2" opacity="0.42" />
      <ellipse cx="12" cy="13" rx="8" ry="3.2" opacity="0.66" />
      <ellipse cx="12" cy="8.6" rx="8" ry="3.2" />
    </BrandIcon>
  );
}

/**
 * Focus id → mark. Unknown ids get the generic strategic-focus target, which is
 * the honest answer for "a focus we have not drawn yet".
 */
const FOCUS_GLYPHS: Record<string, (props: GlyphProps) => React.ReactElement> = {
  "sf-quality": SignalGlyph,
  "sf-planning": PlanGlyph,
  "sf-launch": LaunchGlyph,
  "sf-execution": BuildGlyph,
  "sf-product": BuildGlyph,
  "sf-health": VitalityGlyph,
  "sf-growth": GrowthGlyph,
  "sf-financial": CoinsGlyph,
};

/** Renders the custom mark for a strategic focus. */
export function FocusGlyph({ id, ...props }: GlyphProps & { id: string }) {
  const Glyph = FOCUS_GLYPHS[id] ?? StrategicFocusGlyph;
  return <Glyph {...props} />;
}

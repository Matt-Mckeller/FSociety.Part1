"use client";

/**
 * Character Direction glyphs — marks for the profile compass.
 *
 * Separate from Command Center `focus-glyphs`. Planning draws product, clarity,
 * and health. This surface draws vision, belief, launch, money, and support.
 */

import * as React from "react";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

type GlyphProps = Omit<BrandIconProps, "children">;

/** Vision + Growth + Followers — an eye, a compounding curve, orbiting supporters. */
export function VisionGrowthGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path
        d="M4.2 9.4 C6.4 6.6 9.2 5.4 12 5.4 C14.8 5.4 17.6 6.6 19.8 9.4 C17.6 12.2 14.8 13.4 12 13.4 C9.2 13.4 6.4 12.2 4.2 9.4 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.7"
      />
      <circle cx="12" cy="9.4" r="2.1" opacity="0.95" />
      <path
        d="M5 20 C9.4 19.4 13.2 16.2 15.2 11.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="18.4" cy="16.6" r="1.5" opacity="0.8" />
      <circle cx="7.2" cy="17.8" r="1.2" opacity="0.55" />
      <circle cx="20.2" cy="20.2" r="1.1" opacity="0.45" />
    </BrandIcon>
  );
}

/** Belief — a flame held in a settled ring. */
export function BeliefGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.32" />
      <path
        d="M12 4.6 C12 4.6 8.4 9.4 8.4 12.6 C8.4 15.4 10 17.4 12 17.4 C14 17.4 15.6 15.4 15.6 12.6 C15.6 9.4 12 4.6 12 4.6 Z"
        opacity="0.95"
      />
      <path
        d="M12 10.4 C12.8 11.2 13.2 12.2 13.2 13.2"
        fill="none"
        stroke="#fff"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.45"
      />
    </BrandIcon>
  );
}

/** Launch — a trajectory off a fixed origin, nose already clear. */
export function DirectionLaunchGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path
        d="M4 20.5 Q7.5 7.5 18.5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="4" cy="20.5" r="2.2" opacity="0.5" />
      <path d="M21.4 2.6 L14.6 5.2 L18.8 9.4 Z" />
    </BrandIcon>
  );
}

/** Money — coin stack, bottom-up so the top reads first. */
export function DirectionMoneyGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <ellipse cx="12" cy="17.4" rx="8" ry="3.2" opacity="0.42" />
      <ellipse cx="12" cy="13" rx="8" ry="3.2" opacity="0.66" />
      <ellipse cx="12" cy="8.6" rx="8" ry="3.2" />
    </BrandIcon>
  );
}

/** Marketing / storytelling / support — a source broadcasting outward. */
export function StorySupportGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="6.5" cy="12" r="3.1" />
      <path
        d="M11.5 6.6 A7.4 7.4 0 0 1 11.5 17.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M16 3.8 A11.4 11.4 0 0 1 16 20.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.42"
      />
    </BrandIcon>
  );
}

const DIRECTION_GLYPHS: Record<string, (props: GlyphProps) => React.ReactElement> = {
  "cd-vision-growth": VisionGrowthGlyph,
  "cd-belief": BeliefGlyph,
  "cd-launch": DirectionLaunchGlyph,
  "cd-money": DirectionMoneyGlyph,
  "cd-market-story-support": StorySupportGlyph,
};

export function DirectionFocusGlyph({ id, ...props }: GlyphProps & { id: string }) {
  const Glyph = DIRECTION_GLYPHS[id] ?? VisionGrowthGlyph;
  return <Glyph {...props} />;
}

"use client";

/**
 * Work glyphs — custom marks for Matthew's equipped tasks.
 *
 * Same BrandIcon / currentColor language as the Direction focus glyphs, so
 * Tasks and Direction read as one system rather than emoji next to drawings.
 */

import * as React from "react";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

type GlyphProps = Omit<BrandIconProps, "children">;

/** Grow() · Achieve() — a rising stem with branching opportunity. */
export function EntrepreneurshipGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 20.5 V9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
      <path d="M12 14.5 C8.5 14.5, 6.2 11.8, 5.5 8.2 C8.2 9, 10.5 10.8, 12 14.5 Z" opacity="0.9" />
      <path d="M12 12.5 C15.5 12.5, 17.8 9.8, 18.5 6.2 C15.8 7, 13.5 8.8, 12 12.5 Z" opacity="0.65" />
      <circle cx="12" cy="6.2" r="2.2" opacity="0.95" />
    </BrandIcon>
  );
}

/** Creating Content, Storytelling, Designing — a frame with a capture diamond. */
export function MakingContentGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <rect x="3.2" y="5.5" width="17.6" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.5" />
      <circle cx="12" cy="12" r="3.8" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.75" />
      <circle cx="12" cy="12" r="1.5" opacity="0.95" />
      <path d="M17.2 4.2 H20 V7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
    </BrandIcon>
  );
}

/** Fishing for Love, Money, and Fame — a hook catching a heart. */
export function FishingLoveGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path
        d="M12 21 C12 21, 3.5 15.2, 3.5 9.8 C3.5 7.2, 5.4 5.5, 7.8 5.5 C9.4 5.5, 10.8 6.4, 12 8 C13.2 6.4, 14.6 5.5, 16.2 5.5 C18.6 5.5, 20.5 7.2, 20.5 9.8 C20.5 15.2, 12 21, 12 21 Z"
        opacity="0.92"
      />
      <path d="M12 3.2 V8.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.45" />
      <path d="M12 3.2 C14.8 3.2, 16.8 5, 16.8 7.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
    </BrandIcon>
  );
}

/** Playing 1Game / today's pin — a target with a capture diamond. */
export function DemoVisionGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.35" />
      <circle cx="12" cy="12" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.65" />
      <circle cx="12" cy="12" r="1.6" opacity="0.95" />
      <path d="M12 2.6 V5.4 M12 18.6 V21.4 M2.6 12 H5.4 M18.6 12 H21.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </BrandIcon>
  );
}

/** 4eye — an eye with a four-mark iris. */
export function FourEyeWorkGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M3.2 12 C5.8 7.2, 8.8 5.2, 12 5.2 C15.2 5.2, 18.2 7.2, 20.8 12 C18.2 16.8, 15.2 18.8, 12 18.8 C8.8 18.8, 5.8 16.8, 3.2 12 Z" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.55" />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.85" />
      <circle cx="12" cy="12" r="1.35" opacity="0.95" />
    </BrandIcon>
  );
}

/** EDU — a page opening outward. */
export function EduWorkGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M5 5.2 H12 V18.8 H5.8 C5.2 18.8, 4.8 18.4, 4.8 17.8 V6 C4.8 5.5, 5.2 5.2, 5 5.2 Z" opacity="0.35" />
      <path d="M12 5.2 H19 C19.4 5.2, 19.2 5.5, 19.2 6 V17.8 C19.2 18.4, 18.8 18.8, 18.2 18.8 H12 V5.2 Z" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.8" />
      <path d="M14.2 8.4 H17.2 M14.2 11.2 H17.2 M14.2 14 H16.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </BrandIcon>
  );
}

/** Recording App — a record disc with a mark. */
export function RecordingAppGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.5" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.8" />
      <circle cx="12" cy="12" r="1.2" opacity="0.95" />
      <path d="M18.6 5.4 L20.2 4.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
      <circle cx="18.2" cy="6.2" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
    </BrandIcon>
  );
}

/** Going after #1 — a podium peak with a single point. */
export function GoingAfterOneGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M4 19.5 H20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.35" />
      <path d="M7.5 19.5 V13.5 H10.8 V19.5 Z" opacity="0.45" />
      <path d="M13.2 19.5 V15.2 H16.5 V19.5 Z" opacity="0.35" />
      <path d="M9.6 13.2 V7.2 H14.4 V13.2 Z" opacity="0.9" />
      <path d="M12 3.2 L13.4 6.2 H12 Z" opacity="0.95" />
      <circle cx="12" cy="2.4" r="1.1" opacity="0.95" />
    </BrandIcon>
  );
}

const WORK_GLYPHS: Record<string, (props: GlyphProps) => React.ReactElement> = {
  "work-demo-vision": DemoVisionGlyph,
  "work-4eye": FourEyeWorkGlyph,
  "work-edu": EduWorkGlyph,
  "work-recording-app": RecordingAppGlyph,
  "work-entrepreneurship": EntrepreneurshipGlyph,
  "work-content": MakingContentGlyph,
  "work-love": FishingLoveGlyph,
  "work-number-one": GoingAfterOneGlyph,
};

export function WorkGlyph({ id, ...props }: GlyphProps & { id: string }) {
  const Glyph = WORK_GLYPHS[id];
  if (!Glyph) return null;
  return <Glyph {...props} />;
}

"use client";

/**
 * Perspective glyphs — marks for life-domain stances on the Brain lens.
 *
 * Same BrandIcon shell as habit / effect / priority glyphs so Politics and
 * Love sit in the same drawn language as Money.AmplifyMe and Synthesis Lock.
 * Emoji were platform-drawn and ignored `currentColor`, so domain colour
 * never reached the icon.
 */

import * as React from "react";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

type GlyphProps = Omit<BrandIconProps, "children">;

function PoliticsGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 19.5 H20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />
      <path d="M6 19.5 V10.5 L12 5.5 L18 10.5 V19.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" opacity="0.85" />
      <path d="M10 19.5 V14 H14 V19.5" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.95" />
      <circle cx="12" cy="10.2" r="1.2" opacity="0.9" />
    </BrandIcon>
  );
}

function ReligionGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M12 5.2 V18.8 M8.2 8.8 H15.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.9" />
      <circle cx="12" cy="12" r="2" opacity="0.95" />
    </BrandIcon>
  );
}

function FamilyGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="8" cy="8.5" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.85" />
      <circle cx="16" cy="8.5" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.85" />
      <circle cx="12" cy="14.8" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.95" />
      <path d="M8 10.8 C8 13.2, 9.6 14.8, 12 15.2 C14.4 14.8, 16 13.2, 16 10.8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
    </BrandIcon>
  );
}

function LoveGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path
        d="M12 18.4 C12 18.4, 4.8 13.6, 4.8 9.2 C4.8 6.9, 6.5 5.4, 8.6 5.4 C10 5.4, 11.1 6.2, 12 7.4 C12.9 6.2, 14 5.4, 15.4 5.4 C17.5 5.4, 19.2 6.9, 19.2 9.2 C19.2 13.6, 12 18.4, 12 18.4 Z"
        opacity="0.95"
      />
    </BrandIcon>
  );
}

function WarGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M7 5.5 L12 9.2 L17 5.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <path d="M12 9.2 V18.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />
      <path d="M8.5 14.5 H15.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
      <path d="M5.5 8.5 L8.5 11.2 M18.5 8.5 L15.5 11.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    </BrandIcon>
  );
}

function TechnologyGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <rect x="5" y="6" width="14" height="10" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.85" />
      <path d="M9 19.5 H15 M12 16 V19.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      <circle cx="12" cy="11" r="1.6" opacity="0.95" />
    </BrandIcon>
  );
}

function HealthGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 4.5 V19.5 M4.5 12 H19.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
    </BrandIcon>
  );
}

function EnvironmentGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <path d="M4.5 12 H19.5" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.45" />
      <path d="M12 4.2 C15 7.5, 15 16.5, 12 19.8 C9 16.5, 9 7.5, 12 4.2 Z" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
    </BrandIcon>
  );
}

function MoneyGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.75" />
      <path d="M12 7.4 V16.6 M9.8 9.2 C10.4 8.4, 11.1 8, 12 8 C13.4 8, 14.3 8.8, 14.3 9.9 C14.3 11.8, 9.7 11.2, 9.7 13.2 C9.7 14.4, 10.7 15.2, 12.2 15.2 C13.1 15.2, 13.8 14.9, 14.3 14.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
    </BrandIcon>
  );
}

function LearningGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M3.8 10 L12 6.2 L20.2 10 L12 13.8 Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" opacity="0.9" />
      <path d="M7.2 11.4 V15.2 C7.2 15.2, 9.5 17.2, 12 17.2 C14.5 17.2, 16.8 15.2, 16.8 15.2 V11.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
      <path d="M20.2 10 V15.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
    </BrandIcon>
  );
}

function EducationGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <rect x="5" y="8" width="14" height="11" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.75" />
      <path d="M8 8 V6.2 C8 5, 9.2 4.2 12 4.2 S16 5, 16 6.2 V8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.85" />
      <path d="M9 12 H15 M9 15 H13" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
    </BrandIcon>
  );
}

function AiConsciousnessGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M8.2 9.2 C8.2 6.8, 9.9 5, 12 5 C14.1 5, 15.8 6.8, 15.8 9.2 V13.5 C15.8 15.9, 14.1 17.7, 12 17.7 C9.9 17.7, 8.2 15.9, 8.2 13.5 Z" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.85" />
      <circle cx="10.2" cy="11" r="1.1" opacity="0.95" />
      <circle cx="13.8" cy="11" r="1.1" opacity="0.95" />
      <path d="M6.2 10.5 H8.2 M15.8 10.5 H17.8 M12 17.7 V19.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
    </BrandIcon>
  );
}

export const PERSPECTIVE_GLYPHS: Record<string, (props: GlyphProps) => React.ReactElement> = {
  politics: PoliticsGlyph,
  religion: ReligionGlyph,
  family: FamilyGlyph,
  love: LoveGlyph,
  war: WarGlyph,
  technology: TechnologyGlyph,
  health: HealthGlyph,
  environment: EnvironmentGlyph,
  money: MoneyGlyph,
  learning: LearningGlyph,
  education: EducationGlyph,
  "ai-consciousness": AiConsciousnessGlyph,
};

export function PerspectiveGlyph({ id, ...props }: GlyphProps & { id: string }) {
  const Glyph = PERSPECTIVE_GLYPHS[id] ?? AiConsciousnessGlyph;
  return <Glyph {...props} />;
}

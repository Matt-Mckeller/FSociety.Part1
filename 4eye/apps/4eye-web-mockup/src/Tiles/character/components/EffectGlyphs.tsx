"use client";

/**
 * Effect glyphs — the icon set for buffs, debuffs and wants.
 *
 * Same reasoning as the habit and skill glyphs, and the same failure they were
 * built to fix: these were emoji, drawn by the operating system, so the set had
 * no shared line weight, rendered differently on every platform, and — worst
 * for this surface specifically — could not take the effect's colour. A buff
 * and a debuff are distinguished almost entirely by hue in this UI, and an
 * emoji ignored it, so the two read identically at a glance.
 *
 * These inherit `currentColor`, so an effect's glyph carries its own colour and
 * its own kind without a label.
 *
 * Keyed by `glyph` on `StatusEffect` and `Want`, with the emoji kept as a
 * fallback for anything not yet drawn.
 */

import * as React from "react";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

/* ------------------------------------------------------------------- buffs */

/** Synthesis Lock — many threads locking into one channel. */
export function SynthesisGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path
        d="M4 7 L10 12 L4 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
      <path
        d="M20 7 L14 12 L20 17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
      <path
        d="M8 4.5 L12 12 L8 19.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
      <path
        d="M16 4.5 L12 12 L16 19.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
      <circle cx="12" cy="12" r="2.2" opacity="0.95" />
    </BrandIcon>
  );
}

/** Bond Resonance — two companion marks orbiting a shared pull. */
export function BondGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="7.2" cy="11" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.7" />
      <circle cx="16.8" cy="11" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.7" />
      <path
        d="M12 7.2 C13.4 8.6 14 10.2 14 12 S13.4 15.4 12 16.8 C10.6 15.4 10 13.8 10 12 S10.6 8.6 12 7.2 Z"
        opacity="0.95"
      />
      <circle cx="7.2" cy="11" r="1.3" opacity="0.85" />
      <circle cx="16.8" cy="11" r="1.3" opacity="0.85" />
    </BrandIcon>
  );
}

/** Environmental Context — a figure boxed in by its surroundings. */
export function EnvironmentGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeDasharray="3 2.6"
        opacity="0.55"
      />
      <circle cx="12" cy="10" r="2.4" opacity="0.95" />
      <path d="M7.6 17.5 C7.6 14.6, 9.6 13.2, 12 13.2 S16.4 14.6, 16.4 17.5 Z" opacity="0.7" />
    </BrandIcon>
  );
}

/* ------------------------------------------------------------------- wants */

/** To finish and show it — a hull under way. */
export function ShipGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 2.5 L12 12" stroke="currentColor" strokeWidth="1.7" opacity="0.55" />
      <path d="M12.9 3.5 L18.5 7.5 L12.9 10.5 Z" opacity="0.95" />
      <path d="M2.6 14 H21.4 L18.6 20.5 H5.4 Z" opacity="0.75" />
    </BrandIcon>
  );
}

/** To be understood — two shapes overlapping, sharing the middle. */
export function HeartGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="8.6" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.6" />
      <circle cx="15.4" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.6" />
      <path
        d="M12 6.6 C13.6 8.1, 14.4 10, 14.4 12 S13.6 15.9, 12 17.4 C10.4 15.9, 9.6 14, 9.6 12 S10.4 8.1, 12 6.6 Z"
        opacity="0.95"
      />
    </BrandIcon>
  );
}

/** A clear head — a single point held steady inside the noise. */
export function FocusGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.28" />
      <circle cx="12" cy="12" r="5.4" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <circle cx="12" cy="12" r="2.1" opacity="0.95" />
      <path d="M12 1.5 V4 M12 20 V22.5 M1.5 12 H4 M20 12 H22.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    </BrandIcon>
  );
}

/** To teach it — one source, several receiving. */
export function TeachGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 2.6 L21.5 7.2 L12 11.8 L2.5 7.2 Z" opacity="0.95" />
      <path
        d="M6 9.4 V14.6 C6 16.9, 8.7 18.6, 12 18.6 S18 16.9, 18 14.6 V9.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path d="M21.5 7.2 V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    </BrandIcon>
  );
}

/** Brain / Cognition — a mind with a held center. */
export function BrainGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path
        d="M8.2 8.2 C6.2 8.2 4.8 9.8 4.8 12 C4.8 14.4 6.4 16 8.4 16 H9.2 V17.6 C9.2 18.8 10.2 19.6 11.4 19.6 H12.6 C13.8 19.6 14.8 18.8 14.8 17.6 V16 H15.6 C17.6 16 19.2 14.4 19.2 12 C19.2 10.2 18.2 8.8 16.6 8.4 C16.2 6.6 14.6 5.4 12.6 5.4 C11.4 5.4 10.4 5.9 9.6 6.7 C9.2 6.4 8.7 6.2 8.2 6.2 C6.8 6.2 5.8 7.1 5.8 8.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
      <circle cx="12" cy="12" r="2" opacity="0.95" />
      <path d="M12 14 V17.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
    </BrandIcon>
  );
}

/** Aura — a small spacecraft carrying the character's field outward. */
export function AuraGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 3.5 C15.6 5.2 17.8 8.2 17.8 12 L15.2 16.6 H8.8 L6.2 12 C6.2 8.2 8.4 5.2 12 3.5 Z" opacity="0.94" />
      <path d="M8 11.4 H16 M9 16.4 6.5 19 M15 16.4 17.5 19" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" opacity="0.72" />
      <circle cx="12" cy="9.3" r="1.9" fill="#000" opacity="0.25" />
      <path d="M9.4 20 H14.6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
    </BrandIcon>
  );
}

/** Money — coin with amplify ticks (same language as Money.AmplifyMe). */
export function MoneyGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="5.4" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.85" />
      <path
        d="M12 8.6 V15.4 M10.2 10 C10.7 9.3, 11.3 9, 12 9 C13.2 9, 14 9.7, 14 10.7 C14 12.4, 10 11.8, 10 13.5 C10 14.5, 10.9 15.2, 12.2 15.2 C12.9 15.2, 13.5 14.9, 14 14.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M12 3.2 V5.2 M12 18.8 V20.8 M3.2 12 H5.2 M18.8 12 H20.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.45"
      />
    </BrandIcon>
  );
}

/** Cats / companions — two marks sharing a center. */
export function CatsGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="7.4" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.7" />
      <circle cx="16.6" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.7" />
      <path
        d="M12 7.4 C13.3 8.7 13.8 10.2 13.8 12 S13.3 15.3 12 16.6 C10.7 15.3 10.2 13.8 10.2 12 S10.7 8.7 12 7.4 Z"
        opacity="0.95"
      />
      <path d="M6.2 8.4 L7.4 9.6 M8.6 8.4 L7.4 9.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
      <path d="M15.4 8.4 L16.6 9.6 M17.8 8.4 L16.6 9.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
    </BrandIcon>
  );
}

/** AGI Rib — curved rib arcs off a sternum spine. */
export function RibGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 4.2 V19.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.55" />
      <path
        d="M12 6.2 C8.2 6.8 5.4 8.6 4.6 11.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M12 10 C7.8 10.6 5.2 12.2 4.4 14.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M12 13.8 C8.4 14.4 6.2 15.8 5.6 17.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M12 6.2 C15.8 6.8 18.6 8.6 19.4 11.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M12 10 C16.2 10.6 18.8 12.2 19.6 14.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M12 13.8 C15.6 14.4 17.8 15.8 18.4 17.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.65"
      />
    </BrandIcon>
  );
}

/** Rib + marketing clip — rib cage with a play/film mark nested in. */
export function RibClipGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 3.8 V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path
        d="M12 5.8 C8.6 6.4 6.2 8 5.4 10.2 M12 5.8 C15.4 6.4 17.8 8 18.6 10.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M12 9.2 C8.2 9.8 6 11.2 5.2 13.4 M12 9.2 C15.8 9.8 18 11.2 18.8 13.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
      <rect x="7.2" y="12.2" width="9.6" height="7" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.75" />
      <path d="M10.4 14.2 V17.2 L14.2 15.7 Z" opacity="0.95" />
    </BrandIcon>
  );
}

/** Pur Meow — cat mark with a soft purr wave; the logo Emily takes over. */
export function PurMeowGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path
        d="M7.2 9.2 L5.4 5.6 L9.2 7.4 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <path
        d="M16.8 9.2 L18.6 5.6 L14.8 7.4 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <circle cx="12" cy="13" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.75" />
      <circle cx="9.6" cy="12.2" r="1.1" opacity="0.95" />
      <circle cx="14.4" cy="12.2" r="1.1" opacity="0.95" />
      <path
        d="M10.4 15.2 C11.2 16.2 12.8 16.2 13.6 15.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M4.2 18.6 C5.6 17.4 7.2 17.4 8.6 18.6 M15.4 18.6 C16.8 17.4 18.4 17.4 19.8 18.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </BrandIcon>
  );
}

/** Power.Unlock — lock opening. */
export function UnlockWantGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="6.2" y="10.5" width="11.6" height="9" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.75" />
      <path
        d="M8.4 10.5 V8.2 C8.4 5.9, 10 4.2, 12.2 4.2 C14.2 4.2, 15.7 5.6, 15.9 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="12" cy="14.6" r="1.5" opacity="0.95" />
    </BrandIcon>
  );
}

/** Power.Max — lock open, ceiling mark. */
export function MaxWantGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="6.2" y="11.2" width="11.6" height="8.4" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.55" />
      <path
        d="M8.2 11.2 V7.6 C8.2 5.4 10 3.8 12.2 3.8 C14.4 3.8 16.2 5.4 16.2 7.6 V8.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path d="M9.2 15.4 H14.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.95" />
      <path d="M12 13.2 V17.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.95" />
    </BrandIcon>
  );
}

/** Aion.Amplify — three nodes from one core. */
export function AionWantGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="2.4" opacity="0.95" />
      <circle cx="12" cy="4.4" r="2" opacity="0.9" />
      <circle cx="19.2" cy="16.2" r="2" opacity="0.75" />
      <circle cx="4.8" cy="16.2" r="2" opacity="0.75" />
      <circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.28" />
    </BrandIcon>
  );
}

/** Goals / planning — ranked chevrons into a target. */
export function PlanGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="17.2" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <circle cx="17.2" cy="12" r="1.3" opacity="0.95" />
      <path d="M3.2 12 H12.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.45" />
      <path d="M3.2 7.5 L7.2 12 L3.2 16.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <path d="M7.2 7.5 L11.2 12 L7.2 16.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
    </BrandIcon>
  );
}

/** LoveFormula · Energy — a rising spark. */
export function EnergyGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M13.2 2.8 L7.4 13.2 H12 L10.8 21.2 L18.2 10 H13.6 Z" opacity="0.92" />
    </BrandIcon>
  );
}

/** LoveFormula · Information — stacked signal bars into a node. */
export function InformationGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M5 17.5 V14.2 M9 17.5 V11 M13 17.5 V8.2 M17 17.5 V5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      <circle cx="19.2" cy="5.2" r="1.6" opacity="0.95" />
    </BrandIcon>
  );
}

/** LoveFormula · Mood — a simple valence mark. */
export function MoodWantGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <circle cx="9.2" cy="10.4" r="1.1" opacity="0.95" />
      <circle cx="14.8" cy="10.4" r="1.1" opacity="0.95" />
      <path d="M8.6 14.4 C9.6 16.2 10.8 17 12 17 S14.4 16.2 15.4 14.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
    </BrandIcon>
  );
}

/** LoveFormula · Time — clock face. */
export function TimeGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <path d="M12 7.2 V12.4 L15.4 14.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
    </BrandIcon>
  );
}

/** LoveFormula · Context — nested frames. */
export function ContextGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <rect x="6.6" y="6.6" width="10.8" height="10.8" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.75" />
      <circle cx="12" cy="12" r="1.8" opacity="0.95" />
    </BrandIcon>
  );
}

/** LoveFormula · Situation — horizon with a standing figure. */
export function SituationGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M3 17.5 H21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
      <circle cx="12" cy="9.2" r="2.2" opacity="0.95" />
      <path d="M12 11.4 V15.6 M9.6 13.2 H14.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
      <path d="M9.4 17.5 L12 15.6 L14.6 17.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
    </BrandIcon>
  );
}

/** Anything without a drawn glyph. A ring, so it still reads as an effect. */
export function GenericEffectGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="7.4" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      <circle cx="12" cy="12" r="2.6" opacity="0.95" />
    </BrandIcon>
  );
}

function WaterGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 3.2 C12 3.2 6.4 10.4 6.4 14.4 C6.4 17.6 9 20.2 12 20.2 C15 20.2 17.6 17.6 17.6 14.4 C17.6 10.4 12 3.2 12 3.2 Z" opacity="0.92" />
      <path d="M10.2 14.6 C10.4 16.4 11.2 17.4 12.6 17.8" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
    </BrandIcon>
  );
}

function FlexGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="4" opacity="0.95" />
      <circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <circle cx="12" cy="12" r="9.6" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.28" />
      <path d="M12 2.4 V4.6 M12 19.4 V21.6 M2.4 12 H4.6 M19.4 12 H21.6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </BrandIcon>
  );
}

/** Shield.Always — ward plate with a locked check. */
function ShieldGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path
        d="M12 2.2 L19.6 5.4 V11.4 C19.6 16.8 16.2 20.6 12 22 C7.8 20.6 4.4 16.8 4.4 11.4 V5.4 Z"
        opacity="0.92"
      />
      <path
        d="M9.4 11.4 L11.3 13.3 L15.1 9.2"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
    </BrandIcon>
  );
}

const GLYPHS: Record<string, React.ComponentType<BrandIconProps>> = {
  synthesis: SynthesisGlyph,
  bond: BondGlyph,
  // Legacy keys kept so older feed/seed snapshots still resolve a glyph.
  flow: SynthesisGlyph,
  momentum: BondGlyph,
  environment: EnvironmentGlyph,
  ship: ShipGlyph,
  heart: HeartGlyph,
  focus: FocusGlyph,
  teach: TeachGlyph,
  brain: BrainGlyph,
  aura: AuraGlyph,
  money: MoneyGlyph,
  cats: CatsGlyph,
  rib: RibGlyph,
  "rib-clip": RibClipGlyph,
  "pur-meow": PurMeowGlyph,
  unlock: UnlockWantGlyph,
  max: MaxWantGlyph,
  aion: AionWantGlyph,
  plan: PlanGlyph,
  energy: EnergyGlyph,
  cognition: BrainGlyph,
  information: InformationGlyph,
  mood: MoodWantGlyph,
  time: TimeGlyph,
  context: ContextGlyph,
  situation: SituationGlyph,
  water: WaterGlyph,
  flex: FlexGlyph,
  shield: ShieldGlyph,
};

/**
 * The glyph for an effect or a want.
 *
 * Falls back to a plain ring rather than to nothing: an effect tile with an
 * empty glyph slot reads as a rendering bug, and the tile's colour and label
 * are already carrying the meaning.
 */
export function EffectGlyph({ id, ...p }: BrandIconProps & { id?: string }) {
  const Glyph = (id && GLYPHS[id]) || GenericEffectGlyph;
  return <Glyph {...p} />;
}

"use client";

/**
 * Skill glyphs — the icon set for Skills & Mastery.
 *
 * These were emoji. Emoji are drawn by the operating system, so the set had no
 * shared line weight, no shared silhouette, and a different look on every
 * platform — 🛡️ and 💎 arrive fully coloured and shaded next to a flat ✦, and
 * none of them respond to the node's own colour or to dark mode. They also
 * could not carry the one distinction the tree is built on, which is tier.
 *
 * These are `BrandIcon` glyphs like the rest of the system: single-colour,
 * inheriting `currentColor`, so a locked node greys out and an unlocked one
 * takes its tier hue without special-casing.
 *
 * The set is drawn to read as a progression. Tier 0 glyphs are single closed
 * forms, tier 1 adds a second element in relation to the first, and tier 2–3
 * are radial — the shape itself says how far up the tree you are, before you
 * read the label.
 */

import * as React from "react";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

/* ── Tier 0 — single forms ─────────────────────────────────────────────── */

/** Deep Focus — concentric rings closing on a point. */
export function DeepFocusGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.25" />
      <circle cx="12" cy="12" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.55" />
      <circle cx="12" cy="12" r="2.2" opacity="0.95" />
    </BrandIcon>
  );
}

/** Pattern Mind — a lattice with one cell resolved. */
export function PatternMindGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.45" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.3" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.3" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" opacity="0.95" />
    </BrandIcon>
  );
}

/** Emotional Read — a waveform picked up from another source. */
export function EmotionalReadGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path
        d="M2.5 12 H6 L8 7.5 L11 16.5 L13.5 12 H21.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      />
      <circle cx="19" cy="7" r="1.6" opacity="0.4" />
    </BrandIcon>
  );
}

/** Iron Will — a shield with a solid spine. */
export function IronWillGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path
        d="M12 2.5 L20 5.5 V11 C20 16 16.5 19.8 12 21.5 C7.5 19.8 4 16 4 11 V5.5 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <rect x="10.9" y="7" width="2.2" height="9" rx="1.1" opacity="0.95" />
    </BrandIcon>
  );
}

/* ── Tier 1 — a second element in relation to the first ────────────────── */

/** Flow Architect — a channel shaped to carry a current. */
export function FlowArchitectGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path
        d="M2.5 8.5 C6 5, 9 12, 12.5 8.5 S19 5, 21.5 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M2.5 15.5 C6 12, 9 19, 12.5 15.5 S19 12, 21.5 15.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.4"
      />
    </BrandIcon>
  );
}

/** Hyper Learning — an ascending step charge. */
export function HyperLearningGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M13 2 L5.5 13.5 H11 L9.5 22 L18.5 10 H12.8 Z" opacity="0.95" />
      <path d="M20 3.5 L21.5 6.5 M3 18 L4.5 20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
    </BrandIcon>
  );
}

/** Systems Architect — stacked layers on a common frame. */
export function SystemsArchitectGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 2.5 L21 7 L12 11.5 L3 7 Z" opacity="0.95" />
      <path d="M3 12 L12 16.5 L21 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" opacity="0.5" />
      <path d="M3 17 L12 21.5 L21 17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" opacity="0.28" />
    </BrandIcon>
  );
}

/** Resonant Leadership — a centre others fall into orbit around. */
export function ResonantLeadershipGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="3.2" opacity="0.95" />
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <circle cx="12" cy="5" r="1.9" opacity="0.7" />
      <circle cx="18.1" cy="15.5" r="1.9" opacity="0.55" />
      <circle cx="5.9" cy="15.5" r="1.9" opacity="0.55" />
    </BrandIcon>
  );
}

/** Discipline Engine — a driven gear. */
export function DisciplineEngineGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path
        d="M12 2.5 L14 5 L17.2 4.2 L18 7.4 L21 8.6 L20 11.8 L21.9 14.4 L19.4 16.4 L19.6 19.6 L16.4 19.9 L14.4 22.4 L11.6 21 L8.8 22.1 L7.2 19.4 L4 19 L4.2 15.8 L2.1 13.5 L4.2 11.2 L3.6 8 L6.8 7.2 L8.2 4.3 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.5"
      />
      <circle cx="12" cy="12" r="3.6" opacity="0.95" />
    </BrandIcon>
  );
}

/** Conflict Alchemy — two opposed forms fused into one. */
export function ConflictAlchemyGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M9.5 3 L15.5 12 L9.5 21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <path d="M14.5 3 L8.5 12 L14.5 21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <circle cx="12" cy="12" r="3" opacity="0.95" />
    </BrandIcon>
  );
}

/** Meta Learner — a loop that feeds back into itself. */
export function MetaLearnerGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path
        d="M20 12 A8 8 0 1 1 12 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path d="M12 1.6 L15.4 4 L12 6.4 Z" opacity="0.95" />
      <circle cx="12" cy="12" r="2.6" opacity="0.55" />
    </BrandIcon>
  );
}

/** Pressure Immunity — a form holding its shape under load. */
export function PressureImmunityGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M5 3.5 H19 M5 20.5 H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.4" />
      <path d="M8.5 6.5 L12 6.5 M12 6.5 L15.5 6.5 M12 6.5 V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.3" />
      <path d="M12 8.5 L17 12 L12 15.5 L7 12 Z" opacity="0.95" />
    </BrandIcon>
  );
}

/* ── Tier 2–3 — radial ─────────────────────────────────────────────────── */

/** Peak Performance — a summit with a marked apex. */
export function PeakPerformanceGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M2 20 L9 8.5 L13 14.5 L16.5 9 L22 20 Z" opacity="0.9" />
      <circle cx="16.5" cy="5" r="2.4" opacity="0.95" />
      <path d="M16.5 5 L16.5 9" stroke="currentColor" strokeWidth="1.3" opacity="0.4" />
    </BrandIcon>
  );
}

/** Sovereign Presence — a crown reduced to its structure. */
export function SovereignPresenceGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M3 18.5 L4.5 7 L9 12 L12 4.5 L15 12 L19.5 7 L21 18.5 Z" opacity="0.95" />
      <path d="M3.5 21 H20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.45" />
    </BrandIcon>
  );
}

/** Sovereign Mind — a radiant star; the terminal node. */
export function SovereignMindGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 1.5 L14.2 9.8 L22.5 12 L14.2 14.2 L12 22.5 L9.8 14.2 L1.5 12 L9.8 9.8 Z" opacity="0.95" />
      <path
        d="M12 6 L13 11 L18 12 L13 13 L12 18 L11 13 L6 12 L11 11 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.35"
      />
    </BrandIcon>
  );
}

/** Fallback for any node without a registered glyph. */
export function SkillFallbackGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.6" />
      <circle cx="12" cy="12" r="2" opacity="0.9" />
    </BrandIcon>
  );
}

/** Skill id → glyph. Keys match `SKILL_NODES` ids in `model/skills.ts`. */
export const SKILL_GLYPHS: Record<string, React.ComponentType<BrandIconProps>> = {
  "deep-focus": DeepFocusGlyph,
  "pattern-mind": PatternMindGlyph,
  "emotional-read": EmotionalReadGlyph,
  "iron-will": IronWillGlyph,
  "flow-architect": FlowArchitectGlyph,
  "hyper-learning": HyperLearningGlyph,
  "systems-architect": SystemsArchitectGlyph,
  "resonant-leadership": ResonantLeadershipGlyph,
  "discipline-engine": DisciplineEngineGlyph,
  "conflict-alchemy": ConflictAlchemyGlyph,
  "meta-learner": MetaLearnerGlyph,
  "pressure-immunity": PressureImmunityGlyph,
  "peak-performance": PeakPerformanceGlyph,
  "sovereign-presence": SovereignPresenceGlyph,
  "sovereign-mind": SovereignMindGlyph,
};

export function SkillGlyph({
  id,
  size = 20,
  title,
}: {
  id: string;
  size?: number;
  title?: string;
}) {
  const Cmp = SKILL_GLYPHS[id] ?? SkillFallbackGlyph;
  return <Cmp size={size} title={title} />;
}

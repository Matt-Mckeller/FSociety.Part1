"use client";

/**
 * Habit glyphs — the icon set for habits.
 *
 * Same reasoning as the skill glyphs: these were emoji, drawn by the operating
 * system, so the set had no shared line weight and looked different on every
 * platform. Worse for habits specifically — a habit row's whole job is to show
 * state (done, missed, streak), and an emoji cannot take the row's colour, so
 * a completed habit and a skipped one rendered identically.
 *
 * These inherit `currentColor`, so the glyph carries the state along with
 * everything else in the row.
 */

import * as React from "react";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

/** Meditation — a settled figure; stillness as a stable base. */
export function MeditationGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="5.5" r="2.6" opacity="0.95" />
      <path d="M12 9 C8.5 9, 6.5 11.5, 6.5 14.5 L17.5 14.5 C17.5 11.5, 15.5 9, 12 9 Z" opacity="0.6" />
      <path d="M3.5 18.5 C6 16.5, 18 16.5, 20.5 18.5 C18 20.5, 6 20.5, 3.5 18.5 Z" opacity="0.95" />
    </BrandIcon>
  );
}

/** Exercise — a loaded bar. */
export function ExerciseGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="2" y="9" width="3" height="6" rx="1.2" opacity="0.95" />
      <rect x="19" y="9" width="3" height="6" rx="1.2" opacity="0.95" />
      <rect x="5.5" y="7" width="3" height="10" rx="1.3" opacity="0.7" />
      <rect x="15.5" y="7" width="3" height="10" rx="1.3" opacity="0.7" />
      <rect x="8.5" y="10.9" width="7" height="2.2" rx="1.1" opacity="0.95" />
    </BrandIcon>
  );
}

/** Healthy Eating — a leaf over a bowl. */
export function HealthyEatingGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 9.5 C12 5.5, 15 3, 19 3 C19 7, 16.5 9.5, 12 9.5 Z" opacity="0.95" />
      <path d="M3 12.5 H21 C21 17, 17 20.5, 12 20.5 S3 17, 3 12.5 Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" opacity="0.6" />
    </BrandIcon>
  );
}

/** Mindfulness & Awareness — ripples from a single point. */
export function MindfulnessGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="2" opacity="0.95" />
      <circle cx="12" cy="12" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.22" />
    </BrandIcon>
  );
}

/** Research — screen + search mark (source study, not a book club). */
export function ResearchGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="3" y="4.5" width="14" height="11" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.75" />
      <path d="M6 8 H14 M6 11 H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      <circle cx="16.5" cy="15.5" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.95" />
      <path d="M18.8 17.8 L21.2 20.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />
    </BrandIcon>
  );
}

/** Journaling — a nib laying down a line. */
export function JournalingGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M17.5 2.6 L21.4 6.5 L9.5 18.4 L4.4 19.6 L5.6 14.5 Z" opacity="0.9" />
      <path d="M3 21.5 H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.45" />
    </BrandIcon>
  );
}

/** Cold Shower — a crystalline burst. */
export function ColdShowerGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path
        d="M12 2 V22 M3.3 7 L20.7 17 M20.7 7 L3.3 17"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="12" cy="12" r="2.4" opacity="0.95" />
    </BrandIcon>
  );
}

/** Keep in Touch — two forms reaching. */
export function KeepInTouchGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M2.5 6 H13 A2 2 0 0 1 15 8 V13 A2 2 0 0 1 13 15 H7 L3.5 18 V15 A1 1 0 0 1 2.5 14 Z" opacity="0.9" />
      <path d="M9.5 4.5 H20 A1.5 1.5 0 0 1 21.5 6 V12 A1.5 1.5 0 0 1 20 13.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" opacity="0.4" />
    </BrandIcon>
  );
}

/** Morning Planning — a target set at the start. */
export function MorningPlanningGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="11" cy="13" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="11" cy="13" r="4.4" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.55" />
      <circle cx="11" cy="13" r="1.5" opacity="0.95" />
      <path d="M11 13 L21 3 M17.5 3 H21 V6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
    </BrandIcon>
  );
}

/** Deep Work — a locked focus beam. */
export function DeepWorkGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="4" y="5" width="16" height="14" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.35" />
      <path d="M8 12 H16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />
      <path d="M12 7.5 V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
      <circle cx="12" cy="12" r="2.2" opacity="0.9" />
    </BrandIcon>
  );
}

/** Computer / Build — a screen with a construction mark. */
export function ComputerGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="3" y="4.5" width="18" height="12" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.85" />
      <path d="M8 12.5 L10.5 10 L13 12 L16.5 8.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <path d="M7 19 H17 M12 16.5 V19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    </BrandIcon>
  );
}

/** Content Creation — a recording diamond / play mark. */
export function ContentCreationGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="3.5" y="6" width="17" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.45" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.7" />
      <circle cx="12" cy="12" r="1.6" opacity="0.95" />
      <path d="M17.5 5 L19.5 5 L19.5 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
    </BrandIcon>
  );
}

/** Teach & Ship — an upward release arrow from a base. */
export function TeachShipGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 19 V7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" opacity="0.7" />
      <path d="M7.5 11.5 L12 6.5 L16.5 11.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <path d="M5 19 H19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.4" />
      <circle cx="12" cy="4.2" r="1.3" opacity="0.9" />
    </BrandIcon>
  );
}

/** Financial Recovery — a coin with a rising edge. */
export function MoneyRecoveryGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.55" />
      <path d="M12 7.5 V16.5 M9.5 9.2 C10.2 8.4, 11, 8, 12, 8 C13.6 8, 14.6 8.9, 14.6 10.1 C14.6 12.4, 9.4 11.6, 9.4 13.9 C9.4 15.1, 10.5 16, 12.2 16 C13.2 16, 14, 15.6, 14.6 14.9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
    </BrandIcon>
  );
}

/** Creative Practice — a mark being made. */
export function CreativePracticeGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 20 C4 16.5, 6 14.5, 8.5 14.5 C10.5 14.5, 11.5 16, 11.5 17.5 C11.5 19.5, 9.5 21, 4 20 Z" opacity="0.95" />
      <path d="M10 14 L19 4.5 A2.1 2.1 0 0 1 21.8 7.3 L12.5 16.3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" opacity="0.6" />
    </BrandIcon>
  );
}

/** Trees — a quiet canopy mark (evening unwind, not a billboard). */
export function CannabisGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 20.5 V11" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.75" />
      <path
        d="M12 11 C8.2 11, 5.8 8.6, 5.8 6.2 C5.8 4.2, 7.4 3, 9.2 3.4 C9.6 2.2, 10.7 1.5, 12 1.5 C13.3 1.5, 14.4 2.2, 14.8 3.4 C16.6 3, 18.2 4.2, 18.2 6.2 C18.2 8.6, 15.8 11, 12 11 Z"
        opacity="0.9"
      />
      <path d="M7.5 14.5 C9.2 13.2, 10.6 12.6, 12 12.6 C13.4 12.6, 14.8 13.2, 16.5 14.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.45" />
    </BrandIcon>
  );
}

/** Sleep Hygiene — a night arc. */
export function SleepHygieneGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M20.5 14.5 A9 9 0 1 1 9.5 3.5 A7 7 0 0 0 20.5 14.5 Z" opacity="0.9" />
      <circle cx="17" cy="5.5" r="1.2" opacity="0.5" />
      <circle cx="20.5" cy="9" r="0.9" opacity="0.35" />
    </BrandIcon>
  );
}

/** Fallback for a habit with no registered glyph. */
export function HabitFallbackGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.55" />
      <path d="M8.5 12 L11 14.5 L15.5 9.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
    </BrandIcon>
  );
}

/** Habit id → glyph. Keys match `HABITS` ids in `model/habits.ts`. */
export const HABIT_GLYPHS: Record<string, React.ComponentType<BrandIconProps>> = {
  meditation: MeditationGlyph,
  exercise: ExerciseGlyph,
  "healthy-eating": HealthyEatingGlyph,
  mindfulness: MindfulnessGlyph,
  "deep-reading": ResearchGlyph,
  journaling: JournalingGlyph,
  "cold-shower": ColdShowerGlyph,
  "keep-in-touch": KeepInTouchGlyph,
  "morning-planning": MorningPlanningGlyph,
  "deep-work": DeepWorkGlyph,
  computer: ComputerGlyph,
  "content-creation": ContentCreationGlyph,
  "teach-ship": TeachShipGlyph,
  "money-recovery": MoneyRecoveryGlyph,
  "creative-practice": CreativePracticeGlyph,
  "smoking-weed": CannabisGlyph,
  "sleep-hygiene": SleepHygieneGlyph,
};

export function HabitGlyph({
  id,
  size = 18,
  title,
}: {
  id: string;
  size?: number;
  title?: string;
}) {
  const Cmp = HABIT_GLYPHS[id] ?? HabitFallbackGlyph;
  return <Cmp size={size} title={title} />;
}

"use client";

/**
 * Spell glyphs — BrandIcon marks keyed by spell id.
 *
 * Same language as HabitGlyphs / PriorityGlyphs / WorkGlyphs: 2–4 shapes,
 * `currentColor`, optical weight matched to the set. Glyph-first in the
 * spellbook and loadout; Lens remains a fallback when no mark is registered.
 */

import * as React from "react";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

type GlyphProps = Omit<BrandIconProps, "children">;

function CastFallback(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M12 6.2 L13.6 10.4 L18 10.8 L14.6 13.6 L15.6 17.9 L12 15.6 L8.4 17.9 L9.4 13.6 L6 10.8 L10.4 10.4 Z" opacity="0.92" />
    </BrandIcon>
  );
}

/* ── Learn · compress ─────────────────────────────────────────────────── */

function ConciseGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M5 8 H19 M5 12 H14 M5 16 H11" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" opacity="0.9" />
      <path d="M16 14 L19 12 L16 10" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
    </BrandIcon>
  );
}

function ExplainGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <rect x="4" y="5" width="16" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.45" />
      <path d="M7 9 H17 M7 12.5 H13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.9" />
      <circle cx="17" cy="17.5" r="2.2" opacity="0.85" />
    </BrandIcon>
  );
}

function OutlineGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M6 6 H18 M6 12 H15 M6 18 H12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
      <circle cx="6" cy="6" r="1.5" opacity="0.95" />
      <circle cx="6" cy="12" r="1.5" opacity="0.75" />
      <circle cx="6" cy="18" r="1.5" opacity="0.55" />
    </BrandIcon>
  );
}

/* ── Learn · depth ────────────────────────────────────────────────────── */

function ExpandGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="3.2" opacity="0.95" />
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      <path d="M12 3.5 V6.2 M12 17.8 V20.5 M3.5 12 H6.2 M17.8 12 H20.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    </BrandIcon>
  );
}

function AnalyzeGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 18 V10 L9 13 L13 7 L20 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <path d="M4 18 H20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
    </BrandIcon>
  );
}

function VisualizeGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="9" cy="11" r="2.2" opacity="0.9" />
      <circle cx="15.5" cy="14" r="2.8" opacity="0.55" />
      <path d="M6 17 L10 13.5 L13 15.5 L18 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </BrandIcon>
  );
}

/* ── Learn · anchor ───────────────────────────────────────────────────── */

function ExampleGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <rect x="5" y="4" width="14" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.45" />
      <path d="M9 9 H15 M9 12.5 H13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
      <circle cx="12" cy="17" r="1.4" opacity="0.85" />
    </BrandIcon>
  );
}

function AnalogizeGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="7.5" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.9" />
      <circle cx="16.5" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.55" />
      <path d="M10.8 12 H13.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
    </BrandIcon>
  );
}

function ApplyGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M5 12 H14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <path d="M12 7.5 L18 12 L12 16.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <circle cx="5" cy="12" r="1.6" opacity="0.85" />
    </BrandIcon>
  );
}

function FlashcardGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <rect x="5" y="6" width="12" height="14" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <rect x="7" y="4" width="12" height="14" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.9" />
      <path d="M10 9 H16 M10 12.5 H14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </BrandIcon>
  );
}

/* ── Learn · challenge ────────────────────────────────────────────────── */

function QuizGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.4" />
      <path d="M9.2 9.2 C9.2 7.4 10.5 6.2 12.1 6.2 C13.7 6.2 15 7.4 15 9 C15 10.4 14 11.2 12.8 11.8 C12.2 12.1 12 12.6 12 13.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />
      <circle cx="12" cy="16.8" r="1.2" opacity="0.9" />
    </BrandIcon>
  );
}

function SocraticGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M6 8 C6 5.5 8.5 4 12 4 C15.5 4 18 5.5 18 8 C18 10.2 16 11.5 14 12.2 L14 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.9" />
      <circle cx="14" cy="17.5" r="1.3" opacity="0.9" />
      <path d="M7 18 H11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />
    </BrandIcon>
  );
}

function ChallengeGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 4 L19 18 H5 Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" opacity="0.9" />
      <path d="M12 10 V13.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
      <circle cx="12" cy="16" r="1.1" opacity="0.9" />
    </BrandIcon>
  );
}

function ModalityGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 8 H10 V14 H4 Z" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
      <path d="M14 6 H20 V12 H14 Z" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <path d="M9 16 H15 V20 H9 Z" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.4" />
      <path d="M10 11 L14 9 M10 14 L12 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
    </BrandIcon>
  );
}

/* ── Transform / assess / navigate ────────────────────────────────────── */

function SummarizeGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M6 6 H18 M6 10 H18 M6 14 H12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.45" />
      <path d="M6 18 H14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />
    </BrandIcon>
  );
}

function TranslateGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M4 12 H20 M12 3 C9 7 9 17 12 21 M12 3 C15 7 15 17 12 21" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    </BrandIcon>
  );
}

function ReframeGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <rect x="4" y="6" width="10" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.45" />
      <rect x="10" y="10" width="10" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.95" />
    </BrandIcon>
  );
}

function FactcheckGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M7 4 H17 V20 H7 Z" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.45" />
      <path d="M9.5 12 L11.5 14 L15 9.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
    </BrandIcon>
  );
}

function CritiqueGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M5 17 L8 7 L12 14 L16 5 L19 17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <path d="M5 19 H19" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
    </BrandIcon>
  );
}

function FindGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="10.5" cy="10.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.9" />
      <path d="M14.8 14.8 L19.2 19.2" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
    </BrandIcon>
  );
}

function ConnectGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="7" cy="8" r="2.4" opacity="0.9" />
      <circle cx="17" cy="8" r="2.4" opacity="0.7" />
      <circle cx="12" cy="17" r="2.4" opacity="0.55" />
      <path d="M9 9 L15 9 M8.5 10 L11 15 M15.5 10 L13 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
    </BrandIcon>
  );
}

/* ── Heal / mood / status ─────────────────────────────────────────────── */

function EncourageGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 18 C12 18 5.5 13.8 5.5 9.6 C5.5 7.5 7 6 8.9 6 C10.2 6 11.2 6.7 12 7.8 C12.8 6.7 13.8 6 15.1 6 C17 6 18.5 7.5 18.5 9.6 C18.5 13.8 12 18 12 18 Z" opacity="0.92" />
    </BrandIcon>
  );
}

function GroundGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 16 H20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.45" />
      <path d="M12 5 V14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      <circle cx="12" cy="16.5" r="2" opacity="0.9" />
      <path d="M8 10 C9.5 8.5 10.5 8.5 12 10 C13.5 11.5 14.5 11.5 16 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </BrandIcon>
  );
}

function LiftGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 18 V8" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" opacity="0.7" />
      <path d="M7.5 12 L12 7 L16.5 12" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <path d="M6 19 H18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
    </BrandIcon>
  );
}

function NameItGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M5 8 H19 V16 H12 L8 19 V16 H5 Z" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <path d="M9 11.5 H15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />
    </BrandIcon>
  );
}

function CheckInGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <rect x="5" y="4" width="14" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.45" />
      <path d="M8.5 12 L11 14.5 L15.5 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
    </BrandIcon>
  );
}

function StandUpGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M7 7 H17 M7 12 H17 M7 17 H13" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.85" />
      <circle cx="5" cy="7" r="1.2" opacity="0.9" />
      <circle cx="5" cy="12" r="1.2" opacity="0.7" />
      <circle cx="5" cy="17" r="1.2" opacity="0.5" />
    </BrandIcon>
  );
}

function MilestoneGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M6 19 V8 L12 5 L18 8 V19" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" opacity="0.55" />
      <path d="M12 10 L13.2 12.6 L16 12.9 L13.9 14.7 L14.5 17.4 L12 16 L9.5 17.4 L10.1 14.7 L8 12.9 L10.8 12.6 Z" opacity="0.95" />
    </BrandIcon>
  );
}

function ReviewGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.4" />
      <path d="M8 12 L11 15 L16.5 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
    </BrandIcon>
  );
}

function ShiftStateGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M7 8 A5 5 0 0 1 17 8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.9" />
      <path d="M17 16 A5 5 0 0 1 7 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.55" />
      <path d="M17 5.5 V8.5 H14 M7 18.5 V15.5 H10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
    </BrandIcon>
  );
}

function TrackMoodGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 16 C6 10 9 8 12 8 C15 8 18 10 20 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.55" />
      <circle cx="8" cy="13" r="1.6" opacity="0.7" />
      <circle cx="12" cy="10.5" r="1.8" opacity="0.95" />
      <circle cx="16.5" cy="13.5" r="1.5" opacity="0.55" />
    </BrandIcon>
  );
}

/* ── Create / movement ────────────────────────────────────────────────── */

function DraftGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M6 4 H14 L18 8 V20 H6 Z" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.5" />
      <path d="M14 4 V8 H18" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
      <path d="M9 12 H15 M9 15.5 H13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
    </BrandIcon>
  );
}

function StoryboardGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <rect x="3.5" y="6" width="7" height="6" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
      <rect x="13.5" y="6" width="7" height="6" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.65" />
      <rect x="8.5" y="14" width="7" height="6" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
    </BrandIcon>
  );
}

function StepForwardGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="7" cy="12" r="2" opacity="0.55" />
      <path d="M10 12 H16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" opacity="0.7" />
      <path d="M14.5 8.5 L19 12 L14.5 15.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
    </BrandIcon>
  );
}

function NavigatePathGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="6" cy="18" r="2" opacity="0.9" />
      <circle cx="18" cy="6" r="2" opacity="0.9" />
      <path d="M7.5 16.5 C10 14 10 10 12 9 C14 8 15 10 16.5 7.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.7" />
    </BrandIcon>
  );
}

function TransitionGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 12 H9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      <path d="M15 12 H20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      <path d="M9 8 L15 12 L9 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
    </BrandIcon>
  );
}

function SetPaceGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M12 12 L12 6.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.95" />
      <path d="M12 12 L16 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.55" />
    </BrandIcon>
  );
}

/* ── Play / power / Matthew lanes ─────────────────────────────────────── */

function PlanGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <rect x="5" y="4" width="14" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.45" />
      <path d="M8 9 H16 M8 12.5 H14 M8 16 H12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.9" />
      <circle cx="16.5" cy="16" r="1.5" opacity="0.85" />
    </BrandIcon>
  );
}

function ActGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M8 6 L18 12 L8 18 Z" opacity="0.92" />
    </BrandIcon>
  );
}

function ShipGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 18 V7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" opacity="0.7" />
      <path d="M7.5 11.5 L12 6.5 L16.5 11.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <path d="M5 19 H19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.4" />
    </BrandIcon>
  );
}

function ImproveGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M5 17 L10 10 L14 13 L19 6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <path d="M15 6 H19 V10" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </BrandIcon>
  );
}

function QualityGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 3.5 L19 7.5 V13.5 C19 17.5 15.8 20.5 12 21.5 C8.2 20.5 5 17.5 5 13.5 V7.5 Z" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <path d="M9 12.5 L11.2 14.7 L15.5 9.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
    </BrandIcon>
  );
}

function CommunicateGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 8 H12 V14 H8 L5.5 16.5 V14 H4 Z" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.9" />
      <path d="M13 10 H20 V16 H17.5 V18.5 L15 16 H13 Z" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
    </BrandIcon>
  );
}

function PlayGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M10 8.5 L16.5 12 L10 15.5 Z" opacity="0.95" />
    </BrandIcon>
  );
}

function CompeteGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M5 18 H19" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M8 18 V13 H11 V18 M11 18 V7 H14 V18 M14 18 V11 H17 V18" opacity="0.85" />
      <path d="M12.5 4.2 L13.1 5.6 L14.6 5.7 L13.4 6.7 L13.8 8.1 L12.5 7.3 L11.2 8.1 L11.6 6.7 L10.4 5.7 L11.9 5.6 Z" opacity="0.95" />
    </BrandIcon>
  );
}

function CelebrateGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M8 14 C8 10 10 7 12 5 C14 7 16 10 16 14 Z" opacity="0.9" />
      <path d="M8 14 H16 V17 C16 18.5 14.5 19.5 12 19.5 C9.5 19.5 8 18.5 8 17 Z" opacity="0.55" />
      <path d="M6 7 L7.5 9 M18 7 L16.5 9 M12 3 V4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
    </BrandIcon>
  );
}

function BondGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="9" cy="12" r="4.4" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.9" />
      <circle cx="15" cy="12" r="4.4" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.65" />
    </BrandIcon>
  );
}

function FishGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 8 C8 6 12 6 16 8 C14 11 14 13 16 16 C12 18 8 18 4 16 C6 13 6 11 4 8 Z" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.85" />
      <circle cx="8.5" cy="11.5" r="1.1" opacity="0.95" />
      <path d="M16 12 H20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.55" />
      <path d="M4.5 19 C7 17 10 16.5 13 17" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
    </BrandIcon>
  );
}

function AmplifyGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="5.4" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.85" />
      <path d="M12 8.6 V15.4 M10.2 10 C10.7 9.3, 11.3 9, 12 9 C13.2 9, 14 9.7, 14 10.7 C14 12.4, 10 11.8, 10 13.5 C10 14.5, 10.9 15.2, 12.2 15.2 C12.9 15.2, 13.5 14.9, 14 14.3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" />
      <path d="M12 3.2 V5.2 M12 18.8 V20.8 M3.2 12 H5.2 M18.8 12 H20.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />
    </BrandIcon>
  );
}

function UnlockSpellGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <rect x="6.2" y="10.5" width="11.6" height="9" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.75" />
      <path d="M8.4 10.5 V8.2 C8.4 5.9, 10 4.2, 12.2 4.2 C14.2 4.2, 15.7 5.6, 15.9 7.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.9" />
      <circle cx="12" cy="14.6" r="1.5" opacity="0.95" />
      <path d="M12 16.1 V18.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    </BrandIcon>
  );
}

function ComprehendSpellGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M2.8 12 C5.5 7.4, 8.8 5.2, 12 5.2 C15.2 5.2, 18.5 7.4, 21.2 12 C18.5 16.6, 15.2 18.8, 12 18.8 C8.8 18.8, 5.5 16.6, 2.8 12 Z" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.55" />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.85" />
      <circle cx="12" cy="12" r="1.4" opacity="0.95" />
    </BrandIcon>
  );
}

function TeachGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 9 L12 5 L20 9 L12 13 Z" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.9" />
      <path d="M8 11 V16 C10 17.5 14 17.5 16 16 V11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      <path d="M20 9 V15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
    </BrandIcon>
  );
}

function RecordGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <rect x="3.5" y="6" width="17" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.45" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.7" />
      <circle cx="12" cy="12" r="2" opacity="0.95" />
    </BrandIcon>
  );
}

function BuildGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <rect x="3" y="4.5" width="18" height="12" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.85" />
      <path d="M8 12.5 L10.5 10 L13 12 L16.5 8.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <path d="M7 19 H17 M12 16.5 V19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    </BrandIcon>
  );
}

function RecoverGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 5 C8 5 5 8.2 5 12 C5 15.8 8 19 12 19 C15.5 19 18.2 16.6 18.8 13.4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.85" />
      <path d="M16 8.5 L19 13 L14.5 12.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      <circle cx="12" cy="12" r="2" opacity="0.9" />
    </BrandIcon>
  );
}

function PushGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M5 12 H13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M11 7 L18 12 L11 17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <path d="M18 7 V17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
    </BrandIcon>
  );
}

function CutGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M6 6 L18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      <circle cx="7" cy="17" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.7" />
      <circle cx="17" cy="7" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.7" />
    </BrandIcon>
  );
}

// ── Engine additions ──────────────────────────────────────────────────────

function StackGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <rect x="4" y="15" width="16" height="2.8" rx="1" opacity="0.95" />
      <rect x="4" y="10.5" width="16" height="2.8" rx="1" opacity="0.7" />
      <rect x="4" y="6" width="16" height="2.8" rx="1" opacity="0.45" />
    </BrandIcon>
  );
}

function HookGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 4 V13 C12 15.2 14 17 16.5 17 C19 17 21 15.2 21 13 V11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      <path d="M7 8 L12 4 L17 8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </BrandIcon>
  );
}

function InviteGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.35" />
      <path d="M12 8 V12 M12 12 L14.5 9.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <path d="M9 16 H15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    </BrandIcon>
  );
}

function ReplyGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M9 11 L4 15 L9 19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <path d="M4 15 H14 C17.3 15 20 12.3 20 9 V8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    </BrandIcon>
  );
}

function SparkGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <path d="M13 3 L9 13 H14.5 L11 21 L19 9 H13 Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <circle cx="5" cy="7" r="1.2" opacity="0.55" />
      <circle cx="4" cy="14" r="0.9" opacity="0.4" />
      <circle cx="7" cy="19" r="1.0" opacity="0.5" />
    </BrandIcon>
  );
}

function BroadcastGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="2.2" opacity="0.95" />
      <path d="M8 8 A5.7 5.7 0 0 0 8 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
      <path d="M16 8 A5.7 5.7 0 0 1 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
      <path d="M5.5 5.5 A9.2 9.2 0 0 0 5.5 18.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M18.5 5.5 A9.2 9.2 0 0 1 18.5 18.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </BrandIcon>
  );
}

function RallyGlyph(p: GlyphProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="6" cy="8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <circle cx="12" cy="6" r="2.4" opacity="0.95" />
      <circle cx="18" cy="8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <path d="M3 18 C3 14.7 4.3 13 6 13 C7.2 13 8.3 13.7 9 15 M15 15 C15.7 13.7 16.8 13 18 13 C19.7 13 21 14.7 21 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      <path d="M9.5 18 C9.5 14.5 10.6 12.5 12 12.5 C13.4 12.5 14.5 14.5 14.5 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
    </BrandIcon>
  );
}

/** Registry — every seed spell should resolve; unknown ids fall back. */
export const SPELL_GLYPHS: Record<string, (props: GlyphProps) => React.ReactElement> = {
  SPELL_CONCISE: ConciseGlyph,
  SPELL_EXPLAIN: ExplainGlyph,
  SPELL_OUTLINE: OutlineGlyph,
  SPELL_EXPAND: ExpandGlyph,
  SPELL_ANALYZE: AnalyzeGlyph,
  SPELL_VISUALIZE: VisualizeGlyph,
  SPELL_EXAMPLE: ExampleGlyph,
  SPELL_ANALOGIZE: AnalogizeGlyph,
  SPELL_APPLY: ApplyGlyph,
  SPELL_FLASHCARD: FlashcardGlyph,
  SPELL_QUIZ: QuizGlyph,
  SPELL_SOCRATIC: SocraticGlyph,
  SPELL_CHALLENGE: ChallengeGlyph,
  SPELL_MODALITY: ModalityGlyph,
  SPELL_SUMMARIZE: SummarizeGlyph,
  SPELL_TRANSLATE: TranslateGlyph,
  SPELL_REFRAME: ReframeGlyph,
  SPELL_FACTCHECK: FactcheckGlyph,
  SPELL_CRITIQUE: CritiqueGlyph,
  SPELL_FIND: FindGlyph,
  SPELL_CONNECT: ConnectGlyph,
  SPELL_ENCOURAGE: EncourageGlyph,
  SPELL_GROUND: GroundGlyph,
  SPELL_DRAFT: DraftGlyph,
  SPELL_STORYBOARD: StoryboardGlyph,
  SPELL_STEP_FORWARD: StepForwardGlyph,
  SPELL_NAVIGATE_PATH: NavigatePathGlyph,
  SPELL_TRANSITION: TransitionGlyph,
  SPELL_SET_PACE: SetPaceGlyph,
  SPELL_LIFT: LiftGlyph,
  SPELL_NAME_IT: NameItGlyph,
  SPELL_SHIFT_STATE: ShiftStateGlyph,
  SPELL_TRACK_MOOD: TrackMoodGlyph,
  SPELL_CHECK_IN: CheckInGlyph,
  SPELL_STAND_UP: StandUpGlyph,
  SPELL_MILESTONE: MilestoneGlyph,
  SPELL_REVIEW_STATUS: ReviewGlyph,
  // Matthew-aligned additions
  SPELL_PLAN: PlanGlyph,
  SPELL_ACT: ActGlyph,
  SPELL_SHIP: ShipGlyph,
  SPELL_PUSH: PushGlyph,
  SPELL_IMPROVE: ImproveGlyph,
  SPELL_QUALITY: QualityGlyph,
  SPELL_CUT: CutGlyph,
  SPELL_COMMUNICATE: CommunicateGlyph,
  SPELL_PLAY: PlayGlyph,
  SPELL_COMPETE: CompeteGlyph,
  SPELL_CELEBRATE: CelebrateGlyph,
  SPELL_BOND: BondGlyph,
  SPELL_FISH: FishGlyph,
  SPELL_AMPLIFY: AmplifyGlyph,
  SPELL_UNLOCK: UnlockSpellGlyph,
  SPELL_COMPREHEND: ComprehendSpellGlyph,
  SPELL_TEACH: TeachGlyph,
  SPELL_RECORD: RecordGlyph,
  SPELL_BUILD: BuildGlyph,
  SPELL_RECOVER: RecoverGlyph,
  // Engine additions — Create · Engage · Influence
  SPELL_STACK: StackGlyph,
  SPELL_HOOK: HookGlyph,
  SPELL_INVITE: InviteGlyph,
  SPELL_REPLY: ReplyGlyph,
  SPELL_SPARK: SparkGlyph,
  SPELL_BROADCAST: BroadcastGlyph,
  SPELL_RALLY: RallyGlyph,
};

export function SpellGlyph({
  id,
  size = 22,
  title,
  ...rest
}: GlyphProps & { id: string }) {
  const Glyph = SPELL_GLYPHS[id] ?? CastFallback;
  return <Glyph size={size} title={title} {...rest} />;
}

export function hasSpellGlyph(id: string): boolean {
  return id in SPELL_GLYPHS;
}

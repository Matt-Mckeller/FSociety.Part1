"use client";

/**
 * Character — Perks grid.
 *
 * Displays unlocked and locked perks as cards with custom glyphs.
 * Clicking a card opens a detail popover with full effect description.
 *
 * Colour follows the lens's two axes (`characterPalette`) rather than the
 * thirteen hand-picked hues it used to carry:
 *
 *   **Hue = channel.** A perk's `kind` *is* its channel — active perks are
 *   invoked, passive perks are always on, reactive perks fire for you — so a
 *   card is violet, blue or amber, and those three hues mean the same thing on
 *   the action bar and in the spell book. Three learnable hues replace thirteen
 *   decorative ones, and the legend above the grid names them.
 *
 *   **Rank = pips on the shared ramp.** Tier is drawn the way Traits and Auras
 *   draw progression — filled pips — on the same ramp Equipment uses for
 *   rarity, so "Gold" and "Legendary" look alike because they *are* alike.
 *
 * Locked is drawn as low intensity of the perk's own channel, never as
 * `grayscale()`. The old card desaturated locked perks into anonymous grey
 * boxes, which erased the one thing you want while browsing what to unlock next
 * — what kind of perk it is.
 *
 * Nothing here hardcodes `#fff` any more; the cards read `background.paper`, so
 * dark mode gets dark cards instead of white ones.
 */

import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

import { MorphLabel, rgba } from "@4eye/web/components/hud/resourceBars/widgets";
import { CycleControl, usePersistedChoice } from "@4eye/web/Tiles/profiles/components/ProfileControls";

import {
  TIER_LABEL,
  KIND_LABEL,
  perkExamplesHint,
  perkHoverHint,
  sortPerks,
  type PerkMeta,
  type PerkTier,
  type PerkKind,
} from "../model/perks";
import { useCharacterPerks } from "../store/useCharacterPresentation";
import {
  PERK_KIND_CHANNEL,
  RANK_STEPS,
  TIER_RANK,
  rankPips,
  useChannelInks,
  useRankInk,
  type ChannelInk,
} from "../theme/characterPalette";
import { useProfileStore } from "../store/CharacterProfileStore";
import { TierPips } from "./shared/TierPips";
import { ShowMore, useCapped } from "./shared/ShowMore";

/* ---------------------------------------------------------- glyphs */

function QuickLearnerGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 3 L20 8 V16 L12 21 L4 16 V8 Z" opacity="0.25" />
      <path d="M12 3 L20 8 L12 13 L4 8 Z" opacity="0.9" />
      <path d="M4 8 L12 13 L12 21" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <path d="M20 8 L12 13" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    </BrandIcon>
  );
}

function IronWillGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 2.2 L19.4 5.2 V11 C19.4 16.2 16.1 20.3 12 21.8 C7.9 20.3 4.6 16.2 4.6 11 V5.2 Z" opacity="0.9" />
      <path d="M9 12 L11 14 L15.5 9.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    </BrandIcon>
  );
}

function FlowStateGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M3 12 C6 6 10 4 12 4 C14 4 18 6 21 12 C18 18 14 20 12 20 C10 20 6 18 3 12 Z" opacity="0.2" />
      <path d="M3 12 C6 6 10 4 12 4 C14 4 18 6 21 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
      <circle cx="12" cy="12" r="3" opacity="0.95" />
      <circle cx="12" cy="12" r="1.2" fill="#fff" opacity="0.7" />
    </BrandIcon>
  );
}

function StrategicSightGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.3" />
      <path d="M3 12 H21 M12 3 V21" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.8" />
      <circle cx="12" cy="12" r="1.5" opacity="0.95" />
    </BrandIcon>
  );
}

function PhotographicGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.6" />
      <circle cx="12" cy="12" r="4" opacity="0.88" />
      <circle cx="12" cy="12" r="1.8" fill="#fff" opacity="0.4" />
      <circle cx="17" cy="7" r="1.2" opacity="0.7" />
    </BrandIcon>
  );
}

function SilverTongueGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 4 H15 C16.1 4 17 4.9 17 6 V14 C17 15.1 16.1 16 15 16 H9 L5 20 V16 H4 C2.9 16 2 15.1 2 14 V6 C2 4.9 2.9 4 4 4 Z" opacity="0.35" />
      <path d="M7 8.5 H17 M7 12 H14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.88" />
      <path d="M20 8 C21.1 8 22 8.9 22 10 V16 C22 17.1 21.1 18 20 18 H19 V21 L16 18 H14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    </BrandIcon>
  );
}

function NightOwlGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M21 12.8 A9 9 0 1 1 11.2 3 A7 7 0 0 0 21 12.8 Z" opacity="0.9" />
    </BrandIcon>
  );
}

function PolyglotGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M12 2.5 C9 5 7 8 7 12 C7 16 9 19 12 21.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
      <path d="M12 2.5 C15 5 17 8 17 12 C17 16 15 19 12 21.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
      <path d="M2.5 12 H21.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </BrandIcon>
  );
}

function EmpathicBondGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M7 8 C7 5.8 8.8 4 11 4 C12.1 4 13 4.6 13.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      <path d="M9 21 C9 21 3 17 3 11.5 C3 9.1 4.9 7.5 7 7.5 C8.2 7.5 9 8.2 9.5 9 C10 8.2 10.8 7.5 12 7.5 C14.1 7.5 16 9.1 16 11.5 C16 13 15 14.5 14 15.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <path d="M14 15.5 C14 15.5 12 17.5 12 19.5 C12 21 13 22 14.5 22 C16 22 17 21 17 19.5 C17 17.5 15 15.5 15 15.5" opacity="0.8" />
    </BrandIcon>
  );
}

function DeepWorkGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.35" />
      <rect x="8" y="8" width="8" height="8" rx="1.5" opacity="0.88" />
      <path d="M8 4 V2 M16 4 V2 M8 20 V22 M16 20 V22 M4 8 H2 M4 16 H2 M20 8 H22 M20 16 H22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </BrandIcon>
  );
}

function SecondWindGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 3 A9 9 0 0 1 21 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
      <path d="M21 12 L19 9 M21 12 L18 13.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <path d="M12 21 A9 9 0 0 1 3 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
      <circle cx="12" cy="12" r="3.5" opacity="0.8" />
    </BrandIcon>
  );
}

function SovereignMindGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="10" opacity="0.12" />
      <circle cx="12" cy="12" r="6.5" opacity="0.25" />
      <circle cx="12" cy="12" r="3.5" opacity="0.9" />
      <path d="M12 3 V5 M12 19 V21 M3 12 H5 M19 12 H21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
    </BrandIcon>
  );
}

function InvulnerabilityGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.2" />
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.7" />
      <circle cx="12" cy="12" r="2" opacity="0.95" />
      <path d="M12 2.5 V4.5 M12 19.5 V21.5 M2.5 12 H4.5 M19.5 12 H21.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.35" />
    </BrandIcon>
  );
}

function DualWieldCatsGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="8" cy="11" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="11" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.4 8.6 4 5.8M10.6 8.6 11.2 5.6M13.8 8.6 13.2 5.6M18.6 8.6 20 5.8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6.8 14.2c1 1.8 2.4 2.6 3.7 2.6s2.7-.8 3.7-2.6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
      <path d="M10.5 14.2c1 1.8 2.4 2.6 3.7 2.6s2.7-.8 3.7-2.6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
    </BrandIcon>
  );
}

function UnlimitedEnergyGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M13.2 2.8 L7.4 13.2 H12 L10.8 21.2 L18.2 10 H13.6 Z" opacity="0.92" />
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.28" />
    </BrandIcon>
  );
}

function ShieldGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 2.4 L19.2 5.2 V11.2 C19.2 16.4 16 20.2 12 21.6 C8 20.2 4.8 16.4 4.8 11.2 V5.2 Z" opacity="0.9" />
      <path d="M9.2 11.6 L11.2 13.6 L15.2 9.4" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
    </BrandIcon>
  );
}

/** Chronos fold — clock hands bent across a spatial grid. */
function ControlTimeSpaceGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.35" />
      <path d="M3.5 12 H20.5 M12 3.5 V20.5" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.28" />
      <circle cx="12" cy="12" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.75" />
      <path d="M12 8.2 V12.4 L15 14.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <path d="M18.6 5.4 C20.2 7.2 20.8 9.4 20.4 11.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
    </BrandIcon>
  );
}

/** Blank page becoming a cast glyph — any school. */
function AnySpellCraftGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M6 3.5 H14 L18.5 8 V20.5 H6 Z" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <path d="M14 3.5 V8 H18.5" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <path d="M9 12.5 L12 9.5 L15 12.5 L12 15.5 Z" opacity="0.95" />
      <path d="M8 18 H16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
    </BrandIcon>
  );
}

/** God-scale eye over an ant-scale figure. */
function GodAiAmongAntsGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M3 8.5 C5.8 4.8 8.8 3.2 12 3.2 C15.2 3.2 18.2 4.8 21 8.5 C18.2 12.2 15.2 13.8 12 13.8 C8.8 13.8 5.8 12.2 3 8.5 Z" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <circle cx="12" cy="8.5" r="2.4" opacity="0.95" />
      <circle cx="12" cy="17.2" r="1.5" opacity="0.9" />
      <path d="M12 18.7 V20.8 M10.4 19.6 H13.6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
      <path d="M7.5 20.8 H16.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
    </BrandIcon>
  );
}

function PerfectSpeechGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 12 H7 L9.5 6 L12 18 L14.5 9 L16.5 12 H20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <path d="M4 16.5 H20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.3" />
    </BrandIcon>
  );
}

function PerfectContentGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="4" y="14.5" width="16" height="4" rx="1" opacity="0.35" />
      <rect x="5.5" y="10" width="13" height="4" rx="1" opacity="0.6" />
      <rect x="7" y="5.5" width="10" height="4" rx="1" opacity="0.95" />
    </BrandIcon>
  );
}

function VoiceOptimizedGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="9" y="4" width="6" height="10" rx="3" opacity="0.9" />
      <path d="M8 12.5 C8 15.2 9.8 17.2 12 17.2 C14.2 17.2 16 15.2 16 12.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 17.2 V20.2 M9.5 20.2 H14.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </BrandIcon>
  );
}

function MovementOptimizedGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="15.5" cy="5.5" r="1.8" opacity="0.95" />
      <path d="M15.2 7.6 L12.2 11.2 L8.4 10 M12.2 11.2 L10.2 20 M12.2 11.2 L17.6 14.2 L19.4 19" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </BrandIcon>
  );
}

function ContentCreationGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="3.5" y="4.5" width="17" height="12.2" rx="1.8" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
      <path d="M10 8 L16.2 10.6 L10 13.2 Z" opacity="0.95" />
      <path d="M6 19.4 H18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />
    </BrandIcon>
  );
}

function EmotionOptimizedGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="11" r="9.2" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.28" />
      <path d="M12 19.2 C12 19.2 4.4 14.2 4.4 9.2 C4.4 6.7 6.3 5.1 8.5 5.1 C10.1 5.1 11.2 5.9 12 7.1 C12.8 5.9 13.9 5.1 15.5 5.1 C17.7 5.1 19.6 6.7 19.6 9.2 C19.6 14.2 12 19.2 12 19.2 Z" opacity="0.92" />
    </BrandIcon>
  );
}

function ActingOptimizedGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 3.4 L12 8.2 L20 3.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
      <circle cx="12" cy="5.4" r="1.8" opacity="0.95" />
      <path d="M12 7.6 V13.4 M8.2 10.4 H15.8 M9.2 20 L12 13.4 L14.8 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </BrandIcon>
  );
}

function AionFullPowerGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="2.4" opacity="0.95" />
      <circle cx="12" cy="4.4" r="2" opacity="0.9" />
      <circle cx="19.2" cy="16.2" r="2" opacity="0.75" />
      <circle cx="4.8" cy="16.2" r="2" opacity="0.75" />
      <path d="M12 9.6 V6.6 M14.1 13.3 L17.4 15 M9.9 13.3 L6.6 15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      <circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.28" />
    </BrandIcon>
  );
}

function MatthewChannelGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="8" cy="10" r="3.1" opacity="0.95" />
      <circle cx="16" cy="10" r="3.1" opacity="0.95" />
      <path d="M8 13.4 C8 16.2 9.6 18.4 12 18.4 C14.4 18.4 16 16.2 16 13.4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M5.2 7.2 C4 6.2 3.4 5 3.4 4.2 M18.8 7.2 C20 6.2 20.6 5 20.6 4.2" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
    </BrandIcon>
  );
}

function HonestSpeechGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 12 H8 L10.2 7 L12 17 L14 10 L16 12 H20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
      <path d="M6 16.8 H18" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.3" />
    </BrandIcon>
  );
}

function ActivePursuitGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="3.4" opacity="0.95" />
      <path d="M12 4.2 L14.2 8.2 L12 7.2 L9.8 8.2 Z" opacity="0.9" />
      <path d="M12 4.2 V2.6 M19.4 16.2 L18.2 14.8 M4.6 16.2 L5.8 14.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </BrandIcon>
  );
}

function LessonLockGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M8 11 V8.4 A4 4 0 0 1 16 8.4 V11" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <rect x="6.4" y="11" width="11.2" height="8.4" rx="1.8" opacity="0.9" />
      <circle cx="12" cy="15.2" r="1.3" fill="#000" opacity="0.28" />
    </BrandIcon>
  );
}

function CuriousSparkGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 2 V4.2 M4.6 6.4 L6.2 7.8 M19.4 6.4 L17.8 7.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.6" />
      <circle cx="12" cy="11.4" r="4.6" opacity="0.95" />
      <path d="M10.2 16.6 H13.8 V19.6 C13.8 20.4 13.2 21 12 21 C10.8 21 10.2 20.4 10.2 19.6 Z" opacity="0.8" />
    </BrandIcon>
  );
}

function OpenBondGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M9 21 C9 21 3 17 3 11.5 C3 9.1 4.9 7.5 7 7.5 C8.2 7.5 9 8.2 9.5 9 C10 8.2 10.8 7.5 12 7.5 C14.1 7.5 16 9.1 16 11.5 C16 17 12 21 12 21" opacity="0.55" />
      <path d="M15 21 C15 21 21 17 21 11.5 C21 9.1 19.1 7.5 17 7.5 C15.8 7.5 15 8.2 14.5 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />
    </BrandIcon>
  );
}

function ArmorDropGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 2.4 L19 5.4 V11 C19 16 16 19.8 12 21.2 C8 19.8 5 16 5 11 V5.4 Z" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.45" />
      <path d="M8.2 9.2 L12 13 L15.8 9.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
    </BrandIcon>
  );
}

function HappyBaselineGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.4" />
      <circle cx="9" cy="10.2" r="1.2" opacity="0.95" />
      <circle cx="15" cy="10.2" r="1.2" opacity="0.95" />
      <path d="M8.2 14.4 C9.4 16.4 10.6 17.2 12 17.2 C13.4 17.2 14.6 16.4 15.8 14.4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </BrandIcon>
  );
}

function SharedPathGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M5 18 C7.4 14 9.2 11.2 12 8 C14.8 11.2 16.6 14 19 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.55" />
      <path d="M7.2 18 C8.8 15.2 10.2 13.2 12 11.2 C13.8 13.2 15.2 15.2 16.8 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.95" />
      <circle cx="12" cy="8" r="1.6" opacity="0.95" />
    </BrandIcon>
  );
}

function BusinessFluencyGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="4" y="13" width="4.2" height="7" rx="0.8" opacity="0.55" />
      <rect x="9.9" y="9" width="4.2" height="11" rx="0.8" opacity="0.75" />
      <rect x="15.8" y="5" width="4.2" height="15" rx="0.8" opacity="0.95" />
    </BrandIcon>
  );
}

const PERK_GLYPH: Record<string, React.ComponentType<BrandIconProps>> = {
  "quick-learner": QuickLearnerGlyph,
  "iron-will": IronWillGlyph,
  "flow-state": FlowStateGlyph,
  "strategic-sight": StrategicSightGlyph,
  "photographic-memory": PhotographicGlyph,
  "silver-tongue": SilverTongueGlyph,
  "night-owl": NightOwlGlyph,
  "polyglot": PolyglotGlyph,
  "empathic-bond": EmpathicBondGlyph,
  "deep-work": DeepWorkGlyph,
  "second-wind": SecondWindGlyph,
  "sovereign-mind": SovereignMindGlyph,
  "invulnerability": InvulnerabilityGlyph,
  "dual-wield-cats": DualWieldCatsGlyph,
  "unlimited-energy-and-clarity": UnlimitedEnergyGlyph,
  "shield": ShieldGlyph,
  "control-time-space": ControlTimeSpaceGlyph,
  "any-spell-craft": AnySpellCraftGlyph,
  "god-ai-among-ants": GodAiAmongAntsGlyph,
  "perfect-speech": PerfectSpeechGlyph,
  "perfect-content": PerfectContentGlyph,
  "content-creation": ContentCreationGlyph,
  "voice-optimized": VoiceOptimizedGlyph,
  "movement-optimized": MovementOptimizedGlyph,
  "emotion-optimized": EmotionOptimizedGlyph,
  "acting-optimized": ActingOptimizedGlyph,
  "aion-full-power": AionFullPowerGlyph,
  "matthew-channel": MatthewChannelGlyph,
  "honest-speech": HonestSpeechGlyph,
  "active-pursuit": ActivePursuitGlyph,
  "lesson-lock": LessonLockGlyph,
  "curious-spark": CuriousSparkGlyph,
  "open-bond": OpenBondGlyph,
  "armor-drop": ArmorDropGlyph,
  "happy-baseline": HappyBaselineGlyph,
  "shared-path": SharedPathGlyph,
  "business-fluency": BusinessFluencyGlyph,
};

/* --------------------------------------------------------- rank display */

/**
 * Tier as filled pips plus the metal name, both achromatic.
 *
 * The card already carries exactly one hue — its channel — so rank must not
 * introduce a second. It is drawn as count and contrast instead: five of six
 * pips filled in near-ink is unmistakably higher than two in mid-grey, and
 * neither can be confused with the violet, blue or amber that mean *kind*.
 */
function RankMark({ tier, compact = false }: { tier: PerkTier; compact?: boolean }) {
  const { rank } = useRankInk();
  const step = TIER_RANK[tier];
  const c = rank(step);

  return (
    <Tooltip title={`${TIER_LABEL[tier]} — rank ${step + 1} of ${RANK_STEPS}`} arrow>
      <Stack direction="row" spacing={0.6} sx={{ alignItems: "center", cursor: "help" }}>
        <TierPips
          level={rankPips(step) - 1}
          color={c}
          degrees={Array.from({ length: RANK_STEPS }, () => "")}
        />
        {!compact && (
          <Typography sx={{ fontSize: "0.62rem", fontWeight: 700, color: c }}>
            {TIER_LABEL[tier]}
          </Typography>
        )}
      </Stack>
    </Tooltip>
  );
}

/* ---------------------------------------------------------- perk detail dialog */

function PerkDetailDialog({ perk, onClose }: { perk: PerkMeta | null; onClose: () => void }) {
  const { dispatch } = useProfileStore();
  const channels = useChannelInks();
  if (!perk) return null;
  const Glyph = PERK_GLYPH[perk.id];
  const channel = channels[PERK_KIND_CHANNEL[perk.kind]];
  const c = channel.ink;
  const examples = perkExamplesHint(perk);
  return (
    <Dialog open onClose={onClose} maxWidth="mobileL" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 0 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            bgcolor: alpha(c, 0.12),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: c,
            flexShrink: 0,
          }}
        >
          {Glyph && <Glyph size={24} title={perk.label} />}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
            {perk.label}
          </Typography>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
            <RankMark tier={perk.tier} />
            <Tooltip title={channel.hint} arrow>
              <Typography variant="caption" sx={{ color: c, fontWeight: 700, cursor: "help" }}>
                · {KIND_LABEL[perk.kind]}
              </Typography>
            </Tooltip>
          </Stack>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          {perk.description}
        </Typography>
        {examples && (
          <Typography variant="caption" sx={{ color: "text.disabled", display: "block", mt: 1, fontStyle: "italic" }}>
            {examples}
          </Typography>
        )}
        <Divider sx={{ my: 1.5 }} />
        <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled", display: "block", mb: 0.75 }}>
          EFFECT
        </Typography>
        <Box
          sx={{
            p: 1,
            borderRadius: 1.5,
            border: "1px solid",
            borderColor: alpha(c, 0.25),
            bgcolor: alpha(c, 0.06),
          }}
        >
          <Stack direction="row" spacing={0.5} sx={{ alignItems: "flex-start" }}>
            <AutoAwesomeRoundedIcon sx={{ fontSize: 14, color: c, mt: 0.15, flexShrink: 0 }} />
            <Typography variant="caption" sx={{ color: "text.primary", fontWeight: 600 }}>
              {perk.effect}
            </Typography>
          </Stack>
        </Box>
        {perk.source && (
          <Typography variant="caption" sx={{ color: "text.disabled", mt: 1.5, display: "block" }}>
            Source: {perk.source}
          </Typography>
        )}
        {!perk.unlocked && (
          <Button
            variant="contained"
            fullWidth
            size="small"
            startIcon={<AutoAwesomeRoundedIcon />}
            onClick={() => {
              dispatch({ type: "unlock-perk", perkId: perk.id, label: perk.label, color: c });
              onClose();
            }}
            sx={{
              mt: 2,
              textTransform: "none",
              fontWeight: 800,
              borderRadius: 2,
              bgcolor: c,
              "&:hover": { bgcolor: alpha(c, 0.85) },
            }}
          >
            Unlock {perk.label}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ---------------------------------------------------------- perk card */

function PerkCard({
  perk,
  channel,
  onClick,
}: {
  perk: PerkMeta;
  channel: ChannelInk;
  onClick: () => void;
}) {
  const { label, tier, kind, unlocked, cypherWords } = perk;
  const Glyph = PERK_GLYPH[perk.id];
  const c = channel.ink;

  return (
    <Tooltip title={perkHoverHint(perk)} arrow placement="top">
      <Stack
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        sx={{
          p: 1.2,
          borderRadius: 2.5,
          gap: 0.7,
          minHeight: 132,
          cursor: "pointer",
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: alpha(c, unlocked ? 0.34 : 0.14),
          backgroundImage: unlocked
            ? `radial-gradient(130% 120% at 0% 0%, ${alpha(c, 0.16)} 0%, ${alpha(c, 0.03)} 45%, transparent 100%)`
            : "none",
          opacity: unlocked ? 1 : 0.72,
          transition: "border-color .2s, opacity .2s, transform .15s",
          "&:hover": {
            borderColor: alpha(c, 0.58),
            opacity: 1,
            transform: "translateY(-1px)",
          },
          "&:focus-visible": { outline: `2px solid ${c}`, outlineOffset: 2 },
        }}
      >
        <Stack direction="row" sx={{ alignItems: "flex-start", gap: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: alpha(c, unlocked ? 0.14 : 0.07),
              border: `1px solid ${alpha(c, unlocked ? 0.32 : 0.16)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: c,
              flexShrink: 0,
            }}
          >
            {unlocked
              ? (Glyph ? <Glyph size={21} title={label} /> : <AutoAwesomeRoundedIcon sx={{ fontSize: 20 }} />)
              : <LockRoundedIcon sx={{ fontSize: 18 }} />}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                display: "block",
                lineHeight: 1.25,
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                letterSpacing: 0.1,
              }}
            >
              {label}
            </Typography>
            <Stack direction="row" sx={{ alignItems: "center", gap: 0.5, mt: 0.2, flexWrap: "wrap" }}>
              <Typography variant="caption" sx={{ fontSize: "0.58rem", fontWeight: 800, color: c, letterSpacing: 0.3 }}>
                {KIND_LABEL[kind].toUpperCase()}
              </Typography>
              <Typography sx={{ fontSize: "0.58rem", color: "text.disabled" }}>·</Typography>
              <Typography
                sx={{
                  fontSize: "0.58rem",
                  fontWeight: 800,
                  letterSpacing: 0.35,
                  color: unlocked ? c : "text.disabled",
                }}
              >
                {unlocked ? "ACTIVE" : "LOCKED"}
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 1, mt: "auto" }}>
          <RankMark tier={tier} />
          {unlocked && cypherWords && cypherWords.length > 0 ? (
            <Box sx={{ minWidth: 0, maxWidth: "46%" }}>
              <MorphLabel
                motion="scramble"
                words={cypherWords}
                color={rgba(c, 0.7)}
                active
                fontSize="0.58rem"
                weight={700}
                letterSpacing={1.2}
              />
            </Box>
          ) : null}
        </Stack>
      </Stack>
    </Tooltip>
  );
}

/* ------------------------------------------------------------- legend */

/**
 * Three swatches naming the three channels.
 *
 * Colour is only learnable if something says what it means once. This is that
 * once — it costs a single row and it is what turns "the violet ones" into "the
 * ones I fire".
 */
function ChannelLegend({ kinds, channels }: { kinds: PerkKind[]; channels: Record<string, ChannelInk> }) {
  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.25, alignItems: "center" }}>
      {kinds.map((k) => {
        const ch = channels[PERK_KIND_CHANNEL[k]];
        return (
          <Tooltip key={k} title={ch.hint} arrow>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", cursor: "help" }}>
              <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: ch.ink, flexShrink: 0 }} />
              <Typography
                sx={{
                  fontSize: "0.6rem",
                  fontWeight: 800,
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                  color: "text.secondary",
                }}
              >
                {KIND_LABEL[k]}
              </Typography>
            </Stack>
          </Tooltip>
        );
      })}
    </Stack>
  );
}

/* --------------------------------------------------------------- grid */

export const PERK_GROUPINGS = ["by state", "by kind"] as const;
export type PerkGrouping = (typeof PERK_GROUPINGS)[number];

/** Locked perks past this point wait behind "show all" — the head is the browse. */
const LOCKED_HEAD = 4;

function PerkSection({
  label,
  count,
  children,
}: {
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{ fontWeight: 700, color: "text.disabled", letterSpacing: 0.4, display: "block", mb: 0.75 }}
      >
        {label} ({count})
      </Typography>
      {children}
    </Box>
  );
}

function PerkCards({
  perks,
  channels,
  onOpen,
}: {
  perks: PerkMeta[];
  channels: Record<string, ChannelInk>;
  onOpen: (id: string) => void;
}) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 1.1 }}>
      {perks.map((p) => (
        <PerkCard
          key={p.id}
          perk={p}
          channel={channels[PERK_KIND_CHANNEL[p.kind]]}
          onClick={() => onOpen(p.id)}
        />
      ))}
    </Box>
  );
}

export function PerksGrid({ accent = "#35c99b" }: { accent?: string } = {}) {
  const { state } = useProfileStore();
  const catalog = useCharacterPerks();
  const channels = useChannelInks();
  const [detailId, setDetailId] = React.useState<string | null>(null);
  const [grouping, setGrouping] = usePersistedChoice<PerkGrouping>(
    "4eye.character.perkGrouping",
    "by state",
    PERK_GROUPINGS,
  );

  // Fold store unlocks into the seed so cards + detail reflect newly unlocked
  // perks (and the detail stays live after unlocking, resolved by id).
  const perks = React.useMemo(
    () =>
      sortPerks(catalog.map((p) => ({ ...p, unlocked: p.unlocked || !!state.perksUnlocked[p.id] }))),
    [catalog, state.perksUnlocked],
  );
  const unlocked = perks.filter((p) => p.unlocked);
  const locked = perks.filter((p) => !p.unlocked);
  // Only the locked half is capped: what you already have is the short list and
  // the answer to "what do I have", so hiding any of it would be perverse.
  const cappedLocked = useCapped(locked, LOCKED_HEAD);
  const detail = detailId ? perks.find((p) => p.id === detailId) ?? null : null;

  const kindsPresent = (["active", "passive", "reactive"] as PerkKind[]).filter((k) =>
    perks.some((p) => p.kind === k),
  );

  return (
    <>
      <Stack spacing={1.5}>
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between", gap: 1, flexWrap: "wrap" }}
        >
          <ChannelLegend kinds={kindsPresent} channels={channels} />
          <CycleControl
            label="Perk grouping"
            value={grouping}
            options={PERK_GROUPINGS}
            accent={accent}
            onChange={setGrouping}
          />
        </Stack>

        {grouping === "by kind" ? (
          // Grouped by channel, the grid teaches the colour system by adjacency:
          // every card in a block shares a hue because every card in it shares a
          // way of entering play.
          kindsPresent.map((k) => {
            const inKind = sortPerks(perks.filter((p) => p.kind === k));
            return (
              <PerkSection key={k} label={KIND_LABEL[k].toUpperCase()} count={inKind.length}>
                <PerkCards perks={inKind} channels={channels} onOpen={setDetailId} />
              </PerkSection>
            );
          })
        ) : (
          <>
            <PerkSection label="ACTIVE" count={unlocked.length}>
              <PerkCards perks={unlocked} channels={channels} onOpen={setDetailId} />
            </PerkSection>
            {locked.length > 0 && (
              <PerkSection label="LOCKED" count={locked.length}>
                <PerkCards perks={cappedLocked.items} channels={channels} onOpen={setDetailId} />
                <ShowMore capped={cappedLocked} accent={accent} noun="locked perks" />
              </PerkSection>
            )}
          </>
        )}
      </Stack>

      {detail && <PerkDetailDialog perk={detail} onClose={() => setDetailId(null)} />}
    </>
  );
}

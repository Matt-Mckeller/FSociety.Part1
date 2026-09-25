"use client";

/**
 * Character — Auras.
 *
 * The intangible field a character radiates. Each aura keeps a unique glyph hue
 * for identity; card chrome uses the equipped channel so the grid does not
 * rainbow. Rank pips are achromatic ({@link useRankInk}). Active auras lift
 * the glyph with a soft glow; inactive sit flat; locked show Unlock.
 */

import * as React from "react";
import { Box, Button, Stack, Switch, Tooltip, Typography, alpha } from "@mui/material";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

import { useChannelInks, useRankInk } from "../theme/characterPalette";
import { TierPips } from "./shared/TierPips";
import { InfluencePill } from "./shared/InfluencePill";
import { useOptionalProfileStore } from "../store/CharacterProfileStore";

type GlyphProps = Omit<BrandIconProps, "children">;

/* ------------------------------------------------------------------ glyphs */

/**
 * Presence.Command() × Power — a steadfast shield (the commanding core)
 * inside a radiant aura ring (the presence felt around it), with a solid
 * diamond heart (Power held within, the multiplier).
 */
export function PresenceGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="10.5" opacity="0.14" />
      <path
        d="M12 2.2 L19.4 5.2 V11 C19.4 16.2 16.1 20.3 12 21.8 C7.9 20.3 4.6 16.2 4.6 11 V5.2 Z"
        opacity="0.92"
      />
      <path d="M12 7.4 L15.1 12 L12 16.6 L8.9 12 Z" fill="#000" opacity="0.22" />
    </BrandIcon>
  );
}

/**
 * Gravity.Pull() — a magnetic core that pulls followers into orbit (the
 * pull people feel toward a leader). A bright center, an orbit ring, and three
 * satellites drawn around it (support gathering, believing, following).
 */
export function MagnetismGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.4" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="12" cy="3" r="2" opacity="0.9" />
      <circle cx="20.1" cy="15.4" r="2" opacity="0.7" />
      <circle cx="3.9" cy="15.4" r="2" opacity="0.7" />
    </BrandIcon>
  );
}

/**
 * Future.Beacon() — a sun cresting the horizon at dawn (the light returning), with three
 * rays reaching upward (the lift of looking forward).
 */
export function HopeGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path
        d="M12 3 V5.4 M5.8 6.4 L7.5 8.1 M18.2 6.4 L16.5 8.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path d="M7 17.5 A5 5 0 0 1 17 17.5 Z" opacity="0.95" />
      <path
        d="M3.5 17.5 H20.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </BrandIcon>
  );
}

/**
 * Love.Radiance() — a full heart inside a soft aura ring (the warmth that
 * carries beyond it), with a bright glint (the spark it gives).
 */
export function LoveGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12.5" r="10.5" opacity="0.12" />
      <path
        d="M12 21 C12 21 3.7 15.6 3.7 9.4 C3.7 6.3 6.1 4.2 8.7 4.2 C10.4 4.2 11.5 5.2 12 6.2 C12.5 5.2 13.6 4.2 15.3 4.2 C17.9 4.2 20.3 6.3 20.3 9.4 C20.3 15.6 12 21 12 21 Z"
        opacity="0.94"
      />
      <path
        d="M9.4 7 L10.1 8.6 L11.7 9.3 L10.1 10 L9.4 11.6 L8.7 10 L7.1 9.3 L8.7 8.6 Z"
        fill="#fff"
        opacity="0.5"
      />
    </BrandIcon>
  );
}

/** Vision.Legend() — an eye held inside a compass, pointed toward the future. */
export function LegendCrownGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.3" />
      <path d="M3.5 12 C6.2 7.2 9 5.2 12 5.2 S17.8 7.2 20.5 12 C17.8 16.8 15 18.8 12 18.8 S6.2 16.8 3.5 12 Z" fill="none" stroke="currentColor" strokeWidth="1.7" opacity="0.95" />
      <circle cx="12" cy="12" r="3" opacity="0.9" />
      <path d="M12 1.8 V4 M12 20 V22.2 M1.8 12 H4 M20 12 H22.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="m12 7.2 1.3 3.5 3.5 1.3-3.5 1.3-1.3 3.5-1.3-3.5-3.5-1.3 3.5-1.3Z" fill="#fff" opacity="0.38" />
    </BrandIcon>
  );
}

/**
 * Inspiration — a lit bulb (the idea arriving) over its base, ringed by sparks
 * (the flash of insight radiating out). Kept for Janna's Curious Spark.
 */
export function InspirationGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path
        d="M12 2 V4 M4.5 6.5 L6 8 M19.5 6.5 L18 8 M3 13 H5 M21 13 H19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.65"
      />
      <circle cx="12" cy="11.5" r="5" opacity="0.95" />
      <rect x="10" y="16" width="4" height="3.4" rx="1.1" opacity="0.85" />
      <path d="M11 18 H13" fill="none" stroke="#000" strokeWidth="1" strokeLinecap="round" opacity="0.22" />
    </BrandIcon>
  );
}

/** Ship.Pod() — a compact spacecraft carrying the work outward. */
export function MotivationalGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path d="M12 3.1 C15.8 5.2 18.1 8.8 18.1 12.8 L15.5 17.2 H8.5 L5.9 12.8 C5.9 8.8 8.2 5.2 12 3.1 Z" opacity="0.94" />
      <path d="M8.3 11.6 H15.7 M9.2 16.9 6.7 19.6 M14.8 16.9 17.3 19.6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.72" />
      <circle cx="12" cy="9.2" r="2" fill="#000" opacity="0.24" />
      <path d="M9.4 19.4 H14.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
    </BrandIcon>
  );
}

/**
 * Shield — a ward that holds. Outer plate, inner plate, locked center.
 */
export function ShieldAuraGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <path
        d="M12 2.2 L19.6 5.4 V11.4 C19.6 16.8 16.2 20.6 12 22 C7.8 20.6 4.4 16.8 4.4 11.4 V5.4 Z"
        opacity="0.92"
      />
      <path
        d="M12 5.2 L16.6 7.1 V11.2 C16.6 14.8 14.4 17.4 12 18.4 C9.6 17.4 7.4 14.8 7.4 11.2 V7.1 Z"
        fill="#000"
        opacity="0.22"
      />
      <path
        d="M9.4 11.4 L11.3 13.3 L15.1 9.2"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </BrandIcon>
  );
}

/**
 * MM's Morale Compass — the needle only points where Matthew allows.
 */
export function MoraleCompassGlyph(props: GlyphProps) {
  return (
    <BrandIcon {...props}>
      <circle cx="12" cy="12" r="9.4" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.45" />
      <circle cx="12" cy="12" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.28" />
      <path d="M12 3.4 V5.4 M12 18.6 V20.6 M3.4 12 H5.4 M18.6 12 H20.6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      <path d="M12 6.2 L14.4 12 L12 17.8 L9.6 12 Z" opacity="0.95" />
      <circle cx="12" cy="12" r="1.5" fill="#000" opacity="0.28" />
    </BrandIcon>
  );
}

/* ----------------------------------------------------------------- registry */

export interface AuraMeta {
  id: string;
  /** Base command — Presence.Command(), never the full formula. */
  label: string;
  /** Hex color the aura radiates; the glyph + glow tint to this. */
  color: string;
  /** Description — the aura name only. */
  blurb: string;
  /**
   * Degrees of Quality, low → high (the tier ladder). Index = degree level;
   * the last entry is the max degree.
   */
  degrees: string[];
  /** Perk unlocked at the max degree, if any. */
  maxPerk?: string;
  Glyph: React.ComponentType<GlyphProps>;
  /**
   * Example dimensions shown on hover. The field is open; these illustrate
   * the kind of presence / pull / heading, they do not limit it.
   */
  examples?: { of: string; items: string[] };
  /**
   * How far the field reaches. Defaults to unbounded — not limited to the room.
   */
  range?: string;
  /**
   * Standing field — cannot be toggled off and does not consume a plan slot.
   * Used for the shield: always on, always working.
   */
  alwaysOn?: boolean;
  /** Visual emphasis — the card and orb read as a primary effect. */
  important?: boolean;
}

/** Default reach — auras are a field, not a room radius. */
export const AURA_RANGE_UNBOUNDED =
  "Distance is not limited to the room — the field reaches wherever people are";

/** Hover copy — name only. */
export function auraHoverHint(aura: AuraMeta): string {
  return aura.label;
}

/**
 * The character's auras, in display order (command → outward warmth → drive).
 * Every aura runs a 4-step degree ladder so the tier pips read consistently.
 *
 * Copy is tuned for Matthew: Presence.Command() scaled by Power, Gravity.Pull()
 * that gathers believers, Future.Beacon() as a felt tomorrow, Love.Radiance()
 * as the bond field, Vision.Legend() as the heading chain, Ship.Pod()
 * unbounded through Aion and OceanX, and Shield.Always() as the standing ward.
 */
export const AURAS: AuraMeta[] = [
  {
    id: "presence",
    label: "Presence.Command()",
    color: "#4338ca",
    blurb: "Presence.Command()",
    degrees: ["Noticed", "Felt", "Commanding", "Unshakeable"],
    maxPerk: "Scales with Power.Max().",
    Glyph: PresenceGlyph,
    examples: { of: "presence", items: ["commanding", "Power.Max()", "any distance"] },
  },
  {
    id: "magnetism",
    label: "Gravity.Pull()",
    color: "#a21caf",
    blurb: "Gravity.Pull()",
    degrees: ["Support", "Belief", "Follow", "Worshipped"],
    maxPerk: "Enables max-level followers.",
    Glyph: MagnetismGlyph,
    examples: { of: "pull", items: ["support", "belief", "follow", "remote"] },
  },
  {
    id: "hope",
    label: "Future.Beacon()",
    color: "#0284c7",
    blurb: "Future.Beacon()",
    degrees: ["Flicker", "Glow", "Beacon", "Radiance"],
    Glyph: HopeGlyph,
    examples: { of: "future", items: ["Web 4", "tomorrow-can-be-brighter"] },
  },
  {
    id: "love",
    label: "Love.Radiance()",
    color: "#e11d48",
    blurb: "Love.Radiance()",
    degrees: ["Like", "Love", "Adore", "Radiance"],
    Glyph: LoveGlyph,
    examples: { of: "radiance", items: ["warmth", "companions", "combined life", "any distance"] },
  },
  {
    id: "inspiration",
    label: "Vision.Legend()",
    color: "#2563eb",
    blurb: "Vision.Legend()",
    degrees: ["Vision", "Direction", "Compass", "Legend"],
    maxPerk: "The crown — heading made legend.",
    Glyph: LegendCrownGlyph,
    examples: { of: "heading", items: ["Vision", "Direction", "Compass", "Legend"] },
  },
  {
    id: "motivational",
    label: "Ship.Pod()",
    color: "#c2410c",
    blurb: "Ship.Pod()",
    degrees: ["Nudge", "Push", "Drive", "∞"],
    maxPerk: "Unbounded — Aion and OceanX compound.",
    Glyph: MotivationalGlyph,
    examples: { of: "drive", items: ["Ship Pod", "Aion", "OceanX"] },
  },
  {
    id: "shield",
    label: "Shield.Always()",
    color: "#38bdf8",
    blurb: "Shield.Always()",
    degrees: ["Warded", "Held", "Guarded", "Impenetrable"],
    maxPerk: "Always on — cannot be dropped.",
    Glyph: ShieldAuraGlyph,
    alwaysOn: true,
    important: true,
    examples: { of: "coverage", items: ["self", "always secure", "wherever you are", "unbounded field"] },
  },
];

/* ------------------------------------------------------------- progression */

/**
 * Per-aura progress: the current unlocked degree index, or `-1` when the aura
 * is still locked (must be unlocked before any degree applies).
 */
export type AuraProgress = Record<string, number>;

/** Which auras are currently applied (toggled on). */
export type AuraActive = Record<string, boolean>;

const LOCKED = -1;

/** Cost in Influence (✦) to buy each degree: index 0 = unlock, then each step. */
export const DEGREE_COSTS = [120, 300, 750, 1800] as const;

/** Influence cost to advance from `level` to `level + 1`, or `null` at max. */
export function nextCost(level: number, maxLevel: number): number | null {
  if (level >= maxLevel) return null;
  return DEGREE_COSTS[level + 1] ?? null;
}

const maxLevelOf = (a: AuraMeta) => a.degrees.length - 1;

/** All of the player's own auras at their max degree. */
export const AURA_PROGRESS_MAX: AuraProgress = Object.fromEntries(
  AURAS.map((a) => [a.id, maxLevelOf(a)]),
);

/** A mid-game mix: some maxed, some part-way, one still locked. */
export const AURA_PROGRESS_PROGRESSION: AuraProgress = {
  presence: 3,
  magnetism: 1,
  hope: 2,
  love: 1,
  inspiration: 0,
  motivational: LOCKED,
  shield: 3,
};

/** Early game: a couple of starters unlocked, the rest still locked. */
export const AURA_PROGRESS_LOCKED: AuraProgress = {
  presence: 1,
  magnetism: LOCKED,
  hope: 0,
  love: LOCKED,
  inspiration: LOCKED,
  motivational: LOCKED,
  shield: 3,
};

/** Default applied set — Matthew's full field on. Shield is always on and does not consume a slot. */
export const AURA_ACTIVE_DEFAULT: AuraActive = Object.fromEntries(
  AURAS.map((a) => [a.id, true]),
);

/**
 * Janna's field — her own names, plus Shield and MM's Morale Compass.
 * Honest presence, active pursuit, happy baseline, open bond, curiosity,
 * confidence, ward, and Matthew's heading lock.
 */
export const JANNA_AURAS: AuraMeta[] = [
  {
    id: "presence",
    label: "Honest Presence",
    color: "#4338ca",
    blurb: "Honest Presence",
    degrees: ["Noticed", "Felt", "Open", "Unarmored"],
    Glyph: PresenceGlyph,
  },
  {
    id: "magnetism",
    label: "Active Pursuit",
    color: "#a21caf",
    blurb: "Active Pursuit",
    degrees: ["Noticed", "Approaching", "Pursuing", "Chosen"],
    Glyph: MagnetismGlyph,
  },
  {
    id: "hope",
    label: "Happy Field",
    color: "#16a34a",
    blurb: "Happy Field",
    degrees: ["Flicker", "Glow", "Happy", "Radiance"],
    Glyph: HopeGlyph,
  },
  {
    id: "love",
    label: "Open Bond",
    color: "#e11d48",
    blurb: "Open Bond",
    degrees: ["Like", "Love", "Open", "Together"],
    Glyph: LoveGlyph,
  },
  {
    id: "inspiration",
    label: "Curious Spark",
    color: "#8b5cf6",
    blurb: "Curious Spark",
    degrees: ["Spark", "Interested", "Engaged", "Lit"],
    Glyph: InspirationGlyph,
  },
  {
    id: "motivational",
    label: "Confident Lean",
    color: "#0ea5e9",
    blurb: "Confident Lean",
    degrees: ["Steady", "Sure", "Confident", "Unshakeable"],
    Glyph: MotivationalGlyph,
  },
  {
    id: "shield",
    label: "Shield.Always()",
    color: "#38bdf8",
    blurb: "Shield.Always()",
    degrees: ["Warded", "Held", "Guarded", "Impenetrable"],
    maxPerk: "Always on — cannot be dropped.",
    Glyph: ShieldAuraGlyph,
    alwaysOn: true,
    important: true,
  },
  {
    id: "morale-compass",
    label: "MM's Morale Compass",
    color: "#4F46E5",
    blurb: "MM's Morale Compass",
    degrees: ["Guided", "Aligned", "Bound", "Locked True"],
    maxPerk: "Off-heading play is refused.",
    Glyph: MoraleCompassGlyph,
  },
];

/** All of Janna's auras at their max degree — includes Shield and the compass. */
export const JANNA_AURA_PROGRESS_MAX: AuraProgress = Object.fromEntries(
  JANNA_AURAS.map((a) => [a.id, a.degrees.length - 1]),
);

/** Janna's full field on, including Shield and MM's Morale Compass. */
export const JANNA_AURA_ACTIVE_DEFAULT: AuraActive = Object.fromEntries(
  JANNA_AURAS.map((a) => [a.id, true]),
);

/* ----------------------------------------------------------- plan / slots */

export interface PlanTier {
  plan: string;
  /** How many auras can be applied at once on this plan. */
  slots: number;
}

/**
 * Example plan → aura-slot mapping. Display only for now — the real entitlement
 * check lives server-side. Shown so players understand how to unlock more slots.
 */
export const PLAN_TIERS: PlanTier[] = [
  { plan: "Free", slots: 1 },
  { plan: "Pro", slots: 3 },
  { plan: "Elite", slots: 6 },
  { plan: "Bond", slots: 8 },
];

/** localStorage key for the persisted applied-aura set. Bump when defaults change. */
export const AURA_ACTIVE_STORAGE_KEY = "4eye:auras:active:v4";

/* -------------------------------------------------------------------- bits */

function CostLabel({ cost }: { cost: number }) {
  return (
    <Stack direction="row" spacing={0.35} sx={{ alignItems: "center" }}>
      <AutoAwesomeRoundedIcon sx={{ fontSize: 13 }} />
      <span>{cost.toLocaleString()}</span>
    </Stack>
  );
}

/** Slot meter + plan chip. Hover for the example plan → slots mapping. */
function SlotMeter({ used, cap, plan, chrome }: { used: number; cap: number; plan: string; chrome: string }) {
  const full = used >= cap;
  return (
    <Tooltip
      arrow
      placement="bottom-start"
      title={
        <Box>
          <Typography sx={{ fontSize: "0.66rem", fontWeight: 800, mb: 0.5 }}>
            Aura slots by plan
          </Typography>
          {PLAN_TIERS.map((p) => (
            <Typography
              key={p.plan}
              sx={{
                fontSize: "0.64rem",
                fontWeight: p.plan === plan ? 800 : 500,
                opacity: p.plan === plan ? 1 : 0.8,
              }}
            >
              {p.plan} — {p.slots} {p.slots === 1 ? "aura" : "auras"}
              {p.plan === plan ? "  ← you" : ""}
            </Typography>
          ))}
          <Typography sx={{ fontSize: "0.6rem", opacity: 0.7, mt: 0.5 }}>
            Upgrade your plan to apply more auras at once.
          </Typography>
        </Box>
      }
    >
      <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", cursor: "help" }}>
        <Typography
          sx={{
            fontSize: "0.7rem",
            fontWeight: 900,
            letterSpacing: 0.3,
            color: full ? "warning.main" : "text.secondary",
          }}
        >
          {used}/{cap} applied
        </Typography>
        <Box
          sx={{
            px: 0.65,
            py: 0.15,
            borderRadius: 1,
            bgcolor: alpha(chrome, 0.12),
            color: chrome,
            fontSize: "0.6rem",
            fontWeight: 900,
            letterSpacing: 0.4,
            textTransform: "uppercase",
          }}
        >
          {plan}
        </Box>
      </Stack>
    </Tooltip>
  );
}

/* -------------------------------------------------------------------- card */

function withAlwaysOn(auras: readonly AuraMeta[], applied: AuraActive): AuraActive {
  const next = { ...applied };
  for (const a of auras) {
    if (a.alwaysOn) next[a.id] = true;
  }
  return next;
}

function slotUsed(auras: readonly AuraMeta[], applied: AuraActive, levels: AuraProgress): number {
  return auras.filter(
    (a) => !a.alwaysOn && !!applied[a.id] && (levels[a.id] ?? LOCKED) >= 0,
  ).length;
}

function AuraCard({
  aura,
  level,
  active,
  affordable,
  atCap,
  onUpgrade,
  onToggle,
}: {
  aura: AuraMeta;
  level: number;
  active: boolean;
  affordable: boolean;
  /** Whether the applied-slot cap is reached (blocks turning new auras on). */
  atCap: boolean;
  onUpgrade?: () => void;
  onToggle?: () => void;
}) {
  const channels = useChannelInks();
  const { rank } = useRankInk();
  const chrome = channels.equipped.ink;
  const glyphHue = aura.color;
  const standing = Boolean(aura.alwaysOn);
  const featured = Boolean(aura.important);

  const { label, degrees, maxPerk, Glyph } = aura;
  const hint = auraHoverHint(aura);
  const max = degrees.length - 1;
  const locked = level < 0;
  const maxed = level >= max;
  const on = (active || standing) && !locked;
  const cost = nextCost(level, max);

  const t = (level + 1) / (max + 1);
  const orbGlow = on
    ? `0 0 ${6 + t * 6 + (featured ? 6 : 0)}px ${alpha(glyphHue, 0.28 + t * 0.22 + (featured ? 0.18 : 0))}`
    : "none";
  const pipInk = locked ? rank(0) : rank(Math.min(5, Math.max(0, level)));

  const toggleDisabled = standing || locked || (!on && atCap) || !onToggle;
  const toggleReason = standing
    ? "Always on — the shield cannot be dropped"
    : locked
      ? "Unlock this aura first"
      : !on && atCap
        ? "Aura slots full — upgrade your plan to apply more"
        : "";

  const toggle = standing ? (
    <Box
      sx={{
        px: 0.65,
        py: 0.2,
        borderRadius: 1,
        bgcolor: alpha(glyphHue, 0.16),
        color: glyphHue,
        fontSize: "0.55rem",
        fontWeight: 900,
        letterSpacing: 0.5,
        lineHeight: 1.2,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      Always on
    </Box>
  ) : (
    <Switch
      size="small"
      checked={on}
      disabled={toggleDisabled}
      onChange={onToggle}
      slotProps={{ input: { "aria-label": `Apply ${label}` } }}
      sx={{
        "& .MuiSwitch-switchBase.Mui-checked": { color: chrome },
        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: chrome },
      }}
    />
  );

  return (
    <Stack
      sx={{
        position: "relative",
        height: "100%",
        minHeight: 132,
        gap: 0.75,
        p: 1.25,
        borderRadius: 2,
        bgcolor: "background.paper",
        border: featured ? "1.5px solid" : "1px solid",
        borderColor: featured
          ? alpha(glyphHue, locked ? 0.22 : 0.55)
          : alpha(chrome, locked ? 0.1 : on ? 0.28 : 0.16),
        backgroundImage: locked || !on
          ? "none"
          : `radial-gradient(120% 100% at 0% 0%, ${alpha(featured ? glyphHue : chrome, featured ? 0.14 : 0.07)} 0%, transparent 55%)`,
        boxShadow: featured && on ? `0 0 0 1px ${alpha(glyphHue, 0.22)}, 0 0 18px ${alpha(glyphHue, 0.16)}` : "none",
        opacity: locked ? 0.78 : on ? 1 : 0.82,
        transition: "opacity .2s, border-color .2s",
      }}
    >
      <Stack direction="row" sx={{ alignItems: "flex-start", gap: 1, minWidth: 0 }}>
        <Tooltip title={hint} arrow placement="top">
          <Box
            sx={{
              color: locked ? "text.disabled" : glyphHue,
              flexShrink: 0,
              width: 38,
              height: 38,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(glyphHue, locked ? 0.06 : on ? 0.14 : 0.08),
              border: `${featured ? 1.5 : 1}px solid ${alpha(glyphHue, locked ? 0.12 : on ? 0.45 : 0.18)}`,
              boxShadow: orbGlow,
              transition: "box-shadow .25s",
              cursor: "help",
            }}
          >
            {locked ? (
              <LockRoundedIcon sx={{ fontSize: 20, color: "text.disabled" }} />
            ) : (
              <Glyph size={22} title={label} />
            )}
          </Box>
        </Tooltip>
        <Box sx={{ minWidth: 0, flexGrow: 1, pt: 0.25 }}>
          <Tooltip title={hint} arrow placement="top">
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "0.72rem",
                lineHeight: 1.2,
                letterSpacing: 0.1,
                color: locked ? "text.secondary" : "text.primary",
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                cursor: "help",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {label}
            </Typography>
          </Tooltip>
          <Typography
            sx={{
              color: standing && on ? glyphHue : "text.secondary",
              fontWeight: 700,
              fontSize: "0.64rem",
              letterSpacing: 0.3,
            }}
          >
            {locked ? "Locked" : standing ? `${degrees[level]} · always on` : on ? degrees[level] : `${degrees[level]} · off`}
          </Typography>
        </Box>
        {toggleReason ? (
          <Tooltip title={toggleReason} arrow placement="left">
            <Box sx={{ flexShrink: 0, display: "flex" }}>{toggle}</Box>
          </Tooltip>
        ) : (
          <Box sx={{ flexShrink: 0, display: "flex" }}>{toggle}</Box>
        )}
      </Stack>

      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 1 }}>
        <TierPips level={level} degrees={degrees} color={pipInk} />
        {maxed ? (
          <Stack
            direction="row"
            spacing={0.35}
            sx={{ alignItems: "center", color: chrome, flexShrink: 0 }}
          >
            <WorkspacePremiumRoundedIcon sx={{ fontSize: 14 }} />
            <Typography sx={{ fontSize: "0.6rem", fontWeight: 900, letterSpacing: 0.6 }}>MAX</Typography>
          </Stack>
        ) : (
          !locked && (
            <Typography sx={{ fontSize: "0.62rem", color: "text.secondary", fontWeight: 700 }}>
              Next: {degrees[level + 1]}
            </Typography>
          )
        )}
      </Stack>

      <Box sx={{ mt: "auto" }}>
        {maxed ? (
          maxPerk ? (
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
              <AutoAwesomeRoundedIcon sx={{ fontSize: 13, color: chrome }} />
              <Typography sx={{ fontSize: "0.63rem", fontWeight: 700, color: "text.secondary" }}>
                {maxPerk}
              </Typography>
            </Stack>
          ) : (
            <Typography sx={{ fontSize: "0.63rem", fontWeight: 600, color: "text.disabled" }}>
              Max degree reached
            </Typography>
          )
        ) : (
          cost != null && (
            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={onUpgrade}
              disabled={!affordable || !onUpgrade}
              startIcon={locked ? <LockRoundedIcon sx={{ fontSize: 15 }} /> : undefined}
              sx={{
                textTransform: "none",
                fontWeight: 800,
                fontSize: "0.68rem",
                py: 0.3,
                px: 1,
                borderRadius: 1.5,
                bgcolor: chrome,
                color: "common.white",
                "&:hover": { bgcolor: alpha(chrome, 0.85) },
                "&.Mui-disabled": { bgcolor: alpha(chrome, 0.28), color: "common.white" },
              }}
            >
              <Stack direction="row" spacing={0.6} sx={{ alignItems: "center" }}>
                <span>{locked ? "Unlock" : "Upgrade"}</span>
                <CostLabel cost={cost} />
              </Stack>
            </Button>
          )
        )}
      </Box>
    </Stack>
  );
}

/* -------------------------------------------------------------------- grid */

export interface AurasGridProps {
  /** Aura definitions. Defaults to the full {@link AURAS} registry. */
  auras?: readonly AuraMeta[];
  /** Starting degree per aura id (`-1` = locked). Defaults to all maxed. */
  progress?: AuraProgress;
  /** Starting applied set. Defaults to {@link AURA_ACTIVE_DEFAULT}. */
  active?: AuraActive;
  /** Max auras that can be applied at once (plan/role gated). */
  cap?: number;
  /** Plan label shown beside the slot meter. */
  plan?: string;
  /** Starting Influence balance for upgrades. */
  balance?: number;
  /**
   * When true (default), Unlock/Upgrade buttons spend Influence and toggles
   * apply/unapply auras live. Set false for a static, read-only display.
   */
  interactive?: boolean;
  /**
   * localStorage key the applied set is saved under. Defaults to
   * {@link AURA_ACTIVE_STORAGE_KEY}; pass `null` to disable persistence.
   */
  persistKey?: string | null;
}

/**
 * AurasGrid — the character's auras as glowing tier cards. When mounted under
 * CharacterProfileStore, apply/upgrade state is shared with Status Targets.
 * Standalone (stories) keeps local + optional localStorage persistence.
 */
export function AurasGrid({
  auras = AURAS,
  progress = AURA_PROGRESS_MAX,
  active = AURA_ACTIVE_DEFAULT,
  cap = 6,
  plan = "Elite",
  balance: initialBalance = 1000,
  interactive = true,
  persistKey = AURA_ACTIVE_STORAGE_KEY,
}: AurasGridProps) {
  const store = useOptionalProfileStore();
  const useStore = Boolean(store && interactive);

  const [levelsLocal, setLevelsLocal] = React.useState<AuraProgress>(() => ({ ...progress }));
  const [appliedLocal, setAppliedLocal] = React.useState<AuraActive>(() => withAlwaysOn(auras, active));
  const [balanceLocal, setBalanceLocal] = React.useState(initialBalance);

  React.useEffect(() => {
    if (useStore || !persistKey || typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(persistKey);
      if (raw) {
        const saved = JSON.parse(raw) as AuraActive;
        setAppliedLocal(withAlwaysOn(auras, { ...saved, ...active }));
      } else {
        setAppliedLocal(withAlwaysOn(auras, active));
      }
    } catch {
      setAppliedLocal(withAlwaysOn(auras, active));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistKey, useStore]);

  const persist = React.useCallback(
    (next: AuraActive) => {
      if (!persistKey || typeof window === "undefined") return;
      try {
        window.localStorage.setItem(persistKey, JSON.stringify(withAlwaysOn(auras, next)));
      } catch {
        /* ignore quota / privacy errors */
      }
    },
    [persistKey, auras],
  );

  const levels = useStore ? store!.state.auraLevels : levelsLocal;
  const applied = useStore ? withAlwaysOn(auras, store!.state.auraActive) : appliedLocal;
  const balance = useStore ? store!.state.influenceBalance : balanceLocal;

  const appliedCount = slotUsed(auras, applied, levels);
  const atCap = appliedCount >= cap;

  const toggle = (aura: AuraMeta) => {
    if (aura.alwaysOn) return;
    if (useStore) {
      store!.dispatch({ type: "toggle-aura", auraId: aura.id, cap });
      return;
    }
    setAppliedLocal((prev) => {
      const lvl = levels[aura.id] ?? LOCKED;
      if (lvl < 0) return prev;
      const wasOn = !!prev[aura.id];
      if (!wasOn) {
        const count = slotUsed(auras, prev, levels);
        if (count >= cap) return prev;
      }
      const next = withAlwaysOn(auras, { ...prev, [aura.id]: !wasOn });
      persist(next);
      return next;
    });
  };

  const upgrade = (aura: AuraMeta) => {
    if (useStore) {
      store!.dispatch({ type: "upgrade-aura", auraId: aura.id });
      return;
    }
    setLevelsLocal((prev) => {
      const level = prev[aura.id] ?? LOCKED;
      const cost = nextCost(level, aura.degrees.length - 1);
      if (cost == null || cost > balance) return prev;
      setBalanceLocal((b) => b - cost);
      return { ...prev, [aura.id]: level + 1 };
    });
  };

  const hasUpgradable = auras.some((a) => (levels[a.id] ?? LOCKED) < a.degrees.length - 1);
  const channels = useChannelInks();
  const chrome = channels.equipped.ink;

  return (
    <Stack spacing={1.25}>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 1 }}>
        <SlotMeter used={appliedCount} cap={cap} plan={plan} chrome={chrome} />
        {interactive && hasUpgradable && <InfluencePill balance={balance} />}
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(216px, 1fr))",
          gridAutoRows: "1fr",
          gap: 1.25,
        }}
      >
        {auras.map((a) => {
          const level = levels[a.id] ?? LOCKED;
          const cost = nextCost(level, a.degrees.length - 1);
          return (
            <AuraCard
              key={a.id}
              aura={a}
              level={level}
              active={!!applied[a.id]}
              affordable={cost != null && cost <= balance}
              atCap={atCap}
              onUpgrade={interactive ? () => upgrade(a) : undefined}
              onToggle={interactive ? () => toggle(a) : undefined}
            />
          );
        })}
      </Box>
    </Stack>
  );
}

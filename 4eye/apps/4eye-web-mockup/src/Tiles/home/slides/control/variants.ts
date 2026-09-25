/**
 * ControlSlide — variant system.
 *
 * Each named variant tells a different story through controller position,
 * character animation, coin/XP rewards, and palette — while sharing the
 * same assets and "Control Attention. Control Your Mind." headline.
 */

import type {
  ControllerPalette,
  AnimationVariant,
  ControlDevice,
} from "@expanse/character/vision";

// ─────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────

export type ChipLabelSetName = "pillars" | "skills" | "habits" | "brand";
export type StripTint = "current" | "blue" | "purple" | "gradient-purple-blue";

export interface StripTintTokens {
  lineColor?: string;
  nodeOverride?: string | "gradient";
}

/** Where the controller sits on the character's body. */
export type ControllerPosition = "belly" | "raised" | "low";

/** Full config for a named ControlSlide variant. */
export interface ControlSlideVariantConfig {
  id: string;
  /** Human-readable label for HUD / story tab display */
  label: string;
  controllerPalette: ControllerPalette;
  device: ControlDevice;
  gamification: boolean;
  animationVariant: AnimationVariant;
  controllerPosition: ControllerPosition;
  strip: StripTint;
  chipLabelSet: ChipLabelSetName;
  xpLabel: string;
  /** Optional CSS backdrop gradient; undefined → default purple/blue */
  backdropGlow?: string;
  showFullBody?: boolean;
}

// ─────────────────────────────────────────────────────────────────────
// Pillar label sets
// ─────────────────────────────────────────────────────────────────────

export const CHIP_LABEL_SETS: Record<ChipLabelSetName, readonly string[]> = {
  pillars: ["learning", "communication", "humans", "mood", "relationships", "culture"],
  skills:  ["focus", "memory", "clarity", "empathy", "decisions", "patience", "optimism"],
  habits:  ["sleep", "screen time", "exercise", "social", "nutrition", "mindfulness", "gratitude"],
  brand:   ["improve", "heal", "protect", "win", "grow", "play", "earn"],
};

// ─────────────────────────────────────────────────────────────────────
// Controller palettes
// ─────────────────────────────────────────────────────────────────────

/** Default: cool purple/indigo — deliberate confidence. */
const PALETTE_DUO_PURPLE: ControllerPalette = {
  bodyStart:    "#f0f4ff",
  bodyEnd:      "#dde3f0",
  stroke:       "#c7d2fe",
  accent:       "#c7d2fe",
  accentStroke: "#a5b4fc",
  accentSoft:   "#e0e7ff",
  screenStart:  "#6366f1",
  screenEnd:    "#8b5cf6",
  screenRing:   "#818cf8",
  screenDot:    "#6366f1",
  shadowColor:  "#6366f1",
  buttonColors: ["#7c3aed", "#8b5cf6", "#a78bfa", "#6d28d9"],
};

/** Ascent: warm amber/gold — triumphant, leveling-up energy. */
const PALETTE_ASCENT_AMBER: ControllerPalette = {
  bodyStart:    "#fffbf0",
  bodyEnd:      "#fef3c7",
  stroke:       "#fde68a",
  accent:       "#fde68a",
  accentStroke: "#fcd34d",
  accentSoft:   "#fef9e5",
  screenStart:  "#d97706",
  screenEnd:    "#f59e0b",
  screenRing:   "#fbbf24",
  screenDot:    "#d97706",
  shadowColor:  "#d97706",
  buttonColors: ["#b45309", "#d97706", "#f59e0b", "#92400e"],
};

/** Earn: emerald green — grind, reward, achievement energy. */
const PALETTE_EARN_GREEN: ControllerPalette = {
  bodyStart:    "#f0fdf4",
  bodyEnd:      "#dcfce7",
  stroke:       "#bbf7d0",
  accent:       "#bbf7d0",
  accentStroke: "#86efac",
  accentSoft:   "#f0fdf4",
  screenStart:  "#16a34a",
  screenEnd:    "#22c55e",
  screenRing:   "#4ade80",
  screenDot:    "#16a34a",
  shadowColor:  "#16a34a",
  buttonColors: ["#15803d", "#16a34a", "#22c55e", "#166534"],
};

// ─────────────────────────────────────────────────────────────────────
// Controller position → bottom CSS value
// ─────────────────────────────────────────────────────────────────────

export const CONTROLLER_POSITION_BOTTOM: Record<ControllerPosition, string> = {
  belly:  "44%",  // default — held at the belly
  raised: "60%",  // held up/high — character looks back/up
  low:    "28%",  // held low — character leans into the grind
};

// ─────────────────────────────────────────────────────────────────────
// Named variant configs
// ─────────────────────────────────────────────────────────────────────

/**
 * UNIFIED — The foundation. Deliberate button presses, cool purple.
 * Story: "You control your attention."
 */
export const UNIFIED: ControlSlideVariantConfig = {
  id:                 "unified",
  label:              "Control",
  controllerPalette:  PALETTE_DUO_PURPLE,
  device:             "controller",
  gamification:       true,
  animationVariant:   "standard",
  controllerPosition: "belly",
  strip:              "gradient-purple-blue",
  chipLabelSet:       "pillars",
  xpLabel:            "+40 XP",
  showFullBody:       false,
};

/**
 * ASCENT — Controller raised high, head tilts back. Triumphant gold.
 * Story: "Every press lifts you higher."
 * Teaches: aspiration, growth, the reward is the practice.
 */
export const ASCENT: ControlSlideVariantConfig = {
  id:                 "ascent",
  label:              "Ascent",
  controllerPalette:  PALETTE_ASCENT_AMBER,
  device:             "controller",
  gamification:       true,
  animationVariant:   "ascent",
  controllerPosition: "raised",
  strip:              "blue",
  chipLabelSet:       "brand",
  xpLabel:            "+100 XP",
  backdropGlow:       [
    "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(251,191,36,0.18) 0%, transparent 70%)",
    "radial-gradient(ellipse 85% 85% at 50% 50%, rgba(245,158,11,0.10) 0%, transparent 80%)",
  ].join(", "),
  showFullBody:       false,
};

/**
 * FLOW — Watch device, no coins. Mindful habit tracking.
 * Story: "Awareness is the first move."
 * Teaches: self-monitoring, habit loops, accountability.
 */
export const FLOW: ControlSlideVariantConfig = {
  id:                 "flow",
  label:              "Flow",
  controllerPalette:  PALETTE_DUO_PURPLE, // unused for watch device
  device:             "watch",
  gamification:       false,
  animationVariant:   "standard",
  controllerPosition: "belly",            // unused for watch device
  strip:              "blue",
  chipLabelSet:       "habits",
  xpLabel:            "+40 XP",           // unused (no gamification)
  backdropGlow:       [
    "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(59,130,246,0.14) 0%, transparent 70%)",
    "radial-gradient(ellipse 85% 85% at 50% 50%, rgba(96,165,250,0.08) 0%, transparent 80%)",
  ].join(", "),
  showFullBody:       false,
};

/**
 * EARN — Controller held low, rapid mashing, big coin burst on mount.
 * Story: "Build the habit. Collect the reward."
 * Teaches: behavioral reinforcement, gamification loop.
 */
export const EARN: ControlSlideVariantConfig = {
  id:                 "earn",
  label:              "Earn",
  controllerPalette:  PALETTE_EARN_GREEN,
  device:             "controller",
  gamification:       true,
  animationVariant:   "earn",
  controllerPosition: "low",
  strip:              "purple",
  chipLabelSet:       "skills",
  xpLabel:            "+200 XP",
  backdropGlow:       [
    "radial-gradient(ellipse 55% 55% at 50% 50%, rgba(34,197,94,0.15) 0%, transparent 70%)",
    "radial-gradient(ellipse 85% 85% at 50% 50%, rgba(22,163,74,0.09) 0%, transparent 80%)",
  ].join(", "),
  showFullBody:       false,
};

// ─────────────────────────────────────────────────────────────────────
// Registry — ordered list + lookup map
// ─────────────────────────────────────────────────────────────────────

export const VARIANT_LIST: ControlSlideVariantConfig[] = [UNIFIED, ASCENT, FLOW, EARN];

export const VARIANT_MAP: Record<string, ControlSlideVariantConfig> = Object.fromEntries(
  VARIANT_LIST.map((v) => [v.id, v]),
);

// ─────────────────────────────────────────────────────────────────────
// Strip tint resolver
// ─────────────────────────────────────────────────────────────────────

export function stripTintTokens(t: StripTint): StripTintTokens {
  switch (t) {
    case "blue":
      return { lineColor: "#60a5fa", nodeOverride: "#3b82f6" };
    case "purple":
      return { lineColor: "#a78bfa", nodeOverride: "#8b5cf6" };
    case "gradient-purple-blue":
      return { lineColor: "#a78bfa", nodeOverride: "gradient" };
    case "current":
    default:
      return {};
  }
}


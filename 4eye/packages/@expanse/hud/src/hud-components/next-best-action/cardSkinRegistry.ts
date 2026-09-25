/**
 * cardSkinRegistry — the 25 preset card skins (5 groups × 5 variants).
 *
 * Skins are defined here as plain data so they can be tree-shaken, unit-
 * tested, and iterated on without touching component code. `skins.ts`
 * imports this list and assembles the public `CARD_SKINS` map +
 * `CARD_SKIN_GROUPS` index.
 *
 * Each entry uses the shared color tokens from `mapCardTokens.ts`.
 *
 * The very first entry (`frostedGlass/dark-base`) intentionally
 * matches the pre-skin production card byte-for-byte.
 */

import type { CardSkin } from "./cardSkin"
import {
  // panel band tokens
  PANEL_INK_DEEP, PANEL_INK_SOFT, PANEL_STEEL, PANEL_STEEL_DEEP,
  PANEL_MIST_BLUE, PANEL_MIST_TEAL, PANEL_MIST_AMBER, PANEL_MIST_ROSE,
  PANEL_HEAL_DEEP, PANEL_GOLD_DEEP,
  // card surface tokens
  CARD_PAPER, CARD_LINEN,
  CARD_GRADIENT_COOL, CARD_GRADIENT_HEAL, CARD_GRADIENT_WIN,
  CARD_GRADIENT_DAWN, CARD_GRADIENT_HORIZON,
  // ink tokens
  INK_PRIMARY, INK_ACCENT_BLUE, INK_ACCENT_TEAL,
  INK_ACCENT_GOLD, INK_ACCENT_ROSE, INK_ACCENT_NAVY,
  // neon tokens
  NEON_CYAN, NEON_AMBER, NEON_LIME, NEON_MAGENTA, NEON_BLUE,
  // shadow chains
  SHADOW_DARK_FROST, SHADOW_PAPER, SHADOW_PAPER_FLOAT,
} from "./mapCardTokens"

// =============================================================================
// Group A — frostedGlass (current style + iterations)
// =============================================================================

const frostedGlassDarkBase: CardSkin = {
  id: "frostedGlass/dark-base",
  label: "Frosted glass · dark base",
  group: "frostedGlass",
  surface: "rgba(255,255,255,0.10)",
  surfaceHover: "rgba(255,255,255,0.16)",
  surfaceSelected: "rgba(33,150,243,0.18)",
  border: "rgba(255,255,255,0.30)",
  borderSelected: "rgba(96,165,250,0.85)",
  backdrop: "blur(12px) saturate(140%)",
  shadow: SHADOW_DARK_FROST,
  innerHighlight: "inset 0 1px 0 rgba(255,255,255,0.25)",
  text: {
    question: "#fff",
    pageLabel: "#fff",
    chevron: NEON_BLUE,
  },
  chip: {
    bg: "rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(255,255,255,0.12)",
    iconColor: "rgba(255,255,255,0.7)",
  },
  panelBand: { bg: PANEL_INK_SOFT, pad: 8 },
}

const frostedGlassDarkBlueText: CardSkin = {
  id: "frostedGlass/dark-blue-text",
  label: "Frosted glass · cool blue text",
  group: "frostedGlass",
  surface: "rgba(255,255,255,0.10)",
  surfaceHover: "rgba(255,255,255,0.16)",
  surfaceSelected: "rgba(33,150,243,0.22)",
  border: "rgba(96,165,250,0.55)",
  borderSelected: "rgba(124,183,255,0.95)",
  backdrop: "blur(12px) saturate(140%)",
  shadow: SHADOW_DARK_FROST,
  innerHighlight: "inset 0 1px 0 rgba(124,183,255,0.30)",
  text: {
    question: "#7CB7FF",
    questionGlow: "0 0 12px rgba(124,183,255,0.55)",
    pageLabel: "#E7F1FF",
    chevron: "#7CB7FF",
  },
  chip: {
    bg: "rgba(124,183,255,0.10)",
    color: "rgba(231,241,255,0.95)",
    border: "1px solid rgba(124,183,255,0.30)",
    iconColor: "rgba(231,241,255,0.85)",
  },
  panelBand: { bg: PANEL_INK_SOFT, pad: 8 },
  reducedMotion: { questionGlow: "0 0 0 1px rgba(124,183,255,0.6)" },
}

const frostedGlassDeepNavyWarm: CardSkin = {
  id: "frostedGlass/deep-navy-warm",
  label: "Frosted glass · deep navy + warm amber",
  group: "frostedGlass",
  surface: "rgba(255,255,255,0.12)",
  surfaceHover: "rgba(255,255,255,0.18)",
  surfaceSelected: "rgba(255,200,120,0.18)",
  border: "rgba(255,210,140,0.35)",
  borderSelected: "rgba(255,210,140,0.85)",
  backdrop: "blur(14px) saturate(150%)",
  shadow: SHADOW_DARK_FROST,
  innerHighlight: "inset 0 1px 0 rgba(255,210,140,0.30)",
  text: {
    question: "#FFE3B0",
    questionGlow: "0 0 10px rgba(255,210,140,0.45)",
    pageLabel: "#FFF3DE",
    chevron: NEON_AMBER,
  },
  chip: {
    bg: "rgba(255,210,140,0.10)",
    color: "rgba(255,243,222,0.95)",
    border: "1px solid rgba(255,210,140,0.28)",
    iconColor: "rgba(255,243,222,0.85)",
  },
  panelBand: { bg: PANEL_INK_DEEP, pad: 8 },
  reducedMotion: { questionGlow: "0 0 0 1px rgba(255,210,140,0.6)" },
}

const frostedGlassHealMint: CardSkin = {
  id: "frostedGlass/heal-mint",
  label: "Frosted glass · heal mint",
  group: "frostedGlass",
  surface: "rgba(180,255,225,0.10)",
  surfaceHover: "rgba(180,255,225,0.16)",
  surfaceSelected: "rgba(180,255,225,0.22)",
  border: "rgba(180,255,225,0.40)",
  borderSelected: "rgba(180,255,225,0.90)",
  backdrop: "blur(12px) saturate(140%)",
  shadow: SHADOW_DARK_FROST,
  innerHighlight: "inset 0 1px 0 rgba(180,255,225,0.30)",
  text: {
    question: "#A7F3D0",
    questionGlow: "0 0 12px rgba(167,243,208,0.55)",
    pageLabel: "#E6FFF4",
    chevron: "#A7F3D0",
  },
  chip: {
    bg: "rgba(167,243,208,0.10)",
    color: "rgba(230,255,244,0.95)",
    border: "1px solid rgba(167,243,208,0.28)",
    iconColor: "rgba(230,255,244,0.85)",
  },
  panelBand: { bg: PANEL_HEAL_DEEP, pad: 8 },
  reducedMotion: { questionGlow: "0 0 0 1px rgba(167,243,208,0.6)" },
}

const frostedGlassRosePulse: CardSkin = {
  id: "frostedGlass/rose-pulse",
  label: "Frosted glass · rose pulse",
  group: "frostedGlass",
  surface: "rgba(255,200,220,0.10)",
  surfaceHover: "rgba(255,200,220,0.16)",
  surfaceSelected: "rgba(255,200,220,0.22)",
  border: "rgba(236,72,153,0.45)",
  borderSelected: "rgba(255,180,210,0.95)",
  backdrop: "blur(12px) saturate(140%)",
  shadow: SHADOW_DARK_FROST,
  innerHighlight: "inset 0 1px 0 rgba(255,200,220,0.30)",
  text: {
    question: "#FFC1DA",
    questionGlow: "0 0 14px rgba(236,72,153,0.60)",
    pageLabel: "#FFE7F2",
    chevron: NEON_MAGENTA,
  },
  chip: {
    bg: "rgba(236,72,153,0.10)",
    color: "rgba(255,231,242,0.95)",
    border: "1px solid rgba(236,72,153,0.30)",
    iconColor: "rgba(255,231,242,0.85)",
  },
  panelBand: { bg: "#1B0F1F", pad: 8 },
  reducedMotion: { questionGlow: "0 0 0 1px rgba(236,72,153,0.7)" },
}

// =============================================================================
// Group B — paperInk (light card / dark text — solves white-panel readability)
// =============================================================================

// Tuned to the project's blueLight theme (`#1976D2` dark / `#4285f4`
// main). Text stays neutral ink for max readability on white; the
// theme blue only shows up where it carries meaning — the chevron,
// the selected border, and the chip accent.
const THEME_BLUE      = "#1976D2" // palette.primary.dark — restrained, professional
const THEME_BLUE_SOFT = "rgba(25,118,210,0.08)"
const THEME_BLUE_RING = "rgba(25,118,210,0.22)"
const THEME_BLUE_SEL  = "rgba(25,118,210,0.70)"

const paperInkClean: CardSkin = {
  id: "paperInk/clean",
  label: "Paper · clean ink",
  group: "paperInk",
  surface: CARD_PAPER,
  surfaceHover: "#F4F8FD",
  surfaceSelected: "#E8F1FC",
  border: "rgba(15,23,42,0.08)",
  borderSelected: THEME_BLUE_SEL,
  backdrop: "none",
  shadow: SHADOW_PAPER,
  text: {
    question: INK_PRIMARY,
    pageLabel: INK_PRIMARY,
    chevron: THEME_BLUE,
  },
  chip: {
    bg: THEME_BLUE_SOFT,
    color: THEME_BLUE,
    border: `1px solid ${THEME_BLUE_RING}`,
    iconColor: THEME_BLUE,
  },
}

const paperInkBlue: CardSkin = {
  id: "paperInk/blue-ink",
  label: "Paper · blue ink",
  group: "paperInk",
  surface: CARD_PAPER,
  surfaceHover: "#F2F6FE",
  surfaceSelected: "#E2ECFD",
  border: "rgba(26,86,214,0.20)",
  borderSelected: "rgba(26,86,214,0.75)",
  backdrop: "none",
  shadow: SHADOW_PAPER,
  innerHighlight: "inset 3px 0 0 0 rgba(26,86,214,0.85)",
  text: {
    question: INK_ACCENT_BLUE,
    pageLabel: INK_PRIMARY,
    chevron: INK_ACCENT_BLUE,
  },
  chip: {
    bg: "rgba(26,86,214,0.06)",
    color: INK_ACCENT_BLUE,
    border: "1px solid rgba(26,86,214,0.18)",
    iconColor: INK_ACCENT_BLUE,
  },
}

const paperInkLinenWarm: CardSkin = {
  id: "paperInk/linen-warm",
  label: "Paper · linen warm",
  group: "paperInk",
  surface: CARD_LINEN,
  surfaceHover: "#F1EBDE",
  surfaceSelected: "#EAE0CB",
  border: "rgba(120,90,40,0.18)",
  borderSelected: "rgba(168,107,0,0.65)",
  backdrop: "none",
  shadow: {
    rest: "drop-shadow(0 4px 10px rgba(80,55,15,0.10))",
    breath: "drop-shadow(0 8px 18px rgba(80,55,15,0.16))",
  },
  text: {
    question: "#5A3A12",
    pageLabel: INK_ACCENT_GOLD,
    chevron: INK_ACCENT_GOLD,
  },
  chip: {
    bg: "rgba(168,107,0,0.06)",
    color: "#5A3A12",
    border: "1px solid rgba(168,107,0,0.22)",
    iconColor: INK_ACCENT_GOLD,
  },
  panelBand: { bg: PANEL_MIST_AMBER, pad: 8 },
}

const paperInkTealHeal: CardSkin = {
  id: "paperInk/teal-heal",
  label: "Paper · teal heal",
  group: "paperInk",
  surface: CARD_PAPER,
  surfaceHover: "#F0FAF7",
  surfaceSelected: "#E0F4EE",
  border: "rgba(15,118,110,0.22)",
  borderSelected: "rgba(15,118,110,0.75)",
  backdrop: "none",
  shadow: SHADOW_PAPER,
  text: {
    question: INK_ACCENT_TEAL,
    pageLabel: INK_PRIMARY,
    chevron: INK_ACCENT_TEAL,
  },
  chip: {
    bg: "rgba(15,118,110,0.06)",
    color: INK_ACCENT_TEAL,
    border: "1px solid rgba(15,118,110,0.22)",
    iconColor: INK_ACCENT_TEAL,
  },
  panelBand: { bg: PANEL_MIST_TEAL, pad: 8 },
}

const paperInkElevatedEdge: CardSkin = {
  id: "paperInk/elevated-edge",
  label: "Paper · elevated edge",
  group: "paperInk",
  surface: CARD_PAPER,
  surfaceHover: "#FAFCFF",
  surfaceSelected: "#EAF2FB",
  border: "none",
  backdrop: "none",
  shadow: SHADOW_PAPER_FLOAT,
  innerHighlight: "inset 0 2px 0 rgba(59,130,246,0.85)",
  text: {
    question: INK_PRIMARY,
    pageLabel: INK_PRIMARY,
    chevron: NEON_BLUE,
  },
  chip: {
    bg: "rgba(15,23,42,0.04)",
    color: INK_PRIMARY,
    border: "1px solid rgba(15,23,42,0.10)",
    iconColor: "rgba(15,23,42,0.65)",
  },
  panelBand: { bg: PANEL_MIST_BLUE, pad: 8 },
}

// =============================================================================
// Group C — duotoneGradient (gradient background, neutral text)
// =============================================================================

const duotoneCoolSteel: CardSkin = {
  id: "duotoneGradient/cool-steel",
  label: "Duotone · cool steel",
  group: "duotoneGradient",
  surface: CARD_GRADIENT_COOL,
  surfaceHover: CARD_GRADIENT_COOL,
  surfaceSelected: CARD_GRADIENT_COOL,
  border: "rgba(255,255,255,0.18)",
  borderSelected: "rgba(255,255,255,0.85)",
  backdrop: "none",
  shadow: SHADOW_DARK_FROST,
  innerHighlight: "inset 0 1px 0 rgba(255,255,255,0.25)",
  text: {
    question: "#fff",
    pageLabel: "#fff",
    chevron: "#fff",
  },
  chip: {
    bg: "rgba(255,255,255,0.10)",
    color: "rgba(255,255,255,0.95)",
    border: "1px solid rgba(255,255,255,0.20)",
    iconColor: "rgba(255,255,255,0.80)",
  },
  panelBand: { bg: PANEL_STEEL_DEEP, pad: 8 },
}

const duotoneHealDeep: CardSkin = {
  id: "duotoneGradient/heal-deep",
  label: "Duotone · heal deep",
  group: "duotoneGradient",
  surface: CARD_GRADIENT_HEAL,
  border: "rgba(167,243,208,0.30)",
  borderSelected: "rgba(167,243,208,0.85)",
  backdrop: "none",
  shadow: SHADOW_DARK_FROST,
  innerHighlight: "inset 0 1px 0 rgba(167,243,208,0.25)",
  text: {
    question: "#E6FFF7",
    pageLabel: "#A7F3D0",
    chevron: "#A7F3D0",
  },
  chip: {
    bg: "rgba(167,243,208,0.10)",
    color: "#E6FFF7",
    border: "1px solid rgba(167,243,208,0.28)",
    iconColor: "#A7F3D0",
  },
  panelBand: { bg: PANEL_HEAL_DEEP, pad: 8 },
}

const duotoneWinGold: CardSkin = {
  id: "duotoneGradient/win-gold",
  label: "Duotone · win gold",
  group: "duotoneGradient",
  surface: CARD_GRADIENT_WIN,
  border: "rgba(255,210,140,0.45)",
  borderSelected: "rgba(255,210,140,0.95)",
  backdrop: "none",
  shadow: SHADOW_DARK_FROST,
  innerHighlight: "inset 0 1px 0 rgba(255,210,140,0.30)",
  text: {
    question: "#FFF1C7",
    pageLabel: "#FFE3B0",
    chevron: NEON_AMBER,
  },
  chip: {
    bg: "rgba(255,210,140,0.12)",
    color: "#FFF1C7",
    border: "1px solid rgba(255,210,140,0.38)",
    iconColor: NEON_AMBER,
  },
  panelBand: { bg: PANEL_GOLD_DEEP, pad: 8 },
}

const duotoneDawn: CardSkin = {
  id: "duotoneGradient/dawn",
  label: "Duotone · dawn",
  group: "duotoneGradient",
  surface: CARD_GRADIENT_DAWN,
  border: "rgba(255,180,210,0.35)",
  borderSelected: "rgba(255,180,210,0.95)",
  backdrop: "none",
  shadow: SHADOW_DARK_FROST,
  innerHighlight: "inset 0 1px 0 rgba(255,180,210,0.30)",
  text: {
    question: "#FFE6F5",
    pageLabel: "#FFC1DA",
    chevron: NEON_MAGENTA,
  },
  chip: {
    bg: "rgba(236,72,153,0.10)",
    color: "#FFE6F5",
    border: "1px solid rgba(236,72,153,0.30)",
    iconColor: NEON_MAGENTA,
  },
  panelBand: { bg: "#1B1448", pad: 8 },
}

const duotoneHorizon: CardSkin = {
  id: "duotoneGradient/horizon",
  label: "Duotone · horizon",
  group: "duotoneGradient",
  surface: CARD_GRADIENT_HORIZON,
  border: "rgba(124,183,255,0.40)",
  borderSelected: "rgba(255,255,255,0.95)",
  backdrop: "none",
  shadow: SHADOW_DARK_FROST,
  innerHighlight: "inset 0 1px 0 rgba(124,183,255,0.30)",
  text: {
    question: "#fff",
    pageLabel: "#E7F1FF",
    chevron: NEON_BLUE,
  },
  chip: {
    bg: "rgba(255,255,255,0.10)",
    color: "#fff",
    border: "1px solid rgba(124,183,255,0.35)",
    iconColor: "#7CB7FF",
  },
  panelBand: { bg: PANEL_INK_DEEP, pad: 8 },
}

// =============================================================================
// Group D — neonGlow (saturated outline + colored text-glow)
// =============================================================================

function neonSkin(
  id: string,
  label: string,
  rgbBase: string,
  accent: string,
  text: string,
  panelBg: string,
): CardSkin {
  return {
    id, label, group: "neonGlow",
    surface: `rgba(${rgbBase},0.55)`,
    surfaceHover: `rgba(${rgbBase},0.65)`,
    surfaceSelected: `rgba(${rgbBase},0.75)`,
    border: accent,
    borderSelected: accent,
    backdrop: "blur(10px) saturate(160%)",
    shadow: {
      rest: `drop-shadow(0 6px 16px rgba(0,0,0,0.45)) drop-shadow(0 0 6px ${accent}66)`,
      breath: `drop-shadow(0 10px 24px rgba(0,0,0,0.55)) drop-shadow(0 0 18px ${accent}AA)`,
    },
    innerHighlight: `inset 0 0 0 1px ${accent}33`,
    text: {
      question: text,
      questionGlow: `0 0 12px ${accent}CC`,
      pageLabel: text,
      chevron: accent,
    },
    chip: {
      bg: `${accent}1A`,
      color: text,
      border: `1px solid ${accent}55`,
      iconColor: accent,
    },
    panelBand: { bg: panelBg, pad: 8 },
    reducedMotion: { questionGlow: `0 0 0 1px ${accent}` },
  }
}

const neonCyan    = neonSkin("neonGlow/cyan",    "Neon · cyan",    "8,40,60",  NEON_CYAN,    "#A9F4FF", PANEL_INK_DEEP)
const neonAmber   = neonSkin("neonGlow/amber",   "Neon · amber",   "40,28,8",  NEON_AMBER,   "#FFE3B0", PANEL_INK_DEEP)
const neonLime    = neonSkin("neonGlow/lime",    "Neon · lime",    "16,40,16", NEON_LIME,    "#D8FFB3", PANEL_INK_DEEP)
const neonMagenta = neonSkin("neonGlow/magenta", "Neon · magenta", "46,8,32",  NEON_MAGENTA, "#FFC1DA", PANEL_INK_DEEP)

// Aurora is bespoke (dual-color gradient border-image).
const neonAurora: CardSkin = {
  id: "neonGlow/aurora",
  label: "Neon · aurora",
  group: "neonGlow",
  surface: "rgba(8,16,40,0.55)",
  surfaceHover: "rgba(8,16,40,0.65)",
  surfaceSelected: "rgba(8,16,40,0.75)",
  border: NEON_CYAN, // border-image not supported via single token; chevron uses cyan
  borderSelected: NEON_MAGENTA,
  backdrop: "blur(10px) saturate(160%)",
  shadow: {
    rest: `drop-shadow(0 6px 16px rgba(0,0,0,0.45)) drop-shadow(0 0 6px ${NEON_CYAN}66)`,
    breath: `drop-shadow(0 10px 24px rgba(0,0,0,0.55)) drop-shadow(0 0 18px ${NEON_MAGENTA}AA)`,
  },
  innerHighlight: `inset 0 0 0 1px ${NEON_CYAN}33`,
  text: {
    question: "#fff",
    questionGlow: `0 0 12px ${NEON_CYAN}AA, 0 0 24px ${NEON_MAGENTA}66`,
    pageLabel: "#E7F1FF",
    chevron: NEON_CYAN,
  },
  chip: {
    bg: `${NEON_CYAN}1A`,
    color: "#fff",
    border: `1px solid ${NEON_MAGENTA}55`,
    iconColor: NEON_CYAN,
  },
  panelBand: { bg: PANEL_INK_DEEP, pad: 8 },
  reducedMotion: { questionGlow: `0 0 0 1px ${NEON_CYAN}` },
}

// =============================================================================
// Group D · Aurora-Blue variants — iterations on neonGlow/aurora that
// drop the magenta accent in favor of cyan / teal / azure pairings.
// All 10 keep the dual-color "aurora" feel (two cool hues per skin) but
// stay inside the blue/teal palette so they harmonize with the rest of
// the right-rail and the steel/ink panel bands.
// =============================================================================

interface AuroraBlueSpec {
  id: string
  label: string
  /** Primary cool accent — used by chevron + rest glow + chip icon. */
  primary: string
  /** Secondary cool accent — used by selected border + breath glow. */
  secondary: string
  /** Text color (very light cool tint). */
  text: string
  /** Page label color (slightly dimmer than question text). */
  pageLabel: string
  /** rgba triple for the card surface fill. */
  surfaceRgb: string
  /** Panel band the cards sit on. */
  panel: string
}

function auroraBlueSkin(spec: AuroraBlueSpec): CardSkin {
  const { id, label, primary, secondary, text, pageLabel, surfaceRgb, panel } = spec
  return {
    id,
    label,
    group: "neonGlow",
    surface:          `rgba(${surfaceRgb},0.55)`,
    surfaceHover:     `rgba(${surfaceRgb},0.65)`,
    surfaceSelected:  `rgba(${surfaceRgb},0.75)`,
    border:           primary,
    borderSelected:   secondary,
    backdrop: "blur(10px) saturate(160%)",
    shadow: {
      rest:   `drop-shadow(0 6px 16px rgba(0,0,0,0.45)) drop-shadow(0 0 6px ${primary}66)`,
      breath: `drop-shadow(0 10px 24px rgba(0,0,0,0.55)) drop-shadow(0 0 18px ${secondary}AA)`,
    },
    innerHighlight: `inset 0 0 0 1px ${primary}33`,
    text: {
      question: text,
      questionGlow: `0 0 12px ${primary}AA, 0 0 24px ${secondary}66`,
      pageLabel,
      chevron: primary,
    },
    chip: {
      bg: `${primary}1A`,
      color: text,
      border: `1px solid ${secondary}55`,
      iconColor: primary,
    },
    panelBand: { bg: panel, pad: 8 },
    reducedMotion: { questionGlow: `0 0 0 1px ${primary}` },
  }
}

// Curated palette — only blue / cyan / teal / azure pairings.
// aurora-blue-ice is bespoke: gradient surface + premium frosted-glass treatment.
const auroraBlueIce: CardSkin = {
  id: "neonGlow/aurora-blue-ice",
  label: "Aurora · blue ice (cyan + azure)",
  group: "neonGlow",
  // Lit-from-above gradient: cooler/lighter near the top edge, deeper navy at bottom.
  surface:         `linear-gradient(170deg, rgba(16,28,64,0.74) 0%, rgba(6,14,44,0.80) 100%)`,
  surfaceHover:    `linear-gradient(170deg, rgba(18,32,72,0.82) 0%, rgba(8,16,48,0.86) 100%)`,
  surfaceSelected: `linear-gradient(170deg, rgba(20,36,78,0.90) 0%, rgba(10,18,52,0.92) 100%)`,
  border:         NEON_CYAN,
  borderSelected: NEON_BLUE,
  backdrop: "blur(20px) saturate(200%) brightness(1.05)",
  shadow: {
    rest:   `drop-shadow(0 4px 16px rgba(0,0,0,0.55)) drop-shadow(0 0 10px ${NEON_CYAN}55)`,
    breath: `drop-shadow(0 8px 24px rgba(0,0,0,0.65)) drop-shadow(0 0 24px ${NEON_BLUE}BB)`,
  },
  // Top-edge sheen (light catching the card rim) + subtle cyan border glow.
  innerHighlight: `inset 0 1px 0 rgba(255,255,255,0.13), inset 0 0 0 1px ${NEON_CYAN}3A`,
  text: {
    question: "#EBF9FF",
    questionGlow: `0 0 12px ${NEON_CYAN}AA, 0 0 24px ${NEON_BLUE}66`,
    pageLabel: "#BEEAFE",
    chevron: NEON_CYAN,
  },
  chip: {
    bg: `${NEON_CYAN}18`,
    color: "#EBF9FF",
    border: `1px solid ${NEON_CYAN}50`,
    iconColor: NEON_CYAN,
  },
  panelBand: { bg: PANEL_INK_DEEP, pad: 8 },
  reducedMotion: { questionGlow: `0 0 0 1px ${NEON_CYAN}` },
}

const auroraBlueDeepSea = auroraBlueSkin({
  id: "neonGlow/aurora-blue-deep-sea",
  label: "Aurora · deep sea (teal + azure)",
  primary: "#2DD4BF", secondary: "#3B82F6",
  text: "#E0F7F5", pageLabel: "#BEEAE3",
  surfaceRgb: "8,28,40", panel: PANEL_INK_DEEP,
})

const auroraBlueArctic = auroraBlueSkin({
  id: "neonGlow/aurora-blue-arctic",
  label: "Aurora · arctic (sky + cyan)",
  primary: "#7DD3FC", secondary: NEON_CYAN,
  text: "#F0FBFF", pageLabel: "#D4F1FB",
  surfaceRgb: "10,28,48", panel: PANEL_INK_DEEP,
})

const auroraBlueElectric = auroraBlueSkin({
  id: "neonGlow/aurora-blue-electric",
  label: "Aurora · electric (azure + cyan)",
  primary: NEON_BLUE, secondary: NEON_CYAN,
  text: "#E6F0FF", pageLabel: "#C8DCFB",
  surfaceRgb: "8,16,48", panel: PANEL_INK_DEEP,
})

const auroraBlueTealMist = auroraBlueSkin({
  id: "neonGlow/aurora-blue-teal-mist",
  label: "Aurora · teal mist (mint + cyan)",
  primary: "#5EEAD4", secondary: NEON_CYAN,
  text: "#EAFBF7", pageLabel: "#C7F0E7",
  surfaceRgb: "8,32,40", panel: PANEL_INK_DEEP,
})

const auroraBlueMidnight = auroraBlueSkin({
  id: "neonGlow/aurora-blue-midnight",
  label: "Aurora · midnight (indigo + cyan)",
  primary: "#818CF8", secondary: NEON_CYAN,
  text: "#EEF1FF", pageLabel: "#D2D8FB",
  surfaceRgb: "16,20,52", panel: PANEL_INK_DEEP,
})

const auroraBlueGlacial = auroraBlueSkin({
  id: "neonGlow/aurora-blue-glacial",
  label: "Aurora · glacial (ice + steel)",
  primary: "#A5F3FC", secondary: "#60A5FA",
  text: "#F4FCFF", pageLabel: "#DAF1FB",
  surfaceRgb: "20,40,60", panel: PANEL_STEEL_DEEP,
})

const auroraBlueLagoon = auroraBlueSkin({
  id: "neonGlow/aurora-blue-lagoon",
  label: "Aurora · lagoon (teal + sky)",
  primary: "#22D3EE", secondary: "#38BDF8",
  text: "#EAF9FD", pageLabel: "#C7ECF7",
  surfaceRgb: "8,24,44", panel: PANEL_HEAL_DEEP,
})

const auroraBlueStorm = auroraBlueSkin({
  id: "neonGlow/aurora-blue-storm",
  label: "Aurora · storm (steel + cyan)",
  primary: "#93C5FD", secondary: NEON_CYAN,
  text: "#EEF5FF", pageLabel: "#CFE0FB",
  surfaceRgb: "24,36,56", panel: PANEL_STEEL,
})

const auroraBlueAbyssal = auroraBlueSkin({
  id: "neonGlow/aurora-blue-abyssal",
  label: "Aurora · abyssal (deep teal + azure)",
  primary: "#14B8A6", secondary: "#2563EB",
  text: "#E2F6F4", pageLabel: "#BFE7E1",
  surfaceRgb: "4,20,32", panel: PANEL_INK_DEEP,
})

// =============================================================================
// Group E — legacyDeep (revives the older panel-blue look + variants)
// =============================================================================

const legacyPanelBlue: CardSkin = {
  id: "legacyDeep/panel-blue",
  label: "Legacy · panel blue",
  group: "legacyDeep",
  surface: "rgba(255,255,255,0.14)",
  surfaceHover: "rgba(255,255,255,0.20)",
  surfaceSelected: "rgba(255,255,255,0.26)",
  border: "rgba(255,255,255,0.35)",
  borderSelected: "rgba(255,255,255,0.95)",
  backdrop: "blur(8px)",
  shadow: SHADOW_DARK_FROST,
  innerHighlight: "inset 0 1px 0 rgba(255,255,255,0.25)",
  text: {
    question: "#fff",
    pageLabel: "#fff",
    chevron: "#fff",
  },
  chip: {
    bg: "rgba(255,255,255,0.10)",
    color: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(255,255,255,0.18)",
    iconColor: "rgba(255,255,255,0.78)",
  },
  panelBand: { bg: PANEL_STEEL, pad: 8 },
}

const legacyPanelBlueWarm: CardSkin = {
  ...legacyPanelBlue,
  id: "legacyDeep/panel-blue-warm",
  label: "Legacy · panel blue + warm amber ring",
  border: "rgba(255,210,140,0.45)",
  borderSelected: "rgba(255,210,140,0.95)",
  innerHighlight: "inset 0 0 0 1px rgba(255,210,140,0.30)",
  text: {
    ...legacyPanelBlue.text,
    questionGlow: "0 0 8px rgba(255,210,140,0.40)",
    chevron: NEON_AMBER,
  },
  chip: {
    bg: "rgba(255,210,140,0.10)",
    color: "rgba(255,243,222,0.95)",
    border: "1px solid rgba(255,210,140,0.28)",
    iconColor: "rgba(255,210,140,0.85)",
  },
}

const legacyCloudTint: CardSkin = {
  ...legacyPanelBlue,
  id: "legacyDeep/cloud-tint",
  label: "Legacy · cloud tint",
  surface: "rgba(255,255,255,0.18)",
  surfaceHover: "rgba(255,255,255,0.24)",
  surfaceSelected: "rgba(255,255,255,0.30)",
  panelBand: {
    bg: "linear-gradient(180deg,#1A3C66 0%,#2C4F76 100%)",
    pad: 8,
  },
}

const legacyWater: CardSkin = {
  ...legacyPanelBlue,
  id: "legacyDeep/water",
  label: "Legacy · water backdrop",
  // The water-grain backdrop is composited by the panel band shadow
  // chain in the gallery story (it owns the `WaterBackground` mount).
  panelBand: {
    bg: PANEL_STEEL,
    pad: 8,
    shadow:
      "inset 0 0 0 1px rgba(255,255,255,0.05), inset 0 80px 120px -40px rgba(255,255,255,0.06)",
  },
}

const legacyBracketEcho: CardSkin = {
  ...legacyPanelBlue,
  id: "legacyDeep/bracket-echo",
  label: "Legacy · bracket echo",
  border: "none",
  // Bracket marks are layered via `panelBand.shadow` so we don't have
  // to ship per-card SVGs in this token shape.
  innerHighlight: [
    "inset  10px  10px 0 -8px rgba(255,255,255,0.85)",
    "inset -10px  10px 0 -8px rgba(255,255,255,0.85)",
    "inset  10px -10px 0 -8px rgba(255,255,255,0.85)",
    "inset -10px -10px 0 -8px rgba(255,255,255,0.85)",
  ].join(", "),
}

// =============================================================================
// Export the ordered list — `skins.ts` assembles the registry from this.
// =============================================================================

export const CARD_SKIN_LIST: CardSkin[] = [
  // A — frostedGlass
  frostedGlassDarkBase,
  frostedGlassDarkBlueText,
  frostedGlassDeepNavyWarm,
  frostedGlassHealMint,
  frostedGlassRosePulse,
  // B — paperInk
  paperInkClean,
  paperInkBlue,
  paperInkLinenWarm,
  paperInkTealHeal,
  paperInkElevatedEdge,
  // C — duotoneGradient
  duotoneCoolSteel,
  duotoneHealDeep,
  duotoneWinGold,
  duotoneDawn,
  duotoneHorizon,
  // D — neonGlow
  neonCyan,
  neonAmber,
  neonLime,
  neonMagenta,
  neonAurora,
  // D · Aurora-Blue (10 iterations on aurora with blue/teal-only palette)
  auroraBlueIce,
  auroraBlueDeepSea,
  auroraBlueArctic,
  auroraBlueElectric,
  auroraBlueTealMist,
  auroraBlueMidnight,
  auroraBlueGlacial,
  auroraBlueLagoon,
  auroraBlueStorm,
  auroraBlueAbyssal,
  // E — legacyDeep
  legacyPanelBlue,
  legacyPanelBlueWarm,
  legacyCloudTint,
  legacyWater,
  legacyBracketEcho,
]

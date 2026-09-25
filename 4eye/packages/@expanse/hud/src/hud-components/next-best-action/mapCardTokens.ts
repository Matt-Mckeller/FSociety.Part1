/**
 * mapCardTokens — color constants proposed by the card-skin variant
 * exploration. Kept local to the next-best-action folder so we don't
 * pollute the global MUI theme until a skin is promoted to production.
 *
 * Token families:
 *   panel*   — strip painted *behind* the card stack inside the right rail
 *   card*    — card surface fills (solid colors + gradients)
 *   ink*     — text colors used on light cards
 */

// ── Panel band tokens ──────────────────────────────────────────────
export const PANEL_INK_DEEP    = "#0B1626" // deep navy band
export const PANEL_INK_SOFT    = "#1B2638" // slate band
export const PANEL_STEEL       = "#2C4F76" // legacy panel-blue (from blue-light-theme.ts)
export const PANEL_STEEL_DEEP  = "#1A3C66" // legacy gradient start
export const PANEL_MIST_BLUE   = "#EAF2FB" // light blue tinted band
export const PANEL_MIST_TEAL   = "#E6F5F0" // healing-tint band
export const PANEL_MIST_AMBER  = "#FBF4E3" // dopamine band
export const PANEL_MIST_ROSE   = "#FBEAF1" // soft healing pink band
export const PANEL_HEAL_DEEP   = "#0F3D3A" // deep teal band
export const PANEL_GOLD_DEEP   = "#3B2A0B" // deep gold band

// ── Card surface tokens ────────────────────────────────────────────
export const CARD_PAPER          = "#FFFFFF"
export const CARD_LINEN          = "#F7F4EE"
export const CARD_SLATE          = "#1F2A3D"
export const CARD_GRADIENT_COOL  = "linear-gradient(135deg,#1E3A5F 0%,#2C4F76 100%)"
export const CARD_GRADIENT_HEAL  = "linear-gradient(135deg,#0F3D3A 0%,#1B5E55 100%)"
export const CARD_GRADIENT_WIN   = "linear-gradient(135deg,#3B2A0B 0%,#6E4A14 100%)"
export const CARD_GRADIENT_DAWN  = "linear-gradient(135deg,#1B1448 0%,#5B1E70 100%)"
export const CARD_GRADIENT_HORIZON =
  "linear-gradient(180deg,#0B1626 0%,#1E3A5F 60%,#3B82F6 100%)"
export const CARD_LUMEN =
  "radial-gradient(120% 120% at 30% 0%, rgba(66,133,244,0.18), transparent 60%), #0B1626"

// ── Ink (text on light cards) tokens ───────────────────────────────
export const INK_PRIMARY      = "#0B1626"
export const INK_MUTED        = "#374151"
export const INK_ACCENT_BLUE  = "#1A56D6"
export const INK_ACCENT_TEAL  = "#0F766E"
export const INK_ACCENT_GOLD  = "#A86B00"
export const INK_ACCENT_ROSE  = "#B83A6A"
export const INK_ACCENT_NAVY  = "#1A3C66"

// ── Neon accent tokens ─────────────────────────────────────────────
export const NEON_CYAN    = "#22D3EE"
export const NEON_AMBER   = "#FFC857"
export const NEON_LIME    = "#84E551"
export const NEON_MAGENTA = "#EC4899"
export const NEON_BLUE    = "#3B82F6"

/** Shared shadow chain used by frosted/dark skins (the production look). */
export const SHADOW_DARK_FROST = {
  rest:   "drop-shadow(0 8px 20px rgba(0,0,0,0.35))",
  breath: "drop-shadow(0 12px 28px rgba(0,0,0,0.45))",
} as const

/** Lighter shadow chain used by paper / light skins so they don't read as bruised. */
export const SHADOW_PAPER = {
  rest:   "drop-shadow(0 4px 10px rgba(15,23,42,0.10))",
  breath: "drop-shadow(0 8px 18px rgba(15,23,42,0.16))",
} as const

/** Heavier elevated stack for paper/elevated-edge. */
export const SHADOW_PAPER_FLOAT = {
  rest:   "drop-shadow(0 6px 16px rgba(15,23,42,0.12)) drop-shadow(0 1px 2px rgba(15,23,42,0.08))",
  breath: "drop-shadow(0 12px 28px rgba(15,23,42,0.20)) drop-shadow(0 2px 4px rgba(15,23,42,0.10))",
} as const

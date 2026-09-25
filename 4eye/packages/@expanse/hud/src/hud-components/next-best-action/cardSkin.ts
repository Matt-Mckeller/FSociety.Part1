/**
 * CardSkin — token-driven visual identity for `NextBestActionCard`.
 *
 * Parallels the `BarSkin` system in `hud-components/skins/` (same
 * `*Skin` + presets + `resolveSkin()` pattern) but covers a different
 * domain: content cards in the map-overlay right rail. Where `BarSkin`
 * is structural (shape × surface × border × elevation) for control
 * chrome, `CardSkin` carries fields cards need that bars don't —
 * headline text color, ink/page-label color, chevron tint, chip
 * coloring, and an optional `panelBand` painted *behind* the cards.
 *
 * The existing `topPickStyle` prop on `NextBestActionCard`
 * (glow / halo / shimmer / corner-mark) is **orthogonal** — it layers
 * on top of any skin to mark the recommended pick.
 */

/* eslint-disable @typescript-eslint/consistent-type-imports */

/** Variant family. Each skin belongs to exactly one group. */
export type CardSkinGroup =
  | "frostedGlass"     // dark frosted glass cards — current production style + variants
  | "paperInk"         // light card / dark text — readable on white panels
  | "duotoneGradient"  // background-driven gradients with neutral text
  | "neonGlow"         // saturated outline + colored text-glow
  | "legacyDeep"       // panel-blue / water / bracket-echo revivals

/** Drop-shadow chain split into rest + peak so the breathing loop can interpolate. */
export interface CardSkinShadow {
  rest: string
  breath: string
}

/** Per-skin text colors. Driven by tokens so a single change re-themes everything. */
export interface CardSkinText {
  /** Headline question word (e.g. "WHY?"). */
  question: string
  /** Optional `text-shadow` accent for the headline. */
  questionGlow?: string
  /** Right-aligned destination page label. */
  pageLabel: string
  /** Border + icon color for the outlined chevron square. */
  chevron: string
}

/** Chip styling so the chip row stays internally consistent with the skin. */
export interface CardSkinChip {
  bg: string
  color: string
  border: string
  iconColor: string
}

/**
 * Optional strip painted *behind* the card stack inside the right
 * panel. Lets a skin add depth without forcing the surrounding panel
 * (which holds the role/goal accordions) to recolor.
 */
export interface CardSkinPanelBand {
  bg: string
  radius?: number
  border?: string
  shadow?: string
  /** Px of inner padding the band applies around the cards. */
  pad?: number
}

/**
 * Reduced-motion overrides — degraded `text-shadow`, no breathing
 * keyframes, etc. Applied when `prefers-reduced-motion: reduce` is
 * active. Optional; if omitted the default static drop-shadow is used.
 */
export interface CardSkinReducedMotion {
  /** Replaces `text.questionGlow` when reduced-motion is on. */
  questionGlow?: string
}

/** Full card skin config. */
export interface CardSkinConfig {
  surface: string
  surfaceHover?: string
  surfaceSelected?: string

  border: string | "none"
  borderSelected?: string

  /** `backdrop-filter` value (e.g. `"blur(12px) saturate(140%)"`) or `"none"`. */
  backdrop: string | "none"

  shadow: CardSkinShadow
  /** Optional inner highlight (top edge sheen). */
  innerHighlight?: string

  text: CardSkinText
  chip: CardSkinChip

  panelBand?: CardSkinPanelBand
  reducedMotion?: CardSkinReducedMotion
}

/** Skin record. Adds identity + group on top of `CardSkinConfig`. */
export interface CardSkin extends CardSkinConfig {
  id: string
  label: string
  group: CardSkinGroup
}

/** Known preset names — populated in `skins.ts`. Kept loose so the registry can grow. */
export type CardSkinPreset = string

/**
 * Resolve a skin reference (preset id or full config) against the
 * registry. Mirrors `resolveSkin()` in `hud-components/skins/skins.ts`.
 */
export function resolveCardSkin(
  ref: CardSkinPreset | CardSkin | CardSkinConfig | undefined,
  registry: Record<string, CardSkin>,
  fallbackId: string,
): CardSkin {
  if (!ref) return registry[fallbackId]!
  if (typeof ref === "string") return registry[ref] ?? registry[fallbackId]!
  if ("id" in ref && "group" in ref) return ref
  // Anonymous config — synthesize a skin record so callers always get id/group.
  return {
    id: "custom",
    label: "Custom",
    group: "frostedGlass",
    ...ref,
  }
}

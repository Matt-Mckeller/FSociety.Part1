/**
 * Character Palette — Platform-Neutral Theming
 * ============================================
 * A small, serializable set of color tokens that fully describes how a 4eye
 * is colored. Both renderers (2D SVG / 3D R3F) read from this — never from
 * MUI directly — so the 3D model stays usable on React Native.
 *
 * On web, the `@expanse/character/mui` adapter derives a CharacterPalette
 * from the active MUI theme and pushes it into the character context. On
 * native, the host app supplies its own palette. Either way the renderers
 * are theme-driven, not hard-coded.
 */

/** Named accent slots accessories and details can reference by name. */
export interface AccessoryAccents {
  /** Primary brand accent. */
  primary: string
  /** Secondary brand accent. */
  secondary: string
  /** Extra highlight accent (badges, trims, ribbons). */
  highlight: string
  /** Neutral/contrast accent (outlines, hardware). */
  neutral: string
}

/** Complete color description for a single 4eye. */
export interface CharacterPalette {
  /** Head fill. */
  head: string
  /** Body trunk color. */
  body: string
  /** Arm/leg color. */
  limb: string
  /** Limb opacity (matches the 2D default of 0.5; 3D reads it too). */
  limbOpacity: number
  /** Eye glow / emissive color. */
  eyeGlow: string
  /** Strap / visor color. */
  strap: string
  /** Named accents for accessories and small details. */
  accents: AccessoryAccents
}

/**
 * A color a styleable accessory accepts: either a named palette slot
 * (resolved against the active {@link CharacterPalette}) or an explicit hex.
 */
export type AccessoryColorToken =
  | "head"
  | "body"
  | "limb"
  | "eyeGlow"
  | "strap"
  | "primary"
  | "secondary"
  | "highlight"
  | "neutral"
  | { hex: string }

/** Resolve an {@link AccessoryColorToken} to a concrete hex via the palette. */
export function resolveAccessoryColor(
  token: AccessoryColorToken,
  palette: CharacterPalette,
): string {
  if (typeof token === "object") return token.hex
  switch (token) {
    case "head":
      return palette.head
    case "body":
      return palette.body
    case "limb":
      return palette.limb
    case "eyeGlow":
      return palette.eyeGlow
    case "strap":
      return palette.strap
    case "primary":
      return palette.accents.primary
    case "secondary":
      return palette.accents.secondary
    case "highlight":
      return palette.accents.highlight
    case "neutral":
      return palette.accents.neutral
    default:
      return palette.head
  }
}

/**
 * Sensible neutral-but-not-black default. The web MUI adapter overrides this
 * with real theme colors; native hosts pass their own. Kept readable so the
 * character is never invisible if no theme is wired yet.
 */
export const DEFAULT_CHARACTER_PALETTE: CharacterPalette = {
  head: "#5b7c9d",
  body: "#3f5a7d",
  limb: "#3f5a7d",
  limbOpacity: 0.85,
  eyeGlow: "#7cc4ff",
  strap: "#27374d",
  accents: {
    primary: "#6c8cff",
    secondary: "#ff8fb3",
    highlight: "#ffd166",
    neutral: "#9aa7bd",
  },
}

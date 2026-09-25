/**
 * @expanse/theme - Theme Types
 *
 * Type definitions for layout component theme configurations.
 * These components are themed via the MUI theme.components object.
 *
 * Components:
 * - NavigationPad
 * - BoardChrome
 * - FloatingToolbar
 * - Tile
 * - GameDrawer
 */

// =============================================================================
// ActionBar
// =============================================================================

/**
 * ActionBar variant configuration
 * CSS-ready values for each skin variant
 */
export interface ActionBarVariantProps {
  /** Background color (may include alpha) */
  bgcolor: string
  /** Border (full CSS value or "none") */
  border: string
  /** Border radius in pixels */
  borderRadius: number
  /** Backdrop filter (e.g., "blur(8px)" or "none") */
  backdropFilter: string
  /** Box shadow (full CSS value or "none") */
  boxShadow: string
}

/**
 * ActionBar component theme configuration
 * 
 * Variants control surface appearance (from theme.palette.surface):
 * - glass: Translucent with blur (default)
 * - solid: Opaque, no blur
 * - frosted: Heavy blur, elevated
 * - minimal: No background
 * - outlined: Transparent with border
 * - technical: Sharp, accent border
 */
export interface ActionBarThemeProps {
  variants?: {
    glass?: ActionBarVariantProps
    solid?: ActionBarVariantProps
    frosted?: ActionBarVariantProps
    minimal?: ActionBarVariantProps
    outlined?: ActionBarVariantProps
    technical?: ActionBarVariantProps
    orbs?: ActionBarVariantProps
  }
}

// =============================================================================
// GameDrawer
// =============================================================================

/**
 * GameDrawer default variant configuration
 */
export interface GameDrawerDefaultVariant {
  width: number
}

/**
 * GameDrawer component theme configuration
 */
export interface GameDrawerThemeProps {
  variants?: {
    default?: GameDrawerDefaultVariant
  }
}

// =============================================================================
// NavigationPad
// =============================================================================

/**
 * NavigationPad variant configuration (shared structure)
 */
export interface NavigationPadVariantProps {
  /** Background color for buttons */
  buttonBgColor: string
  /** Background color for buttons on hover */
  buttonHoverBgColor: string
  /** Background color for disabled buttons */
  buttonDisabledBgColor: string
  /** Border color for buttons */
  borderColor: string
  /** Border color for buttons on hover */
  borderHoverColor: string
  /** Icon color for enabled directional buttons */
  arrowColor: string
  /** Icon color for disabled buttons */
  disabledColor: string
  /** Backdrop blur amount in pixels */
  blur: number
  /** Background opacity (0-1) */
  opacity: number
}

/**
 * NavigationPad component theme configuration
 * Controls the appearance of directional navigation buttons
 */
export interface NavigationPadThemeProps {
  variants?: {
    /** Default theme-aware variant */
    default?: NavigationPadVariantProps
    /** High contrast variant for accessibility (WCAG AAA) */
    highContrast?: NavigationPadVariantProps
  }
}

// =============================================================================
// ActionOrb
// =============================================================================

/**
 * ActionOrb variant configuration.
 *
 * Controls only the *surface skin* of the orb — the colored fill, border,
 * shadow, blur, and optional looping animation. Shape, size, color (palette
 * lookup) and label/hotkey/badge composition stay on the component as
 * per-instance props.
 *
 * Background and border accept either:
 *   - a flat CSS string (e.g. `"rgba(60,60,60,0.95)"`), or
 *   - the literal `"palette"` to opt into the orb's resolved color (the
 *     `useOrbColors` output, which already respects the `color` prop and
 *     palette.ability tokens).
 */
export interface ActionOrbVariantProps {
  /** Background fill. Use `"palette"` to use the orb's resolved color bg. */
  bgcolor: string | "palette"
  /** Border (full CSS value, `"none"`, or `"palette"`). */
  border: string | "palette"
  /** Backdrop filter (e.g. `"blur(8px)"`) or `"none"`. */
  backdropFilter: string
  /** Box-shadow at rest (full CSS value or `"none"`). */
  boxShadow: string
  /** Box-shadow on hover (full CSS value or `"none"`). */
  hoverBoxShadow: string
  /** Optional looping animation. */
  animation: "none" | "glow" | "pulse" | "float"
}

/**
 * ActionOrb component theme configuration.
 *
 * Variants:
 * - `glass`   — semi-transparent fill + blur (default)
 * - `solid`   — opaque fill, no blur
 * - `glow`    — animated glow halo
 * - `pulse`   — animated pulsing ring
 * - `outline` — open fill with Expanse 1:2:3 concentric rings; fills on hover
 */
export interface ActionOrbThemeProps {
  variants?: {
    glass?: ActionOrbVariantProps
    solid?: ActionOrbVariantProps
    glow?: ActionOrbVariantProps
    pulse?: ActionOrbVariantProps
    outline?: ActionOrbVariantProps
    float?: ActionOrbVariantProps
  }
}

// =============================================================================
// BoardChrome
// =============================================================================

/**
 * BoardChrome variant configuration (shared structure)
 */
export interface BoardChromeVariantProps {
  /** Background color for bars and controls */
  overlayBgColor: string
  /** Border color for overlay elements */
  borderColor: string
  /** Backdrop blur amount in pixels */
  blur: number
  /** Background opacity (0-1) */
  opacity: number
}

/**
 * BoardChrome component theme configuration
 * Controls the appearance of overlay chrome elements
 */
export interface BoardChromeThemeProps {
  variants?: {
    /** Default glass-morphism variant */
    default?: BoardChromeVariantProps
    /** Minimal variant with less visual prominence */
    minimal?: BoardChromeVariantProps
    /** High contrast variant for accessibility */
    highContrast?: BoardChromeVariantProps
  }
}

// =============================================================================
// FloatingToolbar
// =============================================================================

/**
 * FloatingToolbar variant configuration (shared structure)
 */
export interface FloatingToolbarVariantProps {
  bgColor: string
  borderColor: string
  blur: number
  opacity: number
}

/**
 * FloatingToolbar component theme configuration
 */
export interface FloatingToolbarThemeProps {
  variants?: {
    default?: FloatingToolbarVariantProps
    highContrast?: FloatingToolbarVariantProps
  }
}

// =============================================================================
// Tile
// =============================================================================

/**
 * Tile variant configuration (shared structure)
 */
export interface TileVariantProps {
  bgColor: string
  borderColor: string
  activeBorderColor: string
}

/**
 * Tile component theme configuration
 */
export interface TileThemeProps {
  variants?: {
    default?: TileVariantProps
    highContrast?: TileVariantProps
  }
}

// =============================================================================
// MinimapTile
// =============================================================================

/**
 * MinimapTile visual style variant.
 *
 * Controls the shape and decoration of each tile in the minimap grid:
 * - default: 4px rounded corners, standard border
 * - circular: Fully rounded (circles). Outline chips use Expanse 1:2:3 rings.
 * - sharp: 0px radius (hard squares)
 * - outlined: Thicker border, accent-colored when special
 * - minimal: No border, subtle semi-transparent background
 * - glow: Ambient color glow on all non-empty tiles
 */
export type MinimapTileVariant =
  | "default"
  | "circular"
  | "sharp"
  | "outlined"
  | "minimal"
  | "glow"

/**
 * CSS-ready style values for a single MinimapTile variant.
 * Applied conditionally based on tile state (base / active / hover).
 */
export interface MinimapTileVariantProps {
  /** Border radius (px value or "50%") */
  borderRadius: string | number
  /** Base border (full CSS value) */
  baseBorder: string
  /** Border when tile is the current active position */
  activeBorder: string
  /** Base box-shadow (decorative glow or "none") */
  baseBoxShadow: string
  /** Box-shadow when tile is active */
  activeBoxShadow: string
  /** Box-shadow on hover */
  hoverBoxShadow: string
  /** Overall opacity (1 = full, 0.8 for minimal) */
  opacity: number
}

/**
 * MinimapTile component theme configuration.
 *
 * Provides per-variant visual style overrides
 * and the category color palette used for tile backgrounds.
 */
export interface MinimapTileThemeProps {
  /** Style overrides per tile variant */
  variants?: {
    default?: MinimapTileVariantProps
    circular?: MinimapTileVariantProps
    sharp?: MinimapTileVariantProps
    outlined?: MinimapTileVariantProps
    minimal?: MinimapTileVariantProps
    glow?: MinimapTileVariantProps
  }
  /**
   * Category → color mapping.
   * Used when a tile has a `category` but no explicit `inactive` color.
   */
  categoryColors?: Record<string, string>
  /** Color for empty/unconfigured tiles */
  emptyTileColor?: string
  /** Border color for empty/non-special tiles */
  emptyBorderColor?: string
  /** Border + glow color for the active position tile */
  activeTileColor?: string
}

// =============================================================================
// MinimapPanel
// =============================================================================

/**
 * MinimapPanel surface variant.
 *
 * Controls the chrome treatment for the panel + its morphing toggle button:
 * - default:  Light blur, subtle border (lightest presence)
 * - frosted:  Heavy blur, prominent border + shadow (current shipped look)
 * - solid:    Opaque, no blur (for low-perf or maximum readability)
 * - dark:     Dark panel-blue surface matching CompactStatusBar's inner fill
 */
export type MinimapPanelVariant = "default" | "frosted" | "solid" | "dark"

/**
 * CSS-ready style values for a single MinimapPanel variant.
 *
 * The toggle button morphs into the panel, so it shares the same surface
 * treatment (bgcolor / border / shadow). All values are flat CSS strings
 * so the component can apply them directly without any palette lookups.
 */
export interface MinimapPanelVariantProps {
  // ---- Panel surface ----
  /** Panel background color (may include alpha) */
  bgcolor: string
  /** Panel border (full CSS value) */
  border: string
  /** Panel border radius (px) */
  borderRadius: number
  /** Backdrop filter (e.g., "blur(12px)" or "none") */
  backdropFilter: string
  /** Panel box-shadow */
  boxShadow: string

  // ---- Internal structure ----
  /** Color used for header bottom + legend top dividers */
  dividerColor: string
  /** Preview card background color */
  previewBgcolor: string
  /** Preview card border (full CSS value) */
  previewBorder: string
  /** Current/Preview badge background color */
  badgeBgcolor: string
  /** Current/Preview badge border (full CSS value) */
  badgeBorder: string
  /** Border around the small color swatch in legend items */
  legendSwatchBorder: string

  // ---- Toggle button (morphs in/out of panel — must visually match) ----
  /** Toggle button background color */
  toggleBgcolor: string
  /** Toggle button background color on hover */
  toggleHoverBgcolor: string
  /** Toggle button border (full CSS value) */
  toggleBorder: string
  /** Toggle button box-shadow (matches panel for morph continuity) */
  toggleBoxShadow: string

  // ---- Optional content color overrides (for dark-surface variants) ----
  /** Primary text / icon color inside the panel. Omit to inherit from theme. */
  contentColor?: string
  /** Muted / secondary text color inside the panel. Omit to use "text.secondary". */
  secondaryContentColor?: string
}

/**
 * MinimapPanel component theme configuration.
 *
 * Provides per-variant chrome treatment for the entire panel + toggle button.
 * The default variant rendered by the component is `frosted`, which preserves
 * the shipped visual.
 */
export interface MinimapPanelThemeProps {
  variants?: {
    default?: MinimapPanelVariantProps
    frosted?: MinimapPanelVariantProps
    solid?: MinimapPanelVariantProps
    dark?: MinimapPanelVariantProps
  }
}

// =============================================================================
// Aggregate Type
// =============================================================================

/**
 * All layout component theme props for MUI augmentation
 */
export interface LayoutComponentsThemeProps {
  ExpanseActionBar?: ActionBarThemeProps
  ExpanseActionOrb?: ActionOrbThemeProps
  ExpanseGameDrawer?: GameDrawerThemeProps
  ExpanseNavigationPad?: NavigationPadThemeProps
  ExpanseBoardChrome?: BoardChromeThemeProps
  ExpanseFloatingToolbar?: FloatingToolbarThemeProps
  ExpanseTile?: TileThemeProps
  ExpanseMinimapTile?: MinimapTileThemeProps
  ExpanseMinimapPanel?: MinimapPanelThemeProps
}

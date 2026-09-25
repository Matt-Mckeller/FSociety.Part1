/**
 * @expanse/theme Type System
 * 
 * Core theme infrastructure types:
 * - theme-identifiers: ExpanseTheme, ThemeTier, metadata
 * - theme-context: ThemeMode, Provider/Context types, ComponentExtensionMap
 * - mui-augmentations: Palette, Typography, Breakpoints extensions
 * 
 * Note: Component theme types are now in their respective packages:
 * - @expanse/brand-core: ProgressBar, Gem, ExperienceIcon, Character, ExpandingBorderBox
 * - @expanse/shell: NavigationPad, BoardChrome, FloatingToolbar, Tile, GameDrawer
 * 
 * @example
 * import { ExpanseTheme, ThemeMode, ComponentExtensionMap } from "@expanse/theme"
 */

// Theme identifiers and metadata
export {
  type ThemeTier,
  type ThemeMetadata,
  type ExpanseTheme,
  THEME_METADATA,
  getThemesByTier,
  THEMES_BY_TIER,
  EXPANSE_THEMES,
} from "./theme-identifiers"

// Theme context types
export {
  type ThemeMode,
  type InitialThemeMode,
  type ThemeProviderProps,
  type ThemeContextProps,
  type ComponentExtensionMap,
} from "./theme-context"

// MUI augmentations (side-effect import for type merging)
import "./mui-augmentations"

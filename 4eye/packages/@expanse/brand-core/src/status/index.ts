/**
 * Status Display Components
 *
 * Components for displaying user profile status, progress, and currency.
 * Architecture includes:
 * - Types: Shared type definitions
 * - Hooks: Logic for expansion, animation, visual state
 * - Context: Shared state provider
 * - Reducers: State management
 */

// =============================================================================
// COMPONENTS
// =============================================================================

// Main status display (TripleLayer pill family — theme-driven variants)
export {
  ProfileStatusDisplay,
  type ProfileStatusDisplayProps,
} from "./ProfileStatusDisplay"

// Single-bar expandable chip (currency-anchored, grows to reveal xp + level)
export {
  CompactStatusBar,
  type CompactStatusBarProps,
  type CompactStatusBarDirection,
  type CompactStatusBarSize,
  type CompactStatusBarTrigger,
} from "./CompactStatusBar"

// Single-bar primitive lives in `display/` as `ExpandingBarTripleLayer`.
// Use it directly for one-off bars, or wrap it in a domain bar (see `bars/`).

// =============================================================================
// CONTEXT (shared player data)
// =============================================================================

export {
  PlayerStatusProvider,
  usePlayerStatus,
  PLAYER_STATUS_DEFAULTS,
  type PlayerStatusValue,
  type PlayerStatusProviderProps,
} from "./context"

// Individual status bars
export {
  CurrencyStatusBarSimple,
  ProfileIconStatusBarSimple,
  ProgressStatusBar,
  GenericStatusBar,
  CurrencyStatusBarTripleLayer,
  ProfileIconStatusBarTripleLayer,
  ProgressStatusBarTripleLayer,
} from "./bars"

// =============================================================================
// TYPES
// =============================================================================

export type {
  // Layout
  ProfileStatusDisplayLayout,
  // Display states
  StatusBarDisplayState,
  ProfileStatusDisplayState,
  // Expansion
  StatusBarExpansionDirection,
  ExpansionDirection,
  // Base props
  StatusBarBaseProps,
} from "./types"

export type {
  // Animation config
  AnimationConfig,
  ProfileAnimationConfig,
  BarAnimationState,
} from "./types"

export type {
  // Expansion state
  ExpansionState,
  ExpansionAction,
  ExpansionTrigger,
  UseExpansionOptions,
} from "./types"

// =============================================================================
// HOOKS
// =============================================================================

export {
  useExpansion,
  useBarAnimation,
  useProfileAnimation,
  useVisualState,
} from "./hooks"

// =============================================================================
// REDUCERS
// =============================================================================

export { expansionReducer, createInitialExpansionState } from "./reducers"

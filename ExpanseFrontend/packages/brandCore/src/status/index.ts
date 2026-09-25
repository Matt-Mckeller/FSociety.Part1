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

// Main status display
export {
  ProfileStatusDisplay,
  type ProfileStatusDisplayProps,
} from "./ProfileStatusDisplay"

// Flexible status bar display
export {
  StatusBarDisplay,
  type StatusBarDisplayProps,
} from "./StatusBarDisplay"

// Individual status bars
export {
  CurrencyStatusBarSimple,
  ProfileIconStatusBarSimple,
  ProgressStatusBar,
  GenericStatusBar,
} from "./bars"

// =============================================================================
// TYPES
// =============================================================================

export type {
  // Layout patterns
  StatusBarLayoutPattern,
  ProfileStatusDisplayLayout,
  // Display states
  StatusBarDisplayState,
  ProfileStatusDisplayState,
  // Expansion
  StatusBarExpansionDirection,
  ExpansionDirection,
  ExpansionBehavior,
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
  ExpansionLayoutOptions,
} from "./types"

// =============================================================================
// HOOKS
// =============================================================================

export {
  useExpansion,
  useBarAnimation,
  useProfileAnimation,
  useVisualState,
  useStatusBarLayout,
} from "./hooks"

// =============================================================================
// CONTEXT
// =============================================================================

export {
  StatusDisplayContext,
  StatusDisplayProvider,
  useStatusDisplayContext,
  type StatusDisplayContextValue,
} from "./context"

// =============================================================================
// REDUCERS
// =============================================================================

export { expansionReducer, createInitialExpansionState } from "./reducers"

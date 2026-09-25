import type {
  ActionBarConfig,
  ActionBarItem,
  ActionBarAnchor,
  ALL_ANCHORS,
} from "../types"

/**
 * State for a single bar instance
 */
export interface ActionBarInstanceState {
  /** Bar configuration */
  config: ActionBarConfig
  /** Resolved items (may differ from config.items after auto-resolve) */
  items: ActionBarItem[]
  /** Visibility state */
  isVisible: boolean
  /** Collapsed state */
  isCollapsed: boolean
}

/**
 * Lookup map type for anchors
 */
export type AnchorLookup<T> = Record<ActionBarAnchor, T>

/**
 * Create empty anchor lookup map
 */
export function createEmptyAnchorLookup<T>(defaultValue: () => T): AnchorLookup<T> {
  return {
    "top": defaultValue(),
    "bottom": defaultValue(),
    "left": defaultValue(),
    "right": defaultValue(),
    "top-left": defaultValue(),
    "top-center": defaultValue(),
    "top-right": defaultValue(),
    "bottom-left": defaultValue(),
    "bottom-center": defaultValue(),
    "bottom-right": defaultValue(),
    "left-center": defaultValue(),
    "right-center": defaultValue(),
    "floating": defaultValue(),
  }
}

/**
 * Global ActionBar state
 */
export interface ActionBarState {
  /** Registered bars by ID */
  bars: Record<string, ActionBarInstanceState>
  
  /** Quick lookup: bars by anchor */
  barsByAnchor: AnchorLookup<string[]>
  
  /** Loading state (for async item resolution) */
  isResolving: boolean
  
  /** Error state */
  error: string | null
}

/**
 * Initial action bar state
 */
export const initialActionBarState: ActionBarState = {
  bars: {},
  barsByAnchor: createEmptyAnchorLookup(() => []),
  isResolving: false,
  error: null,
}

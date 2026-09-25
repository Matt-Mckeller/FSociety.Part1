import type {
  ActionBarConfig,
  ActionBarItem,
  ActionBarPosition,
  ActionBarPreset,
  NavItem,
} from "../types"

// =============================================================================
// Action Type Constants
// =============================================================================

export const ActionBarActionTypes = {
  REGISTER_BAR: "actionBar/REGISTER_BAR",
  UNREGISTER_BAR: "actionBar/UNREGISTER_BAR",
  UPDATE_BAR: "actionBar/UPDATE_BAR",
  UPDATE_BAR_POSITION: "actionBar/UPDATE_BAR_POSITION",
  SET_BAR_ITEMS: "actionBar/SET_BAR_ITEMS",
  SET_BAR_VISIBILITY: "actionBar/SET_BAR_VISIBILITY",
  SET_BAR_COLLAPSED: "actionBar/SET_BAR_COLLAPSED",
  SET_RESOLVING: "actionBar/SET_RESOLVING",
  SET_ERROR: "actionBar/SET_ERROR",
  CLEAR_BARS: "actionBar/CLEAR_BARS",
} as const

// =============================================================================
// Action Types
// =============================================================================

export type ActionBarAction =
  | { type: typeof ActionBarActionTypes.REGISTER_BAR; payload: ActionBarConfig }
  | { type: typeof ActionBarActionTypes.UNREGISTER_BAR; payload: { id: string } }
  | { type: typeof ActionBarActionTypes.UPDATE_BAR; payload: { id: string; updates: Partial<ActionBarConfig> } }
  | { type: typeof ActionBarActionTypes.UPDATE_BAR_POSITION; payload: { id: string; position: ActionBarPosition | ActionBarPreset } }
  | { type: typeof ActionBarActionTypes.SET_BAR_ITEMS; payload: { id: string; items: ActionBarItem[] } }
  | { type: typeof ActionBarActionTypes.SET_BAR_VISIBILITY; payload: { id: string; visible: boolean } }
  | { type: typeof ActionBarActionTypes.SET_BAR_COLLAPSED; payload: { id: string; collapsed: boolean } }
  | { type: typeof ActionBarActionTypes.SET_RESOLVING; payload: boolean }
  | { type: typeof ActionBarActionTypes.SET_ERROR; payload: string | null }
  | { type: typeof ActionBarActionTypes.CLEAR_BARS }

// =============================================================================
// Action Creators
// =============================================================================

export const actionBarActions = {
  /**
   * Register a new action bar
   */
  registerBar: (config: ActionBarConfig): ActionBarAction => ({
    type: ActionBarActionTypes.REGISTER_BAR,
    payload: config,
  }),
  
  /**
   * Unregister an action bar
   */
  unregisterBar: (id: string): ActionBarAction => ({
    type: ActionBarActionTypes.UNREGISTER_BAR,
    payload: { id },
  }),
  
  /**
   * Update bar configuration
   */
  updateBar: (id: string, updates: Partial<ActionBarConfig>): ActionBarAction => ({
    type: ActionBarActionTypes.UPDATE_BAR,
    payload: { id, updates },
  }),
  
  /**
   * Update bar position
   */
  updateBarPosition: (id: string, position: ActionBarPosition | ActionBarPreset): ActionBarAction => ({
    type: ActionBarActionTypes.UPDATE_BAR_POSITION,
    payload: { id, position },
  }),
  
  /**
   * Set bar items (after resolution)
   */
  setBarItems: (id: string, items: ActionBarItem[]): ActionBarAction => ({
    type: ActionBarActionTypes.SET_BAR_ITEMS,
    payload: { id, items },
  }),
  
  /**
   * Set bar visibility
   */
  setBarVisibility: (id: string, visible: boolean): ActionBarAction => ({
    type: ActionBarActionTypes.SET_BAR_VISIBILITY,
    payload: { id, visible },
  }),
  
  /**
   * Set bar collapsed state
   */
  setBarCollapsed: (id: string, collapsed: boolean): ActionBarAction => ({
    type: ActionBarActionTypes.SET_BAR_COLLAPSED,
    payload: { id, collapsed },
  }),
  
  /**
   * Set resolving state
   */
  setResolving: (isResolving: boolean): ActionBarAction => ({
    type: ActionBarActionTypes.SET_RESOLVING,
    payload: isResolving,
  }),
  
  /**
   * Set error state
   */
  setError: (error: string | null): ActionBarAction => ({
    type: ActionBarActionTypes.SET_ERROR,
    payload: error,
  }),
  
  /**
   * Clear all bars
   */
  clearBars: (): ActionBarAction => ({
    type: ActionBarActionTypes.CLEAR_BARS,
  }),
}

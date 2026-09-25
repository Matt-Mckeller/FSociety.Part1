import {
  ActionBarState,
  ActionBarInstanceState,
  initialActionBarState,
  createEmptyAnchorLookup,
} from "./ActionBar.state"
import { ActionBarAction, ActionBarActionTypes } from "./ActionBar.actions"
import {
  getAnchorFromPosition,
  resolveActionBarPosition,
} from "../types/ActionBarPosition.types"

/**
 * ActionBar reducer
 */
export function actionBarReducer(
  state: ActionBarState,
  action: ActionBarAction
): ActionBarState {
  switch (action.type) {
    case ActionBarActionTypes.REGISTER_BAR: {
      const config = action.payload
      const anchor = getAnchorFromPosition(config.position)
      
      // Create instance state
      const instance: ActionBarInstanceState = {
        config,
        items: config.items,
        isVisible: config.visible ?? true,
        isCollapsed: config.collapsed ?? false,
      }
      
      // Update bars record
      const newBars = { ...state.bars, [config.id]: instance }
      
      // Update anchor lookup
      const currentAnchorBars = state.barsByAnchor[anchor]
      const newBarsByAnchor = {
        ...state.barsByAnchor,
        [anchor]: currentAnchorBars.includes(config.id)
          ? currentAnchorBars
          : [...currentAnchorBars, config.id],
      }
      
      return {
        ...state,
        bars: newBars,
        barsByAnchor: newBarsByAnchor,
      }
    }
    
    case ActionBarActionTypes.UNREGISTER_BAR: {
      const { id } = action.payload
      const instance = state.bars[id]
      if (!instance) return state
      
      const anchor = getAnchorFromPosition(instance.config.position)
      
      // Remove from bars
      const { [id]: _, ...remainingBars } = state.bars
      
      // Remove from anchor lookup
      const newBarsByAnchor = {
        ...state.barsByAnchor,
        [anchor]: state.barsByAnchor[anchor].filter(barId => barId !== id),
      }
      
      return {
        ...state,
        bars: remainingBars,
        barsByAnchor: newBarsByAnchor,
      }
    }
    
    case ActionBarActionTypes.UPDATE_BAR: {
      const { id, updates } = action.payload
      const instance = state.bars[id]
      if (!instance) return state
      
      // Check if position changed
      const oldAnchor = getAnchorFromPosition(instance.config.position)
      const newPosition = updates.position ?? instance.config.position
      const newAnchor = getAnchorFromPosition(newPosition)
      
      // Update instance
      const newInstance: ActionBarInstanceState = {
        ...instance,
        config: { ...instance.config, ...updates },
        items: updates.items ?? instance.items,
        isVisible: updates.visible ?? instance.isVisible,
        isCollapsed: updates.collapsed ?? instance.isCollapsed,
      }
      
      // Update bars
      const newBars = { ...state.bars, [id]: newInstance }
      
      // Update anchor lookup if position changed
      let newBarsByAnchor = state.barsByAnchor
      if (oldAnchor !== newAnchor) {
        newBarsByAnchor = {
          ...state.barsByAnchor,
          [oldAnchor]: state.barsByAnchor[oldAnchor].filter(barId => barId !== id),
          [newAnchor]: [...state.barsByAnchor[newAnchor], id],
        }
      }
      
      return {
        ...state,
        bars: newBars,
        barsByAnchor: newBarsByAnchor,
      }
    }
    
    case ActionBarActionTypes.UPDATE_BAR_POSITION: {
      const { id, position } = action.payload
      const instance = state.bars[id]
      if (!instance) return state
      
      return actionBarReducer(state, {
        type: ActionBarActionTypes.UPDATE_BAR,
        payload: { id, updates: { position } },
      })
    }
    
    case ActionBarActionTypes.SET_BAR_ITEMS: {
      const { id, items } = action.payload
      const instance = state.bars[id]
      if (!instance) return state
      
      return {
        ...state,
        bars: {
          ...state.bars,
          [id]: { ...instance, items },
        },
      }
    }
    
    case ActionBarActionTypes.SET_BAR_VISIBILITY: {
      const { id, visible } = action.payload
      const instance = state.bars[id]
      if (!instance) return state
      
      return {
        ...state,
        bars: {
          ...state.bars,
          [id]: { ...instance, isVisible: visible },
        },
      }
    }
    
    case ActionBarActionTypes.SET_BAR_COLLAPSED: {
      const { id, collapsed } = action.payload
      const instance = state.bars[id]
      if (!instance) return state
      
      return {
        ...state,
        bars: {
          ...state.bars,
          [id]: { ...instance, isCollapsed: collapsed },
        },
      }
    }
    
    case ActionBarActionTypes.SET_RESOLVING: {
      return {
        ...state,
        isResolving: action.payload,
      }
    }
    
    case ActionBarActionTypes.SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      }
    }
    
    case ActionBarActionTypes.CLEAR_BARS: {
      return initialActionBarState
    }
    
    default:
      return state
  }
}

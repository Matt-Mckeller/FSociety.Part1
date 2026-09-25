/**
 * Logo Configuration State Hook
 */

"use client"

import { useReducer, useCallback, useMemo } from "react"
import { LogoConfig, LogoDesignerState, DEFAULT_CONFIG, Preset } from "../types"

type Action =
  | { type: 'SET_CONFIG'; payload: Partial<LogoConfig> }
  | { type: 'RESET_CONFIG' }
  | { type: 'LOAD_PRESET'; payload: LogoConfig }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'ADD_PRESET'; payload: Preset }
  | { type: 'DELETE_PRESET'; payload: string }
  | { type: 'SET_COMPARE_MODE'; payload: boolean }
  | { type: 'SET_COMPARE_PRESET'; payload: string | null }

const MAX_HISTORY = 50

function reducer(state: LogoDesignerState, action: Action): LogoDesignerState {
  switch (action.type) {
    case 'SET_CONFIG': {
      const newConfig = { ...state.config, ...action.payload }
      // Auto-calculate mirrored rotation if autoMirrorAngle is true
      if (action.payload.orbitalRotation !== undefined && state.config.autoMirrorAngle) {
        newConfig.mirroredRotation = -action.payload.orbitalRotation
      }
      // Add to history (truncate forward history if we're not at the end)
      const newHistory = [
        ...state.history.slice(0, state.historyIndex + 1),
        newConfig,
      ].slice(-MAX_HISTORY)
      return {
        ...state,
        config: newConfig,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      }
    }
    case 'RESET_CONFIG':
      return {
        ...state,
        config: DEFAULT_CONFIG,
        history: [...state.history, DEFAULT_CONFIG].slice(-MAX_HISTORY),
        historyIndex: state.history.length,
      }
    case 'LOAD_PRESET':
      return {
        ...state,
        config: action.payload,
        history: [...state.history, action.payload].slice(-MAX_HISTORY),
        historyIndex: state.history.length,
      }
    case 'UNDO':
      if (state.historyIndex > 0) {
        return {
          ...state,
          config: state.history[state.historyIndex - 1],
          historyIndex: state.historyIndex - 1,
        }
      }
      return state
    case 'REDO':
      if (state.historyIndex < state.history.length - 1) {
        return {
          ...state,
          config: state.history[state.historyIndex + 1],
          historyIndex: state.historyIndex + 1,
        }
      }
      return state
    case 'ADD_PRESET':
      return {
        ...state,
        presets: [...state.presets, action.payload],
      }
    case 'DELETE_PRESET':
      return {
        ...state,
        presets: state.presets.filter(p => p.id !== action.payload),
      }
    case 'SET_COMPARE_MODE':
      return {
        ...state,
        compareMode: action.payload,
        comparePresetId: action.payload ? state.comparePresetId : null,
      }
    case 'SET_COMPARE_PRESET':
      return {
        ...state,
        comparePresetId: action.payload,
      }
    default:
      return state
  }
}

const STORAGE_KEY = 'logo-designer-presets'

function loadPresets(): Preset[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function savePresets(presets: Preset[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets))
  } catch {
    console.warn('Failed to save presets to localStorage')
  }
}

export function useLogoConfig() {
  const [state, dispatch] = useReducer(reducer, {
    config: DEFAULT_CONFIG,
    presets: loadPresets(),
    compareMode: false,
    comparePresetId: null,
    history: [DEFAULT_CONFIG],
    historyIndex: 0,
  })

  // Update config
  const updateConfig = useCallback((updates: Partial<LogoConfig>) => {
    dispatch({ type: 'SET_CONFIG', payload: updates })
  }, [])

  // Reset to defaults
  const resetConfig = useCallback(() => {
    dispatch({ type: 'RESET_CONFIG' })
  }, [])

  // Load a preset
  const loadPreset = useCallback((preset: Preset) => {
    dispatch({ type: 'LOAD_PRESET', payload: preset.config })
  }, [])

  // Undo/Redo
  const undo = useCallback(() => dispatch({ type: 'UNDO' }), [])
  const redo = useCallback(() => dispatch({ type: 'REDO' }), [])

  // Save preset
  const savePreset = useCallback((name: string, description?: string) => {
    const preset: Preset = {
      id: `preset-${Date.now()}`,
      name,
      description,
      config: { ...state.config },
      createdAt: Date.now(),
    }
    dispatch({ type: 'ADD_PRESET', payload: preset })
    savePresets([...state.presets, preset])
    return preset
  }, [state.config, state.presets])

  // Delete preset
  const deletePreset = useCallback((id: string) => {
    dispatch({ type: 'DELETE_PRESET', payload: id })
    const newPresets = state.presets.filter(p => p.id !== id)
    savePresets(newPresets)
  }, [state.presets])

  // Compare mode
  const setCompareMode = useCallback((enabled: boolean) => {
    dispatch({ type: 'SET_COMPARE_MODE', payload: enabled })
  }, [])

  const setComparePreset = useCallback((presetId: string | null) => {
    dispatch({ type: 'SET_COMPARE_PRESET', payload: presetId })
  }, [])

  // Get compare preset config
  const compareConfig = useMemo(() => {
    if (!state.comparePresetId) return null
    const preset = state.presets.find(p => p.id === state.comparePresetId)
    return preset?.config ?? null
  }, [state.comparePresetId, state.presets])

  // Can undo/redo
  const canUndo = state.historyIndex > 0
  const canRedo = state.historyIndex < state.history.length - 1

  return {
    config: state.config,
    presets: state.presets,
    compareMode: state.compareMode,
    compareConfig,
    canUndo,
    canRedo,
    updateConfig,
    resetConfig,
    loadPreset,
    savePreset,
    deletePreset,
    undo,
    redo,
    setCompareMode,
    setComparePreset,
  }
}

export type UseLogoConfigReturn = ReturnType<typeof useLogoConfig>

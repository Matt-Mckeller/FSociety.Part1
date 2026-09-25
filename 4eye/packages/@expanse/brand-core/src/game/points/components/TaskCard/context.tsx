/**
 * TaskCard Context
 *
 * Provides theme colors, animation settings, and defaults
 * for all TaskCard components.
 */

"use client"

import React, { createContext, useContext, useMemo } from "react"
import { useTheme } from "@mui/material/styles"
import type { TaskCardContextValue } from "./types"
import {
  NEON_NAVY,
  NEON_NAVY_PAPER,
  NEON_CYAN,
  NEON_GLOW_OUTER,
  NEON_GLOW_CENTER,
  NEON_GLOW_INNER,
} from "@expanse/theme"

// ============================================================
// DEFAULT CONTEXT VALUES
// ============================================================

const defaultContextValue: TaskCardContextValue = {
  colors: {
    background: NEON_NAVY,
    backgroundSecondary: NEON_NAVY_PAPER,
    primary: NEON_CYAN,
    text: "#FFFFFF",
    textSecondary: "rgba(255, 255, 255, 0.7)",
    border: "rgba(0, 212, 255, 0.3)",
    glowOuter: NEON_GLOW_OUTER,
    glowCenter: NEON_GLOW_CENTER,
    glowInner: NEON_GLOW_INNER,
  },
  animation: {
    duration: 300,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  defaults: {
    width: 300,
    height: 180,
  },
}

// ============================================================
// CONTEXT
// ============================================================

const TaskCardContext = createContext<TaskCardContextValue>(defaultContextValue)

// ============================================================
// PROVIDER
// ============================================================

export interface TaskCardProviderProps {
  children: React.ReactNode
  /** Override default colors */
  colors?: Partial<TaskCardContextValue["colors"]>
  /** Override animation settings */
  animation?: Partial<TaskCardContextValue["animation"]>
  /** Override default dimensions */
  defaults?: Partial<TaskCardContextValue["defaults"]>
}

export function TaskCardProvider({
  children,
  colors: colorOverrides,
  animation: animationOverrides,
  defaults: defaultOverrides,
}: TaskCardProviderProps) {
  const theme = useTheme()

  // Merge with theme-aware defaults
  const value = useMemo<TaskCardContextValue>(() => {
    // Try to get colors from theme, fallback to cloud theme constants
    const palette = theme.palette
    const isDarkMode = palette.mode === "dark"

    return {
      colors: {
        background: isDarkMode
          ? (palette.background?.default ?? NEON_NAVY)
          : NEON_NAVY,
        backgroundSecondary: isDarkMode
          ? (palette.background?.paper ?? NEON_NAVY_PAPER)
          : NEON_NAVY_PAPER,
        primary: palette.primary?.main ?? NEON_CYAN,
        text: palette.text?.primary ?? "#FFFFFF",
        textSecondary: palette.text?.secondary ?? "rgba(255, 255, 255, 0.7)",
        border: `${palette.primary?.main ?? NEON_CYAN}4D`, // 30% opacity
        glowOuter: NEON_GLOW_OUTER,
        glowCenter: NEON_GLOW_CENTER,
        glowInner: NEON_GLOW_INNER,
        ...colorOverrides,
      },
      animation: {
        ...defaultContextValue.animation,
        ...animationOverrides,
      },
      defaults: {
        ...defaultContextValue.defaults,
        ...defaultOverrides,
      },
    }
  }, [theme, colorOverrides, animationOverrides, defaultOverrides])

  return (
    <TaskCardContext.Provider value={value}>
      {children}
    </TaskCardContext.Provider>
  )
}

// ============================================================
// HOOK
// ============================================================

/**
 * Access TaskCard context values
 * Falls back to defaults if used outside provider
 */
export function useTaskCardContext(): TaskCardContextValue {
  const context = useContext(TaskCardContext)
  return context ?? defaultContextValue
}

// Export context for advanced use cases
export { TaskCardContext }

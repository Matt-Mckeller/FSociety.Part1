"use client";
/**
 * Accessibility Utilities
 * 
 * WCAG 2.1 AA compliance helpers for layout components
 */

import { useEffect, useCallback, useRef } from "react"

// =============================================================================
// ARIA Label Utilities
// =============================================================================

/**
 * Generate accessible labels for navigation directions
 */
export const navigationLabels = {
  up: "Navigate up",
  down: "Navigate down",
  left: "Navigate left",
  right: "Navigate right",
  home: "Go to home",
  back: "Go back",
} as const

/**
 * Generate ARIA live region announcement
 */
export function createNavigationAnnouncement(
  direction: keyof typeof navigationLabels,
  position?: { x: number; y: number }
): string {
  const action = navigationLabels[direction]
  if (position) {
    return `${action}. Now at position ${position.x}, ${position.y}`
  }
  return action
}

/**
 * Generate minimap tile label
 */
export function createMinimapTileLabel(
  x: number,
  y: number,
  isCurrent: boolean,
  isActive: boolean
): string {
  const parts = [`Tile at position  ${x}, ${y}`]
  
  if (isCurrent) {
    parts.push("Current position")
  }
  if (isActive) {
    parts.push("Active")
  } else {
    parts.push("Inactive")
  }
  
  return parts.join(". ")
}

// =============================================================================
// Keyboard Navigation Utilities
// =============================================================================

export type KeyboardKey = 
  | "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
  | "w" | "a" | "s" | "d"
  | "W" | "A" | "S" | "D"
  | "Home" | "Escape"
  | "Enter" | "Space"
  | "Tab"

export type NavigationDirection = "up" | "down" | "left" | "right" | "home" | "back"

/**
 * Map keyboard keys to navigation directions
 */
export function getNavigationDirection(key: string): NavigationDirection | null {
  const keyMap: Record<string, NavigationDirection> = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    w: "up",
    W: "up",
    s: "down",
    S: "down",
    a: "left",
    A: "left",
    d: "right",
    D: "right",
    Home: "home",
    Escape: "back",
  }
  
  return keyMap[key] || null
}

/**
 * Check if a key should trigger an action (Enter or Space)
 */
export function isActionKey(key: string): boolean {
  return key === "Enter" || key === " " || key === "Space"
}

// =============================================================================
// Focus Management
// =============================================================================

/**
 * Hook for managing focus trap in modal/overlay contexts
 */
export function useFocusTrap(active: boolean) {
  const containerRef = useRef<HTMLElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active || !containerRef.current) return

    // Save the currently focused element
    previousFocusRef.current = document.activeElement as HTMLElement

    // Get all focusable elements
    const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements.length === 0) return

    // Focus the first element
    focusableElements[0]?.focus()

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        // Shift + Tab: Move focus backwards
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        // Tab: Move focus forwards
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      
      // Restore focus to the previously focused element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [active])

  return containerRef
}

/**
 * Hook for managing focus restoration after navigation
 */
export function useFocusRestoration() {
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const saveFocus = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement
  }, [])

  const restoreFocus = useCallback(() => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus()
      previousFocusRef.current = null
    }
  }, [])

  return { saveFocus, restoreFocus }
}

// =============================================================================
// Live Region Announcements
// =============================================================================

/**
 * Hook for creating ARIA live region announcements
 */
export function useAnnouncer() {
  const announcerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Create live region if it doesn't exist
    if (!announcerRef.current) {
      const announcer = document.createElement("div")
      announcer.setAttribute("role", "status")
      announcer.setAttribute("aria-live", "polite")
      announcer.setAttribute("aria-atomic", "true")
      announcer.style.position = "absolute"
      announcer.style.left = "-10000px"
      announcer.style.width = "1px"
      announcer.style.height = "1px"
      announcer.style.overflow = "hidden"
      document.body.appendChild(announcer)
      announcerRef.current = announcer
    }

    return () => {
      // Cleanup on unmount
      if (announcerRef.current) {
        document.body.removeChild(announcerRef.current)
        announcerRef.current = null
      }
    }
  }, [])

  const announce = useCallback((message: string, priority: "polite" | "assertive" = "polite") => {
    if (announcerRef.current) {
      announcerRef.current.setAttribute("aria-live", priority)
      announcerRef.current.textContent = message
      
      // Clear after announcement to allow repeated announcements
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = ""
        }
      }, 1000)
    }
  }, [])

  return announce
}

/**
 * Hook for keyboard navigation with announcements
 */
export function useAccessibleNavigation(
  onNavigate: (direction: NavigationDirection) => void,
  enabled = true
) {
  const announce = useAnnouncer()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return

      const direction = getNavigationDirection(e.key)
      if (direction) {
        e.preventDefault()
        onNavigate(direction)
        announce(createNavigationAnnouncement(direction))
      }
    },
    [onNavigate, enabled, announce]
  )

  useEffect(() => {
    if (!enabled) return

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown, enabled])
}

// =============================================================================
// Skip Link Utilities
// =============================================================================

/**
 * Props for skip link component
 */
export interface SkipLinkProps {
  href: string
  label: string
}

/**
 * Generate skip link data for layout regions
 */
export function createSkipLinks(): SkipLinkProps[] {
  return [
    { href: "#main-content", label: "Skip to main content" },
    { href: "#navigation", label: "Skip to navigation" },
    { href: "#minimap", label: "Skip to minimap" },
  ]
}

// =============================================================================
// Color Contrast Utilities
// =============================================================================

/**
 * Check if color contrast meets WCAG AA standards (4.5:1 for normal text)
 */
export function meetsContrastRatio(
  foreground: string,
  background: string,
  requiredRatio: number = 4.5
): boolean {
  // Helper to convert hex to RGB
  const hexToRgb = (hex: string): [number, number, number] | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null
  }

  // Helper to calculate relative luminance
  const getLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      const val = c / 255
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const fgRgb = hexToRgb(foreground)
  const bgRgb = hexToRgb(background)

  if (!fgRgb || !bgRgb) return false

  const fgLuminance = getLuminance(...fgRgb)
  const bgLuminance = getLuminance(...bgRgb)

  const ratio =
    fgLuminance > bgLuminance
      ? (fgLuminance + 0.05) / (bgLuminance + 0.05)
      : (bgLuminance + 0.05) / (fgLuminance + 0.05)

  return ratio >= requiredRatio
}

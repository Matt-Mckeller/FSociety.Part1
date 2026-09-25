"use client"

import { useEffect } from "react"
import type { Direction, InputConfig } from "../types"
import { DEFAULT_KEY_BINDINGS, DEFAULT_INPUT_CONFIG } from "../types"
import type { HudInputContextValue, HudInputEvent } from "../contexts/HudInputContext"

export interface KeyboardNavigationConfig {
  inputConfig?: InputConfig
  navigate: (direction: Direction) => void
  goHome: () => void
  goBack: () => void
  canNavigate: (direction: Direction) => boolean
  /**
   * Optional HUD input dispatcher. When provided, every keyboard event is
   * first translated into a logical `HudInputEvent` and offered to the input
   * stack. If a registered handler consumes it (returns `true`), the
   * default grid navigation behavior is suppressed for that key press.
   *
   * Lets surfaces like the home slideshow temporarily "take over" arrow
   * keys without any extra `window.keydown` listener.
   */
  hudInput?: HudInputContextValue | null
}

/**
 * Map a navigation key bucket to its logical HudInputEvent.
 *
 * Returns `null` for buckets that aren't part of the public HUD input
 * vocabulary (none today — kept for forward-compatibility with custom
 * bindings users might add via `inputConfig.keyboard.bindings`).
 */
function bucketToHudInputEvent(bucket: string): HudInputEvent | null {
  switch (bucket) {
    case "up":
    case "down":
    case "left":
    case "right":
      return { kind: "direction", direction: bucket }
    case "home":
      return { kind: "action", action: "home" }
    case "back":
      return { kind: "action", action: "back" }
    default:
      return null
  }
}

/**
 * Keyboard navigation handler
 *
 * Attaches keyboard event listeners for grid navigation.
 * Respects focus state to avoid interfering with form inputs.
 *
 * When a `hudInput` dispatcher is supplied, registered HUD input handlers
 * get first crack at each event (top-of-stack first). The hook only falls
 * through to `navigate` / `goHome` / `goBack` when no handler consumes
 * the event.
 */
export function useKeyboardNavigation({
  inputConfig,
  navigate,
  goHome,
  goBack,
  canNavigate,
  hudInput,
}: KeyboardNavigationConfig): void {
  const keyboardConfig = {
    ...DEFAULT_INPUT_CONFIG.keyboard,
    ...inputConfig?.keyboard,
  }

  useEffect(() => {
    if (!keyboardConfig.enabled) return

    const keyBindings = { ...DEFAULT_KEY_BINDINGS, ...keyboardConfig.bindings }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Respect focus - don't navigate when typing
      if (keyboardConfig.respectFocus !== false) {
        const target = e.target as HTMLElement
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return
        }
      }

      // Check direction keys
      for (const [bucket, keys] of Object.entries(keyBindings)) {
        if (!keys.includes(e.key)) continue

        // Give the HUD input stack first crack. If a registered handler
        // consumes the event, we skip the default grid behavior.
        if (hudInput) {
          const event = bucketToHudInputEvent(bucket)
          if (event && hudInput.dispatch(event)) {
            e.preventDefault()
            return
          }
        }

        if (bucket === "home") {
          e.preventDefault()
          goHome()
          return
        }
        if (bucket === "back") {
          e.preventDefault()
          goBack()
          return
        }
        if (["up", "down", "left", "right"].includes(bucket)) {
          const dir = bucket as Direction
          if (canNavigate(dir)) {
            e.preventDefault()
            navigate(dir)
          }
          return
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [keyboardConfig, navigate, goHome, goBack, canNavigate, hudInput])
}

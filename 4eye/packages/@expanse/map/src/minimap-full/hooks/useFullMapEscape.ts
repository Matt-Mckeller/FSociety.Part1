"use client"

import { useEffect } from "react"
import { useFocusRestoration } from "@expanse/ui"

export interface UseFullMapEscapeOptions {
  /** Whether the map view is currently mounted/open. */
  active: boolean
  /** Called when the user presses Escape. */
  onExit: () => void
  /**
   * When true, the previously focused element is captured on activation and
   * restored on deactivation/unmount. Defaults to true.
   */
  restoreFocus?: boolean
}

/**
 * Esc-to-exit + focus restoration for `MinimapFullView`.
 *
 * - Listens for `Escape` while `active` is true.
 * - Captures `document.activeElement` when the view opens and restores it
 *   when the view closes/unmounts (so opening from the minimap fullscreen
 *   button returns focus there on exit).
 *
 * Intentionally does NOT trap focus — that belongs to the modal/portal
 * integration layer (Phase 4) and lives behind `useFocusTrap` in the
 * shared accessibility utils.
 */
export function useFullMapEscape({
  active,
  onExit,
  restoreFocus = true,
}: UseFullMapEscapeOptions): void {
  const { saveFocus, restoreFocus: restore } = useFocusRestoration()

  useEffect(() => {
    if (!active) return

    if (restoreFocus) saveFocus()

    const handler = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      event.stopPropagation()
      onExit()
    }

    window.addEventListener("keydown", handler)
    return () => {
      window.removeEventListener("keydown", handler)
      if (restoreFocus) restore()
    }
  }, [active, onExit, restoreFocus, saveFocus, restore])
}

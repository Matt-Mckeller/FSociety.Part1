import type { ReactNode } from "react"

import { useHudChromeVisibility } from "../slots"

/**
 * Conditionally render `children` based on the HUD chrome-visibility
 * registry. Used by FullHud to let descendants hide whole chrome surfaces
 * (top row, left rail, right rail) without re-engineering the layout tree.
 *
 * Must be rendered inside `HudChromeVisibilityProvider`.
 */
export function ChromeGate({
  id,
  children,
}: {
  id: "topRow" | "leftRail" | "rightRail"
  children: ReactNode
}) {
  const { hidden } = useHudChromeVisibility()
  if (hidden[id]) return null
  return <>{children}</>
}

import { CompactStatusBar } from "@expanse/brand-core"

import { useHudBarSizes } from "../slots"

/**
 * CompactStatusBar (currency-anchored, expands horizontally on hover) is
 * used across all breakpoints so the always-visible value matches between
 * mobile and desktop. `barSizes.header` already adapts per breakpoint, so
 * the bar shrinks naturally on narrow viewports.
 */
export function ResponsiveHudStatus() {
  const barSizes = useHudBarSizes()
  return (
    <CompactStatusBar
      barHeight={barSizes.header}
      variant="default"
      expandable
      expansionTrigger="hover"
      expansionDirection="right"
    />
  )
}

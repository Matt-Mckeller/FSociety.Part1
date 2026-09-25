/**
 * Local stub for `expanse.ui/points/components`.
 *
 * Provides placeholder named exports so that the upstream `./components`
 * barrel can resolve in Storybook even though the real components live in
 * a not-yet-migrated package. Each placeholder renders a small badge so
 * accidental usage in a story is visible rather than silent.
 *
 * Delete alongside `./points.ts` when the real package is migrated.
 */

import * as React from "react"
import { Box, Typography } from "@mui/material"

function makePlaceholder(name: string) {
  const Component: React.FC<Record<string, unknown>> = () =>
    React.createElement(
      Box,
      {
        sx: {
          px: 1.25,
          py: 0.5,
          border: "1px dashed rgba(255,255,255,0.4)",
          borderRadius: 1,
          color: "rgba(255,255,255,0.7)",
          display: "inline-block",
        },
      },
      React.createElement(
        Typography,
        { variant: "caption" },
        `[stub: ${name}]`,
      ),
    )
  Component.displayName = `Stub(${name})`
  return Component
}

export const PointSlider = makePlaceholder("PointSlider")
export const PointsTable = makePlaceholder("PointsTable")
export const TicketCard = makePlaceholder("TicketCard")
export const TicketWithSlider = makePlaceholder("TicketWithSlider")
export const PointsChart = makePlaceholder("PointsChart")
export const PointExampleSection = makePlaceholder("PointExampleSection")

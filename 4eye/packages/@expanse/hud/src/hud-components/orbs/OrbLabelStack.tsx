"use client"

/**
 * OrbLabelStack — column wrapper that places an external label beneath a
 * circular orb (the `circle-below` layout mode). Used by ActionOrb only when
 * `showInlineLabel + labelPosition="below"` is requested without an explicit
 * `pill` shape.
 */

import { Box } from "@mui/material"
import type { ReactNode } from "react"

export interface OrbLabelStackProps {
  children: ReactNode
  label: string
  fontSize: number
  /** Resolved icon / text color (matches the orb's mode). */
  textColor: string
  /** Optional absolute position styles applied to the wrapper. */
  positionStyles?: { position?: "absolute"; left?: number; top?: number }
}

export function OrbLabelStack({
  children,
  label,
  fontSize,
  textColor,
  positionStyles,
}: OrbLabelStackProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.75,
        ...positionStyles,
      }}
    >
      {children}
      <Box
        component="span"
        sx={{
          fontSize,
          fontWeight: 600,
          letterSpacing: 0.2,
          lineHeight: 1,
          whiteSpace: "nowrap",
          color: textColor,
        }}
      >
        {label}
      </Box>
    </Box>
  )
}

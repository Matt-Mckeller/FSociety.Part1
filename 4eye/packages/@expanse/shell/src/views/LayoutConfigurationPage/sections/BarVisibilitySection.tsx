"use client"

import React from "react"
import { FormControlLabel, Stack, Switch } from "@mui/material"
import type { SettingsSection } from "../../SettingsPage/SettingsPage"

interface BarVisibilitySectionProps {
  top: boolean
  left: boolean
  right: boolean
  bottom: boolean
  onUpdate: (bar: "top" | "left" | "right" | "bottom", visible: boolean) => void
}

export function useBarVisibilitySection({
  top,
  left,
  right,
  bottom,
  onUpdate,
}: BarVisibilitySectionProps): SettingsSection {
  return {
    id: "bars",
    title: "Bar Visibility",
    description: "Show or hide layout bars (top, left, right, bottom)",
    content: (
      <Stack spacing={2}>
        <FormControlLabel
          control={<Switch checked={top} onChange={(e) => onUpdate("top", e.target.checked)} />}
          label="Top Bar"
        />
        <FormControlLabel
          control={<Switch checked={left} onChange={(e) => onUpdate("left", e.target.checked)} />}
          label="Left Bar"
        />
        <FormControlLabel
          control={<Switch checked={right} onChange={(e) => onUpdate("right", e.target.checked)} />}
          label="Right Bar"
        />
        <FormControlLabel
          control={<Switch checked={bottom} onChange={(e) => onUpdate("bottom", e.target.checked)} />}
          label="Bottom Bar"
        />
      </Stack>
    ),
  }
}

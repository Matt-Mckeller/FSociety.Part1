"use client"

import React from "react"
import { FormControlLabel, Stack, Switch, Typography } from "@mui/material"
import type { SettingsSection } from "../../SettingsPage/SettingsPage"

interface NavControlsSectionProps {
  showNavigationControls: boolean
  onToggle: (value: boolean) => void
}

export function useNavControlsSection({
  showNavigationControls,
  onToggle,
}: NavControlsSectionProps): SettingsSection {
  return {
    id: "nav-controls",
    title: "Navigation Controls",
    description: "Configure the navigation arrow pad",
    content: (
      <Stack spacing={2}>
        <FormControlLabel
          control={
            <Switch
              checked={showNavigationControls}
              onChange={(e) => onToggle(e.target.checked)}
            />
          }
          label="Show Navigation Controls (Arrow Pad)"
        />
        {showNavigationControls && (
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              pl: 4
            }}>
            Arrow pad for navigating between tiles
          </Typography>
        )}
      </Stack>
    ),
  };
}

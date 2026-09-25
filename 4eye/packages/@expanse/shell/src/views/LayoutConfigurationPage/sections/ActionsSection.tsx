"use client"

import React from "react"
import { Box, Button, Typography } from "@mui/material"
import type { SettingsSection } from "../../SettingsPage/SettingsPage"

interface ActionsSectionProps {
  onReset: () => void
}

export function useActionsSection({ onReset }: ActionsSectionProps): SettingsSection {
  return {
    id: "actions",
    title: "Actions",
    description: "Reset configuration to defaults",
    content: (
      <Box>
        <Button variant="outlined" color="warning" onClick={onReset}>
          Reset to Defaults
        </Button>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            display: "block",
            mt: 1
          }}>
          This will restore all settings to their default values
        </Typography>
      </Box>
    ),
  };
}

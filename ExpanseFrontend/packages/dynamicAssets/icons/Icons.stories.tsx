import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper } from "@mui/material"
import { DeploymentIcon } from "./DeploymentIcon"

/**
 * Custom icon components for the application.
 * These icons are SVG-based and support theming.
 */
const meta: Meta = {
  title: "DynamicAssets/Icons",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

// ============================================================================
// DeploymentIcon
// ============================================================================

export const DeploymentIconDefault: StoryObj = {
  name: "DeploymentIcon - Default",
  render: () => (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h6" mb={3}>
        Deployment Icon
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        An icon representing deployment/CI-CD pipeline. Uses theme primary color
        by default.
      </Typography>
      <DeploymentIcon />
    </Box>
  ),
}

export const DeploymentIconColors: StoryObj = {
  name: "DeploymentIcon - Color Variants",
  render: () => (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" mb={3}>
        Deployment Icon - Color Variants
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
          { color: undefined, label: "Theme Primary" },
          { color: "#6366f1", label: "Indigo" },
          { color: "#22c55e", label: "Green" },
          { color: "#f59e0b", label: "Amber" },
          { color: "#ef4444", label: "Red" },
          { color: "#8b5cf6", label: "Violet" },
        ].map(({ color, label }) => (
          <Paper key={label} sx={{ p: 3, textAlign: "center", minWidth: 100 }}>
            <DeploymentIcon color={color} />
            <Typography variant="caption" display="block" mt={1}>
              {label}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  ),
}

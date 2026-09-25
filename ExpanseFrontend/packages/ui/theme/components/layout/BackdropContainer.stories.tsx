"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography } from "@mui/material"
import { BackdropContainer } from "./backdrop-container.compnent"

/**
 * A full-screen backdrop container typically used for loading states.
 * Centers content both horizontally and vertically with a semi-transparent background.
 */
const meta: Meta<typeof BackdropContainer> = {
  title: "Theme/Layout/BackdropContainer",
  component: BackdropContainer,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof BackdropContainer>

export const Default: Story = {
  name: "Default",
  render: () => (
    <Box sx={{ position: "relative", height: "400px", overflow: "hidden" }}>
      {/* Background content to show backdrop effect */}
      <Box sx={{ p: 4 }}>
        <Typography variant="h4">Page Content Behind Backdrop</Typography>
        <Typography>
          This content is behind the backdrop overlay. The backdrop provides a
          semi-transparent layer that prevents interaction with the content
          below.
        </Typography>
      </Box>
      {/* Backdrop positioned relative to container for demo */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "background.backdrop",
          zIndex: 9999,
        }}
      >
        <Typography variant="h5" sx={{ color: "common.white" }}>
          Loading...
        </Typography>
      </Box>
    </Box>
  ),
}

export const WithLoadingSpinner: Story = {
  name: "With Loading Spinner (Simulated)",
  render: () => (
    <Box sx={{ position: "relative", height: "400px", overflow: "hidden" }}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4">Application Content</Typography>
        <Typography>Content that appears behind the loading overlay.</Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "background.backdrop",
          zIndex: 9999,
          gap: 2,
        }}
      >
        {/* Simulated spinner */}
        <Box
          sx={{
            width: 48,
            height: 48,
            border: "4px solid",
            borderColor: "primary.main",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            "@keyframes spin": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        />
        <Typography sx={{ color: "common.white" }}>Please wait...</Typography>
      </Box>
    </Box>
  ),
}

export const BackdropColors: Story = {
  name: "Backdrop Color Comparison",
  render: () => (
    <Box sx={{ display: "flex", gap: 2, p: 2 }}>
      <Box sx={{ position: "relative", height: "200px", width: "200px", border: "1px solid", borderColor: "divider" }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="caption">Background content</Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography variant="caption" sx={{ color: "white" }}>50% opacity</Typography>
        </Box>
      </Box>
      
      <Box sx={{ position: "relative", height: "200px", width: "200px", border: "1px solid", borderColor: "divider" }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="caption">Background content</Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "background.backdrop",
          }}
        >
          <Typography variant="caption" sx={{ color: "white" }}>Theme backdrop</Typography>
        </Box>
      </Box>
      
      <Box sx={{ position: "relative", height: "200px", width: "200px", border: "1px solid", borderColor: "divider" }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="caption">Background content</Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <Typography variant="caption" sx={{ color: "white" }}>80% opacity</Typography>
        </Box>
      </Box>
    </Box>
  ),
}

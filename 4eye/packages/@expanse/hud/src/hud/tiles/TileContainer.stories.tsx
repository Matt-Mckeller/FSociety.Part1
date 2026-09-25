import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Box, Stack, Typography } from "@mui/material"

import type { MapGridNavigationConfig } from "@expanse/map"
import { FullHud } from "../full-hud/FullHud"
import { TileContainer } from "./TileContainer"

// =============================================================================
// Setup
// =============================================================================

const navConfig: MapGridNavigationConfig = {
  dimensions: { width: 2, height: 1, homePosition: { x: 0, y: 0 }, wrapAround: false },
  tiles: [
    {
      id: "fit",
      position: { x: 0, y: 0 },
      seo: { title: "Fit Mode" },
      display: {
        label: "Fit",
        category: "primary",
        colors: { inactive: "rgba(76,175,80,0.4)", active: "#4caf50" },
      },
    },
    {
      id: "scroll",
      position: { x: 1, y: 0 },
      seo: { title: "Scroll Mode" },
      display: {
        label: "Scroll",
        category: "primary",
        colors: { inactive: "rgba(156,39,176,0.4)", active: "#9c27b0" },
      },
    },
  ],
}

// =============================================================================
// Demo pages
// =============================================================================

function FitPage() {
  return (
    <TileContainer mode="fit" debug>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(76,175,80,0.06)",
          border: "2px solid rgba(76,175,80,0.4)",
          borderRadius: 2,
        }}
      >
        <Stack spacing={1} sx={{
          alignItems: "center"
        }}>
          <Typography variant="h4">Fit Mode</Typography>
          <Typography variant="body2" sx={{
            color: "text.secondary"
          }}>
            Bound on all four sides. No scrolling.
          </Typography>
          <Typography variant="caption" sx={{
            color: "text.secondary"
          }}>
            Bottom edge tracks chrome height (try opening AI chat).
          </Typography>
        </Stack>
      </Box>
    </TileContainer>
  );
}

function ScrollPage() {
  return (
    <TileContainer mode="scroll" debug>
      <Stack
        spacing={3}
        sx={{ p: 4, maxWidth: 720, mx: "auto", pt: 6 }}
      >
        <Typography variant="h4">Scroll Mode</Typography>
        <Typography variant="body2" sx={{
          color: "text.secondary"
        }}>
          Content runs to the viewport bottom and flows under the floating
          chrome. Padding is auto-sized to the chrome so the last block
          can be scrolled clear. Resize the AI input bar (or open chat) —
          padding updates with a smooth transition.
        </Typography>
        {Array.from({ length: 30 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              p: 3,
              borderRadius: 1,
              bgcolor: "rgba(156,39,176,0.06)",
              border: "1px solid rgba(156,39,176,0.25)",
            }}
          >
            <Typography variant="subtitle2">Block {i + 1}</Typography>
            <Typography variant="body2" sx={{
              color: "text.secondary"
            }}>
              The fade mask at the bottom signals more content below.
            </Typography>
          </Box>
        ))}
      </Stack>
    </TileContainer>
  );
}

const PAGES = { fit: <FitPage />, scroll: <ScrollPage /> }

// =============================================================================
// Stories
// =============================================================================

const meta: Meta = {
  title: "Layout Systems/HUD/TileContainer",
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
  },
}
export default meta

type Story = StoryObj

export const FitVsScroll: Story = {
  name: "Fit vs Scroll (debug)",
  render: () => <FullHud navigationConfig={navConfig} pages={PAGES} debugInsets />,
}

export const FitOnly: Story = {
  name: "Fit Mode",
  render: () => (
    <FullHud
      navigationConfig={{
        ...navConfig,
        dimensions: { width: 1, height: 1, homePosition: { x: 0, y: 0 }, wrapAround: false },
        tiles: [navConfig.tiles[0]],
      }}
      pages={{ fit: <FitPage /> }}
    />
  ),
}

export const ScrollOnly: Story = {
  name: "Scroll Mode",
  render: () => (
    <FullHud
      navigationConfig={{
        ...navConfig,
        dimensions: { width: 1, height: 1, homePosition: { x: 0, y: 0 }, wrapAround: false },
        tiles: [{ ...navConfig.tiles[1], position: { x: 0, y: 0 } }],
      }}
      pages={{ scroll: <ScrollPage /> }}
    />
  ),
}

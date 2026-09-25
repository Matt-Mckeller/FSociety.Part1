import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Stack } from "@mui/material"
import { BrandProvider } from "../../context/BrandContext"
import { Portal } from "./Portal"

const meta: Meta<typeof Portal> = {
  title: "BrandCore/Composites/Portal",
  component: Portal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1a1a2e" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <BrandProvider
        config={{ primaryColor: "#00d4ff", accentColor: "#c792ea" }}
      >
        <Story />
      </BrandProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Portal
      centerX={100}
      centerY={60}
      width={150}
      depth={0.3}
      primaryColor="#00d4ff"
      secondaryColor="#c792ea"
      glow
    />
  ),
}

export const Depths: Story = {
  name: "Depth (Perspective)",
  render: () => (
    <Stack direction="row" spacing={4}>
      {[0.1, 0.2, 0.3, 0.5, 0.8].map((depth) => (
        <Box key={depth} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {depth}
          </Typography>
          <Portal
            centerX={60}
            centerY={50}
            width={80}
            depth={depth}
            primaryColor="#ff6b6b"
            secondaryColor="#ffd93d"
            glow
          />
        </Box>
      ))}
    </Stack>
  ),
}

export const RingCounts: Story = {
  render: () => (
    <Stack direction="row" spacing={4}>
      {[2, 3, 4, 5, 6].map((rings) => (
        <Box key={rings} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {rings} rings
          </Typography>
          <Portal
            centerX={60}
            centerY={40}
            width={80}
            depth={0.25}
            rings={rings}
            primaryColor="#6bffc3"
            secondaryColor="#00d4ff"
            glow
          />
        </Box>
      ))}
    </Stack>
  ),
}

export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={6}>
      {(["ground", "wall", "floating"] as const).map((variant) => (
        <Box key={variant} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {variant}
          </Typography>
          <Portal
            centerX={75}
            centerY={60}
            width={100}
            depth={variant === "wall" ? 0.8 : 0.25}
            variant={variant}
            primaryColor="#c792ea"
            secondaryColor="#00d4ff"
            glow
          />
        </Box>
      ))}
    </Stack>
  ),
}

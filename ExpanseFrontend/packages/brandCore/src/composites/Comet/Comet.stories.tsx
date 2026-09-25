import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Stack } from "@mui/material"
import { BrandProvider } from "../../context/BrandContext"
import { Comet, CometRing } from "./Comet"

const meta: Meta<typeof Comet> = {
  title: "BrandCore/Composites/Comet",
  component: Comet,
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
  render: () => <Comet size={40} color="#00d4ff" direction={0} glow />,
}

export const Directions: Story = {
  render: () => (
    <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((dir) => (
        <Box key={dir} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {dir}°
          </Typography>
          <Comet size={30} color="#00d4ff" direction={dir} glow />
        </Box>
      ))}
    </Stack>
  ),
}

export const TailVariations: Story = {
  render: () => (
    <Stack direction="row" spacing={4}>
      {[
        { length: 1, width: 0.5, label: "Short" },
        { length: 2, width: 0.6, label: "Medium" },
        { length: 3, width: 0.7, label: "Long" },
        { length: 4, width: 0.8, label: "Extra Long" },
      ].map(({ length, width, label }) => (
        <Box key={label} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {label}
          </Typography>
          <Comet
            size={25}
            color="#ff6b6b"
            tailLength={length}
            tailWidth={width}
            direction={0}
            glow
          />
        </Box>
      ))}
    </Stack>
  ),
}

export const Softness: Story = {
  render: () => (
    <Stack direction="row" spacing={4}>
      {[0, 0.25, 0.5, 0.75, 1].map((soft) => (
        <Box key={soft} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {soft}
          </Typography>
          <Comet size={30} color="#6bffc3" direction={0} softness={soft} glow />
        </Box>
      ))}
    </Stack>
  ),
}

export const Ring: Story = {
  render: () => (
    <Box sx={{ width: 300, height: 300 }}>
      <CometRing
        centerX={150}
        centerY={150}
        rx={80}
        cometSize={20}
        color="#c792ea"
        glow
      />
    </Box>
  ),
}

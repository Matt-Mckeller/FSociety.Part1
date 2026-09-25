import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Stack } from "@mui/material"
import { BrandProvider } from "../../context/BrandContext"
import { Halo } from "./Halo"

const meta: Meta<typeof Halo> = {
  title: "BrandCore/Composites/Halo",
  component: Halo,
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
    <Box sx={{ width: 200, height: 200 }}>
      <Halo centerX={100} centerY={100} radius={80} color="#ffd93d" glow />
    </Box>
  ),
}

export const TiltAngles: Story = {
  render: () => (
    <Stack direction="row" spacing={4}>
      {[0, 30, 45, 60, 75].map((tilt) => (
        <Box key={tilt} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {tilt}°
          </Typography>
          <Box sx={{ width: 100, height: 80 }}>
            <Halo
              centerX={50}
              centerY={50}
              radius={40}
              tilt={tilt}
              color="#ffd93d"
              glow
            />
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

export const RingCounts: Story = {
  render: () => (
    <Stack direction="row" spacing={4}>
      {([1, 2, 3] as const).map((count) => (
        <Box key={count} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {count} ring{count > 1 ? "s" : ""}
          </Typography>
          <Box sx={{ width: 120, height: 80 }}>
            <Halo
              centerX={60}
              centerY={50}
              radius={50}
              ringCount={count}
              tilt={60}
              color="#00d4ff"
              glow
            />
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

export const Rotations: Story = {
  render: () => (
    <Stack direction="row" spacing={3}>
      {[0, 15, 30, 45].map((rot) => (
        <Box key={rot} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "white" }}>
            {rot}°
          </Typography>
          <Box sx={{ width: 100, height: 80 }}>
            <Halo
              centerX={50}
              centerY={50}
              radius={40}
              tilt={60}
              rotation={rot}
              color="#c792ea"
              glow
            />
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

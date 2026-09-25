import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Stack } from "@mui/material"
import { BrandProvider } from "../../context/BrandContext"
import { CoinIcon } from "./CoinIcon"

const meta: Meta<typeof CoinIcon> = {
  title: "BrandCore/Composites/CoinIcon",
  component: CoinIcon,
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
    <Box sx={{ height: 100 }}>
      <CoinIcon color="#00d4ff" />
    </Box>
  ),
}

export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={3}>
      {[
        { color: "#00d4ff", name: "Cyan" },
        { color: "#ff6b6b", name: "Red" },
        { color: "#6bffc3", name: "Green" },
        { color: "#c792ea", name: "Purple" },
        { color: "#ffd93d", name: "Yellow" },
      ].map(({ color, name }) => (
        <Box key={name} sx={{ textAlign: "center" }}>
          <Box sx={{ height: 80 }}>
            <CoinIcon color={color} />
          </Box>
          <Typography variant="caption" sx={{ color: "white" }}>
            {name}
          </Typography>
        </Box>
      ))}
    </Stack>
  ),
}

export const WithText: Story = {
  render: () => (
    <Stack direction="row" spacing={4}>
      {["4", "EX", "$"].map((text) => (
        <Box key={text} sx={{ textAlign: "center" }}>
          <Box sx={{ height: 80 }}>
            <CoinIcon
              color="#00d4ff"
              text={text}
              textSize={14}
              textWeight={800}
            />
          </Box>
          <Typography variant="caption" sx={{ color: "white" }}>
            "{text}"
          </Typography>
        </Box>
      ))}
    </Stack>
  ),
}

export const WithRings: Story = {
  name: "With Orbital Rings",
  render: () => (
    <Stack direction="row" spacing={4}>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ height: 80 }}>
          <CoinIcon color="#ff6b6b" showArcs showRings={false} />
        </Box>
        <Typography variant="caption" sx={{ color: "white" }}>
          Arcs Only
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ height: 80 }}>
          <CoinIcon color="#ff6b6b" showArcs={false} showRings />
        </Box>
        <Typography variant="caption" sx={{ color: "white" }}>
          Rings Only
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ height: 80 }}>
          <CoinIcon color="#ff6b6b" showArcs showRings />
        </Box>
        <Typography variant="caption" sx={{ color: "white" }}>
          Both
        </Typography>
      </Box>
    </Stack>
  ),
}

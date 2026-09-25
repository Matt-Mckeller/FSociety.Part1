import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Button,
  Stack,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material"
import { CornerBracketFrame } from "./CornerBracketFrame"

const demoTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#00d4ff", light: "#4de8ff", contrastText: "#ffffff" },
    background: { paper: "#f5f5f5", default: "#ffffff" },
  },
})

const meta: Meta<typeof CornerBracketFrame> = {
  title: "BrandCore/Display/CornerBracketFrame",
  component: CornerBracketFrame,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
  decorators: [
    Story => (
      <ThemeProvider theme={demoTheme}>
        <Box sx={{ p: 4, bgcolor: "background.default" }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof CornerBracketFrame>

/** A neutral framed surface so the brackets are visible. */
function FramedSurface({ children }: { children?: React.ReactNode }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "min(900px, 90vw)",
        height: 480,
        bgcolor: "#fafafa",
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "text.secondary",
      }}
    >
      {children}
    </Box>
  )
}

export const Default: Story = {
  render: args => (
    <FramedSurface>
      <CornerBracketFrame {...args} />
      <Typography variant="overline">Framed content</Typography>
    </FramedSurface>
  ),
  args: {
    lengthPct: 30,
    thickness: 2,
    inset: 12,
    variant: "tripleLayer",
    layerRatio: "7:3:1",
    animateOnMount: true,
    animationDurationMs: 600,
    active: true,
  },
}

export const SingleStroke: Story = {
  ...Default,
  args: { ...Default.args, variant: "single", thickness: 2 },
}

export const ThinAndLong: Story = {
  ...Default,
  args: { ...Default.args, lengthPct: 45, thickness: 1, layerRatio: "1:2:3" },
}

export const Compact: Story = {
  ...Default,
  args: { ...Default.args, lengthPct: 18, thickness: 2, inset: 24 },
}

export const RatioComparison: Story = {
  render: () => (
    <Stack spacing={3}>
      {(["7:3:1", "1:2:3", "1:2:1"] as const).map(ratio => (
        <Stack key={ratio} spacing={1}>
          <Typography variant="caption" sx={{ pl: 1 }}>
            layerRatio = {ratio}
          </Typography>
          <FramedSurface>
            <CornerBracketFrame layerRatio={ratio} />
            <Typography variant="overline">{ratio}</Typography>
          </FramedSurface>
        </Stack>
      ))}
    </Stack>
  ),
}

export const Toggleable: Story = {
  render: () => {
    const [active, setActive] = useState(true)
    return (
      <Stack spacing={2}>
        <Button
          variant="outlined"
          onClick={() => setActive(v => !v)}
          sx={{ alignSelf: "flex-start" }}
        >
          {active ? "Retract" : "Draw"}
        </Button>
        <FramedSurface>
          <CornerBracketFrame active={active} />
          <Typography variant="overline">
            {active ? "active" : "retracted"}
          </Typography>
        </FramedSurface>
      </Stack>
    )
  },
}

export const CustomColor: Story = {
  ...Default,
  args: { ...Default.args, color: "#5B8DEF" /* minimap "primary" soft blue */ },
}

import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Button, Paper, Stack, Typography } from "@mui/material"

import { ProfileStatusDisplay } from "./ProfileStatusDisplay"
import type { StatusBarExpansionDirection } from "./types/status.types"

/**
 * # ProfileStatusDisplay
 *
 * The opinionated 3-bar HUD composition: profile icon + currency + progress.
 * Built from the atoms documented under `BrandCore/Status`.
 *
 * Theme variants (`default | quiet | primary | ghost`) are owned by the
 * underlying `ExpandingBarTripleLayer` primitive — see its story page for the
 * variant matrix. The `variant` prop on this component just forwards to all
 * three child bars.
 */
const meta: Meta<typeof ProfileStatusDisplay> = {
  title: "BrandCore/Status/ProfileStatusDisplay",
  component: ProfileStatusDisplay,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
}

export default meta

type Story = StoryObj<typeof ProfileStatusDisplay>

const Card = ({ children }: { children: React.ReactNode }) => (
  <Paper sx={{ p: 3, bgcolor: "#f5f5f5", borderRadius: 2 }}>{children}</Paper>
)

// ============================================================================
// Defaults & layouts
// ============================================================================

export const Default: Story = {
  render: () => (
    <Card>
      <ProfileStatusDisplay layout="staircase" barHeight={28} />
    </Card>
  ),
}

export const Layouts: Story = {
  render: () => (
    <Stack direction="row" spacing={4} sx={{ alignItems: "flex-start" }}>
      {((["staircase", "horizontal"] as const)).map((layout) => (
        <Stack key={layout} spacing={1}>
          <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
            {layout}
          </Typography>
          <Card>
            <ProfileStatusDisplay layout={layout} barHeight={32} />
          </Card>
        </Stack>
      ))}
    </Stack>
  ),
}

export const SizeScale: Story = {
  render: () => (
    <Stack spacing={4}>
      {[20, 28, 36, 56].map((h) => (
        <Stack key={h} spacing={1}>
          <Typography variant="caption">barHeight={h}</Typography>
          <Card>
            <ProfileStatusDisplay layout="staircase" barHeight={h} />
          </Card>
        </Stack>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Visual states
// ============================================================================

export const VisualStates: Story = {
  render: () => (
    <Stack direction="row" spacing={4} sx={{ alignItems: "flex-start" }}>
      {((["active", "interactive", "inactive"] as const)).map((state) => (
        <Stack key={state} spacing={1}>
          <Typography variant="caption">{state}</Typography>
          <Card>
            <ProfileStatusDisplay
              layout="staircase"
              barHeight={28}
              displayState={state}
            />
          </Card>
        </Stack>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Expansion
// ============================================================================

export const ExpansionDirections: Story = {
  name: "Expansion — directions (hover)",
  render: () => {
    const directions: StatusBarExpansionDirection[] = [
      "down-left",
      "down-right",
      "up-left",
      "up-right",
      "left",
      "right",
    ]
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 4,
        }}
      >
        {directions.map((direction) => (
          <Paper
            key={direction}
            elevation={0}
            sx={{
              p: 4,
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              minHeight: 200,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ textTransform: "uppercase", mb: 2 }}
            >
              {direction}
            </Typography>
            <ProfileStatusDisplay
              layout={
                direction === "left" || direction === "right"
                  ? "horizontal"
                  : "staircase"
              }
              barHeight={28}
              expandable
              expansionTrigger="hover"
              expansionDirection={direction}
            />
          </Paper>
        ))}
      </Box>
    )
  },
}

export const ClickToExpand: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false)
    return (
      <Stack spacing={3} sx={{ alignItems: "flex-start" }}>
        <Card>
          <ProfileStatusDisplay
            layout="staircase"
            barHeight={32}
            expandable
            expansionTrigger="click"
            expanded={expanded}
            onExpandedChange={setExpanded}
          />
        </Card>
        <Button variant="contained" onClick={() => setExpanded((v) => !v)}>
          {expanded ? "Collapse" : "Expand"}
        </Button>
        <Paper sx={{ p: 2, bgcolor: "#fafafa", maxWidth: 320 }}>
          <Typography variant="caption" component="div">
            <strong>GSAP timing</strong>
            <br />• Expand: 180ms (power2.out)
            <br />• Collapse: 120ms (power2.in)
            <br />• Stagger: 120ms between bars
            <br />• Fill starts at 33% opacity
          </Typography>
        </Paper>
      </Stack>
    )
  },
}

// ============================================================================
// Variant passthrough — proves the bar variant propagates to all 3 children.
// Full variant matrix lives in BrandCore/Display/ExpandingBarTripleLayer.
// ============================================================================

export const WithVariant: Story = {
  name: "Variant passthrough (primary)",
  render: () => (
    <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
      <Typography variant="body2" sx={{
        color: "text.secondary"
      }}>
        <code>variant</code> is forwarded to every child bar. Full matrix:{" "}
        <code>BrandCore/Display/ExpandingBarTripleLayer</code>.
      </Typography>
      <Card>
        <ProfileStatusDisplay
          layout="horizontal"
          barHeight={36}
          variant="primary"
          expandable
          expansionDirection="right"
        />
      </Card>
    </Stack>
  ),
}

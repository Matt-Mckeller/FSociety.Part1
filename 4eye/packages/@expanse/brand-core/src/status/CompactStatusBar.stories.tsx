import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Paper, Stack, Typography } from "@mui/material"

import { CompactStatusBar } from "./CompactStatusBar"

/**
 * # CompactStatusBar
 *
 * Single-bar expandable status chip. Collapsed state shows currency only.
 * On hover (or click), the bar grows in width to reveal currency + XP +
 * character level, all inline within one pill.
 *
 * Sibling to `ProfileStatusDisplay` — both built on `ExpandingBarTripleLayer`
 * with the same theme variant contract (`default | quiet | primary | ghost`).
 */
const meta: Meta<typeof CompactStatusBar> = {
  title: "BrandCore/Status/CompactStatusBar",
  component: CompactStatusBar,
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
type Story = StoryObj<typeof CompactStatusBar>

const Card = ({ children }: { children: React.ReactNode }) => (
  <Paper sx={{ p: 3, bgcolor: "#f5f5f5", borderRadius: 2 }}>{children}</Paper>
)

// ============================================================================
// Default — hover the bar to expand
// ============================================================================

export const Default: Story = {
  render: () => (
    <Card>
      <Stack spacing={1}>
        <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
          Hover to expand
        </Typography>
        <CompactStatusBar currency={1280} xp={4250} level={12} />
      </Stack>
    </Card>
  ),
}

// ============================================================================
// Forced expanded state (controlled)
// ============================================================================

export const Expanded: Story = {
  render: () => (
    <Card>
      <CompactStatusBar currency={1280} xp={4250} level={12} expanded />
    </Card>
  ),
}

// ============================================================================
// Both directions
// ============================================================================

export const Directions: Story = {
  render: () => (
    <Stack spacing={3}>
      {(["right", "left"] as const).map((direction) => (
        <Stack key={direction} spacing={1}>
          <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
            grows {direction}
          </Typography>
          <Card>
            <Box
              sx={{
                display: "flex",
                justifyContent: direction === "left" ? "flex-end" : "flex-start"
              }}>
              <CompactStatusBar
                currency={1280}
                xp={4250}
                level={12}
                expansionDirection={direction}
              />
            </Box>
          </Card>
        </Stack>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Sizes
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <Stack spacing={3}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Stack key={size} spacing={1}>
          <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
            {size}
          </Typography>
          <Card>
            <CompactStatusBar
              size={size}
              currency={1280}
              xp={4250}
              level={12}
            />
          </Card>
        </Stack>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Variants × expanded state
// ============================================================================

export const Variants: Story = {
  render: () => (
    <Stack spacing={3}>
      {(["default", "quiet", "primary", "ghost"] as const).map((variant) => (
        <Stack key={variant} spacing={1}>
          <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
            {variant}
          </Typography>
          <Card>
            <Stack direction="row" spacing={4} sx={{
              alignItems: "center"
            }}>
              <CompactStatusBar
                variant={variant}
                currency={1280}
                xp={4250}
                level={12}
              />
              <CompactStatusBar
                variant={variant}
                currency={1280}
                xp={4250}
                level={12}
                expanded
              />
            </Stack>
          </Card>
        </Stack>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Click trigger (controlled)
// ============================================================================

export const ClickTrigger: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false)
    return (
      <Card>
        <Stack spacing={1}>
          <Typography variant="caption" sx={{ textTransform: "uppercase" }}>
            Click to toggle
          </Typography>
          <CompactStatusBar
            currency={1280}
            xp={4250}
            level={12}
            expansionTrigger="click"
            expanded={expanded}
            onExpandedChange={setExpanded}
          />
        </Stack>
      </Card>
    )
  },
}

import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Paper, Stack, Typography } from "@mui/material"

import { CurrencyStatusBarTripleLayer } from "./bars/CurrencyStatusBarTripleLayer"
import { ProgressStatusBarTripleLayer } from "./bars/ProgressStatusBarTripleLayer"
import { ProfileIconStatusBarTripleLayer } from "./bars/ProfileIconStatusBarTripleLayer"
import { ProfileStatusDisplay } from "./ProfileStatusDisplay"

/**
 * # Status
 *
 * The **Status** family represents user-state surfaces — currency, progress,
 * level, and other player-facing metrics. It's a category, not a single
 * component.
 *
 * ## Composition layers
 *
 * 1. **Atoms — individual status bars** (this file)
 *    Each bar is a domain-specific wrapper around `ExpandingBarTripleLayer`:
 *    - `CurrencyStatusBarTripleLayer` — coin / point counter
 *    - `ProgressStatusBarTripleLayer` — XP / progression bar
 *    - `ProfileIconStatusBarTripleLayer` — level badge with avatar
 *
 * 2. **Compositions** — opinionated arrangements built from the atoms.
 *    `ProfileStatusDisplay` is the canonical 3-bar staircase used in the HUD.
 *    See its dedicated story page for layouts, expansion, and animation.
 *
 * ## Design tokens
 *
 * All visual variants (`default | quiet | primary | ghost`) are owned by the
 * underlying bar primitive `ExpandingBarTripleLayer`. See its story page for
 * the full variant matrix.
 */
const meta: Meta = {
  title: "BrandCore/Status",
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
}

export default meta

type Story = StoryObj

const Card = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <Stack spacing={1} sx={{ alignItems: "flex-start" }}>
    <Typography variant="caption" sx={{
      color: "text.secondary"
    }}>
      {label}
    </Typography>
    <Paper sx={{ p: 3, bgcolor: "#f5f5f5" }}>{children}</Paper>
  </Stack>
)

/**
 * The three atomic bars that the status family is built from.
 */
export const StatusAtoms: Story = {
  name: "Atoms — individual status bars",
  render: () => (
    <Stack spacing={4} sx={{ width: 320 }}>
      <Card label="Currency">
        <Box sx={{ width: 160 }}>
          <CurrencyStatusBarTripleLayer value={1250} barHeight={28} />
        </Box>
      </Card>
      <Card label="Progress (XP)">
        <Box sx={{ width: 240 }}>
          <ProgressStatusBarTripleLayer progress={75} barHeight={28} />
        </Box>
      </Card>
      <Card label="Profile / Level">
        <Box sx={{ width: 80 }}>
          <ProfileIconStatusBarTripleLayer level={12} barHeight={28} />
        </Box>
      </Card>
    </Stack>
  ),
}

/**
 * One opinionated composition of the atoms — the 3-bar HUD display.
 * Full variant / layout / animation coverage lives on its own story page.
 */
export const ProfileStatusDisplayPreview: Story = {
  name: "Composition — ProfileStatusDisplay (preview)",
  render: () => (
    <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
      <Typography variant="body2" sx={{
        color: "text.secondary"
      }}>
        See <code>BrandCore/Status/ProfileStatusDisplay</code> for the full
        story page.
      </Typography>
      <Paper sx={{ p: 4, bgcolor: "#f5f5f5" }}>
        <ProfileStatusDisplay layout="staircase" barHeight={32} />
      </Paper>
    </Stack>
  ),
}

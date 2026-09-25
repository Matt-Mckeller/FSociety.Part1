/**
 * CountBadge — variants story
 *
 * Visualises the three tiering strategies (tiered / capacity / fixed)
 * at multiple count values, so we can compare how each one reads as
 * selection grows.
 */

import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Box, Stack, Typography } from "@mui/material"
import { CountBadge } from "./CountBadge"

const meta: Meta<typeof CountBadge> = {
  title: "Layout Systems/Primitives/CountBadge",
  component: CountBadge,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
  argTypes: {
    tier: { control: "select", options: ["tiered", "capacity", "fixed"] },
    size: { control: "select", options: ["xs", "sm", "md"] },
    accent: { control: "color" },
  },
}
export default meta
type Story = StoryObj<typeof CountBadge>

// =============================================================================
// Helpers
// =============================================================================

const COUNTS = [0, 1, 2, 3, 4, 5, 6, 9, 12]

function Row({
  label,
  description,
  accent,
  render,
}: {
  label: string
  description: string
  accent: string
  render: (count: number) => React.ReactNode
}) {
  return (
    <Stack spacing={0.75}>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {label}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </Box>
      <Stack direction="row" spacing={1.5} sx={{
        alignItems: "center"
      }}>
        {COUNTS.map((c) => (
          <Stack key={c} spacing={0.25} sx={{
            alignItems: "center"
          }}>
            {render(c)}
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {c}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

// =============================================================================
// Stories
// =============================================================================

export const AllTiers: Story = {
  render: () => (
    <Stack spacing={4} sx={{ p: 3, minWidth: 720 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          CountBadge — tiering strategies
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
          Each row shows the same badge with the same accent, but a
          different color-tier strategy. Numbers along the bottom are
          the input `count`.
        </Typography>
      </Box>

      <Row
        label='tier="tiered" (absolute brackets)'
        description="0 hidden · 1–2 neutral · 3–4 accent · 5+ amber warning. No max needed."
        accent="#3b82f6"
        render={(c) => <CountBadge count={c} tier="tiered" accent="#3b82f6" />}
      />

      <Row
        label='tier="capacity" max={5}'
        description="0 hidden · <50% neutral · ≥50% accent (shows n/m) · =max success · >max error."
        accent="#3b82f6"
        render={(c) => (
          <CountBadge count={c} tier="capacity" max={5} accent="#3b82f6" />
        )}
      />

      <Row
        label='tier="capacity" max={3} (e.g. Goals)'
        description="Tighter cap; full state fires sooner."
        accent="#3b82f6"
        render={(c) => (
          <CountBadge count={c} tier="capacity" max={3} accent="#3b82f6" />
        )}
      />

      <Row
        label='tier="fixed"'
        description="Always the accent color, no tiering. Closest to today's behavior."
        accent="#3b82f6"
        render={(c) => <CountBadge count={c} tier="fixed" accent="#3b82f6" />}
      />
    </Stack>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 3 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        Sizes
      </Typography>
      <Stack direction="row" spacing={2} sx={{
        alignItems: "center"
      }}>
        {(["xs", "sm", "md"] as const).map((s) => (
          <Stack key={s} spacing={0.5} sx={{
            alignItems: "center"
          }}>
            <CountBadge count={3} size={s} accent="#3b82f6" />
            <Typography variant="caption">{s}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  ),
}

export const PerKindAccent: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 3 }}>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          Per-kind accent (entity colors)
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Showing how the same `tiered` strategy looks with each entity-kind color.
        </Typography>
      </Box>
      <Stack direction="row" spacing={3}>
        {[
          { name: "Targets", color: "#3b82f6" },
          { name: "Audiences", color: "#22c55e" },
          { name: "Locations", color: "#ef4444" },
          { name: "Stories", color: "#f59e0b" },
          { name: "Animations", color: "#8b5cf6" },
          { name: "Scenes", color: "#ec4899" },
        ].map((k) => (
          <Stack key={k.name} spacing={0.75} sx={{
            alignItems: "center"
          }}>
            <Stack direction="row" spacing={0.75}>
              {[1, 3, 5].map((c) => (
                <CountBadge key={c} count={c} accent={k.color} tier="tiered" />
              ))}
            </Stack>
            <Typography variant="caption">{k.name}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  ),
}

export const Playground: Story = {
  args: {
    count: 3,
    max: 5,
    tier: "tiered",
    accent: "#3b82f6",
    size: "sm",
    showZero: false,
  },
}

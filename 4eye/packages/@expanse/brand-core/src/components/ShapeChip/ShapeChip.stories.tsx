/**
 * ShapeChip — every silhouette, at both scales, filled and outline.
 *
 * The chips live in the AI Chat ContextBar, where three of them sit side by
 * side inside a 24px-tall pill. That is the only context that matters for
 * judging them, so the "In a strip" story reproduces it: a dark pill, three
 * chips, real symbol colors. Comparing shapes in isolation is misleading —
 * what changes between them is how they read *as a row*.
 */

import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, ThemeProvider, Typography, createTheme } from "@mui/material"
import { ShapeChip, CHIP_SHAPES, CHIP_SHAPE_GEOMETRY, type ChipShape } from "./ShapeChip"

const demoTheme = createTheme({ palette: { mode: "dark" } })

/** Stand-in for the @4eye `Symbol` glyph — this package can't import it. */
function DemoGlyph({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r="4.5" fill="none" stroke="#fff" strokeWidth="2" />
    </svg>
  )
}

const SYMBOL_HEX = ["#fbbf24", "#60a5fa", "#a78bfa"]

const meta: Meta = {
  title: "BrandCore/Components/ShapeChip",
  tags: ["autodocs"],
  parameters: { layout: "centered", backgrounds: { default: "dark" } },
  decorators: [
    (Story) => (
      <ThemeProvider theme={demoTheme}>
        <Box sx={{ p: 4, bgcolor: "#14141c", color: "#fff" }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
}
export default meta

type Story = StoryObj

function ShapeColumn({ shape }: { shape: ChipShape }) {
  return (
    <Stack spacing={1.5} alignItems="center" sx={{ minWidth: 76 }}>
      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
        {CHIP_SHAPE_GEOMETRY[shape].label}
      </Typography>
      <ShapeChip shape={shape} scale="big" filled hex="#60a5fa" glyph={<DemoGlyph size={16} />} />
      <ShapeChip shape={shape} scale="big" hex="#60a5fa" />
      <ShapeChip shape={shape} scale="small" filled hex="#60a5fa" glyph={<DemoGlyph size={9} />} />
      <ShapeChip shape={shape} scale="small" hex="#60a5fa" />
    </Stack>
  )
}

export const AllShapes: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      {CHIP_SHAPES.map((shape) => (
        <ShapeColumn key={shape} shape={shape} />
      ))}
    </Stack>
  ),
}

/** The real context: three filled chips inside a 24px ContextBar row. */
export const InAStrip: Story = {
  render: () => (
    <Stack spacing={2}>
      {CHIP_SHAPES.map((shape) => (
        <Stack key={shape} direction="row" spacing={2} alignItems="center">
          <Typography variant="caption" sx={{ width: 72, color: "rgba(255,255,255,0.5)" }}>
            {CHIP_SHAPE_GEOMETRY[shape].label}
          </Typography>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
              height: 40,
              px: 1.5,
              borderRadius: 999,
              bgcolor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {SYMBOL_HEX.map((hex) => (
              <ShapeChip
                key={hex}
                shape={shape}
                scale="big"
                filled
                hex={hex}
                glyph={<DemoGlyph size={16} />}
              />
            ))}
          </Box>
        </Stack>
      ))}
    </Stack>
  ),
}

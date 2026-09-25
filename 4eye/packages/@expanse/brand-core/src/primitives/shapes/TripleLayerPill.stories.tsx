import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography } from "@mui/material"
import { TripleLayerPill } from "./TripleLayerPill"
import { TripleLayerPreset, ColorPreset } from "../borders/TripleLayerPath"

const meta: Meta<typeof TripleLayerPill> = {
  title: "BrandCore/Primitives/Shapes/TripleLayerPill",
  component: TripleLayerPill,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    docs: {
      description: {
        component: `# TripleLayerPill

Pure-visual primitive: a perfectly circular-capped pill (or circle when
square) drawn with the canonical brand \`TripleLayerPath\` strokes on the
outside and a fill on the inside.

- \`width\` / \`height\` are in CSS pixels (viewBox follows them, so 1 SVG
  unit = 1 CSS pixel — device-independent and crisp at every DPI).
- Default \`radius = min(w, h) / 2\` → 1:1 input renders as a perfect circle,
  any other ratio renders as a perfect pill.
- Default \`fill\` is a dark cyan→indigo gradient generated inline.

No children, no interaction. For an interactive bar with content inside,
see \`ExpandingBarTripleLayer\`.`,
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ bgcolor: "#ffffff", p: 4 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TripleLayerPill>

const Column = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 4,
    }}
  >
    {children}
  </Box>
)

const Row = ({ children }: { children: React.ReactNode }) => (
  <Box>{children}</Box>
)

// ============================================================================
// Default
// ============================================================================

export const Default: Story = {
  name: "Default",
  args: { width: 240, height: 48 },
}

// ============================================================================
// Circle (1:1)
// ============================================================================

export const Circle: Story = {
  name: "Circle (1:1)",
  args: { width: 80, height: 80 },
}

// ============================================================================
// Size scale
// ============================================================================

export const SizeScale: Story = {
  name: "Size scale (height 20 → 80, aspectRatio = 6)",
  render: () => (
    <Column>
      {[20, 28, 40, 56, 80].map((h) => (
        <Row key={h}>
          <Typography variant="caption" sx={{ color: "#333" }}>
            {h * 6} × {h}
          </Typography>
          <TripleLayerPill width={h * 6} height={h} />
        </Row>
      ))}
    </Column>
  ),
}

// ============================================================================
// Aspect ratio sweep — pill cap check
// ============================================================================

export const AspectRatios: Story = {
  name: "Aspect ratios (cap check)",
  render: () => (
    <Column>
      {[1, 2, 4, 6, 10].map((ratio) => {
        const h = 56
        return (
          <Row key={ratio}>
            <Typography variant="caption" sx={{ color: "#333" }}>
              aspectRatio = {ratio} ({ratio === 1 ? "circle" : "pill"})
            </Typography>
            <TripleLayerPill width={h * ratio} height={h} />
          </Row>
        )
      })}
    </Column>
  ),
}

// ============================================================================
// Stroke-width preset comparison
// ============================================================================

export const PresetComparison: Story = {
  name: "Stroke-width preset comparison",
  render: () => {
    const presets: TripleLayerPreset[] = [
      "1-2-3_xs",
      "1-2-3_md",
      "1-2-3_lg",
      "cloud",
      "7-3-1",
    ]
    return (
      <Column>
        {presets.map((preset) => (
          <Row key={preset}>
            <Typography variant="caption" sx={{ color: "#333" }}>
              preset = "{preset}"
            </Typography>
            <TripleLayerPill width={336} height={48} preset={preset} />
          </Row>
        ))}
      </Column>
    )
  },
}

// ============================================================================
// Color preset comparison
// ============================================================================

export const ColorPresetComparison: Story = {
  name: "Color preset comparison",
  render: () => {
    const presets: ColorPreset[] = [
      "cloudStyle",
      "brand",
      "bold",
      "subtle",
      "gold",
      "purple",
      "coral",
      "success",
    ]
    return (
      <Column>
        {presets.map((preset) => (
          <Row key={preset}>
            <Typography variant="caption" sx={{ color: "#333" }}>
              colorPreset = "{preset}"
            </Typography>
            <TripleLayerPill width={336} height={48} colorPreset={preset} />
          </Row>
        ))}
      </Column>
    )
  },
}

// ============================================================================
// Custom fill
// ============================================================================

export const CustomFill: Story = {
  name: "Custom fill (solid + transparent)",
  render: () => (
    <Column>
      <Row>
        <Typography variant="caption" sx={{ color: "#333" }}>
          fill = "#0a1f2e" (solid dark)
        </Typography>
        <TripleLayerPill width={280} height={48} fill="#0a1f2e" />
      </Row>
      <Row>
        <Typography variant="caption" sx={{ color: "#333" }}>
          fill = "transparent" (just the strokes)
        </Typography>
        <TripleLayerPill width={280} height={48} fill="transparent" />
      </Row>
      <Row>
        <Typography variant="caption" sx={{ color: "#333" }}>
          fill = "#ffffff" with colorPreset="bold"
        </Typography>
        <TripleLayerPill
          width={280}
          height={48}
          fill="#ffffff"
          colorPreset="bold"
        />
      </Row>
    </Column>
  ),
}

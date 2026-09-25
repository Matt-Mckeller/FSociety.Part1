import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Stack,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material"
import { ExpandingBar } from "./ExpandingBar"
import { ExpandingBarTripleLayer } from "./ExpandingBarTripleLayer"
import { TripleLayerPreset } from "../primitives/borders/TripleLayerPath"

// Light theme — primary cyan; pill is the dark inverse so it pops on white.
const demoTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#00d4ff", light: "#4de8ff", contrastText: "#ffffff" },
    background: { paper: "#f5f5f5", default: "#ffffff" },
  },
})

const meta: Meta<typeof ExpandingBarTripleLayer> = {
  title: "BrandCore/Display/ExpandingBarTripleLayer",
  component: ExpandingBarTripleLayer,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
    docs: {
      description: {
        component: `# ExpandingBarTripleLayer (review copy)

Reimplementation of \`ExpandingBar\` that applies the brand-core
\`TripleLayerPath\` primitive to the **outside** of a single inner pill.

Defaults match the canonical "Cloud with Gradient Fill (4-Layer Effect)" look:
\`preset="cloud"\` (12 / 5 / 2), \`colorPreset="cloudStyle"\`, dark gradient
inner fill so the pill reads as the inverse of a white background.

The original \`ExpandingBar\` is left untouched. Stories render both side-by-side
so the visual change can be reviewed directly.`,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={demoTheme}>
        {/* generous padding so the outer glow has room to render outside the bar */}
        <Box sx={{ bgcolor: "#ffffff", p: 4 }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ExpandingBarTripleLayer>

const ContentLabel = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontWeight: 600,
      fontSize: 14,
      letterSpacing: 0.3,
    }}
  >
    {children}
  </Box>
)

// Helper that gives the bar enough vertical breathing room for the halo.
const BarRow = ({
  height,
  children,
}: {
  height: number
  children: React.ReactNode
}) => (
  <Box sx={{ height, width: "100%" }}>{children}</Box>
)

// ============================================================================
// Theme variants — the canonical variant matrix lives here.
// Each variant resolves from `theme.components.TripleLayerPill.variants[v]`.
// ============================================================================

const VARIANTS = ["default", "quiet", "primary", "ghost"] as const

export const Variants: Story = {
  name: "Theme variants",
  render: () => (
    <Stack spacing={4} sx={{ width: 480 }}>
      {VARIANTS.map((variant) => (
        <Box key={variant}>
          <Typography
            variant="caption"
            sx={{ color: "#333", textTransform: "uppercase" }}
          >
            {variant}
          </Typography>
          <BarRow height={52}>
            <ExpandingBarTripleLayer aspectRatio={6} variant={variant}>
              <ContentLabel>{variant}</ContentLabel>
            </ExpandingBarTripleLayer>
          </BarRow>
        </Box>
      ))}
    </Stack>
  ),
}

export const VariantStates: Story = {
  name: "Variants × visual states",
  render: () => (
    <Stack spacing={5} sx={{ width: 640 }}>
      {VARIANTS.map((variant) => (
        <Box key={variant}>
          <Typography
            variant="caption"
            sx={{ color: "#333", textTransform: "uppercase" }}
          >
            {variant}
          </Typography>
          <Stack direction="row" spacing={2}>
            {(["active", "hovered", "inactive"] as const).map((state) => (
              <Box key={state} sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ color: "#666" }}>
                  {state}
                </Typography>
                <BarRow height={48}>
                  <ExpandingBarTripleLayer
                    aspectRatio={5}
                    variant={variant}
                    visualState={state}
                  >
                    <ContentLabel>{state}</ContentLabel>
                  </ExpandingBarTripleLayer>
                </BarRow>
              </Box>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Side-by-side comparison
// ============================================================================

export const SideBySide: Story = {
  name: "Side-by-side vs original",
  render: () => (
    <Stack spacing={6} sx={{ width: 520 }}>
      <Box>
        <Typography variant="caption" sx={{ color: "#333" }}>
          Original ExpandingBar (3-rect, 6 outer + 12 middle, no glow)
        </Typography>
        <BarRow height={56}>
          <ExpandingBar aspectRatio={6}>
            <ContentLabel>Original</ContentLabel>
          </ExpandingBar>
        </BarRow>
      </Box>

      <Box>
        <Typography variant="caption" sx={{ color: "#333" }}>
          ExpandingBarTripleLayer (cloud preset, cloudStyle colors, dark fill)
        </Typography>
        <BarRow height={56}>
          <ExpandingBarTripleLayer aspectRatio={6}>
            <ContentLabel>Triple Layer</ContentLabel>
          </ExpandingBarTripleLayer>
        </BarRow>
      </Box>
    </Stack>
  ),
}

// ============================================================================
// Visual states
// ============================================================================

export const VisualStates: Story = {
  name: "Visual states",
  render: () => (
    <Stack spacing={5} sx={{ width: 380 }}>
      {(["active", "hovered", "inactive"] as const).map((state) => (
        <Box key={state}>
          <Typography
            variant="caption"
            sx={{ color: "#333", textTransform: "capitalize" }}
          >
            {state}
          </Typography>
          <BarRow height={52}>
            <ExpandingBarTripleLayer aspectRatio={6} visualState={state}>
              <ContentLabel>{state}</ContentLabel>
            </ExpandingBarTripleLayer>
          </BarRow>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Aspect ratios — verify the pill caps stay perfectly circular
// ============================================================================

export const AspectRatios: Story = {
  name: "Aspect ratios (pill cap check)",
  render: () => (
    <Stack spacing={5} sx={{ width: 640 }}>
      {[3, 5, 8, 12].map((ratio) => (
        <Box key={ratio}>
          <Typography variant="caption" sx={{ color: "#333" }}>
            aspectRatio = {ratio}
          </Typography>
          <BarRow height={48}>
            <ExpandingBarTripleLayer aspectRatio={ratio}>
              <ContentLabel>{ratio}:1</ContentLabel>
            </ExpandingBarTripleLayer>
          </BarRow>
        </Box>
      ))}
    </Stack>
  ),
}

// ============================================================================
// Clickable + ripple (interaction preserved)
// ============================================================================

export const Clickable: Story = {
  name: "Clickable (ripple preserved)",
  render: () => {
    const [clicks, setClicks] = useState(0)
    return (
      <Stack spacing={3} sx={{ width: 340 }}>
        <Typography sx={{ color: "#333" }}>Clicks: {clicks}</Typography>
        <BarRow height={56}>
          <ExpandingBarTripleLayer
            aspectRatio={5}
            enableRipple
            onClick={() => setClicks((c) => c + 1)}
          >
            <ContentLabel>Click me</ContentLabel>
          </ExpandingBarTripleLayer>
        </BarRow>
      </Stack>
    )
  },
}

// ============================================================================
// Preset comparison
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
      <Stack spacing={5} sx={{ width: 480 }}>
        {presets.map((preset) => (
          <Box key={preset}>
            <Typography variant="caption" sx={{ color: "#333" }}>
              preset = "{preset}"
            </Typography>
            <BarRow height={52}>
              <ExpandingBarTripleLayer aspectRatio={6} preset={preset}>
                <ContentLabel>{preset}</ContentLabel>
              </ExpandingBarTripleLayer>
            </BarRow>
          </Box>
        ))}
      </Stack>
    )
  },
}

// ============================================================================
// Color preset comparison
// ============================================================================

export const ColorPresetComparison: Story = {
  name: "Color preset comparison",
  render: () => (
    <Stack spacing={5} sx={{ width: 380 }}>
      {(
        [
          "cloudStyle",
          "brand",
          "bold",
          "subtle",
          "gold",
          "purple",
          "coral",
          "success",
        ] as const
      ).map((preset) => (
        <Box key={preset}>
          <Typography variant="caption" sx={{ color: "#333" }}>
            colorPreset = "{preset}"
          </Typography>
          <BarRow height={52}>
            <ExpandingBarTripleLayer aspectRatio={6} colorPreset={preset}>
              <ContentLabel>{preset}</ContentLabel>
            </ExpandingBarTripleLayer>
          </BarRow>
        </Box>
      ))}
    </Stack>
  ),
}

import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Stack,
  Typography,
  Paper,
  Slider,
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import { ExpanseLogoV5 } from "expanse.dynamicAssets/logo/v5"
import type {
  ExpanseLogoV5Props,
  ShapeType,
  LogoVariant,
  RingExtent,
} from "expanse.dynamicAssets/logo/v5"
import { useState } from "react"

/**
 * ExpanseLogoV5 - Modular, configurable logo component
 *
 * Features:
 * - Decomposed into sub-components (Shape, OrbitalRings, BorderArcs)
 * - Variant system with presets (default, minimal, saturn, etc.)
 * - All V4 features maintained
 * - Improved opacity controls for orbital rings
 * - Full interactivity with hover/click states
 */
const meta: Meta<typeof ExpanseLogoV5> = {
  title: "Branding/Logo/ExpanseLogoV5",
  component: ExpanseLogoV5,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1a1a2e" },
        { name: "light", value: "#ffffff" },
        { name: "brand", value: "#0f3460" },
      ],
    },
  },
  argTypes: {
    // Variant
    variant: {
      control: "select",
      options: [
        "default",
        "minimal",
        "saturn",
        "portal",
        "halo",
        "coin",
        "eye",
        "interactive",
      ],
      description: "Logo variant preset",
    },

    // Shape
    shape: {
      control: "select",
      options: ["circle", "square", "triangle"],
      description: "Primary shape type",
    },
    horizontalMirror: {
      control: "boolean",
      description: "Flip logo horizontally",
    },
    squareCornerRadius: {
      control: { type: "range", min: 0, max: 50, step: 1 },
      description: "Corner radius for square shape",
    },
    triangleCornerRadius: {
      control: { type: "range", min: 0, max: 30, step: 1 },
      description: "Corner radius for triangle shape",
    },

    // Colors
    fill: {
      control: "color",
      description: "Main shape fill color",
    },
    orbitalFill: {
      control: "color",
      description: "Orbital ring color",
    },

    // 3D Mode
    is3D: {
      control: "boolean",
      description: "Enable 3D rendering with gradients",
    },
    lightDirection: {
      control: { type: "range", min: 0, max: 360, step: 15 },
      description: "Light direction (degrees)",
    },
    highlightIntensity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "3D highlight intensity",
    },

    // Orbital Rings
    showOrbitalRings: {
      control: "boolean",
      description: "Show orbital rings",
    },
    mirroredRings: {
      control: "boolean",
      description: "Show mirrored ring set",
    },
    ringExtent: {
      control: "select",
      options: [
        "compact",
        "arcEdge",
        "innerArc",
        "arcCenter",
        "outerArc",
        "moonCenter",
      ],
      description: "Ring extent preset",
    },
    orbitalOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Base orbital opacity",
    },
    orbitalOpacityScale: {
      control: { type: "range", min: 0.5, max: 3, step: 0.1 },
      description: "Opacity scale multiplier",
    },
    backRingOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Back ring opacity (behind shape)",
    },

    // Secondary Shape
    showSecondaryShape: {
      control: "boolean",
      description: "Show moon/secondary shape",
    },
    secondaryShapeSizePercent: {
      control: { type: "range", min: 10, max: 60, step: 5 },
      description: "Secondary shape size (% of primary)",
    },

    // Border Arcs
    showBorderArcs: {
      control: "boolean",
      description: "Show border arcs",
    },
    arcStyle: {
      control: "select",
      options: ["filled", "stroke"],
      description: "Arc rendering style",
    },

    // Eye Mode
    eyeMode: {
      control: "boolean",
      description: "Show eye/pupil",
    },
    pupilDirection: {
      control: { type: "range", min: 0, max: 360, step: 15 },
      description: "Pupil direction (degrees)",
    },
    pupilSize: {
      control: { type: "range", min: 0.1, max: 0.5, step: 0.05 },
      description: "Pupil size (fraction of radius)",
    },

    // Interactivity
    interactive: {
      control: "boolean",
      description: "Enable hover/click interactivity",
    },
  },
}

export default meta
type Story = StoryObj<typeof ExpanseLogoV5>

// ============================================================
// DEFAULT STORIES
// ============================================================

/**
 * Default V5 logo - matches V4 appearance
 */
export const Default: Story = {
  args: {
    height: 300,
  },
}

/**
 * 3D variant with gradient shading
 */
export const With3D: Story = {
  args: {
    height: 300,
    is3D: true,
  },
}

// ============================================================
// VARIANT PRESETS
// ============================================================

/**
 * Minimal variant - essential elements only
 */
export const VariantMinimal: Story = {
  args: {
    height: 300,
    variant: "minimal",
    showOrbitalRings: false,
    showSecondaryShape: false,
    showBorderArcs: false,
  },
}

/**
 * Saturn variant - emphasized orbital rings
 */
export const VariantSaturn: Story = {
  args: {
    height: 300,
    variant: "saturn",
    ringExtent: "moonCenter",
    orbitalOpacityScale: 2,
  },
}

/**
 * Eye variant - emphasized pupil
 */
export const VariantEye: Story = {
  args: {
    height: 300,
    eyeMode: true,
    pupilSize: 0.35,
    initialPupilScale: 0.8,
  },
}

// ============================================================
// SHAPE VARIANTS
// ============================================================

/**
 * Circle shape (default)
 */
export const CircleShape: Story = {
  args: {
    height: 300,
    shape: "circle",
  },
}

/**
 * Square shape with rounded corners
 */
export const SquareShape: Story = {
  args: {
    height: 300,
    shape: "square",
    squareCornerRadius: 20,
  },
}

/**
 * Triangle shape
 */
export const TriangleShape: Story = {
  args: {
    height: 300,
    shape: "triangle",
    triangleOrientation: "up",
    showBorderArcs: false,
  },
}

// ============================================================
// RING CONFIGURATIONS
// ============================================================

/**
 * Compact rings
 */
export const CompactRings: Story = {
  args: {
    height: 300,
    ringExtent: "compact",
  },
}

/**
 * Extended rings (moonCenter)
 */
export const ExtendedRings: Story = {
  args: {
    height: 300,
    ringExtent: "moonCenter",
  },
}

/**
 * High opacity rings
 */
export const HighOpacityRings: Story = {
  args: {
    height: 300,
    orbitalOpacityScale: 2.5,
    backRingOpacity: 0.5,
  },
}

// ============================================================
// INTERACTIVE PLAYGROUND
// ============================================================

/**
 * Interactive playground with all controls
 */
export const Playground: Story = {
  render: function PlaygroundStory(args) {
    const [shape, setShape] = useState<ShapeType>("circle")
    const [is3D, setIs3D] = useState(false)
    const [showRings, setShowRings] = useState(true)
    const [showMoon, setShowMoon] = useState(true)
    const [showArcs, setShowArcs] = useState(true)
    const [eyeMode, setEyeMode] = useState(true)
    const [ringExtent, setRingExtent] = useState<RingExtent>("arcEdge")
    const [orbitalOpacity, setOrbitalOpacity] = useState(1)
    const [opacityScale, setOpacityScale] = useState(1)

    return (
      <Stack spacing={3} sx={{ minWidth: 600, p: 2 }}>
        {/* Logo Preview */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <ExpanseLogoV5
            height={300}
            shape={shape}
            is3D={is3D}
            showOrbitalRings={showRings}
            showSecondaryShape={showMoon}
            showBorderArcs={showArcs}
            eyeMode={eyeMode}
            ringExtent={ringExtent}
            orbitalOpacity={orbitalOpacity}
            orbitalOpacityScale={opacityScale}
            interactive
          />
        </Box>

        {/* Controls */}
        <Paper sx={{ p: 2, bgcolor: "rgba(255,255,255,0.1)" }}>
          <Stack spacing={2}>
            {/* Shape Toggle */}
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.7)", mb: 1, display: "block" }}
              >
                Shape
              </Typography>
              <ToggleButtonGroup
                value={shape}
                exclusive
                onChange={(_, v) => v && setShape(v)}
                size="small"
              >
                <ToggleButton value="circle">Circle</ToggleButton>
                <ToggleButton value="square">Square</ToggleButton>
                <ToggleButton value="triangle">Triangle</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Ring Extent */}
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.7)", mb: 1, display: "block" }}
              >
                Ring Extent
              </Typography>
              <ToggleButtonGroup
                value={ringExtent}
                exclusive
                onChange={(_, v) => v && setRingExtent(v)}
                size="small"
              >
                <ToggleButton value="compact">Compact</ToggleButton>
                <ToggleButton value="arcEdge">Arc Edge</ToggleButton>
                <ToggleButton value="arcCenter">Arc Center</ToggleButton>
                <ToggleButton value="moonCenter">Moon</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Opacity Controls */}
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Orbital Opacity: {orbitalOpacity.toFixed(1)}
              </Typography>
              <Slider
                value={orbitalOpacity}
                onChange={(_, v) => setOrbitalOpacity(v as number)}
                min={0}
                max={1}
                step={0.1}
                size="small"
              />
            </Box>

            <Box>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Opacity Scale: {opacityScale.toFixed(1)}x
              </Typography>
              <Slider
                value={opacityScale}
                onChange={(_, v) => setOpacityScale(v as number)}
                min={0.5}
                max={3}
                step={0.1}
                size="small"
              />
            </Box>

            {/* Toggles */}
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <FormControlLabel
                control={
                  <Switch
                    checked={is3D}
                    onChange={(e) => setIs3D(e.target.checked)}
                  />
                }
                label="3D Mode"
                sx={{ color: "white" }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showRings}
                    onChange={(e) => setShowRings(e.target.checked)}
                  />
                }
                label="Rings"
                sx={{ color: "white" }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showMoon}
                    onChange={(e) => setShowMoon(e.target.checked)}
                  />
                }
                label="Moon"
                sx={{ color: "white" }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showArcs}
                    onChange={(e) => setShowArcs(e.target.checked)}
                  />
                }
                label="Arcs"
                sx={{ color: "white" }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={eyeMode}
                    onChange={(e) => setEyeMode(e.target.checked)}
                  />
                }
                label="Eye"
                sx={{ color: "white" }}
              />
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    )
  },
}

// ============================================================
// COMPARISON
// ============================================================

/**
 * All shapes side by side
 */
export const AllShapes: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <Box textAlign="center">
        <ExpanseLogoV5 height={200} shape="circle" />
        <Typography
          variant="caption"
          sx={{ color: "white", mt: 1, display: "block" }}
        >
          Circle
        </Typography>
      </Box>
      <Box textAlign="center">
        <ExpanseLogoV5 height={200} shape="square" />
        <Typography
          variant="caption"
          sx={{ color: "white", mt: 1, display: "block" }}
        >
          Square
        </Typography>
      </Box>
      <Box textAlign="center">
        <ExpanseLogoV5 height={200} shape="triangle" showBorderArcs={false} />
        <Typography
          variant="caption"
          sx={{ color: "white", mt: 1, display: "block" }}
        >
          Triangle
        </Typography>
      </Box>
    </Stack>
  ),
}

/**
 * 2D vs 3D comparison
 */
export const FlatVs3D: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <Box textAlign="center">
        <ExpanseLogoV5 height={200} is3D={false} />
        <Typography
          variant="caption"
          sx={{ color: "white", mt: 1, display: "block" }}
        >
          Flat 2D
        </Typography>
      </Box>
      <Box textAlign="center">
        <ExpanseLogoV5 height={200} is3D={true} />
        <Typography
          variant="caption"
          sx={{ color: "white", mt: 1, display: "block" }}
        >
          3D Mode
        </Typography>
      </Box>
    </Stack>
  ),
}

/**
 * Ring extent comparison
 */
export const RingExtentComparison: Story = {
  render: () => (
    <Stack direction="row" spacing={3} alignItems="center" flexWrap="wrap">
      {(
        ["compact", "arcEdge", "arcCenter", "outerArc", "moonCenter"] as const
      ).map((extent) => (
        <Box key={extent} textAlign="center">
          <ExpanseLogoV5 height={150} ringExtent={extent} />
          <Typography
            variant="caption"
            sx={{ color: "white", mt: 1, display: "block" }}
          >
            {extent}
          </Typography>
        </Box>
      ))}
    </Stack>
  ),
}

/**
 * Mirrored comparison
 */
export const MirroredComparison: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <Box textAlign="center">
        <ExpanseLogoV5 height={200} />
        <Typography
          variant="caption"
          sx={{ color: "white", mt: 1, display: "block" }}
        >
          Normal
        </Typography>
      </Box>
      <Box textAlign="center">
        <ExpanseLogoV5 height={200} horizontalMirror />
        <Typography
          variant="caption"
          sx={{ color: "white", mt: 1, display: "block" }}
        >
          Mirrored
        </Typography>
      </Box>
    </Stack>
  ),
}

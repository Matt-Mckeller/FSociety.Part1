import React, { useState } from "react"
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
import { ExpanseLogoV5 } from "./ExpanseLogoV5"
import type {
  ExpanseLogoV5Props,
  ShapeType,
  LogoVariant,
  RingExtent,
} from "./ExpanseLogoV5"

const meta: Meta<typeof ExpanseLogoV5> = {
  title: "BrandCore/Display/Logos/ExpanseLogoV5",
  component: ExpanseLogoV5,
  tags: ["autodocs"],
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
    fill: {
      control: "color",
      description: "Main shape fill color",
    },
    orbitalFill: {
      control: "color",
      description: "Orbital ring color",
    },
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
    showSecondaryShape: {
      control: "boolean",
      description: "Show moon/secondary shape",
    },
    secondaryShapeSizePercent: {
      control: { type: "range", min: 10, max: 60, step: 5 },
      description: "Secondary shape size (% of primary)",
    },
    showBorderArcs: {
      control: "boolean",
      description: "Show border arcs",
    },
    arcStyle: {
      control: "select",
      options: ["filled", "stroke"],
      description: "Arc rendering style",
    },
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

export const Default: Story = {
  args: {
    height: 300,
  },
}

export const With3D: Story = {
  name: "3D Mode",
  args: {
    height: 300,
    is3D: true,
  },
}

// ============================================================
// VARIANT PRESETS
// ============================================================

export const VariantMinimal: Story = {
  name: "Variant – Minimal",
  args: {
    height: 300,
    variant: "minimal",
    showOrbitalRings: false,
    showSecondaryShape: false,
    showBorderArcs: false,
  },
}

export const VariantSaturn: Story = {
  name: "Variant – Saturn",
  args: {
    height: 300,
    variant: "saturn",
    ringExtent: "moonCenter",
    orbitalOpacityScale: 2,
  },
}

export const VariantEye: Story = {
  name: "Variant – Eye",
  args: {
    height: 300,
    eyeMode: true,
    pupilSize: 0.35,
    initialPupilScale: 0.8,
  },
}

export const VariantComet: Story = {
  name: "Variant – Comet",
  args: {
    height: 300,
    variant: "comet",
    ringStyle: "comet",
    ringExtent: "moonCenter",
    mirroredRings: false,
    showPrimaryRings: true,
    cometStartAngle: 60,
    cometArcSpan: 280,
    cometSweepDirection: "cw",
    cometTaper: "easeOut",
  },
}

export const CometSweepCcw: Story = {
  name: "Comet – CCW Sweep",
  args: {
    height: 300,
    variant: "comet",
    ringStyle: "comet",
    ringExtent: "moonCenter",
    mirroredRings: false,
    showPrimaryRings: true,
    cometStartAngle: 120,
    cometArcSpan: 280,
    cometSweepDirection: "ccw",
  },
}

export const RingStyleComparison: Story = {
  name: "Comparison – Ring Styles",
  render: () => (
    <Stack direction="row" spacing={4} sx={{
      alignItems: "center"
    }}>
      <Box sx={{
        textAlign: "center"
      }}>
        <ExpanseLogoV5
          height={220}
          variant="saturn"
          ringExtent="moonCenter"
          showPrimaryRings
          mirroredRings={false}
        />
        <Typography variant="caption" sx={{ color: "white", mt: 1, display: "block" }}>
          ellipse
        </Typography>
      </Box>
      <Box sx={{
        textAlign: "center"
      }}>
        <ExpanseLogoV5
          height={220}
          variant="comet"
          ringStyle="comet"
          ringExtent="moonCenter"
          showPrimaryRings
          mirroredRings={false}
        />
        <Typography variant="caption" sx={{ color: "white", mt: 1, display: "block" }}>
          comet
        </Typography>
      </Box>
    </Stack>
  ),
}

// ============================================================
// SHAPE VARIANTS
// ============================================================

export const CircleShape: Story = {
  name: "Shape – Circle",
  args: {
    height: 300,
    shape: "circle",
  },
}

export const SquareShape: Story = {
  name: "Shape – Square",
  args: {
    height: 300,
    shape: "square",
    squareCornerRadius: 20,
  },
}

export const TriangleShape: Story = {
  name: "Shape – Triangle",
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

export const CompactRings: Story = {
  name: "Rings – Compact",
  args: {
    height: 300,
    ringExtent: "compact",
  },
}

export const ExtendedRings: Story = {
  name: "Rings – Extended (moonCenter)",
  args: {
    height: 300,
    ringExtent: "moonCenter",
  },
}

export const HighOpacityRings: Story = {
  name: "Rings – High Opacity",
  args: {
    height: 300,
    orbitalOpacityScale: 2.5,
    backRingOpacity: 0.5,
  },
}

// ============================================================
// COMPARISON GRIDS
// ============================================================

export const AllShapes: Story = {
  name: "Comparison – All Shapes",
  render: () => (
    <Stack direction="row" spacing={4} sx={{
      alignItems: "center"
    }}>
      {(["circle", "square", "triangle"] as ShapeType[]).map((shape) => (
        <Box key={shape} sx={{
          textAlign: "center"
        }}>
          <ExpanseLogoV5
            height={200}
            shape={shape}
            showBorderArcs={shape !== "triangle"}
          />
          <Typography
            variant="caption"
            sx={{ color: "white", mt: 1, display: "block", textTransform: "capitalize" }}
          >
            {shape}
          </Typography>
        </Box>
      ))}
    </Stack>
  ),
}

export const FlatVs3D: Story = {
  name: "Comparison – 2D vs 3D",
  render: () => (
    <Stack direction="row" spacing={4} sx={{
      alignItems: "center"
    }}>
      {[false, true].map((is3D) => (
        <Box key={String(is3D)} sx={{
          textAlign: "center"
        }}>
          <ExpanseLogoV5 height={200} is3D={is3D} />
          <Typography
            variant="caption"
            sx={{ color: "white", mt: 1, display: "block" }}
          >
            {is3D ? "3D Mode" : "Flat 2D"}
          </Typography>
        </Box>
      ))}
    </Stack>
  ),
}

export const RingExtentComparison: Story = {
  name: "Comparison – Ring Extents",
  render: () => (
    <Stack
      direction="row"
      spacing={3}
      sx={{
        alignItems: "center",
        flexWrap: "wrap"
      }}>
      {(["compact", "arcEdge", "arcCenter", "outerArc", "moonCenter"] as RingExtent[]).map(
        (extent) => (
          <Box key={extent} sx={{
            textAlign: "center"
          }}>
            <ExpanseLogoV5 height={150} ringExtent={extent} />
            <Typography
              variant="caption"
              sx={{ color: "white", mt: 1, display: "block" }}
            >
              {extent}
            </Typography>
          </Box>
        )
      )}
    </Stack>
  ),
}

export const MirroredComparison: Story = {
  name: "Comparison – Mirrored",
  render: () => (
    <Stack direction="row" spacing={4} sx={{
      alignItems: "center"
    }}>
      {[false, true].map((mirrored) => (
        <Box key={String(mirrored)} sx={{
          textAlign: "center"
        }}>
          <ExpanseLogoV5 height={200} horizontalMirror={mirrored} />
          <Typography
            variant="caption"
            sx={{ color: "white", mt: 1, display: "block" }}
          >
            {mirrored ? "Mirrored" : "Normal"}
          </Typography>
        </Box>
      ))}
    </Stack>
  ),
}

export const AllVariants: Story = {
  name: "Comparison – All Variants",
  render: () => (
    <Stack
      direction="row"
      spacing={3}
      sx={{
        alignItems: "center",
        flexWrap: "wrap",
        maxWidth: 900
      }}>
      {(["default", "minimal", "saturn", "portal", "halo", "coin", "eye"] as LogoVariant[]).map(
        (variant) => (
          <Box key={variant} sx={{
            textAlign: "center"
          }}>
            <ExpanseLogoV5 height={140} variant={variant} />
            <Typography
              variant="caption"
              sx={{ color: "white", mt: 1, display: "block" }}
            >
              {variant}
            </Typography>
          </Box>
        )
      )}
    </Stack>
  ),
}

// ============================================================
// INTERACTIVE PLAYGROUND
// ============================================================

export const Playground: Story = {
  name: "Playground",
  render: function PlaygroundStory() {
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
      <Stack spacing={3} sx={{ minWidth: 560, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <ExpanseLogoV5
            height={260}
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
        <Paper sx={{ p: 2, bgcolor: "rgba(255,255,255,0.08)" }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)", mb: 1, display: "block" }}>
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

            <Box>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)", mb: 1, display: "block" }}>
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

            <Box>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
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
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
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

            <Stack direction="row" spacing={2} sx={{
              flexWrap: "wrap"
            }}>
              {[
                { label: "3D Mode", value: is3D, setter: setIs3D },
                { label: "Rings", value: showRings, setter: setShowRings },
                { label: "Moon", value: showMoon, setter: setShowMoon },
                { label: "Arcs", value: showArcs, setter: setShowArcs },
                { label: "Eye", value: eyeMode, setter: setEyeMode },
              ].map(({ label, value, setter }) => (
                <FormControlLabel
                  key={label}
                  control={
                    <Switch
                      checked={value}
                      onChange={(e) => setter(e.target.checked)}
                    />
                  }
                  label={label}
                  sx={{ color: "white" }}
                />
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    );
  },
}

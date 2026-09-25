import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Stack,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  Button,
  Chip,
} from "@mui/material"
import { ExpanseLogoV4, ExpanseLogoV4_3D } from "expanse.dynamicAssets/logo"
import { useState } from "react"
import type {
  LogoShape,
  TriangleOrientation,
} from "expanse.dynamicAssets/logo/shapes"

/**
 * ExpanseLogoV4 - Enhanced logo with shape variants and mirroring
 *
 * Features:
 * - Shape variants: circle (default), square, triangle
 * - Horizontal mirroring for reversed layouts
 * - All V3 features: orbital rings, eye mode, interactivity
 * - 2D (flat) and 3D (gradient) variants
 */
const meta: Meta<typeof ExpanseLogoV4_3D> = {
  title: "Branding/Logo/ExpanseLogoV4",
  component: ExpanseLogoV4_3D,
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
    // V4 New Props
    shape: {
      control: "select",
      options: ["circle", "square", "triangle"],
      description: "Primary shape variant",
    },
    horizontalMirror: {
      control: "boolean",
      description: "Flip the logo horizontally",
    },
    squareCornerRadius: {
      control: { type: "range", min: 0, max: 50, step: 1 },
      description: "Corner radius for square shape",
    },
    triangleCornerRadius: {
      control: { type: "range", min: 0, max: 30, step: 1 },
      description: "Corner radius for triangle vertices",
    },
    triangleOrientation: {
      control: "select",
      options: ["up", "down", "left", "right"],
      description: "Triangle orientation (apex direction)",
    },
    // Inherited from V3
    height: {
      control: { type: "range", min: 100, max: 500, step: 10 },
      description: "Logo height",
    },
    fill: {
      control: "color",
      description: "Main shape fill color",
    },
    orbitalFill: {
      control: "color",
      description: "Orbital ring stroke color",
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
    mirroredRings: {
      control: "boolean",
      description: "Show mirrored rings (X-pattern)",
    },
    showMoon: {
      control: "boolean",
      description: "Show the moon element",
    },
    showArcSegments: {
      control: "boolean",
      description: "Show decorative arc segments",
    },
    arcStyle: {
      control: "select",
      options: ["filled", "stroke"],
      description:
        "Arc segment rendering style (filled wedges or rounded strokes)",
    },
    arcStrokeWidth: {
      control: { type: "range", min: 2, max: 20, step: 1 },
      description: "Stroke width when arcStyle is 'stroke'",
    },
    eyeMode: {
      control: "boolean",
      description: "Show eye/pupil on sphere",
    },
  },
}

export default meta
type Story = StoryObj<typeof ExpanseLogoV4_3D>

// ============================================================
// DEFAULT STORIES
// ============================================================

/**
 * Default 3D logo with circle shape (matches V3 behavior)
 */
export const Default: Story = {
  args: {
    height: 300,
  },
}

/**
 * Flat 2D variant without gradient shading
 */
export const Flat2D: Story = {
  render: (args) => <ExpanseLogoV4 {...args} />,
  args: {
    height: 300,
  },
}

// ============================================================
// SHAPE VARIANTS
// ============================================================

/**
 * Circle shape (default) - matches V3 appearance
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
 * Square shape with sharp corners
 */
export const SquareSharpCorners: Story = {
  args: {
    height: 300,
    shape: "square",
    squareCornerRadius: 0,
  },
}

/**
 * Triangle shape (apex at top)
 */
export const TriangleShape: Story = {
  args: {
    height: 300,
    shape: "triangle",
    triangleOrientation: "up",
    showArcSegments: false,
  },
}

/**
 * Triangle pointing down
 */
export const TriangleDown: Story = {
  args: {
    height: 300,
    shape: "triangle",
    triangleOrientation: "down",
    showArcSegments: false,
  },
}

// ============================================================
// MIRRORED VARIANTS
// ============================================================

/**
 * Circle shape, horizontally mirrored
 */
export const MirroredCircle: Story = {
  args: {
    height: 300,
    shape: "circle",
    horizontalMirror: true,
  },
}

/**
 * Square shape, horizontally mirrored
 */
export const MirroredSquare: Story = {
  args: {
    height: 300,
    shape: "square",
    horizontalMirror: true,
  },
}

/**
 * Triangle shape, horizontally mirrored
 */
export const MirroredTriangle: Story = {
  args: {
    height: 300,
    shape: "triangle",
    horizontalMirror: true,
    showArcSegments: false,
  },
}

// ============================================================
// 2D FLAT VARIANTS
// ============================================================

/**
 * Flat 2D circle
 */
export const Flat2D_Circle: Story = {
  render: (args) => <ExpanseLogoV4 {...args} />,
  args: {
    height: 300,
    shape: "circle",
  },
}

/**
 * Flat 2D square
 */
export const Flat2D_Square: Story = {
  render: (args) => <ExpanseLogoV4 {...args} />,
  args: {
    height: 300,
    shape: "square",
  },
}

/**
 * Flat 2D triangle
 */
export const Flat2D_Triangle: Story = {
  render: (args) => <ExpanseLogoV4 {...args} />,
  args: {
    height: 300,
    shape: "triangle",
    showArcSegments: false,
  },
}

// ============================================================
// COMPARISON GRIDS
// ============================================================

/**
 * All shapes side by side (3D)
 */
export const AllShapes3D: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <Box textAlign="center">
        <ExpanseLogoV4_3D height={200} shape="circle" />
        <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
          Circle
        </Typography>
      </Box>
      <Box textAlign="center">
        <ExpanseLogoV4_3D height={200} shape="square" />
        <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
          Square
        </Typography>
      </Box>
      <Box textAlign="center">
        <ExpanseLogoV4_3D
          height={200}
          shape="triangle"
          showArcSegments={false}
        />
        <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
          Triangle
        </Typography>
      </Box>
    </Stack>
  ),
}

/**
 * All shapes side by side (2D Flat)
 */
export const AllShapes2D: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <Box textAlign="center">
        <ExpanseLogoV4 height={200} shape="circle" />
        <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
          Circle (2D)
        </Typography>
      </Box>
      <Box textAlign="center">
        <ExpanseLogoV4 height={200} shape="square" />
        <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
          Square (2D)
        </Typography>
      </Box>
      <Box textAlign="center">
        <ExpanseLogoV4 height={200} shape="triangle" showArcSegments={false} />
        <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
          Triangle (2D)
        </Typography>
      </Box>
    </Stack>
  ),
}

/**
 * Normal vs Mirrored comparison (all shapes)
 */
export const NormalVsMirrored: Story = {
  render: () => (
    <Stack spacing={4}>
      <Stack direction="row" spacing={4} alignItems="center">
        <Box textAlign="center">
          <ExpanseLogoV4_3D height={150} shape="circle" />
          <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
            Circle
          </Typography>
        </Box>
        <Box textAlign="center">
          <ExpanseLogoV4_3D height={150} shape="circle" horizontalMirror />
          <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
            Circle (Mirrored)
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" spacing={4} alignItems="center">
        <Box textAlign="center">
          <ExpanseLogoV4_3D height={150} shape="square" />
          <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
            Square
          </Typography>
        </Box>
        <Box textAlign="center">
          <ExpanseLogoV4_3D height={150} shape="square" horizontalMirror />
          <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
            Square (Mirrored)
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" spacing={4} alignItems="center">
        <Box textAlign="center">
          <ExpanseLogoV4_3D
            height={150}
            shape="triangle"
            showArcSegments={false}
          />
          <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
            Triangle
          </Typography>
        </Box>
        <Box textAlign="center">
          <ExpanseLogoV4_3D
            height={150}
            shape="triangle"
            horizontalMirror
            showArcSegments={false}
          />
          <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
            Triangle (Mirrored)
          </Typography>
        </Box>
      </Stack>
    </Stack>
  ),
}

/**
 * Triangle orientations
 */
export const TriangleOrientations: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <Box textAlign="center">
        <ExpanseLogoV4_3D
          height={150}
          shape="triangle"
          triangleOrientation="up"
          showArcSegments={false}
        />
        <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
          Up
        </Typography>
      </Box>
      <Box textAlign="center">
        <ExpanseLogoV4_3D
          height={150}
          shape="triangle"
          triangleOrientation="down"
          showArcSegments={false}
        />
        <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
          Down
        </Typography>
      </Box>
      <Box textAlign="center">
        <ExpanseLogoV4_3D
          height={150}
          shape="triangle"
          triangleOrientation="left"
          showArcSegments={false}
        />
        <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
          Left
        </Typography>
      </Box>
      <Box textAlign="center">
        <ExpanseLogoV4_3D
          height={150}
          shape="triangle"
          triangleOrientation="right"
          showArcSegments={false}
        />
        <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
          Right
        </Typography>
      </Box>
    </Stack>
  ),
}

/**
 * Square corner radius variations
 */
export const SquareCornerVariations: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      <Box textAlign="center">
        <ExpanseLogoV4_3D height={150} shape="square" squareCornerRadius={0} />
        <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
          Sharp (0)
        </Typography>
      </Box>
      <Box textAlign="center">
        <ExpanseLogoV4_3D height={150} shape="square" squareCornerRadius={10} />
        <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
          Slight (10)
        </Typography>
      </Box>
      <Box textAlign="center">
        <ExpanseLogoV4_3D height={150} shape="square" squareCornerRadius={20} />
        <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
          Default (20)
        </Typography>
      </Box>
      <Box textAlign="center">
        <ExpanseLogoV4_3D height={150} shape="square" squareCornerRadius={40} />
        <Typography variant="caption" sx={{ color: "white", mt: 1 }}>
          Rounded (40)
        </Typography>
      </Box>
    </Stack>
  ),
}

// ============================================================
// FEATURE COMBINATIONS
// ============================================================

/**
 * Square with all features enabled
 */
export const SquareFullFeatures: Story = {
  args: {
    height: 400,
    shape: "square",
    interactive: true,
    showArcSegments: true,
    showPrimaryRings: true,
    mirroredRings: true,
    mergeRingsOnInteraction: true,
    eyeMode: true,
  },
}

/**
 * Triangle with eye mode (pupil positioned at centroid)
 */
export const TriangleWithEye: Story = {
  args: {
    height: 400,
    shape: "triangle",
    eyeMode: true,
    showArcSegments: false,
    interactive: true,
  },
}

/**
 * 2D vs 3D comparison grid
 */
export const FlatVs3D: Story = {
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6" sx={{ color: "white", textAlign: "center" }}>
        2D (Flat) vs 3D Comparison
      </Typography>
      <Stack direction="row" spacing={6} justifyContent="center">
        <Stack spacing={2} alignItems="center">
          <ExpanseLogoV4 height={180} shape="circle" />
          <Typography variant="caption" sx={{ color: "white" }}>
            Circle 2D
          </Typography>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <ExpanseLogoV4_3D height={180} shape="circle" />
          <Typography variant="caption" sx={{ color: "white" }}>
            Circle 3D
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={6} justifyContent="center">
        <Stack spacing={2} alignItems="center">
          <ExpanseLogoV4 height={180} shape="square" />
          <Typography variant="caption" sx={{ color: "white" }}>
            Square 2D
          </Typography>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <ExpanseLogoV4_3D height={180} shape="square" />
          <Typography variant="caption" sx={{ color: "white" }}>
            Square 3D
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  ),
}

// Pupil gaze direction presets (0 = right, 90 = up, 180 = left, 270 = down)
const PUPIL_PRESETS = {
  center: { direction: 0, offset: 0, label: "Center" },
  moon: { direction: 240, offset: 25, label: "Moon" },
  up: { direction: 90, offset: 25, label: "Up" },
  upRight: { direction: 45, offset: 25, label: "Up-Right" },
  right: { direction: 0, offset: 25, label: "Right" },
  downRight: { direction: 315, offset: 25, label: "Down-Right" },
  down: { direction: 270, offset: 25, label: "Down" },
  downLeft: { direction: 225, offset: 25, label: "Down-Left" },
  left: { direction: 180, offset: 25, label: "Left" },
  upLeft: { direction: 135, offset: 25, label: "Up-Left" },
} as const

// Default state values for reset
const DEFAULT_STATE = {
  shape: "circle" as LogoShape,
  triangleOrientation: "left" as TriangleOrientation,
  squareCornerRadius: 15,
  triangleCornerRadius: 6,
  is3D: true,
  horizontalMirror: false,
  showPrimaryRings: true,
  mirroredRings: true,
  ringExtent: 170,
  showArcSegments: true,
  arcStyle: "filled" as "filled" | "stroke",
  arcStrokeWidth: 8,
  showMoon: true,
  eyeMode: true,
  interactive: true,
  pupilDirection: 0, // Center by default
  pupilOffset: 0, // Center by default - pupil in the middle
  pupilSize: 0.28,
  hoverCornerRadiusDelta: 0,
  hoverScale: 1,
  previewBg: "light" as "light" | "dark",
  comparisonMode: false,
}

/**
 * Interactive playground with all controls
 */
function LogoPlayground() {
  // Shape and orientation
  const [shape, setShape] = useState<LogoShape>(DEFAULT_STATE.shape)
  const [triangleOrientation, setTriangleOrientation] =
    useState<TriangleOrientation>(DEFAULT_STATE.triangleOrientation)
  const [squareCornerRadius, setSquareCornerRadius] = useState(
    DEFAULT_STATE.squareCornerRadius,
  )
  const [triangleCornerRadius, setTriangleCornerRadius] = useState(
    DEFAULT_STATE.triangleCornerRadius,
  )

  // Mode toggles
  const [is3D, setIs3D] = useState(DEFAULT_STATE.is3D)
  const [horizontalMirror, setHorizontalMirror] = useState(
    DEFAULT_STATE.horizontalMirror,
  )

  // Ring options
  const [showPrimaryRings, setShowPrimaryRings] = useState(
    DEFAULT_STATE.showPrimaryRings,
  )
  const [mirroredRings, setMirroredRings] = useState(
    DEFAULT_STATE.mirroredRings,
  )
  const [ringExtent, setRingExtent] = useState(DEFAULT_STATE.ringExtent)

  // Arc segment options
  const [showArcSegments, setShowArcSegments] = useState(
    DEFAULT_STATE.showArcSegments,
  )
  const [arcStyle, setArcStyle] = useState<"filled" | "stroke">(
    DEFAULT_STATE.arcStyle,
  )
  const [arcStrokeWidth, setArcStrokeWidth] = useState(
    DEFAULT_STATE.arcStrokeWidth,
  )

  // Eye/moon options
  const [showMoon, setShowMoon] = useState(DEFAULT_STATE.showMoon)
  const [eyeMode, setEyeMode] = useState(DEFAULT_STATE.eyeMode)
  const [interactive, setInteractive] = useState(DEFAULT_STATE.interactive)
  const [pupilDirection, setPupilDirection] = useState(
    DEFAULT_STATE.pupilDirection,
  )
  const [pupilOffset, setPupilOffset] = useState(DEFAULT_STATE.pupilOffset)
  const [pupilSize, setPupilSize] = useState(DEFAULT_STATE.pupilSize)

  // Hover interaction options
  const [hoverCornerRadiusDelta, setHoverCornerRadiusDelta] = useState(
    DEFAULT_STATE.hoverCornerRadiusDelta,
  )
  const [hoverScale, setHoverScale] = useState(DEFAULT_STATE.hoverScale)

  // Preview background
  const [previewBg, setPreviewBg] = useState<"light" | "dark">(
    DEFAULT_STATE.previewBg,
  )

  // Comparison mode
  const [comparisonMode, setComparisonMode] = useState(
    DEFAULT_STATE.comparisonMode,
  )

  const LogoComponent = is3D ? ExpanseLogoV4_3D : ExpanseLogoV4

  // Reset all to defaults
  const resetAll = () => {
    setShape(DEFAULT_STATE.shape)
    setTriangleOrientation(DEFAULT_STATE.triangleOrientation)
    setSquareCornerRadius(DEFAULT_STATE.squareCornerRadius)
    setTriangleCornerRadius(DEFAULT_STATE.triangleCornerRadius)
    setIs3D(DEFAULT_STATE.is3D)
    setHorizontalMirror(DEFAULT_STATE.horizontalMirror)
    setShowPrimaryRings(DEFAULT_STATE.showPrimaryRings)
    setMirroredRings(DEFAULT_STATE.mirroredRings)
    setRingExtent(DEFAULT_STATE.ringExtent)
    setShowArcSegments(DEFAULT_STATE.showArcSegments)
    setArcStyle(DEFAULT_STATE.arcStyle)
    setArcStrokeWidth(DEFAULT_STATE.arcStrokeWidth)
    setShowMoon(DEFAULT_STATE.showMoon)
    setEyeMode(DEFAULT_STATE.eyeMode)
    setInteractive(DEFAULT_STATE.interactive)
    setPupilDirection(DEFAULT_STATE.pupilDirection)
    setPupilOffset(DEFAULT_STATE.pupilOffset)
    setPupilSize(DEFAULT_STATE.pupilSize)
    setHoverCornerRadiusDelta(DEFAULT_STATE.hoverCornerRadiusDelta)
    setHoverScale(DEFAULT_STATE.hoverScale)
  }

  // Apply pupil preset
  const applyPupilPreset = (presetKey: keyof typeof PUPIL_PRESETS) => {
    const preset = PUPIL_PRESETS[presetKey]
    setPupilDirection(preset.direction)
    setPupilOffset(preset.offset)
    setInteractive(false) // Disable follow cursor when manually setting position
  }

  // Preset configurations
  const presets = {
    circleArcs: () => {
      setShape("circle")
      setIs3D(true)
      setShowPrimaryRings(true)
      setMirroredRings(true)
      setShowArcSegments(true)
      setArcStyle("filled")
      setShowMoon(true)
      setEyeMode(true)
      setPupilOffset(0)
    },
    circleClean: () => {
      setShape("circle")
      setIs3D(true)
      setShowPrimaryRings(true)
      setMirroredRings(true)
      setShowArcSegments(false)
      setShowMoon(true)
      setEyeMode(true)
      setPupilOffset(0)
    },
    squareArcs: () => {
      setShape("square")
      setSquareCornerRadius(15)
      setIs3D(true)
      setShowPrimaryRings(true)
      setMirroredRings(true)
      setShowArcSegments(true)
      setArcStyle("filled")
      setShowMoon(true)
      setEyeMode(true)
      setPupilOffset(0)
    },
    squareClean: () => {
      setShape("square")
      setSquareCornerRadius(15)
      setIs3D(true)
      setShowPrimaryRings(true)
      setMirroredRings(true)
      setShowArcSegments(false)
      setShowMoon(true)
      setEyeMode(true)
      setPupilOffset(0)
    },
    triangleArcs: () => {
      setShape("triangle")
      setTriangleOrientation("left")
      setTriangleCornerRadius(6)
      setIs3D(true)
      setShowPrimaryRings(true)
      setMirroredRings(true)
      setShowArcSegments(true)
      setArcStyle("filled")
      setShowMoon(true)
      setEyeMode(true)
      setPupilOffset(0)
    },
    triangleClean: () => {
      setShape("triangle")
      setTriangleOrientation("left")
      setTriangleCornerRadius(6)
      setIs3D(true)
      setShowPrimaryRings(true)
      setMirroredRings(true)
      setShowArcSegments(false)
      setShowMoon(true)
      setEyeMode(true)
      setHoverCornerRadiusDelta(0)
      setHoverScale(1)
      setPupilOffset(0)
    },
    // Country presets
    usa: () => {
      setShape("circle")
      setIs3D(true)
      setHorizontalMirror(true)
      setShowPrimaryRings(true)
      setMirroredRings(true)
      setShowArcSegments(true)
      setShowMoon(true)
      setEyeMode(true)
      setHoverCornerRadiusDelta(0)
      setHoverScale(1.05)
      setPupilOffset(0)
    },
    japan: () => {
      setShape("triangle")
      setTriangleOrientation("left")
      setTriangleCornerRadius(15)
      setIs3D(true)
      setShowPrimaryRings(false)
      setMirroredRings(false)
      setShowArcSegments(false)
      setShowMoon(true)
      setEyeMode(true)
      setHoverCornerRadiusDelta(-10)
      setHoverScale(1)
      setPupilOffset(0)
    },
    china: () => {
      setShape("square")
      setSquareCornerRadius(10)
      setIs3D(true)
      setShowPrimaryRings(true)
      setMirroredRings(true)
      setShowArcSegments(true)
      setShowMoon(true)
      setEyeMode(true)
      setHoverCornerRadiusDelta(15)
      setHoverScale(1)
      setPupilOffset(0)
    },
    russia: () => {
      setShape("circle")
      setIs3D(true)
      setHorizontalMirror(true)
      setShowPrimaryRings(true)
      setMirroredRings(true)
      setShowArcSegments(true)
      setShowMoon(true)
      setEyeMode(true)
      setHoverCornerRadiusDelta(0)
      setHoverScale(1.05)
      setPupilOffset(0)
    },
  }

  // Light theme color palette
  const colors = {
    pageBg: "#f8fafc",
    previewLight: "#ffffff",
    previewDark: "#1a1a2e",
    panel: "#ffffff",
    panelBorder: "#e2e8f0",
    sectionBg: "#f1f5f9",
    text: "#1e293b",
    textMuted: "#64748b",
    accent: "#3b82f6",
    accentHover: "#2563eb",
  }

  const SectionBox = ({
    title,
    children,
  }: {
    title: string
    children: React.ReactNode
  }) => (
    <Box
      sx={{
        p: 2,
        borderRadius: 1.5,
        bgcolor: colors.sectionBg,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: colors.accent,
          fontWeight: 600,
          fontSize: "0.7rem",
          letterSpacing: 1.2,
          display: "block",
          mb: 1.5,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  )

  const toggleButtonSx = {
    color: colors.textMuted,
    borderColor: colors.panelBorder,
    fontSize: "0.8rem",
    py: 0.75,
    "&.Mui-selected": {
      bgcolor: colors.accent,
      color: "#fff",
      borderColor: colors.accent,
      "&:hover": {
        bgcolor: colors.accentHover,
      },
    },
    "&:hover": {
      bgcolor: "rgba(59, 130, 246, 0.08)",
    },
  }

  const sliderSx = {
    color: colors.accent,
    height: 4,
    "& .MuiSlider-thumb": {
      width: 14,
      height: 14,
      bgcolor: colors.accent,
      "&:hover, &.Mui-focusVisible": {
        boxShadow: "0 0 0 6px rgba(59, 130, 246, 0.16)",
      },
    },
    "& .MuiSlider-track": {
      bgcolor: colors.accent,
      border: "none",
    },
    "& .MuiSlider-rail": {
      bgcolor: colors.panelBorder,
    },
  }

  const switchSx = {
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: colors.accent,
      "& + .MuiSwitch-track": {
        bgcolor: colors.accent,
        opacity: 0.5,
      },
    },
  }

  const previewBgColor =
    previewBg === "light" ? colors.previewLight : colors.previewDark

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: colors.pageBg,
        p: 3,
        boxSizing: "border-box",
      }}
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={3}
        alignItems="stretch"
      >
        {/* Logo Display Area */}
        <Paper
          elevation={0}
          sx={{
            flex: "1 1 auto",
            p: 4,
            bgcolor: previewBgColor,
            border: `1px solid ${colors.panelBorder}`,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 500,
            position: "relative",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            transition: "background-color 0.2s ease",
          }}
        >
          {/* Background toggle */}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              display: "flex",
              gap: 0.5,
              bgcolor:
                previewBg === "light"
                  ? colors.sectionBg
                  : "rgba(255,255,255,0.1)",
              borderRadius: 1,
              p: 0.5,
            }}
          >
            <Box
              onClick={() => setPreviewBg("light")}
              sx={{
                width: 28,
                height: 28,
                borderRadius: 0.75,
                bgcolor: "#fff",
                border:
                  previewBg === "light"
                    ? `2px solid ${colors.accent}`
                    : "1px solid #e2e8f0",
                cursor: "pointer",
                transition: "all 0.15s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
            <Box
              onClick={() => setPreviewBg("dark")}
              sx={{
                width: 28,
                height: 28,
                borderRadius: 0.75,
                bgcolor: "#1a1a2e",
                border:
                  previewBg === "dark"
                    ? `2px solid ${colors.accent}`
                    : "1px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            />
          </Box>

          {/* Comparison mode toggle */}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
            }}
          >
            <Chip
              label={comparisonMode ? "Single" : "Compare"}
              size="small"
              onClick={() => setComparisonMode(!comparisonMode)}
              sx={{
                fontSize: "0.7rem",
                bgcolor: comparisonMode ? colors.accent : colors.sectionBg,
                color: comparisonMode ? "#fff" : colors.textMuted,
                "&:hover": { bgcolor: colors.accent, color: "#fff" },
              }}
            />
          </Box>

          {comparisonMode ? (
            <Stack
              direction="row"
              spacing={4}
              alignItems="center"
              flexWrap="wrap"
              justifyContent="center"
            >
              {(["circle", "square", "triangle"] as const).map((s) => (
                <Stack key={s} spacing={1} alignItems="center">
                  <LogoComponent
                    height={180}
                    shape={s}
                    horizontalMirror={horizontalMirror}
                    triangleOrientation={triangleOrientation}
                    squareCornerRadius={squareCornerRadius}
                    triangleCornerRadius={triangleCornerRadius}
                    showPrimaryRings={showPrimaryRings}
                    mirroredRings={mirroredRings}
                    ringExtent={ringExtent}
                    showArcSegments={showArcSegments}
                    arcStyle={arcStyle}
                    arcStrokeWidth={arcStrokeWidth}
                    showMoon={showMoon}
                    eyeMode={eyeMode}
                    interactive={interactive}
                    pupilDirection={pupilDirection}
                    pupilOffset={pupilOffset}
                    pupilSize={pupilSize}
                    hoverCornerRadiusDelta={hoverCornerRadiusDelta}
                    hoverScale={hoverScale}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color:
                        previewBg === "light"
                          ? colors.textMuted
                          : "rgba(255,255,255,0.6)",
                      textTransform: "capitalize",
                    }}
                  >
                    {s}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          ) : (
            <LogoComponent
              height={400}
              shape={shape}
              horizontalMirror={horizontalMirror}
              triangleOrientation={triangleOrientation}
              squareCornerRadius={squareCornerRadius}
              triangleCornerRadius={triangleCornerRadius}
              showPrimaryRings={showPrimaryRings}
              mirroredRings={mirroredRings}
              ringExtent={ringExtent}
              showArcSegments={showArcSegments}
              arcStyle={arcStyle}
              arcStrokeWidth={arcStrokeWidth}
              showMoon={showMoon}
              eyeMode={eyeMode}
              interactive={interactive}
              pupilDirection={pupilDirection}
              pupilOffset={pupilOffset}
              pupilSize={pupilSize}
              hoverCornerRadiusDelta={hoverCornerRadiusDelta}
              hoverScale={hoverScale}
            />
          )}
        </Paper>

        {/* Controls Panel */}
        <Paper
          elevation={0}
          sx={{
            width: { xs: "100%", lg: 320 },
            flexShrink: 0,
            p: 2.5,
            bgcolor: colors.panel,
            border: `1px solid ${colors.panelBorder}`,
            borderRadius: 2,
            maxHeight: { lg: "calc(100vh - 48px)" },
            overflowY: "auto",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            "&::-webkit-scrollbar": {
              width: 6,
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#cbd5e1",
              borderRadius: 3,
            },
          }}
        >
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pb: 1.5,
                borderBottom: `1px solid ${colors.panelBorder}`,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: colors.text,
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Logo Playground
              </Typography>
              <Chip
                label="Reset All"
                size="small"
                onClick={resetAll}
                sx={{
                  fontSize: "0.7rem",
                  bgcolor: "transparent",
                  border: `1px solid ${colors.panelBorder}`,
                  color: colors.textMuted,
                  "&:hover": {
                    bgcolor: "#fee2e2",
                    borderColor: "#ef4444",
                    color: "#dc2626",
                  },
                }}
              />
            </Box>

            {/* Quick Presets */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
              <Chip
                label="Circle + Arcs"
                size="small"
                onClick={presets.circleArcs}
                sx={{
                  fontSize: "0.75rem",
                  bgcolor: colors.sectionBg,
                  "&:hover": { bgcolor: colors.accent, color: "#fff" },
                }}
              />
              <Chip
                label="Circle Clean"
                size="small"
                onClick={presets.circleClean}
                sx={{
                  fontSize: "0.75rem",
                  bgcolor: colors.sectionBg,
                  "&:hover": { bgcolor: colors.accent, color: "#fff" },
                }}
              />
              <Chip
                label="Square + Arcs"
                size="small"
                onClick={presets.squareArcs}
                sx={{
                  fontSize: "0.75rem",
                  bgcolor: colors.sectionBg,
                  "&:hover": { bgcolor: colors.accent, color: "#fff" },
                }}
              />
              <Chip
                label="Square Clean"
                size="small"
                onClick={presets.squareClean}
                sx={{
                  fontSize: "0.75rem",
                  bgcolor: colors.sectionBg,
                  "&:hover": { bgcolor: colors.accent, color: "#fff" },
                }}
              />
              <Chip
                label="Triangle + Arcs"
                size="small"
                onClick={presets.triangleArcs}
                sx={{
                  fontSize: "0.75rem",
                  bgcolor: colors.sectionBg,
                  "&:hover": { bgcolor: colors.accent, color: "#fff" },
                }}
              />
              <Chip
                label="Triangle Clean"
                size="small"
                onClick={presets.triangleClean}
                sx={{
                  fontSize: "0.75rem",
                  bgcolor: colors.sectionBg,
                  "&:hover": { bgcolor: colors.accent, color: "#fff" },
                }}
              />
            </Box>

            {/* Country Presets */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
              <Chip
                label="🇺🇸 USA"
                size="small"
                onClick={presets.usa}
                sx={{
                  fontSize: "0.75rem",
                  bgcolor: colors.sectionBg,
                  "&:hover": { bgcolor: colors.accent, color: "#fff" },
                }}
              />
              <Chip
                label="🇯🇵 Japan"
                size="small"
                onClick={presets.japan}
                sx={{
                  fontSize: "0.75rem",
                  bgcolor: colors.sectionBg,
                  "&:hover": { bgcolor: colors.accent, color: "#fff" },
                }}
              />
              <Chip
                label="🇨🇳 China"
                size="small"
                onClick={presets.china}
                sx={{
                  fontSize: "0.75rem",
                  bgcolor: colors.sectionBg,
                  "&:hover": { bgcolor: colors.accent, color: "#fff" },
                }}
              />
              <Chip
                label="🇷🇺 Russia"
                size="small"
                onClick={presets.russia}
                sx={{
                  fontSize: "0.75rem",
                  bgcolor: colors.sectionBg,
                  "&:hover": { bgcolor: colors.accent, color: "#fff" },
                }}
              />
            </Box>

            {/* Shape Section */}
            <SectionBox title="Shape">
              <ToggleButtonGroup
                value={shape}
                exclusive
                onChange={(_, val) => val && setShape(val)}
                size="small"
                fullWidth
              >
                <ToggleButton value="circle" sx={toggleButtonSx}>
                  Circle
                </ToggleButton>
                <ToggleButton value="square" sx={toggleButtonSx}>
                  Square
                </ToggleButton>
                <ToggleButton value="triangle" sx={toggleButtonSx}>
                  Triangle
                </ToggleButton>
              </ToggleButtonGroup>

              {/* Triangle Orientation */}
              {shape === "triangle" && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.textMuted,
                      display: "block",
                      mb: 1,
                      fontSize: "0.75rem",
                    }}
                  >
                    Orientation
                  </Typography>
                  <ToggleButtonGroup
                    value={triangleOrientation}
                    exclusive
                    onChange={(_, val) => val && setTriangleOrientation(val)}
                    size="small"
                    fullWidth
                  >
                    <ToggleButton value="up" sx={toggleButtonSx}>
                      ↑
                    </ToggleButton>
                    <ToggleButton value="down" sx={toggleButtonSx}>
                      ↓
                    </ToggleButton>
                    <ToggleButton value="left" sx={toggleButtonSx}>
                      ←
                    </ToggleButton>
                    <ToggleButton value="right" sx={toggleButtonSx}>
                      →
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.textMuted,
                      fontSize: "0.75rem",
                      mt: 2,
                      display: "block",
                    }}
                  >
                    Corner Radius: {triangleCornerRadius}px
                  </Typography>
                  <Slider
                    value={triangleCornerRadius}
                    onChange={(_, val) =>
                      setTriangleCornerRadius(val as number)
                    }
                    min={0}
                    max={30}
                    sx={sliderSx}
                  />
                </Box>
              )}

              {/* Square Corner Radius */}
              {shape === "square" && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: colors.textMuted, fontSize: "0.75rem" }}
                  >
                    Corner Radius: {squareCornerRadius}px
                  </Typography>
                  <Slider
                    value={squareCornerRadius}
                    onChange={(_, val) => setSquareCornerRadius(val as number)}
                    min={0}
                    max={40}
                    sx={sliderSx}
                  />
                </Box>
              )}
            </SectionBox>

            {/* Render Mode Section */}
            <SectionBox title="Render Mode">
              <Stack spacing={0}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={is3D}
                      onChange={(e) => setIs3D(e.target.checked)}
                      sx={switchSx}
                      size="small"
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{ color: colors.text, fontSize: "0.85rem" }}
                    >
                      3D Rendering
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={horizontalMirror}
                      onChange={(e) => setHorizontalMirror(e.target.checked)}
                      sx={switchSx}
                      size="small"
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{ color: colors.text, fontSize: "0.85rem" }}
                    >
                      Horizontal Mirror
                    </Typography>
                  }
                />
              </Stack>
            </SectionBox>

            {/* Rings Section */}
            <SectionBox title="Orbital Rings">
              <Stack spacing={0}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showPrimaryRings}
                      onChange={(e) => setShowPrimaryRings(e.target.checked)}
                      sx={switchSx}
                      size="small"
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{ color: colors.text, fontSize: "0.85rem" }}
                    >
                      Primary Ring Set
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={mirroredRings}
                      onChange={(e) => setMirroredRings(e.target.checked)}
                      sx={switchSx}
                      size="small"
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{ color: colors.text, fontSize: "0.85rem" }}
                    >
                      Mirrored Ring Set
                    </Typography>
                  }
                />
              </Stack>
              {showPrimaryRings && (
                <Box sx={{ mt: 1.5 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: colors.textMuted, fontSize: "0.75rem" }}
                  >
                    Ring Extent: {ringExtent}°
                  </Typography>
                  <Slider
                    value={ringExtent}
                    onChange={(_, val) => setRingExtent(val as number)}
                    min={90}
                    max={270}
                    sx={sliderSx}
                  />
                </Box>
              )}
            </SectionBox>

            {/* Arc Segments Section */}
            <SectionBox title="Arc Segments">
              <FormControlLabel
                control={
                  <Switch
                    checked={showArcSegments}
                    onChange={(e) => setShowArcSegments(e.target.checked)}
                    sx={switchSx}
                    size="small"
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ color: colors.text, fontSize: "0.85rem" }}
                  >
                    Show Arcs
                  </Typography>
                }
              />
              {showArcSegments && (
                <>
                  <Box sx={{ mt: 1.5 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: colors.textMuted,
                        display: "block",
                        mb: 1,
                        fontSize: "0.75rem",
                      }}
                    >
                      Style
                    </Typography>
                    <ToggleButtonGroup
                      value={arcStyle}
                      exclusive
                      onChange={(_, val) => val && setArcStyle(val)}
                      size="small"
                      fullWidth
                    >
                      <ToggleButton value="filled" sx={toggleButtonSx}>
                        Filled
                      </ToggleButton>
                      <ToggleButton value="stroke" sx={toggleButtonSx}>
                        Stroke
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                  {arcStyle === "stroke" && (
                    <Box sx={{ mt: 1.5 }}>
                      <Typography
                        variant="caption"
                        sx={{ color: colors.textMuted, fontSize: "0.75rem" }}
                      >
                        Stroke Width: {arcStrokeWidth}px
                      </Typography>
                      <Slider
                        value={arcStrokeWidth}
                        onChange={(_, val) => setArcStrokeWidth(val as number)}
                        min={2}
                        max={20}
                        sx={sliderSx}
                      />
                    </Box>
                  )}
                </>
              )}
            </SectionBox>

            {/* Eye & Moon Section */}
            <SectionBox title="Eye & Moon">
              <Stack spacing={0}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showMoon}
                      onChange={(e) => setShowMoon(e.target.checked)}
                      sx={switchSx}
                      size="small"
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{ color: colors.text, fontSize: "0.85rem" }}
                    >
                      Show Moon
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={eyeMode}
                      onChange={(e) => setEyeMode(e.target.checked)}
                      sx={switchSx}
                      size="small"
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{ color: colors.text, fontSize: "0.85rem" }}
                    >
                      Eye Mode (Pupil)
                    </Typography>
                  }
                />
                {eyeMode && (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={interactive}
                        onChange={(e) => setInteractive(e.target.checked)}
                        sx={switchSx}
                        size="small"
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{ color: colors.text, fontSize: "0.85rem" }}
                      >
                        Follow Cursor
                      </Typography>
                    }
                    sx={{ ml: 2 }}
                  />
                )}
              </Stack>

              {/* Pupil Position Presets */}
              {eyeMode && !interactive && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.textMuted,
                      display: "block",
                      mb: 1,
                      fontSize: "0.75rem",
                    }}
                  >
                    Pupil Position
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    <Chip
                      label="Center"
                      size="small"
                      onClick={() => applyPupilPreset("center")}
                      sx={{
                        fontSize: "0.7rem",
                        height: 24,
                        bgcolor:
                          pupilOffset === 0 ? colors.accent : colors.sectionBg,
                        color: pupilOffset === 0 ? "#fff" : colors.text,
                        "&:hover": { bgcolor: colors.accent, color: "#fff" },
                      }}
                    />
                    <Chip
                      label="Moon"
                      size="small"
                      onClick={() => applyPupilPreset("moon")}
                      sx={{
                        fontSize: "0.7rem",
                        height: 24,
                        bgcolor:
                          pupilDirection === 240 && pupilOffset > 0
                            ? colors.accent
                            : colors.sectionBg,
                        color:
                          pupilDirection === 240 && pupilOffset > 0
                            ? "#fff"
                            : colors.text,
                        "&:hover": { bgcolor: colors.accent, color: "#fff" },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                      mt: 0.75,
                    }}
                  >
                    {/* Direction compass grid */}
                    <Chip
                      label="↖"
                      size="small"
                      onClick={() => applyPupilPreset("upLeft")}
                      sx={{
                        fontSize: "0.7rem",
                        height: 24,
                        minWidth: 32,
                        bgcolor: colors.sectionBg,
                        "&:hover": { bgcolor: colors.accent, color: "#fff" },
                      }}
                    />
                    <Chip
                      label="↑"
                      size="small"
                      onClick={() => applyPupilPreset("up")}
                      sx={{
                        fontSize: "0.7rem",
                        height: 24,
                        minWidth: 32,
                        bgcolor: colors.sectionBg,
                        "&:hover": { bgcolor: colors.accent, color: "#fff" },
                      }}
                    />
                    <Chip
                      label="↗"
                      size="small"
                      onClick={() => applyPupilPreset("upRight")}
                      sx={{
                        fontSize: "0.7rem",
                        height: 24,
                        minWidth: 32,
                        bgcolor: colors.sectionBg,
                        "&:hover": { bgcolor: colors.accent, color: "#fff" },
                      }}
                    />
                    <Chip
                      label="←"
                      size="small"
                      onClick={() => applyPupilPreset("left")}
                      sx={{
                        fontSize: "0.7rem",
                        height: 24,
                        minWidth: 32,
                        bgcolor: colors.sectionBg,
                        "&:hover": { bgcolor: colors.accent, color: "#fff" },
                      }}
                    />
                    <Box sx={{ width: 32, height: 24 }} /> {/* Center spacer */}
                    <Chip
                      label="→"
                      size="small"
                      onClick={() => applyPupilPreset("right")}
                      sx={{
                        fontSize: "0.7rem",
                        height: 24,
                        minWidth: 32,
                        bgcolor: colors.sectionBg,
                        "&:hover": { bgcolor: colors.accent, color: "#fff" },
                      }}
                    />
                    <Chip
                      label="↙"
                      size="small"
                      onClick={() => applyPupilPreset("downLeft")}
                      sx={{
                        fontSize: "0.7rem",
                        height: 24,
                        minWidth: 32,
                        bgcolor: colors.sectionBg,
                        "&:hover": { bgcolor: colors.accent, color: "#fff" },
                      }}
                    />
                    <Chip
                      label="↓"
                      size="small"
                      onClick={() => applyPupilPreset("down")}
                      sx={{
                        fontSize: "0.7rem",
                        height: 24,
                        minWidth: 32,
                        bgcolor: colors.sectionBg,
                        "&:hover": { bgcolor: colors.accent, color: "#fff" },
                      }}
                    />
                    <Chip
                      label="↘"
                      size="small"
                      onClick={() => applyPupilPreset("downRight")}
                      sx={{
                        fontSize: "0.7rem",
                        height: 24,
                        minWidth: 32,
                        bgcolor: colors.sectionBg,
                        "&:hover": { bgcolor: colors.accent, color: "#fff" },
                      }}
                    />
                  </Box>
                </Box>
              )}

              {/* Advanced Pupil Controls */}
              {eyeMode && !interactive && (
                <Box
                  sx={{
                    mt: 2,
                    pt: 1.5,
                    borderTop: `1px dashed ${colors.panelBorder}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.textMuted,
                      fontSize: "0.7rem",
                      fontStyle: "italic",
                      mb: 1,
                      display: "block",
                    }}
                  >
                    Fine-tune controls
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: colors.textMuted, fontSize: "0.75rem" }}
                  >
                    Direction: {pupilDirection}°{" "}
                    {pupilOffset === 0 && "(centered - direction ignored)"}
                  </Typography>
                  <Slider
                    value={pupilDirection}
                    onChange={(_, val) => setPupilDirection(val as number)}
                    min={0}
                    max={360}
                    disabled={pupilOffset === 0}
                    sx={sliderSx}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.textMuted,
                      mt: 1,
                      display: "block",
                      fontSize: "0.75rem",
                    }}
                  >
                    Offset from center: {pupilOffset}px{" "}
                    {pupilOffset === 0 && "(centered)"}
                  </Typography>
                  <Slider
                    value={pupilOffset}
                    onChange={(_, val) => setPupilOffset(val as number)}
                    min={0}
                    max={50}
                    sx={sliderSx}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.textMuted,
                      mt: 1,
                      display: "block",
                      fontSize: "0.75rem",
                    }}
                  >
                    Pupil Size: {Math.round(pupilSize * 100)}%
                  </Typography>
                  <Slider
                    value={pupilSize}
                    onChange={(_, val) => setPupilSize(val as number)}
                    min={0.1}
                    max={0.5}
                    step={0.01}
                    sx={sliderSx}
                  />
                </Box>
              )}
            </SectionBox>

            {/* Hover Interaction Section */}
            <SectionBox title="Hover Effects">
              <Typography
                variant="caption"
                sx={{ color: colors.textMuted, fontSize: "0.75rem" }}
              >
                Corner Radius Delta:{" "}
                {hoverCornerRadiusDelta > 0
                  ? `+${hoverCornerRadiusDelta}`
                  : hoverCornerRadiusDelta}
              </Typography>
              <Slider
                value={hoverCornerRadiusDelta}
                onChange={(_, val) => setHoverCornerRadiusDelta(val as number)}
                min={-20}
                max={30}
                sx={sliderSx}
              />
              <Typography
                variant="caption"
                sx={{
                  color: colors.textMuted,
                  mt: 1.5,
                  display: "block",
                  fontSize: "0.75rem",
                }}
              >
                Circle Scale: {hoverScale}x
              </Typography>
              <Slider
                value={hoverScale}
                onChange={(_, val) => setHoverScale(val as number)}
                min={0.9}
                max={1.2}
                step={0.01}
                sx={sliderSx}
              />
            </SectionBox>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  )
}

export const InteractivePlayground: Story = {
  render: () => <LogoPlayground />,
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    backgrounds: { disable: true },
  },
}

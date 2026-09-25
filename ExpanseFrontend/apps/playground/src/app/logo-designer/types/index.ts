/**
 * Logo Designer Types
 */

import { RingExtent } from "expanse.dynamicAssets/logo"

export type RingSpacingMode = "proportional" | "fixed"
export type OpacityMode = "1:2:3" | "custom"
export type ExtentMode = "preset" | "custom"

export interface LogoConfig {
  // === RING GEOMETRY ===
  extentMode: ExtentMode
  ringExtent: RingExtent // When extentMode='preset'
  customRx: number // When extentMode='custom'
  customRy: number

  orbitalRotation: number // -90 to 90 degrees
  mirroredRings: boolean
  showPrimaryRings: boolean // Show primary/left rings
  mirroredRotation: number // Auto-calculated or custom
  autoMirrorAngle: boolean // When true, mirror angle = -orbitalRotation

  ringSpacing: RingSpacingMode
  fixedGap1: number // Gap between inner and middle ring
  fixedGap2: number // Gap between middle and outer ring

  circular: boolean // ry = rx
  ringCount: 2 | 3 // Number of rings

  // === RING APPEARANCE ===
  ringStrokeWidth: number // 1-16 px

  opacityMode: OpacityMode
  baseOpacity: number // 0-1, multiplier for 1:2:3 scaling
  customOpacities: {
    inner: number // When opacityMode='custom'
    middle: number
    outer: number
  }
  backRingOpacity: number // Opacity for rings behind sphere (0-1)
  arcOpacity: number // Opacity for decorative arc segments (0-1)

  ringColor: string // Hex color
  useMainColorForRings: boolean // When true, ringColor follows mainFill

  // === LOGO ELEMENTS ===
  showMoon: boolean
  moonSizePercent: number // Moon size as % of main circle (10-60)
  moonOffsetX: number // Horizontal offset from default position
  moonOffsetY: number // Vertical offset from default position
  showArcSegments: boolean
  mainFill: string // Hex color

  // === LIGHTING ===
  lightDirection: number // 0-360 degrees (0=right, 90=up, 180=left, 270=down)
  highlightIntensity: number // 0-1

  // === EYE MODE ===
  eyeMode: boolean // Enable pupil rendering
  pupilDirection: number // 0-360 degrees
  pupilGazePreset: "moon" | "1-oclock" | "custom" // Preset or custom angle
  pupilOffset: number // 0-1 (fraction of radius)
  pupilSize: number // 0-1 (fraction of radius), default 0.33
  pupilContrast: number // 0-1 (opacity/darkness)
  pupilColor: string // Hex color for outer pupil (border/iris)
  pupilInnerColor: string // Hex color for inner pupil (core)
  pupilInnerSize: number // Inner size as fraction of outer (0-1), default 0.67

  // === ARC SEGMENT COLORS ===
  arc1Color?: string // Custom color for arc 1 (uses ringColor if not set)
  arc2Color?: string // Custom color for arc 2 (uses ringColor if not set)
  arc3Color?: string // Custom color for arc 3 (uses ringColor if not set)

  // === PREVIEW ===
  backgroundColor: string
  previewSize: number // Preview panel size in px
  use3D: boolean // Use ExpanseLogoV3_3D vs ExpanseLogoV3
}

export interface Preset {
  id: string
  name: string
  description?: string
  config: LogoConfig
  createdAt: number
  thumbnail?: string // Base64 SVG data URL
}

export interface LogoDesignerState {
  config: LogoConfig
  presets: Preset[]
  compareMode: boolean
  comparePresetId: string | null
  history: LogoConfig[]
  historyIndex: number
}

export const DEFAULT_CONFIG: LogoConfig = {
  // Ring Geometry
  extentMode: "preset",
  ringExtent: "innerArc", // Wider ring extent for more presence
  customRx: 123,
  customRy: 30.75,
  orbitalRotation: -33,
  mirroredRings: true,
  showPrimaryRings: false,
  mirroredRotation: 33,
  autoMirrorAngle: true,
  ringSpacing: "proportional",
  fixedGap1: 8,
  fixedGap2: 8,
  circular: false,
  ringCount: 3,

  // Ring Appearance
  ringStrokeWidth: 4,
  opacityMode: "1:2:3",
  baseOpacity: 1,
  customOpacities: { inner: 0.33, middle: 0.67, outer: 1 },
  backRingOpacity: 0.28, // Subtler back rings
  arcOpacity: 0.21,
  ringColor: "#ffffff",
  useMainColorForRings: true,

  // Logo Elements
  showMoon: true,
  moonSizePercent: 33,
  moonOffsetX: 0,
  moonOffsetY: 0,
  showArcSegments: true,
  mainFill: "#1a1a2e",

  // Lighting
  lightDirection: 45, // Top-right
  highlightIntensity: 0.15,

  // Eye Mode
  eyeMode: true, // Enabled by default
  pupilDirection: 240, // Looking at moon (down-left)
  pupilGazePreset: "moon",
  pupilOffset: 0.12, // Slight offset toward moon for more life
  pupilSize: 0.28, // 28% of sphere - balanced size
  pupilContrast: 0.71,
  pupilColor: "#1a1a1a", // Near-black for softer contrast
  pupilInnerColor: "#f5f5f5", // Off-white for softer contrast
  pupilInnerSize: 0.6, // Thicker iris border

  // Arc Segment Colors - gradient effect (dark to light)
  arc1Color: "#666666",
  arc2Color: "#888888",
  arc3Color: "#aaaaaa",

  // Preview
  backgroundColor: "#ffffff",
  previewSize: 400,
  use3D: true,
}

export const BACKGROUND_PRESETS = [
  { name: "Dark", value: "#1a1a2e" },
  { name: "Navy", value: "#0f3460" },
  { name: "Black", value: "#000000" },
  { name: "Charcoal", value: "#2d2d2d" },
  { name: "Light", value: "#f5f5f5" },
  { name: "White", value: "#ffffff" },
]

export const EXTENT_DESCRIPTIONS: Record<RingExtent, string> = {
  compact: "Tight band close to circle (rx=123)",
  innerArc: "Touches inner arc edge (rx=130)",
  arcCenter: "Reaches arc band center (rx=145)",
  outerArc: "Aligns with outer arc edge (rx=165)",
  moonCenter: "Extends to moon center (rx=231)",
}

import type { Meta, StoryObj } from "@storybook/react"
import { ExpanseLogoV3, ExpanseLogoV3_3D } from "expanse.dynamicAssets/logo"

/**
 * ExpanseLogoV3 - Saturn-style orbital rings logo
 *
 * Features:
 * - Triple-ring design with configurable opacity (inner, middle, outer)
 * - Ring extent presets: compact, arcEdge, innerArc, arcCenter, outerArc, moonCenter
 * - Mirrored rings option for X-pattern crossing effect
 * - Interactive arc reveal on hover/click
 * - Eye mode with configurable pupil
 * - 3D (gradient shading) and 2D (flat) variants
 */
const meta: Meta<typeof ExpanseLogoV3_3D> = {
  title: "Branding/Logo/ExpanseLogoV3",
  component: ExpanseLogoV3_3D,
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
    // Size
    height: {
      control: { type: "range", min: 100, max: 500, step: 10 },
      description: "Logo height",
    },
    // Colors
    fill: {
      control: "color",
      description: "Main sphere fill color",
    },
    orbitalFill: {
      control: "color",
      description: "Orbital ring stroke color",
    },
    // Ring extent
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
      description: "Ring extent preset - how far rings extend from sphere",
    },
    orbitalRotation: {
      control: { type: "range", min: -90, max: 90, step: 1 },
      description: "Ring rotation angle in degrees",
    },
    mirroredRings: {
      control: "boolean",
      description: "Add second set of rings at opposite rotation (X-pattern)",
    },
    // Visibility toggles
    showMoon: {
      control: "boolean",
      description: "Show the moon circle",
    },
    showArcSegments: {
      control: "boolean",
      description: "Show decorative arc segments",
    },
    // Arc opacities
    arc1Opacity: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
      description: "Arc 1 opacity (smallest, top-right)",
    },
    arc2Opacity: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
      description: "Arc 2 opacity (largest, left)",
    },
    arc3Opacity: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
      description: "Arc 3 opacity (medium, right) - reveals on interaction",
    },
    // Interactivity
    interactive: {
      control: "boolean",
      description: "Enable hover/click to reveal arc 3",
    },
    interactiveArcOpacity: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
      description: "Arc 3 opacity when revealed via hover/click",
    },
    initialPupilScale: {
      control: { type: "range", min: 0.1, max: 1, step: 0.05 },
      description: "Initial pupil scale (expands to 1.0 on interaction)",
    },
    mergeRingsOnInteraction: {
      control: "boolean",
      description: "Animate rings to merge into a single ring on interaction",
    },
    // Eye mode
    eyeMode: {
      control: "boolean",
      description: "Enable eye/pupil on sphere",
    },
    pupilSize: {
      control: { type: "range", min: 0.1, max: 0.5, step: 0.01 },
      description: "Pupil size as fraction of sphere radius",
    },
    pupilDirection: {
      control: { type: "range", min: 0, max: 360, step: 1 },
      description: "Pupil gaze direction in degrees",
    },
  },
}

export default meta
type Story = StoryObj<typeof ExpanseLogoV3_3D>

/**
 * Default 3D logo with gradient shading, mirrored rings, and interactive arc.
 * Hover or click to reveal the hidden arc segment.
 */
export const Default: Story = {
  args: {
    height: 300,
  },
}

/**
 * Flat 2D variant without gradient shading.
 * Use when you need a simpler, non-3D appearance.
 */
export const Flat2D: Story = {
  render: (args) => <ExpanseLogoV3 {...args} />,
  args: {
    height: 300,
  },
}

/**
 * Demonstrates interactive arc reveal.
 * Hover or click to show the hidden arc 3 segment.
 */
export const Interactive: Story = {
  args: {
    height: 400,
    interactive: true,
    showArcSegments: true,
  },
}

/**
 * Demonstrates all new animation features:
 * - Pupil starts small and expands on interaction
 * - Top arc (arc 4) appears on hover/click
 * - Orbital rings merge together into a single ring
 */
export const AnimatedFeatures: Story = {
  args: {
    height: 400,
    interactive: true,
    showArcSegments: true,
    initialPupilScale: 0.65,
    mergeRingsOnInteraction: true,
    showPrimaryRings: true,
    arc3Opacity: 0,
    interactiveArcOpacity: 0.4,
  },
}

/**
 * ActionGroup Stories
 *
 * Demonstrates the ActionGroup component - selection wrapper
 * that provides radio/checkbox behavior to ActionButtons.
 */

import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Box, Stack, Typography, Paper } from "@mui/material"
import { ActionGroup } from "./ActionGroup"
import { ActionButton } from "../action-button"
import { ActionBar } from "../action-bars"

// Icons
import EditIcon from "@mui/icons-material/Edit"
import VisibilityIcon from "@mui/icons-material/Visibility"
import SelectAllIcon from "@mui/icons-material/SelectAll"
import CropIcon from "@mui/icons-material/Crop"
import GridOnIcon from "@mui/icons-material/GridOn"
import GridOffIcon from "@mui/icons-material/GridOff"
import SnapToGridIcon from "@mui/icons-material/CenterFocusStrong"
import LabelIcon from "@mui/icons-material/Label"
import FormatBoldIcon from "@mui/icons-material/FormatBold"
import FormatItalicIcon from "@mui/icons-material/FormatItalic"
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined"
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft"
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter"
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import StopIcon from "@mui/icons-material/Stop"
import FastRewindIcon from "@mui/icons-material/FastRewind"
import FastForwardIcon from "@mui/icons-material/FastForward"

// =============================================================================
// Meta
// =============================================================================

const meta: Meta<typeof ActionGroup> = {
  title: "Layout Systems/HUD Components/ActionGroup",
  component: ActionGroup,
  parameters: {
    layout: "centered",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
  },
}

export default meta
type Story = StoryObj<typeof ActionGroup>

// =============================================================================
// Radio Mode Stories
// =============================================================================

/**
 * Radio mode - single selection
 */
export const RadioMode: Story = {
  render: () => {
    const [value, setValue] = useState("edit")

    return (
      <ActionGroup mode="radio" value={value} onChange={setValue}>
        <ActionButton icon={<EditIcon />} label="Edit" value="edit" />
        <ActionButton icon={<SelectAllIcon />} label="Select" value="select" />
        <ActionButton icon={<VisibilityIcon />} label="View" value="view" />
        <ActionButton icon={<CropIcon />} label="Crop" value="crop" />
      </ActionGroup>
    )
  },
}

/**
 * Radio mode with circle indicator
 */
export const RadioWithCircleIndicator: Story = {
  render: () => {
    const [value, setValue] = useState("edit")

    return (
      <ActionGroup
        mode="radio"
        value={value}
        onChange={setValue}
        indicator="circle"
        indicatorPosition="start"
      >
        <ActionButton icon={<EditIcon />} label="Edit" value="edit" />
        <ActionButton icon={<SelectAllIcon />} label="Select" value="select" />
        <ActionButton icon={<VisibilityIcon />} label="View" value="view" />
      </ActionGroup>
    )
  },
}

/**
 * Radio mode with underline indicator
 */
export const RadioWithUnderline: Story = {
  render: () => {
    const [value, setValue] = useState("left")

    return (
      <ActionGroup
        mode="radio"
        value={value}
        onChange={setValue}
        indicator="underline"
        indicatorPosition="overlay"
      >
        <ActionButton icon={<FormatAlignLeftIcon />} label="Left" value="left" />
        <ActionButton icon={<FormatAlignCenterIcon />} label="Center" value="center" />
        <ActionButton icon={<FormatAlignRightIcon />} label="Right" value="right" />
      </ActionGroup>
    )
  },
}

// =============================================================================
// Checkbox Mode Stories
// =============================================================================

/**
 * Checkbox mode - multiple selection
 */
export const CheckboxMode: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, boolean>>({
      grid: true,
      snap: false,
      labels: true,
    })

    return (
      <ActionGroup
        mode="checkbox"
        values={values}
        onToggle={(id, checked) => setValues(v => ({ ...v, [id]: checked }))}
      >
        <ActionButton icon={<GridOnIcon />} iconOn={<GridOffIcon />} label="Grid" value="grid" />
        <ActionButton icon={<SnapToGridIcon />} label="Snap" value="snap" />
        <ActionButton icon={<LabelIcon />} label="Labels" value="labels" />
      </ActionGroup>
    )
  },
}

/**
 * Checkbox mode with square indicator
 */
export const CheckboxWithSquareIndicator: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, boolean>>({
      bold: false,
      italic: true,
      underline: false,
    })

    return (
      <ActionGroup
        mode="checkbox"
        values={values}
        onToggle={(id, checked) => setValues(v => ({ ...v, [id]: checked }))}
        indicator="square"
        indicatorPosition="end"
      >
        <ActionButton icon={<FormatBoldIcon />} label="Bold" value="bold" />
        <ActionButton icon={<FormatItalicIcon />} label="Italic" value="italic" />
        <ActionButton icon={<FormatUnderlinedIcon />} label="Underline" value="underline" />
      </ActionGroup>
    )
  },
}

// =============================================================================
// Indicator Shape Gallery
// =============================================================================

/**
 * All indicator shapes
 */
export const IndicatorShapes: Story = {
  render: () => {
    const shapes = [
      "none",
      "circle",
      "circle-outline",
      "square",
      "square-outline",
      "triangle",
      "dot",
      "underline",
      "ring",
    ] as const

    return (
      <Stack spacing={4}>
        {shapes.map(shape => (
          <Box key={shape}>
            <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
              {shape}
            </Typography>
            <ActionGroupWithShape shape={shape} />
          </Box>
        ))}
      </Stack>
    )
  },
}

function ActionGroupWithShape({ shape }: { shape: string }) {
  const [value, setValue] = useState("a")

  return (
    <ActionGroup
      mode="radio"
      value={value}
      onChange={setValue}
      indicator={shape as any}
      indicatorPosition={shape === "underline" || shape === "ring" ? "overlay" : "start"}
    >
      <ActionButton icon={<EditIcon />} label="A" value="a" />
      <ActionButton icon={<SelectAllIcon />} label="B" value="b" />
      <ActionButton icon={<VisibilityIcon />} label="C" value="c" />
    </ActionGroup>
  )
}

// =============================================================================
// Indicator Positions
// =============================================================================

/**
 * Indicator position variations
 */
export const IndicatorPositions: Story = {
  render: () => {
    const [value, setValue] = useState("a")

    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
            start
          </Typography>
          <ActionGroup mode="radio" value={value} onChange={setValue} indicator="circle" indicatorPosition="start">
            <ActionButton icon={<EditIcon />} label="A" value="a" />
            <ActionButton icon={<SelectAllIcon />} label="B" value="b" />
            <ActionButton icon={<VisibilityIcon />} label="C" value="c" />
          </ActionGroup>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
            end
          </Typography>
          <ActionGroup mode="radio" value={value} onChange={setValue} indicator="circle" indicatorPosition="end">
            <ActionButton icon={<EditIcon />} label="A" value="a" />
            <ActionButton icon={<SelectAllIcon />} label="B" value="b" />
            <ActionButton icon={<VisibilityIcon />} label="C" value="c" />
          </ActionGroup>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
            overlay (ring)
          </Typography>
          <ActionGroup mode="radio" value={value} onChange={setValue} indicator="ring" indicatorPosition="overlay">
            <ActionButton icon={<EditIcon />} label="A" value="a" />
            <ActionButton icon={<SelectAllIcon />} label="B" value="b" />
            <ActionButton icon={<VisibilityIcon />} label="C" value="c" />
          </ActionGroup>
        </Box>
      </Stack>
    )
  },
}

// =============================================================================
// Indicator Sizes
// =============================================================================

/**
 * Indicator size variations
 */
export const IndicatorSizes: Story = {
  render: () => {
    const sizes = ["xs", "sm", "md", "lg"] as const

    return (
      <Stack spacing={4}>
        {sizes.map(size => (
          <Box key={size}>
            <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
              {size}
            </Typography>
            <IndicatorSizeDemo size={size} />
          </Box>
        ))}
      </Stack>
    )
  },
}

function IndicatorSizeDemo({ size }: { size: "xs" | "sm" | "md" | "lg" }) {
  const [value, setValue] = useState("a")

  return (
    <ActionGroup
      mode="radio"
      value={value}
      onChange={setValue}
      indicator="circle"
      indicatorPosition="start"
      indicatorSize={size}
    >
      <ActionButton icon={<EditIcon />} label="A" value="a" />
      <ActionButton icon={<SelectAllIcon />} label="B" value="b" />
    </ActionGroup>
  )
}

// =============================================================================
// Buttons Mode (No Selection)
// =============================================================================

/**
 * Buttons mode - no selection state
 */
export const ButtonsMode: Story = {
  render: () => (
    <ActionGroup mode="buttons">
      <ActionButton icon={<FastRewindIcon />} label="Rewind" onClick={() => console.log("Rewind")} />
      <ActionButton icon={<PlayArrowIcon />} label="Play" onClick={() => console.log("Play")} />
      <ActionButton icon={<PauseIcon />} label="Pause" onClick={() => console.log("Pause")} />
      <ActionButton icon={<StopIcon />} label="Stop" onClick={() => console.log("Stop")} />
      <ActionButton icon={<FastForwardIcon />} label="Forward" onClick={() => console.log("Forward")} />
    </ActionGroup>
  ),
}

// =============================================================================
// Integration with ActionBar
// =============================================================================

/**
 * ActionGroup inside ActionBar
 */
export const InActionBar: Story = {
  render: () => {
    const [tool, setTool] = useState("edit")
    const [settings, setSettings] = useState({ grid: true, snap: false })

    return (
      <Stack spacing={4}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Tool Selection (Radio)</Typography>
          <ActionBar variant="glass">
            <ActionGroup mode="radio" value={tool} onChange={setTool} indicator="underline">
              <ActionButton icon={<EditIcon />} label="Edit" value="edit" />
              <ActionButton icon={<SelectAllIcon />} label="Select" value="select" />
              <ActionButton icon={<VisibilityIcon />} label="View" value="view" />
              <ActionButton icon={<CropIcon />} label="Crop" value="crop" />
            </ActionGroup>
          </ActionBar>
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Settings (Checkbox)</Typography>
          <ActionBar variant="outlined">
            <ActionGroup
              mode="checkbox"
              values={settings}
              onToggle={(id, checked) => setSettings(v => ({ ...v, [id]: checked }))}
              indicator="square"
            >
              <ActionButton icon={<GridOnIcon />} label="Grid" value="grid" />
              <ActionButton icon={<SnapToGridIcon />} label="Snap" value="snap" />
            </ActionGroup>
          </ActionBar>
        </Box>
      </Stack>
    )
  },
}

/**
 * Vertical orientation with ActionBar
 */
export const VerticalInActionBar: Story = {
  render: () => {
    const [value, setValue] = useState("edit")

    return (
      <ActionBar variant="glass" orientation="vertical">
        <ActionGroup mode="radio" value={value} onChange={setValue} indicator="circle" orientation="vertical">
          <ActionButton icon={<EditIcon />} label="Edit" value="edit" labelDisplay="icon-label-below" size="lg" />
          <ActionButton icon={<SelectAllIcon />} label="Select" value="select" labelDisplay="icon-label-below" size="lg" />
          <ActionButton icon={<VisibilityIcon />} label="View" value="view" labelDisplay="icon-label-below" size="lg" />
        </ActionGroup>
      </ActionBar>
    )
  },
}

// =============================================================================
// Real-World Examples
// =============================================================================

/**
 * Text formatting toolbar
 */
export const TextFormattingToolbar: Story = {
  render: () => {
    const [alignment, setAlignment] = useState("left")
    const [formatting, setFormatting] = useState({ bold: false, italic: false, underline: false })

    return (
      <ActionBar variant="frosted" gap={8}>
        <ActionGroup
          mode="checkbox"
          values={formatting}
          onToggle={(id, checked) => setFormatting(v => ({ ...v, [id]: checked }))}
        >
          <ActionButton icon={<FormatBoldIcon />} label="Bold" value="bold" />
          <ActionButton icon={<FormatItalicIcon />} label="Italic" value="italic" />
          <ActionButton icon={<FormatUnderlinedIcon />} label="Underline" value="underline" />
        </ActionGroup>

        <Box sx={{ width: 1, height: 24, borderLeft: "1px solid", borderColor: "divider" }} />

        <ActionGroup
          mode="radio"
          value={alignment}
          onChange={setAlignment}
          indicator="underline"
        >
          <ActionButton icon={<FormatAlignLeftIcon />} label="Left" value="left" />
          <ActionButton icon={<FormatAlignCenterIcon />} label="Center" value="center" />
          <ActionButton icon={<FormatAlignRightIcon />} label="Right" value="right" />
        </ActionGroup>
      </ActionBar>
    )
  },
}

/**
 * Media player controls
 */
export const MediaPlayerControls: Story = {
  render: () => {
    const [isPlaying, setIsPlaying] = useState(false)

    return (
      <ActionBar variant="solid" gap={4}>
        <ActionGroup mode="buttons">
          <ActionButton icon={<FastRewindIcon />} label="Rewind" />
        </ActionGroup>

        <ActionButton
          icon={<PlayArrowIcon />}
          iconOn={<PauseIcon />}
          label={isPlaying ? "Pause" : "Play"}
          active={isPlaying}
          onClick={() => setIsPlaying(!isPlaying)}
          size="lg"
        />

        <ActionGroup mode="buttons">
          <ActionButton icon={<FastForwardIcon />} label="Forward" />
        </ActionGroup>
      </ActionBar>
    )
  },
}

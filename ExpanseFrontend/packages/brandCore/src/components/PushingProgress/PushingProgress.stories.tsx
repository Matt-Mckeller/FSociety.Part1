import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Switch,
  FormControlLabel,
  Stack,
} from "@mui/material"
import { PushingProgressCharacter } from "./PushingProgressCharacter"
import { PRESETS, getPresetNames } from "../../character/presets"
import type { PushingMood } from "../../character/animation/types"

const MOODS: PushingMood[] = [
  "steady",
  "determined",
  "eager",
  "struggling",
  "casual",
]

const meta: Meta<typeof PushingProgressCharacter> = {
  title: "BrandCore/Character/4eye/PushingProgress",
  component: PushingProgressCharacter,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# PushingProgressCharacter

Animated character that pushes a progress bar across the screen with GSAP-powered transitions.

## Features
- Named presets with emotional moods
- Mood-based body language and secondary animations
- Progress range control (from/to)
- Looping support
- Celebration animation at 100%

## Moods
- **steady**: Calm, confident push - minimal secondary motion
- **determined**: Focused intensity - subtle periodic forward lean
- **eager**: Excited, energetic - bouncy vertical motion
- **struggling**: Tired, effortful - strain with slow recovery
- **casual**: Relaxed, easy - subtle side sway

## Presets
${getPresetNames()
  .map((name) => `- **${name}**: ${PRESETS[name].description}`)
  .join("\n")}
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    preset: {
      control: "select",
      options: getPresetNames(),
      description: "Named animation preset",
    },
    mood: {
      control: "select",
      options: MOODS,
      description: "Emotional mood during push (overrides preset)",
    },
    fromProgress: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Starting progress percentage",
    },
    toProgress: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Target progress percentage",
    },
    loop: {
      control: "boolean",
      description: "Whether to loop the animation",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic usage with default preset
 */
export const Basic: Story = {
  args: {
    preset: "default",
    fromProgress: 0,
    toProgress: 100,
    loop: true,
  },
}

/**
 * Interactive preset explorer with live controls
 */
export const PresetExplorer: Story = {
  render: () => {
    const [preset, setPreset] = useState("default")
    const [mood, setMood] = useState<PushingMood | undefined>(undefined)
    const [fromProgress, setFromProgress] = useState(0)
    const [toProgress, setToProgress] = useState(100)
    const [loop, setLoop] = useState(true)

    const presetConfig = PRESETS[preset]

    return (
      <Stack spacing={3}>
        <Typography variant="h6">Preset Explorer</Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Preset</InputLabel>
            <Select
              value={preset}
              label="Preset"
              onChange={(e) => setPreset(e.target.value)}
            >
              {getPresetNames().map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Mood Override</InputLabel>
            <Select
              value={mood ?? ""}
              label="Mood Override"
              onChange={(e) =>
                setMood((e.target.value as PushingMood) || undefined)
              }
            >
              <MenuItem value="">Use Preset</MenuItem>
              {MOODS.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={loop}
                onChange={(e) => setLoop(e.target.checked)}
              />
            }
            label="Loop"
          />
        </Box>

        <Box>
          <Typography variant="body2" gutterBottom>
            From: {fromProgress}% → To: {toProgress}%
          </Typography>
          <Slider
            value={[fromProgress, toProgress]}
            onChange={(_, value) => {
              const [from, to] = value as number[]
              setFromProgress(from)
              setToProgress(to)
            }}
            valueLabelDisplay="auto"
            min={0}
            max={100}
          />
        </Box>

        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 2,
            bgcolor: "#f5f5f5",
            overflow: "hidden",
          }}
        >
          <PushingProgressCharacter
            key={`${preset}-${mood}-${fromProgress}-${toProgress}`}
            preset={preset}
            mood={mood}
            fromProgress={fromProgress}
            toProgress={toProgress}
            loop={loop}
          />
        </Box>

        <Box sx={{ p: 2, bgcolor: "#f0f0f0", borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Preset: {presetConfig.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {presetConfig.description}
          </Typography>
          <Typography
            variant="caption"
            component="pre"
            sx={{ mt: 1, fontFamily: "monospace" }}
          >
            {`Push: mood=${presetConfig.push.mood}, speed=${presetConfig.push.speedFactor}
Walk: speed=${presetConfig.walk.walkingSpeed}s, duration=${presetConfig.walk.duration}s
Celebration: jump=${presetConfig.celebration.jumpHeight}px, bounces=${presetConfig.celebration.bounces}`}
          </Typography>
        </Box>
      </Stack>
    )
  },
}

/**
 * All presets side by side for comparison
 */
export const AllPresets: Story = {
  render: () => {
    const presets = getPresetNames()

    return (
      <Stack spacing={4}>
        <Typography variant="h6">Preset Comparison</Typography>
        {presets.map((presetName) => (
          <Box key={presetName}>
            <Typography variant="subtitle1" gutterBottom>
              {presetName}: {PRESETS[presetName].description}
            </Typography>
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: 1,
                p: 1,
                bgcolor: "#fafafa",
                overflow: "hidden",
              }}
            >
              <PushingProgressCharacter preset={presetName} loop={true} />
            </Box>
          </Box>
        ))}
      </Stack>
    )
  },
}

/**
 * All moods comparison
 */
export const AllMoods: Story = {
  render: () => {
    return (
      <Stack spacing={4}>
        <Typography variant="h6">Mood Comparison</Typography>
        <Typography variant="body2" color="text.secondary">
          Each mood conveys different emotional states during the push phase
        </Typography>
        {MOODS.map((moodName) => (
          <Box key={moodName}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ textTransform: "capitalize" }}
            >
              {moodName}
            </Typography>
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: 1,
                p: 1,
                bgcolor: "#fafafa",
                overflow: "hidden",
              }}
            >
              <PushingProgressCharacter mood={moodName} loop={true} />
            </Box>
          </Box>
        ))}
      </Stack>
    )
  },
}

/**
 * Struggling mood - visible effort and strain
 */
export const StrugglingMood: Story = {
  args: {
    preset: "effort",
    fromProgress: 0,
    toProgress: 100,
    loop: true,
  },
}

/**
 * Eager mood - bouncy, excited energy
 */
export const EagerMood: Story = {
  args: {
    preset: "bouncy",
    fromProgress: 0,
    toProgress: 100,
    loop: true,
  },
}

/**
 * Partial progress - stops without celebration
 */
export const PartialProgress: Story = {
  args: {
    preset: "default",
    fromProgress: 0,
    toProgress: 65,
    loop: true,
  },
}

/**
 * Quick preset - determined, focused push
 */
export const QuickPreset: Story = {
  args: {
    preset: "quick",
    fromProgress: 0,
    toProgress: 100,
    loop: true,
  },
}

/**
 * Dramatic preset with big celebration
 */
export const DramaticPreset: Story = {
  args: {
    preset: "dramatic",
    fromProgress: 0,
    toProgress: 100,
    loop: true,
  },
}

/**
 * Casual mood - relaxed, easy pace
 */
export const CasualMood: Story = {
  args: {
    mood: "casual",
    fromProgress: 0,
    toProgress: 100,
    loop: true,
  },
}

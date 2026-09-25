"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, Typography } from "@mui/material"
import { StaticCharacter, CharacterState } from "expanse.ui/game"

/**
 * Character component that displays static character poses.
 * Used throughout the application for visual feedback and engagement.
 * Supports multiple poses including standing, pushing, and celebration states.
 */
const meta: Meta<typeof StaticCharacter> = {
  title: "Game/Characters/StaticCharacter",
  component: StaticCharacter,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 4 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    state: {
      control: "select",
      options: Object.values(CharacterState),
      description: "The pose/state of the character",
    },
    enableTestingBorders: {
      control: "boolean",
      description: "Show testing borders for layout debugging",
    },
  },
}

export default meta
type Story = StoryObj<typeof StaticCharacter>

// =============================================================================
// Individual Pose Stories
// =============================================================================

export const ForwardStanding: Story = {
  name: "Forward Standing",
  args: {
    state: CharacterState.forwardStanding,
  },
  render: (args) => (
    <Box sx={{ width: 200, height: 300 }}>
      <StaticCharacter {...args} />
    </Box>
  ),
}

export const LeftStanding: Story = {
  name: "Left Standing",
  args: {
    state: CharacterState.leftStanding,
  },
  render: (args) => (
    <Box sx={{ width: 200, height: 300 }}>
      <StaticCharacter {...args} />
    </Box>
  ),
}

export const RightStanding: Story = {
  name: "Right Standing",
  args: {
    state: CharacterState.rightStanding,
  },
  render: (args) => (
    <Box sx={{ width: 200, height: 300 }}>
      <StaticCharacter {...args} />
    </Box>
  ),
}

export const RightPushing: Story = {
  name: "Right Pushing",
  args: {
    state: CharacterState.rightPushing,
  },
  render: (args) => (
    <Box sx={{ width: 200, height: 300 }}>
      <StaticCharacter {...args} />
    </Box>
  ),
}

export const Celebration1: Story = {
  name: "Celebration 1",
  args: {
    state: CharacterState.celebration1,
  },
  render: (args) => (
    <Box sx={{ width: 200, height: 300 }}>
      <StaticCharacter {...args} />
    </Box>
  ),
}

export const Celebration2: Story = {
  name: "Celebration 2",
  args: {
    state: CharacterState.celebration2,
  },
  render: (args) => (
    <Box sx={{ width: 200, height: 300 }}>
      <StaticCharacter {...args} />
    </Box>
  ),
}

// =============================================================================
// Comparison Stories
// =============================================================================

export const AllPoses: StoryObj = {
  name: "All Poses",
  render: () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Character Poses Gallery
      </Typography>
      <Stack direction="row" spacing={4} alignItems="end" flexWrap="wrap">
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 120, height: 180, mb: 1 }}>
            <StaticCharacter state={CharacterState.forwardStanding} />
          </Box>
          <Typography variant="caption" display="block">
            Forward Standing
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 120, height: 180, mb: 1 }}>
            <StaticCharacter state={CharacterState.leftStanding} />
          </Box>
          <Typography variant="caption" display="block">
            Left Standing
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 120, height: 180, mb: 1 }}>
            <StaticCharacter state={CharacterState.rightStanding} />
          </Box>
          <Typography variant="caption" display="block">
            Right Standing
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 120, height: 180, mb: 1 }}>
            <StaticCharacter state={CharacterState.rightPushing} />
          </Box>
          <Typography variant="caption" display="block">
            Right Pushing
          </Typography>
        </Box>
      </Stack>
    </Box>
  ),
}

export const CelebrationPoses: StoryObj = {
  name: "Celebration Poses",
  render: () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Celebration Variants
      </Typography>
      <Stack direction="row" spacing={6} alignItems="center">
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 150, height: 220, mb: 1 }}>
            <StaticCharacter state={CharacterState.celebration1} />
          </Box>
          <Typography variant="caption" display="block">
            Celebration 1
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 150, height: 220, mb: 1 }}>
            <StaticCharacter state={CharacterState.celebration2} />
          </Box>
          <Typography variant="caption" display="block">
            Celebration 2
          </Typography>
        </Box>
      </Stack>
    </Box>
  ),
}

export const StandingDirections: StoryObj = {
  name: "Standing Directions",
  render: () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Standing Direction Comparison
      </Typography>
      <Stack direction="row" spacing={4} alignItems="center">
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 140, height: 200, mb: 1 }}>
            <StaticCharacter state={CharacterState.leftStanding} />
          </Box>
          <Typography variant="caption" display="block">
            Left
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 140, height: 200, mb: 1 }}>
            <StaticCharacter state={CharacterState.forwardStanding} />
          </Box>
          <Typography variant="caption" display="block">
            Forward
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 140, height: 200, mb: 1 }}>
            <StaticCharacter state={CharacterState.rightStanding} />
          </Box>
          <Typography variant="caption" display="block">
            Right
          </Typography>
        </Box>
      </Stack>
    </Box>
  ),
}

// =============================================================================
// Size Variations
// =============================================================================

export const SizeVariations: StoryObj = {
  name: "Size Variations",
  render: () => (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Character at Different Sizes
      </Typography>
      <Stack direction="row" spacing={4} alignItems="end">
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 60, height: 90, mb: 1 }}>
            <StaticCharacter state={CharacterState.forwardStanding} />
          </Box>
          <Typography variant="caption" display="block">
            Small (60x90)
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 100, height: 150, mb: 1 }}>
            <StaticCharacter state={CharacterState.forwardStanding} />
          </Box>
          <Typography variant="caption" display="block">
            Medium (100x150)
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 150, height: 225, mb: 1 }}>
            <StaticCharacter state={CharacterState.forwardStanding} />
          </Box>
          <Typography variant="caption" display="block">
            Large (150x225)
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ width: 200, height: 300, mb: 1 }}>
            <StaticCharacter state={CharacterState.forwardStanding} />
          </Box>
          <Typography variant="caption" display="block">
            XL (200x300)
          </Typography>
        </Box>
      </Stack>
    </Box>
  ),
}

// =============================================================================
// Debug Mode
// =============================================================================

export const WithTestingBorders: Story = {
  name: "With Testing Borders",
  args: {
    state: CharacterState.forwardStanding,
    enableTestingBorders: true,
  },
  render: (args) => (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Testing borders enabled for layout debugging
      </Typography>
      <Box sx={{ width: 200, height: 300 }}>
        <StaticCharacter {...args} />
      </Box>
    </Box>
  ),
}

// =============================================================================
// Interactive Playground
// =============================================================================

export const Playground: Story = {
  name: "Interactive Playground",
  args: {
    state: CharacterState.forwardStanding,
    enableTestingBorders: false,
  },
  render: (args) => (
    <Box sx={{ width: 200, height: 300 }}>
      <StaticCharacter {...args} />
    </Box>
  ),
}

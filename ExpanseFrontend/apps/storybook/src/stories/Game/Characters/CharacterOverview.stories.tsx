"use client"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, Grid, Stack } from "@mui/material"
import {
  CharacterForwardStanding,
  CharacterLeftStanding,
  CharacterRightStanding,
  CharacterCelebration1,
  CharacterCelebration2,
  CharacterRightPushing,
  CharacterAll,
  CharacterPositionProvider,
} from "expanse.ui/game"

const CharacterShowcase = () => {
  return (
    <Box sx={{ maxWidth: 900 }}>
      <Typography variant="h4" gutterBottom>
        Character Components
      </Typography>

      <Typography variant="body1" paragraph>
        These character components render SVG-based stick figure characters with
        themed colors. They are used throughout the gamification system.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={6} sm={4} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              sx={{
                height: 150,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CharacterForwardStanding />
            </Box>
            <Typography variant="caption">CharacterForwardStanding</Typography>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={4} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              sx={{
                height: 150,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CharacterLeftStanding />
            </Box>
            <Typography variant="caption">CharacterLeftStanding</Typography>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={4} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              sx={{
                height: 150,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CharacterRightStanding />
            </Box>
            <Typography variant="caption">CharacterRightStanding</Typography>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={4} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              sx={{
                height: 150,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CharacterCelebration1 />
            </Box>
            <Typography variant="caption">CharacterCelebration1</Typography>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={4} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              sx={{
                height: 150,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CharacterCelebration2 />
            </Box>
            <Typography variant="caption">CharacterCelebration2</Typography>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={4} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              sx={{
                height: 150,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CharacterRightPushing />
            </Box>
            <Typography variant="caption">CharacterRightPushing</Typography>
          </Paper>
        </Grid>

        <Grid item xs={6} sm={4} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Box
              sx={{
                height: 150,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CharacterPositionProvider>
                <CharacterAll />
              </CharacterPositionProvider>
            </Box>
            <Typography variant="caption">CharacterAll</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 3, bgcolor: "info.light" }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Theming
        </Typography>
        <Typography variant="body2">
          Character colors are controlled by the theme via{" "}
          <code>theme.components.ExpanseCharacter.variants.default</code>:
        </Typography>
        <ul>
          <li>
            <strong>headColor:</strong> Color of the character's head
          </li>
          <li>
            <strong>bodyColor:</strong> Color of the character's torso
          </li>
          <li>
            <strong>limbColor:</strong> Color of arms and legs
          </li>
        </ul>
      </Paper>
    </Box>
  )
}

const meta: Meta<typeof CharacterShowcase> = {
  title: "Game/Characters/Overview",
  component: CharacterShowcase,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "SVG-based character components with themed colors.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof CharacterShowcase>

export const AllCharacters: Story = {}

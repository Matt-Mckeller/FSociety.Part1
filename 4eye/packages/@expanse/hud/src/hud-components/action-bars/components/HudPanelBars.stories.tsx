import type { Meta, StoryObj } from "@storybook/react"
import React, { useState } from "react"
import { Box, Stack, Typography } from "@mui/material"

import { GameActionBar } from "./GameActionBar"
import { SettingsActionBar } from "./SettingsActionBar"

const meta: Meta = {
  title: "Layout Systems/HUD Components/ActionBar/HUD Panel Bars",
  parameters: {
    layout: "centered",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
  },
}
export default meta

type Story = StoryObj

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function Label({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="caption"
      sx={{ color: "text.secondary", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}
    >
      {children}
    </Typography>
  )
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Game: Story = {
  name: "GameActionBar",
  render: () => (
    <Stack spacing={2} sx={{
      alignItems: "center"
    }}>
      <Label>Game Action Bar</Label>
      <GameActionBar />
    </Stack>
  ),
}

export const Settings: Story = {
  name: "SettingsActionBar",
  render: () => {
    function Demo() {
      const [mode, setMode] = useState<"light" | "dark">("light")
      return (
        <Stack spacing={2} sx={{
          alignItems: "center"
        }}>
          <Label>Settings Action Bar — mode: {mode}</Label>
          <SettingsActionBar mode={mode} onThemeModeChange={setMode} />
        </Stack>
      );
    }
    return <Demo />
  },
}

export const SideBySide: Story = {
  name: "Both — side by side",
  render: () => {
    function Demo() {
      const [mode, setMode] = useState<"light" | "dark">("light")
      return (
        <Box
          sx={{
            display: "flex",
            gap: 6,
            alignItems: "flex-start",
            p: 4,
            bgcolor: "rgba(241,245,249,0.8)",
            borderRadius: 3,
          }}
        >
          <Stack spacing={1.5} sx={{
            alignItems: "center"
          }}>
            <Label>Game</Label>
            <GameActionBar />
          </Stack>
          <Stack spacing={1.5} sx={{
            alignItems: "center"
          }}>
            <Label>Settings</Label>
            <SettingsActionBar mode={mode} onThemeModeChange={setMode} />
          </Stack>
        </Box>
      );
    }
    return <Demo />
  },
}

"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, alpha, ButtonBase, useTheme } from "@mui/material"
import React, { useState } from "react"

/**
 * A toggle switch for switching between light and dark theme modes.
 * Features sun/moon icons and smooth transitions.
 * 
 * Note: This is a visual demonstration. The actual component requires ThemeContext.
 */
const meta: Meta = {
  title: "Theme/Layout/LightDarkModeToggle",
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
}

export default meta

// Standalone demo component that doesn't require context
const LightDarkModeToggleDemo = ({ 
  initialMode = "light" 
}: { 
  initialMode?: "light" | "dark" 
}) => {
  const theme = useTheme()
  const [mode, setMode] = useState<"light" | "dark">(initialMode)
  const checked = mode === "dark"

  const handleChange = () => {
    setMode(checked ? "light" : "dark")
  }

  const totalWidth = 54
  const totalHeight = 28
  const thumbHeightAndWidth = 26
  const trackHeight = thumbHeightAndWidth / 2

  const thumbColor = theme.palette.text.primary
  const iconColor = theme.palette.background.default
  const borderColor = alpha(theme.palette.text.primary, 0.66)
  
  const imgBGDark = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="${trackHeight}" width="${trackHeight}" viewBox="0 0 20 20"><path fill="${encodeURIComponent(iconColor)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
  const imgBGLight = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="${trackHeight}" width="${trackHeight}" viewBox="0 0 20 20"><path fill="${encodeURIComponent(iconColor)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <Typography variant="caption" color="text.secondary">
        Current mode: {mode}
      </Typography>
      <Box
        onClick={handleChange}
        sx={{
          width: totalWidth,
          height: totalHeight,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          cursor: "pointer",
          margin: "auto 0",
        }}
      >
        <Box
          id="track"
          sx={{
            width: "100%",
            height: trackHeight,
            border: `1px solid ${borderColor}`,
            borderRadius: "15px",
          }}
        />
        <ButtonBase
          id="thumb"
          sx={{
            width: thumbHeightAndWidth,
            height: thumbHeightAndWidth,
            position: "absolute",
            backgroundColor: thumbColor,
            borderRadius: "50%",
            left: !checked ? 0 : undefined,
            right: checked ? 0 : undefined,
            transition: "all 0.2s ease-in-out",
            backgroundImage: checked ? imgBGDark : imgBGLight,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </Box>
    </Box>
  )
}

export const LightMode: StoryObj = {
  name: "Light Mode (Initial)",
  render: () => <LightDarkModeToggleDemo initialMode="light" />,
}

export const DarkMode: StoryObj = {
  name: "Dark Mode (Initial)",
  render: () => <LightDarkModeToggleDemo initialMode="dark" />,
}

export const Interactive: StoryObj = {
  name: "Interactive Toggle",
  render: () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
      <Typography variant="h6">Click to toggle</Typography>
      <LightDarkModeToggleDemo initialMode="light" />
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300, textAlign: "center" }}>
        In the actual application, this toggle switches between the light and dark theme configurations.
      </Typography>
    </Box>
  ),
}

export const InHeader: StoryObj = {
  name: "In Header Context",
  render: () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: 1,
        width: 400,
      }}
    >
      <Typography variant="h6">Application</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body2">Theme:</Typography>
        <LightDarkModeToggleDemo initialMode="light" />
      </Box>
    </Box>
  ),
}

export const MultipleSizes: StoryObj = {
  name: "Size Reference",
  render: () => {
    const SizedToggle = ({ scale, label }: { scale: number; label: string }) => {
      const theme = useTheme()
      const [checked, setChecked] = useState(false)
      
      const totalWidth = 54 * scale
      const totalHeight = 28 * scale
      const thumbHeightAndWidth = 26 * scale
      const trackHeight = (thumbHeightAndWidth / 2)
      
      const thumbColor = theme.palette.text.primary
      const borderColor = alpha(theme.palette.text.primary, 0.66)

      return (
        <Box sx={{ textAlign: "center" }}>
          <Box
            onClick={() => setChecked(!checked)}
            sx={{
              width: totalWidth,
              height: totalHeight,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              cursor: "pointer",
              mb: 1,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: trackHeight,
                border: `1px solid ${borderColor}`,
                borderRadius: "15px",
              }}
            />
            <ButtonBase
              sx={{
                width: thumbHeightAndWidth,
                height: thumbHeightAndWidth,
                position: "absolute",
                backgroundColor: thumbColor,
                borderRadius: "50%",
                left: !checked ? 0 : undefined,
                right: checked ? 0 : undefined,
                transition: "all 0.2s ease-in-out",
              }}
            />
          </Box>
          <Typography variant="caption">{label}</Typography>
        </Box>
      )
    }

    return (
      <Box sx={{ display: "flex", gap: 4, alignItems: "end" }}>
        <SizedToggle scale={0.75} label="Small (0.75x)" />
        <SizedToggle scale={1} label="Default (1x)" />
        <SizedToggle scale={1.25} label="Large (1.25x)" />
      </Box>
    )
  },
}

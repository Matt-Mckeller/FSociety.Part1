"use client"

import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Divider, useTheme } from "@mui/material"
import { ColorSwatch, ColorSwatchGroup } from "./ColorSwatch.component"

/**
 * The Color Palette showcases all theme colors with their values
 * and WCAG accessibility information.
 *
 * Each color swatch displays:
 * - Visual color sample
 * - Color name (semantic path like "primary.main")
 * - Hex value with copy-to-clipboard
 * - WCAG contrast ratings against white and black
 *
 * Use the theme selector in the Storybook toolbar to switch between themes.
 */
const meta: Meta = {
  title: "Brand/Color Palette",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The color palette is organized into semantic categories:

- **Primary Colors**: Main brand colors used for key UI elements
- **Secondary Colors**: Accent colors for secondary actions
- **Background Colors**: Surface and container colors
- **Text Colors**: Typography colors for different emphasis levels
- **Semantic Colors**: Status colors (error, success, warning, info)
- **Common Colors**: Base colors (black, white, gray)
        `,
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

/**
 * Extracts colors from the current theme palette
 */
function useThemeColors() {
  const theme = useTheme()
  const palette = theme.palette

  return {
    primary: [
      { name: "primary.main", color: palette.primary.main },
      { name: "primary.light", color: palette.primary.light },
      { name: "primary.dark", color: palette.primary.dark },
      { name: "primary.contrastText", color: palette.primary.contrastText },
      ...(palette.primary.highSaturation
        ? [{ name: "primary.highSaturation", color: palette.primary.highSaturation as string }]
        : []),
    ],
    secondary: [
      { name: "secondary.main", color: palette.secondary.main },
      { name: "secondary.light", color: palette.secondary.light },
      { name: "secondary.dark", color: palette.secondary.dark },
      { name: "secondary.contrastText", color: palette.secondary.contrastText },
    ],
    background: [
      { name: "background.default", color: palette.background.default },
      { name: "background.paper", color: palette.background.paper },
      ...(palette.background.light
        ? [{ name: "background.light", color: palette.background.light as string }]
        : []),
      ...(palette.background.medium
        ? [{ name: "background.medium", color: palette.background.medium as string }]
        : []),
      ...(palette.background.dark
        ? [{ name: "background.dark", color: palette.background.dark as string }]
        : []),
      ...(palette.background.backdrop
        ? [{ name: "background.backdrop", color: palette.background.backdrop as string }]
        : []),
    ],
    text: [
      { name: "text.primary", color: palette.text.primary },
      { name: "text.secondary", color: palette.text.secondary },
      { name: "text.disabled", color: palette.text.disabled },
    ],
    semantic: [
      { name: "error.main", color: palette.error.main },
      { name: "error.light", color: palette.error.light },
      { name: "error.dark", color: palette.error.dark },
      { name: "success.main", color: palette.success.main },
      { name: "success.light", color: palette.success.light },
      { name: "success.dark", color: palette.success.dark },
      { name: "warning.main", color: palette.warning.main },
      { name: "warning.light", color: palette.warning.light },
      { name: "warning.dark", color: palette.warning.dark },
      { name: "info.main", color: palette.info.main },
      { name: "info.light", color: palette.info.light },
      { name: "info.dark", color: palette.info.dark },
    ],
    common: [
      { name: "common.black", color: palette.common.black },
      { name: "common.white", color: palette.common.white },
      ...(palette.common.gray
        ? [{ name: "common.gray", color: palette.common.gray as string }]
        : []),
    ],
    divider: [{ name: "divider", color: palette.divider }],
  }
}

/**
 * Complete color palette display with all theme colors
 */
function ColorPaletteDisplay({ size = "medium", showBrandContext = false }: { size?: "small" | "medium" | "large"; showBrandContext?: boolean }) {
  const theme = useTheme()
  const colors = useThemeColors()

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Color Palette
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: showBrandContext ? 2 : 0 }}>
          Theme: {theme.palette.mode === "dark" ? "Dark" : "Light"} Mode
        </Typography>
        {showBrandContext && (
          <Box sx={{ 
            p: 2, 
            bgcolor: "background.paper", 
            borderRadius: 1, 
            border: "1px solid",
            borderColor: "divider",
            mt: 2 
          }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Purple (HSL 277)</strong> is the signature Expanse brand color, representing
              creativity, wisdom, and premium quality. Secondary colors provide accent and contrast,
              while semantic colors communicate status and feedback.
            </Typography>
          </Box>
        )}
      </Box>

      <ColorSwatchGroup title="Primary Colors" colors={colors.primary} size={size} />
      <ColorSwatchGroup title="Secondary Colors" colors={colors.secondary} size={size} />
      
      <Divider sx={{ my: 4 }} />
      
      <ColorSwatchGroup title="Background Colors" colors={colors.background} size={size} />
      <ColorSwatchGroup title="Text Colors" colors={colors.text} size={size} />
      
      <Divider sx={{ my: 4 }} />
      
      <ColorSwatchGroup title="Semantic Colors" colors={colors.semantic} size={size} />
      <ColorSwatchGroup title="Common Colors" colors={colors.common} size={size} />
    </Box>
  )
}

/**
 * Full color palette with all theme colors and brand context
 */
export const FullPalette: StoryObj = {
  name: "Full Palette",
  render: () => <ColorPaletteDisplay size="medium" showBrandContext={true} />,
}

/**
 * Compact view for quick reference
 */
export const CompactPalette: StoryObj = {
  name: "Compact View",
  render: () => <ColorPaletteDisplay size="small" />,
}

/**
 * Primary colors only
 */
export const PrimaryColors: StoryObj = {
  name: "Primary Colors",
  render: () => {
    const colors = useThemeColors()
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Primary Colors
        </Typography>
        <ColorSwatchGroup title="" colors={colors.primary} size="large" />
      </Box>
    )
  },
}

/**
 * Semantic colors (error, success, warning, info)
 */
export const SemanticColors: StoryObj = {
  name: "Semantic Colors",
  render: () => {
    const colors = useThemeColors()
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Semantic Colors
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {colors.semantic.map((c) => (
            <ColorSwatch key={c.name} {...c} size="medium" />
          ))}
        </Box>
      </Box>
    )
  },
}

/**
 * Single color swatch component demo
 */
export const SingleSwatch: StoryObj = {
  name: "Single Swatch",
  render: () => {
    const theme = useTheme()
    return (
      <Box sx={{ display: "flex", gap: 3 }}>
        <ColorSwatch
          name="primary.main"
          color={theme.palette.primary.main}
          size="large"
        />
        <ColorSwatch
          name="secondary.main"
          color={theme.palette.secondary.main}
          size="large"
        />
        <ColorSwatch
          name="error.main"
          color={theme.palette.error.main}
          size="large"
        />
      </Box>
    )
  },
}

/**
 * Background and surface colors
 */
export const BackgroundColors: StoryObj = {
  name: "Background Colors",
  render: () => {
    const colors = useThemeColors()
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Background & Surface Colors
        </Typography>
        <ColorSwatchGroup title="" colors={colors.background} size="large" />
      </Box>
    )
  },
}

/**
 * Text colors with usage context
 */
export const TextColors: StoryObj = {
  name: "Text Colors",
  render: () => {
    const theme = useTheme()
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Text Colors
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{ p: 3, bgcolor: "background.paper", borderRadius: 1 }}>
            <Typography color="text.primary" variant="body1" sx={{ mb: 1 }}>
              text.primary - Used for main content and headings
            </Typography>
            <Typography color="text.secondary" variant="body1" sx={{ mb: 1 }}>
              text.secondary - Used for secondary information
            </Typography>
            <Typography color="text.disabled" variant="body1">
              text.disabled - Used for disabled or inactive text
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <ColorSwatch
              name="text.primary"
              color={theme.palette.text.primary}
              size="medium"
            />
            <ColorSwatch
              name="text.secondary"
              color={theme.palette.text.secondary}
              size="medium"
            />
            <ColorSwatch
              name="text.disabled"
              color={theme.palette.text.disabled}
              size="medium"
            />
          </Box>
        </Box>
      </Box>
    )
  },
}

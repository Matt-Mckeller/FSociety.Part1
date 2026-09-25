import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, Button, Chip, useTheme, ThemeProvider, createTheme } from "@mui/material"
import {
  lightThemePalette,
  darkThemePalette,
  blueLightThemePalette,
  blueDarkThemePalette,
  redLightThemePalette,
  redDarkThemePalette,
  greenLightThemePalette,
  greenDarkThemePalette,
  orangeLightThemePalette,
  orangeDarkThemePalette,
  tealLightThemePalette,
  tealDarkThemePalette,
  lightThemeShadows,
  darkThemeEmptyShadowArray,
  expanseLightComponents,
  expanseDarkComponents,
  blueLightComponents,
  blueDarkComponents,
  redLightComponents,
  redDarkComponents,
  greenLightComponents,
  greenDarkComponents,
  orangeLightComponents,
  orangeDarkComponents,
  tealLightComponents,
  tealDarkComponents,
  breakpoints,
  getComponents,
  mixins,
  spacing,
  typography,
  zIndex,
} from "../configs"

/**
 * Theme Comparison allows you to see all available theme variants side by side.
 * This helps in understanding how components look across different color schemes.
 *
 * **Purple is the primary brand color**, but alternative color themes are available
 * for specific use cases or user preferences.
 */
const meta: Meta = {
  title: "Brand/Theme Comparison",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Compare all 12 theme variants (6 colors × 2 modes):

- **Purple** (Primary Brand) - Signature Expanse color
- **Blue** - Alternative professional theme
- **Red** - High energy, attention-grabbing
- **Green** - Nature, growth, success
- **Orange** - Warm, creative, energetic
- **Teal** - Modern, fresh, technological
        `,
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

// Theme configurations
const themeConfigs = {
  purple: {
    name: "Purple",
    emoji: "💜",
    isPrimary: true,
    light: {
      palette: lightThemePalette,
      shadows: lightThemeShadows,
      components: expanseLightComponents,
    },
    dark: {
      palette: darkThemePalette,
      shadows: darkThemeEmptyShadowArray,
      components: expanseDarkComponents,
    },
  },
  blue: {
    name: "Blue",
    emoji: "💙",
    isPrimary: false,
    light: {
      palette: blueLightThemePalette,
      shadows: lightThemeShadows,
      components: blueLightComponents,
    },
    dark: {
      palette: blueDarkThemePalette,
      shadows: darkThemeEmptyShadowArray,
      components: blueDarkComponents,
    },
  },
  red: {
    name: "Red",
    emoji: "❤️",
    isPrimary: false,
    light: {
      palette: redLightThemePalette,
      shadows: lightThemeShadows,
      components: redLightComponents,
    },
    dark: {
      palette: redDarkThemePalette,
      shadows: darkThemeEmptyShadowArray,
      components: redDarkComponents,
    },
  },
  green: {
    name: "Green",
    emoji: "💚",
    isPrimary: false,
    light: {
      palette: greenLightThemePalette,
      shadows: lightThemeShadows,
      components: greenLightComponents,
    },
    dark: {
      palette: greenDarkThemePalette,
      shadows: darkThemeEmptyShadowArray,
      components: greenDarkComponents,
    },
  },
  orange: {
    name: "Orange",
    emoji: "🧡",
    isPrimary: false,
    light: {
      palette: orangeLightThemePalette,
      shadows: lightThemeShadows,
      components: orangeLightComponents,
    },
    dark: {
      palette: orangeDarkThemePalette,
      shadows: darkThemeEmptyShadowArray,
      components: orangeDarkComponents,
    },
  },
  teal: {
    name: "Teal",
    emoji: "🩵",
    isPrimary: false,
    light: {
      palette: tealLightThemePalette,
      shadows: lightThemeShadows,
      components: tealLightComponents,
    },
    dark: {
      palette: tealDarkThemePalette,
      shadows: darkThemeEmptyShadowArray,
      components: tealDarkComponents,
    },
  },
}

type ThemeColor = keyof typeof themeConfigs

function createAppTheme(mode: "light" | "dark", colorName: ThemeColor) {
  const config = themeConfigs[colorName][mode]
  return createTheme({
    spacing,
    palette: config.palette,
    mixins,
    typography,
    components: getComponents(config.palette, config.shadows, config.components),
    shadows: config.shadows,
    zIndex,
    breakpoints,
  })
}

/**
 * Theme preview card showing primary color and sample components
 */
function ThemePreviewCard({
  colorName,
  mode,
}: {
  colorName: ThemeColor
  mode: "light" | "dark"
}) {
  const config = themeConfigs[colorName]
  const theme = createAppTheme(mode, colorName)

  return (
    <ThemeProvider theme={theme}>
      <Paper
        variant="outlined"
        sx={{
          overflow: "hidden",
          bgcolor: "background.default",
          minWidth: 200,
        }}
      >
        {/* Color header */}
        <Box
          sx={{
            p: 2,
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {config.emoji} {config.name}
            {config.isPrimary && (
              <Chip
                label="Primary"
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.6rem",
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "inherit",
                }}
              />
            )}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            {mode === "light" ? "Light" : "Dark"} Mode
          </Typography>
        </Box>

        {/* Sample content */}
        <Box sx={{ p: 2, bgcolor: "background.default" }}>
          <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
            Primary text sample
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
            Secondary text sample
          </Typography>

          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <Button variant="contained" size="small">
              Primary
            </Button>
            <Button variant="outlined" size="small">
              Outlined
            </Button>
          </Box>

          {/* Color swatches */}
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Box sx={{ width: 24, height: 24, bgcolor: "primary.dark", borderRadius: 0.5 }} />
            <Box sx={{ width: 24, height: 24, bgcolor: "primary.main", borderRadius: 0.5 }} />
            <Box sx={{ width: 24, height: 24, bgcolor: "primary.light", borderRadius: 0.5 }} />
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  )
}

/**
 * All themes grid showing every variant
 */
export const AllThemes: StoryObj = {
  name: "All Themes",
  render: () => {
    const colorNames = Object.keys(themeConfigs) as ThemeColor[]

    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Theme Comparison
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          All 12 theme variants (6 colors × 2 modes). Purple is the primary brand color.
        </Typography>

        {/* Light Mode */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          ☀️ Light Mode
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 2,
            mb: 4,
          }}
        >
          {colorNames.map((color) => (
            <ThemePreviewCard key={`${color}-light`} colorName={color} mode="light" />
          ))}
        </Box>

        {/* Dark Mode */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          🌙 Dark Mode
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 2,
          }}
        >
          {colorNames.map((color) => (
            <ThemePreviewCard key={`${color}-dark`} colorName={color} mode="dark" />
          ))}
        </Box>
      </Box>
    )
  },
}

/**
 * Primary colors comparison
 */
export const PrimaryColorsComparison: StoryObj = {
  name: "Primary Colors Only",
  render: () => {
    const colorNames = Object.keys(themeConfigs) as ThemeColor[]
    const currentTheme = useTheme()
    const mode = currentTheme.palette.mode

    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Primary Colors
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Comparing primary.main across all color themes in {mode} mode.
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {colorNames.map((color) => {
            const theme = createAppTheme(mode, color)
            const config = themeConfigs[color]
            return (
              <Box key={color} sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: theme.palette.primary.main,
                    borderRadius: 2,
                    mb: 1,
                    border: config.isPrimary ? "3px solid gold" : "none",
                  }}
                />
                <Typography variant="caption" sx={{ fontWeight: config.isPrimary ? 700 : 400 }}>
                  {config.emoji} {config.name}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ fontFamily: "monospace", fontSize: "0.6rem", color: "text.secondary" }}
                >
                  {theme.palette.primary.main}
                </Typography>
              </Box>
            )
          })}
        </Box>
      </Box>
    )
  },
}

/**
 * Light vs Dark mode comparison for a single color
 */
export const LightVsDark: StoryObj = {
  name: "Light vs Dark",
  render: () => {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Light vs Dark Mode
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Side-by-side comparison of each color theme in both modes.
        </Typography>

        {(Object.keys(themeConfigs) as ThemeColor[]).map((color) => (
          <Box key={color} sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {themeConfigs[color].emoji} {themeConfigs[color].name}
              {themeConfigs[color].isPrimary && (
                <Chip label="Primary Brand" size="small" color="primary" sx={{ ml: 1 }} />
              )}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <ThemePreviewCard colorName={color} mode="light" />
              <ThemePreviewCard colorName={color} mode="dark" />
            </Box>
          </Box>
        ))}
      </Box>
    )
  },
}

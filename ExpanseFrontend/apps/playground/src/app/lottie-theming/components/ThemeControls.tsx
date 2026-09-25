"use client"

import React from "react"
import {
  Box,
  Paper,
  Typography,
  ButtonBase,
  Checkbox,
  FormControlLabel,
  Collapse,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import { useDemoTheme } from "../../../contexts/DemoThemeContext"
import {
  ColorThemeName,
  THEME_DISPLAY_NAMES,
  getThemeGradient,
  COLOR_PALETTES,
} from "../../../constants/colorPalettes"
import { LightDarkModeToggleSwitch } from "expanse.ui/theme"

interface ThemeControlsProps {
  variant?: "full" | "compact"
  showAdvanced?: boolean
}

/**
 * Theme Controls Component
 *
 * Provides UI for:
 * - Light/Dark mode toggle (using personalNext's component)
 * - Color theme selection (gallery-inspired circles)
 * - Advanced settings (optional)
 */
export function ThemeControls({
  variant = "full",
  showAdvanced = true,
}: ThemeControlsProps) {
  const theme = useTheme()
  const {
    mode,
    colorTheme,
    setColorTheme,
    showColorMappings,
    showConsoleLogs,
    setShowColorMappings,
    setShowConsoleLogs,
  } = useDemoTheme()

  const [advancedExpanded, setAdvancedExpanded] = React.useState(false)

  const colorThemes: ColorThemeName[] = [
    "purple",
    "blue",
    "red",
    "green",
    "orange",
    "teal",
  ]

  return (
    <Paper
      elevation={3}
      sx={{
        p: variant === "full" ? 3 : 2,
        borderRadius: 2,
        background:
          theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Box display="flex" flexDirection="column" gap={3}>
        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="h3">
            🎨 Theme Controls
          </Typography>
        </Box>

        {/* Light/Dark Mode Toggle */}
        <Box>
          <Typography variant="body2" gutterBottom color="text.secondary">
            Appearance:
          </Typography>
          <Box display="flex" alignItems="center" gap={2} mt={1}>
            <Typography variant="body2" sx={{ minWidth: 50 }}>
              {mode === "light" ? "☀️ Light" : "🌙 Dark"}
            </Typography>
            <LightDarkModeToggleSwitch />
          </Box>
        </Box>

        {/* Color Theme Selection */}
        <Box>
          <Typography variant="body2" gutterBottom color="text.secondary">
            Theme Color:
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns={
              variant === "full" ? "repeat(3, 1fr)" : "repeat(2, 1fr)"
            }
            gap={2}
            mt={1}
          >
            {colorThemes.map((themeName) => (
              <Box
                key={themeName}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Tooltip title={THEME_DISPLAY_NAMES[themeName]} arrow>
                  <ButtonBase
                    onClick={() => setColorTheme(themeName)}
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: getThemeGradient(themeName, mode),
                      border:
                        colorTheme === themeName
                          ? `3px solid ${theme.palette.text.primary}`
                          : `2px solid ${theme.palette.divider}`,
                      transition: "all 0.2s ease",
                      position: "relative",
                      "&:hover": {
                        transform: "scale(1.1)",
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    {colorTheme === themeName && (
                      <CheckIcon
                        sx={{
                          color: "white",
                          fontSize: 28,
                          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                        }}
                      />
                    )}
                  </ButtonBase>
                </Tooltip>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 0.5,
                    fontSize: "0.7rem",
                    fontWeight: colorTheme === themeName ? 600 : 400,
                  }}
                >
                  {THEME_DISPLAY_NAMES[themeName]}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Advanced Settings */}
        {showAdvanced && (
          <Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ cursor: "pointer" }}
              onClick={() => setAdvancedExpanded(!advancedExpanded)}
            >
              <Typography variant="body2" color="text.secondary">
                Advanced Settings
              </Typography>
              <IconButton size="small">
                {advancedExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>

            <Collapse in={advancedExpanded}>
              <Box mt={2} display="flex" flexDirection="column" gap={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showColorMappings}
                      onChange={(e) => setShowColorMappings(e.target.checked)}
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2">Show Color Mappings</Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showConsoleLogs}
                      onChange={(e) => setShowConsoleLogs(e.target.checked)}
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2">Show Console Logs</Typography>
                  }
                />
              </Box>
            </Collapse>
          </Box>
        )}

        {/* Current Theme Display */}
        {variant === "full" && (
          <Box
            sx={{
              p: 2,
              borderRadius: 1,
              background:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.03)",
            }}
          >
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              color="text.secondary"
            >
              Current Theme:
            </Typography>
            <Typography variant="body2" fontWeight={600}>
              {THEME_DISPLAY_NAMES[colorTheme]}{" "}
              {mode === "light" ? "Light" : "Dark"}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  )
}

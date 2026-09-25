"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { AngelWingsHalo } from "../lotties/AngelWingsHalo/AngelWingsHalo"
import { RocketLaunch } from "../lotties/RocketLaunch/RocketLaunch"
import { Homework } from "../lotties/Homework/Homework"
import { SwingingShoppingBag } from "../lotties/SwingingShoppingBag/SwingingShoppingBag"
import { TriangleFaceCharacter } from "../lotties/TriangleFaceCharacter/TriangleFaceCharacter"
import { VersusClash } from "../lotties/Vs/VersusClash"
import {
  getThemesForVariant,
  getAllVariants,
} from "../theming/lottieThemeRegistry"

// Type definitions for variants
type AngelWingsHaloVariant = "default" | "up" | "halo-only"
type RocketLaunchVariant =
  | "default"
  | "ImprovedDualToneColor"
  | "ImprovedMonochromeColoring"
type HomeworkVariant = "default" | "minimal"
type SwingingShoppingBagVariant = "default"
type TriangleFaceCharacterVariant = "default"
type VersusClashVariant = "default"

type AnimationName =
  | "AngelWingsHalo"
  | "RocketLaunch"
  | "Homework"
  | "SwingingShoppingBag"
  | "TriangleFaceCharacter"
  | "VersusClash"

/**
 * Lottie Custom Theming Demo Component
 *
 * Demonstrates the custom theme configuration system for Lottie animations.
 * This component can be imported into any React app to test theming.
 *
 * **Features:**
 * - Interactive theme and variant selection
 * - Custom color mappings (AngelWingsHalo.theme.ts)
 * - Theme variants (default, up, halo-only)
 * - Console logging for debugging
 * - Self-contained with dropdown controls
 * - Optional theme prop to sync with parent controls
 *
 * **Usage:**
 * ```tsx
 * import { LottieThemingDemo } from "expanse.dynamicAssets"
 *
 * // Standalone mode
 * function App() {
 *   return <LottieThemingDemo />
 * }
 *
 * // With parent theme control
 * function App() {
 *   const theme = "purple-light"
 *   return <LottieThemingDemo theme={theme} />
 * }
 * ```
 */

interface LottieThemingDemoProps {
  /** Optional theme to sync with parent controls (e.g., "purple-light") */
  theme?: string
}

export const LottieThemingDemo: React.FC<LottieThemingDemoProps> = ({
  theme: parentTheme,
}) => {
  // State for animation and theme selection
  const [selectedAnimation, setSelectedAnimation] =
    useState<AnimationName>("AngelWingsHalo")
  const [selectedVariant, setSelectedVariant] = useState<string>("default")
  const [selectedTheme, setSelectedTheme] = useState<string>("purple-light")

  // Get available themes and variants for current animation
  const [availableThemes, setAvailableThemes] = React.useState<string[]>([])
  const [allVariants, setAllVariants] = React.useState<string[]>([])

  // Load themes and variants when animation or variant changes
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const themes = await getThemesForVariant(
          selectedAnimation,
          selectedVariant,
        )
        const variants = await getAllVariants(selectedAnimation)
        setAvailableThemes(themes)
        setAllVariants(variants)
      } catch (error) {
        console.error(
          "[LottieThemingDemo] Failed to load themes/variants:",
          error,
        )
        setAvailableThemes([])
        setAllVariants(["default"])
      }
    }
    loadData()
  }, [selectedAnimation, selectedVariant])

  // Sync with parent theme when provided
  useEffect(() => {
    if (parentTheme) {
      setSelectedTheme(parentTheme)
      console.log("[LottieThemingDemo] Synced with parent theme:", parentTheme)
    }
  }, [parentTheme])

  // Handle animation change
  const handleAnimationChange = (event: SelectChangeEvent<string>) => {
    const newAnimation = event.target.value as AnimationName
    setSelectedAnimation(newAnimation)
    setSelectedVariant("default") // Reset to default variant
    setSelectedTheme("purple-light") // Reset to first theme
  }

  // Handle variant change
  const handleVariantChange = async (event: SelectChangeEvent<string>) => {
    const newVariant = event.target.value
    setSelectedVariant(newVariant)

    // When variant changes, set theme to first available in that variant
    try {
      const themes = await getThemesForVariant(selectedAnimation, newVariant)
      if (themes.length > 0) {
        setSelectedTheme(themes[0])
      }
    } catch (error) {
      console.error(
        "[LottieThemingDemo] Failed to load themes for variant:",
        error,
      )
    }
  }

  // Handle theme change
  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    setSelectedTheme(event.target.value)
  }

  // Log the theme and variant being used
  React.useEffect(() => {
    console.log("[LottieThemingDemo] Selected theme:", selectedTheme)
    console.log("[LottieThemingDemo] Selected variant:", selectedVariant)
  }, [selectedTheme, selectedVariant])

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h2" gutterBottom align="center">
        🎨 Lottie Custom Theming Demo
      </Typography>

      <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
        Interactive demo of the Lottie theme system. Choose an animation,
        variant, and theme to see it update in real-time.
      </Typography>

      {/* Theme Controls */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom align="center">
          Theme Controls
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="animation-select-label">Animation</InputLabel>
              <Select
                labelId="animation-select-label"
                id="animation-select"
                value={selectedAnimation}
                label="Animation"
                onChange={handleAnimationChange}
              >
                <MenuItem value="AngelWingsHalo">🪽 Angel Wings Halo</MenuItem>
                <MenuItem value="RocketLaunch">🚀 Rocket Launch</MenuItem>
                <MenuItem value="Homework">📚 Homework</MenuItem>
                <MenuItem value="SwingingShoppingBag">
                  🛍️ Swinging Shopping Bag
                </MenuItem>
                <MenuItem value="VersusClash">⚔️ Versus Clash</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="variant-select-label">Variant</InputLabel>
              <Select
                labelId="variant-select-label"
                id="variant-select"
                value={selectedVariant}
                label="Variant"
                onChange={handleVariantChange}
              >
                {allVariants.map((variant) => (
                  <MenuItem key={variant} value={variant}>
                    {variant}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="theme-select-label">Theme</InputLabel>
              <Select
                labelId="theme-select-label"
                id="theme-select"
                value={selectedTheme}
                label="Theme"
                onChange={handleThemeChange}
              >
                {availableThemes.map((theme) => (
                  <MenuItem key={theme} value={theme}>
                    {theme}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Selected: <strong>{selectedTheme}</strong> (
            <em>{selectedVariant}</em> variant)
          </Typography>
        </Box>
      </Paper>

      {/* Animation Display */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          {selectedAnimation === "AngelWingsHalo"
            ? "🪽 Angel Wings Halo"
            : selectedAnimation === "RocketLaunch"
              ? "🚀 Rocket Launch"
              : selectedAnimation === "SwingingShoppingBag"
                ? "🛍️ Swinging Shopping Bag"
                : selectedAnimation === "TriangleFaceCharacter"
                  ? "🔺 Triangle Face Character"
                  : selectedAnimation === "VersusClash"
                    ? "⚔️ Versus Clash"
                    : "📚 Homework"}{" "}
          Animation
        </Typography>

        <Typography
          variant="body2"
          paragraph
          align="center"
          color="text.secondary"
        >
          {selectedAnimation === "AngelWingsHalo"
            ? `AngelWingsHalo - ${selectedVariant}: ${
                selectedVariant === "default"
                  ? "Light feathers outside, dark inside"
                  : selectedVariant === "up"
                    ? "Light bottom, dark top (rising effect)"
                    : "Only halo is themed"
              }`
            : selectedAnimation === "RocketLaunch"
              ? `RocketLaunch - ${selectedVariant}: ${
                  selectedVariant === "default"
                    ? "Original style (maintains red animation patterns)"
                    : selectedVariant === "ImprovedMonochromeColoring"
                      ? "AI-enhanced monochrome with optimized contrast"
                      : "AI-enhanced dual-tone with complementary colors"
                }`
              : selectedAnimation === "SwingingShoppingBag"
                ? `SwingingShoppingBag - ${selectedVariant}: Bag body, rim, and handles themed`
                : selectedAnimation === "TriangleFaceCharacter"
                  ? `TriangleFaceCharacter - ${selectedVariant}: Face and body elements themed`
                  : selectedAnimation === "VersusClash"
                    ? `VersusClash - ${selectedVariant}: VS text and lightning effects themed`
                    : `Homework - ${selectedVariant}: ${
                        selectedVariant === "default"
                          ? "Full theming - all elements themed"
                          : "Minimal theming - only pencil and notebook cover"
                      }`}
        </Typography>

        <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
          {selectedAnimation === "AngelWingsHalo" ? (
            <AngelWingsHalo
              width="400px"
              theme={selectedTheme}
              variant={selectedVariant as AngelWingsHaloVariant}
            />
          ) : selectedAnimation === "RocketLaunch" ? (
            <RocketLaunch
              width="400px"
              theme={selectedTheme}
              variant={selectedVariant as RocketLaunchVariant}
            />
          ) : selectedAnimation === "SwingingShoppingBag" ? (
            <SwingingShoppingBag
              width="400px"
              theme={selectedTheme}
              variant={selectedVariant as SwingingShoppingBagVariant}
            />
          ) : selectedAnimation === "TriangleFaceCharacter" ? (
            <TriangleFaceCharacter
              width="400px"
              theme={selectedTheme}
              variant={selectedVariant as TriangleFaceCharacterVariant}
            />
          ) : selectedAnimation === "VersusClash" ? (
            <VersusClash
              width="400px"
              theme={selectedTheme}
              variant={selectedVariant as VersusClashVariant}
            />
          ) : (
            <Homework
              width="400px"
              theme={selectedTheme}
              variant={selectedVariant as HomeworkVariant}
            />
          )}
        </Box>
      </Paper>
    </Box>
  )
}

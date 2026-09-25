"use client"

import React from "react"
import dynamic from "next/dynamic"
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material"
import { ThemeControls } from "./components/ThemeControls"
import { AnimationPreview } from "./components/AnimationPreview"
import {
  useSyncThemeWithURL,
  useDemoTheme,
} from "../../contexts/DemoThemeContext"

// Dynamic import with SSR disabled to avoid lottie-web SSR issues
const LottieThemingDemo = dynamic(
  () =>
    import("expanse.dynamicAssets").then((mod) => ({
      default: mod.LottieThemingDemo,
    })),
  {
    ssr: false,
    loading: () => (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    ),
  },
)

export default function DemoPage() {
  // Sync theme with URL query params for shareable links
  useSyncThemeWithURL()

  // Get the current color theme and mode from context
  const { colorTheme, mode } = useDemoTheme()

  // Combine theme and mode: e.g., "purple-light", "blue-dark"
  const combinedTheme = `${colorTheme}-${mode}`

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Lottie Custom Theming Demo
      </Typography>

      <Typography
        variant="body1"
        paragraph
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Demonstrating custom theming for Lottie animations using the theme
        registry system.
      </Typography>

      <Grid container spacing={4}>
        {/* Theme Controls */}
        <Grid item xs={12} md={4}>
          <ThemeControls variant="full" showAdvanced />
        </Grid>

        {/* Animation Preview */}
        <Grid item xs={12} md={8}>
          <AnimationPreview
            title="AngelWingsHalo with Custom Theme"
            description="The halo gradient automatically matches the selected theme colors. Use the theme controls on the left or the dropdowns in the demo to select different variants and themes!"
            size="large"
          >
            <LottieThemingDemo theme={combinedTheme} />
          </AnimationPreview>
        </Grid>
      </Grid>

      {/* Info Section */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          💡 <strong>Tip:</strong> Share your theme by copying the URL - it
          includes your color and mode preferences!
        </Typography>
      </Box>
    </Container>
  )
}

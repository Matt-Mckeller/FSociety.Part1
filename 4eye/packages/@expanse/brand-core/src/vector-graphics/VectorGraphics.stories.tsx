import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Stack, Paper } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"

// Import all vectorGraphics components
import { LighteningCloud } from "./clouds/LighteningCloud"
import { SunbreakCloud } from "./clouds/SunbreakCloud"
import { CloudStack } from "./clouds/CloudStack"
import { GrowthCloud } from "./clouds/GrowthCloud"
import { SpiralBrowserScreen } from "./screens/SpiralBrowserScreen"
import { WebAndMobileAppScreens } from "./screens/WebAndMobileAppScreens"
import { ContactUsGraphic } from "./graphics/ContactUsGraphic"
import {
  DescriptionBars,
  GrowthDescriptionBars,
  StairsDescriptionBars,
  DescendingDescriptionBars,
  DescriptionBarsSvg,
} from "./elements/DescriptionBars"

// Import neon theme colors
import {
  neonDarkPalette,
  NEON_NAVY,
  NEON_PURPLE,
} from "@expanse/theme"

/**
 * Vector Graphics - Complex illustrated SVG components for marketing and UI.
 * These graphics are theme-aware and responsive.
 *
 * The graphics use the Neon theme palette for a consistent electric cyan aesthetic.
 */
const meta: Meta = {
  title: "BrandCore/VectorGraphics",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: NEON_NAVY },
        { name: "light", value: "#f5f5f5" },
        {
          name: "gradient",
          value: `linear-gradient(135deg, ${NEON_NAVY} 0%, ${NEON_PURPLE} 100%)`,
        },
      ],
    },
  },
}

export default meta

// ============================================================================
// Theme Wrapper for dark/light mode demos
// ============================================================================

const darkTheme = createTheme({
  palette: neonDarkPalette,
})

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    primary: {
      main: "#0066cc",
      light: "#3388dd",
      dark: "#004499",
    },
  },
})

// ============================================================================
// LighteningCloud Stories
// ============================================================================

export const LighteningCloudBasic: StoryObj = {
  name: "LighteningCloud - Basic",
  render: () => (
    <Box sx={{ width: 500, height: 400 }}>
      <LighteningCloud />
    </Box>
  ),
}

export const LighteningCloudDarkMode: StoryObj = {
  name: "LighteningCloud - Dark Mode",
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <Paper sx={{ p: 4, bgcolor: "background.default", borderRadius: 2 }}>
        <Box sx={{ width: 500, height: 400 }}>
          <LighteningCloud />
        </Box>
      </Paper>
    </ThemeProvider>
  ),
}

export const LighteningCloudLightMode: StoryObj = {
  name: "LighteningCloud - Light Mode",
  render: () => (
    <ThemeProvider theme={lightTheme}>
      <Paper sx={{ p: 4, bgcolor: "background.default", borderRadius: 2 }}>
        <Box sx={{ width: 500, height: 400 }}>
          <LighteningCloud />
        </Box>
      </Paper>
    </ThemeProvider>
  ),
}

// ============================================================================
// SpiralBrowserScreen Stories
// ============================================================================

export const SpiralBrowserScreenBasic: StoryObj = {
  name: "SpiralBrowserScreen - Basic",
  render: () => (
    <Box sx={{ width: 600, height: 450 }}>
      <SpiralBrowserScreen />
    </Box>
  ),
}

export const SpiralBrowserScreenDarkMode: StoryObj = {
  name: "SpiralBrowserScreen - Dark Mode",
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <Paper sx={{ p: 4, bgcolor: "background.default", borderRadius: 2 }}>
        <Box sx={{ width: 600, height: 450 }}>
          <SpiralBrowserScreen />
        </Box>
      </Paper>
    </ThemeProvider>
  ),
}

// ============================================================================
// WebAndMobileAppScreens Stories
// ============================================================================

export const WebAndMobileBasic: StoryObj = {
  name: "WebAndMobileAppScreens - Basic",
  render: () => (
    <Box sx={{ width: 700, height: 400 }}>
      <WebAndMobileAppScreens />
    </Box>
  ),
}

export const WebAndMobileDarkMode: StoryObj = {
  name: "WebAndMobileAppScreens - Dark Mode",
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <Paper sx={{ p: 4, bgcolor: "background.default", borderRadius: 2 }}>
        <Box sx={{ width: 700, height: 400 }}>
          <WebAndMobileAppScreens />
        </Box>
      </Paper>
    </ThemeProvider>
  ),
}

// ============================================================================
// ContactUsGraphic Stories
// ============================================================================

export const ContactUsBasic: StoryObj = {
  name: "ContactUsGraphic - Basic",
  render: () => (
    <Box sx={{ width: 400, height: 500 }}>
      <ContactUsGraphic />
    </Box>
  ),
}

export const ContactUsDarkMode: StoryObj = {
  name: "ContactUsGraphic - Dark Mode",
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <Paper sx={{ p: 4, bgcolor: "background.default", borderRadius: 2 }}>
        <Box sx={{ width: 400, height: 500 }}>
          <ContactUsGraphic />
        </Box>
      </Paper>
    </ThemeProvider>
  ),
}

// ============================================================================
// DescriptionBars Stories
// ============================================================================

export const DescriptionBarsAllVariants: StoryObj = {
  name: "DescriptionBars - All Variants",
  render: () => (
    <Stack direction="row" spacing={6} sx={{ p: 2 }}>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "white", display: "block", mb: 1 }}
        >
          Default
        </Typography>
        <DescriptionBars />
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "white", display: "block", mb: 1 }}
        >
          Growth (1:2:3)
        </Typography>
        <GrowthDescriptionBars />
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "white", display: "block", mb: 1 }}
        >
          Stairs
        </Typography>
        <StairsDescriptionBars />
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "white", display: "block", mb: 1 }}
        >
          Descending
        </Typography>
        <DescendingDescriptionBars />
      </Box>
    </Stack>
  ),
}

export const DescriptionBarsGrowth: StoryObj = {
  name: "DescriptionBars - Growth Pattern",
  render: () => (
    <Stack spacing={4}>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "white", display: "block", mb: 1 }}
        >
          3 bars (default)
        </Typography>
        <GrowthDescriptionBars />
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "white", display: "block", mb: 1 }}
        >
          5 bars
        </Typography>
        <GrowthDescriptionBars barCount={5} />
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "white", display: "block", mb: 1 }}
        >
          7 bars with custom sizing
        </Typography>
        <GrowthDescriptionBars
          barCount={7}
          barHeight={8}
          gap={4}
          maxWidth={180}
          minWidth={20}
        />
      </Box>
    </Stack>
  ),
}

export const DescriptionBarsCustomColors: StoryObj = {
  name: "DescriptionBars - Custom Colors",
  render: () => (
    <Stack direction="row" spacing={6}>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "white", display: "block", mb: 1 }}
        >
          Cyan
        </Typography>
        <GrowthDescriptionBars color="#00d4ff" opacity={0.8} />
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "white", display: "block", mb: 1 }}
        >
          Gold
        </Typography>
        <GrowthDescriptionBars color="#ffd700" opacity={0.8} />
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "white", display: "block", mb: 1 }}
        >
          Purple
        </Typography>
        <GrowthDescriptionBars color="#b388ff" opacity={0.8} />
      </Box>
    </Stack>
  ),
}

export const DescriptionBarsSvgInContext: StoryObj = {
  name: "DescriptionBars - SVG (in device mockup)",
  render: () => (
    <Box sx={{ width: 300, height: 200 }}>
      <svg viewBox="0 0 300 200" width="100%" height="100%">
        {/* Device frame */}
        <rect
          x="20"
          y="20"
          width="260"
          height="160"
          rx="12"
          ry="12"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
        />
        {/* Screen area */}
        <rect
          x="30"
          y="40"
          width="240"
          height="130"
          rx="4"
          ry="4"
          fill="rgba(0,0,0,0.4)"
        />
        {/* Content area with DescriptionBars */}
        <DescriptionBarsSvg
          variant="growth"
          x={50}
          y={60}
          maxWidth={100}
          minWidth={30}
          fill="rgba(255,255,255,0.6)"
          opacity={0.8}
        />
        {/* Second column */}
        <DescriptionBarsSvg
          variant="default"
          x={170}
          y={60}
          maxWidth={80}
          minWidth={40}
          fill="rgba(0,212,255,0.6)"
          opacity={0.7}
        />
      </svg>
    </Box>
  ),
}

// ============================================================================
// Combined Showcase
// ============================================================================

export const AllGraphicsShowcase: StoryObj = {
  name: "All Graphics - Showcase",
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ color: "white", mb: 4 }}>
          BrandCore Vector Graphics
        </Typography>

        <Stack spacing={6}>
          <Box>
            <Typography variant="subtitle1" sx={{ color: "white", mb: 2 }}>
              LighteningCloud
            </Typography>
            <Box
              sx={{
                width: 400,
                height: 300,
                bgcolor: "rgba(0,0,0,0.2)",
                borderRadius: 2,
              }}
            >
              <LighteningCloud />
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ color: "white", mb: 2 }}>
              SpiralBrowserScreen
            </Typography>
            <Box
              sx={{
                width: 500,
                height: 380,
                bgcolor: "rgba(0,0,0,0.2)",
                borderRadius: 2,
              }}
            >
              <SpiralBrowserScreen />
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ color: "white", mb: 2 }}>
              WebAndMobileAppScreens
            </Typography>
            <Box
              sx={{
                width: 600,
                height: 350,
                bgcolor: "rgba(0,0,0,0.2)",
                borderRadius: 2,
              }}
            >
              <WebAndMobileAppScreens />
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ color: "white", mb: 2 }}>
              ContactUsGraphic
            </Typography>
            <Box
              sx={{
                width: 350,
                height: 450,
                bgcolor: "rgba(0,0,0,0.2)",
                borderRadius: 2,
              }}
            >
              <ContactUsGraphic />
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ color: "white", mb: 2 }}>
              DescriptionBars Variants
            </Typography>
            <Stack
              direction="row"
              spacing={4}
              sx={{ p: 2, bgcolor: "rgba(0,0,0,0.2)", borderRadius: 2 }}
            >
              <Box>
                <Typography variant="caption" sx={{ color: "grey.400" }}>
                  Default
                </Typography>
                <DescriptionBars />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "grey.400" }}>
                  Growth
                </Typography>
                <GrowthDescriptionBars />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "grey.400" }}>
                  Stairs
                </Typography>
                <StairsDescriptionBars />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "grey.400" }}>
                  Descending
                </Typography>
                <DescendingDescriptionBars />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  ),
}

// ============================================================================
// New Cloud Graphics Stories
// ============================================================================

export const SunbreakCloudBasic: StoryObj = {
  name: "SunbreakCloud - Basic",
  render: () => (
    <Box sx={{ width: 400, height: 320 }}>
      <SunbreakCloud />
    </Box>
  ),
}

export const SunbreakCloudDarkMode: StoryObj = {
  name: "SunbreakCloud - Dark Mode",
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <Paper sx={{ p: 4, bgcolor: "background.default", borderRadius: 2 }}>
        <Box sx={{ width: 400, height: 320 }}>
          <SunbreakCloud />
        </Box>
      </Paper>
    </ThemeProvider>
  ),
}

export const CloudStackBasic: StoryObj = {
  name: "CloudStack - Basic",
  render: () => (
    <Box sx={{ width: 400, height: 320 }}>
      <CloudStack />
    </Box>
  ),
}

export const CloudStackLayers: StoryObj = {
  name: "CloudStack - Layer Variations",
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <Stack direction="row" spacing={3}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "grey.400" }}>
            1 Layer
          </Typography>
          <Box sx={{ width: 200, height: 180 }}>
            <CloudStack layers={1} />
          </Box>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "grey.400" }}>
            2 Layers
          </Typography>
          <Box sx={{ width: 200, height: 180 }}>
            <CloudStack layers={2} />
          </Box>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "grey.400" }}>
            3 Layers
          </Typography>
          <Box sx={{ width: 200, height: 180 }}>
            <CloudStack layers={3} />
          </Box>
        </Box>
      </Stack>
    </ThemeProvider>
  ),
}

export const GrowthCloudBasic: StoryObj = {
  name: "GrowthCloud - Basic",
  render: () => (
    <Box sx={{ width: 350, height: 380 }}>
      <GrowthCloud />
    </Box>
  ),
}

export const GrowthCloudStages: StoryObj = {
  name: "GrowthCloud - Growth Stages (1:2:3)",
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <Stack direction="row" spacing={3}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "grey.400" }}>
            Stage 1
          </Typography>
          <Box sx={{ width: 180, height: 220 }}>
            <GrowthCloud growthStage={1} />
          </Box>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "grey.400" }}>
            Stage 2
          </Typography>
          <Box sx={{ width: 180, height: 220 }}>
            <GrowthCloud growthStage={2} />
          </Box>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ color: "grey.400" }}>
            Stage 3
          </Typography>
          <Box sx={{ width: 180, height: 220 }}>
            <GrowthCloud growthStage={3} />
          </Box>
        </Box>
      </Stack>
    </ThemeProvider>
  ),
}

export const AllCloudsShowcase: StoryObj = {
  name: "All Clouds - Showcase",
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ color: "white", mb: 4 }}>
          Cloud Graphics Collection
        </Typography>

        <Stack spacing={4}>
          <Stack direction="row" spacing={4} sx={{
            flexWrap: "wrap"
          }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" sx={{ color: "grey.400", mb: 1 }}>
                LighteningCloud
              </Typography>
              <Box
                sx={{
                  width: 280,
                  height: 220,
                  bgcolor: "rgba(0,0,0,0.2)",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <LighteningCloud />
              </Box>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" sx={{ color: "grey.400", mb: 1 }}>
                SunbreakCloud
              </Typography>
              <Box
                sx={{
                  width: 280,
                  height: 220,
                  bgcolor: "rgba(0,0,0,0.2)",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <SunbreakCloud />
              </Box>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" sx={{ color: "grey.400", mb: 1 }}>
                CloudStack
              </Typography>
              <Box
                sx={{
                  width: 280,
                  height: 220,
                  bgcolor: "rgba(0,0,0,0.2)",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <CloudStack />
              </Box>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="subtitle2" sx={{ color: "grey.400", mb: 1 }}>
                GrowthCloud
              </Typography>
              <Box
                sx={{
                  width: 280,
                  height: 280,
                  bgcolor: "rgba(0,0,0,0.2)",
                  borderRadius: 2,
                  p: 1,
                }}
              >
                <GrowthCloud />
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </ThemeProvider>
  ),
}

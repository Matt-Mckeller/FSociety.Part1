import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, Divider, useTheme, Chip } from "@mui/material"

/**
 * Design Tokens showcase the foundational values of the design system:
 * spacing, breakpoints, z-index layers, shadows, and more.
 *
 * These tokens ensure consistency across all components and applications.
 */
const meta: Meta = {
  title: "Brand/Design Tokens",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Design tokens are the atomic values that define the visual language:

- **Spacing**: Consistent spacing scale based on 3px base unit
- **Breakpoints**: Responsive design breakpoints for all device sizes
- **Z-Index**: Layer hierarchy for overlapping elements
- **Shadows**: Elevation system for depth and hierarchy
        `,
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

/**
 * Spacing scale visualization
 */
function SpacingScale() {
  const theme = useTheme()
  const spacingValues = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20]

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Spacing Scale
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Base unit: <strong>3px</strong>. Multiply by factor for spacing value.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {spacingValues.map((factor) => {
          const value = theme.spacing(factor)
          return (
            <Box
              key={factor}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontFamily: "monospace", width: 80, textAlign: "right" }}
              >
                spacing({factor})
              </Typography>
              <Box
                sx={{
                  width: value,
                  height: 24,
                  bgcolor: "primary.main",
                  borderRadius: 0.5,
                  minWidth: 4,
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {value}
              </Typography>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

/**
 * Breakpoints visualization
 */
function BreakpointsScale() {
  const theme = useTheme()
  const breakpoints = theme.breakpoints.values as Record<string, number>

  // Sort by value
  const sortedBreakpoints = Object.entries(breakpoints).sort(([, a], [, b]) => a - b)

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Breakpoints
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Responsive breakpoints for different device sizes.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {sortedBreakpoints.map(([name, value]) => {
          const widthPercent = Math.min((value / 2560) * 100, 100)
          return (
            <Box key={name}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 0.5 }}>
                <Typography
                  variant="caption"
                  sx={{ fontFamily: "monospace", width: 80, fontWeight: 600 }}
                >
                  {name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {value}px
                </Typography>
              </Box>
              <Box
                sx={{
                  width: `${widthPercent}%`,
                  height: 8,
                  bgcolor: "primary.light",
                  borderRadius: 0.5,
                  minWidth: 4,
                  opacity: 0.7,
                }}
              />
            </Box>
          )
        })}
      </Box>

      <Paper variant="outlined" sx={{ p: 2, mt: 3 }}>
        <Typography variant="caption" color="text.secondary">
          <strong>Current viewport:</strong> {typeof window !== "undefined" ? window.innerWidth : "N/A"}px
        </Typography>
      </Paper>
    </Box>
  )
}

/**
 * Z-Index layers visualization
 */
function ZIndexLayers() {
  const theme = useTheme()
  const zIndex = theme.zIndex

  const layers = [
    { name: "mobileStepper", value: zIndex.mobileStepper, desc: "Mobile navigation stepper" },
    { name: "fab", value: zIndex.fab, desc: "Floating action button" },
    { name: "speedDial", value: zIndex.speedDial, desc: "Speed dial menu" },
    { name: "appBar", value: zIndex.appBar, desc: "App bar / header" },
    { name: "drawer", value: zIndex.drawer, desc: "Navigation drawer" },
    { name: "modal", value: zIndex.modal, desc: "Modal dialogs" },
    { name: "snackbar", value: zIndex.snackbar, desc: "Toast notifications" },
    { name: "tooltip", value: zIndex.tooltip, desc: "Tooltips (topmost)" },
  ]

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Z-Index Layers
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Stacking order for overlapping elements.
      </Typography>

      <Box sx={{ position: "relative", height: 300 }}>
        {layers.map((layer, index) => (
          <Paper
            key={layer.name}
            variant="outlined"
            sx={{
              position: "absolute",
              left: index * 20,
              top: (layers.length - 1 - index) * 30,
              width: 280,
              p: 1.5,
              bgcolor: "background.paper",
              borderColor: "primary.light",
              boxShadow: 1,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {layer.name}
              </Typography>
              <Chip
                label={layer.value}
                size="small"
                color="primary"
                sx={{ height: 20, fontSize: "0.65rem" }}
              />
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
              {layer.desc}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  )
}

/**
 * Shadows visualization
 */
function ShadowsScale() {
  const theme = useTheme()
  const shadowIndices = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24]

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Elevation / Shadows
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {theme.palette.mode === "dark"
          ? "Dark mode uses minimal shadows for a flat aesthetic."
          : "Light mode uses shadows to create depth and hierarchy."}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {shadowIndices.map((elevation) => (
          <Paper
            key={elevation}
            elevation={elevation}
            sx={{
              width: 100,
              height: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="h6">{elevation}</Typography>
            <Typography variant="caption" color="text.secondary">
              elevation
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  )
}

/**
 * Border radius scale
 */
function BorderRadiusScale() {
  const radii = [0, 0.5, 1, 2, 3, 4, "50%"]

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Border Radius
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Standard border radius values using theme spacing.
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {radii.map((radius) => (
          <Box key={String(radius)} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                bgcolor: "primary.main",
                borderRadius: radius,
                mb: 1,
              }}
            />
            <Typography variant="caption" sx={{ fontFamily: "monospace" }}>
              {typeof radius === "number" ? `${radius}` : radius}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

/**
 * All design tokens overview
 */
export const AllTokens: StoryObj = {
  name: "All Tokens",
  render: () => (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Design Tokens
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Foundational values that define the Expanse visual language.
      </Typography>

      <SpacingScale />
      <Divider sx={{ my: 4 }} />
      <BreakpointsScale />
      <Divider sx={{ my: 4 }} />
      <ZIndexLayers />
      <Divider sx={{ my: 4 }} />
      <ShadowsScale />
      <Divider sx={{ my: 4 }} />
      <BorderRadiusScale />
    </Box>
  ),
}

/**
 * Spacing scale only
 */
export const Spacing: StoryObj = {
  name: "Spacing",
  render: () => <SpacingScale />,
}

/**
 * Breakpoints only
 */
export const Breakpoints: StoryObj = {
  name: "Breakpoints",
  render: () => <BreakpointsScale />,
}

/**
 * Z-Index layers only
 */
export const ZIndex: StoryObj = {
  name: "Z-Index",
  render: () => <ZIndexLayers />,
}

/**
 * Shadows only
 */
export const Shadows: StoryObj = {
  name: "Shadows",
  render: () => <ShadowsScale />,
}

/**
 * Border radius only
 */
export const BorderRadius: StoryObj = {
  name: "Border Radius",
  render: () => <BorderRadiusScale />,
}

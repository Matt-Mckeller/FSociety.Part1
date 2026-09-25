import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Stack, Paper, Slider, FormControl, InputLabel, Select, MenuItem, TextField, Switch, FormControlLabel, Grid } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import {
  TripleLayerPath,
  TRIPLE_LAYER_PRESETS,
  COLOR_PRESETS,
  EXPANSE_CLOUD_PATH,
  type TripleLayerPreset,
  type ColorPreset,
  type StrokeDirection,
} from "./TripleLayerPath"

/**
 * # TripleLayerPath
 *
 * Multi-layer border stroke pattern primitive for creating the distinctive
 * Expanse "glow" effect on SVG paths.
 *
 * ## How It Works
 *
 * This component takes **any SVG path** as input and renders it with multiple
 * overlapping strokes stacked on top of each other. The widest stroke renders
 * first, with progressively thinner strokes for definition:
 *
 * ```
 * Input: d="M161.17,57.06A61.79..." (any SVG path)
 * Output: 3 (or 6) <path> elements with different stroke widths
 * ```
 *
 * ## Stroke Width Ratios
 *
 * | Preset | Ratio | Widths | Effect |
 * |--------|-------|--------|--------|
 * | cloud (default) | custom | 12/5/2px | Soft, fluffy glow |
 * | standard | 1:2:3 | 6/4/2px | Balanced brand progression |
 * | 7-3-1 | 7:3:1 | 14/6/2px | Legacy dramatic outer glow |
 * | balanced | 1:2:1 | 2/4/2px | Symmetric center emphasis |
 * | centerFocus | 1:3:1 | 2/6/2px | Strong center highlight |
 *
 * ## Opacity Progressions
 *
 * | Color Preset | Outer | Center | Inner | Effect |
 * |--------------|-------|--------|-------|--------|
 * | cloudStyle (default) | 20% | 50% | 100% | Prominent definition |
 * | brand | 15% | 40% | 90% | Standard glow |
 * | subtle | 10% | 30% | 70% | Light backgrounds |
 * | bold | 25% | 60% | 100% | Maximum impact |
 *
 * ## Direction Modes
 *
 * - `outward`: Strokes expand from path (default, 3 layers)
 * - `inward`: Strokes contract toward path (3 layers)
 * - `both`: 6-layer effect (3 inward + 3 outward), maximum luminosity
 *
 * ## The 4-Layer Visual Effect
 *
 * When you add a gradient fill to the path, you get the complete cloud look:
 * 3 stroke layers + 1 fill layer = 4 visual layers of depth
 *
 * ```tsx
 * <TripleLayerPath
 *   d={EXPANSE_CLOUD_PATH}
 *   fill="url(#cloudGradient)"  // ← This adds the 4th visual layer
 *   preset="cloud"
 *   colorPreset="cloudStyle"
 * />
 * ```
 *
 * ## Where It's Used
 *
 * - **LighteningCloud** - The canonical example with gradient fill
 * - **ContactUsGraphic** - Cloud shapes with person character
 * - **SpiralBrowserScreen** - Border effects on UI mockups
 * - Any brand graphic needing the signature "glow" effect
 */
const meta: Meta = {
  title: "BrandCore/Primitives/Borders/TripleLayerPath",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1a1a2e" },
        { name: "light", value: "#f5f5f5" },
      ],
    },
  },
}

export default meta

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00d4ff" },
    background: {
      default: "#1a1a2e",
      paper: "#2a2a3e",
    },
  },
})

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0066cc" },
  },
})

// Sample paths for demonstration
const rectanglePath = "M20,20 L180,20 L180,80 L20,80 Z"
const circlePath = "M50,25 A25,25 0 1,1 49.99,25"
const starPath = "M50,5 L61,40 L98,40 L68,60 L79,95 L50,75 L21,95 L32,60 L2,40 L39,40 Z"
const wavePath = "M10,50 Q30,20 50,50 T90,50 T130,50 T170,50 T210,50"

// ============================================================================
// INTERACTIVE PLAYGROUND
// ============================================================================

/**
 * ## Interactive Playground
 *
 * Experiment with all configurations in real-time!
 *
 * - Adjust stroke widths manually or select presets
 * - Try different color presets and opacity progressions
 * - Switch between direction modes
 * - Toggle gradient fill on/off
 * - Test with different paths
 */
export const Playground: StoryObj = {
  name: "⚡ Interactive Playground",
  render: function PlaygroundStory() {
    const [preset, setPreset] = React.useState<TripleLayerPreset>("cloud")
    const [colorPreset, setColorPreset] = React.useState<ColorPreset>("cloudStyle")
    const [direction, setDirection] = React.useState<StrokeDirection>("outward")
    const [useGradient, setUseGradient] = React.useState(true)
    const [selectedPath, setSelectedPath] = React.useState<"cloud" | "rectangle" | "circle" | "star" | "wave">("cloud")

    // Custom width overrides
    const [useCustomWidths, setUseCustomWidths] = React.useState(false)
    const [outerWidth, setOuterWidth] = React.useState(12)
    const [centerWidth, setCenterWidth] = React.useState(5)
    const [innerWidth, setInnerWidth] = React.useState(2)

    const presetConfig = TRIPLE_LAYER_PRESETS[preset]

    const paths = {
      cloud: { d: EXPANSE_CLOUD_PATH, viewBox: "0 0 220 160" },
      rectangle: { d: rectanglePath, viewBox: "0 0 200 100" },
      circle: { d: circlePath, viewBox: "0 0 100 100" },
      star: { d: starPath, viewBox: "0 0 100 100" },
      wave: { d: wavePath, viewBox: "0 0 220 100" },
    }

    const currentPath = paths[selectedPath]

    return (
      <ThemeProvider theme={darkTheme}>
        <Stack spacing={4} sx={{ p: 3, minWidth: 800 }}>
          <Typography variant="h5" sx={{ color: "white" }}>
            Interactive Playground
          </Typography>

          {/* Preview */}
          <Paper sx={{ p: 3, bgcolor: "rgba(0,0,0,0.4)", borderRadius: 2 }}>
            <Box sx={{ width: "100%", height: 200, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <svg viewBox={currentPath.viewBox} width="100%" height="100%" style={{ maxWidth: 400 }}>
                {useGradient && (
                  <defs>
                    <linearGradient id="playgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1a1a2e" />
                      <stop offset="100%" stopColor="#2a2a4e" />
                    </linearGradient>
                  </defs>
                )}
                <TripleLayerPath
                  d={currentPath.d}
                  fill={useGradient ? "url(#playgroundGradient)" : "none"}
                  preset={preset}
                  colorPreset={colorPreset}
                  direction={direction}
                  {...(useCustomWidths && { outerWidth, centerWidth, innerWidth })}
                />
              </svg>
            </Box>
          </Paper>

          {/* Controls */}
          <Grid container spacing={3}>
            {/* Left Column: Presets */}
            <Grid item xs={4}>
              <Stack spacing={2}>
                <Typography variant="subtitle2" sx={{ color: "grey.400" }}>Shape</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedPath}
                    onChange={(e) => setSelectedPath(e.target.value as typeof selectedPath)}
                    sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white" }}
                  >
                    <MenuItem value="cloud">Cloud (EXPANSE_CLOUD_PATH)</MenuItem>
                    <MenuItem value="rectangle">Rectangle</MenuItem>
                    <MenuItem value="circle">Circle</MenuItem>
                    <MenuItem value="star">Star</MenuItem>
                    <MenuItem value="wave">Wave</MenuItem>
                  </Select>
                </FormControl>

                <Typography variant="subtitle2" sx={{ color: "grey.400" }}>Size Preset</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={preset}
                    onChange={(e) => setPreset(e.target.value as TripleLayerPreset)}
                    sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white" }}
                  >
                    <MenuItem value="cloud">cloud (12/5/2px) - Default</MenuItem>
                    <MenuItem value="standard">standard (6/4/2px) - 1:2:3</MenuItem>
                    <MenuItem value="7-3-1">7-3-1 (14/6/2px) - Legacy</MenuItem>
                    <MenuItem value="balanced">balanced (2/4/2px) - 1:2:1</MenuItem>
                    <MenuItem value="centerFocus">centerFocus (2/6/2px) - 1:3:1</MenuItem>
                    <MenuItem disabled>── Size Scales ──</MenuItem>
                    <MenuItem value="1-2-3_xs">1-2-3 XS (3/2/1px)</MenuItem>
                    <MenuItem value="1-2-3_sm">1-2-3 SM (4.5/3/1.5px)</MenuItem>
                    <MenuItem value="1-2-3_lg">1-2-3 LG (9/6/3px)</MenuItem>
                    <MenuItem value="1-2-3_xl">1-2-3 XL (12/8/4px)</MenuItem>
                    <MenuItem value="1-2-3_xxl">1-2-3 XXL (15/10/5px)</MenuItem>
                  </Select>
                </FormControl>

                <Typography variant="subtitle2" sx={{ color: "grey.400" }}>Color Preset</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={colorPreset}
                    onChange={(e) => setColorPreset(e.target.value as ColorPreset)}
                    sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white" }}
                  >
                    <MenuItem value="cloudStyle">cloudStyle (20/50/100%) - Default</MenuItem>
                    <MenuItem value="brand">brand (15/40/90%)</MenuItem>
                    <MenuItem value="subtle">subtle (10/30/70%)</MenuItem>
                    <MenuItem value="bold">bold (25/60/100%)</MenuItem>
                    <MenuItem disabled>── Colors ──</MenuItem>
                    <MenuItem value="gold">gold</MenuItem>
                    <MenuItem value="purple">purple</MenuItem>
                    <MenuItem value="coral">coral</MenuItem>
                    <MenuItem value="success">success</MenuItem>
                    <MenuItem value="boldGold">boldGold</MenuItem>
                    <MenuItem value="boldPurple">boldPurple</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>

            {/* Center Column: Direction & Options */}
            <Grid item xs={4}>
              <Stack spacing={2}>
                <Typography variant="subtitle2" sx={{ color: "grey.400" }}>Direction</Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value as StrokeDirection)}
                    sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white" }}
                  >
                    <MenuItem value="outward">outward (3 layers)</MenuItem>
                    <MenuItem value="inward">inward (3 layers)</MenuItem>
                    <MenuItem value="both">both (6 layers)</MenuItem>
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={<Switch checked={useGradient} onChange={(e) => setUseGradient(e.target.checked)} />}
                  label="Gradient Fill (4th visual layer)"
                  sx={{ color: "white" }}
                />

                <FormControlLabel
                  control={<Switch checked={useCustomWidths} onChange={(e) => setUseCustomWidths(e.target.checked)} />}
                  label="Custom Stroke Widths"
                  sx={{ color: "white" }}
                />
              </Stack>
            </Grid>

            {/* Right Column: Custom Widths */}
            <Grid item xs={4}>
              <Stack spacing={2} sx={{ opacity: useCustomWidths ? 1 : 0.4 }}>
                <Typography variant="subtitle2" sx={{ color: "grey.400" }}>
                  Custom Widths {!useCustomWidths && "(disabled)"}
                </Typography>

                <Box>
                  <Typography variant="caption" sx={{ color: "grey.500" }}>
                    Outer: {outerWidth}px
                  </Typography>
                  <Slider
                    value={outerWidth}
                    onChange={(_, v) => setOuterWidth(v as number)}
                    min={1}
                    max={30}
                    disabled={!useCustomWidths}
                  />
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: "grey.500" }}>
                    Center: {centerWidth}px
                  </Typography>
                  <Slider
                    value={centerWidth}
                    onChange={(_, v) => setCenterWidth(v as number)}
                    min={1}
                    max={20}
                    disabled={!useCustomWidths}
                  />
                </Box>

                <Box>
                  <Typography variant="caption" sx={{ color: "grey.500" }}>
                    Inner: {innerWidth}px
                  </Typography>
                  <Slider
                    value={innerWidth}
                    onChange={(_, v) => setInnerWidth(v as number)}
                    min={0.5}
                    max={10}
                    step={0.5}
                    disabled={!useCustomWidths}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>

          {/* Code Example */}
          <Paper sx={{ p: 2, bgcolor: "rgba(0,0,0,0.6)", borderRadius: 1 }}>
            <Typography variant="caption" sx={{ color: "grey.500", fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
{`<TripleLayerPath
  d={${selectedPath === "cloud" ? "EXPANSE_CLOUD_PATH" : `"${currentPath.d.slice(0, 30)}..."`}}
  fill="${useGradient ? "url(#gradient)" : "none"}"
  preset="${preset}"
  colorPreset="${colorPreset}"
  direction="${direction}"${useCustomWidths ? `
  outerWidth={${outerWidth}}
  centerWidth={${centerWidth}}
  innerWidth={${innerWidth}}` : ""}
/>`}
            </Typography>
          </Paper>
        </Stack>
      </ThemeProvider>
    )
  },
}

// ============================================================================
// CLOUD WITH GRADIENT - THE SIGNATURE LOOK
// ============================================================================

/**
 * ## Cloud with Gradient Fill
 *
 * The complete "4-layer" cloud effect used in LighteningCloud.
 * 3 stroke layers + gradient fill = maximum depth.
 */
export const CloudWithGradientFill: StoryObj = {
  name: "Cloud with Gradient Fill (4-Layer Effect)",
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="body2" sx={{ color: "grey.400", maxWidth: 400, textAlign: "center" }}>
          Gradient fill creates the 4th visual layer - this is the canonical LighteningCloud look
        </Typography>
        <Box sx={{ width: 320, height: 200 }}>
          <svg viewBox="0 0 220 160" width="100%" height="100%">
            <defs>
              <linearGradient
                id="cloudGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#1a1a2e" />
                <stop offset="100%" stopColor="#2a2a4e" />
              </linearGradient>
            </defs>
            <TripleLayerPath
              d={EXPANSE_CLOUD_PATH}
              fill="url(#cloudGradient)"
              preset="cloud"
              colorPreset="cloudStyle"
            />
          </svg>
        </Box>
        <Typography variant="caption" sx={{ color: "grey.600" }}>
          preset="cloud" | colorPreset="cloudStyle" | fill="url(#gradient)"
        </Typography>
      </Stack>
    </ThemeProvider>
  ),
}

// ============================================================================
// RATIO COMPARISON
// ============================================================================

/**
 * ## Stroke Ratio Comparison
 *
 * Different ratios create different visual effects:
 * - **7:3:1** - Dramatic outer glow (legacy)
 * - **1:2:3** - Balanced brand progression
 * - **1:2:1** - Symmetric center emphasis
 * - **1:3:1** - Strong center highlight
 */
export const RatioComparison: StoryObj = {
  name: "Ratio Comparison (7:3:1, 1:2:3, 1:2:1, 1:3:1)",
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <Stack spacing={4}>
        <Typography variant="h6" sx={{ color: "white" }}>
          Stroke Width Ratio Comparison
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper sx={{ p: 2, bgcolor: "rgba(0,0,0,0.3)" }}>
              <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>
                7:3:1 Ratio (Legacy)
              </Typography>
              <Typography variant="caption" sx={{ color: "grey.500", display: "block", mb: 2 }}>
                14px / 6px / 2px - Dramatic outer glow
              </Typography>
              <Box sx={{ height: 100 }}>
                <svg viewBox="0 0 220 160" width="100%" height="100%">
                  <TripleLayerPath d={EXPANSE_CLOUD_PATH} fill="none" preset="7-3-1" colorPreset="brand" />
                </svg>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper sx={{ p: 2, bgcolor: "rgba(0,0,0,0.3)" }}>
              <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>
                1:2:3 Ratio (Brand Standard)
              </Typography>
              <Typography variant="caption" sx={{ color: "grey.500", display: "block", mb: 2 }}>
                6px / 4px / 2px - Balanced progression
              </Typography>
              <Box sx={{ height: 100 }}>
                <svg viewBox="0 0 220 160" width="100%" height="100%">
                  <TripleLayerPath d={EXPANSE_CLOUD_PATH} fill="none" preset="standard" colorPreset="brand" />
                </svg>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper sx={{ p: 2, bgcolor: "rgba(0,0,0,0.3)" }}>
              <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>
                1:2:1 Ratio (Balanced)
              </Typography>
              <Typography variant="caption" sx={{ color: "grey.500", display: "block", mb: 2 }}>
                2px / 4px / 2px - Symmetric center
              </Typography>
              <Box sx={{ height: 100 }}>
                <svg viewBox="0 0 220 160" width="100%" height="100%">
                  <TripleLayerPath d={EXPANSE_CLOUD_PATH} fill="none" preset="balanced" colorPreset="brand" />
                </svg>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper sx={{ p: 2, bgcolor: "rgba(0,0,0,0.3)" }}>
              <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>
                1:3:1 Ratio (Center Focus)
              </Typography>
              <Typography variant="caption" sx={{ color: "grey.500", display: "block", mb: 2 }}>
                2px / 6px / 2px - Strong center
              </Typography>
              <Box sx={{ height: 100 }}>
                <svg viewBox="0 0 220 160" width="100%" height="100%">
                  <TripleLayerPath d={EXPANSE_CLOUD_PATH} fill="none" preset="centerFocus" colorPreset="brand" />
                </svg>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </ThemeProvider>
  ),
}

// ============================================================================
// SIZE SCALE PROGRESSION
// ============================================================================

/**
 * ## Size Scale Progression
 *
 * 1:2:3 ratio at different scales (xs → xxl)
 */
export const SizeScales: StoryObj = {
  name: "Size Scales (XS → XXL)",
  render: () => {
    const scales: TripleLayerPreset[] = ["1-2-3_xs", "1-2-3_sm", "1-2-3_md", "1-2-3_lg", "1-2-3_xl", "1-2-3_xxl"]

    return (
      <ThemeProvider theme={darkTheme}>
        <Stack spacing={3}>
          <Typography variant="h6" sx={{ color: "white" }}>
            1:2:3 Ratio at Different Scales
          </Typography>

          <Stack direction="row" spacing={2} flexWrap="wrap">
            {scales.map((scale) => {
              const config = TRIPLE_LAYER_PRESETS[scale]
              return (
                <Paper key={scale} sx={{ p: 2, bgcolor: "rgba(0,0,0,0.3)", textAlign: "center" }}>
                  <Typography variant="caption" sx={{ color: "white", fontWeight: 600 }}>
                    {scale.replace("1-2-3_", "").toUpperCase()}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "grey.500", display: "block", mb: 1 }}>
                    {config.outerWidth}/{config.centerWidth}/{config.innerWidth}px
                  </Typography>
                  <Box sx={{ width: 120, height: 80 }}>
                    <svg viewBox="0 0 220 160" width="100%" height="100%">
                      <TripleLayerPath d={EXPANSE_CLOUD_PATH} fill="none" preset={scale} colorPreset="brand" />
                    </svg>
                  </Box>
                </Paper>
              )
            })}
          </Stack>
        </Stack>
      </ThemeProvider>
    )
  },
}

// ============================================================================
// OPACITY PROGRESSIONS
// ============================================================================

/**
 * ## Opacity Progressions
 *
 * Different opacity settings for different contexts:
 * - **cloudStyle** (default) - 20%/50%/100% - Sharp definition
 * - **brand** - 15%/40%/90% - Standard soft glow
 * - **subtle** - 10%/30%/70% - Light backgrounds
 * - **bold** - 25%/60%/100% - Maximum impact
 */
export const OpacityProgressions: StoryObj = {
  name: "Opacity Progressions",
  render: () => {
    const opacityPresets: ColorPreset[] = ["cloudStyle", "brand", "subtle", "bold"]
    const descriptions: Record<string, string> = {
      cloudStyle: "20% → 50% → 100%",
      brand: "15% → 40% → 90%",
      subtle: "10% → 30% → 70%",
      bold: "25% → 60% → 100%",
    }

    return (
      <ThemeProvider theme={darkTheme}>
        <Stack spacing={3}>
          <Typography variant="h6" sx={{ color: "white" }}>
            Opacity Progressions (Outer → Center → Inner)
          </Typography>

          <Stack direction="row" spacing={3}>
            {opacityPresets.map((cp) => (
              <Paper key={cp} sx={{ p: 2, bgcolor: "rgba(0,0,0,0.3)" }}>
                <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>
                  {cp}
                </Typography>
                <Typography variant="caption" sx={{ color: "grey.500", mb: 1, display: "block" }}>
                  {descriptions[cp]}
                </Typography>
                <Box sx={{ width: 150, height: 100 }}>
                  <svg viewBox="0 0 220 160" width="100%" height="100%">
                    <TripleLayerPath d={EXPANSE_CLOUD_PATH} fill="none" colorPreset={cp} />
                  </svg>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </ThemeProvider>
    )
  },
}

// ============================================================================
// DIRECTION MODES
// ============================================================================

/**
 * ## Direction Modes
 *
 * - **outward** - Strokes expand from path center (default, 3 layers)
 * - **inward** - Strokes contract toward path center (3 layers)
 * - **both** - Maximum 6-layer glow effect
 */
export const DirectionModes: StoryObj = {
  name: "Direction Modes (Outward / Inward / Both)",
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <Stack spacing={4}>
        <Typography variant="h6" sx={{ color: "white" }}>
          Stroke Direction Modes
        </Typography>

        <Stack direction="row" spacing={4}>
          <Paper sx={{ p: 2, bgcolor: "rgba(0,0,0,0.3)" }}>
            <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>
              direction="outward"
            </Typography>
            <Typography variant="caption" sx={{ color: "grey.500", display: "block", mb: 1 }}>
              Default, 3 layers expanding out
            </Typography>
            <Box sx={{ width: 180, height: 120 }}>
              <svg viewBox="0 0 220 160" width="100%" height="100%">
                <TripleLayerPath d={EXPANSE_CLOUD_PATH} fill="none" direction="outward" colorPreset="brand" />
              </svg>
            </Box>
          </Paper>

          <Paper sx={{ p: 2, bgcolor: "rgba(0,0,0,0.3)" }}>
            <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>
              direction="inward"
            </Typography>
            <Typography variant="caption" sx={{ color: "grey.500", display: "block", mb: 1 }}>
              3 layers contracting in
            </Typography>
            <Box sx={{ width: 180, height: 120 }}>
              <svg viewBox="0 0 220 160" width="100%" height="100%">
                <TripleLayerPath d={EXPANSE_CLOUD_PATH} fill="none" direction="inward" colorPreset="purple" />
              </svg>
            </Box>
          </Paper>

          <Paper sx={{ p: 2, bgcolor: "rgba(0,0,0,0.3)" }}>
            <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>
              direction="both"
            </Typography>
            <Typography variant="caption" sx={{ color: "grey.500", display: "block", mb: 1 }}>
              6 layers total, max glow
            </Typography>
            <Box sx={{ width: 180, height: 120 }}>
              <svg viewBox="0 0 220 160" width="100%" height="100%">
                <TripleLayerPath d={EXPANSE_CLOUD_PATH} fill="none" direction="both" colorPreset="gold" />
              </svg>
            </Box>
          </Paper>
        </Stack>
      </Stack>
    </ThemeProvider>
  ),
}

// ============================================================================
// ALL COLOR PRESETS
// ============================================================================

/**
 * ## All Color Presets
 *
 * Full color palette with various opacity progressions
 */
export const AllColorPresets: StoryObj = {
  name: "All Color Presets",
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <Stack spacing={3}>
        <Typography variant="h6" sx={{ color: "white" }}>
          Color Presets
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {(Object.keys(COLOR_PRESETS) as ColorPreset[]).map((cp) => (
            <Paper key={cp} sx={{ p: 2, bgcolor: "rgba(0,0,0,0.3)", minWidth: 140 }}>
              <Typography variant="caption" sx={{ color: "white", fontWeight: 600 }}>
                {cp}
              </Typography>
              <Box sx={{ width: 120, height: 80, mt: 1 }}>
                <svg viewBox="0 0 220 160" width="100%" height="100%">
                  <TripleLayerPath d={EXPANSE_CLOUD_PATH} fill="none" colorPreset={cp} />
                </svg>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Stack>
    </ThemeProvider>
  ),
}

// ============================================================================
// ALL SIZE PRESETS GRID
// ============================================================================

/**
 * ## All Size Presets
 *
 * Complete grid of all available size presets
 */
export const AllSizePresets: StoryObj = {
  name: "All Size Presets Grid",
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <Stack spacing={3}>
        <Typography variant="h6" sx={{ color: "white" }}>
          All Size Presets
        </Typography>
        <Stack spacing={2}>
          {(Object.keys(TRIPLE_LAYER_PRESETS) as TripleLayerPreset[]).map((preset) => {
            const config = TRIPLE_LAYER_PRESETS[preset]
            return (
              <Stack key={preset} direction="row" spacing={2} alignItems="center">
                <Box sx={{ minWidth: 200 }}>
                  <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>
                    {preset}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "grey.500" }}>
                    {config.outerWidth}/{config.centerWidth}/{config.innerWidth}px
                  </Typography>
                </Box>
                <Paper sx={{ p: 1, bgcolor: "rgba(0,0,0,0.3)" }}>
                  <Box sx={{ width: 150, height: 80 }}>
                    <svg viewBox="0 0 220 160" width="100%" height="100%">
                      <TripleLayerPath d={EXPANSE_CLOUD_PATH} fill="none" preset={preset} colorPreset="brand" />
                    </svg>
                  </Box>
                </Paper>
              </Stack>
            )
          })}
        </Stack>
      </Stack>
    </ThemeProvider>
  ),
}

// ============================================================================
// OTHER SHAPES
// ============================================================================

/**
 * ## Works with Any Path
 *
 * The component accepts any valid SVG path data - not just clouds!
 */
export const OtherShapes: StoryObj = {
  name: "Works with Any SVG Path",
  render: () => (
    <ThemeProvider theme={darkTheme}>
      <Stack spacing={3}>
        <Typography variant="h6" sx={{ color: "white" }}>
          Works with Any SVG Path
        </Typography>

        <Stack direction="row" spacing={3} flexWrap="wrap">
          <Paper sx={{ p: 2, bgcolor: "rgba(0,0,0,0.3)" }}>
            <Typography variant="caption" sx={{ color: "white" }}>Rectangle</Typography>
            <Box sx={{ width: 160, height: 80, mt: 1 }}>
              <svg viewBox="0 0 200 100" width="100%" height="100%">
                <TripleLayerPath d={rectanglePath} fill="none" colorPreset="purple" />
              </svg>
            </Box>
          </Paper>

          <Paper sx={{ p: 2, bgcolor: "rgba(0,0,0,0.3)" }}>
            <Typography variant="caption" sx={{ color: "white" }}>Circle</Typography>
            <Box sx={{ width: 80, height: 80, mt: 1 }}>
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <TripleLayerPath d={circlePath} fill="none" colorPreset="gold" />
              </svg>
            </Box>
          </Paper>

          <Paper sx={{ p: 2, bgcolor: "rgba(0,0,0,0.3)" }}>
            <Typography variant="caption" sx={{ color: "white" }}>Star</Typography>
            <Box sx={{ width: 80, height: 80, mt: 1 }}>
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <TripleLayerPath d={starPath} fill="none" colorPreset="coral" />
              </svg>
            </Box>
          </Paper>

          <Paper sx={{ p: 2, bgcolor: "rgba(0,0,0,0.3)" }}>
            <Typography variant="caption" sx={{ color: "white" }}>Wave</Typography>
            <Box sx={{ width: 200, height: 80, mt: 1 }}>
              <svg viewBox="0 0 220 100" width="100%" height="100%">
                <TripleLayerPath d={wavePath} fill="none" colorPreset="success" />
              </svg>
            </Box>
          </Paper>
        </Stack>
      </Stack>
    </ThemeProvider>
  ),
}

// ============================================================================
// LIGHT MODE
// ============================================================================

/**
 * ## Light Mode Support
 *
 * Falls back to theme-aware colors when no colorPreset is specified
 */
export const LightModeComparison: StoryObj = {
  name: "Light Mode vs Dark Mode",
  render: () => (
    <Stack direction="row" spacing={4}>
      <ThemeProvider theme={darkTheme}>
        <Paper sx={{ p: 3, bgcolor: "#1a1a2e", borderRadius: 2 }}>
          <Typography variant="caption" sx={{ color: "white", display: "block", mb: 2 }}>
            Dark Mode
          </Typography>
          <Box sx={{ width: 180, height: 120 }}>
            <svg viewBox="0 0 220 160" width="100%" height="100%">
              <TripleLayerPath d={EXPANSE_CLOUD_PATH} fill="none" />
            </svg>
          </Box>
        </Paper>
      </ThemeProvider>
      <ThemeProvider theme={lightTheme}>
        <Paper sx={{ p: 3, bgcolor: "#f5f5f5", borderRadius: 2 }}>
          <Typography variant="caption" sx={{ color: "black", display: "block", mb: 2 }}>
            Light Mode (theme-aware)
          </Typography>
          <Box sx={{ width: 180, height: 120 }}>
            <svg viewBox="0 0 220 160" width="100%" height="100%">
              <TripleLayerPath d={EXPANSE_CLOUD_PATH} fill="none" />
            </svg>
          </Box>
        </Paper>
      </ThemeProvider>
    </Stack>
  ),
}

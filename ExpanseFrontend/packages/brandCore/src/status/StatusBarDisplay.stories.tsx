import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Stack,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Paper,
  Chip,
  Divider,
  Slider,
} from "@mui/material"
import { StatusBarDisplay } from "./StatusBarDisplay"
import type {
  StatusBarLayoutPattern,
  StatusBarDisplayState,
  ExpansionBehavior,
  StatusBarExpansionDirection,
} from "./StatusBarDisplay"
import { GenericStatusBar } from "./bars/GenericStatusBar"
import { CurrencyStatusBarSimple } from "./bars/CurrencyStatusBarSimple"
import { ProgressStatusBar } from "./bars/ProgressStatusBar"
import { ProfileIconStatusBarSimple } from "./bars/ProfileIconStatusBarSimple"
import { CoinIcon } from "../display/icons/CoinIcon"
import { ExperienceIcon } from "../display/icons/ExperienceIcon"

/**
 * # StatusBarDisplay
 *
 * A flexible multi-bar status display system with multiple layout patterns
 * and expansion strategies.
 *
 * ## Layout Patterns
 *
 * - **staircase**: Ascending stairs, largest bar on bottom, right-aligned
 * - **staircase-left**: Same as staircase but left-aligned
 * - **horizontal**: Side by side with equal alignment
 * - **horizontal-center**: Small-large-small pattern (center bar emphasized)
 *
 * ## Expansion Strategies
 *
 * - **inline**: Expands within document flow (may cause layout shift)
 * - **overlay**: Expands as overlay with absolute positioning (no shift)
 * - **reserved**: Container reserves maximum space always (no shift)
 *
 * ## Key Features
 *
 * - GSAP-powered staggered animations
 * - SVG-based bars for mobile compatibility
 * - Generic bar support for custom content
 * - Multiple currencies per bar
 */
const meta: Meta<typeof StatusBarDisplay> = {
  title: "BrandCore/Status/StatusBarDisplay",
  component: StatusBarDisplay,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
  argTypes: {
    layout: {
      control: "select",
      options: ["staircase", "staircase-left", "horizontal", "horizontal-center"],
    },
    expansionBehavior: {
      control: "select",
      options: ["inline", "overlay", "reserved"],
    },
    expansionDirection: {
      control: "select",
      options: ["down", "up", "right", "left"],
    },
    expansionTrigger: {
      control: "select",
      options: ["hover", "click"],
    },
  },
}

export default meta

type Story = StoryObj<typeof StatusBarDisplay>

// ============================================================================
// LAYOUT PATTERNS
// ============================================================================

/**
 * ## Staircase Layout (Default)
 *
 * Ascending stairs pattern with smallest bar on top, largest on bottom.
 * Right-aligned for typical header placement.
 */
export const StaircaseLayout: Story = {
  name: "Layout: Staircase (Right)",
  args: {
    layout: "staircase",
    barHeight: 28,
    bars: [
      <ProfileIconStatusBarSimple key="profile" level={12} barHeight={28} />,
      <CurrencyStatusBarSimple key="currency" value={1250} barHeight={28} />,
      <ProgressStatusBar key="progress" progress={75} barHeight={28} />,
    ],
  },
}

/**
 * ## Staircase Left Layout
 *
 * Same ascending pattern but left-aligned.
 * Useful for left-side placement in headers.
 */
export const StaircaseLeftLayout: Story = {
  name: "Layout: Staircase (Left)",
  args: {
    layout: "staircase-left",
    barHeight: 28,
    bars: [
      <ProfileIconStatusBarSimple key="profile" level={12} barHeight={28} />,
      <CurrencyStatusBarSimple key="currency" value={1250} barHeight={28} />,
      <ProgressStatusBar key="progress" progress={75} barHeight={28} />,
    ],
  },
}

/**
 * ## Horizontal Layout
 *
 * Bars arranged side by side with equal alignment.
 * Good for compact headers or mobile landscape.
 */
export const HorizontalLayout: Story = {
  name: "Layout: Horizontal",
  args: {
    layout: "horizontal",
    barHeight: 28,
    bars: [
      <ProfileIconStatusBarSimple key="profile" level={12} barHeight={28} />,
      <CurrencyStatusBarSimple key="currency" value={1250} barHeight={28} />,
      <ProgressStatusBar key="progress" progress={75} barHeight={28} />,
    ],
  },
}

/**
 * ## Horizontal Center Layout
 *
 * Small-Large-Small pattern with center bar emphasized via scale transform.
 * The middle bar(s) are scaled 1.15x to create visual hierarchy.
 */
export const HorizontalCenterLayout: StoryObj = {
  name: "Layout: Small-Large-Small",
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6">Small - Large - Small Pattern</Typography>
      <Typography variant="body2" color="text.secondary">
        Center bar(s) scaled 1.15x for emphasis. Uses StatusBarDisplay with layout="horizontal-center"
      </Typography>

      <Paper elevation={0} sx={{ p: 4, bgcolor: "#f5f5f5", borderRadius: 2 }}>
        <StatusBarDisplay
          layout="horizontal-center"
          barHeight={28}
          bars={[
            <ProfileIconStatusBarSimple key="profile" level={12} barHeight={28} />,
            <ProgressStatusBar key="progress" progress={75} barHeight={28} />,
            <CurrencyStatusBarSimple key="currency" value={1250} barHeight={28} />,
          ]}
        />
      </Paper>

      <Typography variant="caption" color="text.secondary">
        Note: The middle bar (Progress) is automatically scaled larger
      </Typography>
    </Stack>
  ),
}

/**
 * ## All Layout Patterns Comparison
 *
 * Side-by-side view of all layout options.
 */
export const AllLayoutPatterns: StoryObj = {
  name: "All Layout Patterns",
  render: () => {
    const layouts: StatusBarLayoutPattern[] = [
      "staircase",
      "staircase-left",
      "horizontal",
      "horizontal-center",
    ]

    const makeBars = (height: number) => [
      <ProfileIconStatusBarSimple key="profile" level={12} barHeight={height} />,
      <CurrencyStatusBarSimple key="currency" value={1250} barHeight={height} />,
      <ProgressStatusBar key="progress" progress={75} barHeight={height} />,
    ]

    return (
      <Stack spacing={4}>
        <Typography variant="h6">Layout Pattern Comparison</Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 4,
          }}
        >
          {layouts.map((layout) => (
            <Paper
              key={layout}
              elevation={0}
              sx={{
                p: 3,
                bgcolor: "#f5f5f5",
                borderRadius: 2,
                minHeight: 180,
              }}
            >
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ textTransform: "capitalize" }}
              >
                {layout.replace("-", " ")}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <StatusBarDisplay layout={layout} barHeight={24} bars={makeBars(24)} />
              </Box>
            </Paper>
          ))}
        </Box>
      </Stack>
    )
  },
}

/**
 * ## Gap Customization
 *
 * Adjust spacing between bars using the gap prop (theme spacing units).
 */
export const GapCustomization: StoryObj = {
  name: "Gap Customization",
  render: () => {
    const gaps = [0, 0.5, 1, 2]

    const makeBars = (height: number) => [
      <ProfileIconStatusBarSimple key="profile" level={12} barHeight={height} />,
      <CurrencyStatusBarSimple key="currency" value={1250} barHeight={height} />,
      <ProgressStatusBar key="progress" progress={75} barHeight={height} />,
    ]

    return (
      <Stack spacing={4}>
        <Typography variant="h6">Gap Spacing</Typography>
        <Typography variant="body2" color="text.secondary">
          gap prop controls spacing between bars (theme spacing units)
        </Typography>

        <Stack spacing={3}>
          {gaps.map((gapValue) => (
            <Paper
              key={gapValue}
              elevation={0}
              sx={{ p: 3, bgcolor: "#f5f5f5", borderRadius: 2 }}
            >
              <Typography variant="subtitle2" gutterBottom>
                gap={gapValue} ({gapValue * 8}px)
              </Typography>
              <StatusBarDisplay
                layout="horizontal"
                barHeight={24}
                gap={gapValue}
                bars={makeBars(24)}
              />
            </Paper>
          ))}
        </Stack>
      </Stack>
    )
  },
}

// ============================================================================
// EXPANSION STRATEGIES
// ============================================================================

/**
 * ## Inline Expansion (Default)
 *
 * Bars expand within the document flow.
 * May cause layout shift but maintains natural flow.
 */
export const InlineExpansion: StoryObj = {
  name: "Expansion: Inline",
  render: () => {
    const [expanded, setExpanded] = useState(false)

    return (
      <Stack spacing={4} alignItems="center">
        <Typography variant="h6">Inline Expansion</Typography>
        <Typography variant="body2" color="text.secondary">
          Notice how the box below shifts when bars expand
        </Typography>

        <Paper
          elevation={0}
          sx={{ p: 4, bgcolor: "#f5f5f5", borderRadius: 2, minWidth: 300 }}
        >
          <StatusBarDisplay
            layout="staircase"
            barHeight={28}
            expandable={true}
            expansionTrigger="click"
            expansionBehavior="inline"
            expanded={expanded}
            onExpandedChange={setExpanded}
            bars={[
              <ProfileIconStatusBarSimple key="profile" level={12} barHeight={28} />,
              <CurrencyStatusBarSimple key="currency" value={1250} barHeight={28} />,
              <ProgressStatusBar key="progress" progress={75} barHeight={28} />,
            ]}
          />
        </Paper>

        {/* This box demonstrates layout shift */}
        <Paper sx={{ p: 2, bgcolor: "#e0e0e0", width: 200 }}>
          <Typography variant="caption">
            Content below (shifts on expand)
          </Typography>
        </Paper>

        <Button variant="outlined" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Collapse" : "Expand"}
        </Button>
      </Stack>
    )
  },
}

/**
 * ## Overlay Expansion
 *
 * Bars expand as overlay using absolute positioning.
 * No layout shift - expanded bars float over other content.
 */
export const OverlayExpansion: StoryObj = {
  name: "Expansion: Overlay",
  render: () => {
    const [expanded, setExpanded] = useState(false)

    return (
      <Stack spacing={4} alignItems="center">
        <Typography variant="h6">Overlay Expansion</Typography>
        <Typography variant="body2" color="text.secondary">
          Expanded bars overlay content - no layout shift
        </Typography>

        <Box sx={{ position: "relative", minHeight: 200, width: 300 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              position: "relative",
              zIndex: 1,
            }}
          >
            <StatusBarDisplay
              layout="staircase"
              barHeight={28}
              expandable={true}
              expansionTrigger="click"
              expansionBehavior="overlay"
              expanded={expanded}
              onExpandedChange={setExpanded}
              bars={[
                <ProfileIconStatusBarSimple key="profile" level={12} barHeight={28} />,
                <CurrencyStatusBarSimple key="currency" value={1250} barHeight={28} />,
                <ProgressStatusBar key="progress" progress={75} barHeight={28} />,
              ]}
            />
          </Paper>

          {/* This box stays in place */}
          <Paper sx={{ p: 2, bgcolor: "#e0e0e0", mt: 2 }}>
            <Typography variant="caption">
              Content below (does NOT shift)
            </Typography>
          </Paper>
        </Box>

        <Button variant="outlined" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Collapse" : "Expand"}
        </Button>
      </Stack>
    )
  },
}

/**
 * ## Reserved Space Expansion
 *
 * Container always reserves maximum space.
 * No shift, but uses more space when collapsed.
 */
export const ReservedExpansion: StoryObj = {
  name: "Expansion: Reserved Space",
  render: () => {
    const [expanded, setExpanded] = useState(false)

    return (
      <Stack spacing={4} alignItems="center">
        <Typography variant="h6">Reserved Space Expansion</Typography>
        <Typography variant="body2" color="text.secondary">
          Container always maintains full size - bars fade in/out
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            // Reserve space for all 3 bars
            minHeight: 28 * 3 + 8 * 2 + 32, // 3 bars + gaps + padding
            minWidth: 28 * 6 + 32, // widest bar + padding
          }}
        >
          <StatusBarDisplay
            layout="staircase"
            barHeight={28}
            expandable={true}
            expansionTrigger="click"
            expansionBehavior="reserved"
            expanded={expanded}
            onExpandedChange={setExpanded}
            bars={[
              <ProfileIconStatusBarSimple key="profile" level={12} barHeight={28} />,
              <CurrencyStatusBarSimple key="currency" value={1250} barHeight={28} />,
              <ProgressStatusBar key="progress" progress={75} barHeight={28} />,
            ]}
          />
        </Paper>

        <Paper sx={{ p: 2, bgcolor: "#e0e0e0", width: 200 }}>
          <Typography variant="caption">
            Content below (never shifts)
          </Typography>
        </Paper>

        <Button variant="outlined" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Collapse" : "Expand"}
        </Button>
      </Stack>
    )
  },
}

// ============================================================================
// HORIZONTAL EXPANSION DIRECTIONS
// ============================================================================

/**
 * ## Horizontal Expand Right
 *
 * Bars expand to the right from the anchor bar.
 * Default for horizontal layout.
 */
export const HorizontalExpandRight: StoryObj = {
  name: "Horizontal: Expand Right",
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6">Horizontal Expand Right</Typography>
      <Typography variant="body2" color="text.secondary">
        Hover to see bars expand to the right
      </Typography>

      <Paper
        elevation={0}
        sx={{ p: 4, bgcolor: "#f5f5f5", borderRadius: 2, minWidth: 400 }}
      >
        <StatusBarDisplay
          layout="horizontal"
          barHeight={28}
          expandable={true}
          expansionTrigger="hover"
          expansionDirection="right"
          bars={[
            <ProfileIconStatusBarSimple key="profile" level={12} barHeight={28} />,
            <CurrencyStatusBarSimple key="currency" value={1250} barHeight={28} />,
            <ProgressStatusBar key="progress" progress={75} barHeight={28} />,
          ]}
        />
      </Paper>
    </Stack>
  ),
}

/**
 * ## Horizontal Expand Left
 *
 * Bars expand to the left from the anchor bar.
 * Good for right-aligned header placement.
 */
export const HorizontalExpandLeft: StoryObj = {
  name: "Horizontal: Expand Left",
  render: () => (
    <Stack spacing={4} alignItems="flex-end">
      <Typography variant="h6">Horizontal Expand Left</Typography>
      <Typography variant="body2" color="text.secondary">
        Hover to see bars expand to the left
      </Typography>

      <Paper
        elevation={0}
        sx={{ p: 4, bgcolor: "#f5f5f5", borderRadius: 2, minWidth: 400 }}
      >
        <Box display="flex" justifyContent="flex-end">
          <StatusBarDisplay
            layout="horizontal"
            barHeight={28}
            expandable={true}
            expansionTrigger="hover"
            expansionDirection="left"
            bars={[
              <ProfileIconStatusBarSimple key="profile" level={12} barHeight={28} />,
              <CurrencyStatusBarSimple key="currency" value={1250} barHeight={28} />,
              <ProgressStatusBar key="progress" progress={75} barHeight={28} />,
            ]}
          />
        </Box>
      </Paper>
    </Stack>
  ),
}

/**
 * ## All Expansion Directions
 *
 * Comparison of all four expansion directions.
 */
export const AllExpansionDirections: StoryObj = {
  name: "All Expansion Directions",
  render: () => {
    const directions: StatusBarExpansionDirection[] = ["down", "up", "right", "left"]

    const makeBars = (height: number) => [
      <ProfileIconStatusBarSimple key="profile" level={12} barHeight={height} />,
      <CurrencyStatusBarSimple key="currency" value={1250} barHeight={height} />,
      <ProgressStatusBar key="progress" progress={75} barHeight={height} />,
    ]

    return (
      <Stack spacing={4}>
        <Typography variant="h6">Expansion Direction Comparison</Typography>
        <Typography variant="body2" color="text.secondary">
          Hover each to see expansion direction
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 4,
          }}
        >
          {directions.map((direction) => (
            <Paper
              key={direction}
              elevation={0}
              sx={{
                p: 4,
                bgcolor: "#f5f5f5",
                borderRadius: 2,
                minHeight: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{ textTransform: "uppercase", textAlign: "center" }}
                >
                  {direction}
                </Typography>
                <StatusBarDisplay
                  layout={
                    direction === "left" || direction === "right"
                      ? "horizontal"
                      : "staircase"
                  }
                  barHeight={24}
                  expandable={true}
                  expansionTrigger="hover"
                  expansionDirection={direction}
                  bars={makeBars(24)}
                />
              </Box>
            </Paper>
          ))}
        </Box>
      </Stack>
    )
  },
}

// ============================================================================
// MULTI-CONTENT BARS
// ============================================================================

/**
 * ## Multi-Currency Bar
 *
 * Example of a single bar containing multiple currency types.
 * Uses GenericStatusBar for flexible content layout.
 */
export const MultiCurrencyBar: StoryObj = {
  name: "Multi-Content: Multiple Currencies",
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6">Multiple Currencies in One Bar</Typography>
      <Typography variant="body2" color="text.secondary">
        GenericStatusBar with custom content layout
      </Typography>

      <Paper elevation={0} sx={{ p: 4, bgcolor: "#f5f5f5", borderRadius: 2 }}>
        <GenericStatusBar aspectRatio={8} barHeight={36}>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
            height="100%"
            px={1}
            gap={2}
          >
            {/* Coins */}
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="body2" fontWeight={600}>
                1,250
              </Typography>
              <Box width={20} height={20}>
                <CoinIcon color="currentColor" />
              </Box>
            </Box>

            {/* Divider */}
            <Divider orientation="vertical" flexItem sx={{ opacity: 0.5 }} />

            {/* Gems (using same icon as placeholder) */}
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="body2" fontWeight={600}>
                50
              </Typography>
              <Box width={20} height={20}>
                <ExperienceIcon />
              </Box>
            </Box>
          </Box>
        </GenericStatusBar>
      </Paper>
    </Stack>
  ),
}

/**
 * ## Custom Content Bars
 *
 * Examples of bars with various custom content arrangements.
 */
export const CustomContentBars: StoryObj = {
  name: "Multi-Content: Custom Layouts",
  render: () => (
    <Stack spacing={4}>
      <Typography variant="h6">Custom Content Layouts</Typography>

      <Stack spacing={3}>
        {/* Left-aligned content */}
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Left-aligned content
          </Typography>
          <GenericStatusBar aspectRatio={6} barHeight={32}>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              width="100%"
              height="100%"
              px={1.5}
            >
              <Box width={18} height={18} mr={1}>
                <CoinIcon color="currentColor" />
              </Box>
              <Typography variant="body2" fontWeight={600}>
                Points: 1,250
              </Typography>
            </Box>
          </GenericStatusBar>
        </Box>

        {/* Center-aligned content */}
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Center-aligned content
          </Typography>
          <GenericStatusBar aspectRatio={5} barHeight={32}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
            >
              <Typography variant="body2" fontWeight={700}>
                LEVEL 12
              </Typography>
            </Box>
          </GenericStatusBar>
        </Box>

        {/* Space-between content */}
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Space-between content
          </Typography>
          <GenericStatusBar aspectRatio={7} barHeight={32}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              height="100%"
              px={1.5}
            >
              <Typography variant="caption">HP</Typography>
              <Box display="flex" alignItems="center" gap={0.5}>
                <Box
                  sx={{
                    width: 80,
                    height: 8,
                    bgcolor: "rgba(255,255,255,0.3)",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: "75%",
                      height: "100%",
                      bgcolor: "#4caf50",
                    }}
                  />
                </Box>
                <Typography variant="caption">75/100</Typography>
              </Box>
            </Box>
          </GenericStatusBar>
        </Box>
      </Stack>
    </Stack>
  ),
}

// ============================================================================
// INTERACTIVE EXPLORER
// ============================================================================

/**
 * ## Interactive Explorer
 *
 * Full control panel to experiment with all StatusBarDisplay options.
 */
export const InteractiveExplorer: StoryObj = {
  name: "Interactive Explorer",
  render: () => {
    const [layout, setLayout] = useState<StatusBarLayoutPattern>("staircase")
    const [barHeight, setBarHeight] = useState(28)
    const [gap, setGap] = useState(0.5)
    const [displayState, setDisplayState] = useState<StatusBarDisplayState>("active")
    const [expandable, setExpandable] = useState(true)
    const [expansionTrigger, setExpansionTrigger] = useState<"hover" | "click">("hover")
    const [expansionDirection, setExpansionDirection] =
      useState<StatusBarExpansionDirection>("down")
    const [expansionBehavior, setExpansionBehavior] =
      useState<ExpansionBehavior>("inline")

    const makeBars = () => [
      <ProfileIconStatusBarSimple key="profile" level={12} barHeight={barHeight} />,
      <CurrencyStatusBarSimple key="currency" value={1250} barHeight={barHeight} />,
      <ProgressStatusBar key="progress" progress={75} barHeight={barHeight} />,
    ]

    return (
      <Stack spacing={4}>
        <Typography variant="h6">Interactive Explorer</Typography>

        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {/* Controls */}
          <Paper sx={{ p: 3, minWidth: 280 }}>
            <Stack spacing={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Layout</InputLabel>
                <Select
                  value={layout}
                  label="Layout"
                  onChange={(e) => setLayout(e.target.value as StatusBarLayoutPattern)}
                >
                  <MenuItem value="staircase">Staircase (Right)</MenuItem>
                  <MenuItem value="staircase-left">Staircase (Left)</MenuItem>
                  <MenuItem value="horizontal">Horizontal</MenuItem>
                  <MenuItem value="horizontal-center">Horizontal Center</MenuItem>
                </Select>
              </FormControl>

              <Box>
                <Typography variant="caption" gutterBottom display="block">
                  Gap: {gap} ({gap * 8}px)
                </Typography>
                <Slider
                  value={gap}
                  onChange={(_, v) => setGap(v as number)}
                  min={0}
                  max={3}
                  step={0.5}
                  marks
                />
              </Box>

              <FormControl fullWidth size="small">
                <InputLabel>State</InputLabel>
                <Select
                  value={displayState}
                  label="State"
                  onChange={(e) =>
                    setDisplayState(e.target.value as StatusBarDisplayState)
                  }
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="interactive">Interactive</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={expandable}
                    onChange={(e) => setExpandable(e.target.checked)}
                  />
                }
                label="Expandable"
              />

              {expandable && (
                <>
                  <FormControl fullWidth size="small">
                    <InputLabel>Trigger</InputLabel>
                    <Select
                      value={expansionTrigger}
                      label="Trigger"
                      onChange={(e) =>
                        setExpansionTrigger(e.target.value as "hover" | "click")
                      }
                    >
                      <MenuItem value="hover">Hover</MenuItem>
                      <MenuItem value="click">Click</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size="small">
                    <InputLabel>Direction</InputLabel>
                    <Select
                      value={expansionDirection}
                      label="Direction"
                      onChange={(e) =>
                        setExpansionDirection(
                          e.target.value as StatusBarExpansionDirection
                        )
                      }
                    >
                      <MenuItem value="down">Down</MenuItem>
                      <MenuItem value="up">Up</MenuItem>
                      <MenuItem value="right">Right</MenuItem>
                      <MenuItem value="left">Left</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size="small">
                    <InputLabel>Behavior</InputLabel>
                    <Select
                      value={expansionBehavior}
                      label="Behavior"
                      onChange={(e) =>
                        setExpansionBehavior(e.target.value as ExpansionBehavior)
                      }
                    >
                      <MenuItem value="inline">Inline (may shift)</MenuItem>
                      <MenuItem value="overlay">Overlay (no shift)</MenuItem>
                      <MenuItem value="reserved">Reserved (no shift)</MenuItem>
                    </Select>
                  </FormControl>
                </>
              )}
            </Stack>
          </Paper>

          {/* Preview */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              bgcolor: "#f5f5f5",
              borderRadius: 2,
              flex: 1,
              minWidth: 350,
              minHeight: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StatusBarDisplay
              layout={layout}
              barHeight={barHeight}
              gap={gap}
              displayState={displayState}
              expandable={expandable}
              expansionTrigger={expansionTrigger}
              expansionDirection={expansionDirection}
              expansionBehavior={expansionBehavior}
              bars={makeBars()}
            />
          </Paper>
        </Box>

        {/* Current Config */}
        <Paper sx={{ p: 2, bgcolor: "#fafafa" }}>
          <Typography variant="caption" component="pre" sx={{ fontFamily: "monospace", m: 0 }}>
            {`<StatusBarDisplay
  layout="${layout}"
  barHeight={${barHeight}}
  gap={${gap}}
  displayState="${displayState}"
  expandable={${expandable}}${expandable ? `
  expansionTrigger="${expansionTrigger}"
  expansionDirection="${expansionDirection}"
  expansionBehavior="${expansionBehavior}"` : ""}
  bars={[...]}
/>`}
          </Typography>
        </Paper>
      </Stack>
    )
  },
}

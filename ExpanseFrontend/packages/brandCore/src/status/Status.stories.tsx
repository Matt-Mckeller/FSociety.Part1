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
  Slider,
  Switch,
  FormControlLabel,
  Paper,
  Chip,
} from "@mui/material"
import { ProfileStatusDisplay } from "./ProfileStatusDisplay"
import type {
  ProfileStatusDisplayLayout,
  ProfileStatusDisplayState,
  ExpansionTrigger,
  ExpansionDirection,
} from "./ProfileStatusDisplay"
import { CurrencyStatusBarSimple } from "./bars/CurrencyStatusBarSimple"
import { ProgressStatusBar } from "./bars/ProgressStatusBar"
import { ProfileIconStatusBarSimple } from "./bars/ProfileIconStatusBarSimple"

/**
 * # Status Display Components
 *
 * ProfileStatusDisplay is a GSAP-animated status bar system for game interfaces.
 *
 * ## Animation System
 *
 * The expand/collapse animation uses **GSAP timelines** with the following phases:
 *
 * ### Expand Animation
 * 1. **Bar 2 (Currency)** - Appears immediately with fill starting at 33% opacity
 * 2. **Fill fade-in** - Opacity animates 0.33 → 1.0 over 180ms (power2.out easing)
 * 3. **Color progression** - Lighter color → final color synchronized with opacity
 * 4. **Bar 3 (Progress)** - Appears after 120ms stagger delay, same fill animation
 *
 * ### Collapse Animation
 * 1. **Progress bar fades first** - Fill opacity 1.0 → 0 over 120ms (power2.in)
 * 2. **Currency bar follows** - After 60ms delay, same fade-out
 * 3. **Bar removal** - Progress bar hidden after fill fully fades
 *
 * ### GSAP Configuration
 * ```ts
 * {
 *   expandDuration: 0.18,      // 180ms fill fade-in
 *   collapseDuration: 0.12,    // 120ms fill fade-out
 *   staggerDelay: 0.12,        // 120ms before bar 3
 *   easeExpand: "power2.out",  // Smooth deceleration
 *   easeCollapse: "power2.in", // Smooth acceleration
 *   startingFillOpacity: 0.33, // Fill starts visible
 *   startingColorProgress: 0.33 // Color starts lighter
 * }
 * ```
 */
const meta: Meta<typeof ProfileStatusDisplay> = {
  title: "BrandCore/Status",
  component: ProfileStatusDisplay,
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
      options: ["staircase", "horizontal"],
      description: "Layout arrangement of status bars",
    },
    barHeight: {
      control: { type: "range", min: 20, max: 60, step: 2 },
      description: "Height of each status bar in pixels",
    },
    displayState: {
      control: "select",
      options: ["active", "interactive", "inactive"],
      description: "Visual state affecting appearance and interactivity",
    },
    expandable: {
      control: "boolean",
      description: "Enable expand/collapse animation",
    },
    expansionTrigger: {
      control: "select",
      options: ["hover", "click"],
      description: "How expansion is triggered",
    },
    expansionDirection: {
      control: "select",
      options: ["down", "up", "right", "left"],
      description: "Direction bars expand",
    },
    defaultExpanded: {
      control: "boolean",
      description: "Initial expanded state",
    },
  },
}

export default meta

type Story = StoryObj<typeof ProfileStatusDisplay>

// ============================================================================
// ProfileStatusDisplay
// ============================================================================

export const Default: Story = {
  name: "Profile Status Display",
  args: {
    layout: "staircase",
    barHeight: 28,
    displayState: "active",
  },
}

export const Horizontal: Story = {
  name: "Horizontal Layout",
  args: {
    layout: "horizontal",
    barHeight: 28,
    displayState: "active",
  },
}

export const Expandable: Story = {
  name: "Expandable (Hover)",
  args: {
    layout: "staircase",
    barHeight: 28,
    expandable: true,
    expansionTrigger: "hover",
    defaultExpanded: false,
  },
}

export const ExpandableClick: Story = {
  name: "Expandable (Click)",
  args: {
    layout: "staircase",
    barHeight: 28,
    expandable: true,
    expansionTrigger: "click",
    defaultExpanded: false,
  },
}

export const Interactive: Story = {
  name: "Interactive State",
  args: {
    layout: "staircase",
    barHeight: 28,
    displayState: "interactive",
  },
}

export const LargeSize: Story = {
  name: "Large Size",
  args: {
    layout: "staircase",
    barHeight: 48,
    displayState: "active",
  },
}

// ============================================================================
// ANIMATION SHOWCASE
// ============================================================================

/**
 * ## Animation Showcase
 *
 * Demonstrates the GSAP-powered expand/collapse animation.
 * Click the toggle button to see the staggered fill animation in action.
 *
 * **Animation Details:**
 * - Fill opacity animates from 33% → 100%
 * - Color lightness animates from lighter → final
 * - Bar 3 appears 120ms after Bar 2
 * - Uses power2 easing for smooth motion
 */
export const AnimationShowcase: StoryObj = {
  name: "Animation Showcase",
  render: () => {
    const [expanded, setExpanded] = useState(false)
    const [triggerCount, setTriggerCount] = useState(0)

    const handleToggle = () => {
      setExpanded(!expanded)
      setTriggerCount((c) => c + 1)
    }

    return (
      <Stack spacing={4} alignItems="center">
        <Typography variant="h6">GSAP Animation Demo</Typography>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            minWidth: 300,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ProfileStatusDisplay
            layout="staircase"
            barHeight={32}
            expandable={true}
            expansionTrigger="click"
            expanded={expanded}
            onExpandedChange={setExpanded}
          />
        </Paper>

        <Stack spacing={2} alignItems="center">
          <Button
            variant="contained"
            onClick={handleToggle}
            sx={{ minWidth: 200 }}
          >
            {expanded ? "Collapse (Click)" : "Expand (Click)"}
          </Button>

          <Stack direction="row" spacing={1}>
            <Chip
              label={expanded ? "Expanded" : "Collapsed"}
              color={expanded ? "success" : "default"}
              size="small"
            />
            <Chip
              label={`Triggers: ${triggerCount}`}
              variant="outlined"
              size="small"
            />
          </Stack>
        </Stack>

        <Paper sx={{ p: 2, bgcolor: "#fafafa", maxWidth: 400 }}>
          <Typography variant="caption" component="div">
            <strong>Animation Timing:</strong>
            <br />
            • Expand duration: 180ms (power2.out)
            <br />
            • Collapse duration: 120ms (power2.in)
            <br />
            • Stagger delay: 120ms between bars
            <br />• Fill starts at 33% opacity
          </Typography>
        </Paper>
      </Stack>
    )
  },
}

/**
 * ## Auto-Looping Animation
 *
 * Automatically toggles between expanded and collapsed states
 * to continuously demonstrate the animation.
 */
export const AnimationLoop: StoryObj = {
  name: "Animation Loop (Auto)",
  render: () => {
    const [expanded, setExpanded] = useState(false)
    const [isLooping, setIsLooping] = useState(true)

    React.useEffect(() => {
      if (!isLooping) return

      const interval = setInterval(() => {
        setExpanded((prev) => !prev)
      }, 1500)

      return () => clearInterval(interval)
    }, [isLooping])

    return (
      <Stack spacing={3} alignItems="center">
        <Typography variant="h6">Auto-Looping Demo</Typography>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            minWidth: 300,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ProfileStatusDisplay
            layout="staircase"
            barHeight={32}
            expandable={true}
            expansionTrigger="click"
            expanded={expanded}
          />
        </Paper>

        <FormControlLabel
          control={
            <Switch
              checked={isLooping}
              onChange={(e) => setIsLooping(e.target.checked)}
            />
          }
          label="Auto-loop animation"
        />

        <Chip
          label={expanded ? "EXPANDED" : "COLLAPSED"}
          color={expanded ? "primary" : "default"}
        />
      </Stack>
    )
  },
}

// ============================================================================
// STATE COMPARISON
// ============================================================================

/**
 * ## Display State Comparison
 *
 * Shows all three display states side-by-side:
 * - **Active**: Full opacity, always visible
 * - **Interactive**: Semi-transparent until hovered
 * - **Inactive**: Dimmed appearance with inverted colors
 */
export const StateComparison: StoryObj = {
  name: "State Comparison",
  render: () => {
    const states: ProfileStatusDisplayState[] = [
      "active",
      "interactive",
      "inactive",
    ]

    return (
      <Stack spacing={4}>
        <Typography variant="h6">Display States</Typography>
        <Typography variant="body2" color="text.secondary">
          Hover over each to see interactive behavior
        </Typography>

        <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap>
          {states.map((state) => (
            <Paper
              key={state}
              elevation={0}
              sx={{ p: 3, bgcolor: "#f5f5f5", borderRadius: 2 }}
            >
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ textTransform: "capitalize" }}
              >
                {state}
              </Typography>
              <ProfileStatusDisplay
                layout="staircase"
                barHeight={28}
                displayState={state}
              />
            </Paper>
          ))}
        </Stack>
      </Stack>
    )
  },
}

// ============================================================================
// EXPANSION DIRECTIONS
// ============================================================================

/**
 * ## Expansion Directions
 *
 * The expandable mode supports four directions:
 * - **down**: Default for staircase layout
 * - **up**: Expands upward
 * - **right**: Default for horizontal layout
 * - **left**: Expands leftward
 */
export const ExpansionDirections: StoryObj = {
  name: "Expansion Directions",
  render: () => {
    const directions: ExpansionDirection[] = ["down", "up", "right", "left"]

    return (
      <Stack spacing={4}>
        <Typography variant="h6">Expansion Directions</Typography>
        <Typography variant="body2" color="text.secondary">
          Hover to see each direction expand
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
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ textTransform: "uppercase" }}
              >
                {direction}
              </Typography>
              <ProfileStatusDisplay
                layout={
                  direction === "left" || direction === "right"
                    ? "horizontal"
                    : "staircase"
                }
                barHeight={28}
                expandable={true}
                expansionTrigger="hover"
                expansionDirection={direction}
              />
            </Paper>
          ))}
        </Box>
      </Stack>
    )
  },
}

// ============================================================================
// INTERACTIVE EXPLORER
// ============================================================================

/**
 * ## Interactive Explorer
 *
 * Full control panel to experiment with all ProfileStatusDisplay props.
 * Adjust layout, size, state, and expansion behavior in real-time.
 */
export const InteractiveExplorer: StoryObj = {
  name: "Interactive Explorer",
  render: () => {
    const [layout, setLayout] = useState<ProfileStatusDisplayLayout>("staircase")
    const [barHeight, setBarHeight] = useState(32)
    const [displayState, setDisplayState] =
      useState<ProfileStatusDisplayState>("active")
    const [expandable, setExpandable] = useState(true)
    const [expansionTrigger, setExpansionTrigger] =
      useState<ExpansionTrigger>("hover")
    const [expansionDirection, setExpansionDirection] =
      useState<ExpansionDirection>("down")
    const [defaultExpanded, setDefaultExpanded] = useState(false)

    // Key to force remount when defaultExpanded changes
    const [key, setKey] = useState(0)

    return (
      <Stack spacing={4}>
        <Typography variant="h6">Interactive Explorer</Typography>

        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {/* Controls */}
          <Paper sx={{ p: 3, minWidth: 280 }}>
            <Stack spacing={3}>
              <Typography variant="subtitle2">Layout & Size</Typography>

              <FormControl fullWidth size="small">
                <InputLabel>Layout</InputLabel>
                <Select
                  value={layout}
                  label="Layout"
                  onChange={(e) =>
                    setLayout(e.target.value as ProfileStatusDisplayLayout)
                  }
                >
                  <MenuItem value="staircase">Staircase</MenuItem>
                  <MenuItem value="horizontal">Horizontal</MenuItem>
                </Select>
              </FormControl>

              <Box>
                <Typography variant="caption" gutterBottom display="block">
                  Bar Height: {barHeight}px
                </Typography>
                <Slider
                  value={barHeight}
                  onChange={(_, v) => setBarHeight(v as number)}
                  min={20}
                  max={60}
                  step={2}
                />
              </Box>

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Display State
              </Typography>

              <FormControl fullWidth size="small">
                <InputLabel>State</InputLabel>
                <Select
                  value={displayState}
                  label="State"
                  onChange={(e) =>
                    setDisplayState(e.target.value as ProfileStatusDisplayState)
                  }
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="interactive">Interactive</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="subtitle2" sx={{ mt: 2 }}>
                Expansion
              </Typography>

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
                        setExpansionTrigger(e.target.value as ExpansionTrigger)
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
                          e.target.value as ExpansionDirection
                        )
                      }
                    >
                      <MenuItem value="down">Down</MenuItem>
                      <MenuItem value="up">Up</MenuItem>
                      <MenuItem value="right">Right</MenuItem>
                      <MenuItem value="left">Left</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControlLabel
                    control={
                      <Switch
                        checked={defaultExpanded}
                        onChange={(e) => {
                          setDefaultExpanded(e.target.checked)
                          setKey((k) => k + 1) // Remount to apply
                        }}
                      />
                    }
                    label="Start Expanded"
                  />
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
              minWidth: 300,
              minHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProfileStatusDisplay
              key={key}
              layout={layout}
              barHeight={barHeight}
              displayState={displayState}
              expandable={expandable}
              expansionTrigger={expansionTrigger}
              expansionDirection={expansionDirection}
              defaultExpanded={defaultExpanded}
            />
          </Paper>
        </Box>

        {/* Current Props Display */}
        <Paper sx={{ p: 2, bgcolor: "#fafafa" }}>
          <Typography
            variant="caption"
            component="pre"
            sx={{ fontFamily: "monospace", m: 0 }}
          >
            {`<ProfileStatusDisplay
  layout="${layout}"
  barHeight={${barHeight}}
  displayState="${displayState}"
  expandable={${expandable}}${
    expandable
      ? `
  expansionTrigger="${expansionTrigger}"
  expansionDirection="${expansionDirection}"
  defaultExpanded={${defaultExpanded}}`
      : ""
  }
/>`}
          </Typography>
        </Paper>
      </Stack>
    )
  },
}

// ============================================================================
// Individual Status Bars
// ============================================================================

export const StatusBars: StoryObj = {
  name: "Individual Status Bars",
  render: () => (
    <Stack spacing={3} sx={{ width: 200 }}>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", mb: 1, display: "block" }}
        >
          Currency Bar
        </Typography>
        <CurrencyStatusBarSimple value={1250} barHeight={28} />
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", mb: 1, display: "block" }}
        >
          Progress Bar
        </Typography>
        <ProgressStatusBar progress={75} barHeight={28} />
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", mb: 1, display: "block" }}
        >
          Profile Icon Bar
        </Typography>
        <ProfileIconStatusBarSimple level={12} barHeight={28} />
      </Box>
    </Stack>
  ),
}

export const StatusBarSizes: StoryObj = {
  name: "Status Bar Sizes",
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", mb: 1, display: "block" }}
        >
          Small (24px)
        </Typography>
        <Box sx={{ width: 160 }}>
          <CurrencyStatusBarSimple value={500} barHeight={24} />
        </Box>
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", mb: 1, display: "block" }}
        >
          Medium (32px)
        </Typography>
        <Box sx={{ width: 200 }}>
          <CurrencyStatusBarSimple value={500} barHeight={32} />
        </Box>
      </Box>
      <Box>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", mb: 1, display: "block" }}
        >
          Large (48px)
        </Typography>
        <Box sx={{ width: 280 }}>
          <CurrencyStatusBarSimple value={500} barHeight={48} />
        </Box>
      </Box>
    </Stack>
  ),
}

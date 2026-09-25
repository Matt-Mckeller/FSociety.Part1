import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material"
import { useState } from "react"
import {
  WalkingCharacter,
  PushingProgressCharacter,
  ArmAnimationMode,
} from "expanse.ui/game"
import { CharacterPositionProvider } from "expanse.ui/game"

/**
 * The **PushingProgress** animation is a flagship animated character that demonstrates
 * the Expanse gamification system in action. It combines multiple character poses
 * with progress bar animation to create an engaging visual sequence.
 *
 * ## Animation Sequence
 *
 * 1. **Stand** - Character stands facing forward (1.5s pause)
 * 2. **Push** - Character smoothly transitions to pushing pose (0.4s transition)
 * 3. **Hands Oscillate** - Hands move up and down on the bar while pushing
 * 4. **Walk** - Character smoothly transitions to walking pose (0.3s transition)
 * 5. **Celebrate** - Energetic celebration with anticipation, jump apex, and bounce landing
 * 6. **Loop** - Animation repeats continuously (configurable)
 *
 * ## Technical Features (V2 Animation System)
 *
 * - **GSAP-Powered Pose Transitions**: Smooth interpolation between all body parts
 * - **Secondary Animations**: Hands oscillate independently during push
 * - **Per-Limb Timing**: Body leans first, arms follow
 * - **Energetic Celebration**: Anticipation crouch → jump with raised arms → squash/stretch landing
 * - **Configurable Progress**: Animate from any % to any %
 */
const meta: Meta = {
  title: "Game/Characters/PushingProgressAnimation",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
The PushingProgress animation is a core visual element of the Expanse learning platform. 
It shows a character pushing a progress bar to completion, then walking and celebrating - 
symbolizing the learner's journey through course content.

### V2 Animation System Features

- **Smooth Pose Transitions**: No more instant pose switches - all body parts interpolate smoothly
- **Hands Oscillation**: While pushing, hands move up and down on the progress bar
- **GSAP Timeline Integration**: All animations coordinated via GSAP for 60fps smoothness
- **Configurable Progress Range**: Start from any % and animate to any target %
- **Energetic Celebration**: Anticipation crouch, arms raised at apex, squash/stretch landing

### Celebration Animation (Enhanced)

The celebration now features a full animation sequence:
1. **Anticipation** - Slight crouch with arms lowered (0.12s)
2. **Jump Up** - Explosive jump with arms raised in V shape (0.25s)
3. **Apex Hang** - Brief pause at peak with legs tucked (0.08s)
4. **Fall** - Accelerate down with body preparing for impact (0.20s)
5. **Landing** - Squash on impact + bounce recovery (0.35s)

### Why This Matters

- **Engagement**: Visual progress is more motivating than numbers alone
- **Gamification**: The energetic celebration reinforces achievement
- **Brand Identity**: Consistent use of the stick figure character across the platform
        `,
      },
    },
  },
}

export default meta

// =============================================================================
// Primary Story - Hero Animation
// =============================================================================

/**
 * The primary view of the PushingProgressCharacter animation (V2), presented in a clean
 * layout with descriptive text. This uses the new GSAP-powered animation system
 * with smooth pose transitions and hands oscillation.
 */
export const Default: StoryObj = {
  name: "Default Animation (V2)",
  render: () => (
    <CharacterPositionProvider>
      <Box
        sx={{
          p: 3,
          bgcolor: "background.default",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 900,
            width: "100%",
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "text.primary",
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              🏃 Pushing Progress Animation
            </Typography>
            <Chip label="V2" color="success" size="small" />
          </Box>
          <Typography
            variant="body1"
            sx={{ mb: 4, color: "text.secondary", textAlign: "center" }}
          >
            Watch the character push the progress bar to 100%, walk to the end,
            and celebrate their achievement! Notice the smooth transitions and
            hands oscillation.
          </Typography>
          <PushingProgressCharacter />

          <Stack spacing={2} sx={{ mt: 4 }}>
            <Typography variant="h6" color="text.primary">
              Animation Timeline
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {[
                { phase: "Stand", duration: "1.5s", color: "info.main" },
                { phase: "Push", duration: "3.0s", color: "warning.main" },
                { phase: "Walk", duration: "1.0s", color: "success.main" },
                {
                  phase: "Celebrate",
                  duration: "1.0s",
                  color: "secondary.main",
                },
              ].map((item) => (
                <Paper
                  key={item.phase}
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: item.color,
                    color: "white",
                    borderRadius: 1,
                    minWidth: 100,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="subtitle2">{item.phase}</Typography>
                  <Typography variant="caption">{item.duration}</Typography>
                </Paper>
              ))}
            </Box>
          </Stack>
        </Paper>
      </Box>
    </CharacterPositionProvider>
  ),
}

// =============================================================================
// Dark Theme Variant
// =============================================================================

/**
 * The animation rendered on a dark background, demonstrating how
 * the character and progress bar adapt to different theme contexts.
 */
export const DarkBackground: StoryObj = {
  name: "Dark Background",
  render: () => (
    <CharacterPositionProvider>
      <Box
        sx={{
          p: 3,
          bgcolor: "#0d1117",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            maxWidth: 900,
            width: "100%",
            bgcolor: "#161b22",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#ffffff", textAlign: "center", fontWeight: 600 }}
            >
              🌙 Dark Mode Animation
            </Typography>
            <Chip label="V2" color="success" size="small" />
          </Box>
          <Typography
            variant="body1"
            sx={{ mb: 4, color: "#8b949e", textAlign: "center" }}
          >
            Same smooth animation, optimized visibility on dark backgrounds.
          </Typography>
          <PushingProgressCharacter />
        </Paper>
      </Box>
    </CharacterPositionProvider>
  ),
}

// =============================================================================
// Compact View
// =============================================================================

/**
 * A scaled-down version of the animation for use in smaller containers
 * or dashboard widgets. Uses CSS transform to maintain aspect ratio.
 */
export const Compact: StoryObj = {
  name: "Compact View",
  render: () => (
    <CharacterPositionProvider>
      <Box
        sx={{
          p: 3,
          bgcolor: "background.default",
          minHeight: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 3,
            maxWidth: 500,
            width: "100%",
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "text.primary", textAlign: "center" }}
            >
              Compact Widget View
            </Typography>
            <Chip label="V2" color="success" size="small" />
          </Box>
          <Box sx={{ transform: "scale(0.75)", transformOrigin: "top center" }}>
            <PushingProgressCharacter />
          </Box>
        </Paper>
      </Box>
    </CharacterPositionProvider>
  ),
}

// =============================================================================
// Multiple Instances
// =============================================================================

/**
 * Demonstrates multiple PushingProgressCharacter instances running simultaneously.
 * Each instance maintains its own animation state independently.
 */
export const MultipleInstances: StoryObj = {
  name: "Multiple Instances",
  render: () => (
    <Box
      sx={{
        p: 3,
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 3, color: "text.primary", textAlign: "center" }}
      >
        Independent Animation Instances (V2)
      </Typography>
      <Stack spacing={4}>
        {[1, 2].map((i) => (
          <CharacterPositionProvider key={i}>
            <Paper sx={{ p: 2, bgcolor: "background.paper" }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Instance {i}
                </Typography>
                <Chip label="V2" color="success" size="small" />
              </Box>
              <Box
                sx={{
                  transform: "scale(0.6)",
                  transformOrigin: "top left",
                  height: 200,
                }}
              >
                <PushingProgressCharacter />
              </Box>
            </Paper>
          </CharacterPositionProvider>
        ))}
      </Stack>
    </Box>
  ),
}

// =============================================================================
// V2 Smooth Transitions (NEW)
// =============================================================================

/**
 * **NEW V2 Animation System** - Demonstrates smooth GSAP-powered transitions
 * between poses. Compare with Default to see the difference.
 *
 * Key improvements:
 * - Standing → Pushing transition is animated (body leans, arms extend)
 * - Pushing → Walking transition is animated
 * - Walking → Celebration transition uses bounce easing
 * - Hands oscillate up/down on the bar while pushing
 */
export const SmoothTransitionsV2: StoryObj = {
  name: "V2 - Smooth Transitions",
  render: () => (
    <Box
      sx={{
        p: 3,
        bgcolor: "background.default",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 900,
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "text.primary", textAlign: "center", fontWeight: 600 }}
          >
            ✨ V2 Smooth Transitions
          </Typography>
          <Chip label="NEW" color="success" size="small" />
        </Box>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "text.secondary", textAlign: "center" }}
        >
          Watch for smooth pose transitions! The character smoothly morphs
          between standing, pushing, walking, and celebrating poses.
        </Typography>
        <PushingProgressCharacter />

        <Stack spacing={2} sx={{ mt: 4 }}>
          <Typography variant="h6" color="text.primary">
            V2 Improvements
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {[
              {
                feature: "Pose Transitions",
                desc: "0.3-0.5s smooth morphing",
                color: "primary.main",
              },
              {
                feature: "Hands Oscillation",
                desc: "Up/down while pushing",
                color: "secondary.main",
              },
              {
                feature: "GSAP Powered",
                desc: "60fps interpolation",
                color: "success.main",
              },
              {
                feature: "Bounce Landing",
                desc: "Celebration physics",
                color: "warning.main",
              },
            ].map((item) => (
              <Paper
                key={item.feature}
                sx={{
                  px: 2,
                  py: 1,
                  bgcolor: item.color,
                  color: "white",
                  borderRadius: 1,
                  minWidth: 140,
                  textAlign: "center",
                }}
              >
                <Typography variant="subtitle2">{item.feature}</Typography>
                <Typography variant="caption">{item.desc}</Typography>
              </Paper>
            ))}
          </Box>
        </Stack>
      </Paper>
    </Box>
  ),
}

// =============================================================================
// Side by Side Comparison
// =============================================================================

/**
 * Compare the V1 (instant pose switches) with V2 (smooth transitions)
 * side by side to see the improvement in animation quality.
 */
export const Comparison: StoryObj = {
  name: "V1 vs V2 Comparison",
  render: () => (
    <Box
      sx={{
        p: 3,
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          color: "text.primary",
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        Animation Comparison
      </Typography>
      <Stack spacing={4}>
        <Paper sx={{ p: 3, bgcolor: "background.paper" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography variant="h6" color="text.primary">
              V1 - Instant Pose Switches
            </Typography>
            <Chip label="Legacy" size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Poses change instantly without interpolation
          </Typography>
          <CharacterPositionProvider>
            <Box
              sx={{ transform: "scale(0.8)", transformOrigin: "top center" }}
            >
              <WalkingCharacter />
            </Box>
          </CharacterPositionProvider>
        </Paper>

        <Paper
          sx={{
            p: 3,
            bgcolor: "background.paper",
            border: 2,
            borderColor: "success.main",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Typography variant="h6" color="text.primary">
              V2 - Smooth Transitions
            </Typography>
            <Chip label="NEW" color="success" size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            All body parts interpolate smoothly between poses
          </Typography>
          <Box sx={{ transform: "scale(0.8)", transformOrigin: "top center" }}>
            <PushingProgressCharacter />
          </Box>
        </Paper>
      </Stack>
    </Box>
  ),
}

// =============================================================================
// Interactive Animation Explorer
// =============================================================================

/**
 * Interactive explorer with controls for arm animation mode.
 * Switch between hands oscillation, effort lean, or no animation.
 */
const AnimationExplorerDemo = () => {
  const [armMode, setArmMode] = useState<ArmAnimationMode>("effort")
  const [key, setKey] = useState(0)

  const handleArmModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArmMode(event.target.value as ArmAnimationMode)
    setKey((k) => k + 1)
  }

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "background.default",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 1000,
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "text.primary", textAlign: "center", fontWeight: 600 }}
          >
            Animation Explorer
          </Typography>
          <Chip label="V2" color="success" size="small" />
        </Box>

        <Typography
          variant="body1"
          sx={{ mb: 4, color: "text.secondary", textAlign: "center" }}
        >
          Experiment with different arm animation modes to see how they affect
          the character during push.
        </Typography>

        {/* Controls */}
        <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
            Animation Settings
          </Typography>

          <Stack spacing={3}>
            {/* Arm Animation Mode */}
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ fontWeight: 500 }}>
                Arm Animation Mode (during push)
              </FormLabel>
              <RadioGroup row value={armMode} onChange={handleArmModeChange}>
                <FormControlLabel
                  value="hands"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        Hands
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Hands oscillate up/down on the bar
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="effort"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        Effort (Forward Lean)
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Body leans forward rhythmically, arms angle up-right
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="none"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        None
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        No arm animation during push
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </Paper>

        {/* Current Settings Display */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mb: 3,
            justifyContent: "center",
          }}
        >
          <Chip
            label={`Arms: ${armMode}`}
            color={armMode === "none" ? "default" : "primary"}
            variant="outlined"
          />
          {armMode === "effort" && (
            <Chip
              label="Forward Lean Active"
              color="success"
              variant="outlined"
            />
          )}
        </Box>

        {/* Animation Preview */}
        <PushingProgressCharacter key={key} armAnimationMode={armMode} />
      </Paper>
    </Box>
  )
}

export const AnimationExplorer: StoryObj = {
  name: "Animation Explorer",
  render: () => <AnimationExplorerDemo />,
}

// =============================================================================
// Configurable Progress Range Demo
// =============================================================================

/**
 * Demonstrates the ability to animate from any progress value to any other.
 * - When toProgress reaches 100%: Full celebration with walk and jump
 * - When toProgress is less than 100%: Character stops and stands by the bar waiting
 *
 * Useful for showing partial progress updates or resuming from a saved state.
 */
const ConfigurableProgressDemo = () => {
  const [fromProgress, setFromProgress] = useState(25)
  const [toProgress, setToProgress] = useState(75)
  const [key, setKey] = useState(0)

  const handleRestart = () => {
    setKey((k) => k + 1)
  }

  const willCelebrate = toProgress >= 100

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "background.default",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 1000,
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "text.primary", textAlign: "center", fontWeight: 600 }}
          >
            Configurable Progress Range
          </Typography>
          <Chip label="NEW" color="success" size="small" />
        </Box>

        <Typography
          variant="body1"
          sx={{ mb: 2, color: "text.secondary", textAlign: "center" }}
        >
          The animation can now start from any progress value and animate to any
          target. Useful for partial progress updates or resuming from saved
          state.
        </Typography>

        <Typography
          variant="body2"
          sx={{ mb: 4, color: willCelebrate ? "success.main" : "warning.main", textAlign: "center", fontWeight: 500 }}
        >
          {willCelebrate
            ? "🎉 Progress reaches 100% - Character will walk and celebrate!"
            : "⏳ Progress below 100% - Character will stop and wait by the bar"}
        </Typography>

        {/* Controls */}
        <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                From Progress: {fromProgress}%
              </Typography>
              <input
                type="range"
                min={0}
                max={100}
                value={fromProgress}
                onChange={(e) => setFromProgress(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                To Progress: {toProgress}%
              </Typography>
              <input
                type="range"
                min={0}
                max={100}
                value={toProgress}
                onChange={(e) => setToProgress(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Chip
                label={`${fromProgress}% → ${toProgress}%`}
                color="primary"
              />
              <Chip
                label={`Range: ${Math.abs(toProgress - fromProgress)}%`}
                variant="outlined"
              />
              <Chip
                label={willCelebrate ? "Will Celebrate 🎉" : "Will Wait ⏳"}
                color={willCelebrate ? "success" : "warning"}
                variant="filled"
              />
              <button
                onClick={handleRestart}
                style={{ padding: "8px 16px", cursor: "pointer" }}
              >
                Restart Animation
              </button>
            </Box>
          </Stack>
        </Paper>

        {/* Animation Preview */}
        <PushingProgressCharacter
          key={key}
          fromProgress={fromProgress}
          toProgress={toProgress}
        />
      </Paper>
    </Box>
  )
}

export const ConfigurableProgress: StoryObj = {
  name: "Configurable Progress Range",
  render: () => <ConfigurableProgressDemo />,
}

// =============================================================================
// Energetic Celebration Demo
// =============================================================================

/**
 * Showcases the new energetic celebration animation with:
 * - Anticipation crouch before jump
 * - Dynamic arm raising to apex pose
 * - Leg tuck at jump peak
 * - Squash/stretch on landing
 * - Configurable jump height and duration
 */
const EnergeticCelebrationDemo = () => {
  const [jumpHeight, setJumpHeight] = useState(71)
  const [duration, setDuration] = useState(1.0)
  const [includeAnticipation, setIncludeAnticipation] = useState(true)
  const [key, setKey] = useState(0)

  const handleRestart = () => {
    setKey((k) => k + 1)
  }

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "background.default",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 1000,
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "text.primary", textAlign: "center", fontWeight: 600 }}
          >
            🎉 Energetic Celebration
          </Typography>
          <Chip label="ENHANCED" color="warning" size="small" />
        </Box>

        <Typography
          variant="body1"
          sx={{ mb: 4, color: "text.secondary", textAlign: "center" }}
        >
          The celebration animation now features anticipation, dynamic poses,
          squash/stretch, and smooth transitions. Configure the celebration to
          match your needs.
        </Typography>

        {/* Feature highlights */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            mb: 4,
            justifyContent: "center",
          }}
        >
          {[
            { label: "Anticipation Crouch", color: "info.main" },
            { label: "Arms Raised at Apex", color: "success.main" },
            { label: "Legs Tucked in Air", color: "warning.main" },
            { label: "Squash/Stretch Landing", color: "secondary.main" },
          ].map((item) => (
            <Paper
              key={item.label}
              sx={{
                px: 2,
                py: 0.5,
                bgcolor: item.color,
                color: "white",
                borderRadius: 1,
              }}
            >
              <Typography variant="caption">{item.label}</Typography>
            </Paper>
          ))}
        </Box>

        {/* Controls */}
        <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
            Celebration Settings
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Jump Height: {jumpHeight}px
              </Typography>
              <input
                type="range"
                min={30}
                max={120}
                value={jumpHeight}
                onChange={(e) => setJumpHeight(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Duration: {duration.toFixed(1)}s
              </Typography>
              <input
                type="range"
                min={0.5}
                max={2.0}
                step={0.1}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </Box>

            <FormControlLabel
              control={
                <input
                  type="checkbox"
                  checked={includeAnticipation}
                  onChange={(e) => setIncludeAnticipation(e.target.checked)}
                />
              }
              label="Include anticipation crouch"
            />

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={handleRestart}
                style={{
                  padding: "8px 24px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                🔄 Restart Animation
              </button>
            </Box>
          </Stack>
        </Paper>

        {/* Animation Preview */}
        <PushingProgressCharacter
          key={key}
          celebrationConfig={{
            jumpHeight,
            duration,
            includeAnticipation,
          }}
        />
      </Paper>
    </Box>
  )
}

export const EnergeticCelebration: StoryObj = {
  name: "Energetic Celebration",
  render: () => <EnergeticCelebrationDemo />,
}

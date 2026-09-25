/**
 * Character Galleries
 *
 * Comprehensive galleries showing all character poses and transitions.
 * - Static gallery: All poses side by side
 * - Animated transitions: See pose-to-pose animations
 * - Interactive playground: Select and transition between poses
 */
import type { Meta, StoryObj } from "@storybook/react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  Chip,
} from "@mui/material"
import { useState, useEffect, useRef } from "react"
import {
  calculatePositions,
  getCharacterPathData,
  DEFAULT_DIMENSIONS,
} from "../geometry"
import { useCharacterAnimation } from "../animation/useCharacterAnimation"
import { AnimatedCharacter } from "../animation/AnimatedCharacter"
import { POSES } from "../animation/poseRegistry"
import type { PoseId } from "../animation/poses"

const meta: Meta = {
  title: "Character/2D/Galleries",
  decorators: [
    (Story) => (
      <>
        <Box
          sx={{
            background: "#ffffff",
            padding: "2rem",
            minHeight: "100vh",
            color: "#333",
          }}
        >
          <Story />
        </Box>
      </>
    ),
  ],
}

export default meta

// =============================================================================
// HELPER: Static Pose Renderer
// =============================================================================

interface StaticPoseProps {
  pose:
    | ReturnType<typeof calculatePositions>["facingForward"]
    | ReturnType<typeof calculatePositions>["celebration1"]
    | ReturnType<typeof calculatePositions>["celebration"]
  label: string
  hasSeparateArms?: boolean
  /** Use compact viewBox (no padding) vs animation-ready (100px padding) */
  compact?: boolean
}

function StaticPoseRenderer({
  pose,
  label,
  hasSeparateArms = true,
  compact = false,
}: StaticPoseProps) {
  const {
    containerWidth,
    containerHeight,
    headLength,
    bodyStrokeWidth,
    armStrokeWidth,
    legStrokeWidth,
    characterWidth,
    characterHeight,
  }: typeof DEFAULT_DIMENSIONS = DEFAULT_DIMENSIONS

  // Compact mode: use tight viewBox, Animation mode: use full padding
  const viewBoxWidth = compact ? characterWidth : containerWidth
  const viewBoxHeight = compact ? characterHeight : containerHeight
  const viewBoxX = compact ? 100 : 0 // Offset to center character in compact view
  const viewBoxY = compact ? 0 : 0

  // Type guard for poses with separate arms vs single arms path
  const hasLeftArm = "leftArm" in pose
  const hasArms = "arms" in pose

  return (
    <Paper sx={{ p: 2, bgcolor: "#f5f5f5", textAlign: "center" }}>
      <Box
        sx={{
          height: 200,
          mb: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          style={{ height: "100%", width: "auto" }}
          viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
          fill="none"
        >
          {/* Head */}
          <circle
            cx={pose.head.x}
            cy={pose.head.y}
            r={headLength / 2}
            fill="#6366f1"
          />
          {/* Body */}
          <path
            d={getCharacterPathData(pose.body)}
            stroke="#4338ca"
            strokeWidth={bodyStrokeWidth}
            strokeLinecap="round"
          />
          {/* Arms */}
          {hasLeftArm && (
            <>
              <path
                d={getCharacterPathData((pose as any).leftArm)}
                stroke="#818cf8"
                strokeWidth={armStrokeWidth}
                strokeLinecap="round"
                opacity={0.5}
              />
              <path
                d={getCharacterPathData((pose as any).rightArm)}
                stroke="#818cf8"
                strokeWidth={armStrokeWidth}
                strokeLinecap="round"
                opacity={0.5}
              />
            </>
          )}
          {hasArms && (
            <path
              d={getCharacterPathData((pose as any).arms)}
              stroke="#818cf8"
              strokeWidth={armStrokeWidth}
              strokeLinecap="round"
              opacity={0.5}
            />
          )}
          {/* Legs */}
          {"leftLeg" in pose && (
            <>
              <path
                d={getCharacterPathData((pose as any).leftLeg)}
                stroke="#818cf8"
                strokeWidth={legStrokeWidth}
                strokeLinecap="round"
                opacity={0.5}
              />
              <path
                d={getCharacterPathData((pose as any).rightLeg)}
                stroke="#818cf8"
                strokeWidth={legStrokeWidth}
                strokeLinecap="round"
                opacity={0.5}
              />
            </>
          )}
          {"legs" in pose && (
            <path
              d={getCharacterPathData((pose as any).legs)}
              stroke="#818cf8"
              strokeWidth={legStrokeWidth}
              strokeLinecap="round"
              opacity={0.5}
            />
          )}
        </svg>
      </Box>
      <Typography variant="caption" sx={{
        color: "text.secondary"
      }}>
        {label}
      </Typography>
    </Paper>
  );
}

// =============================================================================
// STATIC POSES GALLERY
// =============================================================================

/**
 * ## All Static Poses
 *
 * Gallery showing every pose defined in calculatePositions.
 * Uses the unified coordinate system for consistent proportions.
 */
export const AllPosesGallery: StoryObj = {
  render: () => {
    const positions = calculatePositions()
    const { containerWidth, containerHeight, characterWidth, characterHeight } =
      DEFAULT_DIMENSIONS

    const poses = [
      { pose: positions.facingForward, label: "Facing Forward" },
      { pose: positions.celebration1, label: "Celebration 1" },
      { pose: positions.celebration, label: "Celebration" },
      { pose: positions.leftStanding, label: "Left Standing" },
      { pose: positions.rightStanding, label: "Right Standing" },
    ]

    return (
      <>
        <Typography variant="h4" gutterBottom>
          Static Poses Gallery
        </Typography>
        {/* Row 1: Animation-Ready (100px padding) */}
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Animation-Ready ViewBox ({containerWidth} × {containerHeight})
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 2
          }}>
          Includes 100px padding for animation space - used by PushingProgress
        </Typography>
        <Grid container spacing={2}>
          {poses.map(({ pose, label }) => (
            <Grid size={{ zero: 6, tablet: 4, laptop: 2.4 }} key={label}>
              <StaticPoseRenderer
                pose={pose as any}
                label={label}
                compact={false}
              />
            </Grid>
          ))}
        </Grid>
        {/* Row 2: Compact (no padding) */}
        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          Compact ViewBox ({characterWidth.toFixed(1)} ×{" "}
          {characterHeight.toFixed(1)})
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 2
          }}>
          Tight fit around character - better for static display, icons,
          thumbnails
        </Typography>
        <Grid container spacing={2}>
          {poses.map(({ pose, label }) => (
            <Grid size={{ zero: 6, tablet: 4, laptop: 2.4 }} key={`${label}-compact`}>
              <StaticPoseRenderer
                pose={pose as any}
                label={`${label} (compact)`}
                compact={true}
              />
            </Grid>
          ))}
        </Grid>
      </>
    );
  },
}

// =============================================================================
// ANIMATED POSE TRANSITIONS
// =============================================================================

/**
 * ## Animated Pose Transitions
 *
 * Interactive demo showing smooth GSAP-powered transitions between poses.
 * Click a pose button to animate the character to that pose.
 */
export const AnimatedTransitions: StoryObj = {
  render: () => {
    const { state, transitionToPose } = useCharacterAnimation()
    const { containerWidth, containerHeight } = DEFAULT_DIMENSIONS

    const availablePoses: PoseId[] = [
      "facingForward",
      "pushingRight",
      "pushingRightEffort",
      "walkingRight",
      "celebration",
      "celebrationAnticipation",
      "celebrationApex",
    ]

    return (
      <>
        <Typography variant="h4" gutterBottom>
          Animated Pose Transitions
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 3
          }}>
          Click a pose to animate the character. Uses GSAP for smooth
          interpolation. ViewBox: {containerWidth} × {containerHeight}{" "}
          (consistent with animation system)
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ zero: 12, laptop: 6 }}>
            <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
              <Box
                sx={{
                  height: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // Maintain consistent aspect ratio
                  aspectRatio: `${containerWidth} / ${containerHeight}`,
                  maxWidth: "100%",
                  margin: "0 auto",
                }}
              >
                <AnimatedCharacter animationState={state} limbOpacity={0.5} />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  textAlign: "center",
                  mt: 1,
                  display: "block"
                }}>
                Current: {state.currentPose}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ zero: 12, laptop: 6 }}>
            <Typography variant="subtitle2" gutterBottom>
              Select Pose:
            </Typography>
            <Stack
              direction="row"
              sx={{
                flexWrap: "wrap",
                gap: 1
              }}>
              {availablePoses.map((poseId) => (
                <Button
                  key={poseId}
                  variant={
                    state.currentPose === poseId ? "contained" : "outlined"
                  }
                  size="small"
                  onClick={() => transitionToPose(poseId, { duration: 0.5 })}
                >
                  {poseId.replace(/([A-Z])/g, " $1").trim()}
                </Button>
              ))}
            </Stack>

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Quick Actions:
              </Typography>
              <Stack direction="row" sx={{
                gap: 1
              }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() =>
                    transitionToPose("facingForward", { duration: 0.3 })
                  }
                >
                  Return to Forward
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  },
}

// =============================================================================
// POSE TRANSITION SEQUENCE
// =============================================================================

/**
 * ## Pose Transition Sequence
 *
 * Shows the full PushingProgress animation sequence as a series of static frames.
 * Useful for understanding the complete animation flow.
 */
export const TransitionSequence: StoryObj = {
  render: () => {
    const sequence: { pose: PoseId; label: string; description: string }[] = [
      {
        pose: "facingForward",
        label: "1. Start",
        description: "Character stands facing forward",
      },
      {
        pose: "pushingRight",
        label: "2. Push Start",
        description: "Leans forward to push",
      },
      {
        pose: "pushingRightEffort",
        label: "3. Push Effort",
        description: "Increased lean with effort",
      },
      {
        pose: "walkingRight",
        label: "4. Walking",
        description: "Walk past the bar",
      },
      {
        pose: "celebrationAnticipation",
        label: "5. Anticipation",
        description: "Crouch before jump",
      },
      {
        pose: "celebrationApex",
        label: "6. Apex",
        description: "Peak of celebration jump",
      },
      {
        pose: "celebration",
        label: "7. Landing",
        description: "Victory pose landing",
      },
    ]

    const {
      containerWidth,
      containerHeight,
      headLength,
      bodyStrokeWidth,
      armStrokeWidth,
      legStrokeWidth,
    } = DEFAULT_DIMENSIONS

    return (
      <>
        <Typography variant="h4" gutterBottom>
          Pose Transition Sequence
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 3
          }}>
          The complete PushingProgress animation broken into static frames
        </Typography>
        <Box sx={{ overflowX: "auto", pb: 2 }}>
          <Stack direction="row" spacing={2} sx={{ minWidth: "max-content" }}>
            {sequence.map(({ pose: poseId, label, description }) => {
              const pose = POSES[poseId]
              return (
                <Paper
                  key={poseId}
                  sx={{ p: 2, bgcolor: "#f5f5f5", width: 160, flexShrink: 0 }}
                >
                  <Box
                    sx={{
                      height: 150,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      style={{ height: "100%", width: "auto" }}
                      viewBox={`0 0 ${containerWidth} ${containerHeight}`}
                      fill="none"
                    >
                      <circle
                        cx={pose.head.x}
                        cy={pose.head.y}
                        r={headLength / 2}
                        fill="#6366f1"
                      />
                      <path
                        d={pose.body
                          .map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`)
                          .join(" ")}
                        stroke="#4338ca"
                        strokeWidth={bodyStrokeWidth}
                        strokeLinecap="round"
                      />
                      <path
                        d={pose.leftArm
                          .map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`)
                          .join(" ")}
                        stroke="#818cf8"
                        strokeWidth={armStrokeWidth}
                        strokeLinecap="round"
                        opacity={0.5}
                      />
                      <path
                        d={pose.rightArm
                          .map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`)
                          .join(" ")}
                        stroke="#818cf8"
                        strokeWidth={armStrokeWidth}
                        strokeLinecap="round"
                        opacity={0.5}
                      />
                      <path
                        d={pose.leftLeg
                          .map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`)
                          .join(" ")}
                        stroke="#818cf8"
                        strokeWidth={legStrokeWidth}
                        strokeLinecap="round"
                        opacity={0.5}
                      />
                      <path
                        d={pose.rightLeg
                          .map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`)
                          .join(" ")}
                        stroke="#818cf8"
                        strokeWidth={legStrokeWidth}
                        strokeLinecap="round"
                        opacity={0.5}
                      />
                    </svg>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: "bold", display: "block" }}
                  >
                    {label}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontSize: 10,
                      display: "block"
                    }}>
                    {description}
                  </Typography>
                </Paper>
              );
            })}
          </Stack>
        </Box>
        {/* Arrow indicators */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          {sequence.slice(0, -1).map((_, i) => (
            <Typography
              key={i}
              sx={{
                color: "text.secondary",
                fontSize: 12
              }}>
              {i + 1} → {i + 2}
            </Typography>
          ))}
        </Box>
      </>
    );
  },
}

// =============================================================================
// AUTOPLAY ANIMATION LOOP
// =============================================================================

/**
 * ## Autoplay Animation Loop
 *
 * Automatically cycles through poses to demonstrate the animation system.
 */
export const AutoplayLoop: StoryObj = {
  render: () => {
    const { state, transitionToPose } = useCharacterAnimation()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    const sequence: PoseId[] = [
      "facingForward",
      "pushingRight",
      "pushingRightEffort",
      "walkingRight",
      "celebration",
      "celebrationApex",
    ]

    useEffect(() => {
      if (isPlaying) {
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => {
            const next = (prev + 1) % sequence.length
            transitionToPose(sequence[next], { duration: 0.6 })
            return next
          })
        }, 1500)
      } else if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, [isPlaying, transitionToPose])

    return (
      <>
        <Typography variant="h4" gutterBottom>
          Autoplay Animation Loop
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 3
          }}>
          Watch the character cycle through poses automatically
        </Typography>
        <Grid container spacing={3} sx={{
          alignItems: "center"
        }}>
          <Grid size={{ zero: 12, laptop: 6 }}>
            <Paper sx={{ p: 3, bgcolor: "#f5f5f5" }}>
              <Box
                sx={{
                  height: 350,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AnimatedCharacter animationState={state} limbOpacity={0.5} />
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ zero: 12, laptop: 6 }}>
            <Stack spacing={2}>
              <Button
                variant="contained"
                color={isPlaying ? "error" : "primary"}
                onClick={() => setIsPlaying(!isPlaying)}
                size="large"
              >
                {isPlaying ? "Stop" : "Play Animation Loop"}
              </Button>

              <Typography variant="body2" sx={{
                color: "text.secondary"
              }}>
                Current pose: <strong>{sequence[currentIndex]}</strong>
              </Typography>

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Sequence:
                </Typography>
                <Stack
                  direction="row"
                  sx={{
                    flexWrap: "wrap",
                    gap: 0.5
                  }}>
                  {sequence.map((pose, i) => (
                    <Chip
                      key={pose}
                      label={`${i + 1}. ${pose.replace(/([A-Z])/g, " $1").trim()}`}
                      size="small"
                      color={i === currentIndex ? "primary" : "default"}
                      variant={i === currentIndex ? "filled" : "outlined"}
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </>
    );
  },
}

// =============================================================================
// COORDINATE DATA VIEWER
// =============================================================================

/**
 * ## Coordinate Data Viewer
 *
 * Debug view showing the raw coordinate data for each pose.
 */
export const CoordinateDataViewer: StoryObj = {
  render: () => {
    const positions = calculatePositions()
    const [selectedPose, setSelectedPose] = useState<string>("facingForward")

    const poseOptions = Object.keys(positions).filter(
      (key) =>
        ![
          "containerPaddingX",
          "containerPaddingY",
          "containerWidth",
          "containerHeight",
          "headLength",
          "bodyStrokeWidth",
          "armStrokeWidth",
          "legStrokeWidth",
        ].includes(key),
    )

    const selectedData = (positions as any)[selectedPose]

    return (
      <>
        <Typography variant="h4" gutterBottom>
          Coordinate Data Viewer
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 3
          }}>
          Inspect the raw coordinate data from calculatePositions
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          {poseOptions.map((pose) => (
            <Button
              key={pose}
              variant={selectedPose === pose ? "contained" : "outlined"}
              size="small"
              onClick={() => setSelectedPose(pose)}
            >
              {pose}
            </Button>
          ))}
        </Stack>
        <Paper sx={{ p: 2, bgcolor: "#f5f5f5" }}>
          <Typography variant="subtitle2" gutterBottom>
            {selectedPose} coordinates:
          </Typography>
          <Box
            component="pre"
            sx={{
              fontSize: 11,
              overflow: "auto",
              maxHeight: 400,
              bgcolor: "#fff",
              p: 2,
              borderRadius: 1,
            }}
          >
            {JSON.stringify(selectedData, null, 2)}
          </Box>
        </Paper>
      </>
    );
  },
}

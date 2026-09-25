/**
 * Character Anatomy & Math Documentation
 *
 * This story documents the mathematical foundation of the character system,
 * including proportions, attachment points, and how all dimensions derive
 * from the base headSize unit.
 */
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, Grid, Slider, Stack } from "@mui/material"
import { useState } from "react"
import { CharacterForwardStanding } from "../poses/CharacterForwardStanding"
import { CharacterCelebration1 } from "../poses/CharacterCelebration1"
import { CharacterCelebration2 } from "../poses/CharacterCelebration2"
import { ContactUsCharacterUnified } from "../poses/ContactUsCharacterUnified"
import {
  CHARACTER_BASE,
  calculateDimensions,
  DEFAULT_DIMENSIONS,
} from "../config"
import { BrandProvider } from "../../context/BrandContext"

const meta: Meta = {
  title: "BrandCore/Character/4eye/Anatomy",
  decorators: [
    (Story) => (
      <BrandProvider>
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
      </BrandProvider>
    ),
  ],
}

export default meta

// =============================================================================
// PROPORTIONS DOCUMENTATION
// =============================================================================

/**
 * ## Character Proportions System
 *
 * All character dimensions derive from a single base unit: **headSize = 33**.
 * This creates a consistent, scalable system where changing the head size
 * proportionally scales the entire character.
 *
 * ### Proportional Ratios
 *
 * | Part        | Formula           | Value | Ratio  |
 * |-------------|-------------------|-------|--------|
 * | Head        | headSize          | 33    | 1×     |
 * | Arms        | headSize × 2      | 66    | 2×     |
 * | Body        | headSize × 3      | 99    | 3×     |
 * | Legs        | headSize × 3      | 99    | 3×     |
 * | Neck Gap    | headSize × 0.15   | ~5    | 0.15×  |
 *
 * ### Why These Ratios?
 *
 * - **1:2:3 proportions** create visual harmony (body = 3×, arms = 2×, head = 1×)
 * - **Legs matching body** provides balanced lower half
 * - **Neck gap** provides breathing room between head and shoulders
 */
export const ProportionsExplained: StoryObj = {
  render: () => {
    const dims = DEFAULT_DIMENSIONS
    const { headLength, armLength, bodyLength, legLength, neckGap } = dims

    const proportions = [
      { name: "Head", value: headLength, ratio: "1×", color: "#FFD700" },
      { name: "Neck Gap", value: neckGap, ratio: "0.15×", color: "#666" },
      { name: "Arms", value: armLength, ratio: "2×", color: "#4ECDC4" },
      { name: "Body", value: bodyLength, ratio: "3×", color: "#FF6B6B" },
      { name: "Legs", value: legLength, ratio: "3×", color: "#45B7D1" },
    ]

    return (
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: "#f5f5f5" }}>
            <Typography variant="h5" gutterBottom>
              Proportional Measurements
            </Typography>
            <Box sx={{ mt: 2 }}>
              {proportions.map((p) => (
                <Box
                  key={p.name}
                  sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      bgcolor: p.color,
                      borderRadius: 1,
                      mr: 2,
                    }}
                  />
                  <Typography sx={{ width: 100 }}>{p.name}</Typography>
                  <Box
                    sx={{
                      height: 8,
                      width: `${(p.value / bodyLength) * 200}px`,
                      bgcolor: p.color,
                      borderRadius: 1,
                      mr: 2,
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {p.value.toFixed(1)}px ({p.ratio})
                  </Typography>
                </Box>
              ))}
            </Box>

            <Typography variant="body2" sx={{ mt: 3, color: "text.secondary" }}>
              Base unit: <code>headSize = {CHARACTER_BASE.headSize}</code>
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              bgcolor: "#f5f5f5",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ height: 300 }}>
              <CharacterForwardStanding enableTestingBorders />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    )
  },
}

// =============================================================================
// STROKE WIDTH HIERARCHY
// =============================================================================

/**
 * ## Stroke Width Hierarchy
 *
 * Stroke widths create visual weight hierarchy:
 *
 * ```
 * Body:  headSize × 0.787 ≈ 26   (widest - main trunk, dominant)
 * Legs:  bodyStroke / 2   ≈ 13   (medium - supporting, grounded)
 * Arms:  bodyStroke / 3   ≈ 8.67 (thinnest - delicate, expressive)
 * ```
 *
 * This hierarchy guides the eye to the body (character's core) while
 * keeping limbs lighter for animation readability.
 */
export const StrokeWidthHierarchy: StoryObj = {
  render: () => {
    const dims = DEFAULT_DIMENSIONS
    const { bodyStrokeWidth, armStrokeWidth, legStrokeWidth, headLength } = dims

    const strokes = [
      {
        name: "Body",
        value: bodyStrokeWidth,
        formula: "headSize × 0.787",
        color: "#FF6B6B",
      },
      {
        name: "Legs",
        value: legStrokeWidth,
        formula: "bodyStroke / 2",
        color: "#45B7D1",
      },
      {
        name: "Arms",
        value: armStrokeWidth,
        formula: "bodyStroke / 3",
        color: "#4ECDC4",
      },
    ]

    return (
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, bgcolor: "#f5f5f5" }}>
            <Typography variant="h5" gutterBottom>
              Stroke Width Comparison
            </Typography>

            <Box sx={{ mt: 3 }}>
              {strokes.map((s) => (
                <Box key={s.name} sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {s.name}: {s.value.toFixed(2)}px
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ ml: 1, color: "text.secondary" }}
                    >
                      ({s.formula})
                    </Typography>
                  </Typography>
                  <Box
                    sx={{
                      height: s.value,
                      width: "100%",
                      bgcolor: s.color,
                      borderRadius: s.value / 2,
                    }}
                  />
                </Box>
              ))}
            </Box>

            <Typography
              variant="body2"
              sx={{ mt: 2, color: "text.secondary", fontStyle: "italic" }}
            >
              The 0.787 ratio comes from aesthetic tuning - it creates a body
              width that feels proportional to the head without being too bulky
              or too thin.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    )
  },
}

// =============================================================================
// ATTACHMENT POINTS
// =============================================================================

/**
 * ## Attachment Points
 *
 * Arms and legs attach to the body at specific calculated positions:
 *
 * ### Shoulder Attachment
 * ```typescript
 * shoulderX = centerX ± (bodyStrokeWidth/2 + armXOverlap)
 * shoulderY = bodyStart.y - bodyStrokeWidth/2 + armStrokeWidth
 * ```
 *
 * The `armXOverlap` (armStroke / 6 ≈ 1.44px) creates slight visual
 * connection between arm and body strokes.
 *
 * ### Hip Attachment
 * ```typescript
 * hipX = centerX ± (legStrokeWidth/2 - legGapCorrection)
 * hipY = bodyStart.y + bodyLength
 * ```
 *
 * The `legGapCorrection` (0.1px) prevents visible seams at the
 * body-leg junction.
 */
export const AttachmentPoints: StoryObj = {
  render: () => {
    const dims = DEFAULT_DIMENSIONS

    const calculations = [
      {
        name: "Shoulder X Offset",
        formula: "bodyStrokeWidth/2 + armXOverlap",
        value: dims.bodyStrokeWidth / 2 + dims.armXOverlap,
      },
      {
        name: "Shoulder Y Offset",
        formula: "bodyStrokeWidth/2 - armStrokeWidth",
        value: dims.bodyStrokeWidth / 2 - dims.armStrokeWidth,
      },
      {
        name: "Hip X Offset",
        formula: "legStrokeWidth/2 - gapCorrection",
        value: dims.legStrokeWidth / 2 - dims.legGapCorrection,
      },
      {
        name: "Arm X Overlap",
        formula: "armStroke / 6",
        value: dims.armXOverlap,
      },
      {
        name: "Leg Gap Correction",
        formula: "constant",
        value: dims.legGapCorrection,
      },
    ]

    return (
      <Paper sx={{ p: 3, bgcolor: "#f5f5f5" }}>
        <Typography variant="h5" gutterBottom>
          Attachment Point Calculations
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {calculations.map((calc) => (
            <Grid item xs={6} md={4} key={calc.name}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: "#fafafa",
                  textAlign: "center",
                }}
              >
                <Typography variant="subtitle2" color="primary">
                  {calc.name}
                </Typography>
                <Typography variant="h6">{calc.value.toFixed(2)}px</Typography>
                <Typography variant="caption" color="text.secondary">
                  {calc.formula}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3, p: 2, bgcolor: "rgba(0,0,0,0.2)", borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Why These Calculations Matter
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • <strong>Shoulder overlap</strong> ensures arms visually connect to
            body, not float beside it
            <br />• <strong>Hip gap correction</strong> eliminates hairline
            seams that appear at stroke joins
            <br />• <strong>All values derive from proportions</strong>, so
            scaling headSize scales everything correctly
          </Typography>
        </Box>
      </Paper>
    )
  },
}

// =============================================================================
// INTERACTIVE PLAYGROUND
// =============================================================================

/**
 * ## Interactive Dimension Explorer
 *
 * Adjust the head size and see how all other dimensions scale proportionally.
 */
export const InteractivePlayground: StoryObj = {
  render: function Render() {
    const [headSize, setHeadSize] = useState(33)
    const [neckGapRatio, setNeckGapRatio] = useState(0.15)

    const dims = calculateDimensions({ headSize, neckGapRatio })

    return (
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, bgcolor: "#f5f5f5" }}>
            <Typography variant="h6" gutterBottom>
              Adjust Parameters
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Typography gutterBottom>Head Size: {headSize}px</Typography>
              <Slider
                value={headSize}
                onChange={(_, v) => setHeadSize(v as number)}
                min={16}
                max={66}
                step={1}
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography gutterBottom>
                Neck Gap Ratio: {neckGapRatio.toFixed(2)}
              </Typography>
              <Slider
                value={neckGapRatio}
                onChange={(_, v) => setNeckGapRatio(v as number)}
                min={0.05}
                max={0.3}
                step={0.01}
              />
            </Box>

            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: "rgba(0,0,0,0.2)",
                borderRadius: 1,
                fontFamily: "monospace",
                fontSize: 12,
              }}
            >
              <div>headLength: {dims.headLength.toFixed(1)}</div>
              <div>armLength: {dims.armLength.toFixed(1)}</div>
              <div>bodyLength: {dims.bodyLength.toFixed(1)}</div>
              <div>legLength: {dims.legLength.toFixed(1)}</div>
              <div>neckGap: {dims.neckGap.toFixed(1)}</div>
              <div>---</div>
              <div>bodyStroke: {dims.bodyStrokeWidth.toFixed(2)}</div>
              <div>armStroke: {dims.armStrokeWidth.toFixed(2)}</div>
              <div>legStroke: {dims.legStrokeWidth.toFixed(2)}</div>
              <div>---</div>
              <div>charWidth: {dims.characterWidth.toFixed(1)}</div>
              <div>charHeight: {dims.characterHeight.toFixed(1)}</div>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              bgcolor: "#f5f5f5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 400,
            }}
          >
            <Box sx={{ height: 350, display: "flex", gap: 4 }}>
              {/* Standard size for comparison */}
              <Box sx={{ opacity: 0.3, height: "100%" }}>
                <CharacterForwardStanding />
              </Box>
              {/* Interactive size */}
              <Box sx={{ height: "100%" }}>
                <svg
                  viewBox={`0 0 ${dims.containerWidth} ${dims.containerHeight}`}
                  style={{ height: "100%", width: "auto" }}
                >
                  {/* Correct positions using same formulas as actual character */}
                  {(() => {
                    // Head position
                    const headCenterY = dims.headLength / 2

                    // Body position (accounting for stroke width)
                    const bodyStartY =
                      dims.headLength + dims.neckGap + dims.bodyStrokeWidth / 2
                    const bodyEndY = bodyStartY + dims.bodyLength

                    // Shoulder position for arms
                    const shoulderY =
                      bodyStartY -
                      dims.bodyStrokeWidth / 2 +
                      dims.armStrokeWidth
                    const shoulderXOffset =
                      dims.bodyStrokeWidth / 2 + dims.armXOverlap

                    // Hip position for legs
                    const hipY = bodyStartY + dims.bodyLength
                    const legXOffset =
                      dims.legStrokeWidth / 2 - dims.legGapCorrection

                    return (
                      <>
                        {/* Head */}
                        <circle
                          cx={dims.centerX}
                          cy={headCenterY}
                          r={dims.headLength / 2}
                          fill="#FFD700"
                        />
                        {/* Body */}
                        <line
                          x1={dims.centerX}
                          y1={bodyStartY}
                          x2={dims.centerX}
                          y2={bodyEndY}
                          stroke="#FF6B6B"
                          strokeWidth={dims.bodyStrokeWidth}
                          strokeLinecap="round"
                        />
                        {/* Left Arm */}
                        <line
                          x1={dims.centerX - shoulderXOffset}
                          y1={shoulderY}
                          x2={dims.centerX - shoulderXOffset}
                          y2={shoulderY + dims.armLength}
                          stroke="#4ECDC4"
                          strokeWidth={dims.armStrokeWidth}
                          strokeLinecap="round"
                          opacity={0.5}
                        />
                        {/* Right Arm */}
                        <line
                          x1={dims.centerX + shoulderXOffset}
                          y1={shoulderY}
                          x2={dims.centerX + shoulderXOffset}
                          y2={shoulderY + dims.armLength}
                          stroke="#4ECDC4"
                          strokeWidth={dims.armStrokeWidth}
                          strokeLinecap="round"
                          opacity={0.5}
                        />
                        {/* Left Leg */}
                        <line
                          x1={dims.centerX - legXOffset}
                          y1={hipY}
                          x2={dims.centerX - legXOffset}
                          y2={hipY + dims.legLength}
                          stroke="#45B7D1"
                          strokeWidth={dims.legStrokeWidth}
                          strokeLinecap="round"
                          opacity={0.5}
                        />
                        {/* Right Leg */}
                        <line
                          x1={dims.centerX + legXOffset}
                          y1={hipY}
                          x2={dims.centerX + legXOffset}
                          y2={hipY + dims.legLength}
                          stroke="#45B7D1"
                          strokeWidth={dims.legStrokeWidth}
                          strokeLinecap="round"
                          opacity={0.5}
                        />
                      </>
                    )
                  })()}
                </svg>
              </Box>
            </Box>
          </Paper>
          <Typography
            variant="caption"
            sx={{ mt: 1, display: "block", color: "text.secondary" }}
          >
            Left (faded): Standard character | Right: Interactive preview
          </Typography>
        </Grid>
      </Grid>
    )
  },
}

// =============================================================================
// ALL VARIANTS COMPARISON
// =============================================================================

/**
 * ## Character Variants Comparison
 *
 * Shows all character components side by side to verify consistent proportions.
 */
export const VariantsComparison: StoryObj = {
  render: () => (
    <Grid container spacing={3}>
      {[
        { name: "Forward Standing", Component: CharacterForwardStanding },
        { name: "Celebration 1", Component: CharacterCelebration1 },
        { name: "Celebration 2", Component: CharacterCelebration2 },
        { name: "Contact Us (Unified)", Component: ContactUsCharacterUnified },
      ].map(({ name, Component }) => (
        <Grid item xs={6} md={3} key={name}>
          <Paper
            sx={{
              p: 2,
              bgcolor: "#f5f5f5",
              textAlign: "center",
            }}
          >
            <Box sx={{ height: 200, mb: 2 }}>
              <Component />
            </Box>
            <Typography variant="caption">{name}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  ),
}

// =============================================================================
// ASCII DIAGRAM
// =============================================================================

/**
 * ## Character Structure Diagram
 *
 * Visual representation of how parts connect:
 *
 * ```
 *            ┌─────────┐
 *            │  HEAD   │  ← headSize = 33
 *            │   (○)   │
 *            └────┬────┘
 *                 │      ← neckGap = headSize × 0.15
 *     ┌───────────┼───────────┐
 *     │           │           │
 *    ARM         BODY        ARM
 *   2×head      3×head      2×head
 *     │           │           │
 *     │     ┌─────┴─────┐     │
 *     │     │           │     │
 *     │    LEG         LEG    │
 *     │   3×head      3×head  │
 *     │     │           │     │
 *     ▼     ▼           ▼     ▼
 * ```
 */
export const StructureDiagram: StoryObj = {
  render: () => (
    <Paper sx={{ p: 4, bgcolor: "#f5f5f5" }}>
      <Typography variant="h5" gutterBottom>
        Character Structure
      </Typography>
      <Box
        component="pre"
        sx={{
          fontFamily: "monospace",
          fontSize: 14,
          lineHeight: 1.4,
          color: "#4ECDC4",
          overflow: "auto",
        }}
      >
        {`
              ┌─────────┐
              │  HEAD   │  ← headSize = 33 (base unit)
              │   (○)   │
              └────┬────┘
                   │      ← neckGap = 5 (headSize × 0.15)
       ┌───────────┼───────────┐
       │           │           │  ← shoulders attach here
      ARM         BODY        ARM
     66px        99px        66px
    (2×head)    (3×head)    (2×head)
       │           │           │
       │     ┌─────┴─────┐     │
       │     │           │     │  ← hips attach here
       │    LEG         LEG    │
       │   99px        99px    │
       │  (3×head)    (3×head) │
       │     │           │     │
       ▼     ▼           ▼     ▼

  STROKE WIDTHS:
  ├── Body:  26px   (headSize × 0.787)
  ├── Legs:  13px   (bodyStroke / 2)
  └── Arms:  8.7px  (bodyStroke / 3)
        `}
      </Box>
    </Paper>
  ),
}

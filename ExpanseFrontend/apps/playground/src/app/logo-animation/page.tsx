"use client"

import { useState, useEffect } from "react"
import { Box, Container, Typography, Paper, Stack, Chip } from "@mui/material"
import { useSpring, useTransform } from "framer-motion"
import { ExpanseLogoV3_3D } from "expanse.dynamicAssets/logo"

/**
 * Moon Absorption Animation Exploration
 *
 * Demonstrates 4 variations of the "black hole / suction" effect:
 * 1. Spiral Vortex - Moon spirals inward with rotation
 * 2. Spaghettification - Moon stretches toward center
 * 3. Energy Stream - Visible beam connects moon to pupil
 * 4. Gravitational Collapse - Spring physics acceleration
 *
 * All animations trigger on hover, use default logo colors on white background.
 */

// ============================================================================
// Shared Constants
// ============================================================================

interface AnimationCardProps {
  title: string
  description: string
  badge?: string
  badgeColor?: "primary" | "secondary" | "info" | "warning"
  children: React.ReactNode
}

const LOGO_SIZE = 250
const TRANSITION_DURATION = 0.6

// Default state
const DEFAULT_MOON_SIZE = 33
const DEFAULT_PUPIL_SIZE = 0.28

// Absorbed state
const ABSORBED_MOON_SIZE = 5
const ABSORBED_PUPIL_SIZE = 0.42

// ============================================================================
// Animation Card Wrapper
// ============================================================================

function AnimationCard({
  title,
  description,
  badge,
  badgeColor = "primary",
  children,
}: AnimationCardProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
        {badge && (
          <Chip
            label={badge}
            size="small"
            color={badgeColor}
            variant="outlined"
          />
        )}
      </Stack>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 2, minHeight: 40 }}
      >
        {description}
      </Typography>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
          minHeight: 280,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 1.5, textAlign: "center" }}
      >
        Hover to activate
      </Typography>
    </Paper>
  )
}

// ============================================================================
// Variation 1: Spiral Vortex
// ============================================================================

function SpiralVortex() {
  const [isHovered, setIsHovered] = useState(false)

  // Moon spirals inward with rotation
  const moonSize = isHovered ? ABSORBED_MOON_SIZE : DEFAULT_MOON_SIZE
  const pupilSize = isHovered ? ABSORBED_PUPIL_SIZE : DEFAULT_PUPIL_SIZE
  // Move moon toward center (sphere is roughly at center-top of viewbox)
  const moonOffsetX = isHovered ? 155 : 0 // Move right toward center
  const moonOffsetY = isHovered ? -195 : 0 // Move up toward center

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        cursor: "pointer",
        // CSS transforms for spiral rotation effect
        "& svg circle[name='moon']": {
          transition: `
            r ${TRANSITION_DURATION}s cubic-bezier(0.4, 0, 0.2, 1),
            cx ${TRANSITION_DURATION}s cubic-bezier(0.4, 0, 0.2, 1),
            cy ${TRANSITION_DURATION}s cubic-bezier(0.4, 0, 0.2, 1)
          `,
          transformOrigin: "204px 170px", // Center of sphere
          transform: isHovered ? "rotate(720deg)" : "rotate(0deg)",
          transitionProperty: "r, cx, cy, transform",
        },
        "& svg circle[name='pupil-iris'], & svg circle[name='pupil-core']": {
          transition: `r ${TRANSITION_DURATION}s ease-out`,
        },
      }}
    >
      <ExpanseLogoV3_3D
        id="spiral-vortex"
        height={LOGO_SIZE}
        moonSizePercent={moonSize}
        moonOffsetX={moonOffsetX}
        moonOffsetY={moonOffsetY}
        pupilSize={pupilSize}
        interactive={false}
      />
    </Box>
  )
}

// ============================================================================
// Variation 2: Spaghettification (Stretch Effect)
// ============================================================================

function Spaghettification() {
  const [isHovered, setIsHovered] = useState(false)

  const moonSize = isHovered ? ABSORBED_MOON_SIZE : DEFAULT_MOON_SIZE
  const pupilSize = isHovered ? ABSORBED_PUPIL_SIZE : DEFAULT_PUPIL_SIZE
  const moonOffsetX = isHovered ? 155 : 0
  const moonOffsetY = isHovered ? -195 : 0

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        cursor: "pointer",
        "& svg circle[name='moon']": {
          transition: `
            r ${TRANSITION_DURATION}s ease-in,
            cx ${TRANSITION_DURATION}s cubic-bezier(0.55, 0.09, 0.68, 0.53),
            cy ${TRANSITION_DURATION}s cubic-bezier(0.55, 0.09, 0.68, 0.53),
            transform ${TRANSITION_DURATION * 0.4}s ease-in-out
          `,
          transformOrigin: "center",
          // Stretch vertically (toward center) before collapsing
          transform: isHovered
            ? "scaleX(0.3) scaleY(2.5)"
            : "scaleX(1) scaleY(1)",
        },
        "& svg circle[name='pupil-iris'], & svg circle[name='pupil-core']": {
          transition: `r ${TRANSITION_DURATION}s ease-out`,
        },
      }}
    >
      <ExpanseLogoV3_3D
        id="spaghettification"
        height={LOGO_SIZE}
        moonSizePercent={moonSize}
        moonOffsetX={moonOffsetX}
        moonOffsetY={moonOffsetY}
        pupilSize={pupilSize}
        interactive={false}
      />
    </Box>
  )
}

// ============================================================================
// Variation 3: Energy Stream
// ============================================================================

function EnergyStream() {
  const [isHovered, setIsHovered] = useState(false)

  const moonSize = isHovered ? ABSORBED_MOON_SIZE : DEFAULT_MOON_SIZE
  const pupilSize = isHovered ? ABSORBED_PUPIL_SIZE : DEFAULT_PUPIL_SIZE
  const moonOffsetY = isHovered ? -100 : 0

  // SVG path from moon to pupil (approximate coordinates)
  // Moon center: ~(49.5, 365), Pupil center: ~(204, 170)
  const streamPath = "M 49.5 365 Q 127 267 204 170"

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        cursor: "pointer",
        position: "relative",
        "& svg circle[name='moon']": {
          transition: `
            r ${TRANSITION_DURATION}s ease-in-out,
            cy ${TRANSITION_DURATION}s ease-in-out
          `,
        },
        "& svg circle[name='pupil-iris'], & svg circle[name='pupil-core']": {
          transition: `r ${TRANSITION_DURATION}s ease-out`,
        },
      }}
    >
      <ExpanseLogoV3_3D
        id="energy-stream"
        height={LOGO_SIZE}
        moonSizePercent={moonSize}
        moonOffsetY={moonOffsetY}
        pupilSize={pupilSize}
        interactive={false}
      />
      {/* Energy stream overlay */}
      <svg
        viewBox="0 0 409 409"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient
            id="streamGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#666" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#333" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <path
          d={streamPath}
          fill="none"
          stroke="url(#streamGradient)"
          strokeWidth={isHovered ? 4 : 0}
          strokeLinecap="round"
          strokeDasharray="200"
          strokeDashoffset={isHovered ? 0 : 200}
          style={{
            transition: `
              stroke-dashoffset ${TRANSITION_DURATION}s ease-out,
              stroke-width 0.2s ease-out
            `,
          }}
        />
      </svg>
    </Box>
  )
}

// ============================================================================
// Variation 4: Gravitational Collapse (Framer Motion Spring)
// ============================================================================

function GravitationalCollapse() {
  const [isHovered, setIsHovered] = useState(false)

  // Spring-animated values for natural gravity feel
  const springConfig = { stiffness: 120, damping: 20, mass: 1 }

  const moonSizeSpring = useSpring(DEFAULT_MOON_SIZE, springConfig)
  const pupilSizeSpring = useSpring(DEFAULT_PUPIL_SIZE, springConfig)
  const moonOffsetXSpring = useSpring(0, { stiffness: 80, damping: 15 })
  const moonOffsetYSpring = useSpring(0, { stiffness: 80, damping: 15 })

  useEffect(() => {
    if (isHovered) {
      moonSizeSpring.set(ABSORBED_MOON_SIZE)
      pupilSizeSpring.set(ABSORBED_PUPIL_SIZE)
      moonOffsetXSpring.set(155)
      moonOffsetYSpring.set(-195)
    } else {
      moonSizeSpring.set(DEFAULT_MOON_SIZE)
      pupilSizeSpring.set(DEFAULT_PUPIL_SIZE)
      moonOffsetXSpring.set(0)
      moonOffsetYSpring.set(0)
    }
  }, [
    isHovered,
    moonSizeSpring,
    pupilSizeSpring,
    moonOffsetXSpring,
    moonOffsetYSpring,
  ])

  // Transform springs to usable values
  const moonSize = useTransform(moonSizeSpring, (v) => Math.round(v))
  const pupilSize = useTransform(pupilSizeSpring, (v) => v)
  const moonOffsetX = useTransform(moonOffsetXSpring, (v) => Math.round(v))
  const moonOffsetY = useTransform(moonOffsetYSpring, (v) => Math.round(v))

  // We need to read the spring values in a component that re-renders
  const [values, setValues] = useState({
    moonSize: DEFAULT_MOON_SIZE,
    pupilSize: DEFAULT_PUPIL_SIZE,
    moonOffsetX: 0,
    moonOffsetY: 0,
  })

  useEffect(() => {
    const unsubMoon = moonSize.on("change", (v) =>
      setValues((prev) => ({ ...prev, moonSize: v })),
    )
    const unsubPupil = pupilSize.on("change", (v) =>
      setValues((prev) => ({ ...prev, pupilSize: v })),
    )
    const unsubX = moonOffsetX.on("change", (v) =>
      setValues((prev) => ({ ...prev, moonOffsetX: v })),
    )
    const unsubY = moonOffsetY.on("change", (v) =>
      setValues((prev) => ({ ...prev, moonOffsetY: v })),
    )
    return () => {
      unsubMoon()
      unsubPupil()
      unsubX()
      unsubY()
    }
  }, [moonSize, pupilSize, moonOffsetX, moonOffsetY])

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ cursor: "pointer" }}
    >
      <ExpanseLogoV3_3D
        id="gravitational-collapse"
        height={LOGO_SIZE}
        moonSizePercent={values.moonSize}
        moonOffsetX={values.moonOffsetX}
        moonOffsetY={values.moonOffsetY}
        pupilSize={values.pupilSize}
        interactive={false}
      />
    </Box>
  )
}

// ============================================================================
// Main Page
// ============================================================================

export default function LogoAnimationPage() {
  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            Moon Absorption Animation
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 700 }}
          >
            Exploring "black hole / suction" effects where the smaller circle is
            absorbed into the main sphere. Hover over each variation to see the
            animation. The pupil grows during absorption.
          </Typography>
        </Box>

        {/* 2x2 Grid of Variations */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
          }}
        >
          {/* Variation 1: Spiral Vortex */}
          <AnimationCard
            title="Spiral Vortex"
            description="Moon rotates while spiraling inward, like water down a drain"
            badge="CSS"
            badgeColor="info"
          >
            <SpiralVortex />
          </AnimationCard>

          {/* Variation 2: Spaghettification */}
          <AnimationCard
            title="Spaghettification"
            description="Moon stretches and elongates toward center before collapsing"
            badge="CSS"
            badgeColor="info"
          >
            <Spaghettification />
          </AnimationCard>

          {/* Variation 3: Energy Stream */}
          <AnimationCard
            title="Energy Stream"
            description="Visible beam flows from moon to pupil during absorption"
            badge="SVG Path"
            badgeColor="secondary"
          >
            <EnergyStream />
          </AnimationCard>

          {/* Variation 4: Gravitational Collapse */}
          <AnimationCard
            title="Gravitational Collapse"
            description="Spring physics for natural gravity-like acceleration"
            badge="Framer Motion"
            badgeColor="warning"
          >
            <GravitationalCollapse />
          </AnimationCard>
        </Box>

        {/* Legend */}
        <Paper sx={{ mt: 4, p: 3 }}>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Technical Notes
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Chip
              label="CSS"
              size="small"
              color="info"
              variant="outlined"
              sx={{ "& .MuiChip-label": { fontSize: "0.75rem" } }}
            />
            <Typography variant="body2" sx={{ lineHeight: "24px" }}>
              CSS transitions with cubic-bezier easing
            </Typography>
            <Chip
              label="SVG Path"
              size="small"
              color="secondary"
              variant="outlined"
              sx={{ "& .MuiChip-label": { fontSize: "0.75rem" } }}
            />
            <Typography variant="body2" sx={{ lineHeight: "24px" }}>
              stroke-dashoffset animation
            </Typography>
            <Chip
              label="Framer Motion"
              size="small"
              color="warning"
              variant="outlined"
              sx={{ "& .MuiChip-label": { fontSize: "0.75rem" } }}
            />
            <Typography variant="body2" sx={{ lineHeight: "24px" }}>
              useSpring for physics-based motion
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

/**
 * TaskCard Subcomponents
 *
 * Reusable internal components for TaskCard:
 * - DescriptionBars (placeholder text)
 * - HeartMeter (difficulty indicator)
 * - PointsDisplay
 * - StatusBadge
 * - ProgressBar
 */

"use client"

import React from "react"
import { Box, Typography, Chip, keyframes, styled, alpha } from "@mui/material"
import Favorite from "@mui/icons-material/Favorite"
import FavoriteBorder from "@mui/icons-material/FavoriteBorder"
import { TICKET_POINT_OPTIONS, TICKET_POINT_OPTIONS_MAP } from "expanse.ui/points"
import {
  TaskStatus,
  STATUS_COLORS,
  getStatusLabel,
  getDifficultyLabel,
} from "./types"
import { useTaskCardContext } from "./context"
import { useHeartMeter } from "./hooks"

// ============================================================
// ANIMATIONS
// ============================================================

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
`

const fillAnimation = keyframes`
  0% { opacity: 0; transform: scale(0.5); }
  100% { opacity: 1; transform: scale(1); }
`

// ============================================================
// DESCRIPTION BARS
// ============================================================

const BarContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 6,
})

const Bar = styled(Box)<{ barWidth: number }>(({ barWidth }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: "rgba(255, 255, 255, 0.25)",
  width: barWidth,
}))

export interface DescriptionBarsProps {
  /** Number of bars to show */
  count?: number
  /** Bar widths (percentages of max) */
  widths?: number[]
  /** Maximum width in pixels */
  maxWidth?: number
}

export function DescriptionBars({
  count = 3,
  widths = [0.6, 0.85, 0.7],
  maxWidth = 140,
}: DescriptionBarsProps) {
  const bars = Array.from({ length: count }, (_, i) => ({
    width: (widths[i % widths.length] ?? 0.7) * maxWidth,
  }))

  return (
    <BarContainer>
      {bars.map((bar, i) => (
        <Bar key={i} barWidth={bar.width} />
      ))}
    </BarContainer>
  )
}

// ============================================================
// HEART METER
// ============================================================

const HeartContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 2,
})

const AnimatedHeart = styled(Box)<{ filled: boolean; delay: number }>(
  ({ filled, delay }) => ({
    display: "flex",
    alignItems: "center",
    animation: filled ? `${fillAnimation} 400ms ease-out ${delay}ms both` : "none",
    "& svg": {
      width: 18,
      height: 18,
      color: filled ? "#ff6b6b" : "rgba(255, 255, 255, 0.3)",
    },
    "&:hover svg": {
      animation: `${pulseAnimation} 600ms ease-in-out`,
    },
  })
)

export interface HeartMeterProps {
  points: TICKET_POINT_OPTIONS
  animated?: boolean
  showEmpty?: boolean
}

export function HeartMeter({
  points,
  animated = true,
  showEmpty = false,
}: HeartMeterProps) {
  const { hearts, totalCount } = useHeartMeter({ points, animated })

  return (
    <HeartContainer>
      {hearts.map((heart, i) => (
        <AnimatedHeart key={i} filled={heart.filled} delay={heart.delay}>
          {heart.filled ? (
            <Favorite />
          ) : showEmpty ? (
            <FavoriteBorder />
          ) : null}
        </AnimatedHeart>
      ))}
    </HeartContainer>
  )
}

// ============================================================
// POINTS DISPLAY
// ============================================================

const PointsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 4,
}))

const PointValue = styled(Typography)({
  fontSize: 14,
  fontWeight: 700,
  color: "#FFFFFF",
})

const PointLabel = styled(Typography)({
  fontSize: 12,
  fontWeight: 500,
  color: "rgba(255, 255, 255, 0.7)",
})

export interface PointsDisplayProps {
  points: TICKET_POINT_OPTIONS
  showLabel?: boolean
  showXP?: boolean
}

export function PointsDisplay({
  points,
  showLabel = true,
  showXP = true,
}: PointsDisplayProps) {
  const xpValue = TICKET_POINT_OPTIONS_MAP[points] ?? 0
  const label = points === 1 ? "Point" : "Points"

  return (
    <PointsContainer>
      <PointValue>
        {showLabel && `${label}: `}
        {points}
      </PointValue>
      {showXP && (
        <PointLabel>
          ({xpValue} XP)
        </PointLabel>
      )}
    </PointsContainer>
  )
}

// ============================================================
// XP LEVEL DISPLAY
// ============================================================

const XPContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 4,
})

export interface XPLevelDisplayProps {
  points: TICKET_POINT_OPTIONS
}

export function XPLevelDisplay({ points }: XPLevelDisplayProps) {
  const xpValue = TICKET_POINT_OPTIONS_MAP[points]
  const displayValue = points === TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS ? "?" : xpValue

  return (
    <XPContainer>
      <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>
        XP Level: {displayValue}
      </Typography>
    </XPContainer>
  )
}

// ============================================================
// XP TIER DISPLAY
// ============================================================

export interface XPTierDisplayProps {
  points: TICKET_POINT_OPTIONS
}

export function XPTierDisplay({ points }: XPTierDisplayProps) {
  const difficulty = getDifficultyLabel(points)

  return (
    <Typography sx={{ fontSize: 12, fontWeight: 500, color: "rgba(255, 255, 255, 0.7)" }}>
      Tier: {difficulty}
    </Typography>
  )
}

// ============================================================
// STATUS BADGE
// ============================================================

const StyledChip = styled(Chip)<{ statusColor: string }>(({ statusColor }) => ({
  height: 22,
  fontSize: 11,
  fontWeight: 600,
  backgroundColor: alpha(statusColor, 0.2),
  color: statusColor,
  border: `1px solid ${alpha(statusColor, 0.4)}`,
  "& .MuiChip-label": {
    padding: "0 8px",
  },
}))

export interface StatusBadgeProps {
  status: TaskStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const color = STATUS_COLORS[status]
  const label = getStatusLabel(status)

  return <StyledChip label={label} statusColor={color} size="small" />
}

// ============================================================
// PROGRESS BAR
// ============================================================

const ProgressContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
})

const ProgressTrack = styled(Box)(({ theme }) => ({
  flex: 1,
  height: 6,
  borderRadius: 3,
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  overflow: "hidden",
}))

const ProgressFill = styled(Box)<{ progress: number; color: string }>(
  ({ progress, color }) => ({
    height: "100%",
    width: `${progress}%`,
    borderRadius: 3,
    backgroundColor: color,
    transition: "width 500ms ease-out",
  })
)

const ProgressLabel = styled(Typography)({
  fontSize: 12,
  fontWeight: 600,
  color: "rgba(255, 255, 255, 0.8)",
  minWidth: 36,
  textAlign: "right",
})

export interface TaskProgressBarProps {
  progress: number
  color?: string
  showLabel?: boolean
}

export function TaskProgressBar({
  progress,
  color = "#00d4ff",
  showLabel = true,
}: TaskProgressBarProps) {
  return (
    <ProgressContainer>
      <ProgressTrack>
        <ProgressFill progress={progress} color={color} />
      </ProgressTrack>
      {showLabel && <ProgressLabel>{Math.round(progress)}%</ProgressLabel>}
    </ProgressContainer>
  )
}

// ============================================================
// SUBJECT CHIP
// ============================================================

const SUBJECT_COLORS: Record<string, string> = {
  math: "#4fc3f7",
  english: "#81c784",
  science: "#ffb74d",
  history: "#ce93d8",
  art: "#f48fb1",
  music: "#90caf9",
  default: "#00d4ff",
}

export interface SubjectChipProps {
  subject: string
}

export function SubjectChip({ subject }: SubjectChipProps) {
  const color = SUBJECT_COLORS[subject.toLowerCase()] ?? SUBJECT_COLORS.default

  return (
    <Chip
      label={subject}
      size="small"
      sx={{
        height: 20,
        fontSize: 10,
        fontWeight: 600,
        backgroundColor: alpha(color, 0.2),
        color: color,
        border: `1px solid ${alpha(color, 0.4)}`,
        "& .MuiChip-label": {
          padding: "0 6px",
        },
      }}
    />
  )
}

/**
 * TaskCard Hooks
 *
 * Reusable hooks for TaskCard interactions, animations,
 * and state management.
 */

"use client"

import { useReducer, useCallback, useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { TICKET_POINT_OPTIONS, TICKET_POINT_OPTIONS_MAP } from "expanse.ui/points"
import {
  TaskData,
  TaskStatus,
  TaskCardState,
  CardViewState,
  isTaskOverdue,
  getDifficultyLabel,
  DIFFICULTY_COLORS,
  STATUS_COLORS,
} from "./types"
import {
  taskCardReducer,
  initialTaskCardState,
  taskCardActions,
} from "./reducer"
import { useTaskCardContext } from "./context"

// ============================================================
// useTaskCard - Main hook for TaskCard component
// ============================================================

export interface UseTaskCardOptions {
  task: TaskData
  flipEnabled?: boolean
  expandEnabled?: boolean
  onFlip?: (task: TaskData, isFlipped: boolean) => void
  onExpand?: (task: TaskData) => void
}

export interface UseTaskCardReturn {
  // State
  state: TaskCardState
  // Computed values
  isOverdue: boolean
  effectiveStatus: TaskStatus
  difficultyLabel: string
  difficultyColor: string
  statusColor: string
  xpValue: number
  // Handlers
  handleMouseEnter: () => void
  handleMouseLeave: () => void
  handleClick: () => void
  handleFlip: () => void
  handleExpand: () => void
  // Refs
  cardRef: React.RefObject<HTMLDivElement>
}

export function useTaskCard({
  task,
  flipEnabled = true,
  expandEnabled = true,
  onFlip,
  onExpand,
}: UseTaskCardOptions): UseTaskCardReturn {
  const [state, dispatch] = useReducer(taskCardReducer, initialTaskCardState)
  const cardRef = useRef<HTMLDivElement>(null)

  // Computed values
  const isOverdue = isTaskOverdue(task)
  const effectiveStatus = isOverdue && task.status !== TaskStatus.COMPLETED
    ? TaskStatus.OVERDUE
    : task.status
  const difficultyLabel = getDifficultyLabel(task.points)
  const difficultyColor = DIFFICULTY_COLORS[task.points]
  const statusColor = STATUS_COLORS[effectiveStatus]
  const xpValue = TICKET_POINT_OPTIONS_MAP[task.points] ?? 0

  // Handlers
  const handleMouseEnter = useCallback(() => {
    if (state.viewState === CardViewState.DEFAULT) {
      dispatch(taskCardActions.setHovered(true))
    }
  }, [state.viewState])

  const handleMouseLeave = useCallback(() => {
    if (state.viewState === CardViewState.HOVERED) {
      dispatch(taskCardActions.setHovered(false))
    }
  }, [state.viewState])

  const handleFlip = useCallback(() => {
    if (!flipEnabled) return
    const newFlipped = !state.isFlipped
    dispatch(taskCardActions.setFlipped(newFlipped))
    onFlip?.(task, newFlipped)
  }, [flipEnabled, state.isFlipped, task, onFlip])

  const handleExpand = useCallback(() => {
    if (!expandEnabled) return
    dispatch(taskCardActions.setExpanded(true))
    onExpand?.(task)
  }, [expandEnabled, task, onExpand])

  const handleClick = useCallback(() => {
    // Default click behavior - flip if enabled
    if (flipEnabled) {
      handleFlip()
    }
  }, [flipEnabled, handleFlip])

  return {
    state,
    isOverdue,
    effectiveStatus,
    difficultyLabel,
    difficultyColor,
    statusColor,
    xpValue,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handleFlip,
    handleExpand,
    cardRef,
  }
}

// ============================================================
// useTaskProgress - Animated progress tracking
// ============================================================

export interface UseTaskProgressOptions {
  progress: number
  duration?: number
  enabled?: boolean
}

export interface UseTaskProgressReturn {
  animatedProgress: number
  progressRef: React.RefObject<HTMLDivElement>
}

export function useTaskProgress({
  progress,
  duration = 1000,
  enabled = true,
}: UseTaskProgressOptions): UseTaskProgressReturn {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!enabled) {
      setAnimatedProgress(progress)
      return undefined
    }

    // Kill any existing animation
    if (tweenRef.current) {
      tweenRef.current.kill()
    }

    // Animate to new progress value
    const obj = { value: animatedProgress }
    tweenRef.current = gsap.to(obj, {
      value: progress,
      duration: duration / 1000,
      ease: "power2.out",
      onUpdate: () => {
        setAnimatedProgress(obj.value)
      },
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [progress, duration, enabled])

  return {
    animatedProgress,
    progressRef,
  }
}

// ============================================================
// useFlipAnimation - Card flip animation
// ============================================================

export interface UseFlipAnimationOptions {
  isFlipped: boolean
  duration?: number
}

export interface UseFlipAnimationReturn {
  frontRef: React.RefObject<HTMLDivElement>
  backRef: React.RefObject<HTMLDivElement>
  containerStyle: React.CSSProperties
  frontStyle: React.CSSProperties
  backStyle: React.CSSProperties
}

export function useFlipAnimation({
  isFlipped,
  duration = 600,
}: UseFlipAnimationOptions): UseFlipAnimationReturn {
  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)
  const { animation } = useTaskCardContext()

  const containerStyle: React.CSSProperties = {
    perspective: "1000px",
    transformStyle: "preserve-3d",
  }

  const baseCardStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    transition: `transform ${duration}ms ${animation.easing}`,
  }

  const frontStyle: React.CSSProperties = {
    ...baseCardStyle,
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
    zIndex: isFlipped ? 1 : 2,
  }

  const backStyle: React.CSSProperties = {
    ...baseCardStyle,
    transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
    zIndex: isFlipped ? 2 : 1,
  }

  return {
    frontRef,
    backRef,
    containerStyle,
    frontStyle,
    backStyle,
  }
}

// ============================================================
// useHoverGlow - Animated glow effect on hover
// ============================================================

export interface UseHoverGlowOptions {
  isHovered: boolean
  glowColor?: string
  intensity?: number
}

export interface UseHoverGlowReturn {
  glowRef: React.RefObject<HTMLDivElement>
  glowStyle: React.CSSProperties
}

export function useHoverGlow({
  isHovered,
  glowColor,
  intensity = 1,
}: UseHoverGlowOptions): UseHoverGlowReturn {
  const glowRef = useRef<HTMLDivElement>(null)
  const { colors, animation } = useTaskCardContext()
  const color = glowColor ?? colors.primary

  const glowStyle: React.CSSProperties = {
    boxShadow: isHovered
      ? `0 0 ${20 * intensity}px ${color}40, 0 0 ${40 * intensity}px ${color}20, 0 8px 32px rgba(0,0,0,0.3)`
      : `0 4px 12px rgba(0,0,0,0.2)`,
    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
    transition: `box-shadow ${animation.duration}ms ${animation.easing}, transform ${animation.duration}ms ${animation.easing}`,
  }

  return {
    glowRef,
    glowStyle,
  }
}

// ============================================================
// useHeartMeter - Animated heart/difficulty meter
// ============================================================

export interface UseHeartMeterOptions {
  points: TICKET_POINT_OPTIONS
  animated?: boolean
}

export interface UseHeartMeterReturn {
  filledCount: number
  totalCount: number
  hearts: { filled: boolean; delay: number }[]
}

export function useHeartMeter({
  points,
  animated = true,
}: UseHeartMeterOptions): UseHeartMeterReturn {
  const totalCount = 5

  // Map points to filled hearts
  let filledCount: number
  switch (points) {
    case TICKET_POINT_OPTIONS.ONE_POINT:
      filledCount = 1
      break
    case TICKET_POINT_OPTIONS.TWO_POINTS:
      filledCount = 1
      break
    case TICKET_POINT_OPTIONS.THREE_POINTS:
      filledCount = 2
      break
    case TICKET_POINT_OPTIONS.FIVE_POINTS:
      filledCount = 3
      break
    case TICKET_POINT_OPTIONS.NINE_POINTS:
      filledCount = 4
      break
    case TICKET_POINT_OPTIONS.EIGHTEEN_POINTS:
    case TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS:
    default:
      filledCount = 5
  }

  const hearts = Array.from({ length: totalCount }, (_, i) => ({
    filled: i < filledCount,
    delay: animated ? i * 100 : 0,
  }))

  return {
    filledCount,
    totalCount,
    hearts,
  }
}

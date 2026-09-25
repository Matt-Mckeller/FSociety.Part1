/**
 * TaskCard - Base Component
 *
 * A solid-background card for displaying tasks/assignments with:
 * - Cloud theme integration (navy bg + cyan accents)
 * - Three-layer glow border system
 * - Heart meter, XP display, progress bars
 * - Flip animation (front/back)
 * - Hover effects with elevation + glow
 *
 * Based on the original TicketCard design with enhancements.
 */

"use client"

import React, { forwardRef } from "react"
import { Box, Typography, styled, alpha } from "@mui/material"
import { ExpanseLogo } from "expanse.dynamicAssets"
import {
  TaskCardProps,
  TaskData,
  TaskStatus,
  formatDueDate,
} from "./types"
import { useTaskCard, useFlipAnimation, useHoverGlow } from "./hooks"
import { useTaskCardContext, TaskCardProvider } from "./context"
import {
  DescriptionBars,
  HeartMeter,
  PointsDisplay,
  XPLevelDisplay,
  XPTierDisplay,
  StatusBadge,
  TaskProgressBar,
  SubjectChip,
} from "./subcomponents"

// ============================================================
// STYLED COMPONENTS
// ============================================================

const CardWrapper = styled(Box)<{
  cardWidth: number
  cardHeight: number
}>(({ cardWidth, cardHeight }) => ({
  position: "relative",
  width: cardWidth,
  height: cardHeight,
  perspective: "1000px",
}))

const CardFace = styled(Box)<{
  bgColor: string
  glowOuter: string
  glowCenter: string
  glowInner: string
}>(({ bgColor, glowOuter, glowCenter, glowInner }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: 12,
  background: bgColor,
  backfaceVisibility: "hidden",
  cursor: "pointer",
  // Three-layer border glow
  boxShadow: `
    0 0 0 1px ${glowInner},
    0 0 0 3px ${glowCenter},
    0 0 0 6px ${glowOuter}
  `,
  overflow: "hidden",
}))

const CardContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: 16,
})

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 8,
})

const TitleSection = styled(Box)({
  flex: 1,
  marginRight: 8,
})

const Title = styled(Typography)({
  fontSize: 14,
  fontWeight: 700,
  color: "#FFFFFF",
  lineHeight: 1.3,
  marginBottom: 4,
})

const LogoContainer = styled(Box)({
  width: 24,
  height: 24,
  flexShrink: 0,
})

const MetaRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 12,
})

const PreviewSection = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
})

const Footer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 6,
  marginTop: "auto",
})

const FooterRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
})

const DueDate = styled(Typography)<{ isOverdue: boolean }>(({ isOverdue }) => ({
  fontSize: 11,
  fontWeight: 500,
  color: isOverdue ? "#ff6b6b" : "rgba(255, 255, 255, 0.6)",
}))

// ============================================================
// CARD FRONT COMPONENT
// ============================================================

interface CardFrontProps {
  task: TaskData
  effectiveStatus: TaskStatus
  isOverdue: boolean
  style?: React.CSSProperties
}

const CardFront = forwardRef<HTMLDivElement, CardFrontProps>(
  ({ task, effectiveStatus, isOverdue, style }, ref) => {
    const { colors } = useTaskCardContext()

    return (
      <CardFace
        ref={ref}
        bgColor={colors.background}
        glowOuter={colors.glowOuter}
        glowCenter={colors.glowCenter}
        glowInner={colors.glowInner}
        style={style}
      >
        <CardContent>
          {/* Header: Title + Logo */}
          <Header>
            <TitleSection>
              <Title>{task.title}</Title>
              {task.subject && <SubjectChip subject={task.subject} />}
            </TitleSection>
            <LogoContainer>
              <ExpanseLogo theme="light" size="sm" />
            </LogoContainer>
          </Header>

          {/* Meta: Status */}
          <MetaRow>
            <StatusBadge status={effectiveStatus} />
            {task.dueDate && (
              <DueDate isOverdue={isOverdue}>
                {formatDueDate(task.dueDate)}
              </DueDate>
            )}
          </MetaRow>

          {/* Preview: Description bars or actual content */}
          <PreviewSection>
            {task.description ? (
              <Typography
                sx={{
                  fontSize: 12,
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: 1.4,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {task.description}
              </Typography>
            ) : (
              <DescriptionBars />
            )}
          </PreviewSection>

          {/* Progress bar if in progress */}
          {task.progress > 0 && task.status !== TaskStatus.COMPLETED && (
            <Box sx={{ mb: 1 }}>
              <TaskProgressBar
                progress={task.progress}
                color={colors.primary}
              />
            </Box>
          )}

          {/* Footer: Hearts + Points */}
          <Footer>
            <FooterRow>
              <HeartMeter points={task.points} />
              <PointsDisplay points={task.points} showXP={false} />
            </FooterRow>
            <FooterRow>
              <XPTierDisplay points={task.points} />
              <XPLevelDisplay points={task.points} />
            </FooterRow>
          </Footer>
        </CardContent>
      </CardFace>
    )
  }
)

CardFront.displayName = "CardFront"

// ============================================================
// CARD BACK COMPONENT
// ============================================================

interface CardBackProps {
  task: TaskData
  style?: React.CSSProperties
}

const CardBack = forwardRef<HTMLDivElement, CardBackProps>(
  ({ task, style }, ref) => {
    const { colors } = useTaskCardContext()

    return (
      <CardFace
        ref={ref}
        bgColor={colors.backgroundSecondary}
        glowOuter={colors.glowOuter}
        glowCenter={colors.glowCenter}
        glowInner={colors.glowInner}
        style={style}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF", mb: 2 }}
          >
            Details
          </Typography>

          {task.description && (
            <Typography
              sx={{
                fontSize: 12,
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: 1.5,
                mb: 2,
              }}
            >
              {task.description}
            </Typography>
          )}

          {/* Task-specific details */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {task.questionCount && (
              <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                Questions: {task.questionCount}
              </Typography>
            )}
            {task.timeLimit && (
              <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                Time Limit: {task.timeLimit} min
              </Typography>
            )}
            {task.pageRange && (
              <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                Pages: {task.pageRange.start}-{task.pageRange.end}
              </Typography>
            )}
            {task.chapter && (
              <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                Chapter: {task.chapter}
              </Typography>
            )}
            {task.milestones && (
              <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                Milestones: {task.milestones.completed}/{task.milestones.total}
              </Typography>
            )}
            {task.teamSize && (
              <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                Team Size: {task.teamSize}
              </Typography>
            )}
          </Box>

          <Box sx={{ mt: "auto", textAlign: "center" }}>
            <Typography sx={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
              Click to flip back
            </Typography>
          </Box>
        </CardContent>
      </CardFace>
    )
  }
)

CardBack.displayName = "CardBack"

// ============================================================
// MAIN TASKCARD COMPONENT
// ============================================================

/**
 * TaskCard - A solid-background card for tasks/assignments
 *
 * Features:
 * - Cloud theme integration (navy bg + cyan accents)
 * - Three-layer glow border
 * - Hearts meter, XP display, progress
 * - Flip animation to show details
 * - Hover effects with elevation + glow
 *
 * @example
 * ```tsx
 * <TaskCard
 *   task={{
 *     id: "1",
 *     title: "Math Homework",
 *     subject: "Math",
 *     type: TaskType.HOMEWORK,
 *     status: TaskStatus.IN_PROGRESS,
 *     points: TICKET_POINT_OPTIONS.THREE_POINTS,
 *     progress: 50,
 *   }}
 * />
 * ```
 */
export function TaskCard({
  task,
  width,
  flipEnabled = true,
  expandEnabled = true,
  onClick,
  onExpand,
  onFlip,
  className,
}: TaskCardProps) {
  const { defaults } = useTaskCardContext()
  const cardWidth = width ?? defaults.width
  const cardHeight = defaults.height

  const {
    state,
    isOverdue,
    effectiveStatus,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    cardRef,
  } = useTaskCard({
    task,
    flipEnabled,
    expandEnabled,
    onFlip,
    onExpand,
  })

  const { frontStyle, backStyle, containerStyle } = useFlipAnimation({
    isFlipped: state.isFlipped,
  })

  const { glowStyle } = useHoverGlow({
    isHovered: state.viewState === "hovered",
  })

  const handleCardClick = () => {
    onClick?.(task)
    handleClick()
  }

  return (
    <CardWrapper
      ref={cardRef}
      cardWidth={cardWidth}
      cardHeight={cardHeight}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      sx={glowStyle}
      style={containerStyle}
    >
      <CardFront
        task={task}
        effectiveStatus={effectiveStatus}
        isOverdue={isOverdue}
        style={frontStyle}
      />
      <CardBack task={task} style={backStyle} />
    </CardWrapper>
  )
}

// ============================================================
// WRAPPED EXPORT WITH PROVIDER
// ============================================================

export function TaskCardWithProvider(props: TaskCardProps) {
  return (
    <TaskCardProvider>
      <TaskCard {...props} />
    </TaskCardProvider>
  )
}

export default TaskCard

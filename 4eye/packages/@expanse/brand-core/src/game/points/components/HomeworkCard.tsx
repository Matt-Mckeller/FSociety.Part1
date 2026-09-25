/**
 * Homework Card - Assignment card combining document shapes with points system
 *
 * A card representing a homework assignment or task that uses the
 * document shape primitives and integrates with the points/XP system.
 *
 * ## Design Patterns
 * - Uses FoldedPaperShape or NotebookPageShape as visual base
 * - Integrates XP meter and point display from game/points
 * - Follows 1:2:3 triple-layer border system
 * - "Darkness to light" gradient represents growth/progress
 */

"use client"

import React from "react"
import {
  Box,
  Typography,
  Chip,
  LinearProgress,
  alpha,
  useTheme,
  styled,
  SxProps,
  Theme,
} from "@mui/material"
import {
  FoldedPaperShape,
  NotebookPageShape,
  ClipboardShape,
  type DocumentRatio,
} from "../../../primitives/shapes"

// ============================================================
// TYPES
// ============================================================

export type HomeworkVariant = "paper" | "notebook" | "clipboard"

export interface HomeworkCardProps {
  /** Title of the assignment */
  title: string
  /** Description or instructions */
  description?: string
  /** Due date */
  dueDate?: Date
  /** Subject or category */
  subject?: string
  /** Points/XP value for completing */
  xpValue?: number
  /** Current progress (0-100) */
  progress?: number
  /** Whether the assignment is completed */
  isCompleted?: boolean
  /** Visual variant */
  variant?: HomeworkVariant
  /** Document ratio */
  documentRatio?: DocumentRatio
  /** Width of the card */
  width?: number
  /** Callback when clicked */
  onClick?: () => void
  /** Custom styling */
  sx?: SxProps<Theme>
}

// ============================================================
// STYLED COMPONENTS
// ============================================================

const CardContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isCompleted" && prop !== "cardWidth",
})<{ isCompleted?: boolean; cardWidth?: number }>(
  ({ theme, isCompleted, cardWidth }) => ({
    position: "relative",
    width: cardWidth ?? 280,
    cursor: "pointer",
    transition: theme.transitions.create(["transform", "box-shadow"], {
      duration: theme.transitions.duration.short,
    }),
    "&:hover": {
      transform: "translateY(-2px)",
    },
    ...(isCompleted && {
      opacity: 0.85,
      "&::after": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        background: `linear-gradient(135deg, transparent 45%, ${alpha(theme.palette.success.main, 0.1)} 50%, transparent 55%)`,
      },
    }),
  }),
)

const ContentOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 40,
  left: 16,
  right: 16,
  bottom: 16,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}))

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: theme.spacing(1),
}))

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "0.95rem",
  lineHeight: 1.2,
  color: theme.palette.text.primary,
  flex: 1,
}))

const SubjectChip = styled(Chip)(({ theme }) => ({
  height: 20,
  fontSize: "0.65rem",
  fontWeight: 500,
  "& .MuiChip-label": {
    padding: "0 6px",
  },
}))

const Description = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
  lineHeight: 1.4,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  flex: 1,
}))

const Footer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "auto",
  gap: theme.spacing(1),
}))

const DueDate = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
  color: theme.palette.text.secondary,
}))

const ProgressContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  width: "100%",
}))

const StyledProgress = styled(LinearProgress)(({ theme }) => ({
  height: 4,
  borderRadius: 2,
  flex: 1,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  "& .MuiLinearProgress-bar": {
    borderRadius: 2,
  },
}))

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function formatDueDate(date: Date): string {
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

  if (days < 0) return "Overdue"
  if (days === 0) return "Due today"
  if (days === 1) return "Due tomorrow"
  if (days < 7) return `Due in ${days} days`
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
}

function getSubjectColor(
  subject: string,
): "primary" | "secondary" | "success" | "warning" | "error" | "info" {
  const colors = ["primary", "secondary", "success", "warning", "info"] as const
  const hash = subject
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

// ============================================================
// COMPONENT
// ============================================================

/**
 * HomeworkCard - Assignment card with points/XP integration
 *
 * Combines document shape primitives with the gamification points system.
 * Available variants: paper (folded corner), notebook (spiral binding), clipboard.
 *
 * @example
 * ```tsx
 * <HomeworkCard
 *   title="Chapter 5 Reading"
 *   description="Read pages 120-145 and take notes"
 *   subject="English"
 *   xpValue={50}
 *   dueDate={new Date("2024-12-20")}
 *   progress={30}
 *   variant="notebook"
 * />
 * ```
 */
export function HomeworkCard({
  title,
  description,
  dueDate,
  subject,
  xpValue = 25,
  progress = 0,
  isCompleted = false,
  variant = "paper",
  documentRatio = "usLetter",
  width = 280,
  onClick,
  sx,
}: HomeworkCardProps) {
  const theme = useTheme()
  const actualProgress = isCompleted ? 100 : progress

  // Calculate height based on document ratio
  const RATIOS: Record<DocumentRatio, number> = {
    usLetter: 11 / 8.5,
    a4: 297 / 210,
    square: 1,
    wide16x9: 9 / 16,
    screen4x3: 3 / 4,
  }
  const height = width * RATIOS[documentRatio]

  // Render the appropriate shape variant
  const renderShape = () => {
    const commonProps = {
      width,
      height,
      cornerRadius: 4,
      stroke: theme.palette.divider,
      strokeWidth: 1,
    }

    switch (variant) {
      case "notebook":
        return (
          <NotebookPageShape
            {...commonProps}
            showLines={true}
            spiralHoles={Math.floor(height / 24)}
          />
        )
      case "clipboard":
        return <ClipboardShape {...commonProps} clipHeight={0.06} />
      case "paper":
      default:
        return (
          <FoldedPaperShape
            {...commonProps}
            foldSize={width * 0.1}
            showShadow={true}
          />
        )
    }
  }

  return (
    <CardContainer
      isCompleted={isCompleted}
      cardWidth={width}
      onClick={onClick}
      sx={sx}
    >
      {/* Background SVG shape */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ display: "block" }}
      >
        {renderShape()}
      </svg>
      {/* Content overlay */}
      <ContentOverlay>
        <Header>
          <Title>{title}</Title>
          {subject && (
            <SubjectChip
              label={subject}
              size="small"
              color={getSubjectColor(subject)}
              variant="outlined"
            />
          )}
        </Header>

        {description && <Description>{description}</Description>}

        {/* Progress bar */}
        {actualProgress > 0 && (
          <ProgressContainer>
            <StyledProgress
              variant="determinate"
              value={actualProgress}
              color={isCompleted ? "success" : "primary"}
            />
            <Typography variant="caption" sx={{
              color: "text.secondary"
            }}>
              {actualProgress}%
            </Typography>
          </ProgressContainer>
        )}

        {/* Footer with XP and due date */}
        <Footer>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: isCompleted ? "success.main" : "primary.main",
              }}
            >
              {isCompleted ? "+" : ""}
              {xpValue} XP
            </Typography>
          </Box>
          {dueDate && <DueDate>{formatDueDate(dueDate)}</DueDate>}
        </Footer>
      </ContentOverlay>
      {/* Completion checkmark overlay */}
      {isCompleted && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 24,
            height: 24,
            borderRadius: "50%",
            bgcolor: "success.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "0.9rem",
            fontWeight: "bold",
          }}
        >
          ✓
        </Box>
      )}
    </CardContainer>
  );
}

// ============================================================
// SPECIALIZED VARIANTS
// ============================================================

/** Assignment Card - General homework assignment */
export interface AssignmentCardProps
  extends Omit<HomeworkCardProps, "variant"> {
  /** Assignment type for theming */
  type?: "homework" | "essay" | "worksheet"
}

export function AssignmentCard({
  type = "homework",
  documentRatio = "usLetter",
  ...props
}: AssignmentCardProps) {
  return (
    <HomeworkCard variant="paper" documentRatio={documentRatio} {...props} />
  )
}

/** Quiz Card - Quiz or test format with timer indication */
export interface QuizCardProps
  extends Omit<HomeworkCardProps, "variant" | "description"> {
  /** Number of questions */
  questionCount?: number
  /** Time limit in minutes */
  timeLimit?: number
}

export function QuizCard({
  questionCount = 10,
  timeLimit,
  documentRatio = "usLetter",
  ...props
}: QuizCardProps) {
  const description = timeLimit
    ? `${questionCount} questions • ${timeLimit} min`
    : `${questionCount} questions`

  return (
    <HomeworkCard
      variant="clipboard"
      documentRatio={documentRatio}
      description={description}
      {...props}
    />
  )
}

/** Reading Card - Reading assignment with page range */
export interface ReadingCardProps
  extends Omit<HomeworkCardProps, "variant" | "description"> {
  /** Starting page */
  startPage?: number
  /** Ending page */
  endPage?: number
  /** Chapter number or title */
  chapter?: string | number
}

export function ReadingCard({
  startPage,
  endPage,
  chapter,
  documentRatio = "usLetter",
  ...props
}: ReadingCardProps) {
  let description = ""
  if (chapter) {
    description = `Chapter ${chapter}`
  }
  if (startPage && endPage) {
    description += description
      ? ` • Pages ${startPage}-${endPage}`
      : `Pages ${startPage}-${endPage}`
  }

  return (
    <HomeworkCard
      variant="notebook"
      documentRatio={documentRatio}
      description={description || undefined}
      {...props}
    />
  )
}

/** Project Card - Project assignment with milestone tracking */
export interface ProjectCardProps extends Omit<HomeworkCardProps, "variant"> {
  /** Total milestones */
  totalMilestones?: number
  /** Completed milestones */
  completedMilestones?: number
  /** Team size (optional) */
  teamSize?: number
}

export function ProjectCard({
  totalMilestones = 4,
  completedMilestones = 0,
  teamSize,
  documentRatio = "wide16x9",
  xpValue = 100,
  ...props
}: ProjectCardProps) {
  const progress =
    totalMilestones > 0
      ? Math.round((completedMilestones / totalMilestones) * 100)
      : 0

  let description = props.description || ""
  if (teamSize && teamSize > 1) {
    description = description
      ? `${description} • Team of ${teamSize}`
      : `Team of ${teamSize}`
  }
  description += description
    ? ` • ${completedMilestones}/${totalMilestones} milestones`
    : `${completedMilestones}/${totalMilestones} milestones`

  return (
    <HomeworkCard
      variant="paper"
      documentRatio={documentRatio}
      xpValue={xpValue}
      progress={progress}
      description={description}
      {...props}
    />
  )
}

export default HomeworkCard

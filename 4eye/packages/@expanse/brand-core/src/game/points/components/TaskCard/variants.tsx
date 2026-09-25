/**
 * TaskCard Variants
 *
 * Specialized task cards for different assignment types:
 * - HomeworkTaskCard: General homework/assignments
 * - QuizTaskCard: Quizzes and tests
 * - ReadingTaskCard: Reading assignments
 * - ProjectTaskCard: Long-term projects with milestones
 */

"use client"

import React from "react"
import { TICKET_POINT_OPTIONS } from "expanse.ui/points"
import { TaskCard, TaskCardWithProvider } from "./TaskCard"
import { TaskCardProvider } from "./context"
import {
  TaskData,
  TaskType,
  TaskStatus,
  createTaskData,
  TaskCardProps,
} from "./types"

// ============================================================
// COMMON PROPS INTERFACE
// ============================================================

interface BaseTaskCardVariantProps extends Omit<TaskCardProps, "task"> {
  id?: string
  title: string
  description?: string
  subject?: string
  points?: TICKET_POINT_OPTIONS
  status?: TaskStatus
  progress?: number
  dueDate?: Date
}

// ============================================================
// HOMEWORK TASK CARD
// ============================================================

export interface HomeworkTaskCardProps extends BaseTaskCardVariantProps {}

/**
 * HomeworkTaskCard - For general homework/assignments
 *
 * @example
 * ```tsx
 * <HomeworkTaskCard
 *   title="Chapter 5 Problems"
 *   subject="Math"
 *   description="Complete problems 1-20"
 *   points={TICKET_POINT_OPTIONS.THREE_POINTS}
 *   dueDate={new Date("2024-12-20")}
 * />
 * ```
 */
export function HomeworkTaskCard({
  id = `homework-${Date.now()}`,
  title,
  description,
  subject,
  points = TICKET_POINT_OPTIONS.THREE_POINTS,
  status = TaskStatus.NOT_STARTED,
  progress = 0,
  dueDate,
  ...cardProps
}: HomeworkTaskCardProps) {
  const task = createTaskData({
    id,
    title,
    description,
    subject,
    type: TaskType.HOMEWORK,
    status,
    points,
    progress,
    dueDate,
  })

  return (
    <TaskCardProvider>
      <TaskCard task={task} {...cardProps} />
    </TaskCardProvider>
  )
}

// ============================================================
// QUIZ TASK CARD
// ============================================================

export interface QuizTaskCardProps extends BaseTaskCardVariantProps {
  /** Number of questions */
  questionCount?: number
  /** Time limit in minutes */
  timeLimit?: number
}

/**
 * QuizTaskCard - For quizzes and tests
 *
 * @example
 * ```tsx
 * <QuizTaskCard
 *   title="Chapter 3 Quiz"
 *   subject="Science"
 *   questionCount={15}
 *   timeLimit={20}
 *   points={TICKET_POINT_OPTIONS.FIVE_POINTS}
 * />
 * ```
 */
export function QuizTaskCard({
  id = `quiz-${Date.now()}`,
  title,
  description,
  subject,
  points = TICKET_POINT_OPTIONS.FIVE_POINTS,
  status = TaskStatus.NOT_STARTED,
  progress = 0,
  dueDate,
  questionCount = 10,
  timeLimit,
  ...cardProps
}: QuizTaskCardProps) {
  // Auto-generate description if not provided
  const autoDescription = description ??
    (timeLimit
      ? `${questionCount} questions • ${timeLimit} min`
      : `${questionCount} questions`)

  const task = createTaskData({
    id,
    title,
    description: autoDescription,
    subject,
    type: TaskType.QUIZ,
    status,
    points,
    progress,
    dueDate,
    questionCount,
    timeLimit,
  })

  return (
    <TaskCardProvider>
      <TaskCard task={task} {...cardProps} />
    </TaskCardProvider>
  )
}

// ============================================================
// READING TASK CARD
// ============================================================

export interface ReadingTaskCardProps extends BaseTaskCardVariantProps {
  /** Starting page */
  startPage?: number
  /** Ending page */
  endPage?: number
  /** Chapter number or title */
  chapter?: string | number
}

/**
 * ReadingTaskCard - For reading assignments
 *
 * @example
 * ```tsx
 * <ReadingTaskCard
 *   title="To Kill a Mockingbird"
 *   subject="English"
 *   chapter={12}
 *   startPage={201}
 *   endPage={225}
 *   points={TICKET_POINT_OPTIONS.THREE_POINTS}
 * />
 * ```
 */
export function ReadingTaskCard({
  id = `reading-${Date.now()}`,
  title,
  description,
  subject,
  points = TICKET_POINT_OPTIONS.THREE_POINTS,
  status = TaskStatus.NOT_STARTED,
  progress = 0,
  dueDate,
  startPage,
  endPage,
  chapter,
  ...cardProps
}: ReadingTaskCardProps) {
  // Auto-generate description if not provided
  let autoDescription = description ?? ""
  if (!description) {
    if (chapter) {
      autoDescription = `Chapter ${chapter}`
    }
    if (startPage && endPage) {
      autoDescription += autoDescription
        ? ` • Pages ${startPage}-${endPage}`
        : `Pages ${startPage}-${endPage}`
    }
  }

  const task = createTaskData({
    id,
    title,
    description: autoDescription || undefined,
    subject,
    type: TaskType.READING,
    status,
    points,
    progress,
    dueDate,
    chapter,
    pageRange: startPage && endPage ? { start: startPage, end: endPage } : undefined,
  })

  return (
    <TaskCardProvider>
      <TaskCard task={task} {...cardProps} />
    </TaskCardProvider>
  )
}

// ============================================================
// PROJECT TASK CARD
// ============================================================

export interface ProjectTaskCardProps extends BaseTaskCardVariantProps {
  /** Total milestones */
  totalMilestones?: number
  /** Completed milestones */
  completedMilestones?: number
  /** Team size */
  teamSize?: number
}

/**
 * ProjectTaskCard - For long-term projects with milestones
 *
 * @example
 * ```tsx
 * <ProjectTaskCard
 *   title="Science Fair Project"
 *   subject="Science"
 *   totalMilestones={5}
 *   completedMilestones={2}
 *   teamSize={3}
 *   points={TICKET_POINT_OPTIONS.EIGHTEEN_POINTS}
 * />
 * ```
 */
export function ProjectTaskCard({
  id = `project-${Date.now()}`,
  title,
  description,
  subject,
  points = TICKET_POINT_OPTIONS.NINE_POINTS,
  status = TaskStatus.NOT_STARTED,
  progress: providedProgress,
  dueDate,
  totalMilestones = 4,
  completedMilestones = 0,
  teamSize,
  ...cardProps
}: ProjectTaskCardProps) {
  // Calculate progress from milestones if not provided
  const calculatedProgress = totalMilestones > 0
    ? Math.round((completedMilestones / totalMilestones) * 100)
    : 0
  const progress = providedProgress ?? calculatedProgress

  // Auto-generate description if not provided
  let autoDescription = description ?? ""
  if (!description) {
    if (teamSize && teamSize > 1) {
      autoDescription = `Team of ${teamSize}`
    }
    autoDescription += autoDescription
      ? ` • ${completedMilestones}/${totalMilestones} milestones`
      : `${completedMilestones}/${totalMilestones} milestones`
  }

  const task = createTaskData({
    id,
    title,
    description: autoDescription || undefined,
    subject,
    type: TaskType.PROJECT,
    status,
    points,
    progress,
    dueDate,
    milestones: { total: totalMilestones, completed: completedMilestones },
    teamSize,
  })

  return (
    <TaskCardProvider>
      <TaskCard task={task} {...cardProps} />
    </TaskCardProvider>
  )
}

// ============================================================
// ASSIGNMENT TASK CARD (Alias for Homework)
// ============================================================

export interface AssignmentTaskCardProps extends HomeworkTaskCardProps {}

/**
 * AssignmentTaskCard - Alias for HomeworkTaskCard
 */
export function AssignmentTaskCard(props: AssignmentTaskCardProps) {
  return <HomeworkTaskCard {...props} />
}

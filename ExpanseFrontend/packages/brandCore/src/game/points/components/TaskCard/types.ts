/**
 * TaskCard Types & Constants
 *
 * Defines the type system for TaskCard components and integrates
 * with the existing TICKET_POINT system.
 */

import { TICKET_POINT_OPTIONS } from "expanse.ui/points"

// ============================================================
// ENUMS & CONSTANTS
// ============================================================

/** Task status states */
export enum TaskStatus {
  NOT_STARTED = "not-started",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
  OVERDUE = "overdue",
}

/** Task type / category */
export enum TaskType {
  HOMEWORK = "homework",
  QUIZ = "quiz",
  READING = "reading",
  PROJECT = "project",
  ASSIGNMENT = "assignment",
}

/** Card visual states */
export enum CardViewState {
  DEFAULT = "default",
  HOVERED = "hovered",
  EXPANDED = "expanded",
  FLIPPED = "flipped",
}

/** Difficulty labels mapped from point system */
export const DIFFICULTY_LABELS: Record<TICKET_POINT_OPTIONS, string> = {
  [TICKET_POINT_OPTIONS.ONE_POINT]: "Trivial",
  [TICKET_POINT_OPTIONS.TWO_POINTS]: "Easy",
  [TICKET_POINT_OPTIONS.THREE_POINTS]: "Simple",
  [TICKET_POINT_OPTIONS.FIVE_POINTS]: "Medium",
  [TICKET_POINT_OPTIONS.NINE_POINTS]: "Hard",
  [TICKET_POINT_OPTIONS.EIGHTEEN_POINTS]: "Complex",
  [TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS]: "Epic",
}

/** Color accent for difficulty levels (uses cloud theme cyan at varying intensities) */
export const DIFFICULTY_COLORS: Record<TICKET_POINT_OPTIONS, string> = {
  [TICKET_POINT_OPTIONS.ONE_POINT]: "rgba(0, 212, 255, 0.3)",
  [TICKET_POINT_OPTIONS.TWO_POINTS]: "rgba(0, 212, 255, 0.4)",
  [TICKET_POINT_OPTIONS.THREE_POINTS]: "rgba(0, 212, 255, 0.5)",
  [TICKET_POINT_OPTIONS.FIVE_POINTS]: "rgba(0, 212, 255, 0.6)",
  [TICKET_POINT_OPTIONS.NINE_POINTS]: "rgba(0, 212, 255, 0.75)",
  [TICKET_POINT_OPTIONS.EIGHTEEN_POINTS]: "rgba(0, 212, 255, 0.85)",
  [TICKET_POINT_OPTIONS.EIGHTY_ONE_POINTS]: "rgba(0, 212, 255, 1)",
}

/** Status colors */
export const STATUS_COLORS: Record<TaskStatus, string> = {
  [TaskStatus.NOT_STARTED]: "rgba(255, 255, 255, 0.5)",
  [TaskStatus.IN_PROGRESS]: "#00d4ff",
  [TaskStatus.COMPLETED]: "#4caf50",
  [TaskStatus.OVERDUE]: "#ff6b6b",
}

// ============================================================
// INTERFACES
// ============================================================

/** Core task data */
export interface TaskData {
  id: string
  title: string
  description?: string
  subject?: string
  type: TaskType
  status: TaskStatus
  points: TICKET_POINT_OPTIONS
  progress: number // 0-100
  dueDate?: Date
  createdAt?: Date
  completedAt?: Date
  // Extended data for specific types
  questionCount?: number // For quizzes
  timeLimit?: number // For quizzes (minutes)
  pageRange?: { start: number; end: number } // For reading
  chapter?: string | number // For reading
  milestones?: { total: number; completed: number } // For projects
  teamSize?: number // For projects
}

/** TaskCard component props */
export interface TaskCardProps {
  /** Task data */
  task: TaskData
  /** Card width */
  width?: number
  /** Enable flip interaction */
  flipEnabled?: boolean
  /** Enable expand interaction */
  expandEnabled?: boolean
  /** Custom click handler */
  onClick?: (task: TaskData) => void
  /** Custom expand handler */
  onExpand?: (task: TaskData) => void
  /** Custom flip handler */
  onFlip?: (task: TaskData, isFlipped: boolean) => void
  /** Additional CSS class */
  className?: string
}

/** TaskCard internal state */
export interface TaskCardState {
  viewState: CardViewState
  isFlipped: boolean
  isExpanded: boolean
  animationProgress: number
}

/** TaskCard context value */
export interface TaskCardContextValue {
  // Theme colors
  colors: {
    background: string
    backgroundSecondary: string
    primary: string
    text: string
    textSecondary: string
    border: string
    glowOuter: string
    glowCenter: string
    glowInner: string
  }
  // Animation settings
  animation: {
    duration: number
    easing: string
  }
  // Defaults
  defaults: {
    width: number
    height: number
  }
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/** Create a default task data object */
export function createTaskData(partial: Partial<TaskData> & Pick<TaskData, "id" | "title">): TaskData {
  return {
    type: TaskType.HOMEWORK,
    status: TaskStatus.NOT_STARTED,
    points: TICKET_POINT_OPTIONS.THREE_POINTS,
    progress: 0,
    ...partial,
  }
}

/** Get difficulty label from points */
export function getDifficultyLabel(points: TICKET_POINT_OPTIONS): string {
  return DIFFICULTY_LABELS[points] ?? "Unknown"
}

/** Get status display text */
export function getStatusLabel(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.NOT_STARTED:
      return "Not Started"
    case TaskStatus.IN_PROGRESS:
      return "In Progress"
    case TaskStatus.COMPLETED:
      return "Completed"
    case TaskStatus.OVERDUE:
      return "Overdue"
    default:
      return "Unknown"
  }
}

/** Calculate if task is overdue */
export function isTaskOverdue(task: TaskData): boolean {
  if (!task.dueDate || task.status === TaskStatus.COMPLETED) {
    return false
  }
  return new Date() > task.dueDate
}

/** Format due date for display */
export function formatDueDate(date: Date): string {
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

  if (days < 0) return `${Math.abs(days)} days overdue`
  if (days === 0) return "Due today"
  if (days === 1) return "Due tomorrow"
  if (days < 7) return `Due in ${days} days`
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
}

/**
 * TaskCard Component System
 *
 * A comprehensive task/assignment card system with:
 * - Solid backgrounds with three-layer glow border
 * - Hearts meter for difficulty visualization
 * - Points/XP display system
 * - Flip animation for details view
 * - Hover effects with elevation
 * - Progress tracking
 *
 * Architecture:
 * - types.ts: Enums, interfaces, and constants
 * - reducer.ts: State management with useReducer
 * - context.tsx: Theme provider and context
 * - hooks.ts: Reusable interaction hooks
 * - subcomponents.tsx: Internal UI components
 * - TaskCard.tsx: Main component with flip animation
 * - variants.tsx: Specialized task type cards
 */

// Types and Constants
export {
  TaskType,
  TaskStatus,
  CardViewState,
  DIFFICULTY_LABELS,
  STATUS_COLORS,
  createTaskData,
  type TaskData,
  type TaskCardProps,
  type TaskCardState,
  type TaskCardContextValue,
} from "./types"

// State Management
export {
  taskCardReducer,
  taskCardActions,
  initialTaskCardState,
  type TaskCardAction,
} from "./reducer"

// Context
export { TaskCardProvider, useTaskCardContext } from "./context"

// Hooks
export {
  useTaskCard,
  useTaskProgress,
  useFlipAnimation,
  useHoverGlow,
  useHeartMeter,
} from "./hooks"

// Subcomponents (exported for custom compositions)
export {
  DescriptionBars,
  HeartMeter,
  PointsDisplay,
  XPLevelDisplay,
  XPTierDisplay,
  StatusBadge,
  TaskProgressBar,
  SubjectChip,
} from "./subcomponents"

// Main Component
export { TaskCard, TaskCardWithProvider } from "./TaskCard"

// Variants
export {
  HomeworkTaskCard,
  QuizTaskCard,
  ReadingTaskCard,
  ProjectTaskCard,
  AssignmentTaskCard,
  type HomeworkTaskCardProps,
  type QuizTaskCardProps,
  type ReadingTaskCardProps,
  type ProjectTaskCardProps,
  type AssignmentTaskCardProps,
} from "./variants"

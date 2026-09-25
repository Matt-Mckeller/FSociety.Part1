/**
 * Points Components
 *
 * Re-exports from expanse.ui/points plus brandCore-specific extensions.
 */

// Re-export all from ui/points
export {
  PointSlider,
  PointsTable,
  TicketCard,
  TicketWithSlider,
  PointsChart,
  PointExampleSection,
} from "expanse.ui/points/components"

// BrandCore extensions using document shapes
export {
  HomeworkCard,
  AssignmentCard,
  QuizCard,
  ReadingCard,
  ProjectCard,
} from "./HomeworkCard"
export type {
  HomeworkCardProps,
  HomeworkVariant,
  AssignmentCardProps,
  QuizCardProps,
  ReadingCardProps,
  ProjectCardProps,
} from "./HomeworkCard"

// TaskCard system with solid backgrounds and full interactivity
export * from "./TaskCard"

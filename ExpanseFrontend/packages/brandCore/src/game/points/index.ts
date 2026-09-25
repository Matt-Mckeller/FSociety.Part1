/**
 * Points System
 *
 * Gamification and XP system for task estimation and progression.
 *
 * ## Overview
 * The points system uses a modified Fibonacci sequence (1, 2, 3, 5, 9, 18, 81)
 * for task complexity estimation. Higher estimates yield exponentially more XP.
 *
 * ## Components
 * - TicketCard: Visual ticket with XP display
 * - PointSlider: Interactive point selection
 * - XPMeter: Hearts-based XP visualization
 * - PointsChart: XP progression chart
 * - PointsTable: Reference table
 *
 * ## Usage
 * ```tsx
 * import {
 *   TicketCard,
 *   PointSlider,
 *   TICKET_POINT_OPTIONS
 * } from "@expanse/brand-core/game/points"
 *
 * <TicketCard
 *   title="Build Feature"
 *   ticketPoints={TICKET_POINT_OPTIONS.FIVE_POINTS}
 * />
 * ```
 */

// Re-export types and helpers from ui/points
export {
  TICKET_POINT_OPTIONS,
  TICKET_POINT_OPTIONS_LIST,
  TICKET_POINT_VALUES,
} from "expanse.ui/points"

export {
  mapTicketPointToValue,
  getPointXPLabel,
  getPointDifficultyLabel,
  TICKET_POINT_OPTIONS_MAP,
} from "expanse.ui/points"

// Components (includes re-exports from ui/points + brandCore extensions)
export * from "./components"

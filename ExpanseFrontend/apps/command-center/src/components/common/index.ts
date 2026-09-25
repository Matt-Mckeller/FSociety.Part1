/**
 * Common Components - Barrel Export
 *
 * Reusable UI components for consistency across the application.
 */

// Existing components
export { CategoryBadge, getCategoryColorConfig } from "./CategoryBadge"
export type { CategoryBadgeProps } from "./CategoryBadge"

export { CollapsibleSection } from "./CollapsibleSection"
export { SectionCard } from "./SectionCard"

// New standardized components
export { SearchInput } from "./SearchInput"
export type { SearchInputProps } from "./SearchInput"

export { StatusChip } from "./StatusChip"
export type { StatusChipProps } from "./StatusChip"

export { PriorityBadge } from "./PriorityBadge"
export type { PriorityBadgeProps } from "./PriorityBadge"

export { ProgressBar, CompactProgress } from "./ProgressBar"
export type { ProgressBarProps, CompactProgressProps } from "./ProgressBar"

export { EmptyState } from "./EmptyState"
export type { EmptyStateProps } from "./EmptyState"

export { LoadingState, LoadingIcon } from "./LoadingState"
export type { LoadingStateProps } from "./LoadingState"

export { FilterBar } from "./FilterBar"
export type { FilterBarProps } from "./FilterBar"

// Design tokens and constants
export * from "./ui-constants"

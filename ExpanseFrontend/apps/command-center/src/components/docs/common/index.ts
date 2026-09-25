/**
 * Docs Common Components
 * Reusable UI components for the documentation system
 */

// Layout components
export { DocSection } from './DocSection'
export type { DocSectionProps } from './DocSection'

export { DocGrid } from './DocGrid'
export type { DocGridProps } from './DocGrid'

// Card components
export { DocCard } from './DocCard'
export type { DocCardProps } from './DocCard'

// List components
export { DocList } from './DocList'
export type { DocListProps, DocListItem } from './DocList'

// Table components
export { DocTable } from './DocTable'
export type { DocTableProps, DocTableColumn } from './DocTable'

// Accordion/collapsible
export { DocAccordion } from './DocAccordion'
export type { DocAccordionProps } from './DocAccordion'

// Alert/callout components
export { DocAlert, DocTip, DocWarning, DocSuccess, DocError } from './DocAlert'
export type { DocAlertProps } from './DocAlert'

// Quote/blockquote
export { DocQuote } from './DocQuote'
export type { DocQuoteProps } from './DocQuote'

// Chip/badge components
export { DocChip, StatusChip, PriorityChip, CategoryChip, RarityChip, rarityColors } from './DocChip'
export type { DocChipProps } from './DocChip'

// Loading skeleton
export { DocSkeleton } from './DocSkeleton'
export type { DocSkeletonProps } from './DocSkeleton'

// Icon badge (circular color-coded icon)
export { IconBadge } from './IconBadge'
export type { IconBadgeProps } from './IconBadge'

// Hero banner (decorative gradient header)
export { RewardHero } from './RewardHero'
export type { RewardHeroProps, RewardHeroStat } from './RewardHero'

// Scroll-triggered dark -> light crossfade panel
export { NarrativeCrossfade } from './NarrativeCrossfade'
export type { NarrativeCrossfadeProps } from './NarrativeCrossfade'

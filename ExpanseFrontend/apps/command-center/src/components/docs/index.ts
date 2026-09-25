/**
 * Docs Component Exports
 *
 * Main entry point for the documentation system components.
 */

// Main view (will be refactored over time)
export { DocsView } from "./DocsView"

// Navigation component
export { DocsNavigation } from "./DocsNavigation"

// Section renderer with lazy loading support
export { SectionRenderer } from "./SectionRenderer"

// Types
export type { SectionId, NavItem, SectionCategory, SectionMeta } from "./types"

// Hooks
export { useDocsNavigation } from "./hooks"

// Common UI components
export {
  DocSection,
  DocCard,
  DocGrid,
  DocAccordion,
  DocAlert,
  DocTip,
  DocWarning,
  DocError,
  DocSuccess,
  DocList,
  DocTable,
  DocQuote,
  DocChip,
  DocSkeleton,
} from "./common"

// Registry (for advanced usage)
export {
  sectionRegistry,
  isSectionMigrated,
  getSectionMeta,
  getMigratedSections,
  getSectionsByCategory,
} from "./registry"

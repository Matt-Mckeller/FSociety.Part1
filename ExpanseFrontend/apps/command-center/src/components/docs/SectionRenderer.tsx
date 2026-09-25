/**
 * SectionRenderer - Lazy Loading Section Wrapper
 *
 * Renders either a migrated (lazy-loaded) section or falls back
 * to the legacy render function during the migration period.
 */

import { Suspense } from "react"
import { Box, Typography, Skeleton, Alert } from "@mui/material"
import type { SectionId } from "./types"
import { isSectionMigrated, getSectionMeta } from "./registry"
import { DocSkeleton } from "./common"

interface SectionRendererProps {
  /** The section to render */
  sectionId: SectionId
  /** Legacy render function for unmigrated sections (optional - all sections now migrated) */
  legacyRenderContent?: () => React.ReactNode
}

/**
 * Loading fallback for lazy-loaded sections
 */
function SectionLoadingFallback() {
  return (
    <Box>
      <Skeleton
        variant="text"
        width={300}
        height={48}
        sx={{ mb: 2 }}
        animation="wave"
      />
      <DocSkeleton variant="cards" count={6} />
    </Box>
  )
}

/**
 * Error boundary fallback
 */
function SectionErrorFallback({ sectionId }: { sectionId: string }) {
  return (
    <Alert severity="error" sx={{ mt: 2 }}>
      <Typography variant="subtitle2" fontWeight={600}>
        Failed to load section
      </Typography>
      <Typography variant="body2">
        Section &quot;{sectionId}&quot; could not be loaded. Please try
        refreshing the page.
      </Typography>
    </Alert>
  )
}

export function SectionRenderer({
  sectionId,
  legacyRenderContent,
}: SectionRendererProps) {
  // Check if section has been migrated to new architecture
  if (isSectionMigrated(sectionId)) {
    const meta = getSectionMeta(sectionId)

    if (!meta) {
      return <SectionErrorFallback sectionId={sectionId} />
    }

    const SectionComponent = meta.component

    // No header here on purpose. Each section renders its own via <DocSection>,
    // which also owns the description, actions and divider. Rendering the
    // registry title too gave every page a duplicate <h4> — and the two copies
    // had already drifted apart (registry "ExpanseEDU Highlights" vs the page's
    // "Expanse EDU Highlights"). The registry title/icon stay: they feed the
    // navigation, not the page.
    return (
      <Suspense fallback={<SectionLoadingFallback />}>
        <SectionComponent />
      </Suspense>
    )
  }

  // Fall back to legacy render for unmigrated sections
  if (legacyRenderContent) {
    return <>{legacyRenderContent()}</>
  }

  // No legacy render available - show error
  return <SectionErrorFallback sectionId={sectionId} />
}

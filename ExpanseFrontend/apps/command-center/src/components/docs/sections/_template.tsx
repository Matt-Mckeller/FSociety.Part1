/**
 * Section Template
 *
 * Use this as a starting point when migrating sections from DocsView.tsx
 * Each section should be a default export so it can be lazy-loaded.
 *
 * Migration Steps:
 * 1. Copy this template to the appropriate category folder
 * 2. Extract the render function logic from DocsView.tsx
 * 3. Replace local component definitions with common components
 * 4. Update the sectionRegistry with the new entry
 * 5. Test the section loads correctly
 * 6. Remove the old render function from DocsView.tsx (after all sections migrated)
 */

import { Typography, Grid, Card, CardContent } from "@mui/material"
import { DocSection, DocCard, DocGrid, DocAccordion, DocAlert } from "../common"

// Import data from the data layer
// import { someData } from "../../../data/docs"

// Type imports if needed
// import type { SomeType } from "../../../types/docs"

interface SectionTemplateProps {
  // Add props if needed for flexibility
}

export default function SectionTemplate(_props: SectionTemplateProps) {
  return (
    <DocSection
      title="Section Title"
      icon="🎯"
      description="Brief description of what this section covers."
    >
      {/* Example: Use DocGrid for card layouts */}
      <DocGrid columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
        <DocCard
          title="Card Title"
          description="Card description goes here"
          chips={[{ label: "Tag", color: "primary" }]}
        />
        {/* More cards... */}
      </DocGrid>

      {/* Example: Use DocAccordion for collapsible content */}
      <DocAccordion title="Expandable Section" defaultExpanded>
        <Typography variant="body1">
          Content that can be collapsed goes here.
        </Typography>
      </DocAccordion>

      {/* Example: Use DocAlert for callouts */}
      <DocAlert severity="info" title="Pro Tip">
        <Typography variant="body2">Helpful information goes here.</Typography>
      </DocAlert>

      {/* Legacy pattern (for reference during migration) */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Legacy Card Pattern</Typography>
              <Typography variant="body2">
                This shows the old pattern for comparison.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DocSection>
  )
}

// Named export for testing
export { SectionTemplate }

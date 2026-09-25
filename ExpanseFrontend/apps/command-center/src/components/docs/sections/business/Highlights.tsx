/**
 * Highlights Section
 *
 * Displays ExpanseEDU business highlights in a card grid.
 * Migrated from DocsView.tsx renderHighlights()
 */

import { Typography, Card, CardContent, Box } from "@mui/material"
import { DocSection, DocGrid } from "../../common"
import { highlights } from "../../../../data/docs"
import type { BusinessHighlight } from "../../../../types/docs"

export default function Highlights() {
  return (
    <DocSection title="Expanse EDU Highlights" icon="⭐">
      <DocGrid columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
        {(highlights as BusinessHighlight[]).map((highlight) => (
          <Card key={highlight.id} sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                {highlight.category}
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {highlight.items.map((item: string, i: number) => (
                  <Typography
                    component="li"
                    key={i}
                    variant="body2"
                    sx={{ mb: 0.5 }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </DocGrid>
    </DocSection>
  )
}

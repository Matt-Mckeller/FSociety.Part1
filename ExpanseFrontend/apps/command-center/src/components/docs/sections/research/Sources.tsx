/**
 * Sources Section
 *
 * Research sources.
 * Migrated from DocsView.tsx renderSources()
 */

import { Typography, Card, CardContent, Box, Chip } from "@mui/material"
import { DocSection, DocGrid } from "../../common"
import { research } from "../../../../data/docs"
import type { ResearchSource } from "../../../../types/docs"

export default function Sources() {
  return (
    <DocSection title="Research Sources" icon="📚">
      <DocGrid columns={{ xs: 1, md: 2 }} spacing={3}>
        {(research.sources as ResearchSource[]).map((source, index) => (
          <Card key={index} sx={{ height: "100%" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 1,
                }}
              >
                <Typography variant="h6" color="primary">
                  {source.name}
                </Typography>
                <Chip label={source.type} size="small" />
              </Box>
              {source.author && (
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  By {source.author}
                </Typography>
              )}
              {source.year && (
                <Typography variant="body2" color="text.secondary">
                  Year: {source.year}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </DocGrid>
    </DocSection>
  )
}

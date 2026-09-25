/**
 * Audience Section
 *
 * Target audiences display.
 * Migrated from DocsView.tsx renderAudience()
 */

import { Typography, Card, CardContent, Box, Chip } from "@mui/material"
import { DocSection, DocGrid } from "../../common"
import { targetAudiences } from "../../../../data/docs"
import type { TargetAudience } from "../../../../types/docs"

export default function Audience() {
  return (
    <DocSection title="Target Audiences" icon="👥">
      <DocGrid columns={{ xs: 1, md: 2 }} spacing={3}>
        {(targetAudiences as TargetAudience[]).map((audience) => (
          <Card key={audience.id} sx={{ height: "100%" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" color="primary">
                  {audience.name}
                </Typography>
                <Chip
                  label={`Priority ${audience.priority}`}
                  size="small"
                  color="primary"
                />
              </Box>
              {audience.segments && audience.segments.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Segments:
                  </Typography>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {audience.segments.map((seg) => (
                      <Chip
                        key={seg.id}
                        label={seg.name}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}
              {audience.characteristics &&
                audience.characteristics.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Characteristics:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {audience.characteristics.map(
                      (char: string, i: number) => (
                        <Typography component="li" key={i} variant="body2">
                          {char}
                        </Typography>
                      )
                    )}
                  </Box>
                </Box>
              )}
              {audience.platforms && audience.platforms.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Platforms:
                  </Typography>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {audience.platforms.map((platform: string) => (
                      <Chip
                        key={platform}
                        label={platform}
                        size="small"
                        color="secondary"
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </DocGrid>
    </DocSection>
  )
}

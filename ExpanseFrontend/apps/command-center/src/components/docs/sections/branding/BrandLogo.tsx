/**
 * Brand Logo Section
 *
 * Displays logo evolution and planned updates.
 */

import { Box, Typography, Grid, Card, CardContent, Chip } from "@mui/material"
import { expanseEduDocs } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function BrandLogo() {
  const branding = (expanseEduDocs as any).branding

  if (!branding?.logoEvolution) {
    return (
      <DocSection title="🎨 Logo Evolution">
        <Typography variant="body1" color="text.secondary">
          Logo evolution data not available.
        </Typography>
      </DocSection>
    )
  }

  return (
    <DocSection title="🎨 Logo Evolution">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Current logo status and planned updates.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Current Logo
              </Typography>
              <Typography variant="body1">
                {branding.logoEvolution.current}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{ height: "100%", borderLeft: 4, borderColor: "primary.main" }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Planned Updates
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {branding.logoEvolution.planned?.description}
              </Typography>
              <Typography variant="subtitle2" fontWeight={600}>
                Goals:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {branding.logoEvolution.planned?.goals?.map(
                  (goal: string, i: number) => (
                    <Chip key={i} label={goal} color="primary" />
                  ),
                )}
              </Box>
              <Box sx={{ mt: 2 }}>
                <Chip
                  label={`Status: ${branding.logoEvolution.planned?.status}`}
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DocSection>
  )
}

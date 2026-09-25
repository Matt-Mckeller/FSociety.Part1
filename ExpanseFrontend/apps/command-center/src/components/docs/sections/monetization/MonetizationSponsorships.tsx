/**
 * Monetization Sponsorships Section
 *
 * Displays global and local sponsorship programs.
 */

import { Box, Typography, Grid, Card, CardContent, Chip } from "@mui/material"
import { monetization } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function MonetizationSponsorships() {
  const { sponsorships } = monetization

  return (
    <DocSection title={`🤝 ${sponsorships.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {sponsorships.description}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Global Sponsors
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {sponsorships.globalSponsors.description}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                {sponsorships.globalSponsors.examples
                  .slice(0, 6)
                  .map((ex: string, i: number) => (
                    <Chip
                      key={i}
                      label={ex}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
              </Box>
              <Typography variant="caption" color="text.secondary">
                Implementation: {sponsorships.globalSponsors.implementation}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Local Sponsors
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {sponsorships.localSponsors.description}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                {sponsorships.localSponsors.examples
                  .slice(0, 6)
                  .map((ex: string, i: number) => (
                    <Chip
                      key={i}
                      label={ex}
                      size="small"
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
              </Box>
              <Typography variant="caption" color="text.secondary">
                Implementation: {sponsorships.localSponsors.implementation}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Reward Distribution
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {sponsorships.rewardDistribution.map((dist: string, i: number) => (
          <Chip key={i} label={dist} variant="outlined" />
        ))}
      </Box>
    </DocSection>
  )
}

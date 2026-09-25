/**
 * Monetization Scholarships Section
 *
 * Displays scholarship programs and essence system.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
} from "@mui/material"
import { monetization } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function MonetizationScholarships() {
  const { scholarships } = monetization

  return (
    <DocSection title={`🎓 ${scholarships.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {scholarships.description}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Scholarship Types
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {scholarships.scholarshipTypes.map(
                  (type: string, i: number) => (
                    <Chip key={i} label={type} size="small" color="primary" />
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Distribution
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {scholarships.distribution.map((dist: string, i: number) => (
                  <li key={i}>
                    <Typography variant="body2">{dist}</Typography>
                  </li>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Essence System
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {scholarships.essenceSystem.description}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {scholarships.essenceSystem.features.map(
              (feat: string, i: number) => (
                <Chip key={i} label={feat} size="small" variant="outlined" />
              )
            )}
          </Box>
        </CardContent>
      </Card>

      <Alert severity="success">
        <Typography variant="body2">
          <strong>Marketing Value:</strong> {scholarships.marketingValue}
        </Typography>
      </Alert>
    </DocSection>
  )
}

/**
 * Monetization Payments Section
 *
 * Displays payment methods, features, and compliance.
 */

import { Box, Typography, Grid, Card, CardContent, Chip } from "@mui/material"
import { monetization } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function MonetizationPayments() {
  const { payments } = monetization

  return (
    <DocSection title={`💳 ${payments.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {payments.description}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Payment Methods
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {payments.paymentMethods.map((method: string, i: number) => (
                  <Chip key={i} label={method} size="small" color="primary" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Features
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {payments.features.map((feat: string, i: number) => (
                  <li key={i}>
                    <Typography variant="body2">{feat}</Typography>
                  </li>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Compliance
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {payments.compliance.map((comp: string, i: number) => (
                  <Chip
                    key={i}
                    label={comp}
                    size="small"
                    color="success"
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DocSection>
  )
}

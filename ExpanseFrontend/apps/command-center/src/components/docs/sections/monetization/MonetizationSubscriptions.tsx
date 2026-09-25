/**
 * Monetization Subscriptions Section
 *
 * Displays subscription phases and future plans.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material"
import { monetization } from "../../../../data/docs"
import { DocSection } from "../../common"

interface SubscriptionPhase {
  phase: string
  features: string[]
}

export default function MonetizationSubscriptions() {
  const { subscriptions } = monetization

  return (
    <DocSection title={`📋 ${subscriptions.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {subscriptions.description}
      </Typography>

      {subscriptions.phases.map((phase: SubscriptionPhase, i: number) => (
        <Card key={i} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {phase.phase}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {phase.features.map((feat: string, j: number) => (
                <Chip key={j} label={feat} size="small" variant="outlined" />
              ))}
            </Box>
          </CardContent>
        </Card>
      ))}

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Future Plans
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                For Teachers
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {subscriptions.futurePlans.teachers
                  .slice(0, 5)
                  .map((feat: string, i: number) => (
                    <li key={i}>
                      <Typography variant="caption">{feat}</Typography>
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
                For Schools
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {subscriptions.futurePlans.schools
                  .slice(0, 5)
                  .map((feat: string, i: number) => (
                    <li key={i}>
                      <Typography variant="caption">{feat}</Typography>
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
                General
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {subscriptions.futurePlans.general.map(
                  (feat: string, i: number) => (
                    <li key={i}>
                      <Typography variant="caption">{feat}</Typography>
                    </li>
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DocSection>
  )
}

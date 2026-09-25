/**
 * GTM Channels Section
 *
 * Marketing channels and pricing strategy.
 * Migrated from DocsView.tsx renderGTMChannels()
 */

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Divider,
  Grid,
} from "@mui/material"
import { DocSection } from "../../common"
import { goToMarket } from "../../../../data/docs"
import type { MarketingChannelGTM } from "../../../../types/docs"

export default function GTMChannels() {
  return (
    <DocSection title="Marketing Channels" icon="📢">
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {goToMarket.channels.map((channel: MarketingChannelGTM) => (
          <Grid item xs={12} sm={6} md={4} key={channel.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6">{channel.name}</Typography>
                  <Chip
                    label={channel.priority}
                    size="small"
                    color={
                      channel.priority === "high"
                        ? "error"
                        : channel.priority === "medium"
                          ? "warning"
                          : "default"
                    }
                  />
                </Box>
                {channel.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {channel.description}
                  </Typography>
                )}
                {channel.platforms && (
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {channel.platforms.map((p, i) => (
                      <Chip key={i} label={p} size="small" variant="outlined" />
                    ))}
                  </Box>
                )}
                {channel.activities && (
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {channel.activities.map((a, i) => (
                      <Chip key={i} label={a} size="small" variant="outlined" />
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                💰 Pricing Strategy
              </Typography>
              <Typography variant="body1">
                {goToMarket.pricing.strategy}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {goToMarket.pricing.initialApproach}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                👥 Target Audience
              </Typography>
              <Typography variant="body2">
                <strong>Grades:</strong> {goToMarket.audience.targetGrades}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Approach:</strong>{" "}
                {goToMarket.audience.advertisingApproach}
              </Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                {goToMarket.audience.demographics.map((d, i) => (
                  <Chip key={i} label={d} size="small" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DocSection>
  )
}

/**
 * GTM Strategy Section
 *
 * Go-to-market strategy and approach.
 * Migrated from DocsView.tsx renderGTMStrategy()
 */

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Alert,
  Divider,
  Grid,
} from "@mui/material"
import { DocSection } from "../../common"
import { goToMarket } from "../../../../data/docs"
import type { EmotionalAppeal } from "../../../../types/docs"

export default function GTMStrategy() {
  return (
    <DocSection title="Go-to-Market Strategy" icon="🚀">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {goToMarket.overview.philosophy}
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🎯 Dual Lens Approach
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {goToMarket.strategy.dualLensApproach.description}
          </Typography>

          <Grid container spacing={2}>
            {goToMarket.strategy.dualLensApproach.emotionalAppeals.map(
              (appeal: EmotionalAppeal, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <Card
                    variant="outlined"
                    sx={{
                      bgcolor: appeal.type.includes("fear")
                        ? "error.light"
                        : "success.light",
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {appeal.type}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {appeal.purpose}
                      </Typography>
                      <Box
                        sx={{
                          mt: 1,
                          display: "flex",
                          gap: 0.5,
                          flexWrap: "wrap",
                        }}
                      >
                        {appeal.targets.map((t, j) => (
                          <Chip
                            key={j}
                            label={t}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        💬 Key Messages
      </Typography>
      <Grid container spacing={1} sx={{ mb: 3 }}>
        {goToMarket.strategy.dualLensApproach.keyMessages.map((msg, i) => (
          <Grid item xs={12} key={i}>
            <Alert severity="info" icon={false}>
              <Typography variant="body2">{msg}</Typography>
            </Alert>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        📍 Local Launch: {goToMarket.strategy.localLaunch.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {goToMarket.strategy.localLaunch.description}
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {goToMarket.strategy.localLaunch.tactics.map((t, i) => (
          <Chip key={i} label={t} variant="outlined" />
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        🌱 Organic Promotion
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {goToMarket.strategy.organicPromotion.description}
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {goToMarket.strategy.organicPromotion.mechanisms.map((m, i) => (
          <Chip key={i} label={m} color="success" variant="outlined" />
        ))}
      </Box>
    </DocSection>
  )
}

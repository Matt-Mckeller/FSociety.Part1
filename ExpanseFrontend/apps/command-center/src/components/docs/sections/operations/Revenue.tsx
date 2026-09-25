/**
 * Revenue Section
 *
 * Revenue and profit strategy.
 * Migrated from DocsView.tsx renderRevenue()
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
import { businessOperations } from "../../../../data/docs"
import type { RevenueStream, TeamNeed } from "../../../../types/docs"

export default function Revenue() {
  return (
    <DocSection title="Revenue & Profit Strategy" icon="💰">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {businessOperations.overview.marketContext}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Primary Revenue:</strong> {businessOperations.revenue.primary}
        <br />
        <strong>Strategy:</strong> {businessOperations.revenue.strategy}
      </Alert>

      <Typography variant="h5" gutterBottom>
        Revenue Streams
      </Typography>
      <Grid container spacing={2}>
        {businessOperations.revenue.streams.map((stream: RevenueStream) => (
          <Grid item xs={12} sm={6} md={4} key={stream.id}>
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
                  <Typography variant="h6">{stream.name}</Typography>
                  <Chip
                    label={stream.priority}
                    size="small"
                    color={
                      stream.priority === "high"
                        ? "error"
                        : stream.priority === "medium"
                          ? "warning"
                          : "default"
                    }
                  />
                </Box>
                <Chip
                  label={stream.status}
                  size="small"
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {stream.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        📊 Team Needs
      </Typography>
      <Grid container spacing={2}>
        {businessOperations.teamNeeds.map((need: TeamNeed, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {need.role}
                </Typography>
                {need.status && (
                  <Chip
                    label={need.status}
                    size="small"
                    sx={{ mb: 1 }}
                    color={need.status === "active" ? "success" : "warning"}
                  />
                )}
                {need.timing && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mb: 1 }}
                  >
                    {need.timing}
                  </Typography>
                )}
                <Box component="ul" sx={{ m: 0, pl: 2 }}>
                  {need.responsibilities.map((r, j) => (
                    <li key={j}>
                      <Typography variant="body2">{r}</Typography>
                    </li>
                  ))}
                </Box>
                {need.note && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: "block" }}
                  >
                    Note: {need.note}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}

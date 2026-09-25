/**
 * Competitors Section
 *
 * Competition analysis.
 * Migrated from DocsView.tsx renderCompetitors()
 */

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Divider,
  Alert,
  Grid,
} from "@mui/material"
import { DocSection, DocGrid } from "../../common"
import { competition } from "../../../../data/docs"
import type { Competitor } from "../../../../types/docs"

export default function Competitors() {
  return (
    <DocSection title="Competition Analysis" icon="🏆">
      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>{competition.overview.marketPosition}:</strong>{" "}
        {competition.overview.summary}
      </Alert>
      <DocGrid columns={{ xs: 1, md: 2 }} spacing={3}>
        {(competition.competitors as Competitor[]).map((competitor) => (
          <Card key={competitor.id} sx={{ height: "100%" }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="h6" color="primary">
                  {competitor.name}
                </Typography>
                <Chip label={competitor.category} size="small" />
              </Box>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {competitor.description}
              </Typography>
              {competitor.marketShare && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Market Share:</strong> {competitor.marketShare}
                </Typography>
              )}
              {competitor.downloads && (
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Downloads:</strong> {competitor.downloads}
                </Typography>
              )}
              {competitor.funding && competitor.funding.length > 0 && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle2">Funding:</Typography>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {competitor.funding.map((f) => (
                      <Chip
                        key={f.round}
                        label={`${f.round}: ${f.amount} (${f.year})`}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}
              <Divider sx={{ my: 1 }} />
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="success.main">
                    Strengths
                  </Typography>
                  {competitor.strengths.map((s, i) => (
                    <Typography key={i} variant="caption" display="block">
                      • {s}
                    </Typography>
                  ))}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="error.main">
                    Weaknesses
                  </Typography>
                  {competitor.weaknesses.map((w, i) => (
                    <Typography key={i} variant="caption" display="block">
                      • {w}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </DocGrid>
    </DocSection>
  )
}

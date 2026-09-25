/**
 * Risk Analysis Section
 *
 * Risk assessment and mitigations.
 * Migrated from DocsView.tsx renderRiskAnalysis()
 */

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Alert,
  Grid,
} from "@mui/material"
import { DocSection } from "../../common"
import { risks } from "../../../../data/docs"
import type { Risk } from "../../../../types/docs"

export default function RiskAnalysis() {
  return (
    <DocSection title="Risk Analysis" icon="⚠️">
      <Grid container spacing={3}>
        {(risks.risks as Risk[]).map((risk) => (
          <Grid item xs={12} key={risk.id}>
            <Card>
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
                    {risk.title}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Chip label={risk.category} size="small" />
                    <Chip
                      label={risk.severity}
                      size="small"
                      color={
                        risk.severity === "high"
                          ? "error"
                          : risk.severity === "medium"
                            ? "warning"
                            : "success"
                      }
                    />
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  <strong>Question:</strong> {risk.question}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Response:</strong> {risk.response}
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <strong>Impact:</strong> {risk.impact}
                </Alert>
                <Typography variant="subtitle2" gutterBottom>
                  Mitigations:
                </Typography>
                <Box component="ul" sx={{ pl: 2, m: 0 }}>
                  {risk.mitigations.map((m, i) => (
                    <Typography component="li" key={i} variant="body2">
                      {m}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}

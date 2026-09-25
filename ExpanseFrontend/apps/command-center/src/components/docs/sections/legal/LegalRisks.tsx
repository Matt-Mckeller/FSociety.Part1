/**
 * Legal Risks Section
 *
 * Legal risk assessment.
 * Migrated from DocsView.tsx renderLegalRisks()
 */

import { Typography, Card, CardContent, Box, Chip, Grid } from "@mui/material"
import { DocSection } from "../../common"
import { legal } from "../../../../data/docs"
import type { LegalRisk } from "../../../../types/docs"

export default function LegalRisks() {
  return (
    <DocSection title="Legal Risks" icon="⚠️">
      <Grid container spacing={2}>
        {legal.legalRisks.map((risk: LegalRisk) => (
          <Grid item xs={12} key={risk.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {risk.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  <strong>Question:</strong> {risk.question}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {risk.response}
                </Typography>
                <Box
                  sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}
                >
                  <Typography variant="body2">
                    <strong>Impact:</strong>
                  </Typography>
                  <Chip
                    label={risk.impact}
                    size="small"
                    color={
                      risk.impact === "None"
                        ? "success"
                        : risk.impact.includes("minimal")
                          ? "info"
                          : "warning"
                    }
                  />
                </Box>
                <Typography variant="subtitle2" gutterBottom>
                  Mitigations:
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {risk.mitigations.map((m, i) => (
                    <Chip
                      key={i}
                      label={m}
                      size="small"
                      variant="outlined"
                      color="success"
                    />
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

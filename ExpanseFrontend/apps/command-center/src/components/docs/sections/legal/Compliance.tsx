/**
 * Compliance Section
 *
 * Compliance requirements and DPA information.
 * Migrated from DocsView.tsx renderCompliance()
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
import { legal } from "../../../../data/docs"
import type { ComplianceRequirement } from "../../../../types/docs"

export default function Compliance() {
  return (
    <DocSection title="Compliance Requirements" icon="⚖️">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {legal.overview.summary}
      </Typography>

      <Grid container spacing={2}>
        {legal.compliance.map((req: ComplianceRequirement) => (
          <Grid item xs={12} md={6} key={req.id}>
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
                  <Typography variant="h6">{req.name}</Typography>
                  <Chip
                    label={req.status}
                    size="small"
                    color={req.status === "research" ? "warning" : "success"}
                  />
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mb: 1 }}
                >
                  {req.fullName}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {req.description}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Requirements:
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2 }}>
                  {req.requirements.map((r, i) => (
                    <li key={i}>
                      <Typography variant="body2">{r}</Typography>
                    </li>
                  ))}
                </Box>
                {req.source && (
                  <Typography
                    variant="caption"
                    color="primary"
                    sx={{ mt: 1, display: "block" }}
                  >
                    <a
                      href={req.source}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📚 Reference
                    </a>
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        📋 DPA Requirements
      </Typography>
      <Card>
        <CardContent>
          <Chip
            label={legal.dpaRequirements.status}
            size="small"
            color="warning"
            sx={{ mb: 2 }}
          />
          <Typography variant="body1" sx={{ mb: 2 }}>
            {legal.dpaRequirements.description}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Action Items:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            {legal.dpaRequirements.actions.map((action, i) => (
              <li key={i}>
                <Typography variant="body2">{action}</Typography>
              </li>
            ))}
          </Box>
        </CardContent>
      </Card>
    </DocSection>
  )
}

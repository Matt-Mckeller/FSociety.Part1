/**
 * Exits Section
 *
 * Exit strategy and potential acquisitions.
 * Migrated from DocsView.tsx renderExits()
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
  Tooltip,
} from "@mui/material"
import { DocSection } from "../../common"
import { businessOperations } from "../../../../data/docs"
import type { ExitOption } from "../../../../types/docs"

export default function Exits() {
  return (
    <DocSection title="Exit Strategy" icon="🚪">
      <Alert severity="success" sx={{ mb: 3 }}>
        <strong>Philosophy:</strong> {businessOperations.exits.philosophy}
      </Alert>
      <Typography variant="h6" gutterBottom>
        Preferred:{" "}
        <Chip label={businessOperations.exits.preferred} color="primary" />
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Potential Exit Options
      </Typography>
      <Grid container spacing={2}>
        {businessOperations.exits.options.map((option: ExitOption) => (
          <Grid item xs={12} sm={6} key={option.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {option.name}
                </Typography>
                <Chip
                  label={option.likelihood}
                  size="small"
                  sx={{ mb: 1 }}
                  color={
                    option.likelihood === "high"
                      ? "success"
                      : option.likelihood === "medium"
                        ? "warning"
                        : "default"
                  }
                />
                <Typography variant="body2" color="text.secondary">
                  {option.description}
                </Typography>
                {option.note && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 1, display: "block" }}
                  >
                    ({option.note})
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        🛒 Potential Acquisitions
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {businessOperations.acquisitions.philosophy}
      </Typography>
      {businessOperations.acquisitions.potentialTargets.map((category, i) => (
        <Box key={i} sx={{ mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {category.category}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
            {category.targets.map((t, j) => (
              <Tooltip key={j} title={t.note || ""}>
                <Chip label={t.type || t.name} variant="outlined" />
              </Tooltip>
            ))}
          </Box>
        </Box>
      ))}
    </DocSection>
  )
}

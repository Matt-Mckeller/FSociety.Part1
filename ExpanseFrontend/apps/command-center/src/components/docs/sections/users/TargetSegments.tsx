/**
 * Target Segments Section
 *
 * Target grades, school types, and geographic expansion.
 * Migrated from DocsView.tsx renderTargetSegments()
 */

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Grid,
} from "@mui/material"
import { DocSection } from "../../common"
import { users } from "../../../../data/docs"

export default function TargetSegments() {
  return (
    <DocSection title="Target Segments" icon="🎯">
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Primary Grades
          </Typography>
          <Typography variant="h5">
            {users.targetSegments.grades.primary}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {users.targetSegments.grades.rationale}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        🏫 School Types
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {users.targetSegments.schoolTypes.map((type, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card>
              <CardContent sx={{ py: 1.5 }}>
                <Typography variant="body2">• {type}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom>
        🌍 Geographic Expansion
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {users.targetSegments.geographicExpansion.map((geo, i) => (
          <Chip
            key={i}
            label={geo}
            color="primary"
            variant={i === 0 ? "filled" : "outlined"}
          />
        ))}
      </Box>
    </DocSection>
  )
}

/**
 * Ideation Priority Matrix Section
 *
 * Displays features organized by implementation timeline.
 */

import { Box, Typography, Grid, Card, CardContent, Chip } from "@mui/material"
import { ideation } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function IdeationPriorityMatrix() {
  return (
    <DocSection title="📊 Priority Matrix">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Features organized by implementation timeline
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "success.light", height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                🟢 Near Term
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Ready for implementation soon
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {ideation.priorityMatrix.nearTerm.map((id: string) => {
                  const feature = ideation.features.find((f) => f.id === id)
                  return feature ? (
                    <Chip key={id} label={feature.name} color="success" />
                  ) : null
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "info.light", height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                🔵 Medium Term
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Planned for later phases
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {ideation.priorityMatrix.mediumTerm.map((id: string) => {
                  const feature = ideation.features.find((f) => f.id === id)
                  return feature ? (
                    <Chip key={id} label={feature.name} color="info" />
                  ) : null
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "warning.light", height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                🟡 Long Term
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Future considerations
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {ideation.priorityMatrix.longTerm.map((id: string) => {
                  const feature = ideation.features.find((f) => f.id === id)
                  return feature ? (
                    <Chip key={id} label={feature.name} color="warning" />
                  ) : null
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: "grey.200", height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                🧪 Experimental
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Requires further exploration
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {ideation.priorityMatrix.experimental.map((id: string) => {
                  const feature = ideation.features.find((f) => f.id === id)
                  return feature ? (
                    <Chip key={id} label={feature.name} variant="outlined" />
                  ) : null
                })}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DocSection>
  )
}

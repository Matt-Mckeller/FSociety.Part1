/**
 * Communication Authentication Section
 *
 * Displays authentication methods and security features.
 */

import { Box, Typography, Grid, Card, CardContent, Chip } from "@mui/material"
import { communication } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function CommAuth() {
  const { authentication } = communication

  return (
    <DocSection title={`🔐 ${authentication.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {authentication.description}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Student & Teacher Authentication
              </Typography>
              <Chip
                label={authentication.studentTeacherAuth.method}
                color="primary"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" sx={{ mb: 2 }}>
                {authentication.studentTeacherAuth.description}
              </Typography>
              <Typography variant="subtitle2" fontWeight={600}>
                Supported Systems:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                {authentication.studentTeacherAuth.supportedSystems.map(
                  (sys: string, i: number) => (
                    <Chip key={i} label={sys} size="small" variant="outlined" />
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Parent Authentication
              </Typography>
              <Chip
                label={authentication.parentAuth.method}
                color="secondary"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" sx={{ mb: 2 }}>
                {authentication.parentAuth.description}
              </Typography>
              <Typography variant="subtitle2" fontWeight={600}>
                Features:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
                {authentication.parentAuth.features.map(
                  (feat: string, i: number) => (
                    <Chip
                      key={i}
                      label={feat}
                      size="small"
                      variant="outlined"
                    />
                  )
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom fontWeight={600}>
        Security Features
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {authentication.security.map((sec: string, i: number) => (
          <Chip key={i} label={sec} color="success" />
        ))}
      </Box>
    </DocSection>
  )
}

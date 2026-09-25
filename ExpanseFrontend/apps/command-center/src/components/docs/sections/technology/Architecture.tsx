/**
 * Architecture Section
 *
 * System architecture patterns and services.
 * Migrated from DocsView.tsx renderArchitecture()
 */

import { Typography, Card, CardContent, Box, Chip, Alert, Grid } from "@mui/material"
import { DocSection, DocGrid } from "../../common"
import { technology } from "../../../../data/docs"
import type { ArchitecturePattern, ObservabilityItem } from "../../../../types/docs"

export default function Architecture() {
  return (
    <DocSection title="Architecture" icon="🏛️">
      <Alert severity="info" sx={{ mb: 3 }}>
        {technology.architecture.overview}
      </Alert>

      <Typography variant="h5" gutterBottom>
        📐 Patterns
      </Typography>
      <DocGrid columns={{ xs: 1, md: 2 }} spacing={3}>
        {(technology.architecture.patterns as ArchitecturePattern[]).map(
          (pattern) => (
            <Card key={pattern.name} sx={{ height: "100%" }}>
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
                    {pattern.name}
                  </Typography>
                  <Chip
                    label={pattern.status}
                    size="small"
                    color={pattern.status === "current" ? "success" : "default"}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {pattern.description}
                </Typography>
              </CardContent>
            </Card>
          )
        )}
      </DocGrid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        🔧 Services
      </Typography>
      <Grid container spacing={2}>
        {technology.architecture.services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.name}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {service.name}
                  </Typography>
                  <Chip
                    label={service.status}
                    size="small"
                    color={service.status === "current" ? "success" : "default"}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        📊 Observability
      </Typography>
      <DocGrid columns={{ xs: 1, sm: 2 }} spacing={2}>
        {(technology.observability as ObservabilityItem[]).map((item) => (
          <Card key={item.name}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="primary"
                >
                  {item.name}
                </Typography>
                <Chip
                  label={item.status}
                  size="small"
                  color={item.status === "current" ? "success" : "default"}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </DocGrid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        🚀 Implementation Status
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main" gutterBottom>
                ✅ Implemented
              </Typography>
              {technology.status.implemented.map((item, i) => (
                <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                  • {item}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="warning.main" gutterBottom>
                🔄 In Progress
              </Typography>
              {technology.status.inProgress.map((item, i) => (
                <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                  • {item}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="info.main" gutterBottom>
                📋 Planned
              </Typography>
              {technology.status.planned.map((item, i) => (
                <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                  • {item}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DocSection>
  )
}

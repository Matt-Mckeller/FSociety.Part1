/**
 * Ideation Overview Section
 *
 * Displays feature categories and all features.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
} from "@mui/material"
import { ideation } from "../../../../data/docs"
import { DocSection, DocAccordion } from "../../common"

export default function IdeationOverview() {
  return (
    <DocSection title={`💡 ${ideation.overview.title}`}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {ideation.overview.description}
      </Typography>

      <DocAccordion title="📂 Feature Categories" defaultExpanded>
        <Grid container spacing={2}>
          {ideation.overview.categories.map((cat) => (
            <Grid item xs={12} md={6} lg={4} key={cat.id}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": { transform: "translateY(-2px)", boxShadow: 3 },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {cat.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cat.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DocAccordion>

      <DocAccordion
        title={`🚀 All Features (${ideation.features.length})`}
        defaultExpanded={false}
      >
        <Grid container spacing={2}>
          {ideation.features.map((feature) => (
            <Grid item xs={12} md={6} key={feature.id}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": { transform: "translateY(-2px)", boxShadow: 3 },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      {feature.name}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Chip
                        label={feature.priority}
                        size="small"
                        color={
                          feature.priority === "high"
                            ? "error"
                            : feature.priority === "medium"
                              ? "warning"
                              : "default"
                        }
                      />
                      <Chip
                        label={feature.status}
                        size="small"
                        color={
                          feature.status === "planned"
                            ? "success"
                            : feature.status === "exploration"
                              ? "info"
                              : "default"
                        }
                      />
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {feature.description}
                  </Typography>
                  {feature.valueProposition && (
                    <Alert severity="success" sx={{ mt: 1 }}>
                      <Typography variant="body2">
                        <strong>Value:</strong> {feature.valueProposition}
                      </Typography>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DocAccordion>
    </DocSection>
  )
}

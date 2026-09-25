/**
 * KCPS Special Education Section
 *
 * Special education insights and brain development observations.
 */

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Grid,
  Divider,
  Alert,
} from "@mui/material"
import { DocSection } from "../../common"
import { caseStudies } from "../../../../data/docs"
import type {
  SpecialEdInsight,
  BrainDevelopmentVariable,
} from "../../../../types/docs"

export default function KCPSSpecialEd() {
  const insights = (caseStudies.specialEdInsights || []) as SpecialEdInsight[]
  const brainVariables = (caseStudies.brainDevelopmentVariables ||
    []) as BrainDevelopmentVariable[]

  return (
    <DocSection title="Special Education Insights" icon="🧠">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Observations from special education environments revealing diverse
        learning needs and development patterns.
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          These insights come from direct observation at Lee Summit Central
          School, a school serving students with special learning and attention
          needs.
        </Typography>
      </Alert>

      {/* Key Insights */}
      <Typography variant="h5" gutterBottom>
        Key Observations
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {insights.map((insight) => (
          <Grid item xs={12} md={6} key={insight.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {insight.observation}
                </Typography>

                {insight.student && (
                  <Chip
                    label={`Student: ${insight.student}`}
                    size="small"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                )}

                <Box
                  sx={{
                    bgcolor: "action.hover",
                    p: 1.5,
                    borderRadius: 1,
                    mt: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    <strong>Implication:</strong> {insight.implication}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Brain Development Variables */}
      <Typography variant="h5" gutterBottom>
        Brain Development Variables Observed
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Different cognitive and developmental areas observed to vary
        significantly between students.
      </Typography>

      <Grid container spacing={1}>
        {brainVariables.map((variable) => (
          <Grid item xs={12} sm={6} md={4} key={variable.id}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
                <Typography variant="subtitle2" gutterBottom>
                  {variable.name}
                </Typography>

                {variable.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {variable.description}
                  </Typography>
                )}

                {variable.observations && variable.observations.length > 0 && (
                  <Box>
                    {variable.observations.map((obs, i) => (
                      <Typography
                        key={i}
                        variant="caption"
                        color="text.secondary"
                        component="div"
                      >
                        • {obs}
                      </Typography>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Key Takeaways */}
      <Typography variant="h5" gutterBottom>
        Key Takeaways
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Alert severity="success">
          <Typography variant="body2">
            <strong>Non-verbal activities</strong> can build connection before
            verbal communication is comfortable (e.g., collaborative drawing)
          </Typography>
        </Alert>
        <Alert severity="success">
          <Typography variant="body2">
            <strong>Physical/tactile input</strong> can be calming for students
            who struggle with verbal self-regulation
          </Typography>
        </Alert>
        <Alert severity="warning">
          <Typography variant="body2">
            <strong>Strengths in one area</strong> don't predict abilities in
            others - individualized assessment is essential
          </Typography>
        </Alert>
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Positive language</strong> has lasting impact even on
            seemingly disengaged students
          </Typography>
        </Alert>
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Simple activities</strong> like coloring can serve as
            informal developmental assessments
          </Typography>
        </Alert>
      </Box>
    </DocSection>
  )
}

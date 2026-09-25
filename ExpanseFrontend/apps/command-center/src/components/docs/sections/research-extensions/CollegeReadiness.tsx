/**
 * College Readiness Section
 *
 * Displays research on college readiness and dropout factors.
 */

import { Typography, Grid, Card, CardContent, Alert } from "@mui/material"
import { researchExtensions } from "../../../../data/docs"
import { DocSection } from "../../common"

interface CollegeConcern {
  concern: string
  description: string
}

interface DropoutFactor {
  factor: string
  description: string
}

export default function CollegeReadiness() {
  const { collegeReadiness } = researchExtensions

  return (
    <DocSection title={`🎓 ${collegeReadiness.title}`}>
      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="body2" fontWeight={600}>
          {collegeReadiness.overview.summary}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ mt: 1 }}
        >
          Source: {collegeReadiness.overview.source}
        </Typography>
      </Alert>

      <Typography variant="h6" gutterBottom>
        Key Concerns
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {collegeReadiness.keyConcerns.map(
          (concern: CollegeConcern, i: number) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    {concern.concern}
                  </Typography>
                  <Typography variant="body2">{concern.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ),
        )}
      </Grid>

      <Typography variant="h6" gutterBottom>
        Dropout Factors
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {collegeReadiness.dropoutFactors.map(
          (factor: DropoutFactor, i: number) => (
            <Grid item xs={12} md={4} key={i}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {factor.factor}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {factor.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ),
        )}
      </Grid>

      <Typography variant="h6" gutterBottom>
        Pandemic Impact
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {Object.entries(collegeReadiness.pandemicImpact).map(([key, value]) => (
          <Grid item xs={12} md={6} key={key}>
            <Card>
              <CardContent>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{ textTransform: "capitalize" }}
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </Typography>
                <Typography variant="body2">{value as string}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Alert severity="success">
        <Typography variant="body2" fontWeight={600}>
          Expanse Relevance
        </Typography>
        <Typography variant="body2">
          {collegeReadiness.expanseRelevance}
        </Typography>
      </Alert>
    </DocSection>
  )
}

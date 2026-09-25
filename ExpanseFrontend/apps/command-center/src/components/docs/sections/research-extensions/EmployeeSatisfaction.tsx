/**
 * Employee Satisfaction Section
 *
 * Displays employee satisfaction research with educational parallels.
 */

import {
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Box,
} from "@mui/material"
import { researchExtensions } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function EmployeeSatisfaction() {
  const { employeeSatisfaction } = researchExtensions

  return (
    <DocSection title={`😊 ${employeeSatisfaction.title}`}>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          {employeeSatisfaction.overview.summary}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Relevance:</strong> {employeeSatisfaction.overview.relevance}
        </Typography>
      </Alert>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Happiness & Goals
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {employeeSatisfaction.happinessAndGoals.description}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Benefits:
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {employeeSatisfaction.happinessAndGoals.benefits.map(
                  (b: string, i: number) => (
                    <li key={i}>
                      <Typography variant="body2">{b}</Typography>
                    </li>
                  ),
                )}
              </Box>
              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Expanse Application:</strong>{" "}
                  {employeeSatisfaction.happinessAndGoals.expanseApplication}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Impact on Work
              </Typography>
              <Chip
                label={employeeSatisfaction.impactOnWork.keyStatistic}
                color="success"
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" sx={{ mb: 2 }}>
                {employeeSatisfaction.impactOnWork.summary}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2 }}>
                {employeeSatisfaction.impactOnWork.benefits.map(
                  (b: string, i: number) => (
                    <li key={i}>
                      <Typography variant="body2">{b}</Typography>
                    </li>
                  ),
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {employeeSatisfaction.gallupResearch.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {employeeSatisfaction.gallupResearch.description}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Key Findings:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2, mb: 2 }}>
            {employeeSatisfaction.gallupResearch.keyFindings.map(
              (f: string, i: number) => (
                <li key={i}>
                  <Typography variant="body2">{f}</Typography>
                </li>
              ),
            )}
          </Box>
          <Typography variant="subtitle2" gutterBottom>
            Engagement Differences:
          </Typography>
          <Grid container spacing={1}>
            {Object.entries(
              employeeSatisfaction.gallupResearch.engagementDifferences,
            ).map(([key, value]) => (
              <Grid item xs={6} md={4} key={key}>
                <Chip
                  label={`${key}: ${value}`}
                  variant="outlined"
                  sx={{ width: "100%" }}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Oxford Study
          </Typography>
          <Chip
            label={employeeSatisfaction.oxfordStudy.finding}
            color="primary"
            sx={{ mb: 2 }}
          />
          <Typography variant="body2">
            {employeeSatisfaction.oxfordStudy.methodology}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mt: 1 }}
          >
            Source: {employeeSatisfaction.oxfordStudy.source}
          </Typography>
        </CardContent>
      </Card>
    </DocSection>
  )
}

/**
 * Purpose & Mission Section
 *
 * Displays purpose and mission mentality research.
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Paper,
} from "@mui/material"
import { learningScience } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function PurposeMission() {
  const { purposeAndMission } = learningScience

  return (
    <DocSection title={`🚀 ${purposeAndMission.title}`}>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="body1" fontSize="1.1rem">
          "{purposeAndMission.overview.summary}"
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom>
        {purposeAndMission.jobVsMission.title}
      </Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", borderLeft: 4, borderColor: "grey.500" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                💼 Job Mentality
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Mindset:</strong>{" "}
                {purposeAndMission.jobVsMission.comparison.job.mindset}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Motivation:</strong>{" "}
                {purposeAndMission.jobVsMission.comparison.job.motivation}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Engagement:</strong>{" "}
                {purposeAndMission.jobVsMission.comparison.job.engagement}
              </Typography>
              <Alert severity="warning" sx={{ mt: 1 }}>
                <Typography variant="body2">
                  <strong>Outcome:</strong>{" "}
                  {purposeAndMission.jobVsMission.comparison.job.outcome}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{ height: "100%", borderLeft: 4, borderColor: "success.main" }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🎯 Mission Mentality
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Mindset:</strong>{" "}
                {purposeAndMission.jobVsMission.comparison.mission.mindset}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Motivation:</strong>{" "}
                {purposeAndMission.jobVsMission.comparison.mission.motivation}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Engagement:</strong>{" "}
                {purposeAndMission.jobVsMission.comparison.mission.engagement}
              </Typography>
              <Alert severity="success" sx={{ mt: 1 }}>
                <Typography variant="body2">
                  <strong>Outcome:</strong>{" "}
                  {purposeAndMission.jobVsMission.comparison.mission.outcome}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body1">
          {purposeAndMission.jobVsMission.implication}
        </Typography>
      </Alert>

      <Typography variant="h5" gutterBottom>
        {purposeAndMission.expansePurpose.title}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {purposeAndMission.expansePurpose.approach.map(
          (a: string, i: number) => (
            <Chip key={i} label={a} color="success" />
          ),
        )}
      </Box>
    </DocSection>
  )
}

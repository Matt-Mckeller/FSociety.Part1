/**
 * Learning Reinforcement Section
 *
 * Displays positive vs negative reinforcement research.
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
import { learningScience } from "../../../../data/docs"
import { DocSection } from "../../common"

interface ReinforcementBenefit {
  benefit: string
  description: string
  mechanism: string
}

export default function LearningReinforcement() {
  const { positiveReinforcement } = learningScience

  return (
    <DocSection title={`✅ ${positiveReinforcement.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {positiveReinforcement.overview.summary}
      </Typography>

      <Typography variant="h5" gutterBottom>
        Benefits of Positive Reinforcement
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {(positiveReinforcement.benefits as ReinforcementBenefit[]).map(
          (b, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {b.benefit}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {b.description}
                  </Typography>
                  <Chip
                    label={b.mechanism}
                    size="small"
                    color="info"
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            </Grid>
          ),
        )}
      </Grid>

      <Typography variant="h5" gutterBottom>
        {positiveReinforcement.vsNegativeReinforcement.title}
      </Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{ height: "100%", borderLeft: 4, borderColor: "success.main" }}
          >
            <CardContent>
              <Typography variant="h6" color="success.main" gutterBottom>
                Positive Reinforcement
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Approach:</strong>{" "}
                {
                  positiveReinforcement.vsNegativeReinforcement.positive
                    .approach
                }
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Effect:</strong>{" "}
                {positiveReinforcement.vsNegativeReinforcement.positive.effect}
              </Typography>
              <Alert severity="success" sx={{ mt: 1 }}>
                <Typography variant="body2">
                  <strong>Outcome:</strong>{" "}
                  {
                    positiveReinforcement.vsNegativeReinforcement.positive
                      .outcome
                  }
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{ height: "100%", borderLeft: 4, borderColor: "error.main" }}
          >
            <CardContent>
              <Typography variant="h6" color="error.main" gutterBottom>
                Negative Reinforcement
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Approach:</strong>{" "}
                {
                  positiveReinforcement.vsNegativeReinforcement.negative
                    .approach
                }
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Effect:</strong>{" "}
                {positiveReinforcement.vsNegativeReinforcement.negative.effect}
              </Typography>
              <Alert severity="error" sx={{ mt: 1 }}>
                <Typography variant="body2">
                  <strong>Outcome:</strong>{" "}
                  {
                    positiveReinforcement.vsNegativeReinforcement.negative
                      .outcome
                  }
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        {positiveReinforcement.expanseImplementation.title}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {positiveReinforcement.expanseImplementation.methods.map(
          (m: string, i: number) => (
            <Chip key={i} label={m} color="primary" />
          ),
        )}
      </Box>
    </DocSection>
  )
}

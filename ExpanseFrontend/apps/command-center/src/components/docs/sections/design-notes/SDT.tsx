/**
 * Self-Determination Theory (SDT) Section
 *
 * Displays SDT research and psychological foundations.
 */

import {
  Typography,
  Grid,
  Card,
  CardContent,
  Alert,
  Divider,
} from "@mui/material"
import { designNotes } from "../../../../data/docs"
import { DocSection } from "../../common"

interface SDTNeed {
  need: string
  description: string
  expanseApplication: string
}

export default function SDT() {
  const { selfDeterminationTheory } = designNotes

  return (
    <DocSection title={`🧠 ${selfDeterminationTheory.title}`}>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {selfDeterminationTheory.overview.summary}
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ mb: 3 }}
      >
        Source: {selfDeterminationTheory.overview.source}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Core Needs
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {selfDeterminationTheory.coreNeeds.map(
          (need: SDTNeed, i: number) => (
            <Grid item xs={12} md={4} key={i}>
              <Card
                sx={{
                  height: "100%",
                  bgcolor:
                    i === 0
                      ? "primary.dark"
                      : i === 1
                        ? "success.dark"
                        : "warning.dark",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {need.need}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {need.description}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle2">
                    Expanse Implementation:
                  </Typography>
                  <Typography variant="body2">
                    {need.expanseApplication}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {selfDeterminationTheory.cognitiveEvaluationTheory.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {selfDeterminationTheory.cognitiveEvaluationTheory.description}
          </Typography>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <Typography variant="body2">
              {selfDeterminationTheory.cognitiveEvaluationTheory.keyInsight}
            </Typography>
          </Alert>
          <Alert severity="success">
            <Typography variant="body2">
              <strong>Expanse Design:</strong>{" "}
              {selfDeterminationTheory.cognitiveEvaluationTheory.expanseDesign}
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Competence Research
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {selfDeterminationTheory.competenceResearch.finding}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Mechanism:</strong>{" "}
            {selfDeterminationTheory.competenceResearch.mechanism}
          </Typography>
          <Alert severity="error" sx={{ mb: 1 }}>
            <Typography variant="body2">
              {selfDeterminationTheory.competenceResearch.negativeEffect}
            </Typography>
          </Alert>
          <Alert severity="info">
            <Typography variant="body2">
              {selfDeterminationTheory.competenceResearch.implication}
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Additional Benefits
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {selfDeterminationTheory.additionalBenefits.description}
          </Typography>
          <Typography variant="body2">
            <strong>Feedback Effect:</strong>{" "}
            {selfDeterminationTheory.additionalBenefits.feedbackEffect}
          </Typography>
        </CardContent>
      </Card>
    </DocSection>
  )
}

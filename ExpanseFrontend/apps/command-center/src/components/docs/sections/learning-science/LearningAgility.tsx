/**
 * Learning Agility Section
 *
 * Displays learning agility research and benefits.
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

interface AgilityBenefit {
  benefit: string
  description: string
}

export default function LearningAgility() {
  const { learningAgility } = learningScience

  return (
    <DocSection title={`🔄 ${learningAgility.title}`}>
      <Paper sx={{ p: 3, mb: 3, bgcolor: "warning.light" }}>
        <Typography variant="h6" gutterBottom>
          Key Question
        </Typography>
        <Typography variant="body1" fontStyle="italic">
          "{learningAgility.overview.keyQuestion}"
        </Typography>
      </Paper>

      <Typography variant="body1" sx={{ mb: 3 }}>
        {learningAgility.overview.summary}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {learningAgility.offTheShelfProblem.title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {learningAgility.offTheShelfProblem.description}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                🍗 Food Analogy
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {learningAgility.offTheShelfProblem.foodAnalogy.example}
              </Typography>
              <Alert severity="info">
                <Typography variant="body2">
                  {learningAgility.offTheShelfProblem.foodAnalogy.lesson}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                💻 Software Analogy
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {learningAgility.offTheShelfProblem.softwareAnalogy.example}
              </Typography>
              <Alert severity="info">
                <Typography variant="body2">
                  {learningAgility.offTheShelfProblem.softwareAnalogy.lesson}
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        {learningAgility.understandingCore.title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {learningAgility.understandingCore.description}
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Example: Understanding Chicken
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            {learningAgility.understandingCore.chickenExample.ingredients.map(
              (ing: string, i: number) => (
                <Chip key={i} label={ing} variant="outlined" />
              ),
            )}
          </Box>
          <Typography variant="subtitle2" gutterBottom>
            Questions to Ask:
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3, mb: 2 }}>
            {learningAgility.understandingCore.chickenExample.questions.map(
              (q: string, i: number) => (
                <li key={i}>
                  <Typography variant="body2">{q}</Typography>
                </li>
              ),
            )}
          </Box>
          <Alert severity="success">
            <Typography variant="body2">
              {learningAgility.understandingCore.chickenExample.outcome}
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>
        {learningAgility.benefitsOfMastery.title}
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {(learningAgility.benefitsOfMastery.benefits as AgilityBenefit[]).map(
          (b, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ height: "100%", textAlign: "center" }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {b.benefit}
                  </Typography>
                  <Typography variant="body2">{b.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ),
        )}
      </Grid>

      <Paper
        sx={{ p: 3, bgcolor: "primary.main", color: "primary.contrastText" }}
      >
        <Typography variant="h6" gutterBottom>
          Key Question
        </Typography>
        <Typography variant="body1">
          "{learningAgility.keyQuestion.question}"
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
          {learningAgility.keyQuestion.implication}
        </Typography>
      </Paper>
    </DocSection>
  )
}

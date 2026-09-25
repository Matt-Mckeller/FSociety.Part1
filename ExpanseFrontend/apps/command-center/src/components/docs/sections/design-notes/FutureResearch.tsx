/**
 * Future Research Topics Section
 *
 * Displays topics and questions for further research.
 */

import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Alert,
  Paper,
} from "@mui/material"
import { designNotes } from "../../../../data/docs"
import { DocSection } from "../../common"

export default function FutureResearch() {
  const { topicsForFurtherResearch } = designNotes

  return (
    <DocSection title={`🔍 ${topicsForFurtherResearch.title}`}>
      <Typography variant="h6" gutterBottom>
        Keywords to Explore
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 3 }}>
        {topicsForFurtherResearch.keywords.map((keyword: string, i: number) => (
          <Chip key={i} label={keyword} size="small" variant="outlined" />
        ))}
      </Box>

      <Typography variant="h6" gutterBottom>
        Research Questions
      </Typography>
      <Paper sx={{ p: 2, mb: 3, bgcolor: "action.hover" }}>
        <Box component="ul" sx={{ m: 0, pl: 2 }}>
          {topicsForFurtherResearch.researchQuestions.map(
            (q: string, i: number) => (
              <li key={i}>
                <Typography variant="body2">{q}</Typography>
              </li>
            )
          )}
        </Box>
      </Paper>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Customization Insights
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {topicsForFurtherResearch.customization.insight}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Human Need:</strong>{" "}
            {topicsForFurtherResearch.customization.humanNeed}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Design Question:</strong>{" "}
            {topicsForFurtherResearch.customization.designQuestion}
          </Typography>
          <Alert severity="success">
            <Typography variant="body2">
              <strong>Solution:</strong>{" "}
              {topicsForFurtherResearch.customization.solution}
            </Typography>
          </Alert>
        </CardContent>
      </Card>
    </DocSection>
  )
}

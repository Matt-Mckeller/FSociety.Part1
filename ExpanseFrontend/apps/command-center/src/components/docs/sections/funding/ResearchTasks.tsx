/**
 * Research Tasks Section
 *
 * Pending research questions and investment notes.
 * Migrated from DocsView.tsx renderResearchTasks()
 */

import { Typography, Card, CardContent, Box, Chip, Grid } from "@mui/material"
import { DocSection, DocAccordion } from "../../common"
import { funding } from "../../../../data/docs"

interface ResearchTask {
  id: string
  question: string
  why?: string
  status: string
  priority: string
}

interface InvestmentNotes {
  shield4?: {
    potential: string
    clarificationNeeded: string
    targetProblem: string
    status: string
  }
}

export default function ResearchTasks() {
  const fundingData = funding as {
    researchTasks?: ResearchTask[]
    investmentNotes?: InvestmentNotes
  }

  return (
    <DocSection title="Research Tasks" icon="🔬">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Pending research questions and tasks to inform business decisions.
      </Typography>

      <DocAccordion
        title="Research Questions"
        icon="❓"
        defaultExpanded
      >
        <Grid container spacing={2}>
          {fundingData.researchTasks?.map((task) => (
            <Grid item xs={12} md={6} key={task.id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {task.question}
                  </Typography>
                  {task.why && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      <strong>Why:</strong> {task.why}
                    </Typography>
                  )}
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Chip
                      label={`Status: ${task.status}`}
                      size="small"
                      color={task.status === "pending" ? "warning" : "success"}
                    />
                    <Chip
                      label={`Priority: ${task.priority}`}
                      size="small"
                      color={task.priority === "high" ? "error" : "default"}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DocAccordion>

      {fundingData.investmentNotes?.shield4 && (
        <DocAccordion
          title="Investment Notes"
          icon="💡"
          defaultExpanded
        >
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600}>
                Shield4
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Potential:</strong>{" "}
                {fundingData.investmentNotes.shield4.potential}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Clarification Needed:</strong>{" "}
                {fundingData.investmentNotes.shield4.clarificationNeeded}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Target Problem:</strong>{" "}
                {fundingData.investmentNotes.shield4.targetProblem}
              </Typography>
              <Chip
                label={`Status: ${fundingData.investmentNotes.shield4.status}`}
                size="small"
              />
            </CardContent>
          </Card>
        </DocAccordion>
      )}
    </DocSection>
  )
}

/**
 * KCPS Events Section
 *
 * Timeline of field research events from the KCPS case study.
 */

import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { alpha } from "@mui/material/styles"
import { DocSection } from "../../common"
import { caseStudies } from "../../../../data/docs"
import type { CaseStudyEvent, StudentObservation } from "../../../../types/docs"
import { SAD_BRICK, SAD_OCHRE, SAD_SAGE, SAD_FOG, SAD_MAUVE } from "./kcpsPalette"

const schoolTypeColors: Record<string, string> = {
  high: SAD_BRICK,
  middle: SAD_OCHRE,
  elementary: SAD_SAGE,
  montessori: SAD_FOG,
  "special-ed": SAD_MAUVE,
}

const schoolTypeLabels: Record<string, string> = {
  high: "High School",
  middle: "Middle School",
  elementary: "Elementary",
  montessori: "Montessori",
  "special-ed": "Special Education",
}

function StudentCard({ student }: { student: StudentObservation }) {
  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent sx={{ py: 1, "&:last-child": { pb: 1 } }}>
        <Typography variant="subtitle2" gutterBottom>
          {student.name}
        </Typography>
        {student.behaviors.length > 0 && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Behaviors:
            </Typography>
            <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mt: 0.5 }}>
              {student.behaviors.map((b, i) => (
                <Chip key={i} label={b} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        )}
        {student.insights.length > 0 && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Insights:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2 }}>
              {student.insights.map((insight, i) => (
                <li key={i}>
                  <Typography variant="body2">{insight}</Typography>
                </li>
              ))}
            </Box>
          </Box>
        )}
        {student.whatWorked && (
          <Alert severity="success" sx={{ py: 0, mt: 1 }}>
            <Typography variant="body2">
              <strong>What Worked:</strong> {student.whatWorked}
            </Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

export default function KCPSEvents() {
  const events = (caseStudies.events || []) as CaseStudyEvent[]

  return (
    <DocSection title="Field Research Events" icon="📅">
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Timeline of immersive field research and observation experiences across
        different school types.
      </Typography>

      {events.map((event) => (
        <Card key={event.id} sx={{ mb: 3 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="h5" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📍 {event.location} • 📆 {event.date}
                </Typography>
              </Box>
              <Chip
                label={schoolTypeLabels[event.schoolType]}
                size="small"
                sx={{
                  bgcolor: alpha(schoolTypeColors[event.schoolType], 0.14),
                  color: schoolTypeColors[event.schoolType],
                  fontWeight: 600,
                }}
              />
            </Box>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {event.summary}
            </Typography>

            {event.timeline && event.timeline.length > 0 && (
              <Accordion defaultExpanded={false}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">📋 Day Timeline</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stepper orientation="vertical">
                    {event.timeline.map((item, i) => (
                      <Step key={i} active completed>
                        <StepLabel>
                          <Typography variant="subtitle2">
                            {item.phase}
                          </Typography>
                        </StepLabel>
                        <StepContent>
                          <Typography variant="body2">
                            {item.description}
                          </Typography>
                          {item.observations && item.observations.length > 0 && (
                            <Box component="ul" sx={{ m: 0, mt: 1, pl: 2 }}>
                              {item.observations.map((obs, j) => (
                                <li key={j}>
                                  <Typography variant="body2" color="text.secondary">
                                    {obs}
                                  </Typography>
                                </li>
                              ))}
                            </Box>
                          )}
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </AccordionDetails>
              </Accordion>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom>
              💡 Key Learnings
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2, mb: 2 }}>
              {event.keyLearnings.map((learning, i) => (
                <li key={i}>
                  <Typography variant="body2">{learning}</Typography>
                </li>
              ))}
            </Box>

            {event.questionsRaised && event.questionsRaised.length > 0 && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  ❓ Questions Raised
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2, mb: 2 }}>
                  {event.questionsRaised.map((q, i) => (
                    <li key={i}>
                      <Typography variant="body2" fontStyle="italic">
                        {q}
                      </Typography>
                    </li>
                  ))}
                </Box>
              </>
            )}

            {event.studentsObserved && event.studentsObserved.length > 0 && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">
                    👥 Students Observed ({event.studentsObserved.length})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {event.studentsObserved.map((student, i) => (
                    <StudentCard key={i} student={student} />
                  ))}
                </AccordionDetails>
              </Accordion>
            )}
          </CardContent>
        </Card>
      ))}
    </DocSection>
  )
}

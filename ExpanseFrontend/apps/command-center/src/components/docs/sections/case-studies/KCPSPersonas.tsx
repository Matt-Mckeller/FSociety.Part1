/**
 * KCPS Personas Section
 *
 * Student personas from the KCPS case study.
 * Migrated from DocsView.tsx renderKCPSPersonas()
 */

import { Typography, Box, Chip } from "@mui/material"
import { alpha } from "@mui/material/styles"
import PeopleAltRounded from "@mui/icons-material/PeopleAltRounded"
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded"
import {
  DocSection,
  DocGrid,
  DocCard,
  IconBadge,
  RewardHero,
  DocSuccess,
  DocWarning,
  DocError,
  DocAlert,
} from "../../common"
import { caseStudies } from "../../../../data/docs"
import type { CaseStudyPersona, TeacherObservation } from "../../../../types/docs"
import { SAD_INDIGO, SAD_OCHRE, SAD_BRICK, SAD_SLATE, SAD_SAGE, SAD_ASH } from "./kcpsPalette"

interface PersonaMeta {
  color: string
  label: string
  icon: string
}

function getPersonaMeta(persona: CaseStudyPersona): PersonaMeta {
  if (persona.before || persona.intervention || persona.after) {
    return { color: SAD_INDIGO, label: "Turnaround", icon: "🔁" }
  }
  if (persona.problem) {
    return persona.whatWorked
      ? { color: SAD_OCHRE, label: "Mixed Result", icon: "⚖️" }
      : { color: SAD_BRICK, label: "Unresolved", icon: "🚩" }
  }
  if (persona.lesson) {
    return { color: SAD_OCHRE, label: "Lesson Learned", icon: "💡" }
  }
  if (persona.insight) {
    return { color: SAD_SLATE, label: "Insight", icon: "🔎" }
  }
  if (persona.whatWorked) {
    return { color: SAD_SAGE, label: "What Worked", icon: "✅" }
  }
  return { color: SAD_ASH, label: "Observation", icon: "👁️" }
}

export default function KCPSPersonas() {
  const personas = caseStudies.personas as CaseStudyPersona[]
  const observations = caseStudies.teacherObservations as TeacherObservation[]

  return (
    <DocSection title="Student Personas" icon="👥">
      <RewardHero
        icon={<PeopleAltRounded />}
        title="Student Personas"
        subtitle="Real student observations from the KCPS case study - what worked, what didn't, and the moments that changed the trajectory."
        gradient={[SAD_INDIGO, "#2E3145"]}
        stats={[
          { label: "personas", value: personas.length },
          { label: "teacher observations", value: observations.length },
        ]}
      />

      <DocGrid columns={{ xs: 1, md: 2 }} spacing={2.5}>
        {personas.map((persona) => {
          const meta = getPersonaMeta(persona)
          const hasTransformation = persona.before || persona.intervention || persona.after

          return (
            <DocCard
              key={persona.id}
              title={persona.name}
              icon={<IconBadge icon={meta.icon} color={meta.color} size="sm" />}
              accentColor={meta.color}
              sx={{ bgcolor: alpha(meta.color, 0.03) }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  px: 1.25,
                  py: 0.375,
                  borderRadius: 5,
                  bgcolor: alpha(meta.color, 0.12),
                  color: meta.color,
                  mb: 1.5,
                }}
              >
                <Typography variant="caption" fontWeight={700} letterSpacing={0.3}>
                  {meta.label.toUpperCase()}
                </Typography>
              </Box>

              {persona.background && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.25 }}>
                  <Typography component="span" variant="body2" fontWeight={700}>
                    Background:{" "}
                  </Typography>
                  {persona.background}
                </Typography>
              )}

              {persona.situation && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.25 }}>
                  <Typography component="span" variant="body2" fontWeight={700}>
                    Situation:{" "}
                  </Typography>
                  {persona.situation}
                </Typography>
              )}

              {persona.behaviors && persona.behaviors.length > 0 && (
                <Box sx={{ mb: 1.5 }}>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    color="text.secondary"
                    sx={{ display: "block", mb: 0.5, textTransform: "uppercase", letterSpacing: 0.4 }}
                  >
                    Behaviors
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
                    {persona.behaviors.map((b, i) => (
                      <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                        <Box
                          sx={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            bgcolor: "text.disabled",
                            mt: 0.9,
                            flexShrink: 0,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {b}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {persona.attributes && persona.attributes.length > 0 && (
                <Box sx={{ mb: 1.5 }}>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    color="text.secondary"
                    sx={{ display: "block", mb: 0.5, textTransform: "uppercase", letterSpacing: 0.4 }}
                  >
                    Attributes
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {persona.attributes.map((a, i) => (
                      <Chip
                        key={i}
                        label={a}
                        size="small"
                        sx={{
                          bgcolor: alpha(SAD_INDIGO, 0.1),
                          color: SAD_INDIGO,
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {hasTransformation && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "stretch",
                    gap: 1,
                    mb: 1,
                    flexWrap: { xs: "wrap", sm: "nowrap" },
                  }}
                >
                  {(
                    [
                      ["Before", persona.before, SAD_ASH],
                      ["Intervention", persona.intervention, SAD_INDIGO],
                      ["After", persona.after, SAD_SAGE],
                    ] as const
                  ).map(([label, text, color], i, arr) => (
                    <Box key={label} sx={{ display: "flex", alignItems: "center", flex: 1, minWidth: { xs: "100%", sm: 0 } }}>
                      <Box
                        sx={{
                          flex: 1,
                          p: 1.25,
                          borderRadius: 2,
                          bgcolor: alpha(color, 0.08),
                          border: `1px solid ${alpha(color, 0.25)}`,
                        }}
                      >
                        <Typography
                          variant="caption"
                          fontWeight={700}
                          sx={{ color, textTransform: "uppercase", letterSpacing: 0.4 }}
                        >
                          {label}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 0.25 }}>
                          {text}
                        </Typography>
                      </Box>
                      {i < arr.length - 1 && (
                        <ArrowForwardRounded
                          sx={{ mx: 0.5, color: "text.disabled", display: { xs: "none", sm: "block" } }}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              )}

              {persona.whatWorked && (
                <DocSuccess title="What Worked">{persona.whatWorked}</DocSuccess>
              )}

              {persona.observation && (
                <DocAlert severity="info" icon={false}>
                  <Typography component="span" variant="body2" fontWeight={700}>
                    Observation:{" "}
                  </Typography>
                  {persona.observation}
                </DocAlert>
              )}

              {persona.insight && (
                <DocAlert title="Insight" severity="info">
                  {persona.insight}
                </DocAlert>
              )}

              {persona.lesson && <DocWarning title="Lesson">{persona.lesson}</DocWarning>}

              {persona.problem && <DocError title="Problem">{persona.problem}</DocError>}
            </DocCard>
          )
        })}
      </DocGrid>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 5, mb: 2 }}>
        <IconBadge icon="👨‍🏫" color={SAD_BRICK} size="sm" />
        <Typography variant="h5" fontWeight={700}>
          Teacher Observations
        </Typography>
      </Box>
      <DocGrid columns={{ xs: 1, sm: 2 }} spacing={2}>
        {observations.map((obs, i) => (
          <DocCard
            key={i}
            title={obs.issue}
            description={obs.description}
            icon={<IconBadge icon="⚠️" color={SAD_BRICK} size="sm" />}
            accentColor={SAD_BRICK}
            compact
            sx={{ bgcolor: alpha(SAD_BRICK, 0.03) }}
          />
        ))}
      </DocGrid>
    </DocSection>
  )
}

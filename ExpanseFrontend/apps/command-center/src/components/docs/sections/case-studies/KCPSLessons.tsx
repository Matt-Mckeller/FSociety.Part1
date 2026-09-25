/**
 * KCPS Lessons Section
 *
 * Lessons learned from the KCPS case study.
 * Migrated from DocsView.tsx renderKCPSLessons()
 */

import { Typography, Box } from "@mui/material"
import { alpha } from "@mui/material/styles"
import LightbulbRounded from "@mui/icons-material/LightbulbRounded"
import { DocSection, DocGrid, DocCard, IconBadge, RewardHero } from "../../common"
import { caseStudies } from "../../../../data/docs"
import { SAD_SAGE } from "./kcpsPalette"

export default function KCPSLessons() {
  const lessons = caseStudies.lessonsLearned
  const { observationStyle } = caseStudies

  return (
    <DocSection title="Lessons Learned" icon="💡">
      <RewardHero
        icon={<LightbulbRounded />}
        title="Lessons Learned"
        subtitle="Key takeaways from the KCPS immersive observation experience."
        gradient={[SAD_SAGE, "#3F4A3F"]}
        stats={[{ label: "lessons", value: lessons.length }]}
      />

      <DocGrid columns={{ xs: 1, sm: 2 }} spacing={1.5}>
        {lessons.map((lesson, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.25,
              px: 1.5,
              py: 1.25,
              borderRadius: 2,
              bgcolor: alpha(SAD_SAGE, 0.06),
              border: "1px solid",
              borderColor: alpha(SAD_SAGE, 0.2),
            }}
          >
            <Box sx={{ color: SAD_SAGE, fontSize: "1rem", lineHeight: 1.5, flexShrink: 0 }}>✓</Box>
            <Typography variant="body2">{lesson}</Typography>
          </Box>
        ))}
      </DocGrid>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 5, mb: 2 }}>
        <IconBadge icon="🔬" color={SAD_SAGE} size="sm" />
        <Typography variant="h5" fontWeight={700}>
          Observation Approach
        </Typography>
      </Box>
      <DocCard title="Approach" description={observationStyle.approach} accentColor={SAD_SAGE}>
        <Typography
          variant="caption"
          fontWeight={700}
          color="text.secondary"
          sx={{ display: "block", mt: 1, mb: 0.75, textTransform: "uppercase", letterSpacing: 0.4 }}
        >
          Notes
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
          {observationStyle.notes.map((note, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  bgcolor: SAD_SAGE,
                  mt: 0.9,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body2">{note}</Typography>
            </Box>
          ))}
        </Box>
      </DocCard>
    </DocSection>
  )
}

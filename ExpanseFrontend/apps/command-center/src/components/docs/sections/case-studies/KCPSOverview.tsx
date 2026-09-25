/**
 * KCPS Overview Section
 *
 * KCPS case study overview.
 * Migrated from DocsView.tsx renderKCPSOverview()
 */

import { Typography, Box, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { alpha } from "@mui/material/styles"
import MenuBookRounded from "@mui/icons-material/MenuBookRounded"
import VisibilityRounded from "@mui/icons-material/VisibilityRounded"
import ReportProblemRounded from "@mui/icons-material/ReportProblemRounded"
import LockPersonRounded from "@mui/icons-material/LockPersonRounded"
import DirectionsRunRounded from "@mui/icons-material/DirectionsRunRounded"
import ShieldRounded from "@mui/icons-material/ShieldRounded"
import PhonelinkOffRounded from "@mui/icons-material/PhonelinkOffRounded"
import CoPresentRounded from "@mui/icons-material/CoPresentRounded"
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded"
import type { ReactNode } from "react"
import { useState } from "react"
import { DocSection, DocCard, DocQuote, IconBadge, RewardHero, NarrativeCrossfade } from "../../common"
import { NarrativeArt, type ArtVariant } from "../../common/narrative-art/NarrativeArt"
import { caseStudies } from "../../../../data/docs"
import { SAD_BRICK, SAD_OCHRE, SAD_INDIGO, SAD_FOG } from "./kcpsPalette"

const CONCERN_COLORS = [SAD_BRICK, SAD_OCHRE, SAD_INDIGO, SAD_FOG]

/** Observations are field notes on problems - one muted brick family, one voice. */
const OBSERVATION_COLOR = SAD_BRICK

/** Per-cluster glyphs. Kept out of the data file so content stays presentation-free. */
const GROUP_ICONS: Record<string, ReactNode> = {
  "attendance-movement": <DirectionsRunRounded />,
  "safety-conduct": <ShieldRounded />,
  "in-class-engagement": <PhonelinkOffRounded />,
  "teaching-practice": <CoPresentRounded />,
  "curriculum-support": <AutoStoriesRounded />,
}

export default function KCPSOverview() {
  const { highlights, highlightGroups, concerns, overview } = caseStudies
  const [variant, setVariant] = useState<ArtVariant>("symbolic")

  return (
    <DocSection title="KCPS Case Study" icon="📚">
      <RewardHero
        icon={<MenuBookRounded />}
        title="KCPS Case Study"
        subtitle={overview.summary}
        gradient={["#334155", "#1B2130"]}
        stats={[
          { label: "observations logged", value: highlights.length },
          { label: "concerns identified", value: concerns.length },
        ]}
      />

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1.5, mb: 1.5 }}>
        <Typography variant="caption" color="text.secondary">
          Art style
        </Typography>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={variant}
          onChange={(_, next: ArtVariant | null) => next && setVariant(next)}
        >
          <ToggleButton value="symbolic">Symbolic</ToggleButton>
          <ToggleButton value="figurative">Figurative</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ mb: 3 }}>
        <NarrativeCrossfade
          height={240}
          beforeLabel="The classroom we found"
          afterLabel="What we're building toward"
          before={<NarrativeArt narrativeId="overview" state="before" variant={variant} />}
          after={<NarrativeArt narrativeId="overview" state="after" variant={variant} />}
        />
      </Box>

      <DocQuote color="#334155" variant="callout">
        {overview.keyQuote}
      </DocQuote>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {overview.context}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <IconBadge
          icon={<VisibilityRounded />}
          color={OBSERVATION_COLOR}
          size="sm"
        />
        <Typography variant="h5" fontWeight={700}>
          Key Observations
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {highlights.length} field notes in {highlightGroups.length} themes
        </Typography>
      </Box>

      {/* One panel holds every field note; clusters flow as cards across two
          columns so uneven group sizes don't leave a ragged grid gap. */}
      <Box
        sx={{
          p: { xs: 1.5, sm: 2 },
          borderRadius: 3,
          bgcolor: alpha(OBSERVATION_COLOR, 0.04),
          border: "1px solid",
          borderColor: alpha(OBSERVATION_COLOR, 0.15),
          columnCount: { xs: 1, md: 2 },
          columnGap: 2,
        }}
      >
        {highlightGroups.map((group) => (
          <Box
            key={group.id}
            sx={{
              breakInside: "avoid",
              mb: 2,
              "&:last-of-type": { mb: 0 },
              p: 2,
              borderRadius: 2,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: alpha(OBSERVATION_COLOR, 0.18),
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 0.5 }}>
              <IconBadge
                icon={GROUP_ICONS[group.id]}
                color={OBSERVATION_COLOR}
                size="sm"
              />
              <Typography variant="subtitle1" fontWeight={700} sx={{ flex: 1 }}>
                {group.label}
              </Typography>
              <Typography
                variant="caption"
                fontWeight={700}
                sx={{
                  px: 1,
                  py: 0.25,
                  borderRadius: 5,
                  bgcolor: alpha(OBSERVATION_COLOR, 0.12),
                  color: OBSERVATION_COLOR,
                }}
              >
                {group.items.length}
              </Typography>
            </Box>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", mb: 1.25 }}
            >
              {group.summary}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
              {group.items.map((item, i) => (
                <Box
                  key={i}
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: OBSERVATION_COLOR,
                      mt: 0.75,
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant="body2">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 5, mb: 2 }}>
        <IconBadge icon={<ReportProblemRounded />} color={SAD_INDIGO} size="sm" />
        <Typography variant="h5" fontWeight={700}>
          Concerns Identified
        </Typography>
      </Box>
      {concerns.map((c, i) => {
        const color = CONCERN_COLORS[i % CONCERN_COLORS.length]
        return (
          <DocCard
            key={i}
            title={c.issue}
            description={c.description}
            accentColor={color}
            sx={{ mb: 2, bgcolor: alpha(color, 0.03) }}
          />
        )
      })}

      {overview.privacyNote && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 3,
            color: "text.secondary",
          }}
        >
          <LockPersonRounded fontSize="small" />
          <Typography variant="caption">{overview.privacyNote}</Typography>
        </Box>
      )}
    </DocSection>
  )
}

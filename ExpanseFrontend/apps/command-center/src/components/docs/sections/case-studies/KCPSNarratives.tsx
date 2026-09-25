/**
 * KCPS Narratives Section
 *
 * Case study narratives.
 * Migrated from DocsView.tsx renderKCPSNarratives()
 */

import {
  Typography,
  Box,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Collapse,
} from "@mui/material"
import { alpha } from "@mui/material/styles"
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded"
import CampaignRounded from "@mui/icons-material/CampaignRounded"
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded"
import DesignServicesRounded from "@mui/icons-material/DesignServicesRounded"
import FactCheckRounded from "@mui/icons-material/FactCheckRounded"
import { useState } from "react"
import type { ReactNode } from "react"
import { DocSection, DocCard, DocQuote, IconBadge, RewardHero, NarrativeCrossfade } from "../../common"
import { NarrativeArt, type ArtVariant, type NarrativeArtId } from "../../common/narrative-art/NarrativeArt"
import { caseStudies } from "../../../../data/docs"
import type { CaseStudyNarrative } from "../../../../types/docs"
import { SAD_INDIGO, SAD_FOG, SAD_OCHRE, SAD_MAUVE } from "./kcpsPalette"

const NARRATIVE_COLORS = [SAD_INDIGO, SAD_FOG, SAD_OCHRE, SAD_MAUVE]

const STATUS_META: Record<
  string,
  { label: string; chip: "success" | "warning" | "info" }
> = {
  written: { label: "Written", chip: "success" },
  draft: { label: "Draft", chip: "warning" },
  concept: { label: "Concept", chip: "info" },
}

/** Reading column: prose gets its own measure, looser leading, no card chrome. */
const PROSE_SX = {
  maxWidth: "68ch",
  "& p": {
    fontSize: "0.975rem",
    lineHeight: 1.85,
    margin: 0,
    marginBottom: "1.15em",
    "&:last-child": { marginBottom: 0 },
  },
} as const

/** Small labelled list used for symbolism, craft notes and weight factors. */
function LabelledList({
  label,
  icon,
  items,
  color,
}: {
  label: string
  icon?: ReactNode
  items: string[]
  color: string
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.75 }}>
        {icon}
        <Typography
          variant="caption"
          fontWeight={700}
          color="text.secondary"
          sx={{ textTransform: "uppercase", letterSpacing: 0.4 }}
        >
          {label}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {items.map((item, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                bgcolor: color,
                mt: 0.9,
                flexShrink: 0,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default function KCPSNarratives() {
  const narratives = caseStudies.narratives as CaseStudyNarrative[]
  const [variant, setVariant] = useState<ArtVariant>("symbolic")
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <DocSection title="Case Study Narratives" icon="📖">
      <RewardHero
        icon={<AutoStoriesRounded />}
        title="Case Study Narratives"
        subtitle="Storytelling depicting problems while highlighting the need for Expanse's solutions."
        gradient={[SAD_INDIGO, "#33364A"]}
        stats={[
          { label: "narratives", value: narratives.length },
          {
            label: "with full prose",
            value: narratives.filter((n) => n.narrative?.length).length,
          },
        ]}
      />

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1.5, mb: 2 }}>
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

      {narratives.map((narrative, i) => {
        const color = NARRATIVE_COLORS[i % NARRATIVE_COLORS.length]
        const status = narrative.status ? STATUS_META[narrative.status] : null
        const isOpen = openId === narrative.id
        const subtitle = [
          narrative.alsoKnownAs && `Also known as "${narrative.alsoKnownAs}"`,
          narrative.statusNote,
        ]
          .filter(Boolean)
          .join(" · ")

        return (
          <DocCard
            key={narrative.id}
            title={narrative.title}
            subtitle={subtitle || undefined}
            icon={<IconBadge icon={i + 1} color={color} size="sm" />}
            accentColor={color}
            description={narrative.summary}
            chips={status ? [{ label: status.label, color: status.chip }] : undefined}
            sx={{ mb: 3, bgcolor: alpha(color, 0.02) }}
          >
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
              {narrative.themes.map((t, ti) => (
                <Chip
                  key={ti}
                  label={t}
                  size="small"
                  sx={{
                    bgcolor: alpha(color, 0.1),
                    color,
                    fontWeight: 600,
                  }}
                />
              ))}
            </Box>

            <Box sx={{ mb: 2 }}>
              <NarrativeCrossfade
                height={200}
                beforeLabel="Before"
                afterLabel="After"
                before={<NarrativeArt narrativeId={narrative.id as NarrativeArtId} state="before" variant={variant} />}
                after={<NarrativeArt narrativeId={narrative.id as NarrativeArtId} state="after" variant={variant} />}
              />
            </Box>

            {/* The pull-quote teases the story; once the story is open it would
                just repeat one of its own paragraphs, so it steps aside. */}
            {narrative.keyMoment && !isOpen && (
              <DocQuote color={color} variant="callout">
                {narrative.keyMoment}
              </DocQuote>
            )}

            {narrative.narrative && narrative.narrative.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Button
                  size="small"
                  onClick={() => setOpenId(isOpen ? null : narrative.id)}
                  startIcon={
                    <ExpandMoreRounded
                      sx={{
                        transform: isOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  }
                  sx={{ color, fontWeight: 700, px: 1, ml: -1 }}
                >
                  {isOpen ? "Hide the story" : "Read the full story"}
                </Button>

                <Collapse in={isOpen} unmountOnExit>
                  <Box
                    sx={{
                      mt: 1.5,
                      pl: 2,
                      borderLeft: `3px solid ${alpha(color, 0.35)}`,
                      ...PROSE_SX,
                    }}
                  >
                    {narrative.narrative.map((para, pi) => (
                      <Typography key={pi} component="p">
                        {para}
                      </Typography>
                    ))}

                    {narrative.alternateScene && (
                      <Box
                        sx={{
                          mt: 3,
                          pt: 2.5,
                          borderTop: `1px solid ${alpha(color, 0.25)}`,
                        }}
                      >
                        <Typography variant="subtitle2" fontWeight={700} sx={{ color }}>
                          {narrative.alternateScene.title}
                        </Typography>
                        {narrative.alternateScene.note && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", mb: 1.5 }}
                          >
                            {narrative.alternateScene.note}
                          </Typography>
                        )}
                        {narrative.alternateScene.narrative.map((para, pi) => (
                          <Typography key={pi} component="p">
                            {para}
                          </Typography>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Collapse>
              </Box>
            )}

            {narrative.keyIssues && narrative.keyIssues.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  color="text.secondary"
                  sx={{ display: "block", mb: 0.5, textTransform: "uppercase", letterSpacing: 0.4 }}
                >
                  Key Issues
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  {narrative.keyIssues.map((issue, ii) => (
                    <Box key={ii} sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                      <Box
                        sx={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          bgcolor: color,
                          mt: 0.9,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2">{issue}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {narrative.symbolism && narrative.symbolism.length > 0 && (
              <LabelledList label="Symbolism" items={narrative.symbolism} color={color} />
            )}

            {narrative.craftNotes && narrative.craftNotes.length > 0 && (
              <LabelledList
                label="Why it's written this way"
                icon={<DesignServicesRounded sx={{ fontSize: 15, color }} />}
                items={narrative.craftNotes}
                color={color}
              />
            )}

            {narrative.weightFactors && narrative.weightFactors.length > 0 && (
              <LabelledList
                label="What matters most for engagement"
                items={narrative.weightFactors}
                color={color}
              />
            )}

            {/* Stating what the author is unsure of is what makes the rest
                credible - it belongs on the page, not in a footnote file. */}
            {narrative.provenance && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  mb: 2,
                  p: 1.25,
                  borderRadius: 2,
                  bgcolor: "action.hover",
                }}
              >
                <FactCheckRounded
                  sx={{ fontSize: 17, color: "text.secondary", mt: 0.2 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {narrative.provenance.date && (
                    <Typography component="span" variant="caption" fontWeight={700}>
                      Observed {narrative.provenance.date}.{" "}
                    </Typography>
                  )}
                  {narrative.provenance.note}
                </Typography>
              </Box>
            )}

            {narrative.callToAction && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.25,
                  mt: 1,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: alpha(color, 0.08),
                  border: `1px solid ${alpha(color, 0.25)}`,
                }}
              >
                <CampaignRounded sx={{ color, mt: 0.25 }} fontSize="small" />
                <Box>
                  <Typography variant="caption" fontWeight={700} sx={{ color, textTransform: "uppercase", letterSpacing: 0.4 }}>
                    Call to Action
                  </Typography>
                  <Typography variant="body2">{narrative.callToAction}</Typography>
                </Box>
              </Box>
            )}
          </DocCard>
        )
      })}
    </DocSection>
  )
}

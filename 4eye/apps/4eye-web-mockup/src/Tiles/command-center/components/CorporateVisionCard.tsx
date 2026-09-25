"use client";

import * as React from "react";
import { useState } from "react";
import {
  Box,
  Chip,
  Collapse,
  IconButton,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { LegendGlyph } from "./planning-glyphs";
import visionData from "../store/corporateVision.json";
import legendData from "../store/legend.json";
import { BulletItem, SubPanel, VisionSectionLabel } from "./VisionShared";

const VISION = "#7C3AED";

const TONES = {
  financial: "#10B981",
  market: "#F59E0B",
  competitive: "#EF4444",
  human: "#8B5CF6",
  safety: "#6B7280",
};

export interface CorporateVisionCardProps {
  defaultExpanded?: boolean;
}

export function CorporateVisionCard({ defaultExpanded = true }: CorporateVisionCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { corporateVision } = visionData;
  const { legend } = legendData;

  const { financialGoals, marketPositionBrand, competitivePosition } =
    corporateVision.strategicObjectives;

  return (
    <Stack
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        bgcolor: "background.paper",
        overflow: "hidden",
        mb: 1.5,
      }}
    >
      {/* Header */}
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 1,
          borderBottom: "1px solid",
          borderColor: expanded ? "divider" : "transparent",
          cursor: "pointer",
          userSelect: "none",
          "&:hover": { bgcolor: alpha(VISION, 0.04) },
        }}
        onClick={() => setExpanded((v) => !v)}
      >
        <Box sx={{ color: VISION, display: "flex", flexShrink: 0 }}>
          <LegendGlyph size={18} />
        </Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 800, flex: 1 }}>
          Corporate Vision: Welcome to the New World.
        </Typography>
        <IconButton size="small" tabIndex={-1} sx={{ color: "text.secondary", p: 0.25 }}>
          {expanded
            ? <KeyboardArrowUpRoundedIcon sx={{ fontSize: 18 }} />
            : <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />}
        </IconButton>
      </Stack>

      <Collapse in={expanded}>
        <Box sx={{ p: 1.5 }}>

          {/* Mission */}
          <Typography variant="caption" sx={{ color: "text.secondary", fontStyle: "italic", display: "block", mb: 0.5 }}>
            {corporateVision.sectionDescription}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
            {corporateVision.missionStatement}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 1.5 }}>
            {legend.description}
          </Typography>

          {/* Core Values */}
          <VisionSectionLabel color={VISION}>Core Values</VisionSectionLabel>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.75 }}>
            {corporateVision.coreValues.map((value, idx) => (
              <Chip
                key={idx}
                label={value}
                size="small"
                sx={{
                  height: 18,
                  fontSize: 10,
                  fontWeight: 600,
                  bgcolor: alpha(VISION, 0.1),
                  color: "text.primary",
                }}
              />
            ))}
          </Box>

          {/* Strategic Timeline */}
          <VisionSectionLabel color={VISION}>Strategic Timeline</VisionSectionLabel>
          <Stack spacing={0.5} sx={{ mb: 1.75 }}>
            {Object.entries(corporateVision.strategicTimeline).map(([year, goal]) => (
              <Stack key={year} sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
                <Chip
                  label={year}
                  size="small"
                  sx={{
                    height: 17,
                    fontSize: 9.5,
                    fontWeight: 700,
                    bgcolor: alpha(VISION, 0.14),
                    color: VISION,
                  }}
                />
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {goal}
                </Typography>
              </Stack>
            ))}
          </Stack>

          {/* Strategic Objectives — quiet cards, color as accent only */}
          <VisionSectionLabel color={VISION}>Strategic Objectives</VisionSectionLabel>
          <Box
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
              mb: 1.75,
            }}
          >
            {[
              { data: financialGoals, tone: TONES.financial },
              { data: marketPositionBrand, tone: TONES.market },
              { data: competitivePosition, tone: TONES.competitive },
            ].map(({ data, tone }) => (
              <Box
                key={data.title}
                sx={{
                  p: 1.25,
                  pl: 1.35,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderLeft: `3px solid ${tone}`,
                  bgcolor: alpha(tone, 0.03),
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    color: "text.primary",
                    display: "block",
                    mb: 0.75,
                  }}
                >
                  {data.icon} {data.title}
                </Typography>
                <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.4 }}>
                  {data.highlights.map((h) => (
                    <Chip
                      key={h}
                      label={h}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 18,
                        fontSize: 9.5,
                        fontWeight: 600,
                        bgcolor: alpha(tone, 0.06),
                        color: "text.primary",
                        borderColor: alpha(tone, 0.28),
                        "& .MuiChip-label": { px: 0.75 },
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            ))}
          </Box>

          {/* Strategic Pillars */}
          <VisionSectionLabel color={VISION}>Strategic Pillars</VisionSectionLabel>
          <Box
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              mb: 1.75,
            }}
          >
            {corporateVision.strategicPillars.map((pillar) => (
              <SubPanel key={pillar.id} tone={VISION}>
                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 0.75, mb: 0.5 }}>
                  <Box component="span" sx={{ fontSize: "1rem", lineHeight: 1 }}>
                    {pillar.icon}
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {pillar.title}
                  </Typography>
                </Stack>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.75 }}>
                  {pillar.description}
                </Typography>
                <Stack spacing={0.5}>
                  {pillar.items.map((item, idx) => (
                    <BulletItem key={idx} text={item} color={VISION} />
                  ))}
                </Stack>
              </SubPanel>
            ))}
          </Box>

          {/* Leadership & Safety */}
          <Box
            sx={{
              display: "grid",
              gap: 1,
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              mb: 1.75,
            }}
          >
            <SubPanel tone={TONES.human}>
              <VisionSectionLabel color={TONES.human}>👤 Leadership & Culture</VisionSectionLabel>
              <Typography variant="caption" sx={{ color: "text.secondary", fontStyle: "italic", display: "block", mb: 0.75 }}>
                "{corporateVision.leadershipCulture.founderVision}"
              </Typography>
              <Stack spacing={0.5}>
                {corporateVision.leadershipCulture.organizationalValues.map((value, idx) => (
                  <BulletItem key={idx} text={value} color={TONES.human} />
                ))}
              </Stack>
            </SubPanel>

            <SubPanel tone={TONES.safety}>
              <VisionSectionLabel color={TONES.safety}>🔒 Safety, Security & Compliance</VisionSectionLabel>
              <Stack spacing={0.5}>
                {corporateVision.safetySecurityCompliance.map((item, idx) => (
                  <BulletItem key={idx} text={item} color={TONES.safety} />
                ))}
              </Stack>
            </SubPanel>
          </Box>

          {/* Long-Term Vision */}
          <Box
            sx={{
              p: 1.25,
              borderRadius: 2,
              border: "1px solid",
              borderColor: alpha(VISION, 0.28),
              bgcolor: alpha(VISION, 0.08),
            }}
          >
            <Typography
              variant="caption"
              sx={{ display: "block", fontWeight: 800, letterSpacing: 0.4, color: VISION, mb: 0.5 }}
            >
              🌟 LONG-TERM VISION
            </Typography>
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              {corporateVision.longTermVision}
            </Typography>
          </Box>

        </Box>
      </Collapse>
    </Stack>
  );
}

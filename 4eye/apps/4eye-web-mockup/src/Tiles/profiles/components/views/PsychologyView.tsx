"use client";

/**
 * Psychology — first-person mental-health profile.
 *
 * Same section vocabulary as the Communication Planner recipient page
 * (mental state, cognitive style, preferences, defenses), voiced as *you*
 * rather than “how to reach X”. Coping tactics and stories stay psychology-
 * native. Thin seeds (perspectives / coping / stories only) still render
 * without empty planner chrome.
 */

import * as React from "react";
import { Box, Chip, Stack, Typography, alpha } from "@mui/material";

import { useProfiles } from "../../store/ProfileProvider";
import type { FactorLevel, MentalStateFactor } from "../../model/types";
import { AspectList, Empty, MomentTimeline, Section, TagRow } from "../shared/primitives";

const LEVEL_HEX: Record<FactorLevel, string> = {
  high: "#f91a4b",
  medium: "#e0911f",
  low: "#09c577",
};

function LevelChip({ level }: { level: FactorLevel }) {
  const c = LEVEL_HEX[level];
  return (
    <Chip
      size="small"
      label={level}
      sx={{
        height: 18,
        fontSize: 10,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: 0.4,
        color: c,
        bgcolor: alpha(c, 0.12),
        border: `1px solid ${alpha(c, 0.4)}`,
      }}
    />
  );
}

function MentalStateList({ factors }: { factors: MentalStateFactor[] }) {
  if (factors.length === 0) return null;
  return (
    <Stack spacing={1}>
      {factors.map((f) => (
        <Box
          key={f.id}
          sx={{
            p: 1.25,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1, mb: 0.25 }}>
            <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary" }}>
              {f.factor}
            </Typography>
            <LevelChip level={f.level} />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {f.description}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}

function PrefColumn({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <Box sx={{ flex: "1 1 180px", minWidth: 160 }}>
      <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary" }}>
        {title}
      </Typography>
      <Box sx={{ mt: 0.5 }}>
        <TagRow tags={items} />
      </Box>
    </Box>
  );
}

export function PsychologyView() {
  const { profile } = useProfiles();
  const d = profile.data.psychology;
  if (!d) return <Empty label="No psychology profile yet." />;

  const mentalState = d.mentalState ?? [];
  const cognitiveStrengths = d.cognitiveStrengths ?? [];
  const respondsWellTo = d.respondsWellTo ?? [];
  const strugglesWith = d.strugglesWith ?? [];
  const optimalFormat = d.optimalFormat ?? [];
  const defensePatterns = d.defensePatterns ?? [];
  const hasCognitive =
    cognitiveStrengths.length > 0 || Boolean(d.processingStyle) || Boolean(d.memoryStyle);
  const hasPrefs =
    respondsWellTo.length > 0 || strugglesWith.length > 0 || optimalFormat.length > 0;

  return (
    <Stack spacing={1}>
      {d.summary && (
        <Section title="Your mental landscape">
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {d.summary}
          </Typography>
        </Section>
      )}

      {mentalState.length > 0 && (
        <Section title="Mental state">
          <MentalStateList factors={mentalState} />
        </Section>
      )}

      {hasCognitive && (
        <Section title="How you take things in">
          <Stack spacing={0.75}>
            {cognitiveStrengths.length > 0 && (
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary" }}>
                  Strengths
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <TagRow tags={cognitiveStrengths} />
                </Box>
              </Box>
            )}
            {d.processingStyle && (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <strong style={{ color: "inherit" }}>Processing:</strong> {d.processingStyle}
              </Typography>
            )}
            {d.memoryStyle && (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <strong style={{ color: "inherit" }}>Memory:</strong> {d.memoryStyle}
              </Typography>
            )}
          </Stack>
        </Section>
      )}

      {hasPrefs && (
        <Section title="What helps you">
          <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 1.5 }}>
            <PrefColumn title="Responds well to" items={respondsWellTo} />
            <PrefColumn title="Struggles with" items={strugglesWith} />
            <PrefColumn title="Optimal format" items={optimalFormat} />
          </Stack>
        </Section>
      )}

      {defensePatterns.length > 0 && (
        <Section title="Defense patterns">
          <TagRow tags={defensePatterns} />
        </Section>
      )}

      <Section title="Perspectives">
        <AspectList fields={d.perspectives} />
      </Section>

      <Section title="Coping tactics">
        <AspectList fields={d.copingTactics} />
      </Section>

      <Section title="Stories">
        <MomentTimeline moments={d.stories} />
      </Section>
    </Stack>
  );
}

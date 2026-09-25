"use client";

/**
 * Communication — a support-oriented "how to reach this person" lens.
 *
 * Mirrors the Communication Planner's recipient profile (mental state,
 * cognitive style, preferences, defenses, observations, strategy). Shared
 * mental / cognitive clusters fall back to `data.psychology` when the facet
 * omits them — Psychology owns the first-person source of truth.
 */

import * as React from "react";
import { Box, Chip, Stack, Typography, alpha } from "@mui/material";

import { GoalsShowcase, OTHER_PEOPLE_GOALS } from "@4eye/web/Tiles/integration-layers/goals";

import { useProfiles } from "../../store/ProfileProvider";
import type {
  CommunicationViewData,
  FactorLevel,
  MentalStateFactor,
  PsychologyViewData,
} from "../../model/types";
import { AspectList, Empty, Section, TagRow } from "../shared/primitives";

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
  if (factors.length === 0) return <Empty />;
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

/** Prefer communication overrides; else psychology (first-person source). */
function resolveShared(
  c: CommunicationViewData,
  p: PsychologyViewData | undefined,
) {
  const pickList = <T,>(a: T[] | undefined, b: T[] | undefined): T[] =>
    a && a.length > 0 ? a : b ?? [];
  const pickStr = (a: string | undefined, b: string | undefined) =>
    a && a.trim() ? a : b ?? "";

  return {
    mentalState: pickList(c.mentalState, p?.mentalState),
    cognitiveStrengths: pickList(c.cognitiveStrengths, p?.cognitiveStrengths),
    processingStyle: pickStr(c.processingStyle, p?.processingStyle),
    memoryStyle: pickStr(c.memoryStyle, p?.memoryStyle),
    respondsWellTo: pickList(c.respondsWellTo, p?.respondsWellTo),
    strugglesWith: pickList(c.strugglesWith, p?.strugglesWith),
    optimalFormat: pickList(c.optimalFormat, p?.optimalFormat),
    defensePatterns: pickList(c.defensePatterns, p?.defensePatterns),
  };
}

export function CommunicationView() {
  const { profile, state } = useProfiles();
  const d = profile.data.communication;
  if (!d) return <Empty label="No communication profile yet." />;

  const shared = resolveShared(d, profile.data.psychology);

  // This lens is targeted at a specific person — thread their name into the
  // headers so it reads as "how to communicate with this individual".
  const who =
    state.showRealNames && profile.realName ? profile.realName : profile.username;

  return (
    <Stack spacing={1}>
      <Section title={`How to communicate with ${who}`}>
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {d.summary}
        </Typography>
      </Section>

      <Section title="Communication Goals">
        {profile.id === "PROFILE_JANNA" ? (
          <GoalsShowcase goals={OTHER_PEOPLE_GOALS} layout="row" variant="paper" />
        ) : (
          <AspectList fields={d.goals} />
        )}
      </Section>

      <Section title={`${who}'s Mental State`}>
        <MentalStateList factors={shared.mentalState} />
      </Section>

      <Section title="Cognitive Style">
        <Stack spacing={0.75}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary" }}>
              Strengths
            </Typography>
            <Box sx={{ mt: 0.5 }}>
              <TagRow tags={shared.cognitiveStrengths} />
            </Box>
          </Box>
          {shared.processingStyle && (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <strong style={{ color: "inherit" }}>Processing:</strong> {shared.processingStyle}
            </Typography>
          )}
          {shared.memoryStyle && (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <strong style={{ color: "inherit" }}>Memory:</strong> {shared.memoryStyle}
            </Typography>
          )}
        </Stack>
      </Section>

      <Section title="Preferences">
        <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 1.5 }}>
          <PrefColumn title="Responds well to" items={shared.respondsWellTo} />
          <PrefColumn title="Struggles with" items={shared.strugglesWith} />
          <PrefColumn title="Optimal format" items={shared.optimalFormat} />
        </Stack>
      </Section>

      <Section title="Defense Patterns">
        <TagRow tags={shared.defensePatterns} />
      </Section>

      <Section title="Observations">
        <AspectList fields={d.observations} />
      </Section>

      <Section title={`How to respond to ${who}`}>
        <AspectList fields={d.strategy} />
      </Section>
    </Stack>
  );
}

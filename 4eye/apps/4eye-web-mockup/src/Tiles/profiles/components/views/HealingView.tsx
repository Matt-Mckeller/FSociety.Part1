"use client";

/** Healing — wellness & recovery tracking. */

import * as React from "react";
import { Stack, Typography } from "@mui/material";

import { useProfiles } from "../../store/ProfileProvider";
import { AspectList, Empty, MomentTimeline, Section, StatRow } from "../shared/primitives";

export function HealingView() {
  const { profile } = useProfiles();
  const d = profile.data.healing;
  if (!d) return <Empty label="No wellness profile yet." />;

  return (
    <Stack spacing={1}>
      <Section title="Motivation">
        <Typography variant="body2" sx={{ color: "text.primary", fontStyle: "italic" }}>
          “{d.motivation}”
        </Typography>
      </Section>
      <Section title="This Week">
        <StatRow stats={d.stats} />
      </Section>
      <Section title="Healing Tactics">
        <AspectList fields={d.tactics} />
      </Section>
      <Section title="Mood Over Time">
        <MomentTimeline moments={d.mood} />
      </Section>
    </Stack>
  );
}

"use client";

/**
 * LearningTile — the Learning screen surface.
 *
 * Three stacked sections per the Character & Screens plan:
 *   1. Input Types — how the learner brings material in.
 *   2. Checklist   — the steps for this session.
 *   3. Options     — pace (200 APM rating) / depth / support / output preferences.
 *
 * Self-wraps in {@link LearningProvider}. UI-first mockup — example data only.
 */

import * as React from "react";
import { Box, Divider, Typography } from "@mui/material";

import { LearningProvider } from "./store/LearningProvider";
import type { LearningData } from "./model/types";
import { InputTypePicker } from "./components/InputTypePicker";
import { ModalityGrid } from "./components/ModalityGrid";
import { LearningComposer } from "./components/LearningComposer";
import { LearningChecklist } from "./components/LearningChecklist";
import { LearningOptions } from "./components/LearningOptions";
import { useLearning } from "./store/LearningProvider";

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Typography sx={{ fontWeight: 800, fontSize: 15, mb: 0.25 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 1 }}>
          {subtitle}
        </Typography>
      )}
      <Box sx={{ mt: subtitle ? 0 : 1 }}>{children}</Box>
    </Box>
  );
}

function LearningHeader() {
  const { session } = useLearning();
  return (
    <Box>
      <Typography variant="overline" sx={{ color: "text.secondary", fontWeight: 800 }}>
        Learning
      </Typography>
      <Typography sx={{ fontWeight: 900, fontSize: 22, lineHeight: 1.15 }}>
        {session.title}
      </Typography>
    </Box>
  );
}

/**
 * The session surface without its provider, so a host that already mounts
 * `LearningProvider` — the AI workbench, which needs the chat and the Learn
 * panel reading one session — renders it without nesting a second store.
 */
export function LearningSurface() {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        color: "text.primary",
        maxWidth: 720,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <LearningHeader />
      <Divider />
      <Section title="Input type" subtitle="What you bring in, and what the system auto-imports.">
        <InputTypePicker />
        <Box sx={{ mt: 1.5 }}>
          <LearningComposer />
        </Box>
      </Section>
      <Section title="Learning modalities" subtitle="How are you engaging with it? Tag every way that applies.">
        <ModalityGrid />
      </Section>
      <Section title="Checklist" subtitle="Steps for this session.">
        <LearningChecklist />
      </Section>
      <Section title="Options" subtitle="Shape how this session feels.">
        <LearningOptions />
      </Section>
    </Box>
  );
}

export interface LearningTileProps {
  data?: LearningData;
}

export function LearningTile({ data }: LearningTileProps = {}) {
  return (
    <LearningProvider data={data}>
      <LearningSurface />
    </LearningProvider>
  );
}

export default LearningTile;

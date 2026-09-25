"use client";

/**
 * CreateTile — the Create workspace screen, as a no-scroll HUD dashboard.
 *
 * Centred on the active Project (e.g. "Animation"). Layout: a fixed-height
 * flex column that never scrolls the page —
 *   ┌ header: Create + active project + ContextBar (selection + pipeline)
 *   ├ body:   two panes (scene map + sequence list | scene detail), each
 *   └         scrolls independently inside the fixed shell.
 *
 * State lives in CreateProvider (Context + useReducer). The inner
 * `CreateDashboard` consumes it to drive the ContextBar.
 */

import { Box, Paper, Stack, Typography } from "@mui/material";

import { SceneDetail } from "./components/SceneDetail";
import { SequenceList } from "./components/SequenceList";
import { ContextBar } from "./components/ContextBar";
import { SceneMap } from "./components/SceneMap";
import { ProjectOverview } from "./components/ProjectOverview";
import { ReportLens } from "./components/ReportLens";
import { SendToChatProvider } from "./chat/SendToChat";
import type {
  ContextSegment,
  PipelineStep,
  StepStatus,
} from "./components/ContextBar";
import { BrandIcon } from "./components/BrandIcon";
import { MediumChip } from "./components/visuals";
import { STATUS_LABEL } from "./model/types";
import {
  CreateProvider,
  useCreate,
  type CreateState,
} from "./store/CreateProvider";

const BRAND_FONT = "Xpens, Roboto, sans-serif";

export interface CreateTileProps {
  /** Optional state override (Storybook / tests). */
  initialState?: CreateState;
}

/** Derive the context breadcrumb + action pipeline from current selection. */
function useCreateContext(): {
  context: ContextSegment[];
  steps: PipelineStep[];
} {
  const { selectedProject, selectedSequence, selectedScene, effectiveGoals } =
    useCreate();

  const context: ContextSegment[] = [];
  if (selectedProject) {
    context.push({
      id: selectedProject.id,
      glyph: selectedProject.glyph ?? "project",
      label: selectedProject.title,
      detail: `${selectedProject.medium} · ${selectedProject.sequenceIds.length} sequence${selectedProject.sequenceIds.length === 1 ? "" : "s"}`,
      color: "#7c3aed",
    });
  }
  if (selectedSequence) {
    context.push({
      id: selectedSequence.id,
      glyph: selectedSequence.glyph ?? "sequence",
      label: selectedSequence.title,
      detail: `${selectedSequence.sceneIds.length} scenes · ${STATUS_LABEL[selectedSequence.status]}`,
      color: "#2c4f76",
    });
  }
  if (selectedScene) {
    context.push({
      id: selectedScene.id,
      glyph: selectedScene.glyph ?? "scene",
      label: selectedScene.title,
      detail: `${STATUS_LABEL[selectedScene.status]}${selectedScene.version ? ` · v${selectedScene.version}` : ""}`,
      color: "#1976d2",
    });
  }

  // Pipeline: Browse → Seed → Generate → Review → Promote.
  const hasScene = Boolean(selectedScene);
  const hasGoals = effectiveGoals.length > 0;
  const hasPrompts = (selectedScene?.promptScripts.length ?? 0) > 0;
  const generated = Boolean(
    selectedScene?.history?.some((h) => h.kind === "generated"),
  );
  const isLive = selectedScene?.status === "live";
  const inSequence = selectedScene?.status === "sequence";

  const browse: StepStatus = hasScene ? "done" : "active";
  const seed: StepStatus =
    hasGoals && hasPrompts ? "done" : hasScene ? "active" : "upcoming";
  const generate: StepStatus = generated
    ? "done"
    : seed === "done"
      ? "active"
      : "upcoming";
  const review: StepStatus = generated
    ? isLive || inSequence
      ? "done"
      : "active"
    : "upcoming";
  const promote: StepStatus = isLive
    ? "done"
    : inSequence
      ? "active"
      : "upcoming";

  const steps: PipelineStep[] = [
    { id: "browse", label: "Browse", glyph: "sequence", status: browse, detail: "Select a sequence and scene" },
    { id: "seed", label: "Seed", glyph: "seed", status: seed, detail: "Tune prompts & goals" },
    { id: "generate", label: "Generate", glyph: "generate", status: generate, detail: "Run generation (broad or goal-directed)" },
    { id: "review", label: "Review", glyph: "perspective", status: review, detail: "Review the result against goals" },
    { id: "promote", label: "Promote", glyph: "promote", status: promote, detail: "Advance draft → sequence → live" },
  ];

  return { context, steps };
}

function CreateDashboard() {
  const { context, steps } = useCreateContext();
  const { selectedProject } = useCreate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
        bgcolor: "#ffffff",
        fontFamily: BRAND_FONT,
        p: 1.5,
        gap: 1.25,
      }}
    >
      {/* Header: Create workspace + active project + context/pipeline bar */}
      <Stack
        spacing={1.25}
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          alignItems: { lg: "center" },
          flexShrink: 0,
        }}
      >
        <Stack
          spacing={1.25}
          sx={{ flexDirection: "row", alignItems: "center", flexShrink: 0 }}
        >
          <Box
            sx={{
              color: "#7c3aed",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: "#f5f1fe",
              border: "1px solid #e9e0fb",
            }}
          >
            <BrandIcon name={selectedProject?.glyph ?? "animation"} size={24} />
          </Box>
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontFamily: BRAND_FONT,
                fontWeight: 700,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                color: "#9b8ec4",
                lineHeight: 1,
                display: "block",
              }}
            >
              Create
            </Typography>
            <Stack
              spacing={0.75}
              sx={{ flexDirection: "row", alignItems: "center" }}
            >
              <Typography
                sx={{ fontFamily: BRAND_FONT, fontWeight: 800, fontSize: 18, lineHeight: 1.15 }}
              >
                {selectedProject?.title ?? "Untitled Project"}
              </Typography>
              {selectedProject && <MediumChip medium={selectedProject.medium} />}
            </Stack>
            {selectedProject?.tagline && (
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1 }}>
                {selectedProject.tagline}
              </Typography>
            )}
          </Box>
        </Stack>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <ContextBar context={context} steps={steps} />
        </Box>
      </Stack>

      {/* Data-viz rail: project pulse (status distribution + goal coverage) */}
      <ProjectOverview />

      {/* Body: two independently-scrolling panes inside the fixed shell */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "300px 1fr" },
          gap: 1.25,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 1.25,
            bgcolor: "#fafbfc",
            border: "1px solid #eef1f5",
            borderRadius: 2,
            minHeight: 0,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1.25,
          }}
        >
          <SceneMap height={180} />
          <SequenceList />
          <ReportLens />
        </Paper>
        <Paper
          elevation={0}
          sx={{
            bgcolor: "#ffffff",
            border: "1px solid #eef1f5",
            borderRadius: 2,
            minHeight: 0,
            overflowY: "auto",
          }}
        >
          <SceneDetail />
        </Paper>
      </Box>
    </Box>
  );
}

export default function CreateTile({ initialState }: CreateTileProps) {
  return (
    <CreateProvider initialState={initialState}>
      <SendToChatProvider>
        <Box sx={{ height: "100%", minHeight: "100vh" }}>
          <CreateDashboard />
        </Box>
      </SendToChatProvider>
    </CreateProvider>
  );
}

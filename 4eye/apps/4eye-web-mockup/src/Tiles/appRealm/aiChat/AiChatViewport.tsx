"use client";

import { Box, ButtonBase, Chip, Typography, alpha, useTheme } from "@mui/material";
import MovieCreationRoundedIcon from "@mui/icons-material/MovieCreationRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import {
  ContextBar,
  EntityListView,
  ENTITY_KIND_BY_KEY,
  GoalsBar,
  PipelineListView,
  PresetsPanel,
  ProjectsBar,
  useGoals,
  useProjects,
} from "@4eye/features";
import type { SelectedContextKey } from "@4eye/types";
import { PlanningProvider, PlanningViews } from "../../entity-tile";
import { ChatActionsPanel } from "./workbench/ChatActionsPanel";
import { ChatProfilePanel } from "./workbench/ChatProfilePanel";
import { ChatSettingsPanel } from "./workbench/ChatSettingsPanel";
import {
  useOpenSceneStudio,
  useSelectStoryboard,
  SEED_STORYBOARDS,
  SEED_ASSETS,
} from "@4eye/web/Tiles/scene-studio";

type ViewportPanel =
  | { kind: "entity"; key: SelectedContextKey }
  | { kind: "goals" }
  | { kind: "projects" }
  | { kind: "plan" }
  | { kind: "context-actions" }
  | { kind: "settings" }
  | { kind: "profile" }
  | { kind: "presets" }
  | { kind: "sequences" };

interface AiChatViewportProps {
  panel: ViewportPanel | null;
  onNewChat?: () => void;
}

/**
 * AiChatViewport — renders the appropriate management view for the
 * currently active dashboard tile. When nothing is selected, shows a
 * subtle hint.
 *
 * Panels sit on `background.paper` rather than a literal `white`. The literal
 * was invisible while the surface around it forced its own dark page, and
 * plainly wrong the moment the surface started following the theme: it pinned
 * every panel light while the reused MUI content inside resolved its text from
 * the real palette.
 */
export function AiChatViewport({ panel, onNewChat }: AiChatViewportProps) {
  if (!panel) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.35)",
          px: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="caption">
          Pick a tile above to manage it without leaving the chat.
        </Typography>
      </Box>
    );
  }

  switch (panel.kind) {
    case "entity":
      if (panel.key === "pipelines") {
        return (
          <Box sx={{ flex: 1, bgcolor: "background.paper", borderRadius: 2, overflow: "hidden" }}>
            <PipelineListView />
          </Box>
        );
      }
      return (
        <Box sx={{ flex: 1, bgcolor: "background.paper", borderRadius: 2, overflow: "hidden" }}>
          <EntityListView kind={panel.key} />
        </Box>
      );
    case "goals":
      return <GoalsPanel />;
    case "projects":
      return <ProjectsPanel />;
    case "plan":
      return (
        <Box
          sx={{
            flex: 1,
            bgcolor: "background.paper",
            borderRadius: 2,
            overflow: "auto",
            position: "relative",
          }}
        >
          <Box
            aria-disabled
            sx={{
              opacity: 0.42,
              filter: "grayscale(0.2)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <PlanningProvider>
              <PlanningViews title="Plan" />
            </PlanningProvider>
          </Box>
        </Box>
      );
    case "context-actions":
      return (
        <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          <ChatActionsPanel />
        </Box>
      );
    case "settings":
      return (
        <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
          <ChatSettingsPanel onNewChat={onNewChat ?? (() => {})} />
        </Box>
      );
    case "profile":
      return (
        <Box sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
          <ChatProfilePanel />
        </Box>
      );
    case "presets":
      return (
        <Box sx={{ flex: 1, bgcolor: "background.paper", borderRadius: 2, overflow: "hidden" }}>
          <PresetsPanel />
        </Box>
      );
    case "sequences":
      return <SequencesPanel />;
    default:
      return null;
  }
}

function GoalsPanel() {
  const { goals, selectedGoals } = useGoals();
  return (
    <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2, color: "text.primary" }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        Goals
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 1.5 }}>
        From the current profile. {selectedGoals.length}/3 selected.
      </Typography>
      <GoalsBar />
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {goals.map((g) => (
          <Typography key={g.id} variant="body2">
            • <strong>{g.word}</strong> — {g.description ?? g.category}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

function ProjectsPanel() {
  const { projects, selectedProjects } = useProjects();
  return (
    <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2, color: "text.primary" }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        Projects
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 1.5 }}>
        {selectedProjects.length}/3 selected.
      </Typography>
      <ProjectsBar />
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {projects.map((p) => (
          <Typography key={p.id} variant="body2">
            • <strong>{p.name}</strong> — {p.description ?? p.status}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

function SequencesPanel() {
  const theme = useTheme();
  const open = useOpenSceneStudio();
  const selectStoryboard = useSelectStoryboard();

  function openStoryboard(id: string) {
    selectStoryboard(id);
    open("storyboard");
  }

  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: "background.paper",
        borderRadius: 2,
        overflow: "auto",
        color: "text.primary",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          pt: 2,
          pb: 1.25,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
          Scene Storyboards
        </Typography>
        <ButtonBase
          onClick={() => open("gallery")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            px: 1,
            py: 0.4,
            borderRadius: 1.5,
            fontSize: 11,
            fontWeight: 700,
            color: "primary.main",
            bgcolor: alpha(theme.palette.primary.main, 0.07),
            "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.13) },
          }}
        >
          <MovieCreationRoundedIcon sx={{ fontSize: 13 }} />
          Open Studio
        </ButtonBase>
      </Box>

      {/* Story list */}
      <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
        {SEED_STORYBOARDS.map((story) => {
          const firstAsset = SEED_ASSETS.find((a) => a.id === story.frameIds[0]);
          const thumbUrl = firstAsset
            ? firstAsset.kind === "video" && firstAsset.video?.posterFilename
              ? `/studio-assets/${firstAsset.file.folder}/${firstAsset.video.posterFilename}`
              : firstAsset.file.url
            : undefined;

          return (
            <ButtonBase
              key={story.id}
              onClick={() => openStoryboard(story.id)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                textAlign: "left",
                transition: "all 100ms ease",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.04),
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                },
              }}
            >
              {/* Thumbnail */}
              <Box
                sx={{
                  width: 64,
                  aspectRatio: "16/9",
                  borderRadius: 1,
                  overflow: "hidden",
                  bgcolor: "rgba(0,0,0,0.06)",
                  flexShrink: 0,
                }}
              >
                {thumbUrl && (
                  <Box
                    component="img"
                    src={thumbUrl}
                    alt={story.name}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
              </Box>

              {/* Text */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    fontSize: 12,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {story.name}
                </Typography>
                {story.description && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      lineHeight: 1.4,
                    }}
                  >
                    {story.description}
                  </Typography>
                )}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mt: 0.5 }}>
                  <Chip
                    label={story.sceneCode}
                    size="small"
                    sx={{
                      height: 16,
                      fontSize: 9,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                      "& .MuiChip-label": { px: 0.75 },
                    }}
                  />
                  <Typography variant="caption" sx={{ color: "text.disabled", fontSize: 10 }}>
                    {story.frameIds.length} frame{story.frameIds.length !== 1 ? "s" : ""}
                  </Typography>
                </Box>
              </Box>

              <OpenInNewRoundedIcon sx={{ fontSize: 14, color: "text.disabled", flexShrink: 0 }} />
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
}

export type { ViewportPanel };
// Avoid "unused export" lint by referencing the meta lookup.
void ENTITY_KIND_BY_KEY;

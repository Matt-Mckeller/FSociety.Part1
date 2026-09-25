"use client";

import { useEffect, useMemo } from "react";
import { Box, Chip, Stack, Typography, alpha, useTheme } from "@mui/material";
import FeaturedPlayListRoundedIcon from "@mui/icons-material/FeaturedPlayListRounded";
import { SEED_STORYBOARDS } from "../../store/seed-assets";
import {
  useSceneStudio,
  useSelectStoryboard,
} from "../../context/SceneStudioContext";
import { StoryboardTimeline } from "./StoryboardTimeline";

export function StoryboardView() {
  const theme = useTheme();
  const { selectedStoryboardId } = useSceneStudio();
  const selectStoryboard = useSelectStoryboard();

  const list = SEED_STORYBOARDS;
  const selected = useMemo(
    () => list.find((s) => s.id === selectedStoryboardId) ?? null,
    [list, selectedStoryboardId],
  );

  // Auto-select first on mount
  useEffect(() => {
    if (!selectedStoryboardId && list.length > 0) {
      selectStoryboard(list[0]!.id);
    }
  }, [list, selectedStoryboardId, selectStoryboard]);

  return (
    <Box sx={{ display: "flex", height: "100%", minHeight: 0 }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 220,
          flexShrink: 0,
          borderRight: "1px solid",
          borderColor: "divider",
          overflowY: "auto",
          p: 1.5,
          bgcolor: (t) => alpha(t.palette.background.paper, 0.6),
        }}
      >
        <Typography
          variant="overline"
          sx={{ fontSize: 10, fontWeight: 800, color: "text.disabled", letterSpacing: "0.08em", px: 0.5 }}
        >
          Storyboards
        </Typography>

        <Stack spacing={0.5} sx={{ mt: 1 }}>
          {list.length === 0 && (
            <Typography variant="caption" sx={{ color: "text.disabled", px: 0.5 }}>
              No storyboards yet.
            </Typography>
          )}
          {list.map((s) => {
            const isActive = s.id === selectedStoryboardId;
            return (
              <Box
                key={s.id}
                onClick={() => selectStoryboard(s.id)}
                sx={{
                  px: 1.25,
                  py: 1,
                  borderRadius: 1.5,
                  cursor: "pointer",
                  bgcolor: isActive
                    ? alpha(theme.palette.primary.main, 0.1)
                    : "transparent",
                  border: "1px solid",
                  borderColor: isActive
                    ? alpha(theme.palette.primary.main, 0.3)
                    : "transparent",
                  "&:hover": {
                    bgcolor: isActive
                      ? alpha(theme.palette.primary.main, 0.12)
                      : alpha(theme.palette.text.primary, 0.04),
                  },
                  transition: "all 100ms ease",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    fontSize: 12,
                    color: isActive ? "primary.main" : "text.primary",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.disabled",
                    fontFamily: "monospace",
                    fontSize: 10,
                  }}
                >
                  {s.sceneCode} · {s.frameIds.length} frame{s.frameIds.length !== 1 ? "s" : ""}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>

      {/* Detail pane */}
      <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
        {selected ? (
          <Stack spacing={2.5}>
            {/* Header card */}
            <Box
              sx={{
                borderRadius: 2.5,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                overflow: "hidden",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              }}
            >
              <Box
                sx={{
                  height: 3,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0)} 100%)`,
                }}
              />
              <Box sx={{ px: 2.5, py: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 2 }}>
                  <Box>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "baseline", gap: 1.5, flexWrap: "wrap" }}>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {selected.name}
                      </Typography>
                      <Chip
                        label={selected.sceneCode}
                        size="small"
                        sx={{
                          fontFamily: "monospace",
                          fontSize: 11,
                          height: 20,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: "primary.main",
                          fontWeight: 700,
                        }}
                      />
                    </Box>
                    {selected.description && (
                      <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.75 }}>
                        {selected.description}
                      </Typography>
                    )}
                  </Box>
                  <FeaturedPlayListRoundedIcon sx={{ color: "text.disabled", fontSize: 20, flexShrink: 0 }} />
                </Box>
              </Box>
            </Box>

            {/* Timeline */}
            <StoryboardTimeline storyboard={selected} />
          </Stack>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "text.disabled" }}>
              Select a storyboard from the sidebar.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

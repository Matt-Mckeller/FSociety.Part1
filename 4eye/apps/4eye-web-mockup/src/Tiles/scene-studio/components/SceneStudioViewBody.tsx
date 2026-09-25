"use client";

import { Box, IconButton, Typography, alpha, useTheme } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MovieCreationRoundedIcon from "@mui/icons-material/MovieCreationRounded";
import { FullScreenHudOverlay, FULL_SCREEN_OVERLAY_CONTENT_Z } from "@expanse/hud";
import {
  useSceneStudio,
  useCloseSceneStudio,
  useSetStudioView,
} from "../context/SceneStudioContext";
import { StudioViewToggle } from "./StudioViewToggle";
import { AssetGalleryView } from "./gallery/AssetGalleryView";
import { StoryboardView } from "./storyboard/StoryboardView";

/**
 * Pure view component for the Scene Studio overlay.
 * No open/close logic lives here — reads state from context.
 * Mount this inside <SceneStudioProviders> only.
 */
export function SceneStudioViewBody() {
  const { isOpen, view } = useSceneStudio();
  const close = useCloseSceneStudio();
  const setView = useSetStudioView();
  const theme = useTheme();

  return (
    <FullScreenHudOverlay
      open={isOpen}
      cornerBracket={{ lengthPct: 20, active: isOpen }}
    >
            {/* ── Header ─────────────────────────────────────────────── */}
            <Box
              sx={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                px: 2.5,
                py: 1.25,
                gap: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
                background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.04)} 0%, transparent 100%)`,
                position: "relative",
                zIndex: FULL_SCREEN_OVERLAY_CONTENT_Z,
              }}
            >
              {/* Identity */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
                <MovieCreationRoundedIcon sx={{ fontSize: 16, color: "primary.main", opacity: 0.8 }} />
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: 13,
                    letterSpacing: "-0.01em",
                    color: "text.primary",
                  }}
                >
                  Scene Studio
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.disabled",
                    fontSize: 10,
                    fontFamily: "monospace",
                    ml: 0.5,
                  }}
                >
                  Classroom of Tomorrow · S1
                </Typography>
              </Box>

              {/* View toggle — center */}
              <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <StudioViewToggle view={view} onChange={setView} />
              </Box>

              {/* Close */}
              <IconButton
                size="small"
                onClick={close}
                sx={{
                  flexShrink: 0,
                  color: "text.secondary",
                  "&:hover": { color: "text.primary" },
                }}
                aria-label="Close Scene Studio"
              >
                <CloseRoundedIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>

            {/* ── Content ────────────────────────────────────────────── */}
            <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
              {view === "gallery" && <AssetGalleryView />}
              {view === "storyboard" && <StoryboardView />}
            </Box>
    </FullScreenHudOverlay>
  );
}

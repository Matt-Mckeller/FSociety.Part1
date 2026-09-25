"use client";

import * as React from "react";
import { Box, Chip, Typography, alpha, useTheme, type Theme, ButtonBase } from "@mui/material";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import MovieCreationRoundedIcon from "@mui/icons-material/MovieCreationRounded";
import MovieFilterRoundedIcon from "@mui/icons-material/MovieFilterRounded";
import Link from "next/link";
import { TileContainer } from "@expanse/hud";
import { useOpenSceneStudio } from "@4eye/web/Tiles/scene-studio";
import { route } from "@4eye/web/lib/routes";

import {
  ROADMAP_CHECKPOINTS,
  type CheckpointStatus,
  type RoadmapCheckpoint,
} from "../command-center/store/strategy-data";

const TRACK_HEX: Record<RoadmapCheckpoint["track"], string> = {
  foundation: "#14b8a6",
  flagship:   "#3b82f6",
  income:     "#09c577",
};

const TRACK_LABEL: Record<RoadmapCheckpoint["track"], string> = {
  foundation: "Foundation",
  flagship:   "Flagship",
  income:     "Income",
};

function nodeColor(status: CheckpointStatus, theme: Theme): string {
  switch (status) {
    case "reached": return theme.palette.success.main;
    case "active":  return theme.palette.primary.main;
    default:        return alpha(theme.palette.text.primary, 0.28);
  }
}

function relativeLabel(offsetDays: number): string {
  if (offsetDays === 0) return "Today";
  const abs = Math.abs(offsetDays);
  const unit = abs >= 14 ? `${Math.round(abs / 7)}w` : `${abs}d`;
  return offsetDays < 0 ? `${unit} ago` : `in ${unit}`;
}

export default function SequencesPage() {
  const theme = useTheme();
  const openSceneStudio = useOpenSceneStudio();

  const ordered = React.useMemo(
    () => [...ROADMAP_CHECKPOINTS].sort((a, b) => a.offsetDays - b.offsetDays),
    [],
  );

  return (
    <TileContainer mode="fit">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 4,
            pt: 4,
            pb: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <TimelineRoundedIcon sx={{ fontSize: 22, color: "primary.main" }} />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Sequences
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ButtonBase
                component={Link}
                href={route("/appRealm/media")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  px: 1.75,
                  py: 0.75,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: alpha(theme.palette.primary.main, 0.4),
                  color: "primary.contrastText",
                  bgcolor: "primary.main",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 0.2,
                  transition: "all 120ms ease",
                  boxShadow: `0 2px 10px ${alpha(theme.palette.primary.main, 0.28)}`,
                  "&:hover": {
                    bgcolor: "primary.dark",
                    boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
                  },
                }}
              >
                <MovieFilterRoundedIcon sx={{ fontSize: 15 }} />
                Make media
              </ButtonBase>
              <ButtonBase
                onClick={() => openSceneStudio()}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  px: 1.35,
                  py: 0.65,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  color: "text.secondary",
                  fontSize: 11,
                  fontWeight: 700,
                  transition: "all 120ms ease",
                  "&:hover": {
                    color: "text.primary",
                    bgcolor: "action.hover",
                    borderColor: alpha(theme.palette.text.primary, 0.2),
                  },
                }}
              >
                <MovieCreationRoundedIcon sx={{ fontSize: 14 }} />
                Scene Studio
              </ButtonBase>
            </Box>
          </Box>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            Ordered milestones across all three tracks. Expands on the Plan tile&apos;s roadmap view.
            Use <Box component="span" sx={{ fontWeight: 700, color: "text.primary" }}>Make media</Box> to cut and publish shorts.
          </Typography>

          {/* Track legend */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {(["foundation", "flagship", "income"] as const).map((track) => (
              <Chip
                key={track}
                size="small"
                label={TRACK_LABEL[track]}
                sx={{
                  fontWeight: 700,
                  bgcolor: alpha(TRACK_HEX[track], 0.14),
                  color: TRACK_HEX[track],
                  border: `1px solid ${alpha(TRACK_HEX[track], 0.3)}`,
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Timeline */}
        <Box sx={{ flex: 1, px: 4, py: 3, position: "relative" }}>
          {/* Vertical spine */}
          <Box
            sx={{
              position: "absolute",
              left: 52,
              top: 24,
              bottom: 24,
              width: 2,
              bgcolor: "divider",
              borderRadius: 1,
            }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {ordered.map((cp) => {
              const color = nodeColor(cp.status, theme);
              const trackColor = TRACK_HEX[cp.track];
              return (
                <Box
                  key={cp.id}
                  sx={{ display: "flex", flexDirection: "row", gap: 2.5, position: "relative" }}
                >
                  {/* Node */}
                  <Box
                    sx={{
                      width: 18,
                      height: 18,
                      mt: 0.6,
                      flexShrink: 0,
                      borderRadius: "50%",
                      bgcolor: color,
                      border: `3px solid ${theme.palette.background.paper}`,
                      boxShadow:
                        cp.status === "active"
                          ? `0 0 0 5px ${alpha(color, 0.22)}`
                          : "none",
                      zIndex: 1,
                    }}
                  />

                  {/* Card */}
                  <Box
                    sx={{
                      flex: 1,
                      p: 2,
                      borderRadius: 2.5,
                      border: "1px solid",
                      borderColor:
                        cp.status === "active"
                          ? alpha(color, 0.45)
                          : alpha(trackColor, 0.2),
                      bgcolor:
                        cp.status === "active"
                          ? alpha(color, 0.06)
                          : alpha(trackColor, 0.03),
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5, flexWrap: "wrap" }}>
                      <Chip
                        size="small"
                        label={TRACK_LABEL[cp.track]}
                        sx={{
                          height: 20,
                          fontWeight: 700,
                          bgcolor: alpha(trackColor, 0.14),
                          color: trackColor,
                          fontSize: 11,
                        }}
                      />
                      <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                        {relativeLabel(cp.offsetDays)}
                      </Typography>
                      {cp.status === "reached" && (
                        <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 800 }}>
                          ✓ Reached
                        </Typography>
                      )}
                      {cp.status === "active" && (
                        <Typography variant="caption" sx={{ color: theme.palette.primary.main, fontWeight: 800 }}>
                          ● Active
                        </Typography>
                      )}
                    </Box>

                    <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.25 }}>
                      {cp.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.55 }}>
                      {cp.description}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Footer link back to Plan */}
        <Box
          sx={{
            px: 4,
            py: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <HubRoundedIcon sx={{ fontSize: 14, color: "text.disabled" }} />
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            Full crew &amp; task planning in the Plan tile
          </Typography>
        </Box>
      </Box>
    </TileContainer>
  );
}

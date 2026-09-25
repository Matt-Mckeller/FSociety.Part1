"use client";

import { useMemo } from "react";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import type { Storyboard } from "../../types/studio.types";
import { SEED_ASSETS } from "../../store/seed-assets";

interface Props {
  storyboard: Storyboard;
}

export function StoryboardTimeline({ storyboard }: Props) {
  const theme = useTheme();

  const frames = useMemo(
    () =>
      storyboard.frameIds
        .map((id) => SEED_ASSETS.find((a) => a.id === id))
        .filter(Boolean)
        .map((a, i) => ({ asset: a!, index: i })),
    [storyboard.frameIds],
  );

  if (frames.length === 0) {
    return (
      <Box
        sx={{
          py: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          border: "1px dashed",
          borderColor: "divider",
          color: "text.disabled",
        }}
      >
        <Typography variant="body2">No frames in this storyboard yet.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Strip */}
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          overflowX: "auto",
          pb: 1.5,
          px: 0.5,
        }}
      >
        {frames.map(({ asset, index }) => {
          const isVideo = asset.kind === 'video';
          const posterUrl = asset.video?.posterFilename
            ? `/studio-assets/${asset.file.folder}/${asset.video.posterFilename}`
            : undefined;
          const thumbUrl = isVideo ? posterUrl ?? asset.file.url : asset.file.url;

          return (
            <Box
              key={asset.id}
              sx={{
                flexShrink: 0,
                width: 160,
                borderRadius: 1.5,
                overflow: "hidden",
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.2),
                bgcolor: "background.paper",
                boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
              }}
            >
              {/* Thumbnail */}
              <Box sx={{ position: "relative", aspectRatio: "16/9", bgcolor: "rgba(0,0,0,0.06)" }}>
                <Box
                  component="img"
                  src={thumbUrl}
                  alt={asset.display.title}
                  loading="lazy"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {isVideo && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 4,
                      left: 4,
                      px: 0.75,
                      py: 0.15,
                      borderRadius: 0.75,
                      bgcolor: "rgba(0,0,0,0.6)",
                      color: "white",
                      fontSize: 9,
                      fontFamily: "monospace",
                      lineHeight: 1.2,
                    }}
                  >
                    {asset.video?.durationSec != null ? `${asset.video.durationSec}s` : "▶"}
                  </Box>
                )}
                {/* Frame number badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 4,
                    left: 4,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    bgcolor: alpha(theme.palette.primary.main, 0.9),
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                >
                  {index + 1}
                </Box>
              </Box>

              {/* Label */}
              <Box sx={{ px: 1, py: 0.75 }}>
                {asset.display.sceneCode && (
                  <Typography
                    variant="caption"
                    sx={{ fontFamily: "monospace", color: "text.disabled", fontSize: 9, display: "block" }}
                  >
                    {asset.display.sceneCode}
                  </Typography>
                )}
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    fontSize: 10,
                    lineHeight: 1.3,
                    color: "text.primary",
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {asset.display.title}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Frame count summary */}
      <Typography variant="caption" sx={{ color: "text.disabled", mt: 0.5, display: "block" }}>
        {frames.length} frame{frames.length !== 1 ? "s" : ""}
        {" · "}
        {storyboard.sceneCode}
      </Typography>
    </Box>
  );
}

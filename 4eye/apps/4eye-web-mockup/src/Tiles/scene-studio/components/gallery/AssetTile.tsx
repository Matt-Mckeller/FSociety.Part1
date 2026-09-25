"use client";

import { useState } from "react";
import { Box, Chip, Typography, alpha } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import type { StudioAsset } from "../../types/studio.types";
import { useSelectStudioAsset, useSceneStudio } from "../../context/SceneStudioContext";

interface Props {
  asset: StudioAsset;
}

export function AssetTile({ asset }: Props) {
  const { selectedAssetId } = useSceneStudio();
  const selectAsset = useSelectStudioAsset();
  const [hovered, setHovered] = useState(false);
  const isSelected = selectedAssetId === asset.id;
  const isGenerated = asset.origin.source !== 'imported';
  const isVideo = asset.kind === 'video';

  const posterUrl = asset.video?.posterFilename
    ? `/studio-assets/${asset.file.folder}/${asset.video.posterFilename}`
    : undefined;

  return (
    <Box
      onClick={() => selectAsset(isSelected ? null : asset.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        border: "2px solid",
        borderColor: isSelected ? "primary.main" : "transparent",
        boxShadow: isSelected
          ? (theme) => `0 0 0 3px ${alpha(theme.palette.primary.main, 0.18)}`
          : hovered
          ? "0 2px 12px rgba(0,0,0,0.18)"
          : "0 1px 4px rgba(0,0,0,0.10)",
        bgcolor: "background.paper",
        cursor: "pointer",
        transition: "box-shadow 120ms ease, border-color 120ms ease",
      }}
    >
      {/* Thumbnail */}
      <Box
        sx={{
          position: "relative",
          aspectRatio: "16/9",
          bgcolor: "rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        {isVideo ? (
          <Box
            component="img"
            src={posterUrl ?? asset.file.url}
            alt={asset.display.title}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Box
            component="img"
            src={asset.file.url}
            alt={asset.display.title}
            loading="lazy"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}

        {/* Video overlay */}
        {isVideo && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              opacity: hovered ? 0.6 : 1,
              transition: "opacity 150ms",
            }}
          >
            <Box
              sx={{
                bgcolor: "rgba(0,0,0,0.5)",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 14,
                pl: 0.5,
              }}
            >
              ▶
            </Box>
          </Box>
        )}

        {/* Duration badge */}
        {asset.video?.durationSec != null && (
          <Box
            sx={{
              position: "absolute",
              bottom: 6,
              left: 6,
              px: 0.75,
              py: 0.25,
              borderRadius: 1,
              bgcolor: "rgba(0,0,0,0.6)",
              color: "rgba(255,255,255,0.9)",
              fontSize: 10,
              fontFamily: "monospace",
              lineHeight: 1,
              pointerEvents: "none",
            }}
          >
            {asset.video.durationSec}s
          </Box>
        )}

        {/* Generated badge */}
        {isGenerated && (
          <Box
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              display: "flex",
              alignItems: "center",
              gap: 0.4,
              px: 0.75,
              py: 0.25,
              borderRadius: 1,
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              color: "white",
              pointerEvents: "none",
            }}
          >
            <AutoAwesomeRoundedIcon sx={{ fontSize: 10 }} />
          </Box>
        )}

        {/* Star badge */}
        {asset.catalog.starred && (
          <Box
            sx={{
              position: "absolute",
              bottom: 6,
              right: 6,
              color: "#facc15",
              pointerEvents: "none",
            }}
          >
            <StarRoundedIcon sx={{ fontSize: 16 }} />
          </Box>
        )}

        {/* Selected check */}
        {isSelected && (
          <Box
            sx={{
              position: "absolute",
              top: 6,
              left: 6,
              width: 20,
              height: 20,
              borderRadius: "50%",
              bgcolor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            ✓
          </Box>
        )}
      </Box>

      {/* Metadata */}
      <Box sx={{ px: 1.5, py: 1.25 }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 0.25 }}>
          {asset.display.sceneCode && (
            <Typography
              variant="caption"
              sx={{ fontFamily: "monospace", color: "text.disabled", flexShrink: 0, fontSize: 10 }}
            >
              {asset.display.sceneCode}
            </Typography>
          )}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: 12,
              lineHeight: 1.35,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {asset.display.title}
          </Typography>
        </Box>

        {asset.catalog.tags.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.4, mt: 0.75 }}>
            {asset.catalog.tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  height: 16,
                  fontSize: 10,
                  bgcolor: "action.hover",
                  color: "text.secondary",
                  "& .MuiChip-label": { px: 0.75 },
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

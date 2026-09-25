"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  ButtonBase,
  Chip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { DEFAULT_CTA } from "../data/catalog";
import { aTierClips, allPublishClips } from "../data/cutlist";
import type { PublishTier } from "../types";

const TIER_META: Record<PublishTier, { label: string; color: string }> = {
  A: { label: "A-tier · ship first", color: "#e11d48" },
  B: { label: "B-tier · sequel", color: "#6366f1" },
  hold: { label: "Hold · re-cut later", color: "#64748b" },
};

interface Props {
  videosHref: string;
  selectedClipId: string | null;
  onSelectClip: (id: string) => void;
}

export function PublishPanel({ videosHref, selectedClipId, onSelectClip }: Props) {
  const theme = useTheme();
  const [filter, setFilter] = useState<PublishTier | "all">("A");
  const selectedRef = useRef<HTMLDivElement | null>(null);

  const clips = useMemo(() => {
    const all = allPublishClips();
    if (filter === "all") return all;
    return all.filter((c) => c.tier === filter);
  }, [filter]);

  const aCount = aTierClips().length;
  const liveCount = useMemo(() => allPublishClips().filter((c) => c.live).length, []);

  useEffect(() => {
    if (!selectedClipId) return;
    const match = allPublishClips().find((c) => c.id === selectedClipId);
    if (match && match.tier !== filter && filter !== "all") {
      setFilter(match.tier);
    }
  }, [selectedClipId, filter]);

  useEffect(() => {
    if (!selectedClipId) return;
    selectedRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedClipId, filter]);

  return (
    <Box sx={{ height: "100%", overflow: "auto", p: { xs: 2, md: 3 } }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 2,
          mb: 2.5,
        }}
      >
        <Box sx={{ maxWidth: 580 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
            Publish
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {liveCount}/{allPublishClips().length} shorts are live in yen Videos. Ship the A-tier
            set ({aCount}) first — TikTok + YouTube for most; Instagram when the short is more you.
            Dumping all 28 kills reach.
          </Typography>
          <Typography
            sx={{
              mt: 1,
              fontSize: 12,
              color: "text.secondary",
              lineHeight: 1.45,
              fontStyle: "italic",
            }}
          >
            CTA: “{DEFAULT_CTA}”
          </Typography>
        </Box>
        <ButtonBase
          component="a"
          href={videosHref}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            px: 1.75,
            py: 0.85,
            borderRadius: 2,
            border: "1px solid",
            borderColor: alpha(theme.palette.primary.main, 0.35),
            color: "primary.main",
            bgcolor: alpha(theme.palette.primary.main, 0.06),
            fontSize: 12,
            fontWeight: 800,
            "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.12) },
          }}
        >
          Open Videos
          <OpenInNewRoundedIcon sx={{ fontSize: 14 }} />
        </ButtonBase>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2 }}>
        {(["A", "B", "hold", "all"] as const).map((id) => {
          const active = filter === id;
          const label = id === "all" ? "All" : TIER_META[id].label;
          const color = id === "all" ? theme.palette.primary.main : TIER_META[id].color;
          return (
            <Chip
              key={id}
              label={label}
              onClick={() => setFilter(id)}
              sx={{
                fontWeight: 700,
                fontSize: 11,
                bgcolor: active ? alpha(color, 0.16) : "action.hover",
                color: active ? color : "text.secondary",
                border: "1px solid",
                borderColor: active ? alpha(color, 0.4) : "transparent",
              }}
            />
          );
        })}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 1.5,
        }}
      >
        {clips.map((clip) => {
          const tier = TIER_META[clip.tier];
          const active = selectedClipId === clip.id;
          const deep = clip.videoId ? `${videosHref}#${clip.videoId}` : videosHref;
          return (
            <Box
              key={clip.id}
              ref={active ? selectedRef : undefined}
              onClick={() => onSelectClip(clip.id)}
              sx={{
                borderRadius: 2.5,
                border: "1px solid",
                borderColor: active ? "primary.main" : "divider",
                overflow: "hidden",
                bgcolor: "background.paper",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                boxShadow: active
                  ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.16)}`
                  : "none",
                transition: "border-color 120ms ease, box-shadow 120ms ease",
              }}
            >
              <Box
                sx={{
                  aspectRatio: "9 / 14",
                  maxHeight: 280,
                  bgcolor: "rgba(0,0,0,0.85)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {clip.src ? (
                  <Box
                    component="video"
                    src={clip.src}
                    muted
                    playsInline
                    preload="metadata"
                    controls
                    onClick={(e) => e.stopPropagation()}
                    sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 12,
                    }}
                  >
                    Missing file
                  </Box>
                )}
                {clip.tier === "A" && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.4,
                      px: 0.75,
                      py: 0.25,
                      borderRadius: 1,
                      bgcolor: alpha("#e11d48", 0.9),
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 800,
                    }}
                  >
                    <StarRoundedIcon sx={{ fontSize: 12 }} />
                    A-tier
                  </Box>
                )}
                {clip.live && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.35,
                      px: 0.75,
                      py: 0.25,
                      borderRadius: 1,
                      bgcolor: alpha("#16a34a", 0.92),
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 800,
                    }}
                  >
                    <CheckCircleRoundedIcon sx={{ fontSize: 12 }} />
                    Live
                  </Box>
                )}
              </Box>
              <Box sx={{ p: 1.5 }}>
                <Typography sx={{ fontWeight: 800, fontSize: 13, lineHeight: 1.3, mb: 0.35 }}>
                  {clip.title}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.4, mb: 0.75 }}>
                  {clip.description}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.4, mb: 1 }}>
                  {clip.platforms.map((p) => (
                    <Chip
                      key={p}
                      size="small"
                      label={p === "youtube" ? "YouTube" : p === "tiktok" ? "TikTok" : "Instagram"}
                      sx={{
                        height: 18,
                        fontSize: 10,
                        fontWeight: 800,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        "& .MuiChip-label": { px: 0.75 },
                      }}
                    />
                  ))}
                </Box>
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 9,
                    color: "text.disabled",
                    mb: 1,
                    wordBreak: "break-all",
                  }}
                >
                  {clip.filedAs}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.4, mb: 1 }}>
                  <Chip
                    size="small"
                    label={tier.label}
                    sx={{
                      height: 18,
                      fontSize: 10,
                      fontWeight: 700,
                      bgcolor: alpha(tier.color, 0.12),
                      color: tier.color,
                      "& .MuiChip-label": { px: 0.75 },
                    }}
                  />
                  {clip.tags.slice(0, 3).map((tag) => (
                    <Chip
                      key={tag}
                      size="small"
                      label={tag}
                      sx={{
                        height: 18,
                        fontSize: 10,
                        bgcolor: "action.hover",
                        "& .MuiChip-label": { px: 0.75 },
                      }}
                    />
                  ))}
                </Box>
                {clip.videoId && (
                  <ButtonBase
                    component="a"
                    href={deep}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: "primary.main",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.4,
                    }}
                  >
                    Open in Videos
                    <OpenInNewRoundedIcon sx={{ fontSize: 12 }} />
                  </ButtonBase>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Box, Chip, Typography, alpha, useTheme } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { CUT_PIPELINE_STEPS } from "../data/catalog";
import {
  PHENOMINAL_CUTLIST,
  SOURCE_LABELS,
  SOURCE_ORDER,
  clipsForSource,
} from "../data/cutlist";

interface Props {
  selectedClipId: string | null;
  onSelectClip: (clipKey: string) => void;
}

export function CutPanel({ selectedClipId, onSelectClip }: Props) {
  const theme = useTheme();
  const [sourceFilter, setSourceFilter] = useState<string | "all">("all");

  const sources = useMemo(
    () => SOURCE_ORDER.filter((s) => Boolean(PHENOMINAL_CUTLIST.sources[s])),
    [],
  );

  const visibleSources = sourceFilter === "all" ? sources : sources.filter((s) => s === sourceFilter);

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "auto",
        p: { xs: 2, md: 3 },
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box sx={{ maxWidth: 760 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
          Cut pipeline
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Phenominal flow is rendered and promoted. Next: ship the A-tier set from Publish —
          captions + one CTA. Select a clip to preview it there.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(7, 1fr)",
          },
          gap: 1,
        }}
      >
        {CUT_PIPELINE_STEPS.map((step, i) => {
          const done = step.status === "done";
          const next = step.status === "next";
          return (
            <Box
              key={step.id}
              sx={{
                p: 1.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: next
                  ? alpha(theme.palette.primary.main, 0.45)
                  : "divider",
                bgcolor: next
                  ? alpha(theme.palette.primary.main, 0.06)
                  : "background.paper",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.75 }}>
                {done ? (
                  <CheckCircleRoundedIcon sx={{ fontSize: 16, color: "success.main" }} />
                ) : (
                  <RadioButtonUncheckedRoundedIcon
                    sx={{ fontSize: 16, color: next ? "primary.main" : "text.disabled" }}
                  />
                )}
                <Typography sx={{ fontSize: 11, fontWeight: 800, color: "text.disabled" }}>
                  {String(i + 1).padStart(2, "0")}
                </Typography>
              </Box>
              <Typography sx={{ fontWeight: 800, fontSize: 13, mb: 0.35 }}>
                {step.label}
              </Typography>
              <Typography sx={{ fontSize: 11, color: "text.secondary", lineHeight: 1.35 }}>
                {step.detail}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
        <Chip
          label="All sources"
          onClick={() => setSourceFilter("all")}
          sx={{
            fontWeight: 700,
            fontSize: 11,
            bgcolor: sourceFilter === "all" ? alpha(theme.palette.primary.main, 0.14) : "action.hover",
            color: sourceFilter === "all" ? "primary.main" : "text.secondary",
          }}
        />
        {sources.map((source) => {
          const active = sourceFilter === source;
          return (
            <Chip
              key={source}
              label={SOURCE_LABELS[source] ?? source}
              onClick={() => setSourceFilter(source)}
              sx={{
                fontWeight: 700,
                fontSize: 11,
                bgcolor: active ? alpha(theme.palette.primary.main, 0.14) : "action.hover",
                color: active ? "primary.main" : "text.secondary",
              }}
            />
          );
        })}
      </Box>

      {visibleSources.map((source) => {
        const clips = clipsForSource(source);
        const meta = PHENOMINAL_CUTLIST.sources[source];
        return (
          <Box key={source}>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mb: 1.25 }}>
              <Typography sx={{ fontWeight: 800, fontSize: 15 }}>
                {SOURCE_LABELS[source] ?? source}
              </Typography>
              <Typography sx={{ fontFamily: "monospace", fontSize: 10, color: "text.disabled" }}>
                {meta.w}×{meta.h} · {meta.layout} · {clips.length} clips
              </Typography>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: 1.25,
              }}
            >
              {clips.map((clip) => {
                const clipKey = `${seriesKey(source)}/${clip.id}`;
                const active = selectedClipId === clipKey;
                return (
                  <Box
                    key={clip.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectClip(clipKey)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelectClip(clipKey);
                      }
                    }}
                    sx={{
                      p: 1.75,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: active ? "primary.main" : "divider",
                      bgcolor: active
                        ? alpha(theme.palette.primary.main, 0.06)
                        : "background.paper",
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.75,
                      cursor: "pointer",
                      transition: "border-color 120ms ease, box-shadow 120ms ease",
                      boxShadow: active
                        ? `0 0 0 3px ${alpha(theme.palette.primary.main, 0.16)}`
                        : "none",
                      "&:hover": {
                        borderColor: alpha(theme.palette.primary.main, 0.45),
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                      <PlayArrowRoundedIcon
                        sx={{ fontSize: 16, color: "primary.main", mt: 0.2, opacity: 0.7 }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 800, fontSize: 13, lineHeight: 1.3 }}>
                          {clip.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "monospace",
                            fontSize: 10,
                            color: "text.disabled",
                            mt: 0.25,
                          }}
                        >
                          {clip.start} → {clip.end}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.4 }}>
                      {clip.description ?? clip.hook}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.4, mt: 0.25 }}>
                      {(clip.platforms ?? ["tiktok", "youtube"]).map((p) => (
                        <Chip
                          key={p}
                          size="small"
                          label={p === "youtube" ? "YT" : p === "tiktok" ? "TT" : "IG"}
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
                      {clip.tags.map((tag) => (
                        <Chip
                          key={tag}
                          size="small"
                          label={tag}
                          sx={{
                            height: 18,
                            fontSize: 10,
                            fontWeight: 700,
                            bgcolor: "action.hover",
                            "& .MuiChip-label": { px: 0.75 },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

function seriesKey(source: string): string {
  if (source === "gov") return "future-gov-war";
  if (source === "vid3") return "vid3";
  return "godtier";
}

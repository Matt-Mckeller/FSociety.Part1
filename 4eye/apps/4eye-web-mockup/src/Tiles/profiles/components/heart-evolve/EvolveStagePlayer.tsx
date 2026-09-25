"use client";

/**
 * EvolveStagePlayer — Heart.Evolve interactive transformation.
 *
 * Modes: gallery (default) · evolve · slides.
 * Variants: color / art passes of the same Now → Becoming → Destination arc.
 * Media is portrait-first (~2:3); stage plane and tiles match that ratio.
 */

import * as React from "react";
import Link from "next/link";
import { Box, IconButton, Stack, Tooltip, Typography, alpha } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {
  HEART_EVOLVE,
  currentVariant,
  flattenSlides,
  framesForStage,
  primaryFrame,
  type EvolveFrame,
  type EvolveMode,
  type EvolveSeries,
  type EvolveStageId,
  type EvolveVariant,
} from "@yen/content/heart-evolve";

const STAGE_ORDER: EvolveStageId[] = ["now", "becoming", "destination"];
const MODE_OPTS: { id: EvolveMode; label: string }[] = [
  { id: "gallery", label: "Gallery" },
  { id: "evolve", label: "Evolve" },
  { id: "slides", label: "Slides" },
];

/** Bumped when defaults / layout change so stale prefs don't fight the new gallery-first UX. */
const STORAGE_KEY = "yen.heart-evolve.v2";

/** Portrait stage plane — matches Grow · Sexy Vision stills (~1050×1500). */
const STAGE_RATIO = "3 / 4";
const TILE_RATIO = "3 / 4";
/** Faces + crowns sit upper-center; keep them in frame when covering. */
const PORTRAIT_POSITION = "center 18%";

function readPrefs(): { mode: EvolveMode; variantId: string } {
  if (typeof window === "undefined") {
    return { mode: "gallery", variantId: currentVariant().id };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { mode: "gallery", variantId: currentVariant().id };
    const parsed = JSON.parse(raw) as { mode?: EvolveMode; variantId?: string };
    return {
      mode: parsed.mode ?? "gallery",
      variantId: parsed.variantId ?? currentVariant().id,
    };
  } catch {
    return { mode: "gallery", variantId: currentVariant().id };
  }
}

function isVectorSrc(src: string) {
  return /\.svg(\?|$)/i.test(src);
}

function Chip({
  active,
  accent,
  onClick,
  children,
}: {
  active?: boolean;
  accent: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        px: 1.25,
        py: 0.5,
        borderRadius: 1.25,
        border: "1px solid",
        borderColor: active ? accent : alpha(accent, 0.28),
        bgcolor: active ? alpha(accent, 0.16) : alpha(accent, 0.04),
        color: active ? accent : "text.primary",
        fontSize: 12.5,
        fontWeight: 700,
        cursor: "pointer",
        lineHeight: 1.2,
        "&:hover": { borderColor: accent, bgcolor: alpha(accent, 0.12) },
      }}
    >
      {children}
    </Box>
  );
}

function FrameMedia({
  frame,
  dimmed,
}: {
  frame: EvolveFrame | null;
  dimmed?: boolean;
}) {
  if (!frame) {
    return (
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "#0c0a09",
          opacity: dimmed ? 0 : 1,
          transition: "opacity 420ms ease",
        }}
        aria-hidden
      />
    );
  }

  const vector = isVectorSrc(frame.src);

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        bgcolor: "#0c0a09",
        opacity: dimmed ? 0 : 1,
        transition: "opacity 420ms ease",
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={frame.src}
        alt={frame.title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: vector ? "contain" : "cover",
          objectPosition: vector ? "center" : PORTRAIT_POSITION,
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}

function FooterLinks({
  series,
  accent,
  compact,
  embedded,
}: {
  series: EvolveSeries;
  accent: string;
  compact?: boolean;
  embedded?: boolean;
}) {
  if (compact) return null;
  return (
    <Stack direction="row" spacing={2} sx={{ mt: 1.25 }}>
      {!embedded && (
        <Box
          component={Link}
          href={series.profileHref}
          sx={{ fontSize: 13, fontWeight: 650, color: accent, textDecoration: "none" }}
        >
          Open on profile →
        </Box>
      )}
      <Box
        component={Link}
        href="/videos#heart-evolve-walk"
        sx={{ fontSize: 13, fontWeight: 650, color: "text.secondary", textDecoration: "none" }}
      >
        Walkthrough slot
      </Box>
    </Stack>
  );
}

export function EvolveStagePlayer({
  series = HEART_EVOLVE,
  compact = false,
  embedded = false,
}: {
  series?: EvolveSeries;
  /** Tighter chrome for profile embed. */
  compact?: boolean;
  /** Already on the profile — hide the self-link. */
  embedded?: boolean;
}) {
  const prefs = React.useMemo(() => readPrefs(), []);
  const [mode, setMode] = React.useState<EvolveMode>(prefs.mode);
  const [variantId, setVariantId] = React.useState(prefs.variantId);
  const [stageIdx, setStageIdx] = React.useState(0);
  const [slideIdx, setSlideIdx] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [frameIdxInStage, setFrameIdxInStage] = React.useState(0);
  const reduce = React.useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const variant: EvolveVariant =
    series.variants.find((v) => v.id === variantId) ?? currentVariant(series);
  const accent = variant.accent || series.accent;
  const stageId = STAGE_ORDER[stageIdx] ?? "now";
  const stageFrames = framesForStage(variant, stageId);
  const activeFrame =
    stageFrames[Math.min(frameIdxInStage, Math.max(0, stageFrames.length - 1))] ??
    primaryFrame(variant, stageId);
  const slides = flattenSlides(variant, series.stages);
  const stageMeta = series.stages.find((s) => s.id === stageId);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, variantId }));
    } catch {
      /* ignore */
    }
  }, [mode, variantId]);

  React.useEffect(() => {
    setFrameIdxInStage(0);
  }, [stageIdx, variantId]);

  React.useEffect(() => {
    setSlideIdx(0);
    setStageIdx(0);
    setFrameIdxInStage(0);
    setPlaying(false);
  }, [variantId]);

  React.useEffect(() => {
    if (!playing || mode === "gallery") return;
    const ms = reduce ? 2200 : 2800;
    const id = window.setInterval(() => {
      if (mode === "slides") {
        setSlideIdx((i) => (i + 1) % Math.max(1, slides.length));
        return;
      }
      setStageIdx((i) => (i + 1) % STAGE_ORDER.length);
    }, ms);
    return () => window.clearInterval(id);
  }, [playing, mode, slides.length, reduce]);

  React.useEffect(() => {
    if (mode !== "slides") return;
    const frame = slides[slideIdx];
    if (!frame) return;
    const idx = STAGE_ORDER.indexOf(frame.stage);
    if (idx >= 0) setStageIdx(idx);
  }, [mode, slideIdx, slides]);

  const goStage = (dir: -1 | 1) => {
    setPlaying(false);
    if (mode === "slides") {
      setSlideIdx((i) => (i + dir + slides.length) % slides.length);
      return;
    }
    setStageIdx((i) => (i + dir + STAGE_ORDER.length) % STAGE_ORDER.length);
  };

  const openSlide = (i: number) => {
    setSlideIdx(i);
    setMode("slides");
    setPlaying(false);
  };

  const displayFrame: EvolveFrame | null =
    mode === "slides" ? slides[slideIdx] ?? null : activeFrame;

  return (
    <Box
      id="heart-evolve"
      sx={{
        scrollMarginTop: 28,
        borderRadius: compact ? 2 : 2.5,
        border: "1px solid",
        borderColor: alpha(accent, 0.35),
        overflow: "hidden",
        bgcolor: "background.paper",
        maxWidth: compact ? 560 : 960,
      }}
    >
      {/* Header */}
      <Stack
        direction={{ zero: "column", tablet: "row" }}
        spacing={1.25}
        sx={{
          px: compact ? 1.5 : 2,
          py: compact ? 1.25 : 1.5,
          alignItems: { tablet: "center" },
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: alpha(accent, 0.05),
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 13,
              fontWeight: 800,
              color: accent,
            }}
          >
            {series.code}
          </Typography>
          {!compact && (
            <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 0.35, maxWidth: "54ch" }}>
              {series.lede}
            </Typography>
          )}
        </Box>
        <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: "wrap" }}>
          {MODE_OPTS.map((m) => (
            <Chip key={m.id} accent={accent} active={mode === m.id} onClick={() => setMode(m.id)}>
              {m.label}
            </Chip>
          ))}
        </Stack>
      </Stack>

      {/* Variant selector */}
      <Stack
        direction="row"
        spacing={0.75}
        useFlexGap
        sx={{ px: compact ? 1.5 : 2, py: 1, borderBottom: "1px solid", borderColor: "divider", flexWrap: "wrap" }}
      >
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 750,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "text.secondary",
            alignSelf: "center",
            mr: 0.5,
          }}
        >
          Variant
        </Typography>
        {series.variants.map((v) => (
          <Tooltip key={v.id} title={v.note ?? v.label} arrow>
            <Box component="span">
              <Chip
                accent={v.accent}
                active={variant.id === v.id}
                onClick={() => setVariantId(v.id)}
              >
                {v.label}
              </Chip>
            </Box>
          </Tooltip>
        ))}
      </Stack>

      {mode === "gallery" ? (
        <Box sx={{ p: compact ? 1.25 : 1.75 }}>
          {STAGE_ORDER.map((sid) => {
            const meta = series.stages.find((s) => s.id === sid);
            const frames = framesForStage(variant, sid);
            if (!frames.length) return null;
            return (
              <Box key={sid} sx={{ mb: 2.25, "&:last-child": { mb: 0 } }}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "baseline", mb: 1, px: 0.25 }}
                >
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: 1.1,
                      textTransform: "uppercase",
                      color: accent,
                    }}
                  >
                    {meta?.label ?? sid}
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>
                    {meta?.blurb}
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    display: "grid",
                    gap: 1.25,
                    gridTemplateColumns: {
                      zero: "repeat(2, minmax(0, 1fr))",
                      tablet: "repeat(auto-fill, minmax(168px, 1fr))",
                    },
                  }}
                >
                  {frames.map((f) => {
                    const globalIdx = slides.findIndex((s) => s.id === f.id);
                    const vector = isVectorSrc(f.src);
                    return (
                      <Box
                        key={f.id}
                        component="button"
                        type="button"
                        onClick={() => openSlide(globalIdx >= 0 ? globalIdx : 0)}
                        sx={{
                          position: "relative",
                          aspectRatio: TILE_RATIO,
                          borderRadius: 1.5,
                          border: "1px solid",
                          borderColor: alpha(accent, 0.22),
                          overflow: "hidden",
                          cursor: "pointer",
                          p: 0,
                          bgcolor: "#0c0a09",
                          textAlign: "left",
                          transition: "border-color 160ms ease, transform 160ms ease",
                          "&:hover": {
                            borderColor: accent,
                            transform: reduce ? "none" : "translateY(-2px)",
                          },
                          "&:hover .he-cap": { opacity: 1 },
                          "&:focus-visible": {
                            outline: `2px solid ${accent}`,
                            outlineOffset: 2,
                          },
                        }}
                      >
                        <Box
                          component="img"
                          src={f.src}
                          alt={f.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: vector ? "contain" : "cover",
                            objectPosition: vector ? "center" : PORTRAIT_POSITION,
                            display: "block",
                          }}
                        />
                        <Box
                          className="he-cap"
                          sx={{
                            position: "absolute",
                            inset: "auto 0 0 0",
                            px: 1,
                            py: 0.85,
                            background:
                              "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.72) 55%)",
                            color: "#fff",
                            opacity: { zero: 1, tablet: 0.92 },
                            transition: "opacity 160ms ease",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 12.5,
                              fontWeight: 750,
                              lineHeight: 1.25,
                              textShadow: "0 1px 2px rgba(0,0,0,0.45)",
                            }}
                          >
                            {f.title}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            );
          })}

          <Box sx={{ pt: 0.5, px: 0.25 }}>
            <FooterLinks series={series} accent={accent} compact={compact} embedded={embedded} />
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              px: compact ? 1 : 1.5,
              py: compact ? 1.25 : 1.75,
              bgcolor: alpha("#0c0a09", 0.03),
              borderBottom: `3px solid ${accent}`,
            }}
          >
            <Box
              sx={{
                display: "inline-grid",
                gridTemplateColumns: "auto auto auto",
                alignItems: "center",
                gap: { zero: 0.75, tablet: 1.25 },
                px: { zero: 0.75, tablet: 1 },
                py: { zero: 0.75, tablet: 1 },
                bgcolor: "#0c0a09",
                borderRadius: 2,
              }}
            >
              <IconButton
                aria-label="Previous"
                onClick={() => goStage(-1)}
                sx={{
                  bgcolor: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  width: 40,
                  height: 40,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.16)" },
                }}
              >
                <ChevronLeftRoundedIcon />
              </IconButton>

              <Box
                sx={{
                  position: "relative",
                  width: { zero: "min(72vw, 300px)", tablet: 420 },
                  aspectRatio: STAGE_RATIO,
                  borderRadius: 1.5,
                  overflow: "hidden",
                  boxShadow: `0 0 0 1px ${alpha(accent, 0.35)}`,
                }}
              >
                <FrameMedia key={displayFrame?.id ?? "empty"} frame={displayFrame} />
              </Box>

              <IconButton
                aria-label="Next"
                onClick={() => goStage(1)}
                sx={{
                  bgcolor: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  width: 40,
                  height: 40,
                  "&:hover": { bgcolor: "rgba(255,255,255,0.16)" },
                }}
              >
                <ChevronRightRoundedIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Stage scrubber + play */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              px: compact ? 1.5 : 2,
              py: 1.25,
              borderTop: "1px solid",
              borderColor: "divider",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 0.75,
            }}
          >
            <IconButton
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => setPlaying((p) => !p)}
              sx={{ color: accent, border: "1px solid", borderColor: alpha(accent, 0.35) }}
            >
              {playing ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
            </IconButton>

            {mode === "evolve" &&
              STAGE_ORDER.map((id, i) => {
                const meta = series.stages.find((s) => s.id === id);
                return (
                  <Chip
                    key={id}
                    accent={accent}
                    active={stageIdx === i}
                    onClick={() => {
                      setPlaying(false);
                      setStageIdx(i);
                    }}
                  >
                    {meta?.label ?? id}
                  </Chip>
                );
              })}

            {mode === "slides" && (
              <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>
                {slideIdx + 1} / {slides.length}
              </Typography>
            )}

            {stageFrames.length > 1 && mode === "evolve" && (
              <Stack direction="row" spacing={0.5} sx={{ ml: "auto" }}>
                {stageFrames.map((f, i) => (
                  <Box
                    key={f.id}
                    component="button"
                    type="button"
                    aria-label={f.title}
                    onClick={() => setFrameIdxInStage(i)}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      border: "none",
                      p: 0,
                      cursor: "pointer",
                      bgcolor: i === frameIdxInStage ? accent : alpha(accent, 0.25),
                    }}
                  />
                ))}
              </Stack>
            )}
          </Stack>

          <Box sx={{ px: compact ? 1.5 : 2, pb: 1.75 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 750 }}>
              {displayFrame?.title ?? stageMeta?.label}
            </Typography>
            <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 0.4, lineHeight: 1.5 }}>
              {displayFrame?.caption ?? stageMeta?.blurb}
            </Typography>
            <FooterLinks series={series} accent={accent} compact={compact} embedded={embedded} />
          </Box>
        </>
      )}
    </Box>
  );
}

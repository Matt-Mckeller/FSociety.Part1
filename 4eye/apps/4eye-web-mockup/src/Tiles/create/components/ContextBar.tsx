"use client";

/**
 * ContextBar — a compact, HUD-style status rail modeled on the home-page
 * slideshow timeline. It answers two questions at a glance:
 *
 *   1. WHAT is selected (context) — a breadcrumb of the active Sequence →
 *      Scene (→ focus), each as a glyph + label pill.
 *   2. WHAT is happening and in WHAT ORDER (pipeline) — an ordered rail of
 *      workflow steps (Browse → Seed → Generate → Review → Promote) whose
 *      dots fill as each step completes, with the active step highlighted
 *      and connected by gradient segments (the slide-timeline look).
 *
 * Presentational only — the host computes `context` + `steps` from state.
 */

import { Box, Stack, Tooltip, Typography } from "@mui/material";

import { BrandIcon } from "./BrandIcon";
import type { GlyphName } from "./brand-glyphs";

const BRAND_FONT = "Xpens, Roboto, sans-serif";

export type StepStatus = "done" | "active" | "upcoming";

export interface ContextSegment {
  id: string;
  glyph?: GlyphName;
  label: string;
  /** Small caption under the label (e.g. status / count). */
  detail?: string;
  /** Accent color for the segment glyph chip. */
  color?: string;
}

export interface PipelineStep {
  id: string;
  label: string;
  glyph: GlyphName;
  status: StepStatus;
  /** Optional hover detail. */
  detail?: string;
  color?: string;
}

export interface ContextBarProps {
  context: ContextSegment[];
  steps: PipelineStep[];
  /** Optional eyebrow shown above the context breadcrumb. */
  eyebrow?: string;
  onStepClick?: (id: string) => void;
}

const DEFAULT_ACCENT = "#2c4f76";
const DONE_COLOR = "#2e7d32";
const UPCOMING_COLOR = "#c2cad6";

function dotColor(step: PipelineStep): string {
  if (step.status === "active") return step.color ?? DEFAULT_ACCENT;
  if (step.status === "done") return DONE_COLOR;
  return UPCOMING_COLOR;
}

export function ContextBar({
  context,
  steps,
  eyebrow = "Context",
  onStepClick,
}: ContextBarProps) {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 2,
        border: "1px solid #e6eaf0",
        bgcolor: "#fbfcfe",
        px: 1.5,
        py: 1,
        overflow: "hidden",
      }}
    >
      {/* top accent line (timeline signature) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${DONE_COLOR}, ${DEFAULT_ACCENT})`,
          opacity: 0.85,
        }}
      />

      <Stack
        spacing={1}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
        }}
      >
        {/* ── Context breadcrumb ─────────────────────────────────────────── */}
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{
              fontFamily: BRAND_FONT,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "text.secondary",
              fontWeight: 700,
              fontSize: 10,
            }}
          >
            {eyebrow}
          </Typography>
          <Stack
            spacing={0.5}
            useFlexGap
            sx={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap", mt: 0.25 }}
          >
            {context.length === 0 && (
              <Typography variant="body2" color="text.disabled">
                Nothing selected
              </Typography>
            )}
            {context.map((seg, i) => (
              <Stack
                key={seg.id}
                spacing={0.5}
                sx={{ flexDirection: "row", alignItems: "center" }}
              >
                {i > 0 && (
                  <Box sx={{ color: "#c2cad6", display: "inline-flex", mx: 0.25 }}>
                    <BrandIcon name="promote" size={12} />
                  </Box>
                )}
                <Stack
                  spacing={0.75}
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    px: 0.9,
                    py: 0.4,
                    borderRadius: 1.5,
                    bgcolor: "#fff",
                    border: "1px solid #e6eaf0",
                    minWidth: 0,
                  }}
                >
                  {seg.glyph && (
                    <Box sx={{ color: seg.color ?? DEFAULT_ACCENT, display: "inline-flex" }}>
                      <BrandIcon name={seg.glyph} size={15} />
                    </Box>
                  )}
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      noWrap
                      sx={{ fontFamily: BRAND_FONT, fontWeight: 600, fontSize: 12.5, lineHeight: 1.1, maxWidth: 200 }}
                    >
                      {seg.label}
                    </Typography>
                    {seg.detail && (
                      <Typography sx={{ fontSize: 10, color: "text.secondary", lineHeight: 1.1 }}>
                        {seg.detail}
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* ── Pipeline rail ──────────────────────────────────────────────── */}
        <Stack
          spacing={0}
          sx={{ flexDirection: "row", alignItems: "flex-start", flexShrink: 0 }}
        >
          {steps.map((step, i) => {
            const color = dotColor(step);
            const prevColor = i > 0 ? dotColor(steps[i - 1]) : color;
            const isActive = step.status === "active";
            return (
              <Stack
                key={step.id}
                spacing={0}
                sx={{ flexDirection: "row", alignItems: "flex-start" }}
              >
                {/* connector segment from previous dot */}
                {i > 0 && (
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      display: "flex",
                      alignItems: "center",
                      mt: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: 3,
                        borderRadius: 2,
                        background: `linear-gradient(90deg, ${prevColor}, ${color})`,
                      }}
                    />
                  </Box>
                )}

                <Tooltip title={step.detail ?? step.label} arrow>
                  <Stack
                    spacing={0.25}
                    onClick={() => onStepClick?.(step.id)}
                    sx={{
                      alignItems: "center",
                      width: 58,
                      cursor: onStepClick ? "pointer" : "default",
                    }}
                  >
                    <Box
                      sx={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: step.status === "upcoming" ? UPCOMING_COLOR : "#fff",
                        bgcolor: step.status === "upcoming" ? "#fff" : color,
                        border: "2px solid",
                        borderColor: color,
                        boxShadow: isActive ? `0 0 0 3px ${color}22` : "none",
                        transition: "all 140ms ease",
                      }}
                    >
                      <BrandIcon name={step.glyph} size={14} />
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: BRAND_FONT,
                        fontSize: 10,
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? color : "text.secondary",
                        lineHeight: 1.1,
                        textAlign: "center",
                      }}
                      noWrap
                    >
                      {step.label}
                    </Typography>
                  </Stack>
                </Tooltip>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
}

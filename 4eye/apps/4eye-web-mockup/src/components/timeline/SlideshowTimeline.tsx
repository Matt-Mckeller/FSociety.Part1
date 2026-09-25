"use client";

import {
  Box,
  ButtonBase,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useId, useMemo } from "react";

import type {
  SlideshowTimelineProps,
  TimelineGroup,
  TimelineStep,
} from "@4eye/web/components/timeline/types";
import { AutoplayProgressBar } from "@4eye/web/components/timeline/AutoplayProgressBar";

/**
 * SlideshowTimeline — unified responsive horizontal timeline.
 *
 * Desktop / tablet (>= theme.breakpoints.tablet, 768px):
 *   - Scrunched layout: past beads pinned to the left edge with no
 *     connectors between them (a tight "trail of beads"); active dot
 *     and any future dots fill the remaining row, separated by
 *     gradient connector segments that fade between adjacent dot
 *     colors.
 *   - Past beads carry NO inline marker — their step label appears
 *     as a `Tooltip` on hover/focus instead. Active and every future
 *     dot render the step's `Icon` underneath the dot (one square
 *     icon per slide; replaces the prior `tabTitle ?? label` text).
 *     The icon sits inside a fixed-width cell so neighboring icons
 *     never collide and edge cells stay inside the timeline card.
 *   - Header above the row shows three label tiers for the active
 *     step: tabTitle (eyebrow) → group.label (act color) → subLabel
 *     (caption).
 *
 * Mobile (< 768px):
 *   - Sliding window: ALL past beads + active + up to 2 labeled
 *     future cells, then optional scrunched future-overflow beads.
 *     Past + overflow beads are scrunched (no markers, tooltip on
 *     long-press / hover); active + labeled future cells render the
 *     step's `Icon` under the dot. Chevron buttons let the user
 *     step beyond the visible cells.
 *   - Header collapses to a single line: group.label + active step
 *     descriptor (`subLabel ?? label`) + counter.
 *
 * Shared:
 *   - AutoplayProgressBar at the very top (per-slide auto-advance fill).
 *   - Active-group color tints the bottom border accent (desktop).
 *   - Connector segments use SVG `linearGradient` interpolating between
 *     each pair of adjacent dot colors so group transitions feel
 *     continuous instead of abrupt.
 */

/**
 * Dot sizing tokens. Past > active > future on both viewports so
 * completed steps read as the most prominent visual mass on the rail.
 * Past beads are tightly packed without connectors; the larger size
 * makes them read as a deliberate "completed trail" rather than
 * scattered remnants of where the user has been.
 */
const DOT_SIZE = {
  desktop: { past: 16, active: 11, future: 7 },
  mobile: { past: 13, active: 9, future: 6 },
} as const;

/**
 * Fixed total height for every dot button AND every connector segment
 * wrapper. Equal to the largest dot + 2x its touch pad so the biggest
 * dot fits with breathing room. With every button this tall and every
 * dot vertically centered inside, ALL dot centers in the row land on
 * the same Y axis (= BUTTON_AREA / 2). Segment wrappers share the
 * same height with their gradient bar centered inside, so the
 * connector line passes exactly through every dot's center regardless
 * of which size variant the dot is.
 */
const BUTTON_AREA = {
  desktop: 32,
  mobile: 24,
} as const;

/**
 * Horizontal padding around past beads inside their button. Kept
 * minimal so the past pile reads as a tight cluster instead of a row
 * of widely spaced buttons.
 */
const PAST_BEAD_PAD_X = 1;

/** Gap between adjacent past beads (a hair of breathing room, not touching). */
const PAST_BEAD_GAP = 2;

/**
 * Width of the active / future cells on desktop. Caps how wide a
 * label can render so it never extends past the cell boundary, which
 * in turn keeps it inside the timeline card at the row's edges.
 */
const CELL_W_DESKTOP = { min: 72, max: 96 } as const;
const CELL_W_MOBILE = { min: 56, max: 72 } as const;

/**
 * Per-step icon size (px) shown under each dot in place of the prior
 * text label. Active dots get a larger icon so the current step
 * carries the most visual weight even though its dot is the smaller
 * "medium" size; future dots get a quieter icon at a smaller scale.
 */
const ICON_SIZE = {
  desktop: { active: 22, future: 18 },
  mobile: { active: 18, future: 14 },
} as const;

/** Connector segment thickness. */
const SEGMENT_HEIGHT = {
  desktop: 4,
  mobile: 3,
} as const;

/**
 * Mobile window: ALL past beads + active + up to 2 future. Past beads
 * have no per-dot cap (they scrunch tightly); only future steps have
 * a sliding-window cap so the strip can't grow unboundedly when the
 * user is at the start of a long deck.
 */
const MOBILE_FUTURE_MAX = 2;

export default function SlideshowTimeline({
  steps,
  activeIdx: rawIdx,
  onStepClick,
  groups,
  defaultColor = "#2563eb",
  autoplayDurationMs,
  autoplayKey,
}: SlideshowTimelineProps) {
  const theme = useTheme();
  const isTabletUp = useMediaQuery(theme.breakpoints.up("tablet"), {
    noSsr: true,
  });

  const activeIdx = Math.max(0, Math.min(steps.length - 1, rawIdx));

  const groupById = useMemo(() => {
    const m = new Map<string | number, TimelineGroup>();
    (groups ?? []).forEach((g) => m.set(g.id, g));
    return m;
  }, [groups]);

  const colorFor = (gid?: string | number) =>
    (gid !== undefined && groupById.get(gid)?.color) || defaultColor;

  const dotColorAt = (i: number) => colorFor(steps[i]?.groupId);

  const activeStep = steps[activeIdx];
  const activeGroup = activeStep
    ? groupById.get(activeStep.groupId ?? "")
    : undefined;
  const activeColor = activeGroup?.color ?? defaultColor;

  // Stable per-instance id base for SVG gradient defs (one <linearGradient>
  // per connector segment).
  const gradIdBase = useId().replace(/[:]/g, "");

  return isTabletUp ? (
    <DesktopShell
      steps={steps}
      activeIdx={activeIdx}
      onStepClick={onStepClick}
      activeStep={activeStep}
      activeGroup={activeGroup}
      activeColor={activeColor}
      dotColorAt={dotColorAt}
      autoplayDurationMs={autoplayDurationMs}
      autoplayKey={autoplayKey}
      gradIdBase={gradIdBase}
    />
  ) : (
    <MobileShell
      steps={steps}
      activeIdx={activeIdx}
      onStepClick={onStepClick}
      activeStep={activeStep}
      activeGroup={activeGroup}
      activeColor={activeColor}
      dotColorAt={dotColorAt}
      autoplayDurationMs={autoplayDurationMs}
      autoplayKey={autoplayKey}
      gradIdBase={gradIdBase}
    />
  );
}

// ─── shared shell prop type ───────────────────────────────────────────────

interface ShellProps {
  steps: readonly TimelineStep[];
  activeIdx: number;
  onStepClick: (idx: number) => void;
  activeStep: TimelineStep | undefined;
  activeGroup: TimelineGroup | undefined;
  activeColor: string;
  dotColorAt: (i: number) => string;
  autoplayDurationMs: number | null | undefined;
  autoplayKey: string | number | undefined;
  gradIdBase: string;
}

/** Resolve the label to render under an active or future dot. */
function inlineLabelFor(step: TimelineStep): string {
  return step.tabTitle ?? step.label;
}

// ─── gradient connector segment ──────────────────────────────────────────

/**
 * Flex-grow connector segment with an SVG `linearGradient` fading
 * `fromColor` → `toColor`. Each segment instance owns a unique
 * gradient id (composed of `idBase` + `id`) so multiple segments on
 * the same page don't collide.
 *
 * The segment wrapper has the SAME height as a dot button
 * (`BUTTON_AREA`) and centers the gradient bar vertically inside.
 * Combined with `align-items: flex-start` on the outer dot row,
 * this guarantees the line's Y center matches every dot's Y center
 * regardless of which size variant the dot is.
 *
 * `flex: 1 1 0` with `min-width: 8` makes the segment expand to absorb
 * the row's free space, which is what causes future segments to
 * visibly stretch as the active step advances.
 */
function GradientSegment({
  fromColor,
  toColor,
  idBase,
  id,
  height,
  buttonArea,
}: {
  fromColor: string;
  toColor: string;
  idBase: string;
  id: string;
  height: number;
  buttonArea: number;
}) {
  const gradId = `${idBase}-grad-${id}`;
  return (
    <Box
      aria-hidden
      sx={{
        flex: "1 1 0",
        minWidth: 8,
        height: buttonArea,
        display: "flex",
        alignItems: "center",
        opacity: 0.85,
      }}
    >
      <Box
        component="svg"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        sx={{
          width: "100%",
          height: height,
          display: "block",
          borderRadius: height / 2
        }}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="100"
          height={height}
          rx={height / 2}
          ry={height / 2}
          fill={`url(#${gradId})`}
        />
      </Box>
    </Box>
  );
}

// ─── desktop ──────────────────────────────────────────────────────────────

function DesktopShell({
  steps,
  activeIdx,
  onStepClick,
  activeStep,
  activeGroup,
  activeColor,
  dotColorAt,
  autoplayDurationMs,
  autoplayKey,
  gradIdBase,
}: ShellProps) {
  const n = steps.length;

  return (
    <Box
      sx={{
        position: "absolute",
        top: { tablet: 24, laptop: 32 },
        left: "50%",
        transform: "translateX(-50%)",
        width: { tablet: "calc(100% - 32px)", laptop: "calc(100% - 48px)" },
        maxWidth: { tablet: 720, laptop: 980, laptopL: 1200, fourK: 1400 },
        zIndex: 10,
        bgcolor: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(10px)",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1.5,
        borderBottom: "2px solid",
        borderBottomColor: activeColor,
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        px: 3,
        py: 2,
        transition: "border-bottom-color 0.3s ease",
      }}
    >
      <AutoplayProgressBar
        durationMs={autoplayDurationMs}
        resetKey={autoplayKey}
        color={activeColor}
        thickness={3}
      />
      {/* Three-tier header for the active step */}
      <Box sx={{ mb: 1.5 }}>
        {activeStep?.tabTitle ? (
          <Typography
            sx={{
              fontSize: 11,
              letterSpacing: "0.2em",
              fontWeight: 700,
              textTransform: "uppercase",
              color: "text.disabled",
              lineHeight: 1.2,
              mb: 0.25,
            }}
          >
            {activeStep.tabTitle}
          </Typography>
        ) : null}

        <Stack direction="row" spacing={2} sx={{
          alignItems: "baseline"
        }}>
          {activeGroup ? (
            <Typography
              sx={{
                fontSize: 16,
                letterSpacing: "0.08em",
                fontWeight: 700,
                color: activeColor,
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                textTransform: "uppercase",
              }}
            >
              {activeGroup.label}
            </Typography>
          ) : null}
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: "nowrap",
              fontVariantNumeric: "tabular-nums"
            }}>
            Step {activeIdx + 1} of {n}
          </Typography>
        </Stack>

        {activeStep?.subLabel ? (
          <Typography
            sx={{
              fontSize: 13,
              fontStyle: "italic",
              color: "text.secondary",
              lineHeight: 1.3,
              mt: 0.25,
            }}
          >
            {activeStep.subLabel}
          </Typography>
        ) : null}
      </Box>
      {/* Dot row — past pile + segments + active + future cells.
          align-items: flex-start lines all cells up at the top of the
          row. Every dot button and segment wrapper inside is exactly
          BUTTON_AREA tall with its dot/line vertically centered, so
          the connector line passes through every dot's center
          regardless of dot size. */}
      <Box
        role="navigation"
        aria-label="Slideshow steps"
        sx={{
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
          minHeight:
            BUTTON_AREA.desktop +
            ICON_SIZE.desktop.active +
            8 /* dot button + icon slot + breathing room */,
          overflow: "visible",
        }}
      >
        {/* Past pile — pinned to the left, no flex, no labels (tooltip only) */}
        {activeIdx > 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: `${PAST_BEAD_GAP}px`,
              flex: "0 0 auto",
              mr: 0.5,
              height: BUTTON_AREA.desktop,
            }}
          >
            {steps.slice(0, activeIdx).map((s, i) => (
              <BareBeadButton
                key={s.id}
                step={s}
                index={i}
                onClick={() => onStepClick(i)}
                dotColor={dotColorAt(i)}
                dotSize={DOT_SIZE.desktop.past}
                buttonArea={BUTTON_AREA.desktop}
                filled
              />
            ))}
          </Box>
        ) : null}

        {/* Past → Active gradient segment */}
        {activeIdx > 0 ? (
          <GradientSegment
            idBase={gradIdBase}
            id="d-pa"
            fromColor={dotColorAt(activeIdx - 1)}
            toColor={dotColorAt(activeIdx)}
            height={SEGMENT_HEIGHT.desktop}
            buttonArea={BUTTON_AREA.desktop}
          />
        ) : null}

        {/* Active dot cell */}
        <DesktopDotCell
          step={steps[activeIdx]!}
          index={activeIdx}
          onClick={() => onStepClick(activeIdx)}
          kind="active"
          dotColor={dotColorAt(activeIdx)}
        />

        {/* Future dots — segment-then-cell pairs */}
        {steps.slice(activeIdx + 1).map((s, i) => {
          const globalIdx = activeIdx + 1 + i;
          const fromColor = dotColorAt(globalIdx - 1);
          const toColor = dotColorAt(globalIdx);
          return (
            <Box
              key={s.id}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flex: "1 1 0",
                minWidth: 0,
              }}
            >
              <GradientSegment
                idBase={gradIdBase}
                id={`d-f${globalIdx}`}
                fromColor={fromColor}
                toColor={toColor}
                height={SEGMENT_HEIGHT.desktop}
                buttonArea={BUTTON_AREA.desktop}
              />
              <DesktopDotCell
                step={s}
                index={globalIdx}
                onClick={() => onStepClick(globalIdx)}
                kind="future"
                dotColor={dotColorAt(globalIdx)}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

/**
 * Bare bead button — a colored dot in a tight button with no inline
 * label (Tooltip on hover/focus instead). Used both for past beads
 * (`filled: true`, completed steps on the left) and for the
 * mobile-only "future overflow" pile (`filled: false`, upcoming steps
 * beyond the labeled future-cell cap, scrunched on the right).
 *
 * Button height equals the shared `buttonArea` so the dot's center
 * aligns with every other dot in the row; horizontal padding is
 * minimal so adjacent beads scrunch together.
 */
function BareBeadButton({
  step,
  index,
  onClick,
  dotColor,
  dotSize,
  buttonArea,
  filled,
}: {
  step: TimelineStep;
  index: number;
  onClick: () => void;
  dotColor: string;
  dotSize: number;
  buttonArea: number;
  filled: boolean;
}) {
  return (
    <Tooltip title={step.label} placement="top" arrow enterDelay={150}>
      <ButtonBase
        onClick={onClick}
        aria-label={`Go to step ${index + 1}: ${step.label}`}
        sx={{
          width: dotSize + PAST_BEAD_PAD_X * 2,
          height: buttonArea,
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
          "&:focus-visible": {
            outline: "none",
            boxShadow: `0 0 0 2px ${dotColor}88`,
          },
        }}
      >
        <Box
          sx={{
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            bgcolor: filled ? dotColor : "background.paper",
            border: "2px solid",
            borderColor: dotColor,
            transition: "all 0.25s ease",
          }}
        />
      </ButtonBase>
    </Tooltip>
  );
}

/**
 * Active or future dot cell on desktop.
 *
 * The dot zone + icon/label are merged into a SINGLE `ButtonBase` so
 * the entire column is one continuous tap/hover target with no gap
 * between the dot and the icon. A `Tooltip` wraps the whole button.
 *
 * Active cell: dot (medium) → icon + text label inline below.
 * Future cell: dot (small) → icon only (no label text) below.
 *
 * The dot lives inside a fixed-height inner box (`BUTTON_AREA.desktop`)
 * so the connector-line center still aligns with every other dot in the
 * row regardless of how tall the label area below it grows.
 */
function DesktopDotCell({
  step,
  index,
  onClick,
  kind,
  dotColor,
}: {
  step: TimelineStep;
  index: number;
  onClick: () => void;
  kind: "active" | "future";
  dotColor: string;
}) {
  const isActive = kind === "active";
  const dotSize = isActive
    ? DOT_SIZE.desktop.active
    : DOT_SIZE.desktop.future;
  const iconSize = isActive
    ? ICON_SIZE.desktop.active
    : ICON_SIZE.desktop.future;

  return (
    <Box
      sx={{
        flex: "0 0 auto",
        minWidth: CELL_W_DESKTOP.min,
        maxWidth: CELL_W_DESKTOP.max,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Tooltip title={step.label} placement="top" arrow enterDelay={150}>
        {/* Unified button: dot zone + icon/label — one continuous tap target */}
        <ButtonBase
          onClick={onClick}
          aria-label={`Go to step ${index + 1}: ${step.label}`}
          aria-current={isActive ? "step" : undefined}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            borderRadius: 1.5,
            transition: "background-color 0.15s ease",
            "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
            "&:focus-visible": {
              outline: "none",
              boxShadow: `0 0 0 2px ${dotColor}88`,
            },
          }}
        >
          {/* Dot zone — fixed BUTTON_AREA height preserves line alignment */}
          <Box
            sx={{
              width: BUTTON_AREA.desktop,
              height: BUTTON_AREA.desktop,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                bgcolor: isActive ? dotColor : "background.paper",
                border: "2px solid",
                borderColor: dotColor,
                boxShadow: isActive ? `0 0 0 4px ${dotColor}33` : "none",
                transition: "all 0.25s ease",
              }}
            />
          </Box>

          {/* Icon + label below — no margin-top so dot zone touches icon area */}
          <CellMarker
            step={step}
            isActive={isActive}
            iconSize={iconSize}
            iconColor={dotColor}
            textFontSize={{ tablet: 11, laptop: 12 }}
            marginTop={0}
            showLabel={isActive}
            paddingBottom={0.75}
          />
        </ButtonBase>
      </Tooltip>
    </Box>
  );
}

// ─── mobile ───────────────────────────────────────────────────────────────

function MobileShell({
  steps,
  activeIdx,
  onStepClick,
  activeStep,
  activeGroup,
  activeColor,
  dotColorAt,
  autoplayDurationMs,
  autoplayKey,
  gradIdBase,
}: ShellProps) {
  const n = steps.length;
  const canPrev = activeIdx > 0;
  const canNext = activeIdx < n - 1;

  // Show ALL past beads (no cap) and up to MOBILE_FUTURE_MAX future
  // dots. Past beads scrunch tightly on the left so even the longest
  // deck stays inside a phone viewport; future cap keeps the strip's
  // right side from sprawling early in the deck.
  const visiblePast = activeIdx;
  const visibleFuture = Math.min(MOBILE_FUTURE_MAX, n - 1 - activeIdx);
  const endIdx = activeIdx + visibleFuture; // inclusive

  const subtitle = activeStep?.subLabel ?? activeStep?.label ?? "";

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        bgcolor: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid",
        borderBottomColor: "divider",
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      }}
      role="navigation"
      aria-label="Slideshow progress"
    >
      <AutoplayProgressBar
        durationMs={autoplayDurationMs}
        resetKey={autoplayKey}
        color={activeColor}
        thickness={2}
      />
      {/* Header row */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          px: 1.5,
          py: 1
        }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {activeGroup ? (
            <Typography
              sx={{
                fontSize: 10,
                lineHeight: 1.1,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: activeColor,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {activeGroup.label}
            </Typography>
          ) : null}
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: 1.2,
              fontWeight: 700,
              color: "text.primary",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Typography
          aria-label={`Step ${activeIdx + 1} of ${n}`}
          sx={{
            color: "text.secondary",
            fontSize: 12,
            fontWeight: 600,
            whiteSpace: "nowrap",
            flexShrink: 0,
            fontVariantNumeric: "tabular-nums"
          }}>
          {activeIdx + 1}/{n}
        </Typography>

        <Stack direction="row" spacing={0} sx={{ flexShrink: 0 }}>
          <IconButton
            size="small"
            onClick={() => canPrev && onStepClick(activeIdx - 1)}
            disabled={!canPrev}
            aria-label="Previous step"
            sx={{ p: 0.5 }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => canNext && onStepClick(activeIdx + 1)}
            disabled={!canNext}
            aria-label="Next step"
            sx={{ p: 0.5 }}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
      {/* Dot strip — same vertical-alignment guarantees as desktop:
          every dot button + every segment wrapper is BUTTON_AREA tall
          with its dot/line vertically centered, so the connector line
          passes through every dot's center regardless of dot size. */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          px: 1.5,
          pb: 1,
          minHeight:
            BUTTON_AREA.mobile +
            ICON_SIZE.mobile.active +
            6 /* dot button + icon slot + breathing room */,
          overflow: "visible",
        }}
      >
        {/* Past beads (no cap on mobile — show every completed step) */}
        {visiblePast > 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: `${PAST_BEAD_GAP}px`,
              flex: "0 0 auto",
              mr: 0.5,
              height: BUTTON_AREA.mobile,
            }}
          >
            {steps.slice(0, activeIdx).map((s, i) => (
              <BareBeadButton
                key={s.id}
                step={s}
                index={i}
                onClick={() => onStepClick(i)}
                dotColor={dotColorAt(i)}
                dotSize={DOT_SIZE.mobile.past}
                buttonArea={BUTTON_AREA.mobile}
                filled
              />
            ))}
          </Box>
        ) : null}

        {/* Past → Active gradient (only if there are visible past beads) */}
        {visiblePast > 0 ? (
          <GradientSegment
            idBase={gradIdBase}
            id="m-pa"
            fromColor={dotColorAt(activeIdx - 1)}
            toColor={dotColorAt(activeIdx)}
            height={SEGMENT_HEIGHT.mobile}
            buttonArea={BUTTON_AREA.mobile}
          />
        ) : null}

        {/* Active cell */}
        <MobileDotCell
          step={steps[activeIdx]!}
          index={activeIdx}
          onClick={() => onStepClick(activeIdx)}
          kind="active"
          dotColor={dotColorAt(activeIdx)}
        />

        {/* Future cells (max MOBILE_FUTURE_MAX) — segment + cell pairs */}
        {Array.from({ length: visibleFuture }, (_, i) => {
          const globalIdx = activeIdx + 1 + i;
          const s = steps[globalIdx]!;
          return (
            <Box
              key={s.id}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flex: "1 1 0",
                minWidth: 0,
              }}
            >
              <GradientSegment
                idBase={gradIdBase}
                id={`m-f${globalIdx}`}
                fromColor={dotColorAt(globalIdx - 1)}
                toColor={dotColorAt(globalIdx)}
                height={SEGMENT_HEIGHT.mobile}
                buttonArea={BUTTON_AREA.mobile}
              />
              <MobileDotCell
                step={s}
                index={globalIdx}
                onClick={() => onStepClick(globalIdx)}
                kind="future"
                dotColor={dotColorAt(globalIdx)}
              />
            </Box>
          );
        })}

        {/* Future bead pile — steps beyond the labeled future-cell cap.
            Mirror of the past pile on the left, but hollow (not yet
            completed). Connected to the last labeled future cell by a
            gradient segment so the line stays continuous. */}
        {endIdx < n - 1 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flex: "1 1 0",
              minWidth: 0,
            }}
          >
            <GradientSegment
              idBase={gradIdBase}
              id="m-fb"
              fromColor={dotColorAt(endIdx)}
              toColor={dotColorAt(endIdx + 1)}
              height={SEGMENT_HEIGHT.mobile}
              buttonArea={BUTTON_AREA.mobile}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: `${PAST_BEAD_GAP}px`,
                flex: "0 0 auto",
                ml: 0.5,
                height: BUTTON_AREA.mobile,
              }}
            >
              {steps.slice(endIdx + 1).map((s, i) => {
                const idx = endIdx + 1 + i;
                return (
                  <BareBeadButton
                    key={s.id}
                    step={s}
                    index={idx}
                    onClick={() => onStepClick(idx)}
                    dotColor={dotColorAt(idx)}
                    dotSize={DOT_SIZE.mobile.future}
                    buttonArea={BUTTON_AREA.mobile}
                    filled={false}
                  />
                );
              })}
            </Box>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

/** Active or future dot cell on mobile (smaller variant of DesktopDotCell). */
function MobileDotCell({
  step,
  index,
  onClick,
  kind,
  dotColor,
}: {
  step: TimelineStep;
  index: number;
  onClick: () => void;
  kind: "active" | "future";
  dotColor: string;
}) {
  const isActive = kind === "active";
  const dotSize = isActive
    ? DOT_SIZE.mobile.active
    : DOT_SIZE.mobile.future;
  const iconSize = isActive
    ? ICON_SIZE.mobile.active
    : ICON_SIZE.mobile.future;

  return (
    <Box
      sx={{
        flex: "0 0 auto",
        minWidth: CELL_W_MOBILE.min,
        maxWidth: CELL_W_MOBILE.max,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Tooltip title={step.label} placement="top" arrow enterDelay={150}>
        {/* Unified button: dot zone + icon/label — one continuous tap target */}
        <ButtonBase
          onClick={onClick}
          aria-label={`Go to step ${index + 1}: ${step.label}`}
          aria-current={isActive ? "step" : undefined}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            borderRadius: 1,
            "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
            "&:focus-visible": {
              outline: "none",
              boxShadow: `0 0 0 2px ${dotColor}88`,
            },
          }}
        >
          {/* Dot zone — fixed BUTTON_AREA height preserves line alignment */}
          <Box
            sx={{
              width: BUTTON_AREA.mobile,
              height: BUTTON_AREA.mobile,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                bgcolor: isActive ? dotColor : "background.paper",
                border: "2px solid",
                borderColor: dotColor,
                boxShadow: isActive ? `0 0 0 3px ${dotColor}33` : "none",
                transition: "all 0.25s ease",
              }}
            />
          </Box>

          {/* Icon + label below */}
          <CellMarker
            step={step}
            isActive={isActive}
            iconSize={iconSize}
            iconColor={dotColor}
            textFontSize={10}
            marginTop={0}
            showLabel={isActive}
            paddingBottom={0.5}
          />
        </ButtonBase>
      </Tooltip>
    </Box>
  );
}

/**
 * Per-cell marker rendered directly INSIDE the unified `ButtonBase`
 * (below the dot zone) in active / future cells on both viewports.
 *
 * When the step ships an `Icon`:
 *   - Active  → icon + text label inline (icon left, label right).
 *   - Future  → icon only (no text; pass showLabel=false).
 * When there is no Icon (text fallback):
 *   - Active  → text label (bold, dot color).
 *   - Future  → text label (regular, secondary color).
 *
 * `marginTop={0}` is intentional — the caller (DesktopDotCell /
 * MobileDotCell) has eliminated the gap between the dot button and
 * this marker so the two regions form one continuous hover zone.
 * `paddingBottom` adds breathing room below the icon/text inside
 * the unified button.
 */
function CellMarker({
  step,
  isActive,
  iconSize,
  iconColor,
  textFontSize,
  marginTop,
  showLabel = false,
  paddingBottom = 0,
}: {
  step: TimelineStep;
  isActive: boolean;
  iconSize: number;
  iconColor: string;
  textFontSize: number | { tablet: number; laptop: number };
  marginTop: number;
  /** When true AND step has an Icon, render the text label beside the icon. */
  showLabel?: boolean;
  /** Bottom padding (MUI spacing units) inside the marker wrapper. */
  paddingBottom?: number;
}) {
  if (step.Icon) {
    const Icon = step.Icon;
    return (
      <Box
        sx={{
          mt: marginTop,
          pb: paddingBottom,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: showLabel ? 0.5 : 0,
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <Icon size={iconSize} color={iconColor} />
        {showLabel && (
          <Typography
            sx={{
              fontSize: textFontSize,
              fontWeight: 700,
              color: iconColor,
              lineHeight: 1.2,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {inlineLabelFor(step)}
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Typography
      sx={{
        mt: marginTop,
        pb: paddingBottom,
        fontSize: textFontSize,
        fontWeight: isActive ? 700 : 500,
        color: isActive ? iconColor : "text.secondary",
        lineHeight: 1.2,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        textAlign: "center",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "100%",
      }}
    >
      {inlineLabelFor(step)}
    </Typography>
  );
}

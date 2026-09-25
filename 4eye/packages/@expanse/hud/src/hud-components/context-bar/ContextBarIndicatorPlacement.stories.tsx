/**
 * ContextBar — Triangle Indicator *Placement* Variants
 *
 * Companion to `ContextBarSelectionIndicators.stories.tsx`.
 *
 * Those earlier variants explored *what* the indicator should look
 * like (dots / segments / underline / mini glyphs / triangles).
 * Variant E (mini glyphs → triangles) was selected and shipped.
 *
 * This file explores *where* the triangle strip sits and how it
 * relates to the label. The current production placement has two
 * problems visible on the live AI Chat page:
 *
 *   1. The indicator is anchored to the *button* center, not the
 *      *label* center, so with `icon-label-right` it drifts right.
 *   2. The BIG selected-state strip (3 × 22px chips) is wider than
 *      the label and bleeds outside the button into its neighbor.
 *      It also straddles the bottom edge of the pill.
 *
 * Below, five placement options A–E are rendered side by side at
 * three selection states (0 / 1 / 3 selected) so we can compare how
 * each layout handles the empty-state, partial-selection, and
 * full-selection cases without overlap or overflow.
 *
 * Each option uses the same triangle chip atoms (`TriangleChip`) so
 * the only thing changing between rows is geometry / placement.
 */

import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import HubIcon from "@mui/icons-material/Hub";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";

// =============================================================================
// Tokens (mirror the live AiChatHeaderContextBar)
// =============================================================================

const ACCENTS = {
  domain: "#22c55e",
  goals: "#3b82f6",
  projects: "#a855f7",
};

// Symbol palette (subset of COLOR_MAP) — used to color the filled
// triangles so they read as "real" entity selections.
const SYMBOL_HEX = ["#fbbf24", "#60a5fa", "#a78bfa"];

const MAX = 3;

// Triangle chip geometry (matches AiChatHeaderContextBar).
const TRI_SMALL_W = 12;
const TRI_SMALL_H = 11;
const TRI_BIG_W = 22;
const TRI_BIG_H = 20;

// Pill height token (matches HUD_HEADER_BAR_SIZE.desktop).
const PILL_H = 40;

// =============================================================================
// Atoms
// =============================================================================

interface TriangleChipProps {
  filled: boolean;
  big: boolean;
  accent: string;
  /** Index used to pick a fill color when `filled`. */
  index?: number;
}

function TriangleChip({ filled, big, accent, index = 0 }: TriangleChipProps) {
  const w = big ? TRI_BIG_W : TRI_SMALL_W;
  const h = big ? TRI_BIG_H : TRI_SMALL_H;
  const sw = big ? 1.75 : 1.25;
  const dash = big ? "4 2" : "2.5 1.5";
  const pts = `${w / 2},${sw} ${w - sw},${h - sw} ${sw},${h - sw}`;

  if (!filled) {
    return (
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        style={{ display: "block", overflow: "visible" }}
        aria-hidden
      >
        <polygon
          points={pts}
          fill="none"
          stroke={`${accent}cc`}
          strokeWidth={sw}
          strokeLinejoin="round"
          strokeDasharray={dash}
        />
      </svg>
    );
  }

  const hex = SYMBOL_HEX[index % SYMBOL_HEX.length];
  return (
    <Box
      sx={{
        display: "inline-flex",
        filter: `drop-shadow(0 0 3px ${hex})`,
      }}
    >
      <Box
        sx={{
          width: w,
          height: h,
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          bgcolor: `${hex}aa`,
        }}
      />
    </Box>
  );
}

interface StripProps {
  count: number;
  big: boolean;
  accent: string;
  gap?: number;
}

function TriangleStrip({ count, big, accent, gap = 4 }: StripProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        gap: `${gap}px`,
        alignItems: "center",
      }}
    >
      {Array.from({ length: MAX }).map((_, i) => (
        <TriangleChip
          key={i}
          filled={i < count}
          big={big}
          accent={accent}
          index={i}
        />
      ))}
    </Box>
  );
}

// =============================================================================
// Tab specs
// =============================================================================

interface TabSpec {
  id: "domains" | "goals" | "projects";
  label: string;
  icon: React.ReactNode;
  accent: string;
  selected: number;
}

function makeTabs(goals: number, projects: number): TabSpec[] {
  return [
    {
      id: "domains",
      label: "Default",
      icon: <HubIcon />,
      accent: ACCENTS.domain,
      selected: 0,
    },
    {
      id: "goals",
      label: "Goals",
      icon: <TrackChangesIcon />,
      accent: ACCENTS.goals,
      selected: goals,
    },
    {
      id: "projects",
      label: "Projects",
      icon: <FolderSpecialIcon />,
      accent: ACCENTS.projects,
      selected: projects,
    },
  ];
}

// =============================================================================
// Pill chrome (shared)
// =============================================================================

function Pill({
  height = PILL_H,
  children,
}: {
  height?: number;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0,
        height,
        px: 0.5,
        borderRadius: 999,
        background: "rgba(20,20,28,0.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        color: "#fff",
      }}
    >
      {children}
    </Box>
  );
}

// =============================================================================
// Placement variants — each is a complete bar render
// =============================================================================

/**
 * A — Vertical button content (label-stack inside the pill).
 *
 *   [icon] [ label   ]
 *          [ △ △ △   ]
 *
 * Pill height grows from 40 → ~56 to fit. Indicator never escapes
 * the button. Strip is naturally centered under the label because
 * it lives in the same flex column.
 */
function VariantA({ tabs, active }: { tabs: TabSpec[]; active: TabSpec["id"] }) {
  return (
    <Pill height={56}>
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <Box
            key={tab.id}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              height: 48,
              px: 1.25,
              mx: 0.25,
              borderRadius: 999,
              background: isActive ? "rgba(255,255,255,0.10)" : "transparent",
            }}
          >
            <Box
              sx={{
                "& svg": { fontSize: 18 },
                color: isActive ? tab.accent : "rgba(255,255,255,0.78)",
                display: "inline-flex",
              }}
            >
              {tab.icon}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, lineHeight: 1 }}
              >
                {tab.label}
              </Typography>
              {tab.id !== "domains" ? (
                <TriangleStrip
                  count={tab.selected}
                  big={false}
                  accent={tab.accent}
                />
              ) : (
                <Box sx={{ height: TRI_SMALL_H }} />
              )}
            </Box>
          </Box>
        );
      })}
    </Pill>
  );
}

/**
 * B — Horizontal layout, strip anchored to the *label* (not button).
 *
 *   [icon] [label]
 *          [△ △ △]   ← centered on label only, sits inside pill
 *
 * Keeps the original 40px pill height; uses a small strip only
 * (no big-state) so it always fits under the label width. Best
 * "minimal change" option.
 */
function VariantB({ tabs, active }: { tabs: TabSpec[]; active: TabSpec["id"] }) {
  return (
    <Pill>
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <Box
            key={tab.id}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              height: 32,
              px: 1.25,
              mx: 0.25,
              borderRadius: 999,
              background: isActive ? "rgba(255,255,255,0.10)" : "transparent",
            }}
          >
            <Box
              sx={{
                "& svg": { fontSize: 18 },
                color: isActive ? tab.accent : "rgba(255,255,255,0.78)",
                display: "inline-flex",
              }}
            >
              {tab.icon}
            </Box>
            {/* Label + strip stacked, but in a column so the strip
                centers on the label rather than the whole button. */}
            <Box
              sx={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                lineHeight: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, lineHeight: 1, mb: "2px" }}
              >
                {tab.label}
              </Typography>
              {tab.id !== "domains" ? (
                <TriangleStrip
                  count={tab.selected}
                  big={false}
                  accent={tab.accent}
                  gap={3}
                />
              ) : (
                <Box sx={{ height: TRI_SMALL_H }} />
              )}
            </Box>
          </Box>
        );
      })}
    </Pill>
  );
}

/**
 * C — Same as A but more breathing room (taller pill, larger triangles
 *     in selected state). Triangles render at MEDIUM scale (16×14)
 *     which is a compromise between the small empty-state and the
 *     big selected-state from the original spec.
 */
function VariantC({ tabs, active }: { tabs: TabSpec[]; active: TabSpec["id"] }) {
  const W = 16;
  const H = 14;
  const renderChip = (filled: boolean, accent: string, idx: number) => {
    const sw = 1.4;
    const pts = `${W / 2},${sw} ${W - sw},${H - sw} ${sw},${H - sw}`;
    if (!filled) {
      return (
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden>
          <polygon
            points={pts}
            fill="none"
            stroke={`${accent}cc`}
            strokeWidth={sw}
            strokeDasharray="3 1.75"
          />
        </svg>
      );
    }
    const hex = SYMBOL_HEX[idx % SYMBOL_HEX.length];
    return (
      <Box sx={{ filter: `drop-shadow(0 0 2.5px ${hex})` }}>
        <Box
          sx={{
            width: W,
            height: H,
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            bgcolor: `${hex}aa`,
          }}
        />
      </Box>
    );
  };
  return (
    <Pill height={56}>
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <Box
            key={tab.id}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              height: 48,
              px: 1.25,
              mx: 0.25,
              borderRadius: 999,
              background: isActive ? "rgba(255,255,255,0.10)" : "transparent",
            }}
          >
            <Box
              sx={{
                "& svg": { fontSize: 18 },
                color: isActive ? tab.accent : "rgba(255,255,255,0.78)",
                display: "inline-flex",
              }}
            >
              {tab.icon}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, lineHeight: 1 }}
              >
                {tab.label}
              </Typography>
              {tab.id !== "domains" ? (
                <Box sx={{ display: "inline-flex", gap: "3px" }}>
                  {Array.from({ length: MAX }).map((_, i) => (
                    <React.Fragment key={i}>
                      {renderChip(i < tab.selected, tab.accent, i)}
                    </React.Fragment>
                  ))}
                </Box>
              ) : (
                <Box sx={{ height: H }} />
              )}
            </Box>
          </Box>
        );
      })}
    </Pill>
  );
}

/**
 * D — Inline morph (current attempt, refined).
 *
 *   empty   : [icon] [label] [△ △ △]   (small, all in one row)
 *   selected: [icon] [▲ ▲ ▲]            (big chips replace label)
 *
 * Single 40px pill height. No vertical stacking. Tradeoff: label
 * disappears once a selection exists (tooltip would carry the name).
 */
function VariantD({ tabs, active }: { tabs: TabSpec[]; active: TabSpec["id"] }) {
  return (
    <Pill>
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        const showStrip = tab.id !== "domains";
        const hasSelection = tab.selected > 0;
        return (
          <Box
            key={tab.id}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              height: 32,
              px: 1.25,
              mx: 0.25,
              borderRadius: 999,
              background: isActive ? "rgba(255,255,255,0.10)" : "transparent",
            }}
          >
            <Box
              sx={{
                "& svg": { fontSize: 18 },
                color: isActive ? tab.accent : "rgba(255,255,255,0.78)",
                display: "inline-flex",
              }}
            >
              {tab.icon}
            </Box>
            {!hasSelection && (
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, lineHeight: 1 }}
              >
                {tab.label}
              </Typography>
            )}
            {showStrip && !hasSelection && (
              <TriangleStrip
                count={0}
                big={false}
                accent={tab.accent}
                gap={3}
              />
            )}
            {showStrip && hasSelection && (
              <TriangleStrip
                count={tab.selected}
                big
                accent={tab.accent}
                gap={4}
              />
            )}
          </Box>
        );
      })}
    </Pill>
  );
}

/**
 * E — Same height, colorize-in-place (no scale change).
 *
 *   empty  : [icon] [label] [△ △ △]   (small dashed, vertical-center next to label)
 *   1 sel  : [icon] [label] [▲ △ △]   (slot 1 fills, same size)
 *   3 sel  : [icon] [label] [▲ ▲ ▲]
 *
 * Most conservative. Strip lives *inline* to the right of the label
 * (not below). Always fits in 40px pill. Loses the "pop" of the
 * big-chip morph but never overlaps anything.
 */
function VariantE({ tabs, active }: { tabs: TabSpec[]; active: TabSpec["id"] }) {
  return (
    <Pill>
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <Box
            key={tab.id}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.75,
              height: 32,
              px: 1.25,
              mx: 0.25,
              borderRadius: 999,
              background: isActive ? "rgba(255,255,255,0.10)" : "transparent",
            }}
          >
            <Box
              sx={{
                "& svg": { fontSize: 18 },
                color: isActive ? tab.accent : "rgba(255,255,255,0.78)",
                display: "inline-flex",
              }}
            >
              {tab.icon}
            </Box>
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, lineHeight: 1 }}
            >
              {tab.label}
            </Typography>
            {tab.id !== "domains" && (
              <TriangleStrip
                count={tab.selected}
                big={false}
                accent={tab.accent}
                gap={3}
              />
            )}
          </Box>
        );
      })}
    </Pill>
  );
}

// =============================================================================
// Layout helpers
// =============================================================================

interface VariantBlockProps {
  title: string;
  description: string;
  Render: React.ComponentType<{ tabs: TabSpec[]; active: TabSpec["id"] }>;
}

const STATES: { label: string; goals: number; projects: number }[] = [
  { label: "0 selected (empty)", goals: 0, projects: 0 },
  { label: "1 + 1 selected (partial)", goals: 1, projects: 1 },
  { label: "3 + 3 selected (full)", goals: 3, projects: 3 },
];

function VariantBlock({ title, description, Render }: VariantBlockProps) {
  return (
    <Stack spacing={1.5}>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </Box>
      <Stack
        direction="row"
        spacing={3}
        useFlexGap
        sx={{
          alignItems: "flex-start",
          flexWrap: "wrap"
        }}>
        {STATES.map((s) => (
          <Stack key={s.label} spacing={0.75}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {s.label}
            </Typography>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background:
                  "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
                display: "inline-flex",
              }}
            >
              <Render tabs={makeTabs(s.goals, s.projects)} active="goals" />
            </Box>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

// =============================================================================
// Meta
// =============================================================================

const meta: Meta = {
  title:
    "Layout Systems/HUD Components/ContextBar/Indicator Placement Variants",
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
};

export default meta;
type Story = StoryObj;

// =============================================================================
// Stories
// =============================================================================

/** All five placement options at three selection states. */
export const AllPlacements: Story = {
  render: () => (
    <Stack spacing={5} sx={{ p: 2, maxWidth: 1100 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Triangle indicator — placement options
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
          Five layout options for the Goals / Projects selection
          indicator. Each is shown at three selection states (empty,
          partial, full) so you can see overflow and centering
          behavior. Pick one and we'll wire it into the live bar.
        </Typography>
      </Box>

      <VariantBlock
        title="A — Vertical stack inside pill (label above strip)"
        description="Pill grows to ~56px. Strip lives in a column under the label, so centering is automatic and the strip can never escape the button. Most robust."
        Render={VariantA}
      />
      <VariantBlock
        title="B — Horizontal, strip anchored under the label (40px pill)"
        description="Keeps the original 40px pill height. Label + small strip stacked in a column inline. Small chips only — no morph to big — so it always fits under the label width."
        Render={VariantB}
      />
      <VariantBlock
        title="C — Vertical stack, MEDIUM triangles (16×14)"
        description="Same shape as A but with a single mid-size triangle scale (no empty/big morph). Reads more clearly at a glance than B without the visual jump of the big-chip morph."
        Render={VariantC}
      />
      <VariantBlock
        title="D — Inline morph: label hides when selected (current attempt)"
        description="Empty: [icon][label][small dashed]. Selected: [icon][BIG chips] — label disappears (tooltip carries the name). Stays at 40px height. Most dramatic, but loses the always-visible label."
        Render={VariantD}
      />
      <VariantBlock
        title="E — Always inline, colorize in place (no scale change)"
        description="Strip sits to the right of the label and never grows. Empty slots are dashed outlines; selected slots fill with the entity color. Lightest change, smallest visual impact."
        Render={VariantE}
      />
    </Stack>
  ),
};

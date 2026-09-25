import type { Meta, StoryObj } from "@storybook/react";
import { Box, Paper, Stack, Typography } from "@mui/material";

import {
  CharacterFigure,
  CharacterCompass,
  CharacterProfileProvider,
  RING_SCHEDULE,
  RING_LABELS,
  DIRECTION_TRANSFORMS,
  type RingVariantId,
} from ".";

// =============================================================================
// Story scaffolding
// =============================================================================
//
// The Character Profile segment is the left column of the full-screen map
// view. It is composed of three nested components, each responsible for one
// layer of the experience:
//
//   1. CharacterFigure  — the 4eye avatar (idle float + direction lean)
//   2. CharacterCompass — the compass icon, cycling orbital rings, and the
//                         See-Demo CTA pop-in.
//
// All three require a `<CharacterProfileProvider>` ancestor for shared
// customization state.
// =============================================================================

function PanelStage({ children, width = 268 }: { children: React.ReactNode; width?: number }) {
  return (
    <Box sx={{ p: 3, bgcolor: "#ffffff", minHeight: 720 }}>
      <Paper
        elevation={0}
        sx={{
          width,
          minHeight: 600,
          mx: "auto",
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          borderRadius: 2,
          display: "flex",
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}

function FigureStage({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: 220,
        height: 220,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#fafafa",
        border: "1px dashed #e2e8f0",
        borderRadius: 2,
      }}
    >
      {children}
    </Box>
  );
}

const meta: Meta = {
  title: "HUD / Map / CharacterProfile",
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "white", values: [{ name: "white", value: "#ffffff" }] },
    docs: {
      description: {
        component: [
          "**Character Profile segment** — the player card at the left edge of the",
          "full-screen map view. Composed of three focused sub-components:",
          "",
          "- **`CharacterFigure`** — the 4eye avatar with a continuous idle float",
          "  (3.2 s ease-in-out) and a direction lean that settles in 0.38 s using",
          "  a spring `cubic-bezier(0.34, 1.56, 0.64, 1)`.",
          "- **`CharacterCompass`** — `ExploreIcon` on top of a cycling orbital",
          "  ring schedule (5 variants over ~67 s) plus a See-Demo CTA that pops",
          "  in with the same spring and pulses a green glow."
].join("\n"),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// =============================================================================
// 1 · CharacterFigure — direction lean grid
// =============================================================================
/**
 * Shows the four direction lean transforms side by side. Each character is
 * Lean transform passed directly as `leanTransform={DIRECTION_TRANSFORMS[dir]}`.
 *
 * Transforms (from `config.DIRECTION_TRANSFORMS`):
 *
 * | Direction | Transform                                  |
 * |-----------|--------------------------------------------|
 * | up        | `translateY(-3px) rotateZ(-1deg)`          |
 * | down      | `translateY(4px) rotateZ(1deg)`            |
 * | left      | `translateX(-8px) rotateZ(-6deg)`          |
 * | right     | `translateX(8px) rotateZ(6deg)`            |
 */
export const CharacterFigureDirections: Story = {
  name: "CharacterFigure · All Directions",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff" }}>
      <Typography sx={{ mb: 3, fontSize: "0.7rem", color: "#94a3b8", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        Direction Lean
      </Typography>
      <Stack direction="row" spacing={3} useFlexGap sx={{
        flexWrap: "wrap"
      }}>
        {(["up", "down", "left", "right"] as const).map((dir) => (
          <Stack key={dir} spacing={1} sx={{
            alignItems: "center"
          }}>
            <CharacterProfileProvider>
              <FigureStage>
                <CharacterFigure leanTransform={DIRECTION_TRANSFORMS[dir]} />
              </FigureStage>
            </CharacterProfileProvider>
            <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {dir}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  ),
};

// =============================================================================
// 2 · CharacterCompass — live ring cycle
// =============================================================================
/**
 * Live compass running the full ring schedule. Watch as it auto-advances
 * through StarWars → Saturn → Matrix → Pacman → Comet on the durations
 * defined in `RING_SCHEDULE`.
 */
export const CharacterCompassLive: Story = {
  name: "CharacterCompass · Live Cycle",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        Live · cycling every {RING_SCHEDULE.reduce((sum: number, r) => sum + r.duration, 0) / 1000} s total
      </Typography>
      <CharacterProfileProvider>
        <FigureStage>
          <Box sx={{ width: 140 }}>
            <CharacterCompass />
          </Box>
        </FigureStage>
      </CharacterProfileProvider>
      <Stack direction="row" spacing={2}>
        {RING_SCHEDULE.map((r: (typeof RING_SCHEDULE)[number]) => (
          <Box key={r.id} sx={{ textAlign: "center", fontSize: "0.6rem", color: "#64748b" }}>
            <strong>{RING_LABELS[r.id]}</strong>
            <Box>{(r.duration / 1000).toFixed(1)}s</Box>
          </Box>
        ))}
      </Stack>
    </Box>
  ),
};

/**
 * One compass per ring variant, with cycling disabled via `pinRing`. Use
 * this story to compare timings, opacity, and geometry side by side.
 */
export const CharacterCompassGallery: Story = {
  name: "CharacterCompass · Pinned Variants",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff" }}>
      <Typography sx={{ mb: 3, fontSize: "0.7rem", color: "#94a3b8", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        Ring Variants — pinned (no auto-cycle)
      </Typography>
      <Stack direction="row" spacing={3} useFlexGap sx={{
        flexWrap: "wrap"
      }}>
        {RING_SCHEDULE.map((r: (typeof RING_SCHEDULE)[number]) => (
          <Stack key={r.id} spacing={1} sx={{
            alignItems: "center"
          }}>
            <CharacterProfileProvider>
                <FigureStage>
                  <Box sx={{ width: 140 }}>
                    <CharacterCompass pinRing={r.id as RingVariantId} />
                  </Box>
                </FigureStage>
              </CharacterProfileProvider>
            <Typography sx={{ fontSize: "0.65rem", fontWeight: 700, color: "#64748b" }}>
              {RING_LABELS[r.id]}
            </Typography>
            <Typography sx={{ fontSize: "0.55rem", color: "#94a3b8" }}>
              cycles for {(r.duration / 1000).toFixed(1)}s
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  ),
};

/**
 * Demo CTA shown alongside the idle compass. The button uses the same
 * spring as the direction lean and pulses a green glow every 1.3 s.
 *
 * (Click the green pill to dismiss.)
 */
export const CharacterCompassSeeDemo: Story = {
  name: "CharacterCompass · See Demo CTA",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#ffffff", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        See-Demo CTA · forced open
      </Typography>
      <CharacterProfileProvider initial={{ showDemoCta: true }}>
          <FigureStage>
            <Box sx={{ width: 140 }}>
              <CharacterCompass onSeeDemo={() => console.log("[stories] onSeeDemo fired")} />
            </Box>
          </FigureStage>
        </CharacterProfileProvider>
    </Box>
  ),
};



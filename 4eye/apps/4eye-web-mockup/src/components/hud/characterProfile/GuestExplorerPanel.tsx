"use client";

/**
 * GuestExplorerPanel — left column of the full-screen map overlay.
 *
 * Composes the three pieces that make up the character profile:
 *   1. {@link CharacterFigure}  — the avatar with float + lean
 *   2. {@link CharacterCompass} — the icon + cycling rings + See Demo
 *   3. {@link CustomizePanel}   — the accordion of character tweaks
 *
 * The numeric "player card" details (role, name/level, XP bar, stat
 * chips, focus row) live inline here since they have no animation or
 * shared state worth extracting.
 *
 * Must be rendered inside a `<MapDirectionFocusProvider>` (set up by
 * `MinimapFullViewOverlay`). It owns its own `CharacterProfileProvider`.
 */

import {
  Box,
  Chip,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

import {
  CharacterProfileProvider,
  useCharacterProfile,
  CharacterFigure,
  CharacterCompass,
  CustomizePanel,
  STAT_CHIPS,
  type StatKey,
} from "@expanse/character/explorer";
import { useCharacterLean } from "./hooks/useCharacterLean";

/**
 * Height reserved for the compass row under the character. The compass box
 * is 36px but its ring variants (and the See Demo pill that replaces them)
 * paint outside it, so the row is padded out to keep that halo clear of the
 * role badge that follows.
 */
const COMPASS_ROW_HEIGHT = 68;

export interface GuestExplorerPanelProps {
  name?: string;
  /** Player role label shown as a chip. Defaults to "Guest Explorer". */
  roleLabel?: string;
  level?: number;
  xpCurrent?: number;
  xpNext?: number;
  learnScore?: number;
  earnScore?: number;
  competeScore?: number;
  /** Primary learning focus area shown at the bottom of the panel. */
  focus?: string;
  /**
   * Called when the user clicks the "See Demo" button that pops up
   * after pressing the character. If omitted the button simply dismisses.
   */
  onSeeDemo?: () => void;
}

export function GuestExplorerPanel(props: GuestExplorerPanelProps) {
  return (
    <CharacterProfileProvider>
      <GuestExplorerPanelInner {...props} />
    </CharacterProfileProvider>
  );
}

function GuestExplorerPanelInner({
  name = "Guest",
  roleLabel = "Guest Explorer",
  level = 1,
  xpCurrent = 0,
  xpNext = 100,
  learnScore = 0,
  earnScore = 0,
  competeScore = 0,
  focus = "Getting started",
  onSeeDemo,
}: GuestExplorerPanelProps) {
  const { toggleDemoCta } = useCharacterProfile();
  const leanTransform = useCharacterLean();
  const xpPct = Math.min(100, Math.round((xpCurrent / xpNext) * 100));

  const scores: Record<StatKey, number> = {
    learn: learnScore,
    earn: earnScore,
    compete: competeScore,
  };

  return (
    <Box
      data-testid="guest-explorer-panel"
      sx={{
        flex: "0 0 22%",
        minWidth: 200,
        maxWidth: 268,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        borderRight: "1px solid",
        borderColor: "divider",
        bgcolor: "#FFFFFF",
        // Theme spacing unit is 3px, so these read smaller than they look:
        // px 8 = 24px, pt 6 = 18px, gap 4 = 12px. The horizontal gutter is
        // sized to clear the HUD left rail, whose pills float over this
        // panel's outer edge — at the old 6px it clipped the player name.
        px: 8,
        pt: 6,
        pb: 4,
        position: "relative",
        zIndex: 11,
        gap: 4,
        overflowY: "auto",
        // Subtle dot-grid watermark reinforces the "map grid" theme
        backgroundImage:
          "radial-gradient(circle, rgba(99,102,241,0.07) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      {/* ── Character + compass ──────────────────────────────────────── */}
      <Box
        sx={{
          width: "100%",
          // Sized by its content (never grows or shrinks) so the figure is
          // never clipped and the compass below it always lands inside this
          // block instead of overflowing onto the role badge.
          flex: "0 0 auto",
          overflow: "visible",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CharacterFigure onClick={toggleDemoCta} leanTransform={leanTransform} />
        {/* Reserved row for the compass. The ring variants are absolutely
            positioned and draw wider/taller than their 36px box, so this
            row is deliberately taller than the compass itself — that halo
            is what used to collide with the badge below. */}
        <Box
          sx={{
            width: "100%",
            height: COMPASS_ROW_HEIGHT,
            flex: "0 0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CharacterCompass onSeeDemo={onSeeDemo} />
        </Box>
      </Box>
      {/* ── Role badge ───────────────────────────────────────────────── */}
      <Chip
        label={roleLabel}
        size="small"
        sx={{
          bgcolor: "#eef2ff",
          color: "#6366f1",
          fontWeight: 700,
          fontSize: "0.62rem",
          height: 20,
          letterSpacing: "0.02em",
        }}
      />
      {/* ── Name + Level ─────────────────────────────────────────────── */}
      <Stack
        direction="row"
        sx={{
          alignItems: "baseline",
          justifyContent: "space-between",
          width: "100%",
        }}>
        <Typography
          variant="subtitle2"
          noWrap
          sx={{
            fontWeight: 700,
            flex: 1,
            fontSize: "0.8rem"
          }}>
          {name}
        </Typography>
        <Box
          sx={{
            ml: 1,
            px: 0.8,
            py: 0.2,
            borderRadius: 1,
            bgcolor: "#f1f5f9",
            border: "1px solid rgba(15,23,42,0.08)",
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{ fontSize: "0.6rem", fontWeight: 700, color: "text.secondary" }}
          >
            Lv.{level}
          </Typography>
        </Box>
      </Stack>
      {/* ── XP bar ───────────────────────────────────────────────────── */}
      <Box sx={{
        width: "100%"
      }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            // 6px — the old 1.2px let the caption sit on the bar.
            mb: 2
          }}>
          <Typography
            sx={{ fontSize: "0.58rem", color: "text.secondary", fontWeight: 600 }}
          >
            XP
          </Typography>
          <Typography sx={{ fontSize: "0.58rem", color: "text.secondary" }}>
            {xpCurrent.toLocaleString()} / {xpNext.toLocaleString()}
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={xpPct}
          sx={{
            height: 5,
            borderRadius: 3,
            bgcolor: "#f1f5f9",
            "& .MuiLinearProgress-bar": {
              borderRadius: 3,
              background: "linear-gradient(90deg, #6366f1, #ef4444)",
            },
          }}
        />
      </Box>
      {/* ── Stats + Focus ────────────────────────────────────────────── */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // 6px between the stat row and the focus line.
          gap: 2
        }}>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{
            flexWrap: "wrap",
            justifyContent: "center",
            rowGap: 1
          }}>
          {STAT_CHIPS.map(({ key, tooltip, Icon, color, bg }) => (
            <Tooltip key={key} title={tooltip} arrow placement="top">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.4,
                  px: 0.8,
                  py: 0.35,
                  borderRadius: 999,
                  bgcolor: bg,
                  border: `1px solid ${color}22`,
                  cursor: "default",
                }}
              >
                <Icon sx={{ fontSize: 10, color }} />
                <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color }}>
                  {scores[key]}
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Tooltip title="Focus Area · Current Intent · Planned Course" arrow placement="top">
            <TrackChangesIcon sx={{ fontSize: 12, color: "primary.main" }} />
          </Tooltip>
          <Typography
            sx={{ fontSize: "0.68rem", fontWeight: 600, color: "text.secondary" }}
          >
            {focus}
          </Typography>
        </Stack>
      </Box>
      {/* ── Customize section ────────────────────────────────────────── */}
      <CustomizePanel />
    </Box>
  );
}

"use client";

import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ReplayIcon from "@mui/icons-material/Replay";
import { useNavigation } from "@expanse/map"
import { OrbBar, useRegisterBottomBar, type OrbItem } from "@expanse/hud"
import { useIntroGateOptional } from "@4eye/web/components/intro/IntroGateProvider";

/**
 * MapActionBar — directional nav orbs for the map overlay.
 *
 * Rendered as a HUD bottom-bar entry (order 30, between the default orbs
 * and the AI input). Shows four directional orbs wired to the nearest
 * ancestor NavigationProvider, the current tile's display label centred
 * between the two groups, and a trailing action group (Play Now / Replay
 * intro) separated by a hairline divider.
 *
 * Disable orbs are automatically grayed-out via the `disabled` OrbItem
 * field when the grid has no tile in that direction.
 *
 * Hotkeys are shown as corner badges (←↑↓→). The directional orbs carry
 * no inline label — at four-across their labels collided — so the arrow
 * glyph plus the `label` tooltip carries the meaning. The action group
 * keeps its inline label so "Play Now" reads as a CTA.
 *
 * Mount this component *inside* the correct NavigationProvider so that
 * `useNavigation()` resolves the right grid.
 */
export function MapActionBar({
  enabled = true,
  onPlayDemo,
}: {
  enabled?: boolean;
  onPlayDemo?: () => void;
}) {
  const { navigate, canNavigate, currentTile } = useNavigation();
  const introGate = useIntroGateOptional();
  const replayIntroFn = introGate?.replayIntro ?? null;

  const canLeft  = canNavigate("left");
  const canDown  = canNavigate("down");
  const canUp    = canNavigate("up");
  const canRight = canNavigate("right");

  const leftItems = useMemo<OrbItem[]>(
    () => [
      {
        id: "map-nav-left",
        icon: <ArrowBackRoundedIcon />,
        label: "Move left (←)",
        color: "default",
        disabled: !canLeft,
        hotkey: "←",
        onClick: () => navigate("left"),
      },
      {
        id: "map-nav-down",
        icon: <ArrowDownwardRoundedIcon />,
        label: "Move down (↓)",
        color: "default",
        disabled: !canDown,
        hotkey: "↓",
        onClick: () => navigate("down"),
      },
    ],
    [canLeft, canDown, navigate],
  );

  const rightItems = useMemo<OrbItem[]>(
    () => [
      {
        id: "map-nav-up",
        icon: <ArrowUpwardRoundedIcon />,
        label: "Move up (↑)",
        color: "default",
        disabled: !canUp,
        hotkey: "↑",
        onClick: () => navigate("up"),
      },
      {
        id: "map-nav-right",
        icon: <ArrowForwardRoundedIcon />,
        label: "Move right (→)",
        color: "default",
        disabled: !canRight,
        hotkey: "→",
        onClick: () => navigate("right"),
      },
    ],
    [canUp, canRight, navigate],
  );

  const tileLabel = currentTile?.display?.label ?? "";

  const actionItems = useMemo<OrbItem[]>(() => {
    const items: OrbItem[] = [];
    if (onPlayDemo) {
      items.push({
        id: "map-play-demo",
        icon: <PlayArrowRoundedIcon />,
        label: "Play Now",
        color: "success",
        onClick: onPlayDemo,
      });
    }
    if (replayIntroFn) {
      items.push({
        id: "map-replay-intro",
        icon: <ReplayIcon />,
        label: "Replay intro",
        onClick: replayIntroFn,
      });
    }
    return items;
  }, [onPlayDemo, replayIntroFn]);

  const node = useMemo(
    () => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {/* Left pair: ◀ ▼ */}
        <OrbBar
          items={leftItems}
          label="Navigate left/down"
          labelMode="none"
          showOrbLabels={false}
          orbSize="sm"
          orbVariant="glass"
          spacing={8}
        />

        {/* Center: current tile name */}
        <Box
          sx={{
            minWidth: 128,
            maxWidth: 200,
            textAlign: "center",
            px: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontSize: "0.62rem",
              textTransform: "uppercase",
              letterSpacing: 1,
              lineHeight: 1.2,
              display: "block",
            }}
          >
            Current
          </Typography>
          <Typography
            variant="body2"
            noWrap
            sx={{
              color: "text.primary",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: 0.2,
              lineHeight: 1.3,
            }}
          >
            {tileLabel || "—"}
          </Typography>
        </Box>

        {/* Right pair: ▲ ▶ */}
        <OrbBar
          items={rightItems}
          label="Navigate up/right"
          labelMode="none"
          showOrbLabels={false}
          orbSize="sm"
          orbVariant="glass"
          spacing={8}
        />

        {/* Trailing actions: Play Now (+ Replay intro when available) */}
        {actionItems.length > 0 && (
          <>
            <Box
              sx={{
                width: "1px",
                alignSelf: "stretch",
                my: 0.75,
                bgcolor: "divider",
              }}
            />
            <OrbBar
              items={actionItems}
              label="Map actions"
              labelMode="none"
              orbSize="sm"
              orbVariant="glass"
              orbLabelPosition="right"
              spacing={8}
            />
          </>
        )}
      </Box>
    ),
    [leftItems, rightItems, actionItems, tileLabel],
  );

  useRegisterBottomBar({
    id: "map-action-bar",
    order: 30,
    node,
    label: "Map navigation",
    enabled,
  });

  return null;
}

export default MapActionBar;

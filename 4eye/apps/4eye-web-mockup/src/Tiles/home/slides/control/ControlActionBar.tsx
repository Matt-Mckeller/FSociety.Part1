"use client";

import { useMemo } from "react";
import FilterCenterFocusIcon from "@mui/icons-material/FilterCenterFocus";
import TonalityIcon from "@mui/icons-material/Tonality";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LabelIcon from "@mui/icons-material/Label";
import { DEFAULT_BOTTOM_BAR_ORDER, OrbBar, useRegisterBottomBar, type OrbItem } from "@expanse/hud"

import { useSlideshow } from "@4eye/web/Tiles/home/slideshow/SlideshowProvider";
import { useReplayIntroOrb } from "@4eye/web/Tiles/home/slideshow/ReplayIntroProvider";
import type { ChipLabelSetName } from "./variants";

/**
 * ControlActionBar — slide-scoped HUD orb bar for the Control slide.
 *
 * ToggleFocus switches the pillar labels between plain text and vibrant
 * animated chips with 3-layer expanding rings.
 */

interface ControlActionBarProps {
  focusMode: boolean;
  onToggleFocus: () => void;
  chipLabelSet: ChipLabelSetName;
  onToggleChipSet: () => void;
}

export function ControlActionBar({ focusMode, onToggleFocus, chipLabelSet, onToggleChipSet }: ControlActionBarProps) {
  const { activeId } = useSlideshow();
  const isActive = activeId === "control";
  const replayOrb = useReplayIntroOrb();

  const items = useMemo<OrbItem[]>(
    () => [
      {
        id: "control-toggle-focus",
        icon: focusMode ? <TonalityIcon /> : <FilterCenterFocusIcon />,
        label: focusMode ? "Focus on" : "Toggle focus",
        color: focusMode ? "primary" : "default",
        onClick: onToggleFocus,
      },
      {
        id: "control-chip-labels",
        icon: <LabelIcon />,
        label: chipLabelSet,
        onClick: onToggleChipSet,
      },
      {
        id: "control-reset",
        icon: <RestartAltIcon />,
        label: "Reset settings",
        onClick: () => {
          /* TODO: wire to control reset */
        },
      },
      replayOrb,
    ],
    [replayOrb, focusMode, onToggleFocus, chipLabelSet, onToggleChipSet],
  );

  const node = useMemo(
    () => <OrbBar label="Control actions" items={items} labelMode="hover" />,
    [items],
  );

  useRegisterBottomBar({
    id: "control-actions",
    order: DEFAULT_BOTTOM_BAR_ORDER.orbs,
    node,
    label: "Control actions",
    enabled: isActive,
  });

  return null;
}

export default ControlActionBar;

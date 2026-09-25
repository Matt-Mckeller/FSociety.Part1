"use client";

import { useMemo } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { DEFAULT_BOTTOM_BAR_ORDER, OrbBar, useRegisterBottomBar, type OrbItem } from "@expanse/hud"

import { useSlideshow } from "@4eye/web/Tiles/home/slideshow/SlideshowProvider";
import { useReplayIntroOrb } from "@4eye/web/Tiles/home/slideshow/ReplayIntroProvider";

/**
 * CatalogActionBar — slide-scoped HUD orb bar for the Catalog slide.
 *
 * Placeholder actions (Filter / Sort / Shuffle) for the modality
 * catalog browse experience. Replay Intro on the right.
 */
export function CatalogActionBar() {
  const { activeId } = useSlideshow();
  const isActive = activeId === "catalog";
  const replayOrb = useReplayIntroOrb();

  const items = useMemo<OrbItem[]>(
    () => [
      {
        id: "catalog-filter",
        icon: <FilterListIcon />,
        label: "Filter",
        onClick: () => {
          /* TODO: wire to modality filter UI */
        },
      },
      {
        id: "catalog-sort",
        icon: <SortIcon />,
        label: "Sort",
        onClick: () => {
          /* TODO: wire to modality sort UI */
        },
      },
      {
        id: "catalog-shuffle",
        icon: <ShuffleIcon />,
        label: "Shuffle",
        onClick: () => {
          /* TODO: wire to modality shuffle */
        },
      },
      replayOrb,
    ],
    [replayOrb],
  );

  const node = useMemo(
    () => <OrbBar label="Catalog actions" items={items} labelMode="hover" />,
    [items],
  );

  useRegisterBottomBar({
    id: "catalog-actions",
    order: DEFAULT_BOTTOM_BAR_ORDER.orbs,
    node,
    label: "Catalog actions",
    enabled: isActive,
  });

  return null;
}

export default CatalogActionBar;

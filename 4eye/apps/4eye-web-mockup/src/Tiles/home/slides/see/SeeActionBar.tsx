"use client";

import { useMemo } from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import { DEFAULT_BOTTOM_BAR_ORDER, OrbBar, useRegisterBottomBar, type OrbItem } from "@expanse/hud"

import { useSlideshow } from "@4eye/web/Tiles/home/slideshow/SlideshowProvider";
import { useReplayIntroOrb } from "@4eye/web/Tiles/home/slideshow/ReplayIntroProvider";

/**
 * SeeActionBar — slide-scoped HUD orb bar for the See slide.
 *
 * Placeholder actions (Zoom In / Zoom Out / Reset View) wired to
 * console no-ops until the lens controls land. Replay Intro is
 * appended on the right.
 */
export function SeeActionBar() {
  const { activeId } = useSlideshow();
  const isActive = activeId === "see";
  const replayOrb = useReplayIntroOrb();

  const items = useMemo<OrbItem[]>(
    () => [
      {
        id: "see-zoom-in",
        icon: <ZoomInIcon />,
        label: "Zoom in",
        onClick: () => {
          /* TODO: wire to lens zoom-in */
        },
      },
      {
        id: "see-zoom-out",
        icon: <ZoomOutIcon />,
        label: "Zoom out",
        onClick: () => {
          /* TODO: wire to lens zoom-out */
        },
      },
      {
        id: "see-reset-view",
        icon: <CenterFocusStrongIcon />,
        label: "Reset view",
        onClick: () => {
          /* TODO: wire to lens reset */
        },
      },
      replayOrb,
    ],
    [replayOrb],
  );

  const node = useMemo(
    () => <OrbBar label="See actions" items={items} labelMode="hover" />,
    [items],
  );

  useRegisterBottomBar({
    id: "see-actions",
    order: DEFAULT_BOTTOM_BAR_ORDER.orbs,
    node,
    label: "See actions",
    enabled: isActive,
  });

  return null;
}

export default SeeActionBar;

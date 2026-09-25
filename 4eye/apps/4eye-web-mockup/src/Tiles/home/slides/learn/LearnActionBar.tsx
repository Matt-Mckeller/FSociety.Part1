"use client";

import { useMemo } from "react";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { DEFAULT_BOTTOM_BAR_ORDER, OrbBar, useRegisterBottomBar, type OrbItem } from "@expanse/hud"

import { useSlideshow } from "@4eye/web/Tiles/home/slideshow/SlideshowProvider";
import { useReplayIntroOrb } from "@4eye/web/Tiles/home/slideshow/ReplayIntroProvider";
import { usePersistentMascot } from "@4eye/web/Tiles/home/persistent-mascot/PersistentMascotProvider";

/**
 * LearnActionBar — slide-scoped HUD orb bar for the Learn slide.
 *
 * Composes three persona-aligned mascot triggers (Select / Anxious /
 * Excited 4eye) followed by the cross-slide Replay Intro orb. Owns its
 * own registration with `useRegisterBottomBar` and is gated by an
 * `enabled: isActive` flag so it only appears while the Learn slide
 * is the active step.
 *
 * Cross-slide chrome (hiding the global default `bottomOrbBar`) lives
 * in `useHomeHudChrome` and is installed once by `HomeTile`.
 *
 * Pattern mirrors `DomainsActionBar` (see
 * `slides/domains/components/DomainsActionBar.tsx`). To add more
 * actions, push additional `OrbItem`s into the `items` array below.
 */
export function LearnActionBar() {
  const { activeId } = useSlideshow();
  const isActive = activeId === "learn";

  const { playSelect, playAnxious, playExcited } = usePersistentMascot();
  const replayOrb = useReplayIntroOrb();

  const items = useMemo<OrbItem[]>(
    () => [
      {
        id: "mascot-select",
        icon: <PanToolAltIcon />,
        label: "Select 4eye",
        onClick: playSelect,
      },
      {
        id: "mascot-anxious",
        icon: <ErrorOutlineIcon />,
        label: "Anxious 4eye",
        onClick: playAnxious,
      },
      {
        id: "mascot-excited",
        icon: <CelebrationIcon />,
        label: "Excited 4eye",
        onClick: playExcited,
      },
      replayOrb,
    ],
    [playSelect, playAnxious, playExcited, replayOrb],
  );

  const node = useMemo(
    () => <OrbBar label="Learn actions" items={items} labelMode="hover" />,
    [items],
  );

  useRegisterBottomBar({
    id: "learn-actions",
    order: DEFAULT_BOTTOM_BAR_ORDER.orbs,
    node,
    label: "Learn actions",
    enabled: isActive,
  });

  return null;
}

export default LearnActionBar;

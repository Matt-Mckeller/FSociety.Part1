"use client";

import { useMemo } from "react";
import RedeemIcon from "@mui/icons-material/Redeem";
import IosShareIcon from "@mui/icons-material/IosShare";
import { DEFAULT_BOTTOM_BAR_ORDER, OrbBar, useRegisterBottomBar, type OrbItem } from "@expanse/hud"

import { useSlideshow } from "@4eye/web/Tiles/home/slideshow/SlideshowProvider";
import { useReplayIntroOrb } from "@4eye/web/Tiles/home/slideshow/ReplayIntroProvider";

/**
 * EarnActionBar — slide-scoped HUD orb bar for the Earn (Reward) slide.
 *
 * Placeholder actions (Claim / Share) for the reward step. Replay Intro
 * on the right.
 */
export function EarnActionBar() {
  const { activeId } = useSlideshow();
  const isActive = activeId === "earn";
  const replayOrb = useReplayIntroOrb();

  const items = useMemo<OrbItem[]>(
    () => [
      {
        id: "earn-claim",
        icon: <RedeemIcon />,
        label: "Claim reward",
        onClick: () => {
          /* TODO: wire to reward claim flow */
        },
      },
      {
        id: "earn-share",
        icon: <IosShareIcon />,
        label: "Share",
        onClick: () => {
          /* TODO: wire to share sheet */
        },
      },
      replayOrb,
    ],
    [replayOrb],
  );

  const node = useMemo(
    () => <OrbBar label="Earn actions" items={items} labelMode="hover" />,
    [items],
  );

  useRegisterBottomBar({
    id: "earn-actions",
    order: DEFAULT_BOTTOM_BAR_ORDER.orbs,
    node,
    label: "Earn actions",
    enabled: isActive,
  });

  return null;
}

export default EarnActionBar;

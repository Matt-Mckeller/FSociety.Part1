"use client";

import { useMemo } from "react";
import { DEFAULT_BOTTOM_BAR_ORDER, OrbBar, useRegisterBottomBar } from "@expanse/hud"

import { useSlideshow } from "@4eye/web/Tiles/home/slideshow/SlideshowProvider";
import { useReplayIntroOrb } from "@4eye/web/Tiles/home/slideshow/ReplayIntroProvider";

/**
 * VideoActionBar — slide-scoped HUD orb bar for the Video slide.
 *
 * Minimal for now: just the cross-slide Replay Intro orb. Additional
 * video-specific actions (e.g. fullscreen, share) can be added later.
 */
export function VideoActionBar() {
  const { activeId } = useSlideshow();
  const isActive = activeId === "video";
  const replayOrb = useReplayIntroOrb();

  const items = useMemo(() => [replayOrb], [replayOrb]);

  const node = useMemo(
    () => <OrbBar label="Video actions" items={items} labelMode="hover" />,
    [items],
  );

  useRegisterBottomBar({
    id: "video-actions",
    order: DEFAULT_BOTTOM_BAR_ORDER.orbs,
    node,
    label: "Video actions",
    enabled: isActive,
  });

  return null;
}

export default VideoActionBar;

"use client";

import { useRegisterHudInput } from "@expanse/map";
import { useSlideshow } from "@4eye/web/Tiles/home/slideshow/SlideshowProvider";

/**
 * Take over arrow keys via the HUD input stack while the slideshow is
 * mounted. Returning `true` consumes the event so the default grid
 * navigation in `NavigationProvider` is suppressed.
 *
 * `home` / `back` actions are intentionally *not* consumed — the user
 * can always escape regardless of the active slide.
 *
 * While the IntroFlow is still running it owns its own input flow, so
 * pass `enabled={false}` to make the handler a no-op until intro done.
 */
export function useArrowKeyAdvance({ enabled }: { enabled: boolean }) {
  const { dispatch } = useSlideshow();
  useRegisterHudInput({
    id: "home-slideshow",
    handle: (event) => {
      if (!enabled) return false;
      if (event.kind !== "direction") return false;
      if (event.direction === "right" || event.direction === "down") {
        dispatch({ type: "NEXT" });
        return true;
      }
      if (event.direction === "left" || event.direction === "up") {
        dispatch({ type: "PREV" });
        return true;
      }
      return false;
    },
  });
}

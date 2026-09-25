"use client";

import { useRegisterHudChromeHide } from "@expanse/hud"

/**
 * useHomeHudChrome — installs the cross-slide HUD chrome adjustments
 * for the home page. Currently a single concern: hide the global
 * default `bottomOrbBar` for the entire duration of the home tile,
 * because every home slide owns its own action bar (see
 * `slides/<slide>/<Slide>ActionBar.tsx`).
 *
 * Lives in `slideshow/` because it is genuinely cross-slide chrome —
 * not a per-slide affordance.
 */
export function useHomeHudChrome() {
  useRegisterHudChromeHide({
    id: "home-hide-default-orb-bar",
    hide: ["bottomOrbBar"],
    label: "Home page (custom per-slide orb bars)",
  });
}

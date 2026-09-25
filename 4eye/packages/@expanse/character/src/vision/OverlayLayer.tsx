"use client"

import { BUTTON_COLORS } from "./devices/ControllerSvg"
import { LightningBolt } from "./devices/LightningBolt"
import { LevelUpBadge, XpToast } from "./devices/Overlays"
import { useVisionControl } from "./context/VisionControlContext"
import {
  BoltOverlay,
  CoinBurstOverlay,
  InteractAchievement,
  XpToastOverlay,
} from "./styled/visionControlStyled"

/**
 * Gamification + feedback overlays layered above the character:
 *   - level-up badge (top)
 *   - lightning bolt (mid, used by both watch shock and controller press)
 *   - shock bolt (watch-only)
 *   - coin burst (full-stage, controller-only)
 *   - xp toast (controller-only)
 *
 * Brand-coupled visuals (the "interact!" achievement pill and the coin
 * burst) are injected by the host app via `achievementSlot` / `coinBurstSlot`
 * (see VisionControlContext) to keep this package free of a circular
 * dependency on `@expanse/brand-core`. When a slot is omitted, a
 * brand-neutral fallback is used.
 *
 * All overlays are pointer-events:none and animated by GSAP via refs.
 */
export function OverlayLayer() {
  const { refs, device, gamification, xpLabel, achievementSlot, coinBurstSlot } =
    useVisionControl()

  return (
    <>
      <InteractAchievement ref={refs.levelUpRef}>
        {achievementSlot ?? <LevelUpBadge />}
      </InteractAchievement>

      <BoltOverlay ref={refs.boltRef}>
        <LightningBolt color={BUTTON_COLORS[0]} width={32} height={40} />
      </BoltOverlay>

      {device === "watch" && (
        <InteractAchievement ref={refs.shockRef} sx={{ opacity: 0 }}>
          <LightningBolt color="#f59e0b" width={36} height={48} />
        </InteractAchievement>
      )}

      {gamification && coinBurstSlot && (
        <CoinBurstOverlay ref={refs.coinBurstRef}>
          {coinBurstSlot}
        </CoinBurstOverlay>
      )}

      {gamification && device !== "watch" && (
        <XpToastOverlay ref={refs.xpToastRef}>
          <XpToast label={xpLabel ?? "+40 XP"} />
        </XpToastOverlay>
      )}
    </>
  )
}

/**
 * vision-brand — app-side, brand-coupled visuals injected into the
 * `@expanse/character/vision` subsystem.
 *
 * These live in the app (not in `@expanse/character`) because they depend on
 * `@expanse/brand-core` / `@expanse/shell`, both of which already depend on
 * `@expanse/character`. Keeping them here avoids a circular package
 * dependency; they are passed into `VisionControlCharacter` via its
 * `achievementSlot` / `coinBurstSlot` props.
 */
export { Achievement, type AchievementProps } from "./Achievement"
export { CoinBurst } from "./CoinBurst"
export { ControlHudShelf } from "./ControlHudShelf"

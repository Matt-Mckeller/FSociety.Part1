// Built-in registration helpers — null-renderer components that mount
// once inside `FullHud` and push the default chrome (bottom bars) into
// the slot registries.
//
// Edge insets are now self-registered by each chrome component
// (`HudTopRow`, `HudLeftRail`, `HudRightRail`, `BottomChromeStack`)
// via `useRegisterHudInset`, so no inset registrar layer is needed.

export { RegisterDefaultBottomBars } from "./RegisterDefaultBottomBars"

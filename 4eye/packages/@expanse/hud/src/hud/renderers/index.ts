// HUD slot consumers — components that read from a slot registry and
// paint pixels. Mounted by FullHud (and reusable in custom HUDs that
// need the same chrome behavior).
export { BottomChromeStack } from "./BottomChromeStack"
export { HudTopRow, type HudTopRowProps } from "./HudTopRow"
export { ChromeGate } from "./ChromeGate"
export { ResponsiveHudStatus } from "./ResponsiveHudStatus"

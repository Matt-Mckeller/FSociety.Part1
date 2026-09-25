// HUD slot infrastructure + composition root.
//
// `slots/`         — five Provider + useRegister*/reader-hook registries
//                    that power FullHud's pluggable chrome (insets,
//                    visibility, bottom-bar stack, top-center content,
//                    hint overlays).
// `registrations/` — built-in null-renderer components that push the
//                    default content into those registries (mounted by
//                    FullHud).
// `renderers/`     — slot consumers that read a registry and paint
//                    pixels (BottomChromeStack, HudTopRow, ChromeGate,
//                    ResponsiveHudStatus).
// `docks/`         — ActionDock: pure screen-positioning wrapper for
//                    floating chrome (9 anchor positions + offset).
// `rails/`         — HudLeftRail / HudRightRail: vertical edge chrome
//                    (settings, theme toggle, FAB cluster, game panel).
// `full-hud/`      — the pre-composed FullHud orchestrator + provider
//                    stack + Next.js bridges + stories.
//
// App code: import everything from this barrel.
//   import { FullHud, useRegisterBottomBar, DEFAULT_BOTTOM_BAR_ORDER } from "@expanse/shell"

export * from "./slots"
export * from "./registrations"
export * from "./renderers"
export * from "./docks"
export * from "./rails"
export * from "./tiles"
export * from "./full-hud"
export * from "./overlay-state"
export * from "./constants"

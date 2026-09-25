// HUD slot registries — pluggable Provider + useRegister*/useReader hooks
// that let descendants push chrome into well-known slots without prop
// drilling through `FullHud`.
//
// All six providers follow the same shape:
//   - <FooProvider> wraps the subtree
//   - useRegisterFoo({ id, ... }) pushes an entry from any descendant
//   - useFoo() reads the aggregated state for renderers to consume

export {
  HudInsetsProvider,
  useHudInsets,
  useRegisterHudInset,
  type HudInsetEdge,
  type HudInsetEntry,
  type HudInsetsProviderProps,
} from "./HudInsetsProvider"

export {
  HudChromeVisibilityProvider,
  useHudChromeVisibility,
  useRegisterHudChromeHide,
  type HudChromeId,
  type HudChromeHideEntry,
  type HudChromeHidden,
  type HudChromeVisibilityProviderProps,
} from "./HudChromeVisibilityProvider"

export {
  BottomBarsProvider,
  useBottomBars,
  useRegisterBottomBar,
  type BottomBarEntry,
  type BottomBarsProviderProps,
  type UseRegisterBottomBarOptions,
} from "./BottomBarsProvider"

export {
  LeftRailItemsProvider,
  useLeftRailItems,
  useRegisterLeftRailItem,
  type LeftRailItemEntry,
  type LeftRailItemsProviderProps,
  type UseRegisterLeftRailItemOptions,
} from "./LeftRailItemsProvider"

export {
  RightRailItemsProvider,
  useRightRailItems,
  useRegisterRightRailItem,
  type RightRailItemEntry,
  type RightRailItemsProviderProps,
  type UseRegisterRightRailItemOptions,
} from "./RightRailItemsProvider"

export {
  CenterContentProvider,
  useCenterContent,
  useRegisterCenterContent,
  type CenterContentEntry,
  type CenterContentProviderProps,
  type UseRegisterCenterContentOptions,
} from "./CenterContentProvider"

export {
  HudHintsProvider,
  useHudHints,
  useHasHudHintsProvider,
  ALL_HUD_HINTS,
  type HudHint,
  type HudHintsContextValue,
  type HudHintsProviderProps,
} from "./HudHintsProvider"

export {
  HudChromeSizesProvider,
  useHudBarSizes,
  useHudBreakpoint,
  type HudBarSizes,
  type HudChromeSizesProviderProps,
} from "./HudChromeSizesProvider"

export { DEFAULT_BOTTOM_BAR_ORDER } from "./slot-orders"

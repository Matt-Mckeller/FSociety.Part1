/**
 * @expanse/theme - Theme Factory Functions
 *
 * Re-exports all layout component factory functions.
 * Each factory takes a Palette and returns component-specific theme config.
 */

export { createActionBarConfig } from "./action-bar.factory"
export { createActionOrbConfig } from "./action-orb.factory"
export { createGameDrawerConfig } from "./game-drawer.factory"
export { createNavigationPadConfig } from "./navigation-pad.factory"
export { createBoardChromeConfig } from "./board-chrome.factory"
export { createFloatingToolbarConfig } from "./floating-toolbar.factory"
export { createTileConfig } from "./tile.factory"
export {
  createMinimapTileConfig,
  buildMinimapLegendColors,
  buildMinimapCategoryColors,
} from "./minimap-tile.factory"
export { createMinimapPanelConfig } from "./minimap-panel.factory"

/**
 * Aggregate factory — returns all layout component theme extensions for a
 * given palette. Apps should call this and pass the result to
 * `<ThemeProvider componentExtensions={{ light: {...} }} />` so the full
 * layout component contract (ActionBar, ActionOrb, MinimapTile, MinimapPanel,
 * etc.) is registered with one call. Mirrors `createBrandCoreExtensions`.
 */
import type { Palette } from "@mui/material/styles"
import { createActionBarConfig as _ab } from "./action-bar.factory"
import { createActionOrbConfig as _ao } from "./action-orb.factory"
import { createGameDrawerConfig as _gd } from "./game-drawer.factory"
import { createNavigationPadConfig as _np } from "./navigation-pad.factory"
import { createBoardChromeConfig as _bc } from "./board-chrome.factory"
import { createFloatingToolbarConfig as _ft } from "./floating-toolbar.factory"
import { createTileConfig as _tile } from "./tile.factory"
import { createMinimapTileConfig as _mt } from "./minimap-tile.factory"
import { createMinimapPanelConfig as _mp } from "./minimap-panel.factory"

export function createLayoutExtensions(palette: Palette) {
  return {
    ExpanseActionBar:      _ab(palette),
    ExpanseActionOrb:      _ao(palette),
    ExpanseGameDrawer:     _gd(palette),
    ExpanseNavigationPad:  _np(palette),
    ExpanseBoardChrome:    _bc(palette),
    ExpanseFloatingToolbar: _ft(palette),
    ExpanseTile:           _tile(palette),
    ExpanseMinimapTile:    _mt(palette),
    ExpanseMinimapPanel:   _mp(palette),
  }
}

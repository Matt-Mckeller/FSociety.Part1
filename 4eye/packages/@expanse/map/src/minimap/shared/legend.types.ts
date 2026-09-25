/**
 * Shared legend item type for minimap surfaces.
 *
 * Lives in `minimap/shared` (a HUD-free location) so the legend helpers
 * (`useMinimapLegendItems`, `MinimapCategoryLegend`) and the full-view legend
 * can consume it without importing the HUD-aware `MinimapPanel`.
 */
export interface MinimapPanelLegendItem {
  label: string;
  color: string;
}

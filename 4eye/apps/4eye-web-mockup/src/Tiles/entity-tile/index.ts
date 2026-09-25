/**
 * Entity Tile — public surface.
 *
 * The generic Entity → TileSpec → display pipeline shared by Command Center,
 * the in-app Planning tile, and the website Projects page.
 */

export { TileRenderer, default } from "./TileRenderer";
export type { TileRendererProps } from "./TileRenderer";

export {
  resolveTileComponent,
  registerTile,
  type TileComponent,
} from "./components/registry";

export {
  SummaryTile,
  DetailTile,
  MetricTile,
  ListTile,
  GeneratedTile,
  type TileComponentProps,
} from "./components/tiles";

export { PlanningBoard } from "./components/PlanningBoard";
export type { PlanningBoardProps } from "./components/PlanningBoard";

export { PlanningViews } from "./components/PlanningViews";
export type { PlanningViewsProps } from "./components/PlanningViews";

export {
  PlanningProvider,
  usePlanning,
  planningReducer,
  type PlanningState,
  type PlanningAction,
} from "./store/PlanningProvider";

export { SEED, SEED_IDS } from "./store/seed-data";

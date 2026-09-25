"use client";

/**
 * Entity Tile — display component registry.
 *
 * Maps a tile `type` → React display component. Adding a new look = register a
 * component here (or a `variant:*` key), NOT new plumbing. <TileRenderer> reads
 * this registry to dispatch.
 */

import * as React from "react";
import type { TileType } from "@4eye/types";

import {
  DetailTile,
  GeneratedTile,
  ListTile,
  MetricTile,
  SummaryTile,
  type TileComponentProps,
} from "./tiles";

export type TileComponent = React.ComponentType<TileComponentProps>;

const REGISTRY: Record<string, TileComponent> = {
  summary: SummaryTile,
  detail: DetailTile,
  metric: MetricTile,
  list: ListTile,
  generated: GeneratedTile,
};

/** Resolve the component for a tile type (falls back to summary). */
export function resolveTileComponent(type: TileType): TileComponent {
  return REGISTRY[type] ?? SummaryTile;
}

/** Register a new tile type / variant at runtime. */
export function registerTile(type: string, component: TileComponent): void {
  REGISTRY[type] = component;
}

"use client";

/**
 * Entity Tile — TileRenderer.
 *
 * The single entry point: give it a TileSpec (from `toTileJSON`) and it
 * dispatches to the right display component via the registry. Used by the
 * Command Center tile, the in-app Planning tile, and the website Projects page
 * — same renderer, different layout container.
 *
 * Security: when a spec is AI-`generated`, validate it with the planning zod
 * schema BEFORE passing it here. The renderer only reads data — it never
 * executes generated code.
 */

import * as React from "react";
import type { TileSpec } from "@4eye/types";

import { resolveTileComponent } from "./components/registry";

export interface TileRendererProps {
  spec: TileSpec;
  onAction?: (intent: string, spec: TileSpec) => void;
}

export function TileRenderer({ spec, onAction }: TileRendererProps): React.ReactElement {
  const Component = resolveTileComponent(spec.type);
  const renderChild = React.useCallback(
    (child: TileSpec) => <TileRenderer spec={child} onAction={onAction} />,
    [onAction],
  );
  return <Component spec={spec} onAction={onAction} renderChild={renderChild} />;
}

export default TileRenderer;

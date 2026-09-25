"use client";

/**
 * MapDirectionFocusProvider — tracks which direction (up/down/left/right)
 * the user has focused inside the MinimapFullView's right-column
 * "Next best actions" stack.
 *
 * The selected direction drives:
 *   1. Visual emphasis on the corresponding `DirectionRow` (border,
 *      bouncing chevron glyph, expand-to-show-Go button).
 *   2. Which chevron pulses + is enlarged on the active minimap tile
 *      (via `emphasisDirection` prop on `MinimapTile`).
 *
 * Selection resets to `recommended` (currently always "up") whenever
 * the provider re-mounts — i.e. each time the overlay opens.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Cardinal direction used by the map overlay's emphasis state. */
export type Direction = "up" | "down" | "left" | "right";

interface MapDirectionFocusContextValue {
  /** Currently selected direction (drives row + minimap emphasis). */
  selected: Direction;
  /** Direction marked as "Recommended" — currently fixed to "up". */
  recommended: Direction;
  /** Update the selected direction. */
  setSelected: (next: Direction) => void;
}

const MapDirectionFocusContext =
  createContext<MapDirectionFocusContextValue | null>(null);

export interface MapDirectionFocusProviderProps {
  children: ReactNode;
  /** Initial / reset selection. @default "up" */
  defaultDirection?: Direction;
  /** Direction to mark as Recommended in the UI. @default "up" */
  recommended?: Direction;
}

export function MapDirectionFocusProvider({
  children,
  defaultDirection = "up",
  recommended = "up",
}: MapDirectionFocusProviderProps) {
  const [selected, setSelectedState] = useState<Direction>(defaultDirection);

  const setSelected = useCallback((next: Direction) => {
    setSelectedState(next);
  }, []);

  const value = useMemo<MapDirectionFocusContextValue>(
    () => ({ selected, recommended, setSelected }),
    [selected, recommended, setSelected],
  );

  return (
    <MapDirectionFocusContext.Provider value={value}>
      {children}
    </MapDirectionFocusContext.Provider>
  );
}

export function useMapDirectionFocus(): MapDirectionFocusContextValue {
  const ctx = useContext(MapDirectionFocusContext);
  if (!ctx) {
    throw new Error(
      "useMapDirectionFocus() must be used inside <MapDirectionFocusProvider>",
    );
  }
  return ctx;
}

"use client";

/**
 * ActiveMapProvider — tracks which named "map" (dataset / view) is
 * currently focused inside the HUD overlay. Generic over a string
 * union so apps can supply their own keys (e.g. `"website" | "app"`).
 */

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ActiveMapContextValue<TKey extends string = string> {
  activeMap: TKey;
  setActiveMap: (next: TKey) => void;
}

const ActiveMapContext = createContext<ActiveMapContextValue | null>(null);

export interface ActiveMapProviderProps<TKey extends string = string> {
  children: ReactNode;
  /** Key the overlay starts focused on. */
  defaultMap: TKey;
}

export function ActiveMapProvider<TKey extends string = string>({
  children,
  defaultMap,
}: ActiveMapProviderProps<TKey>) {
  const [activeMap, setActiveMap] = useState<TKey>(defaultMap);

  const value = useMemo<ActiveMapContextValue<TKey>>(
    () => ({ activeMap, setActiveMap }),
    [activeMap],
  );

  return (
    <ActiveMapContext.Provider value={value as unknown as ActiveMapContextValue}>
      {children}
    </ActiveMapContext.Provider>
  );
}

export function useActiveMap<TKey extends string = string>(): ActiveMapContextValue<TKey> {
  const ctx = useContext(ActiveMapContext);
  if (!ctx) {
    throw new Error(
      "useActiveMap() must be used inside <ActiveMapProvider>",
    );
  }
  return ctx as unknown as ActiveMapContextValue<TKey>;
}

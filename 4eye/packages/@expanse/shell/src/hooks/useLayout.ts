"use client";

import { useContext } from "react";
import { LayoutContext } from "../core/providers/LayoutProvider";
import type { LayoutContextType } from "../types";

/**
 * Hook to access the full layout context.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { loading, drawerOpen } = useLayout();
 *   return <div>{loading ? "Loading…" : null}</div>;
 * }
 * ```
 *
 * @throws Error if used outside of LayoutProvider
 */
export function useLayout(): LayoutContextType {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error(
      "useLayout must be used within a LayoutProvider. " +
        "Make sure your component is wrapped in <LayoutProvider>."
    );
  }

  return context;
}

/**
 * Hook to access loading state.
 * Lightweight alternative when you only need loading functionality.
 */
export function useLoading() {
  const { loading, addLoadingProcessID, removeLoadingProcessID } = useLayout();

  return {
    isLoading: loading,
    start: addLoadingProcessID,
    stop: removeLoadingProcessID,
  };
}

/**
 * Hook to access drawer state.
 * Lightweight alternative when you only need drawer functionality.
 */
export function useDrawer() {
  const { drawerOpen, setDrawerOpen } = useLayout();

  return {
    isOpen: drawerOpen,
    open: () => setDrawerOpen(true),
    close: () => setDrawerOpen(false),
    toggle: () => setDrawerOpen(!drawerOpen),
  };
}

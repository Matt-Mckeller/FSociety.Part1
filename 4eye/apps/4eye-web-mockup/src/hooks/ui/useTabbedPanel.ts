"use client";

import { useCallback, useState } from "react";

/**
 * State for tabbed/segmented panels. Wraps the trivial `useState<K>` pattern
 * so multiple slides can share consistent tab semantics, and so we can grow
 * a richer return shape (focus management, keyboard nav) later without
 * touching call sites.
 */
export function useTabbedPanel<K extends string>(
  initial: K,
): {
  active: K;
  setActive: (next: K) => void;
  isActive: (key: K) => boolean;
} {
  const [active, setActive] = useState<K>(initial);
  const isActive = useCallback((key: K) => key === active, [active]);
  return { active, setActive, isActive };
}

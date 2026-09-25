"use client";

import { useCallback, useState } from "react";

/**
 * Returns a numeric token + bumper. Calling `replay()` increments the token,
 * which can be used as a `useEffect` dependency to re-trigger an animation
 * or other effect without otherwise representing app state.
 */
export function useReplayToken(): readonly [number, () => void] {
  const [token, setToken] = useState(0);
  const replay = useCallback(() => setToken((n) => n + 1), []);
  return [token, replay] as const;
}

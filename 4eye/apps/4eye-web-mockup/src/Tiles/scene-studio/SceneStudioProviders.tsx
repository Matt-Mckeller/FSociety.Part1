"use client";

import type { ReactNode } from "react";

/**
 * Context stack for Scene Studio.
 * The SceneStudioProvider lives one level up (HUD layout) so state
 * persists across tile navigation — only add session-scoped providers here.
 */
export function SceneStudioProviders({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

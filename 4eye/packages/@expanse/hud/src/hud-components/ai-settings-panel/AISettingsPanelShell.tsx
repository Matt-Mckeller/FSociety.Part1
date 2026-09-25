"use client";

import type { ReactNode } from "react";
import { Box } from "@mui/material";
import { DUSK_HORIZON_BACKGROUND } from "@expanse/theme";

export interface AISettingsPanelShellProps {
  /**
   * Width this panel should match — pass the same value used for the
   * chat input bar so they sit in perfect alignment.
   * @default "100%"
   */
  width?: number | string;
  children: ReactNode;
}

/**
 * AISettingsPanelShell — the visual container for the AI Settings panel.
 *
 * Positioned above the chat input bar. Visual rules:
 *  - Background: `DUSK_HORIZON_BACKGROUND` (shared starry twilight token)
 *  - Width: matches the chat input bar (pass `chatInputWidth` from ChatSkeleton)
 *  - Border radius: rounded top corners, FLAT bottom edge — butts against the input bar
 *  - Animation wrapper is the caller's responsibility (framer-motion slide-up)
 *
 * This component is intentionally layout-only; all AI settings state/logic
 * comes from `@4eye/features AISettingsBar` which is passed as `children`.
 */
export function AISettingsPanelShell({
  width = "100%",
  children,
}: AISettingsPanelShellProps) {
  return (
    <Box
      sx={{
        width,
        background: DUSK_HORIZON_BACKGROUND,
        border: "1px solid rgba(255,255,255,0.10)",
        borderBottom: "none",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        boxShadow: "0 -8px 32px rgba(0,0,0,0.45)",
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
}

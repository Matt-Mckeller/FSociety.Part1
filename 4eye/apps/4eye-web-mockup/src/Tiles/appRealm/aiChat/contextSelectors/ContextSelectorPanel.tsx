"use client";

import { type ReactNode } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  DUSK_HORIZON_BASE,
  DUSK_HORIZON_TEXTURE,
  DUSK_HORIZON_BACKGROUND,
} from "@expanse/theme";

/**
 * Re-export the shared "Dusk Horizon" surface tokens so existing
 * import sites in this app continue to work. Source of truth lives
 * in `@expanse/theme/styles/duskHorizon`.
 */
export { DUSK_HORIZON_BASE, DUSK_HORIZON_TEXTURE, DUSK_HORIZON_BACKGROUND };

interface ContextSelectorPanelProps {
  title: string;
  subtitle?: string;
  /** Right-aligned slot in the header (e.g. selection count "2 / 3"). */
  headerRight?: ReactNode;
  /** Pinned strip below the scroll area (e.g. display preferences). */
  footer?: ReactNode;
  onClose: () => void;
  children: ReactNode;
}

/**
 * ContextSelectorPanel — shared glass shell for the Domain / Goals /
 * Projects selectors that drop down from the HUD ContextBar.
 *
 * Visually butts against the bar (flat top edge, rounded bottom).
 * Background tone matches the HUD ContextBar / chrome stack:
 * `rgba(20,20,28,0.92)` + 12px backdrop blur.
 */
export function ContextSelectorPanel({
  title,
  subtitle,
  headerRight,
  footer,
  onClose,
  children,
}: ContextSelectorPanelProps) {
  return (
    <Box
      sx={{
        width: "100%",
        background: DUSK_HORIZON_BACKGROUND,
        border: "1px solid rgba(255,255,255,0.10)",
        borderTop: "none",
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 1,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="overline"
            sx={{
              color: "rgba(255,255,255,0.55)",
              letterSpacing: 1.5,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.2,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {headerRight}
        <IconButton
          size="small"
          onClick={onClose}
          aria-label="Close selector"
          sx={{ color: "rgba(255,255,255,0.65)" }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        sx={{
          maxHeight: 440,
          overflowY: "auto",
          p: 1,
        }}
      >
        {children}
      </Box>
      {footer}
    </Box>
  );
}

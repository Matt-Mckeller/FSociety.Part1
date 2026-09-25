"use client"

/**
 * QuestsModal — Dialog wrapper around `QuestsPanel`.
 *
 * Mounted once at the HudShell level (see `app/(hud)/HudShell.tsx`) so
 * any marketing route can `useQuests().open()` to pop it.
 *
 * The actual content (header, intro, scrollable cards, claim CTA) now
 * lives in `QuestsPanel`, which is also embedded inline on slides
 * (e.g. EarnSlide) via `QuestsPanelCard`. Keeping the popup version
 * thin makes the two surfaces visually identical.
 */

import { Dialog, alpha, useTheme } from "@mui/material"

import { useQuests } from "./QuestsProvider"
import { QuestsPanel } from "./QuestsPanel"

export function QuestsModal() {
  const theme = useTheme()
  const { isOpen, close } = useQuests()

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      maxWidth="sm"
      fullWidth
      keepMounted={false}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: alpha(theme.palette.common.black, 0.4),
          },
        },

        paper: {
          sx: {
            position: "relative",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
            boxShadow: theme.shadows[10],
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: -8,
              borderRadius: "inherit",
              pointerEvents: "none",
              boxShadow: `
                0 0 0 1px ${alpha(theme.palette.primary.main, 0.4)},
                0 0 0 3px ${alpha(theme.palette.primary.main, 0.22)},
                0 0 0 6px ${alpha(theme.palette.primary.main, 0.1)}
              `,
            },
          },
        }
      }}>
      {/* Inside the dialog the cards expand to their natural height
          (the dialog itself scrolls if needed). Cards are capped at
          300 px wide and centered so they read as compact items rather
          than edge-to-edge rows. */}
      <QuestsPanel onClose={close} cardsMaxHeight="none" cardWidth={300} />
    </Dialog>
  );
}

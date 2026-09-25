"use client"

/**
 * EarnQuestsPage — sole content page of the reward slide.
 *
 * Renders the inline Quests panel and a "Claim Rewards" CTA. Pure
 * presentation; the post-claim animation lives inside QuestsPanelCard.
 *
 * The full nav map used to live as a second page here; it now lives
 * in the HUD overlay (`MinimapFullViewOverlay`) and is opened from the
 * HUD's MinimapDock — no slide-level page swap is needed.
 */

import { Box } from "@mui/material"

import { QuestsPanelCard } from "@4eye/web/components/quests"

interface EarnQuestsPageProps {
  /**
   * Whether the parent slide has entered the viewport. Forwarded to
   * QuestsPanelCard so quest cards can stagger their own entrance
   * independently of the panel wrapper's fade.
   */
  entered?: boolean
  /**
   * Fired once the user finishes the Claim All flow OR dismisses
   * every remaining quest. The reward slide uses this to hand off
   * into the full-screen Minimap overlay.
   */
  onAllClaimed?: () => void
}

export function EarnQuestsPage({
  entered = true,
  onAllClaimed,
}: EarnQuestsPageProps) {
  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <QuestsPanelCard
        flat
        flyTarget='[data-fab-id="game"]'
        cardsEntered={entered}
        cardsEnterDelay={300}
        cardsStagger={130}
        onClaimAllComplete={onAllClaimed}
        onAllDismissed={onAllClaimed}
      />
    </Box>
  )
}

export default EarnQuestsPage

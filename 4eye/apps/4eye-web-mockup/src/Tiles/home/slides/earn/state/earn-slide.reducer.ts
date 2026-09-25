/**
 * earn-slide.reducer — pure state machine for the reward slide.
 *
 * The reward slide is a single page (the Quests panel + Claim Rewards
 * CTA). The full nav map lives in the HUD overlay
 * (`MinimapFullViewOverlay`) and is opened from the HUD's MinimapDock,
 * not embedded here.
 *
 * State is intentionally minimal — just the entrance flag — so the
 * Quests panel can fade in once the slide enters the viewport.
 *
 * Kept React-free so it stays trivially unit-testable.
 */

export interface EarnSlideState {
  /**
   * Whether the slide has crossed the IntersectionObserver threshold
   * at least once. Stays `true` after the first entry — we never reset
   * the entrance state, even if the user scrolls away and back.
   */
  hasEntered: boolean
}

export type EarnSlideAction = { type: "ENTER" }

export const initialEarnSlideState: EarnSlideState = {
  hasEntered: false,
}

export function earnSlideReducer(
  state: EarnSlideState,
  action: EarnSlideAction,
): EarnSlideState {
  switch (action.type) {
    case "ENTER":
      // Idempotent — stays `true` once observed so re-entry doesn't
      // re-trigger the entrance fade-in.
      if (state.hasEntered) return state
      return { ...state, hasEntered: true }
  }
}

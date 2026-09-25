"use client"

/**
 * QuestsPanel — the rendered body of the Quests UI.
 *
 * Pulled out of `QuestsModal` so the same composition (header strip,
 * intro paragraph, scrollable card list, "Claim Rewards" footer) can
 * be used either:
 *   - **inside the Quests Dialog** (`QuestsModal`), or
 *   - **inline on a marketing slide** (e.g. EarnSlide / "slide 7").
 *
 * The inline variant intentionally clones the dialog's visual chrome
 * (paper surface + triple-layer accent border + bordered title strip)
 * so the user sees the same artifact whether they open the modal or
 * scroll past it on the page.
 *
 * Scrollable card list:
 *   The cards section is bounded so that, by default, slightly more
 *   than two cards are visible — the next row is partially clipped to
 *   communicate "there's more, scroll." A custom thin scrollbar makes
 *   the affordance unobtrusive against the paper background.
 */

import {
  Box,
  Button,
  Fade,
  IconButton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material"
import type { ReactNode } from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import AssignmentIcon from "@mui/icons-material/Assignment"
import CloseIcon from "@mui/icons-material/Close"
import PaidIcon from "@mui/icons-material/Paid"
import {
  QuestCardCompact,
  TaskCardProvider,
  TaskStatus,
  TaskType,
  createTaskData,
} from "@expanse/brand-core/game/points/components/TaskCard"

import { useQuests } from "./QuestsProvider"
import { flyCoins } from "./coin-fly"

export interface QuestsPanelProps {
  /**
   * Rendered as the close affordance in the title strip. Pass `null`
   * (or omit) to hide it — useful when the panel is embedded inline
   * and there is nothing to close.
   */
  onClose?: (() => void) | null
  /**
   * Maximum height of the scrollable cards section. Defaults to a
   * value that shows ~2.3 quest cards before clipping (so the next
   * card peeks above the bottom edge as a "scroll for more" cue).
   *
   * Pass a numeric pixel value or any valid CSS height string. Pass
   * `"none"` to disable the cap entirely (cards expand to their
   * natural height — the dialog uses this).
   */
  cardsMaxHeight?: number | string
  /**
   * Maximum width in pixels for individual quest cards. Defaults to
   * `undefined` (cards stretch to full panel width). Set e.g. `300`
   * when the panel is displayed in a narrow dialog.
   */
  cardWidth?: number
  /**
   * Slot rendered above the title strip — used by the inline
   * embedding to add an optional "section" eyebrow without modifying
   * the panel internals.
   */
  topSlot?: ReactNode
  /**
   * Fires after the user clicks Claim Rewards AND the resulting
   * coin-fly animation has finished landing. Hosts (e.g. the reward
   * slide) use this to advance to a follow-up step *after* the
   * celebratory animation, not while it's still mid-flight.
   *
   * Not called when there were no unclaimed rewards to begin with.
   */
  onClaimAllComplete?: () => void
  /**
   * DOM selector used to override the coin-fly landing target.
   * Defaults to the HUD currency icon (`[data-coin-target="currency"]`).
   * Pass `[data-fab-id="game"]` to fly coins into the game FAB instead.
   */
  flyTarget?: string
  /**
   * Called once after every claimed card has been individually
   * dismissed by the user. Analogous to `onClaimAllComplete` but
   * triggered by the dismiss-tap flow rather than the Claim button.
   *
   * Useful on the Reward slide so the map page advances automatically
   * when the user has cleared all claimed cards one by one.
   */
  onAllDismissed?: () => void
  /**
   * Controls whether the quest cards have entered (are visible).
   * When `false` the cards remain at opacity 0; when it flips to
   * `true` they stagger in one by one. Defaults to `true` so the
   * panel works without any entrance orchestration.
   */
  cardsEntered?: boolean
  /**
   * Extra delay (ms) added before the first card starts fading in,
   * on top of whatever CSS transition delay the parent applies.
   * Use this on the reward slide so the cards reveal themselves well
   * after the panel wrapper has faded in. Defaults to `0`.
   */
  cardsEnterDelay?: number
  /**
   * Additional delay (ms) between successive cards. Defaults to `120`.
   */
  cardsStagger?: number
}

/**
 * Approximate height of one QuestCardCompact + the inter-card gap
 * used in the cards stack. Used to derive the "slightly over 2 rows"
 * default scroll cap. Tuned by eye against the current card density.
 */
const CARD_ROW_PX = 100
const CARD_GAP_PX = 20 // matches MUI Stack spacing={2.5}
const DEFAULT_SCROLL_CAP_PX = Math.round(CARD_ROW_PX * 2.3 + CARD_GAP_PX * 2)

export function QuestsPanel({
  onClose,
  cardsMaxHeight = DEFAULT_SCROLL_CAP_PX,
  cardWidth,
  topSlot,
  onClaimAllComplete,
  flyTarget,
  onAllDismissed,
  cardsEntered = true,
  cardsEnterDelay = 0,
  cardsStagger = 120,
}: QuestsPanelProps) {
  const theme = useTheme()
  const { quests, unclaimedCount, claimAll } = useQuests()

  // ── Dismiss tracking ─────────────────────────────────────────────────────
  // Count how many claimed cards the user has individually dismissed.
  // We snapshot the claimed count at mount (and whenever it changes)
  // so we know the target to compare against.
  const [dismissedCount, setDismissedCount] = useState(0)
  const claimedCount = useMemo(
    () => quests.filter((q) => q.status === "completed-claimed").length,
    [quests],
  )
  // Stable ref so the per-card onDismiss callback doesn't need to be
  // re-created every render (avoids re-mounting cards unnecessarily).
  const onDismissRef = useRef<() => void>()
  onDismissRef.current = useCallback(
    () => setDismissedCount((n) => n + 1),
    [],
  )
  const handleCardDismiss = useCallback(() => onDismissRef.current?.(), [])

  useEffect(() => {
    if (claimedCount > 0 && dismissedCount >= claimedCount) {
      onAllDismissed?.()
    }
  }, [dismissedCount, claimedCount, onAllDismissed])
  // ─────────────────────────────────────────────────────────────────────────

  const handleClaimAll = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const source = e.currentTarget
    const claimedNow = claimAll()
    if (claimedNow.length === 0) return
    // Wait for the last-staggered coin sprite to land before notifying
    // the host — the reward-slide flow only advances to the map page
    // once the user has visually "received" the coins.
    await flyCoins({ source, count: Math.min(claimedNow.length * 2, 12), flyTarget })
    onClaimAllComplete?.()
  }

  const taskCards = useMemo(
    () =>
      quests
        .filter(
          (q) =>
            q.status === "completed-unclaimed" ||
            q.status === "completed-claimed",
        )
        .map((quest) => {
          const claimed = quest.status === "completed-claimed"
          return {
            quest,
            claimed,
            task: createTaskData({
              id: quest.id,
              title: quest.title,
              description: quest.description,
              type: TaskType.ASSIGNMENT,
              status: TaskStatus.COMPLETED,
              progress: 100,
              subject: "Quest",
            }),
          }
        }),
    [quests],
  )

  // Common inset applied whether or not the list is scroll-capped, so
  // the cards always breathe a bit inside their container instead of
  // butting up against the panel edges and the scrollbar track.
  // `py` is intentionally generous so the first and last cards get
  // visible top/bottom margin inside the well, matching the
  // between-card breathing room set on the Stack below.
  const insetSx = {
    px: 1,
    py: 2.5,
    backgroundColor: alpha(theme.palette.divider, 0.04),
    borderRadius: 2,
  } as const

  const scrollSx =
    cardsMaxHeight === "none"
      ? insetSx
      : {
          ...insetSx,
          maxHeight:
            typeof cardsMaxHeight === "number"
              ? `${cardsMaxHeight}px`
              : cardsMaxHeight,
          overflowY: "auto" as const,
          // Subtle, theme-aware scrollbar so the affordance reads as
          // part of the paper rather than a browser artifact.
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: alpha(theme.palette.text.primary, 0.2),
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: alpha(theme.palette.text.primary, 0.32),
          },
          scrollbarWidth: "thin" as const,
        }

  return (
    <>
      {topSlot}
      {/* Title strip — mirrors the dialog's DialogTitle styling so
          the inline variant feels like the same artifact. */}
      <Box
        sx={{
          position: "relative",
          px: 3,
          py: 2,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
          backgroundColor: alpha(theme.palette.primary.light, 0.06),
        }}
      >
        {onClose && (
          <IconButton
            onClick={onClose}
            aria-label="Close quests"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: "text.secondary",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}

        <Stack direction="row" spacing={2} sx={{
          alignItems: "center"
        }}>
          <AssignmentIcon color="primary" />
          <Stack spacing={0.25}>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "text.secondary",
              }}
            >
              Quests
            </Typography>
            <Typography
              component="h2"
              variant="h6"
              sx={{ fontWeight: 800 }}
            >
              Rewarded Events
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ p: 3 }}>
        {/* Single intro paragraph. Promoted to a larger size + tighter
            line-height so it reads as the panel's lede now that the
            previous "Keep momentum..." headline above it has been
            removed. A primary-tinted left rule anchors it visually
            against the title strip without competing with the cards. */}
        <Box
          sx={{
            mt: 0.5,
            mb: 3,
            ml: 0.5,
            pl: 1.75,
            borderLeft: `3px solid ${alpha(theme.palette.primary.main, 0.55)}`,
          }}
        >
          <Typography
            component="p"
            sx={{
              fontSize: { xs: 14.5, md: 15.5 },
              fontWeight: 500,
              lineHeight: 1.55,
              letterSpacing: "-0.003em",
              color: "text.secondary",
              maxWidth: "62ch",
            }}
          >
            Stay motivated with{" "}
            <Box component="span" sx={{ fontWeight: 800, color: "text.primary" }}>
              recognition, progression, and currency
            </Box>
            {". "}All of which help you obtain and achieve more.
          </Typography>
        </Box>

        <TaskCardProvider
          colors={{
            glowOuter: alpha(theme.palette.primary.main, 0.08),
            glowCenter: alpha(theme.palette.primary.main, 0.2),
            glowInner: alpha(theme.palette.primary.main, 0.32),
          }}
        >
          {taskCards.length === 0 ? (
            <Box
              sx={{
                py: 4,
                textAlign: "center",
                color: "text.secondary",
                fontSize: 13,
              }}
            >
              No completed quests yet — keep exploring to unlock rewards.
            </Box>
          ) : (
            <Box sx={scrollSx}>
              {/* `spacing={2.5}` ≈ 20px between adjacent cards — gives
                  each quest card visible top/bottom margin so the
                  rows don't read as a tightly packed strip. */}
              <Stack spacing={2.5} sx={{
                alignItems: cardWidth ? "center" : "stretch"
              }}>
                {taskCards.map(({ quest, claimed, task }, index) => (
                  <Fade
                    key={quest.id}
                    in={cardsEntered}
                    timeout={500}
                    style={{
                      transitionDelay: cardsEntered
                        ? `${cardsEnterDelay + index * cardsStagger}ms`
                        : "0ms",
                    }}
                  >
                    {/* Box wrapper required — Fade needs a single
                        forwardRef-compatible child. */}
                    <Box>
                      <QuestCardCompact
                        task={task}
                        rewardCoins={quest.rewardCoins}
                        rewardXp={quest.rewardXp}
                        claimed={claimed}
                        width={cardWidth ?? "100%"}
                        dismissible={claimed}
                        onDismiss={claimed ? handleCardDismiss : undefined}
                      />
                    </Box>
                  </Fade>
                ))}
              </Stack>
            </Box>
          )}
        </TaskCardProvider>

        {unclaimedCount > 0 && (
          <Box
            sx={{
              mt: 3,
              pt: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography sx={{ fontSize: 12.5, color: "text.secondary" }}>
              {unclaimedCount} quest{unclaimedCount === 1 ? "" : "s"} ready to claim
            </Typography>
            <Button
              onClick={handleClaimAll}
              variant="contained"
              startIcon={<PaidIcon />}
            >
              Claim Rewards
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}

// QuestsPanelCard inherits all QuestsPanelProps (including onAllDismissed,
// cardsEntered, cardsEnterDelay, cardsStagger) via the spread below.
export interface QuestsPanelCardProps extends QuestsPanelProps {
  /**
   * When `true`, removes the box-shadow and triple-layer halo from the
   * wrapper so the panel reads as a flat surface. Use when embedding
   * inside a slide that already provides its own depth (e.g. Reward slide).
   */
  flat?: boolean
}

/**
 * Standalone "card" variant of the panel. Wraps `QuestsPanel` in the
 * same paper surface + triple-layer accent border the dialog uses, so
 * embedding the panel inline on a slide visually matches the popup
 * artifact users see when opening it from the HUD.
 *
 * Layout/sizing is controlled by the parent (we cap at 640px so it
 * matches the dialog's `maxWidth="sm"` footprint).
 */
export function QuestsPanelCard({ flat = false, ...props }: QuestsPanelCardProps) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 640,
        mx: "auto",
        // Reset alignment so the embedded panel looks the same as the
        // dialog version even when the host slide centers its text
        // (e.g. EarnSlide's outer Stack uses `textAlign="center"`).
        textAlign: "left",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.primary.main, flat ? 0.1 : 0.18)}`,
        ...(flat
          ? {}
          : {
              boxShadow: theme.shadows[10],
              // Triple-layer accent halo — same formula as the dialog so
              // the inline panel reads as the same artifact.
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
            }),
        overflow: "hidden",
      }}
    >
      <QuestsPanel {...props} />
    </Box>
  )
}

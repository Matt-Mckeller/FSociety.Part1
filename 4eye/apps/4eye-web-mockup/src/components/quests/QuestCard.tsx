"use client"

/**
 * QuestCard — single row inside the Trophy Room modal.
 *
 * Visual states (driven by `quest.status`):
 *
 *   - `incomplete`           dim warm paper, lock icon, no claim CTA.
 *                            If `unlocksHref` is set the entire card
 *                            becomes a clickable link that closes the
 *                            modal and navigates.
 *   - `completed-unclaimed`  warm paper with a gold-radial border glow,
 *                            sparkle dot, and a Claim button on the
 *                            right that fires the coin-fly.
 *   - `completed-claimed`    warm paper, dimmed text, checkmark stamp,
 *                            "Claimed" pill on the right. Clicking dismisses.
 *
 * All three states share the same paper / border-radius / padding so
 * the modal grid stays visually stable as the user claims items
 * (no layout shift mid-claim).
 *
 * Exit animation — two phases:
 *   1. pop-fade  (300ms)  card scales to 1.06× and fades out
 *   2. collapse  (220ms)  maxHeight transitions to 0, reclaiming the slot
 *   3. gone              renders null so the Stack gap also closes
 */

import { Box, Button, Stack, Typography, alpha } from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import NextLink from "next/link"
import { useCallback, useRef, useState } from "react"
import type { ReactNode } from "react"

import type { QuestWithStatus } from "./QuestsProvider"

const PAPER_BG = "rgba(46, 24, 8, 0.66)"
const PAPER_BORDER = "rgba(255, 224, 130, 0.18)"
const GOLD_GLOW = "rgba(255, 193, 7, 0.55)"
const GOLD_SOFT = "#FFE082"
const TEXT_PRIMARY = "#FFF1D6"
const TEXT_DIM = "rgba(255, 241, 214, 0.55)"

export interface QuestCardProps {
  quest: QuestWithStatus
  /**
   * Click handler for the "Claim" button on completed-unclaimed cards.
   * Receives the source button so the parent can pass it into
   * `flyCoins({ source })`.
   */
  onClaim?: (source: HTMLElement, quest: QuestWithStatus) => void
  /**
   * Called when an incomplete card with a `unlocksHref` is clicked, so
   * the modal can close before navigation. Optional — when omitted the
   * link still works, the modal just stays open until the route changes.
   */
  onUnlockNavigate?: () => void
}

/**
 * Renders the rightmost slot — Claim button, Claimed pill, or chevron.
 * Factored out so the body content stays compact.
 *
 * `onClaim` here is a pre-wired mouse handler (already has quest + exit
 * animation baked in at the call site) so the slot just forwards the event.
 */
function CardActionSlot({
  quest,
  onClaim,
}: {
  quest: QuestWithStatus
  onClaim?: (e: React.MouseEvent<HTMLButtonElement>) => void
}): ReactNode {
  if (quest.status === "completed-unclaimed") {
    return (
      <Button
        size="small"
        variant="contained"
        onClick={onClaim}
        sx={{
          minWidth: 88,
          background: "linear-gradient(180deg, #f97316 0%, #c2410c 100%)",
          color: "#fff",
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          boxShadow: "0 4px 14px rgba(249, 115, 22, 0.45)",
          "&:hover": {
            background: "linear-gradient(180deg, #fb923c 0%, #d24a0d 100%)",
            boxShadow: "0 6px 18px rgba(249, 115, 22, 0.6)",
          },
        }}
      >
        Claim
      </Button>
    )
  }

  if (quest.status === "completed-claimed") {
    return (
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          px: 1.25,
          py: 0.5,
          borderRadius: 999,
          border: `1px solid ${alpha(GOLD_SOFT, 0.35)}`,
          color: alpha(GOLD_SOFT, 0.85),
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          minWidth: 88,
          justifyContent: "center",
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 14 }} />
        Claimed
      </Box>
    )
  }

  // incomplete
  if (quest.unlocksHref) {
    return (
      <ChevronRightIcon sx={{ color: TEXT_DIM, fontSize: 22 }} />
    )
  }
  return null
}

// Exit animation stage type
type ExitStage = "idle" | "pop-fade" | "collapse" | "gone"

export function QuestCard({ quest, onClaim, onUnlockNavigate }: QuestCardProps) {
  const isIncomplete = quest.status === "incomplete"
  const isUnclaimed = quest.status === "completed-unclaimed"
  const isClaimed = quest.status === "completed-claimed"
  const isLink = isIncomplete && !!quest.unlocksHref

  // ── Exit animation state ─────────────────────────────────────────────────
  const [exitStage, setExitStage] = useState<ExitStage>("idle")
  const wrapRef = useRef<HTMLDivElement>(null)
  const capturedHeight = useRef(0)

  const startExit = useCallback(() => {
    if (exitStage !== "idle") return
    // Snapshot height so the collapse knows its starting point
    capturedHeight.current = wrapRef.current?.getBoundingClientRect().height ?? 80
    setExitStage("pop-fade")
    // Phase 2: start height collapse once the card is invisible
    setTimeout(() => setExitStage("collapse"), 310)
    // Phase 3: remove from DOM so the Stack gap closes
    setTimeout(() => setExitStage("gone"), 310 + 240)
  }, [exitStage])

  // Claim button click — fire coin-fly immediately, then animate card out
  const handleClaimClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClaim?.(e.currentTarget, quest)
      startExit()
    },
    [onClaim, quest, startExit],
  )

  // Claimed card click — tap to dismiss
  const handleClaimedClick = useCallback(() => {
    startExit()
  }, [startExit])

  // Render nothing once fully gone
  if (exitStage === "gone") return null

  // ── Derived appearance ───────────────────────────────────────────────────
  const borderStyle = isUnclaimed
    ? `1px solid ${alpha(GOLD_SOFT, 0.55)}`
    : `1px solid ${PAPER_BORDER}`
  const boxShadow = isUnclaimed
    ? `0 0 0 1px ${alpha(GOLD_SOFT, 0.18)}, 0 0 24px -2px ${GOLD_GLOW}`
    : "none"

  const titleColor = isIncomplete ? TEXT_DIM : TEXT_PRIMARY
  const descColor = isIncomplete || isClaimed ? TEXT_DIM : alpha(TEXT_PRIMARY, 0.72)

  const Icon = isIncomplete
    ? LockOutlinedIcon
    : isClaimed
      ? CheckCircleIcon
      : EmojiEventsIcon
  const iconColor = isIncomplete
    ? TEXT_DIM
    : isClaimed
      ? alpha(GOLD_SOFT, 0.7)
      : GOLD_SOFT

  const cardInner = (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        alignItems: "center",
        width: "100%"
      }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isUnclaimed
            ? "radial-gradient(circle at 30% 30%, #FFE082, #E65100)"
            : alpha(GOLD_SOFT, 0.08),
          border: `1px solid ${isUnclaimed ? alpha(GOLD_SOFT, 0.6) : alpha(GOLD_SOFT, 0.18)}`,
        }}
      >
        {quest.icon ?? (
          <Icon sx={{ fontSize: 22, color: isUnclaimed ? "#5C2C00" : iconColor }} />
        )}
      </Box>

      <Stack spacing={0.25} sx={{ flexGrow: 1, minWidth: 0, textAlign: "left" }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 15,
            color: titleColor,
            lineHeight: 1.25,
            transition: "color 200ms ease",
          }}
        >
          {quest.title}
        </Typography>
        <Typography
          sx={{
            fontSize: 12.5,
            color: descColor,
            lineHeight: 1.35,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {isLink && quest.unlocksLabel
            ? `${quest.description} → ${quest.unlocksLabel}`
            : quest.description}
        </Typography>
      </Stack>

      <Stack
        spacing={0.5}
        sx={{
          alignItems: "flex-end",
          flexShrink: 0,
          minWidth: 96
        }}>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: alpha(GOLD_SOFT, isClaimed ? 0.5 : 0.85),
            textTransform: "uppercase",
          }}
        >
          +{quest.rewardCoins}{quest.rewardCoins === 1 ? " coin" : " coins"}
        </Typography>
        <CardActionSlot quest={quest} onClaim={handleClaimClick} />
      </Stack>
    </Stack>
  )

  const sharedSx = {
    width: "100%",
    borderRadius: 2,
    px: 2,
    py: 1.5,
    background: PAPER_BG,
    border: borderStyle,
    boxShadow,
    // Pop-fade: scale up + dissolve
    transform: exitStage !== "idle" ? "scale(1.06)" : "scale(1)",
    opacity: exitStage !== "idle" ? 0 : 1,
    transition:
      exitStage !== "idle"
        ? "transform 0.28s cubic-bezier(0.4, 0, 0.6, 1), opacity 0.24s ease-out"
        : "border-color 200ms ease, box-shadow 200ms ease, background 200ms ease",
    pointerEvents: exitStage !== "idle" ? ("none" as const) : undefined,
  } as const

  // Outer wrapper handles the height collapse (phase 2) independently of
  // the card's scale/opacity so both axes can ease separately.
  const wrapStyle: React.CSSProperties =
    exitStage === "collapse"
      ? {
          maxHeight: 0,
          overflow: "hidden",
          transition: "max-height 0.24s ease",
        }
      : exitStage === "pop-fade"
        ? {
            // Pin the height so the collapse knows where to start from
            maxHeight: capturedHeight.current,
            overflow: "hidden",
          }
        : {}

  if (isLink && quest.unlocksHref) {
    return (
      <div ref={wrapRef} style={wrapStyle}>
        <Box
          component={NextLink}
          href={quest.unlocksHref}
          onClick={onUnlockNavigate}
          sx={{
            ...sharedSx,
            display: "block",
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
            "&:hover": {
              borderColor: alpha(GOLD_SOFT, 0.3),
              background: "rgba(58, 30, 10, 0.78)",
            },
          }}
        >
          {cardInner}
        </Box>
      </div>
    )
  }

  return (
    <div ref={wrapRef} style={wrapStyle}>
      <Box
        sx={{
          ...sharedSx,
          // Claimed cards are tappable to dismiss
          ...(isClaimed && {
            cursor: "pointer",
            "&:hover": { opacity: 0.85 },
          }),
        }}
        onClick={isClaimed ? handleClaimedClick : undefined}
      >
        {cardInner}
      </Box>
    </div>
  )
}

/**
 * QuestCardCompact — quest variant of TaskCard.
 *
 * Same visual language as `TaskCard` (CardFace background + three-layer
 * glow border + ExpanseLogo header), but a denser layout intended for
 * quest list rows inside the marketing Quests modal:
 *
 *   - Smaller height (no preview / no progress bar)
 *   - Top-right status badge: neon green "Completed" for ready-to-
 *     claim quests, muted green "Claimed" once collected. Driven by
 *     the optional `claimed` prop.
 *   - Reward chips (coins + XP) sit on the bottom strip alongside
 *     the heart meter:
 *       - Coin chip uses the cyan-blue currency tint (the same blue
 *         that used to mark IN_PROGRESS in the shared status palette,
 *         now repurposed here as the coin highlight).
 *       - XP chip uses a purple-neon treatment.
 *     Both chips bloom only on hover.
 *   - Heart meter on the left; hovering it reveals a tooltip with the
 *     difficulty tier label.
 *   - Progress bar removed.
 */

"use client"

import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { Box, Tooltip, Typography, alpha, styled } from "@mui/material"
import { ExpanseLogoV5 } from "../../../../display/logos/ExpanseLogoV5/ExpanseLogoV5.component"
import { CoinIcon } from "../../../../display/icons/CoinIcon"
import { XpIcon } from "../../../../display/icons/XpIcon"
import {
  TaskData,
  getDifficultyLabel,
  formatDueDateCompact,
  isTaskOverdue,
} from "./types"
import { useTaskCardContext, TaskCardProvider } from "./context"
import { useHoverGlow, useTaskCard } from "./hooks"
import { HeartMeter } from "./subcomponents"

// ============================================================
// CARD FRAME (shares the TaskCard CardFace look — solid bg + 3-layer border)
// ============================================================

const CardFrame = styled(Box)<{
  bgColor: string
  glowOuter: string
  glowCenter: string
  glowInner: string
}>(({ bgColor, glowOuter, glowCenter, glowInner }) => ({
  position: "relative",
  borderRadius: 12,
  background: bgColor,
  // Three-layer border glow — identical formula to TaskCard's CardFace.
  boxShadow: `
    0 0 0 1px ${glowInner},
    0 0 0 3px ${glowCenter},
    0 0 0 6px ${glowOuter}
  `,
  overflow: "hidden",
  cursor: "default",
}))

const CardInner = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "10px 12px",
  gap: 6,
  // Force left alignment so the card stays readable even when its
  // parent (e.g. a marketing slide) sets a centered `textAlign` on
  // an ancestor container.
  textAlign: "left",
})

const HeaderRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 8,
})

const TitleSection = styled(Box)({
  flex: 1,
  minWidth: 0,
})

const Title = styled(Typography)({
  fontSize: 13,
  fontWeight: 700,
  color: "#FFFFFF",
  lineHeight: 1.25,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
})

const LogoContainer = styled(Box)({
  width: 22,
  height: 22,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 0,
  fontSize: 0,
  "& > svg": { display: "block", width: "100%", height: "100%" },
})

/**
 * Bottom strip that hosts the heart meter (left), reward chips
 * (center), and status badge (right) on a single line. Uses a faint
 * top border so it visually separates from the description block
 * above without becoming a heavy footer.
 *
 * Flex with `justify-content: space-between` so each of the three
 * groups owns its own edge — heart hugs the left, chips float in the
 * middle, badge hugs the right — and the three breathe with the
 * available width instead of being forced into equal grid columns.
 */
const BottomStrip = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  marginTop: 4,
  paddingTop: 8,
  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
})

const BottomLeft = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
})

const BottomCenter = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  flexShrink: 1,
  flexWrap: "wrap",
  justifyContent: "center",
})

const BottomRight = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  flexShrink: 0,
})

const DueIndicator = styled(Box)<{ isOverdue: boolean }>(({ isOverdue }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  fontSize: 11,
  fontWeight: 600,
  lineHeight: 1,
  color: isOverdue ? "#ff6b6b" : "rgba(255, 255, 255, 0.7)",
  "& svg": {
    width: 12,
    height: 12,
    flexShrink: 0,
  },
}))

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

// ============================================================
// COMPLETED / CLAIMED BADGE — top-right neon tag
// ============================================================

/**
 * Top-right status tag.
 *
 * Two labels (`"Completed"` / `"Claimed"`) but a single celebratory
 * visual treatment: both render with the bright neon-green tone and
 * resting halo so the user feels equally rewarded whether the quest
 * is ready-to-claim or already done. Distinguishing the two badge
 * states is left to the label text + check glyph.
 *
 * The check glyph keeps the tag readable at a glance even before the
 * label registers. Implemented as a tiny inline SVG to avoid pulling
 * in another icon dependency.
 */
const CheckGlyph = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 8.5 L7 12 L13 4.5" />
  </svg>
)

const BadgeBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "tone" && prop !== "glowColor",
})<{ tone: string; glowColor: string }>(({ tone, glowColor }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  height: 20,
  padding: "0 8px",
  borderRadius: 10,
  fontSize: 10.5,
  fontWeight: 800,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  lineHeight: 1,
  color: tone,
  border: `1px solid ${alpha(tone, 0.85)}`,
  backgroundColor: alpha(tone, 0.22),
  boxShadow: `0 0 6px ${alpha(glowColor, 0.55)}, 0 0 12px ${alpha(glowColor, 0.35)}`,
  textShadow: `0 0 6px ${alpha(glowColor, 0.7)}`,
  "& svg": {
    width: 11,
    height: 11,
    flexShrink: 0,
    filter: `drop-shadow(0 0 3px ${alpha(glowColor, 0.85)})`,
  },
}))

interface CompletedBadgeProps {
  /** When true, render the "Claimed" label; otherwise "Completed". */
  claimed: boolean
}

function CompletedBadge({ claimed }: CompletedBadgeProps) {
  // Both states share QUEST_COMPLETED_NEON so the glow and green tone
  // are identical; only the label text differentiates them.
  const palette = QUEST_COMPLETED_NEON
  const label = claimed ? "Claimed" : "Completed"
  return (
    <BadgeBox tone={palette.core} glowColor={palette.glow}>
      <CheckGlyph />
      <span>{label}</span>
    </BadgeBox>
  )
}

// ============================================================
// REWARD CHIP — uses the actual brand icon SVGs from the HUD status bar
// ============================================================

/**
 * Neon palettes for the QuestCardCompact accents.
 *
 * Each palette has the same shape:
 *   - `core`  — vibrant base used for text + icon fill
 *   - `edge`  — slightly deeper tone used for the chip border
 *   - `glow`  — outer halo color (used in box-shadow / drop-shadow)
 *
 * Exported alongside the component so consumers can match the same
 * accents elsewhere (tooltips, hover effects, fly-coin trails)
 * without re-deriving the values.
 */
export const QUEST_XP_NEON = {
  core: "#C084FC",
  edge: "#A855F7",
  glow: "#9333EA",
} as const

/**
 * Cyan-blue palette for the coin reward chip — repurposed from the
 * old `IN_PROGRESS` status color so coins now own the brand's
 * primary blue.
 */
export const QUEST_COIN_NEON = {
  core: "#3DB8FF",
  edge: "#00A3E5",
  glow: "#0099FF",
} as const

/**
 * Neon-green palette for the "Completed" badge (ready to claim).
 * Bright, saturated, and clearly distinct from the muted material
 * green used by the legacy `STATUS_COLORS.COMPLETED`.
 */
export const QUEST_COMPLETED_NEON = {
  core: "#5DFF8F",
  edge: "#3CE068",
  glow: "#22C55E",
} as const

/**
 * Muted green for the "Claimed" badge — same hue family but lower
 * intensity so already-claimed cards visually recede next to ready-
 * to-claim ones.
 */
export const QUEST_CLAIMED_TONE = {
  core: "#7BCFA1",
  edge: "#5BA67E",
  glow: "#3F7C5C",
} as const

interface RewardChipProps {
  /**
   * The icon node to render inside the chip's leading slot. Caller is
   * expected to size it; we just provide a constrained 14×14 box.
   */
  icon: React.ReactNode
  /** Display value (already includes any prefix like "+"). */
  label: string
  /** Tooltip shown on hover. */
  tooltip: string
  /**
   * Tint used for chip border + text. Defaults to the cloud-theme cyan
   * accent so it matches StatusBadge's color treatment.
   */
  tint?: string
  /**
   * When true, applies a neon halo effect (outer box-shadow + text
   * glow) on top of the base chip. Used by the XP chip to give it a
   * distinct "experience point" arcade feel separate from the gold
   * coin chip.
   */
  neon?: boolean
  /**
   * Outer halo color when `neon` is true. Falls back to `tint` if
   * omitted.
   */
  glowColor?: string
}

/**
 * Chip surface. The neon halo + text glow are gated behind `:hover` so
 * the resting state stays calm and only the hovered chip pops. The
 * `neon` flag controls whether the halo is wired up at all (the gold
 * coin chip uses `neon=false`, so it never glows; the XP chip uses
 * `neon=true` and only glows on hover).
 */
const ChipBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "tint" && prop !== "neon" && prop !== "glowColor",
})<{ tint: string; neon: boolean; glowColor: string }>(({ tint, neon, glowColor }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  height: 22,
  padding: "0 8px",
  borderRadius: 11,
  fontSize: 11,
  fontWeight: 700,
  lineHeight: 1,
  color: tint,
  border: `1px solid ${alpha(tint, 0.5)}`,
  backgroundColor: alpha(tint, 0.18),
  boxShadow: "none",
  textShadow: "none",
  transition:
    "box-shadow 180ms ease-out, text-shadow 180ms ease-out, border-color 180ms ease-out, background-color 180ms ease-out",
  ...(neon && {
    "&:hover": {
      borderColor: alpha(tint, 0.85),
      backgroundColor: alpha(tint, 0.22),
      boxShadow: `0 0 6px ${alpha(glowColor, 0.65)}, 0 0 14px ${alpha(glowColor, 0.45)}, inset 0 0 6px ${alpha(tint, 0.35)}`,
      textShadow: `0 0 6px ${alpha(glowColor, 0.85)}`,
    },
  }),
}))

/**
 * Icon wrapper. Mirrors `ChipBox`'s hover-only halo via a sibling
 * selector so the SVG drop-shadow lights up in sync with the border.
 * Implemented with the parent `&:hover &` pattern (emotion preserves
 * the `&` so the inner box gets targeted when the outer chip is
 * hovered) — but to keep this self-contained we just react to a
 * `data-neon` attribute on the parent through `:hover` on this box's
 * own ancestor via the `group` pattern below.
 *
 * In practice we attach the hover rule directly on `ChipBox` above
 * and use a CSS variable that this component reads. That avoids
 * cross-component selector coupling.
 */
const ChipIcon = styled(Box)({
  width: 14,
  height: 14,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  filter: "none",
  transition: "filter 180ms ease-out",
  "& svg": {
    width: "100%",
    height: "100%",
    display: "block",
  },
})

function RewardChip({
  icon,
  label,
  tooltip,
  tint = "#FFD24A",
  neon = false,
  glowColor,
}: RewardChipProps) {
  const haloColor = glowColor ?? tint
  return (
    <Tooltip title={tooltip} placement="top" arrow>
      <ChipBox
        tint={tint}
        neon={neon}
        glowColor={haloColor}
        // Inline hover rule for the icon's drop-shadow keeps the icon's
        // glow tied to the *chip's* hover state without needing a
        // styled `&:hover .chip-icon` selector that would have to
        // reach across components.
        sx={
          neon
            ? {
                "&:hover .QuestCardCompact-chipIcon": {
                  filter: `drop-shadow(0 0 4px ${alpha(haloColor, 0.85)})`,
                },
              }
            : undefined
        }
      >
        <ChipIcon className="QuestCardCompact-chipIcon">{icon}</ChipIcon>
        <span>{label}</span>
      </ChipBox>
    </Tooltip>
  )
}

// ============================================================
// PUBLIC API
// ============================================================

/** Animation stage for the dismiss-on-click exit sequence. */
type DismissStage = "idle" | "pop-fade" | "collapse" | "gone"

export interface QuestCardCompactProps {
  /**
   * Underlying task model — same shape as TaskCard so the variant
   * stays type-compatible with the rest of the family.
   *
   * Notes:
   *   - `progress` is intentionally ignored (no progress bar).
   *   - `points` still drives the heart meter + tier tooltip.
   *   - `subject` is no longer rendered as a chip; the meta row now
   *     shows reward chips instead.
   */
  task: TaskData
  /** Coins reward awarded for completing this quest. */
  rewardCoins: number
  /**
   * XP reward awarded for completing this quest. Optional; if omitted
   * the XP chip is hidden.
   */
  rewardXp?: number
  /**
   * Whether this quest's reward has already been claimed.
   * Drives the top-right tag:
   *   - `false` → bright neon "Completed" (ready to claim)
   *   - `true`  → muted "Claimed"
   * Defaults to `false`.
   *
   * Note: this variant is intended for showing only quests that are
   * already complete (the modal filters incomplete quests out). The
   * underlying `task.status` is no longer rendered as a badge.
   */
  claimed?: boolean
  /**
   * Card width. Defaults to `"100%"` so the variant fills its parent
   * container (intended use: vertical list rows). Pass an explicit
   * pixel width to render at a fixed size (e.g. for storybook).
   */
  width?: number | string
  /**
   * When `true`, clicking the card plays a grow-and-fade exit animation
   * then removes the card from layout entirely. Intended for claimed
   * quest rows so users can dismiss cards they have already seen.
   */
  dismissible?: boolean
  /**
   * Called once after the card has fully exited (all animation phases
   * complete). Use this to track how many cards have been dismissed so
   * the parent can react when the last one is gone.
   */
  onDismiss?: () => void
  /** Optional click handler — fires before the dismiss animation starts. */
  onClick?: () => void
  className?: string
}

function QuestCardCompactInner({
  task,
  rewardCoins,
  rewardXp,
  claimed = false,
  width = "100%",
  dismissible = false,
  onDismiss,
  onClick,
  className,
}: QuestCardCompactProps) {
  const { colors } = useTaskCardContext()
  // `overdue` still drives the optional due-date indicator color.
  // The TaskCard StatusBadge has been removed from this variant — the
  // top-right CompletedBadge replaces it.
  const overdue = isTaskOverdue(task)
  const tierLabel = getDifficultyLabel(task.points)

  // Reuse TaskCard's interaction state for the same hover-elevation feel.
  const { state, handleMouseEnter, handleMouseLeave, cardRef } = useTaskCard({
    task,
    flipEnabled: false,
    expandEnabled: false,
  })
  const { glowStyle } = useHoverGlow({ isHovered: state.viewState === "hovered" })

  // ── Dismiss animation ──────────────────────────────────────────────────
  const [dismissStage, setDismissStage] = useState<DismissStage>("idle")
  const wrapRef = useRef<HTMLDivElement>(null)
  const snappedHeight = useRef(0)

  const startDismiss = useCallback(() => {
    if (!dismissible || dismissStage !== "idle") return
    snappedHeight.current = wrapRef.current?.getBoundingClientRect().height ?? 90
    setDismissStage("pop-fade")
    setTimeout(() => setDismissStage("collapse"), 300)
    setTimeout(() => setDismissStage("gone"), 300 + 230)
  }, [dismissible, dismissStage])

  const handleClick = useCallback(() => {
    onClick?.()
    startDismiss()
  }, [onClick, startDismiss])

  // Fire onDismiss once the card has fully exited so callers can count
  // how many cards are gone and react when the last one disappears.
  useEffect(() => {
    if (dismissStage === "gone") onDismiss?.()
  // onDismiss intentionally excluded — callers must stabilise it with
  // useCallback; re-running when it changes would double-fire.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dismissStage])

  if (dismissStage === "gone") return null

  // Outer wrapper manages the height-collapse phase.
  const wrapStyle: React.CSSProperties =
    dismissStage === "collapse"
      ? { maxHeight: 0, overflow: "hidden", transition: "max-height 0.23s ease" }
      : dismissStage === "pop-fade"
        ? { maxHeight: snappedHeight.current, overflow: "hidden" }
        : {}

  // Inner card box handles the pop-fade phase.
  const cardExitSx =
    dismissStage !== "idle"
      ? {
          transform: "scale(1.06)",
          opacity: 0,
          transition: "transform 0.26s cubic-bezier(0.4,0,0.6,1), opacity 0.22s ease-out",
          pointerEvents: "none" as const,
        }
      : dismissible
        ? { cursor: "pointer" }
        : {}

  return (
    <div ref={wrapRef} style={wrapStyle}>
    <Box
      ref={cardRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      sx={{ width, ...glowStyle, ...cardExitSx }}
    >
      <CardFrame
        bgColor={colors.background}
        glowOuter={colors.glowOuter}
        glowCenter={colors.glowCenter}
        glowInner={colors.glowInner}
      >
        <CardInner>
          <HeaderRow>
            <TitleSection>
              <Title>{task.title}</Title>
            </TitleSection>
            <LogoContainer>
              <ExpanseLogoV5
                height="100%"
                maxWidth="100%"
                fill="#FFFFFF"
                ringFill="rgba(255,255,255,0.85)"
                orbitalFill="rgba(255,255,255,0.7)"
              />
            </LogoContainer>
          </HeaderRow>

          {task.description && (
            <Typography
              sx={{
                fontSize: 12,
                color: "rgba(255, 255, 255, 0.72)",
                lineHeight: 1.35,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {task.description}
            </Typography>
          )}

          {/* Single bottom strip — flex `space-between` between three
              groups:
                - left   : heart meter (with tier tooltip on hover)
                - center : coin + XP reward chips (XP gets purple-neon
                           halo on hover only)
                - right  : due indicator + status badge
              The three groups own their own edge so the rhythm scales
              naturally with the card width instead of being squeezed
              into equal grid columns. */}
          <BottomStrip>
            <BottomLeft>
              <Tooltip title={`Tier: ${tierLabel}`} placement="top" arrow>
                <Box sx={{ display: "inline-flex" }}>
                  <HeartMeter points={task.points} />
                </Box>
              </Tooltip>
            </BottomLeft>

            <BottomCenter>
              {/* Coin chip — now tinted with the cyan-blue formerly
                  used for IN_PROGRESS so coins own the brand's
                  primary blue accent. Glows on hover only. */}
              <RewardChip
                icon={<CoinIcon color={QUEST_COIN_NEON.core} />}
                label={`+${rewardCoins}`}
                tooltip="Coins reward"
                tint={QUEST_COIN_NEON.core}
                glowColor={QUEST_COIN_NEON.glow}
                neon
              />
              {typeof rewardXp === "number" && (
                <RewardChip
                  icon={<XpIcon color={QUEST_XP_NEON.core} />}
                  label={`+${rewardXp} XP`}
                  tooltip="Experience reward"
                  tint={QUEST_XP_NEON.core}
                  glowColor={QUEST_XP_NEON.glow}
                  neon
                />
              )}
            </BottomCenter>

            <BottomRight>
              {task.dueDate && (
                <DueIndicator
                  isOverdue={overdue}
                  title={`Due ${task.dueDate.toLocaleDateString()}`}
                >
                  <ClockIcon />
                  {formatDueDateCompact(task.dueDate)}
                </DueIndicator>
              )}
              {/* Completed / Claimed tag now lives at the bottom-right,
                  immediately after the XP chip in reading order. */}
              <CompletedBadge claimed={claimed} />
            </BottomRight>
          </BottomStrip>
        </CardInner>
      </CardFrame>
    </Box>
    </div>
  )
}

/**
 * QuestCardCompact — drop-in compact quest variant.
 *
 * Renders inside its own `TaskCardProvider` if one isn't already in the
 * tree, so consumers can render it standalone without ceremony.
 */
export const QuestCardCompact = forwardRef<HTMLDivElement, QuestCardCompactProps>(
  function QuestCardCompact(props, _ref) {
    return (
      <TaskCardProvider>
        <QuestCardCompactInner {...props} />
      </TaskCardProvider>
    )
  },
)

export default QuestCardCompact

"use client"

/**
 * CompactStatusBar — single-bar expandable status chip.
 *
 * Collapsed (default): one pill showing currency only.
 * Expanded: same pill grows in width to reveal currency + XP + level,
 *           evenly spaced inside one bar.
 *
 * Composition:
 *   - Outer wrapper `<Box>` whose width transitions via CSS.
 *   - One `ExpandingBarTripleLayer` (the brand triple-layer pill).
 *   - Children: a flex row with 3 inline sections separated by a thin
 *     tinted divider (derived from the bar's resolved `contentColor` so
 *     it stays in-theme across `default | quiet | primary | ghost`).
 *     Currency anchors the leading edge; XP and level fade + slide in.
 *
 * Directions:
 *   - "right" (default) → currency anchored left, growth on the right.
 *   - "left"            → currency anchored right, growth on the left.
 */

import { Box, type BoxProps, Tooltip, Typography, alpha } from "@mui/material"
import { Person3 } from "@mui/icons-material"
import { useCallback, useMemo, useState } from "react"

import { HUD_HEADER_BAR_SIZE } from "../constants"
import {
  ExpandingBarTripleLayer,
  type ExpandingBarTripleLayerVariant,
  type ExpandingBarTripleLayerVisualState,
  useTripleLayerBarContext,
} from "../display/ExpandingBarTripleLayer"
import { CoinIcon } from "../display/icons/CoinIcon"
import { XpIcon } from "../display/icons/XpIcon"

import { useExpansion } from "./hooks/useExpansion"
import { useVisualState } from "./hooks/useVisualState"
import { usePlayerStatus } from "./context"
import type { StatusBarDisplayState } from "./types/status.types"

export type CompactStatusBarDirection = "right" | "left"
export type CompactStatusBarSize = "sm" | "md" | "lg"
export type CompactStatusBarTrigger = "hover" | "click"

export interface CompactStatusBarProps {
  /** Currency value (always visible). */
  currency?: number
  /** Experience value (revealed when expanded). */
  xp?: number
  /** Character level (revealed when expanded). */
  level?: number

  /** Bar height in px. Default depends on `size`. */
  barHeight?: number
  /** Preset size; sets a sensible `barHeight` default. Default: `"md"`. */
  size?: CompactStatusBarSize
  /** Theme variant forwarded to the underlying pill. Default: `"default"`. */
  variant?: ExpandingBarTripleLayerVariant
  /** Visual display state. Default: `"active"`. */
  displayState?: StatusBarDisplayState

  /** Whether the bar can expand. Default: `true`. */
  expandable?: boolean
  /** Trigger to expand. Default: `"hover"`. */
  expansionTrigger?: CompactStatusBarTrigger
  /** Which side the bar grows toward. Default: `"right"`. */
  expansionDirection?: CompactStatusBarDirection

  /** Uncontrolled initial expanded state. */
  defaultExpanded?: boolean
  /** Controlled expanded state. */
  expanded?: boolean
  /** Controlled change callback. */
  onExpandedChange?: (expanded: boolean) => void

  /** Optional value formatters. */
  formatCurrency?: (n: number) => string
  formatXp?: (n: number) => string
  formatLevel?: (n: number) => string

  /** Container `BoxProps` passthrough. */
  containerProps?: BoxProps
}

const SIZE_TO_HEIGHT: Record<CompactStatusBarSize, number> = {
  sm: HUD_HEADER_BAR_SIZE.desktop,
  md: HUD_HEADER_BAR_SIZE.desktop,
  lg: HUD_HEADER_BAR_SIZE.desktop,
}

const REFERENCE_HEIGHT = 40

const DEFAULT_FORMATTER = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString() : "∞"
// Level renders next to a user icon, so the formatter just yields the number.
// Consumers can still pass `formatLevel` to add a prefix/suffix if desired.
const DEFAULT_LEVEL_FORMATTER = (n: number) => String(n)

const TRANSITION = "240ms cubic-bezier(0.4, 0, 0.2, 1)"

export function CompactStatusBar({
  currency: currencyProp,
  xp: xpProp,
  level: levelProp,
  barHeight,
  size = "md",
  variant,
  displayState = "active",
  expandable = true,
  expansionTrigger = "hover",
  expansionDirection = "right",
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandedChange,
  formatCurrency = DEFAULT_FORMATTER,
  formatXp = DEFAULT_FORMATTER,
  formatLevel = DEFAULT_LEVEL_FORMATTER,
  containerProps,
}: CompactStatusBarProps) {
  // Props win, otherwise read from PlayerStatusContext (which provides
  // its own defaults when no provider is mounted).
  const status = usePlayerStatus()
  const currency = currencyProp ?? status.currency
  const xp = xpProp ?? status.xp
  const level = levelProp ?? (typeof status.level === "number" ? status.level : 1)

  const resolvedHeight = barHeight ?? SIZE_TO_HEIGHT[size]
  const scaleFactor = resolvedHeight / REFERENCE_HEIGHT
  const fontSize = Math.max(10, Math.round(14 * scaleFactor))
  const sidePadding = Math.round(10 * scaleFactor)
  const sectionGap = Math.round(10 * scaleFactor)

  const [isClicked, setIsClicked] = useState(false)

  const {
    isExpanded,
    isHovered,
    handlers: expansionHandlers,
  } = useExpansion({
    defaultExpanded,
    expanded: controlledExpanded,
    onExpandedChange,
    trigger: expansionTrigger,
    enabled: expandable,
  })

  const visualState = useVisualState({ displayState, isHovered })

  const shadowIntensity = isClicked ? 1 : 0
  const enableRipple = expandable && expansionTrigger === "click"

  const handleClick = useCallback(() => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 150)
    expansionHandlers.onClick()
  }, [expansionHandlers])

  // Width: collapsed = currency-only pill (~2.6×height → 104px at h=40).
  // Expanded = enough room for 3 sections with breathing room (~10×height).
  const collapsedWidth = Math.round(resolvedHeight * 2.6)
  const expandedWidth = Math.round(resolvedHeight * 10)
  const targetWidth = isExpanded ? expandedWidth : collapsedWidth
  const targetAspectRatio = targetWidth / resolvedHeight

  const isLeftDirection = expansionDirection === "left"

  const containerSx: BoxProps["sx"] = useMemo(
    () => ({
      width: targetWidth,
      height: resolvedHeight,
      transition: `width ${TRANSITION}`,
      cursor:
        expandable && expansionTrigger === "click" ? "pointer" : "default",
      ...containerProps?.sx,
    }),
    [
      targetWidth,
      resolvedHeight,
      expandable,
      expansionTrigger,
      containerProps?.sx,
    ],
  )

  return (
    <Box
      onMouseEnter={expansionHandlers.onMouseEnter}
      onMouseLeave={expansionHandlers.onMouseLeave}
      onClick={
        expandable && expansionTrigger === "click" ? handleClick : undefined
      }
      {...containerProps}
      sx={containerSx}
    >
      <ExpandingBarTripleLayer
        visualState={visualState as ExpandingBarTripleLayerVisualState}
        variant={variant}
        enableRipple={enableRipple}
        onClick={enableRipple ? handleClick : undefined}
        shadowIntensity={shadowIntensity}
        preset="cloud"
        aspectRatio={targetAspectRatio}
      >
        <CompactBarContent
          isExpanded={isExpanded}
          isLeftDirection={isLeftDirection}
          currency={currency}
          xp={xp}
          level={level}
          fontSize={fontSize}
          scaleFactor={scaleFactor}
          sidePadding={sidePadding}
          sectionGap={sectionGap}
          formatCurrency={formatCurrency}
          formatXp={formatXp}
          formatLevel={formatLevel}
        />
      </ExpandingBarTripleLayer>
    </Box>
  )
}

interface CompactBarContentProps {
  isExpanded: boolean
  isLeftDirection: boolean
  currency: number
  xp: number
  level: number
  fontSize: number
  scaleFactor: number
  sidePadding: number
  sectionGap: number
  formatCurrency: (n: number) => string
  formatXp: (n: number) => string
  formatLevel: (n: number) => string
}

function CompactBarContent({
  isExpanded,
  isLeftDirection,
  currency,
  xp,
  level,
  fontSize,
  scaleFactor,
  sidePadding,
  sectionGap,
  formatCurrency,
  formatXp,
  formatLevel,
}: CompactBarContentProps) {
  const ctx = useTripleLayerBarContext()
  const contentColor = ctx?.contentColor ?? "inherit"
  const dividerColor = alpha(
    typeof contentColor === "string" && contentColor.startsWith("#")
      ? contentColor
      : "#ffffff",
    0.25,
  )

  const iconBoxSize = Math.max(14, Math.round(18 * scaleFactor))
  const iconLabelGap = Math.max(3, Math.round(5 * scaleFactor))

  const currencySection = (
    <SectionTooltip title="Currency" enabled={isExpanded}>
      <Section key="currency" minWidthPx={Math.round(48 * scaleFactor)} gapPx={iconLabelGap}>
        {/* `data-coin-target="currency"` marks this DOM node as the
            destination for the marketing app's coin-fly animation. The
            attribute is intentional public API of the status bar so apps
            can compute screen-space targets via document.querySelector
            without prop-drilling refs through the HUD shell. */}
        <IconBox sizePx={iconBoxSize} dataCoinTarget="currency">
          <CoinIcon color={contentColor} />
        </IconBox>
        <Value fontSize={fontSize} color={contentColor}>
          {formatCurrency(currency)}
        </Value>
      </Section>
    </SectionTooltip>
  )

  const xpSection = (
    <SectionTooltip title="Experience" enabled={isExpanded}>
      <Section key="xp" minWidthPx={Math.round(52 * scaleFactor)} gapPx={iconLabelGap}>
        <IconBox sizePx={iconBoxSize}>
          <XpIcon color={contentColor} />
        </IconBox>
        <Value fontSize={fontSize} color={contentColor}>
          {formatXp(xp)}
        </Value>
      </Section>
    </SectionTooltip>
  )

  const levelSection = (
    <SectionTooltip title="Level" enabled={isExpanded}>
      <Section key="level" minWidthPx={Math.round(36 * scaleFactor)} gapPx={iconLabelGap}>
        <IconBox sizePx={iconBoxSize}>
          <Person3
            sx={{
              color: contentColor,
              width: `${iconBoxSize}px`,
              height: `${iconBoxSize}px`,
              transition: "color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </IconBox>
        <Value fontSize={fontSize} color={contentColor} weight={700}>
          {formatLevel(level)}
        </Value>
      </Section>
    </SectionTooltip>
  )

  // DOM order is always [currency, xp, level]. `flexDirection: row-reverse`
  // handles the visual mirror for left-direction without re-ordering DOM.
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isLeftDirection ? "row-reverse" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
        px: `${sidePadding}px`,
        gap: `${sectionGap}px`
      }}>
      {currencySection}
      <CollapsibleSection
        visible={isExpanded}
        dividerColor={dividerColor}
        gap={sectionGap}
        side={isLeftDirection ? "right" : "left"}
      >
        {xpSection}
      </CollapsibleSection>
      <CollapsibleSection
        visible={isExpanded}
        dividerColor={dividerColor}
        gap={sectionGap}
        side={isLeftDirection ? "right" : "left"}
      >
        {levelSection}
      </CollapsibleSection>
    </Box>
  );
}

/**
 * Wraps a section with a label tooltip (placed below the bar). Only enabled
 * when `enabled` is true so the tooltip never appears for the always-visible
 * currency section while the bar is collapsed.
 */
function SectionTooltip({
  title,
  enabled,
  children,
}: {
  title: string
  enabled: boolean
  children: React.ReactElement
}) {
  if (!enabled) return children
  return (
    <Tooltip title={title} placement="bottom" arrow disableInteractive>
      {/* span holds the ref MUI Tooltip clones onto so plain function
          children (like our Section) don't trigger ref warnings. */}
      <span style={{ display: "inline-flex", alignItems: "center" }}>
        {children}
      </span>
    </Tooltip>
  )
}

function Section({
  children,
  minWidthPx,
  gapPx,
}: {
  children: React.ReactNode
  minWidthPx: number
  gapPx: number
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        minWidth: `${minWidthPx}px`,
        flexShrink: 0,
        gap: `${gapPx}px`
      }}>
      {children}
    </Box>
  );
}

function IconBox({
  children,
  sizePx,
  dataCoinTarget,
}: {
  children: React.ReactNode
  sizePx: number
  /**
   * Renders as `data-coin-target` on the wrapper. Used by consumer-app
   * fly-to-target animations to locate the icon's screen position via
   * `document.querySelector('[data-coin-target="..."]')`.
   */
  dataCoinTarget?: string
}) {
  return (
    <Box
      data-coin-target={dataCoinTarget}
      sx={{
        height: `${sizePx}px`,
        width: `${sizePx}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </Box>
  )
}

function Value({
  children,
  fontSize,
  color,
  weight = 600,
}: {
  children: React.ReactNode
  fontSize: number
  color: string
  weight?: number
}) {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: `${fontSize}px`,
        fontWeight: weight,
        lineHeight: 1,
        color,
        whiteSpace: "nowrap",
        transition: `color 180ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      {children}
    </Typography>
  )
}

/**
 * Wraps a section with a thin tinted divider and an opacity/translate
 * animation tied to `visible`. Collapses to zero footprint when hidden.
 *
 * The divider sits on the side opposite to where the section grows from
 * (so on the leading side when expanding right, trailing side when left).
 */
function CollapsibleSection({
  children,
  visible,
  dividerColor,
  gap,
  side,
}: {
  children: React.ReactNode
  visible: boolean
  dividerColor: string
  gap: number
  side: "left" | "right"
}) {
  const translate = visible
    ? "translateX(0)"
    : side === "left"
      ? "translateX(-8px)"
      : "translateX(8px)"

  const dividerStyles =
    side === "left"
      ? { borderLeft: `1px solid ${dividerColor}`, pl: `${gap}px`, ml: `-${gap}px` }
      : { borderRight: `1px solid ${dividerColor}`, pr: `${gap}px`, mr: `-${gap}px` }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        opacity: visible ? 1 : 0,
        transform: translate,
        pointerEvents: visible ? "auto" : "none",
        // Collapse to zero footprint when hidden so the bar's flex layout
        // doesn't reserve space for content the user can't see.
        flex: visible ? "0 1 auto" : "0 0 0",
        width: visible ? "auto" : 0,
        overflow: "hidden",
        transition: `opacity ${TRANSITION}, transform ${TRANSITION}, width ${TRANSITION}, flex ${TRANSITION}`,
        ...(visible ? dividerStyles : {}),
      }}
    >
      {children}
    </Box>
  )
}

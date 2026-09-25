"use client";

/**
 * Right-column content for the MinimapFullView overlay.
 *
 * Two exported pieces (the overlay arranges them around the
 * `RoleGoalSelector`):
 *
 *  - `MapNextBestActions` — anchored at the TOP of the right column
 *    above the role picker. One `NextBestActionCard` per cardinal
 *    direction with a question icon, page label, and chip taxonomy.
 *
 *  - `MapContextPanel` — sits BELOW the role picker. Three accordions
 *    (Goals / Features / Problems) keyed off the current role + goal
 *    selection from `RoleSelectionProvider`.
 *
 * Visual primitives (card, header row, accordion, list, section)
 * live in `./mapContent/ui/` and are reused here.
 */

import { useMemo, useState } from "react";
import { Box, Chip, Stack, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// Double-chevron glyphs — same family the minimap tiles use so the
// NBA cards visually echo the map navigation affordance.
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";

import { useRoleSelection } from "./state";
import { useMapDirectionFocus } from "./state";
import { useActiveMap } from "./state";
import { getRoleGoalContent } from "./mapContent/roleContent";
import { getLocationContent } from "./mapContent/locationContent";
import { getRealmTileCards, type ActionMode, type RealmTileCard } from "./mapContent/realmActions";
import { CHIP_META } from "./mapContent/chipTaxonomy";
import { getRole, ROLE_ACCENT } from "./mapContent/roles";
import { REALMS, type RealmKey as RealmId } from "@4eye/web/lib/hud/realmRegistry";
import { MAP_SECTION_OPTIONS, type MapSectionId } from "./MapSectionSwitcher";
import { MapAccordion, MapContentList, NextBestActionCard, NextBestActionCardHeader, NextBestActionCardDifficulty, useCardSkin } from "@expanse/hud"

/** Max chips per card — matches storybook `GlassBreathingBase` reference. */
const MAX_CHIPS_PER_CARD = 3;

/**
 * Horizontal gutter (theme spacing units) for every right-panel section.
 * Shared with the overlay's top strip so the section switcher's right edge
 * lines up with the card stack underneath it — import this rather than
 * re-typing `px: 3`.
 */
export const MAP_PANEL_GUTTER = 3;
import type {
  ContentItem,
  Direction,
  DirectionSlot,
  RoleKey,
  SvgIconLike,
} from "./mapContent/types";

type AccordionKey = "goals" | "features" | "problems";

const ACCORDION_HEADERS: Array<{
  key: "features" | "problems";
  label: string;
  Icon: SvgIconLike;
  blurb: string;
}> = [
  { key: "features", label: "Features", Icon: SpaRoundedIcon,         blurb: "Things you'll likely care about." },
  { key: "problems", label: "Problems", Icon: WarningAmberRoundedIcon, blurb: "Pain points 4eye helps with." },
];

const DIRECTION_GLYPHS: Record<Direction, { Icon: SvgIconLike; label: string }> = {
  up:    { Icon: KeyboardDoubleArrowUpRoundedIcon,    label: "Up" },
  down:  { Icon: KeyboardDoubleArrowDownRoundedIcon,  label: "Down" },
  left:  { Icon: KeyboardDoubleArrowLeftRoundedIcon,  label: "Left" },
  right: { Icon: KeyboardDoubleArrowRightRoundedIcon, label: "Right" },
};

/**
 * All direction cards share the same primary-blue accent so the NBA
 * stack reads as a single cohesive group; the spotlight (Why) row is
 * differentiated by a thicker border + Recommended badge, not hue.
 */

const DIRECTION_ORDER: Direction[] = ["up", "left", "right", "down"];

/* ─────────────────────────── Next best actions ─────────────────────── */

interface MapNextBestActionsProps {
  /** Tile id of the current map page; drives per-direction overrides. */
  currentTileId?: string | null;
  onNavigateToTile?: (tileId: string) => void;
  /**
   * Setup ↔ Explore framing, chosen from the section dropdown. Only
   * affects tile-card realms (e.g. App); directional realms ignore it.
   * @default "explore"
   */
  mode?: ActionMode;
}

/**
 * Tooltip on the section header — explains the cards are scoped to the
 * current realm today, and will personalise to live context later.
 */
function nbaTooltip(realmLabel: string) {
  return `Tailored to the ${realmLabel} realm. Soon these will personalise to your current context, goals, and history.`;
}

/** Sub-line shown under the header for each framing. */
const MODE_HINT: Record<ActionMode, string> = {
  setup: "Configure each area",
  explore: "Discover what each area does",
};

/**
 * Top-of-panel section. Realm-aware: realms with headline tile cards
 * (e.g. App) render those in the chosen Setup/Explore framing; other
 * realms (Website / Technical) render the per-direction Why/What/How/Who
 * cards. The Setup/Explore choice comes from the section dropdown.
 */
export function MapNextBestActions({
  currentTileId = null,
  onNavigateToTile,
  mode = "explore",
}: MapNextBestActionsProps) {
  const { activeMap } = useActiveMap<RealmId>();
  const tileCards = getRealmTileCards(activeMap);
  const realmLabel = REALMS[activeMap]?.label ?? "current";

  const { navigation } = getLocationContent(currentTileId);
  const { role, goal } = useRoleSelection<RoleKey>();
  const roleData = getRole(role);

  // Personalised subline: e.g. "Strategist · Launch a product"
  const personalisedLabel = goal
    ? `${roleData.label} · ${goal}`
    : roleData.label;

  // Realm with tile cards (e.g. App) → headline tiles in the chosen framing.
  if (tileCards) {
    return (
      <Box sx={{ px: MAP_PANEL_GUTTER, pb: 1 }}>
        <SectionHeader
          title="Next best actions"
          subtitle={`${realmLabel} · ${MODE_HINT[mode]}`}
          tooltip={nbaTooltip(realmLabel)}
        />
        <Stack spacing={2} sx={{ pt: 0, pb: 2, px: 0.5 }}>
          {tileCards.map((card) => (
            <TileActionCard
              key={card.id}
              card={card}
              mode={mode}
              onNavigate={onNavigateToTile}
            />
          ))}
        </Stack>
      </Box>
    );
  }

  // Other realms (Website / Technical) → directional Why/What/How/Who cards.
  return (
    <Box sx={{ px: MAP_PANEL_GUTTER, pb: 1 }}>
      {/* Section header + personalised context line */}
      <SectionHeader
        title="Next best actions"
        subtitle={personalisedLabel}
        tooltip={nbaTooltip(realmLabel)}
      />
      <Stack spacing={2.5} sx={{ pt: 0, pb: 2, px: 0.5 }}>
        {DIRECTION_ORDER.map((dir) => (
          <DirectionRow
            key={dir}
            direction={dir}
            slot={navigation[dir]}
            onNavigate={onNavigateToTile}
          />
        ))}
      </Stack>
    </Box>
  );
}

/* ─────────────────────────── Tile action card ──────────────────────── */

/**
 * Realm headline-tile card. Renders the tile name, the framing-specific
 * description, and feature chips. Clicking navigates to the tile.
 */
function TileActionCard({
  card,
  mode,
  onNavigate,
}: {
  card: RealmTileCard;
  mode: ActionMode;
  onNavigate?: (tileId: string) => void;
}) {
  const framing = card[mode];
  const Icon = card.Icon;

  return (
    <Box
      component="button"
      onClick={() => onNavigate?.(card.tileId)}
      sx={{
        textAlign: "left",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 1.5,
        borderRadius: 2,
        cursor: "pointer",
        bgcolor: "#ffffff",
        border: "1px solid rgba(15,23,42,0.08)",
        borderLeft: `3px solid ${card.accent}`,
        boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
        font: "inherit",
        transition: "box-shadow 0.15s, border-color 0.15s, transform 0.1s",
        "&:hover": {
          boxShadow: `0 4px 14px ${card.accent}22`,
          borderColor: `${card.accent}55`,
        },
        // It is a real <button>; keyboard users had no way to see where they were.
        "&:focus-visible": {
          outline: `2px solid ${card.accent}`,
          outlineOffset: 2,
        },
        "&:active": { transform: "scale(0.99)" },
      }}
    >
      {/*
        Header: tile icon + name, one line, always.

        This used to carry an optional accent sub-line, but only one of the
        four cards ever set it, so that card's header was two lines tall and
        the titles stopped lining up down the stack. A label that exists on a
        quarter of the set is decoration, not information — the description
        below already says what the area is. Title and icon are now the whole
        header, which makes every card's first row the same height by
        construction rather than by luck.
      */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            flexShrink: 0,
            borderRadius: 1.25,
            bgcolor: `${card.accent}14`,
          }}
        >
          <Icon sx={{ fontSize: 18, color: card.accent }} />
        </Box>
        <Typography
          noWrap
          sx={{
            fontSize: "0.88rem",
            fontWeight: 800,
            color: "#1e293b",
            lineHeight: 1.2,
            minWidth: 0,
          }}
        >
          {card.label}
        </Typography>
      </Box>

      {/* Framing-specific description */}
      <Typography
        sx={{ fontSize: "0.74rem", color: "rgba(15,23,42,0.65)", lineHeight: 1.4 }}
      >
        {framing.description}
      </Typography>

      {/* Feature chips — capped like the direction cards so a longer list
          can't silently make one card taller than its neighbours. */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
        {framing.features.slice(0, MAX_CHIPS_PER_CARD).map((feature) => (
          <Chip
            key={feature}
            size="small"
            label={feature}
            sx={{
              height: 20,
              bgcolor: `${card.accent}10`,
              color: card.accent,
              border: `1px solid ${card.accent}28`,
              "& .MuiChip-label": { fontSize: "0.66rem", fontWeight: 600, px: 0.9 },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

/* ─────────────────────────── Section dispatcher ────────────────────── */

interface MapSectionContentProps {
  /** Which right-panel section to render. */
  section: MapSectionId;
  /** Tile id of the current map page; drives per-direction overrides. */
  currentTileId?: string | null;
  onNavigateToTile?: (tileId: string) => void;
}

/**
 * Renders the right-panel content for the active section chosen via
 * `MapSectionSwitcher`. `explore` / `setup` are the two framings of the
 * Next Best Actions stack; `goals` / `features` / `problems` reuse the
 * role-keyed content; the remaining sections show a styled placeholder
 * until their data sources are wired.
 */
export function MapSectionContent({
  section,
  currentTileId = null,
  onNavigateToTile,
}: MapSectionContentProps) {
  if (section === "explore" || section === "setup") {
    return (
      <MapNextBestActions
        currentTileId={currentTileId}
        onNavigateToTile={onNavigateToTile}
        mode={section}
      />
    );
  }

  if (section === "goals" || section === "features" || section === "problems") {
    return <RoleContentSection section={section} onNavigateToTile={onNavigateToTile} />;
  }

  return <ComingSoonSection section={section} />;
}

/**
 * Role-keyed list section (Goals / Features / Problems). Goals render
 * in selection mode (wired to `setGoal`); Features / Problems render
 * in navigate mode.
 */
function RoleContentSection({
  section,
  onNavigateToTile,
}: {
  section: "goals" | "features" | "problems";
  onNavigateToTile?: (tileId: string) => void;
}) {
  const { role, goal, setGoal } = useRoleSelection<RoleKey>();
  const roleData = getRole(role);
  const roleContent = getRoleGoalContent(role, goal);
  const meta = MAP_SECTION_OPTIONS.find((o) => o.id === section)!;

  const goalItems = useMemo<ContentItem[]>(
    () => roleData.goals.map((g) => ({ id: g, label: g })),
    [roleData.goals],
  );

  const personalisedLabel = goal ? `${roleData.label} · ${goal}` : roleData.label;

  return (
    <Box sx={{ px: MAP_PANEL_GUTTER, pb: 1 }}>
      <SectionHeader title={meta.label} subtitle={personalisedLabel} />
      <Typography
        sx={{
          fontSize: "0.78rem",
          color: "rgba(15,23,42,0.6)",
          lineHeight: 1.4,
          mb: 1.5,
        }}
      >
        {meta.description}
      </Typography>
      {section === "goals" ? (
        <MapContentList
          items={goalItems}
          selectedId={goal}
          onSelect={setGoal}
          selectionAccentColor={ROLE_ACCENT}
        />
      ) : (
        <MapContentList items={roleContent[section]} onNavigate={onNavigateToTile} />
      )}
    </Box>
  );
}

/** Placeholder for sections whose data source is not yet wired. */
function ComingSoonSection({ section }: { section: MapSectionId }) {
  const meta = MAP_SECTION_OPTIONS.find((o) => o.id === section)!;
  return (
    <Box sx={{ px: MAP_PANEL_GUTTER, pb: 1 }}>
      <SectionHeader title={meta.label} subtitle="Coming soon" />
      <Box
        sx={{
          mt: 1,
          py: 4,
          px: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 1,
          borderRadius: 2,
          border: "1px dashed rgba(99,102,241,0.25)",
          bgcolor: "rgba(99,102,241,0.04)",
        }}
      >
        <ConstructionRoundedIcon sx={{ fontSize: 28, color: "#6366f1", opacity: 0.7 }} />
        <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "#334155" }}>
          {meta.label}
        </Typography>
        <Typography sx={{ fontSize: "0.72rem", color: "rgba(15,23,42,0.55)", lineHeight: 1.4 }}>
          {meta.description}
        </Typography>
      </Box>
    </Box>
  );
}

/** Shared right-panel section header (title + uppercase context line). */
function SectionHeader({
  title,
  subtitle,
  tooltip,
}: {
  title: string;
  subtitle?: string;
  tooltip?: string;
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Typography
          sx={{
            color: "text.primary",
            fontSize: "1.15rem",
            fontWeight: 800,
            letterSpacing: 0.3,
          }}
        >
          {title}
        </Typography>
        {tooltip && (
          <Tooltip title={tooltip} arrow placement="top">
            <InfoOutlinedIcon
              sx={{
                fontSize: 15,
                color: "rgba(15,23,42,0.35)",
                cursor: "help",
                "&:hover": { color: "#6366f1" },
              }}
            />
          </Tooltip>
        )}
      </Box>
      {subtitle && (
        <Typography
          sx={{
            fontSize: "0.72rem",
            fontWeight: 600,
            color: "rgba(15,23,42,0.45)",
            letterSpacing: 0.4,
            textTransform: "uppercase",
            mt: 0.25,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

/* ─────────────────────────── Accordion panel ───────────────────────── */

interface MapContextPanelProps {
  /** Tile id of the current map page; reserved for future per-tile overrides. */
  currentTileId?: string | null;
  /** Click handler for actionable accordion items. */
  onNavigateToTile?: (tileId: string) => void;
  /**
   * Whether to render the Goals / Features / Problems accordion sections.
   * Defaults to `false` — sections will move elsewhere in the layout.
   */
  showContextSections?: boolean;
}

export function MapContextPanel({
  currentTileId: _currentTileId = null,
  onNavigateToTile,
  showContextSections = false,
}: MapContextPanelProps) {
  const { role, goal, setGoal } = useRoleSelection<RoleKey>();
  const roleContent = getRoleGoalContent(role, goal);
  const roleData = getRole(role);

  const [expanded, setExpanded] = useState<AccordionKey | false>(false);

  // Map role-specific goal strings → ContentItem[] so the shared
  // selection list can render them.
  const goalItems = useMemo<ContentItem[]>(
    () => roleData.goals.map((g) => ({ id: g, label: g })),
    [roleData.goals],
  );

  // Render nothing at all when the sections are off, so the panel's
  // vertical rhythm doesn't inherit an empty container's padding.
  if (!showContextSections) return null;

  return (
    <Stack spacing={2} sx={{ px: MAP_PANEL_GUTTER, pb: 2, flex: 1, minHeight: 0 }}>
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
        {/* Goals — top accordion. Selectable list of role-specific
            goal options. */}
        <MapAccordion
          icon={FlagRoundedIcon}
          title="Goals"
          blurb={goal ?? "Pick the outcome you're after."}
          count={goal ? "1" : roleData.goals.length}
          countAccentColor={goal ? `${ROLE_ACCENT}33` : undefined}
          expanded={expanded === "goals"}
          onChange={(open) => setExpanded(open ? "goals" : false)}
        >
          <MapContentList
            items={goalItems}
            selectedId={goal}
            onSelect={setGoal}
            selectionAccentColor={ROLE_ACCENT}
          />
        </MapAccordion>

        {ACCORDION_HEADERS.map((section) => {
          const items = roleContent[section.key];
          return (
            <MapAccordion
              key={section.key}
              icon={section.Icon}
              title={section.label}
              blurb={section.blurb}
              count={items.length}
              expanded={expanded === section.key}
              onChange={(open) => setExpanded(open ? section.key : false)}
            >
              <MapContentList items={items} onNavigate={onNavigateToTile} />
            </MapAccordion>
          );
        })}
      </Box>
    </Stack>
  );
}

/* ────────────────────────────── helpers ────────────────────────────── */

function DirectionRow({
  direction,
  slot,
  onNavigate,
}: {
  direction: Direction;
  slot: DirectionSlot;
  onNavigate?: (tileId: string) => void;
}) {
  const Chevron = DIRECTION_GLYPHS[direction].Icon;
  const { selected, recommended, setSelected } = useMapDirectionFocus();
  const isSelected = direction === selected;
  const isRecommended = direction === recommended;
  const skin = useCardSkin();

  // Tap-anywhere to navigate. Selecting follows as a side effect so
  // the focus-aware UI elsewhere stays in sync, but the row click is
  // the navigation affordance — no separate Go button.
  const handleClick = () => {
    setSelected(direction);
    if (slot.tileId && onNavigate) onNavigate(slot.tileId);
  };

  return (
    <NextBestActionCard
      // Every card breathes (R9 baseline); recommended swaps the
      // glow halo to amber so it reads as the primary CTA without
      // adding extra DOM affordances.
      topPickStyle={isRecommended ? "glow-amber" : "none"}
      selected={isSelected}
      onClick={handleClick}
      header={
        <NextBestActionCardHeader
          Chevron={Chevron}
          chevronLabel={DIRECTION_GLYPHS[direction].label}
          question={slot.question}
          pageLabel={slot.pageLabel}
          PageIcon={slot.PageIcon}
          selected={isSelected}
        />
      }
      body={
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
          {/* Recommendation reason — only on the recommended card */}
          {isRecommended && slot.recommendationReason && (
            <Typography
              sx={{
                fontSize: "0.7rem",
                fontWeight: 500,
                color: skin.text.pageLabel,
                opacity: 0.85,
                lineHeight: 1.3,
                fontStyle: "italic",
              }}
            >
              {slot.recommendationReason}
            </Typography>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              flex: 1,
              minWidth: 0,
            }}
          >
            {slot.chipKinds.slice(0, MAX_CHIPS_PER_CARD).map((kind) => {
              const meta = CHIP_META[kind];
              const Icon = meta.Icon;
              return (
                <Chip
                  key={kind}
                  size="small"
                  icon={<Icon sx={{ fontSize: 14 }} />}
                  label={meta.label}
                  sx={{
                    height: 22,
                    bgcolor: skin.chip.bg,
                    color: skin.chip.color,
                    border: skin.chip.border,
                    "& .MuiChip-icon": {
                      color: skin.chip.iconColor,
                      ml: 0.75,
                    },
                    "& .MuiChip-label": {
                      fontSize: "0.7rem",
                      fontWeight: 600,
                    },
                  }}
                />
              );
            })}
          </Box>
          {/* Hearts + time estimate in tooltip (keeps game vibe). */}
          <NextBestActionCardDifficulty
            value={slot.difficulty}
            minutesEstimate={slot.minutesEstimate}
          />
        </Box>
        </Box>
      }
    />
  );
}

export default MapContextPanel;

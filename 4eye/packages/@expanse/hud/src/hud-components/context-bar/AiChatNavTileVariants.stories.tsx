/**
 * AiChat Nav Tile — selection display variants
 *
 * Design exploration for how each entity-kind tile (Targets / Audiences /
 * Locations / Stories / Animations / Scenes) shows what's currently
 * selected in that kind. Today we only render a numeric badge in the
 * top-right corner. These variants explore showing the actual selected
 * entity *symbols* on the tile, paired with a tiered `CountBadge`.
 *
 * The "symbol chip" used in these stories is a mock — visually it is a
 * colored rounded square with a single-letter glyph, mirroring the real
 * `Symbol` component shape. Once a layout is chosen we wire the actual
 * `Symbol` from `@4eye/features` into the nav tile in the mockup app.
 */

import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Box, ButtonBase, Stack, Typography } from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import GroupIcon from "@mui/icons-material/Group"
import PlaceIcon from "@mui/icons-material/Place"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import MovieIcon from "@mui/icons-material/Movie"
import ImageIcon from "@mui/icons-material/Image"
import { CountBadge } from "@expanse/ui"

// =============================================================================
// Mock entity-kind metadata (mirrors @4eye/features ENTITY_KINDS)
// =============================================================================

interface SymbolChipSpec {
  glyph: string
  color: string
  name: string
}

interface KindSpec {
  label: string
  Icon: React.ComponentType<{ sx?: object }>
  color: string
  selected: SymbolChipSpec[]
}

const KINDS: KindSpec[] = [
  {
    label: "Targets",
    Icon: PersonIcon,
    color: "#3b82f6",
    selected: [
      { glyph: "A", color: "#3b82f6", name: "Alex" },
      { glyph: "B", color: "#22c55e", name: "Bea" },
      { glyph: "C", color: "#f59e0b", name: "Cyd" },
    ],
  },
  {
    label: "Audiences",
    Icon: GroupIcon,
    color: "#22c55e",
    selected: [
      { glyph: "F", color: "#22c55e", name: "Friends" },
      { glyph: "T", color: "#a855f7", name: "Team" },
    ],
  },
  {
    label: "Locations",
    Icon: PlaceIcon,
    color: "#ef4444",
    selected: [{ glyph: "O", color: "#ef4444", name: "Office" }],
  },
  {
    label: "Stories",
    Icon: AutoStoriesIcon,
    color: "#f59e0b",
    selected: [],
  },
  {
    label: "Animations",
    Icon: MovieIcon,
    color: "#8b5cf6",
    selected: [
      { glyph: "P", color: "#8b5cf6", name: "Pulse" },
      { glyph: "S", color: "#3b82f6", name: "Spin" },
      { glyph: "F", color: "#22c55e", name: "Fade" },
      { glyph: "B", color: "#f59e0b", name: "Bounce" },
      { glyph: "G", color: "#ec4899", name: "Glow" },
    ],
  },
  {
    label: "Scenes",
    Icon: ImageIcon,
    color: "#ec4899",
    selected: [
      { glyph: "S", color: "#ec4899", name: "Sunset" },
      { glyph: "N", color: "#3b82f6", name: "Night" },
      { glyph: "D", color: "#f59e0b", name: "Dawn" },
      { glyph: "M", color: "#a855f7", name: "Moon" },
      { glyph: "C", color: "#22c55e", name: "Clouds" },
      { glyph: "R", color: "#ef4444", name: "Rain" },
      { glyph: "X", color: "#8b5cf6", name: "Extra" },
    ],
  },
]

// =============================================================================
// SymbolChip — visual stand-in for the real @4eye/features <Symbol /> component
// =============================================================================

function SymbolChip({
  glyph,
  color,
  size = 18,
  variant = "filled",
}: {
  glyph: string
  color: string
  size?: number
  variant?: "filled" | "ghost"
}) {
  return (
    <Box
      title={glyph}
      sx={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 0.75,
        bgcolor: variant === "filled" ? `${color}33` : "transparent",
        border: `1px solid ${color}`,
        color,
        fontSize: size * 0.55,
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {glyph}
    </Box>
  )
}

// =============================================================================
// Tile shell — shared geometry across variants
// =============================================================================

function TileShell({
  children,
  color,
  active,
}: {
  children: React.ReactNode
  color: string
  active?: boolean
}) {
  return (
    <ButtonBase
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
        p: 1,
        minHeight: 84,
        width: 120,
        borderRadius: 1.5,
        position: "relative",
        border: active
          ? `1px solid ${color}`
          : "1px solid rgba(255,255,255,0.06)",
        bgcolor: active ? `${color}18` : "rgba(255,255,255,0.02)",
        transition: "all 120ms ease",
        "&:hover": {
          bgcolor: `${color}10`,
          borderColor: `${color}88`,
        },
      }}
    >
      {children}
    </ButtonBase>
  )
}

// =============================================================================
// Variants
// =============================================================================

/** V1 — Stacked overlap of symbols (avatar-stack), badge top-right. */
function V1_StackedOverlap({ kind }: { kind: KindSpec }) {
  const { Icon, color, label, selected } = kind
  const visible = selected.slice(0, 3)
  return (
    <TileShell color={color}>
      <Icon sx={{ fontSize: 22, color: "rgba(255,255,255,0.85)" }} />
      <Typography variant="caption" sx={{ fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
        {label}
      </Typography>
      {visible.length > 0 && (
        <Box
          sx={{
            display: "inline-flex",
            "& > *": { ml: -0.75 },
            "& > *:first-of-type": { ml: 0 },
          }}
        >
          {visible.map((s, i) => (
            <Box key={i} sx={{ outline: "2px solid rgba(15,15,18,0.85)", borderRadius: 0.75 }}>
              <SymbolChip glyph={s.glyph} color={s.color} size={16} />
            </Box>
          ))}
        </Box>
      )}
      <Box sx={{ position: "absolute", top: 4, right: 4 }}>
        <CountBadge count={selected.length} tier="tiered" accent={color} size="xs" />
      </Box>
    </TileShell>
  )
}

/** V2 — Inline row of symbols under the label, badge top-right. */
function V2_InlineRow({ kind }: { kind: KindSpec }) {
  const { Icon, color, label, selected } = kind
  const visible = selected.slice(0, 4)
  return (
    <TileShell color={color}>
      <Icon sx={{ fontSize: 22, color: "rgba(255,255,255,0.85)" }} />
      <Typography variant="caption" sx={{ fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
        {label}
      </Typography>
      {visible.length > 0 && (
        <Stack direction="row" spacing={0.5}>
          {visible.map((s, i) => (
            <SymbolChip key={i} glyph={s.glyph} color={s.color} size={14} />
          ))}
        </Stack>
      )}
      <Box sx={{ position: "absolute", top: 4, right: 4 }}>
        <CountBadge count={selected.length} tier="tiered" accent={color} size="xs" />
      </Box>
    </TileShell>
  )
}

/** V3 — Selected symbols REPLACE the kind icon when any are selected. */
function V3_ReplaceIcon({ kind }: { kind: KindSpec }) {
  const { Icon, color, label, selected } = kind
  const visible = selected.slice(0, 2)
  const overflow = selected.length - visible.length
  return (
    <TileShell color={color}>
      {selected.length === 0 ? (
        <Icon sx={{ fontSize: 22, color: "rgba(255,255,255,0.85)" }} />
      ) : (
        <Stack direction="row" spacing={0.5} sx={{
          alignItems: "center"
        }}>
          {visible.map((s, i) => (
            <SymbolChip key={i} glyph={s.glyph} color={s.color} size={20} />
          ))}
          {overflow > 0 && (
            <Box
              sx={{
                width: 20,
                height: 20,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 0.75,
                border: `1px solid ${color}`,
                color,
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              +{overflow}
            </Box>
          )}
        </Stack>
      )}
      <Typography variant="caption" sx={{ fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
        {label}
      </Typography>
      <Box sx={{ position: "absolute", top: 4, right: 4 }}>
        <CountBadge count={selected.length} tier="tiered" accent={color} size="xs" />
      </Box>
    </TileShell>
  );
}

/** V4 — Kind icon stays top; cluster of symbols at bottom-left; badge top-right. */
function V4_BottomCluster({ kind }: { kind: KindSpec }) {
  const { Icon, color, label, selected } = kind
  const visible = selected.slice(0, 3)
  const overflow = selected.length - visible.length
  return (
    <TileShell color={color}>
      <Icon sx={{ fontSize: 22, color: "rgba(255,255,255,0.85)" }} />
      <Typography variant="caption" sx={{ fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
        {label}
      </Typography>
      {visible.length > 0 && (
        <Box sx={{ position: "absolute", bottom: 4, left: 4, display: "inline-flex", gap: 0.25 }}>
          {visible.map((s, i) => (
            <SymbolChip key={i} glyph={s.glyph} color={s.color} size={12} />
          ))}
          {overflow > 0 && (
            <Typography
              variant="caption"
              sx={{ color, fontWeight: 700, fontSize: 9, ml: 0.25 }}
            >
              +{overflow}
            </Typography>
          )}
        </Box>
      )}
      <Box sx={{ position: "absolute", top: 4, right: 4 }}>
        <CountBadge count={selected.length} tier="tiered" accent={color} size="xs" />
      </Box>
    </TileShell>
  )
}

/** V5 — Kind icon with one dominant symbol overlay (top-left). */
function V5_DominantOverlay({ kind }: { kind: KindSpec }) {
  const { Icon, color, label, selected } = kind
  const top = selected[0]
  return (
    <TileShell color={color}>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <Icon sx={{ fontSize: 28, color: "rgba(255,255,255,0.85)" }} />
        {top && (
          <Box sx={{ position: "absolute", top: -4, left: -8 }}>
            <SymbolChip glyph={top.glyph} color={top.color} size={16} />
          </Box>
        )}
      </Box>
      <Typography variant="caption" sx={{ fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
        {label}
      </Typography>
      <Box sx={{ position: "absolute", top: 4, right: 4 }}>
        <CountBadge count={selected.length} tier="tiered" accent={color} size="xs" />
      </Box>
    </TileShell>
  )
}

/** V6 — No symbols; CountBadge with color tiers only. */
function V6_BadgeOnly({ kind }: { kind: KindSpec }) {
  const { Icon, color, label, selected } = kind
  return (
    <TileShell color={color}>
      <Icon sx={{ fontSize: 24, color: "rgba(255,255,255,0.85)" }} />
      <Typography variant="caption" sx={{ fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
        {label}
      </Typography>
      <Box sx={{ position: "absolute", top: 4, right: 4 }}>
        <CountBadge count={selected.length} tier="tiered" accent={color} size="sm" />
      </Box>
    </TileShell>
  )
}

// =============================================================================
// Block — one variant rendered across all kinds + selection counts
// =============================================================================

const VARIANTS: Array<{
  id: string
  title: string
  description: string
  render: (k: KindSpec) => React.ReactNode
}> = [
  {
    id: "V1",
    title: "V1 — Stacked overlap (avatar stack)",
    description:
      "Up to 3 symbols overlap like an avatar pile under the label. Badge top-right. Scales gracefully — overflow is implied visually plus shown in the badge.",
    render: (k) => <V1_StackedOverlap kind={k} />,
  },
  {
    id: "V2",
    title: "V2 — Inline row",
    description:
      "Up to 4 symbols in a row under the label. Clear sequence; can get cramped on narrow tiles past 3.",
    render: (k) => <V2_InlineRow kind={k} />,
  },
  {
    id: "V3",
    title: "V3 — Replace the kind icon",
    description:
      "When anything is selected, the kind glyph is replaced by up to 2 actual symbols + '+N' chip. Strongest 'I am these things' identity. Loses the kind glyph as a constant anchor.",
    render: (k) => <V3_ReplaceIcon kind={k} />,
  },
  {
    id: "V4",
    title: "V4 — Bottom-left cluster",
    description:
      "Kind icon stays the headline. Tiny symbol cluster at bottom-left (up to 3) with '+N' overflow text. Badge top-right. Balanced — keeps kind identity and selection.",
    render: (k) => <V4_BottomCluster kind={k} />,
  },
  {
    id: "V5",
    title: "V5 — Single dominant overlay",
    description:
      "Kind icon stays, plus one most-recent / most-relevant symbol overlaid at top-left. Subtle hint of selection; not informative for >1.",
    render: (k) => <V5_DominantOverlay kind={k} />,
  },
  {
    id: "V6",
    title: "V6 — Badge only (tiered color)",
    description:
      "No symbols on the tile. CountBadge does all the work via color tiers. Minimal visual change from today, biggest information drop.",
    render: (k) => <V6_BadgeOnly kind={k} />,
  },
]

function VariantBlock({
  title,
  description,
  render,
}: {
  title: string
  description: string
  render: (k: KindSpec) => React.ReactNode
}) {
  return (
    <Stack spacing={1.5}>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 1,
          p: 1,
          bgcolor: "rgba(15,15,18,0.85)",
          borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.08)",
          maxWidth: 800,
        }}
      >
        {KINDS.map((k) => (
          <Box key={k.label} sx={{ display: "flex", justifyContent: "center" }}>
            {render(k)}
          </Box>
        ))}
      </Box>
    </Stack>
  )
}

// =============================================================================
// Meta + stories
// =============================================================================

const meta: Meta = {
  title:
    "Layout Systems/HUD Components/AiChat/Nav Tile Selection Variants",
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
}
export default meta
type Story = StoryObj

export const AllVariants: Story = {
  render: () => (
    <Stack spacing={4} sx={{ p: 2, maxWidth: 900 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          AiChat nav-tile — selection display options
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
          Each block below renders the same six entity-kind tiles with the
          same selections (0 → 7 items) using a different layout. Tiles
          use a mock `SymbolChip` (colored rounded square with letter)
          standing in for the real `Symbol` component from
          `@4eye/features`. All variants share the new `CountBadge`
          primitive with the `tiered` color strategy.
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
          Selections per tile (left → right): Targets 3 · Audiences 2 ·
          Locations 1 · Stories 0 · Animations 5 · Scenes 7.
        </Typography>
      </Box>

      {VARIANTS.map((v) => (
        <VariantBlock
          key={v.id}
          title={v.title}
          description={v.description}
          render={v.render}
        />
      ))}
    </Stack>
  ),
}

/** Side-by-side comparison at a single selection state per kind, so
 *  layouts can be judged head-to-head for the same data. */
export const SideBySide: Story = {
  render: () => (
    <Stack spacing={2} sx={{ p: 2, maxWidth: 900 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        Side-by-side — Targets (3 selected)
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 1,
          p: 1,
          bgcolor: "rgba(15,15,18,0.85)",
          borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {VARIANTS.map((v) => (
          <Box key={v.id} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
            {v.render(KINDS[0])}
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {v.id}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 2 }}>
        Side-by-side — Animations (5 selected, overflow)
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 1,
          p: 1,
          bgcolor: "rgba(15,15,18,0.85)",
          borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {VARIANTS.map((v) => (
          <Box key={v.id} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
            {v.render(KINDS[4])}
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {v.id}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 2 }}>
        Side-by-side — Stories (0 selected, empty state)
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 1,
          p: 1,
          bgcolor: "rgba(15,15,18,0.85)",
          borderRadius: 2,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {VARIANTS.map((v) => (
          <Box key={v.id} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
            {v.render(KINDS[3])}
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {v.id}
            </Typography>
          </Box>
        ))}
      </Box>
    </Stack>
  ),
}

"use client";

/**
 * Character — Equipment panel.
 *
 * Two views:
 *  · Compact: equipped items as tagged chips (list in slot-group order).
 *  · Library: full browser of all items with slot filter + rarity chips +
 *    equip / unequip affordance. Detail popover shows description, traits,
 *    attribute bonuses, and perk bonuses.
 *
 * Colour follows the lens's two axes (`characterPalette`), which for this panel
 * means: everything in it is *equipped*, so the chrome is the equipped channel's
 * teal — constant, because the channel is constant — and **rarity is
 * achromatic**, carried by the contrast of the label and badge rather than by a
 * hue of its own. A Legendary item is no longer orange. That is deliberate: the
 * old rarity ramp's blue, violet and amber were near-twins of the passive,
 * invoked and reactive channel inks, so gear rarity and perk kind were teaching
 * each other the wrong lesson from opposite ends of the lens.
 *
 * This also retires `RARITY_BG`, which was six hardcoded near-white hexes and
 * painted white-ish blocks behind white-ish text in dark mode. Tints are now
 * derived with `alpha()`, so they follow the mode.
 */

import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

import {
  SLOT_GROUPS,
  SLOT_LABEL,
  type EquipmentItem,
  type EquipmentRarity,
} from "../model/equipment";
import { RARITY_RANK, useChannelInks, useRankInk } from "../theme/characterPalette";
import { useProfileStore } from "../store/CharacterProfileStore";
import { ShowMore, useCapped } from "./shared/ShowMore";

/**
 * Equipped chips shown before "show all".
 *
 * A full loadout is two dozen slots; the panel's job on this lens is "what am I
 * carrying", which the highest-rarity handful answers. The rest is one click
 * away, and the library dialog is there for actually managing gear.
 */
const HEAD_CHIPS = 8;

/* ------------------------------------------------------------ item glyphs */

function PistolShapes() {
  return (
    <>
      <rect x="2" y="10.5" width="12" height="2.4" rx="0.4" opacity="0.9" />
      <rect x="1" y="10.8" width="2" height="1.8" opacity="0.6" />
      <rect x="8" y="8.8" width="6" height="1.8" rx="0.3" opacity="0.75" />
      <path
        d="M12 12.9 H15.5 V14.6 H13.6 V17.2 H16.3 V21 H11.2 V17.6 H9.4 V12.9 Z"
        opacity="0.9"
      />
      <path
        d="M9.6 14.6 a1.6 1.6 0 0 0 -1.6 1.6 v0.6 h1.1 v-0.6 a0.5 0.5 0 0 1 0.5 -0.5 h1 v-1.1 Z"
        opacity="0.6"
      />
      <rect x="14.6" y="7.6" width="1.3" height="1.6" rx="0.3" opacity="0.6" />
    </>
  );
}

function PistolGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <PistolShapes />
    </BrandIcon>
  );
}

function PistolGlyphMirrored(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <g transform="scale(-1,1) translate(-24,0)">
        <PistolShapes />
      </g>
    </BrandIcon>
  );
}

const ITEM_GLYPH: Record<string, React.ComponentType<BrandIconProps>> = {
  "weapon-twinfire-primary": PistolGlyph,
  "weapon-twinfire-secondary": PistolGlyphMirrored,
};

/* ---------------------------------------------------------- rarity badge */

function RarityBadge({ rarity }: { rarity: EquipmentRarity }) {
  const { rank } = useRankInk();
  const c = rank(RARITY_RANK[rarity]);
  return (
    <Typography
      component="span"
      sx={{
        fontSize: "0.58rem",
        fontWeight: 800,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        color: c,
        bgcolor: alpha(c, 0.12),
        px: 0.6,
        py: 0.1,
        borderRadius: 0.75,
      }}
    >
      {rarity}
    </Typography>
  );
}

/* --------------------------------------------------------- item detail */

function ItemDetail({ item, onClose, onToggleEquip }: {
  item: EquipmentItem;
  onClose: () => void;
  onToggleEquip: (id: string) => void;
}) {
  const c = item.color;
  const Glyph = ITEM_GLYPH[item.id];
  return (
    <Box>
      {/* Header */}
      <Stack direction="row" sx={{ alignItems: "flex-start", gap: 1.5, mb: 1.5 }}>
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 2,
            bgcolor: alpha(c, 0.12),
            border: `2px solid ${alpha(c, 0.3)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: "1.5rem",
          }}
        >
          {Glyph ? (
            <Glyph size={28} title={item.name} style={{ color: c }} />
          ) : (
            <CheckroomRoundedIcon sx={{ color: c, fontSize: 28 }} />
          )}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" sx={{ alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
              {item.name}
            </Typography>
            <RarityBadge rarity={item.rarity} />
          </Stack>
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
            {SLOT_LABEL[item.slot]}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
        {item.description}
      </Typography>

      {/* Traits */}
      {(item.traits?.length ?? 0) > 0 && (
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled", mb: 0.5, display: "block" }}>
            TRAITS
          </Typography>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
            {item.traits!.map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  bgcolor: alpha(c, 0.1),
                  color: c,
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Attribute bonuses */}
      {(item.attributeBonuses?.length ?? 0) > 0 && (
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled", mb: 0.5, display: "block" }}>
            ATTRIBUTE BONUSES
          </Typography>
          <Stack spacing={0.5}>
            {item.attributeBonuses!.map((b) => (
              <Stack key={b.attributeId} direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {b.label}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 800, color: "#16a34a" }}>
                  +{b.delta}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      )}

      {/* Perk bonuses */}
      {(item.perkBonuses?.length ?? 0) > 0 && (
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled", mb: 0.5, display: "block" }}>
            PERKS GRANTED
          </Typography>
          <Stack spacing={0.5}>
            {item.perkBonuses!.map((p) => (
              <Box
                key={p.perkId}
                sx={{
                  p: 0.75,
                  borderRadius: 1.5,
                  border: "1px solid",
                  borderColor: alpha(c, 0.25),
                  bgcolor: alpha(c, 0.06),
                }}
              >
                <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", mb: 0.25 }}>
                  <AutoAwesomeRoundedIcon sx={{ fontSize: 12, color: c }} />
                  <Typography variant="caption" sx={{ fontWeight: 800, color: c }}>
                    {p.label}
                  </Typography>
                </Stack>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {p.description}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* Equip / Unequip */}
      <Button
        variant={item.equipped ? "outlined" : "contained"}
        fullWidth
        size="small"
        startIcon={
          item.equipped
            ? <RemoveCircleOutlineRoundedIcon />
            : <AddCircleOutlineRoundedIcon />
        }
        onClick={() => onToggleEquip(item.id)}
        sx={{
          mt: 0.5,
          textTransform: "none",
          fontWeight: 800,
          borderRadius: 2,
          ...(item.equipped
            ? { borderColor: alpha(c, 0.4), color: c }
            : { bgcolor: c, "&:hover": { bgcolor: alpha(c, 0.85) } }),
        }}
      >
        {item.equipped ? "Unequip" : "Equip"}
      </Button>
    </Box>
  );
}

/* ---------------------------------------------------------- item card (library) */

function ItemCard({
  item,
  onSelect,
  onToggleEquip,
}: {
  item: EquipmentItem;
  onSelect: (item: EquipmentItem) => void;
  onToggleEquip: (id: string) => void;
}) {
  const c = item.color;
  // Equipped is a channel, so it is a hue; rarity is a rank, so it is contrast
  // and lives in the badge. The item's own colour stays on its glyph, where it
  // is identity rather than either axis.
  const r = useChannelInks().equipped.ink;
  const Glyph = ITEM_GLYPH[item.id];
  return (
    <Box
      onClick={() => onSelect(item)}
      sx={{
        p: 1.25,
        borderRadius: 2,
        border: "1.5px solid",
        borderColor: item.equipped ? alpha(r, 0.5) : "divider",
        bgcolor: item.equipped ? alpha(r, 0.05) : "background.paper",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 0.75,
        transition: "border-color .15s, background-color .15s",
        "&:hover": {
          borderColor: alpha(r, 0.55),
          bgcolor: alpha(r, 0.06),
        },
        position: "relative",
      }}
    >
      {item.equipped && (
        <Box
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: r,
            boxShadow: `0 0 6px ${alpha(r, 0.7)}`,
          }}
        />
      )}
      <Stack direction="row" sx={{ alignItems: "flex-start", gap: 1 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.5,
            bgcolor: alpha(c, 0.12),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {Glyph ? (
            <Glyph size={20} title={item.name} style={{ color: c }} />
          ) : (
            <CheckroomRoundedIcon sx={{ color: c, fontSize: 20 }} />
          )}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2, display: "block" }}>
            {item.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.62rem" }}>
            {SLOT_LABEL[item.slot]}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <RarityBadge rarity={item.rarity} />
        {(item.attributeBonuses?.length ?? 0) > 0 && (
          <Typography variant="caption" sx={{ color: "#16a34a", fontWeight: 700, fontSize: "0.65rem" }}>
            +{item.attributeBonuses!.reduce((s, b) => s + b.delta, 0)} stats
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

/* -------------------------------------------------------- compact equipped list */

function EquippedList({
  items,
  accent,
  onOpenLibrary,
}: {
  items: EquipmentItem[];
  accent: string;
  onOpenLibrary: () => void;
}) {
  const { rank } = useRankInk();
  const tone = useChannelInks().equipped.ink;

  // Slot-group order, then rarity within it — so the capped head is the gear
  // that actually distinguishes the loadout rather than whatever sorted first.
  const ordered = React.useMemo(() => {
    const bySlot = SLOT_GROUPS.flatMap((group) =>
      items.filter((it) => group.slots.includes(it.slot)),
    );
    return [...bySlot].sort((a, b) => RARITY_RANK[b.rarity] - RARITY_RANK[a.rarity]);
  }, [items]);

  const capped = useCapped(ordered, HEAD_CHIPS);

  return (
    <Box>
      <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: 0.75 }}>
        {capped.items.map((it) => {
          const c = rank(RARITY_RANK[it.rarity]);
          return (
            <Tooltip
              key={it.id}
              title={
                <Box>
                  <Typography sx={{ fontWeight: 800, fontSize: "0.72rem" }}>{it.name}</Typography>
                  <Typography sx={{ fontSize: "0.65rem", opacity: 0.75 }}>{it.description}</Typography>
                </Box>
              }
              arrow
              placement="top"
            >
              <Chip
                label={it.name}
                size="small"
                sx={{
                  height: 24,
                  fontSize: "0.68rem",
                  // Chrome is the channel (all of these are equipped); the
                  // label's ink is the rank, so rarer gear reads heavier
                  // without a second hue entering the panel.
                  fontWeight: RARITY_RANK[it.rarity] >= 3 ? 800 : 600,
                  bgcolor: alpha(tone, 0.08),
                  color: c,
                  border: `1px solid ${alpha(tone, 0.28)}`,
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            </Tooltip>
          );
        })}
      </Stack>
      <ShowMore capped={capped} accent={accent} noun="equipped items" />
      {items.length === 0 && (
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          No equipment equipped. Open the library to equip items.
        </Typography>
      )}
      <Button
        size="small"
        variant="text"
        startIcon={<TuneRoundedIcon sx={{ fontSize: 15 }} />}
        onClick={onOpenLibrary}
        sx={{ mt: 1, textTransform: "none", fontWeight: 700, px: 0 }}
      >
        Open Equipment Library
      </Button>
    </Box>
  );
}

/* -------------------------------------------------------- library panel */

const ALL_SLOTS = ["all", ...SLOT_GROUPS.map((g) => g.label)] as const;

function EquipmentLibrary({
  items,
  onToggleEquip,
}: {
  items: EquipmentItem[];
  onToggleEquip: (id: string) => void;
}) {
  const [slotFilter, setSlotFilter] = React.useState("all");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  // Resolve the live item from props so the detail reflects store updates.
  const selected = selectedId ? items.find((it) => it.id === selectedId) ?? null : null;

  const filtered = slotFilter === "all"
    ? items
    : items.filter((it) => {
        const group = SLOT_GROUPS.find((g) => g.label === slotFilter);
        return group ? group.slots.includes(it.slot) : true;
      });

  return (
    <Box>
      {/* Slot filter tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 1.5, mx: -2 }}>
        <Tabs
          value={slotFilter}
          onChange={(_, v) => setSlotFilter(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2, minHeight: 36, "& .MuiTab-root": { minHeight: 36, py: 0, fontSize: "0.72rem", fontWeight: 700 } }}
        >
          {ALL_SLOTS.map((s) => (
            <Tab key={s} label={s === "all" ? "All" : s} value={s} />
          ))}
        </Tabs>
      </Box>

      {selected ? (
        <ItemDetail
          item={selected}
          onClose={() => setSelectedId(null)}
          onToggleEquip={onToggleEquip}
        />
      ) : (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 1 }}>
          {filtered.map((it) => (
            <ItemCard
              key={it.id}
              item={it}
              onSelect={(item) => setSelectedId(item.id)}
              onToggleEquip={onToggleEquip}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

/* ------------------------------------------------------------ main export */

export function EquipmentPanel({ accent = "#35c99b" }: { accent?: string } = {}) {
  const { state, dispatch } = useProfileStore();
  const [libraryOpen, setLibraryOpen] = React.useState(false);

  // Equipped items live in the store so gear bonuses flow into the effective
  // attribute calculation; this panel dispatches rather than holding a copy.
  const items = state.equippedItems;
  const equipped = items.filter((it) => it.equipped);

  const toggleEquip = React.useCallback(
    (id: string) => {
      const item = items.find((it) => it.id === id);
      if (!item) return;
      dispatch({ type: item.equipped ? "unequip-item" : "equip-item", itemId: id });
    },
    [items, dispatch],
  );

  return (
    <>
      <EquippedList items={equipped} accent={accent} onOpenLibrary={() => setLibraryOpen(true)} />

      {/* Library dialog */}
      <Dialog
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        maxWidth="tablet"
        fullWidth
        scroll="paper"
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, pb: 0 }}>
          <CheckroomRoundedIcon sx={{ color: "primary.main" }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 800, flex: 1 }}>
            Equipment Library
          </Typography>
          <IconButton size="small" onClick={() => setLibraryOpen(false)}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <EquipmentLibrary items={items} onToggleEquip={toggleEquip} />
        </DialogContent>
      </Dialog>
    </>
  );
}

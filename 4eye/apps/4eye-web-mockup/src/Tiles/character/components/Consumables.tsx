"use client";

/**
 * Character — Consumables panel.
 *
 * Inventory of consumable boosts (Willpower, Discipline, Focus, Recovery).
 * Each consumable has a duration tier (1hr / 4hr / 12hr), quantity, and effects.
 * Clicking "Use" applies the effect (visual only, UI-first).
 */

import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { BrandIcon, type BrandIconProps } from "@4eye/icons";

import {
  CONSUMABLES,
  DURATION_LABEL,
  KIND_COLOR,
  type ConsumableMeta,
  type ConsumableTier,
  type ConsumableKind,
} from "../model/consumables";
import { useProfileStore } from "../store/CharacterProfileStore";

/* ----------------------------------------------------------------- glyphs */

function WillpowerGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 2 L14.5 8 L21 8.5 L16 13 L17.5 20 L12 16.5 L6.5 20 L8 13 L3 8.5 L9.5 8 Z" opacity="0.12" />
      <path d="M12 4 L20 12 L16 12 L16 22 L8 22 L8 12 L4 12 Z" opacity="0.9" />
    </BrandIcon>
  );
}

function DisciplineGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <rect x="3" y="10.5" width="18" height="3" rx="1.5" opacity="0.9" />
      <rect x="6" y="6" width="12" height="2.5" rx="1.25" opacity="0.65" />
      <rect x="6" y="15.5" width="12" height="2.5" rx="1.25" opacity="0.65" />
      <rect x="9.5" y="2" width="5" height="2" rx="1" opacity="0.4" />
      <rect x="9.5" y="20" width="5" height="2" rx="1" opacity="0.4" />
    </BrandIcon>
  );
}

function FocusGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.45" />
      <circle cx="12" cy="12" r="3.5" opacity="0.9" />
      <circle cx="12" cy="12" r="1.2" fill="#fff" opacity="0.5" />
    </BrandIcon>
  );
}

function RecoveryGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M4 12 A8 8 0 0 1 20 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
      <path d="M20 12 L18 9.5 M20 12 L17.5 14.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <path d="M20 12 A8 8 0 0 1 4 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.35" />
      <circle cx="12" cy="12" r="2.5" opacity="0.85" />
    </BrandIcon>
  );
}

function WaterGlyph(p: BrandIconProps) {
  return (
    <BrandIcon {...p}>
      <path d="M12 3.2 C12 3.2 6.4 10.4 6.4 14.4 C6.4 17.6 9 20.2 12 20.2 C15 20.2 17.6 17.6 17.6 14.4 C17.6 10.4 12 3.2 12 3.2 Z" opacity="0.92" />
      <path d="M10.2 14.6 C10.4 16.4 11.2 17.4 12.6 17.8" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
    </BrandIcon>
  );
}

const KIND_GLYPH: Record<ConsumableKind, React.ComponentType<BrandIconProps>> = {
  willpower: WillpowerGlyph,
  discipline: DisciplineGlyph,
  focus: FocusGlyph,
  clarity: FocusGlyph,
  energy: WillpowerGlyph,
  recovery: RecoveryGlyph,
  water: WaterGlyph,
};

/* ---------------------------------------------------------- duration badge */

function DurationBadge({ tier, color }: { tier: ConsumableTier; color: string }) {
  const bg: Record<ConsumableTier, string> = {
    micro: alpha("#64748b", 0.1),
    standard: alpha(color, 0.12),
    surge: alpha(color, 0.2),
  };
  return (
    <Typography
      component="span"
      sx={{
        fontSize: "0.58rem",
        fontWeight: 800,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        color,
        bgcolor: bg[tier],
        px: 0.6,
        py: 0.1,
        borderRadius: 0.75,
      }}
    >
      {DURATION_LABEL[tier]}
    </Typography>
  );
}

/* --------------------------------------------------------- unlock chain */

const labelOf = (id: string) => CONSUMABLES.find((c) => c.id === id)?.label ?? id;

/**
 * The unlock relationship, stated on both ends. Recovery is the case this
 * exists for: the micro version is not a lesser substitute for the major one,
 * it is how you get it, and the card should say that rather than leaving the
 * major one looking arbitrarily empty.
 */
function UnlockLine({ item }: { item: ConsumableMeta }) {
  const unlocks = item.unlocks?.length ? item.unlocks.map(labelOf).join(", ") : null;
  const from = item.unlockedBy ? labelOf(item.unlockedBy) : null;
  if (!unlocks && !from) return null;

  return (
    <Stack direction="row" sx={{ alignItems: "center", gap: 0.4 }}>
      <AutoAwesomeRoundedIcon sx={{ fontSize: 11, color: alpha(item.color, 0.8) }} />
      <Typography sx={{ fontSize: "0.6rem", fontWeight: 700, color: "text.secondary" }}>
        {unlocks ? `Unlocks ${unlocks}` : `Unlocked by ${from}`}
      </Typography>
    </Stack>
  );
}

/* ------------------------------------------------------- consumable detail */

function ConsumableDetail({ item, onClose, onUse, qty }: {
  item: ConsumableMeta;
  onClose: () => void;
  onUse: (id: string) => void;
  qty: number;
}) {
  const c = item.color;
  const Glyph = KIND_GLYPH[item.kind];

  return (
    <Dialog open onClose={onClose} maxWidth="mobileL" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 0 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: alpha(c, 0.12),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: c,
            flexShrink: 0,
          }}
        >
          <Glyph size={26} title={item.label} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{item.label}</Typography>
          <DurationBadge tier={item.tier} color={c} />
        </Box>
        <IconButton size="small" onClick={onClose}><CloseRoundedIcon fontSize="small" /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, mb: 1 }}>
          {item.description}
        </Typography>
        {item.lore && (
          <Typography
            variant="caption"
            sx={{ color: "text.disabled", fontStyle: "italic", display: "block", mb: 1.5 }}
          >
            "{item.lore}"
          </Typography>
        )}
        <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled", display: "block", mb: 0.75 }}>
          EFFECTS · {DURATION_LABEL[item.tier]}
        </Typography>
        <Stack spacing={0.5} sx={{ mb: 1.5 }}>
          {item.effects.map((e) => (
            <Stack key={e.attributeId} direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>{e.label}</Typography>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#16a34a" }}>+{e.delta}</Typography>
            </Stack>
          ))}
        </Stack>
        <Box sx={{ mb: 1.5 }}>
          <UnlockLine item={item} />
        </Box>
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Quantity: {qty}
          </Typography>
          <Button
            variant="contained"
            size="small"
            disabled={qty === 0}
            onClick={() => { onUse(item.id); onClose(); }}
            startIcon={<FlashOnRoundedIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 800,
              borderRadius: 2,
              bgcolor: c,
              "&:hover": { bgcolor: alpha(c, 0.85) },
            }}
          >
            Use · {DURATION_LABEL[item.tier]}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------- consumable card */

function ConsumableCard({ item, qty, onClick }: { item: ConsumableMeta; qty: number; onClick: () => void }) {
  const c = item.color;
  const Glyph = KIND_GLYPH[item.kind];
  const empty = qty === 0;

  return (
    <Tooltip title={item.description} arrow placement="top">
      <Stack
        onClick={onClick}
        sx={{
          p: 1.1,
          borderRadius: 2.5,
          bgcolor: "#fff",
          gap: 0.75,
          cursor: "pointer",
          background: empty
            ? `linear-gradient(180deg, ${alpha("#94a3b8", 0.06)}, #fff)`
            : `radial-gradient(130% 120% at 0% 0%, ${alpha(c, 0.14)} 0%, ${alpha(c, 0.04)} 42%, #fff 100%)`,
          boxShadow: empty
            ? `0 1px 3px ${alpha("#000", 0.06)}`
            : `0 0 0 1px ${alpha(c, 0.2)}, 0 4px 12px -4px ${alpha(c, 0.3)}`,
          opacity: empty ? 0.65 : 1,
          transition: "box-shadow .2s",
          "&:hover": { boxShadow: empty ? undefined : `0 0 0 1.5px ${alpha(c, 0.4)}, 0 6px 16px -4px ${alpha(c, 0.4)}` },
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              bgcolor: alpha(c, 0.14),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: c,
              flexShrink: 0,
            }}
          >
            <Glyph size={20} title={item.label} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "text.primary", display: "block", lineHeight: 1.2 }}>
              {item.label}
            </Typography>
            <DurationBadge tier={item.tier} color={c} />
          </Box>
          <Box sx={{ textAlign: "right", flexShrink: 0 }}>
            <Typography sx={{ fontWeight: 900, fontSize: "1rem", color: c, lineHeight: 1 }}>
              {qty}
            </Typography>
            <Typography sx={{ fontSize: "0.58rem", color: "text.disabled" }}>qty</Typography>
          </Box>
        </Stack>

        {/* Effect summary */}
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.4 }}>
          {item.effects.slice(0, 3).map((e) => (
            <Typography key={e.attributeId} sx={{ fontSize: "0.62rem", fontWeight: 700, color: "#16a34a" }}>
              +{e.delta} {e.label}
            </Typography>
          ))}
        </Stack>

        <UnlockLine item={item} />
      </Stack>
    </Tooltip>
  );
}

/* --------------------------------------------------------------- grouped */

export function ConsumablesPanel() {
  const { state, dispatch } = useProfileStore();
  const [detail, setDetail] = React.useState<ConsumableMeta | null>(null);

  const use = (id: string) => dispatch({ type: "use-consumable", consumableId: id });

  const kinds: ConsumableKind[] = ["willpower", "discipline", "focus", "recovery", "water"];
  const kindLabel: Record<ConsumableKind, string> = {
    willpower: "Willpower",
    discipline: "Discipline",
    focus: "Focus",
    clarity: "Clarity",
    energy: "Energy",
    recovery: "Recovery",
    water: "Water",
  };

  return (
    <>
      <Stack spacing={1.5}>
        {kinds.map((kind) => {
          const group = CONSUMABLES.filter((it) => it.kind === kind);
          if (group.length === 0) return null;
          return (
            <Box key={kind}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 700, color: "text.disabled", letterSpacing: 0.4, display: "block", mb: 0.75 }}
              >
                {kindLabel[kind].toUpperCase()}
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(196px, 1fr))", gap: 0.75 }}>
                {group.map((it) => {
                  const qty = state.consumableQty[it.id] ?? it.quantity;
                  return (
                    <ConsumableCard key={it.id} item={it} qty={qty} onClick={() => setDetail(it)} />
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Stack>

      {detail && (
        <ConsumableDetail
          item={detail}
          qty={state.consumableQty[detail.id] ?? detail.quantity}
          onClose={() => setDetail(null)}
          onUse={use}
        />
      )}
    </>
  );
}

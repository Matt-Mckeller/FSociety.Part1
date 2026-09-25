"use client";

import { Box, Button, ButtonBase, Stack, Tooltip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

import {
  SLOT_POSITION_XY,
  SLOT_TYPE_META,
  type PipelineCharacter,
  type PipelineSlot,
} from "./data";
import { SlotDisc } from "./SlotDisc";

/**
 * EquipSlots — typed sockets for the active layer. Each pip is a named body
 * position with a slot-type shape (filter diamond, craft hex, …). Empty
 * sockets stay dashed with a plus; filled ones glow. Click a pip to equip,
 * swap, or unequip — never a one-way remove.
 */
export function EquipSlots({
  slots,
  equippedBySlot,
  extraEmpty = 0,
  onPurchase,
  onSlotClick,
}: {
  slots: PipelineSlot[];
  equippedBySlot: Record<string, PipelineCharacter | undefined>;
  extraEmpty?: number;
  onPurchase: () => void;
  onSlotClick?: (slotId: string, anchor: HTMLElement) => void;
}) {
  const filled = slots.filter((s) => equippedBySlot[s.id]).length;
  const capacity = slots.length + extraEmpty;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.5,
        px: 1.75,
        py: 1.25,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1.5, minWidth: 0, flexWrap: "wrap" }}>
        <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary", letterSpacing: 0.4 }}>
          PIPELINE SLOTS
        </Typography>
        <Stack sx={{ flexDirection: "row", gap: 0.75, alignItems: "center", flexWrap: "wrap" }}>
          {slots.map((slot) => {
            const pipeline = equippedBySlot[slot.id];
            const typeMeta = SLOT_TYPE_META[slot.type];
            const site = SLOT_POSITION_XY[slot.position];
            const color = pipeline?.color ?? "#64748b";
            const title = pipeline
              ? `${pipeline.name} · ${slot.label} — click to change or unequip`
              : `Empty ${typeMeta.label} · ${site.label} — click to equip`;
            const Icon = pipeline?.Icon;
            return (
              <Tooltip key={slot.id} title={title} arrow>
                <ButtonBase
                  aria-label={title}
                  onClick={(e) => onSlotClick?.(slot.id, e.currentTarget)}
                  sx={{
                    borderRadius: "50%",
                    "&:hover .pipeline-slot-disc": { transform: "scale(1.08)" },
                    "&:focus-visible": { outline: `2px solid ${color}`, outlineOffset: 3 },
                  }}
                >
                  <Box className="pipeline-slot-disc" sx={{ transition: "transform .15s" }}>
                    <SlotDisc shape={typeMeta.shape} color={color} empty={!pipeline} size={28}>
                      {Icon ? <Icon sx={{ fontSize: 14 }} /> : <AddRoundedIcon sx={{ fontSize: 14 }} />}
                    </SlotDisc>
                  </Box>
                </ButtonBase>
              </Tooltip>
            );
          })}
          {Array.from({ length: extraEmpty }).map((_, i) => (
            <Tooltip key={`extra-${i}`} title="Purchased slot — unplaced" arrow>
              <Box
                component={motion.div}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <SlotDisc shape="circle" color="#64748b" empty size={28}>
                  <AddRoundedIcon sx={{ fontSize: 13 }} />
                </SlotDisc>
              </Box>
            </Tooltip>
          ))}
        </Stack>
        <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
          {filled} / {capacity}
        </Typography>
      </Stack>

      <Button
        size="small"
        variant="outlined"
        startIcon={<AddShoppingCartRoundedIcon sx={{ fontSize: 16 }} />}
        onClick={onPurchase}
        sx={{ textTransform: "none", fontWeight: 700, flexShrink: 0 }}
      >
        Purchase slot
      </Button>
    </Box>
  );
}

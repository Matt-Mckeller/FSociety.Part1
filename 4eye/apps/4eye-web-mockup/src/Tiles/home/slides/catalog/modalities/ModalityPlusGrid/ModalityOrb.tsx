"use client";

import { ActionOrb, hexToRgba } from "@expanse/hud"
import { useModalityDef } from "../ModalityContext";
import { ModalityKey, ModalityTier } from "../types";

const ORB_SIZE_BY_TIER = {
  [ModalityTier.Plus]:  "md",
  [ModalityTier.Chip]:  "xs",
  [ModalityTier.Micro]: "xs",
} as const;

export interface ModalityOrbProps {
  modalityKey: ModalityKey;
}

/** Renders a single modality as an {@link ActionOrb}, sized by its tier. */
export function ModalityOrb({ modalityKey }: ModalityOrbProps) {
  const def = useModalityDef(modalityKey);
  const isMicro = def.tier === ModalityTier.Micro;
  const isPlus = def.tier === ModalityTier.Plus;
  const microSx = isMicro
    ? {
        bgcolor: hexToRgba(def.color, 0.12),
        "&:hover:not(:disabled)": { bgcolor: hexToRgba(def.color, 0.18) },
      }
    : isPlus
    ? {
        bgcolor: hexToRgba(def.color, 0.35),
        "&:hover:not(:disabled)": { bgcolor: hexToRgba(def.color, 0.47) },
      }
    : undefined;
  return (
    <ActionOrb
      icon={def.icon}
      label={def.label}
      color={def.color}
      size={ORB_SIZE_BY_TIER[def.tier]}
      variant={isMicro ? "glass" : "glow"}
      showInlineLabel={!isMicro}
      labelPosition="right"
      positionMode="fixed"
      sx={microSx}
    />
  );
}

"use client";

/**
 * PipelinesTile — Technical realm surface that teaches the pipeline concept by
 * grounding it in the 4eye character's body.
 *
 * Three layers share the same seated figure:
 *   - Foundational (default) — protection, input, review on the spine
 *   - Content creation — spark at the visor, craft in the hands, publish at the throat
 *   - Daily life — pulse at the heart, cadence at the solar, hearth at the ground
 *
 * Sockets are typed (filter, channel, core, spark, craft, broadcast, pulse,
 * cadence, anchor) and sit at named body positions. Equip loadout is per
 * user profile.
 */

import * as React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { TileContainer } from "@expanse/hud";

import { useProfilesOptional } from "@4eye/web/Tiles/profiles/store/ProfileProvider";

import {
  PIPELINE_LAYERS,
  PIPELINES,
  SLOT_TYPE_META,
  equippedOnLayer,
  pipelineById,
  pipelinesForLayer,
  slotsForLayer,
  type PipelineLayerId,
} from "./pipelines/data";
import { SeatedFourEye, type BodyNode } from "./pipelines/SeatedFourEye";
import { PipelineCard } from "./pipelines/PipelineCard";
import { EquipSlots } from "./pipelines/EquipSlots";
import { LayerTabs } from "./pipelines/LayerTabs";
import { PipelinePickerMenu } from "./pipelines/PipelinePickerMenu";
import { setPipelineProfile, usePipelineLoadout } from "./pipelines/loadout";

const LIT_DELAY = 0.35;

const cardsContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.22, delayChildren: LIT_DELAY },
  },
};

export function PipelinesTile() {
  const profileId = useProfilesOptional()?.profile.id;
  const loadout = usePipelineLoadout(profileId);
  const [layer, setLayer] = React.useState<PipelineLayerId>("foundational");
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [picker, setPicker] = React.useState<{ slotId: string; anchor: HTMLElement } | null>(null);

  React.useEffect(() => {
    if (profileId) setPipelineProfile(profileId);
  }, [profileId]);

  React.useEffect(() => {
    setPicker(null);
  }, [layer]);

  const layerMeta = PIPELINE_LAYERS.find((l) => l.id === layer)!;
  const slots = slotsForLayer(layer);
  const catalog = pipelinesForLayer(layer);
  const equipped = equippedOnLayer(loadout.fill, layer);
  const extraEmpty = loadout.extraSlotsFor(layer);

  const equippedBySlot = React.useMemo(() => {
    const map: Record<string, ReturnType<typeof pipelineById>> = {};
    for (const slot of slots) map[slot.id] = pipelineById(loadout.fill[slot.id]);
    return map;
  }, [slots, loadout.fill]);

  const pickerSlot = picker ? slots.find((s) => s.id === picker.slotId) : undefined;

  const openSlot = React.useCallback((slotId: string, anchor: HTMLElement) => {
    setPicker({ slotId, anchor });
  }, []);

  const spineNodes: BodyNode[] = slots.map((slot) => {
    const pipeline = equippedBySlot[slot.id];
    return {
      id: pipeline?.id ?? slot.id,
      slotId: slot.id,
      color: pipeline?.color ?? layerMeta.color,
      Icon: pipeline?.Icon,
      label: pipeline?.name ?? slot.label,
      position: slot.position,
      shape: SLOT_TYPE_META[slot.type].shape,
      empty: !pipeline,
    };
  });

  return (
    <TileContainer mode="fit">
      <Box sx={{ width: "100%", height: "100%", overflowY: "auto", p: 3, color: "text.primary" }}>
        <Typography
          variant="overline"
          sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 1, display: "block" }}
        >
          Technical · Pipelines
        </Typography>
        <Divider sx={{ my: 1.5 }} />
        <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 500, letterSpacing: 0.3 }}>
          Pipelines live in 4eye&apos;s body. Foundational flow sits in the spine; content creation and daily
          life take the visor, hands, heart, and ground. Switch a layer to see its sockets.
        </Typography>

        <Box sx={{ mt: 2 }}>
          <LayerTabs value={layer} onChange={setLayer} />
        </Box>

        <Box sx={{ mt: 2 }}>
          <EquipSlots
            slots={slots}
            equippedBySlot={equippedBySlot}
            extraEmpty={extraEmpty}
            onPurchase={() => loadout.purchase(layer)}
            onSlotClick={openSlot}
          />
        </Box>

        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <SeatedFourEye
            nodes={spineNodes}
            activeId={activeId}
            onHoverNode={setActiveId}
            onNodeClick={openSlot}
            litDelay={LIT_DELAY}
          />
          <Typography
            variant="caption"
            sx={{ color: "text.disabled", textAlign: "center", mt: 0.5, fontWeight: 600, letterSpacing: 0.3 }}
          >
            {equipped.length} of {slots.length} {layerMeta.label.toLowerCase()} sockets filled — hover a node to
            focus its flow
          </Typography>
        </Box>

        <Box
          component={motion.div}
          key={layer}
          variants={cardsContainerVariants}
          initial="hidden"
          animate="visible"
          sx={{ mt: 2.5, maxWidth: 560, mx: "auto" }}
        >
          <Stack spacing={2.5}>
            {catalog.map((pipeline) => {
              const equippedHere = equipped.some((p) => p.id === pipeline.id);
              return (
                <Box key={pipeline.id} sx={{ opacity: equippedHere ? 1 : 0.78, transition: "opacity .2s" }}>
                  <PipelineCard
                    pipeline={pipeline}
                    equipped={equippedHere}
                    dimmed={activeId != null && activeId !== pipeline.id}
                    onHover={setActiveId}
                    onToggleEquip={() => loadout.toggle(pipeline.id, layer)}
                  />
                </Box>
              );
            })}
          </Stack>
          <Typography
            variant="caption"
            sx={{ color: "text.disabled", display: "block", textAlign: "center", mt: 1.5 }}
          >
            Equip from a card, or click an empty socket to pick a matching {layerMeta.label.toLowerCase()} pipeline
          </Typography>
        </Box>

        <PipelinePickerMenu
          anchorEl={picker?.anchor ?? null}
          onClose={() => setPicker(null)}
          fill={loadout.fill}
          slot={pickerSlot}
          pipelines={PIPELINES}
          onSelect={(pipelineId) => {
            if (!picker) return;
            if (loadout.fill[picker.slotId] === pipelineId) loadout.unequip(picker.slotId);
            else loadout.equip(picker.slotId, pipelineId);
          }}
          onClear={() => {
            if (picker) loadout.unequip(picker.slotId);
          }}
        />
      </Box>
    </TileContainer>
  );
}

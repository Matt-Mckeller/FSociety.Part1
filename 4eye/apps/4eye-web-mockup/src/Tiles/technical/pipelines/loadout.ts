"use client";

import { useSyncExternalStore } from "react";

import {
  DEFAULT_PIPELINE_FILL,
  PIPELINE_FILL_BY_PROFILE,
  PIPELINE_SLOTS,
  PIPELINES,
  fillForProfile,
  type PipelineFill,
  type PipelineLayerId,
} from "./data";

type Snapshot = {
  activeProfileId: string;
  byProfile: Record<string, PipelineFill>;
  extraSlots: Record<string, number>;
};

function cloneFill(fill: PipelineFill): PipelineFill {
  return { ...fill };
}

function initialByProfile(): Record<string, PipelineFill> {
  const out: Record<string, PipelineFill> = {};
  for (const [id, fill] of Object.entries(PIPELINE_FILL_BY_PROFILE)) {
    out[id] = cloneFill(fill);
  }
  out.PROFILE_MATTHEW = cloneFill(DEFAULT_PIPELINE_FILL);
  return out;
}

let snapshot: Snapshot = {
  activeProfileId: "PROFILE_MATTHEW",
  byProfile: initialByProfile(),
  extraSlots: {},
};

const listeners = new Set<() => void>();

function emit() {
  snapshot = { ...snapshot, byProfile: { ...snapshot.byProfile } };
  for (const l of listeners) l();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

function ensureFill(profileId: string): PipelineFill {
  const existing = snapshot.byProfile[profileId];
  if (existing) return existing;
  const created = fillForProfile(profileId);
  snapshot.byProfile[profileId] = created;
  return created;
}

export function setPipelineProfile(profileId: string) {
  if (snapshot.activeProfileId === profileId) {
    ensureFill(profileId);
    return;
  }
  ensureFill(profileId);
  snapshot = { ...snapshot, activeProfileId: profileId };
  emit();
}

export function equipPipeline(slotId: string, pipelineId: string | null, profileId?: string) {
  const id = profileId ?? snapshot.activeProfileId;
  const fill = { ...ensureFill(id) };
  if (pipelineId) {
    for (const [k, v] of Object.entries(fill)) {
      if (v === pipelineId) fill[k] = null;
    }
  }
  fill[slotId] = pipelineId;
  snapshot.byProfile[id] = fill;
  emit();
}

export function unequipPipeline(slotId: string, profileId?: string) {
  equipPipeline(slotId, null, profileId);
}

/**
 * Drop a pipeline into the first matching empty slot on its layer, or its
 * default slot. Toggles off if it is already equipped.
 */
export function togglePipeline(pipelineId: string, layer: PipelineLayerId, profileId?: string) {
  const id = profileId ?? snapshot.activeProfileId;
  const fill = { ...ensureFill(id) };
  const occupying = PIPELINE_SLOTS.find((s) => fill[s.id] === pipelineId);
  if (occupying) {
    fill[occupying.id] = null;
    snapshot.byProfile[id] = fill;
    emit();
    return;
  }
  const pipeline = PIPELINES.find((p) => p.id === pipelineId);
  if (!pipeline) return;
  const home = PIPELINE_SLOTS.find((s) => s.id === pipeline.defaultSlotId);
  const typed = PIPELINE_SLOTS.filter((s) => s.layer === layer && s.type === pipeline.slotType);
  const target =
    (home && !fill[home.id] ? home : undefined) ??
    typed.find((s) => !fill[s.id]) ??
    home;
  if (!target) return;
  fill[target.id] = pipelineId;
  snapshot.byProfile[id] = fill;
  emit();
}

export function purchaseLayerSlot(layer: PipelineLayerId, profileId?: string) {
  const id = `${profileId ?? snapshot.activeProfileId}:${layer}`;
  snapshot.extraSlots = { ...snapshot.extraSlots, [id]: (snapshot.extraSlots[id] ?? 0) + 1 };
  emit();
}

export function usePipelineLoadout(profileId?: string) {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const id = profileId ?? snap.activeProfileId;
  const fill = snap.byProfile[id] ?? fillForProfile(id);
  return {
    profileId: id,
    fill,
    extraSlotsFor: (layer: PipelineLayerId) => snap.extraSlots[`${id}:${layer}`] ?? 0,
    setProfile: setPipelineProfile,
    equip: (slotId: string, pipelineId: string | null) => equipPipeline(slotId, pipelineId, id),
    unequip: (slotId: string) => unequipPipeline(slotId, id),
    toggle: (pipelineId: string, layer: PipelineLayerId) => togglePipeline(pipelineId, layer, id),
    purchase: (layer: PipelineLayerId) => purchaseLayerSlot(layer, id),
  };
}

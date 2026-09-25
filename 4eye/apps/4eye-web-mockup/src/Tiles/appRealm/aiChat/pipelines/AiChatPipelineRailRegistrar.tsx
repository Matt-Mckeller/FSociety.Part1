"use client";

import { useMemo } from "react";
import { useRegisterLeftRailItem } from "@expanse/hud"
import { useContextData } from "@4eye/features";
import { PipelineLayerRail } from "./PipelineLayerRail";

/**
 * AiChatPipelineRailRegistrar — mounts `PipelineLayerRail` into the
 * HUD left rail (below the Spellbook) for the lifetime of
 * the AI Chat page. Renders nothing in the local DOM — the rail
 * appears at the registered HUD slot.
 *
 * The registered `node` is rendered *outside* the AI Chat provider
 * tree, so we capture every piece of state via hooks here (inside the
 * provider tree) and pass it down via props to the presentational
 * `PipelineLayerRail`.
 *
 * `order: 12` → below the Spellbook rail (`order: 10`) and the
 * built-in game cluster.
 */
export function AiChatPipelineRailRegistrar() {
  const { pipelines, selectedContext, toggleSelect, reorderSelected } =
    useContextData();
  const activeIds = selectedContext.pipelines;

  const node = useMemo(
    () => (
      <PipelineLayerRail
        pipelines={pipelines}
        activeIds={activeIds}
        onToggle={(id) => toggleSelect("pipelines", id)}
        onReorder={(ids) => reorderSelected("pipelines", ids)}
      />
    ),
    [pipelines, activeIds, toggleSelect, reorderSelected],
  );

  useRegisterLeftRailItem({
    id: "ai-chat-pipeline-rail",
    order: 12,
    node,
    label: "AI Chat — Pipeline Layer Rail",
  });
  return null;
}


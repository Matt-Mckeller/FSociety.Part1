"use client";

/**
 * EmotionInspectOverlay — HUD-shell Emotion.Inspect screen.
 *
 * Mounted once in HudShell beside FullScreenMapView / SceneStudioOverlay.
 * Uses InspectorModal (Inspect = action, Inspector = surface). Open state
 * lives in HudState so Map and Inspect never stack.
 */

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import {
  useCloseEmotionInspect,
  useHudDispatchOptional,
  useHudState,
} from "@4eye/web/components/hud/state";
import { InspectorModal } from "@4eye/web/components/hud/InspectorModal";
import { useCloseSceneStudio } from "@4eye/web/Tiles/scene-studio/context/SceneStudioContext";
import { EmotionInspectBody } from "@4eye/web/Tiles/character/components/EmotionInspectBody";
import { emotionMeta } from "@4eye/web/Tiles/character/model/emotions";
import * as React from "react";

export function EmotionInspectOverlay() {
  const { isEmotionInspectOpen, emotionInspectId } = useHudState();
  const close = useCloseEmotionInspect();
  const dispatch = useHudDispatchOptional();
  const closeStudio = useCloseSceneStudio();
  const emotionId = emotionInspectId ?? "angry";
  const meta = emotionMeta(emotionId);
  const accent = meta?.color ?? "#ef4444";

  // Studio has its own provider — close it whenever Inspect opens.
  React.useEffect(() => {
    if (isEmotionInspectOpen) closeStudio();
  }, [isEmotionInspectOpen, closeStudio]);

  return (
    <InspectorModal
      open={isEmotionInspectOpen}
      onClose={close}
      title={`Emotion.${meta?.label ?? emotionId}`}
      subtitle="Inspect — events, perspectives, ideas, comments"
      icon={VisibilityRoundedIcon}
      accentColor={accent}
      closeLabel="Close emotion inspect"
    >
      <EmotionInspectBody
        emotionId={emotionId}
        onEmotionChange={(id) => dispatch?.({ type: "SET_EMOTION_INSPECT_ID", emotionId: id })}
      />
    </InspectorModal>
  );
}

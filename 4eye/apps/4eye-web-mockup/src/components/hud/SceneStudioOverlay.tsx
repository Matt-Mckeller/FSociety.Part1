"use client";

import { useSceneStudio } from "@4eye/web/Tiles/scene-studio/context/SceneStudioContext";
import { SceneStudioProviders } from "@4eye/web/Tiles/scene-studio/SceneStudioProviders";
import { SceneStudioViewBody } from "@4eye/web/Tiles/scene-studio/components/SceneStudioViewBody";

/**
 * Scene Studio overlay container — mounts unconditionally at HUD shell level
 * alongside FullScreenMapView. Returns nothing when closed; keeps the
 * provider tree alive so state (selected storyboard, etc.) survives
 * open/close cycles.
 *
 * Z-ordering: same layer as the map (Z_INDEX.FULL_MAP_VIEW = 1150).
 * Studio and map are never open simultaneously.
 */
export function SceneStudioOverlay() {
  const { isOpen } = useSceneStudio();

  if (!isOpen) return null;

  return (
    <SceneStudioProviders>
      <SceneStudioViewBody />
    </SceneStudioProviders>
  );
}

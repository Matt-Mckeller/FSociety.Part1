/**
 * CharacterCanvas — NATIVE host (React Native / Expo)
 * ===================================================
 * Mounts the SAME host-agnostic {@link CharacterScene} inside a native
 * `<Canvas>` from `@react-three/fiber/native`, which renders to an
 * `expo-gl` GL context via `expo-three`. Metro auto-resolves this `.native`
 * file on iOS/Android; web/TypeScript use the base `CharacterCanvas.tsx`.
 *
 * Requires the host app to have installed: expo-gl, expo-three,
 * @react-three/fiber. Touch-orbit can be added later via a gesture handler;
 * `enableOrbit` is accepted for API parity but is a no-op here for now.
 *
 * NOTE: must be rendered inside a <CharacterProvider>.
 */

import { Canvas } from "@react-three/fiber/native"
import { CharacterScene } from "./CharacterScene"
import type { CharacterCanvasProps } from "./characterCanvasProps"

export function CharacterCanvas({ model, background, style, camera, children }: CharacterCanvasProps) {
  return (
    <Canvas
      camera={{
        position: camera?.position ?? [0, 0, 320],
        fov: camera?.fov ?? 45,
        near: 1,
        far: 2000,
      }}
      style={style as object}
    >
      {background ? <color attach="background" args={[background]} /> : null}
      <CharacterScene model={model}>{children}</CharacterScene>
    </Canvas>
  )
}

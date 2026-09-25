/**
 * CharacterCanvas — WEB host (default)
 * ====================================
 * Mounts the host-agnostic {@link CharacterScene} inside a web `<Canvas>`
 * from `@react-three/fiber` (→ WebGLRenderer → <canvas>). The React Native
 * override lives in `CharacterCanvas.native.tsx`; Metro picks that, while
 * webpack/Next and TypeScript resolve this base file.
 *
 * NOTE: must be rendered inside a <CharacterProvider> (the scene reads the
 * shared store via useCharacter()).
 */

import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { CharacterScene } from "./CharacterScene"
import type { CharacterCanvasProps } from "./characterCanvasProps"

export function CharacterCanvas({
  model,
  enableOrbit = true,
  background,
  style,
  camera,
  orbitTarget,
  children,
}: CharacterCanvasProps) {
  return (
    <Canvas
      shadows
      camera={{
        position: camera?.position ?? [0, 0, 320],
        fov: camera?.fov ?? 45,
        near: 1,
        far: 2000,
      }}
      style={{ width: "100%", height: "100%", ...(style as object) }}
    >
      {background ? <color attach="background" args={[background]} /> : null}
      <CharacterScene model={model}>{children}</CharacterScene>
      {enableOrbit ? (
        <OrbitControls
          enablePan={false}
          minDistance={150}
          maxDistance={600}
          target={orbitTarget}
        />
      ) : null}
    </Canvas>
  )
}

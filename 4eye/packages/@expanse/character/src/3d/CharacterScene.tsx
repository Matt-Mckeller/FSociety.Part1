/**
 * CharacterScene — Host-Agnostic 3D Contents
 * ==========================================
 * Lights + the 4eye model. Rendered INSIDE a platform `<Canvas>` (web or
 * native), so it contains no host-specific code and stays identical on both
 * platforms.
 */

import type { ReactNode } from "react"
import { Character4eyeModel, type Character4eyeModelProps } from "./Character4eyeModel"

export interface CharacterSceneProps {
  model?: Character4eyeModelProps
  /** Extra scene contents (e.g. themed accessories) rendered with the model. */
  children?: ReactNode
}

export function CharacterScene({ model, children }: CharacterSceneProps) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 6]} intensity={1.1} castShadow />
      <directionalLight position={[-6, 2, -4]} intensity={0.4} />
      <Character4eyeModel {...model} />
      {children}
    </>
  )
}

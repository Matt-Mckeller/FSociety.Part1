"use client"

import { Character4eye } from "../2d"
import { CHARACTER_PERSONAS } from "../2d"
import { useVisionControl } from "./context/VisionControlContext"
import { CharacterColumn, EyelidMask } from "./styled/visionControlStyled"

/**
 * Renders the 4eye character SVG and the eyelid mask used by the
 * wink/blink animations. Reads slot refs from VisionControlContext.
 */
export function CharacterLayer() {
  const { refs } = useVisionControl()

  return (
    <>
      <CharacterColumn ref={refs.headRef}>
        <Character4eye {...CHARACTER_PERSONAS.vision} />
      </CharacterColumn>

      <EyelidMask ref={refs.eyelidRef} aria-hidden />
    </>
  )
}

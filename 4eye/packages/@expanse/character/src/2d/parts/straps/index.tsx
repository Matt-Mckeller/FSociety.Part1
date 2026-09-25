/**
 * Strap dispatcher — picks the renderer based on `ctx.strapStyle`.
 * Returns null when `strapStyle === "none"`.
 */

import type { CharacterPartContext } from "../CharacterPartContext"
import { DefaultStrap } from "./DefaultStrap"
import { SmoothStrap } from "./SmoothStrap"
import { AngularStrap } from "./AngularStrap"
import { FloatingStrap } from "./FloatingStrap"
import { OrganicStrap } from "./OrganicStrap"

export interface CharacterStrapProps {
  ctx: CharacterPartContext
}

export function CharacterStrap({ ctx }: CharacterStrapProps) {
  if (ctx.strapStyle === "none") return null
  switch (ctx.strapStyle) {
    case "smooth":
      return <SmoothStrap ctx={ctx} />
    case "angular":
      return <AngularStrap ctx={ctx} />
    case "floating":
      return <FloatingStrap ctx={ctx} />
    case "organic":
      return <OrganicStrap ctx={ctx} />
    default:
      return <DefaultStrap ctx={ctx} />
  }
}

export {
  DefaultStrap,
  SmoothStrap,
  AngularStrap,
  FloatingStrap,
  OrganicStrap,
}

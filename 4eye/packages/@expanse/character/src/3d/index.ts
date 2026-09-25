/**
 * @expanse/character/3d — True-3D Renderer (web + native)
 * =======================================================
 * react-three-fiber scene graph shared across platforms. No MUI, no DOM —
 * only the `<Canvas>` host differs (web base file vs `.native` override).
 * Always render inside a <CharacterProvider> from `@expanse/character/state`.
 */

export { CharacterCanvas } from "./CharacterCanvas"
export type { CharacterCanvasProps } from "./characterCanvasProps"
export { CharacterScene, type CharacterSceneProps } from "./CharacterScene"
export {
  Character4eyeModel,
  type Character4eyeModelProps,
} from "./Character4eyeModel"
export { useTurnController } from "./useTurnController"
export { buildHeadGeometry } from "./geometry/headGeometry"
export { Antenna, type AntennaProps } from "./accessories/Antenna"
export {
  ProfileAvatar3D,
  type ProfileAvatar3DProps,
  type ProfileAvatar3DZoom,
  type ProfileAvatar3DBorder,
} from "./profile"

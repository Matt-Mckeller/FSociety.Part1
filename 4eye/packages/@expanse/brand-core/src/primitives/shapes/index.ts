/**
 * Shape Primitives
 */

export { Circle } from "./Circle"
export { Triangle } from "./Triangle"
export { Square } from "./Square"
export { Hexagon, Pentagon, Star } from "./Polygon"
export * from "./TripleLayerPill"

// Document shapes (paper, clipboard, notebook)
export {
  DOCUMENT_RATIOS,
  PaperShape,
  FoldedPaperShape,
  ClipboardShape,
  NotebookPageShape,
} from "./DocumentShapes"
export type {
  DocumentRatio,
  PaperShapeProps,
  FoldedPaperShapeProps,
  ClipboardShapeProps,
  NotebookPageShapeProps,
} from "./DocumentShapes"

// Screen shapes (browser, phone, tablet)
export {
  SCREEN_RATIOS,
  BrowserWindowShape,
  MobilePhoneShape,
  TabletShape,
} from "./ScreenShapes"
export type {
  ScreenRatio,
  BrowserWindowShapeProps,
  MobilePhoneShapeProps,
  TabletShapeProps,
} from "./ScreenShapes"

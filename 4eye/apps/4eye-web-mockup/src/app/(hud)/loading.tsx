import { FourEyeBootScreen } from "../../components/boot/FourEyeBootScreen";

/**
 * Suspense fallback for the `(hud)` route group.
 *
 * Kept off the MUI barrel so the first compile of this file is the nested
 * mark, not Skeleton. Tile-to-tile nav still sits inside HudLayout chrome;
 * this only fills the content slot.
 */
export default function Loading() {
  return <FourEyeBootScreen />;
}

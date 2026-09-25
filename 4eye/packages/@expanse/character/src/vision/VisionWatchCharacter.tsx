"use client"

/**
 * VisionWatchCharacter — back-compat re-export.
 * Now delegates to VisionControlCharacter with device="watch".
 *
 * Existing imports of VisionWatchCharacter continue to work unchanged.
 */
export { VisionControlCharacter as VisionWatchCharacter } from "./VisionControlCharacter"

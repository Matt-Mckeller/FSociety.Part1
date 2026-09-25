"use client"

import { ControllerSvg } from "./devices/ControllerSvg"
import { WatchSvg } from "./devices/WatchSvg"
import { useVisionControl } from "./context/VisionControlContext"
import {
  ControllerSlot,
  PrimaryWatchSlot,
  SecondaryWatchSlot,
} from "./styled/visionControlStyled"

/**
 * Renders the device(s) the character is holding:
 *   - device="controller": controller at the belly
 *   - device="watch":      watch on the wrist (primary)
 *   - device="both":       controller at belly + watch on far wrist
 */
export function DeviceLayer() {
  const { refs, device, controllerPalette, controllerPositionPct } = useVisionControl()

  if (device === "watch") {
    return (
      <PrimaryWatchSlot ref={refs.deviceRef}>
        <WatchSvg />
      </PrimaryWatchSlot>
    )
  }

  return (
    <>
      <ControllerSlot
        ref={refs.deviceRef}
        sx={controllerPositionPct ? { bottom: controllerPositionPct } : undefined}
      >
        <ControllerSvg ref={refs.controllerSvgRef} palette={controllerPalette} />
      </ControllerSlot>

      {device === "both" && (
        <SecondaryWatchSlot ref={refs.watchRef}>
          <WatchSvg />
        </SecondaryWatchSlot>
      )}
    </>
  )
}

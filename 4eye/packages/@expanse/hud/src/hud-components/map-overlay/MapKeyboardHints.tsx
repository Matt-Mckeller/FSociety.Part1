"use client";

import { useMemo } from "react";
import { Box } from "@mui/material";

import { NavigationPad } from "../navigation-pad/components/NavigationPad";
import { useRegisterBottomBar } from "../../hud/slots/BottomBarsProvider";

/**
 * Registers a single bottom-bar entry that shows the directional
 * `NavigationPad` in `hints` mode (with the WASD/arrow keyboard cap
 * overlay) while the full-screen Minimap overlay is mounted.
 *
 * Renders no DOM of its own — the bar surfaces through the layout
 * package's `BottomChromeStack`. Mount this component conditionally
 * (only while the map view is open) so the registration unmounts and
 * the bar disappears the moment the overlay closes.
 */
export function MapKeyboardHints() {
  const node = useMemo(
    () => (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <NavigationPad
          variant="hints"
          size="medium"
          showKeyboardHints
        />
      </Box>
    ),
    [],
  );

  useRegisterBottomBar({
    id: "map-keyboard-hints",
    order: 30,
    node,
    label: "Minimap keyboard navigation hints",
  });

  return null;
}

export default MapKeyboardHints;

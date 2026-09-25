"use client";

import { useEffect, useMemo } from "react";
import ExpandIcon from "@mui/icons-material/OpenInFull";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Box } from "@mui/material";
import { ActionBar, ActionOrb, DEFAULT_BOTTOM_BAR_ORDER, useRegisterBottomBar, useRegisterHudChromeHide } from "@expanse/hud"

import { useSlideshow } from "@4eye/web/Tiles/home/slideshow/SlideshowProvider";
import { useDomainsSlideContext } from "../state/DomainsSlideContext";

/**
 * DomainsActionBar — slide-scoped HUD orb bar for the Reach (Domains)
 * slide. Hides the global default OrbBar while mounted and registers
 * its own bar with the FullHud BottomBarsProvider so the four primary
 * actions (Expand / Visualize / Listen / Watch) sit above the AI input.
 *
 * Only Expand is enabled — the other three are presented as upcoming
 * affordances. Hotkeys 1–4 are shown as visual badges; "1" actually
 * fires the Expand toggle.
 *
 * Because SlideStage keeps all slides mounted (unmountOnExit=false), this
 * component is always in the tree. The `enabled` flag on both registration
 * hooks ensures they only take effect when the Reach slide is active.
 */
export function DomainsActionBar() {
  const { isExpanded, toggleExpanded } = useDomainsSlideContext();
  const { activeId } = useSlideshow();
  const isActive = activeId === "domains";

  // Hide the default orb bar only while the Reach slide is the active one.
  useRegisterHudChromeHide({
    id: "reach-hide-default-orb-bar",
    hide: ["bottomOrbBar"],
    label: "Reach slide custom orb bar",
    enabled: isActive,
  });

  // Wire hotkey 1 to toggle Expand only when the Reach slide is active.
  useEffect(() => {
    if (!isActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
      }
      if (e.key === "1") {
        e.preventDefault();
        toggleExpanded();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isActive, toggleExpanded]);

  const node = useMemo(
    () => (
      <ActionBar variant="orbs" orientation="horizontal" thickness="auto" padding={8}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: { zero: 1, tablet: 1.5 },
          }}
        >
          <ActionOrb
            icon={<ExpandIcon />}
            label={isExpanded ? "Collapse" : "Expand"}
            shape="circle"
            size="lg"
            variant={isExpanded ? "glass" : "float"}
            color="success"
            vibrant={!isExpanded}
            hotkey="1"
            hotkeyDisplay="badge"
            showInlineLabel
            labelPosition="below"
            onClick={toggleExpanded}
          />
          <ActionOrb
            icon={<VisibilityIcon />}
            label="Visualize"
            shape="circle"
            size="lg"
            variant="glass"
            color="primary"
            hotkey="2"
            hotkeyDisplay="badge"
            showInlineLabel
            labelPosition="below"
            disabled
          />
          <ActionOrb
            icon={<HeadphonesIcon />}
            label="Listen"
            shape="circle"
            size="lg"
            variant="glass"
            color="success"
            hotkey="3"
            hotkeyDisplay="badge"
            showInlineLabel
            labelPosition="below"
            disabled
          />
          <ActionOrb
            icon={<PlayCircleIcon />}
            label="Watch"
            shape="circle"
            size="lg"
            variant="glass"
            color="warning"
            hotkey="4"
            hotkeyDisplay="badge"
            showInlineLabel
            labelPosition="below"
            disabled
          />
        </Box>
      </ActionBar>
    ),
    [isExpanded, toggleExpanded],
  );

  useRegisterBottomBar({
    id: "reach-actions",
    order: DEFAULT_BOTTOM_BAR_ORDER.orbs,
    node,
    label: "Reach actions",
    enabled: isActive,
  });

  return null;
}

export default DomainsActionBar;

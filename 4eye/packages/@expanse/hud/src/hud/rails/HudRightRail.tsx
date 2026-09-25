"use client";

import React from "react";
import { Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/SettingsRounded";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import { ProfilePhoto } from "@expanse/character/2d";

import { Z_INDEX } from "@expanse/theme";
import { ActionDock } from "../docks";
import type { ActionDockPosition } from "../docks";
import { RAIL_PILL_SIZE, RAIL_PILL_BACKGROUND, RAIL_ITEM_GAP } from "./railPillStyle";
import { MenuOrbList, SettingsActionBar, type MenuOrbItem } from "../../hud-components/action-bars";
import { FabCluster, FabTrigger, useFabCluster } from "../../hud-components/fab-cluster-bar";
import {
  useHudBarSizes,
  useHudChromeVisibility,
  useRegisterHudInset,
  useRightRailItems,
} from "../slots";
import { useRailPreferences } from "../overlay-state";

// =============================================================================
// Animated lens icon — rendered inside FabCluster so useFabCluster() works.
// =============================================================================

/**
 * Renders the 4eye mascot with two animations:
 *
 *  1. **Iris open** — on mount a clip-path keyframe expands from a narrow
 *     horizontal slit to the full circle, mimicking a camera shutter opening.
 *
 *  2. **Lens zoom** — while the profile FAB is active (hovered / focused)
 *     the mascot smoothly scales up ~2.4× with transform-origin centred on
 *     the eye, bringing the lens into close-up. It scales back out on leave.
 *
 * The component is intentionally an inner function so it can call
 * `useFabCluster()` — it is rendered inside the FabCluster context tree
 * (as the `icon` prop of FabTrigger), so the context is always present.
 */
function ProfileLensIcon({ size }: { size: number }) {
  const { activePanel } = useFabCluster();
  const isActive = activePanel === "profile";

  return (
    // Outer: fixed-size anchor for the FAB slot. No overflow clip — the
    // mascot is allowed to bleed outside the circle. Flex-centers the inner.
    <Box
      sx={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        borderRadius: "50%",
      }}
    >
      {/* Inner: iris-open animation + lens-zoom on active. */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: isActive ? "scale(1.45)" : "scale(1)",
          transformOrigin: "50% 50%",
          transition: "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
          // Iris opens on mount; clip-path ends at "none" so no permanent clipping.
          "@keyframes irisOpen": {
            "0%":   { clipPath: "inset(44% 12% 44% 12% round 50%)" },
            "60%":  { clipPath: "inset(5%  2%  5%  2%  round 50%)" },
            "100%": { clipPath: "none" },
          },
          animation: "irisOpen 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards",
        }}
      >
        <ProfilePhoto
          variant="friendly"
          zoom="head"
          size={size}
          background="transparent"
          shadow={false}
          borderStyle="none"
        />
      </Box>
    </Box>
  );
}

// =============================================================================
// HudRightRail
// =============================================================================

export interface HudRightRailProps {
  /** Optional contents of the slide-out panel for the profile FAB. */
  panelContent?: React.ReactNode;
  /** Where the rail docks. @default "right-center" */
  position?: ActionDockPosition;
  /** Theme mode forwarded from FullHud — used by the settings panel. */
  mode?: "light" | "dark";
  /** Theme-mode change callback forwarded from FullHud. */
  onThemeModeChange?: (mode: "light" | "dark") => void;
}

/**
 * HudRightRail — mirror of {@link HudLeftRail} on the opposite edge.
 *
 * Renders the profile and settings FABs at `right-center`, plus any
 * feature-registered items stacked below (e.g. the AI Chat action FAB).
 * Hovering the profile trigger opens an `ActionBar` panel with profile
 * shortcuts, and the mascot simultaneously zooms in to the lens.
 */
export function HudRightRail({
  panelContent,
  position = "right-center",
  mode = "dark",
  onThemeModeChange,
}: HudRightRailProps = {}) {
  const barSizes = useHudBarSizes();
  const { labelsVisible, chromeGuideVisible } = useRailPreferences();
  const labelMode = labelsVisible || chromeGuideVisible ? "always" : "none";
  useRegisterHudInset({
    id: "hud-right-rail",
    edge: "right",
    size: barSizes.header,
    label: "HudRightRail",
  });
  const panelSide = position.startsWith("left") ? "right" : "left";
  const { entries: rightRailEntries } = useRightRailItems();
  const { hidden } = useHudChromeVisibility();
  const visibleRailItems = rightRailEntries.filter(
    (e) => !e.hideKey || !hidden[e.hideKey],
  );

  return (
    <ActionDock position={position} offset={barSizes.edge} zIndex={Z_INDEX.PERSISTENT_RAILS}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: `${RAIL_ITEM_GAP}px`,
          overflow: "visible",
        }}
      >
        <FabCluster>
          {/*
           * ProfileLensIcon is a component (not a plain element) so React
           * instantiates it inside the FabCluster context tree, giving it
           * access to useFabCluster().
           */}
          <FabTrigger
            id="profile"
            icon={<ProfileLensIcon size={RAIL_PILL_SIZE - 8} />}
            label="Profile"
            panel={panelContent ?? <DefaultProfilePanel />}
            size={RAIL_PILL_SIZE}
            shape="square"
            background={RAIL_PILL_BACKGROUND}
            panelSide={panelSide}
            labelMode={labelMode}
          />
          <FabTrigger
            id="settings"
            icon={<SettingsIcon />}
            label="Settings"
            panel={<SettingsActionBar mode={mode} onThemeModeChange={onThemeModeChange ?? (() => undefined)} />}
            size={RAIL_PILL_SIZE}
            shape="square"
            background={RAIL_PILL_BACKGROUND}
            panelSide={panelSide}
            labelMode={labelMode}
          />
        </FabCluster>
        {visibleRailItems.length > 0 && (
          <Box
            data-testid="hud-right-rail-items"
            sx={{ display: "contents" }}
          >
            {visibleRailItems.map((entry) => (
              <React.Fragment key={entry.id}>{entry.node}</React.Fragment>
            ))}
          </Box>
        )}
      </Box>
    </ActionDock>
  );
}

/**
 * Minimal profile menu shown when the parent doesn't supply
 * `panelContent`. Apps can pass their own `panelContent` to replace it.
 */
const PROFILE_ITEMS: ReadonlyArray<MenuOrbItem> = [
  { key: "profile",  icon: <PersonIcon />,      label: "Profile",  tone: "primary" },
  { key: "settings", icon: <SettingsIcon />,    label: "Settings", tone: "accent"  },
  { key: "theme",    icon: <Brightness4Icon />, label: "Theme",    tone: "warning" },
  { key: "help",     icon: <HelpOutlineIcon />, label: "Help",     tone: "info"    },
  { key: "signout",  icon: <LogoutIcon />,      label: "Sign out", tone: "danger"  },
];

function DefaultProfilePanel() {
  return <MenuOrbList items={PROFILE_ITEMS} />;
}

"use client";

import { Box, Tooltip } from "@mui/material";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { WherePill, PILL_H } from "../primitives/WherePill";
import { useDomainsSlideContext } from "../state/DomainsSlideContext";
import { DOMAINS_SELECTORS } from "../state/domains.constants";
import type { ReachIcon } from "../state/domains.constants";

/** All 5 domain pills share this primary blue. */
const CLUSTER_BLUE = "#3B82F6";

/** Fixed width of each pill in the cluster. */
const PILL_W = 118;

/**
 * Roles represented as floating circle icons in the center of the cluster.
 * Each entry maps to one of the 5 inner-pentagon positions.
 */
const ROLES = [
  { key: "students",      label: "Students",      Icon: AccessibilityNewIcon, ariaLabel: "Students — a supported audience" },
  { key: "teachers",      label: "Teachers",      Icon: RecordVoiceOverIcon,  ariaLabel: "Teachers — a supported audience" },
  { key: "professionals", label: "Professionals", Icon: ManageAccountsIcon,   ariaLabel: "Professionals — a supported audience" },
  { key: "organizations", label: "Organizations", Icon: Diversity3Icon,       ariaLabel: "Organizations — a supported audience" },
  { key: "parents",       label: "Parents",       Icon: FamilyRestroomIcon,  ariaLabel: "Parents — a supported audience" },
] as const;

/** Diameter of each role icon circle. */
const ROLE_ICON_SIZE = 32;

/**
 * Inner pentagon positions for the 5 role icons.
 *
 * Geometry: R = 32px from center (177, 195) of the 360×376 container.
 * Offset by -ROLE_ICON_SIZE/2 so the circle is centered on each vertex.
 * Points start at the top and go clockwise (72° apart).
 *
 *         [0] students
 *   [4]               [1]
 *     [3]         [2]
 */
const ROLE_POSITIONS = [
  { left: 161, top: 147 }, // top          — Students
  { left: 191, top: 169 }, // upper-right  — Teachers
  { left: 180, top: 205 }, // lower-right  — Professionals
  { left: 142, top: 205 }, // lower-left   — Organizations
  { left: 131, top: 169 }, // upper-left   — Parents
] as const;

/**
 * Pentagon positions for 5 pills, arranged in a star/cluster layout.
 *
 * Geometry: R = 120px from center (177, 195) of a 360×380px container.
 * Points start at the top and go clockwise (72° apart).
 *
 *         [0] top
 *   [4]         [1]
 *      [3]   [2]
 */
const POSITIONS = [
  { left: 118, top: 5 },   // top
  { left: 232, top: 88 },  // upper-right
  { left: 188, top: 222 }, // lower-right
  { left: 47, top: 222 },  // lower-left
  { left: 4, top: 88 },    // upper-left
] as const;

const CONTAINER_W = 360;
const CONTAINER_H = POSITIONS[2].top + PILL_H + 14; // 376

interface ClusterItem {
  key: string;
  label: string;
  Icon: ReachIcon;
}

/**
 * DomainsStarCluster — renders all 5 domain pills (2 "Wherever" + 3 "Whenever")
 * grouped into a single pentagonal star cluster. Every pill shares the primary
 * blue color and the TripleLayerPill border shape from WherePill.
 */
export function DomainsStarCluster() {
  const { whens, places } = useDomainsSlideContext();

  const items: ClusterItem[] = [
    ...whens.map((w) => ({ key: w.key, label: w.label, Icon: w.Icon })),
    ...places.map((p) => ({ key: p.key, label: p.label, Icon: p.Icon })),
  ];

  return (
    <Box
      className={DOMAINS_SELECTORS.whereBand.slice(1)}
      sx={{
        position: "relative",
        width: CONTAINER_W,
        height: CONTAINER_H,
        mx: "auto",
        // Scale down proportionally on narrow viewports
        "@media (max-width: 400px)": {
          transform: "scale(0.82)",
          transformOrigin: "top center",
        },
      }}
    >
      {items.slice(0, POSITIONS.length).map(({ key, label, Icon }, i) => (
        <Box
          key={key}
          sx={{
            position: "absolute",
            left: POSITIONS[i].left,
            top: POSITIONS[i].top,
            width: PILL_W,
          }}
        >
          <WherePill
            label={label}
            Icon={Icon}
            hex={CLUSTER_BLUE}
            className={DOMAINS_SELECTORS.wherePill.slice(1)}
          />
        </Box>
      ))}

      {/* ── Role Icons: tight cluster of circles at the center of the pentagon ── */}
      {ROLES.map(({ key, label, Icon, ariaLabel }, i) => (
        <Tooltip key={key} title={label} placement="top" arrow>
          <Box
            role="img"
            aria-label={ariaLabel}
            sx={{
              position: "absolute",
              left: ROLE_POSITIONS[i].left,
              top: ROLE_POSITIONS[i].top,
              width: ROLE_ICON_SIZE,
              height: ROLE_ICON_SIZE,
              borderRadius: "50%",
              backgroundColor: `${CLUSTER_BLUE}18`,
              border: `2px solid ${CLUSTER_BLUE}55`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: CLUSTER_BLUE,
              cursor: "default",
              zIndex: 10,
              transition: "transform 160ms ease, background-color 160ms ease",
              "&:hover": {
                backgroundColor: `${CLUSTER_BLUE}30`,
                transform: "scale(1.18)",
              },
            }}
          >
            {/* @ts-expect-error MUI icon compat */}
            <Icon style={{ fontSize: 17 }} />
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
}

export default DomainsStarCluster;

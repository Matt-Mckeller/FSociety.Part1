"use client";

/**
 * RealmLocationBar — unified header pill that combines realm switching with
 * page navigation in a single frosted bar.
 *
 * Layout (single ActionBar pill):
 *   [realm-icon  realm-label  ›]  [│]  [‹]  [page-swatch]  [page-name]  [›]
 *   └── collapsible realm prefix ──┘  └──── standard page nav ─────────────┘
 *
 * The realm prefix expands inline (like MapSwitcher) to reveal all three
 * realms. Clicking a realm label switches the active realm and collapses
 * back. Outside-click and Escape also collapse.
 *
 * Registered into the HUD center slot via `useRegisterCenterContent` with
 * priority 10 so it wins over the default `CurrentLocationActionBar`.
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  IconButton,
  Popover,
  Tooltip,
  Typography,
  alpha,
  keyframes,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import DialpadRoundedIcon from "@mui/icons-material/DialpadRounded";
import TravelExploreRoundedIcon from "@mui/icons-material/TravelExploreRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import SchemaRoundedIcon from "@mui/icons-material/SchemaRounded";

import { ActionBar, PlusCloseGlyph, useHudStateOptional } from "@expanse/hud";
import type { ActionBarProps } from "@expanse/hud";
import { useNavigation } from "@expanse/map";
import { HUD_HEADER_BAR_SIZE } from "@expanse/brand-core";
import { Web4Mark } from "./Web4Mark";

import { useRealm } from "./useRealm";
import { REALMS, REALM_ORDER, type RealmKey } from "@4eye/web/lib/hud/realmRegistry";

// ─── Ice-vein text effect (same as MapSwitcher) ───────────────────────────────

const doubleStrike = keyframes`
  0%   { background-position: -160% 50% }
  24%  { background-position: 240% 50%  }
  100% { background-position: 240% 50%  }
`;

const ICE_VEIN_SX = {
  display: "inline-block",
  background:
    "linear-gradient(115deg, #dbeafe 0%, #e5e7eb 28%, #ffffff 33%, #dbeafe 38%, #dbeafe 50%, #ffffff 55%, #dbeafe 60%, #dbeafe 100%)",
  backgroundSize: "300% 100%",
  backgroundPosition: "-160% 50%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: `${doubleStrike} 7s ease-in-out infinite`,
  animationDelay: "8s",
  "@media (prefers-reduced-motion: reduce)": {
    animation: "none",
    WebkitTextFillColor: "#ffffff",
  },
} as const;

// ─── Realm icon map ───────────────────────────────────────────────────────────

const REALM_ICONS: Record<RealmKey, React.ElementType> = {
  website: TravelExploreRoundedIcon,
  app: RocketLaunchRoundedIcon,
  technical: SchemaRoundedIcon,
};

const REALM_TABS = REALM_ORDER.map((id) => ({
  id,
  label: REALMS[id].label,
  Icon: REALM_ICONS[id],
}));

// ─── Sub-components ───────────────────────────────────────────────────────────

function VerticalDivider() {
  return (
    <Box
      sx={{
        width: "1px",
        height: 18,
        bgcolor: "rgba(255,255,255,0.18)",
        flexShrink: 0,
        mx: 0.5,
      }}
    />
  );
}

function RealmLabel({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Typography
      component="span"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      sx={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.4,
        lineHeight: 1,
        cursor: "pointer",
        userSelect: "none",
        transition: "opacity 180ms ease",
        ...(active
          ? ICE_VEIN_SX
          : {
              color: "rgba(255,255,255,0.58)",
              "&:hover": { color: "rgba(255,255,255,0.85)" },
            }),
      }}
    >
      {label}
    </Typography>
  );
}

function SmallChevron({ dim = false }: { dim?: boolean }) {
  return (
    <ChevronRightRoundedIcon
      sx={{
        fontSize: 11,
        color: "#ffffff",
        opacity: dim ? 0.32 : 0.65,
        flexShrink: 0,
        mx: "-2px",
      }}
    />
  );
}

// ─── RealmPrefix — left zone of the bar ──────────────────────────────────────

function RealmPrefix({
  expanded,
  activeMap,
  onExpand,
  onSelect,
}: {
  expanded: boolean;
  activeMap: RealmKey;
  onExpand: () => void;
  onSelect: (id: RealmKey) => void;
}) {
  const activeTab = REALM_TABS.find((t) => t.id === activeMap) ?? REALM_TABS[0];
  const ActiveIcon = activeTab.Icon;

  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
      {/* Always-visible icon cluster: keypad + realm icon */}
      <DialpadRoundedIcon
        sx={{ fontSize: 12, color: "rgba(255,255,255,0.55)", flexShrink: 0 }}
      />
      <ActiveIcon
        sx={{
          fontSize: 14,
          color: "rgba(255,255,255,0.8)",
          flexShrink: 0,
          mr: 0.25,
        }}
      />

      <AnimatePresence initial={false} mode="popLayout">
        {!expanded ? (
          <Box
            key="collapsed"
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onClick={onExpand}
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onExpand();
              }
            }}
            aria-label={`Switch realm — current: ${activeTab.label}`}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: "2px",
              cursor: "pointer",
              outline: "none",
              "&:focus-visible": {
                outline: "1px solid rgba(147,197,253,0.55)",
                borderRadius: 0.5,
              },
            }}
          >
            {/*
              Collapsed, the app realm shows its mark rather than the word
              "App" — the bar is the map header, and a glyph reads faster there
              than a three-letter noun. Expanding still spells every realm out,
              so the word is one click away and screen readers get it from the
              wrapper's aria-label either way.
            */}
            {activeTab.id === "app" ? (
              // Not ICE_VEIN_SX: that clips a gradient to *text*, and the mark
              // is SVG drawn in `currentColor`, which would be left unresolved.
              // An explicit colour keeps it in step with the realm icon above.
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  px: "1px",
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                <Web4Mark size={15} />
              </Box>
            ) : (
              <RealmLabel label={activeTab.label} active onClick={onExpand} />
            )}
            <SmallChevron />
          </Box>
        ) : (
          <Box
            key="expanded"
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            sx={{ display: "inline-flex", alignItems: "center", gap: "2px" }}
          >
            {REALM_TABS.map((tab, i) => (
              <Box
                key={tab.id}
                sx={{ display: "inline-flex", alignItems: "center", gap: "2px" }}
              >
                {i > 0 && <SmallChevron dim />}
                <RealmLabel
                  label={tab.label}
                  active={tab.id === activeMap}
                  onClick={() => onSelect(tab.id)}
                />
              </Box>
            ))}
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
}

// ─── RealmLocationBar ─────────────────────────────────────────────────────────

export interface RealmLocationBarProps {
  thickness?: ActionBarProps["thickness"];
  /**
   * Optional trailing title segment (e.g. "Map") appended after the page
   * nav zone, with a close affordance. Used to fold a screen-level title +
   * close control into this bar instead of swapping in a separate override
   * component (e.g. while the full-screen map view is open).
   */
  title?: string;
  /** Called when the title segment's close button is clicked. */
  onTitleClose?: () => void;
}

export function RealmLocationBar({
  thickness = { pixels: HUD_HEADER_BAR_SIZE.desktop },
  title,
  onTitleClose,
}: RealmLocationBarProps) {
  const theme = useTheme();
  const mapClosing = Boolean(useHudStateOptional()?.isMapViewClosing);
  const { activeMap, setActiveMap } = useRealm();
  const { currentTile, position, goBack, goForward, canGoBack, canGoForward } =
    useNavigation();

  const [expanded, setExpanded] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Page nav metadata
  const label =
    currentTile?.display.label ?? `[${position.x + 1}, ${position.y + 1}]`;
  const IconComp = currentTile?.display.icon;
  const swatchColor =
    currentTile?.display.colors.active ??
    currentTile?.display.colors.inactive ??
    theme.palette.primary.main;
  const iconNode = IconComp ? (
    React.createElement(IconComp as React.ComponentType<{ sx?: object }>, {
      sx: { fontSize: 20, color: "common.white" },
    })
  ) : (
    <PlaceOutlinedIcon sx={{ fontSize: 20, color: "common.white" }} />
  );

  // Outside-click + Escape to collapse realm selector
  useEffect(() => {
    if (!expanded) return;
    const onDown = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      setExpanded(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  const handleRealmSelect = useCallback(
    (id: RealmKey) => {
      setActiveMap(id);
      setExpanded(false);
    },
    [setActiveMap],
  );

  return (
    <Box ref={containerRef} sx={{ display: "inline-flex", alignItems: "center" }}>
      <ActionBar
        variant="frosted"
        shape="pill"
        thickness={thickness}
        orientation="horizontal"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.25,
            px: 0.75,
            height: "100%",
          }}
        >
          {/* ── Left zone: realm selector ────────────────────────────── */}
          <RealmPrefix
            expanded={expanded}
            activeMap={activeMap}
            onExpand={() => setExpanded(true)}
            onSelect={handleRealmSelect}
          />

          <VerticalDivider />

          {/* ── Right zone: page navigation ──────────────────────────── */}
          <Tooltip title={canGoBack ? "Back" : "No previous page"}>
            <span>
              <IconButton
                size="small"
                aria-label="Back"
                disabled={!canGoBack}
                onClick={goBack}
                sx={{
                  color: canGoBack ? "common.white" : alpha("#fff", 0.32),
                  p: 0.5,
                  "&.Mui-disabled": { color: alpha("#fff", 0.32) },
                }}
              >
                <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title={label} enterDelay={400}>
            <IconButton
              size="small"
              aria-label={`Current page: ${label}`}
              onClick={(e) => setPopoverAnchor(e.currentTarget)}
              sx={{ p: 0.5, borderRadius: 1 }}
            >
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: 0.75,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: swatchColor,
                  border: `1px solid ${alpha("#000", 0.12)}`,
                }}
              >
                {iconNode}
              </Box>
            </IconButton>
          </Tooltip>

          <Typography
            variant="caption"
            noWrap
            sx={{
              fontWeight: 600,
              color: "common.white",
              fontSize: 11,
              letterSpacing: 0.2,
              userSelect: "none",
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {label}
          </Typography>

          <Tooltip
            title={canGoForward ? "Forward" : "Nothing to go forward to"}
          >
            <span>
              <IconButton
                size="small"
                aria-label="Forward"
                disabled={!canGoForward}
                onClick={goForward}
                sx={{
                  color: canGoForward ? "common.white" : alpha("#fff", 0.32),
                  p: 0.5,
                  "&.Mui-disabled": { color: alpha("#fff", 0.32) },
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </span>
          </Tooltip>

          {title && (
            <>
              <VerticalDivider />
              <MapRoundedIcon sx={{ fontSize: 15, color: "rgba(255,255,255,0.85)" }} />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: "common.white",
                  fontSize: 11,
                  letterSpacing: 0.3,
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {title}
              </Typography>
              {onTitleClose && (
                <Tooltip title="Return to game">
                  <IconButton
                    size="small"
                    aria-label="Return to game"
                    onClick={onTitleClose}
                    sx={{ color: "common.white", p: 0.5, ml: 0.25 }}
                  >
                    <PlusCloseGlyph plus={mapClosing} fontSize={15} />
                  </IconButton>
                </Tooltip>
              )}
            </>
          )}
        </Box>
      </ActionBar>

      <Popover
        open={Boolean(popoverAnchor)}
        anchorEl={popoverAnchor}
        onClose={() => setPopoverAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{ paper: { sx: { px: 2, py: 1.25, minWidth: 160 } } }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {label}
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          [{position.x + 1}, {position.y + 1}]
          {currentTile?.display.category
            ? ` · ${currentTile.display.category}`
            : ""}
        </Typography>
      </Popover>
    </Box>
  );
}

export default RealmLocationBar;

"use client";

/**
 * MapSwitcher — realm picker pill above the map column inside the
 * MinimapFullView overlay.
 *
 * Visual structure:
 *
 *   Collapsed: [Layers][BlurOn][Dialpad] | Website >
 *   Expanded:  [Layers][BlurOn][Dialpad] | Website > App > Technical
 *
 * The icon cluster (Layers + BlurOn + Dialpad) is **always** visible and
 * **never** changes regardless of which realm is selected. It acts as the
 * chrome / logo for the switcher itself. Only the realm label text
 * changes when you click. This gives the pill a stable visual anchor
 * while keeping the "which realm" signal purely in the typography.
 *
 * Expansion: clicking anywhere on the collapsed chip, or the `›` arrow,
 * extends the pill to the right to reveal all three realm labels separated
 * by `›` glyphs. Clicking a label switches the active realm (pill stays
 * expanded). Outside-click or Escape collapses back.
 *
 * Labels use the ice-vein double-strike shimmer. Active label is full
 * brightness; inactive labels are dimmed (opacity 0.45) so the active
 * selection always reads clearly.
 *
 * Auto-expand: if the pill is collapsed and neither viewed nor interacted
 * with for 30 s, it auto-expands as a discoverability nudge, then
 * auto-collapses after 6 s if the user still doesn't engage.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Typography, keyframes } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import BlurOnRoundedIcon from "@mui/icons-material/BlurOnRounded";
import DialpadRoundedIcon from "@mui/icons-material/DialpadRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { useRealm } from "./useRealm";
import { REALMS, REALM_ORDER, type RealmKey } from "@4eye/web/lib/hud/realmRegistry";

// ─── Realm definitions ──────────────────────────────────────────────────

const REALM_TABS: { id: RealmKey; label: string }[] = REALM_ORDER.map((id) => ({
  id,
  label: REALMS[id].label,
}));

// ─── Pill background (Permafrost dark-glass) ──────────────────────────────────

const PILL_BG_SX = {
  background:
    "linear-gradient(135deg, #0d1117 0%, #161b22 55%, #0d1117 100%)",
  border: "1px solid rgba(99,179,237,0.22)",
  boxShadow:
    "0 4px 24px rgba(0,0,10,0.8), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.5)",
} as const;

// ─── Ice-vein double-strike text animation ────────────────────────────────────

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

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Static 3-icon cluster — always rendered, never changes. */
function IconCluster() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
        flexShrink: 0,
      }}
    >
      <LayersRoundedIcon sx={{ fontSize: 16, color: "#ffffff" }} />
      <BlurOnRoundedIcon  sx={{ fontSize: 14, color: "#ffffff", opacity: 0.9 }} />
      <DialpadRoundedIcon sx={{ fontSize: 13, color: "#ffffff", opacity: 0.82 }} />
    </Box>
  );
}

/** Thin vertical rule separating the icon cluster from the label area. */
function Divider() {
  return (
    <Box
      sx={{
        width: "1px",
        height: 14,
        bgcolor: "rgba(255,255,255,0.28)",
        flexShrink: 0,
        mx: 0.75,
      }}
    />
  );
}

/** A single realm label. Active = full ice-vein; inactive = dimmed flat. */
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
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      sx={{
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 0.5,
        lineHeight: 1,
        cursor: "pointer",
        userSelect: "none",
        transition: "opacity 180ms ease",
        ...(active
          ? ICE_VEIN_SX
          : {
              color: "#ffffff",
              opacity: 0.58,
              "&:hover": { opacity: 0.82 },
            }),
      }}
    >
      {label}
    </Typography>
  );
}

/** The `›` glyph rendered between realm labels and as the expand affordance. */
function Chevron({ dim = false }: { dim?: boolean }) {
  return (
    <ChevronRightRoundedIcon
      sx={{
        fontSize: 12,
        color: "#ffffff",
        opacity: dim ? 0.34 : 0.7,
        flexShrink: 0,
        mx: "-1px",
      }}
    />
  );
}

// ─── Auto-expand constants ────────────────────────────────────────────────────

const AUTO_EXPAND_IDLE_MS = 30_000;
const AUTO_COLLAPSE_AFTER_AUTO_EXPAND_MS = 6_000;

// ─── MapSwitcher ─────────────────────────────────────────────────────────────

export function MapSwitcher() {
  const { activeMap, setActiveMap } = useRealm();
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const autoExpandedRef = useRef(false);
  const visibleRef = useRef(false);

  const activeTab = REALM_TABS.find((t) => t.id === activeMap) ?? REALM_TABS[0];

  // ── Outside-click + Escape ───────────────────────────────────────────────
  useEffect(() => {
    if (!expanded) return;
    const onDocMouseDown = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      setExpanded(false);
    };
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setExpanded(false); };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  // ── Auto-expand idle timer ───────────────────────────────────────────────
  useEffect(() => {
    if (expanded) return;
    const node = containerRef.current;
    if (!node || typeof window === "undefined") return;

    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const armIdleTimer = () => {
      if (idleTimer) clearTimeout(idleTimer);
      if (!visibleRef.current) return;
      if (document.visibilityState !== "visible") return;
      idleTimer = setTimeout(() => {
        if (!visibleRef.current || document.visibilityState !== "visible") return;
        autoExpandedRef.current = true;
        setExpanded(true);
      }, AUTO_EXPAND_IDLE_MS);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        visibleRef.current = !!entries[0]?.isIntersecting;
        if (visibleRef.current) armIdleTimer();
        else if (idleTimer) clearTimeout(idleTimer);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);

    const reset = () => armIdleTimer();
    node.addEventListener("pointermove", reset);
    node.addEventListener("pointerdown", reset);
    node.addEventListener("focusin", reset);
    node.addEventListener("keydown", reset);

    const onVis = () => {
      document.visibilityState === "visible" ? armIdleTimer() : idleTimer && clearTimeout(idleTimer);
    };
    document.addEventListener("visibilitychange", onVis);
    armIdleTimer();

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      observer.disconnect();
      node.removeEventListener("pointermove", reset);
      node.removeEventListener("pointerdown", reset);
      node.removeEventListener("focusin", reset);
      node.removeEventListener("keydown", reset);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [expanded]);

  // ── Auto-collapse after auto-expand ─────────────────────────────────────
  useEffect(() => {
    if (!expanded || !autoExpandedRef.current) return;
    const node = containerRef.current;
    if (!node) return;

    let collapseTimer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
      setExpanded(false);
      autoExpandedRef.current = false;
    }, AUTO_COLLAPSE_AFTER_AUTO_EXPAND_MS);

    const cancel = () => {
      if (collapseTimer) { clearTimeout(collapseTimer); collapseTimer = null; }
      autoExpandedRef.current = false;
    };
    node.addEventListener("pointerdown", cancel);
    node.addEventListener("pointermove", cancel);
    node.addEventListener("focusin", cancel);
    node.addEventListener("keydown", cancel);

    return () => {
      if (collapseTimer) clearTimeout(collapseTimer);
      node.removeEventListener("pointerdown", cancel);
      node.removeEventListener("pointermove", cancel);
      node.removeEventListener("focusin", cancel);
      node.removeEventListener("keydown", cancel);
    };
  }, [expanded]);

  const handleSelect = useCallback(
    (id: RealmKey) => { setActiveMap(id); setExpanded(false); },
    [setActiveMap],
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 1.25,
        position: "relative",
        zIndex: 11,
      }}
    >
      <Box
        component={motion.div}
        ref={containerRef}
        onClick={!expanded ? () => setExpanded(true) : undefined}
        role={!expanded ? "button" : undefined}
        tabIndex={!expanded ? 0 : undefined}
        onKeyDown={
          !expanded
            ? (e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(true); }
              }
            : undefined
        }
        aria-label={!expanded ? `Switch realm — current: ${activeTab.label}` : undefined}
        aria-expanded={expanded}
        sx={{
          ...PILL_BG_SX,
          display: "inline-flex",
          alignItems: "center",
          px: 1.5,
          py: 0.75,
          borderRadius: 999,
          cursor: expanded ? "default" : "pointer",
          outline: "none",
          "&:focus-visible": {
            boxShadow: "0 0 0 2px rgba(147,197,253,0.55)",
          },
        }}
      >
        {/* ── Fixed left: icon cluster + divider ──────────────────────── */}
        <IconCluster />
        <Divider />

        {/* ── Right: collapsed label+arrow  OR  expanded realm row ──── */}
        <AnimatePresence initial={false} mode="popLayout">
          {!expanded ? (
            <Box
              key="collapsed"
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              sx={{ display: "inline-flex", alignItems: "center", gap: "2px" }}
            >
              <RealmLabel label={activeTab.label} active onClick={() => setExpanded(true)} />
              <Chevron />
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
                <Box key={tab.id} sx={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
                  {i > 0 && <Chevron dim />}
                  <RealmLabel
                    label={tab.label}
                    active={tab.id === activeMap}
                    onClick={() => handleSelect(tab.id)}
                  />
                </Box>
              ))}
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}

export default MapSwitcher;

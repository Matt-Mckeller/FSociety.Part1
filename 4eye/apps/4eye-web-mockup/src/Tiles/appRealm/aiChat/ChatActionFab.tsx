"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Box, ButtonBase, ClickAwayListener, Tooltip, Typography } from "@mui/material";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import {
  ActionOrb,
  ORB_SIZES,
  RAIL_PILL_BACKGROUND,
  RAIL_PILL_SIZE,
  useRailPreferences,
  type OrbItem,
} from "@expanse/hud";

/**
 * ChatActionFab — one rail FAB that fans its orbs out around it.
 *
 * Collapsed it is a single chat button matching the profile/settings
 * pills. Open (click or hover) the chat actions pop out in a left-down
 * arc so they stay on-screen from the right rail and clear the profile
 * cluster above.
 */

const ORB_SIZE = ORB_SIZES.xs.button;
const RADIUS = 76;
/** Arc from slightly above-left (185°) to down-left (100°), CSS angles. */
const START_DEG = 185;
const END_DEG = 100;
const LEAVE_MS = 220;

function orbOffset(index: number, count: number) {
  const t = count <= 1 ? 0.5 : index / (count - 1);
  const deg = START_DEG + t * (END_DEG - START_DEG);
  const rad = (deg * Math.PI) / 180;
  const cx = RAIL_PILL_SIZE / 2;
  const cy = RAIL_PILL_SIZE / 2;
  return {
    x: cx + Math.cos(rad) * RADIUS - ORB_SIZE / 2,
    y: cy + Math.sin(rad) * RADIUS - ORB_SIZE / 2,
  };
}

const COLLAPSED = {
  x: (RAIL_PILL_SIZE - ORB_SIZE) / 2,
  y: (RAIL_PILL_SIZE - ORB_SIZE) / 2,
};

export function ChatActionFab({ items }: { items: OrbItem[] }) {
  const { labelsVisible } = useRailPreferences();
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const open = hovered || pinned;

  const cancelLeave = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
  };

  const closeFully = useCallback(() => {
    cancelLeave();
    setHovered(false);
    setPinned(false);
  }, []);

  useEffect(() => () => cancelLeave(), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFully();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeFully]);

  const handleEnter = () => {
    cancelLeave();
    setHovered(true);
  };

  const handleLeave = () => {
    cancelLeave();
    leaveTimer.current = setTimeout(() => setHovered(false), LEAVE_MS);
  };

  const handleFabClick = () => {
    setPinned((prev) => {
      if (!open) return true;
      if (prev) return false;
      return true;
    });
  };

  const hitLeft = RADIUS + ORB_SIZE / 2;
  const hitDown = RADIUS + ORB_SIZE / 2;
  const hitUp = 20;

  const trigger = (
    <ButtonBase
      aria-label="Chat actions"
      aria-expanded={open}
      aria-haspopup="true"
      onClick={handleFabClick}
      sx={{
        width: RAIL_PILL_SIZE,
        height: RAIL_PILL_SIZE,
        borderRadius: 2,
        background: RAIL_PILL_BACKGROUND,
        color: "common.white",
        boxShadow: open
          ? "0 0 0 2px rgba(255,255,255,0.35)"
          : "0 2px 8px rgba(0,0,0,0.35)",
        transition: "box-shadow 180ms ease, transform 180ms ease",
        transform: open ? "scale(1.04)" : "scale(1)",
        "& .MuiSvgIcon-root": { fontSize: 22 },
      }}
    >
      <ChatRoundedIcon />
    </ButtonBase>
  );

  return (
    <ClickAwayListener onClickAway={closeFully}>
      <Box
        role="group"
        aria-label="AI Chat actions"
        data-fab-id="ai-chat"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocusCapture={handleEnter}
        onBlurCapture={(e) => {
          const next = e.relatedTarget as Node | null;
          if (!next || !e.currentTarget.contains(next)) handleLeave();
        }}
        sx={{
          position: "relative",
          width: RAIL_PILL_SIZE,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "visible",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: RAIL_PILL_SIZE,
            height: RAIL_PILL_SIZE,
            overflow: "visible",
          }}
        >
          {open && (
            <Box
              aria-hidden
              sx={{
                position: "absolute",
                right: 0,
                top: -hitUp,
                width: RAIL_PILL_SIZE + hitLeft,
                height: RAIL_PILL_SIZE + hitDown + hitUp,
                zIndex: 0,
              }}
            />
          )}

          <Box sx={{ position: "relative", zIndex: 2 }}>
            {labelsVisible ? (
              trigger
            ) : (
              <Tooltip title={open ? "" : "Chat actions"} placement="left">
                {trigger}
              </Tooltip>
            )}
          </Box>

          <AnimatePresence>
            {open &&
              items.map((item, index) => {
                const pos = orbOffset(index, items.length);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ x: COLLAPSED.x, y: COLLAPSED.y, scale: 0.2, opacity: 0 }}
                    animate={{ x: pos.x, y: pos.y, scale: 1, opacity: 1 }}
                    exit={{
                      x: COLLAPSED.x,
                      y: COLLAPSED.y,
                      scale: 0.2,
                      opacity: 0,
                      transition: { type: "spring", stiffness: 520, damping: 28, delay: 0 },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 520,
                      damping: 24,
                      delay: index * 0.035,
                    }}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: ORB_SIZE,
                      height: ORB_SIZE,
                      zIndex: 3,
                    }}
                  >
                    <ActionOrb
                      icon={item.icon}
                      label={item.label}
                      size="xs"
                      variant="glass"
                      color={item.color || "default"}
                      disabled={item.disabled}
                      onClick={() => {
                        item.onClick?.();
                        closeFully();
                      }}
                    />
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </Box>

        {labelsVisible && (
          <Typography
            sx={{
              mt: 0.5,
              fontSize: 9,
              fontWeight: 600,
              lineHeight: 1,
              color: open ? "text.primary" : "text.secondary",
              letterSpacing: 0.3,
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            Chat
          </Typography>
        )}
      </Box>
    </ClickAwayListener>
  );
}

"use client";

/**
 * SeatedFourEye — a seated, forward-facing 4eye whose body hosts pipeline
 * sockets. Foundational pipelines sit on the spine; content and daily-life
 * layers use visor, throat, hands, heart, solar, and ground positions.
 *
 * Nodes are HTML overlays so they can host real MUI icons, slot-type shapes,
 * and animate with the cards that slide out beside them.
 */

import { Box, Tooltip, useTheme, alpha } from "@mui/material";
import type { ComponentType, MouseEvent } from "react";
import type { SvgIconProps } from "@mui/material";
import { motion } from "framer-motion";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import {
  SLOT_POSITION_XY,
  SLOT_TYPE_META,
  type SlotPosition,
  type SlotShape,
} from "./data";
import { SlotDisc } from "./SlotDisc";

export interface BodyNode {
  id: string;
  /** Owning socket — used when the node id is a pipeline id (filled). */
  slotId: string;
  color: string;
  Icon?: ComponentType<SvgIconProps>;
  label: string;
  position: SlotPosition;
  shape: SlotShape;
  empty?: boolean;
}

export interface SeatedFourEyeProps {
  nodes: BodyNode[];
  /** Currently highlighted node id (hover sync with the cards). */
  activeId?: string | null;
  onHoverNode?: (id: string | null) => void;
  onNodeClick?: (slotId: string, anchor: HTMLElement) => void;
  /** Delay (s) before the sockets light up — matches the card stagger. */
  litDelay?: number;
}

export type SpineNode = BodyNode;

const VIEWBOX_W = 200;
const VIEWBOX_H = 300;
const SPINE_X = 100;
const SPINE_TOP_Y = 92;
const SPINE_BOTTOM_Y = 178;

export function SeatedFourEye({
  nodes,
  activeId,
  onHoverNode,
  onNodeClick,
  litDelay = 0.2,
}: SeatedFourEyeProps) {
  const theme = useTheme();

  const headColor = theme.palette.primary.light ?? theme.palette.primary.main;
  const bodyColor = theme.palette.primary.main;
  const limbColor = alpha(theme.palette.primary.main, 0.5);
  const eyeGlow = theme.palette.info?.main ?? "#22d3ee";

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 300,
        mx: "auto",
        aspectRatio: `${VIEWBOX_W} / ${VIEWBOX_H}`,
      }}
    >
      <Box
        component="svg"
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        sx={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}
      >
        <defs>
          <radialGradient id="seat-eye-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={eyeGlow} stopOpacity={0.9} />
            <stop offset="60%" stopColor={eyeGlow} stopOpacity={0.25} />
            <stop offset="100%" stopColor={eyeGlow} stopOpacity={0} />
          </radialGradient>
          <linearGradient id="seat-spine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={alpha(eyeGlow, 0.0)} />
            <stop offset="20%" stopColor={alpha(eyeGlow, 0.55)} />
            <stop offset="80%" stopColor={alpha(eyeGlow, 0.55)} />
            <stop offset="100%" stopColor={alpha(eyeGlow, 0.0)} />
          </linearGradient>
        </defs>

        <line x1={SPINE_X} y1={32} x2={SPINE_X} y2={16} stroke={limbColor} strokeWidth={4} strokeLinecap="round" />
        <circle cx={SPINE_X} cy={12} r={6} fill={headColor} />

        <path
          d={`M ${SPINE_X - 14} 176 L 46 212 L ${SPINE_X} 230`}
          fill="none"
          stroke={limbColor}
          strokeWidth={28}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={`M ${SPINE_X + 14} 176 L 154 212 L ${SPINE_X} 230`}
          fill="none"
          stroke={limbColor}
          strokeWidth={28}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d={`M ${SPINE_X} 86 L ${SPINE_X} 182`}
          fill="none"
          stroke={bodyColor}
          strokeWidth={38}
          strokeLinecap="round"
        />

        <path
          d={`M ${SPINE_X - 18} 96 L 64 150 L 50 202`}
          fill="none"
          stroke={limbColor}
          strokeWidth={17}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={`M ${SPINE_X + 18} 96 L 136 150 L 150 202`}
          fill="none"
          stroke={limbColor}
          strokeWidth={17}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <line
          x1={SPINE_X}
          y1={SPINE_TOP_Y - 4}
          x2={SPINE_X}
          y2={SPINE_BOTTOM_Y + 4}
          stroke="url(#seat-spine)"
          strokeWidth={4}
          strokeLinecap="round"
        />

        <circle cx={SPINE_X} cy={56} r={28} fill={headColor} />
        <path
          d={`M 73 54 Q ${SPINE_X} 45 127 54`}
          fill="none"
          stroke={bodyColor}
          strokeWidth={9}
          strokeLinecap="round"
          opacity={0.9}
        />
        <circle cx={SPINE_X} cy={55} r={19} fill="url(#seat-eye-glow)" />
        <circle cx={SPINE_X} cy={55} r={8.5} fill={eyeGlow} />
        <circle cx={SPINE_X} cy={55} r={3.5} fill="#ffffff" opacity={0.9} />
      </Box>

      {nodes.map((node, i) => {
        const xy = SLOT_POSITION_XY[node.position];
        const topPct = (xy.y / VIEWBOX_H) * 100;
        const leftPct = (xy.x / VIEWBOX_W) * 100;
        const isActive = activeId == null || activeId === node.id;
        const { Icon } = node;
        const typeMeta = Object.values(SLOT_TYPE_META).find((m) => m.shape === node.shape);
        return (
          <Tooltip
            key={node.id}
            title={`${node.label} · ${xy.label}${typeMeta ? ` · ${typeMeta.label} slot` : ""}${
              node.empty ? " — click to equip" : " — click to change or unequip"
            }`}
            arrow
          >
            <Box
              onMouseEnter={() => onHoverNode?.(node.id)}
              onMouseLeave={() => onHoverNode?.(null)}
              onClick={(e: MouseEvent<HTMLElement>) => onNodeClick?.(node.slotId, e.currentTarget)}
              role={onNodeClick ? "button" : undefined}
              tabIndex={onNodeClick ? 0 : undefined}
              aria-label={
                node.empty
                  ? `Empty ${node.label} — click to equip`
                  : `${node.label} — click to change or unequip`
              }
              onKeyDown={(e) => {
                if (!onNodeClick) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onNodeClick(node.slotId, e.currentTarget);
                }
              }}
              sx={{
                position: "absolute",
                top: `${topPct}%`,
                left: `${leftPct}%`,
                transform: "translate(-50%, -50%)",
                width: 0,
                height: 0,
                cursor: onNodeClick ? "pointer" : "default",
                outline: "none",
                "&:focus-visible": {
                  outline: `2px solid ${node.color}`,
                  outlineOffset: 18,
                },
              }}
            >
              {!node.empty && (
                <Box
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.9, 2.2] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    delay: litDelay + i * 0.25,
                    ease: "easeOut",
                  }}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 44,
                    height: 44,
                    marginTop: "-22px",
                    marginLeft: "-22px",
                    borderRadius: "50%",
                    border: `2px solid ${node.color}`,
                    pointerEvents: "none",
                  }}
                />
              )}
              <Box
                component={motion.div}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isActive && !node.empty ? [1, 1.08, 1] : 1,
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{
                  scale: { duration: 2.4, repeat: Infinity, delay: litDelay + i * 0.25, ease: "easeInOut" },
                  opacity: { duration: 0.3 },
                }}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-20px",
                  marginLeft: "-20px",
                }}
              >
                <SlotDisc
                  shape={node.shape}
                  color={node.empty ? (theme.palette.text.disabled as string) : node.color}
                  size={40}
                  empty={node.empty}
                  active={isActive}
                >
                  {Icon && !node.empty ? (
                    <Icon sx={{ fontSize: 18 }} />
                  ) : (
                    <AddRoundedIcon sx={{ fontSize: 16 }} />
                  )}
                </SlotDisc>
              </Box>
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
}

"use client";
/**
 * HUD Template: Gaming RPG
 *
 * RPG-style gaming layout:
 * - Health/mana/stamina bars
 * - Minimap
 * - Quest tracker
 * - Hotbar (skills/items)
 * - Inventory orb
 * - XP bar
 * - Gold/currency display
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for RPG and action games.
 */

import React, { useState, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  LinearProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BoltIcon from "@mui/icons-material/Bolt";
import InventoryIcon from "@mui/icons-material/Inventory2";
import MapIcon from "@mui/icons-material/Map";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StarIcon from "@mui/icons-material/Star";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import { ActionOrb, OrbCluster } from "../../../hud-components/orbs";
import type { OrbItem } from "../../../hud-components/orbs";

// =============================================================================
// Types
// =============================================================================

export interface QuestObjective {
  id: string;
  text: string;
  completed: boolean;
  current?: number;
  target?: number;
}

export interface Quest {
  id: string;
  title: string;
  objectives: QuestObjective[];
}

export interface HotbarSlot {
  id: string;
  icon: ReactNode;
  label: string;
  hotkey: string;
  cooldown?: number; // 0-100%
  disabled?: boolean;
}

export interface HudGamingRpgProps {
  children?: ReactNode;
  health?: number;
  healthMax?: number;
  mana?: number;
  manaMax?: number;
  stamina?: number;
  staminaMax?: number;
  xp?: number;
  xpMax?: number;
  level?: number;
  gold?: number;
  activeQuest?: Quest;
  hotbarSlots?: HotbarSlot[];
  minimapTiles?: Array<{ x: number; y: number; label?: string }>;
  currentPosition?: { x: number; y: number };
  onHotbarUse?: (slotId: string) => void;
  onInventoryOpen?: () => void;
  onMapOpen?: () => void;
  onQuestClick?: (questId: string) => void;
}

// =============================================================================
// Sub-components
// =============================================================================

interface StatBarProps {
  value: number;
  max: number;
  color: string;
  icon: ReactNode;
  label: string;
  showText?: boolean;
}

function StatBar({ value, max, color, icon, label, showText = true }: StatBarProps) {
  const percent = max > 0 ? (value / max) * 100 : 0;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}>
      <Box sx={{ color, display: "flex", alignItems: "center" }}>{icon}</Box>
      <Box sx={{ flex: 1, position: "relative" }}>
        <LinearProgress
          variant="determinate"
          value={percent}
          sx={{
            height: 16,
            borderRadius: 1,
            bgcolor: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.1)",
            "& .MuiLinearProgress-bar": {
              bgcolor: color,
              backgroundImage: `linear-gradient(to bottom, ${color}, ${color}88)`,
            },
          }}
        />
        {showText && (
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontWeight: "bold",
              textShadow: "1px 1px 2px black",
              fontSize: "0.7rem",
            }}
          >
            {value} / {max}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

// =============================================================================
// Template Component
// =============================================================================

export function HudGamingRpg({
  children,
  health = 85,
  healthMax = 100,
  mana = 60,
  manaMax = 100,
  stamina = 100,
  staminaMax = 100,
  xp = 2500,
  xpMax = 5000,
  level = 15,
  gold = 1234,
  activeQuest,
  hotbarSlots = [],
  minimapTiles = [],
  currentPosition = { x: 2, y: 2 },
  onHotbarUse,
  onInventoryOpen,
  onMapOpen,
  onQuestClick,
}: HudGamingRpgProps) {
  const [showQuests, setShowQuests] = useState(true);

  const xpProgress = xpMax > 0 ? (xp / xpMax) * 100 : 0;

  const bgColor = "transparent";
  const textColor = "#ffffff";

  // Default hotbar if none provided
  const defaultHotbar: HotbarSlot[] = hotbarSlots.length > 0 ? hotbarSlots : [
    { id: "1", icon: <BoltIcon />, label: "Attack", hotkey: "1" },
    { id: "2", icon: <AutoAwesomeIcon />, label: "Fireball", hotkey: "2", cooldown: 30 },
    { id: "3", icon: <FavoriteIcon />, label: "Heal", hotkey: "3" },
    { id: "4", icon: <BoltIcon />, label: "Shield", hotkey: "4" },
    { id: "5", icon: <AutoAwesomeIcon />, label: "Dash", hotkey: "5", cooldown: 80 },
  ];

  // Utility orbs
  const utilityOrbs: OrbItem[] = [
    { id: "inventory", icon: <InventoryIcon />, label: "Inventory", color: "warning", hotkey: "I", onClick: onInventoryOpen },
    { id: "map", icon: <MapIcon />, label: "Map", color: "cyan", hotkey: "M", onClick: onMapOpen },
    { id: "quests", icon: <AssignmentIcon />, label: "Quests", color: "mint", hotkey: "J", onClick: () => setShowQuests(!showQuests) },
  ];

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: bgColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ================================================================= */}
      {/* TOP-LEFT: Health/Mana/Stamina Bars */}
      {/* ================================================================= */}
      <Paper
        sx={{
          position: "fixed",
          top: 24,
          left: 24,
          width: 260,
          p: 2,
          bgcolor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 2,
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <StatBar value={health} max={healthMax} color="#ef4444" icon={<FavoriteIcon sx={{ fontSize: 18 }} />} label="HP" />
          <StatBar value={mana} max={manaMax} color="#3b82f6" icon={<AutoAwesomeIcon sx={{ fontSize: 18 }} />} label="MP" />
          <StatBar value={stamina} max={staminaMax} color="#22c55e" icon={<BoltIcon sx={{ fontSize: 18 }} />} label="ST" showText={false} />
        </Box>

        {/* Level and Gold */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, pt: 1, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <StarIcon sx={{ color: "#fbbf24", fontSize: 18 }} />
            <Typography variant="body2" sx={{ color: textColor, fontWeight: "bold" }}>
              Lv. {level}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <MonetizationOnIcon sx={{ color: "#fbbf24", fontSize: 18 }} />
            <Typography variant="body2" sx={{ color: "#fbbf24", fontWeight: "bold" }}>
              {gold.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* ================================================================= */}
      {/* TOP-RIGHT: Minimap */}
      {/* ================================================================= */}
      <Paper
        sx={{
          position: "fixed",
          top: 24,
          right: 24,
          width: 180,
          height: 180,
          bgcolor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 2,
          overflow: "hidden",
          zIndex: 1000,
          p: 1,
        }}
      >
        {/* Simple grid-based minimap visualization */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 0.5,
            width: "100%",
            height: "100%",
          }}
        >
          {Array.from({ length: 25 }).map((_, i) => {
            const x = i % 5;
            const y = Math.floor(i / 5);
            const isCurrentPosition = currentPosition?.x === x && currentPosition?.y === y;
            const isExplored = minimapTiles.some((t) => t.x === x && t.y === y);
            return (
              <Box
                key={i}
                sx={{
                  bgcolor: isCurrentPosition
                    ? "#3b82f6"
                    : isExplored
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0,0,0,0.3)",
                  borderRadius: 0.5,
                  border: isCurrentPosition ? "2px solid #60a5fa" : "none",
                }}
              />
            );
          })}
        </Box>
      </Paper>

      {/* ================================================================= */}
      {/* RIGHT: Quest Tracker */}
      {/* ================================================================= */}
      {showQuests && activeQuest && (
        <Paper
          sx={{
            position: "fixed",
            top: 220,
            right: 24,
            width: 240,
            bgcolor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(5px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            zIndex: 999,
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
            }}
            onClick={() => onQuestClick?.(activeQuest.id)}
          >
            <Typography variant="caption" sx={{ color: "#fbbf24", textTransform: "uppercase" }}>
              Active Quest
            </Typography>
            <Typography variant="subtitle2" sx={{ color: textColor }}>
              {activeQuest.title}
            </Typography>
          </Box>
          <List dense sx={{ py: 0 }}>
            {activeQuest.objectives.map((obj) => (
              <ListItem key={obj.id} dense sx={{ py: 0.25 }}>
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <Checkbox
                    checked={obj.completed}
                    size="small"
                    sx={{ p: 0, color: "rgba(255,255,255,0.3)", "&.Mui-checked": { color: "#22c55e" } }}
                    disabled
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="caption"
                      sx={{
                        color: textColor,
                        opacity: obj.completed ? 0.5 : 1,
                        textDecoration: obj.completed ? "line-through" : "none",
                      }}
                    >
                      {obj.text}
                      {obj.target && ` (${obj.current ?? 0}/${obj.target})`}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* BOTTOM: Hotbar */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          p: 1,
          bgcolor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 2,
          zIndex: 1000,
        }}
      >
        {defaultHotbar.map((slot) => (
          <Box
            key={slot.id}
            sx={{
              position: "relative",
              width: 56,
              height: 56,
            }}
          >
            <IconButton
              onClick={() => onHotbarUse?.(slot.id)}
              disabled={slot.disabled}
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "rgba(255,255,255,0.05)",
                border: "2px solid rgba(255,255,255,0.2)",
                borderRadius: 1,
                color: textColor,
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)", borderColor: "primary.main" },
                "&:disabled": { opacity: 0.5 },
              }}
            >
              {slot.icon}
            </IconButton>
            {/* Cooldown overlay */}
            {slot.cooldown !== undefined && slot.cooldown > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: "rgba(0,0,0,0.7)",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <Typography variant="caption" sx={{ color: textColor, fontWeight: "bold" }}>
                  {Math.ceil(slot.cooldown / 10)}s
                </Typography>
              </Box>
            )}
            {/* Hotkey */}
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                bottom: 2,
                right: 4,
                color: textColor,
                opacity: 0.6,
                fontSize: "0.65rem",
                fontWeight: "bold",
              }}
            >
              {slot.hotkey}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ================================================================= */}
      {/* BOTTOM: XP Bar */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 24,
          bgcolor: "rgba(0,0,0,0.8)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          zIndex: 999,
        }}
      >
        <LinearProgress
          variant="determinate"
          value={xpProgress}
          sx={{
            height: "100%",
            bgcolor: "transparent",
            "& .MuiLinearProgress-bar": {
              bgcolor: "#a855f7",
              backgroundImage: "linear-gradient(to right, #a855f7, #6366f1)",
            },
          }}
        />
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: textColor,
            fontWeight: "bold",
            textShadow: "1px 1px 2px black",
          }}
        >
          {xp.toLocaleString()} / {xpMax.toLocaleString()} XP
        </Typography>
      </Box>

      {/* ================================================================= */}
      {/* BOTTOM-LEFT: Utility Orbs */}
      {/* ================================================================= */}
      <Box sx={{ position: "fixed", bottom: 40, left: 24, zIndex: 1000 }}>
        <OrbCluster
          items={utilityOrbs}
          pattern="bottom-row"
          size="md"
          variant="glass"
          colorMode="dark"
          hotkeyDisplay="badge"
          containerWidth={180}
          containerHeight={60}
        />
      </Box>

      {/* ================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ================================================================= */}
      {children ?? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography variant="h3" sx={{ color: textColor, opacity: 0.1 }}>
            Game World
          </Typography>
        </Box>
      )}
    </Box>
  );
}

"use client"
import React from "react"
import { Box, Typography, Paper, alpha, LinearProgress } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import {
  InventorySlot,
  InventorySlotItem,
  Rarity,
} from "./InventorySlot.component"

export type EquipmentSlotType =
  | "head"
  | "chest"
  | "hands"
  | "mainHand"
  | "offHand"

export interface EquipmentState {
  head?: InventorySlotItem | null
  chest?: InventorySlotItem | null
  hands?: InventorySlotItem | null
  mainHand?: InventorySlotItem | null
  offHand?: InventorySlotItem | null
}

export interface BoostBar {
  id: string
  label: string
  value: number // 0-100
  maxValue?: number
  color?: string
  icon?: string
}

export interface CharacterEquipmentDisplayProps {
  equipment: EquipmentState
  characterElement?: React.ReactNode
  onSlotClick?: (
    slotType: EquipmentSlotType,
    item: InventorySlotItem | null,
  ) => void
  onEquipItem?: (slotType: EquipmentSlotType, item: InventorySlotItem) => void
  selectedSlot?: EquipmentSlotType | null
  slotSize?: number
  characterScale?: number
  title?: string
  showSlotLabels?: boolean
  boostBars?: BoostBar[]
}

const slotLabels: Record<EquipmentSlotType, string> = {
  head: "Head",
  chest: "Chest",
  hands: "Hands",
  mainHand: "Main",
  offHand: "Off",
}

// Slot placeholder icons (simple text-based)
const slotIcons: Record<EquipmentSlotType, string> = {
  head: "👤",
  chest: "👕",
  hands: "🧤",
  mainHand: "⚔️",
  offHand: "🛡️",
}

export const CharacterEquipmentDisplay: React.FC<
  CharacterEquipmentDisplayProps
> = ({
  equipment,
  characterElement,
  onSlotClick,
  onEquipItem,
  selectedSlot,
  slotSize = 56,
  characterScale = 1,
  title = "Equipment",
  showSlotLabels = true,
  boostBars = [],
}) => {
  const theme = useTheme()

  const handleSlotClick =
    (slotType: EquipmentSlotType) => (item: InventorySlotItem | null) => {
      onSlotClick?.(slotType, item)
    }

  const handleEquipItem =
    (slotType: EquipmentSlotType) => (item: InventorySlotItem) => {
      onEquipItem?.(slotType, item)
    }

  const renderSlot = (slotType: EquipmentSlotType) => (
    <Box
      key={slotType}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      <InventorySlot
        item={equipment[slotType]}
        size={slotSize}
        isSelected={selectedSlot === slotType}
        slotLabel={slotIcons[slotType]}
        onClick={handleSlotClick(slotType)}
        onDoubleClick={handleEquipItem(slotType)}
      />
      {showSlotLabels && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5 }}
        >
          {slotLabels[slotType]}
        </Typography>
      )}
    </Box>
  )

  // Character display dimensions - based on actual SVG proportions
  // headLength: 33, armLength: 66, bodyLength: 99, legLength: 99
  // Total height: ~297 (3 * 99), Total width: ~105
  const baseCharacterHeight = 297 * characterScale
  const baseCharacterWidth = 105 * characterScale

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`,
        border: `1px solid ${theme.palette.divider}`,
        maxWidth: 400,
      }}
    >
      {/* Title */}
      {title && (
        <Typography
          variant="h6"
          textAlign="center"
          sx={{
            mb: 2,
            fontWeight: 600,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: theme.palette.text.secondary,
          }}
        >
          {title}
        </Typography>
      )}

      {/* Main Layout: Equipment slots on left, Character center, slots on right */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {/* Left Column: Head, Main Hand, Hands */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
          }}
        >
          {renderSlot("head")}
          {renderSlot("mainHand")}
          {renderSlot("hands")}
        </Box>

        {/* Center: Character */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: baseCharacterHeight * 0.7,
            minWidth: baseCharacterWidth * 1.2,
          }}
        >
          {characterElement || (
            <Box
              sx={{
                width: baseCharacterWidth,
                height: baseCharacterHeight * 0.7,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px dashed ${alpha(theme.palette.divider, 0.5)}`,
                borderRadius: 2,
                backgroundColor: alpha(theme.palette.action.hover, 0.1),
              }}
            >
              <Typography variant="caption" color="text.disabled">
                Character
              </Typography>
            </Box>
          )}
        </Box>

        {/* Right Column: Chest, Off Hand */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
          }}
        >
          {renderSlot("chest")}
          {renderSlot("offHand")}
        </Box>
      </Box>

      {/* Boost/Power-up Bars */}
      {boostBars.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              mb: 1,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Active Boosts
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {boostBars.map((boost) => (
              <Box key={boost.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 0.5,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    {boost.icon && <span>{boost.icon}</span>}
                    {boost.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {boost.value}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={boost.value}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: alpha(theme.palette.divider, 0.3),
                    "& .MuiLinearProgress-bar": {
                      backgroundColor:
                        boost.color || theme.palette.primary.main,
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  )
}

export default CharacterEquipmentDisplay

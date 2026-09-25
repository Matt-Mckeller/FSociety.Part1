"use client"
import React from "react"
import { Box, Typography, Paper, alpha, Stack, Divider } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { InventorySlot, InventorySlotItem } from "./InventorySlot.component"
import {
  CharacterEquipmentDisplay,
  EquipmentState,
  EquipmentSlotType,
  BoostBar,
} from "./CharacterEquipmentDisplay.component"

export interface EquippedItemsBarProps {
  items: (InventorySlotItem | null)[]
  slotSize?: number
  maxSlots?: number
  title?: string
  onSlotClick?: (item: InventorySlotItem | null, index: number) => void
  onItemDoubleClick?: (item: InventorySlotItem, index: number) => void
  selectedIndex?: number | null
}

export const EquippedItemsBar: React.FC<EquippedItemsBarProps> = ({
  items,
  slotSize = 48,
  maxSlots = 6,
  title = "Quick Slots",
  onSlotClick,
  onItemDoubleClick,
  selectedIndex = null,
}) => {
  const theme = useTheme()

  // Pad items to fill maxSlots
  const paddedItems = [...items]
  while (paddedItems.length < maxSlots) {
    paddedItems.push(null)
  }

  return (
    <Box>
      {title && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "block",
            mb: 1,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          gap: 0.5,
          justifyContent: "center",
          p: 1,
          borderRadius: 1,
          backgroundColor: alpha(theme.palette.background.paper, 0.5),
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        {paddedItems.slice(0, maxSlots).map((item, index) => (
          <Box key={item?.id || `slot-${index}`} sx={{ position: "relative" }}>
            <InventorySlot
              item={item}
              size={slotSize}
              isSelected={selectedIndex === index}
              slotLabel={`${index + 1}`}
              onClick={() => onSlotClick?.(item, index)}
              onDoubleClick={
                item ? () => onItemDoubleClick?.(item, index) : undefined
              }
            />
            {/* Hotkey indicator */}
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                bottom: -14,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 9,
                color: theme.palette.text.disabled,
                fontWeight: "bold",
              }}
            >
              {index + 1}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export interface ProfileEquipmentPanelProps {
  // Character & Equipment
  equipment: EquipmentState
  characterElement?: React.ReactNode
  onEquipmentSlotClick?: (
    slotType: EquipmentSlotType,
    item: InventorySlotItem | null,
  ) => void
  selectedEquipmentSlot?: EquipmentSlotType | null

  // Quick Slots / Equipped Items
  equippedItems?: (InventorySlotItem | null)[]
  onEquippedItemClick?: (item: InventorySlotItem | null, index: number) => void
  selectedEquippedIndex?: number | null

  // Boosts
  boostBars?: BoostBar[]

  // Display Options
  playerName?: string
  playerLevel?: number
  slotSize?: number
  showQuickSlots?: boolean
}

export const ProfileEquipmentPanel: React.FC<ProfileEquipmentPanelProps> = ({
  equipment,
  characterElement,
  onEquipmentSlotClick,
  selectedEquipmentSlot,
  equippedItems = [],
  onEquippedItemClick,
  selectedEquippedIndex,
  boostBars = [],
  playerName = "Player",
  playerLevel = 1,
  slotSize = 52,
  showQuickSlots = true,
}) => {
  const theme = useTheme()

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
        border: `1px solid ${theme.palette.divider}`,
        maxWidth: 420,
      }}
    >
      {/* Header with Player Info */}
      <Box
        sx={{
          p: 2,
          background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            color: theme.palette.text.primary,
          }}
        >
          {playerName}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            color: theme.palette.text.secondary,
          }}
        >
          Level {playerLevel}
        </Typography>
      </Box>

      {/* Equipment Display */}
      <Box sx={{ p: 2 }}>
        <CharacterEquipmentDisplay
          equipment={equipment}
          characterElement={characterElement}
          onSlotClick={onEquipmentSlotClick}
          selectedSlot={selectedEquipmentSlot}
          slotSize={slotSize}
          title=""
          boostBars={boostBars}
        />
      </Box>

      {/* Quick Slots Bar */}
      {showQuickSlots && (
        <>
          <Divider />
          <Box sx={{ p: 2 }}>
            <EquippedItemsBar
              items={equippedItems}
              slotSize={slotSize - 8}
              maxSlots={6}
              title="Quick Slots"
              onSlotClick={onEquippedItemClick}
              selectedIndex={selectedEquippedIndex}
            />
          </Box>
        </>
      )}
    </Paper>
  )
}

export default ProfileEquipmentPanel

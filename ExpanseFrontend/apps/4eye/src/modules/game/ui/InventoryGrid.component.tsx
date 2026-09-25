"use client"
import React from "react"
import { Box, Typography, Paper, alpha } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { InventorySlot, InventorySlotItem } from "./InventorySlot.component"

export interface InventoryGridProps {
  items: (InventorySlotItem | null)[]
  columns?: number
  rows?: number
  slotSize?: number
  gap?: number
  title?: string
  selectedIndex?: number | null
  onSlotClick?: (item: InventorySlotItem | null, index: number) => void
  onItemDoubleClick?: (item: InventorySlotItem, index: number) => void
  showEmptySlots?: boolean
  maxSlots?: number
}

export const InventoryGrid: React.FC<InventoryGridProps> = ({
  items,
  columns = 5,
  rows,
  slotSize = 56,
  gap = 4,
  title = "Inventory",
  selectedIndex = null,
  onSlotClick,
  onItemDoubleClick,
  showEmptySlots = true,
  maxSlots,
}) => {
  const theme = useTheme()

  // Calculate total slots
  const totalSlots =
    maxSlots ?? (rows ? columns * rows : Math.max(items.length, columns * 4))

  // Ensure items array is padded to fill grid
  const paddedItems: (InventorySlotItem | null)[] = [...items]
  while (showEmptySlots && paddedItems.length < totalSlots) {
    paddedItems.push(null)
  }

  const displayItems = showEmptySlots ? paddedItems.slice(0, totalSlots) : items

  const handleSlotClick =
    (index: number) => (item: InventorySlotItem | null) => {
      onSlotClick?.(item, index)
    }

  const handleItemDoubleClick =
    (index: number) => (item: InventorySlotItem) => {
      onItemDoubleClick?.(item, index)
    }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        background: alpha(theme.palette.background.paper, 0.95),
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {title && (
        <Typography
          variant="subtitle2"
          sx={{
            mb: 1.5,
            fontWeight: 600,
            letterSpacing: 0.5,
            textTransform: "uppercase",
            color: theme.palette.text.secondary,
          }}
        >
          {title}
        </Typography>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, ${slotSize}px)`,
          gap: `${gap}px`,
        }}
      >
        {displayItems.map((item, index) => (
          <InventorySlot
            key={item?.id || `empty-${index}`}
            item={item}
            size={slotSize}
            isSelected={selectedIndex === index}
            onClick={handleSlotClick(index)}
            onDoubleClick={handleItemDoubleClick(index)}
          />
        ))}
      </Box>

      {/* Item count display */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mt: 1, textAlign: "right" }}
      >
        {items.filter(Boolean).length} / {totalSlots} slots
      </Typography>
    </Paper>
  )
}

export default InventoryGrid

"use client"
import React from "react"
import { Box, Tooltip, Typography, alpha } from "@mui/material"
import { useTheme } from "@mui/material/styles"

export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary"

export interface InventorySlotItem {
  id: string
  name: string
  description?: string
  rarity?: Rarity
  quantity?: number
  iconUrl?: string
  category?: string
}

export interface InventorySlotProps {
  item?: InventorySlotItem | null
  size?: number // pixel size (default 64)
  isSelected?: boolean
  isEquipped?: boolean
  slotLabel?: string // e.g., "Head", "Chest"
  placeholderIcon?: React.ReactNode
  onClick?: (item: InventorySlotItem | null) => void
  onDoubleClick?: (item: InventorySlotItem) => void
  disabled?: boolean
  showQuantity?: boolean
  showRarity?: boolean
}

const rarityColors: Record<Rarity, string> = {
  common: "#9E9E9E",
  uncommon: "#4CAF50",
  rare: "#2196F3",
  epic: "#9C27B0",
  legendary: "#FF9800",
}

const rarityGlow: Record<Rarity, string> = {
  common: "none",
  uncommon: "none",
  rare: "0 0 8px rgba(33, 150, 243, 0.5)",
  epic: "0 0 10px rgba(156, 39, 176, 0.6)",
  legendary: "0 0 12px rgba(255, 152, 0, 0.7)",
}

export const InventorySlot: React.FC<InventorySlotProps> = ({
  item,
  size = 64,
  isSelected = false,
  isEquipped = false,
  slotLabel,
  placeholderIcon,
  onClick,
  onDoubleClick,
  disabled = false,
  showQuantity = true,
  showRarity = true,
}) => {
  const theme = useTheme()
  const hasItem = !!item
  const rarity = item?.rarity || "common"
  const borderColor =
    hasItem && showRarity ? rarityColors[rarity] : theme.palette.divider
  const boxShadow = hasItem && showRarity ? rarityGlow[rarity] : "none"

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(item || null)
    }
  }

  const handleDoubleClick = () => {
    if (!disabled && onDoubleClick && item) {
      onDoubleClick(item)
    }
  }

  const slotContent = (
    <Box
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      sx={{
        width: size,
        height: size,
        borderRadius: 1,
        border: `2px solid ${borderColor}`,
        backgroundColor: hasItem
          ? alpha(theme.palette.background.paper, 0.9)
          : alpha(theme.palette.action.hover, 0.3),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        boxShadow: isSelected
          ? `0 0 0 2px ${theme.palette.primary.main}, ${boxShadow}`
          : boxShadow,
        transition: "all 0.2s ease",
        "&:hover": disabled
          ? {}
          : {
              transform: "scale(1.05)",
              borderColor: theme.palette.primary.light,
            },
        // Equipped indicator
        ...(isEquipped && {
          "&::after": {
            content: '"✓"',
            position: "absolute",
            top: 2,
            right: 2,
            fontSize: 10,
            color: theme.palette.success.main,
            fontWeight: "bold",
          },
        }),
      }}
    >
      {hasItem ? (
        <>
          {/* Item Icon */}
          {item.iconUrl ? (
            <Box
              component="img"
              src={item.iconUrl}
              alt={item.name}
              sx={{
                width: size * 0.7,
                height: size * 0.7,
                objectFit: "contain",
              }}
            />
          ) : (
            <Box
              sx={{
                width: size * 0.7,
                height: size * 0.7,
                backgroundColor: alpha(rarityColors[rarity], 0.3),
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: size * 0.2, fontWeight: "bold" }}
              >
                {item.name.charAt(0).toUpperCase()}
              </Typography>
            </Box>
          )}

          {/* Quantity Badge */}
          {showQuantity && item.quantity && item.quantity > 1 && (
            <Box
              sx={{
                position: "absolute",
                bottom: 2,
                right: 2,
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                fontSize: 10,
                fontWeight: "bold",
                px: 0.5,
                borderRadius: 0.5,
                minWidth: 16,
                textAlign: "center",
              }}
            >
              {item.quantity}
            </Box>
          )}
        </>
      ) : (
        <>
          {/* Empty Slot */}
          {placeholderIcon || (
            <Box
              sx={{
                width: size * 0.5,
                height: size * 0.5,
                border: `1px dashed ${theme.palette.divider}`,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {slotLabel && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontSize: size * 0.12, textAlign: "center" }}
                >
                  {slotLabel}
                </Typography>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  )

  // Wrap with tooltip if item exists
  if (hasItem) {
    return (
      <Tooltip
        title={
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ color: rarityColors[rarity] }}
            >
              {item.name}
            </Typography>
            {item.description && (
              <Typography variant="caption" display="block">
                {item.description}
              </Typography>
            )}
            {item.rarity && (
              <Typography
                variant="caption"
                sx={{
                  color: rarityColors[rarity],
                  textTransform: "capitalize",
                }}
              >
                {item.rarity}
              </Typography>
            )}
          </Box>
        }
        placement="top"
        arrow
      >
        {slotContent}
      </Tooltip>
    )
  }

  return slotContent
}

export default InventorySlot

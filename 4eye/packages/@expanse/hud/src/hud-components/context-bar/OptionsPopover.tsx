"use client"

import React, { type ReactNode } from "react"
import {
  Popover,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"

export interface OptionsPopoverItem {
  id: string
  label: string
  description?: string
  icon?: ReactNode
  disabled?: boolean
}

export interface OptionsPopoverProps {
  open: boolean
  anchorEl: HTMLElement | null
  onClose: () => void
  items: OptionsPopoverItem[]
  selectedId?: string | null
  onSelect: (id: string) => void
  /** Optional title shown at the top of the popover. */
  title?: string
  /** Message to show when items list is empty. */
  emptyMessage?: string
}

/**
 * Shared dropdown popover used by ContextBar buttons.
 * Renders a list of selectable options with a check on the active one.
 */
export function OptionsPopover({
  open,
  anchorEl,
  onClose,
  items,
  selectedId,
  onSelect,
  title,
  emptyMessage = "No options available",
}: OptionsPopoverProps) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      slotProps={{
        paper: {
          sx: {
            mt: 0.5,
            minWidth: 220,
            maxWidth: 320,
            borderRadius: 1.5,
          },
        },
      }}
    >
      {title && (
        <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
          <Typography
            variant="overline"
            sx={{ fontSize: 11, opacity: 0.6, letterSpacing: 0.8 }}
          >
            {title}
          </Typography>
        </Box>
      )}

      {items.length === 0 ? (
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            {emptyMessage}
          </Typography>
        </Box>
      ) : (
        <List dense disablePadding sx={{ py: 0.5 }}>
          {items.map((item) => {
            const isSelected = selectedId === item.id
            return (
              <ListItemButton
                key={item.id}
                disabled={item.disabled}
                selected={isSelected}
                onClick={() => {
                  onSelect(item.id)
                  onClose()
                }}
              >
                {item.icon && (
                  <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
                    {item.icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={item.label}
                  secondary={item.description}
                  slotProps={{
                    primary: {
                      fontWeight: isSelected ? 600 : 500,
                    },
                    secondary: { fontSize: 11 },
                  }}
                />
                {isSelected && (
                  <CheckIcon fontSize="small" sx={{ ml: 1, opacity: 0.8 }} />
                )}
              </ListItemButton>
            )
          })}
        </List>
      )}
    </Popover>
  )
}

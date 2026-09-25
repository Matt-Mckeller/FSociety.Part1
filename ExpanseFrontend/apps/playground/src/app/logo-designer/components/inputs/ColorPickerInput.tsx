/**
 * Color Picker Input
 */

"use client"

import { Box, TextField, Typography, Popover, IconButton } from "@mui/material"
import { useState } from "react"

export interface ColorPickerInputProps {
  label: string
  value: string
  onChange: (color: string) => void
  disabled?: boolean
}

// Simple color palette
const COLOR_PALETTE = [
  '#ffffff', '#f5f5f5', '#e0e0e0', '#9e9e9e', '#616161', '#212121', '#000000',
  '#ffcdd2', '#ef9a9a', '#ef5350', '#e53935', '#c62828', '#b71c1c',
  '#f8bbd0', '#f48fb1', '#ec407a', '#d81b60', '#ad1457', '#880e4f',
  '#e1bee7', '#ce93d8', '#ab47bc', '#8e24aa', '#6a1b9a', '#4a148c',
  '#d1c4e9', '#b39ddb', '#7e57c2', '#5e35b1', '#4527a0', '#311b92',
  '#c5cae9', '#9fa8da', '#5c6bc0', '#3949ab', '#283593', '#1a237e',
  '#bbdefb', '#90caf9', '#42a5f5', '#1e88e5', '#1565c0', '#0d47a1',
  '#b3e5fc', '#81d4fa', '#29b6f6', '#039be5', '#0277bd', '#01579b',
  '#b2ebf2', '#80deea', '#26c6da', '#00acc1', '#00838f', '#006064',
  '#b2dfdb', '#80cbc4', '#26a69a', '#00897b', '#00695c', '#004d40',
  '#c8e6c9', '#a5d6a7', '#66bb6a', '#43a047', '#2e7d32', '#1b5e20',
  '#dcedc8', '#c5e1a5', '#9ccc65', '#7cb342', '#558b2f', '#33691e',
  '#fff9c4', '#fff59d', '#ffee58', '#fdd835', '#f9a825', '#f57f17',
  '#ffecb3', '#ffe082', '#ffca28', '#ffb300', '#ff8f00', '#ff6f00',
  '#ffe0b2', '#ffcc80', '#ffa726', '#fb8c00', '#ef6c00', '#e65100',
]

export function ColorPickerInput({ label, value, onChange, disabled }: ColorPickerInputProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [inputValue, setInputValue] = useState(value)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleColorSelect = (color: string) => {
    onChange(color)
    setInputValue(color)
    handleClose()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputBlur = () => {
    // Validate hex color
    const hex = inputValue.startsWith('#') ? inputValue : `#${inputValue}`
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      onChange(hex)
    } else {
      setInputValue(value)
    }
  }

  const open = Boolean(anchorEl)

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 0.5 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          onClick={handleClick}
          sx={{
            width: 36,
            height: 36,
            backgroundColor: value,
            borderRadius: 1,
            border: '2px solid',
            borderColor: 'divider',
            cursor: disabled ? 'default' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            '&:hover': disabled ? {} : {
              borderColor: 'primary.main',
            },
          }}
        />
        <TextField
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          size="small"
          disabled={disabled}
          placeholder="#ffffff"
          sx={{
            flex: 1,
            '& .MuiInputBase-input': {
              fontSize: '0.875rem',
              fontFamily: 'monospace',
            },
          }}
        />
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 1.5, width: 252 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 0.5,
            }}
          >
            {COLOR_PALETTE.map((color) => (
              <Box
                key={color}
                onClick={() => handleColorSelect(color)}
                sx={{
                  width: 28,
                  height: 28,
                  backgroundColor: color,
                  borderRadius: 0.5,
                  cursor: 'pointer',
                  border: color === value ? '2px solid' : '1px solid',
                  borderColor: color === value ? 'primary.main' : 'divider',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                  transition: 'transform 0.1s',
                }}
              />
            ))}
          </Box>
        </Box>
      </Popover>
    </Box>
  )
}

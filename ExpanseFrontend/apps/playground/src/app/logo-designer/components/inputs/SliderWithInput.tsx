/**
 * Slider with Input - Combined slider and number input
 */

"use client"

import { Box, Slider, TextField, Typography, IconButton, Tooltip } from "@mui/material"
import { Replay as ResetIcon } from "@mui/icons-material"
import { useState, useEffect } from "react"

export interface SliderWithInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  defaultValue?: number
  unit?: string
  marks?: { value: number; label: string }[]
  disabled?: boolean
}

export function SliderWithInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  defaultValue,
  unit = '',
  marks,
  disabled = false,
}: SliderWithInputProps) {
  const [inputValue, setInputValue] = useState(String(value))

  // Sync input with external value changes
  useEffect(() => {
    setInputValue(String(value))
  }, [value])

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const val = Array.isArray(newValue) ? newValue[0] : newValue
    onChange(val)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputBlur = () => {
    let val = parseFloat(inputValue)
    if (isNaN(val)) val = defaultValue ?? min
    val = Math.max(min, Math.min(max, val))
    onChange(val)
    setInputValue(String(val))
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputBlur()
    }
  }

  const handleReset = () => {
    if (defaultValue !== undefined) {
      onChange(defaultValue)
    }
  }

  const showReset = defaultValue !== undefined && value !== defaultValue

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <TextField
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            size="small"
            disabled={disabled}
            sx={{
              width: 70,
              '& .MuiInputBase-input': {
                textAlign: 'right',
                fontSize: '0.875rem',
                py: 0.5,
                px: 1,
              },
            }}
            InputProps={{
              endAdornment: unit ? (
                <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                  {unit}
                </Typography>
              ) : undefined,
            }}
          />
          {showReset && (
            <Tooltip title="Reset to default">
              <IconButton size="small" onClick={handleReset} disabled={disabled}>
                <ResetIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
      <Slider
        value={value}
        onChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
        marks={marks}
        disabled={disabled}
        sx={{
          '& .MuiSlider-markLabel': {
            fontSize: '0.7rem',
          },
        }}
      />
    </Box>
  )
}

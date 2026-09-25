"use client"

import React, { useState, useCallback } from "react"
import {
  TextField,
  InputAdornment,
  Box,
  Typography,
  useTheme,
} from "@mui/material"
import { Person, Check, Error as ErrorIcon } from "@mui/icons-material"

export interface DisplayNameInputProps {
  /** Current value */
  value: string
  /** Change handler */
  onChange: (value: string) => void
  /** Error state */
  error?: boolean
  /** Helper text or error message */
  helperText?: string
  /** Maximum character length */
  maxLength?: number
  /** Minimum character length */
  minLength?: number
  /** Disabled state */
  disabled?: boolean
  /** Show character count */
  showCharCount?: boolean
  /** Label text */
  label?: string
  /** Placeholder text */
  placeholder?: string
  /** Show success indicator when valid */
  showValidIndicator?: boolean
  /** Required field */
  required?: boolean
  /** Auto focus on mount */
  autoFocus?: boolean
  /** Full width styling */
  fullWidth?: boolean
  /** Size variant */
  size?: "small" | "medium"
}

/**
 * Validates display name according to rules
 */
function validateDisplayName(
  value: string,
  minLength: number,
  maxLength: number
): { isValid: boolean; message?: string } {
  if (value.length < minLength) {
    return {
      isValid: false,
      message: `Name must be at least ${minLength} characters`,
    }
  }
  if (value.length > maxLength) {
    return {
      isValid: false,
      message: `Name must be ${maxLength} characters or less`,
    }
  }
  // Check for disallowed characters (only allow letters, numbers, spaces, hyphens, apostrophes)
  const validPattern = /^[a-zA-Z0-9\s\-']+$/
  if (value && !validPattern.test(value)) {
    return {
      isValid: false,
      message: "Only letters, numbers, spaces, hyphens, and apostrophes allowed",
    }
  }
  return { isValid: true }
}

/**
 * DisplayNameInput component for editing user display names.
 * Includes validation, character count, and visual feedback.
 * 
 * Matches Expanse brand styling with proper MUI integration.
 */
export function DisplayNameInput({
  value,
  onChange,
  error: externalError,
  helperText: externalHelperText,
  maxLength = 50,
  minLength = 2,
  disabled = false,
  showCharCount = true,
  label = "Display Name",
  placeholder = "Enter your display name",
  showValidIndicator = true,
  required = false,
  autoFocus = false,
  fullWidth = true,
  size = "small",
}: DisplayNameInputProps) {
  const theme = useTheme()
  const [touched, setTouched] = useState(false)

  // Validate current value
  const validation = validateDisplayName(value, minLength, maxLength)
  const hasError = externalError || (touched && !validation.isValid)
  const helperText = externalHelperText || (touched && !validation.isValid ? validation.message : undefined)
  const isValid = touched && validation.isValid && value.length > 0

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      // Prevent exceeding max length
      if (newValue.length <= maxLength) {
        onChange(newValue)
      }
    },
    [onChange, maxLength]
  )

  const handleBlur = useCallback(() => {
    setTouched(true)
  }, [])

  // Icon for input adornment
  const getIconColor = () => {
    if (hasError) return theme.palette.error.main
    if (isValid) return theme.palette.success.main
    return theme.palette.text.primary
  }

  const fieldIcon = (
    <Person
      sx={{
        color: getIconColor(),
        height: "18px",
        width: "18px",
        transition: "color 0.2s ease-in-out",
      }}
    />
  )

  // Status indicator
  const StatusIndicator = () => {
    if (!showValidIndicator || !touched) return null
    
    if (isValid) {
      return (
        <Check
          sx={{
            color: theme.palette.success.main,
            fontSize: 20,
          }}
        />
      )
    }
    if (hasError) {
      return (
        <ErrorIcon
          sx={{
            color: theme.palette.error.main,
            fontSize: 20,
          }}
        />
      )
    }
    return null
  }

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        id="display-name-input"
        label={label}
        size={size}
        aria-describedby="display-name-input-helper"
        placeholder={placeholder}
        autoFocus={autoFocus}
        required={required}
        fullWidth={fullWidth}
        disabled={disabled}
        color={theme.palette.mode === "dark" ? "info" : "primary"}
        variant="outlined"
        error={hasError}
        helperText={helperText}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box height="18px" width="18px">
                {fieldIcon}
              </Box>
            </InputAdornment>
          ),
          endAdornment: showValidIndicator && touched && (
            <InputAdornment position="end">
              <StatusIndicator />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            transition: "border-color 0.2s ease-in-out",
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: isValid ? theme.palette.success.main : undefined,
              },
            },
          },
        }}
      />
      
      {/* Character count */}
      {showCharCount && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 0.5,
            mr: 1.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color:
                value.length > maxLength * 0.9
                  ? value.length >= maxLength
                    ? theme.palette.error.main
                    : theme.palette.warning.main
                  : theme.palette.text.secondary,
            }}
          >
            {value.length}/{maxLength}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default DisplayNameInput

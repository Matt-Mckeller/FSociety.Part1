"use client"

import React, { useCallback, useState, type KeyboardEvent } from "react"
import { Box, InputBase, useTheme, alpha } from "@mui/material"
import MicIcon from "@mui/icons-material/Mic"
import MicOffIcon from "@mui/icons-material/MicOff"
import CameraAltIcon from "@mui/icons-material/CameraAlt"
import LanguageIcon from "@mui/icons-material/Language"
import SendIcon from "@mui/icons-material/Send"
import { ActionBar } from "../action-bars"
import type { ActionBarProps } from "../action-bars"
import { ActionButton } from "../action-button"

// =============================================================================
// Types
// =============================================================================

export interface AIInputBarProps
  extends Omit<ActionBarProps, "children" | "orientation"> {
  /** Controlled value of the text field */
  value?: string
  /** Initial value (uncontrolled) */
  defaultValue?: string
  /** Called whenever the text changes */
  onChange?: (value: string) => void
  /** Called when the user submits (Enter or send button) */
  onSubmit?: (value: string) => void
  /** Called when the mic toggle changes */
  onMicToggle?: (recording: boolean) => void
  /** Called when the camera button is clicked */
  onCameraClick?: () => void
  /** Called when the language button is clicked */
  onLanguageClick?: () => void
  /** Whether mic is currently recording (controlled) */
  recording?: boolean
  /** Placeholder for the text field */
  placeholder?: string
  /** Disable the entire bar */
  disabled?: boolean
  /** Show the camera button. @default true */
  showCamera?: boolean
  /** Show the language button. @default true */
  showLanguage?: boolean
  /** Min width of the bar (px). @default 480 */
  minWidth?: number
}

// =============================================================================
// Component
// =============================================================================

/**
 * AIInputBar — chat-style input bar for AI interaction.
 *
 * Combines mic toggle, camera, inline text field, language picker, and send.
 * Use inside an `ActionDock` to anchor it (e.g. bottom-center).
 *
 * @example
 * ```tsx
 * <ActionDock position="bottom-center">
 *   <AIInputBar onSubmit={(text) => sendToAI(text)} />
 * </ActionDock>
 * ```
 */
export function AIInputBar({
  value: controlledValue,
  defaultValue = "",
  onChange,
  onSubmit,
  onMicToggle,
  onCameraClick,
  onLanguageClick,
  recording: controlledRecording,
  placeholder = "Ask 4eye…",
  disabled = false,
  showCamera = true,
  showLanguage = true,
  minWidth = 480,
  variant = "frosted",
  shape = "pill",
  thickness = "lg",
  ...rest
}: AIInputBarProps) {
  const theme = useTheme()
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [internalRecording, setInternalRecording] = useState(false)

  const isValueControlled = controlledValue !== undefined
  const value = isValueControlled ? (controlledValue ?? "") : internalValue

  const isRecordingControlled = controlledRecording !== undefined
  const recording = isRecordingControlled ? !!controlledRecording : internalRecording

  const handleChange = useCallback(
    (next: string) => {
      if (!isValueControlled) setInternalValue(next)
      onChange?.(next)
    },
    [isValueControlled, onChange]
  )

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim()
    if (!trimmed) return
    onSubmit?.(trimmed)
    if (!isValueControlled) setInternalValue("")
  }, [value, onSubmit, isValueControlled])

  const handleMic = useCallback(() => {
    const next = !recording
    if (!isRecordingControlled) setInternalRecording(next)
    onMicToggle?.(next)
  }, [recording, isRecordingControlled, onMicToggle])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    },
    [handleSubmit]
  )

  const canSubmit = value.trim().length > 0 && !disabled

  return (
    <ActionBar
      variant={variant}
      shape={shape}
      thickness={thickness}
      orientation="horizontal"
      length={{ pixels: minWidth }}
      disabled={disabled}
      {...rest}
    >
      <ActionButton
        icon={recording ? <MicOffIcon /> : <MicIcon />}
        iconOn={<MicOffIcon />}
        label={recording ? "Stop recording" : "Start recording"}
        onClick={handleMic}
        active={recording}
      />
      {showCamera && (
        <ActionButton
          icon={<CameraAltIcon />}
          label="Camera"
          onClick={onCameraClick}
        />
      )}

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          px: 1.5,
          mx: 0.5,
          borderRadius: 999,
          bgcolor: alpha(theme.palette.common.white, 0.08),
          "&:focus-within": {
            bgcolor: alpha(theme.palette.common.white, 0.14),
          },
        }}
      >
        <InputBase
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          fullWidth
          sx={{
            color: "common.white",
            fontSize: 14,
            "& input::placeholder": {
              color: alpha(theme.palette.common.white, 0.55),
              opacity: 1,
            },
          }}
        />
      </Box>

      {showLanguage && (
        <ActionButton
          icon={<LanguageIcon />}
          label="Language"
          onClick={onLanguageClick}
        />
      )}
      <ActionButton
        icon={<SendIcon />}
        label="Send"
        onClick={handleSubmit}
        disabled={!canSubmit}
      />
    </ActionBar>
  )
}

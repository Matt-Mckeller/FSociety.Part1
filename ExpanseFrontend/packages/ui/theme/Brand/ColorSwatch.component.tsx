"use client"

import React, { useState } from "react"
import { Box, Typography, Tooltip, IconButton, Chip } from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import CheckIcon from "@mui/icons-material/Check"
import {
  calculateContrast,
  getContrastTextColor,
  getWcagBadge,
  ContrastResult,
  parseColor,
} from "../utils/wcag-contrast"

interface ColorSwatchProps {
  /** The color value (hex, rgb, etc.) */
  color: string
  /** Display name for the color (e.g., "primary.main") */
  name: string
  /** Optional description */
  description?: string
  /** Show contrast against white background */
  showContrastWhite?: boolean
  /** Show contrast against black background */
  showContrastBlack?: boolean
  /** Size variant */
  size?: "small" | "medium" | "large"
}

/**
 * Validates if a color string is a valid CSS color that can be displayed
 */
function isValidColor(color: string | undefined | null): color is string {
  if (!color || typeof color !== "string" || color.trim() === "") {
    return false
  }
  // Check if it can be parsed as a valid color
  return parseColor(color) !== null
}

/**
 * ColorSwatch displays a color sample with its value, name, and accessibility information.
 * Includes copy-to-clipboard functionality.
 */
export function ColorSwatch({
  color,
  name,
  description,
  showContrastWhite = true,
  showContrastBlack = true,
  size = "medium",
}: ColorSwatchProps) {
  const [copied, setCopied] = useState(false)

  // Guard against invalid colors
  if (!isValidColor(color)) {
    return (
      <Box
        sx={{
          width: size === "small" ? 120 : size === "large" ? 200 : 160,
          borderRadius: 1,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "error.light",
          bgcolor: "background.paper",
          p: 1,
        }}
      >
        <Typography variant="caption" color="error" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography variant="caption" sx={{ display: "block", color: "text.secondary" }}>
          Invalid color: {String(color || "undefined")}
        </Typography>
      </Box>
    )
  }

  const textColor = getContrastTextColor(color)
  const contrastWhite = calculateContrast(color, "#FFFFFF")
  const contrastBlack = calculateContrast(color, "#000000")

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = color
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const sizeStyles = {
    small: { width: 120, swatchHeight: 60, fontSize: "0.7rem" },
    medium: { width: 160, swatchHeight: 80, fontSize: "0.75rem" },
    large: { width: 200, swatchHeight: 100, fontSize: "0.8rem" },
  }

  const { width, swatchHeight, fontSize } = sizeStyles[size]

  return (
    <Box
      sx={{
        width,
        borderRadius: 1,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      {/* Color Swatch */}
      <Box
        sx={{
          height: swatchHeight,
          bgcolor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Tooltip title={copied ? "Copied!" : "Copy color"}>
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{
              color: textColor,
              opacity: 0.8,
              "&:hover": { opacity: 1, bgcolor: "rgba(128,128,128,0.2)" },
            }}
          >
            {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Info Section */}
      <Box sx={{ p: 1 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            fontSize,
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            fontFamily: "monospace",
            fontSize,
            color: "text.secondary",
            display: "block",
          }}
        >
          {color.toUpperCase()}
        </Typography>

        {description && (
          <Typography
            variant="caption"
            sx={{ fontSize: "0.65rem", color: "text.secondary", display: "block" }}
          >
            {description}
          </Typography>
        )}

        {/* WCAG Contrast Info */}
        <Box sx={{ mt: 0.5, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {showContrastWhite && (
            <WcagBadge label="vs White" result={contrastWhite} />
          )}
          {showContrastBlack && (
            <WcagBadge label="vs Black" result={contrastBlack} />
          )}
        </Box>
      </Box>
    </Box>
  )
}

function WcagBadge({ label, result }: { label: string; result: ContrastResult }) {
  const badge = getWcagBadge(result)
  const isPass = result.aa.normal || result.aa.large

  return (
    <Tooltip
      title={
        <Box>
          <Typography variant="caption" display="block">
            Contrast: {result.ratioString}
          </Typography>
          <Typography variant="caption" display="block">
            AA Normal (4.5:1): {result.aa.normal ? "✓" : "✗"}
          </Typography>
          <Typography variant="caption" display="block">
            AA Large (3:1): {result.aa.large ? "✓" : "✗"}
          </Typography>
          <Typography variant="caption" display="block">
            AAA Normal (7:1): {result.aaa.normal ? "✓" : "✗"}
          </Typography>
        </Box>
      }
    >
      <Chip
        label={`${badge}`}
        size="small"
        color={isPass ? "success" : "error"}
        sx={{
          height: 18,
          fontSize: "0.6rem",
          "& .MuiChip-label": { px: 0.75 },
        }}
      />
    </Tooltip>
  )
}

/**
 * ColorSwatchGroup displays a group of color swatches with a title
 */
export function ColorSwatchGroup({
  title,
  colors,
  size = "medium",
}: {
  title: string
  colors: Array<{ name: string; color: string; description?: string }>
  size?: "small" | "medium" | "large"
}) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {colors.map((colorInfo) => (
          <ColorSwatch
            key={colorInfo.name}
            name={colorInfo.name}
            color={colorInfo.color}
            description={colorInfo.description}
            size={size}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ColorSwatch

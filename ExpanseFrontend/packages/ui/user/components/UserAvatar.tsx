"use client"

import React, { useRef, useState, useCallback } from "react"
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material"
import {
  Person,
  CameraAlt,
  EmojiEvents,
} from "@mui/icons-material"

export type UserAvatarSize = "small" | "medium" | "large" | "xlarge"
export type UserAvatarVariant = "default" | "bordered" | "expanding"

const sizeMap: Record<UserAvatarSize, number> = {
  small: 32,
  medium: 64,
  large: 128,
  xlarge: 180,
}

const iconSizeMap: Record<UserAvatarSize, number> = {
  small: 18,
  medium: 32,
  large: 64,
  xlarge: 90,
}

export interface UserAvatarProps {
  /** Image source URL */
  src?: string | null
  /** User's name for alt text and initials fallback */
  name?: string
  /** Size variant */
  size?: UserAvatarSize
  /** Enable upload/edit functionality */
  editable?: boolean
  /** Callback when file is selected for upload */
  onUpload?: (file: File) => void
  /** User level for badge display */
  level?: number
  /** Show level badge */
  showBadge?: boolean
  /** Visual variant */
  variant?: UserAvatarVariant
  /** Show loading state */
  isLoading?: boolean
  /** Error message to display */
  error?: string
}

/**
 * Get initials from a name string
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

/**
 * UserAvatar component for displaying user profile images
 * with optional editing, level badges, and various visual variants.
 * 
 * Follows Expanse brand aesthetic with geometric borders and 
 * optional gamification elements (level badge).
 */
export function UserAvatar({
  src,
  name = "",
  size = "medium",
  editable = false,
  onUpload,
  level,
  showBadge = false,
  variant = "default",
  isLoading = false,
  error,
}: UserAvatarProps) {
  const theme = useTheme()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)

  const avatarSize = sizeMap[size]
  const iconSize = iconSizeMap[size]

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file && onUpload) {
        // Create preview
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewSrc(reader.result as string)
        }
        reader.readAsDataURL(file)
        onUpload(file)
      }
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    },
    [onUpload]
  )

  const handleClick = useCallback(() => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [editable])

  // Determine display source
  const displaySrc = previewSrc || src

  // Border styling based on variant
  const getBorderStyles = () => {
    const baseRadius = "50%"
    switch (variant) {
      case "bordered":
        return {
          border: `3px solid ${theme.palette.primary.main}`,
          borderRadius: baseRadius,
        }
      case "expanding":
        return {
          border: `2px solid ${theme.palette.primary.light}`,
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: "2px",
          borderRadius: baseRadius,
        }
      default:
        return {
          borderRadius: baseRadius,
        }
    }
  }

  // Level badge component
  const LevelBadge = () => (
    <Box
      sx={{
        position: "absolute",
        bottom: size === "small" ? -4 : 0,
        right: size === "small" ? -4 : 0,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: "50%",
        width: size === "small" ? 16 : size === "medium" ? 24 : 32,
        height: size === "small" ? 16 : size === "medium" ? 24 : 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `2px solid ${theme.palette.background.paper}`,
        boxShadow: theme.shadows[2],
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontSize: size === "small" ? "0.6rem" : size === "medium" ? "0.7rem" : "0.85rem",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {level}
      </Typography>
    </Box>
  )

  // Edit overlay component
  const EditOverlay = () => (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "50%",
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.2s ease-in-out",
        cursor: "pointer",
      }}
    >
      <CameraAlt
        sx={{
          color: "#FFFFFF",
          fontSize: iconSize * 0.5,
        }}
      />
    </Box>
  )

  // Avatar content
  const avatarContent = (
    <Box
      sx={{
        position: "relative",
        width: avatarSize,
        height: avatarSize,
        ...getBorderStyles(),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <Avatar
        src={displaySrc || undefined}
        alt={name || "User avatar"}
        sx={{
          width: avatarSize,
          height: avatarSize,
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.dark,
          fontSize: avatarSize * 0.4,
          fontWeight: 600,
          cursor: editable ? "pointer" : "default",
        }}
      >
        {!displaySrc && (
          name ? (
            getInitials(name)
          ) : (
            <Person sx={{ fontSize: iconSize }} />
          )
        )}
      </Avatar>

      {/* Loading overlay */}
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            borderRadius: "50%",
          }}
        >
          <CircularProgress
            size={iconSize * 0.6}
            sx={{ color: theme.palette.primary.contrastText }}
          />
        </Box>
      )}

      {/* Edit overlay */}
      {editable && !isLoading && <EditOverlay />}

      {/* Level badge */}
      {showBadge && level !== undefined && <LevelBadge />}

      {/* Hidden file input */}
      {editable && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: "none" }}
          aria-label="Upload profile photo"
        />
      )}
    </Box>
  )

  // Wrap with tooltip if there's an error
  if (error) {
    return (
      <Tooltip title={error} arrow>
        <Box sx={{ display: "inline-block" }}>
          <Box
            sx={{
              ...getBorderStyles(),
              borderColor: theme.palette.error.main,
              outline: variant === "expanding" ? `2px solid ${theme.palette.error.light}` : undefined,
            }}
          >
            {avatarContent}
          </Box>
        </Box>
      </Tooltip>
    )
  }

  return avatarContent
}

export default UserAvatar

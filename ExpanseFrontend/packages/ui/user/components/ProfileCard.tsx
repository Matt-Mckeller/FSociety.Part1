"use client"

import React, { ReactNode } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  Tooltip,
  Divider,
  useTheme,
} from "@mui/material"
import {
  Edit,
  Settings,
  Logout,
  ExpandMore,
  ExpandLess,
  Email,
  CalendarMonth,
  Badge as BadgeIcon,
} from "@mui/icons-material"
import { UserAvatar, UserAvatarProps } from "./UserAvatar"
import { ProfileCompleteness, ProfileCompletenessItem } from "./ProfileCompleteness"

export type ProfileCardVariant = "compact" | "standard" | "expanded"

export interface ProfileCardProps {
  /** User's display name */
  displayName?: string
  /** User's email address */
  email?: string
  /** User's role or title */
  role?: string
  /** Avatar image source */
  avatarSrc?: string | null
  /** User level for gamification */
  level?: number
  /** Member since date */
  memberSince?: Date | string
  /** Last login date */
  lastLogin?: Date | string
  /** Card variant */
  variant?: ProfileCardVariant
  /** Show edit button */
  showEditButton?: boolean
  /** Show settings button */
  showSettingsButton?: boolean
  /** Show logout button */
  showLogoutButton?: boolean
  /** Edit button handler */
  onEdit?: () => void
  /** Settings button handler */
  onSettings?: () => void
  /** Logout handler */
  onLogout?: () => void
  /** Avatar upload handler */
  onAvatarUpload?: (file: File) => void
  /** Profile completeness items */
  completenessItems?: ProfileCompletenessItem[]
  /** Show completeness progress */
  showCompleteness?: boolean
  /** Custom action buttons */
  customActions?: ReactNode
  /** Additional stats to display */
  stats?: Array<{ label: string; value: string | number }>
  /** Expandable state (for compact variant) */
  expandable?: boolean
  /** Default expanded state */
  defaultExpanded?: boolean
}

/**
 * Format date for display
 */
function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

/**
 * ProfileCard component for displaying user profile information.
 * Supports multiple variants from compact (navigation) to expanded (full profile).
 * 
 * Includes gamification elements like level badges and profile completeness.
 * Follows Expanse brand aesthetic with geometric styling.
 */
export function ProfileCard({
  displayName = "User",
  email,
  role,
  avatarSrc,
  level,
  memberSince,
  lastLogin,
  variant = "standard",
  showEditButton = true,
  showSettingsButton = false,
  showLogoutButton = false,
  onEdit,
  onSettings,
  onLogout,
  onAvatarUpload,
  completenessItems,
  showCompleteness = false,
  customActions,
  stats,
  expandable = false,
  defaultExpanded = true,
}: ProfileCardProps) {
  const theme = useTheme()
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)

  // Avatar sizes based on variant
  const avatarSizeMap: Record<ProfileCardVariant, "small" | "medium" | "large" | "xlarge"> = {
    compact: "small",
    standard: "large",
    expanded: "xlarge",
  }

  const getHoverStyles = () => {
    if (!expandable) return {}
    return {
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(0, 0, 0, 0.02)",
    }
  }

  // Compact variant - minimal display for headers/navigation
  if (variant === "compact") {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 1,
          borderRadius: "7px",
          cursor: expandable ? "pointer" : "default",
          transition: "background-color 0.2s ease-in-out",
          "&:hover": getHoverStyles(),
        }}
        onClick={expandable ? () => setIsExpanded(!isExpanded) : undefined}
      >
        <UserAvatar
          src={avatarSrc}
          name={displayName}
          size="small"
          level={level}
          showBadge={!!level}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {displayName}
          </Typography>
          {role && (
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
              }}
            >
              {role}
            </Typography>
          )}
        </Box>
        {expandable && (
          <IconButton size="small" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </Box>
    )
  }

  // Standard and expanded variants
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: "7px",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Header with gradient background */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          p: variant === "expanded" ? 4 : 3,
          display: "flex",
          flexDirection: variant === "expanded" ? "column" : "row",
          alignItems: variant === "expanded" ? "center" : "flex-start",
          gap: 3,
        }}
      >
        {/* Avatar section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <UserAvatar
            src={avatarSrc}
            name={displayName}
            size={avatarSizeMap[variant]}
            level={level}
            showBadge={!!level}
            editable={!!onAvatarUpload}
            onUpload={onAvatarUpload}
            variant="bordered"
          />
        </Box>

        {/* Info section */}
        <Box
          sx={{
            flex: 1,
            textAlign: variant === "expanded" ? "center" : "left",
            minWidth: 0,
          }}
        >
          <Typography
            variant={variant === "expanded" ? "h4" : "h5"}
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.contrastText,
              mb: 0.5,
            }}
          >
            {displayName}
          </Typography>
          {role && (
            <Chip
              label={role}
              size="small"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: theme.palette.primary.contrastText,
                fontWeight: 500,
                mb: 1,
              }}
            />
          )}
          {email && variant === "expanded" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                mt: 1,
              }}
            >
              <Email
                sx={{
                  fontSize: 16,
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.9)" }}
              >
                {email}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Action buttons (standard variant) */}
        {variant === "standard" && (showEditButton || showSettingsButton) && (
          <Box sx={{ display: "flex", gap: 1 }}>
            {showEditButton && (
              <Tooltip title="Edit Profile">
                <IconButton
                  onClick={onEdit}
                  sx={{
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
            )}
            {showSettingsButton && (
              <Tooltip title="Settings">
                <IconButton
                  onClick={onSettings}
                  sx={{
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <Settings />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      </Box>

      {/* Body content */}
      <Box sx={{ p: 3 }}>
        {/* Stats grid (3 items for expanded) */}
        {variant === "expanded" && (stats || memberSince || lastLogin) && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              mb: 3,
              textAlign: "center",
            }}
          >
            {memberSince && (
              <Box>
                <CalendarMonth
                  sx={{ color: theme.palette.text.secondary, mb: 0.5 }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary, display: "block" }}
                >
                  Member Since
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  {formatDate(memberSince)}
                </Typography>
              </Box>
            )}
            {level !== undefined && (
              <Box>
                <BadgeIcon
                  sx={{ color: theme.palette.primary.main, mb: 0.5 }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary, display: "block" }}
                >
                  Level
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  {level}
                </Typography>
              </Box>
            )}
            {lastLogin && (
              <Box>
                <CalendarMonth
                  sx={{ color: theme.palette.text.secondary, mb: 0.5 }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary, display: "block" }}
                >
                  Last Login
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  {formatDate(lastLogin)}
                </Typography>
              </Box>
            )}
            {stats?.slice(0, 3 - (memberSince ? 1 : 0) - (level !== undefined ? 1 : 0) - (lastLogin ? 1 : 0)).map((stat, index) => (
              <Box key={index}>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary, display: "block" }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Profile completeness */}
        {showCompleteness && completenessItems && (
          <Box sx={{ mb: 3 }}>
            <ProfileCompleteness
              items={completenessItems}
              variant={variant === "expanded" ? "detailed" : "linear"}
              showChecklist={variant === "expanded"}
              size={variant === "expanded" ? "medium" : "small"}
            />
          </Box>
        )}

        {/* Standard variant - email and dates */}
        {variant === "standard" && (
          <Box sx={{ mb: 2 }}>
            {email && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Email sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
                <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                  {email}
                </Typography>
              </Box>
            )}
            {memberSince && (
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary, display: "block" }}
              >
                Member since {formatDate(memberSince)}
              </Typography>
            )}
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Action buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: variant === "expanded" ? "center" : "flex-start",
            flexWrap: "wrap",
          }}
        >
          {showEditButton && variant === "expanded" && (
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={onEdit}
              sx={{
                borderRadius: "7px",
              }}
            >
              Edit Profile
            </Button>
          )}
          {showSettingsButton && variant === "expanded" && (
            <Button
              variant="outlined"
              startIcon={<Settings />}
              onClick={onSettings}
              sx={{
                borderRadius: "7px",
              }}
            >
              Settings
            </Button>
          )}
          {showLogoutButton && (
            <Button
              variant="text"
              color="error"
              startIcon={<Logout />}
              onClick={onLogout}
              sx={{
                borderRadius: "7px",
              }}
            >
              Logout
            </Button>
          )}
          {customActions}
        </Box>
      </Box>
    </Paper>
  )
}

export default ProfileCard

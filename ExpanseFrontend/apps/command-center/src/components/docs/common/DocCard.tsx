/**
 * DocCard - Standard card component for displaying documentation items
 * Supports various layouts: simple, with icon, with chips, with actions
 */
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  IconButton,
  Tooltip,
} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'
import { useState } from 'react'

export interface DocCardProps {
  /** Card title */
  title: string
  /** Optional subtitle */
  subtitle?: string
  /** Main content/description */
  description?: string | ReactNode
  /** Optional icon (emoji or component) */
  icon?: string | ReactNode
  /** Optional chips/tags */
  chips?: Array<{
    label: string
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
    variant?: 'filled' | 'outlined'
  }>
  /** Optional accent color for the card */
  accentColor?: string
  /** Whether to show a copy button */
  copyable?: boolean
  /** Text to copy (if copyable) */
  copyText?: string
  /** Custom actions */
  actions?: ReactNode
  /** Card content */
  children?: ReactNode
  /** Click handler */
  onClick?: () => void
  /** Compact mode for smaller cards */
  compact?: boolean
  /** Additional sx overrides merged onto the root Card */
  sx?: SxProps<Theme>
}

/**
 * Versatile card component for documentation items
 * 
 * @example
 * ```tsx
 * <DocCard
 *   title="AI Tutor"
 *   description="Personalized learning assistant"
 *   icon="🤖"
 *   chips={[{ label: 'P1', color: 'error' }]}
 *   accentColor="#4CAF50"
 * />
 * ```
 */
export function DocCard({
  title,
  subtitle,
  description,
  icon,
  chips,
  accentColor,
  copyable,
  copyText,
  actions,
  children,
  onClick,
  compact = false,
  sx,
}: DocCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (copyText) {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card
      onClick={onClick}
      sx={[
        {
          height: '100%',
          borderTop: accentColor ? 3 : 0,
          borderColor: accentColor,
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 0.2s ease',
          '&:hover': onClick ? {
            boxShadow: 3,
            transform: 'translateY(-2px)',
          } : {},
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <CardContent sx={{ p: compact ? 2 : 3 }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'space-between',
          mb: description || children ? 1.5 : 0,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
            {icon && (
              typeof icon === 'string' ? (
                <Typography sx={{ fontSize: compact ? '1.25rem' : '1.5rem' }}>
                  {icon}
                </Typography>
              ) : icon
            )}
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant={compact ? 'subtitle1' : 'h6'} 
                fontWeight={600}
                sx={{ lineHeight: 1.3 }}
              >
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="caption" color="text.secondary">
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Box>
          
          {/* Actions area */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {chips?.map((chip, index) => (
              <Chip
                key={index}
                label={chip.label}
                size="small"
                color={chip.color || 'default'}
                variant={chip.variant || 'filled'}
                sx={{ fontWeight: 500 }}
              />
            ))}
            {copyable && copyText && (
              <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                <IconButton size="small" onClick={handleCopy}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {actions}
          </Box>
        </Box>

        {/* Description */}
        {description && (
          typeof description === 'string' ? (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ mb: children ? 2 : 0 }}
            >
              {description}
            </Typography>
          ) : description
        )}

        {/* Custom content */}
        {children}
      </CardContent>
    </Card>
  )
}

export default DocCard

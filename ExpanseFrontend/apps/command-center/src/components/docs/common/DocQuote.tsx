/**
 * DocQuote - Blockquote component for documentation
 * Used for displaying quotes, testimonials, or highlighted text
 */
import { Box, Typography, Avatar } from '@mui/material'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import type { ReactNode } from 'react'

export interface DocQuoteProps {
  /** Quote text */
  children: ReactNode
  /** Attribution/author */
  author?: string
  /** Author's title/role */
  role?: string
  /** Author's avatar URL */
  avatar?: string
  /** Accent color for the quote border */
  color?: string
  /** Variant style */
  variant?: 'default' | 'testimonial' | 'callout'
}

/**
 * Blockquote component for quotes and testimonials
 * 
 * @example
 * ```tsx
 * <DocQuote author="Jane Doe" role="Teacher">
 *   This app has transformed how my students engage with learning.
 * </DocQuote>
 * ```
 */
export function DocQuote({
  children,
  author,
  role,
  avatar,
  color = '#1976d2',
  variant = 'default',
}: DocQuoteProps) {
  if (variant === 'testimonial') {
    return (
      <Box
        sx={{
          p: 3,
          bgcolor: 'grey.50',
          borderRadius: 2,
          position: 'relative',
          mb: 2,
        }}
      >
        <FormatQuoteIcon 
          sx={{ 
            position: 'absolute',
            top: 12,
            left: 12,
            fontSize: 40,
            color: 'grey.300',
          }} 
        />
        <Box sx={{ pl: 5 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              fontStyle: 'italic',
              mb: 2,
              lineHeight: 1.7,
            }}
          >
            {children}
          </Typography>
          {author && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {avatar && (
                <Avatar src={avatar} sx={{ width: 40, height: 40 }} />
              )}
              <Box>
                <Typography variant="subtitle2" fontWeight={600}>
                  {author}
                </Typography>
                {role && (
                  <Typography variant="caption" color="text.secondary">
                    {role}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    )
  }

  if (variant === 'callout') {
    return (
      <Box
        sx={{
          p: 2,
          pl: 3,
          bgcolor: `${color}10`,
          borderLeft: 4,
          borderColor: color,
          borderRadius: '0 8px 8px 0',
          mb: 2,
        }}
      >
        <Typography variant="body1" fontWeight={500}>
          {children}
        </Typography>
        {author && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            — {author}{role && `, ${role}`}
          </Typography>
        )}
      </Box>
    )
  }

  // Default variant
  return (
    <Box
      sx={{
        pl: 3,
        borderLeft: 4,
        borderColor: color,
        my: 2,
      }}
    >
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ fontStyle: 'italic' }}
      >
        {children}
      </Typography>
      {author && (
        <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
          — {author}{role && `, ${role}`}
        </Typography>
      )}
    </Box>
  )
}

export default DocQuote

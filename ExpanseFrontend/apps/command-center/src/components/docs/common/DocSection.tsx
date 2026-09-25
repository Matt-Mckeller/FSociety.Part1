/**
 * DocSection - Main wrapper component for documentation sections
 * Provides consistent header, description, and layout for all doc pages
 */
import { Box, Typography, Divider } from '@mui/material'
import type { ReactNode } from 'react'

export interface DocSectionProps {
  /** Section title */
  title: string
  /** Optional emoji or icon prefix */
  icon?: string
  /** Optional description below the title */
  description?: string | ReactNode
  /** Section content */
  children: ReactNode
  /** Optional action buttons in the header */
  actions?: ReactNode
}

/**
 * Wrapper component for documentation sections
 * 
 * @example
 * ```tsx
 * <DocSection title="Business Highlights" icon="✨" description="Key metrics...">
 *   <DocGrid>...</DocGrid>
 * </DocSection>
 * ```
 */
export function DocSection({ 
  title, 
  icon, 
  description, 
  children,
  actions,
}: DocSectionProps) {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'space-between',
        mb: 2,
      }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {icon && `${icon} `}{title}
          </Typography>
          {description && (
            typeof description === 'string' ? (
              <Typography color="text.secondary" sx={{ maxWidth: 800 }}>
                {description}
              </Typography>
            ) : description
          )}
        </Box>
        {actions && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {actions}
          </Box>
        )}
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {/* Content */}
      {children}
    </Box>
  )
}

export default DocSection

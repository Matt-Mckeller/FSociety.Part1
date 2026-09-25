/**
 * DocAccordion - Collapsible section component for documentation
 * Used for organizing content into expandable/collapsible groups
 */
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Chip,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import type { ReactNode } from 'react'

export interface DocAccordionProps {
  /** Section title */
  title: string
  /** Optional emoji or icon prefix */
  icon?: string
  /** Section content */
  children: ReactNode
  /** Whether expanded by default */
  defaultExpanded?: boolean
  /** Optional badge/count to show */
  badge?: string | number
  /** Optional subtitle */
  subtitle?: string
  /** Disable the accordion */
  disabled?: boolean
}

/**
 * Collapsible section for organizing documentation content
 * 
 * @example
 * ```tsx
 * <DocAccordion title="Advanced Settings" icon="⚙️" defaultExpanded={false}>
 *   <Typography>Settings content...</Typography>
 * </DocAccordion>
 * ```
 */
export function DocAccordion({
  title,
  icon,
  children,
  defaultExpanded = true,
  badge,
  subtitle,
  disabled = false,
}: DocAccordionProps) {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      disabled={disabled}
      sx={{
        mb: 2,
        '&:before': { display: 'none' },
        borderRadius: 2,
        boxShadow: 1,
        '&.Mui-expanded': {
          margin: 0,
          mb: 2,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          bgcolor: 'grey.50',
          borderRadius: '8px 8px 0 0',
          '&.Mui-expanded': {
            minHeight: 48,
          },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          width: '100%',
          pr: 2,
        }}>
          <Typography variant="h6" fontWeight={600} sx={{ flex: 1 }}>
            {icon && `${icon} `}{title}
          </Typography>
          {badge !== undefined && (
            <Chip 
              label={badge} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          )}
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 2 }}>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

export default DocAccordion

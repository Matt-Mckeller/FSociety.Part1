/**
 * DocChip - Styled chip component for documentation
 * Pre-configured variants for common use cases (status, priority, category)
 */
import { Chip, ChipProps } from '@mui/material'

export interface DocChipProps extends Omit<ChipProps, 'color'> {
  /** Chip label */
  label: string
  /** Preset variant */
  preset?: 'status' | 'priority' | 'category' | 'tag' | 'rarity'
  /** Value for preset styling */
  value?: string
}

// Status colors
const statusColors: Record<string, { bg: string; color: string }> = {
  'active': { bg: '#E8F5E9', color: '#2E7D32' },
  'in-progress': { bg: '#FFF3E0', color: '#E65100' },
  'completed': { bg: '#E3F2FD', color: '#1565C0' },
  'blocked': { bg: '#FFEBEE', color: '#C62828' },
  'planned': { bg: '#F3E5F5', color: '#7B1FA2' },
  'not-started': { bg: '#ECEFF1', color: '#546E7A' },
}

// Priority colors
const priorityColors: Record<string, { bg: string; color: string }> = {
  'P1': { bg: '#FFEBEE', color: '#C62828' },
  'P2': { bg: '#FFF3E0', color: '#E65100' },
  'P3': { bg: '#E3F2FD', color: '#1565C0' },
  'high': { bg: '#FFEBEE', color: '#C62828' },
  'medium': { bg: '#FFF3E0', color: '#E65100' },
  'low': { bg: '#E8F5E9', color: '#2E7D32' },
}

// Category colors (for topics/themes)
const categoryColors: Record<string, { bg: string; color: string }> = {
  'business': { bg: '#E3F2FD', color: '#1565C0' },
  'technology': { bg: '#F3E5F5', color: '#7B1FA2' },
  'marketing': { bg: '#E8F5E9', color: '#2E7D32' },
  'research': { bg: '#FFF3E0', color: '#E65100' },
  'design': { bg: '#FCE4EC', color: '#C2185B' },
  'legal': { bg: '#ECEFF1', color: '#546E7A' },
}

// Reward rarity colors - shared across loot boxes, classifications, etc.
export const rarityColors: Record<string, { bg: string; color: string; glow?: string }> = {
  'common': { bg: '#F1F5F9', color: '#475569' },
  'uncommon': { bg: '#DCFCE7', color: '#15803D' },
  'rare': { bg: '#DBEAFE', color: '#1D4ED8' },
  'epic': { bg: '#EDE9FE', color: '#6D28D9' },
  'legendary': {
    bg: 'linear-gradient(135deg, #FDE68A, #FBBF24)',
    color: '#7C2D12',
    glow: '0 0 0 1px #F59E0B55, 0 2px 8px -1px #F59E0B99',
  },
}

/**
 * Get colors based on preset and value
 */
function getColors(preset?: string, value?: string): { bg: string; color: string } | null {
  if (!preset || !value) return null
  
  const normalizedValue = value.toLowerCase()
  
  switch (preset) {
    case 'status':
      return statusColors[normalizedValue] || null
    case 'priority':
      return priorityColors[value] || priorityColors[normalizedValue] || null
    case 'category':
      return categoryColors[normalizedValue] || null
    case 'rarity':
      return rarityColors[normalizedValue] || null
    default:
      return null
  }
}

/**
 * Styled chip with preset variants for documentation
 * 
 * @example
 * ```tsx
 * <DocChip label="P1" preset="priority" value="P1" />
 * <DocChip label="Active" preset="status" value="active" />
 * <DocChip label="Technology" preset="category" value="technology" />
 * ```
 */
export function DocChip({
  label,
  preset,
  value,
  size = 'small',
  ...props
}: DocChipProps) {
  const colors = getColors(preset, value || label)
  const isGradient = colors?.bg.startsWith('linear-gradient')

  return (
    <Chip
      label={label}
      size={size}
      sx={{
        fontWeight: 600,
        ...(colors && {
          ...(isGradient ? { background: colors.bg } : { bgcolor: colors.bg }),
          color: colors.color,
          ...('glow' in colors && colors.glow ? { boxShadow: colors.glow } : {}),
        }),
        ...props.sx,
      }}
      {...props}
    />
  )
}

// Preset components for convenience
export function StatusChip({ status, ...props }: { status: string } & Omit<DocChipProps, 'preset' | 'value' | 'label'>) {
  return <DocChip label={status} preset="status" value={status} {...props} />
}

export function PriorityChip({ priority, ...props }: { priority: string } & Omit<DocChipProps, 'preset' | 'value' | 'label'>) {
  return <DocChip label={priority} preset="priority" value={priority} {...props} />
}

export function CategoryChip({ category, ...props }: { category: string } & Omit<DocChipProps, 'preset' | 'value' | 'label'>) {
  return <DocChip label={category} preset="category" value={category} {...props} />
}

export function RarityChip({ rarity, ...props }: { rarity: string } & Omit<DocChipProps, 'preset' | 'value' | 'label'>) {
  return <DocChip label={rarity} preset="rarity" value={rarity} {...props} />
}

export default DocChip

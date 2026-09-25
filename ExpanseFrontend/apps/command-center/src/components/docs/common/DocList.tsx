/**
 * DocList - Styled list component for documentation
 * Supports various list styles: bullet, numbered, icon, checklist
 */
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Typography,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import type { ReactNode } from 'react'

export interface DocListItem {
  /** Primary text */
  primary: string | ReactNode
  /** Secondary/description text */
  secondary?: string | ReactNode
  /** Custom icon */
  icon?: ReactNode
  /** Whether item is checked (for checklist style) */
  checked?: boolean
}

export interface DocListProps {
  /** List items */
  items: DocListItem[] | string[]
  /** List style */
  variant?: 'bullet' | 'numbered' | 'icon' | 'checklist' | 'none'
  /** Spacing between items */
  spacing?: number
  /** Dense mode */
  dense?: boolean
  /** Custom bullet/icon for all items */
  icon?: ReactNode
}

/**
 * Styled list component for documentation
 * 
 * @example
 * ```tsx
 * <DocList 
 *   variant="checklist"
 *   items={[
 *     { primary: 'Step 1', checked: true },
 *     { primary: 'Step 2', checked: false },
 *   ]}
 * />
 * ```
 */
export function DocList({
  items,
  variant = 'bullet',
  spacing = 0.5,
  dense = false,
  icon,
}: DocListProps) {
  // Normalize items to DocListItem format
  const normalizedItems: DocListItem[] = items.map(item =>
    typeof item === 'string' ? { primary: item } : item
  )

  const getIcon = (item: DocListItem, index: number): ReactNode => {
    if (item.icon) return item.icon
    if (icon) return icon
    
    switch (variant) {
      case 'numbered':
        return (
          <Typography 
            variant="body2" 
            fontWeight={600} 
            color="primary"
            sx={{ minWidth: 24 }}
          >
            {index + 1}.
          </Typography>
        )
      case 'checklist':
        return item.checked ? (
          <CheckCircleIcon color="success" fontSize="small" />
        ) : (
          <RadioButtonUncheckedIcon color="disabled" fontSize="small" />
        )
      case 'bullet':
        return (
          <Typography color="primary" sx={{ minWidth: 16 }}>•</Typography>
        )
      case 'icon':
        return null // Expects item.icon to be provided
      case 'none':
      default:
        return null
    }
  }

  return (
    <List dense={dense} disablePadding>
      {normalizedItems.map((item, index) => (
        <ListItem 
          key={index}
          disableGutters
          sx={{ 
            py: spacing,
            alignItems: 'flex-start',
          }}
        >
          {variant !== 'none' && (
            <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
              {getIcon(item, index)}
            </ListItemIcon>
          )}
          <ListItemText
            primary={
              typeof item.primary === 'string' ? (
                <Typography variant="body2">{item.primary}</Typography>
              ) : item.primary
            }
            secondary={item.secondary}
            secondaryTypographyProps={{ variant: 'caption' }}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default DocList

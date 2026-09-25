/**
 * DocGrid - Responsive grid layout for documentation cards
 * Handles consistent spacing and responsive columns
 */
import { Grid } from '@mui/material'
import type { ReactNode } from 'react'

export interface DocGridProps {
  /** Grid items */
  children: ReactNode
  /** Number of columns at different breakpoints */
  columns?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  /** Spacing between items */
  spacing?: number
}

/**
 * Responsive grid for documentation cards
 * 
 * @example
 * ```tsx
 * <DocGrid columns={{ xs: 1, sm: 2, md: 3 }}>
 *   <DocCard title="Card 1" />
 *   <DocCard title="Card 2" />
 *   <DocCard title="Card 3" />
 * </DocGrid>
 * ```
 */
export function DocGrid({ 
  children, 
  columns = { xs: 1, sm: 2, md: 3 },
  spacing = 3,
}: DocGridProps) {
  // Convert column count to Grid size (12 / columns)
  const getGridSize = (cols?: number) => cols ? 12 / cols : undefined

  return (
    <Grid container spacing={spacing}>
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <Grid
            key={index}
            item
            xs={getGridSize(columns.xs)}
            sm={getGridSize(columns.sm)}
            md={getGridSize(columns.md)}
            lg={getGridSize(columns.lg)}
            xl={getGridSize(columns.xl)}
          >
            {child}
          </Grid>
        ))
      ) : (
        <Grid
          item
          xs={getGridSize(columns.xs)}
          sm={getGridSize(columns.sm)}
          md={getGridSize(columns.md)}
          lg={getGridSize(columns.lg)}
          xl={getGridSize(columns.xl)}
        >
          {children}
        </Grid>
      )}
    </Grid>
  )
}

export default DocGrid

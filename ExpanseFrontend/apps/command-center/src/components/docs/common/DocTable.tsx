/**
 * DocTable - Data table component for documentation
 * Simple, styled table for displaying structured data
 */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material'
import type { ReactNode } from 'react'

export interface DocTableColumn {
  /** Column key (matches data keys) */
  key: string
  /** Column header label */
  label: string
  /** Column width */
  width?: number | string
  /** Text alignment */
  align?: 'left' | 'center' | 'right'
  /** Custom cell renderer */
  render?: (value: unknown, row: Record<string, unknown>) => ReactNode
}

export interface DocTableProps {
  /** Column definitions */
  columns: DocTableColumn[]
  /** Data rows */
  data: Record<string, unknown>[]
  /** Optional title above table */
  title?: string
  /** Dense mode */
  dense?: boolean
  /** Sticky header */
  stickyHeader?: boolean
  /** Max height for scrolling */
  maxHeight?: number | string
}

/**
 * Data table for structured documentation content
 * 
 * @example
 * ```tsx
 * <DocTable
 *   title="Feature Comparison"
 *   columns={[
 *     { key: 'feature', label: 'Feature' },
 *     { key: 'status', label: 'Status', render: (v) => <Chip label={v} /> },
 *   ]}
 *   data={[
 *     { feature: 'AI Tutor', status: 'Active' },
 *   ]}
 * />
 * ```
 */
export function DocTable({
  columns,
  data,
  title,
  dense = false,
  stickyHeader = false,
  maxHeight,
}: DocTableProps) {
  return (
    <Box sx={{ mb: 2 }}>
      {title && (
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      <TableContainer 
        component={Paper} 
        variant="outlined"
        sx={{ maxHeight }}
      >
        <Table size={dense ? 'small' : 'medium'} stickyHeader={stickyHeader}>
          <TableHead>
            <TableRow>
              {columns.map(col => (
                <TableCell
                  key={col.key}
                  align={col.align || 'left'}
                  width={col.width}
                  sx={{ 
                    fontWeight: 600, 
                    bgcolor: 'grey.50',
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow 
                key={rowIndex}
                sx={{ '&:last-child td': { border: 0 } }}
              >
                {columns.map(col => (
                  <TableCell key={col.key} align={col.align || 'left'}>
                    {col.render 
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? '')
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default DocTable

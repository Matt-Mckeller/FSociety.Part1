import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { StatusIndicator } from './StatusBadge';
import type { ImplementationStatus } from '../../../types/plans';

interface DataTableProps {
  headers: string[];
  rows: string[][];
}

export function DataTable({ headers, rows }: DataTableProps) {
  return (
    <TableContainer component={Paper} sx={{ my: 1.5 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} sx={{ fontWeight: 'bold' }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface StatusTableProps {
  rows: Array<{
    feature: string;
    category?: string;
    status: ImplementationStatus;
    overallStatus: string;
  }>;
}

export function StatusTable({ rows }: StatusTableProps) {
  // Pre-process rows to determine category headers
  const processedRows = rows.reduce<Array<{ row: StatusTableProps['rows'][0]; showCategory: boolean; index: number }>>(
    (acc, row, index) => {
      const prevCategory = index > 0 ? rows[index - 1].category : '';
      const showCategory = Boolean(row.category && row.category !== prevCategory);
      acc.push({ row, showCategory, index });
      return acc;
    },
    []
  );

  return (
    <TableContainer component={Paper} sx={{ my: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Feature</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Data</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">UI</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="center">Logic</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processedRows.map(({ row, showCategory, index }) => (
            <React.Fragment key={index}>
              {showCategory && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    sx={{ fontWeight: 'bold', bgcolor: 'action.hover' }}
                  >
                    {row.category}
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell>{row.feature}</TableCell>
                <TableCell align="center">
                  <StatusIndicator status={row.status.data} />
                </TableCell>
                <TableCell align="center">
                  <StatusIndicator status={row.status.ui} />
                </TableCell>
                <TableCell align="center">
                  <StatusIndicator status={row.status.logic} />
                </TableCell>
                <TableCell>{row.overallStatus}</TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

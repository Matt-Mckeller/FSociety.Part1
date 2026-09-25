"use client"
import React, { useState } from "react"
import { useEventsData } from "expanse.ui/game"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material"

export function RewardEventsTable() {
  const {
    events,
    // isLoading,
    // error,
    page,
    totalPages,
    handlePageChange,
    filters,
    updateFilters,
    rowsPerPage,
    // refetch,
  } = useEventsData() // Example initial filter

  // if (isLoading) {
  //   return <div>Loading events...</div>
  // }

  // if (error) {
  //   return <div>Error loading events: {error.message}</div>
  // }

  console.log({ events })

  const paginatedEvents = events.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  )

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event ID</TableCell>
              <TableCell>Event Type</TableCell>
              <TableCell>Timestamp</TableCell>
              {/* Add more columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.id}</TableCell>
                <TableCell>{event.type}</TableCell>
                <TableCell>
                  {new Date(event.timestamp).toLocaleString()}
                </TableCell>
                {/* Add more cells as needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={events.length}
        page={page - 1}
        onPageChange={(event, newPage) => handlePageChange(newPage + 1)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
      />
      {/* Example of manual refresh */}
    </div>
  )
}

export default RewardEventsTable

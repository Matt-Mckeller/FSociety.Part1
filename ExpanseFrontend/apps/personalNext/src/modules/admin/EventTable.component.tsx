/**
 * EventTable Component
 * Example text used to create this component
 * Instructions:
 * - Create a table component using Material-UI to display the provided JSON data in a readable format.
 * - Convert the 'params', 'metrics', and 'deviceContext' fields to JSON strings.
 * - Make columns hideable via checkboxes.
 * - Default the visible columns to 'id', 'event', 'createdAt', and 'userAgent'.
 * - Display the 'createdAt' and 'updatedAt' fields in a human-readable format using Intl.DateTimeFormat.
 * - Add sorting functionality, defaulting the table sort to 'createdAt' descending.
 * - Add pagination to the table.
 * - Include a search field to filter results by 'event', 'createdAt', 'sessionId', and 'params' fields.
 * - Use a multi-language support JSON for column labels and search field label.
 * - Display the total item count above the table.
 * - Place the search field below the column toggle selection.
 */

"use client"
import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TableSortLabel,
  TablePagination,
  Typography,
  TextField,
} from "@mui/material"

// Multi-language content JSON
const content = {
  en: {
    id: "ID",
    event: "Event",
    pageUrl: "Page URL",
    eventTimestamp: "Event Timestamp",
    userAgent: "User Agent",
    ipAddress: "IP Address",
    params: "Params",
    userId: "User ID",
    metrics: "Metrics",
    deviceContext: "Device Context",
    createdAt: "Created At",
    updatedAt: "Updated At",
    sessionId: "Session ID",
    search: "Search",
  },
  es: {
    id: "ID",
    event: "Evento",
    pageUrl: "URL de la página",
    eventTimestamp: "Marca de tiempo del evento",
    userAgent: "Agente de usuario",
    ipAddress: "Dirección IP",
    params: "Parámetros",
    userId: "ID de usuario",
    metrics: "Métricas",
    deviceContext: "Contexto del dispositivo",
    createdAt: "Creado en",
    updatedAt: "Actualizado en",
    sessionId: "ID de sesión",
    search: "Buscar",
  },
}

const columns = [
  { id: "id", labelKey: "id" },
  { id: "event", labelKey: "event" },
  { id: "pageUrl", labelKey: "pageUrl" },
  { id: "eventTimestamp", labelKey: "eventTimestamp" },
  { id: "userAgent", labelKey: "userAgent" },
  { id: "ipAddress", labelKey: "ipAddress" },
  { id: "params", labelKey: "params" },
  { id: "userId", labelKey: "userId" },
  { id: "metrics", labelKey: "metrics" },
  { id: "deviceContext", labelKey: "deviceContext" },
  { id: "createdAt", labelKey: "createdAt" },
  { id: "updatedAt", labelKey: "updatedAt" },
  { id: "sessionId", labelKey: "sessionId" },
]

const defaultVisibleColumns = ["id", "event", "createdAt", "userAgent"]

const formatDate = (dateString) => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date)
}

export const EventTable = ({
  dataArray,
  language = "en",
}: {
  dataArray: any[]
  language?: string
}) => {
  const [visibleColumns, setVisibleColumns] = useState(defaultVisibleColumns)
  const [order, setOrder] = useState<"asc" | "desc">("desc")
  const [orderBy, setOrderBy] = useState<string>("createdAt")
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [searchText, setSearchText] = useState<string>("")

  const handleToggleColumn = (columnId) => {
    setVisibleColumns((prevState) =>
      prevState.includes(columnId)
        ? prevState.filter((id) => id !== columnId)
        : [...prevState, columnId],
    )
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearch = (event) => {
    setSearchText(event.target.value)
    setPage(0) // Reset page to the first page when search text changes
  }

  const filteredDataArray =
    searchText.length === 0
      ? dataArray
      : dataArray.filter(
          (row) =>
            row.event.toLowerCase().includes(searchText.toLowerCase()) ||
            formatDate(row.createdAt)
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            (row.sessionId &&
              row.sessionId.toLowerCase().includes(searchText.toLowerCase())) ||
            JSON.stringify(row.params)
              .toLowerCase()
              .includes(searchText.toLowerCase()),
        )

  const sortedDataArray = [...filteredDataArray].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] < b[orderBy] ? -1 : 1
    }
    return a[orderBy] > b[orderBy] ? -1 : 1
  })

  const paginatedDataArray = sortedDataArray.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  )

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Total Items: {dataArray.length}
      </Typography>
      <FormGroup row>
        {columns.map((column) => (
          <FormControlLabel
            key={column.id}
            control={
              <Checkbox
                checked={visibleColumns.includes(column.id)}
                onChange={() => handleToggleColumn(column.id)}
                name={content[language][column.labelKey]}
              />
            }
            label={content[language][column.labelKey]}
          />
        ))}
      </FormGroup>
      <TextField
        label={content[language].search}
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: 20 }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(
                (column) =>
                  visibleColumns.includes(column.id) && (
                    <TableCell key={column.id}>
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "desc"}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        {content[language][column.labelKey]}
                      </TableSortLabel>
                    </TableCell>
                  ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDataArray.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map(
                  (column) =>
                    visibleColumns.includes(column.id) && (
                      <TableCell key={column.id}>
                        {column.id === "createdAt" || column.id === "updatedAt"
                          ? formatDate(row[column.id])
                          : typeof row[column.id] === "object" &&
                              row[column.id] !== null
                            ? JSON.stringify(row[column.id])
                            : row[column.id]}
                      </TableCell>
                    ),
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={filteredDataArray.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default EventTable

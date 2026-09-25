/**
 * DataExplorer - Dynamic Data Viewer for Command Center
 *
 * Features:
 * - Auto-discovers all JSON data files
 * - Runtime column generation from data structure
 * - Relationship detection and navigation
 * - Nested data expansion
 * - Search and filter
 * - Validation hints for orphan/missing relationships
 */
import { useState, useMemo, useCallback } from "react"
import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  alpha,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Drawer,
  useTheme,
} from "@mui/material"

// Icons
import SearchIcon from "@mui/icons-material/Search"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import DescriptionIcon from "@mui/icons-material/Description"
import LinkIcon from "@mui/icons-material/Link"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import CloseIcon from "@mui/icons-material/Close"
import DataObjectIcon from "@mui/icons-material/DataObject"
import TableChartIcon from "@mui/icons-material/TableChart"

// Import from DataExplorer module
import { DATA_SOURCES, CATEGORIES } from "./dataSources"
import {
  getRecords,
  extractColumns,
  isRelationshipField,
  getRelationshipTarget,
  validateRelationship,
  isExpandable,
} from "./utils"

// =============================================================================
// COMPONENTS
// =============================================================================

interface CellValueProps {
  value: unknown
  fieldKey: string
  onNavigate: (sourceId: string, recordId: string) => void
  expanded?: boolean
  onToggleExpand?: () => void
}

function CellValue({
  value,
  fieldKey,
  onNavigate,
  expanded,
  onToggleExpand,
}: CellValueProps) {
  const theme = useTheme()
  const isRelation = isRelationshipField(fieldKey)
  const targetSource = isRelation ? getRelationshipTarget(fieldKey) : null

  // Handle null/undefined
  if (value === null || value === undefined) {
    return (
      <Typography variant="body2" color="text.disabled">
        —
      </Typography>
    )
  }

  // Handle relationships
  if (isRelation && targetSource) {
    const validation = validateRelationship(value, targetSource)

    if (Array.isArray(value)) {
      return (
        <Stack direction="row" flexWrap="wrap" gap={0.5} alignItems="center">
          {value.slice(0, 3).map((v, i) => (
            <Chip
              key={i}
              label={String(v)}
              size="small"
              icon={<LinkIcon sx={{ fontSize: 14 }} />}
              onClick={() => onNavigate(targetSource, String(v))}
              sx={{
                cursor: "pointer",
                bgcolor: validation.missing.includes(String(v))
                  ? alpha(theme.palette.error.main, 0.1)
                  : alpha(theme.palette.primary.main, 0.1),
                borderColor: validation.missing.includes(String(v))
                  ? theme.palette.error.main
                  : "transparent",
                border: validation.missing.includes(String(v)) ? 1 : 0,
              }}
            />
          ))}
          {value.length > 3 && (
            <Chip
              label={`+${value.length - 3}`}
              size="small"
              variant="outlined"
            />
          )}
          {!validation.valid && (
            <Tooltip title={`Missing: ${validation.missing.join(", ")}`}>
              <WarningAmberIcon sx={{ fontSize: 16, color: "warning.main" }} />
            </Tooltip>
          )}
        </Stack>
      )
    }

    return (
      <Chip
        label={String(value)}
        size="small"
        icon={
          validation.valid ? (
            <LinkIcon sx={{ fontSize: 14 }} />
          ) : (
            <WarningAmberIcon sx={{ fontSize: 14 }} />
          )
        }
        onClick={() => onNavigate(targetSource, String(value))}
        color={validation.valid ? "default" : "warning"}
        sx={{ cursor: "pointer" }}
      />
    )
  }

  // Handle arrays
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <Typography variant="body2" color="text.disabled">
          []
        </Typography>
      )
    }

    return (
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Chip
          label={`${value.length} items`}
          size="small"
          variant="outlined"
          onClick={onToggleExpand}
          icon={expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          sx={{ cursor: isExpandable(value) ? "pointer" : "default" }}
        />
      </Stack>
    )
  }

  // Handle objects
  if (typeof value === "object" && value !== null) {
    const keys = Object.keys(value)
    return (
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Chip
          label={`{${keys.length}}`}
          size="small"
          variant="outlined"
          onClick={onToggleExpand}
          icon={expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          sx={{ cursor: "pointer" }}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {keys.slice(0, 3).join(", ")}
          {keys.length > 3 ? "..." : ""}
        </Typography>
      </Stack>
    )
  }

  // Handle booleans
  if (typeof value === "boolean") {
    return (
      <Chip
        label={value ? "Yes" : "No"}
        size="small"
        color={value ? "success" : "default"}
        variant="outlined"
      />
    )
  }

  // Handle numbers
  if (typeof value === "number") {
    return <Typography variant="body2">{value.toLocaleString()}</Typography>
  }

  // Handle strings
  const strValue = String(value)
  if (strValue.length > 100) {
    return (
      <Tooltip title={strValue}>
        <Typography
          variant="body2"
          sx={{
            maxWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {strValue.slice(0, 100)}...
        </Typography>
      </Tooltip>
    )
  }

  return <Typography variant="body2">{strValue}</Typography>
}

interface ExpandedRowProps {
  value: unknown
  onNavigate: (sourceId: string, recordId: string) => void
}

function ExpandedRow({ value, onNavigate }: ExpandedRowProps) {
  const theme = useTheme()

  if (Array.isArray(value)) {
    // Check if it's an array of objects or primitives
    if (value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
      // Array of objects - render as sub-table
      const columns = extractColumns(value as Record<string, unknown>[])
      return (
        <TableContainer sx={{ maxHeight: 300 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {columns.slice(0, 6).map((col) => (
                  <TableCell
                    key={col}
                    sx={{
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      fontWeight: 600,
                    }}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(value as Record<string, unknown>[]).map((item, idx) => (
                <TableRow key={idx}>
                  {columns.slice(0, 6).map((col) => (
                    <TableCell key={col}>
                      <CellValue
                        value={item[col]}
                        fieldKey={col}
                        onNavigate={onNavigate}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
    }

    // Array of primitives - render as chips
    return (
      <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ p: 1 }}>
        {value.map((item, idx) => (
          <Chip
            key={idx}
            label={String(item)}
            size="small"
            variant="outlined"
          />
        ))}
      </Stack>
    )
  }

  if (typeof value === "object" && value !== null) {
    // Object - render as key-value pairs
    const entries = Object.entries(value as Record<string, unknown>)
    return (
      <Table size="small">
        <TableBody>
          {entries.map(([key, val]) => (
            <TableRow key={key}>
              <TableCell
                sx={{
                  fontWeight: 600,
                  width: 150,
                  bgcolor: alpha(theme.palette.primary.main, 0.03),
                }}
              >
                {key}
              </TableCell>
              <TableCell>
                <CellValue value={val} fieldKey={key} onNavigate={onNavigate} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  return null
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function DataExplorer() {
  const theme = useTheme()
  const [selectedSource, setSelectedSource] = useState<string>("campaigns")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [expandedCells, setExpandedCells] = useState<Set<string>>(new Set())
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(Object.keys(CATEGORIES)),
  )
  const [detailDrawer, setDetailDrawer] = useState<{
    source: string
    record: Record<string, unknown>
  } | null>(null)
  const [navigationHistory, setNavigationHistory] = useState<
    Array<{ sourceId: string; recordId?: string }>
  >([])

  // Get current data source
  const currentSource = useMemo(
    () => DATA_SOURCES.find((s) => s.id === selectedSource),
    [selectedSource],
  )

  // Get records and columns
  const records = useMemo(
    () => (currentSource ? getRecords(currentSource) : []),
    [currentSource],
  )

  const columns = useMemo(() => extractColumns(records), [records])

  // Filter records by search
  const filteredRecords = useMemo(() => {
    if (!searchQuery.trim()) return records

    const query = searchQuery.toLowerCase()
    return records.filter((record) =>
      Object.values(record).some((value) =>
        String(value).toLowerCase().includes(query),
      ),
    )
  }, [records, searchQuery])

  // Sort records
  const sortedRecords = useMemo(() => {
    if (!sortColumn) return filteredRecords

    return [...filteredRecords].sort((a, b) => {
      const aVal = a[sortColumn]
      const bVal = b[sortColumn]

      if (aVal === null || aVal === undefined) return 1
      if (bVal === null || bVal === undefined) return -1

      const comparison = String(aVal).localeCompare(String(bVal))
      return sortDirection === "asc" ? comparison : -comparison
    })
  }, [filteredRecords, sortColumn, sortDirection])

  // Navigation handler
  const handleNavigate = useCallback(
    (sourceId: string, recordId: string) => {
      setNavigationHistory((prev) => [
        ...prev,
        { sourceId: selectedSource, recordId: undefined },
      ])
      setSelectedSource(sourceId)
      setSearchQuery(recordId)
    },
    [selectedSource],
  )

  // Back navigation
  const handleBack = useCallback(() => {
    if (navigationHistory.length > 0) {
      const prev = navigationHistory[navigationHistory.length - 1]
      setNavigationHistory((h) => h.slice(0, -1))
      setSelectedSource(prev.sourceId)
      setSearchQuery("")
    }
  }, [navigationHistory])

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(category)) next.delete(category)
      else next.add(category)
      return next
    })
  }

  // Toggle row expansion
  const toggleRowExpand = (rowId: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      if (next.has(rowId)) next.delete(rowId)
      else next.add(rowId)
      return next
    })
  }

  // Toggle cell expansion
  const toggleCellExpand = (cellId: string) => {
    setExpandedCells((prev) => {
      const next = new Set(prev)
      if (next.has(cellId)) next.delete(cellId)
      else next.add(cellId)
      return next
    })
  }

  // Handle sort
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Priority columns to show first
  const visibleColumns = useMemo(() => {
    const priority = [
      "id",
      "_key",
      "name",
      "title",
      "status",
      "priority",
      "description",
    ]
    const priorityCols = priority.filter((p) => columns.includes(p))
    const otherCols = columns.filter((c) => !priority.includes(c))
    return [...priorityCols, ...otherCols].slice(0, 8) // Show max 8 columns
  }, [columns])

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 120px)" }}>
      {/* Sidebar */}
      <Paper
        sx={{
          width: 260,
          flexShrink: 0,
          borderRight: 1,
          borderColor: "divider",
          overflow: "auto",
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" fontWeight="bold">
            <DataObjectIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            Data Sources
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {DATA_SOURCES.length} files •{" "}
            {DATA_SOURCES.reduce((sum, s) => sum + getRecords(s).length, 0)}{" "}
            records
          </Typography>
        </Box>

        <List dense sx={{ py: 0 }}>
          {Object.entries(CATEGORIES).map(([category, sources]) => (
            <Box key={category}>
              <ListItemButton
                onClick={() => toggleCategory(category)}
                sx={{ py: 0.5 }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {expandedCategories.has(category) ? (
                    <ExpandMoreIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={category}
                  primaryTypographyProps={{
                    variant: "subtitle2",
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={sources.length}
                  size="small"
                  sx={{ height: 20, fontSize: "0.7rem" }}
                />
              </ListItemButton>

              <Collapse in={expandedCategories.has(category)}>
                <List dense disablePadding>
                  {sources.map((source) => {
                    const recordCount = getRecords(source).length
                    const isSelected = selectedSource === source.id

                    return (
                      <ListItemButton
                        key={source.id}
                        selected={isSelected}
                        onClick={() => {
                          setSelectedSource(source.id)
                          setSearchQuery("")
                          setExpandedRows(new Set())
                          setExpandedCells(new Set())
                        }}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon sx={{ minWidth: 28 }}>
                          <DescriptionIcon sx={{ fontSize: 18 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={source.name}
                          primaryTypographyProps={{ variant: "body2" }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {recordCount}
                        </Typography>
                      </ListItemButton>
                    )
                  })}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
      </Paper>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              {navigationHistory.length > 0 && (
                <Button size="small" onClick={handleBack}>
                  ← Back
                </Button>
              )}
              <Typography variant="h6" fontWeight="bold">
                <TableChartIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                {currentSource?.name}
              </Typography>
              <Chip label={`${sortedRecords.length} records`} size="small" />
            </Stack>

            <TextField
              size="small"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 250 }}
            />
          </Stack>

          {/* Column legend */}
          <Stack direction="row" flexWrap="wrap" gap={0.5}>
            {columns.length > visibleColumns.length && (
              <Typography variant="caption" color="text.secondary">
                Showing {visibleColumns.length} of {columns.length} columns
              </Typography>
            )}
          </Stack>
        </Box>

        {/* Table */}
        <TableContainer sx={{ flex: 1, overflow: "auto" }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  padding="checkbox"
                  sx={{ bgcolor: "background.paper" }}
                ></TableCell>
                {visibleColumns.map((col) => (
                  <TableCell
                    key={col}
                    sx={{
                      bgcolor: "background.paper",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <TableSortLabel
                      active={sortColumn === col}
                      direction={sortColumn === col ? sortDirection : "asc"}
                      onClick={() => handleSort(col)}
                    >
                      {col}
                      {isRelationshipField(col) && (
                        <LinkIcon
                          sx={{ ml: 0.5, fontSize: 14, color: "primary.main" }}
                        />
                      )}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell sx={{ bgcolor: "background.paper" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRecords.map((record, idx) => {
                const rowId = String(record.id || record._key || idx)
                const isExpanded = expandedRows.has(rowId)

                return (
                  <>
                    <TableRow
                      key={rowId}
                      hover
                      sx={{
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.04),
                        },
                        bgcolor: isExpanded
                          ? alpha(theme.palette.primary.main, 0.08)
                          : "inherit",
                      }}
                    >
                      <TableCell padding="checkbox">
                        <IconButton
                          size="small"
                          onClick={() => toggleRowExpand(rowId)}
                        >
                          {isExpanded ? (
                            <ExpandMoreIcon />
                          ) : (
                            <ChevronRightIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      {visibleColumns.map((col) => {
                        const cellId = `${rowId}-${col}`
                        const isCellExpanded = expandedCells.has(cellId)

                        return (
                          <TableCell key={col}>
                            <CellValue
                              value={record[col]}
                              fieldKey={col}
                              onNavigate={handleNavigate}
                              expanded={isCellExpanded}
                              onToggleExpand={() => toggleCellExpand(cellId)}
                            />
                            {isCellExpanded && isExpandable(record[col]) && (
                              <Box
                                sx={{
                                  mt: 1,
                                  bgcolor: alpha(
                                    theme.palette.primary.main,
                                    0.03,
                                  ),
                                  borderRadius: 1,
                                }}
                              >
                                <ExpandedRow
                                  value={record[col]}
                                  onNavigate={handleNavigate}
                                />
                              </Box>
                            )}
                          </TableCell>
                        )
                      })}
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() =>
                            setDetailDrawer({ source: selectedSource, record })
                          }
                        >
                          <OpenInNewIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>

                    {/* Expanded row showing all fields */}
                    {isExpanded && (
                      <TableRow>
                        <TableCell
                          colSpan={visibleColumns.length + 2}
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.03),
                          }}
                        >
                          <Box sx={{ p: 2 }}>
                            <Typography
                              variant="subtitle2"
                              fontWeight="bold"
                              gutterBottom
                            >
                              All Fields ({columns.length})
                            </Typography>
                            <Table size="small">
                              <TableBody>
                                {columns.map((col) => (
                                  <TableRow key={col}>
                                    <TableCell
                                      sx={{ fontWeight: 600, width: 180 }}
                                    >
                                      {col}
                                      {isRelationshipField(col) && (
                                        <LinkIcon
                                          sx={{
                                            ml: 0.5,
                                            fontSize: 12,
                                            color: "primary.main",
                                          }}
                                        />
                                      )}
                                    </TableCell>
                                    <TableCell>
                                      <CellValue
                                        value={record[col]}
                                        fieldKey={col}
                                        onNavigate={handleNavigate}
                                      />
                                      {isExpandable(record[col]) && (
                                        <Box
                                          sx={{
                                            mt: 1,
                                            bgcolor: "background.paper",
                                            borderRadius: 1,
                                            border: 1,
                                            borderColor: "divider",
                                          }}
                                        >
                                          <ExpandedRow
                                            value={record[col]}
                                            onNavigate={handleNavigate}
                                          />
                                        </Box>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Detail Drawer */}
      <Drawer
        anchor="right"
        open={!!detailDrawer}
        onClose={() => setDetailDrawer(null)}
        PaperProps={{ sx: { width: 500 } }}
      >
        {detailDrawer && (
          <Box sx={{ p: 3 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Typography variant="h6">
                {String(
                  detailDrawer.record.name ||
                    detailDrawer.record.title ||
                    detailDrawer.record.id ||
                    "Record Details",
                )}
              </Typography>
              <IconButton onClick={() => setDetailDrawer(null)}>
                <CloseIcon />
              </IconButton>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            <pre
              style={{
                fontSize: 12,
                overflow: "auto",
                background: alpha(theme.palette.primary.main, 0.05),
                padding: 16,
                borderRadius: 8,
              }}
            >
              {JSON.stringify(detailDrawer.record, null, 2)}
            </pre>
          </Box>
        )}
      </Drawer>
    </Box>
  )
}

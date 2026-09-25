"use client"

import React, { useState, useMemo } from "react"
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  useTheme,
} from "@mui/material"
import {
  Search,
  MoreVert,
  Edit,
  Delete,
  PersonOff,
  PersonAdd,
  Visibility,
  FilterList,
  Refresh,
} from "@mui/icons-material"

export interface AdminUser {
  id: string | number
  displayName: string
  email: string
  role: string
  avatarSrc?: string | null
  status: "active" | "inactive" | "pending"
  createdAt: Date | string
  lastLoginAt?: Date | string
  level?: number
}

export interface AdminUserListProps {
  /** List of users to display */
  users: AdminUser[]
  /** Edit user handler */
  onEdit?: (user: AdminUser) => void
  /** Delete user handler */
  onDelete?: (user: AdminUser) => void
  /** View user handler */
  onView?: (user: AdminUser) => void
  /** Toggle user status handler */
  onToggleStatus?: (user: AdminUser) => void
  /** Bulk action handler */
  onBulkAction?: (action: string, userIds: (string | number)[]) => void
  /** Refresh handler */
  onRefresh?: () => void
  /** Loading state */
  isLoading?: boolean
  /** Enable row selection */
  selectable?: boolean
  /** Rows per page options */
  rowsPerPageOptions?: number[]
  /** Default rows per page */
  defaultRowsPerPage?: number
  /** Show search */
  showSearch?: boolean
  /** Show filters */
  showFilters?: boolean
  /** Custom actions per row */
  customRowActions?: Array<{
    label: string
    icon: React.ReactNode
    onClick: (user: AdminUser) => void
  }>
}

type Order = "asc" | "desc"
type OrderBy = keyof AdminUser

/**
 * Format date for display
 */
function formatDate(date: Date | string | undefined): string {
  if (!date) return "—"
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

/**
 * Get status chip color
 */
function getStatusColor(status: AdminUser["status"]): "success" | "error" | "warning" {
  switch (status) {
    case "active":
      return "success"
    case "inactive":
      return "error"
    case "pending":
      return "warning"
    default:
      return "warning"
  }
}

/**
 * Get initials from name
 */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

/**
 * AdminUserList component for displaying and managing users.
 * Includes sorting, filtering, pagination, and bulk actions.
 * 
 * Follows Expanse brand aesthetic with consistent table styling.
 */
export function AdminUserList({
  users,
  onEdit,
  onDelete,
  onView,
  onToggleStatus,
  onBulkAction,
  onRefresh,
  isLoading = false,
  selectable = true,
  rowsPerPageOptions = [10, 25, 50],
  defaultRowsPerPage = 10,
  showSearch = true,
  showFilters = true,
  customRowActions,
}: AdminUserListProps) {
  const theme = useTheme()
  const [order, setOrder] = useState<Order>("asc")
  const [orderBy, setOrderBy] = useState<OrderBy>("displayName")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage)
  const [searchQuery, setSearchQuery] = useState("")
  const [selected, setSelected] = useState<(string | number)[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuUser, setMenuUser] = useState<AdminUser | null>(null)
  const [statusFilter, setStatusFilter] = useState<AdminUser["status"] | "all">("all")

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    let result = [...users]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (user) =>
          user.displayName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query)
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter)
    }

    // Sort
    result.sort((a, b) => {
      const aValue = a[orderBy]
      const bValue = b[orderBy]
      
      if (aValue === undefined || aValue === null) return 1
      if (bValue === undefined || bValue === null) return -1
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (aValue < bValue) return order === "asc" ? -1 : 1
      if (aValue > bValue) return order === "asc" ? 1 : -1
      return 0
    })

    return result
  }, [users, searchQuery, statusFilter, order, orderBy])

  // Paginated users
  const paginatedUsers = useMemo(() => {
    const start = page * rowsPerPage
    return filteredUsers.slice(start, start + rowsPerPage)
  }, [filteredUsers, page, rowsPerPage])

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(filteredUsers.map((user) => user.id))
    } else {
      setSelected([])
    }
  }

  const handleRowSelect = (id: string | number) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: (string | number)[] = []

    if (selectedIndex === -1) {
      newSelected = [...selected, id]
    } else {
      newSelected = selected.filter((s) => s !== id)
    }

    setSelected(newSelected)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: AdminUser) => {
    setAnchorEl(event.currentTarget)
    setMenuUser(user)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMenuUser(null)
  }

  const isSelected = (id: string | number) => selected.includes(id)

  // Table header cells
  const headCells: Array<{ id: OrderBy; label: string; align?: "left" | "right" | "center" }> = [
    { id: "displayName", label: "User" },
    { id: "email", label: "Email" },
    { id: "role", label: "Role" },
    { id: "status", label: "Status", align: "center" },
    { id: "createdAt", label: "Created" },
    { id: "lastLoginAt", label: "Last Login" },
  ]

  return (
    <Paper elevation={1} sx={{ borderRadius: "7px", overflow: "hidden" }}>
      {/* Toolbar */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        {/* Search */}
        {showSearch && (
          <TextField
            size="small"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />
        )}

        {/* Status filter */}
        {showFilters && (
          <Box sx={{ display: "flex", gap: 1 }}>
            {(["all", "active", "inactive", "pending"] as const).map((status) => (
              <Chip
                key={status}
                label={status.charAt(0).toUpperCase() + status.slice(1)}
                size="small"
                variant={statusFilter === status ? "filled" : "outlined"}
                color={status === "all" ? "default" : getStatusColor(status as AdminUser["status"])}
                onClick={() => setStatusFilter(status)}
                sx={{ cursor: "pointer" }}
              />
            ))}
          </Box>
        )}

        <Box sx={{ flex: 1 }} />

        {/* Bulk actions */}
        {selectable && selected.length > 0 && (
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {selected.length} selected
          </Typography>
        )}

        {/* Refresh */}
        {onRefresh && (
          <Tooltip title="Refresh">
            <IconButton onClick={onRefresh} disabled={isLoading}>
              <Refresh />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < filteredUsers.length}
                    checked={filteredUsers.length > 0 && selected.length === filteredUsers.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.align || "left"}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={() => handleRequestSort(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => {
              const isItemSelected = isSelected(user.id)
              return (
                <TableRow
                  key={user.id}
                  hover
                  selected={isItemSelected}
                  sx={{
                    opacity: isLoading ? 0.5 : 1,
                    transition: "opacity 0.2s",
                  }}
                >
                  {selectable && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={() => handleRowSelect(user.id)}
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar
                        src={user.avatarSrc || undefined}
                        alt={user.displayName}
                        sx={{
                          width: 36,
                          height: 36,
                          backgroundColor: theme.palette.primary.light,
                          color: theme.palette.primary.dark,
                          fontSize: "0.9rem",
                        }}
                      >
                        {getInitials(user.displayName)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {user.displayName}
                        </Typography>
                        {user.level !== undefined && (
                          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                            Level {user.level}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip label={user.role} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={user.status}
                      size="small"
                      color={getStatusColor(user.status)}
                    />
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>{formatDate(user.lastLoginAt)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, user)}
                    >
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
            {paginatedUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={selectable ? 8 : 7} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {searchQuery || statusFilter !== "all"
                      ? "No users match the current filters"
                      : "No users found"}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10))
          setPage(0)
        }}
      />

      {/* Row actions menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {onView && (
          <MenuItem
            onClick={() => {
              if (menuUser) onView(menuUser)
              handleMenuClose()
            }}
          >
            <ListItemIcon>
              <Visibility fontSize="small" />
            </ListItemIcon>
            <ListItemText>View</ListItemText>
          </MenuItem>
        )}
        {onEdit && (
          <MenuItem
            onClick={() => {
              if (menuUser) onEdit(menuUser)
              handleMenuClose()
            }}
          >
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
        )}
        {onToggleStatus && menuUser && (
          <MenuItem
            onClick={() => {
              if (menuUser) onToggleStatus(menuUser)
              handleMenuClose()
            }}
          >
            <ListItemIcon>
              {menuUser.status === "active" ? (
                <PersonOff fontSize="small" />
              ) : (
                <PersonAdd fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>
              {menuUser.status === "active" ? "Deactivate" : "Activate"}
            </ListItemText>
          </MenuItem>
        )}
        {customRowActions?.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              if (menuUser) action.onClick(menuUser)
              handleMenuClose()
            }}
          >
            <ListItemIcon>{action.icon}</ListItemIcon>
            <ListItemText>{action.label}</ListItemText>
          </MenuItem>
        ))}
        {onDelete && (
          <MenuItem
            onClick={() => {
              if (menuUser) onDelete(menuUser)
              handleMenuClose()
            }}
            sx={{ color: theme.palette.error.main }}
          >
            <ListItemIcon>
              <Delete fontSize="small" sx={{ color: theme.palette.error.main }} />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </Paper>
  )
}

export default AdminUserList

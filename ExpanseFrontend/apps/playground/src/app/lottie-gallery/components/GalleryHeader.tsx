/**
 * Gallery Header Component
 * Contains filters, sorting, and theme controls
 */

"use client"

import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TextField,
  Stack,
  Typography,
} from "@mui/material"
import type { SortBy } from "../utils/animationRegistry"

interface GalleryHeaderProps {
  filter: string
  sort: SortBy
  showPending: boolean
  themeColor: string
  categories: string[]
  onFilterChange: (filter: string) => void
  onSortChange: (sort: SortBy) => void
  onTogglePending: () => void
  onThemeColorChange: (color: string) => void
}

export function GalleryHeader({
  filter,
  sort,
  showPending,
  themeColor,
  categories,
  onFilterChange,
  onSortChange,
  onTogglePending,
  onThemeColorChange,
}: GalleryHeaderProps) {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Stack spacing={3}>
        {/* Title */}
        <Typography variant="h4" component="h1" fontWeight={700}>
          🎨 Lottie Animation Gallery
        </Typography>

        {/* Controls */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
          flexWrap="wrap"
        >
          {/* Filter by Category */}
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={filter}
              label="Filter by Status"
              onChange={(e) => onFilterChange(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sort By */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sort}
              label="Sort By"
              onChange={(e) => onSortChange(e.target.value as SortBy)}
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="category">Category</MenuItem>
            </Select>
          </FormControl>

          {/* Show Pending */}
          <FormControlLabel
            control={
              <Checkbox
                checked={showPending}
                onChange={onTogglePending}
                size="small"
              />
            }
            label="Show Pending"
          />

          {/* Theme Color Picker */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Theme Color:
            </Typography>
            <TextField
              type="color"
              value={themeColor}
              onChange={(e) => onThemeColorChange(e.target.value)}
              size="small"
              sx={{
                width: 80,
                "& input": {
                  height: 40,
                  cursor: "pointer",
                },
              }}
            />
          </Box>
        </Stack>
      </Stack>
    </Paper>
  )
}

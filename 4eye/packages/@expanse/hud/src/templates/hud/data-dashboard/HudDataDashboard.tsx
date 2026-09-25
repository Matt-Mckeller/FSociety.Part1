"use client";
/**
 * HUD Template: Data Dashboard
 *
 * Analytics/data visualization layout:
 * - Filters panel (left)
 * - Time range selector
 * - Chart controls
 * - Legend
 * - Export options
 * - Data info
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for analytics dashboards and data visualization apps.
 */

import React, { useState, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Menu,
  Divider,
  TextField,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CloseIcon from "@mui/icons-material/Close";
import CircleIcon from "@mui/icons-material/Circle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { ActionDock, ActionDockButton } from "../../../hud/docks";
import { ActionOrb } from "../../../hud-components/orbs";

// =============================================================================
// Types
// =============================================================================

export interface FilterOption {
  id: string;
  label: string;
  type: "select" | "checkbox" | "dateRange";
  value: unknown;
  options?: Array<{ value: string; label: string }>;
}

export interface LegendItem {
  id: string;
  label: string;
  color: string;
  visible: boolean;
}

export interface HudDataDashboardProps {
  children?: ReactNode;
  title?: string;
  filters?: FilterOption[];
  legends?: LegendItem[];
  timeRange?: string;
  chartType?: "line" | "bar" | "pie" | "table";
  lastUpdated?: string;
  dataPointsCount?: number;
  onFilterChange?: (filterId: string, value: unknown) => void;
  onTimeRangeChange?: (range: string) => void;
  onChartTypeChange?: (type: string) => void;
  onLegendToggle?: (legendId: string) => void;
  onRefresh?: () => void;
  onExport?: (format: string) => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetView?: () => void;
}

// =============================================================================
// Time Range Options
// =============================================================================

const timeRanges = [
  { value: "1d", label: "1D" },
  { value: "1w", label: "1W" },
  { value: "1m", label: "1M" },
  { value: "3m", label: "3M" },
  { value: "1y", label: "1Y" },
  { value: "all", label: "All" },
];

// =============================================================================
// Template Component
// =============================================================================

export function HudDataDashboard({
  children,
  title = "Analytics Dashboard",
  filters = [],
  legends = [],
  timeRange = "1m",
  chartType = "line",
  lastUpdated = "Just now",
  dataPointsCount = 0,
  onFilterChange,
  onTimeRangeChange,
  onChartTypeChange,
  onLegendToggle,
  onRefresh,
  onExport,
  onZoomIn,
  onZoomOut,
  onResetView,
}: HudDataDashboardProps) {
  const [showFilters, setShowFilters] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [exportAnchor, setExportAnchor] = useState<null | HTMLElement>(null);
  const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);

  const bgColor = "#0f0f14";
  const panelBg = "rgba(255,255,255,0.03)";
  const textColor = "#ffffff";
  const accentColor = "#3b82f6";

  // Default filters if none provided
  const displayFilters: FilterOption[] = filters.length > 0 ? filters : [
    {
      id: "region",
      label: "Region",
      type: "select",
      value: "all",
      options: [
        { value: "all", label: "All Regions" },
        { value: "na", label: "North America" },
        { value: "eu", label: "Europe" },
        { value: "apac", label: "Asia Pacific" },
      ],
    },
    {
      id: "category",
      label: "Category",
      type: "select",
      value: "all",
      options: [
        { value: "all", label: "All Categories" },
        { value: "sales", label: "Sales" },
        { value: "marketing", label: "Marketing" },
        { value: "support", label: "Support" },
      ],
    },
    { id: "showTrend", label: "Show Trend Line", type: "checkbox", value: true },
    { id: "showAverage", label: "Show Average", type: "checkbox", value: false },
  ];

  // Default legends if none provided
  const displayLegends: LegendItem[] = legends.length > 0 ? legends : [
    { id: "revenue", label: "Revenue", color: "#3b82f6", visible: true },
    { id: "users", label: "Active Users", color: "#22c55e", visible: true },
    { id: "conversion", label: "Conversion Rate", color: "#f59e0b", visible: true },
    { id: "churn", label: "Churn Rate", color: "#ef4444", visible: false },
  ];

  const chartIcons = {
    line: <ShowChartIcon />,
    bar: <BarChartIcon />,
    pie: <PieChartIcon />,
    table: <TableChartIcon />,
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: bgColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ================================================================= */}
      {/* TOP BAR */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: showFilters ? 280 : 0,
          right: 0,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          bgcolor: panelBg,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          zIndex: 1000,
          transition: "left 0.3s ease",
        }}
      >
        {/* Title and Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => setShowFilters(!showFilters)}
            sx={{ color: showFilters ? accentColor : textColor }}
          >
            <FilterListIcon />
          </IconButton>
          <Typography variant="h6" sx={{ color: textColor }}>
            {title}
          </Typography>
        </Box>

        {/* Time Range Selector */}
        <Box sx={{ display: "flex", gap: 0.5 }}>
          {timeRanges.map((range) => (
            <Chip
              key={range.value}
              label={range.label}
              onClick={() => onTimeRangeChange?.(range.value)}
              sx={{
                bgcolor: timeRange === range.value ? accentColor : "rgba(255,255,255,0.05)",
                color: textColor,
                "&:hover": { bgcolor: timeRange === range.value ? accentColor : "rgba(255,255,255,0.1)" },
              }}
            />
          ))}
        </Box>

        {/* Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Chart Type */}
          <Box sx={{ display: "flex", bgcolor: "rgba(255,255,255,0.05)", borderRadius: 1, p: 0.5 }}>
            {(["line", "bar", "pie", "table"] as const).map((type) => (
              <IconButton
                key={type}
                size="small"
                onClick={() => onChartTypeChange?.(type)}
                sx={{
                  color: chartType === type ? accentColor : textColor,
                  bgcolor: chartType === type ? "rgba(59, 130, 246, 0.2)" : "transparent",
                }}
              >
                {chartIcons[type]}
              </IconButton>
            ))}
          </Box>

          <IconButton onClick={onRefresh} sx={{ color: textColor }}>
            <RefreshIcon />
          </IconButton>

          <IconButton onClick={(e) => setExportAnchor(e.currentTarget)} sx={{ color: textColor }}>
            <DownloadIcon />
          </IconButton>

          <IconButton onClick={(e) => setSettingsAnchor(e.currentTarget)} sx={{ color: textColor }}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ================================================================= */}
      {/* LEFT: Filters Panel */}
      {/* ================================================================= */}
      {showFilters && (
        <Paper
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            width: 260,
            bgcolor: panelBg,
            borderRight: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1001,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" sx={{ color: textColor }}>
              Filters
            </Typography>
            <IconButton size="small" onClick={() => setShowFilters(false)} sx={{ color: textColor }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Filter controls */}
          <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
            {displayFilters.map((filter) => (
              <Box key={filter.id} sx={{ mb: 3 }}>
                {filter.type === "select" && (
                  <FormControl fullWidth size="small">
                    <InputLabel sx={{ color: textColor }}>{filter.label}</InputLabel>
                    <Select
                      value={filter.value as string}
                      label={filter.label}
                      onChange={(e) => onFilterChange?.(filter.id, e.target.value)}
                      sx={{
                        color: textColor,
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.3)" },
                        "& .MuiSvgIcon-root": { color: textColor },
                      }}
                    >
                      {filter.options?.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}

                {filter.type === "checkbox" && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filter.value as boolean}
                        onChange={(e) => onFilterChange?.(filter.id, e.target.checked)}
                        sx={{ color: accentColor, "&.Mui-checked": { color: accentColor } }}
                      />
                    }
                    label={filter.label}
                    sx={{ "& .MuiTypography-root": { color: textColor, fontSize: "0.875rem" } }}
                  />
                )}
              </Box>
            ))}
          </Box>

          {/* Apply button */}
          <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <Button fullWidth variant="contained" sx={{ bgcolor: accentColor }}>
              Apply Filters
            </Button>
          </Box>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* RIGHT: Legend */}
      {/* ================================================================= */}
      {showLegend && (
        <Paper
          sx={{
            position: "fixed",
            top: 80,
            right: 24,
            width: 200,
            bgcolor: panelBg,
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 2,
            zIndex: 999,
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" sx={{ color: textColor, textTransform: "uppercase" }}>
              Legend
            </Typography>
            <IconButton size="small" onClick={() => setShowLegend(false)} sx={{ color: textColor }}>
              <CloseIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
          <List dense sx={{ py: 0 }}>
            {displayLegends.map((item) => (
              <ListItemButton
                key={item.id}
                dense
                onClick={() => onLegendToggle?.(item.id)}
                sx={{ opacity: item.visible ? 1 : 0.4 }}
              >
                <ListItemIcon sx={{ minWidth: 28 }}>
                  <CircleIcon sx={{ color: item.color, fontSize: 12 }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ "& .MuiTypography-root": { color: textColor, fontSize: "0.8rem" } }}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}

      {/* ================================================================= */}
      {/* BOTTOM: Data Info */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          left: showFilters ? 304 : 24,
          display: "flex",
          alignItems: "center",
          gap: 3,
          transition: "left 0.3s ease",
        }}
      >
        <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
          Last updated: {lastUpdated}
        </Typography>
        <Typography variant="caption" sx={{ color: textColor, opacity: 0.5 }}>
          {dataPointsCount.toLocaleString()} data points
        </Typography>
      </Box>

      {/* ================================================================= */}
      {/* BOTTOM RIGHT: Zoom Controls */}
      {/* ================================================================= */}
      <ActionDock position="bottom-right">
        <ActionDockButton icon={<ZoomInIcon />} label="Zoom In" onClick={onZoomIn} />
        <ActionDockButton icon={<ZoomOutIcon />} label="Zoom Out" onClick={onZoomOut} />
        <ActionDockButton icon={<RestartAltIcon />} label="Reset View" onClick={onResetView} />
      </ActionDock>

      {/* ================================================================= */}
      {/* BOTTOM RIGHT: Legend Toggle */}
      {/* ================================================================= */}
      {!showLegend && (
        <Box sx={{ position: "fixed", top: 80, right: 24, zIndex: 999 }}>
          <ActionOrb
            icon={<CircleIcon />}
            label="Show Legend"
            size="sm"
            variant="glass"
            color="primary"
            colorMode="dark"
            onClick={() => setShowLegend(true)}
          />
        </Box>
      )}

      {/* ================================================================= */}
      {/* EXPORT MENU */}
      {/* ================================================================= */}
      <Menu
        anchorEl={exportAnchor}
        open={Boolean(exportAnchor)}
        onClose={() => setExportAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "rgba(15, 15, 20, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              "& .MuiMenuItem-root": { color: textColor },
            },
          },
        }}
      >
        <MenuItem onClick={() => { onExport?.("csv"); setExportAnchor(null); }}>Export as CSV</MenuItem>
        <MenuItem onClick={() => { onExport?.("xlsx"); setExportAnchor(null); }}>Export as Excel</MenuItem>
        <MenuItem onClick={() => { onExport?.("png"); setExportAnchor(null); }}>Export as PNG</MenuItem>
        <MenuItem onClick={() => { onExport?.("pdf"); setExportAnchor(null); }}>Export as PDF</MenuItem>
      </Menu>

      {/* ================================================================= */}
      {/* SETTINGS MENU */}
      {/* ================================================================= */}
      <Menu
        anchorEl={settingsAnchor}
        open={Boolean(settingsAnchor)}
        onClose={() => setSettingsAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "rgba(15, 15, 20, 0.95)",
              border: "1px solid rgba(255,255,255,0.1)",
              "& .MuiMenuItem-root": { color: textColor },
              minWidth: 200,
            },
          },
        }}
      >
        <MenuItem>
          <FormControlLabel
            control={<Switch size="small" defaultChecked />}
            label="Auto-refresh"
            sx={{ width: "100%", "& .MuiTypography-root": { fontSize: "0.875rem" } }}
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={<Switch size="small" />}
            label="Show grid lines"
            sx={{ width: "100%", "& .MuiTypography-root": { fontSize: "0.875rem" } }}
          />
        </MenuItem>
        <MenuItem>
          <FormControlLabel
            control={<Switch size="small" defaultChecked />}
            label="Animate transitions"
            sx={{ width: "100%", "& .MuiTypography-root": { fontSize: "0.875rem" } }}
          />
        </MenuItem>
      </Menu>

      {/* ================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ================================================================= */}
      {children ?? (
        <Box
          sx={{
            position: "absolute",
            top: 64,
            left: showFilters ? 280 : 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "left 0.3s ease",
          }}
        >
          <Typography variant="h3" sx={{ color: textColor, opacity: 0.1 }}>
            Chart Area
          </Typography>
        </Box>
      )}
    </Box>
  );
}

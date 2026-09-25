"use client";
/**
 * HUD Template: E-Reader
 *
 * Book reading application layout:
 * - Page flip navigation
 * - Table of contents
 * - Bookmarks
 * - Font/display settings
 * - Reading progress
 * - Highlights and notes
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for e-books, documents, and long-form reading.
 */

import React, { useState, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  LinearProgress,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import HighlightIcon from "@mui/icons-material/Highlight";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CloseIcon from "@mui/icons-material/Close";

// =============================================================================
// Types
// =============================================================================

export interface Chapter {
  id: string;
  title: string;
  page: number;
  level?: number; // nesting level for sub-chapters
}

export interface Bookmark {
  id: string;
  page: number;
  title?: string;
  createdAt: Date;
}

export interface Highlight {
  id: string;
  page: number;
  text: string;
  color: string;
  note?: string;
}

export interface HudEReaderProps {
  children?: ReactNode;
  bookTitle?: string;
  author?: string;
  currentPage?: number;
  totalPages?: number;
  chapters?: Chapter[];
  bookmarks?: Bookmark[];
  highlights?: Highlight[];
  isCurrentPageBookmarked?: boolean;
  fontSize?: number;
  theme?: "light" | "dark" | "sepia";
  onPageChange?: (page: number) => void;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  onChapterSelect?: (chapter: Chapter) => void;
  onToggleBookmark?: () => void;
  onFontSizeChange?: (size: number) => void;
  onThemeChange?: (theme: "light" | "dark" | "sepia") => void;
  onSearch?: () => void;
  onAddHighlight?: () => void;
  onAddNote?: () => void;
}

// =============================================================================
// Theme colors
// =============================================================================

const themes = {
  light: { bg: "#ffffff", text: "#1a1a1a", paper: "#f5f5f5" },
  dark: { bg: "#1a1a1a", text: "#e0e0e0", paper: "#2a2a2a" },
  sepia: { bg: "#f4ecd8", text: "#5b4636", paper: "#ebe0c8" },
};

// =============================================================================
// Template Component
// =============================================================================

export function HudEReader({
  children,
  bookTitle = "Untitled Book",
  author = "Unknown Author",
  currentPage = 1,
  totalPages = 100,
  chapters = [],
  bookmarks = [],
  highlights = [],
  isCurrentPageBookmarked = false,
  fontSize = 16,
  theme = "light",
  onPageChange,
  onNextPage,
  onPrevPage,
  onChapterSelect,
  onToggleBookmark,
  onFontSizeChange,
  onThemeChange,
  onSearch,
  onAddHighlight,
  onAddNote,
}: HudEReaderProps) {
  const [showToc, setShowToc] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const colors = themes[theme];
  const progress = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;

  // Default chapters if none provided
  const displayChapters: Chapter[] = chapters.length > 0 ? chapters : [
    { id: "1", title: "Chapter 1: Introduction", page: 1 },
    { id: "2", title: "Chapter 2: The Beginning", page: 15 },
    { id: "3", title: "Chapter 3: Rising Action", page: 45 },
    { id: "4", title: "Chapter 4: The Climax", page: 78 },
    { id: "5", title: "Chapter 5: Resolution", page: 95 },
  ];

  // Find current chapter
  const currentChapter = [...displayChapters]
    .reverse()
    .find((ch) => currentPage >= ch.page);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: colors.bg,
        position: "relative",
        overflow: "hidden",
        transition: "background-color 0.3s ease",
      }}
      onClick={() => setShowControls(!showControls)}
    >
      {/* ================================================================= */}
      {/* TOP BAR */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          bgcolor: colors.paper,
          borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          transform: showControls ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease",
          zIndex: 1000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={() => setShowToc(true)} sx={{ color: colors.text }}>
            <MenuIcon />
          </IconButton>
          <Box>
            <Typography variant="subtitle2" sx={{ color: colors.text, fontWeight: 600 }}>
              {bookTitle}
            </Typography>
            <Typography variant="caption" sx={{ color: colors.text, opacity: 0.6 }}>
              {currentChapter?.title || ""}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton onClick={onSearch} sx={{ color: colors.text }}>
            <SearchIcon />
          </IconButton>
          <IconButton onClick={onToggleBookmark} sx={{ color: isCurrentPageBookmarked ? "#f59e0b" : colors.text }}>
            {isCurrentPageBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
          <IconButton onClick={() => setShowSettings(true)} sx={{ color: colors.text }}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ================================================================= */}
      {/* BOTTOM BAR */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: colors.paper,
          borderTop: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          transform: showControls ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease",
          zIndex: 1000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 3,
            bgcolor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            "& .MuiLinearProgress-bar": { bgcolor: "#3b82f6" },
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1 }}>
          <IconButton onClick={onPrevPage} disabled={currentPage <= 1} sx={{ color: colors.text }}>
            <ChevronLeftIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" sx={{ color: colors.text }}>
              Page {currentPage} of {totalPages}
            </Typography>
            <Chip
              label={`${Math.round(progress)}%`}
              size="small"
              sx={{
                bgcolor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                color: colors.text,
              }}
            />
          </Box>

          <IconButton onClick={onNextPage} disabled={currentPage >= totalPages} sx={{ color: colors.text }}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* Page slider */}
        <Box sx={{ px: 4, pb: 2 }}>
          <Slider
            value={currentPage}
            min={1}
            max={totalPages}
            onChange={(_, v) => onPageChange?.(v as number)}
            size="small"
            sx={{
              color: "#3b82f6",
              "& .MuiSlider-thumb": { width: 16, height: 16 },
            }}
          />
        </Box>
      </Box>

      {/* ================================================================= */}
      {/* SIDE: Page Turn Zones */}
      {/* ================================================================= */}
      <Box
        onClick={(e) => { e.stopPropagation(); onPrevPage?.(); }}
        sx={{
          position: "fixed",
          left: 0,
          top: 56,
          bottom: 120,
          width: "20%",
          cursor: "pointer",
          "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
        }}
      />
      <Box
        onClick={(e) => { e.stopPropagation(); onNextPage?.(); }}
        sx={{
          position: "fixed",
          right: 0,
          top: 56,
          bottom: 120,
          width: "20%",
          cursor: "pointer",
          "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
        }}
      />

      {/* ================================================================= */}
      {/* FLOATING: Highlight/Note Tools */}
      {/* ================================================================= */}
      <Box
        sx={{
          position: "fixed",
          right: 24,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          opacity: showControls ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 999,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          onClick={onAddHighlight}
          sx={{
            bgcolor: colors.paper,
            color: colors.text,
            boxShadow: 2,
            "&:hover": { bgcolor: colors.paper },
          }}
        >
          <HighlightIcon />
        </IconButton>
        <IconButton
          onClick={onAddNote}
          sx={{
            bgcolor: colors.paper,
            color: colors.text,
            boxShadow: 2,
            "&:hover": { bgcolor: colors.paper },
          }}
        >
          <NoteAddIcon />
        </IconButton>
      </Box>

      {/* ================================================================= */}
      {/* DRAWER: Table of Contents */}
      {/* ================================================================= */}
      <Drawer
        open={showToc}
        onClose={() => setShowToc(false)}
        slotProps={{
          paper: {
            sx: { width: 320, bgcolor: colors.paper },
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}` }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" sx={{ color: colors.text }}>Contents</Typography>
            <IconButton onClick={() => setShowToc(false)} sx={{ color: colors.text }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Tabs for TOC / Bookmarks / Highlights */}
        <Box sx={{ borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}` }}>
          <Box sx={{ display: "flex" }}>
            {["Chapters", "Bookmarks", "Highlights"].map((tab) => (
              <Box
                key={tab}
                sx={{
                  flex: 1,
                  py: 1.5,
                  textAlign: "center",
                  cursor: "pointer",
                  color: colors.text,
                  fontSize: "0.875rem",
                  borderBottom: tab === "Chapters" ? "2px solid #3b82f6" : "none",
                }}
              >
                {tab}
              </Box>
            ))}
          </Box>
        </Box>

        <List sx={{ flex: 1, overflow: "auto" }}>
          {displayChapters.map((chapter) => (
            <ListItem key={chapter.id} disablePadding>
              <ListItemButton
                onClick={() => {
                  onChapterSelect?.(chapter);
                  setShowToc(false);
                }}
                sx={{
                  pl: 2 + (chapter.level || 0) * 2,
                  bgcolor: currentChapter?.id === chapter.id ? "rgba(59, 130, 246, 0.1)" : "transparent",
                }}
              >
                <ListItemText
                  primary={chapter.title}
                  secondary={`Page ${chapter.page}`}
                  sx={{
                    "& .MuiTypography-root": { color: colors.text },
                    "& .MuiTypography-body2": { opacity: 0.6 },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* ================================================================= */}
      {/* DRAWER: Settings */}
      {/* ================================================================= */}
      <Drawer
        anchor="right"
        open={showSettings}
        onClose={() => setShowSettings(false)}
        slotProps={{
          paper: {
            sx: { width: 320, bgcolor: colors.paper },
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}` }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" sx={{ color: colors.text }}>Settings</Typography>
            <IconButton onClick={() => setShowSettings(false)} sx={{ color: colors.text }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>
          {/* Theme */}
          <Typography variant="subtitle2" sx={{ color: colors.text, mb: 1 }}>
            Theme
          </Typography>
          <ToggleButtonGroup
            value={theme}
            exclusive
            onChange={(_, v) => v && onThemeChange?.(v)}
            fullWidth
            sx={{ mb: 3 }}
          >
            <ToggleButton value="light" sx={{ color: colors.text }}>
              <Brightness7Icon sx={{ mr: 1 }} /> Light
            </ToggleButton>
            <ToggleButton value="sepia" sx={{ color: colors.text }}>
              <BrightnessAutoIcon sx={{ mr: 1 }} /> Sepia
            </ToggleButton>
            <ToggleButton value="dark" sx={{ color: colors.text }}>
              <Brightness4Icon sx={{ mr: 1 }} /> Dark
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Font Size */}
          <Typography variant="subtitle2" sx={{ color: colors.text, mb: 1 }}>
            Font Size
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FormatSizeIcon sx={{ color: colors.text, fontSize: 16 }} />
            <Slider
              value={fontSize}
              min={12}
              max={24}
              onChange={(_, v) => onFontSizeChange?.(v as number)}
              sx={{ color: "#3b82f6" }}
            />
            <FormatSizeIcon sx={{ color: colors.text, fontSize: 24 }} />
          </Box>
          <Typography variant="caption" sx={{ color: colors.text, opacity: 0.6 }}>
            {fontSize}px
          </Typography>
        </Box>
      </Drawer>

      {/* ================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ================================================================= */}
      {children ?? (
        <Box
          sx={{
            position: "absolute",
            top: 56,
            left: 0,
            right: 0,
            bottom: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 4,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: colors.text,
              maxWidth: 700,
              fontSize: `${fontSize}px`,
              lineHeight: 1.8,
              textAlign: "justify",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

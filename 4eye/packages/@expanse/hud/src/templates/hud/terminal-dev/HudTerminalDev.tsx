"use client";
/**
 * HUD Template: Terminal/Dev
 *
 * Developer terminal/IDE layout:
 * - Split panes
 * - Command palette
 * - Log output
 * - Status bar
 * - File tree
 *
 * USAGE: Copy this file into your app and modify as needed.
 * Designed for terminal applications, IDEs, and developer tools.
 */

import React, { useState, type ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Chip,
  Divider,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CodeIcon from "@mui/icons-material/Code";
import TerminalIcon from "@mui/icons-material/Terminal";
import BugReportIcon from "@mui/icons-material/BugReport";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import RefreshIcon from "@mui/icons-material/Refresh";
import SplitscreenIcon from "@mui/icons-material/Splitscreen";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloudIcon from "@mui/icons-material/Cloud";
import MemoryIcon from "@mui/icons-material/Memory";

// =============================================================================
// Types
// =============================================================================

export interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  isOpen?: boolean;
}

export interface LogEntry {
  id: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  timestamp: string;
  source?: string;
}

export interface StatusItem {
  id: string;
  label: string;
  value?: string;
  icon?: ReactNode;
  color?: string;
}

export interface HudTerminalDevProps {
  children?: ReactNode;
  files?: FileNode[];
  logs?: LogEntry[];
  statusItems?: StatusItem[];
  selectedFileId?: string;
  terminalOutput?: string[];
  isRunning?: boolean;
  gitBranch?: string;
  gitChanges?: number;
  cpuUsage?: number;
  memoryUsage?: number;
  onFileSelect?: (fileId: string) => void;
  onFolderToggle?: (folderId: string) => void;
  onCommand?: (command: string) => void;
  onRun?: () => void;
  onStop?: () => void;
  onClearLogs?: () => void;
  onSearch?: () => void;
  onSettings?: () => void;
}

// =============================================================================
// Template Component
// =============================================================================

export function HudTerminalDev({
  children,
  files = [],
  logs = [],
  statusItems = [],
  selectedFileId,
  terminalOutput = [],
  isRunning = false,
  gitBranch = "main",
  gitChanges = 0,
  cpuUsage = 12,
  memoryUsage = 45,
  onFileSelect,
  onFolderToggle,
  onCommand,
  onRun,
  onStop,
  onClearLogs,
  onSearch,
  onSettings,
}: HudTerminalDevProps) {
  const [commandInput, setCommandInput] = useState("");
  const [showFileTree, setShowFileTree] = useState(true);
  const [showLogs, setShowLogs] = useState(true);

  const bgColor = "#1e1e1e";
  const panelBg = "#252526";
  const sidebarBg = "#333333";
  const textColor = "#cccccc";
  const accentColor = "#007acc";

  // Default files
  const displayFiles: FileNode[] = files.length > 0 ? files : [
    {
      id: "src",
      name: "src",
      type: "folder",
      isOpen: true,
      children: [
        { id: "app", name: "App.tsx", type: "file" },
        { id: "index", name: "index.ts", type: "file" },
        {
          id: "components",
          name: "components",
          type: "folder",
          isOpen: false,
          children: [
            { id: "button", name: "Button.tsx", type: "file" },
            { id: "input", name: "Input.tsx", type: "file" },
          ],
        },
      ],
    },
    { id: "package", name: "package.json", type: "file" },
    { id: "readme", name: "README.md", type: "file" },
  ];

  // Default logs
  const displayLogs: LogEntry[] = logs.length > 0 ? logs : [
    { id: "1", level: "info", message: "Server started on port 3000", timestamp: "10:23:45", source: "server" },
    { id: "2", level: "debug", message: "Compiling TypeScript...", timestamp: "10:23:46", source: "tsc" },
    { id: "3", level: "warn", message: "Unused variable 'test'", timestamp: "10:23:47", source: "lint" },
    { id: "4", level: "info", message: "Build completed in 1.2s", timestamp: "10:23:48", source: "build" },
    { id: "5", level: "error", message: "Failed to connect to database", timestamp: "10:23:50", source: "db" },
  ];

  // Default terminal output
  const displayTerminal: string[] = terminalOutput.length > 0 ? terminalOutput : [
    "$ npm run dev",
    "> project@1.0.0 dev",
    "> vite",
    "",
    "  VITE v5.0.0  ready in 234 ms",
    "",
    "  ➜  Local:   http://localhost:3000/",
    "  ➜  Network: http://192.168.1.100:3000/",
    "",
  ];

  const logIcons: Record<string, ReactNode> = {
    info: <InfoIcon sx={{ color: "#3b82f6", fontSize: 16 }} />,
    warn: <WarningIcon sx={{ color: "#f59e0b", fontSize: 16 }} />,
    error: <ErrorIcon sx={{ color: "#ef4444", fontSize: 16 }} />,
    debug: <BugReportIcon sx={{ color: "#6b7280", fontSize: 16 }} />,
  };

  const handleCommand = () => {
    if (commandInput.trim()) {
      onCommand?.(commandInput);
      setCommandInput("");
    }
  };

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => (
      <Box key={node.id}>
        <ListItemButton
          onClick={() => {
            if (node.type === "folder") {
              onFolderToggle?.(node.id);
            } else {
              onFileSelect?.(node.id);
            }
          }}
          sx={{
            pl: 1 + depth * 1.5,
            py: 0.25,
            bgcolor: selectedFileId === node.id ? "rgba(255,255,255,0.1)" : "transparent",
            "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
          }}
        >
          <ListItemIcon sx={{ minWidth: 28 }}>
            {node.type === "folder" ? (
              node.isOpen ? (
                <FolderOpenIcon sx={{ color: "#dcb67a", fontSize: 18 }} />
              ) : (
                <FolderIcon sx={{ color: "#dcb67a", fontSize: 18 }} />
              )
            ) : (
              <InsertDriveFileIcon sx={{ color: textColor, fontSize: 18 }} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={node.name}
            sx={{ "& .MuiTypography-root": { color: textColor, fontSize: "0.85rem" } }}
          />
        </ListItemButton>
        {node.type === "folder" && node.isOpen && node.children && (
          <Box>{renderFileTree(node.children, depth + 1)}</Box>
        )}
      </Box>
    ));
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: bgColor,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ================================================================= */}
      {/* TOP: Title Bar */}
      {/* ================================================================= */}
      <Box
        sx={{
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          bgcolor: "#3c3c3c",
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CodeIcon sx={{ color: accentColor, fontSize: 18 }} />
          <Typography variant="body2" sx={{ color: textColor, fontSize: "0.8rem" }}>
            Terminal Dev
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small" onClick={onSearch} sx={{ color: textColor }}>
            <SearchIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton size="small" onClick={onSettings} sx={{ color: textColor }}>
            <SettingsIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      {/* ================================================================= */}
      {/* MAIN AREA */}
      {/* ================================================================= */}
      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Activity Bar */}
        <Box
          sx={{
            width: 48,
            bgcolor: sidebarBg,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 1,
          }}
        >
          <IconButton
            onClick={() => setShowFileTree(!showFileTree)}
            sx={{ color: showFileTree ? "white" : textColor, mb: 1 }}
          >
            <InsertDriveFileIcon />
          </IconButton>
          <IconButton sx={{ color: textColor, mb: 1 }}>
            <SearchIcon />
          </IconButton>
          <IconButton sx={{ color: textColor, mb: 1 }}>
            <GitHubIcon />
          </IconButton>
          <IconButton
            onClick={() => setShowLogs(!showLogs)}
            sx={{ color: showLogs ? "white" : textColor, mb: 1 }}
          >
            <BugReportIcon />
          </IconButton>
        </Box>

        {/* File Tree */}
        {showFileTree && (
          <Box
            sx={{
              width: 220,
              bgcolor: panelBg,
              borderRight: "1px solid #3c3c3c",
              overflow: "auto",
            }}
          >
            <Box sx={{ p: 1, borderBottom: "1px solid #3c3c3c" }}>
              <Typography variant="caption" sx={{ color: textColor, textTransform: "uppercase", fontWeight: 600 }}>
                Explorer
              </Typography>
            </Box>
            <List dense sx={{ py: 0 }}>
              {renderFileTree(displayFiles)}
            </List>
          </Box>
        )}

        {/* Editor / Content Area */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Editor Tabs */}
          <Box
            sx={{
              height: 36,
              bgcolor: panelBg,
              borderBottom: "1px solid #3c3c3c",
              display: "flex",
              alignItems: "center",
              px: 1,
            }}
          >
            <Chip
              label="App.tsx"
              size="small"
              sx={{
                bgcolor: bgColor,
                color: textColor,
                borderRadius: 0,
                height: 28,
              }}
            />
          </Box>

          {/* Editor Content */}
          <Box sx={{ flex: 1, p: 2, overflow: "auto" }}>
            {children ?? (
              <Typography
                component="pre"
                sx={{
                  color: textColor,
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  m: 0,
                }}
              >
{`import React from 'react';

export function App() {
  return (
    <div className="app">
      <h1>Hello, World!</h1>
    </div>
  );
}`}
              </Typography>
            )}
          </Box>

          {/* Terminal / Logs Panel */}
          {showLogs && (
            <Box
              sx={{
                height: 200,
                bgcolor: panelBg,
                borderTop: "1px solid #3c3c3c",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Panel Tabs */}
              <Box
                sx={{
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                  borderBottom: "1px solid #3c3c3c",
                  gap: 2,
                }}
              >
                <Typography variant="caption" sx={{ color: textColor, textTransform: "uppercase" }}>
                  Problems
                </Typography>
                <Typography variant="caption" sx={{ color: "white", textTransform: "uppercase", borderBottom: "1px solid white", pb: 0.5 }}>
                  Terminal
                </Typography>
                <Typography variant="caption" sx={{ color: textColor, textTransform: "uppercase" }}>
                  Output
                </Typography>
              </Box>

              {/* Terminal Output */}
              <Box sx={{ flex: 1, overflow: "auto", p: 1 }}>
                {displayTerminal.map((line, idx) => (
                  <Typography
                    key={idx}
                    component="div"
                    sx={{
                      color: textColor,
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "0.8rem",
                      whiteSpace: "pre",
                    }}
                  >
                    {line || " "}
                  </Typography>
                ))}
              </Box>

              {/* Command Input */}
              <Box sx={{ display: "flex", alignItems: "center", p: 0.5, borderTop: "1px solid #3c3c3c" }}>
                <Typography sx={{ color: "#22c55e", fontFamily: "monospace", mr: 1 }}>$</Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type command..."
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleCommand()}
                  sx={{
                    "& .MuiInputBase-input": {
                      color: textColor,
                      fontFamily: "'Fira Code', monospace",
                      fontSize: "0.8rem",
                      py: 0.5,
                    },
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* ================================================================= */}
      {/* BOTTOM: Status Bar */}
      {/* ================================================================= */}
      <Box
        sx={{
          height: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
          bgcolor: accentColor,
          zIndex: 1000,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Git */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <GitHubIcon sx={{ fontSize: 14, color: "white" }} />
            <Typography variant="caption" sx={{ color: "white" }}>
              {gitBranch}
            </Typography>
            {gitChanges > 0 && (
              <Typography variant="caption" sx={{ color: "white" }}>
                +{gitChanges}
              </Typography>
            )}
          </Box>

          {/* Run Status */}
          {isRunning ? (
            <Chip
              icon={<StopIcon sx={{ fontSize: 14 }} />}
              label="Running"
              size="small"
              onClick={onStop}
              sx={{ height: 18, bgcolor: "rgba(255,255,255,0.2)", color: "white", "& .MuiChip-icon": { color: "white" } }}
            />
          ) : (
            <Chip
              icon={<PlayArrowIcon sx={{ fontSize: 14 }} />}
              label="Run"
              size="small"
              onClick={onRun}
              sx={{ height: 18, bgcolor: "rgba(255,255,255,0.2)", color: "white", "& .MuiChip-icon": { color: "white" } }}
            />
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* CPU */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <MemoryIcon sx={{ fontSize: 14, color: "white" }} />
            <Typography variant="caption" sx={{ color: "white" }}>
              CPU {cpuUsage}%
            </Typography>
          </Box>
          {/* Memory */}
          <Typography variant="caption" sx={{ color: "white" }}>
            Mem {memoryUsage}%
          </Typography>
          {/* Errors/Warnings */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
              <ErrorIcon sx={{ fontSize: 14, color: "white" }} />
              <Typography variant="caption" sx={{ color: "white" }}>0</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
              <WarningIcon sx={{ fontSize: 14, color: "white" }} />
              <Typography variant="caption" sx={{ color: "white" }}>1</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

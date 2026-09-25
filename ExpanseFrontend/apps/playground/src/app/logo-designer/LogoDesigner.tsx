/**
 * Logo Designer - Main Container
 * Interactive UI for configuring ExpanseLogoV3
 */

"use client"

import { useEffect, useCallback } from "react"
import { Box, Typography, AppBar, Toolbar, IconButton, Tooltip } from "@mui/material"
import { DarkMode, LightMode, Home as HomeIcon } from "@mui/icons-material"
import Link from "next/link"
import { useLogoConfig } from "./hooks/useLogoConfig"
import { PreviewPanel, ComparePreview } from "./components/PreviewPanel"
import { ControlPanel } from "./components/ControlPanel"
import { DEFAULT_CONFIG } from "./types"

const PREVIEW_CONTAINER_ID = 'logo-preview-container'

export function LogoDesigner() {
  const {
    config,
    presets,
    compareMode,
    compareConfig,
    canUndo,
    canRedo,
    updateConfig,
    resetConfig,
    loadPreset,
    savePreset,
    deletePreset,
    undo,
    redo,
    setCompareMode,
    setComparePreset,
  } = useLogoConfig()

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault()
          undo()
        } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
          e.preventDefault()
          redo()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  // Determine background color for header
  const isDarkBg = isDarkBackground(config.backgroundColor)

  const handleToggleCompare = useCallback(() => {
    setCompareMode(!compareMode)
  }, [compareMode, setCompareMode])

  const handleComparePreset = useCallback((presetId: string) => {
    setComparePreset(presetId)
  }, [setComparePreset])

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* App Bar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar variant="dense">
          <Link href="/" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton edge="start" sx={{ mr: 1 }}>
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Logo Designer
          </Typography>
          <Tooltip title="Toggle dark/light background">
            <IconButton
              onClick={() =>
                updateConfig({
                  backgroundColor: isDarkBg ? '#f5f5f5' : '#1a1a2e',
                })
              }
            >
              {isDarkBg ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Preview Area */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.100',
            position: 'relative',
            overflow: 'auto',
            p: 4,
          }}
        >
          {compareMode ? (
            <ComparePreview
              currentConfig={config}
              compareConfig={compareConfig}
              containerId={PREVIEW_CONTAINER_ID}
            />
          ) : (
            <PreviewPanel
              config={config}
              containerId={PREVIEW_CONTAINER_ID}
            />
          )}
        </Box>

        {/* Control Panel */}
        <ControlPanel
          config={config}
          presets={presets}
          compareMode={compareMode}
          canUndo={canUndo}
          canRedo={canRedo}
          previewContainerId={PREVIEW_CONTAINER_ID}
          onConfigChange={updateConfig}
          onReset={resetConfig}
          onUndo={undo}
          onRedo={redo}
          onLoadPreset={loadPreset}
          onSavePreset={savePreset}
          onDeletePreset={deletePreset}
          onToggleCompare={handleToggleCompare}
          onComparePreset={handleComparePreset}
        />
      </Box>
    </Box>
  )
}

/**
 * Determine if a hex color is dark
 */
function isDarkBackground(hex: string): boolean {
  // Remove # if present
  const color = hex.replace('#', '')
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)
  // YIQ formula
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq < 128
}

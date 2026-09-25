/**
 * Preview Panel
 * Main logo preview with background and size controls
 */

"use client"

import { Box, Paper, Typography, Chip } from "@mui/material"
import { ExpanseLogoV3, ExpanseLogoV3_3D } from "expanse.dynamicAssets/logo"
import { LogoConfig } from "../types"
import { configToProps } from "../utils/configUtils"

interface PreviewPanelProps {
  config: LogoConfig
  containerId: string
  title?: string
}

export function PreviewPanel({
  config,
  containerId,
  title,
}: PreviewPanelProps) {
  const props = configToProps(config)
  const LogoComponent = config.use3D ? ExpanseLogoV3_3D : ExpanseLogoV3

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {title && (
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
      )}

      <Paper
        id={containerId}
        elevation={3}
        sx={{
          width: config.previewSize,
          height: config.previewSize,
          backgroundColor: config.backgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          overflow: "hidden",
          transition: "background-color 0.2s ease",
        }}
      >
        <LogoComponent
          {...props}
          height={config.previewSize * 0.8}
          id={`${containerId}-logo`}
        />
      </Paper>

      {/* Info Chips */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
          justifyContent: "center",
        }}
      >
        <Chip
          label={
            config.extentMode === "preset"
              ? config.ringExtent
              : `rx=${config.customRx}`
          }
          size="small"
          variant="outlined"
        />
        <Chip
          label={`${config.orbitalRotation}°`}
          size="small"
          variant="outlined"
        />
        {config.mirroredRings && (
          <Chip
            label="X-pattern"
            size="small"
            color="primary"
            variant="outlined"
          />
        )}
        {config.circular && (
          <Chip
            label="Circular"
            size="small"
            color="secondary"
            variant="outlined"
          />
        )}
        <Chip
          label={config.use3D ? "3D" : "2D"}
          size="small"
          variant="outlined"
        />
      </Box>
    </Box>
  )
}

/**
 * Compare Preview - Side by side comparison
 */
interface ComparePreviewProps {
  currentConfig: LogoConfig
  compareConfig: LogoConfig | null
  containerId: string
}

export function ComparePreview({
  currentConfig,
  compareConfig,
  containerId,
}: ComparePreviewProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      {/* Current */}
      <PreviewPanel
        config={currentConfig}
        containerId={containerId}
        title="Current"
      />

      {/* Compare */}
      {compareConfig ? (
        <PreviewPanel
          config={{
            ...compareConfig,
            backgroundColor: currentConfig.backgroundColor,
          }}
          containerId={`${containerId}-compare`}
          title="Compare"
        />
      ) : (
        <Box
          sx={{
            width: currentConfig.previewSize,
            height: currentConfig.previewSize,
            border: "2px dashed",
            borderColor: "divider",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="text.secondary">
            Select a preset to compare
          </Typography>
        </Box>
      )}
    </Box>
  )
}

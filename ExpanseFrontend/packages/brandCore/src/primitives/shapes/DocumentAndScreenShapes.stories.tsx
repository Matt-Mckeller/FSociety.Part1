import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Stack, Paper } from "@mui/material"
import {
  PaperShape,
  FoldedPaperShape,
  ClipboardShape,
  NotebookPageShape,
  DOCUMENT_RATIOS,
} from "./DocumentShapes"
import {
  BrowserWindowShape,
  MobilePhoneShape,
  TabletShape,
  SCREEN_RATIOS,
} from "./ScreenShapes"

/**
 * Document and Screen shape primitives for the brandCore package.
 * These shapes are used for homework cards, device mockups, and app screenshots.
 */
const meta: Meta = {
  title: "BrandCore/Primitives/DocumentAndScreenShapes",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "light", value: "#f5f5f5" },
        { name: "dark", value: "#1a1a2e" },
      ],
    },
  },
}

export default meta

// ============================================================================
// DOCUMENT SHAPES
// ============================================================================

export const PaperBasic: StoryObj = {
  name: "Paper Shape - Basic",
  render: () => (
    <Stack direction="row" spacing={4}>
      {(["usLetter", "a4", "square"] as const).map((ratio) => (
        <Box key={ratio} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
            {ratio} ({DOCUMENT_RATIOS[ratio].toFixed(2)})
          </Typography>
          <Box sx={{ width: 120 }}>
            <svg viewBox="0 0 120 160" width="100%" height="100%">
              <PaperShape width={120} ratio={ratio} />
            </svg>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
}

export const FoldedPaperBasic: StoryObj = {
  name: "Folded Paper Shape - Corner Styles",
  render: () => (
    <Stack direction="row" spacing={4}>
      {[10, 20, 30].map((foldSize) => (
        <Box key={foldSize} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
            Fold: {foldSize}px
          </Typography>
          <svg width={120} height={155}>
            <FoldedPaperShape
              width={120}
              height={155}
              foldSize={foldSize}
              showShadow
            />
          </svg>
        </Box>
      ))}
    </Stack>
  ),
}

export const ClipboardBasic: StoryObj = {
  name: "Clipboard Shape - Variants",
  render: () => (
    <Stack direction="row" spacing={4}>
      {[0.06, 0.08, 0.1].map((clipHeight) => (
        <Box key={clipHeight} sx={{ textAlign: "center" }}>
          <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
            Clip Height: {(clipHeight * 100).toFixed(0)}%
          </Typography>
          <svg width={100} height={140}>
            <ClipboardShape width={100} height={140} clipHeight={clipHeight} />
          </svg>
        </Box>
      ))}
    </Stack>
  ),
}

export const NotebookPageBasic: StoryObj = {
  name: "Notebook Page Shape - Styles",
  render: () => (
    <Stack direction="row" spacing={4}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
          With Lines
        </Typography>
        <svg width={140} height={180}>
          <NotebookPageShape
            width={140}
            height={180}
            showLines
            spiralHoles={6}
          />
        </svg>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
          More Holes
        </Typography>
        <svg width={140} height={180}>
          <NotebookPageShape
            width={140}
            height={180}
            showLines
            spiralHoles={10}
          />
        </svg>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
          Blank
        </Typography>
        <svg width={140} height={180}>
          <NotebookPageShape
            width={140}
            height={180}
            showLines={false}
            spiralHoles={6}
          />
        </svg>
      </Box>
    </Stack>
  ),
}

export const DocumentRatiosShowcase: StoryObj = {
  name: "Document Ratios Comparison",
  render: () => (
    <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
      {(
        Object.keys(DOCUMENT_RATIOS) as Array<keyof typeof DOCUMENT_RATIOS>
      ).map((ratio) => {
        const aspectRatio = DOCUMENT_RATIOS[ratio]
        const width = 80
        const height = width * aspectRatio
        return (
          <Box key={ratio} sx={{ textAlign: "center" }}>
            <Typography
              variant="caption"
              sx={{ display: "block", mb: 1, fontSize: "0.65rem" }}
            >
              {ratio}
            </Typography>
            <svg width={width} height={height}>
              <FoldedPaperShape
                width={width}
                height={height}
                foldSize={width * 0.1}
              />
            </svg>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 0.5,
                color: "text.secondary",
                fontSize: "0.6rem",
              }}
            >
              {aspectRatio.toFixed(2)}
            </Typography>
          </Box>
        )
      })}
    </Stack>
  ),
}

// ============================================================================
// SCREEN SHAPES
// ============================================================================

export const BrowserWindowBasic: StoryObj = {
  name: "Browser Window - Basic",
  render: () => (
    <Stack direction="row" spacing={4}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
          Full Controls
        </Typography>
        <svg width={240} height={150}>
          <BrowserWindowShape
            width={240}
            height={150}
            showButtons
            showAddressBar
          />
        </svg>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
          Minimal
        </Typography>
        <svg width={240} height={150}>
          <BrowserWindowShape
            width={240}
            height={150}
            showButtons={false}
            showAddressBar={false}
          />
        </svg>
      </Box>
    </Stack>
  ),
}

export const MobilePhoneBasic: StoryObj = {
  name: "Mobile Phone - Variants",
  render: () => (
    <Stack direction="row" spacing={4} sx={{ alignItems: "flex-end" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
          Modern (19.5:9)
        </Typography>
        <svg width={60} height={130}>
          <MobilePhoneShape
            width={60}
            ratio="phoneTall"
            showNotch
            showHomeIndicator
          />
        </svg>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
          Classic (16:9)
        </Typography>
        <svg width={60} height={107}>
          <MobilePhoneShape
            width={60}
            ratio="phone16x9"
            showNotch={false}
            showHomeIndicator
          />
        </svg>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
          Minimal
        </Typography>
        <svg width={60} height={130}>
          <MobilePhoneShape
            width={60}
            ratio="phoneTall"
            showNotch={false}
            showHomeIndicator={false}
          />
        </svg>
      </Box>
    </Stack>
  ),
}

export const TabletBasic: StoryObj = {
  name: "Tablet Shape - Variants",
  render: () => (
    <Stack direction="row" spacing={4}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
          iPad (4:3)
        </Typography>
        <svg width={120} height={90}>
          <TabletShape width={120} ratio="tablet" showCamera />
        </svg>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
          Widescreen (16:9)
        </Typography>
        <svg width={120} height={68}>
          <TabletShape width={120} ratio="desktop" showCamera />
        </svg>
      </Box>
    </Stack>
  ),
}

export const DeviceComparison: StoryObj = {
  name: "Device Size Comparison",
  render: () => (
    <Stack direction="row" spacing={3} sx={{ alignItems: "flex-end", p: 2 }}>
      <Box sx={{ textAlign: "center" }}>
        <svg width={60} height={130}>
          <MobilePhoneShape width={60} ratio="phoneTall" />
        </svg>
        <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
          Phone
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <svg width={120} height={90}>
          <TabletShape width={120} ratio="tablet" />
        </svg>
        <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
          Tablet
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <svg width={200} height={125}>
          <BrowserWindowShape width={200} height={125} />
        </svg>
        <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
          Browser
        </Typography>
      </Box>
    </Stack>
  ),
}

// ============================================================================
// COMPOSITIONS
// ============================================================================

export const DeviceMockupWithContent: StoryObj = {
  name: "Device Mockup with Content",
  render: () => (
    <Paper elevation={3} sx={{ p: 4, bgcolor: "#f8f9fa" }}>
      <Stack direction="row" spacing={4} sx={{ alignItems: "center" }}>
        {/* Browser with content */}
        <Box>
          <svg width={280} height={175}>
            <BrowserWindowShape width={280} height={175}>
              {/* Mock content */}
              <rect x={0} y={0} width={280} height={161} fill="#f5f5f5" />
              <rect x={16} y={8} width={80} height={12} rx={2} fill="#e0e0e0" />
              <rect
                x={16}
                y={28}
                width={200}
                height={8}
                rx={2}
                fill="#e0e0e0"
              />
              <rect
                x={16}
                y={44}
                width={160}
                height={8}
                rx={2}
                fill="#e0e0e0"
              />
              <rect
                x={16}
                y={60}
                width={248}
                height={80}
                rx={4}
                fill="#e0e0e0"
              />
            </BrowserWindowShape>
          </svg>
        </Box>

        {/* Phone with content */}
        <Box>
          <svg width={70} height={150}>
            <MobilePhoneShape width={70} ratio="phoneTall">
              {/* Mock content */}
              <rect x={2} y={16} width={58} height={20} rx={2} fill="#e0e0e0" />
              <rect x={2} y={40} width={40} height={8} rx={2} fill="#e0e0e0" />
              <rect x={2} y={52} width={58} height={45} rx={3} fill="#e0e0e0" />
              <rect
                x={2}
                y={102}
                width={58}
                height={45}
                rx={3}
                fill="#e0e0e0"
              />
            </MobilePhoneShape>
          </svg>
        </Box>
      </Stack>
    </Paper>
  ),
}

export const DocumentAssignmentStack: StoryObj = {
  name: "Document Assignment Stack",
  render: () => (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        bgcolor: "#fafafa",
        position: "relative",
        width: 300,
        height: 240,
      }}
    >
      {/* Stacked papers effect */}
      <Box sx={{ position: "absolute", left: 32, top: 24 }}>
        <svg width={130} height={168}>
          <FoldedPaperShape width={130} height={168} foldSize={13} />
        </svg>
      </Box>
      <Box sx={{ position: "absolute", left: 24, top: 16 }}>
        <svg width={130} height={168}>
          <FoldedPaperShape width={130} height={168} foldSize={13} />
        </svg>
      </Box>
      <Box sx={{ position: "absolute", left: 16, top: 8 }}>
        <svg width={130} height={168}>
          <FoldedPaperShape width={130} height={168} foldSize={13} showShadow />
        </svg>
      </Box>

      {/* Clipboard on top */}
      <Box sx={{ position: "absolute", right: 16, top: 24 }}>
        <svg width={110} height={154}>
          <ClipboardShape width={110} height={154} />
        </svg>
      </Box>
    </Paper>
  ),
}

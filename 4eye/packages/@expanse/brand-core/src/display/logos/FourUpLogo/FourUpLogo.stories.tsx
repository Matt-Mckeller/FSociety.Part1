import React, { useRef, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Stack, Typography, Paper, Button, ButtonGroup, Divider } from "@mui/material"
import { FourUpLogo } from "./FourUpLogo"
import type { LogoShape } from "./core/types"
import {
  bounceEntrance,
  scaleEntrance,
  fadeEntrance,
} from "./animations"
import {
  downloadSvg,
  copySvgToClipboard,
} from "./export"

/**
 * FourUpLogo — the 4eye / 4up brand mark.
 *
 * Two- or three-shape composition (circle / square / triangle) with optional
 * "wifi" sound-wave arcs, center hole, and connector lines. All geometry is
 * derived from `LogoConfig`; pure-TS calculations live in `core/`, GSAP
 * animations in `animations/`, SVG export in `export/`.
 */
const meta: Meta<typeof FourUpLogo> = {
  title: "BrandCore/Display/Logos/FourUpLogo",
  component: FourUpLogo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "paper", value: "#f5f5f5" },
        { name: "dark", value: "#1a1a2e" },
      ],
    },
  },
  argTypes: {
    size: {
      control: { type: "range", min: 60, max: 480, step: 10 },
      description: "Overall pixel size (width = height)",
    },
    title: { control: "text" },
    desc: { control: "text" },
  },
}
export default meta

type Story = StoryObj<typeof FourUpLogo>

// ----------------------------------------------------------------------------
// Default
// ----------------------------------------------------------------------------

export const Default: Story = {
  args: {
    size: 240,
  },
}

// ----------------------------------------------------------------------------
// Shape variants
// ----------------------------------------------------------------------------

export const Circles: Story = {
  args: { size: 240, config: { shape: "circle" } },
}

export const Squares: Story = {
  args: { size: 240, config: { shape: "square" } },
}

export const Triangles: Story = {
  args: { size: 240, config: { shape: "triangle" } },
}

export const ShapeGallery: Story = {
  render: () => {
    const shapes: LogoShape[] = ["circle", "square", "triangle"]
    return (
      <Stack direction="row" spacing={4} sx={{
        alignItems: "center"
      }}>
        {shapes.map((shape) => (
          <Paper
            key={shape}
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "#f5f5f5",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
              minWidth: 220,
            }}
          >
            <FourUpLogo size={180} config={{ shape }} />
            <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
              {shape}
            </Typography>
          </Paper>
        ))}
      </Stack>
    );
  },
}

// ----------------------------------------------------------------------------
// Composition modes
// ----------------------------------------------------------------------------

export const TwoCircleMode: Story = {
  name: "Composition · 2-circle (default)",
  args: { size: 240, config: { showBaseCircle: false } },
}

export const ThreeCircleMode: Story = {
  name: "Composition · 3-circle",
  args: { size: 240, config: { showBaseCircle: true } },
}

export const NoCenterHole: Story = {
  name: "Composition · no center hole",
  args: { size: 240, config: { showCenterHole: false } },
}

export const NoConnectorLines: Story = {
  name: "Composition · no connector lines",
  args: {
    size: 240,
    config: { showCenterHole: true, showConnectorLines: false },
  },
}

// ----------------------------------------------------------------------------
// Waves
// ----------------------------------------------------------------------------

export const NoWaves: Story = {
  name: "Waves · off",
  args: { size: 240, config: { showWaves: false } },
}

export const WavesUniform: Story = {
  name: "Waves · uniform style",
  args: {
    size: 240,
    config: { showWaves: true, waveStyle: "uniform", waveCount: 4 },
  },
}

export const WavesWifi: Story = {
  name: "Waves · wifi style",
  args: {
    size: 240,
    config: { showWaves: true, waveStyle: "wifi", waveCount: 3 },
  },
}

// ----------------------------------------------------------------------------
// Color variants
// ----------------------------------------------------------------------------

export const ColorVariants: Story = {
  render: () => {
    const palette: Array<{ label: string; fill: string; wave: string }> = [
      { label: "MUI Blue (default)", fill: "#1976d2", wave: "#1976d2" },
      { label: "Neon Purple", fill: "#a855f7", wave: "#a855f7" },
      { label: "Healing Teal", fill: "#14b8a6", wave: "#14b8a6" },
      { label: "Warning Amber", fill: "#f59e0b", wave: "#f59e0b" },
      { label: "Mono", fill: "#111111", wave: "#666666" },
    ]
    return (
      <Stack direction="row" spacing={3} useFlexGap sx={{
        flexWrap: "wrap"
      }}>
        {palette.map((p) => (
          <Paper
            key={p.label}
            elevation={0}
            sx={{
              p: 2.5,
              bgcolor: "#fafafa",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              minWidth: 180,
            }}
          >
            <FourUpLogo
              size={140}
              config={{ fillColor: p.fill, waveColor: p.wave }}
            />
            <Typography variant="caption">{p.label}</Typography>
          </Paper>
        ))}
      </Stack>
    );
  },
}

// ----------------------------------------------------------------------------
// Size scale
// ----------------------------------------------------------------------------

export const SizeScale: Story = {
  render: () => {
    const sizes = [64, 96, 128, 192, 280]
    return (
      <Stack direction="row" spacing={3} sx={{
        alignItems: "flex-end"
      }}>
        {sizes.map((s) => (
          <Stack key={s} spacing={1} sx={{
            alignItems: "center"
          }}>
            <FourUpLogo size={s} />
            <Typography variant="caption">{s}px</Typography>
          </Stack>
        ))}
      </Stack>
    );
  },
}

// ----------------------------------------------------------------------------
// Animation showcase (GSAP)
// ----------------------------------------------------------------------------

export const Animations: Story = {
  name: "Animations · entrance",
  render: () => {
    const ref = useRef<HTMLDivElement>(null)
    const [token, setToken] = useState(0)

    const run = (fn: (container: Element) => void) => {
      // Force a remount so each animation starts from a clean state.
      setToken((n) => n + 1)
      // Run after the next paint so the SVG nodes exist.
      requestAnimationFrame(() => {
        if (!ref.current) return
        try {
          fn(ref.current)
        } catch (e) {
          // GSAP may not be available in some Storybook contexts
          console.warn("Animation failed:", e)
        }
      })
    }

    return (
      <Stack spacing={2} sx={{
        alignItems: "center"
      }}>
        <Box
          ref={ref}
          key={token}
          sx={{
            p: 3,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
          }}
        >
          <FourUpLogo size={220} />
        </Box>
        <ButtonGroup variant="outlined" size="small">
          <Button onClick={() => run((sel) => bounceEntrance(sel))}>
            Bounce
          </Button>
          <Button onClick={() => run((sel) => scaleEntrance(sel))}>
            Scale
          </Button>
          <Button onClick={() => run((sel) => fadeEntrance(sel))}>
            Fade
          </Button>
          <Button onClick={() => setToken((n) => n + 1)}>Reset</Button>
        </ButtonGroup>
        <Typography variant="caption" sx={{
          color: "text.secondary"
        }}>
          GSAP entrance animations target <code>#shape-middle</code>,{" "}
          <code>#shape-primary</code>, and <code>#logo-shapes</code> inside
          the rendered SVG. Reset remounts the component.
        </Typography>
      </Stack>
    );
  },
}

// ----------------------------------------------------------------------------
// Export utilities
// ----------------------------------------------------------------------------

export const ExportUtilities: Story = {
  name: "Export · download / clipboard",
  render: () => {
    const [status, setStatus] = useState<string | null>(null)

    const handleDownload = () => {
      try {
        downloadSvg("four-up-logo.svg")
        setStatus("Downloaded four-up-logo.svg")
      } catch (e) {
        setStatus(`Download failed: ${(e as Error).message}`)
      }
    }

    const handleCopy = async () => {
      try {
        await copySvgToClipboard()
        setStatus("Copied SVG markup to clipboard")
      } catch (e) {
        setStatus(`Copy failed: ${(e as Error).message}`)
      }
    }

    return (
      <Stack spacing={2} sx={{
        alignItems: "center"
      }}>
        <FourUpLogo size={200} />
        <ButtonGroup variant="outlined" size="small">
          <Button onClick={handleDownload}>Download SVG</Button>
          <Button onClick={handleCopy}>Copy SVG</Button>
        </ButtonGroup>
        {status && (
          <Typography variant="caption" sx={{
            color: "text.secondary"
          }}>
            {status}
          </Typography>
        )}
      </Stack>
    );
  },
}

// ----------------------------------------------------------------------------
// Side-by-side reference card
// ----------------------------------------------------------------------------

export const Showcase: Story = {
  render: () => (
    <Stack spacing={3} sx={{ width: 640 }}>
      <Paper elevation={0} sx={{ p: 3, bgcolor: "#f5f5f5" }}>
        <Typography variant="h6" gutterBottom>
          FourUpLogo · default
        </Typography>
        <Stack direction="row" spacing={3} sx={{
          alignItems: "center"
        }}>
          <FourUpLogo size={180} />
          <Box>
            <Typography variant="body2" sx={{
              color: "text.secondary"
            }}>
              2-circle composition · wifi waves · center hole + connector
              lines · MUI blue.
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Divider />

      <Paper elevation={0} sx={{ p: 3, bgcolor: "#fafafa" }}>
        <Typography variant="h6" gutterBottom>
          Minimal · no waves, no hole
        </Typography>
        <FourUpLogo
          size={180}
          config={{ showWaves: false, showCenterHole: false }}
        />
      </Paper>
    </Stack>
  ),
}

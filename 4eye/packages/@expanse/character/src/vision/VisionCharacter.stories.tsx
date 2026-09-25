import { Box } from "@mui/material"
import type { Meta, StoryObj } from "@storybook/react"
import { useEffect, useRef } from "react"
import { Character4eye } from "../2d"
import { CHARACTER_PERSONAS } from "../2d"

type VisionCharacterStoryProps = {
  compact?: boolean
  boxWidth?: number
  boxHeight?: number
  fitToArtwork?: boolean
}

function FittedCharacter({ compact, fitToArtwork }: Pick<VisionCharacterStoryProps, "compact" | "fitToArtwork">) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!fitToArtwork || !wrapRef.current) return

    let frameId = 0
    let cancelled = false
    let originalViewBox: string | null = null
    let originalPreserveAspectRatio: string | null = null

    const fit = () => {
      if (cancelled || !wrapRef.current) return
      const svg = wrapRef.current.querySelector<SVGSVGElement>("svg[data-mood]")
      if (!svg) {
        frameId = requestAnimationFrame(fit)
        return
      }

      if (!originalViewBox) originalViewBox = svg.getAttribute("viewBox")
      if (!originalPreserveAspectRatio) {
        originalPreserveAspectRatio = svg.getAttribute("preserveAspectRatio")
      }

      const bounds = svg.getBBox()
      if (!bounds.width || !bounds.height) {
        frameId = requestAnimationFrame(fit)
        return
      }

      const padX = compact ? 16 : 28
      const padTop = compact ? 20 : 30
      const padBottom = compact ? 18 : 32
      svg.setAttribute(
        "viewBox",
        `${Math.max(0, bounds.x - padX)} ${Math.max(0, bounds.y - padTop)} ${bounds.width + padX * 2} ${bounds.height + padTop + padBottom}`,
      )
      svg.setAttribute("preserveAspectRatio", "xMidYMin meet")
    }

    frameId = requestAnimationFrame(fit)

    return () => {
      cancelled = true
      cancelAnimationFrame(frameId)
      const svg = wrapRef.current?.querySelector<SVGSVGElement>("svg[data-mood]")
      if (!svg) return
      if (originalViewBox) svg.setAttribute("viewBox", originalViewBox)
      if (originalPreserveAspectRatio) {
        svg.setAttribute("preserveAspectRatio", originalPreserveAspectRatio)
      }
    }
  }, [compact, fitToArtwork])

  return (
    <Box
      ref={wrapRef}
      sx={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        overflow: "visible",
        "& svg[data-mood]": {
          width: "auto !important",
          height: "100% !important",
          maxWidth: "100% !important",
          maxHeight: "100% !important",
          overflow: "visible",
        },
      }}
    >
      <Character4eye {...CHARACTER_PERSONAS.vision} compact={compact} />
    </Box>
  )
}

function VisionCharacterStory({
  compact = false,
  boxWidth = 320,
  boxHeight = 520,
  fitToArtwork = true,
}: VisionCharacterStoryProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        bgcolor: "#ffffff",
        px: 3,
      }}
    >
      <Box
        sx={{
          width: boxWidth,
          height: boxHeight,
          display: "grid",
          placeItems: "center",
          border: "1px solid rgba(15, 23, 42, 0.08)",
          borderRadius: 4,
          background:
            "radial-gradient(circle at 50% 30%, rgba(66, 133, 244, 0.08), transparent 55%), #ffffff",
          overflow: "visible",
          p: 3,
        }}
      >
        <FittedCharacter compact={compact} fitToArtwork={fitToArtwork} />
      </Box>
    </Box>
  )
}

const meta: Meta<typeof VisionCharacterStory> = {
  title: "Marketing / Character / Vision Character",
  component: VisionCharacterStory,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "white",
      values: [{ name: "white", value: "#ffffff" }],
    },
  },
  args: {
    compact: false,
    boxWidth: 320,
    boxHeight: 520,
    fitToArtwork: true,
  },
  argTypes: {
    compact: { control: { type: "boolean" } },
    fitToArtwork: { control: { type: "boolean" } },
    boxWidth: { control: { type: "range", min: 220, max: 480, step: 10 } },
    boxHeight: { control: { type: "range", min: 260, max: 560, step: 10 } },
  },
}

export default meta

type Story = StoryObj<typeof VisionCharacterStory>

export const Fitted: Story = {}

export const RawNative: Story = {
  args: {
    fitToArtwork: false,
  },
}

export const CompactFitted: Story = {
  args: {
    compact: true,
    boxWidth: 280,
    boxHeight: 280,
    fitToArtwork: true,
  },
}

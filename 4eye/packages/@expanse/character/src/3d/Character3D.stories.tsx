import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import { useCharacter } from "@expanse/character/state"
import { CharacterCanvas, Antenna } from "@expanse/character/3d"
import {
  HEAD_SHAPES,
  MOODS,
  type AccessoryColorToken,
  type HeadShape,
  type Mood,
} from "@expanse/character/core"

/**
 * Interactive 3D 4eye playground. Drives the shared character store
 * (Context + useReducer, provided + theme-synced by the preview decorator)
 * and lets you:
 *   • swap head shape (circle / triangle / square / diamond / shield /
 *     capsule / heart / present)
 *   • turn the figure (arrow keys or buttons) — smoothly tweened in the
 *     render loop, never per-frame dispatch
 *   • snap to a facing (front / right / back / left)
 *   • change mood and toggle the strap
 *   • mount a themed accessory (antenna) and recolor it from palette accents
 *   • drag to orbit the camera
 *
 * Colors come from the active MUI theme via <CharacterThemeSync> in the
 * preview — switch the Storybook theme toolbar to see the 4eye re-theme.
 */

const ACCENT_TOKENS: AccessoryColorToken[] = [
  "primary",
  "secondary",
  "highlight",
  "neutral",
]

function Playground() {
  const { state, dispatch } = useCharacter()
  const [showAntenna, setShowAntenna] = useState(true)
  const [tip, setTip] = useState<AccessoryColorToken>("highlight")

  // Arrow keys turn the figure (updates the discrete target yaw only).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") dispatch({ type: "turnBy", deltaYaw: -30 })
      if (e.key === "ArrowRight") dispatch({ type: "turnBy", deltaYaw: 30 })
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [dispatch])

  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{ p: 3, bgcolor: "#ffffff", minHeight: 640 }}
    >
      {/* Controls */}
      <Stack spacing={2.5} sx={{ width: 240, flexShrink: 0 }}>
        <Box>
          <Typography variant="overline" sx={{
            color: "text.secondary"
          }}>
            Head shape
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 0.5 }}>
            {HEAD_SHAPES.map((shape: HeadShape) => (
              <Button
                key={shape}
                size="small"
                variant={state.shapes.head === shape ? "contained" : "outlined"}
                onClick={() => dispatch({ type: "setHeadShape", head: shape })}
                sx={{ textTransform: "capitalize", minWidth: 0, px: 1.25 }}
              >
                {shape}
              </Button>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="overline" sx={{
            color: "text.secondary"
          }}>
            Turn (or ← / → keys)
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => dispatch({ type: "turnBy", deltaYaw: -45 })}
            >
              ← Left
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => dispatch({ type: "turnBy", deltaYaw: 45 })}
            >
              Right →
            </Button>
          </Stack>
          <Stack direction="row" spacing={0.75} sx={{ mt: 1 }}>
            {(
              [
                ["Front", 0],
                ["Right", 90],
                ["Back", 180],
                ["Left", 270],
              ] as const
            ).map(([label, yaw]) => (
              <Button
                key={label}
                size="small"
                variant={state.targetYaw === yaw ? "contained" : "text"}
                onClick={() => dispatch({ type: "setTargetYaw", yaw })}
                sx={{ minWidth: 0, px: 1 }}
              >
                {label}
              </Button>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="overline" sx={{
            color: "text.secondary"
          }}>
            Mood
          </Typography>
          <ToggleButtonGroup
            size="small"
            exclusive
            value={state.mood}
            onChange={(_, v: Mood | null) =>
              v && dispatch({ type: "setMood", mood: v })
            }
            sx={{ display: "flex", flexWrap: "wrap", mt: 0.5 }}
          >
            {MOODS.map((mood) => (
              <ToggleButton
                key={mood}
                value={mood}
                sx={{ textTransform: "capitalize" }}
              >
                {mood}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Box>
          <Typography variant="overline" sx={{
            color: "text.secondary"
          }}>
            Strap
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
            <Button
              size="small"
              variant={state.strapStyle !== "none" ? "contained" : "outlined"}
              onClick={() =>
                dispatch({ type: "setStrapStyle", strapStyle: "default" })
              }
            >
              On
            </Button>
            <Button
              size="small"
              variant={state.strapStyle === "none" ? "contained" : "outlined"}
              onClick={() =>
                dispatch({ type: "setStrapStyle", strapStyle: "none" })
              }
            >
              Off
            </Button>
          </Stack>
        </Box>

        <Box>
          <Typography variant="overline" sx={{
            color: "text.secondary"
          }}>
            Antenna accessory
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
            <Button
              size="small"
              variant={showAntenna ? "contained" : "outlined"}
              onClick={() => setShowAntenna(true)}
            >
              On
            </Button>
            <Button
              size="small"
              variant={!showAntenna ? "contained" : "outlined"}
              onClick={() => setShowAntenna(false)}
            >
              Off
            </Button>
          </Stack>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              display: "block",
              mt: 1
            }}>
            Tip color (palette accent)
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 0.5 }}>
            {ACCENT_TOKENS.map((token) => (
              <Button
                key={String(token)}
                size="small"
                variant={tip === token ? "contained" : "outlined"}
                onClick={() => setTip(token)}
                sx={{ textTransform: "capitalize", minWidth: 0, px: 1.25 }}
              >
                {String(token)}
              </Button>
            ))}
          </Box>
        </Box>

        <Typography variant="caption" sx={{
          color: "text.secondary"
        }}>
          Drag the figure to orbit the camera. Current yaw:{" "}
          {Math.round(state.targetYaw)}°
        </Typography>
      </Stack>
      {/* 3D stage */}
      <Box
        sx={{
          flex: 1,
          minHeight: 560,
          borderRadius: 2,
          border: "1px solid #e2e8f0",
          bgcolor: "#fafafa",
          overflow: "hidden",
        }}
      >
        <CharacterCanvas background="#fafafa">
          {showAntenna ? <Antenna tipColor={tip} /> : null}
        </CharacterCanvas>
      </Box>
    </Stack>
  );
}

const meta = {
  title: "Character/3D/Playground",
  component: Playground,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

export const Interactive = {
  render: () => <Playground />,
}

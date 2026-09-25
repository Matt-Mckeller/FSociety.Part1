"use client";

/**
 * SequenceList — browsable left pane: sequences and their scenes.
 *
 * Scenes are listed under the active sequence, sorted by top goal weight
 * (the "sorted by max engagement / weight" pattern). Each scene shows its
 * dominant-goal WeightMeter + StatusBadge for at-a-glance comprehension.
 */

import { Box, Stack, Typography, alpha } from "@mui/material";

import { getEffectiveGoals } from "../model/resolver";
import { useCreate } from "../store/CreateProvider";
import { StatusBadge, WeightMeter, weightColor } from "./visuals";
import { BrandIcon } from "./BrandIcon";

const BRAND_FONT = "Xpens, Roboto, sans-serif";

export function SequenceList() {
  const { state, dispatch, selectedSequence, scenesForSelected } = useCreate();

  return (
    <Box sx={{ width: "100%" }}>
      {state.sequences.map((seq) => {
        const isActive = seq.id === selectedSequence?.id;
        return (
          <Box key={seq.id} sx={{ mb: 2 }}>
            {/* Sequence header */}
            <Stack
              spacing={1}
              onClick={() => dispatch({ kind: "select-sequence", id: seq.id })}
              sx={{
                cursor: "pointer",
                mb: 1,
                p: 0.75,
                borderRadius: 2,
                flexDirection: "row",
                alignItems: "center",
                bgcolor: isActive ? alpha("#1976d2", 0.06) : "transparent",
                borderLeft: "3px solid",
                borderColor: isActive ? "#1976d2" : "transparent",
                transition: "background-color 120ms ease",
                "&:hover": { bgcolor: alpha("#000", 0.03) },
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  color: isActive ? "#1976d2" : "#64748b",
                }}
              >
                <BrandIcon name={seq.glyph ?? "sequence"} size={22} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{ fontFamily: BRAND_FONT, fontWeight: 700, lineHeight: 1.2 }}
                  noWrap
                >
                  {seq.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {seq.sceneIds.length} scene
                  {seq.sceneIds.length === 1 ? "" : "s"}
                </Typography>
              </Box>
              <StatusBadge status={seq.status} />
            </Stack>

            {/* Scenes under the active sequence, sorted by top goal weight */}
            {isActive && (
              <Stack spacing={1} sx={{ pl: 1.5 }}>
                {scenesForSelected
                  .map((scene) => ({
                    scene,
                    topWeight:
                      getEffectiveGoals(scene, state.goalLinks, state.goals)[0]
                        ?.weight ?? 0,
                  }))
                  .sort((a, b) => b.topWeight - a.topWeight)
                  .map(({ scene, topWeight }) => {
                    const selected = scene.id === state.selectedSceneId;
                    return (
                      <Box
                        key={scene.id}
                        onClick={() =>
                          dispatch({ kind: "select-scene", id: scene.id })
                        }
                        sx={{
                          position: "relative",
                          p: 1.25,
                          pl: 1.5,
                          borderRadius: 2,
                          cursor: "pointer",
                          bgcolor: selected ? "#f5f5f5" : "#fafafa",
                          border: "1px solid",
                          borderColor: selected ? "#bdbdbd" : "#eee",
                          transition: "border-color 120ms ease",
                          "&:hover": { borderColor: "#bdbdbd" },
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 6,
                            bottom: 6,
                            width: 3,
                            borderRadius: 3,
                            bgcolor: weightColor(topWeight),
                          },
                        }}
                      >
                        <Stack
                          spacing={1}
                          sx={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Box
                            sx={{
                              display: "inline-flex",
                              color: weightColor(topWeight),
                            }}
                          >
                            <BrandIcon name={scene.glyph ?? "scene"} size={17} />
                          </Box>
                          <Typography
                            sx={{
                              fontFamily: BRAND_FONT,
                              fontWeight: 600,
                              flex: 1,
                              minWidth: 0,
                            }}
                            noWrap
                          >
                            {scene.title}
                          </Typography>
                          <StatusBadge status={scene.status} />
                        </Stack>
                        <Box sx={{ mt: 0.75, pl: 3 }}>
                          <WeightMeter weight={topWeight} width={90} />
                        </Box>
                      </Box>
                    );
                  })}
              </Stack>
            )}
          </Box>
        );
      })}
    </Box>
  );
}

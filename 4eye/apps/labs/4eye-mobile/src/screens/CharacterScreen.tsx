/**
 * CharacterScreen — Native true-3D 4eye
 * =====================================
 * Mounts the shared `@expanse/character/3d` renderer on React Native via
 * `@react-three/fiber/native` + `expo-gl`. Metro auto-resolves the
 * `CharacterCanvas.native` host. The scene is driven by the same
 * platform-neutral store (Context + useReducer) used on web, so colors,
 * head shape, and facing all flow through `useCharacter()` dispatch.
 *
 * No MUI / no DOM here — the /3d renderer is RN-safe by design.
 */

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import {
  CharacterProvider,
  useCharacter,
} from "@expanse/character/state"
import { CharacterCanvas } from "@expanse/character/3d"
import { HEAD_SHAPES, type HeadShape } from "@expanse/character/core"

/** Face-cropped avatar framing + turn / shape controls. */
function CharacterStage() {
  const { state, dispatch } = useCharacter()
  const [zoomFace, setZoomFace] = useState(false)

  // Camera presets: pull back for the full figure, or tight-crop the head.
  // (Head world-Y math lives in the web ProfileAvatar3D; here we keep two
  // simple, hand-tuned presets to stay dependency-light on device.)
  const camera = zoomFace
    ? { position: [0, 150, 130] as [number, number, number], fov: 45 }
    : { position: [0, 0, 320] as [number, number, number], fov: 45 }
  const orbitTarget = zoomFace
    ? ([0, 150, 0] as [number, number, number])
    : ([0, 0, 0] as [number, number, number])

  return (
    <View style={styles.stageWrap}>
      <View style={styles.canvasFrame}>
        <CharacterCanvas
          background="#fafafa"
          camera={camera}
          orbitTarget={orbitTarget}
        />
      </View>

      <View style={styles.controls}>
        <Text style={styles.label}>Turn</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.pill}
            onPress={() => dispatch({ type: "turnBy", deltaYaw: -30 })}
          >
            <Text style={styles.pillText}>← Left</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pill}
            onPress={() => dispatch({ type: "turnBy", deltaYaw: 30 })}
          >
            <Text style={styles.pillText}>Right →</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pill, zoomFace && styles.pillActive]}
            onPress={() => setZoomFace((v) => !v)}
          >
            <Text style={[styles.pillText, zoomFace && styles.pillTextActive]}>
              {zoomFace ? "Full body" : "Face"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Head shape</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.row}
        >
          {HEAD_SHAPES.map((shape: HeadShape) => {
            const active = state.shapes.head === shape
            return (
              <TouchableOpacity
                key={shape}
                style={[styles.pill, active && styles.pillActive]}
                onPress={() => dispatch({ type: "setHeadShape", head: shape })}
              >
                <Text
                  style={[styles.pillText, active && styles.pillTextActive]}
                >
                  {shape}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    </View>
  )
}

export function CharacterScreen() {
  return (
    <CharacterProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Your 4eye</Text>
        <Text style={styles.subtitle}>Live 3D companion</Text>
        <CharacterStage />
      </View>
    </CharacterProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 12,
  },
  stageWrap: {
    flex: 1,
  },
  canvasFrame: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  controls: {
    padding: 16,
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    color: "#94a3b8",
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 4,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
  },
  pillActive: {
    backgroundColor: "#00d4ff",
    borderColor: "#00d4ff",
  },
  pillText: {
    fontSize: 14,
    color: "#334155",
    textTransform: "capitalize",
  },
  pillTextActive: {
    color: "#ffffff",
    fontWeight: "600",
  },
})

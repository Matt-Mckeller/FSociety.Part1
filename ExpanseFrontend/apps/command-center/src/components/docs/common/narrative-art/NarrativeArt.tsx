/**
 * NarrativeArt - composes the shape primitives into a scene for a given
 * KCPS case study narrative, emotional state, and creative-direction variant.
 *
 * variant "symbolic"   - environment/object motifs only (cracked paint, a
 *                         jammed printer, a seed breaking soil) - no figures.
 * variant "figurative" - adds a stylized, non-photoreal, non-identifiable
 *                         silhouette on top of the same environmental motifs.
 *
 * Deliberately avoids literal depictions of violence or real people - the
 * source narratives already describe their own intended symbolism, this
 * just renders it.
 */
import {
  Backdrop,
  CrackedPaint,
  DamagedLockers,
  JammedPrinter,
  AttendanceLedger,
  SeedSprout,
  FruitingBranch,
  LightShaft,
  TunnelOpening,
  StormClouds,
  SilhouetteSeated,
  SilhouetteWalking,
  SilhouettePair,
  SilhouetteTense,
  SilhouetteCalm,
  type ArtTone,
} from "./shapes"

export type NarrativeArtId =
  | "overview"
  | "chance-to-thrive"
  | "kidnapped-from-education"
  | "planting-roots"
  | "light-at-the-end"

export type ArtState = "before" | "after"
export type ArtVariant = "symbolic" | "figurative"

export interface NarrativeArtProps {
  narrativeId: NarrativeArtId
  state: ArtState
  variant: ArtVariant
  height?: number | string
}

export function NarrativeArt({ narrativeId, state, variant, height = "100%" }: NarrativeArtProps) {
  const tone: ArtTone = state === "before" ? "dark" : "light"
  const figurative = variant === "figurative"

  return (
    <Backdrop tone={tone} height={height}>
      {narrativeId === "overview" && (
        state === "before" ? (
          <>
            <StormClouds tone={tone} />
            <CrackedPaint tone={tone} />
            {figurative && <SilhouetteSeated tone={tone} posture="slumped" />}
          </>
        ) : (
          <>
            <LightShaft tone={tone} />
            <SeedSprout tone={tone} />
            {figurative && <SilhouetteWalking tone={tone} />}
          </>
        )
      )}

      {narrativeId === "chance-to-thrive" && (
        state === "before" ? (
          <>
            <StormClouds tone={tone} />
            <CrackedPaint tone={tone} />
            {figurative && <SilhouetteSeated tone={tone} posture="slumped" />}
          </>
        ) : (
          <>
            <LightShaft tone={tone} />
            <SeedSprout tone={tone} />
            {figurative && <SilhouetteWalking tone={tone} />}
          </>
        )
      )}

      {narrativeId === "kidnapped-from-education" && (
        state === "before" ? (
          <>
            <DamagedLockers tone={tone} />
            <JammedPrinter tone={tone} />
            {figurative && <SilhouetteTense tone={tone} />}
          </>
        ) : (
          <>
            <LightShaft tone={tone} />
            <AttendanceLedger tone={tone} />
            {figurative && <SilhouettePair tone={tone} />}
          </>
        )
      )}

      {narrativeId === "planting-roots" && (
        state === "before" ? (
          <>
            <StormClouds tone={tone} />
            <CrackedPaint tone={tone} />
            {figurative && <SilhouetteSeated tone={tone} posture="slumped" />}
          </>
        ) : (
          <>
            <LightShaft tone={tone} />
            <FruitingBranch tone={tone} />
            {figurative && <SilhouetteWalking tone={tone} />}
          </>
        )
      )}

      {narrativeId === "light-at-the-end" && (
        state === "before" ? (
          <>
            <CrackedPaint tone={tone} />
            <TunnelOpening tone={tone} />
            {figurative && <SilhouetteTense tone={tone} />}
          </>
        ) : (
          <>
            <TunnelOpening tone={tone} />
            <LightShaft tone={tone} />
            {figurative && <SilhouetteCalm tone={tone} />}
          </>
        )
      )}
    </Backdrop>
  )
}

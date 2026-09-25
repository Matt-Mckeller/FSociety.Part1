import { Box } from "@mui/material";

/**
 * Conic-gradient comet orbits the icon (head bright, tail fading).
 * Three flat scatter pulses at random angles/delays suggest searching
 * while the steady orbit guides forward.
 *
 * Plays 4× of its 3-second orbit (12 s total) in the schedule.
 */
export function CometNavigatorRings() {
  return (
    <>
      {/* Orbiting comet */}
      <Box sx={{
        position: "absolute", width: 50, height: 50, borderRadius: "50%",
        background: "conic-gradient(from 0deg, transparent 0%, transparent 72%, rgba(99,102,241,0.07) 80%, rgba(99,102,241,0.45) 90%, rgba(99,102,241,0.92) 97%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 2px), white 100%)",
        maskImage:        "radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 2px), white 100%)",
        "@keyframes cometSpin": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        animation: "cometSpin 3s linear infinite", pointerEvents: "none",
      }} />
      {/* Scatter pulse 1 */}
      <Box sx={{
        position: "absolute", width: 48, height: 9, borderRadius: "50%",
        border: "1px solid rgba(99,102,241,0.5)",
        "@keyframes cnS1": { "0%": { transform: "rotate(-18deg) scale(0.5)",  opacity: 0.6  }, "100%": { transform: "rotate(-18deg) scale(2.0)", opacity: 0 } },
        animation: "cnS1 2.3s ease-out infinite", animationDelay: "1.4s", pointerEvents: "none",
      }} />
      {/* Scatter pulse 2 */}
      <Box sx={{
        position: "absolute", width: 44, height: 8, borderRadius: "50%",
        border: "1px solid rgba(99,102,241,0.4)",
        "@keyframes cnS2": { "0%": { transform: "rotate(-50deg) scale(0.55)", opacity: 0.5  }, "100%": { transform: "rotate(-50deg) scale(1.8)", opacity: 0 } },
        animation: "cnS2 1.9s ease-out infinite", animationDelay: "0.5s", pointerEvents: "none",
      }} />
      {/* Scatter pulse 3 */}
      <Box sx={{
        position: "absolute", width: 50, height: 10, borderRadius: "50%",
        border: "1px solid rgba(99,102,241,0.35)",
        "@keyframes cnS3": { "0%": { transform: "rotate(-5deg) scale(0.5)",  opacity: 0.45 }, "100%": { transform: "rotate(-5deg) scale(1.9)",  opacity: 0 } },
        animation: "cnS3 3.0s ease-out infinite", animationDelay: "2.3s", pointerEvents: "none",
      }} />
    </>
  );
}

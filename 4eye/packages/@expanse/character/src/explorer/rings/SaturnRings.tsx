import { Box } from "@mui/material";

/**
 * Calm orbital pulse — static elliptical track at -35°
 * plus a single ring that expands every 2.6 s.
 *
 * The schedule plays 4× of this 2.6-second cycle (10.4 s total).
 */
export function SaturnRings() {
  return (
    <>
      <Box sx={{
        position: "absolute", width: 52, height: 11, borderRadius: "50%",
        border: "1px solid", borderColor: "primary.main",
        opacity: 0.2, transform: "rotate(-35deg)",
        boxShadow: "0 0 4px rgba(99,102,241,0.25)", pointerEvents: "none",
      }} />
      <Box sx={{
        position: "absolute", width: 52, height: 11, borderRadius: "50%",
        border: "1.5px solid", borderColor: "primary.main",
        boxShadow: "0 0 6px rgba(99,102,241,0.45)",
        "@keyframes saturnPulse": {
          "0%":   { transform: "rotate(-35deg) scale(0.55)", opacity: 0.8 },
          "100%": { transform: "rotate(-35deg) scale(2.1)",  opacity: 0   },
        },
        animation: "saturnPulse 2.6s ease-out infinite", pointerEvents: "none",
      }} />
    </>
  );
}

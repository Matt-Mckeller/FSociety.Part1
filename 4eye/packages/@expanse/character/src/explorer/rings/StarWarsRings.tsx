import { Box } from "@mui/material";

/**
 * Star Wars opening-title pace:
 *   3 tight waves fire in rapid succession (0s / 0.2s / 0.4s),
 *   then a ~2.2 s silence before the next salvo.
 *   Total cycle = 7 s; active phase = 0–4.8 s.
 *
 * The schedule plays 3× of this 7-second cycle (21 s total).
 */
export function StarWarsRings() {
  return (
    <>
      {/* Permanent dim track */}
      <Box sx={{
        position: "absolute", width: 52, height: 11, borderRadius: "50%",
        border: "1px solid", borderColor: "primary.main",
        opacity: 0.15, transform: "rotate(-35deg)", pointerEvents: "none",
      }} />
      {/* Lead wave — owns shared @keyframes swBlast */}
      <Box sx={{
        position: "absolute", width: 52, height: 11, borderRadius: "50%",
        border: "1.5px solid", borderColor: "primary.main",
        boxShadow: "0 0 6px rgba(99,102,241,0.4)",
        "@keyframes swBlast": {
          "0%":   { transform: "rotate(-35deg) scale(0.58)", opacity: 0    },
          "5%":   { transform: "rotate(-35deg) scale(0.63)", opacity: 0.9  },
          "55%":  { transform: "rotate(-35deg) scale(2.8)",  opacity: 0.04 },
          "63%":  { transform: "rotate(-35deg) scale(3.0)",  opacity: 0    },
          "100%": { transform: "rotate(-35deg) scale(3.0)",  opacity: 0    },
        },
        animation: "swBlast 7s ease-out infinite", animationDelay: "0s",
        pointerEvents: "none",
      }} />
      <Box sx={{
        position: "absolute", width: 52, height: 11, borderRadius: "50%",
        border: "1px solid", borderColor: "primary.main",
        animation: "swBlast 7s ease-out infinite", animationDelay: "0.2s",
        pointerEvents: "none",
      }} />
      <Box sx={{
        position: "absolute", width: 52, height: 11, borderRadius: "50%",
        border: "1px solid", borderColor: "primary.main", opacity: 0.75,
        animation: "swBlast 7s ease-out infinite", animationDelay: "0.4s",
        pointerEvents: "none",
      }} />
    </>
  );
}

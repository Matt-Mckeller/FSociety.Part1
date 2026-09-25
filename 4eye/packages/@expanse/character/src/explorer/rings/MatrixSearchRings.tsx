import { Box } from "@mui/material";

/**
 * 4 erratic rings at random angles + speeds suggest a chaotic scan.
 * One slow green guide ring at −35° is the true bearing being found.
 *
 * Displayed for ~15.2 s in the schedule.
 */
export function MatrixSearchRings() {
  return (
    <>
      {/* Dim green guide track */}
      <Box sx={{
        position: "absolute", width: 52, height: 11, borderRadius: "50%",
        border: "1px solid #22c55e", opacity: 0.12, transform: "rotate(-35deg)",
        pointerEvents: "none",
      }} />
      {/* Erratic A — fast cyan, shallow angle */}
      <Box sx={{
        position: "absolute", width: 40, height: 8, borderRadius: "50%",
        border: "1px solid #06b6d4",
        "@keyframes msA": { "0%": { transform: "rotate(-12deg) scale(0.5)",  opacity: 0.4  }, "100%": { transform: "rotate(-12deg) scale(1.9)",  opacity: 0 } },
        animation: "msA 0.85s ease-out infinite", animationDelay: "0.15s", pointerEvents: "none",
      }} />
      {/* Erratic B — slow violet, steep angle */}
      <Box sx={{
        position: "absolute", width: 48, height: 10, borderRadius: "50%",
        border: "1px solid #818cf8",
        "@keyframes msB": { "0%": { transform: "rotate(-58deg) scale(0.55)", opacity: 0.35 }, "100%": { transform: "rotate(-58deg) scale(2.0)", opacity: 0 } },
        animation: "msB 2.6s ease-out infinite", animationDelay: "0.9s", pointerEvents: "none",
      }} />
      {/* Erratic C — medium violet, positive angle (wrong way) */}
      <Box sx={{
        position: "absolute", width: 44, height: 9, borderRadius: "50%",
        border: "1px solid #a78bfa",
        "@keyframes msC": { "0%": { transform: "rotate(7deg) scale(0.5)",   opacity: 0.3  }, "100%": { transform: "rotate(7deg) scale(1.7)",   opacity: 0 } },
        animation: "msC 1.4s ease-out infinite", animationDelay: "0.45s", pointerEvents: "none",
      }} />
      {/* Erratic D — near-guide angle but slightly off */}
      <Box sx={{
        position: "absolute", width: 46, height: 10, borderRadius: "50%",
        border: "1px solid", borderColor: "primary.main",
        "@keyframes msD": { "0%": { transform: "rotate(-42deg) scale(0.55)", opacity: 0.4  }, "100%": { transform: "rotate(-42deg) scale(2.0)", opacity: 0 } },
        animation: "msD 2.0s ease-out infinite", animationDelay: "1.6s", pointerEvents: "none",
      }} />
      {/* Guide ring — slow, bright green, the true direction */}
      <Box sx={{
        position: "absolute", width: 52, height: 11, borderRadius: "50%",
        border: "1.5px solid #22c55e", boxShadow: "0 0 5px rgba(34,197,94,0.35)",
        "@keyframes msGuide": {
          "0%":   { transform: "rotate(-35deg) scale(0.58)", opacity: 0    },
          "8%":   { transform: "rotate(-35deg) scale(0.62)", opacity: 0.72 },
          "100%": { transform: "rotate(-35deg) scale(2.3)",  opacity: 0    },
        },
        animation: "msGuide 3.8s ease-out infinite", pointerEvents: "none",
      }} />
    </>
  );
}

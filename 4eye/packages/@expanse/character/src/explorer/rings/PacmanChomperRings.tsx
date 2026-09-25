import { Box } from "@mui/material";

/**
 * 270° arc (3 sides colored, top gap) orbits the icon eating pellets.
 * Plays 4× of its 2.2-second spin (8.8 s total) in the schedule.
 */
export function PacmanChomperRings() {
  const pellets = [
    "translate(-2px, -27px)", // 12 o'clock
    "translate(23px,  -2px)", // 3  o'clock
    "translate(-2px,  23px)", // 6  o'clock
    "translate(-27px, -2px)", // 9  o'clock
  ] as const;
  return (
    <>
      {/* Dim guide circle */}
      <Box sx={{
        position: "absolute", width: 50, height: 50, borderRadius: "50%",
        border: "1px solid", borderColor: "primary.main", opacity: 0.08,
        pointerEvents: "none",
      }} />
      {/* Pellet anchor — zero-size div at the visual centre */}
      <Box sx={{ position: "absolute", top: "50%", left: "50%", pointerEvents: "none" }}>
        {pellets.map((t, i) => (
          <Box key={i} sx={{
            position: "absolute", width: 4, height: 4, borderRadius: "50%",
            bgcolor: "primary.main", opacity: 0.4, transform: t,
          }} />
        ))}
      </Box>
      {/* Chomping arc */}
      <Box sx={{
        position: "absolute", width: 50, height: 50, borderRadius: "50%",
        border: "2px solid", borderColor: "primary.main",
        borderTopColor: "transparent",
        boxShadow: "0 0 8px rgba(99,102,241,0.4)",
        "@keyframes pacSpin": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        animation: "pacSpin 2.2s linear infinite", pointerEvents: "none",
      }} />
    </>
  );
}

"use client";

import dynamic from "next/dynamic";
import { Box } from "@mui/material";

/*
  ssr:false because the stage reads a stored preference and, in crown mode,
  cycles ring variants and drives a WebGL canvas on a timer — none of which the
  server can produce markup for that the first client frame would keep.

  The whole subtree is behind this one boundary on purpose: `CrownStage` in turn
  loads the 3D scene and the flat crown on demand, so the home route's first
  load is the compass and nothing more.
*/
const CrownStage = dynamic(() => import("./crown/CrownStage").then((m) => ({ default: m.CrownStage })), {
  ssr: false,
  loading: () => <Box sx={{ minHeight: 388 }} />,
});

export function CompassMount() {
  return <CrownStage />;
}

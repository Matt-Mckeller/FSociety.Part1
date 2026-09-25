"use client";

/**
 * PlanningSection — surfaces the live planning graph on the website Projects
 * page. This is the cross-surface reuse described in the Entity System plan:
 * it mounts the exact same {@link PlanningProvider} + {@link PlanningViews}
 * used by the in-app Planning tile and the AI Chat "Plan" view, so projects,
 * epics, sprint and priority boards look and behave identically everywhere.
 */

import { Box } from "@mui/material";
import { PlanningProvider, PlanningViews } from "@4eye/web/Tiles/entity-tile";

export function PlanningSection() {
  return (
    <Box sx={{ maxWidth: 1080, mx: "auto", width: "100%" }}>
      <PlanningProvider>
        <PlanningViews title="Projects" />
      </PlanningProvider>
    </Box>
  );
}

export default PlanningSection;

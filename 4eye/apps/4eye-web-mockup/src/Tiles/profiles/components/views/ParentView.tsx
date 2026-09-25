"use client";

/**
 * Parent — guardian profile.
 *
 * Goals lead, and they are about the child. The previous version opened on
 * linked students, approvals and "reviews weekly progress" — an accurate
 * description of a school's relationship *to* a parent, and the opposite of
 * what a parent actually wants from Expanse EDU. The administrative fields are
 * still here; they just stopped being the headline.
 *
 * The goals use the same bespoke `GoalsShowcase` art as the character's
 * signature goals, on the `paper` surface so the goal graphics carry the colour
 * instead of competing with an accent wash.
 */

import * as React from "react";
import { Box, Stack, Typography, alpha } from "@mui/material";

import { GoalsShowcase, PARENT_GOALS } from "@4eye/web/Tiles/integration-layers/goals";
import { useProfiles } from "../../store/ProfileProvider";
import { AspectList, Empty, Section } from "../shared/primitives";

export function ParentView() {
  const { profile } = useProfiles();
  const d = profile.data.parent;
  if (!d) return <Empty label="No guardian profile yet." />;

  return (
    <Stack spacing={1}>
      <Section title="Todo">
        <Box
          sx={{
            p: 1.25,
            borderRadius: 2,
            border: "1px dashed",
            borderColor: (t) => alpha(t.palette.warning.main, 0.5),
            bgcolor: (t) => alpha(t.palette.warning.main, 0.08),
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
            Coming back to this.
          </Typography>
        </Box>
      </Section>
      <Section title="Goals for my children">
        <GoalsShowcase goals={PARENT_GOALS} variant="paper" />
      </Section>
      <Section title="Linked Students">
        <AspectList fields={d.linkedStudents} />
      </Section>
      <Section title="Approvals">
        <AspectList fields={d.approvals} />
      </Section>
      <Section title="Involvement">
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {d.involvement}
        </Typography>
      </Section>
    </Stack>
  );
}

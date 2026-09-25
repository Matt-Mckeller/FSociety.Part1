"use client";

/** Classroom / School — institutional profile. */

import * as React from "react";
import { Stack, Typography } from "@mui/material";

import { useProfiles } from "../../store/ProfileProvider";
import { AspectList, Empty, Section, StatRow } from "../shared/primitives";

export function ClassroomView() {
  const { profile } = useProfiles();
  const d = profile.data.classroom;
  if (!d) return <Empty label="No institutional profile yet." />;

  return (
    <Stack spacing={1}>
      <Section title="School">
        <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
          {d.schoolName}
        </Typography>
      </Section>
      <Section title="Stats">
        <StatRow stats={d.stats} />
      </Section>
      <Section title="Highlights">
        <AspectList fields={d.highlights} />
      </Section>
    </Stack>
  );
}

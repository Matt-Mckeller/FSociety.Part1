"use client";

/** Teacher — educator profile. */

import * as React from "react";
import { Stack } from "@mui/material";

import { useProfiles } from "../../store/ProfileProvider";
import { AspectList, Empty, Section, StatRow, TagRow } from "../shared/primitives";

export function TeacherView() {
  const { profile } = useProfiles();
  const d = profile.data.teacher;
  if (!d) return <Empty label="No educator profile yet." />;

  return (
    <Stack spacing={1}>
      <Section title="Classes Taught">
        <AspectList fields={d.classesTaught} />
      </Section>
      <Section title="Rewards Issued">
        <StatRow stats={d.rewardsIssued} />
      </Section>
      <Section title="Differentiation Needs">
        <TagRow tags={d.differentiationNeeds} />
      </Section>
    </Stack>
  );
}

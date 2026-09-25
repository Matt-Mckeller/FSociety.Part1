"use client";

/** Student — learner profile. */

import * as React from "react";
import { Stack, Typography } from "@mui/material";

import { useProfiles } from "../../store/ProfileProvider";
import { AspectList, Empty, Section, StatRow } from "../shared/primitives";

export function StudentView() {
  const { profile } = useProfiles();
  const d = profile.data.student;
  if (!d) return <Empty label="No learner profile yet." />;

  return (
    <Stack spacing={1}>
      <Section title="Progress">
        <StatRow stats={d.stats} />
      </Section>
      <Section title="Reading & Language">
        <AspectList
          fields={[
            { id: "reading", label: "Reading level", value: d.readingLevel },
            { id: "language", label: "Language", value: d.language },
          ]}
        />
      </Section>
      <Section title="Enrolled Classes">
        <AspectList fields={d.enrolledClasses} />
      </Section>
      <Section title="Assignments">
        <AspectList fields={d.assignments} />
      </Section>
    </Stack>
  );
}

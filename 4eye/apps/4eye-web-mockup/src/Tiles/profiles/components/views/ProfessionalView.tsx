"use client";

/** Professional / Business — work identity: ranked skill areas + compact experience. */

import * as React from "react";
import { Stack, Typography } from "@mui/material";

import { useFocusStack } from "@4eye/web/Tiles/character/store/useFocusStack";
import { useProfiles } from "../../store/ProfileProvider";
import {
  AspectList,
  Empty,
  ExperienceList,
  Section,
  SkillCategoryList,
} from "../shared/primitives";

export function ProfessionalView() {
  const { profile } = useProfiles();
  const { currentGoal } = useFocusStack();
  const d = profile.data.professional;
  if (!d) return <Empty label="No work profile yet." />;
  const goal =
    profile.id === "PROFILE_JANNA" ? d.currentGoal : currentGoal || d.currentGoal;

  const hasCategories = (d.categories?.length ?? 0) > 0;
  const hasExperience = (d.experience?.length ?? 0) > 0;

  return (
    <Stack spacing={1}>
      <Section title="Role">
        <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
          {d.role}
        </Typography>
      </Section>

      {hasCategories ? (
        <Section title="Skill areas">
          <SkillCategoryList categories={d.categories!} />
        </Section>
      ) : (
        <Section title="Skills">
          <AspectList fields={d.skills} />
        </Section>
      )}

      {hasExperience ? (
        <Section title="Experience">
          <ExperienceList entries={d.experience!} />
        </Section>
      ) : null}

      {goal ? (
        <Section title="Current Goal">
          <Typography variant="body2" sx={{ color: "primary.main", fontWeight: 700 }}>
            {goal}
          </Typography>
        </Section>
      ) : null}
    </Stack>
  );
}

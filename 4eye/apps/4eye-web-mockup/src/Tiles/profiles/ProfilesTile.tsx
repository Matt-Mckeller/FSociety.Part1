"use client";

/**
 * ProfilesTile — the single Profiles surface.
 *
 * Hosts all eight profile sub-views behind a view switcher. One Profile drives
 * every view; the depth shown depends on the active view (and, later, level /
 * membership / privacy). UI-first per the canonical plan — example data only.
 *
 * Wrap in {@link ProfileProvider} (the tile self-wraps when used standalone).
 */

import * as React from "react";
import { Box } from "@mui/material";

import { ProfileProvider, useProfiles } from "./store/ProfileProvider";
import type { ProfilesData, ProfileView } from "./model/types";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileViewSwitcher } from "./components/ProfileViewSwitcher";
import { UsersView } from "./components/views/UsersView";
import { HealingView } from "./components/views/HealingView";
import { PsychologyView } from "./components/views/PsychologyView";
import { CommunicationView } from "./components/views/CommunicationView";
import { StudentView } from "./components/views/StudentView";
import { TeacherView } from "./components/views/TeacherView";
import { ClassroomView } from "./components/views/ClassroomView";
import { ProfessionalView } from "./components/views/ProfessionalView";
import { ParentView } from "./components/views/ParentView";

const VIEW_COMPONENT: Record<ProfileView, React.ComponentType> = {
  users: UsersView,
  healing: HealingView,
  psychology: PsychologyView,
  communication: CommunicationView,
  student: StudentView,
  teacher: TeacherView,
  classroom: ClassroomView,
  professional: ProfessionalView,
  parent: ParentView,
};

function ProfilesSurface() {
  const { state } = useProfiles();
  const ActiveView = VIEW_COMPONENT[state.activeView];
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        color: "text.primary",
        maxWidth: 720,
      }}
    >
      <ProfileHeader />
      <Box sx={{ mb: 2 }}>
        <ProfileViewSwitcher />
      </Box>
      <ActiveView />
    </Box>
  );
}

export interface ProfilesTileProps {
  data?: ProfilesData;
  initialView?: ProfileView;
}

export function ProfilesTile({ data, initialView }: ProfilesTileProps = {}) {
  return (
    <ProfileProvider data={data} initialView={initialView}>
      <ProfilesSurface />
    </ProfileProvider>
  );
}

export default ProfilesTile;

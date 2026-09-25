"use client";

/**
 * ProfileProvider — React Context + useReducer for the Profiles tile.
 *
 * Follows the repo state convention (no Redux/zustand): owns the editable
 * {@link ProfilesData} plus the active view and exposes dispatchable actions.
 * UI-first — mutations cover view switching, profile switching, real-name
 * display toggle, and aspect opt-in/out (the chat-context contract).
 */

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { ProfileAspect } from "@4eye/types";

import type { Profile, ProfilesData, ProfileView } from "../model/types";
import { PROFILES_SEED } from "./seed-data";

export type ProfileAction =
  | { kind: "set-view"; view: ProfileView }
  | { kind: "set-profile"; id: string }
  | { kind: "toggle-real-name" }
  | { kind: "toggle-aspect"; aspect: ProfileAspect };

export interface ProfilesState extends ProfilesData {
  activeView: ProfileView;
  /** Whether real names are revealed (defaults to usernames-only per plan). */
  showRealNames: boolean;
}

function mapActiveProfile(
  state: ProfilesState,
  fn: (p: Profile) => Profile,
): Profile[] {
  return state.profiles.map((p) =>
    p.id === state.activeProfileId ? fn(p) : p,
  );
}

export function profilesReducer(
  state: ProfilesState,
  action: ProfileAction,
): ProfilesState {
  switch (action.kind) {
    case "set-view":
      return { ...state, activeView: action.view };

    case "set-profile":
      return state.profiles.some((p) => p.id === action.id)
        ? { ...state, activeProfileId: action.id }
        : state;

    case "toggle-real-name":
      return { ...state, showRealNames: !state.showRealNames };

    case "toggle-aspect":
      return {
        ...state,
        profiles: mapActiveProfile(state, (p) => {
          const has = p.includedAspects.includes(action.aspect);
          return {
            ...p,
            includedAspects: has
              ? p.includedAspects.filter((a) => a !== action.aspect)
              : [...p.includedAspects, action.aspect],
          };
        }),
      };

    default:
      return state;
  }
}

interface ProfilesContextValue {
  state: ProfilesState;
  dispatch: (action: ProfileAction) => void;
  /** The currently active profile (always defined for valid data). */
  profile: Profile;
}

const ProfilesContext = createContext<ProfilesContextValue | null>(null);

function initialState(data: ProfilesData, initialView: ProfileView): ProfilesState {
  return { ...data, activeView: initialView, showRealNames: true };
}

export function ProfileProvider({
  children,
  data = PROFILES_SEED,
  initialView = "users",
}: {
  children: ReactNode;
  data?: ProfilesData;
  initialView?: ProfileView;
}) {
  const [state, dispatch] = useReducer(
    profilesReducer,
    { data, initialView },
    ({ data: d, initialView: v }) => initialState(d, v),
  );

  const value = useMemo<ProfilesContextValue>(() => {
    const profile =
      state.profiles.find((p) => p.id === state.activeProfileId) ??
      state.profiles[0];
    return { state, dispatch, profile };
  }, [state]);

  return (
    <ProfilesContext.Provider value={value}>
      {children}
    </ProfilesContext.Provider>
  );
}

export function useProfiles(): ProfilesContextValue {
  const ctx = useContext(ProfilesContext);
  if (!ctx) {
    throw new Error("useProfiles must be used within a ProfileProvider");
  }
  return ctx;
}

/** Soft read — null when a character surface mounts outside Profiles. */
export function useProfilesOptional(): ProfilesContextValue | null {
  return useContext(ProfilesContext);
}

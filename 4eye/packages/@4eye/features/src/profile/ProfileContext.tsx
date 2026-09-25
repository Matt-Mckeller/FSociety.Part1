"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_PROFILE_CONTEXT_SETTINGS,
  MAX_SELECTED_ROLES,
  PROFILE_ASPECTS,
  type ProfileAspect,
  type ProfileContextSettings,
} from "@4eye/types";

const STORAGE_KEY = "4eye-profile-context-v2";
const ASPECT_SET = new Set<string>(PROFILE_ASPECTS);

function sanitizeSettings(raw: ProfileContextSettings): ProfileContextSettings {
  const fromLegacy = raw.actingAsRole ? [raw.actingAsRole] : [];
  const roles = (raw.actingAsRoles ?? fromLegacy)
    .filter((id, i, arr) => Boolean(id) && arr.indexOf(id) === i)
    .slice(0, MAX_SELECTED_ROLES);
  return {
    ...raw,
    includedAspects: raw.includedAspects.filter((a): a is ProfileAspect =>
      ASPECT_SET.has(a),
    ),
    actingAsRoles: roles,
    actingAsRole: undefined,
  };
}

const isBrowser = typeof window !== "undefined";

interface ProfileContextValue {
  settings: ProfileContextSettings;
  setEnabled: (enabled: boolean) => void;
  toggleAspect: (aspect: ProfileAspect) => void;
  setIncludedAspects: (aspects: ProfileAspect[]) => void;
  setActingAsRoles: (roles: string[]) => void;
  toggleActingAsRole: (role: string) => void;
  setActiveGoalId: (goalId: string | undefined) => void;
  reset: () => void;
}

const ProfileContextCtx = createContext<ProfileContextValue | undefined>(
  undefined,
);

/**
 * ProfileContextProvider — minimal stub that owns profile-context
 * settings (which aspects of the user's profile to inject into the
 * next prompt). Real profile data lives elsewhere; this provider only
 * tracks toggles + active role/goal.
 */
export function ProfileContextProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ProfileContextSettings>(
    DEFAULT_PROFILE_CONTEXT_SETTINGS,
  );

  useEffect(() => {
    if (!isBrowser) return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setSettings(sanitizeSettings(JSON.parse(saved)));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  const setEnabled = useCallback(
    (enabled: boolean) => setSettings((s) => ({ ...s, enabled })),
    [],
  );

  const toggleAspect = useCallback((aspect: ProfileAspect) => {
    setSettings((s) => {
      const has = s.includedAspects.includes(aspect);
      return {
        ...s,
        includedAspects: has
          ? s.includedAspects.filter((a) => a !== aspect)
          : [...s.includedAspects, aspect],
      };
    });
  }, []);

  const setIncludedAspects = useCallback(
    (includedAspects: ProfileAspect[]) =>
      setSettings((s) => ({ ...s, includedAspects })),
    [],
  );

  const setActingAsRoles = useCallback(
    (actingAsRoles: string[]) =>
      setSettings((s) => ({
        ...s,
        actingAsRoles: actingAsRoles.slice(0, MAX_SELECTED_ROLES),
      })),
    [],
  );

  const toggleActingAsRole = useCallback((role: string) => {
    setSettings((s) => {
      const current = s.actingAsRoles ?? [];
      if (current.includes(role)) {
        return { ...s, actingAsRoles: current.filter((id) => id !== role) };
      }
      if (current.length >= MAX_SELECTED_ROLES) return s;
      return { ...s, actingAsRoles: [...current, role] };
    });
  }, []);

  const setActiveGoalId = useCallback(
    (activeGoalId: string | undefined) =>
      setSettings((s) => ({ ...s, activeGoalId })),
    [],
  );

  const reset = useCallback(
    () => setSettings(DEFAULT_PROFILE_CONTEXT_SETTINGS),
    [],
  );

  const value = useMemo<ProfileContextValue>(
    () => ({
      settings,
      setEnabled,
      toggleAspect,
      setIncludedAspects,
      setActingAsRoles,
      toggleActingAsRole,
      setActiveGoalId,
      reset,
    }),
    [
      settings,
      setEnabled,
      toggleAspect,
      setIncludedAspects,
      setActingAsRoles,
      toggleActingAsRole,
      setActiveGoalId,
      reset,
    ],
  );

  return (
    <ProfileContextCtx.Provider value={value}>
      {children}
    </ProfileContextCtx.Provider>
  );
}

export function useProfileContext(): ProfileContextValue {
  const ctx = useContext(ProfileContextCtx);
  if (!ctx)
    throw new Error(
      "useProfileContext must be used within ProfileContextProvider",
    );
  return ctx;
}

/** Safe outside ProfileContextProvider — returns `undefined` instead of throwing. */
export function useOptionalProfileContext(): ProfileContextValue | undefined {
  return useContext(ProfileContextCtx);
}

export { PROFILE_ASPECTS };

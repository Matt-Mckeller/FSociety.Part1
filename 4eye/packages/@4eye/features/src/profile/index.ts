/**
 * @4eye/features/profile (stub)
 *
 * Owns the user-facing toggles for *which* profile aspects feed into
 * the next chat prompt. The chat dock renders `ChatProfilePanel`; this
 * bar remains the compact strip for other hosts.
 */
export {
  ProfileContextProvider,
  useProfileContext,
  useOptionalProfileContext,
  PROFILE_ASPECTS,
} from "./ProfileContext";
export { ProfileContextBar } from "./ProfileContextBar";

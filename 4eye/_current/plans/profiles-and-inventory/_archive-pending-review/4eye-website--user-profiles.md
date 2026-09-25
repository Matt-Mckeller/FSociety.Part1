> **ARCHIVED — pending your review before deletion.**
> **Status:** Superseded by `Planning/roadmap/2026/plans/_current/plans/profiles-and-inventory/profiles-plan.md`.
> **Obvious delete?** ⚠️ REVIEW — this is a formal "W3" website work-item stub linked from 4eye's `Plan.md`/`MasterPlan.md`. The fields/acceptance criteria are folded into profiles-plan.md, but the parent Plan.md may still link here. Update/remove that link before deleting, or leave a redirect stub.
> **Summary:** Website work-item "W3 — User Profiles" (Status: Not yet planned). Lists what to define: profile fields, preferences (language, reading level, notifications), account settings, data model (extends User), frontend components (ProfileView, ProfileEditForm, PreferencesForm, AccountSettings), API surface, dependency on C2 auth, acceptance criteria.
> **Original location:** `4eye/docs/planning/plans/website/user-profiles.md`

---

# W3 — User Profiles

> Profile view/edit, preferences (language, reading level, notification settings).

**Status:** Not yet planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md)

## To Define
- Profile fields (name, email, avatar, organization affiliation)
- Preferences (language, reading level, notification prefs)
- Account settings (password change, delete account, data export)
- Data model: extends User (preferences JSON or related Preference entity)
- Frontend components: ProfileView, ProfileEditForm, PreferencesForm, AccountSettings
- API surface: mutations (updateProfile, updatePreferences, deleteAccount), queries (getProfile)
- Dependencies: C2 (authentication)
- Acceptance criteria

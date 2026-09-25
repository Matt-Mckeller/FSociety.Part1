> **ARCHIVED — pending your review before deletion.**
> **Status:** Captured in `Planning/roadmap/2026/plans/_current/plans/profiles-and-inventory/profiles-plan.md` (§4 known improvement requests).
> **Obvious delete?** ⚠️ REVIEW — this is a phase-1 *work prompt* (instructions to move user components into `@expanse/user` + avatar/level-badge tweaks + auth integration), not just reference notes. Keep until that refactor work is actually done; the avatar/badge details are easy to lose.
> **Summary:** Phase-1 prompt to move user components (profile, profile cards) into the `@expanse/user` package with improvements. Specifics: UserAvatar "Expanding" variant needs centering + top-left line variations (line all around / 3 increasing lines like logo / elevated "button" look without shadows); move level badge to bottom-left; integrate with `@expanse/auth` later (assume no backend for now).
> **Original location:** `Planning/roadmap/2026/prompts/frontend-phase-1/5-userProfile.md`

---

# Goal
I want to move the User Components (including user profile, profile cards, etc ) into packages in the 4eye repository and make some improvements to them.

# Instructions
Make a plan, spend time thinking, get it perfect, discuss and ask important questions.

# Tasks
Discuss and determine best organization options for moving user and user profile options into the expanse user package. 



For the User Avatar there is an example option called Expanding. I kind of like this except it needs improved. it needs centered and I want to experiment with the little line that is in the top left and see more variations of this. I was thinking something similar to the 3 expanding theme in the existing brandCore examples or to have the line go all the way around, or to have 3 of the line similar to the logo in increasing size, also I want to see options that make the user profile seem like its elevated and popping up like a button using a similar tactic (but not shadows if possible)

The level Badge should be on the bottom left instead of the bottom right

# Notes
We will also need to integrate with the existing auth system in the @expanse/auth and make these work together so we will need to discuss features if there is a backend already. I can go over them in detail but for now I'm assuming there is no backend and we should clean it up if there is. We will work through more in a later phase.

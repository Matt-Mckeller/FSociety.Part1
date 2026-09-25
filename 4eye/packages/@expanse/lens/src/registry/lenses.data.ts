/**
 * Lens registry — 100+ named lenses composed from the 17 shells.
 *
 * Each lens pairs an animated shell with a symbol-language *word*, a brand
 * theme, a motion personality, and filter tags. Lenses are data: to add
 * one, append a `lens(...)` row. Words avoid clinical/religious language
 * per brand guidelines and lean into learning, healing, and growth.
 */

import type { HandPoseId, LensDef, LensShellId, LensTheme, LensMotion } from "../core/types"

function lens(
  id: string,
  word: string,
  shell: LensShellId,
  theme: LensTheme,
  motion: LensMotion,
  tags: string[],
  description: string,
  handPose?: HandPoseId,
): LensDef {
  return { id, word, shell, theme, motion, tags, description, handPose }
}

export const LENSES: LensDef[] = [
  // ── Perceive ────────────────────────────────────────────────────────
  lens("notice", "Notice", "aperture", "innovate", "steady", ["perceive", "attention", "awareness"], "Bring what matters into view."),
  lens("observe", "Observe", "aperture", "innovate", "calm", ["perceive", "attention"], "Watch without judging."),
  lens("scan", "Scan", "beacon", "innovate", "lively", ["perceive", "analyze", "attention"], "Sweep the field for signal."),
  lens("detect", "Detect", "scanner", "innovate", "lively", ["perceive", "attention"], "Catch the pattern early."),
  lens("sense", "Sense", "ring-pulse", "heal", "calm", ["perceive", "mood", "wellbeing"], "Tune in to how you feel."),
  lens("spot", "Spot", "reticle", "innovate", "lively", ["perceive", "focus"], "Pinpoint what stands out."),
  lens("watch", "Watch", "aperture", "neutral", "steady", ["perceive", "attention"], "Keep a steady eye on it."),
  lens("read", "Read", "scanner", "improve", "steady", ["perceive", "language", "learning"], "Take in the meaning."),

  // ── Analyze ─────────────────────────────────────────────────────────
  lens("analyze", "Analyze", "scanner", "improve", "steady", ["analyze", "learning"], "Break it down to understand it."),
  lens("compare", "Compare", "link", "improve", "steady", ["analyze", "learning"], "See how two things differ."),
  lens("classify", "Classify", "link", "improve", "steady", ["analyze", "organize"], "Sort ideas into kinds."),
  lens("measure", "Measure", "reticle", "improve", "steady", ["analyze"], "Put a number on it."),
  lens("inspect", "Inspect", "aperture", "improve", "steady", ["analyze", "perceive"], "Look closely at the detail."),
  lens("diagnose", "Diagnose", "scanner", "improve", "lively", ["analyze"], "Find the root of the issue."),
  lens("evaluate", "Evaluate", "reticle", "improve", "steady", ["analyze"], "Weigh what it's worth."),
  lens("trace", "Trace", "spiral", "improve", "steady", ["analyze", "memory"], "Follow the thread back."),

  // ── Recall ──────────────────────────────────────────────────────────
  lens("recall", "Recall", "spiral", "improve", "steady", ["recall", "memory", "learning"], "Bring it back to mind."),
  lens("remember", "Remember", "spiral", "improve", "calm", ["recall", "memory"], "Hold it so it lasts."),
  lens("retrieve", "Retrieve", "spiral", "improve", "lively", ["recall", "memory"], "Pull the answer up."),
  lens("review", "Review", "ring-pulse", "improve", "steady", ["recall", "summarize", "learning"], "Pass back over it."),
  lens("rehearse", "Rehearse", "reticle", "improve", "lively", ["recall", "practice"], "Run it again to keep it."),
  lens("quiz", "Quiz", "reticle", "innovate", "lively", ["recall", "practice", "learning"], "Test what stuck."),
  lens("revisit", "Revisit", "spiral", "improve", "calm", ["recall", "memory"], "Return to strengthen it."),
  lens("anchor", "Anchor", "reticle", "improve", "steady", ["recall", "memory"], "Tie it to something solid."),

  // ── Reframe ─────────────────────────────────────────────────────────
  lens("reframe", "Reframe", "prism", "improve", "steady", ["reframe", "mood"], "See it from a new angle."),
  lens("shift", "Shift", "prism", "improve", "lively", ["reframe"], "Change the frame."),
  lens("flip", "Flip", "prism", "innovate", "lively", ["reframe", "mood"], "Turn the negative positive."),
  lens("reveal", "Reveal", "eye", "innovate", "steady", ["reframe", "perceive"], "Show the hidden side."),
  lens("perspective", "Perspective", "prism", "improve", "calm", ["reframe"], "Step back for the whole view."),
  lens("reinterpret", "Reinterpret", "voice", "improve", "steady", ["reframe", "language"], "Read it a different way."),
  lens("clarify", "Clarify", "prism", "innovate", "steady", ["reframe", "summarize"], "Make the fog lift."),
  lens("illuminate", "Illuminate", "bloom", "innovate", "steady", ["reframe", "perceive"], "Light up the idea."),

  // ── Summarize ───────────────────────────────────────────────────────
  lens("summarize", "Summarize", "converge", "improve", "steady", ["summarize", "learning"], "Say it in fewer words."),
  lens("distill", "Distill", "condense", "improve", "calm", ["summarize"], "Keep only the essence."),
  lens("condense", "Condense", "condense", "improve", "steady", ["summarize"], "Tighten it down."),
  lens("highlight", "Highlight", "reticle", "win", "lively", ["summarize", "focus"], "Mark what matters most."),
  lens("gist", "Gist", "ring-pulse", "improve", "lively", ["summarize"], "Grab the main point."),
  lens("recap", "Recap", "ring-pulse", "improve", "steady", ["summarize", "recall"], "Wrap up the story."),
  lens("outline", "Outline", "link", "improve", "steady", ["summarize", "organize"], "Sketch the shape of it."),
  lens("keypoints", "Key Points", "ring-pulse", "improve", "steady", ["summarize", "learning"], "Pull out the few that count."),

  // ── Synthesize ──────────────────────────────────────────────────────
  lens("synthesize", "Synthesize", "orbit", "improve", "steady", ["synthesize", "learning"], "Weave the pieces into one."),
  lens("combine", "Combine", "orbit", "improve", "steady", ["synthesize"], "Bring the parts together."),
  lens("generate", "Generate", "bloom", "innovate", "lively", ["synthesize"], "Make something new."),
  lens("imagine", "Imagine", "bloom", "innovate", "calm", ["synthesize", "mood"], "Picture what could be."),
  lens("design", "Design", "orbit", "innovate", "steady", ["synthesize"], "Shape it with intent."),
  lens("compose", "Compose", "orbit", "improve", "steady", ["synthesize", "language"], "Put it together well."),
  lens("blend", "Blend", "orbit", "heal", "calm", ["synthesize"], "Merge into harmony."),
  lens("weave", "Weave", "link", "improve", "steady", ["synthesize", "connect"], "Thread ideas across."),

  // ── Practice ────────────────────────────────────────────────────────
  lens("practice", "Practice", "reticle", "improve", "lively", ["practice", "learning"], "Reps build the skill."),
  lens("drill", "Drill", "reticle", "improve", "intense", ["practice"], "Sharpen it through repetition."),
  lens("apply", "Apply", "growth", "improve", "lively", ["practice", "grow"], "Use it for real."),
  lens("train", "Train", "growth", "improve", "lively", ["practice", "grow"], "Build the muscle."),
  lens("attempt", "Attempt", "reticle", "improve", "lively", ["practice"], "Take the shot."),
  lens("iterate", "Iterate", "spiral", "improve", "lively", ["practice", "grow"], "Round after round, better."),
  lens("refine", "Refine", "prism", "improve", "steady", ["practice", "grow"], "Polish the rough edges."),
  lens("master", "Master", "reticle", "win", "steady", ["practice", "grow", "win"], "Own it completely."),

  // ── Organize ────────────────────────────────────────────────────────
  lens("organize", "Organize", "link", "improve", "steady", ["organize"], "Put it all in order."),
  lens("sort", "Sort", "link", "improve", "lively", ["organize"], "Group like with like."),
  lens("map", "Map", "link", "improve", "steady", ["organize", "learning"], "Lay out the territory."),
  lens("structure", "Structure", "link", "improve", "steady", ["organize"], "Give it a backbone."),
  lens("sequence", "Sequence", "link", "improve", "lively", ["organize", "practice"], "Put steps in order."),
  lens("prioritize", "Prioritize", "reticle", "win", "steady", ["organize", "focus"], "First things first."),
  lens("plan", "Plan", "link", "improve", "steady", ["organize"], "Chart the path ahead."),
  lens("group", "Group", "orbit", "improve", "steady", ["organize"], "Cluster the related."),

  // ── Focus ───────────────────────────────────────────────────────────
  lens("focus", "Focus", "reticle", "innovate", "steady", ["focus", "attention"], "One thing, fully."),
  lens("attend", "Attend", "reticle", "innovate", "steady", ["focus", "attention"], "Give it your presence."),
  lens("concentrate", "Concentrate", "aperture", "innovate", "steady", ["focus", "attention"], "Gather your mind."),
  lens("lock-on", "Lock On", "reticle", "innovate", "intense", ["focus", "attention"], "Hold the target."),
  lens("center", "Center", "ring-pulse", "heal", "calm", ["focus", "regulate"], "Return to the middle."),
  lens("ground", "Ground", "ring-pulse", "heal", "calm", ["focus", "regulate", "wellbeing"], "Settle into the now."),
  lens("commit", "Commit", "reticle", "win", "steady", ["focus", "grow"], "Decide and stay."),
  lens("deepen", "Deepen", "spiral", "improve", "calm", ["focus", "attention"], "Go further in."),

  // ── Regulate (heal) ─────────────────────────────────────────────────
  lens("breathe", "Breathe", "wave", "heal", "calm", ["regulate", "wellbeing", "mood"], "Slow down and reset."),
  lens("calm", "Calm", "wave", "heal", "calm", ["regulate", "mood", "wellbeing"], "Let the waves settle."),
  lens("soothe", "Soothe", "wave", "heal", "calm", ["regulate", "mood"], "Ease the tension.", "heart"),
  lens("balance", "Balance", "wave", "heal", "steady", ["regulate", "wellbeing"], "Find your level."),
  lens("rest", "Rest", "wave", "heal", "calm", ["regulate", "wellbeing", "habits"], "Recover on purpose."),
  lens("release", "Release", "wave", "heal", "calm", ["regulate", "mood"], "Let it go."),
  lens("restore", "Restore", "bloom", "heal", "calm", ["regulate", "wellbeing"], "Come back to whole."),
  lens("regulate", "Regulate", "wave", "heal", "steady", ["regulate", "mood", "wellbeing"], "Steady your inner weather."),

  // ── Protect ─────────────────────────────────────────────────────────
  lens("protect", "Protect", "shield", "protect", "steady", ["protect", "wellbeing"], "Keep what matters safe."),
  lens("guard", "Guard", "shield", "protect", "steady", ["protect"], "Stand watch over it."),
  lens("shield", "Shield", "shield", "protect", "steady", ["protect"], "Block what harms."),
  lens("filter", "Filter", "shield", "protect", "lively", ["protect", "focus", "attention"], "Let the good through."),
  lens("boundary", "Boundary", "shield", "protect", "steady", ["protect", "relationships"], "Draw the line you hold."),
  lens("secure", "Secure", "shield", "protect", "steady", ["protect"], "Lock it down."),
  lens("defend", "Defend", "shield", "protect", "lively", ["protect"], "Hold your ground."),
  lens("stabilize", "Stabilize", "shield", "protect", "calm", ["protect", "regulate"], "Make it steady."),

  // ── Grow (improve) ──────────────────────────────────────────────────
  lens("improve", "Improve", "growth", "improve", "steady", ["grow", "learning"], "A little better each day."),
  lens("grow", "Grow", "growth", "improve", "steady", ["grow"], "Reach for more."),
  lens("level-up", "Level Up", "growth", "win", "lively", ["grow", "win"], "Cross the next threshold."),
  lens("progress", "Progress", "growth", "improve", "steady", ["grow"], "Move the needle forward."),
  lens("compound", "Compound", "spiral", "win", "steady", ["grow", "attention", "win"], "Small gains stack up."),
  lens("build", "Build", "growth", "improve", "lively", ["grow"], "Lay another brick."),
  lens("strengthen", "Strengthen", "growth", "improve", "steady", ["grow", "wellbeing"], "Add resilience."),
  lens("ascend", "Ascend", "growth", "win", "lively", ["grow", "win", "attention"], "Rise to new heights."),

  // ── Connect ─────────────────────────────────────────────────────────
  lens("connect", "Connect", "link", "heal", "steady", ["connect", "relationships"], "Reach across the gap."),
  lens("relate", "Relate", "link", "heal", "calm", ["connect", "relationships"], "Find the common thread."),
  lens("empathize", "Empathize", "ring-pulse", "heal", "calm", ["connect", "mood", "relationships"], "Feel with them."),
  lens("listen", "Listen", "ring-pulse", "heal", "calm", ["connect", "communication"], "Hear what's underneath."),
  lens("bond", "Bond", "link", "heal", "steady", ["connect", "relationships"], "Deepen the tie."),
  lens("reach-out", "Reach Out", "link", "heal", "lively", ["connect", "relationships", "communication"], "Make the first move."),
  lens("share", "Share", "orbit", "heal", "lively", ["connect", "communication"], "Give and be known."),
  lens("sync", "Sync", "orbit", "innovate", "lively", ["connect", "communication"], "Get on the same wave."),

  // ── Celebrate (win) ─────────────────────────────────────────────────
  lens("celebrate", "Celebrate", "bloom", "win", "lively", ["celebrate", "win", "mood"], "Mark the win.", "peace"),
  lens("reward", "Reward", "bloom", "win", "lively", ["celebrate", "win"], "Earn the good feeling."),
  lens("encourage", "Encourage", "bloom", "heal", "steady", ["celebrate", "mood", "relationships"], "Lift someone up."),
  lens("gratitude", "Gratitude", "bloom", "heal", "calm", ["celebrate", "mood", "wellbeing"], "Notice the good.", "clasp"),
  lens("win", "Win", "bloom", "win", "lively", ["celebrate", "win"], "Take the victory.", "peace"),
  lens("streak", "Streak", "spiral", "win", "lively", ["celebrate", "win", "habits"], "Keep the chain alive."),
  lens("shine", "Shine", "bloom", "win", "lively", ["celebrate", "win", "mood"], "Let it show."),
  lens("flourish", "Flourish", "bloom", "heal", "calm", ["celebrate", "grow", "wellbeing"], "Thrive in full bloom."),
]

/** Total lens count — exported for sanity checks / stories. */
export const LENS_COUNT = LENSES.length

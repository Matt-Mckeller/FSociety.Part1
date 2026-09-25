/**
 * Action word banks — the raw vocabulary of the symbol-language.
 *
 * Each transformation category owns a bank of mostly one-word verbs.
 * The expander ({@link ../expand}) turns these into {@link LensAction}
 * records (assigning theme + lens + tags) and de-duplicates across
 * categories (first category wins). Together these banks yield 1000+
 * sortable/filterable actions.
 *
 * To add actions: append words to the relevant bank. Keep them on-brand
 * (learning, healing, growth) and avoid clinical/religious terms.
 */

import type { TransformCategory } from "../core/tags"

export const ACTION_WORDS: Record<TransformCategory, string[]> = {
  // ── Perceive ──────────────────────────────────────────────────────
  perceive: [
    "Notice", "Observe", "Watch", "See", "Scan", "Detect", "Spot", "Sense",
    "Glimpse", "Perceive", "Catch", "Witness", "View", "Survey", "Glance",
    "Peek", "Track", "Monitor", "Sight", "Behold", "Discern", "Recognize",
    "Identify", "Locate", "Find", "Discover", "Uncover", "Pinpoint", "Mark",
    "Register", "Note", "Skim", "Browse", "Sweep", "Probe", "Examine",
    "Regard", "Gaze", "Look", "Acknowledge", "Foresee", "Anticipate",
    "Preview", "Sample", "Tune", "Attune", "Flag", "Realize", "Apprehend",
    "Distinguish", "Differentiate", "Notice-shift", "Read-room", "Observe-self",
    "Scout", "Survey-scene", "Tag-it", "Clock", "Pick-up", "Pick-out",
    "Single-out", "Sense-check", "Eye", "Inspect-glance", "Discern-pattern",
    "Spot-trend", "Read-signal", "Catch-cue", "Sense-mood", "Watch-closely",
    "Stay-alert", "Tune-in", "Look-up", "Look-around",
  ],

  // ── Analyze ───────────────────────────────────────────────────────
  analyze: [
    "Analyze", "Compare", "Classify", "Measure", "Inspect", "Diagnose",
    "Evaluate", "Assess", "Break-down", "Dissect", "Parse", "Decode",
    "Interpret", "Investigate", "Examine", "Study", "Probe", "Test",
    "Verify", "Validate", "Audit", "Check", "Reason", "Deduce", "Infer",
    "Conclude", "Calculate", "Compute", "Estimate", "Quantify", "Rank",
    "Rate", "Score", "Grade", "Benchmark", "Contrast", "Correlate",
    "Cross-check", "Trace", "Map-cause", "Find-root", "Isolate", "Separate",
    "Categorize", "Label", "Sort-by", "Weigh", "Judge", "Critique", "Review-data",
    "Model", "Simulate", "Forecast", "Project", "Predict", "Spot-bias",
    "Question", "Challenge", "Scrutinize", "Untangle", "Unpack", "Diagnose-gap",
    "Profile", "Gauge", "Appraise", "Survey-data", "Map-logic", "Find-pattern",
    "Test-claim", "Pressure-test", "Stress-test", "Fact-check", "Reverse-engineer",
  ],

  // ── Recall ────────────────────────────────────────────────────────
  recall: [
    "Recall", "Remember", "Retrieve", "Review", "Rehearse", "Quiz", "Revisit",
    "Anchor", "Memorize", "Recite", "Recollect", "Recap", "Refresh", "Reinforce",
    "Retain", "Store", "Encode", "Imprint", "Cement", "Fix", "Lock-in",
    "Reload", "Recall-fast", "Flash", "Flashcard", "Drill-recall", "Self-test",
    "Quiz-self", "Spaced-recall", "Recall-cue", "Prompt", "Cue", "Jog-memory",
    "Bring-back", "Call-up", "Summon", "Recover", "Re-access", "Re-learn",
    "Re-read", "Re-quiz", "Restudy", "Loop-back", "Replay", "Rewind",
    "Retell", "Recount", "Re-derive", "Recall-name", "Recall-fact", "Recall-step",
    "Re-cap", "Reconstruct", "Remind", "Echo", "Recall-context", "Recall-link",
    "Recall-image", "Recall-sound", "Recall-route", "Mnemonic", "Chunk",
    "Re-chunk", "Spaced-review", "Interleave", "Recall-test", "Strengthen-memory",
    "Recall-trigger", "Recall-chain", "Memory-walk", "Recall-detail", "Recall-order",
  ],

  // ── Reframe ───────────────────────────────────────────────────────
  reframe: [
    "Reframe", "Shift", "Flip", "Reveal", "Reinterpret", "Clarify", "Illuminate",
    "Recast", "Rethink", "Reconsider", "Reposition", "Re-angle", "Reword",
    "Rephrase", "Translate", "Recontextualize", "Zoom-out", "Zoom-in",
    "Step-back", "Widen", "Narrow", "Invert", "Turn-around", "Pivot",
    "Switch-view", "See-anew", "Re-see", "Open-up", "Lighten", "Brighten",
    "Soften", "Recolor", "Reshape", "Redraw", "Re-story", "Re-spin",
    "Spin-positive", "Find-silver", "Find-upside", "Find-meaning", "Find-lesson",
    "Reclaim", "Re-own", "Recenter", "Reorient", "Re-aim", "Re-map",
    "Reimagine", "Reconceive", "Reframe-loss", "Reframe-fear", "Reframe-fail",
    "Normalize", "Decatastrophize", "Right-size", "Re-scope", "Reframe-self",
    "Reframe-other", "Assume-best", "Give-grace", "Find-growth", "See-gift",
    "Loosen", "Re-light", "Refocus-lens", "Re-tell", "Re-explain", "Re-teach",
    "Reframe-now", "Recast-past", "Reframe-future",
  ],

  // ── Summarize ─────────────────────────────────────────────────────
  summarize: [
    "Summarize", "Distill", "Condense", "Highlight", "Gist", "Recap",
    "Outline", "Abridge", "Shorten", "Compress", "Boil-down", "Trim",
    "Tighten", "Simplify", "Streamline", "Reduce", "Crystallize", "Capture",
    "Headline", "Bullet", "Bullet-point", "Key-point", "Takeaway", "Sum-up",
    "Wrap-up", "Brief", "Debrief", "Synopsis", "Abstract", "Précis",
    "Snapshot", "Overview", "Digest", "Quick-take", "Tl-dr", "Essence",
    "Core-idea", "Main-point", "Top-line", "One-liner", "Nutshell",
    "Skim-down", "Cut-fluff", "Strip-down", "Pare", "Pare-down", "Focus-message",
    "Frame-point", "Lead-with", "Punchline", "Thesis", "Through-line",
    "Recall-gist", "Summarize-day", "Summarize-read", "Summarize-talk",
    "Summarize-self", "Quick-recap", "Mini-recap", "Boil", "Concentrate-text",
    "Highlight-key", "Mark-key", "Pull-quote", "Key-takeaway", "Sum",
    "Wrap", "Cap-off", "Close-out", "Final-word",
  ],

  // ── Synthesize ────────────────────────────────────────────────────
  synthesize: [
    "Synthesize", "Combine", "Generate", "Imagine", "Design", "Compose",
    "Blend", "Weave", "Merge", "Fuse", "Integrate", "Unify", "Assemble",
    "Build", "Create", "Invent", "Devise", "Craft", "Construct", "Form",
    "Forge", "Shape", "Mold", "Sketch", "Draft", "Prototype", "Remix",
    "Mashup", "Combine-ideas", "Connect-dots", "Bridge", "Link-ideas",
    "Cross-pollinate", "Brainstorm", "Ideate", "Dream-up", "Conceive",
    "Originate", "Spark", "Spin-new", "Recombine", "Reassemble", "Stitch",
    "Knit", "Braid", "Layer", "Compound-idea", "Pattern", "Template",
    "Map-out", "Architect", "Plan-new", "Frame", "Outline-new", "Storyboard",
    "Compose-new", "Generate-options", "Generate-ideas", "Concept", "Concept-art",
    "Hybridize", "Synthesize-views", "Merge-paths", "Combine-skills",
    "Weave-story", "Build-bridge", "Form-whole", "Make", "Produce", "Render",
    "Author", "Coin",
  ],

  // ── Practice ──────────────────────────────────────────────────────
  practice: [
    "Practice", "Drill", "Apply", "Train", "Attempt", "Iterate", "Refine",
    "Master", "Repeat", "Rep", "Reps", "Exercise", "Work", "Workout",
    "Hone", "Sharpen", "Polish", "Perfect", "Tune-skill", "Rehab", "Warm-up",
    "Run-through", "Walk-through", "Try", "Try-again", "Retry", "Redo",
    "Practice-set", "Practice-run", "Mock", "Simulate-do", "Roleplay",
    "Shadow", "Mimic", "Copy", "Trace-practice", "Loop", "Cycle", "Grind",
    "Reinforce-skill", "Build-skill", "Skill-up", "Practice-aloud", "Recite-practice",
    "Spar", "Scrimmage", "Game-day", "Trial", "Experiment", "Test-skill",
    "Reattempt", "Re-practice", "Re-drill", "Re-run", "Re-work", "Re-do",
    "Fine-tune", "Calibrate", "Adjust", "Tweak", "Iterate-fast", "Practice-daily",
    "Practice-slow", "Practice-hard", "Push-rep", "Habit-rep", "Micro-practice",
    "Deliberate", "Rep-out", "Drill-down", "Practice-scale",
  ],

  // ── Organize ──────────────────────────────────────────────────────
  organize: [
    "Organize", "Sort", "Map", "Structure", "Sequence", "Prioritize", "Plan",
    "Group", "Arrange", "Order", "Categorize-org", "File", "Index", "Catalog",
    "Tag-org", "Label-org", "Cluster", "Bucket", "Bin", "Stack", "Layer-org",
    "Tier", "Rank-org", "Queue", "Schedule", "Calendar", "Timeline", "Roadmap",
    "Chart", "Diagram", "Tree", "Hierarchy", "Nest", "Align", "Line-up",
    "Tidy", "Declutter", "Clean-up", "Streamline-org", "Systematize", "Standardize",
    "Template-org", "Frame-org", "Scaffold", "Lay-out", "Set-up", "Set-order",
    "Re-order", "Re-arrange", "Re-sort", "Re-group", "Re-stack", "Re-file",
    "Batch", "Sort-by-org", "Split", "Chunk-org", "Segment", "Partition",
    "Divide", "Allocate", "Assign", "Slot", "Place", "Position", "Map-steps",
    "List", "Checklist", "Inventory", "Tabulate", "Grid", "Matrix",
  ],

  // ── Focus ─────────────────────────────────────────────────────────
  focus: [
    "Focus", "Attend", "Concentrate", "Lock-on", "Center-focus", "Ground-focus",
    "Commit", "Deepen", "Zero-in", "Hone-in", "Home-in", "Dial-in", "Tune-focus",
    "Fixate", "Engage", "Immerse", "Absorb", "Dive-in", "Lean-in", "Buckle-down",
    "Single-task", "Mono-task", "Block-time", "Time-box", "Sprint", "Deep-work",
    "Flow", "Get-in-zone", "Stay-on", "Hold-attention", "Keep-eyes", "Resist",
    "Ignore-noise", "Tune-out", "Filter-focus", "Cut-distraction", "Silence",
    "Mute", "Clear-deck", "Clear-mind", "Settle", "Steady-focus", "Anchor-focus",
    "Pin", "Hold", "Stick", "Persist", "Endure", "Sustain", "Maintain",
    "Re-focus", "Re-engage", "Re-center", "Reset-focus", "Re-lock", "Return",
    "Resume", "Continue", "Press-on", "Push", "Grind-focus", "Lock-target",
    "Target", "Aim", "Set-sight", "Narrow-focus", "Sharpen-focus", "Guard-focus",
  ],

  // ── Regulate ──────────────────────────────────────────────────────
  regulate: [
    "Breathe", "Calm", "Soothe", "Balance", "Rest", "Release", "Restore",
    "Regulate", "Relax", "Unwind", "Decompress", "Destress", "Settle-down",
    "Slow-down", "Pause", "Halt", "Stop", "Cool-down", "Cool-off", "Ease",
    "Ease-up", "Let-go", "Loosen-up", "Soften-self", "Center-self", "Ground-self",
    "Anchor-self", "Steady-self", "Re-center-self", "Reset", "Recharge",
    "Refuel", "Renew", "Refresh-self", "Recover-self", "Heal", "Mend",
    "Nurse", "Comfort", "Reassure", "Self-soothe", "Self-calm", "Breathe-deep",
    "Breathe-slow", "Exhale", "Inhale", "Sigh", "Yawn", "Stretch", "Loosen-body",
    "Relax-body", "Drop-shoulders", "Unclench", "Soften-face", "Slow-heart",
    "Quiet-mind", "Still", "Be-still", "Sit", "Meditate", "Reflect-calm",
    "Sleep", "Nap", "Pace", "Regulate-mood", "Regulate-pace", "Modulate",
    "Temper", "Dampen", "De-escalate", "Cool-head",
  ],

  // ── Protect ───────────────────────────────────────────────────────
  protect: [
    "Protect", "Guard", "Shield", "Filter", "Boundary", "Secure", "Defend",
    "Stabilize", "Safeguard", "Shelter", "Cover", "Block", "Deflect", "Repel",
    "Resist-harm", "Fortify", "Reinforce-guard", "Lock", "Seal", "Wall-off",
    "Screen", "Vet", "Gatekeep", "Limit", "Cap", "Contain", "Restrain",
    "Hold-line", "Stand-firm", "Stand-ground", "Say-no", "Decline", "Refuse",
    "Opt-out", "Step-away", "Withdraw", "Retreat", "Distance", "Unplug",
    "Disconnect-guard", "Mute-source", "Mute-toxic", "Cut-off", "Block-noise",
    "Set-limit", "Set-boundary", "Hold-boundary", "Keep-safe", "Watch-over",
    "Patrol", "Monitor-guard", "Preserve", "Conserve", "Maintain-safety",
    "Backup", "Insure", "Hedge", "Buffer", "Cushion", "Brace", "Steel",
    "Harden", "Toughen", "Anchor-safety", "Stabilize-self", "Ground-safety",
    "Reassure-self", "Self-protect", "Guard-time", "Guard-energy", "Guard-focus-p",
    "Protect-peace",
  ],

  // ── Grow ──────────────────────────────────────────────────────────
  grow: [
    "Improve", "Grow", "Level-up", "Progress", "Compound", "Build-up",
    "Strengthen", "Ascend", "Advance", "Develop", "Evolve", "Expand",
    "Extend", "Stretch-grow", "Reach", "Rise", "Climb", "Elevate", "Upgrade",
    "Boost", "Amplify", "Accelerate", "Scale", "Multiply", "Increase",
    "Gain", "Earn", "Accumulate", "Stack-gain", "Add", "Augment", "Enrich",
    "Enhance", "Better", "Sharpen-self", "Hone-self", "Cultivate", "Nurture",
    "Foster", "Mature", "Ripen", "Flourish-grow", "Thrive-grow", "Bloom-grow",
    "Sprout", "Root", "Branch", "Blossom", "Push-limit", "Stretch-self",
    "Outgrow", "Surpass", "Exceed", "Break-through", "Break-plateau", "Step-up",
    "Move-up", "Trend-up", "Compound-gain", "Daily-gain", "One-percent",
    "Build-habit", "Form-habit", "Stick-habit", "Keep-going", "Persevere",
    "Bounce-back", "Rebound", "Recover-grow", "Adapt", "Learn", "Upskill",
    "Re-skill",
  ],

  // ── Connect ───────────────────────────────────────────────────────
  connect: [
    "Connect", "Relate", "Empathize", "Listen", "Bond", "Reach-out", "Share",
    "Sync", "Link", "Join", "Unite", "Engage-other", "Greet", "Welcome",
    "Include", "Invite", "Open-up-c", "Confide", "Trust", "Lean-on", "Support",
    "Help", "Assist", "Serve", "Give", "Offer", "Comfort-other", "Console",
    "Reassure-other", "Encourage-c", "Cheer", "Affirm", "Validate-other",
    "Appreciate", "Thank", "Compliment", "Praise", "Acknowledge-other",
    "Notice-other", "Check-in", "Follow-up", "Ask", "Inquire", "Empathize-deep",
    "Attune-other", "Mirror", "Reflect-back", "Paraphrase", "Hear-out",
    "Hold-space", "Be-present", "Show-up", "Stay-close", "Reconnect", "Repair",
    "Reconcile", "Forgive", "Apologize", "Make-amends", "Bridge-gap", "Mend-tie",
    "Deepen-bond", "Strengthen-tie", "Network", "Collaborate", "Partner",
    "Team-up", "Co-create", "Coordinate", "Align-people", "Build-rapport",
    "Befriend", "Care",
  ],

  // ── Celebrate ─────────────────────────────────────────────────────
  celebrate: [
    "Celebrate", "Reward", "Encourage", "Gratitude", "Win", "Streak", "Shine",
    "Flourish", "Rejoice", "Cheer-win", "Applaud", "Clap", "Honor", "Praise-win",
    "Recognize-win", "Acknowledge-win", "Mark-win", "Toast", "Party", "Revel",
    "Delight", "Savor", "Enjoy", "Bask", "Beam", "Glow-win", "Smile", "Laugh",
    "Dance", "Cheer-on", "Hype", "Boost-win", "Pump-up", "Fist-pump", "High-five",
    "Victory", "Triumph", "Conquer", "Prevail", "Succeed", "Achieve", "Accomplish",
    "Earn-win", "Claim-win", "Bank-win", "Cash-in", "Score-win", "Tally", "Count-win",
    "Collect", "Unlock", "Earn-badge", "Earn-coin", "Earn-points", "Earn-level",
    "Hit-goal", "Reach-goal", "Finish", "Complete", "Cross-line", "Nail-it",
    "Crush-it", "Own-it", "Smash-goal", "Be-proud", "Feel-proud", "Take-bow",
    "Give-thanks", "Count-blessings", "Notice-good", "Name-good", "Treat",
    "Celebrate-small", "Celebrate-self",
  ],

  // ── Movement ──────────────────────────────────────────────────────
  movement: [
    "Move", "Advance", "Step", "Walk", "Navigate", "Travel", "Go", "Progress-move",
    "March", "Trek", "Stride", "Sprint-move", "Dash", "Charge", "Press-forward",
    "Push-through", "Drive", "Launch-move", "Leap", "Jump", "Climb-move", "Rise-move",
    "Ascend-move", "Descend", "Slide", "Glide", "Flow-move", "Float", "Drift",
    "Shift-move", "Transfer", "Transport", "Cross", "Traverse", "Pass-through",
    "Thread", "Weave-path", "Cut-through", "Break-through-move", "Rotate", "Turn",
    "Spin-move", "Circle", "Loop-move", "Zigzag", "Push-move", "Pull-move",
    "Carry", "Lift-move", "Lower", "Set-direction", "Change-direction", "Change-pace",
    "Speed-up", "Slow-down-move", "Pause-move", "Resume-move", "Take-step",
    "Make-move", "Keep-moving", "Stay-course", "Hold-pace", "Set-pace", "Find-rhythm",
    "Enter", "Exit", "Approach", "Depart", "Arrive", "Leave", "Return-move",
    "Transition", "Move-on", "Step-forward", "Step-back-move", "Step-aside",
    "Side-step", "Dodge", "Pivot-move", "Redirect", "Reroute", "Detour",
  ],

  // ── Mood ──────────────────────────────────────────────────────────
  mood: [
    "Lift", "Brighten-mood", "Elevate-mood", "Boost-mood", "Uplift", "Inspire-mood",
    "Energize-mood", "Motivate-mood", "Ground-mood", "Center-mood", "Stabilize-mood",
    "Balance-mood", "Settle-mood", "Calm-mood", "Ease-mood", "Soften-mood",
    "Soothe-mood", "Comfort-mood", "Cheer-mood", "Encourage-mood", "Reassure-mood",
    "Affirm-mood", "Validate-mood", "Accept-mood", "Embrace-mood", "Allow-mood",
    "Release-mood", "Let-go-mood", "Process-mood", "Feel", "Tune-mood",
    "Check-mood", "Name-feeling", "Label-emotion", "Trace-feeling", "Sit-with-mood",
    "Breathe-through-mood", "Shift-mood", "Reset-mood", "Recharge-mood",
    "Restore-mood", "Reclaim-joy", "Find-calm", "Build-hope", "Hold-space-mood",
    "Be-present-mood", "Notice-mood", "Observe-feeling", "Ride-wave", "Surf-mood",
    "Anchor-mood", "Weather-mood", "Tend-mood", "Nurture-mood", "Protect-mood",
    "Guard-mood", "Name-mood", "Track-mood", "Log-mood", "Express", "Channel",
    "Direct-energy", "Harness-mood", "Transform-mood", "Reframe-mood",
    "Soften-state", "Open-up-mood", "Invite-joy", "Seek-calm",
  ],

  // ── Status ────────────────────────────────────────────────────────
  status: [
    "Check-status", "Update", "Report", "Log-status", "Record-status", "Post",
    "Share-status", "Signal", "Flag-status", "Mark-status", "Tag-status",
    "Note-status", "Snapshot-status", "Timestamp", "Review-status", "Gauge-status",
    "Measure-progress", "Assess-status", "Monitor-status", "Confirm-status",
    "Verify-status", "Validate-status", "Declare", "Announce", "Broadcast",
    "Publish", "Sync-status", "Align-status", "Compare-status", "Baseline-status",
    "Benchmark-status", "Set-milestone", "Mark-done", "Complete-status", "Close-status",
    "Archive-status", "Wrap-up-status", "Check-in-status", "Check-out-status",
    "Report-back", "Follow-up-status", "Update-all", "Notify", "Alert-status",
    "Escalate", "Resolve", "Clear-status", "Reset-status", "Reopen",
    "Reactivate", "Pause-status", "Resume-status", "Hold-status", "Release-status",
    "Assign-status", "Claim-status", "Transfer-status", "Delegate-status",
    "Own-status", "Commit-status", "Track-progress", "Show-progress", "State",
    "Summarize-status", "Capture-status", "Ping", "Pulse-status", "Stand-up",
  ],
}

"use client";

import type { SpellbookData } from "../model/types";

export const SPELLBOOK_SEED: SpellbookData = {
  spells: [
    // ── Learn · Compress & Clarify ─────────────────────────────────────────
    {
      id: "SPELL_CONCISE",
      name: "Concise",
      lensId: "distill",
      category: "learn",
      learnGroup: "compress",
      shortDescription: "Strip to the core idea.",
      details:
        "Removes everything that isn't essential and returns the single clearest version of the content. Use when something is too long, too padded, or you just need the point.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_EXPLAIN",
      name: "Explain",
      lensId: "clarify",
      category: "learn",
      learnGroup: "compress",
      shortDescription: "Break it down simply, step by step.",
      details:
        "Breaks a concept into plain-language, chunked steps with examples tuned to your level. Use when something feels over your head or you want a clean mental model.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_OUTLINE",
      name: "Outline",
      lensId: "outline",
      category: "learn",
      learnGroup: "compress",
      shortDescription: "Structure as a hierarchical outline.",
      details:
        "Organises the content into a clean hierarchy of main ideas and sub-points. Use to see the skeleton of complex material or to create a study map.",
      alwaysAvailable: false,
    },

    // ── Learn · Go Deeper ─────────────────────────────────────────────────
    {
      id: "SPELL_EXPAND",
      name: "Expand",
      lensId: "deepen",
      category: "learn",
      learnGroup: "depth",
      shortDescription: "Unpack in full depth.",
      details:
        "Goes beyond the summary to surface nuance, edge cases, and the full picture. Use when you want real depth — not just the gist but the reasons, the limits, and what's left out.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_ANALYZE",
      name: "Analyze",
      lensId: "analyze",
      category: "learn",
      learnGroup: "depth",
      shortDescription: "Break into components and structure.",
      details:
        "Decomposes the content into its constituent parts — causes, effects, patterns, and relationships. Use to understand how something is built and why it works.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_VISUALIZE",
      name: "Visualize",
      lensId: "reveal",
      category: "learn",
      learnGroup: "depth",
      shortDescription: "Turn into a diagram or chart.",
      details:
        "Transforms text into a visual representation — a diagram, concept map, table, or chart. Use when a concept is easier to grasp as a picture than as prose.",
      alwaysAvailable: true,
    },

    // ── Learn · Make It Stick ─────────────────────────────────────────────
    {
      id: "SPELL_EXAMPLE",
      name: "Example",
      lensId: "illuminate",
      category: "learn",
      learnGroup: "anchor",
      shortDescription: "Give a concrete real-world instance.",
      details:
        "Grounds the abstract in a specific, tangible case you can picture and remember. Use when a concept feels slippery — a good example locks it in.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_ANALOGIZE",
      name: "Analogize",
      lensId: "compare",
      category: "learn",
      learnGroup: "anchor",
      shortDescription: "Explain via a familiar analogy.",
      details:
        "Maps the concept onto something you already understand well. Use when you need a bridge from the unfamiliar to the familiar — analogies encode faster and last longer.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_APPLY",
      name: "Apply",
      lensId: "apply",
      category: "learn",
      learnGroup: "anchor",
      shortDescription: "How do I actually use this?",
      details:
        "Translates theory into action — specific steps, decisions, or practices you could do right now. Use when you understand the concept but aren't sure what to do with it.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_FLASHCARD",
      name: "Flashcard",
      lensId: "rehearse",
      category: "learn",
      learnGroup: "anchor",
      shortDescription: "Generate Q&A card pairs.",
      details:
        "Distils the content into concise question-and-answer pairs ready for spaced repetition. Use after an Explain or Expand pass to lock in the key ideas.",
      alwaysAvailable: false,
    },

    // ── Learn · Test & Challenge ──────────────────────────────────────────
    {
      id: "SPELL_QUIZ",
      name: "Quiz Me",
      lensId: "quiz",
      category: "learn",
      learnGroup: "challenge",
      shortDescription: "Practice with retrieval questions.",
      details:
        "Generates low-stakes practice questions on the current topic. Retrieval practice is the single highest-yield memory technique — use after any learning session.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_SOCRATIC",
      name: "Socratic",
      lensId: "trace",
      category: "learn",
      learnGroup: "challenge",
      shortDescription: "Guide me via questions, not answers.",
      details:
        "Leads you to the insight through careful questions rather than handing it over. Use when you want to discover understanding rather than receive it — builds stronger models.",
      alwaysAvailable: false,
    },
    {
      id: "SPELL_CHALLENGE",
      name: "Challenge",
      lensId: "diagnose",
      category: "learn",
      learnGroup: "challenge",
      shortDescription: "Poke holes in my understanding.",
      details:
        "Probes the edges of what you know — common misconceptions, missing nuance, what you're over-generalising. Use when you think you understand something but want to be sure.",
      alwaysAvailable: false,
    },
    {
      id: "SPELL_MODALITY",
      name: "Remix Modality",
      lensId: "shift",
      category: "learn",
      learnGroup: "challenge",
      shortDescription: "Re-teach in a completely different format.",
      details:
        "Transforms content into another learning modality — story, dialogue, hands-on exercise, audio script. Use to escape the format you're stuck in and find the one that clicks.",
      alwaysAvailable: false,
    },

    // ── Transform ─────────────────────────────────────────────────────────
    {
      id: "SPELL_SUMMARIZE",
      name: "Summarize",
      lensId: "summarize",
      category: "transform",
      shortDescription: "Condense content into the key points.",
      details:
        "Distils the current content into a short, faithful summary. Use when you need the gist fast or a TL;DR for sharing.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_TRANSLATE",
      name: "Translate",
      lensId: "reinterpret",
      category: "transform",
      shortDescription: "Render content in another language.",
      details:
        "Translates the current content while preserving tone and intent. Use for multilingual sharing or accessibility.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_REFRAME",
      name: "Reframe",
      lensId: "reframe",
      category: "transform",
      shortDescription: "Re-express from a new perspective.",
      details:
        "Rewrites content from a different angle or audience. Use to find a kinder, clearer, or more persuasive framing.",
      alwaysAvailable: false,
    },

    // ── Assess ────────────────────────────────────────────────────────────
    {
      id: "SPELL_FACTCHECK",
      name: "Fact-check",
      lensId: "inspect",
      category: "assess",
      shortDescription: "Assess quality and trustworthiness.",
      details:
        "Reviews content for accuracy, bias, and reliability, flagging claims to verify. Use before trusting or sharing.",
      alwaysAvailable: false,
    },
    {
      id: "SPELL_CRITIQUE",
      name: "Critique",
      lensId: "evaluate",
      category: "assess",
      shortDescription: "Get constructive feedback.",
      details:
        "Gives balanced, specific feedback with strengths and improvements. Use to sharpen a draft or an idea.",
      alwaysAvailable: false,
    },

    // ── Navigate ──────────────────────────────────────────────────────────
    {
      id: "SPELL_FIND",
      name: "Find",
      lensId: "scan",
      category: "navigate",
      shortDescription: "Locate the most relevant thing.",
      details:
        "Searches across your context for the most relevant entity, screen, or note. Use to jump straight to what matters.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_CONNECT",
      name: "Connect",
      lensId: "connect",
      category: "navigate",
      shortDescription: "Link related entities together.",
      details:
        "Surfaces and links related people, events, or ideas. Use to see how the current thing relates to everything else.",
      alwaysAvailable: false,
    },

    // ── Heal ──────────────────────────────────────────────────────────────
    {
      id: "SPELL_ENCOURAGE",
      name: "Encourage",
      lensId: "encourage",
      category: "heal",
      shortDescription: "Reframe setbacks with kindness.",
      details:
        "Offers a supportive, evidence-based reframe of a hard moment. Use to counter a harsh inner critic.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_GROUND",
      name: "Ground",
      lensId: "ground",
      category: "heal",
      shortDescription: "A quick calming exercise.",
      details:
        "Guides a brief grounding or breathing exercise. Use when overwhelmed and you need to reset before continuing.",
      alwaysAvailable: false,
    },

    // ── Create ────────────────────────────────────────────────────────────
    {
      id: "SPELL_DRAFT",
      name: "Draft",
      lensId: "generate",
      category: "create",
      shortDescription: "Generate a first draft.",
      details:
        "Produces a starting draft from your brief. Use to beat the blank page; edit and shape from there.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_STORYBOARD",
      name: "Storyboard",
      lensId: "design",
      category: "create",
      shortDescription: "Outline a scene sequence.",
      details:
        "Breaks an idea into a sequence of scenes or beats. Use to plan a video, lesson, or narrative.",
      alwaysAvailable: false,
    },

    // ── Movement ──────────────────────────────────────────────────────────
    {
      id: "SPELL_STEP_FORWARD",
      name: "Step Forward",
      lensId: "move",
      category: "movement",
      shortDescription: "Take the smallest next action.",
      details:
        "Identifies the single smallest step you can take right now to make progress. Use when you're stuck, overwhelmed, or unsure where to start — motion beats momentum.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_NAVIGATE_PATH",
      name: "Navigate",
      lensId: "scan",
      category: "movement",
      shortDescription: "Find the clearest path forward.",
      details:
        "Maps the route from where you are to where you're going, surfacing obstacles and decision points. Use when you have a destination but no clear road.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_TRANSITION",
      name: "Transition",
      lensId: "shift",
      category: "movement",
      shortDescription: "Prepare for what comes next.",
      details:
        "Helps you close out the current phase and set up cleanly for the next one — mental, physical, or situational. Use at natural break points to avoid carrying friction forward.",
      alwaysAvailable: false,
    },
    {
      id: "SPELL_SET_PACE",
      name: "Set Pace",
      lensId: "regulate",
      category: "movement",
      shortDescription: "Find and hold the right rhythm.",
      details:
        "Calibrates throughput to the task — Super Sonic (200 APM) when covering ground, Sub Sonic when precision matters, Hyper Sonic when you need a sprint. Use to avoid sprinting when you should cruise, or stalling when you should move.",
      alwaysAvailable: false,
    },

    // ── Mood ──────────────────────────────────────────────────────────────
    {
      id: "SPELL_LIFT",
      name: "Lift",
      lensId: "mood",
      category: "mood",
      shortDescription: "Shift from low to lighter.",
      details:
        "Offers a prompt, reframe, or micro-action to move your emotional state upward. Use when you're flat, depleted, or stuck in a low gear and need a nudge without toxic positivity.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_NAME_IT",
      name: "Name It",
      lensId: "notice",
      category: "mood",
      shortDescription: "Label what you're feeling.",
      details:
        "Prompts you to put precise words to your current emotional state. Naming an emotion reduces its intensity and gives you a handle on it — the first step in any regulation.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_SHIFT_STATE",
      name: "Shift State",
      lensId: "reframe",
      category: "mood",
      shortDescription: "Change your emotional channel.",
      details:
        "Guides a deliberate state change using reframe, breath, or micro-movement. Use when you need to switch modes — from anxious to focused, from wired to calm, from low to ready.",
      alwaysAvailable: false,
    },
    {
      id: "SPELL_TRACK_MOOD",
      name: "Track Mood",
      lensId: "status",
      category: "mood",
      shortDescription: "Log how you're feeling right now.",
      details:
        "Captures a quick mood snapshot with an optional note. Builds a record you can look back on to spot patterns — when do you peak? When do you crash? What helps?",
      alwaysAvailable: false,
    },

    // ── Status ────────────────────────────────────────────────────────────
    {
      id: "SPELL_CHECK_IN",
      name: "Check In",
      lensId: "status",
      category: "status",
      shortDescription: "Post a quick status update.",
      details:
        "Generates a short, clear status update for yourself or a team. Use at the start or end of a work block to stay visible and accountable without long reporting.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_STAND_UP",
      name: "Stand-Up",
      lensId: "summarize",
      category: "status",
      shortDescription: "What I did · doing · blocked.",
      details:
        "Structures a rapid three-part status: what I completed, what I'm working on now, and what's in my way. Use to open a work session or share progress with a team.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_MILESTONE",
      name: "Milestone",
      lensId: "celebrate",
      category: "status",
      shortDescription: "Mark and celebrate a checkpoint.",
      details:
        "Calls out a meaningful progress point — names what was achieved, why it matters, and what it unlocks next. Use to make forward motion visible before it disappears into the next task.",
      alwaysAvailable: false,
    },
    {
      id: "SPELL_REVIEW_STATUS",
      name: "Review",
      lensId: "evaluate",
      category: "status",
      shortDescription: "See the current state of play.",
      details:
        "Pulls together where things stand across active threads — what's on track, what's drifting, what needs a decision. Use for a weekly or daily pulse-check on everything in motion.",
      alwaysAvailable: false,
    },

    // ── Act · Matthew commons (plan / act / ship — learning set kept above) ─
    {
      id: "SPELL_PLAN",
      name: "Plan",
      lensId: "outline",
      category: "movement",
      shortDescription: "Outline the next move before you spend it.",
      details:
        "Settles intent into a clear sequence — what matters, what waits, what ships first. Use before a work block so Act lands on the right target.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_ACT",
      name: "Act",
      lensId: "move",
      category: "movement",
      shortDescription: "Do the thing in front of you.",
      details:
        "Converts the plan into motion — open the file, send the message, cast the next spell. Use when thinking has already paid for itself.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_SHIP",
      name: "Ship",
      lensId: "generate",
      category: "create",
      shortDescription: "Release it into the world.",
      details:
        "Closes the loop — publish, deploy, send, record the walkthrough. Use when Improve and Quality already cleared the bar.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_PUSH",
      name: "Push",
      lensId: "move",
      category: "movement",
      shortDescription: "Add force without losing form.",
      details:
        "Raises intensity on an active thread — more reps, clearer ask, harder deadline. Use when Ship Drive needs fuel, not a new plan.",
      alwaysAvailable: false,
    },
    {
      id: "SPELL_IMPROVE",
      name: "Improve",
      lensId: "evaluate",
      category: "assess",
      shortDescription: "Raise what is already in front of you.",
      details:
        "Finds the next lever — clarity, structure, truth, feel — and applies it. Use after Act when the draft exists but is not yet excellent.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_QUALITY",
      name: "Quality",
      lensId: "inspect",
      category: "assess",
      shortDescription: "Refuse to ship less than excellent.",
      details:
        "Holds the bar — fact, polish, edge cases, voice. Use as the gate before Ship, not as an excuse to stall forever.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_CUT",
      name: "Cut",
      lensId: "distill",
      category: "assess",
      shortDescription: "Remove what dilutes the point.",
      details:
        "Deletes padding, hedges, and dead weight until the signal is sharp. Use when Concise is not enough and the draft still hides the hit.",
      alwaysAvailable: false,
    },
    {
      id: "SPELL_COMMUNICATE",
      name: "Communicate",
      lensId: "clarify",
      category: "navigate",
      shortDescription: "Say it so another human can run with it.",
      details:
        "Turns private clarity into shared language — explain, summarise, connect. Use when the work only matters if someone else can carry it.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_TEACH",
      name: "Teach",
      lensId: "clarify",
      category: "navigate",
      shortDescription: "Turn what you know into something others can run.",
      details:
        "Packages insight as a lesson, walkthrough, or system someone else can repeat. Use when Vision Transfer matters more than being the only one who gets it.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_RECORD",
      name: "Record",
      lensId: "design",
      category: "create",
      shortDescription: "Capture the walkthrough while it is still true.",
      details:
        "Locks the move into media — screen, voice, beat sheet — before memory softens it. Use while Creating Content, Storytelling, Designing and Teach & Ship are live.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_BUILD",
      name: "Build",
      lensId: "generate",
      category: "create",
      shortDescription: "Ship the system surface itself.",
      details:
        "Makes the product, tool, or page — not the explanation of it. Use when Computer / Build is the real quest, not a side quest.",
      alwaysAvailable: true,
    },

    // ── Love / human ──────────────────────────────────────────────────────
    {
      id: "SPELL_BOND",
      name: "Bond",
      lensId: "connect",
      category: "heal",
      shortDescription: "Tend the relationship in front of you.",
      details:
        "Puts attention on the person, not the thread — check in, protect, show up. Use when Perfect Loves and Keep in Touch need a real cast, not a status.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_FISH",
      name: "Fish",
      lensId: "encourage",
      category: "heal",
      shortDescription: "Cast toward Perfect Loves — notice, invite, protect.",
      details:
        "Opens toward the bond you want without forcing the catch — notice signals, invite clearly, protect what is already real. Use on Fishing for Love, Money, and Fame days.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_RECOVER",
      name: "Recover",
      lensId: "ground",
      category: "heal",
      shortDescription: "Protect sleep, mood, and body so tomorrow ships.",
      details:
        "Resets the human stack — rest, food, breath, mood — so Ship Drive has a vessel. Use when grinding harder would only break the next day.",
      alwaysAvailable: true,
    },

    // ── Play ──────────────────────────────────────────────────────────────
    {
      id: "SPELL_PLAY",
      name: "Play",
      lensId: "mood",
      category: "play",
      shortDescription: "Loosen the grip — try it for the fun of it.",
      details:
        "Removes outcome pressure long enough to experiment, laugh, or explore. Use when Competitive and Desire have clamped too hard on the day.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_COMPETE",
      name: "Compete",
      lensId: "diagnose",
      category: "play",
      shortDescription: "Aim at #1 without making it ugly.",
      details:
        "Frames the arena clearly — score, rival, standard — and plays to win clean. Use on Going after #1 threads when rivalry should sharpen, not poison.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_CELEBRATE",
      name: "Celebrate",
      lensId: "celebrate",
      category: "play",
      shortDescription: "Mark the win so it registers.",
      details:
        "Names what landed and lets the body feel it before the next hunt. Use after Ship or Milestone so Chasing does not erase the victory.",
      alwaysAvailable: true,
    },

    // ── Create · Engine additions ─────────────────────────────────────────

    {
      id: "SPELL_STACK",
      name: "Stack",
      lensId: "generate",
      category: "create",
      shortDescription: "Layer information so it sticks.",
      details:
        "Structures the piece so each layer builds on the last — scaffolded, connected, memorable. Use when Draft is done and the content needs to retain, not just inform. Perk language: 'stacks information and data to improve learning and retention.'",
      alwaysAvailable: true,
    },

    // ── Engage · Engine additions ─────────────────────────────────────────

    {
      id: "SPELL_HOOK",
      name: "Hook",
      lensId: "reveal",
      category: "create",
      shortDescription: "Open with something that stops the scroll.",
      details:
        "Crafts the lead — the sentence, frame, or visual that earns the next ten seconds. Use at the start of a video, post, or session. Engagement is only possible once attention has been paid.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_INVITE",
      name: "Invite",
      lensId: "encourage",
      category: "create",
      shortDescription: "Ask them in — make interaction feel safe and worth it.",
      details:
        "Opens the door without forcing the entry — a question, a prompt, or a clear call to act. Use when you want interaction but have not yet made it easy. Perk language: 'encourages people to interact and gets that interaction.'",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_REPLY",
      name: "Reply",
      lensId: "clarify",
      category: "create",
      shortDescription: "Close the loop — respond, acknowledge, and keep the thread alive.",
      details:
        "Turns a comment, question, or reaction into a real exchange. Use after publishing to compound the engagement already arriving. The reply is the signal that the audience is heard.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_SPARK",
      name: "Spark",
      lensId: "mood",
      category: "create",
      shortDescription: "Ignite the next exchange — leave them wanting more.",
      details:
        "Plants the seed for the next interaction — a teaser, a cliffhanger, a question that lives in the mind. Use at the close of a piece or session to keep the conversation open. Perk language: 'excites them — they feel happy, inspired.'",
      alwaysAvailable: true,
    },

    // ── Influence · Engine additions ──────────────────────────────────────

    {
      id: "SPELL_BROADCAST",
      name: "Broadcast",
      lensId: "reveal",
      category: "power",
      shortDescription: "Send the signal wide — reach beyond the room.",
      details:
        "Takes what already worked and pushes it to every channel available — cross-post, syndicate, re-surface. Use when a piece deserves more reach than its original platform gives it. Reach compounds when the signal is clear.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_RALLY",
      name: "Rally",
      lensId: "encourage",
      category: "power",
      shortDescription: "Align and energise the people around the vision.",
      details:
        "Names the shared aim, clears the fog, and turns a group of watchers into a team. Use when momentum has stalled, the audience is passive, or the room needs a direction. Perk language: 'draws incredible support.'",
      alwaysAvailable: true,
    },

    // ── Power ─────────────────────────────────────────────────────────────
    {
      id: "SPELL_AMPLIFY",
      name: "Amplify",
      lensId: "reveal",
      category: "power",
      shortDescription: "Turn a win into signal, tokens, reach.",
      details:
        "Broadcasts what worked — Money.AmplifyMe() as a cast. Use when a release, lesson, or bond should compound instead of staying private.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_UNLOCK",
      name: "Unlock",
      lensId: "apply",
      category: "power",
      shortDescription: "Open capacity / leverage / the next door.",
      details:
        "Finds the bottleneck and turns the key — access, skill, capital, permission. Use when Power.Unlock() is the real next move, not more grind.",
      alwaysAvailable: true,
    },
    {
      id: "SPELL_COMPREHEND",
      name: "Comprehend",
      lensId: "analyze",
      category: "power",
      shortDescription: "See the system clearly enough to lead it.",
      details:
        "Maps the whole board — incentives, paths, failure modes — until leadership is possible. Use when Power.Comprehend() beats another blind push.",
      alwaysAvailable: true,
    },
  ],

  presets: [
    {
      id: "PRESET_PRIMARY",
      label: "Primary",
      description: "Plan · Act · Improve · Quality · Communicate — the everyday rose.",
      spellIds: [
        "SPELL_PLAN",
        "SPELL_ACT",
        "SPELL_IMPROVE",
        "SPELL_QUALITY",
        "SPELL_COMMUNICATE",
        "SPELL_SHIP",
        "SPELL_TEACH",
        "SPELL_BUILD",
      ],
    },
    {
      id: "PRESET_LEARNING",
      label: "Learn",
      description: "Core learning transformations — compress, deepen, visualize, quiz.",
      spellIds: [
        "SPELL_CONCISE",
        "SPELL_EXPAND",
        "SPELL_EXPLAIN",
        "SPELL_ANALYZE",
        "SPELL_VISUALIZE",
        "SPELL_QUIZ",
      ],
    },
    {
      id: "PRESET_LOVE",
      label: "Love",
      description: "Bond, fish, care, recover — Perfect Loves as a loadout.",
      spellIds: [
        "SPELL_BOND",
        "SPELL_FISH",
        "SPELL_ENCOURAGE",
        "SPELL_CHECK_IN",
        "SPELL_RECOVER",
        "SPELL_LIFT",
        "SPELL_GROUND",
      ],
    },
    {
      id: "PRESET_PLAY",
      label: "Play",
      description: "Play, compete, celebrate — keep the human and the game alive.",
      spellIds: ["SPELL_PLAY", "SPELL_COMPETE", "SPELL_CELEBRATE", "SPELL_STORYBOARD"],
    },
    {
      id: "PRESET_POWER",
      label: "Power",
      description: "Amplify · Unlock · Comprehend — Direction priorities as casts.",
      spellIds: ["SPELL_AMPLIFY", "SPELL_UNLOCK", "SPELL_COMPREHEND", "SPELL_BUILD"],
    },
    {
      id: "PRESET_QUICK_STUDY",
      label: "Quick Study",
      description: "Four high-yield spells for a fast, focused session.",
      spellIds: ["SPELL_CONCISE", "SPELL_EXAMPLE", "SPELL_ANALOGIZE", "SPELL_QUIZ"],
    },
    {
      id: "PRESET_WRITING",
      label: "Writing",
      description: "Drafting, shaping, and refining content.",
      spellIds: ["SPELL_DRAFT", "SPELL_REFRAME", "SPELL_CRITIQUE", "SPELL_SUMMARIZE", "SPELL_RECORD"],
    },
    {
      id: "PRESET_LIFE",
      label: "Life",
      description: "Movement, mood, and status — a day well navigated.",
      spellIds: [
        "SPELL_STEP_FORWARD",
        "SPELL_NAME_IT",
        "SPELL_CHECK_IN",
        "SPELL_LIFT",
        "SPELL_NAVIGATE_PATH",
        "SPELL_STAND_UP",
      ],
    },
    {
      id: "PRESET_CREATE",
      label: "Create",
      description: "Draft · Stack · Record · Cut · Quality · Ship — make the piece.",
      spellIds: [
        "SPELL_DRAFT",
        "SPELL_STORYBOARD",
        "SPELL_STACK",
        "SPELL_RECORD",
        "SPELL_CUT",
        "SPELL_QUALITY",
        "SPELL_SHIP",
        "SPELL_TEACH",
      ],
    },
    {
      id: "PRESET_ENGAGE",
      label: "Engage",
      description: "Hook · Invite · Reply · Spark — close the audience loop.",
      spellIds: [
        "SPELL_HOOK",
        "SPELL_INVITE",
        "SPELL_REPLY",
        "SPELL_SPARK",
        "SPELL_ENCOURAGE",
        "SPELL_CHECK_IN",
        "SPELL_CELEBRATE",
        "SPELL_CONNECT",
      ],
    },
    {
      id: "PRESET_INFLUENCE",
      label: "Influence",
      description: "Amplify · Unlock · Broadcast · Rally — compound reach and leadership.",
      spellIds: [
        "SPELL_AMPLIFY",
        "SPELL_UNLOCK",
        "SPELL_COMPREHEND",
        "SPELL_BROADCAST",
        "SPELL_RALLY",
        "SPELL_TEACH",
        "SPELL_COMPETE",
        "SPELL_FISH",
      ],
    },
    {
      id: "PRESET_CONTENT",
      label: "Content",
      description:
        "Nine category topics — Life · Heart · Mind · Craft · Build · Intel · Body · Lead · Value — mapped to integration layers.",
      spellIds: [
        "SPELL_NAVIGATE_PATH",
        "SPELL_BOND",
        "SPELL_TEACH",
        "SPELL_DRAFT",
        "SPELL_BUILD",
        "SPELL_COMPREHEND",
        "SPELL_RECOVER",
        "SPELL_RALLY",
        "SPELL_AMPLIFY",
      ],
    },
  ],
};

export const SPELLBOOK_SPARSE: SpellbookData = {
  spells: SPELLBOOK_SEED.spells.slice(0, 3),
  presets: [],
};

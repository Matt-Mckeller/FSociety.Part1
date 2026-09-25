import { CommunicationSession } from "@/types"

/*
  Public demo session for the yen embed. The local planner keeps a private
  working session in `session.ts`; that file is never selected when
  YEN_MOUNT_PATH is set, so named people and dark drafts do not ship.
*/

export const communicationSession: CommunicationSession = {
  metadata: {
    sessionId: "session-demo-public",
    dateCreated: "2026-08-01",
    lastUpdated: "2026-08-17",
    status: "draft",
    deliveryMethod: "Written message",
    relatedProject: "4eye.ai",
  },

  goals: [
    {
      id: "g1",
      title: "Clarify",
      description: "State what the message is for before writing it",
      priority: "primary",
      order: 1,
    },
    {
      id: "g2",
      title: "Teach",
      description: "Leave the reader with one usable shift, not a dump",
      priority: "primary",
      order: 2,
    },
    {
      id: "g3",
      title: "Keep dark what is dark",
      description: "Public drafts use invented seats; private names stay local",
      priority: "secondary",
      order: 3,
    },
  ],

  artifacts: [
    { id: "a1", title: "Public demo session for the yen mount", completed: true },
    { id: "a2", title: "One reframe + one analogy as worked examples", completed: true },
  ],

  recipientProfile: {
    name: "Example reader",
    basicInfo: [
      { field: "Role", value: "Visitor on yen", confidence: "high" },
      { field: "Context", value: "Public product site", confidence: "high" },
    ],
    professional: [
      { field: "Need", value: "See how a communication is planned", confidence: "high" },
    ],
    psychological: {
      mentalState: [
        {
          factor: "Attention",
          level: "medium",
          description: "Scanning; will bounce if the page is a private notebook",
        },
      ],
      cognitiveStyle: {
        strengths: ["Skimming for structure", "Examples over theory"],
        processing: "Short labelled blocks",
        memory: "Keeps one image and one sentence",
        possibleConditions: [],
      },
      communicationPreferences: {
        respondsWellTo: ["Concrete analogy", "Stated intent"],
        strugglesWith: ["Unnamed private context", "Long unchunked prose"],
        optimalFormat: ["Small blocks", "A single next step"],
      },
      defensePatterns: ["Closing a tab that feels like someone else's diary"],
    },
    interests: [
      {
        category: "Product",
        items: ["How 4eye plans a message", "What stays off the public site"],
        engagementLevel: "high",
      },
    ],
    lifeGoals: ["Understand the planner without inheriting a private session"],
    traumaHistory: [],
    observations: [
      {
        observation: "This profile is a stand-in so the mounted app has a complete session shape.",
        tags: ["demo"],
      },
    ],
    recommendations: [
      "Lead with intent",
      "Show one reframe and one analogy",
      "Do not imply a real recipient",
    ],
  },

  strategy: {
    contentRequirements: [
      {
        id: "r1",
        requirement: "Name the job of the message in one line",
        completed: true,
        priority: "high",
      },
      {
        id: "r2",
        requirement: "Include a visual or analogical translation",
        completed: true,
        priority: "high",
      },
      {
        id: "r3",
        requirement: "Keep private names out of the public build",
        completed: true,
        priority: "high",
      },
    ],
    psychologicalApproach: [
      {
        step: 1,
        title: "Orient",
        description: "Say what this surface is for",
      },
      {
        step: 2,
        title: "Demonstrate",
        description: "Walk one draft so the structure is visible",
      },
    ],
    pipelines: ["Intent first", "Draft in blocks", "Public vs local session"],
    guards: ["No real names", "No dark intents", "Demo copy only"],
  },

  relationshipContext: {
    interactionHistory: [
      "Opened from yen's systems catalogue as a running demo, not a live correspondence.",
    ],
    currentDynamic: {
      sender: "Showing the planner's shape",
      recipient: "Evaluating whether the tool is real",
    },
    potentialOutcomes: [
      {
        scenario: "Useful",
        description: "The visitor understands how a session is structured",
      },
      {
        scenario: "Done",
        description: "They return to yen without a private story attached",
      },
    ],
  },

  messageDrafts: [
    {
      id: "m1",
      title: "What this planner is for",
      theme: "Intent before prose",
      status: "ready",
      content:
        "A communication is planned before it is sent: who it is for, what shift it owes them, and which blocks carry that shift.",
      keyPoints: [
        "Clarify the job of the message first",
        "Write in labelled blocks, not a wall",
        "Public yen uses this demo session only",
      ],
      addressedRequirements: ["r1", "r3"],
      addressedPsychSteps: [1],
      contentBlocks: [
        {
          id: "m1-b1",
          type: "reframe",
          label: "Reframe",
          content:
            "This is not a CRM. It is a working surface for one session: goals, a reader model, and drafts that can be checked against both.",
        },
        {
          id: "m1-b2",
          type: "insight",
          label: "Insight",
          content:
            "If the public site mounted a private session, visitors would inherit someone else's map. The embed therefore swaps the data file at build time.",
        },
      ],
    },
    {
      id: "m2",
      title: "Analogy for chunking",
      theme: "Small pieces hold",
      status: "draft",
      content:
        "A long letter asks the reader to hold everything at once. Blocks let them keep one move, then the next.",
      keyPoints: ["One analogy", "One next step"],
      addressedRequirements: ["r2"],
      addressedPsychSteps: [2],
      contentBlocks: [
        {
          id: "m2-b1",
          type: "analogy",
          label: "Analogy",
          content:
            "Like a level select rather than a cutscene: each block is a room you can leave and return to, instead of one corridor with no doors.",
          engagementHooks: ["gaming"],
        },
        {
          id: "m2-b2",
          type: "implementation",
          label: "Next",
          content:
            "Open the combined messages view, then a single draft — that is the same session, two depths.",
        },
      ],
    },
    {
      id: "m3",
      title: "What stays local",
      theme: "Public vs dark",
      status: "draft",
      content:
        "Named people, dark intents, and working notes stay in the local app. Yen only ever embeds this invented session.",
      keyPoints: ["Local app keeps the private session", "Yen ships the demo"],
      addressedRequirements: ["r3"],
      addressedPsychSteps: [1],
      contentBlocks: [
        {
          id: "m3-b1",
          type: "callout",
          label: "Boundary",
          content:
            "Soft is not public. An entry belongs on yen only once it is rewritten without a real name and marked public on purpose.",
        },
      ],
    },
  ],
}

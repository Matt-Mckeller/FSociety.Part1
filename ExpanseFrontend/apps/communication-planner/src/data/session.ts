import { CommunicationSession } from "@/types"

/*
  Local working session. The yen embed build (`YEN_MOUNT_PATH`) aliases this
  module to `session.public.ts` so none of this file is compiled into the
  mounted site.
*/

export const communicationSession: CommunicationSession = {
  metadata: {
    sessionId: "session-4eye-2026-02",
    dateCreated: "2026-02-06",
    lastUpdated: "2026-02-06",
    status: "draft",
    deliveryMethod: "Text/Written Message",
    relatedProject: "4eye.ai",
  },

  goals: [
    {
      id: "g1",
      title: "Teach",
      description: "Share perspective-shifting knowledge",
      priority: "primary",
      order: 1,
    },
    {
      id: "g2",
      title: "Heal",
      description: "Address anxiety/insecurity patterns",
      priority: "primary",
      order: 2,
    },
    {
      id: "g3",
      title: "Connect",
      description: "Build genuine understanding and trust",
      priority: "primary",
      order: 3,
    },
    {
      id: "g4",
      title: "Transparency",
      description: "Be seen accurately, reduce ambiguity",
      priority: "secondary",
      order: 4,
    },
    {
      id: "g5",
      title: "Learn/Teach",
      description: "Uncover Annie's authentic self, remove barriers",
      priority: "secondary",
      order: 5,
    },
    {
      id: "g6",
      title: "Assess",
      description: "Cultural/business alignment evaluation",
      priority: "secondary",
      order: 6,
    },
  ],

  artifacts: [
    {
      id: "a1",
      title: "Case study for 4eye.ai communication methods",
      completed: false,
    },
    { id: "a2", title: "Few-shot examples for AI", completed: false },
    { id: "a3", title: "Marketing content samples", completed: false },
    {
      id: "a4",
      title: "Practice translating complex info simply",
      completed: false,
    },
  ],

  recipientProfile: {
    name: "Annie",
    basicInfo: [
      { field: "Age", value: "27", confidence: "high" },
      { field: "Location", value: "San Francisco area", confidence: "high" },
      {
        field: "Languages",
        value: "English, Mandarin/Cantonese",
        confidence: "high",
      },
      {
        field: "Background",
        value: "Canada → California (school)",
        confidence: "high",
      },
    ],
    professional: [
      { field: "Current Role", value: "Unemployed (quit)", confidence: "high" },
      {
        field: "Previous",
        value: "Meta - Software Engineer",
        confidence: "high",
      },
      { field: "Education", value: "Computer Science", confidence: "high" },
      { field: "Desired Role", value: "Product Designer", confidence: "high" },
    ],
    psychological: {
      mentalState: [
        {
          factor: "Anxiety",
          level: "high",
          description: "Financial insecurity, fertility concerns, appearance",
        },
        {
          factor: "Depression",
          level: "medium",
          description: "History, possibly current",
        },
        {
          factor: "Self-esteem",
          level: "low",
          description: "Worries about 'wasted 20s', attractiveness",
        },
      ],
      cognitiveStyle: {
        strengths: ["Problem-solving (dev-trained)", "Pattern recognition"],
        processing: "Visual/associative > verbal/linguistic",
        memory:
          "Better with association/abstraction, struggles with direct recall",
        possibleConditions: [
          "ADHD/Autism traits (undiagnosed) - TBD",
          "Possibly caused by Depression/Anxiety",
        ],
      },
      communicationPreferences: {
        respondsWellTo: [
          "Visual metaphors",
          "Storytelling",
          "Gaming analogies",
        ],
        strugglesWith: ["Direct emotional questions", "Vulnerability"],
        optimalFormat: ["Small chunks", "Repetition", "Imagery"],
      },
      defensePatterns: ["Dissociation", "Avoidance of deep questions"],
    },
    interests: [
      {
        category: "Gaming",
        items: ["League of Legends", "World of Warcraft"],
        engagementLevel: "high",
      },
      {
        category: "Anime",
        items: ["Attack on Titan", "Arcane"],
        engagementLevel: "high",
      },
      {
        category: "Life Planning",
        items: ["Marriage", "Family", "Children", "Egg Freezing"],
        engagementLevel: "high",
        notes: "Very high interest - anxiety driven",
      },
      {
        category: "Career",
        items: ["Product Design", "Hackathons"],
        engagementLevel: "medium",
      },
      {
        category: "Music",
        items: ["EDM"],
        engagementLevel: "medium",
      },
    ],
    lifeGoals: [
      "Finding a husband is high on her list of priorities",
      "Having children and a family",
      "Transition to product designer career",
    ],
    traumaHistory: [
      {
        event: "Infidelity",
        details: "Previously cheated on in relationship",
        impact: "high",
      },
      {
        event: "Bad Relationship",
        details: "Dated someone who was 'crazy'",
        impact: "medium",
      },
      {
        event: "Parental Conflict",
        details: "Possibly angry with parents",
        impact: "unknown",
      },
      {
        event: "Job Dissatisfaction",
        details: "Was unhappy with job, quit",
        impact: "medium",
      },
      {
        event: "Fertility Anxiety",
        details: "Worried despite being only 27",
        impact: "high",
      },
      {
        event: "Appearance Concerns",
        details: "Worried about how she looks",
        impact: "medium",
      },
      {
        event: "Time Anxiety",
        details: "Wondering if she 'wasted her 20s'",
        impact: "high",
      },
    ],
    observations: [
      {
        observation:
          "Showed interest in fellow developers and early stage entrepreneurs, especially white males",
        tags: ["social", "interests"],
      },
      {
        observation:
          "Seemed to zone out and not show interest in Matthew's businesses after initial high level interest",
        tags: ["dissociation", "defense"],
      },
      {
        observation:
          "Some kissing with Matthew, seemed nervous. Has been a while since she was in a relationship",
        tags: ["romantic", "anxiety"],
      },
      {
        observation: "Trauma triggered from conversation about sex",
        tags: ["trauma", "trigger"],
      },
      {
        observation:
          "Nervous and jealous at a strip club when an attractive woman came on, but also curious",
        tags: ["anxiety", "curiosity"],
      },
      {
        observation:
          "Highly interested in marriage conversations - entire body language changed, overflowing with anxiety and interest",
        tags: ["high-engagement", "anxiety", "marriage"],
      },
      {
        observation:
          "Showed traits of socially awkward impulsive responses, paying attention to negatives and interrupting the speaker (problem solver trait)",
        tags: ["cognitive", "problem-solver"],
      },
      {
        observation:
          "Difficulty concentrating on purely verbal conversation, amplified by emotional triggers",
        tags: ["cognitive", "processing"],
      },
      {
        observation: "History of avoiding and diving into deep questions",
        tags: ["defense", "avoidance"],
      },
      {
        observation:
          "Very responsive to associative/storytelling version of communication",
        tags: ["communication", "positive"],
      },
    ],
    recommendations: [
      "Correct concerns over not being married and not having kids at 27 being bad",
      "Support accepting that she's attractive",
      "Alignment with her power and beneficial position in today's society",
      "Make content engaging and relatable",
      "Experiment with visuals and storytelling",
      "Chunk content into small pieces",
    ],
  },

  strategy: {
    contentRequirements: [
      {
        id: "r1",
        requirement: "Visual translations of concepts",
        completed: false,
        priority: "high",
      },
      {
        id: "r2",
        requirement: "Storytelling format",
        completed: false,
        priority: "high",
      },
      {
        id: "r3",
        requirement: "High relatability",
        completed: false,
        priority: "high",
      },
      {
        id: "r4",
        requirement: "Chunked into small pieces",
        completed: false,
        priority: "medium",
      },
      {
        id: "r5",
        requirement: "Repetition for retention",
        completed: false,
        priority: "medium",
      },
      {
        id: "r6",
        requirement: "Associations with high engagement areas",
        completed: false,
        priority: "medium",
      },
      {
        id: "r7",
        requirement: "Gaming/anime analogies where possible",
        completed: false,
        priority: "medium",
      },
    ],
    psychologicalApproach: [
      {
        step: 1,
        title: "Reframe anxieties",
        description: "Position current state as advantageous",
      },
      {
        step: 2,
        title: "Build confidence",
        description:
          "Highlight objective value (skills, attractiveness, rarity)",
      },
      {
        step: 3,
        title: "Reduce time pressure",
        description: "Counter 'wasted 20s' narrative",
      },
      {
        step: 4,
        title: "Create safety",
        description: "Share own vulnerabilities to model openness",
      },
    ],
    pipelines: [
      "Trauma Informed / Trauma Healing",
      "Communication Strategy Development",
      "Adding Images",
      "Visual / HTML Translation",
    ],
    guards: [
      "IP protection",
      "Don't send full strategic details",
      "Maintain some mystery/anticipation",
    ],
  },

  relationshipContext: {
    interactionHistory: [
      "Met at a [Place] where she was visiting SF looking for answers <crown>",
    ],
    currentDynamic: {
      sender: "Assessing trust and cultural fit",
      recipient: "Reserved, defensive, uncertain",
    },
    potentialOutcomes: [
      {
        scenario: "Friendship",
        description: "Wealthy supportive friend dynamic",
      },
      {
        scenario: "Business",
        description: "Product design input, potential team member",
      },
      {
        scenario: "Romantic",
        description: "Life partner possibility (competing with other goals)",
      },
      { scenario: "Nothing", description: "Paths diverge, she learns" },
    ],
  },

  messageDrafts: [
    {
      id: "m1",
      title: "Reality Reframe - Marriage & Children",
      theme: "Perspective shift on being unmarried at 27",
      status: "draft",
      keyPoints: [
        "Your time was not wasted - you learned",
        "Freedom to choose is an advantage",
        "Gamer/dev women are rare and highly valued",
        "Early marriage often leads to complications",
        "Modern fertility options available",
        "Shared interests create deep bonds",
        "Negativity bias affects developer mindset",
        "Women can leverage rarity in dating market",
      ],
      addressedRequirements: ["r1", "r2", "r3", "r6", "r7"],
      addressedPsychSteps: [1, 2, 3],
      contentBlocks: [
        {
          id: "m1-b1",
          type: "reframe",
          label: "Opening Reframe",
          content:
            "Every moment—even the hard ones—helped you figure out your next steps.\n\n**Your time was not wasted.** You learned. You grew.",
          psychApproachSteps: [3],
          imageKey: "steppingStonesTimeline",
          imagePlaceholder: {
            description:
              "Timeline showing experiences as stepping stones, not wasted time",
            suggestedType: "illustration",
          },
        },
        {
          id: "m1-b2",
          type: "context",
          label: "Value Recognition",
          content:
            "You're an **attractive gamer and developer**—that combination alone is rare. Add to that: data skills, domain knowledge, and depth.\n\nAnd you're just getting started.\n\nI've caught glimpses of the **real you**—the one hiding behind caution. I want to see more.",
          engagementHooks: ["gaming"],
          psychApproachSteps: [2],
        },
        {
          id: "m1-b3",
          type: "transformation",
          label: "Perspective Shift - Marriage & Children",
          content:
            "This is the core reframe: shifting from a scarcity mindset to an abundance mindset about your current situation.",
          psychApproachSteps: [1, 2, 3],
          transformation: {
            before: {
              title: "Current Lens",
              mindset: "Scarcity & Urgency",
              beliefs: [
                "I have no husband at 27 - I'm behind",
                "My biological clock is running out",
                "I wasted my 20s",
                "Something is wrong with me",
                "I need to rush before it's too late",
              ],
              emotions: [
                "Anxiety",
                "Fear",
                "Inadequacy",
                "Panic",
                "Self-doubt",
              ],
              outcome: "Rushed decisions, settling, or paralysis from fear",
            },
            after: {
              title: "Reframed Lens",
              mindset: "Abundance & Intention",
              beliefs: [
                "No kids = freedom to choose the right partner",
                "Not trapped in a wrong marriage",
                "27 is prime - experienced but young",
                "I'm a rare gem: dev + gamer + attractive",
                "Modern options extend my timeline",
              ],
              emotions: [
                "Confidence",
                "Peace",
                "Empowerment",
                "Clarity",
                "Excitement",
              ],
              outcome: "Intentional choices, high standards, optimal timing",
            },
            catalyst:
              "Recognition of your true market value and the advantage of intentional timing",
            steps: [
              {
                label: "Acknowledge",
                description: "Your experiences taught you what you need",
              },
              {
                label: "Recognize",
                description: "Your unique value in the dating market",
              },
              {
                label: "Reframe",
                description: "Freedom, not failure - choice, not desperation",
              },
              {
                label: "Embrace",
                description: "Modern options and your prime position",
              },
            ],
          },
          imageKey: "trappedVsFreedom",
          imagePlaceholder: {
            description:
              "Side-by-side comparison: 'Trapped' vs 'Freedom to Choose' visual",
            suggestedType: "comparison",
          },
        },
        {
          id: "m1-b4",
          type: "story",
          label: "Connection Foundation",
          content:
            "What makes two people click? **Shared interests.** Shared experiences. Feeling like someone *gets* you.\n\nAnd underneath it all: knowing you're **safe and stable together.** That's primal—it matters more than people admit.",
          engagementHooks: ["story"],
          psychApproachSteps: [1],
        },
        {
          id: "m1-b4a",
          type: "story",
          label: "The Mismatched Couple Story",
          content:
            "Ever notice couples who seem \"mismatched\" on the surface—different looks, neither wealthy—yet they're genuinely happy?\n\n**What's their secret?** They binge Sword Art Online together. They communicate. They trust each other. They share a worldview.\n\nPhysical attraction amplifies when you're **emotionally bonded**. What started as \"meh\" becomes magnetic after genuine connection forms.\n\nThese are the **love potions** that actually work. And the rarest one? Shared understanding. That's what I'm trying to build with you.",
          engagementHooks: ["anime", "story"],
          psychApproachSteps: [2, 3],
          imageKey: "sharedInterestsBond",
          imagePlaceholder: {
            description:
              "Couple watching anime together - shared interests creating bond",
            suggestedType: "illustration",
          },
        },
        {
          id: "m1-b5",
          type: "analogy",
          label: "Market Value Analysis",
          content:
            "Developers and gamers want to date other developers and gamers. But the **supply of women in this space is tiny.**\n\nEven in tech hubs like SF, the ratio is skewed. Globally? It's not even close.\n\nNow add this: developers train their brains to **find problems.** Great for debugging code. Terrible for self-esteem. This creates a feedback loop of **low confidence and negativity bias.**",
          engagementHooks: ["gaming", "visual"],
          psychApproachSteps: [2],
          imageKey: "marketRarityChart",
          imagePlaceholder: {
            description:
              "Supply/demand chart showing gamer women rarity in dating market",
            suggestedType: "chart",
          },
        },
        {
          id: "m1-b5a",
          type: "insight",
          label: "Negativity Bias",
          content:
            "**Negativity bias** is default for humans, but exacerbated by development and gaming.\n\nDevelopers are trained to find bugs, errors, and problems—this bleeds into self-perception.",
          psychApproachSteps: [1, 4],
        },
        {
          id: "m1-b5b",
          type: "insight",
          label: "Market Empowerment",
          content:
            "Women in tech can leverage this imbalance. High demand, low supply = **you have leverage.**\n\nSociety might say you're \"punching above your weight.\" Reality? The market says you're the prize.\n\n**Your rarity is a superpower.**",
          engagementHooks: ["gaming"],
          psychApproachSteps: [2],
        },
        {
          id: "m1-b6",
          type: "reframe",
          label: "Early Marriage Trap",
          content:
            "Many people marry too young. They have kids before they're ready. They end up **trapped in relationships that drain them.**\n\nWhy? They followed **biological urges** before understanding themselves. The pressure to settle down. The fear of missing out.\n\nThe result? Regret. Resentment. \"What if?\" spiraling for decades.",
          psychApproachSteps: [1, 3],
          imageKey: "pathComparison",
          imagePlaceholder: {
            description:
              "Diagram showing 'rushed path' vs 'intentional path' outcomes",
            suggestedType: "diagram",
          },
        },
        {
          id: "m1-b6a",
          type: "reframe",
          label: "The What-Ifs",
          content:
            "The rushed path leads here:\n\n• What if I had dated more people?\n• What if I'd waited on kids?\n• Would I choose this person again?\n• **Am I stuck?**\n\nWanting children is natural—it's one of our deepest drives. But **timing matters.** Having kids before you're ready often lowers quality of life, not raises it.\n\nYou haven't made that mistake. That's not a failure—it's **wisdom.**",
          psychApproachSteps: [1, 3],
        },
        {
          id: "m1-b7",
          type: "callout",
          label: "Modern Options",
          content:
            "Women are able to have children more successfully at later ages safely. Modern options include:\n\n• **Egg freezing** – preserve your options\n• **IVF and fertility treatments** – proven technology\n• **Surrogacy** – another human or emerging technology\n\nThe ability to have babies without even carrying it yourself is an option. Technology keeps extending what's possible.",
          psychApproachSteps: [3],
          imageKey: "fertilityTimeline",
          imagePlaceholder: {
            description:
              "Modern fertility options timeline/infographic",
            suggestedType: "diagram",
          },
        },
        {
          id: "m1-b8",
          type: "meta",
          label: "Section Status",
          content:
            "----section end, Annie status 90% updated, will follow up with repetition and additional mediums of communication to permanently embed the updates into Annie's character profile so that this loads by default----",
          psychApproachSteps: [],
        },
      ],
      content: `Every moment we spent helped us figure our next paths. Your time was not wasted. You learned.

Context: You're an attractive gamer/developer girl AND you have great tits, skin, data, and highly valuable knowledge. And it's about to get even better. And I'm curious to see the real personality that's been hiding from me but peeked its head out briefly.

**Current Perspective:** You have no husband, you are worried about having children

**Goal Updated Perspective:** It's great that you have no kids, it's great that you aren't trapped in a marriage, you get to choose who you want, you're highly valuable beautiful and a rare gem

**Implementation:**
People love when people have shared interests, when we relate over shared experiences and backgrounds, and people love to know they are stable and financially ok. Food and shelter is one of the most important things to humans.

You often see couples where one is incredibly attractive and the other is disproportionately so, but yet neither is substantially wealthy and they are very happy together. Why? Could be: This couple binge watches Sword Art Online all seasons together, they communicate well and respect each other, there's a level of trust, intellect, and shared perspective on the world that they share. They had sex and got addicted to one another which causes the physical appearance attraction to be greatly enhanced after a few sessions. A mix of love potions that they drank one after the other. But the rarest and one of most valuable love potions is actually being woven into the words of this message.

Developers and gamers love other developers and gamers, but the amount of women in this realm is very limited. In San Francisco there are likely more, but globally the numbers are substantially imbalanced. Take that and combine it with the fact that developers and gamers tend to train the problem solving portion of their brains which makes them great at coding but unfortunately results in lower confidence and constantly seeing the negatives rather than positives. (Negativity bias is default for humans, but exasperated by development).

Women are even able to utilize this to climb ranks and achieve what society would consider above them because the interest in the data is incredibly high.

Many people get married too early, they have kids, and get stuck in a relationship that makes them miserable. They don't yet understand themselves or what they want in a relationship and they dive straight into the ape temptations to get married and have sex asap. But this actually results in complications later in their lives. Arguments, financial struggle, wondering what if I had more relationships, wondering what if I didn't have kids, would I be with this person? Am I trapped?

In reality kids are another highly highly desirable ape aspect of humanity that we need for survival and women in particular crave it. Yet, most of the time having kids decreases the standard humans quality of life because they weren't at a place to have them yet.

Additionally, women are able to have children more successfully at later ages safely. Even trans females can have a uterus implanted and have a real child now apparently. Also, frozen eggs are definitely an option. Additionally the ability to have babies without even carrying it yourself is an option. Whether in another human or in a machine.

Now... hopefully this helps. I could also translate these into another narrative and put more effort into visuals but this is already a long message and I'm still trying to gain clarity, plus it's quite difficult sometimes and I don't want to lose the core meaning and truth.

----section end, Annie status 90% updated, will follow up with repetition and additional mediums of communication to permanently embed the updates into Annie's character profile so that this loads by default----`,
    },
    {
      id: "m2",
      title: "Assessment Summary",
      theme: "Direct observations about communication style and meta-strategy",
      status: "draft",
      keyPoints: [
        "Visual/associative communication works",
        "Dissociation as defense mechanism",
        "Difficulty with emotions",
        "Anxiety tinting perception",
        "Possible autism/ADHD traits",
        "Storytelling method explanation",
        "Shared vulnerability builds trust",
      ],
      addressedRequirements: ["r1", "r4"],
      addressedPsychSteps: [2, 4],
      contentBlocks: [
        {
          id: "m2-b0",
          type: "meta",
          label: "Communication Strategy Explanation",
          content:
            "This storytelling method I used is more of a product design and creative approach for helping you visualize what I'm saying using a different part of the brain than a standard verbal (simply linguistic) approach. I'm focusing on Visualization and communicating in a way so that what I say can be turned into an image in your head and so that I play to the parts you've trained as a developer while also targeting high engagement data points.",
          tags: ["#EngagementAndLearningExpert"],
          psychApproachSteps: [4],
        },
        {
          id: "m2-b0a",
          type: "meta",
          label: "Strategy Notes",
          content:
            "I also attempted to make it easier to choose a path but you seemed to open up much easier than expected. I did let you simmer for a day hoping to build anticipation and play to emotion while also focusing on my work. There was still a barrier I was attempting to get through, seems to have partially opened up but TBD if I can actually dive deeper into Annie's personality and history now.",
          tags: ["#mentalhealthknowledge", "#marketingexpert"],
          psychApproachSteps: [4],
        },
        {
          id: "m2-b0b",
          type: "insight",
          label: "Observation on Openness",
          content:
            "First I need to understand it. Working on that now. Typically people just open up and dump their trauma on me, it's strange to me that you're more reserved. Like, always. They trust me tremendously. Typically I make it easier by sharing similar stories. Wondering if I shared these with you.",
          psychApproachSteps: [4],
        },
        {
          id: "m2-b0c",
          type: "insight",
          label: "Autism/ADHD Hypothesis",
          content:
            "Personally I'm thinking you're autistic/adhd but unaware of it and don't understand it or hiding trauma and scared of being hurt. And thus I should be cautious but also if nothing else is working being direct can work too.",
          psychApproachSteps: [4],
        },
        {
          id: "m2-b0d",
          type: "insight",
          label: "Dissociation Analysis",
          content:
            "Signs of dissociation and emotional damage/protection = mood shift after showing interest in you. You are interested in other people's technical background and businesses but didn't bother to ask me questions or dive into mine and instead turned me into a liar to avoid pain. Although to be fair I was initially unsure, and still need to verify. This is current perspective but let's continue to explore, this is but one single pebble. The boulders are coming after. First the darkness and ambiguity then the light.",
          psychApproachSteps: [4],
        },
        {
          id: "m2-b0e",
          type: "vulnerability",
          label: "Why I Understand",
          content:
            "Also, for reference, the reason I see these things, and why I understand humans so well is because of my own trauma, adhd/autism, struggles with mental health, and recovery combined with a mastery of learning.",
          psychApproachSteps: [4],
        },
        {
          id: "m2-b0f",
          type: "meta",
          label: "Transition",
          content:
            "Now let us further explore and continue to heal while also teaching. This will likely take more time to fully understand as I'm just meeting you but anyway, lmk if you still think I'm normal after this. Tehe.",
          psychApproachSteps: [],
        },
        {
          id: "m2-b0g",
          type: "credentials",
          label: "Gaming Credentials",
          content:
            "Note: top 1% in WoW primarily as a healer and protection paladin, top 0.001% in league of legends best with support but enjoying all roles my dear Annie (#helpedinventmagesupport)",
          engagementHooks: ["gaming"],
          psychApproachSteps: [2],
        },
        {
          id: "m2-b0h",
          type: "vulnerability",
          label: "Personal History",
          content:
            "Secondary note: Accepting of all people, grew up in poverty, first gf at 21. Previously: struggled with depression and anxiety continuously for the majority of my life. Constantly wondering if I should jump out in front of a semitruck or off the bridge every time I saw one, socially anxious and unable to speak, no self confidence.",
          psychApproachSteps: [4],
        },
        {
          id: "m2-b0i",
          type: "meta",
          label: "Revised Approach",
          content:
            "Now. Let me revise, continue to heal and teach, and heal and put my cards on the table.",
          psychApproachSteps: [],
        },
        {
          id: "m2-b1",
          type: "list",
          label: "Communication Assessment",
          content:
            "1) You respond to visual communication and associative communication, you're more likely to utilize dissociation as a defensive tactic\n2) You have difficulty with understanding emotions\n3) You're extremely direct and impatient\n4) You suffer from anxiety that tainted your perspective making you think you're flawed, undesired, and lacking time",
          psychApproachSteps: [4],
          imagePlaceholder: {
            description:
              "Brain diagram showing visual processing vs verbal processing paths",
            suggestedType: "diagram",
          },
        },
        {
          id: "m2-b2",
          type: "callout",
          label: "Positive Reframes",
          content:
            "**Reiterating some details to feel better:**\n1) You're in the prime of your life, and it takes approximately 2 words to have a high chance of seducing a man you desire. Utilize text to make it easier.\n2) I can help you understand who you are and why the world has been harder than it should have been for you and why it's confusing and why emotions are the way they are along with how to heal them\n3) Being good at association/dissociation can be a superpower.",
          psychApproachSteps: [2, 4],
          imagePlaceholder: {
            description:
              "Superpower iconography - dissociation as a shield/ability",
            suggestedType: "metaphor",
          },
        },
      ],
      content: `This storytelling method I used is more of a product design and creative approach for helping you visualize what I'm saying using a different part of the brain than a standard verbal (simply linguistic) approach. I'm focusing on Visualization and communicating in a way so that what I say can be turned into an image in your head and so that I play to the parts you've trained as a developer while also targeting high engagement data points of games and sex (but only slightly). #EngagementAndLearningExpert

I also attempted to make it easier to choose a path but you seemed to open up much easier than expected. #mentalhealthknowledge

I did let you simmer for a day hoping to build anticipation and play to emotion while also focusing on my work. #marketingexpert

There was still a barrier I was attempting to get through, seems to have partially opened up but TBD if I can actually dive deeper into Annie's personality and history now.

First I need to understand it. Working on that now. Typically people just open up and dump their trauma on me, it's strange to me that you're more reserved. Like, always. They trust me tremendously. Typically I make it easier by sharing similar stories. Wondering if I shared these with you.

Personally I'm thinking you're autistic/adhd but unaware of it and don't understand it or hiding trauma and scared of being hurt. And thus I should be cautious but also if nothing else is working being direct can work too.

Signs of dissociation and emotional damage/protection = mood shift after showing interest in you. You are interested in other people's technical background and businesses but didn't bother to ask me questions or dive into mine and instead turned me into a liar to avoid pain. Although to be fair I was initially unsure, and still need to verify. This is current perspective but let's continue to explore, this is but one single pebble. The boulders are coming after. First the darkness and ambiguity then the light.

Also, for reference, the reason I see these things, and why I understand humans so well is because of my own trauma, adhd/autism, struggles with mental health, and recovery combined with a mastery of learning.

Now let us further explore and continue to heal while also teaching. This will likely take more time to fully understand as I'm just meeting you but anyway, lmk if you still think I'm normal after this. Tehe.

Note: top 1% in WoW primarily as a healer and protection paladin, top 0.001% in league of legends best with support but enjoying all roles my dear Annie (#helpedinventmagesupport)

Secondary note: Accepting of all people, grew up in poverty, first gf at 21. Previously: struggled with depression and anxiety continuously for the majority of my life. Constantly wondering if I should jump out in front of a semitruck or off the bridge every time I saw one, socially anxious and unable to speak, no self confidence.

Now. Let me revise, continue to heal and teach, and heal and put my cards on the table.

1) You respond to visual communication and associative communication, you're more likely to utilize dissociation as a defensive tactic
2) You have difficulty with understanding emotions
3) You're extremely direct and impatient
4) You suffer from anxiety that tainted your perspective making you think you're flawed, undesired, and lacking time

**Reiterating some details to feel better:**
1) You're in the prime of your life, and it takes approximately 2 words to have a high chance of seducing a man you desire. Utilize text to make it easier.
2) I can help you understand who you are and why the world has been harder than it should have been for you and why it's confusing and why emotions are the way they are along with how to heal them
3) Being good at association/dissociation can be a superpower.`,
    },
    {
      id: "m3",
      title: "Wealth & Goals Perspective",
      theme: "Multiple types of wealth, ambitions, and possibilities",
      status: "draft",
      keyPoints: [
        "Multiple ways to be wealthy",
        "Knowledge as valuable currency",
        "Time as valuable currency",
        "Control and decision-making superiority",
        "Mission to help younger generations",
        "5 companies in development",
        "Potential outcomes explained",
        "Learning and partner profile goals",
      ],
      addressedRequirements: ["r2", "r3", "r4"],
      addressedPsychSteps: [1, 2],
      contentBlocks: [
        {
          id: "m3-b1",
          type: "reframe",
          label: "Wealth Reframe",
          content:
            "**Correction for Annie's ape instincts for money and judgements of Matthew's and likely her own financial situation plus other goals:**\n\n1) There's multiple ways to be wealthy, the easiest and most straightforward and attainable is to not waste money\n2) There's multiple types of wealth - financial wealth is but one measurement, information and knowledge can be quite valuable as demonstrated here and to be demonstrated through business as well, time is another currency for which is also incredibly valuable\n3) While I accept all people I do believe myself to be relatively above other people in terms of decision making and knowledge. I would prefer to keep the majority of control over my children and my plans to change the future of humanity.",
          psychApproachSteps: [1],
          imagePlaceholder: {
            description:
              "Three pillars of wealth: Money, Knowledge, Time - visual comparison",
            suggestedType: "diagram",
          },
        },
        {
          id: "m3-b1a",
          type: "ambition",
          label: "Core Ambition",
          content:
            "I want: to be top 0.001% in real life, despite coming from the bottom. I have an incredibly interesting story and journey that can be used to heal and teach so many people. Plus I'm incredibly talented at development.",
          psychApproachSteps: [2],
        },
        {
          id: "m3-b1b",
          type: "credentials",
          label: "Skills Breakdown",
          content:
            "Your team members at Meta/wherever? The different roles? The other teams roles? I do almost all of them very well in addition to the marketing, learning, engagement, and mental health knowledge. I have spent years learning: Backend, frontend, design, product, infrastructure/cloud, security, AI, and many languages.",
          psychApproachSteps: [2],
        },
        {
          id: "m3-b1c",
          type: "ambition",
          label: "Mission Statement",
          content:
            "I'm working on:\n1) Capturing the entirety of the younger generations and teaching them, healing them, and preparing them to live their best lives. A life prepared for a future with AI. Teaching them that they can achieve more and to believe in themselves. Teaching them who they are and helping them find their purpose. AND aiming for money too, but how many billions will I need?",
          psychApproachSteps: [1, 2],
        },
        {
          id: "m3-b1d",
          type: "context",
          label: "Business Context",
          content:
            "I've got about 5 companies, trying to decide if I apply to YC, get funding for more speed, or just launch and let the things go viral and maintain the most control.",
          psychApproachSteps: [],
        },
        {
          id: "m3-b1e",
          type: "context",
          label: "Assessment Context",
          content:
            "I haven't really used people too much other than random conversations but I was assessing you for whether I trust you enough and whether you align culturally with me and my brands.",
          psychApproachSteps: [4],
        },
        {
          id: "m3-b2",
          type: "implementation",
          label: "Possible Outcomes",
          content:
            "**What does this mean for Annie?**\nIt depends. And it depends on time.\n\n- It could mean nothing.\n- It could mean you have a really wealthy and intelligent friend who wants to help you and has so much money and wants to keep you around because he finds you interesting, attractive, and a good symbol.\n- Or, there could be millions in it for you while you do what you desire. You could sign on and join in, mark that you helped with product design (which you currently are), and/or be name on the list of people in submit for funding because people tend to think it's needed.\n- Alternatively, there could be a life partner in it for you but it may be hard to convince me not to chase after the hāremu* life I desire.",
          psychApproachSteps: [2, 4],
          imagePlaceholder: {
            description:
              "Branching paths diagram showing different outcome scenarios",
            suggestedType: "diagram",
          },
        },
        {
          id: "m3-b3",
          type: "insight",
          label: "Re: Learning",
          content:
            "Now, re: learning\n1) One of the first things I do when I meet people is ask them what their goals are and to tell me about their passions and interests. I like DEEP conversations. And THIS IS WHO I AM. I asked you. Yet you don't remember, and struggled to recall or maintained the defensive shield when asked verbally. Also did not recall when I asked through written text.",
          psychApproachSteps: [4],
        },
        {
          id: "m3-b4",
          type: "meta",
          label: "Partner Profile Note",
          content:
            "Also, wanting to put together a profile for the perfect partner(s) and what I am interested in while also learning and working. Currently doing all of those things.",
          psychApproachSteps: [],
        },
      ],
      content: `**Correction for Annie's ape instincts for money and judgements of Matthew's and likely her own financial situation plus other goals:**

1) There's multiple ways to be wealthy, the easiest and most straightforward and attainable is to not waste money
2) There's multiple types of wealth - financial wealth is but one measurement, information and knowledge can be quite valuable as demonstrated here and to be demonstrated through business as well, time is another currency for which is also incredibly valuable
3) While I accept all people I do believe myself to be relatively above other people in terms of decision making and knowledge. I would prefer to keep the majority of control over my children and my plans to change the future of humanity.

I want: to be top 0.001% in real life, despite coming from the bottom. I have an incredibly interesting story and journey that can be used to heal and teach so many people. Plus I'm incredibly talented at development.

Your team members at Meta/wherever? The different roles? The other teams roles? I do almost all of them very well in addition to the marketing, learning, engagement, and mental health knowledge. I have spent years learning: Backend, frontend, design, product, infrastructure/cloud, security, AI, and many languages.

I'm working on:
1) Capturing the entirety of the younger generations and teaching them, healing them, and preparing them to live their best lives. A life prepared for a future with AI. Teaching them that they can achieve more and to believe in themselves. Teaching them who they are and helping them find their purpose. AND aiming for money too, but how many billions will I need?

I've got about 5 companies, trying to decide if I apply to YC, get funding for more speed, or just launch and let the things go viral and maintain the most control.

I haven't really used people too much other than random conversations but I was assessing you for whether I trust you enough and whether you align culturally with me and my brands.

**What does this mean for Annie?**
It depends. And it depends on time.

- It could mean nothing.
- It could mean you have a really wealthy and intelligent friend who wants to help you and has so much money and wants to keep you around because he finds you interesting, attractive, and a good symbol.
- Or, there could be millions in it for you while you do what you desire. You could sign on and join in, mark that you helped with product design (which you currently are), and/or be name on the list of people in submit for funding because people tend to think it's needed.
- Alternatively, there could be a life partner in it for you but it may be hard to convince me not to chase after the hāremu* life I desire.

Now, re: learning
1) One of the first things I do when I meet people is ask them what their goals are and to tell me about their passions and interests. I like DEEP conversations. And THIS IS WHO I AM. I asked you. Yet you don't remember, and struggled to recall or maintained the defensive shield when asked verbally. Also did not recall when I asked through written text.

Also, wanting to put together a profile for the perfect partner(s) and what I am interested in while also learning and working. Currently doing all of those things.`,
    },
  ],
}
